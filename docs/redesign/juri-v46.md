# Júri v4.6 da landing da BrandUp: o protótipo vivo (`proto.html`)

Júri: design-jury (Awwwards júri principal + Developer Award + FWA) · 09/11/2026
Peça: `http://127.0.0.1:5180/proto.html` (dev). Medi o **build de produção** (`dist/`, gerado às 13:02, sem nenhum arquivo de `src/`, `public/` ou `proto.html` mais novo que ele) servido por `vite preview` em :5192, que já foi derrubado. O servidor da 5180 continua no ar.
Régua: `~/.claude/design-library/juri/criterios-awwwards-fwa.md`, `brief-v4.2.md` §1 e §10, `juri-v4.md`, `referencias/jimo*`.
Evidências: `docs/redesign/juri-v46-fotos/`. São 188 fotos por tela (chromium e webkit × 1440 e 390 × com movimento e com reduce, uma a cada meia tela, esperando a posição de rolagem e 40 quadros renderizados), as folhas `sheet-*.jpg`, as composições `v-A…v-J*.jpg`, a intro em 6 tempos nos dois motores (`intro-*.png`, `v-G-intro.jpg`), as interações em `i-*.png`, 2 vídeos de rolagem lenta em `video/`, os JSON `_capture.json`, `_interact.json` e `_lh-mobile-{sw,gpu}.json`, a saída da taste em `taste-inspect/` e os scripts `capture.mjs`, `interact.mjs`, `perf-scenes.mjs`, `throttle.mjs` e `intro.mjs`.

---

## 1. Veredito

| Prêmio | Resultado | Nota | O que segura |
|---|---|---|---|
| **Awwwards Honorable Mention** (≥ 6,5) | **Sim** | **6,87** | — |
| **Awwwards nível SOTD** (~7,2+) | **Não** | 6,87 | 12 de 25 telas a 1440 entre o hero e o final com < 4% de pixel aceso; o triângulo repetido em 5 lugares (3 seções seguidas no fim); a página cresceu para 14 telas |
| **Developer Award** (> 7) | **Sim (simulado)** | **7,53** | Passou porque o v4.6 corrigiu o sem-JS e os metadados. Pela regra oficial, só vai a essa banca quem já é SOTD |
| **FWA FOTD** (≥ 70) | **Não** | **65** | A entrada continua sendo "partículas roxas no preto". O melhor da peça (a maquete em dither e as figuras da noite) fica no meio da rolagem, e as figuras ainda são provisórias |
| **Taste skill** (meta ≥ 8) | **Não** | ~6,6 (estimativa) | O inspetor dá 10 FAIL e 7 WARN. Pela minha leitura, 4 FAIL são reais (`small-text`, `empty-screens`, `covered-text` a 768 e `few-pictures` pela metade) e 5 são do instrumento (§5) |

**A evolução:** v1 5,0 → v2 6,3 → v3 6,75 → v4 6,80 → **v4.6 6,87**. Developer: 6,56 → **7,53**. FWA: 63 → **65**.

O v4.6 subiu muito no código: HTML pré-renderizado, OG, Twitter, JSON-LD, ícones, o TBT caiu de 590 para 140 ms e o Lighthouse foi de 85 a 99. No design, subiu pouco, porque trocou coisas. **Ganhou** duas imagens de verdade: a maquete que se dissolve em dither, com o loop e a câmera, e a noite com gente. **Perdeu** em duração e em repetição: são 14 telas contra 10,9, o "sim" ficou passivo e o triângulo se repete. Essa nota não é máxima e não é arredondada para cima. Pela régua calibrada, um 9 ou 10 não existe para esta peça, e o teto realista está no §8.

---

## 2. Banca 1: Awwwards, júri principal

Seis jurados. Por critério, descartei a nota mais distante da média.

