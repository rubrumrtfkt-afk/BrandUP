# Júri v4 da landing da BrandUp: o protótipo vivo (`proto.html`)

Júri: design-jury (Awwwards, júri principal + Developer Award, e FWA) · 09/11/2026
Peça: `http://127.0.0.1:5180/proto.html` (dev) e o **build de produção** (`vite build` + `vite preview` em :5191, já derrubado). Todas as medidas de performance são do build.
Régua: `~/.claude/design-library/juri/criterios-awwwards-fwa.md`, `brief-v4.md` (§9), `copy.md` v5, `tipografia-v4.md`, os quadros do `jimo-3d.mov` (6, 25, 36 e 44 s) e o histórico `juri-v1..v3`.
Evidências: `docs/redesign/juri-v4-fotos/` (182 arquivos: 118 fotos por seção nos dois motores × 2 larguras × com e sem movimento, 54 fotos de interação, 4 vídeos de rolagem `*-motion-scroll.webm`, as folhas `sheet-*.jpg`, `_capture-*.json`, `_interact.json`, `_lighthouse-mobile.json`, a saída do inspetor da taste em `taste-inspect/` e os scripts `capture.mjs`, `interact.mjs` e `extra.mjs`).

---

## 1. Veredito

| Prêmio | Resultado | Nota | O que segura |
|---|---|---|---|
| **Awwwards Honorable Mention** (≥ 6,5) | **Sim** | **6,80** | — |
| **Awwwards nível SOTD** (~7,2+) | **Não** | 6,80 | 9 de 11 telas do desktop quase vazias, a mesma planta em 7 das 9 seções e duas sobreposições com o jimo |
| **Developer Award** (> 7) | **Não** | **6,56** | Sem JS a página fica em branco (0 caractere); sem OG/Twitter/Schema/canonical; 2 agentes fora da tela a 390 |
| **FWA FOTD** (≥ 70) | **Não** | **63** | Uma rede de partículas roxas no preto já foi vista cem vezes; a ideia própria (o sim faz a luz subir) está no meio da página, e não na entrada |
| **Taste skill** (meta ≥ 8,0) | **Não** | ~6,5 (estimativa) | 2 FAIL do inspetor; o `empty-screens` é **real** na maior parte (§5.1) |
| **§9 do brief-v4** (uma falha reprova) | **Reprova** | 7 passam, 1 parcial, 3 falham, 1 sem medida | Falham o 7 (planta repetida), o 9 (jimo) e o 11 (sem JS) |

**Evolução:** v1 5,0 → v2 6,3 → v3 6,75 (mock no Figma) → **v4 6,80 (código vivo)**. Ganhou pouco no número porque troca coisas: ganhou a motion real, o sistema de luz com regra e o fim da "tela roxa", e perdeu densidade e imagem. O v4 é o primeiro com código, então é o primeiro com Developer Award.

**Sobre a "nota máxima":** com a régua calibrada (os SOTDs de set/2026 tiraram 7,22–7,5), 9 ou 10 não existe na prática. O teto realista desta peça está no §8. Pela regra do próprio brief, abaixo das notas-alvo a peça volta ao ui-ux-director, e a volta agora é de **composição e densidade**, e não de sistema: o sistema de luz está certo e não deve ser mexido.

---

## 2. Banca 1: Awwwards, júri principal

Seis jurados; por critério, descartei a nota mais distante da média (a regra do Awwwards, escalada para 6).

| Critério (peso) | Dir. de arte | Líder de UX | Creative tech | Tipógrafo | Conteúdo | A11y/perf | Descartada | **v4** | v3 | v2 | v1 |
|---|---|---|---|---|---|---|---|---|---|---|---|
| Design (40%) | 6,4 | 6,7 | 7,0 | ~~6,2~~ | 6,6 | 6,8 | 6,2 | **6,70** | 6,78 | 6,3 | 4,8 |
| Usability (30%) | 7,2 | 6,9 | 7,3 | 7,0 | 7,0 | ~~6,6~~ | 6,6 | **7,08** | 7,00 | 6,4 | 5,1 |
| Creativity (20%) | 6,8 | 6,6 | ~~7,0~~ | 6,5 | 6,8 | 6,7 | 7,0 | **6,68** | 6,42 | 6,3 | 5,0 |
| Content (10%) | 6,5 | 6,8 | 6,4 | 6,6 | ~~6,2~~ | 6,6 | 6,2 | **6,58** | 6,56 | 6,0 | 5,8 |
| **Ponderada** | | | | | | | | **6,80** | 6,75 | 6,3 | 5,0 |

