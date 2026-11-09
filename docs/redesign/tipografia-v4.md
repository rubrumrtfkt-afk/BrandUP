# Tipografia v4: "o trabalho é luz"

Responde ao pedido do brief v4 §6.1. O espécime está em `especime-tipo-v4.html` e as fotos em `tipo-v4-fotos/` (chromium e webkit, a 1440 e a 390, hero e página inteira).

## A decisão: uma família, Mona Sans, em duas larguras do mesmo eixo

**Mona Sans** (GitHub, desenhada com a Degarism; SIL OFL 1.1, Google Fonts). É uma grotesca variável com eixo de largura (`wdth` 75–125) e de peso (`wght` 200–900).

- **Display (H1, número dos 90 dias, H2):** largura 87,5% (a instância nomeada SemiCondensed), pesos 300–400.
- **Texto e rótulos:** largura 100%, pesos 400–500.

É uma família só. Os dois arquivos são cortes do mesmo eixo, e não um par.

### Por que ela, com a medida
1. **O gancho em 2 linhas a 390 pede largura.** Medi "Over $250K per month" (a linha 1, com 20 caracteres) a 100 px e tracking −3%:

   | Candidata | Largura da linha 1 | Maior corpo que cabe em 350 px (390) |
   |---|---|---|
   | Mona Sans, 100% | 10,02 em | 34,9 px |
   | **Mona Sans, 87,5%** | **8,13 em** | **43,0 px** |
   | Hubot Sans, 87,5% | 8,25 em | 42,4 px |
   | Geologica (sem eixo de largura) | 10,45 em | 33,5 px |
   | Mona Sans, 87,5%, CAIXA ALTA | 9,42 em | 37,2 px |

   Uma grotesca de largura normal só segura o gancho em 2 linhas abaixo de 35 px, e o brief pede de 40 a 48 px. A caixa alta perde 6 px. Por isso o gancho fica em **caixa normal**, na largura 87,5%.
2. **Grande e calma.** Peso 340 a 104 px tem o ar da grotesca leve do jimo, sem ser DM Sans. A 87,5% a letra fica ereta e precisa, sem a voz de anúncio esportivo da condensada (o Archivo XC saiu por isso).
3. **A aresta do triângulo.** O ápice do A e o vértice do V e do W terminam em ponta, e os terminais são retos. Conversa com o logo sem virar fonte temática (B9).
4. **O "$250K".** O "$" tem o traço atravessando a letra inteira e o mesmo peso da caixa alta. O 2, o 5 e o 0 são abertos e estreitos. Na foto de 1440, "$250K" é o bloco mais denso da linha: é o momento tipográfico, e não pediu nem negrito nem cor.

### Descartadas
- **Hubot Sans** (a irmã chanfrada da Mona; está no fim do espécime): os cantos cortados e o 0 com barra viram fonte de robô ao lado da luz (B9).
- **Geologica:** o eixo de nitidez (SHRP) é bonito, mas a família não tem eixo de largura e o gancho cai para 33 px a 390.
- **Proibidas pelo brief:** DM Sans, Geist, Inter, Space Grotesk, Montserrat, Barlow, Archivo e Source Serif. A Sora fica fora porque é a voz do Produzze.
- **Comercial:** nenhuma é claramente melhor para este caso. As referências de voz (Söhne Leicht, Neue Haas Unica Light) não têm eixo de largura no mesmo arquivo e custariam licença web. Não pesquisei preço porque não as recomendo.
- **Risco declarado:** a Mona Sans é a fonte de marketing do GitHub, então um público de dev pode associá-la ao GitHub. O público da página são donos de indústria australiana e o risco é baixo. Fica registrado para o júri.

## Tabela de papéis