| Critério (peso) | Dir. arte | UX | Creative tech | Tipógrafo | Conteúdo | A11y/perf | Descartada | **v4.6** | v4 | v3 | v2 | v1 |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Design (40%) | 6,8 | 6,9 | 7,1 | ~~6,5~~ | 6,9 | 6,8 | 6,5 | **6,90** | 6,70 | 6,78 | 6,3 | 4,8 |
| Usability (30%) | 7,0 | 6,7 | ~~7,2~~ | 6,9 | 6,9 | 6,8 | 7,2 | **6,86** | 7,08 | 7,00 | 6,4 | 5,1 |
| Creativity (20%) | 7,0 | 6,8 | ~~7,2~~ | 6,8 | 7,0 | 6,7 | 7,2 | **6,86** | 6,68 | 6,42 | 6,3 | 5,0 |
| Content (10%) | 6,8 | 6,9 | 6,7 | 6,7 | ~~6,5~~ | 6,8 | 6,5 | **6,78** | 6,58 | 6,56 | 6,0 | 5,8 |
| **Ponderada** | | | | | | | | **6,87** | 6,80 | 6,75 | 6,3 | 5,0 |

### Design: 6,90 (+0,20)

**O que sobe.**
- **A maquete do escritório** é a melhor imagem que a BrandUp já teve. A borda se desfaz em grão de Bayer, as figuras de resina estão acesas e a câmera aproxima (`v-B-office.jpg`, `chromium-1440-motion-11/12.png`, `v-E-390.jpg` 3º quadro).
- **A noite deixou de ser um terreno vazio.** Tem seis figuras, a lua-relógio, "Office | Home" e a cama com "07:58 · 1 waiting" (`v-A-hero-night.jpg`, à direita).
- **O "All clear"** fecha o telefone com matéria: o silk roxo e "08:04 · 2 sent · 1 declined" (`v-H-you-faq-foot.jpg`).

**O que segura.**
- **O vazio continua.** A 1440, 12 dos 25 quadros entre o hero e o final têm menos de 4% de pixel aceso (L > 25), quando o critério do próprio brief-v4.2 §1 é nenhum (`_capture.json → litPct`). Os piores são a entrada do "sim" (y 5850: 1,13%), o FAQ (y 8550: 0,89%) e o vão antes do final (y 11250: 1,71%).
- **O triângulo aparece 5 vezes:** a intro, a rede do hero, o FAQ, o final e o rodapé, e as três últimas são seções seguidas.
- **O tipo tem 9 tamanhos:** 12, 13, 15, 16, 18, 56, 83, 104 e 351 px. Há rótulos em caixa alta pequena ("OFFICE", "HOME" e os títulos do rodapé, todos a 12 px com tracking de .08 em).

### Usability: 6,86 (−0,22)

**O que sobe.**
- O CTA está na 1ª tela (a 390, em y 251–295).
- Os 6 agentes cabem no quadro nas duas larguras: a 390, x vai de 18 a 372 e y de 765 a 839; a 1440, y vai de 759 a 861 (`_interact.json → *-agents`). O toque marca `aria-pressed="true"` nos dois motores, quando no v4 marcava `false`.
- No formulário, os erros vêm em frase humana e o foco vai para o primeiro campo inválido (`i-form-errors-1440.png`).
- O Tab tem 37 paradas, todas visíveis e todas com o anel pintado por prova de pixel (`_interact.json → tab`).

**O que derruba.**
- **A página cresceu.** São 12.559 px a 1440 (14 telas, contra 10,9 no v4) e 11.181 px a 390.
- **O palco do "sim" tem 2.970 px (3,3 telas)**, com limite de velocidade de 1,2 tela/s dentro dos palcos. O inspetor aponta "You have the final word." fixo por 4 telas (`long-pin`).
- **A roda é sequestrada** (`smoothScroll.ts`: lerp mais teto). A tecla e o toque continuam nativos, o que está certo, mas alguns jurados de UX descontam a roda.
- **No FAQ a leitura é em zigue-zague** em volta do triângulo, com as respostas a 15 px em cinza `#B7B4BB`.
- **A 390, a lua-relógio sai pela borda:** lê-se "05:2", de x 364 até a borda de 390 (`chromium-390-motion-05.png`).