**Design 6,70.** O hero é a melhor tela que a BrandUp já teve: o H1 a 104 px (7,2 vw, 2 linhas, tracking −0,035 em) à esquerda, e a rede-triângulo de pontos com dither à direita, sangrando para baixo (`chromium-1440-motion-01-hero.png`). A luz é dura e quantizada, não é bloom. O que derruba a nota é o resto da página. Das 13 fotos a 1440, **8 têm menos de 2% de pixels claros** (`_capture-chromium.json`, campo `brightPct`: a noite no início 0,87%, a noite no fim 0,97%, os 90 dias 1,0–1,5%, o FAQ 0,91%). Os H2 ficam a 56 px num canto, sobre um campo preto de 1440×900 com uma cena rala (`sheet-chromium-1440-motion.jpg`). São **11 tamanhos de tipo** (14, 15, 16, 18, 19, 20, 22, 23,2, 56, 88, 104 px) e o H1 usa peso 340 e o "Day N" usa 300, abaixo dos 400/500 da casa. Os rótulos de dado têm 14 px em cinza (`#B7B4BB`).

**Usability 7,08.** É a mais forte. O CTA está na 1ª tela nas duas larguras (a 390 em y 253–305), o formulário vem logo depois do hero e fica utilizável a 1,93 s com 4G lento e 4× CPU, os erros são em frase humana e o foco vai ao primeiro campo inválido (`i-chromium-1440-form-errors.png`). O telefone funciona nos dois motores: Approve → "Sending…" → a próxima ordem; Edit → textarea com rótulo → "Send my version"; Decline → "All clear. Nothing is waiting for you." (`i-*-phone-*.png`). O que segura: a 390, **2 dos 6 agentes do hero ficam fora da tela** (x = −22 e x = 434 numa tela de 390) e os seis ficam em y 802–867, na borda da dobra de 844; a 1440 eles ficam em y 838–911, também na dobra. A página tem 10,9 telas no desktop para ~350 palavras.

**Creativity 6,68.** A ideia é da BrandUp: o triângulo-seta do logo vira a rede, a luz só sobe com o sim, e o sim acontece pela mão do visitante. O Approve que faz a luz subir pelo telefone é o melhor momento da página, e é o único que ninguém mais tem. O que segura: (1) olhando de longe, o hero é "uma rede de partículas roxas no preto", que é a imagem da categoria "IA"; (2) a noite é um terreno de pontos com etiquetas flutuando, que é o jimo aos 36 s; (3) os 90 dias são um número de display a 88 px que conta com a rolagem (Day 0 → 50 → 90), que é o "tickets down to 48 → 0" do jimo, invertido (§6).

**Content 6,58.** O texto é curto, concreto e local (Geelong, Newcastle, "Sam opened it twice and hasn't replied since Monday"). Mas a página tem **uma** imagem real (a maquete), os dados de agente são ilustrativos (o próprio rodapé diz "Agent activity shown on this page is illustrative") e o "A$10M+ generated for clients" segue sem prova.

---

## 3. Banca 2: Awwwards, Developer Award

