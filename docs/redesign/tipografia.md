# BrandUp — tipografia do redesign (mock no Figma)

Autor: type-director · 08/11/2026
Para: `figma-architect` (usa os papéis na página `Foundations` → coleção `Type`), `frontend-studio` (tokens prontos para `src/index.css`).
Base: `docs/redesign/brief-direcao.md` §6.2 e §4, `src/index.css`, `src/App.css`.

---

## 1. Decisão sobre o gancho (a pergunta do brief)

**Medido, não estimado.** Renderizei o H1 real ("How industrial and B2B companies are generating over $250K per month within 90 days by investing in automation and AI.", 118 caracteres) em Montserrat 900 caixa alta, dentro das colunas reais do grid do brief, com Playwright/Chromium:

| Breakpoint | Coluna | Montserrat 900 | Resultado |
|---|---|---|---|
| 390 (margem 16 px, conforme pedido) | 358 px | 30 px / lh 1,1 | **8 linhas**, 264 px de altura |
| 1440 (cols 2–11) | 1076 px | 52 px / lh 1,08 | **4 linhas**, 225 px de altura |

O brief pedia 5 linhas a 390 e 3 linhas a 1440 (ver o esquema ASCII do §5.2). A Montserrat fica larga demais nos dois tamanhos: confirma a suspeita do `ui-ux-director`.

**Troquei só o papel `display.hook` para Barlow Condensed** (OFL, Google Fonts, mesmo gênero grotesco geométrico da Montserrat — não é B3/choque de famílias, é um companheiro condensado para um papel só). Medido com o mesmo texto, mesmas colunas:

| Breakpoint | Barlow Condensed 800 | Resultado |
|---|---|---|
| 390 | 30 px / lh 1,1 | **5 linhas**, 165 px — bate exato com o esquema do brief |
| 1440 | 52 px / lh 1,08 | **3 linhas**, 168 px — bate exato com o esquema do brief |

`display.section`, `body.*` e `numeral.stat` **continuam em Montserrat** (identidade do anúncio e do site no ar). Só o cartaz comercial do hero muda de corte. Testei também Archivo (eixo de largura ignorado pelo Google Fonts estático, resultado idêntico à Montserrat — descartado) e Big Shoulders (6 linhas a 390, não bate com o esquema — descartado).

Scripts e capturas de medição ficaram no scratchpad da sessão (não fazem parte do entregável); o espécime final com o texto real está em `docs/redesign/especime-tipo.html`.

---

## 2. Tabela de papéis

| Papel | Família | Peso | 390 → 1440 (`clamp()`) | Entrelinha | Tracking | Caixa | Licença |
|---|---|---|---|---|---|---|---|
| `display.hook` | Barlow Condensed | 800 (ExtraBold) | `clamp(1.875rem, 1.3643rem + 2.0952vw, 3.25rem)` → 30 px / 52 px | 1,1 → 1,08 | −1% → −2% | ALTA (destaque "OVER $250K PER MONTH" em `brand.500`, mesma família/peso) | OFL 1.1 — [Google Fonts](https://fonts.google.com/specimen/Barlow+Condensed) |
| `display.section` | Montserrat | 500 (texto) / 700 (`<strong>`) | `clamp(1.875rem, 1.55rem + 1.3333vw, 2.75rem)` → 30 px / 44 px | 1,15 → 1,1 | −0,5% | Normal | OFL 1.1 — [Google Fonts](https://fonts.google.com/specimen/Montserrat) |
| `body.lead` | Montserrat | 400 | `clamp(1.125rem, 1.0786rem + 0.1905vw, 1.25rem)` → 18 px / 20 px | 1,5 | 0 | Normal | OFL 1.1 |
| `body` | Montserrat | 400 | 1,0625rem fixo → 17 px nos dois extremos | 1,55 | 0 | Normal | OFL 1.1 |
| `small` | Montserrat | 400 | 0,875rem fixo → 14 px nos dois extremos (piso: ver §4) | 1,45 | 0 | Normal | OFL 1.1 |
| `mono.data` (rótulo, ex. "YOUR FOLLOW-UP") | Geist Mono | 500 | `clamp(0.6875rem, 0.6643rem + 0.0952vw, 0.75rem)` → 11 px / 12 px | 1,3 | +0,07em a +0,08em | CAIXA ALTA | OFL 1.1 — [Google Fonts](https://fonts.google.com/specimen/Geist+Mono) |
| `mono.data` (dado, ex. hora/valor) | Geist Mono | 500/600 | `clamp(0.75rem, 0.7268rem + 0.0952vw, 0.8125rem)` → 12 px / 13 px | 1,3 | +0,06em | CAIXA ALTA (algarismos não têm caixa) | OFL 1.1 |
| `numeral.stat` | Montserrat | 800 (ExtraBold) | `clamp(1.75rem, 1.4714rem + 1.1429vw, 2.5rem)` → 28 px / 40 px | 1 | 0 | Normal | OFL 1.1 |

Razão: o brief já fixou os tamanhos por papel (não é escala modular livre); o trabalho aqui foi 1) confirmar que `display.hook` precisava de família diferente, 2) escrever os `clamp()` fluidos entre 390 e 1440 batendo exatamente nos px dos dois extremos, 3) escolher a família mono e revisar a licença de todas.