### Creativity: 6,86 (+0,18)

**Novo e próprio.**
- A intro: a base acende e vira a seta (`v-G-intro.jpg`).
- As figuras em pontos que "trabalham" de noite.
- A maquete que se dissolve no grão da página.
- O "Sometimes late → Never late", que troca a palavra com a rolagem.

**O que segura.**
1. **O "sim" virou passivo.** O v4 tinha o melhor momento do site: a mão do visitante aperta Approve e a luz sobe. No v4.6, o Approve enche sozinho com a rolagem e não existe como botão (`_interact.json → youButtons: []`).
2. **O rodapé usa a palavra gigante**: "BrandUp" a 351 px. É o gesto que o próprio brief-v4.2 §3 item 4 descartou ("aqui não há palavra gigante"). Ela não está cortada pela base, então não é cópia de PI d-14 nem de DR-38, mas é o fecho mais comum da galeria.
3. **A rede do hero** continua, de longe, a imagem da categoria "IA".

### Content: 6,78 (+0,20)

**O que sobe.** A noite e o escritório agora têm fato com hora: "20:15 · quote sent", "07:58 · 1 waiting", "Leads overnight? / Nine, answered by 23:10.". O FAQ responde preço, dados, integração e prazo, e há 536 palavras (inspetor).

**O que segura.**
- Os dados são declarados ilustrativos.
- "Over $250K per month within 90 days" e "A$10M+ generated for clients" seguem sem prova na página.
- A única imagem "real" é um render.

---

## 3. Banca 2: Awwwards, Developer Award

| Categoria (peso) | Passou | Falhou | Nota | Pond. |
|---|---|---|---|---|
| **WPO (0,20)** | **Lighthouse mobile 99** nas duas corridas (GL por software e Metal): FCP 0,8 s, **TBT 140 ms** (software) / 10 ms (GPU), CLS 0, SI 1,2–1,3 s, **229 KiB em 13 requests** no carregamento. Com 4G lento real (RTT 562 ms, 1,4 Mb/s) e 4× CPU pelo CDP: o formulário fica utilizável em **1,53 s** e o motor sobe em 1,55 s. Os vídeos são preguiçosos (só baixam na aproximação). Nenhuma requisição duplicada | **LCP 2,10 s a 390** com o throttle real (o brief pede ≤ 2,0; a 1440 é 1,40 s). O LCP do Lighthouse oscila (0,8 s numa corrida, 2,2 s na outra). **A página inteira pesa 1,9 MB a 1440 e 1,25 MB a 390**, porque os loops webm somam 0,81 + 0,55 MB. `unused-javascript` 28 KiB, render-blocking ~130 ms. O console do chromium avisa **"GPU stall due to ReadPixels"**. CDN, cache e HTTP/2 não dá para avaliar em localhost | 7,8 | 1,56 |
| **RWD/Mobile (0,20)** | Uma composição própria a 390; os agentes dentro do quadro; alvos de 44–56 px; nenhum estouro horizontal; o lint não acha mais `100vh` | **O relógio cortado** ("05:2" na borda direita, a 390). **A crista da onda atravessa a fila de figuras** (a 390, y ≈ 300–325). **"the final word." 25% coberto pelo telefone a 768** (`covered-text`, inspetor) | 7,2 | 1,44 |
| **Semantics/SEO (0,20)** | **Sem JS: 2.874 caracteres e 11 headings** (`i-nojs-390.png`; no v4 eram 0). `lang="en-AU"`, title e description únicos, canonical, links todos em `<a href>` (0 por JS), header/main/nav/footer, H1 → H2 em ordem | Os 4 títulos do rodapé são **H2** (Product/Company/Legal/Contact) e inflam o sumário; deveriam ser H3 ou parágrafo. SEO 58 no Lighthouse por causa do `noindex`, e o `robots.txt` responde HTML (esperado num laboratório). Não verifiquei sitemap nem 404 | 7,6 | 1,52 |
| **Markup/Metadata (0,15)** | **OG completo** (10 tags, com imagem e alt), **Twitter Card**, **JSON-LD Organization**, favicon em SVG + 32 px + apple-touch, `alt`/`width`/`height` na imagem, 53 divs (pouca div-itis), nomes de classe semânticos | O validador W3C não rodou; a página tem uma `<img>` só | 7,6 | 1,14 |
| **Animations (0,15)** | Num **Apple M3 com GPU** (chromium com `--use-angle=metal`), **60 fps e p95 de 17–18 ms em todas as 9 cenas**, a 1440 e a 390, sem nenhuma tarefa longa. No **WebKit**, a rolagem lenta e a rápida ficam em **59–60 fps** (pior quadro 63 ms, um só). Com 4× CPU, a rolagem a 390 dá **58 fps**. O heap fica estável em 10 MB depois de 3 voltas (sem vazamento). O shader é próprio e o dither é em tempo real. Há pôster no reduced motion | **Com o GL por software (SwiftShader, o padrão do Playwright): 12–32 fps e de 36 a 96 tarefas longas por cena.** No v4, o mesmo instrumento dava 57–60 fps, e o `?gl=0` dá 60 fps cravados, então **o custo de GPU por quadro subiu 3–4×**. E o motor **não repousa** parado (tarefas longas com a página imóvel em 7 de 9 cenas a 390). ⚠️ **O loop dos bonecos é vídeo** (webm como textura): pela guideline, o vídeo não pontua aqui, só o tratamento em shader por cima dele | 7,4 | 1,11 |
| **Accessibility (0,10)** | Lighthouse a11y **100**; Tab completo e pintado; foco no erro; o conteúdo sobrevive sem JS **e sem CSS** (3.867 caracteres, `i-nocss-390.png`); o `?gl=0` funciona (`i-gl0-1440-*.png`); reduce com pôster | **axe: 1 serious** `color-contrast` (`.is-off`, **3,02–3,12:1** a 16 px, `#67656c` sobre `#1b1921`; o v4 tinha 0). As telas dos monitores da noite piscam em loop infinito (`mon-idle … infinite`) **sem controle de pausa** (é > 5 s enquanto a seção está na tela). VoiceOver não foi testado | 7,6 | 0,76 |
| **Total** | | | | **7,53** |