| Categoria (peso) | Passou | Falhou | Nota | Ponderada |
|---|---|---|---|---|
| **WPO (0,20)** | Lighthouse mobile **85**: LCP 0,8 s (simulado), CLS 0, 162 KiB, 10 requests. Com 4G lento (RTT 562 ms, 1,44 Mb/s) + 4× CPU: **LCP 1,90 s** (o H1), formulário utilizável a 1,93 s, motor a 3,1 s, 242 KB no total. Até o LCP ≈ 110–160 KB (≤ 200 ✓). Nenhum erro de console no chromium | **TBT 590 ms** e bootup 1,7 s no Lighthouse (o brief pede nenhuma tarefa longa > 50 ms); `unused-javascript` 28 KiB; **a fonte display baixa 2× no WebKit** (+30,8 KB, aviso "preloaded but not used"); **a AVIF da maquete tem 270 KB a 1440** (orçamento 90). CDN, cache e HTTP/2 não dá para avaliar em localhost | 7,3 | 1,46 |
| **RWD/Mobile (0,20)** | Uma composição própria a 390; alvos de toque de 48–52 px; o CTA na 1ª tela; nenhum estouro horizontal; viewport com `viewport-fit=cover`; `--tela: 100svh` | **2 agentes fora da tela a 390** (x −22 e 434); os agentes na borda da dobra; 2× `height: 100vh` (`proto.css:13` e `:43`, aviso do lint); no chromium com toque, o tap no agente acende o rótulo, mas o `aria-pressed` fica `false` | 6,8 | 1,36 |
| **Semantics/SEO (0,20)** | `lang="en-AU"`, title e description únicos, H1 → H2 → H3 em ordem, `<section aria-labelledby>`, links em `<a href>`, `<details>/<summary>` no FAQ | **Sem JS não há conteúdo nenhum** (`innerText` = 0; `i-nojs-390.png`), então um robô sem JS lê uma página vazia. Sem canonical, sem OG, sem Schema. Lighthouse SEO 58 (o `noindex` e o robots.txt são esperados num laboratório, mas o resto não é) | 5,5 | 1,10 |
| **Markup/Metadata (0,15)** | doctype, charset, `alt`/`width`/`height` nas 2 imagens, nomes de classe semânticos, pouca div-itis | **Sem OG/Twitter/JSON-LD**; o favicon só em SVG, num tamanho só; **os rótulos dos agentes saem em Arial** (`.agent-name` dentro de `<button>` não herda a fonte: são os 4% de Arial do inspetor) | 5,5 | 0,83 |
| **Animations (0,15)** | **WebGL em tempo real** (OGL + shader nosso): conta inteiro aqui. fps na rolagem completa: 390 chromium 60,0 / p95 17 ms; 390 webkit 60,0 / p95 18 ms; 1440 webkit 60,1 / p95 24 ms; **1440 chromium 56,8 / p95 32 ms, 4 quadros > 34 ms** (medido sozinho). Nenhuma longtask no PerformanceObserver. A luz repousa: 20–31 ms de script em 3 s parado. Toda motion tem a sua frase (§9 item 8). Pôster com reduced motion | Os quadros de 34–49 ms no chromium a 1440; a intro não existe; a maquete é um still com dolly, e não o loop de 6–8 s do brief | 7,4 | 1,11 |
| **Accessibility (0,10)** | **axe 0 violações** a 1440 e a 390; Lighthouse a11y 100; **o foco aparece por prova de pixel em 22 de 22 paradas do Tab** (chromium); Enter abre o FAQ; `aria-live="polite"` no telefone; os 6 agentes são botões com `aria-label`; a textarea tem rótulo | **Conteúdo inacessível sem JS** (item do checklist); a pausa em animação automática > 5 s não foi verificada | 7,0 | 0,70 |
| **Total** | | | | **6,56** |

No WebKit, o Tab para no primeiro campo: é o padrão do Safari ("Press Tab to highlight each item" vem desligado), e não é defeito da peça.

---

## 4. Banca 3: FWA

**Dispositivo escolhido: desktop 1440 no chromium.** A rede e a onda se leem maiores, o hover nos agentes funciona e o telefone cabe inteiro ao lado do título.

