# Inventário do admin de leads (o que não pode se perder na troca)

Escrito em 10/11/2026, só com leitura do código. Base: `main` em `3f43121` (igual a `origin/main`). Os arquivos do site atual nesta branch (`redesign/b2b-ai-office`) são idênticos aos da `main`. Só `package.json` (entrou o `ogl`) e `vite.config.ts` (entrou o `prerenderProto` e a entrada `proto.html`) mudaram. O protótipo foi lido do working tree (`src/proto/Proto.tsx` tem mudanças ainda sem commit).

Verificado nesta leitura:
- `node --test tests/leadboard.test.mjs` no Node 22.21.1 passa 15/15.
- `git merge-tree` da branch de recuperação de senha com a `main` (simulação, nada gravado na árvore).

Não verificado (fica fora do repositório):
- a configuração do Supabase Auth: Site URL, Redirect URLs e templates de e-mail;
- se as migrations estão aplicadas em produção;
- as variáveis do GitHub (`vars.VITE_SUPABASE_*`).

---

## 1. Captura do lead (site atual)

### 1.1 Formulário e envio: `src/App.tsx`

| O quê | Onde | Detalhe |
|---|---|---|
| Estado do envio | `App.tsx:222-225` | `submissionPending` (ref) e `leadFormStatus` (`idle`, `submitting`, `success` ou `error`). |
| Guarda de duplo envio | `App.tsx:229`, `240`, `267-268` | Usa um ref síncrono, que pega duplo clique antes do re-render. O botão também fica `disabled` em `submitting` (`App.tsx:548`). O ref volta a `false` no `finally`. |
| Honeypot | `App.tsx:234-238` (lógica), `482-490` (campo) | Input `name="website"` com `tabIndex=-1`, `aria-hidden` no label, `autoComplete=off` e classe `form-honeypot`. Se vier preenchido: `form.reset()` e estado `success`. Não grava nada, não redireciona e não marca conversão. |
| `meta_event_id` | `App.tsx:244`, `254` | `crypto.randomUUID()` gerado por tentativa. A mesma chave vai para o banco e para o `eventID` do Pixel, o que permite deduplicar no futuro com a API de Conversões (que ainda não existe). |
| Insert | `App.tsx:246-256` | `supabase.from('leads').insert({...})` **sem `.select()`**. O anon não tem SELECT, então `.select()` falharia no RLS. |
| Campos gravados | `App.tsx:247-255` | `name` (trim), `email` (trim e minúsculas), `phone` (trim, formato livre), `company` (trim), `monthly_revenue` (string exata do `<option>`), `source: 'brandupadvisory.com'`, `status: 'new'`, `meta_event_id`, e `...readAttribution()`. |
| Erro do banco | `App.tsx:258-261` | Estado `error`, com a mensagem "We could not send your information. Please try again." (`App.tsx:555-563`, `role="alert"`). |
| Sucesso | `App.tsx:263-264` | `markLeadConfirmed(metaEventId)` e depois `window.location.assign('/thank-you')`. |
| Exceção (rede) | `App.tsx:265-266` | Estado `error`. |
| Reset do estado ao digitar | `App.tsx:475-479` | O `onInput` volta para `idle` quando o estado é `success` ou `error`. |
| Campos HTML | `App.tsx:491-545` | Todos com `required`: `name` (minLength 2), `email` (type email), `phone` (type tel, minLength 6), `company` (minLength 2), e o `<select name="revenue">` com as 4 opções (`App.tsx:540-543`). |
| Âncora | `App.tsx:435` | `<section id="diagnostic">`. O protótipo usa o mesmo id no 1º formulário, o que mantém links antigos com `#diagnostic`. |
| Link de privacidade | `App.tsx:564-566` | `/privacy` |

Não há timeout, retry nem idempotência no servidor. Um reenvio depois de timeout de rede pode duplicar o lead. Isso já é assim hoje.

**Como verificar.** Envie pelo formulário com `?utm_source=qa&utm_campaign=x`. A linha deve aparecer no LeadBoard com origem, campanha, nota e `meta_event_id` (este só no banco). O navegador deve ir para `/thank-you`. Um duplo clique rápido deve gerar uma linha só.

### 1.2 `/thank-you`: `src/ThankYou.tsx`

- `ThankYou.tsx:6-9`: define o título e chama `trackConfirmedLead()` uma única vez.
- O texto (`ThankYou.tsx:14-17`) ainda fala de "restaurant".
- A rota existe no build porque o `staticRoutes(['thank-you','privacy'])` copia `dist/index.html` (`vite.config.ts:6-16`).

**Como verificar.** Abra `/thank-you` direto ou recarregue a página. No Pixel Helper não pode aparecer `Lead`. Depois de um envio real, deve aparecer **um** `Lead` com `eventID`.

### 1.3 Pixel do Meta: `index.html:12-23`

- ID `1748885616199469`, com `init` e `PageView`.
- **Guard** (`index.html:14`): só roda quando há três condições juntas:
  - `hostname === 'brandupadvisory.com'`;
  - `URLSearchParams(search).get('admin') !== '1'` (pega também `?%61dmin=1`, que o teste cobre);
  - o hash não começa com `#/admin`.
- O `Lead` **não** é disparado no HTML. Ele sai só em `trackConfirmedLead()` (`attribution.ts:43-50`).
- Tipagem: `src/fbq.d.ts`.
- **Lacuna atual.** O guard não exclui links de convite ou recuperação que caem na raiz (`/?token_hash=…&type=invite` ou `#access_token=…`). Se o template do e-mail do Supabase aponta para a raiz sem `admin=1`, o Pixel envia o `PageView` com a URL inteira, token incluído, para o Meta. Os tokens são de uso único e curtos, mas é um vazamento. Não verifiquei o template.

**Como verificar.** O teste `Pixel runs only on production public routes` (`tests/leadboard.test.mjs:73-82`). Em produção, use o Pixel Helper: PageView em `/` e `/thank-you`, nada em `/?admin=1`.

