# BrandUp v3: tipografia

Autor: type-director · 08/11/2026 · responde ao §7.1 do `brief-v3.md` · substitui `tipografia.md` (v2: Barlow Condensed + Montserrat + Geist Mono, condenado no §1, sinais #1 e #4).

**Sistema: Archivo (gancho e títulos, em dois cortes estáticos) + Source Serif 4 (todo o resto). 2 famílias, 0 mono, ambas OFL 1.1.**

## 1. A decisão, medida

### 1.1 Libre Franklin 700 (o sorteio da skill): vetada por largura
Medi as larguras de avanço com fontTools (sem kerning, tracking −0,03em) para "OVER $250K PER MONTH" (20 caracteres):

| Candidata (OFL) | Largura da linha 1 | Maior corpo que cabe em 856 px | Em 350 px |
|---|---|---|---|
| Libre Franklin 700 | 12,93 em | **69 px** | 28 px |
| **Archivo wdth 62,5 (ExtraCondensed) 800** | 8,64 em | **106 px** | 43 px |
| Archivo wdth 75 (SemiCondensed) 700 | 9,81 em | 93 px | 38 px |
| Sofia Sans Extra Condensed 800 | 7,64 em | 122 px | 50 px |
| Big Shoulders Display 800 | 8,47 em | 109 px | 44 px |

Libre Franklin não chega a 104 px (dá 69) nem a 36 px em 350 (dá 28). O próprio brief pede que, se ela não couber, eu ache "na mesma linhagem" uma com corte condensado ou eixo de largura. É o caso do **Archivo** (Omnibus-Type), uma grotesca desenhada a partir das góticas americanas do fim do século XIX, a mesma família de origem da Franklin Gothic, com **eixo de largura de 62,5 a 125**. Descartei a Sofia Sans Extra Condensed: é a mais estreita, mas os terminais humanistas e arredondados leem como "app amigável", e não como placa de fábrica. Descartei a Big Shoulders também: ela é sinalização de Chicago de verdade, só que as curvas quadradas puxam para game e esporte, justamente o registro que o brief proíbe (anúncio esportivo).

### 1.2 Source Serif 4 no corpo: aprovada (não vetei)
Ela tem `tnum`, `lnum`, `onum`, `case` e `frac` (conferi a tabela GSUB). Os algarismos tabulares lining substituem a mono em hora, A$ e contagem, e o espécime prova o alinhamento na coluna de horas do tour e na ficha da ordem de serviço. A 17–19 px com eixo óptico fixado em 20, a textura é de relatório impresso e de cotação, o oposto da sans de SaaS de IA. Para o idioma: o glifo `$` e a vírgula de milhar estão corretos nos dois motores.

### 1.3 Teste de quebra (Playwright 1.61, servido em HTTP, as 5 faces confirmadas com `document.fonts.load` + `check` = true e presentes na lista `loaded`)
Resultados **idênticos em chromium e webkit**:

| Texto | Viewport · coluna | Corpo | Linhas | Largura usada por linha |
|---|---|---|---|---|
| Gancho B "OVER $250K PER MONTH WITHIN 90 DAYS." | 1440 · eixo 512→1368 (856) | 106 px | **2** | 840 / 563 (sobram 16 px) |
| Gancho B | 390 · 20→370 (350) | 40 px | **2** | 317 / 212 (sobram 33 px) |
| Variante A (118 car.) | 1440 · 856 | 106 px | **7** | — |
| Variante A | 1440 · 856, ajustada para 3 linhas | **56 px** no máximo | 3 | — |
| Variante A | 1440 · largura toda 72→1368 (1296), 3 linhas | **86 px** no máximo | 3 | 1219 / 1279 / 1292 |
| Variante A | 390 · 350 | 40 px | **6** | — |
| Variante A | 390 · 350, ajustada para 3 linhas | **23 px** no máximo | 3 | — |

**Veredito da variante A:** ela não convive com a escala que tira o slop. Em 3 linhas, cai para 56 px no eixo (razão 2,9 sobre o corpo, a mesma doença do v2, que tinha 2,6) ou para 86 px se abandonar o eixo (quebra a composição). No celular, vira 6 linhas a 40 px, ou 23 px, que já é tamanho de corpo. O espécime fotografa as três versões para o dono decidir vendo. A recomendação é a B.

**Margem de segurança da B a 1440:** 16 px. Se o copy mudar a linha 1, o teto é **20 caracteres de largura parecida** (sem W/M extras); com "MONTH" já no limite, uma palavra a mais quebra. Não adicione `word-spacing`: os espaços estão estreitos por causa do tracking −0,035, mas +0,03em de palavra come 10 px da folga e deixa 6.

**Atenção ao implementar:** aberto via `file://`, o webkit **não aplicou** a fonte que tem `preload crossorigin` e caiu no fallback, enquanto `document.fonts.check` continuava respondendo true. A medida só vale servida em HTTP, e qualquer sonda deve usar `document.fonts.load(...)` e ler `[...document.fonts].filter(f => f.status === 'loaded')`, não só o `check`.

## 2. Tabela de papéis

Escala de marca: 5 tamanhos, como o brief pede. **Display ÷ corpo = 106 ÷ 19 = 5,6** a 1440 (o brief pede ≥ 5,5; o v2 tinha 2,6) e 40 ÷ 17 = 2,4 a 390 (no celular manda a largura, e o gancho de 20 caracteres em 350 px tem 43 px de teto físico). Fluido entre 390 e 1440.

| Papel | Família · arquivo | Peso | 390 | 1440 | `clamp()` | Entrelinha | Tracking | Caixa | Features |
|---|---|---|---|---|---|---|---|---|---|
| `display.hook` (H1) | Archivo ExtraCondensed (wdth 62,5) · `archivo-xc-800.woff2` | 800 | 40 | 106 | `clamp(2.5rem, 0.9679rem + 6.2857vw, 6.625rem)` | 0,90 | −0,035em | ALTA (via CSS) | `case`, `lnum`, `kern`; `text-wrap: balance`; sem hifenização; `margin-left: -0.04em` (óptico) |
| `display.section` (H2, faixa do FAQ, H2 do formulário) | Archivo SemiCondensed (wdth 75) · `archivo-sc-700.woff2` | 700 | 30 | 64 | `clamp(1.875rem, 1.0857rem + 3.238vw, 4rem)` | 0,95 | −0,015em | ALTA | `case`; `balance`; sem hifenização |
| `head.figure` (o "2" da placa roxa) | Archivo SC | 700 | 30 | 64 | = `--step-head` | 0,90 | 0 | — | `tnum lnum` |
| `ui.label` (plaquetas, botão, wordmark provisório) | Archivo SC | 700 | 18 | 18 | `1.125rem` fixo | 1,1 | 0 | Normal (frase) | — |
| `lead` (frase de apoio, texto do formulário) | Source Serif 4 · `sourceserif4-text-400.woff2` | 400 | 20 | 24 | `clamp(1.25rem, 1.157rem + 0.381vw, 1.5rem)` | 1,35 | −0,005em | Normal | `pretty`; ≤ 26ch |
| `body` (parágrafos, respostas do FAQ, About) | Source Serif 4 | 400 | 17 | 19 | `clamp(1.0625rem, 1.016rem + 0.19vw, 1.1875rem)` | 1,55 | 0 | Normal | `lnum pnum` por padrão; `hyphens: auto` com `lang="en-AU"`; 45–62ch (medido: 62 a 1440, 41 a 390) |
| `body.strong` (pergunta do FAQ, título da ordem de serviço) | Source Serif 4 · `sourceserif4-text-600.woff2` | 600 | 17–19 | 19 | = body | 1,3 | 0 | Normal | — |
| `data` (horas, A$, telefone, contagem) | Source Serif 4 | 400 | 16–19 | 16–19 | herda | herda | 0 | — | **`tnum lnum`** (substitui a mono) |
| `quote` (citação, só se houver real) | Source Serif 4 Italic · `sourceserif4-italic-400.woff2` | 400 itálico | 20 | 24 | = lead | 1,35 | 0 | Normal | aspas “ ” e ’ tipográficas; não precarregar |
| `small` (nota de uma linha, nome de estado, privacidade, ressalva) | Source Serif 4 | 400 | 15 | 15 | `0.9375rem` fixo | 1,45 | +0,005em | Normal | piso de 15 sobre o escuro; nunca em caixa alta |
| `nav` | Source Serif 4 | 400 | 16 | 16 | fixo | 1,2 | 0 | Normal | link "Diagnosis" sublinhado, 2 px, offset 4 px |

**Peso fora de 400/500 (justificativa escrita, como o ofício exige):** a regra 400/500 é do **app** do Tonho. Esta é uma landing com voz de impresso, e o brief pede gótica pesada: 800 no gancho e 700 nos títulos, os dois em caixa alta condensada, onde o peso é o que dá cara de placa. O corpo continua em 400; o 600 aparece só nas perguntas e no título da ordem de serviço.

**Caixa alta com tracking negativo:** a skill diz que caixa alta pede 0 a +0,03em, e o brief pede −0,02 a −0,035. Fico com o brief porque o corte é ExtraCondensed: os espaços laterais de fábrica são largos para 12 px, e a 106 px abrem buracos. A 64 px no corte de largura 75, uso −0,015, menos negativo, como manda a régua (o tracking aperta conforme o tamanho cresce).

**Limites para o copy-director (em caracteres, medidos):** H1 com até 2 × 20 caracteres em caixa alta. H2 a 64 px em 856 px: cerca de 26 caracteres por linha, ou seja, ≤ 52 em 2 linhas (o "≤ 56" do brief para o H2 do tour **não cabe**: "Every lead answered in minutes, never late." tem 43 e ocupa 2 linhas). H2 a 30 px em 350 px: cerca de 22 caracteres por linha, ≤ 44 em 2 linhas.

## 3. Contraste (APCA, calculado com a fórmula 0.0.98G sobre os tokens do §6.3)

| Par | Lc | Uso permitido |
|---|---|---|
| `text.1` / `ink.950` | −99 | qualquer tamanho |
| `text.1` / `brand.500` | −72 | corpo ≥ 18 px ou 16 px em 600; o lead e o H2 do formulário passam; o rótulo de campo de 16/400 fica no limite (aceitável para rótulo, não para parágrafo) |
| `text.2` / `ink.950` | −59 | **abaixo da régua de 60 a 15 px.** Peço ao ui-ux-director um degrau mais claro em `text.2` (a cor é dele) ou `small` em 16 px. Não mexi no token |
| `text.2` / `ink.900` | −59 | idem (nomes de estado no `data-ui`) |
| `status.attention` / `ink.900` | −70 | palavra de estado a 15 px, ok |
| `ink.950` / `accent.400` (botão) | 86 | ok |
| `ink.950` / `paper.100` | 94 | ok; nota secundária no papel em `#4A4552` (Lc 79) |

## 4. Tokens (colar no `:root` do v3; os nomes seguem os do brief §6.3)

```css
@font-face { font-family: "Archivo XC"; src: url("/fonts/archivo-xc-800.woff2") format("woff2"); font-weight: 800; font-display: swap; }
@font-face { font-family: "Archivo SC"; src: url("/fonts/archivo-sc-700.woff2") format("woff2"); font-weight: 700; font-display: swap; }
@font-face { font-family: "Source Serif 4"; src: url("/fonts/sourceserif4-text-400.woff2") format("woff2"); font-weight: 400; font-display: swap; }
@font-face { font-family: "Source Serif 4"; src: url("/fonts/sourceserif4-text-600.woff2") format("woff2"); font-weight: 600; font-display: swap; }
@font-face { font-family: "Source Serif 4"; src: url("/fonts/sourceserif4-italic-400.woff2") format("woff2"); font-weight: 400; font-style: italic; font-display: swap; }
/* fallbacks métricos (fontTools: larguras de avanço da amostra real + hhea) */
@font-face { font-family: "Archivo XC fallback"; src: local("Arial Narrow Bold"), local("ArialNarrow-Bold"); size-adjust: 85.1%; ascent-override: 103.2%; descent-override: 24.7%; line-gap-override: 0%; }
@font-face { font-family: "Archivo XC fallback 2"; src: local("Arial Bold"), local("Arial-BoldMT"); size-adjust: 69.8%; ascent-override: 125.8%; descent-override: 30.1%; line-gap-override: 0%; }
@font-face { font-family: "Source Serif 4 fallback"; src: local("Georgia"); size-adjust: 100.9%; ascent-override: 102.7%; descent-override: 33.2%; line-gap-override: 0%; }

:root {
  --font-hook: "Archivo XC", "Archivo XC fallback", "Archivo XC fallback 2", sans-serif;
  --font-head: "Archivo SC", "Archivo XC fallback 2", sans-serif;
  --font-text: "Source Serif 4", "Source Serif 4 fallback", Georgia, serif;

  --step-display: clamp(2.5rem, 0.9679rem + 6.2857vw, 6.625rem);   /* 40 → 106 */
  --step-head:    clamp(1.875rem, 1.0857rem + 3.238vw, 4rem);      /* 30 → 64 */
  --step-lead:    clamp(1.25rem, 1.157rem + 0.381vw, 1.5rem);      /* 20 → 24 */
  --step-body:    clamp(1.0625rem, 1.016rem + 0.19vw, 1.1875rem);  /* 17 → 19 */
  --step-small:   0.9375rem;                                       /* 15 */

  --lh-display: 0.9;  --lh-head: 0.95; --lh-lead: 1.35; --lh-body: 1.55; --lh-small: 1.45;
  --tr-display: -0.035em; --tr-head: -0.015em; --tr-lead: -0.005em; --tr-body: 0; --tr-small: 0.005em;
  --weight-hook: 800; --weight-head: 700; --weight-text: 400; --weight-text-strong: 600;
}
body { font-family: var(--font-text); font-size: var(--step-body); line-height: var(--lh-body); font-kerning: normal; font-variant-numeric: lining-nums proportional-nums; }
.num, [data-ui] dd, time { font-variant-numeric: lining-nums tabular-nums; }
```
Para o Figma (DTCG): `typography.display.hook`, `typography.display.section`, `typography.ui.label`, `typography.text.lead|body|body-strong|small|quote`, com os mesmos valores. As fontes do Google Fonts têm os mesmos nomes de família ("Archivo" com o eixo de largura; no Figma use o estilo ExtraCondensed ExtraBold e o SemiCondensed Bold).

## 5. Licenças
| Família | Licença | Uso | Custo |
|---|---|---|---|
| Archivo (Omnibus-Type, 2020) | SIL OFL 1.1 | web auto-hospedada, Figma (Google Fonts), subset e instância permitidos (Reserved Font Name: nenhum declarado) | 0 |
| Source Serif 4 (Adobe, 2014) | SIL OFL 1.1 | idem | 0 |
Textos das licenças copiados para `docs/redesign/fonts-v3/OFL-*.txt`; mantê-los junto das fontes em `public/fonts/`.

## 6. Custo
| Arquivo (WOFF2, latin + latin-ext, sem hinting) | KB | Carga |
|---|---|---|
| `archivo-xc-800` | 17,1 | **preload** (LCP = o H1) |
| `archivo-sc-700` | 16,3 | swap (botão e H2) |
| `sourceserif4-text-400` | 25,7 | swap (frase de apoio na 1ª dobra) |
| `sourceserif4-text-600` | 27,3 | swap, abaixo da dobra |
| `sourceserif4-italic-400` | 23,1 | só se a citação real existir |
| **Total** | **109,5** (86,4 sem o itálico) · 1ª dobra: 59,1 | |

Escolhi instâncias estáticas em vez de variável: a variável do Archivo (largura 62,5–75 × peso 700–800) dá 54 KB, contra 33 nas duas estáticas, e a Source Serif 4 variável (opsz × wght) dá 111 KB, contra 53 nas duas estáticas. O eixo não paga o peso, porque a escala tem só 5 tamanhos.
**CLS:** o H1 tem preload e fallback com `size-adjust` medido. O risco que sobra está nas máquinas sem Arial Narrow (Android, Linux): o fallback 2 (Arial Bold a 69,8%) acerta a largura, mas a altura das capitais fica menor; o swap mexe na altura da caixa em ~0,1em e as 2 linhas se mantêm (por largura). Não medi o CLS num build real; fica para o portão do frontend-studio.

## 7. Por que esta voz (códigos do repertório)
- **B1 escala extrema** no gancho, com razão 5,6 (régua ME/PI, contida porque é comercial e tem número).
- **B2 display contido** nos H2 (corte mais largo, peso menor, tracking menos negativo).
- **Serifa editorial como texto** (o papel editorial do PI no pareamento, sem o choque do B3): o "relatório impresso" da direção.
- **Algarismos tabulares da fonte de texto no lugar de B4 (mono como dado)**, que fica proibida na landing.
- **Descartados:** B3 (choque de 3 famílias, teto de 2); B4 (mono); B5 (2 tons/pesos no título, sinal #13); B9/display temática (Big Shoulders: game/esporte); Libre Franklin (largura, §1.1); Barlow, Bebas, Oswald, Anton e Montserrat (proibidas pelo brief).

## 8. Arquivos
- Espécime: `docs/redesign/especime-tipo-v3.html` (abra servido em HTTP; via `file://` o webkit não aplica a fonte do gancho).
- Fotos: `docs/redesign/especime-v3-{chromium,webkit}-{1440,390}.png` (página inteira) e `…-hero.png` (1ª dobra). Nas fotos, os 3 blocos da variante A aparecem a 106 px, no maior corpo de 3 linhas no eixo e no maior corpo de 3 linhas na largura toda.
- Fontes: `docs/redesign/fonts-v3/`.
