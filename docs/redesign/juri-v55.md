# Júri v55 da landing da BrandUp (`proto.html`): a intro nova e o hero sem corte

Júri: design-jury (Awwwards júri principal + Developer Award + FWA) · 10/11/2026
Peça: `http://127.0.0.1:5180/proto.html` (o DEV, que é o que o dono usa no Safari; o servidor continua no ar). O preview foi o `dist/` do repo (está em dia: nenhum arquivo de `src/` é mais novo que `dist/proto.html`), servido por `vite preview` em 127.0.0.1:5195 com Node 22 e já derrubado. Nada do produto foi editado.
Régua: `~/.claude/design-library/juri/criterios-awwwards-fwa.md` e o `juri-v54.md`.

Evidências em `docs/redesign/juri-v55-fotos/`:
- `intro-*.jpg`: as folhas de 10 quadros/s da intro (0,3 a 3,2 s do vídeo), no DEV e no preview, chromium e webkit, 1440 e 390, na 1ª visita e no recarregar.
- `header-*.jpg`: o recorte do header a 25 quadros/s, ampliado 2×.
- `zoom-*.png`: os quadros inteiros do "logo no meio".
- `scroll-*.jpg`: o arco (rolagem 0 / 0,15 / 0,3 / 0,5 da tela), a volta ao topo e a passada da página tela a tela.
- Os vídeos, os logs por quadro (rAF), as fotos `fit-*`, o Lighthouse e o `_scroll.json` ficam no scratchpad da sessão, em `j55/` (os scripts são `intro.mjs`, `sheets.py`, `scroll.mjs` e `an.py`).

---

## 1. Veredito

| Prêmio | Resultado | v54 | **v55** |
|---|---|---|---|
| **Awwwards Honorable Mention** (≥ 6,5) | **Sim** | 6,97 | **7,01** |
| **Awwwards nível SOTD** (~7,2+) | **Não** | 6,97 | 7,01 |
| **Developer Award** (> 7) | **Sim (simulado)** | 7,59 | **7,58** |
| **FWA FOTD** (≥ 70) | **Não** | 67 | **67** |

**Pode ir ao dono? Ainda NÃO, mas falta uma correção só, de uma linha.** Seis dos 7 passos passam, e os três defeitos antigos estão mortos nas minhas medidas (0 quadro sem estilo em 16 corridas, nenhum triângulo gigante, nenhum quadro sem a rede). O que falha é justamente o **passo 1, que é o primeiro que o dono vai ver**: o logo está no meio, mas **o texto do hero já está pintado atrás dele a 10% de opacidade, e lê** ("$250K per month" e o parágrafo, em `zoom-dev-webkit-1440-first-1.0s.png`). O dono pediu "sozinho, sem texto".

O motivo é técnico e conhecido: o H1 fica em `opacity:.1` para continuar candidato a LCP (o comentário do `Proto.tsx` diz isso). Só que qualquer opacidade acima de 0 mantém o elemento como candidato, então **`.01` resolve sem perder o LCP**. A tensão está declarada no §3.

---

## 2. Os 7 passos do dono (os quadros são meus)