---

## 2. Atribuição: `src/lib/attribution.ts`

| Item | Onde | Regra |
|---|---|---|
| Chaves de armazenamento | `:1-2` | `localStorage['brandup-attribution']` = `{at, attribution}`. `sessionStorage['brandup-lead-confirmed']` = eventId. |
| Janela | `:3`, `:33` | 30 dias. Um registro expirado, com `at` no futuro ou corrompido vira `{}`. |
| Parâmetros | `:4-5` | `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`, `gclid`, `offer`, `placement`, `partner` e `link_id`. Além deles, `landing_page` e `referrer`. |
| Aliases curtos | `:9`, `:17` | `s`→utm_source, `c`→utm_campaign, `m`→utm_content, `o`→offer, `p`→placement, `k`→partner. O parâmetro longo tem precedência. Não há alias para medium, term, fbclid, gclid nem link_id. |
| Normalização de fonte | `:10`, `:20` | Só vale **quando a fonte veio pelo alias** (`!params.has('utm_source')`): meta→facebook, ig→instagram, fb→facebook, wa→whatsapp, qr→qr, ref→referral. |
| Medium implícito | `:21` | `s=meta` sem medium grava `utm_medium='paid'`. |
| Truncamento | `:18`, `:35` | `link_id` 100, `landing_page` e `referrer` 500, demais 300. Bate com os CHECKs do banco: fbclid/gclid aceitam 500 no banco e o cliente corta em 300. |
| Quando grava | `:22-26` | Qualquer parâmetro de clique **substitui tudo** (last-touch, sem misturar campanhas). Sem parâmetro, grava "direto" (só `landing_page` e `referrer`), exceto em dois casos: já existe atribuição válida, ou o caminho é `/thank-you` ou `/privacy`. |
| Falha de storage | `:27`, `:36`, `:40`, `:49` | Tudo fica em try/catch. O envio funciona sem storage, só que sem origem. |
| Leitura para o insert | `:30-37` | Allowlist: só as chaves conhecidas, só strings, com truncamento. Chaves estranhas, como `status`, são descartadas. Isso impede que o storage injete colunas no insert. |
| Conversão | `:39-50` | `markLeadConfirmed` grava o eventId. `trackConfirmedLead` dispara `fbq('track','Lead',{}, {eventID})` e **só então** apaga o eventId. Se o `fbq` não existe (bloqueador), o eventId fica guardado para uma tentativa posterior. |

**Onde é chamada.**
- `captureAttribution()`: só em `src/main.tsx:24-26`, e só quando **não** é rota admin.
- `readAttribution()` e `markLeadConfirmed()`: `App.tsx:255` e `263`.
- `trackConfirmedLead()`: `ThankYou.tsx:8`.

**Peculiaridades que um sênior precisa saber.**
- O `landing_page` grava `pathname + search` cru. Um link de convite aberto na raiz grava o `token_hash` no storage, e ele vai junto no próximo lead daquele navegador. A branch de recuperação corrige isso ao rotear esses links para o admin (§8).
- `utm_source=meta` escrito por extenso **não** é normalizado. Com medium diferente de paid/cpc/social_paid, cai em `other` no `channelOf`.

**Como verificar.** Testes 1 a 8 de `tests/leadboard.test.mjs`. À mão: abra `/?s=meta&c=nov`, recarregue sem parâmetros, envie e confira no LeadBoard: canal Meta, campanha `nov`, medium `paid`.

---

## 3. Admin: `src/AdminPage.tsx` e roteamento

### 3.1 Roteamento: `src/main.tsx`

- `main.tsx:11-13`: a rota é admin quando há `?admin=1` ou o hash começa com `#/admin` (sem diferenciar maiúsculas). Não existe caminho `/admin`.
- `main.tsx:15-20`: se a URL tem `type=invite|recovery` **e** (`token_hash` na query **ou** `access_token=` no hash), grava `sessionStorage['brandup-password-setup']='1'`. Isso acontece antes de o supabase-js limpar a URL.
- `main.tsx:22`, `28-40`: admin vem antes de tudo, depois `/thank-you`, `/privacy` e por fim `App`.
- Cliente Supabase: `src/lib/supabase.ts`.
  - Usa `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY`.
  - Faz **`throw`** se uma delas faltar (`supabase.ts:6-8`).
  - Opções: `persistSession`, `autoRefreshToken` e `detectSessionInUrl: true`.

### 3.2 Fluxos

| Função | Onde | O que faz | Mensagens |
|---|---|---|---|
| Sessão inicial | `:83-102` | `getSession()`. Se há sessão e **não** há setup de senha pendente, chama `loadDashboard`. Muda o `document.title` para "Lead Dashboard \| BrandUp". | Spinner "Checking secure access..." (`:251-258`) |
| Eventos de auth | `:104-123` | `SIGNED_OUT` limpa tudo. `SIGNED_IN` com flag `'1'` abre a tela de senha. O cleanup restaura o título (`:127`, texto antigo de restaurante). | — |
| Login | `:131-165`, UI `:299-355` | `signInWithPassword` com o e-mail em minúsculas. | `email_not_confirmed`, `over_request_rate_limit`, `invalid_credentials`, genérica e sem usuário (`:142-161`) |
| Convite (token_hash) | `:25-27`, `:171-193`, UI `:260-297` | Lê `token_hash` da query e mostra o botão "Accept secure invitation". `verifyOtp({token_hash, type:'invite'})` e grava a flag. Em erro, remove a flag. | "This invitation is no longer valid…" |
| Definir senha | `:195-229`, UI `:357-419` | Valida mínimo de 8 caracteres e confirmação, chama `updateUser({password})`, remove a flag, faz `replaceState('/?admin=1')` (`:225`) e carrega o painel. | "Use at least 8 characters." / "The passwords do not match." / "…Request a new invitation." |
| Verificação de admin | `:43-60` | `admin_users.select('user_id').eq('user_id', uid).maybeSingle()`. A política RLS só deixa ler a própria linha. | Sem linha: "`{email}` is not on the BrandUp agency access list." Com erro: "Secure access could not be verified…" (`:430-444`) |
| Carga de leads | `:65-78` | Loop com `.range(offset, offset+999)`, 1000 por página, `order(created_at desc, id)`, colunas explícitas (`:68`) e sem `SELECT *`. Para quando a página vem com menos de 1000. | Erro: "Não foi possível atualizar os leads… Dados anteriores, se houver, foram mantidos." (`:71`) |
| Atualizar | `:231-239` | `refreshLeads` relê a sessão e repete a verificação e a carga completa. | — |
| Mudar etapa | `:241-249` | `update({status}).eq('id').select('id').single()`. O `.single()` faz um update de 0 linhas, bloqueado pelo RLS, virar erro em vez de sucesso silencioso. O estado local só muda depois do OK. | "A etapa não foi salva…" |
| Sair | `:167-169`, `:438`, `:455` | `auth.signOut()` | — |
| Cabeçalho | `:446-463` | Logo com link para `/`, e-mail da sessão, botão sair e `<LeadBoard …/>`. | — |