| Papel | Família · arquivo | Peso | 390 → 768 → 1440 | `clamp()` | Entrelinha | Tracking | Caixa |
|---|---|---|---|---|---|---|---|
| H1, o gancho (LCP) | Mona 87,5% · `bu-display` | 340 | **40 → 63 → 104 px** (36,9 px a 360) | `clamp(2.25rem, min(10.25vw, 1.014rem + 6.095vw), 6.5rem)` | 0,94 | −0,84 px (−2,1%) → −3,64 px (−3,5%): `calc(0.0125rem - 0.2667vw)` | normal |
| Número dos 90 dias | Mona 87,5% · `bu-display` | 300 | 48 → 62 → 88 px | `clamp(3rem, 2.071rem + 3.81vw, 5.5rem)` | 0,9 | −0,03 em | normal |
| H2 | Mona 87,5% · `bu-display` | 400 | 30 → 39 → 56 px | `clamp(1.875rem, 1.271rem + 2.476vw, 3.5rem)` | 1,0 | −0,025 em | normal |
| H3 / pergunta do FAQ | Mona 100% · `bu-text` | 500 | 16 → 17 → 18 px (o tamanho do texto) | igual ao texto | 1,5 | 0 | normal |
| Texto | Mona 100% · `bu-text` | 400 | 16 → 17 → 18 px | `clamp(1rem, 0.954rem + 0.19vw, 1.125rem)` | 1,5 | 0 | normal, até 60ch |
| Rótulo de dado | Mona 100% · `bu-text` | 500 | 13 → 13,4 → 14 px | `clamp(0.8125rem, 0.789rem + 0.095vw, 0.875rem)` | 1,3 | +0,005 em | normal (nunca caixa alta espaçada) |
| Botão | Mona 100% · `bu-text` | 500 | 16 px | fixo | 1 | 0 | normal |

- **São 5 tamanhos.** Isso fica dentro do teto da `design-taste-frontend`. A pergunta do FAQ se separa da resposta pelo peso e não por um 6º tamanho.
- **Razão de 5,8:1 (H1 ÷ texto a 1440).** É uma escolha deliberada. A B1 (≥ 12:1) pede o H1 a 216 px, e isso é a "cara de cartaz/anúncio" que o pedido proíbe. Uso a escala da B2 com o H1 a 7,2vw, que é ≥ 7vw, como o brief pede.
- **Peso 340 fora do 400/500 da casa.** É display de marca, e o impacto vem do tamanho e não do negrito, como o brief pede. O texto fica só em 400/500.

### Prova da quebra (medida no navegador, servida por HTTP, depois de `document.fonts.load` e com `document.fonts.check` = true nos dois motores)

| Motor | Largura | H1 | Linhas do H1 | Todos os H2 | Base do CTA | Estouro lateral |
|---|---|---|---|---|---|---|
| chromium | 1440 | 103,99 px | **2** | 2 linhas | y 512 | não |
| chromium | 390 | 39,98 px | **2** | 2 linhas | y 311 | não |
| chromium | 360 | 36,9 px | **2** | 2 linhas | y 305 | não |
| webkit | 1440 | 103,99 px | **2** | 2 linhas | y 512 | não |
| webkit | 390 | 39,98 px | **2** | 2 linhas | y 311 | não |
| webkit | 360 | 36,9 px | **2** | 2 linhas | y 305 | não |

- A quebra é fixa: "Over $250K per month" / "within 90 days.". Ela sai de `max-width: 8.7em` com `&nbsp;` em "per&nbsp;month" e "90&nbsp;days". Não uso `text-wrap: balance` no H1, porque ele trocaria a quebra para "Over $250K per / month…".
- **O limite para o copy-director:** a linha 1 do H1 pode ter **até 20 caracteres** (≈ 8,3 em) e a linha 2, até 21. Se o gancho mudar, a linha mais longa precisa caber em 8,7 em a 87,5%, o que dá ~20 caracteres misturando dígitos e minúsculas. Uma linha 1 de 22 caracteres, como "Leads answered at 2am.", passa de 2 linhas a 390.
- A 1440 o H1 ocupa 905 px (colunas 1–8). O triângulo fica nas colunas 6–12, o shader zera a luz na caixa do H1 + 48 px, e sobra o vértice à direita.
- O CTA termina em y 311 a 390 (o brief pede ≤ 640).

## Recursos OpenType e uma armadilha