---

## 4. Banca 3: FWA

**Dispositivo escolhido: desktop 1440 com GPU (Safari ou Chrome).** É onde a maquete, o grão e as figuras têm tamanho para se ler, e onde mede 60 fps.

| Jurado | Nota | Por quê |
|---|---|---|
| Caçador de inovação | 64 | A maquete que se desfaz no grão da página e a noite com figuras de luz são próprias. A entrada ainda é uma rede de partículas |
| Diretor de arte | 66 | O escritório é bonito. Mas metade das telas é preto com pouco dentro, e o triângulo vira bordão |
| Técnico de WebGL/interação | 68 | Um contexto, dither de Bayer no vídeo, câmera, 60 fps no M3. Mas o loop é vídeo, o custo por quadro triplicou e o motor não repousa |
| Narrador | 67 | O enredo noite → escritório → telefone → "All clear" se lê. O "sim" que a mão fazia agora a rolagem faz |
| Cético do "já vi" | 59 | Partículas roxas, palavra gigante no rodapé, pictogramas 1-bit em grade 3×2 |
| **Média** | **65** | v1 51 → v2 59 → v3 60 → v4 63 → **v4.6 65** |

Lente histórica (secundária): Design 40 ≈ 26 · Navigation 25 ≈ 16 · Graphics 15 ≈ 11 · Content 15 ≈ 10 · Personality 5 ≈ 3, o que dá ~66.

---

## 5. Taste skill: `lint.mjs` e `inspect.mjs` (build de produção)

- **`lint.mjs src/proto`: 2 FAIL e 2 WARN.** Os dois FAIL são **falso positivo**: `proto.css:267` é `box-shadow: none`, e `shaders.ts:305` é a palavra "shadow" num comentário. Os 2 WARN de `padStart` são o relógio, legítimo.
- **`inspect.mjs`: 10 FAIL e 7 WARN** (`taste-inspect/report.json`). O v4 tinha 2 FAIL.