**Dependências.**
- Supabase Auth: senha, convite e OTP.
- Tabelas `admin_users` e `leads`.
- CSS: `AdminPage.css` e `LeadBoard.css`. Os dois usam variáveis de `src/index.css` (`--aqua`, `--text-muted`, `--line`, `--accent`, `--text`, `--bg`). Hoje o `index.css` é importado em `main.tsx:3`.
- Ícones: `lucide-react`.

**Peculiaridades.**
- A carga com OFFSET pode duplicar uma linha se um lead chegar no meio da paginação. Só acontece acima de 1000 leads.
- A carga é completa a cada 60 s. Fica O(n) por minuto e por aba aberta, o que serve no volume atual.

**Como verificar.**
1. `/?admin=1` sem sessão mostra o login.
2. Uma senha errada mostra "The email or password is incorrect."
3. Um usuário fora da allowlist vê "Access not authorized".
4. Um admin vê o painel e consegue mudar a etapa. Ao recarregar, a etapa continua.
5. Um convite novo leva à tela de senha e depois ao painel.

---

## 4. LeadBoard: `src/LeadBoard.tsx` e `src/lib/leadboard.ts`

### 4.1 Lógica pura (`leadboard.ts`, testável)

- **Etapas** (`:3`, `:6`): `new` Novo, `contacted` Contatado, `qualified` Qualificado, `closed` Fechado e `archived` Arquivado. São iguais ao CHECK do banco.
- **Tipo `Lead`** (`:4-5`): `Attribution` mais `id`, `created_at`, `name`, `email`, `phone`, `company`, `monthly_revenue` e `status`.
- **Canais** (`:7`, `channelOf` `:22-33`), em ordem de precedência:
  1. `fbclid`, ou fonte meta/facebook/fb/instagram com medium paid/cpc/social_paid → **meta**;
  2. `gclid`, ou google/googleads → google;
  3. instagram/ig → instagram;
  4. facebook/fb → facebook;
  5. whatsapp/wa → whatsapp;
  6. qr/offline → qr;
  7. referral/ref/partner, ou (sem fonte e com referrer) → referral;
  8. email → email;
  9. qualquer outra fonte → other;
  10. sem fonte → direct.
- **Faixas A/B/C** (`revenueTiers` `:8-12`, `revenueGrade` `:13-21`). A ordem do formulário é: Up to AUD 30k / AUD 30k to AUD 80k / AUD 80k to AUD 150k / Above AUD 150k.
  - **A**: `'AUD 80k to AUD 150k'` e `'Above AUD 150k'`;
  - **B**: `'AUD 30k to AUD 80k'`;
  - **C**: `'Up to AUD 30k'`;
  - qualquer outra string, vazia ou nula → `unclassified`. O código não tenta adivinhar.
  - A comparação é **exata**, incluindo maiúsculas e espaços.
- **Precisa de atenção** (`needsAttention` `:34-36`): `status==='new'` e pelo menos 5 min desde `created_at`. Conta tempo corrido, sem considerar horário comercial.
- **Filtros** (`filterLeads` `:37-46`): `days` (janela em dias), `channel`, `status`, `campaign` (igual a `utm_campaign`), `grade` e `attention`. A **busca** procura em `name`, `company`, `email`, `phone`, `utm_source`, `utm_campaign`, `utm_content`, `offer` e `partner`, sem diferenciar maiúsculas.
- **CSV** (`csvCell` `:47-50`):
  - sempre entre aspas, com `"` duplicado;
  - prefixa `'` quando a célula começa (após espaços) com `= + - @ \t \r`. É a defesa contra injeção de fórmula.
  - Por isso um telefone em E.164 (`+61…`) sai como `'+61…` no CSV. Isso é esperado, e o teste cobre.
- **Link rastreado** (`buildTrackedLink` `:51-57`): base fixa `https://brandupadvisory.com/`, entram só os campos não vazios, e `{{ }}` vai sem escape para as macros do Meta.

### 4.2 Tela (`LeadBoard.tsx`)

- **Abas** (`:8-9`): Início, Leads, Resultados, Links e Configurar Meta. A aba persiste em `?view=` via `replaceState` (`:17-20`, `:33-37`).
- **Relógio e polling.**
  - `now` atualiza a cada 15 s (`:27`).
  - Recarga automática a cada 60 s, **só com a aba visível** (`:28-31`).
  - Datas em `Australia/Brisbane`, pt-BR (`:11`).
- **Ordenações** (`:38-53`):
  - prioridade: atenção > novo (o mais antigo primeiro) > contatado > qualificado > resto;
  - faturamento A→C;
  - nome;
  - mais antigos;
  - mais recentes.