- **Ligados:** `kern`, `liga`, `locl`, `ccmp`, `mark` e `frac`.
- **`tnum` é PROIBIDO.** Na Mona, o `tnum` troca os algarismos pelo desenho do Mona Mono: o 0 ganha barra e o 1 ganha serifa (eu vi isso na 1ª foto). Isso é mono disfarçado, e a casa proíbe mono.
- **As figuras padrão são proporcionais.** Medi as larguras: 0 = 516, 1 = 280 e 8 = 500 unidades.
- **O contador dos 90 dias não pula** porque cada número mora numa caixa fixa: `.numbox { display:inline-block; min-width:1.04em }`, a largura do par mais largo ("00" = 1,03 em). No espécime, o "11" e o "08" ocupam o mesmo lugar. O frontend-studio implementa o contador assim, e não com `tabular-nums`.
- **Preços** ($4,900, $18,450) usam figuras proporcionais. Nada se alinha em coluna nesta página.

## Tokens (colar no CSS de tokens)

```css
@font-face{font-family:"BU Display";src:url(/fonts/bu-display.woff2) format("woff2");font-weight:300 400;font-stretch:87.5%;font-display:swap}
@font-face{font-family:"BU Text";src:url(/fonts/bu-text.woff2) format("woff2");font-weight:400 500;font-stretch:100%;font-display:swap}
@font-face{font-family:"BU Display Fallback";src:local("Arial"),local("Helvetica Neue"),local("Roboto");size-adjust:85%;ascent-override:128.2%;descent-override:37.6%;line-gap-override:0%}
@font-face{font-family:"BU Text Fallback";src:local("Arial"),local("Helvetica Neue"),local("Roboto");size-adjust:103.4%;ascent-override:105.4%;descent-override:30.9%;line-gap-override:0%}

:root{
  --font-display:"BU Display","BU Display Fallback",system-ui,sans-serif;
  --font-text:"BU Text","BU Text Fallback",system-ui,sans-serif;

  --type-hook-size:clamp(2.25rem, min(10.25vw, 1.014rem + 6.095vw), 6.5rem);
  --type-hook-weight:340; --type-hook-stretch:87.5%; --type-hook-leading:0.94;
  --type-hook-tracking:calc(0.0125rem - 0.2667vw); --type-hook-measure:8.7em;

  --type-number-size:clamp(3rem, 2.071rem + 3.81vw, 5.5rem);
  --type-number-weight:300; --type-number-leading:0.9; --type-number-tracking:-0.03em;

  --type-h2-size:clamp(1.875rem, 1.271rem + 2.476vw, 3.5rem);
  --type-h2-weight:400; --type-h2-leading:1; --type-h2-tracking:-0.025em; --type-h2-measure:14ch;

  --type-body-size:clamp(1rem, 0.954rem + 0.19vw, 1.125rem);
  --type-body-leading:1.5; --type-body-measure:60ch;

  --type-label-size:clamp(0.8125rem, 0.789rem + 0.095vw, 0.875rem);
  --type-label-weight:500; --type-label-leading:1.3; --type-label-tracking:0.005em;

  --ink-2:#B7B4BB; /* ink a 74% sobre ground */
}
```

O display, o número e o H2 levam `font-stretch: var(--type-hook-stretch)` (87,5%). O texto fica em 100%. Não use `hyphens` em nenhum título. O idioma da página é `en-AU`, então as regras pt-BR do papel não se aplicam aqui. As aspas tipográficas “ ” ‘ ’ e o travessão — estão no subset.

## Contraste (APCA 0.0.98G, calculado)

| Texto | Fundo | Lc | Veredito |
|---|---|---|---|
| `ink` #F4F1F8 | `ground` #08070B | −99,4 | passa em tudo |
| `ink-2` #B7B4BB (74%) | `ground` | ≈ −61 (interpolado; a 72%, #B2AFB6, deu −59,6) | passa em Lc 60 a 16 px. Não desça de 74% |
| `ink` | `light-deep` #1A0B33 | −98,5 | passa |
| `ink` | roxo médio #4A2390 | −89,9 | passa |
| `ink` | `brand` #9232EA (botão) | −72,8 (branco puro: −81,2) | botão a 16 px/500 passa (≥ 60). Recomendo `#FFF` no rótulo do botão |
| `ink` | `light-hot` #C9A2FF | −36,7 | **reprova** |
| `ink` | `light-core` #FBF7FF (pior pixel) | 0 | **reprova** |