| Achado | Veredito | Medida |
|---|---|---|
| `empty-screens` 9/12 | **Real na maior parte.** O inspetor não vê o canvas, mas as fotos com o canvas pintado dão 12/25 quadros < 4% a 1440 | `_capture.json → litPct` |
| `small-text` 8 blocos < 13 px | **Real.** `.place` e `.foot-h` a 12 px, `.dtask` a 12 px a 390 | `proto.css:145`, `:351`, `:404` |
| `micro-label` "Office", "Home" | **Real.** São tiny caps tracked, e os 4 títulos do rodapé também | `proto.css:145`, `:351` |
| `covered-text` a 768 | **Real**, e só a 768 (não fotografei 768) | inspetor |
| `few-pictures` 0 | **Meio a meio.** A maquete é desenhada no canvas e não conta, mas de fato a página tem uma imagem do mundo só | — |
| `long-pin` "You have the final word." | **Real.** São 3,3 telas | `_capture.json → scenes` |
| `headline-lines` "Never late…" 3 linhas | **Instrumento.** Em todas as fotos são 2 linhas; a troca old/new empilhada engana a medida | `v-F-office-desks.jpg` |
| `gradient-text` | **Instrumento.** É o xadrez de Bayer do wordmark (`proto.css:364`, comentado) | — |
| `gradient` / `button-fx` a 390 | **Instrumento e decisão do dono.** É uma camada `linear-gradient` de cor única mais a textura do botão `field` | — |
| `hairline` `div.home` | É real, e o brief-v4.2 §5.2 pede. Defensável | `proto.css:171` |
| `blank-gap` 620 px em y 10144 | **Real.** É o fim do FAQ até o final | `chromium-1440-motion-22/23.png` |

### Ainda há sinais de "feito por IA"? **Sim, menos que no v4, e de outro tipo.**
1. **A trinca preto + violeta luminoso + menta.** O menta é decisão do dono, então não pesa na nota, mas é o sinal mais forte que sobra. O verde passa de **1,5% em 4 quadros a 390** (máximo de **3,65%** no palco do "sim", `chromium-390-motion-13/14`), contra o limite do brief-v4.2 §1.
2. **Os micro-rótulos em caixa alta** (OFFICE / HOME, os títulos do rodapé) e o texto a 12 px.
3. **A grade 3×2 de pictogramas idênticos com legenda** (a noite a 1440). Lê-se como "linha de cards com ícone", sem a caixa.
4. **A palavra gigante no rodapé**, o fecho mais copiado da galeria.
5. **O vazio escuro como estilo** (FAQ, entrada do "sim", vão antes do final).

O vocabulário está limpo: sem mono, sem pílula, sem eyebrow, sem glass e sem sombra.

---

## 6. Os pontos que você pediu (confirmados ou refutados)