| Jurado | Nota | Por quê |
|---|---|---|
| Caçador de inovação | 62 | O "sim que faz a luz subir" é novo. Mas fica na 5ª seção; a entrada é uma rede de partículas |
| Diretor de arte | 64 | O hero e o sistema de dither são bons; as telas da noite, dos 90 dias e do FAQ são pretas com pouco dentro |
| Técnico de WebGL/interação | 66 | Um canvas e um contexto, shader próprio, dither ordenado de verdade, 60 fps no celular, a luz para quando não há trabalho. Falta ambição na cena (a grade-onda é simples) e a intro |
| Narrador | 66 | A história de um lead (a onda → o escritório → o telefone → a subida) se lê; os 90 dias e o FAQ cortam o ritmo |
| Cético do "já vi" | 58 | Partículas roxas no preto, terreno de pontos com etiquetas, contador com a rolagem: três coisas que o júri vê toda semana |
| **Média** | **63** | v1 51 → v2 59 → v3 60 → **v4 63** |

Lente histórica (secundária): Design 40 ≈ 26 · Navigation 25 ≈ 17 · Graphics 15 ≈ 10 · Content 15 ≈ 9 · Personality 5 ≈ 3 → ~65.

---

## 5. Taste skill: `lint.mjs` e `inspect.mjs`

- **`lint.mjs src/proto`**: **0 FAIL, 2 WARN** (`h-screen`: `100vh` em `proto.css:13` e `:43`).
- **`inspect.mjs` no build de produção** (Chrome do Playwright via `CHROME_PATH`): **2 FAIL, 7 WARN** (`taste-inspect/report.json`).

### 5.1 Os dois FAIL: instrumento ou verdade?

| FAIL | O construtor disse | Veredito | Medida |
|---|---|---|---|
| `empty-screens` (9 de 11 telas) | O instrumento não vê o canvas | **Verdade em ~6 das 9.** O inspetor de fato não lê o canvas, e no hero e no meio da noite ele erra (há cena). Mas medi o pixel das fotos reais, com o canvas pintado: noite no início 0,87% de pixels claros, noite no fim 0,97%, os três quadros dos 90 dias 1,0–1,5%, o FAQ 0,91%, o telefone 2,5%. Uma tela com 1% de pixel aceso e um H2 de 56 px no canto **é** uma tela vazia para um jurado | `_capture-chromium.json` → `brightPct`; `sheet-chromium-1440-motion.jpg` |
| `few-pictures` (2) | O instrumento não vê o canvas | **Metade instrumento, metade verdade.** A regra de ≥ 4 fotos não casa com um conceito de shader, e o canvas é imagem desenhada. Mas a página tem **uma** imagem real só (a maquete), o loop de vídeo prometido (§5.4 e §7.4 do brief, 0,9 MB) não existe (WARN `no-footage`), e o Content sente isso | `extra.mjs` → `imgs` |

Os WARN confirmados: **3 famílias** (BU Text 87%, BU Display 9%, **Arial 4%** nos rótulos dos agentes); **10 tamanhos**; **2 vãos de 412 px (em y 5572, abaixo do telefone) e de 456 px (em y 8380, no fim do FAQ)**; `pinned-over-picture` (o H2 da noite e o dos 90 dias atravessam a cena: medi o anel de 48 px em volta deles com L* p95 = 2,1, então nenhuma luz encosta no texto, e aqui o WARN é falso); `still-page` (14 elementos se movem; o canvas não conta).

### 5.2 Ainda há sinais de "feito por IA"?

**Sim, poucos e todos de cor ou de composição, nenhum de vocabulário.** O vocabulário está limpo: sem mono, sem pílula, sem eyebrow, sem caixa alta pequena, sem glass, sem gradiente CSS e sem sombra (lint 0 FAIL).

