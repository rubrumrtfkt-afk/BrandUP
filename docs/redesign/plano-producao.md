# Plano: o protótipo vira a landing de produção (brandupadvisory.com)

Plano escrito em 09/11/2026 só com leitura do código, sem executar nada. A implementação começa depois que a rodada visual v4.6 fechar, porque as duas mexem nos mesmos arquivos.

## Três problemas que orientam o desenho

- **A. Rotas recebendo a landing.** `staticRoutes` copia `dist/index.html` para `thank-you/` e `privacy/`. Se o protótipo virar o `index.html`, essas rotas e o admin recebem o HTML da landing: o pré-render, a intro e o canvas `gl`.
- **B. Supabase quebrando o pré-render.** `src/lib/supabase.ts` lança erro (`throw`) quando falta variável de ambiente. Um `import` estático no `Proto.tsx` derruba o pré-render e põe o supabase-js no caminho do LCP. A solução é um `import()` dinâmico dentro de `submitLead`.
- **C. Restrições do RLS.** O RLS exige `source='brandupadvisory.com'` e `status='new'`, e o anon não tem SELECT. Por isso o insert não pode usar `.select()`, e o lead de teste não pode ser marcado pelo `source`.

## Passos

### 1. Duas cascas (MPA)

- **`proto.html` vira `index.html`.**
  - Sai o `noindex`.
  - Entra o Pixel com o mesmo guard de hostname.
  - O botão `field` fica fixo.
  - Um script inline no `<head>` desvia para `/admin/` quando a URL tem `admin=1`, `#/admin` ou convite/recuperação. O `search` e o `hash` são preservados.
- **O `index.html` atual vira `app.html`.** É a casca leve de `/thank-you`, `/privacy` e `/admin/`, sem pré-render.
- **`vite.config.ts`.**
  - `input` passa a `{ main, app }`.
  - `prerenderProto` passa a olhar o `index.html`.
  - Se o pré-render falhar, o build cai com `throw`.
  - `staticRoutes(['thank-you','privacy','admin'])` copia o `app.html` e injeta `title`, `canonical` e `noindex` por rota.
  - Um rewrite no dev aponta essas rotas para `/app.html`.
- **`src/main.tsx`.**
  - `lazy()` em AdminPage, ThankYou e Privacy.
  - `index.css` sai daqui e passa a ser importado pelo AdminPage.
  - `isAdminRoute` passa a aceitar também `/admin`.
- **`src/proto/main.tsx`.** Passa a chamar `captureAttribution()`, que hoje só o `main.tsx` chama.
- **`AdminPage.tsx:225`.** O `replaceState` passa a apontar para `/admin/?admin=1`.
- **Limpeza adiada.** `App.tsx`, `App.css`, `Testimonials.*` e os PNGs de restaurante saem num PR seguinte, depois de 1 a 2 semanas com o site estável. Assim o rollback fica num `git revert` limpo.

### 2. Formulários (`src/lib/submitLead.ts`, puro e testável)

- **Campos do insert.** Os mesmos do `App.tsx` atual: trim, e-mail em minúsculas, `monthly_revenue` com a string exata, `source`, `status`, `meta_event_id` e `...readAttribution()`. Sem `.select()`.
- **Idempotência.** O cliente gera `id: crypto.randomUUID()` uma vez por tentativa. Se o reenvio devolver `23505`, conta como sucesso.
- **Envio.**
  - Timeout com `AbortController` de 12 s.
  - Guarda de duplo envio por formulário e por módulo, porque são dois formulários na página.
  - Sem retry automático.
- **Honeypot.** O campo `website`. Se vier preenchido, o envio vai para `/thank-you` sem `markLeadConfirmed`.
- **Sucesso.** `markLeadConfirmed` e depois `location.assign('/thank-you')`.
- **Erros.**
  - Por campo, mais `maxLength` igual aos CHECKs do banco: `name` 120, `company` 160, `email` 320.
  - De rede, com os valores mantidos no formulário.
  - Logs de erro mostram só o código, sem dado pessoal.
- **Telefone.** Gravado em E.164 (`+614…`). O CHECK de 6 a 30 caracteres já cobre isso, então o banco não muda.
- **Pendente do dono.** Aceitar ou não telefone fixo.

### 3. Faixas de faturamento (expand/contract)