- **Contagens.**
  - Métricas Leads / Novos / Qualificados + fechados / Fechados (`:59`, `:69`).
  - Os cartões de faixa contam com os filtros atuais **menos** a faixa (`:54`, `:86`).
  - Atenção (`:57`, `:78`).
  - Resultados por canal (com % de qualificados) e por campanha, só com o filtro de período (`:58`, `:84-85`).
- **Filtros na UI** (`:67`, `:87`): período (24 h, 7, 30 e 90 dias), busca, canal, faixa (com "Sem classificação"), etapa, campanha (lista dos valores existentes), ordenação, "Só novos há 5+ minutos" e "Limpar filtros". O botão "Abrir fila de atenção" (`:68`, `:78`) zera os filtros e liga `attention`.
- **Fila** (`:88`):
  - 25 por página (`:10`), paginação local;
  - links `mailto:` e `tel:`;
  - selo de faixa;
  - canal e campanha;
  - `<select>` de etapa, desabilitado enquanto outra atualização roda;
  - `<details>` "Ver origem" com 12 campos de atribuição.
- **CSV** (`:60-66`, botão `:83`):
  - exporta **o filtro atual inteiro**, não só a página;
  - 22 colunas com cabeçalho em pt-BR;
  - BOM UTF-8, separador CRLF;
  - nome do arquivo `brandup-leads-AAAA-MM-DD.csv`.
- **Aba Meta** (`:91`): guia estático com o ID do Pixel, o teste de ponta a ponta e o limite AUD 30/dia. Não chama nenhuma API.

**Como verificar.** Testes 10 a 15. À mão:
- cada filtro reduz a contagem "N leads no filtro";
- o CSV abre no Excel com acentos e sem fórmula executada (teste com um lead de nome `=1+1`);
- um lead `new` com mais de 5 min aparece com "Novo há 5+ min".

---

## 5. Links rastreados: `src/LeadLinks.tsx` e tabela `lead_links`

- **Carga** (`:29-44`): paginada de 1000 em 1000, colunas explícitas. A flag `active` evita setState depois do unmount.
- **Presets** (`:10-17`): Anúncios Meta (com as macros `{{campaign.name}}`, `{{ad.name}}`, `{{adset.name}}` e `{{placement}}`), Bio do Instagram, Página do Facebook, WhatsApp, QR / offline e Indicação.
- **Criar** (`:49-58`):
  - `id` gerado no cliente (`crypto.randomUUID()`, `:53`), que vira o `link_id` do link;
  - insert sem `.select()`;
  - guarda `busy` contra duplo envio;
  - nome com no máximo 120 caracteres, campos com no máximo 300; medium e campanha são obrigatórios (`:72-74`).
- **Link exibido** (`:28`, `:75`): só leva `link_id` depois de salvo (`savedId`). Qualquer mudança no formulário limpa o `savedId` (`:71`), o que impede copiar um id com parâmetros diferentes dos salvos.
- **Arquivar/Restaurar** (`:59-65`): `update({archived}).eq('id').select('id').single()`. O banco só permite `UPDATE (archived)`, então **os parâmetros são imutáveis** e não há delete. O link arquivado continua funcionando no site.
- **Lista** (`:83-86`): conta os leads por `lead.link_id === link.id` em todo o histórico carregado, mais os qualificados e fechados. Tem a opção "Mostrar arquivados".
- **Copiar** (`:45-48`): `navigator.clipboard` com mensagem de falha.

**Dependências.**
- Tabela `lead_links` e coluna `leads.link_id`.
- `captureAttribution` rodando na página de destino (`/`).
- **Links e QRs já distribuídos apontam para `https://brandupadvisory.com/?…`.** A página que estiver em `/` no dia da troca tem de capturar esses parâmetros.

**Como verificar.**
1. Crie um link e abra-o numa aba anônima.
2. Envie o formulário.
3. Na aba Links, a contagem desse link sobe para 1.
4. Arquive o link e confirme que ele ainda funciona.

---

## 6. Banco: `supabase/migrations/*.sql`

### 6.1 `public.leads`
- `20260721143800_create_leads.sql:1-20`:
  - `id uuid` PK com `gen_random_uuid()`;
  - `created_at timestamptz` com default em UTC;
  - `name` com CHECK de 2 a 120 após trim;
  - `email` de 5 a 320;
  - `phone` de 6 a 30;
  - `company` de 2 a 160;
  - `source` com default `'brandupadvisory.com'`;
  - `status` com default `'new'` e CHECK com as 5 etapas.
- **CHECK de `monthly_revenue`** (`:8-15`): `in ('Up to AUD 30k','AUD 30k to AUD 80k','AUD 80k to AUD 150k','Above AUD 150k')`. Qualquer outra string é **rejeitada pelo banco** e o envio dá erro. O CHECK não tem nome explícito, então o Postgres gera um, provavelmente `leads_monthly_revenue_check`. Confirme o nome com `\d leads` antes de qualquer `drop constraint`.
- **Atribuição** (`20261101120000_add_lead_attribution.sql:2-12`): colunas `utm_*` (até 300), `fbclid` e `gclid` (até 500), `landing_page` e `referrer` (até 500) e `meta_event_id` (até 100). Todas aceitam nulo.
- **Links** (`20261101130000_add_lead_links.sql:3-7`): `offer`, `placement` e `partner` (até 300) e `link_id` (até 100). Índice parcial `leads_link_id_idx` com `WHERE link_id IS NOT NULL` (`:28`).
- **Índice** `leads_created_at_idx (created_at desc)` (`20260721180000…:8`). Serve o `ORDER BY` do admin.

### 6.2 RLS e grants em `leads`
- **anon e authenticated podem INSERIR** (`create_leads.sql:24-35`):
  - o grant é `insert on table` (todas as colunas);
  - a política `"Public can submit leads"` exige `status = 'new'` **e** `source = 'brandupadvisory.com'`.
  - Consequências:
    - um insert com outro `source` (ex.: marcar o lead de teste) ou outro `status` é rejeitado;
    - o cliente **pode** mandar `id` próprio, o que viabiliza a idempotência do plano;
    - o cliente também pode mandar `created_at`. É um risco que já existe hoje: um anon pode forjar a data e furar a fila de atenção. Baixo impacto.