1. **O "glow roxo de SaaS de IA" foi desarmado pela metade.** O que o brief proibiu sumiu: não há orbe atrás do título (o anel do H1 fica em L* p95 2,1), não há bloom (a luz é pixel duro com dither), a luz converge e sobe. **O que ficou é a cor e a matéria:** partículas roxas luminosas num quase-preto. De longe, o hero é a imagem que a categoria usa para "IA" (`webkit-390-motion-01-hero.png`). Somado ao **botão menta**, dá a trinca preto + violeta luminoso + verde-menta, que o próprio brief (§2.3 regra 6: "o menta sai") e o júri v3 (§5.3) chamaram de trinca da categoria. O CSS registra que o menta é decisão do dono (`proto.css:1–2`). Não é decisão minha; é o maior sinal restante.
2. **O terreno de pontos com etiquetas** (noite) e **o contador grande com a rolagem** (90 dias): dois gestos que todo site de IA de 2025–26 usa e que o jimo usa.
3. **O cone de luz do final** (`webkit-390-motion-14-final.png`, 33% de roxo) se lê como um refletor de palco. O dono reprovou refletores em 19/10 (memória "Refletores reprovados"). Confirmar com ele antes de manter.
4. **O vazio como estilo:** um H2 pequeno no canto de uma tela preta é o "minimalismo escuro" padrão de landing de IA.

---

## 6. §9 do brief-v4, item a item

| # | Critério | Resultado | Evidência |
|---|---|---|---|
| 1 | Vocabulário do v3 em zero | **Passa, com ressalva** | lint 0 FAIL; o inspetor não acha gradiente nem sombra. Ressalvas: botão com raio de 10 px (a faixa "soft" de 9–16 px que a taste chama de padrão fraco); as etiquetas da noite em caixinhas escuras |
| 2 | Teste do portador | **Passa** | Hero: pontos e feixes (6 agentes → 3 cérebros → você). Formulário: um feixe por campo válido (`i-chromium-1440-form-filled.png`, 5 feixes). Noite: a crista e os pontos. Telefone: feixes que convergem. 90 dias: os glifos. Final: a subida. Nenhuma luz sem dono |
| 3 | O título no escuro (≤ L* 12) | **Passa** | O anel de 48 px em volta de cada H1/H2 tem **L* p95 = 2,1** em todos os quadros dos dois motores (o máximo de 95 é texto vizinho, não luz) |
| 4 | Nenhuma tela roxa (≤ 35%) | **Passa, no limite** | Máximo de **33,2%** no final a 390 (os dois motores); o maior roxo chapado é o logo |
| 5 | Grão, não bloom | **Passa (visual)** | Pixel duro e dither ordenado a 100% (`chromium-1440-motion-01-hero.png`, o final). Não rodei o script de janela 8×8 |
| 6 | ≤ 25 palavras por seção, ≤ 260 na página | **Parcial** | O inspetor conta 349 palavras (com os rótulos do formulário). Pela minha contagem no DOM, sem os formulários e com os rótulos escondidos por opacidade, são 282, com o telefone em 52 e o escritório em 50. Não é conclusivo, porque parte disso é UI do telefone |
| 7 | Uma representação por seção, e nenhuma seção repete a planta da vizinha | **Falha** | As representações são únicas (passa). A planta, não: **"H2 no canto superior esquerdo + cena à direita ou embaixo" em 7 das 9 seções** (hero, formulário, noite, escritório, telefone, 90 dias, FAQ); só o final quebra. É a mesma falha do v3 (item 5) |
| 8 | Toda motion tem a sua frase; nada perpétuo fora da tela | **Passa** | Hero: "o trabalho corre dos agentes até você". Formulário: "cada campo acende um feixe". Noite: "a onda passa e acende o que aconteceu a cada hora". Telefone: "eu aprovei, a luz subiu, chegou a próxima". 90 dias: "as mesas ligam uma a uma". Final: "a luz sobe e vira o logo". Parado, o script gasta 20–31 ms a cada 3 s |
| 9 | Sem sobreposição com o jimo | **Falha (parcial)** | `ref-jimo-6-25-36-44.jpg` × `chromium-1440-motion-04-night-0.5.png`: terreno de pontos em perspectiva com etiquetas flutuando = jimo 36 s (mudou: H2 à esquerda e não centrado, etiqueta com hora, a crista). **"Day 0 → 90" a 88 px logo abaixo do H2, contando com a rolagem**: o item 9 diz "nenhum número de título contando". O §3 do brief abriu essa exceção e o §9 a fecha; o júri lê o que está na tela, e o que está lá é o mecanismo do jimo (36–48 s) invertido |
| 10 | LCP ≤ 2,0 s, ≤ 200 KB até o LCP, CLS 0, ≥ 50 fps no iPhone 12 no Instagram, formulário antes do motor | **Passa no que medi** | LCP 1,90 s (4G lento + 4×), ~110–160 KB até o LCP, CLS 0 nos 8 cenários, formulário a 1,93 s e motor a 3,1 s. **O iPhone 12 no Instagram não foi medido** (não há aparelho). TBT de 590 ms no Lighthouse é um alerta para celulares fracos |
| 11 | Fallbacks completos | **Falha** | Reduced motion: passa (pôster em toda seção, `sheet-*-reduce.jpg`). `?gl=0`: passa (`i-gl0-1440-*.png`, classe `gl-off`). **Sem JS: a página é branca, 0 caractere** (`i-nojs-390.png`); o `<noscript>` do pôster vive dentro do React e nunca chega ao HTML |
| 12 | Notas (taste ≥ 8 · Awwwards ≥ 7,2 · FWA ≥ 70) | **Falha** | ~6,5 · 6,80 · 63 |

