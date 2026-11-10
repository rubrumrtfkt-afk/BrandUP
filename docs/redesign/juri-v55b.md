# Júri v55b da landing da BrandUp (`proto.html`): a intro um passo de cada vez

Júri: design-jury (Awwwards júri principal + Developer Award + FWA) · 10/11/2026
Peça avaliada: `http://127.0.0.1:5180/proto.html`, o DEV que o dono usa, que continua no ar. Também avaliei o `dist/`, que está em dia (o `dist/proto.html` é 5 s mais novo que o `proto.html`), servido por `vite preview` em 127.0.0.1:5196 com Node 22. Esse servidor já foi derrubado. Nada do produto foi editado.
Instrumento: Playwright, com **Chromium com GPU** (`channel:'chromium'`; ligou o motor nas 8 corridas, com `gl-on`) e WebKit, a 1440×900 e 390×844, na 1ª visita e no recarregar, no DEV e no preview. São **16 corridas da intro**, cada uma com log por quadro (rAF) e vídeo. A régua é `~/.claude/design-library/juri/criterios-awwwards-fwa.md` mais o `juri-v55.md`.

As fotos ficam em `docs/redesign/juri-v55b-fotos/`:
- `intro-{dev,prev}-{webkit,chromium}-{1440,390}-{first,reload}.jpg`: a intro inteira a 8 quadros/s.
- `header-…jpg`: o recorte do header a 25 quadros/s.
- `nascimento-dev-chromium-1440.jpg` e `nascimento-dev-webkit-390.jpg`: o 1º 1,2 s a 25 quadros/s, com a mira no centro da tela.
- `scroll-dev-webkit-1440.jpg` e `scroll-dev-chromium-390.jpg`: a passada tela a tela.
- `rm-*.png` (reduced motion), `nojs-1440.png`, `*-first-end.png`.

Os logs, os vídeos e os scripts ficam no scratchpad, em `j55b/`: `intro.mjs`, `an.py`, `scroll.mjs`, `axe2.mjs` e `lh.json`.

---

## 1. Veredito

| Prêmio | Resultado | v55 | **v55b** |
|---|---|---|---|
| **Awwwards Honorable Mention** (≥ 6,5) | **Sim** | 7,01 | **6,99** |
| **Awwwards nível SOTD** (~7,2+) | **Não** | 7,01 | 6,99 |
| **Developer Award** (> 7) | **Sim (simulado)** | 7,58 | **7,68** |
| **FWA FOTD** (≥ 70) | **Não** | 67 | **67** |

**Pode ir ao dono? NÃO, ainda não. Falta uma correção, de 1 a 2 linhas de CSS, no passo 2.**

- **O bloqueante da v55 morreu.** O texto fica a opacidade 0,01 até M+450 ms nas 16 corridas. A luminância na caixa do H1 fica entre 26 e 35, que é o fundo, até a rede se formar.
- **A ordem dos passos está certa** nos 2 motores, nas 2 larguras, na 1ª visita e no recarregar.
- **O pulo de 0,75 → 1 do WebKit morreu.**
- **O que falha é o passo 2, justamente o que o dono descreveu com mais precisão.** O logo **não nasce no meio** e **não expande 4× de forma visível**:
  - Ele aparece **no quadrante de cima à esquerda** e escorrega na diagonal até o centro enquanto cresce.
  - O crescimento que se vê é de **1,7–2×** pelo log, e de menos ainda no vídeo a 1440.
  - A 390, a diagonal salta aos olhos (`intro-dev-chromium-390-first.jpg`, quadros 0,00–0,25 s).

---

## 2. Os 7 passos do dono

M é o início da transformação em rede (o pouso do logo): ~2,20–2,35 s na 1ª visita e ~1,32–1,45 s no recarregar.