- **anon não tem SELECT.** Insert com `.select()` ou `Prefer: return=representation` falha.
- **Admin** (`20260721180000_add_agency_admin_access.sql:22-56`):
  - `grant select` e `grant update (status)` para authenticated;
  - as políticas `"Agency admins can view leads"` e `"…update lead status"` exigem uma linha em `admin_users` com `user_id = auth.uid()`;
  - o UPDATE só alcança a coluna `status`;
  - **ninguém tem DELETE**, então um lead só é arquivado.

### 6.3 `public.admin_users` e allowlist
- `20260721180000…:1-20`:
  - `user_id` PK, com FK para `auth.users` e `on delete cascade`;
  - `email` unique;
  - índice em `email`;
  - RLS: authenticated só lê a própria linha;
  - sem grant de insert, update ou delete.
- **Allowlist via trigger** `register_allowed_agency_admin_after_signup` em `auth.users` (`20260721210500…:21-25`). A função vigente está em `20260721215500_expand_agency_admin_allowlist.sql:1-24`, é `security definer` com `search_path=''` e contém **4 e-mails fixos**.
  - Só dispara no **INSERT** em `auth.users`, ou seja, no convite ou no cadastro.
  - Para incluir um admin novo: alterar a função (nova migration) **antes** de convidar, ou inserir em `admin_users` à mão.
  - Para remover um admin: apagar a linha de `admin_users` à mão.
  - Os e-mails pessoais estão versionados no repositório. Isso é um fato a registrar e está fora do escopo desta troca.

### 6.4 `public.lead_links`
- `20261101130000…:9-27`:
  - colunas `id`, `name` (1 a 120), `fields jsonb` (objeto com até 6000 bytes), `archived` e `created_at`;
  - RLS: só admin faz select, insert e `update (archived)`;
  - sem delete.

**Como verificar** (em staging ou com `supabase start`, nunca em produção sem o dono):
- um insert anon com `source='teste'` falha;
- um insert anon com `monthly_revenue='Over $150K'` falha;
- um insert anon com `.select()` falha;
- um usuário autenticado fora da allowlist recebe 0 linhas no select;
- um update de `name` pelo admin é negado.

---

## 7. Testes e deploy

`tests/leadboard.test.mjs` tem 15 testes. Ele transpila os `.ts` com `typescript`, sem dependência nova de teste.

| # | Linhas | Cobre |
|---|---|---|
| 1 | 24-31 | UTM e fbclid sobrevivem a uma visita de volta sem parâmetros; o `landing_page` fica preservado. |
| 2 | 32-37 | Uma campanha nova substitui a anterior (last-touch). |
| 3 | 38-44 | Os aliases `s/c/m/o/p/k` funcionam, `r` é ignorado e `s=meta` resulta em canal `meta`. |
| 4 | 45-53 | Registro expirado, corrompido ou com chave estranha é descartado; o truncamento é de 300. |
| 5 | 54-56 | Uma visita direta a `/thank-you` não grava atribuição. |
| 6 | 57-62 | Sem marca não há Lead; com marca, o Lead dispara uma vez só. |
| 7 | 63-66 | Se o `fbq` não existe, a marca fica guardada. |
| 8 | 67-72 | Storage bloqueado não lança erro. |
| 9 | 73-82 | Guard do Pixel: o 1º `<script>` de `index.html` roda em 5 cenários de host, admin e hash, e nunca dispara `Lead`. |
| 10 | 83-89 | `buildTrackedLink`: caracteres especiais, macros do Meta e `link_id`. |
| 11 | 90-95 | Atenção a partir de exatamente 5 min. |
| 12 | 96-100 | Filtros combinados com a busca. |
| 13 | 101-105 | `csvCell`: aspas, `=HYPERLINK` e `+61…`. |
| 14 | 107-113 | As 4 faixas viram A/A/B/C; vazio, nulo e desconhecido viram `unclassified`. |
| 15 | 115-123 | Filtro de faixa combinado com canal e etapa. |

**Não coberto:**
- `handleLeadSubmit`: honeypot, guarda de duplo envio e campos do insert;
- `AdminPage`: login, convite e paginação;
- `LeadLinks`;
- RLS (não há teste SQL).

**Como rodar.**
- Não existe script `test` no `package.json` (só `dev`, `build`, `lint` e `preview`).
- Comando que funciona: `node --test tests/leadboard.test.mjs`, ou `node --test 'tests/*.test.mjs'`. Precisa de Node 22 ou mais novo; o Node 18 da shell padrão não aceita `--test`.
- **`node --test tests/`, o comando proposto no plano, falha no Node 22.21.1** com "Cannot find module …/tests". Verificado. No Node 24 do CI não verifiquei.

**Deploy** (`.github/workflows/deploy-pages.yml`):
- Gatilhos: push na `main` e `workflow_dispatch`.
- Passos: Node 24, `npm ci`, `npm run build` (`tsc -b && vite build`) e publicação do `dist/` no GitHub Pages.
- Variáveis: `VITE_SUPABASE_URL` e `VITE_SUPABASE_PUBLISHABLE_KEY` vêm de **`vars`** (variáveis do repositório, não secrets). A publishable key é pública por natureza.
- **Não roda lint nem testes.**
- Domínio: `public/CNAME` = `brandupadvisory.com`.

---

## 8. Branch não mesclada `origin/feature/admin-password-recovery`

- **Um commit**: `2bbc61a` de 24/10/2026, "Add password recovery to the admin dashboard".
- **Base antiga.** O merge-base é `f8c8f69` ("Fix admin login authorization flow"), **7 commits atrás da `main`**. A branch não conhece o LeadBoard, a atribuição, `/thank-you` nem `/privacy`.
- **Arquivos** (`git diff main...origin/feature/admin-password-recovery --stat`): `src/AdminPage.tsx` (+281/−67 no total), `src/main.tsx` (22 linhas) e `src/AdminPage.css` (+25).