---

## 7. Defeitos objetivos (com coordenada e medida)

| # | Defeito | Medida | Dono |
|---|---|---|---|
| D1 | Página vazia sem JS | `innerText.length = 0`, 0 heading (`_interact.json → noJs`) | frontend-studio |
| D2 | 2 agentes fora da tela a 390 | caixas em x = −22 e x = 434 (largura 390), y 802–867 | frontend-studio (+ ui-ux-director na posição) |
| D3 | Agentes na dobra a 1440 | y 838–911 numa tela de 900 | ui-ux-director |
| D4 | Rótulos dos agentes em Arial | `.agent-name` com `font-family: Arial` (falta `font: inherit` no `<button>`) | frontend-studio |
| D5 | Fonte display baixada 2× no WebKit | `bu-display.woff2` 30.840 B ×2 nos 4 cenários webkit; aviso "preloaded but not used". **Confirmado** | frontend-studio |
| D6 | AVIF da maquete a 1440 | `office-day-master-2080.avif` = **269.753 B** (orçamento 90 KB). **Confirmado** | frontend-studio |
| D7 | Telas quase vazias | 8 de 13 quadros a 1440 com < 2% de pixel claro; a noite ocupa 2.160 px (2,4 telas) e os 90 dias 1.800 px (2 telas) | ui-ux-director |
| D8 | Vãos sem nada | 412 px em y 5572 e 456 px em y 8380 (1440). **Confirmados** | ui-ux-director |
| D9 | 11 tamanhos de tipo e pesos fora da casa | 14/15/16/18/19/20/22/23,2/56/88/104 px; H1 com peso 340, "Day" com 300 | type-director |
| D10 | Etiqueta da noite encostada na borda | "18:40 · Enquiry answered · Geelong" começa em x ≈ 25 a 1440, fora da margem de 64 px | frontend-studio |
| D11 | Sem metadados sociais | sem OG, Twitter, JSON-LD nem canonical; favicon só em SVG | frontend-studio |
| D12 | TBT no Lighthouse | 590 ms, bootup 1,7 s (simulado, 4× CPU) | frontend-studio |
| D13 | A intro não foi construída | nenhum elemento de intro no DOM. **Confirmado** | frontend-studio |
| D14 | Quadros lentos no chromium a 1440 | p95 de 32 ms, 4 quadros > 34 ms, pior 49 ms | frontend-studio |
| D15 | 100vh | `proto.css:13` e `:43` | frontend-studio |

---

## 8. Comparação com o jimo.ai e o Unicorn Studio, e o teto