| # | Pedido | Resultado | Evidência |
|---|---|---|---|
| 1 | O logo no MEIO, sozinho, sem texto | **NÃO PASSA** | **O logo está no meio:** centro em (720, 450) a 1440 e (195, 425) a 390, e 88 px (log rAF). **Mas não está sozinho:** de 1,0 a 1,4 s, o H1, o "within 90 days" e o parágrafo estão na tela a 10% (`.intro .hero h1>…{opacity:.1}`, `.lede{opacity:.1}`). No quadro inteiro (`zoom-dev-webkit-1440-first-1.0s.png`), o "$250K per month" lê sem esforço num monitor escuro. A 390 é igual (`intro-dev-webkit-390-first.jpg`, 0,7 a 1,3 s). Aparece nos 2 motores, no DEV e no preview, na 1ª visita e no recarregar |
| 2 | Vai para a DIREITA, no espaço da rede | **PASSA** | A 1440, o logo vai de (720, 450) a (973, 635) e cresce de 88 para 151 px em ~0,54 s, com curva de easing e sem salto (`intro-dev-webkit-1440-first.jpg`, 1,4 a 1,9 s). **A 390, ele DESCE** até (195, 729), porque no celular a rede mora embaixo do texto. É a leitura certa do pedido no celular, mas o dono pode estranhar se testar no iPhone |
| 3 | Vira a rede de luz com a seta branca no meio, contínua, sem corte nem sumiço | **PASSA** (webkit) · ressalva no chromium sem GPU | **No webkit** (1440 e 390, DEV e preview, 1ª e recarga): o triângulo se desfaz em grão roxo, a seta branca fica, e os fios crescem a partir dela até os nós, de 2,0 a 2,4 s (`intro-dev-webkit-1440-first.jpg`, linhas 3–4). **Zero quadro** sem o logo e sem o canvas depois do pouso (log rAF), e a contagem de pixels claros na zona da rede **nunca cai** depois de aparecer (16 vídeos a 25 quadros/s). **No chromium com GL por software:** o logo fica **parado** à direita como um triângulo chapado por 1,7 s no DEV (`intro-dev-chromium-1440-first.jpg`, 1,5 a 3,2 s) e por **mais de 5 s** no preview, à espera do motor. Ele não some, mas a tela congela (rAF sem quadro de 1196 a 2899 ms). É o limite do instrumento, e é também o que um aparelho fraco vai ver |
| 4 | O texto e o botão aparecem à esquerda | **PASSA**, com ressalva de ordem | O texto e o botão entram à esquerda, sem colidir. **A ordem não é a da lista do dono:** o H1 chega a 1,0 ainda **durante a viagem** do logo (870–1090 ms no log), o parágrafo termina a 1404 ms e o botão a 1420 ms, enquanto a transformação em rede começa a 1103 ms. Ou seja, o texto vem junto com a rede, e não depois dela. Como coreografia, funciona; como leitura literal da lista, é simultâneo. Vale perguntar ao dono, e não é defeito |
| 5 | Header: o triângulo, depois "BrandUp", depois a seta subindo dentro do triângulo, de baixo para cima | **PASSA** | `header-dev-webkit-1440-first.jpg`: o triângulo aparece a ~1,3 s, a palavra a ~1,46 s, e a seta sobe por dentro, cortada pelo triângulo, de 1,9 a 2,0 s. O log confirma: a seta vai de translateY 22 a 0 entre 1179 e 1575 ms. **Ressalva do WebKit:** com `steps(4,end) forwards`, o WebKit segura a opacidade em **0,75** (o triângulo do header e o logo da intro ficam a 75% durante a intro) e pula para 1 quando a classe `intro` sai, a ~1,9 s. É um pulinho de brilho no fim, pequeno; não conferi no Safari real |
| 6 | Tudo sincronizado e harmônico | **PASSA** (webkit) · ressalva sem GPU | No webkit, a peça inteira leva ~1,9 s na 1ª visita e ~1,15 s no recarregar. Uma coisa puxa a outra e não há buraco (`intro-dev-webkit-1440-first.jpg`, `intro-dev-webkit-1440-reload.jpg`). No chromium sem GPU, a espera pelo motor quebra o ritmo (passo 3) |
| 7 | A rede mais para a esquerda, sem corte na direita | **PASSA** | Na borda direita da rede assentada (pixel claro > 120), a sobra até a borda da tela é de **76 px a 1280, 85–91 px a 1440, 97–100 px a 1920 e 37–39 px a 390**. Há **0 pixel claro** nas 4 últimas colunas, nos 2 motores (`j55/intro/fit-*.png`) |

**Os defeitos antigos:**

| Defeito | Resultado | Evidência |
|---|---|---|
| Quadro sem estilo no DEV | **Morto** | 0 quadro, em 16 corridas, com o HTML visível antes do CSS (log rAF, de 1ª visita e de recarga) |
| Triângulo roxo gigante | **Morto** | O maior SVG visível mede 151 px, que é o logo da intro ao pousar. Nenhum passa disso |
| Quadro com a rede sumida | **Morto** | 0 quadro sem o logo e sem o canvas depois do pouso, e nenhuma queda na luminância da rede |

---

## 3. Regressões e riscos no resto da página