**O que ela acrescenta:**
1. **"Forgot password?"** na tela de login. Abre uma visão `forgot` com o formulário de e-mail, que chama `supabase.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/?admin=1` })`.
   - A mensagem de sucesso é neutra e não revela se a conta existe: "If this email belongs to an agency account…".
   - Erros tratados: `over_email_send_rate_limit` e `over_request_rate_limit`.
2. **Links de recuperação.** O evento `PASSWORD_RECOVERY` ou `token_hash` com `type=recovery` abre a tela "Choose a new password". O `verifyOtp` passa a usar o tipo do link (`invite` ou `recovery`).
3. **Link expirado ou usado.** Lê `error_code` do hash **antes** de o supabase-js limpar a URL e abre a visão `forgot` com "This link has expired or was already used…".
4. **Novos erros no `updateUser`**: `same_password` e `weak_password`.
5. **`main.tsx`:**
   - a flag `brandup-password-setup` passa de `'1'` para **`'invite'` ou `'recovery'`**;
   - **links de convite e recuperação abrem o admin mesmo sem `?admin=1`** (`isPasswordLink` entra em `isAdminRoute`). Com isso, esses links deixam de passar pelo `captureAttribution` e o token não vai mais para o `landing_page`.
6. CSS `.admin-form-success` e `.admin-link-button`. Textos de convite e recuperação diferenciados em todas as telas, mais um link "Back to sign in" com `href="/?admin=1"`.

**Merge com a `main`** (simulado com `git merge-tree`, nada gravado):
- `src/main.tsx` **mescla sozinho**. O resultado mantém `/thank-you`, `/privacy` e o `captureAttribution` e acrescenta o `isPasswordLink`. Conferi o arquivo resultante.
- `src/AdminPage.tsx` **conflita** em 2 blocos, porque a `main` trocou a tabela inline pelo `LeadBoard`.

**Armadilha.** Os dois arquivos são acoplados. Se o conflito do `AdminPage.tsx` for resolvido "ficando com a `main`" e o `main.tsx` mesclado entrar, o `main.tsx` grava `'invite'`/`'recovery'` enquanto o `AdminPage` da `main` compara `=== '1'` (`AdminPage.tsx:29`, `94`, `119`). O resultado é que links com `#access_token` deixam de abrir a tela de senha, e o usuário convidado fica sem senha definida.
- **Resolução correta:** a lógica de senha vem da branch, o corpo do painel vem da `main` (`<LeadBoard …/>`, `loadDashboard` paginado e `updateLeadStatus` com `.select().single()`).

**Dependências externas** (não verificadas):
- `…/?admin=1` precisa estar em **Auth → Redirect URLs** do Supabase.
- O template de e-mail "Reset password" precisa gerar `token_hash` com `type=recovery`, ou o fluxo implícito com `#access_token`.

**Como verificar depois do merge:**
1. Peça o reset e confira que o e-mail chega.
2. O link abre "Choose a new password".
3. Salve a senha: o painel abre.
4. Um link reaberto mostra "expired" e o formulário de reset.
5. O convite continua funcionando.

---

## 9. Contrato com o protótipo (`src/proto/Proto.tsx`, `src/proto/content.ts`)

**Estado atual do protótipo.**
- O formulário é **só visual** (`Proto.tsx:227`): não envia nada e não importa o Supabase.
- `onSubmit` (`:264-271`) valida, simula 900 ms e mostra "Prototype: nothing was sent." (`content.ts:31`).
- **Dois formulários** na mesma página: `<LeadForm id="diagnostic">` (`Proto.tsx:57`) e `<LeadForm id="final-form" compact>` (`:85`).

### 9.1 Campos

| Campo | Protótipo | Site atual / banco | Situação |
|---|---|---|---|
| name | `content.ts:36`, mínimo 2 (`Proto.tsx:232`) | CHECK 2–120 | Falta `maxLength` 120 |
| company | `:37`, mínimo 2 | CHECK 2–160 | Falta `maxLength` 160 |
| email | `:38`, regex `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$` (`Proto.tsx:233`) | CHECK 5–320; `App` grava em minúsculas | Falta `maxLength` 320 e o minúsculo no envio |
| phone | `:39`, prefixo visual `+61` (`Proto.tsx:289`); valida **só celular AU**: remove não dígitos, `61` e `0` iniciais e exige `^4\d{8}$` (`Proto.tsx:234-238`) | CHECK 6–30, formato livre hoje | É preciso definir o formato gravado (o plano diz E.164 `+614…`). Telefone fixo é rejeitado (decisão pendente do dono). Falta `maxLength` |
| revenue | radios `name="${id}-revenue"` (`Proto.tsx:308`) | coluna `monthly_revenue` | **O nome do campo não é `revenue`.** Um `FormData.get('revenue')` viria `null`. O envio tem de ler do estado React (`values.revenue`) |
| website (honeypot) | **não existe** | `App.tsx:482-490` | **Falta nos dois formulários** |

**As 4 faixas** (`content.ts:41-50`) foram conferidas caractere a caractere contra o CHECK (`create_leads.sql:10-13`) e contra o `revenueGrade` (`leadboard.ts:15-18`). **São idênticas:**
- rótulo `Up to $30K` → valor `'Up to AUD 30k'`
- `$30K–$80K` → `'AUD 30k to AUD 80k'`
- `$80K–$150K` → `'AUD 80k to AUD 150k'`
- `Over $150K` → `'Above AUD 150k'`

Só o rótulo muda, e o comentário em `content.ts:44` amarra os dois lados. Com isso, os leads antigos e os novos ficam na mesma régua A/B/C, e não é preciso migration.

### 9.2 O que o protótipo precisa ter antes de ser ligado