**Soma de famílias: 3** (Barlow Condensed, Montserrat, Geist Mono) — dentro do limite do repertório. Cada uma com papel único: hook / tudo o mais em prosa e número / dado técnico.

---

## 3. Licenças (verificadas em 08/11/2026)

| Família | Licença | Fonte | Uso web | Observação |
|---|---|---|---|---|
| Montserrat | SIL Open Font License 1.1 | [fonts.google.com/specimen/Montserrat](https://fonts.google.com/specimen/Montserrat) | Livre, sem atribuição obrigatória | Já em produção (`src/index.css`); mantida como a família de identidade do anúncio. |
| Barlow Condensed | SIL Open Font License 1.1 | [fonts.google.com/specimen/Barlow+Condensed](https://fonts.google.com/specimen/Barlow+Condensed) | Livre, sem atribuição obrigatória | Família nova, só para `display.hook`. Design de Jeremy Tribby/Tyler Finck, mesma superfamília grotesca-geométrica de registro próximo ao da Montserrat (evita choque B3). |
| Geist Mono | SIL Open Font License 1.1 | [fonts.google.com/specimen/Geist+Mono](https://fonts.google.com/specimen/Geist+Mono) | Livre, sem atribuição obrigatória | Mono tabular por natureza (largura fixa = números alinhados sem precisar de `tnum`). A versão Google Fonts não traz o eixo variável nem todos os `font-feature-settings` do pacote oficial da Vercel; para este projeto (textos curtos, caixa alta, sem código) isso não importa. |

Nenhuma das três exige compra nem é a referência comercial do repertório (Helvetica Now etc.) — todas existem como OFL no Google Fonts, prontas para o `figma-architect` usar na biblioteca do arquivo.

---

## 4. Contraste × tamanho (verificação pedida no §6.2)

`text.3` (`#8A8494`) sobre `ink.900` mede 5,4:1 (dado no brief). Em 13–14 px (`small`), isso fica **abaixo do piso recomendado de Lc 60 do APCA** para texto lido continuamente — é aceitável só porque `small` nesta peça carrega metadado curto (legenda, rótulo de privacidade), nunca parágrafo. Onde `small` tiver mais de uma linha de leitura (ex. a nota de privacidade do formulário), usar `text.2` (9,4:1) em vez de `text.3`. Marquei essa troca no espécime: a legenda de privacidade está em `text.2`, não `text.3`.

`mono.data` nunca desce de 11 px e sempre em caixa alta — a cap-height compensa o tamanho pequeno, conforme a regra do piso de 13 px (exceção explícita para rótulo em caixa alta).

---

## 5. Tokens — CSS custom properties

```css
/* src/index.css — adicionar junto aos tokens de cor existentes */
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@800&family=Montserrat:wght@400;500;700;800&family=Geist+Mono:wght@500;600&display=swap');

:root {
  /* famílias */
  --font-display: 'Barlow Condensed', 'Montserrat', system-ui, sans-serif;
  --font-base: 'Montserrat', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'Geist Mono', 'SFMono-Regular', ui-monospace, monospace;

  /* display.hook */
  --fs-display-hook: clamp(1.875rem, 1.3643rem + 2.0952vw, 3.25rem);
  --lh-display-hook: 1.1;      /* 1.08 em telas ≥ 1024, ver media query abaixo */
  --ls-display-hook: -0.01em;  /* -0.02em em telas ≥ 1024 */

  /* display.section */
  --fs-display-section: clamp(1.875rem, 1.55rem + 1.3333vw, 2.75rem);
  --lh-display-section: 1.15;  /* 1.1 em telas ≥ 1024 */

  /* corpo */
  --fs-body-lead: clamp(1.125rem, 1.0786rem + 0.1905vw, 1.25rem);
  --fs-body: 1.0625rem;   /* 17px, fixo */
  --fs-small: 0.875rem;   /* 14px, fixo */

  /* mono.data */
  --fs-mono-label: clamp(0.6875rem, 0.6643rem + 0.0952vw, 0.75rem);
  --fs-mono-data: clamp(0.75rem, 0.7268rem + 0.0952vw, 0.8125rem);
  --ls-mono: 0.07em;

  /* numeral.stat */
  --fs-numeral: clamp(1.75rem, 1.4714rem + 1.1429vw, 2.5rem);
}

@media (min-width: 1024px) {
  :root {
    --lh-display-hook: 1.08;
    --ls-display-hook: -0.02em;
    --lh-display-section: 1.1;
  }
}

h1.hook {
  font-family: var(--font-display);
  font-weight: 800;
  font-size: var(--fs-display-hook);
  line-height: var(--lh-display-hook);
  letter-spacing: var(--ls-display-hook);
  text-transform: uppercase;
}

h2.section-title {
  font-family: var(--font-base);
  font-weight: 500;
  font-size: var(--fs-display-section);
  line-height: var(--lh-display-section);
}
h2.section-title strong { font-weight: 700; }

.numeral {
  font-family: var(--font-base);
  font-weight: 800;
  font-size: var(--fs-numeral);
  line-height: 1;
  font-variant-numeric: tabular-nums;
  font-feature-settings: 'tnum' 1;
}

.mono-label {
  font-family: var(--font-mono);
  font-size: var(--fs-mono-label);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: var(--ls-mono);
}

.mono-data {
  font-family: var(--font-mono);
  font-size: var(--fs-mono-data);
  font-weight: 500;
  font-variant-numeric: tabular-nums;
}
```

### Trecho equivalente para `tailwind.config` (se o projeto adotar Tailwind no redesign)

```js
// tailwind.config.js — extend.fontFamily / fontSize
fontFamily: {
  display: ['"Barlow Condensed"', '"Montserrat"', 'system-ui', 'sans-serif'],
  base: ['Montserrat', 'system-ui', 'sans-serif'],
  mono: ['"Geist Mono"', 'ui-monospace', 'monospace'],
},
fontSize: {
  'display-hook': ['clamp(1.875rem, 1.3643rem + 2.0952vw, 3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
  'display-section': ['clamp(1.875rem, 1.55rem + 1.3333vw, 2.75rem)', { lineHeight: '1.15' }],
  'body-lead': ['clamp(1.125rem, 1.0786rem + 0.1905vw, 1.25rem)', { lineHeight: '1.5' }],
  body: ['1.0625rem', { lineHeight: '1.55' }],
  small: ['0.875rem', { lineHeight: '1.45' }],
  'mono-label': ['clamp(0.6875rem, 0.6643rem + 0.0952vw, 0.75rem)', { lineHeight: '1.3', letterSpacing: '0.07em' }],
  'mono-data': ['clamp(0.75rem, 0.7268rem + 0.0952vw, 0.8125rem)', { lineHeight: '1.3', letterSpacing: '0.06em' }],
  numeral: ['clamp(1.75rem, 1.4714rem + 1.1429vw, 2.5rem)', { lineHeight: '1' }],
},
```

**Nota ao `figma-architect`**: no Figma, criar a coleção `Type` com um modo só (não há tema claro definido no §4 do brief — o produto é escuro em toda a peça); cada papel acima vira um "Text style" com os dois extremos documentados na descrição do estilo, já que o Figma não tem `clamp()` nativo (os frames `Desktop 1440` e `Mobile 390` usam os valores de cada extremo).

---

## 6. Espécime

`docs/redesign/especime-tipo.html` — autocontido, carrega as 3 famílias do Google Fonts, mostra todos os papéis com o texto real do `copy.md` (gancho, H2, subcopy, rótulos de mesa, chips mono de status, números do hero) mais um bloco pt-BR (acentuação, aspas, travessão, `hyphens: auto`) só como prova de robustez de idioma do conjunto de glifos — **o site é 100% inglês australiano**, então esse bloco não entra na peça, é checagem de engenharia tipográfica.

Fotografado com Playwright em chromium e webkit, 390 e 1440, com `document.fonts.check()` confirmando as 3 famílias carregadas antes da captura:

- `docs/redesign/especime-chromium-390-dark.png` — hook em **5 linhas**, bate com o esquema do brief.
- `docs/redesign/especime-chromium-1440-dark.png` — hook em **3 linhas**, bate com o esquema do brief.
- `docs/redesign/especime-webkit-390-dark.png` / `especime-webkit-1440-dark.png` — idêntico ao Chromium (fontes OFL, sem fallback diferente no WebKit).

Não fotografei "claro": o brief (§4) não define tokens de tema claro — a peça inteira é escura (`ink.950`). Um teste inicial com um toggle de fundo claro mostrou que `text-1`/`text-2`/`accent` não têm par definido para fundo claro (ex. números e `<strong>` brancos somem); isso é esperado e correto dentro do escopo atual, não um bug do tipo.

---

## 7. Por que esta voz (códigos do repertório)

- **B2 (display contido)** é o registro geral: nada de escala extrema (B1 foi descartado no próprio brief, §3.2), um H2 moderado 400/500, só o gancho sobe de peso.
- **"Mono como dado" (padrão PR/ME do repertório)**: Geist Mono só em hora, rótulo de mesa, valor em AUD e status — nunca em título ou corpo. Seguido à risca: 11–14 px, caixa alta, tracking +0,06–0,08em, tabular por natureza do monoespaçado.
- **Peso 400/500 fora do display**: `display.section` e `body` não saem de 400/500/700, conforme a regra "anti-slop" do dono (peso 700 só no `<strong>` dentro do H2, nunca o parágrafo inteiro).
- **Descartado**: B3 (choque de famílias) — Barlow Condensed e Montserrat são do mesmo gênero (grotesco geométrico de baixo contraste), então a troca de família no hook não lê como "choque", é um corte mais estreito do mesmo registro. B6/B7 (elemento dentro do título / frase editável) seguem descartados como no brief: o hook é só texto, lido de uma vez.

---

## 8. Custo (medido, não estimado)

Baixei os arquivos `.woff2` reais do Google Fonts (subset **latin**, sem `latin-ext` — a peça é 100% inglês australiano, então `latin-ext` não se paga):

| Arquivo | Peso | KB (woff2, latin) |
|---|---|---|
| Montserrat 400 | body | 19,6 |
| Montserrat 500 | display.section | 19,7 |
| Montserrat 700 | `<strong>` do H2 | 19,8 |
| Montserrat 800 | numeral.stat | 20,0 |
| Barlow Condensed 800 | display.hook | 14,4 |
| Geist Mono 500 | mono.data | 12,6 |
| Geist Mono 600 | mono.data (ênfase, ex. `status.error`) | 12,7 |
| **Total (7 arquivos estáticos)** | | **118,8 KB** |

Comparado ao que uma importação ingênua traria (5 pesos de Montserrat incluindo o 900 que não é mais usado fora do hook, + `latin-ext` desnecessário): **506,5 KB**. A composição acima — sem Montserrat 900 (o brief tira o 900 do H2, §6.2: "pesos 400/500, sem 900 fora do gancho") e sem `latin-ext` — corta o peso em ~77%.

**`font-display: swap`** em todas; **preload** só do arquivo que cobre o LCP (`Barlow Condensed 800`, porque o H1 é o LCP conforme §6.4 do brief — ele é texto do servidor, sem reveal). Nenhuma das três tem eixo variável útil exposto pelo Google Fonts (Geist Mono tem eixo de peso no pacote oficial da Vercel, mas a entrega via Google Fonts já vem em instâncias estáticas: carregar só 500 e 600 é mais leve que baixar um variável cobrindo 100–900 que não será usado).

**Risco de CLS**: baixo — os 3 pesos novos (Barlow Condensed, Geist Mono) entram como `@font-face` com `font-display: swap`; o `size-adjust`/`ascent-override` do fallback (`system-ui`) ainda não foi medido pixel a pixel (pendência para o `frontend-studio`, que tem as métricas de x-height das três famílias disponíveis via `fontmetrics.app` ou cálculo direto do `.ttf`). Como o H1 é o maior bloco de texto na dobra, um fallback mal ajustado pode reescalar ~5–8% a altura da linha — a medir na implementação real, não aqui no mock estático.

---

## 9. Pendências / devoluções

- Nenhum texto do `copy.md` estourou a medida nos papéis acima — o gancho de 118 caracteres cabe em 5/3 linhas como o brief queria, com a família nova.
- Ainda pendente do `copy-director` (não é deste agente resolver): a subcopy de 240 caracteres do hero mede **6 linhas** em `body.lead` (18 px, 358 px de coluna) a 390 — confirma que a versão ≤140 caracteres pedida no §6.3 do brief continua necessária para não empurrar o CTA para baixo da dobra do Instagram.