| # | Pedido | Resultado | Evidência |
|---|---|---|---|
| 1 | Logo maior, quase do tamanho do triângulo da rede (um pouco menor) | **PASSA** | Ao pousar, a caixa do logo mede 637 px a 1440 e 264 px a 390. O triângulo dele (0,7 L) dá 446 e 185 px, contra 558 e 231 px do triângulo da rede (1,55 u): **80 %**. No vídeo, o logo pousado é claramente um pouco menor que a rede (`intro-dev-webkit-1440-first.jpg`, 2,12 s × 3,00 s) |
| 2 | Nasce no meio, vindo do fundo, expande ~4×, fica um tempo parado | **NÃO PASSA** (a pausa passa; o nascimento, não) | **O ponto de nascimento.** No 1º quadro visível, o centro do logo está em (362, 226), com 320 px, no chromium a 1440, e em (113, 245), com 153 px, no webkit a 390. É **exatamente a escala × o centro da tela**, e ele desliza até (720, 450) e (195, 422) (log rAF; `nascimento-dev-*.jpg`, a mira azul é o centro). **O ×4:** o CSS vai de 0,25 a 1, mas a opacidade só aparece quando a escala já passou de ~0,5, então o crescimento visível é de 320→637 px (2×) e 153→264 px (1,7×). **A pausa:** a escala chega a 1 em ~1,0 s e a viagem começa em ~1,65 s, então **0,6 s parado** (0,36 s no recarregar). **A causa:** a propriedade individual `scale` é aplicada **depois** do `transform: translate(...)` na matriz (translate → rotate → scale → transform), e por isso o `scale:.25` também encolhe a translação. Some-se a isso a opacidade em `steps(4)` de 0,36 s com uma curva que corre na saída |
| 3 | Vai para a direita e vira a rede com a seta; o texto continua invisível | **PASSA** | Viagem de ~1,65 a 2,25 s. A dissolução do SVG leva ~0,18 s e o motor leva 0,72 s. **0 quadro** sem o logo e sem o canvas depois do pouso, nas 16 corridas. O texto fica no **máximo a 0,01** até M+450 ms, e a luminância (p99,9) na caixa do H1, com o logo mascarado, fica entre **26 e 35**, o fundo. No vídeo, a rede está formada a 2,62 s e o texto surge a 2,75 s. A sobreposição com o fim do motor é de ~0,2 s e lê como sequência. **A 390, o logo DESCE** em vez de ir para a direita, porque a rede mora embaixo do texto. É a leitura certa, mas vale avisar o dono |
| 4 | Entram os textos (e o botão) | **PASSA** | H1 de M+0,50 a M+1,04 s, parágrafo de M+0,80 a M+1,24 s, botão de M+1,00 a M+1,24 s, igual nas 16 corridas (log) |
| 5 | No header, o triângulo entra de baixo para cima | **PASSA** | De M+1,19 a M+1,50 s. Em `header-dev-webkit-1440-first.jpg`, a 3,40 s aparece um fio na base, a 3,44 s meio triângulo e a 3,48 s o triângulo inteiro. É rápido, mas lê |
| 6 | "BrandUp" sai da esquerda para a direita, como de dentro do triângulo | **PASSA** | De M+1,44 a M+1,90 s, saindo de uma borda fixa ("dUp" → "andUp" → "BrandUp", de 3,64 a 3,88 s). A borda fica ~16 px à direita do triângulo, no vão entre os dois, e lê como "sai de trás do triângulo". Não chega a sair de dentro dele, mas não é defeito |
| 7 | A seta branca sobe dentro do triângulo | **PASSA** | De M+1,84 a M+2,21 s. Em `header-…-first.jpg`, a seta nasce na base do triângulo a 4,04 s e fica inteira a 4,12 s. A intro termina em M+2,26 s: **~4,5 s na 1ª visita e ~2,7 s no recarregar** |