- **Contra o jimo:** o jimo ganha em **densidade e acabamento de imagem**. Cada tela dele carrega um objeto rico (a UI do produto em perspectiva, o painel de sugestões, os balões com avatar), e o 3D é polido. O v4 ganha em **ideia própria** (o sim como evento) e em **leveza**: 162 KiB e LCP de 1,9 s com 4G lento, contra os 18–20 canvases do jimo e o LCP de 4,07 s no desktop (dossiê). Hoje o v4 parece um jimo com menos coisas, e não um site com outra ideia.
- **Contra o Unicorn Studio:** o Unicorn tem gradientes e splines de alta fidelidade, macios e caros. O dither do v4 é uma escolha certa e própria, mas a 1440 a partícula do hero lê como "neve de pixel" nos aglomerados dos cérebros, e a grade-onda é simples. O acabamento fica abaixo dos dois.

**Teto realista:** Awwwards **7,2–7,4** (SOTD), FWA **68–72**, Developer Award **7,2–7,5**. Um 8+ pediria uma cena central muito mais ambiciosa (por exemplo, a maquete em tempo real que acende mesa por mesa com o sim), e isso cobraria WPO e o celular do Meta.

**O que separa o v4 (6,80) do teto:** encher as telas e encurtar a rolagem (+0,25), quebrar a planta repetida (+0,10), tirar os dois gestos do jimo (+0,10), a imagem e o vídeo da maquete com mais presença (+0,05), e a tipografia em 5 tamanhos (+0,05). O Developer Award passa de 7 com o HTML pré-renderizado e os metadados, sem mexer no design.

---

## 9. O que mais sobe a nota (em ordem de impacto)

| # | Achado → correção | Evidência | Banca / critério | Pontos estimados | Dono |
|---|---|---|---|---|---|
| 1 | **Encher as telas e encurtar a rolagem.** A noite de 2,4 para ~1,3 tela, os 90 dias de 2 para ~1; cena maior (a grade-onda ocupando ≥ 60% da tela, os glifos dos 90 dias grandes); os H2 de 56 para 88–104 px no desktop; fechar os vãos de 412 e 456 px | `sheet-chromium-1440-motion.jpg`; `brightPct` < 2% em 8 de 13 quadros | Awwwards Design, Usability; taste `empty-screens`; FWA | **+0,25** Awwwards · +3 FWA · taste +0,8 | ui-ux-director → frontend-studio |
| 2 | **Quebrar a planta "H2 no canto + cena"** em pelo menos 3 seções (o H2 dentro da cena, a cena à esquerda, uma seção em coluna central como o final) | §6 item 7 | Design, Creativity; §9 item 7 | **+0,10** | ui-ux-director |
| 3 | **Tirar os dois gestos do jimo.** O dia vira posição na linha, e não um número a 88 px que conta; as etiquetas da noite deixam de flutuar sobre o terreno (por exemplo, a crista escreve a hora na própria grade) | `ref-jimo-6-25-36-44.jpg` × `…-04-night-0.5.png`, `…-08/09/10-days*.png` | Creativity; FWA cético; §9 item 9 | **+0,10** · +3 FWA | ui-ux-director |
| 4 | **HTML pré-renderizado** (SSG/prerender do `proto.html`) para que o conteúdo exista sem JS, + OG/Twitter/JSON-LD/canonical + favicons | `i-nojs-390.png`; Lighthouse SEO 58 | Developer: Semantics 5,5 → 7,5, Markup 5,5 → 7,5, A11y 7 → 8; §9 item 11 | **Dev +0,8** (→ ~7,3) | frontend-studio |
| 5 | **Pôr o "sim" mais cedo.** Hoje a ideia que só a BrandUp tem está na 5ª seção. Um eco dela no hero (o vértice que pede o sim e sobe ao toque) leva a inovação à entrada | §4 | FWA (caçador, cético); Creativity | +0,05–0,1 · **+3–4 FWA** | ui-ux-director |
| 6 | **Agentes:** os 6 dentro da tela a 390 e acima da dobra a 1440; `font: inherit` no `.agent`; o `aria-pressed` no tap | D2, D3, D4 | Usability; Dev RWD 6,8 → 7,4 | +0,05 · Dev +0,15 | frontend-studio (+ ui-ux-director) |
| 7 | **Tipografia:** de 11 para 5 tamanhos; H1 e "Day" em 400; os rótulos de dado a 15–16 px em tinta cheia | D9 | Design (tipógrafo); taste `size-count` | +0,05–0,1 | type-director |
| 8 | **Peso:** o preload que casa no WebKit (mesma URL e `crossorigin` no `@font-face`), a AVIF de 1440 ≤ 120 KB (1040 com DPR 1 ou qualidade menor), menos JS no boot (TBT 590 ms) | D5, D6, D12 | Dev WPO 7,3 → 8 | Dev +0,15 | frontend-studio |
| 9 | **A maquete com vida:** o loop de 6–8 s do brief, no lugar do still com dolly; uma segunda imagem real (um detalhe da mesa, o rosto de resina) | WARN `no-footage`, `few-pictures` | Content, Design; Dev Animations não conta vídeo | +0,05 | frontend-studio |
| 10 | **A intro** (§5.0): os pontos montam o triângulo, que vai ao header (≤ 1,2 s, pulável). Faz a rima do F5 com o final | D13 | Creativity; FWA | +0,05 · +1–2 FWA | frontend-studio |
| 11 | **Duas decisões para o dono:** o botão menta (a trinca da categoria, §5.2) e o cone do final que se lê como refletor | §5.2 itens 1 e 3 | Creativity; taste | 0 a +0,1 | ui-ux-director leva ao dono |
| 12 | Provar ou tirar o "A$10M+ generated for clients" | hero, 14 px | Content | +0,03 | copy-director |