| Ponto | Veredito | Evidência |
|---|---|---|
| **As mesas de Ad manager e Social ficam fora do quadro da maquete (só halo, sem boneco)** | **Confirmado.** A 1440, a etiqueta "Ad manager" (x ≈ 1010–1115, y ≈ 305–330) fica sobre um halo roxo **fora da área acesa da maquete**, sem mesa nem figura (`chromium-1440-motion-09.png`). No quadro seguinte são **dois halos soltos** à direita (x ≈ 1040–1210, y ≈ 300–580; `-10.png`). No `?gl=0`, as etiquetas "Ad manager" e "Social media" boiam à direita do oval, sobre o fundo (`v-I-hover-gl0.jpg`, embaixo à esquerda). Há ainda um **polígono roxo chapado** colado na parede da maquete (a 1440, ~x 625–780, y 315–390 em `-11.png`; a 390, no alto à direita) que se lê como erro de render | `v-F-office-desks.jpg`, `v-B-office.jpg`, `v-E-390.jpg` |
| **As figuras da noite em SVG pixelado leem ou ficam baratas?** | **Leem, e ficam baratas.** "Pessoa numa mesa com monitor" se lê nos dois tamanhos, ainda mais com o nome embaixo. Mas são pictogramas 1-bit de 40–56 px, **todos iguais**, numa grade 3×2 que ocupa ~35% × 25% da tela a 1440. Parecem um conjunto de ícones, e não "a mesma figura de resina da maquete em pontos" (brief-v4.2 §3 item 3). O atlas tirado do Blender e a escala ~2× resolvem | `v-A-hero-night.jpg` |
| **O escritório ainda está escuro?** | **Na primeira metade, sim; na segunda, não.** Com "Sometimes late…" (y 3150–4050 a 1440), a maquete é um bloco turvo com 3–4 mesas acesas e de 7,5% a 9,2% de pixel aceso, o que se lê como noite, de propósito, mas ainda turvo (`-07/-08.png`). Depois do "Never late" ela clareia (11–19%) e fica boa | `_capture.json`, `sheet-chromium-1440-motion.jpg` linhas 2–3 |
| **A crista da noite atravessa as figuras a 390** | **Confirmado nos dois motores.** A linha densa de pontos passa por cima dos monitores e das cabeças da 1ª fila (y ≈ 300–325) em `chromium-390-motion-05.png` e `webkit-390-motion-05.png`. No mesmo quadro, **o relógio sai da tela** ("05:2") | `v-E-390.jpg`, 1º quadro |
| **A coerência entre seções: há triângulo demais?** | **Sim, é repetição, e não rima.** São 5 aparições: a intro (sólido), o hero (rede), o FAQ (dither, ~560 × 520 px), o final (seta) e o rodapé (montanha + seta + wordmark). **FAQ, final e rodapé são três seções seguidas com o mesmo triângulo-seta.** No FAQ, os painéis escuros das respostas **recortam retângulos dentro do triângulo** ("How long until I see results?", a 1440, por volta de x 525–920 em `-21.png`), e isso se lê como colisão. A rima que o brief queria (intro ↔ rodapé) só funciona se o meio não repetir | `v-H-you-faq-foot.jpg` |

**Outros itens do brief-v4.2 §1 e §10:**

| Item | Resultado |
|---|---|
| A seta da intro sem verde | **Passa (visual).** É um triângulo roxo sólido com a seta clara nos dois motores, aos 350–1300 ms (`v-G-intro.jpg`). Não rodei a sonda de pixel dentro da silhueta |
| O verde ≤ 1,5% | **Falha a 390** (3,65%) |
| Nenhuma tela < 4% de pixel aceso | **Falha** (12/25 quadros a 1440) |
| O teste dos 2 segundos | **Não avaliado**: precisa de 5 pessoas |
| Sem palavra gigante cortada | **Passa na letra** (o wordmark não está cortado) e **falha na intenção** do §3 item 4 (a palavra gigante está lá) |

---

## 7. Defeitos objetivos (coordenada e medida)