| Item | Resultado | Evidência | Gravidade |
|---|---|---|---|
| A passada pela página inteira (DEV, webkit 1440) | Sem regressão visível. A noite, o escritório, o "sim" (o card Approve e a rede das vozes), o FAQ, os depoimentos, o 2º formulário e o rodapé pintam todos | `scroll-webkit-1440.jpg` (tour-00 a tour-13) | — |
| A seta subindo em arco ao rolar | Funciona: a 0,3 da tela, a seta inclina e sai pela direita | `scroll-webkit-1440.jpg`, `arc-0.3` | — |
| A volta ao topo | O hero se refaz inteiro | `back-top` | — |
| Frame-rate na rolagem rápida | Webkit: **57,6 fps a 1440 e 59,5 a 390**, 0 tarefa longa. Chromium sem GPU: **30,3 fps e 28 tarefas longas de até 337 ms** a 1440 (v54: 28–29 fps, então igual); a 390, 55,2 fps | `j55/scroll/_scroll.json` | Média, como na v54 |
| A espera pelo motor na intro, sem GPU | O logo fica parado de 1,7 s a mais de 5 s antes de virar rede (passo 3). **Não há um teto de espera:** passado um prazo curto, a intro deveria seguir sem o motor | log rAF, `intro-dev-chromium-1440-first.jpg` | Média (no aparelho fraco) |
| Lighthouse 13 mobile (preview local) | Performance **83** (v54: 87/99), a11y 100, BP 100, SEO 58 (é o `noindex` proposital). LCP 2,1 s, CLS 0, **TBT 640 ms** (v54: 470 numa corrida), 217 KiB e 11 requests. É uma corrida só, em localhost, e não representa a rede real | `j55/lh-mobile.json` | Baixa a média |
| LCP | Continua no H1 (`STRONG.h-giant`): 196–298 ms a 1440 e `P.lede` a 390, no laboratório local | log `largest-contentful-paint` | — |
| Console | **0 erro** em todas as corridas. O chromium dá 4 avisos "GPU stall due to ReadPixels" na 1ª visita (DEV e preview). Não há `readPixels` no `src/`, então é o driver de GL por software; não aparece no webkit | os logs da intro | Baixa |
| axe-core | **0 violação** (chromium a 1440 e a 390) | `_scroll.json` | — |
| O formulário | Preenchido pelo script nos 4 cenários, sem erro no console. **Não abri as fotos** (`j55/scroll/*-form.png`), então os feixes por campo não foram reconferidos nesta rodada | — | Não avaliado |

---

## 4. Banca 1: Awwwards, júri principal

| Critério (peso) | Dir. arte | UX | Creative tech | Tipógrafo | Conteúdo | A11y/perf | Descartada | **v55** | v54 |
|---|---|---|---|---|---|---|---|---|---|
| Design (40%) | 7,1 | 7,0 | ~~7,3~~ | 6,9 | 7,0 | 6,9 | 7,3 | **6,98** | 6,96 |
| Usability (30%) | 7,1 | 7,0 | 7,1 | 7,0 | 7,0 | ~~6,7~~ | 6,7 | **7,04** | 7,00 |
| Creativity (20%) | 7,2 | 7,1 | ~~7,5~~ | 7,1 | 7,1 | 7,0 | 7,5 | **7,10** | 7,00 |
| Content (10%) | 6,8 | 6,9 | 6,8 | 6,8 | ~~6,6~~ | 6,9 | 6,6 | **6,84** | 6,84 |
| **Ponderada** | | | | | | | | **7,01** | 6,97 |

- **Creativity +0,10.** O logo que viaja e se desfaz na rede, com a seta ficando no meio, é a primeira ideia **da marca** na entrada: o símbolo vira o sistema. Antes, a entrada era "partículas roxas no preto".
- **Design +0,02, e só isso**, por três motivos:
  - o texto fantasma a 10% suja o quadro do "logo sozinho";
  - o triângulo chapado no meio (88 px, roxo sólido com a seta) é o único momento vetorial plano numa peça toda de luz;
  - o fecho continua igual.
- **Usability +0,04.** A intro ficou mais curta (~1,9 s na 1ª visita e ~1,15 s no recarregar). A falta de pausa nos loops segue.
- **Content:** sem mudança.

## 5. Banca 2: Developer Award

| Categoria (peso) | Passou | Falhou | Nota | Pond. |
|---|---|---|---|---|
| **WPO (0,20)** | FCP 0,8 s, SI 1,1 s, CLS 0, 217 KiB, 11 requests, 0 erro no console | Performance 83, **TBT 640 ms** (pior que a v54), 30 fps e tarefas de 337 ms com GL por software | 7,4 | 1,48 |
| **RWD/Mobile (0,20)** | A 390 a rede cabe (sobra de 37–39 px) e o logo desce para o lugar da rede; 59,5 fps no webkit | — | 7,6 | 1,52 |
| **Semantics/SEO (0,20)** | Sem mudança desde a v54 (não reauditado) | `noindex`, SEO 58 (proposital) | 7,4 | 1,48 |
| **Markup/Metadata (0,15)** | Sem mudança desde a v54. O SVG do header tem `width`/`height` no markup, e isso matou o triângulo gigante | Falta o `FAQPage` | 8,0 | 1,20 |
| **Animations/Transitions (0,15)** | **A intro agora é animação em script em tempo real** (CSS + o motor GL), e não vídeo: pontua aqui. Webkit a 58–60 fps, sem buraco | Não há teto de espera pelo motor (o congelamento sem GPU); o pulo de 0,75→1 no WebKit | 7,6 | 1,14 |
| **Accessibility (0,10)** | axe 0, Lighthouse a11y 100. A intro tem "Skip intro" e some com reduced motion | Os loops sem pausa. O Tab com prova por pixel não foi refeito nesta rodada | 7,6 | 0,76 |
| **Total** | | | | **7,58** |