- **Regra para os rótulos de dado sobre a luz (A noite).** Nenhuma cor de texto passa sobre o núcleo, nem `ink` nem `ground`, porque o roxo médio dá Lc 28 com texto escuro. Então o rótulo leva a mesma regra do H1 (brief §2.3, regra 3): o shader recebe a caixa de cada rótulo e mantém a luminância ≤ #2A1450 dentro dela + 12 px (Lc ≥ 96). A crista de luz passa **ao lado** do rótulo, nunca por baixo. Isso fica para o frontend-studio.
- **Fundo claro (prova no espécime):** `ground` sobre `ink` dá Lc 102.

## Peso, carga e LCP

| Arquivo | Conteúdo | KB (woff2) | Carga |
|---|---|---|---|
| `fonts-v4/bu-display.woff2` | Mona, `wdth` fixo em 87,5, `wght` 300–400, latin + latin-1 + pontuação | **30,1 KB** (30.840 B) | `<link rel="preload" as="font" type="font/woff2" crossorigin>` (só este: é o H1, o LCP) |
| `fonts-v4/bu-text.woff2` | Mona, `wdth` fixo em 100, `wght` 400–500, o mesmo subset | **30,4 KB** (31.148 B) | sem preload, `swap` |
| Total | | **60,5 KB** | cada arquivo ≤ 45 KB, como o brief pede |

- **Como foram feitos:** com o `fontTools`, a partir do arquivo latin do Google Fonts (98 KB, com os eixos inteiros). Primeiro o `instancer` cortou os eixos, depois o `subset` reduziu os glifos (U+0020–007E, U+00A0–00FF, aspas, travessões, reticências, €, ™, ↑↓, −).
- **Arquivo único com os dois intervalos:** dá 58 KB, então dois arquivos de 30 KB saem melhor, e só o do LCP fica no caminho crítico.
- **Fallback métrico:** medi a largura média do gancho + apoio na Mona contra a Arial. O display dá `size-adjust` 85%, e o texto, 103,4%. As métricas verticais vêm de `hhea` (asc 1090, desc 320, upm 1000).
- **CLS: não medi.** Pelo cálculo, o risco é baixo: o H1 tem quebra fixa em em e o fallback tem a mesma largura média. Falta a prova com o trace do Lighthouse e `font-display: swap` sobre 4G lenta. Esse é o teste do frontend-studio.
- **LCP:** o arquivo do H1 tem 30 KB e é pré-carregado, então costuma chegar antes da 1ª pintura. Se não chegar, a Arial ajustada pinta o H1 no mesmo lugar.

## Licença (verificada)

- **Mona Sans:** SIL Open Font License 1.1, © 2023 GitHub, com **Reserved Font Name "Mona Sans"**. O texto está em `fonts-v4/OFL-MonaSans.txt`, baixado de `github.com/github/mona-sans`. Uso comercial e web é livre.
- **Por que renomeei.** Pelo §3 da OFL, uma versão modificada (instanciada e com subset) não pode ser distribuída com o nome reservado. Por isso os arquivos se chamam "BU Display" e "BU Text" na tabela `name`, mantêm o copyright e levam a OFL junto. O frontend-studio publica o `OFL-MonaSans.txt` ao lado das fontes.
- **Hubot Sans** (só na comparação, `bu-compare-hubot.woff2`): também é OFL 1.1 do GitHub. Sai do projeto quando o espécime for arquivado.
- **Custo de licença: zero.**

## Movimentos do repertório

- **B2:** o display contido. O impacto vem do tamanho, a 7,2vw, e não do peso.
- **Uma sans versátil, no espírito do QH:** uma família do rótulo de 13 px ao H1, variando só a largura, o peso e o tamanho.
- **Fora:**
  - B1, a escala extrema, que vira cartaz;
  - B3, o choque de famílias, porque o brief pede uma;
  - B4, mono como dado, porque a casa proíbe mono e o `tnum` da Mona é mono;
  - B5, o título em 2 tons, porque a regra "sem palavra estilizada" da casa e o H1 de 2 linhas não pedem;
  - B9, a display temática, que levou a Hubot para fora.