| # | Defeito | Medida | Dono |
|---|---|---|---|
| D1 | Halos e etiquetas de Ad manager e Social fora da maquete | 1440: x ≈ 1010–1210, y ≈ 280–580 (`-09/-10`) | frontend-studio |
| D2 | Polígono roxo chapado na parede da maquete | 1440 `-11`: ~x 625–780, y 315–390; 390 `-10` | frontend-studio |
| D3 | A crista atravessa as figuras a 390 | y ≈ 300–325, nos dois motores | frontend-studio |
| D4 | O relógio cortado a 390 | "05:2" em x 364–390 | frontend-studio |
| D5 | Telas quase vazias | 12/25 quadros < 4% (1440); o pior tem 0,89% (y 8550) | ui-ux-director |
| D6 | O triângulo em 5 lugares, 3 seguidos; as respostas do FAQ recortam o triângulo | §6 | ui-ux-director |
| D7 | Página de 14 telas; "sim" de 3,3 telas | 12.559 px; 2.970 px | ui-ux-director |
| D8 | 9 tamanhos de tipo; 12 px; tiny caps | 12/13/15/16/18/56/83/104/351 px; `.place`, `.foot-h`, `.dtask` | type-director |
| D9 | Contraste `.is-off` | 3,02:1 (390) e 3,12:1 (1440) a 16 px | frontend-studio |
| D10 | Custo de GPU 3–4× e motor que não repousa | SwiftShader: 12–32 fps e até 96 tarefas longas por cena; `?gl=0` 60 fps | frontend-studio (+ frontend-craft no orçamento) |
| D11 | Aviso "GPU stall due to ReadPixels" no console | chromium 1440 | frontend-studio |
| D12 | LCP acima da meta a 390 | 2,10 s (4G lento + 4×, CDP); o elemento é um `SPAN` do H1 | frontend-studio |
| D13 | Verde acima do orçamento | 3,65% (390, palco do "sim") | ui-ux-director (o dono decidiu o botão) |
| D14 | Títulos do rodapé em H2 | 4 H2 no `<nav>` do rodapé | frontend-studio |
| D15 | "the final word." coberto a 768 | 25% (inspetor) | frontend-studio |
| D16 | Monitores piscando sem pausa | `mon-idle … infinite` (`proto.css:158`) | frontend-studio |

---

## 8. Comparação com o v4 e com o jimo, e o teto

- **Contra o v4.** Ganhou a imagem (a maquete), a gente na noite, o sem-JS, os metadados e um TBT 4× menor. Perdeu a ação da mão no "sim", ficou mais longo e repetiu o triângulo. O saldo é **+0,07** no Awwwards, **+0,97** no Developer e **+2** no FWA.
- **Contra o jimo** (`referencias/jimo-3d/jimo-3d-contato.jpg`). Os dois gestos que o v4 pegava emprestado (o terreno com etiquetas flutuando e o contador grande) **saíram**: a noite agora é uma grade de mesas com hora, e o dia virou uma linha pontilhada com "Day 90" a 13 px. **Não há mais sobreposição de mecanismo.** O jimo ainda ganha em **densidade e polimento**: em toda tela há um objeto rico, e as figuras dele são acabadas. O v4.6 ganha em ideia própria e em peso: 229 KiB no carregamento contra os 18–20 canvases do jimo.
- **Teto realista:** Awwwards **7,2–7,4**, FWA **68–72**, Developer **7,6–7,9**. Um 8+ pediria que a cena central fosse a página (a maquete em tempo real acendendo mesa por mesa com o sim da mão), e isso cobraria GPU e o celular do Meta.

**O que separa o v4.6 (6,87) do teto:**

| Correção | Ganho estimado |
|---|---|
| Encher ou encurtar as telas escuras | +0,15 |
| Um triângulo só no fim | +0,08 |
| Devolver a mão ao "sim" | +0,07 |
| As figuras da noite no acabamento da maquete | +0,06 |
| Limpar a maquete (D1/D2) | +0,04 |
| Tipo em 5 tamanhos, sem 12 px e sem caixa alta pequena | +0,04 |

---

## 9. O que mais sobe a nota (em ordem de impacto)