## 6. Banca 3: FWA (dispositivo: desktop a 1440 no Safari/webkit com GPU, onde a intro roda inteira em 1,9 s)

| Jurado | v55 | v54 | Por quê |
|---|---|---|---|
| Caçador de inovação | 69 | 68 | O logo que vira a rede é próprio |
| Diretor de arte | 68 | 68 | O fantasma de texto e o triângulo chapado no meio |
| Técnico WebGL/interação | 67 | 67 | Contínuo com GPU; congela sem GPU |
| Narrador | 69 | 68 | A marca → o sistema → a promessa, em 2 s |
| Cético do "já vi isso" | 63 | 62 | Ainda é "o logo explode em partículas" |
| **Média** | **67** | 67 | Para ≥ 70 falta a peça surpreender depois da intro |

Lente histórica (pesos antigos, só como referência): Personality 5 sobe com a intro de marca.

---

## 7. O que mais sobe a nota (em ordem de impacto)

| # | Achado | Evidência | Banca e critério | Ganho | Dono |
|---|---|---|---|---|---|
| 1 | **BLOQUEIA.** O texto fantasma no "logo sozinho". Trocar `opacity:.1` por `.01` em `.intro .hero h1>…` e `.intro .hero .lede` (no `proto.html`). O elemento continua candidato a LCP, e é preciso medir o LCP depois | `zoom-dev-webkit-1440-first-1.0s.png` | Passo 1 do dono; B1 Design | +0,03 a +0,05 | `frontend-studio` |
| 2 | Um teto de espera pelo motor: se o `gl-on` não chegar ~400–600 ms depois do pouso, seguir a intro sem a transformação (o caminho `start(false)` já existe) | `intro-dev-chromium-1440-first.jpg`; preview > 5 s | B2 Animations e WPO; B1 Usability no aparelho fraco | +0,05 a +0,1 (B2) | `frontend-studio` |
| 3 | Decidir com o dono se o texto entra **depois** da rede (a lista dele) ou **junto** (como está) | log rAF (passo 4) | Passo 4 | gosto | `ui-ux-director` |
| 4 | O WebKit segura em 0,75 com `steps(4,end) forwards`; usar `steps(4,jump-none)` ou um último keyframe explícito | log webkit (tri 0,75 → 1 a ~1,9 s) | B1 Design (acabamento) | +0,01 | `frontend-studio` |
| 5 | O TBT de 640 ms (era 470): reconfirmar em 3 corridas antes de tratar | `j55/lh-mobile.json` | B2 WPO | +0,05 | `frontend-craft` |

## 8. O que já está no nível (não mexer)

1. **O hero cabe na tela, sem corte**: sobra de 76–100 px de 1280 a 1920 e 37–39 px a 390, nos 2 motores.
2. **A transformação do logo em rede no webkit** é contínua e não deixa nenhum quadro vazio (`intro-dev-webkit-1440-first.jpg`).
3. **O header em três tempos** (o triângulo, a palavra, a seta subindo cortada pelo triângulo): `header-dev-webkit-1440-first.jpg`.
4. **O DEV sem nenhum quadro sem estilo**, e o SVG com `width`/`height` no markup.
5. **O arco da seta e a volta ao topo**, intactos (`scroll-webkit-1440.jpg`).

## 9. Não avaliado

- **O Safari real no Mac do dono e o iPhone**: tudo aqui é Playwright WebKit. O pulo de 0,75 pode ou não aparecer no Safari.
- **O chromium com GPU (Metal)**: as corridas de chromium foram com GL por software, e o congelamento da intro pode ser só dele.
- **As fotos do formulário** (geradas, não abertas), o Tab com prova por pixel, o sem JS e o sem CSS: não foram refeitos nesta rodada (vale a v54).
- **VoiceOver.** E a análise quadro a quadro de "nada aparece de repente" na página inteira.
- **O LCP de rede real**: as medidas são de localhost.