**Sequência:** os 7 passos vêm em ordem, um por vez, nas 16 corridas. A sobreposição entre passos é de ≤ 0,05 s (5→6→7) e de ~0,2 s no fim do motor com o H1 (3→4). O pior intervalo entre quadros durante a intro foi de 26 a 167 ms, e o maior caiu antes do 1º quadro do logo, no webkit a 390. Nenhuma tarefa longa no webkit, e 0 a 2 no chromium.

**O pulo:** **morto.** Com `steps(4,jump-none)`, a opacidade do logo passa por 0 → 0,33 → 0,67 → 1, e a do SVG do header fica em 1, nos 2 motores. Não há mais o patamar de 0,75.

**A correção do passo 2 (dono: `frontend-studio`)**, no `proto.html`:
1. Posicionar com a propriedade **`translate`**, que entra antes do `scale`, e não com `transform`: `translate: var(--lx0) var(--ly0)` no `.intro .intro-logo`, e `@keyframes i-go{to{translate:var(--lx1) var(--ly1)}}`. O mesmo vale para o `.intro-morph`/`.intro-late`.
2. Deixar o logo visível ainda pequeno: a opacidade linear em ~0,12 s, ou o `i-near` numa curva menos adiantada (por exemplo, `cubic-bezier(.4,0,.2,1)` em ~0,8 s), para que o olho veja a ida de 0,25 a 1.
3. Medir de novo o centro do 1º quadro visível. Deve ficar a menos de 4 px do centro da tela, com a caixa em ~25–35 % do tamanho final.

---

## 3. Regressões e o resto da página