1. **`captureAttribution()` em `src/proto/main.tsx`**, fora da rota admin. Sem isso, todo lead novo chega sem origem e os links e QRs já distribuídos (que apontam para `/`) param de contar.
2. **Insert igual ao do `App.tsx:246-256`:**
   - mesmos campos, trim e minúsculas;
   - `source: 'brandupadvisory.com'` e `status: 'new'` (exigidos pelo RLS);
   - `meta_event_id`;
   - `...readAttribution()`;
   - **sem `.select()`**.
3. **Honeypot `website`** em cada formulário, escondido, com `tabIndex=-1`, `aria-hidden` e `autocomplete=off`.
4. **Guarda de duplo envio com ref.** Hoje só existe `status==='sending'` desabilitando o botão. Como são dois formulários, a guarda precisa ser **por módulo**, para que um envio no formulário 1 bloqueie o formulário 2 enquanto o primeiro está pendente.
5. **Estado de erro de rede**, com os valores mantidos. Hoje só existem `idle`, `sending` e `done`.
6. **Sucesso:** `markLeadConfirmed(eventId)` e depois `location.assign('/thank-you')`. A nota "Prototype: nothing was sent." sai.
7. **`maxLength`** igual aos CHECKs: 120, 160, 320 e 30 para o telefone.
8. **Pixel** no HTML da landing, com o mesmo guard. O HTML de `/thank-you` também precisa do Pixel, porque `trackConfirmedLead` depende de `window.fbq`.
9. **`/privacy`** continua existindo. O link do formulário aponta para ela (`Proto.tsx:322`).
10. O id `diagnostic` fica no 1º formulário, para não quebrar âncoras antigas.

### 9.3 O plano (`docs/redesign/plano-producao.md`) cobre tudo?

**Já cobre:**
- duas cascas (MPA) e `staticRoutes` com admin (`:13-26`);
- `lazy()` e `/admin` no `isAdminRoute` (`:27-30`);
- `captureAttribution` no `proto/main.tsx` (`:31`);
- `replaceState` em `AdminPage.tsx:225` (`:32`);
- `submitLead` com os mesmos campos, sem `.select()` (`:37`);
- idempotência por `id` com `23505` tratado como sucesso (`:38`);
- timeout de 12 s e guarda dupla por formulário e módulo (`:40-42`);
- honeypot (`:43`), sucesso (`:44`), `maxLength` de name, company e email (`:46`);
- E.164 (`:49`);
- expand/contract das faixas (`:52-58`) e testes das faixas contra o CHECK (`:59-61`);
- `trackConfirmedLead` mantido (`:66`);
- verificação do Pixel e do admin sem `fbevents.js` (`:90`, `:97`);
- `lint` e `test` no workflow (`:102`);
- RLS: `source` e `status` fixos, sem `.select()` (`:9`).

**Falta no plano:**
1. **A branch `feature/admin-password-recovery`** não aparece. Ela precisa entrar **antes** da troca, ou junto, com o conflito resolvido como no §8. Também é preciso trocar os `/?admin=1` dela (`redirectTo` e "Back to sign in") pela rota nova.
2. **Configuração do Supabase Auth.** O plano não fala em Site URL, Redirect URLs nem templates de convite e reset. Se o admin for para `/admin/`, a URL nova tem de entrar na allowlist de redirect, e os templates têm de apontar para ela.
3. **Guard do Pixel por caminho.** O plano manda o `index.html` atual virar `app.html`, que também serve `/admin/`. O guard atual só olha `?admin=1` e `#/admin`, então **`/admin/` sem query carregaria o Pixel no painel.** É preciso acrescentar `location.pathname.startsWith('/admin')` e excluir os links com token (`type=invite|recovery`, `token_hash`, `access_token`). A mesma correção vale para o redirecionamento no `<head>` da landing: o desvio tem de rodar **antes** do Pixel.
4. **O teste 9 (Pixel) lê o 1º `<script>` de `index.html`.** Depois da troca, o `index.html` é o protótipo, cujo 1º `<script>` bare é o da intro (`proto.html:37`), e o teste passaria a medir a coisa errada ou a falhar. Ele tem de testar o Pixel de **cada** casca (`index.html` e `app.html`) com casos de `/admin/` e de token.
5. **Script de teste.** `"test": "node --test tests/"` falha no Node 22 (verificado). Use `node --test 'tests/*.test.mjs'`.
6. **`maxLength` do telefone** (30) e normalização: o plano lista só name, company e email.
7. **Nome dos radios de faturamento** (`${id}-revenue`): o `submitLead` não pode depender de `FormData.get('revenue')`.
8. **Variáveis CSS do admin.** O plano move o `index.css` para o AdminPage, mas ThankYou e Privacy (`StaticPage.css`) também usam `--bg`, `--text`, `--text-strong` e `--aqua`. Se forem para os tokens da v4 sem o `index.css`, perdem as cores.
9. **Textos de restaurante** no fluxo que fica: "talk about your restaurant" (`ThankYou.tsx:16`), o título restaurado no cleanup do admin (`AdminPage.tsx:127`) e a meta description do `index.html` atual, que vira `app.html`.
10. **Allowlist de admins** fixa no trigger. Não muda com a troca, mas o plano poderia registrar como se convida um admin novo (§6.3).
11. **Teste do `submitLead`** contra o contrato: campos, `source`, `status`, honeypot sem marca, sem `.select()` e as faixas. O plano fala do teste das faixas, mas não do payload.

---

## 10. CHECKLIST de preservação (dia da troca)

**Antes**
- [ ] `feature/admin-password-recovery` mesclada na `main`, com o conflito do `AdminPage.tsx` resolvido assim: senha vinda da branch, painel vindo da `main`, flag `invite`/`recovery` coerente entre `main.tsx` e `AdminPage.tsx`.
- [ ] Supabase Auth: a rota nova do admin (ex.: `https://brandupadvisory.com/admin/`) incluída em Redirect URLs. Templates de convite e reset apontando para ela. Site URL conferido.
- [ ] Migrations `20261101120000` e `20261101130000` aplicadas em produção (o admin mostra a coluna de origem sem erro).
- [ ] O nome real do CHECK de `monthly_revenue` anotado, se houver plano de faixas novas.
- [ ] `npm test` definido com glob e verde, mais `tsc -b`, `lint` e `build`. O workflow roda `lint` e `test`.