- **Hoje não há migration.** As 4 strings são idênticas ao CHECK.
- **Se o dono quiser faixas B2B:**
  - Migration com `drop constraint if exists`, depois `add … not valid` com as faixas antigas e as novas, depois `validate`.
  - Ordem: migration primeiro, front depois (`revenueGrade()` e `revenueTiers` em `src/lib/leadboard.ts`, `revenue.options` em `content.ts`).
  - Nada de contract: os leads antigos continuam classificados.
- **Testes** (`tests/leadboard.test.mjs` e `"test": "node --test tests/"`):
  - cada opção do formulário dá uma nota diferente de `unclassified`;
  - cada string aparece no CHECK da migration mais recente.

### 4. `/thank-you` e `/privacy`

- O visual muda para os tokens da v4, sem WebGL.
- A `/thank-you` mantém o `trackConfirmedLead()`.
- **A `/privacy` reescrita cobre:**
  - o público B2B e o uso de agentes de IA;
  - quem processa os dados (Supabase, Meta e os provedores de IA);
  - o prazo de exclusão e o e-mail para pedidos;
  - as regras do Spam Act.

### 5. Metadados

O protótipo já tem `title`, `description`, `canonical`, OG/Twitter, JSON-LD e `og-brandup.jpg` (1200×630). Só sai o `noindex`. As rotas `thank-you` e `admin` ficam com `noindex`.

### 6. Assets

- **Vídeos.** O loop **day** carrega só perto do cross-fade. Com rede 2g/3g, nenhum vídeo carrega e ficam os stills.
- **Cache.** O GitHub Pages fixa `max-age=600`. Os arquivos sem hash em `public/` trocam de nome quando mudarem.
- **Fontes.** As fontes OFL ficam em `public/fonts/`, com o texto da licença publicado junto.

### 7. Verificação antes de subir

- **Checagens do projeto.** `tsc -b`, `lint`, `npm test` e `build`.
- **`grep` no `dist/`.**
  - O `index.html` tem o H1 e não tem `noindex`.
  - `thank-you/`, `privacy/` e `admin/` não têm `id="gl"`.
- **Preview.**
  - O admin não baixa o chunk do engine, nenhum `.webm` nem `fbevents.js`.
  - Os desvios `/?admin=1` e `/#/admin` vão para `/admin/`.
- **Lead de teste em staging.** Usar um projeto Supabase de staging ou `supabase start`.
- **Smoke em produção.**
  - Um envio só, pelo link `?utm_source=qa&utm_campaign=golive-test`.
  - Antes, bloquear `connect.facebook.net` para não mandar um Lead falso ao Meta.
  - Conferir a origem e a nota no LeadBoard e arquivar o lead.
- **Pixel.** Conferir com o Pixel Helper: PageView em `/` e `/thank-you`, Lead com `eventID`, nada no admin.
- **Lighthouse mobile.**
  - Meta: LCP ≤ 2,5 s e CLS ≤ 0,1.
  - Testar também num iPhone real e no navegador interno do Instagram.
  - O mp4 tem de responder 206 a pedidos de Range.
- **Workflow.** O `deploy-pages.yml` passa a rodar `lint` e `test` antes do build.
- **Revisão.** O `senior-reviewer` revisa antes do merge.
- **Git.**
  - `siteexample.html`, `.impeccable/`, `.taste-skill/`, as fotos de estudo e as sondas de `docs/redesign/` não entram.
  - `proto.html`, `src/proto/`, `public/fonts` e `og-brandup.jpg` entram.
- **Publicação.** O caminho é um PR de `redesign/b2b-ai-office` para `main`. Push na `main` publica direto e **só com autorização do dono**. O rollback é `git revert` mais push.

## O que bloqueia o go-live (decisão do dono)

1. "A$10M+": moeda, período e fonte. Sem prova, a linha sai.
2. "$250K/mês em 90 dias" vale para B2B? E não conversa com a faixa máxima "Over $150K".
3. ABN, e-mail, telefone e redes reais. Os do rodapé hoje são de modelo.
4. "5 minutos": fuso, horário comercial e quem liga.
5. Faixas de faturamento e a régua A/B/C.
6. Privacidade: onde ficam os dados, quais provedores de IA, prazo de exclusão, Privacy Act e Spam Act.
7. Aceitar ou não telefone fixo.
8. Autorizar o push na `main`.