---

## 10. O que já está no nível (não mexer)

1. **O sistema de luz com regra:** toda luz tem dono, nenhuma encosta no título (anel L* p95 = 2,1 em todos os quadros), dither duro sem bloom, ≤ 35% de roxo. Passa nos itens 2 a 5 do §9 nos dois motores.
2. **O telefone vivo:** Approve, Edit e Decline funcionam no chromium e no webkit, com `aria-live` e estados claros (`i-*-phone-*.png`). É o melhor momento da página.
3. **O formulário:** utilizável a 1,93 s com 4G lento, erros em frase humana, foco no primeiro inválido, `autocomplete` certo (`name`, `organization`, `email`, `tel-national`), feixe por campo válido.
4. **Acessibilidade técnica:** axe 0, Lighthouse 100, foco provado por pixel em 22 de 22 paradas.
5. **Leveza e fallbacks:** 162 KiB, CLS 0, motor depois do formulário, pôster em toda seção com reduced motion e com `?gl=0`, a luz repousa quando não há trabalho.

---

## 11. Não avaliado

- **iPhone real e o navegador do Instagram/Facebook** (o ≥ 50 fps do §9 item 10), e o VoiceOver: não há aparelho.
- **LCP pela rede real:** medi em localhost (Lighthouse simulado e CDP com limite de rede); CDN, cache e HTTP/2 só no ar.
- **fps no celular de verdade:** o limite de 4× CPU no headless não freia a GPU, então os 60 fps a 390 são do Mac, e não de um Moto G.
- **Pausa em animação automática > 5 s** (o loop de balões do escritório): não testei se existe controle de pausa.
- **Script de dither em janela 8×8** (§9 item 5): julguei no recorte a 100%.
- **Sem CSS:** o conteúdo e os headings estão lá (2.240 caracteres, H1 → H2 → H3 em ordem), mas a foto saiu em branco e não prova a leitura visual.
- **A 768:** só pelo inspetor (2 linhas no H1 a 63 px), sem a minha passada.
- **Vazamento de memória** em sessão longa: não medi.
- **A crítica formal da taste** (`references/critique.md`, as 14 passadas): não rodei. A nota de ~6,5 é estimativa a partir dos 2 FAIL e dos tetos.
- **Instrumento:** o Playwright não fotografa a scrollbar overlay e não renderiza `backdrop-filter` no WebKit (não há nenhum na peça). Os avisos "GPU stall due to ReadPixels" no chromium vêm das minhas capturas de tela do canvas, e não do código.
- As medidas de fps da 1ª passada a 1440 no chromium rodaram em paralelo com o webkit e o Lighthouse (51 fps); refiz sozinho (56,8 fps), e é esse número que entra.