| # | Achado → correção | Evidência | Banca / critério | Pontos | Dono |
|---|---|---|---|---|---|
| 1 | **Encher ou cortar as telas escuras.** O FAQ, a entrada do "sim", o formulário e o vão FAQ → final. A meta do próprio brief é nenhuma tela < 4%. Encurtar o palco do "sim" de 3,3 para ~2 telas e a página de 14 para ≤ 11 telas | `litPct` (12/25); `long-pin`; `blank-gap` 620 px | Design, Usability; taste `empty-screens`; FWA | **+0,15** · +2 FWA | ui-ux-director → frontend-studio |
| 2 | **Um triângulo só no fim.** O FAQ volta a ser uma lista legível, sem o triângulo atrás e sem colisão, e o final e o rodapé viram **um** fecho (a seta nasce do chão uma vez só) | §6, `v-H-you-faq-foot.jpg` | Design, Creativity, Usability | **+0,08** | ui-ux-director |
| 3 | **Devolver a mão ao "sim".** Pelo menos o último pedido é um `<button>` Approve de verdade, que a pessoa aperta (teclado incluído), e é ele que faz a luz subir. A rolagem prepara, a mão decide. É a tese "You have the final word" | `youButtons: []` | Creativity, FWA (narrador, caçador) | **+0,07** · +2 FWA | ui-ux-director → frontend-studio |
| 4 | **As figuras da noite no nível da maquete.** O atlas do Blender (a mesma figura de resina em pontos, com pose variada), em escala ~2×, ocupando ≥ 50% da largura a 1440; e a crista passando atrás, nunca por cima (D3) | `v-A-hero-night.jpg`, `v-E-390.jpg` | Design, Creativity, RWD | **+0,06** · +1 FWA | frontend-studio (+ ui-ux-director na escala) |
| 5 | **Limpar a maquete.** Ad manager e Social dentro do enquadramento (ou a câmera não vai até eles) e o polígono roxo chapado fora (D1/D2) | `v-F-office-desks.jpg` | Design (acabamento) | **+0,04** | frontend-studio |
| 6 | **O tipo em 5 tamanhos.** Nada abaixo de 13 px; "Office/Home" e os títulos do rodapé em caixa de frase a 15 px; os títulos do rodapé como H3 ou `<p>` (D8/D14) | inspetor `small-text`, `micro-label` | Design (tipógrafo); taste | **+0,04** | type-director → frontend-studio |
| 7 | **O orçamento de GPU.** Repouso quando parado (sem desenhar quadro sem mudança), upload de vídeo só com quadro novo e só na seção visível, e caçar o `readPixels`. Medir num Android médio | `perf-scenes.mjs` (SwiftShader 12–32 fps; v4 57–60) | Developer (WPO, Animations); FWA técnico | +0,3 Developer | frontend-craft → frontend-studio |
| 8 | **Os detalhes de 390.** O relógio dentro da margem (D4); o LCP < 2,0 s (D12); o contraste `.is-off` ≥ 4,5:1 (D9); a pausa nos monitores (D16) | §7 | RWD, A11y, WPO | +0,2 Developer · +0,02 Awwwards | frontend-studio |
| 9 | **A palavra gigante do rodapé.** Decidir com o dono. O brief-v4.2 a descartou; se ficar, que seja a única "assinatura" e o triângulo saia de trás dela | `v-H-you-faq-foot.jpg` | Creativity, FWA cético | +0,02 · +1 FWA | ui-ux-director |

---

## 10. O que já está no nível (não mexer)

1. **A maquete com a borda em grão de Bayer**, o loop e a câmera (`v-B-office.jpg`): é a imagem-assinatura.
2. **O HTML pré-renderizado + metadados**: sem JS 2.874 caracteres, OG, Twitter e JSON-LD (`_interact.json → nojs`, `markup`).
3. **O carregamento**: Lighthouse 99, 229 KiB, formulário utilizável em 1,53 s com 4G lento + 4×.
4. **O teclado e o formulário**: 37 paradas com foco pintado, erro em frase e foco no primeiro inválido.
5. **A troca "Sometimes late → Never late"** e a noite com hora: é o conteúdo concreto que faltava.

## 11. Não avaliado

- **iPhone real, Instagram in-app, Android médio e VoiceOver**: não há aparelho.
- **O teste dos 2 segundos** com 5 pessoas.
- **A largura de 768** além do que o inspetor mediu.
- **Os limites do instrumento.** O Playwright não renderiza `backdrop-filter` no WebKit (a peça não usa) nem fotografa a scrollbar.
- **O fps do chromium sem GPU** é um proxy de GPU fraca, e não um aparelho.
- **CDN, cache, HTTP/2 e compressão**: localhost.
- **O validador W3C.**
- **O envio real do formulário**: não submeti dados válidos, para não gravar no Supabase.
- **A sonda de pixel verde dentro da silhueta da seta da intro**: só fiz a leitura visual.