**Formulário da landing (para cada um dos 2)**
- [ ] Payload: `name`, `email` (minúsculas), `phone` (formato decidido), `company`, `monthly_revenue` (uma das 4 strings exatas), `source='brandupadvisory.com'`, `status='new'`, `meta_event_id` e `...readAttribution()`. Sem `.select()`.
- [ ] Honeypot `website` presente. Quando preenchido, não grava e não marca conversão.
- [ ] Duplo clique e envio simultâneo nos 2 formulários geram **1** lead.
- [ ] Erro de rede mantém os valores e mostra a mensagem.
- [ ] Sucesso faz `markLeadConfirmed` e vai para `/thank-you`.
- [ ] `maxLength` 120, 160, 320 e 30.
- [ ] O 1º formulário mantém `id="diagnostic"`.

**Atribuição e links**
- [ ] `captureAttribution()` roda na landing e não roda no admin.
- [ ] `/?s=meta&c=qa` → recarregar → enviar: canal Meta, campanha `qa` e medium `paid` no LeadBoard.
- [ ] Um link salvo antigo (`link_id`) aberto na landing nova soma 1 na aba Links.

**Pixel**
- [ ] Um único Pixel por página. PageView em `/` e `/thank-you`.
- [ ] Nenhum `fbevents.js` em `/admin/`, `/?admin=1`, `/#/admin` nem em links com `token_hash` ou `access_token`.
- [ ] `/thank-you` aberta direto ou recarregada: nenhum `Lead`. Depois de um envio real: um `Lead` com `eventID` igual ao `meta_event_id` do banco.

**Admin**
- [ ] `/?admin=1` e `/#/admin` (link antigo nos favoritos) chegam ao painel. A rota nova também.
- [ ] Login com os 4 erros mapeados, carga de leads, mudança de etapa que persiste e sair.
- [ ] Convite novo leva à tela de senha e depois ao painel. Reset de senha funciona. Um link expirado mostra a mensagem.
- [ ] Abas e `?view=`, filtros, faixas A/B/C (os leads antigos continuam classificados), atenção a partir de 5 min, CSV (abrir no Excel e testar um nome `=1+1`) e Links (criar, copiar e arquivar).
- [ ] Polling de 60 s com a aba visível.

**Depois**
- [ ] Lead de teste arquivado (o RLS impede marcá-lo pelo `source`).
- [ ] `App.tsx` mantido no repositório por 1 a 2 semanas, para o rollback por `git revert`.

---

## 11. Riscos

| Risco | Efeito | Mitigação |
|---|---|---|
| Rota do admin muda para `/admin/` | Convites e resets antigos (`/?admin=1`, `?token_hash=…`) caem na landing; Supabase recusa o redirect | Desvio no `<head>` da landing preservando search e hash; allowlist de redirect e templates atualizados; aceitar as 3 formas |
| Pixel duplicado ou no lugar errado | PageView dobrado; `fbevents.js` no admin; token enviado ao Meta | Um Pixel por casca; guard por `pathname` e por token; teste 9 reescrito para as duas cascas |
| `trackConfirmedLead` sem `fbq` em `/thank-you` | Conversões somem no Meta (o lead continua no banco) | A casca de `/thank-you` mantém o Pixel |
| Strings de faixa | Faixa nova sem migration: **todo envio falha no CHECK**. Faixa nova sem `revenueGrade`: leads como "Sem classificação" | Migration primeiro (expand com `not valid` + `validate`), depois o front; teste que liga `content.ts` ao CHECK e ao `revenueGrade`; nunca contract (leads antigos) |
| Formato do telefone | Antigos em formato livre, novos em E.164; busca por "04…" não acha "+614…" | Aceito; registrar no LeadBoard ou normalizar na busca depois |
| Atribuição esquecida na landing | Leads sem origem; links e QRs param de contar | Item 1 de §9.2; smoke com link salvo |
| Merge da branch de recuperação malfeito | Flag `'1'` × `'invite'` faz o convite cair sem tela de senha | §8; teste manual de convite e reset |
| Supabase no caminho do pré-render | `throw` em `supabase.ts:6-8` derruba o pré-render ou o LCP | `import()` dinâmico no envio (plano, problema B) |
| Spam | Hoje só existe o honeypot; o anon insere à vontade (inclusive `created_at`) | Igual a hoje; avaliar rate limit ou captcha só se aparecer abuso |
| Carga completa a cada 60 s | O(n) por aba; OFFSET pode duplicar linha acima de 1000 leads | Igual a hoje; keyset quando o volume justificar |

---

## Resumo

- A captura é um insert anon sem `.select()`. O RLS fixa `source` e `status`, e o CHECK aceita só as 4 faixas.
- O admin tem login, convite, painel, etapas, filtros, CSV seguro e links imutáveis. Os 15 testes cobrem a lógica pura (verde no Node 22).
- As 4 faixas do protótipo são idênticas ao CHECK e ao `revenueGrade`. Não é preciso migration e os leads antigos continuam classificados.
- O protótipo ainda não tem `captureAttribution`, honeypot, guarda por ref, estado de erro, `maxLength`, Pixel nem o envio. Os radios se chamam `${id}-revenue`.
- A branch `feature/admin-password-recovery` (reset de senha) está 7 commits atrás da `main` e conflita no `AdminPage.tsx`. A flag `'1'` × `'invite'/'recovery'` é a armadilha.
- Faltam no plano:
  - a branch de recuperação de senha;
  - a configuração de redirect e templates do Supabase Auth;
  - o guard do Pixel por `pathname` e token;
  - a reescrita do teste do Pixel;
  - o script de teste (`node --test tests/` falha);
  - o `maxLength` do telefone e o nome dos radios;
  - o CSS das páginas estáticas.