| Item | Resultado | Evidência | Gravidade |
|---|---|---|---|
| A passada pela página inteira (DEV, webkit 1440) | Sem regressão visível: hero, formulário, a noite, o escritório, o "Never late", o "You have the final word" (Approve e a rede das vozes), o celular 08:04, o FAQ, os depoimentos. Uma tela pegou o cruzamento "Sometimes/Never late" no meio da transição, como na v55 | `scroll-dev-webkit-1440.jpg` | — |
| Frame-rate na rolagem com a roda | webkit 1440 **58,4 fps** · webkit 390 **58,9** · chromium GPU 1440 **60,0** · chromium GPU 390 **57,1**, com 1 quadro de 349 ms e 0 tarefa longa registrada. A v55 deu 30 fps só porque o GL era por software | `scroll/scroll.json` | Baixa |
| Console | **0 erro** nas 16 corridas da intro e nas 4 passadas | logs | — |
| Lighthouse 13 mobile (preview local, Chrome for Testing) | Performance **99**, a11y **100**, BP **100**, SEO 58 (o `noindex` proposital). LCP 2,2 s (simulado), **TBT 40 ms** (v55: 640), CLS 0, 218 KiB, 11 requests. As 6 corridas do frontend batem: 98–99 e TBT de 10 a 110 ms. É localhost e não representa a rede real | `j55b/lh.json`, `proto-v55b/lh/*` | — |
| **A tensão do LCP** | O LCP é o H1 a opacidade 0,01 (0,1–0,5 s no laboratório). Pela especificação, conta. **Mas o título que a pessoa consegue ler só chega a ~3,3 s na 1ª visita** (M+1,04). Um jurado de dev pode ler isso como um jeito de enganar a métrica. É legítimo, e está declarado | log LCP + log de opacidade | Média (percepção) |
| axe-core | **0 violação no topo**. Rolando até o fim, aparecem **6 `color-contrast` sérios** nas linhas "anteriores" das mesas do escritório (`.prev.dline .dh` #4e4c51 sobre #08070b = **2,36:1**, `.dtk` #66656a = 3,47:1). É a hierarquia por opacidade de propósito, mas fica abaixo do mínimo. **Não provei que é regressão**: a v55 mediu só no topo | `axe2.mjs` | Média (B2 Accessibility) |
| Reduced motion (4 corridas) | **PASSA.** Sem a classe `intro`, sem o `.intro-logo` no DOM, H1 a opacidade 1 aos 250 ms, pôster com `gl-off` | log + `rm-*.png` | — |
| Sem JS | **PASSA.** H1 presente e a opacidade 1, 916 palavras | `nojs-1440.png` | — |
| Duração da intro | A 1ª visita subiu de ~1,9 s para **~4,5 s**, porque o dono pediu um passo de cada vez. O conteúdo legível chega a ~3,3 s. Qualquer toque, tecla, roda ou rolagem pula a intro | log | Média (B1 Usability) |
| O motor atrasado (`intro-late`) | Não remedi, porque o motor ligou nas 8 corridas de GPU. O frontend tem prova em `proto-v55b/checks/sheet-motor-atrasado-3500ms-chromium-1440.jpg` | — | Não avaliado por mim |

---

## 4. Banca 1: Awwwards, júri principal

| Critério (peso) | Dir. arte | UX | Creative tech | Tipógrafo | Conteúdo | A11y/perf | Descartada | **v55b** | v55 |
|---|---|---|---|---|---|---|---|---|---|
| Design (40%) | 7,0 | 7,0 | ~~7,2~~ | 7,0 | 7,0 | 6,9 | 7,2 | **6,98** | 6,98 |
| Usability (30%) | 7,0 | 6,9 | 7,0 | 7,0 | 6,9 | ~~6,6~~ | 6,6 | **6,96** | 7,04 |
| Creativity (20%) | 7,2 | 7,1 | ~~7,5~~ | 7,2 | 7,1 | 7,0 | 7,5 | **7,12** | 7,10 |
| Content (10%) | 6,8 | 6,9 | 6,8 | 6,8 | ~~6,6~~ | 6,9 | 6,6 | **6,84** | 6,84 |
| **Ponderada** | | | | | | | | **6,99** | 7,01 |

- **Design, igual.** Ganhou o quadro limpo (sem o texto fantasma), o logo grande e o header em três tempos. Perdeu porque o 1º segundo, que é o primeiro olhar, abre com o logo escorregando de um canto e sem a profundidade pedida.
- **Usability −0,08.** A intro mais que dobrou: ~4,5 s até o header fechar e ~3,3 s até o título ler. Ela pula com qualquer gesto, mas um jurado de UX conta o tempo.
- **Creativity +0,02.** A coreografia em passos deixa a ideia (a marca vira o sistema) legível, e o header que se monta é um bom eco dela.
- **Tensão declarada:** o "um passo de cada vez" do dono sobe a clareza e a Creativity e derruba a Usability, pelo tempo até o conteúdo.

## 5. Banca 2: Developer Award

| Categoria (peso) | Passou | Falhou | Nota | Pond. |
|---|---|---|---|---|
| **WPO (0,20)** | Performance 99, TBT 40 ms, CLS 0, FCP 0,8 s, 218 KiB, 11 requests, 0 erro, 57–60 fps com GPU | O LCP real é de percepção (a tensão do §3); 1 quadro de 349 ms no chromium a 390 | 7,9 | 1,58 |
| **RWD/Mobile (0,20)** | A 390 a sequência é a mesma, o logo desce para a rede, 57–59 fps | — | 7,6 | 1,52 |
| **Semantics/SEO (0,20)** | H1 e conteúdo sem JS | `noindex`, SEO 58 (proposital) | 7,4 | 1,48 |
| **Markup/Metadata (0,15)** | Sem mudança desde a v55 (não reauditado) | Falta o `FAQPage` | 8,0 | 1,20 |
| **Animations/Transitions (0,15)** | Animação em script em tempo real (CSS + o motor GL). Sequência estável em 16 corridas, o pulo de 0,75 morto, teto de espera pelo motor | O nascimento escorrega do canto (a ordem dos transforms) | 7,7 | 1,16 |
| **Accessibility (0,10)** | Reduced motion, "Skip intro", axe 0 no topo, a11y 100 | 6 contrastes sérios no escritório; os loops sem pausa; o Tab por pixel não foi refeito | 7,4 | 0,74 |
| **Total** | | | | **7,68** |

## 6. Banca 3: FWA (dispositivo: desktop a 1440 no webkit/Safari, onde a intro e a rede rodam inteiras e a 58 fps)

| Jurado | v55b | v55 | Por quê |
|---|---|---|---|
| Caçador de inovação | 69 | 69 | A ideia é a mesma, agora legível |
| Diretor de arte | 68 | 68 | Quadro limpo, mas o nascimento torto |
| Técnico WebGL/interação | 68 | 67 | Contínuo com GPU, e o atraso do motor tem saída |
| Narrador | 69 | 69 | Marca → sistema → promessa → assinatura no header |
| Cético do "já vi isso" | 62 | 63 | "O logo vira partículas" + uma intro mais longa |
| **Média** | **67** | 67 | Para ≥ 70 falta uma surpresa depois da intro |

Lente histórica (pesos antigos, só como referência): a Personality sobe um pouco com o header que se monta, e a Navigation desce pela espera.

---

## 7. O que mais sobe a nota (em ordem de impacto)

| # | Achado | Evidência | Banca e critério | Ganho | Dono |
|---|---|---|---|---|---|
| 1 | **BLOQUEIA.** Passo 2: nascer no centro e mostrar o ×4 (`translate` no lugar de `transform`; a opacidade visível ainda pequeno; ver o §2) | `nascimento-dev-*.jpg`, `intro-dev-chromium-390-first.jpg` | Passo 2 do dono; B1 Design; B2 Animations | +0,03 a +0,05 (B1), +0,1 (B2 Anim.) | `frontend-studio` |
| 2 | O contraste das linhas "anteriores" das mesas (2,36:1 e 3,47:1): subir o tom para Lc ≥ 45 no tamanho delas | `axe2.mjs` | B2 Accessibility | +0,03 | `ui-ux-director` → `frontend-studio` |
| 3 | O tempo até o conteúdo (~3,3 s): avaliar com o dono um encurtamento só na pausa e na viagem (por exemplo, 0,45 s de pausa) sem perder "um passo de cada vez" | log | B1 Usability | +0,03 a +0,05 | `ui-ux-director` |
| 4 | A pausa nos loops automáticos com mais de 5 s (pendência antiga) | v54/v55 | B2 Accessibility | +0,05 | `frontend-studio` |
| 5 | O `FAQPage` em JSON-LD | v55 | B2 Markup | +0,05 | `frontend-craft` |

## 8. O que já está no nível (não mexer)

1. **O texto invisível até a rede:** opacidade 0,01 e luminância de fundo nas 16 corridas, com o LCP preservado.
2. **A ordem 3 → 4 → 5 → 6 → 7**, estável na 1ª visita e no recarregar, nos 2 motores e nas 2 larguras (log).
3. **O header que se monta**: o triângulo de baixo, a palavra saindo e a seta subindo (`header-dev-webkit-1440-first.jpg`).
4. **A transição SVG → rede sem buraco**: 0 quadro vazio depois do pouso.
5. **O desempenho**: Lighthouse 99, TBT 40 ms, 57–60 fps com GPU.

## 9. Não avaliado

- **O Safari real e o iPhone**: tudo aqui é Playwright WebKit. Não houve VoiceOver.
- **O caminho do motor atrasado** (`intro-late`), que não remedi (ver o §3), e o chromium sem GPU, de propósito, porque o motor não liga no SwiftShader.
- **As fotos `scroll-dev-chromium-390.jpg` e `rm-*.png`**: foram geradas e não as abri. O reduced motion está provado pelo estado computado.
- **O Tab com prova por pixel e o formulário**: não refeitos (vale a v54). O sem CSS também não foi refeito.
- **O LCP de rede real**: as medidas são de localhost e do Lighthouse simulado.
