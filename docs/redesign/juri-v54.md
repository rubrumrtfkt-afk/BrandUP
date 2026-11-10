# Júri v54 da landing da BrandUp (`proto.html`)

Júri: design-jury (Awwwards júri principal + Developer Award + FWA) · 09/11/2026
Peça: `http://127.0.0.1:5180/proto.html` (dev; o servidor continua no ar). Para medir performance usei um build de produção feito **fora do repo** (`vite build --outDir scratchpad/dist54`), servido por `vite preview` em 127.0.0.1:5194, que já foi derrubado. Nada do produto foi editado.
Régua: `~/.claude/design-library/juri/criterios-awwwards-fwa.md` e o `juri-v53.md` (a lista de correção e os 10 pedidos do dono).
Evidências em `docs/redesign/juri-v54-fotos/`:
- `v54/`: as checagens desta rodada (chromium e webkit × 1440 e 390 × movimento e reduce): o hero voltando ao topo por 4 caminhos, o arco, o formulário, o "final word" em rajadas de 6 quadros, o FAQ entrando, o escritório e o `?gl=0`. Os dados estão em `v54/_v54.json`.
- `sheets/`: as folhas de contato (`hero-return-*`, `arc-*`, `you-*`, `form-*`, `office-1440.jpg`), o zoom da seta (`arrow-zoom.jpg`), os recortes do "final word" (`you-crops.jpg`) e as provas do frontend que eu abri (`proof-form-office.jpg`).
- `shots/`: 244 fotos da passada completa (intro, arco e rolagem), com `_capture.json`.
- `states/`: o axe, o Tab com prova por pixel, os estados, `?sig=0`, `?gl=0`, sem JS, sem CSS e o 4G lento, com `_interact.json`.
- `_lh-mobile-1/2.json` e os scripts em `tools/`.

---

## 1. Veredito

| Prêmio | Resultado | v53 | **v54** |
|---|---|---|---|
| **Awwwards Honorable Mention** (≥ 6,5) | **Sim** | 6,86 | **6,97** |
| **Awwwards nível SOTD** (~7,2+) | **Não** | 6,86 | 6,97 |
| **Developer Award** (> 7) | **Sim (simulado)** | 7,41 | **7,59** |
| **FWA FOTD** (≥ 70) | **Não** | 66 | **67** |

**Pode ir ao dono agora? PODE.** Os 9 pedidos que dá para provar com foto passam; o nº 10 continua parcial, como na v53. Os defeitos que bloqueavam a v53 estão corrigidos, e eu os vi nas minhas fotos:
- o hero que não voltava no chromium;
- a seta em chiado;
- a colisão a 390;
- o "All clear" ilegível;
- os nomes apagados;
- o logo pequeno;
- a validação no Tab.

Ficam três pendências que não bloqueiam a revisão do dono (ver §7):
- **não há pausa** para os loops do escritório (WCAG 2.2.2);
- **com GL por software, a performance piorou** em relação à v53;
- **o pedido nº 10 não está provado** quadro a quadro.

A nota subiu pouco porque as correções tiraram defeitos, mas não trouxeram ideia nova. O teto (abaixo do SOTD e abaixo de 70 no FWA) continua sendo o da v53: a entrada em "partículas roxas no preto" e o fecho com a palavra gigante e o triângulo.

---

## 2. Os 10 pedidos do dono (v53 → v54)

| # | Pedido | v53 | **v54** | Evidência (minha) |
|---|---|---|---|---|
| 1 | Rede de luz igual à da foto + seta branca de luz encaixada, subindo em arco | NÃO | **PASSA** | **A volta ao topo:** a rede inteira se refaz no chromium a 1440 pelos 4 caminhos testados: o salto de 3200→0, a roda para baixo e para cima, meia tela e o salto de 9000→0 (`sheets/hero-return-chromium-1440.jpg`). As folhas `hero-return-webkit-1440`, `-chromium-390` e `-webkit-390` estão geradas, mas eu só medi o brilho delas e não as abri. **A seta:** agora é grão roxo-branco com o núcleo claro, a mesma matéria dos nós e igual nos dois motores (`sheets/arrow-zoom.jpg`, painéis 1–2). **O arco:** a seta inclina ~25° e sai pela direita entre y 120 e 360 (`sheets/arc-chromium-1440.jpg`), e a subida já não é reta. Ressalva de gosto: a silhueta é a de uma "seta-bloco" de ícone genérico. A 390, ela pousa sobre o nó central, e as linhas leem grossas, quase sólidas (`arrow-zoom.jpg`, painéis 5–6) |
| 2 | "$250K per month" como o maior destaque, sem ficar gigante | PASSA | **PASSA** | Sem mudança (`v54/chromium-1440-top-a.png`) |
| 3 | Intro em toda carga; ao recarregar, a rede não se monta à vista | PASSA | **PASSA (herdado)** | Não houve mudança declarada. As fotos novas da intro estão em `shots/*-intro1-*` e `*-intro2-*`, mas eu não as reinspecionei nesta rodada |
| 4 | "Diagnosis" verde; logo do header maior | NÃO | **PASSA** | O logo mede **36×36 a 1440 (era 28) e 30×30 a 390 (era 24)**. "Diagnosis" está em `rgb(88,246,177)` (`_v54.json → brand, diag`) |
| 5 | 1º formulário animado (horizonte, feixe por campo, partículas que reagem ao mouse) | PARCIAL | **PASSA** | Um feixe vertical acende por campo válido, de 0 a 5 (`proto-v54/proof7b/sheet-beams-chromium.png`), e as partículas se adensam e clareiam perto do ponteiro (`ptr-pair-webkit.png`). As duas provas são capturas do frontend: eu abri e conferi, mas não reproduzi com o meu script (`sheets/proof-form-office.jpg`) |
| 6 | Noite e escritório como estavam | PASSA | **PASSA** | `sheets/office-1440.jpg`. O `<picture>` só aparece no reduce e no `?gl=0` (ver §6) |
| 7 | "Final word": conteúdo mais acima, sem pontos espremidos, nomes legíveis, seda na altura toda | NÃO | **PASSA** | **A 390, não há colisão:** o rótulo do agente ("Your follow-up / Sending") fica sob a rede, longe do card, nos 24 quadros (`sheets/you-chromium-390.jpg`). As sobreposições que o detector achou são os cards empilhados atrás do card da frente, que é opaco. **A 1440, os nomes** ficam colados à rede, logo abaixo do card, e leem bem; o ativo fica branco com o status embaixo (`sheets/you-crops.jpg`, painéis 1–2). **O "All clear" a 390, assentado, tem ≈ 4,4:1** (chromium e webkit). Durante a entrada, a seda clara aparece **sem texto** e o texto entra depois, sobre a seda escurecida. Nas 6 amostras (0–1400 ms) não há quadro com texto ilegível |
| 8 | Questions: textos entrando com transição; sem o "All clear" repetido | PARCIAL | **PASSA** | O "All clear" só existe na seção `you`. **A entrada do FAQ foi medida:** a opacidade do título vai de 0,24 a 0,90 e depois a 1,0 em 240 ms, e a resposta vai de 0,64 a 0,97 e depois a 1,0 (chromium a 390, `_v54.json → faq`; `v54/chromium-390-faq-*.png`). A 1440, a minha amostra pegou o FAQ já assentado |
| 9 | Depoimentos de volta e animados | PASSA | **PASSA** | As linhas acendem uma a uma, com o trilho e as iniciais (`sheets/you-chromium-1440.jpg`, linha 4; `you-chromium-390.jpg`, linha 4) |
| 10 | Transições entre seções, nada aparecendo de repente, fragmentos verdes | PARCIAL | **PARCIAL** | A entrada do FAQ e a da seda estão provadas. **"Nada aparece de repente" na página inteira** continua sem a análise quadro a quadro. O frontend deixou `proto-v54/clear/`, que eu não analisei |

---

## 3. A lista de correção da v53 (1–10)

| # | Correção pedida | Status | Evidência |
|---|---|---|---|
| 1 | Refazer a rede ao voltar ao topo no chromium | **Corrigido** | 4 caminhos (`hero-return-chromium-1440.jpg`) |
| 2 | Seta de luz, igual nos dois motores, com arco | **Corrigido** | `arrow-zoom.jpg`, `arc-chromium-1440.jpg` |
| 3 | Colisão a 390 | **Corrigido** | `you-chromium-390.jpg` e `you-webkit-390.jpg` |
| 4 | Contraste do "All clear" durante a entrada | **Corrigido** | ≈ 4,4:1 assentado; nenhum texto sobre a seda clara |
| 5 | Nomes dos agentes a 1440 | **Corrigido** | `you-crops.jpg` |
| 6 | Logo maior | **Corrigido** | 36 e 30 px |
| 7 | Provar o feixe, o mouse e a entrada do FAQ | **Corrigido** (feixe e mouse pela prova do frontend; FAQ pela minha medida) | §2, itens 5 e 8 |
| 8 | Não validar ao passar com Tab | **Corrigido** | Passar com Tab dá 0 `aria-invalid`. `maria@` + blur dá o erro só no email. O envio vazio dá 4 erros e põe o foco em "name" (`sheets/form-*.jpg`, nos 2 motores e nas 2 larguras) |
| 9 | A requisição duplicada, a pausa nos loops e o anel no FAQ a 390 | **Parcial** | **A duplicata saiu:** no build de produção a 390 com 4G lento, `office-day-p780.webp` baixa 1× e a página inteira soma 12 requests e 979 KB (era 14 e 1,0 MB). **O anel do FAQ a 390** está provado por pixel nos 5 itens, e o Tab a 390 dá 45/45. **A pausa continua faltando:** os loops viraram textura do WebGL (0 `<video>` no DOM), mas continuam automáticos e com mais de 5 s, e não há controle (`pauseBtns: []`) |
| 10 | Antes da produção: `noindex`, `robots.txt`, `FAQPage` | Não feito (esperado) | Lighthouse SEO 58 |

---

## 4. Regressões que procurei na v54

| Área | Achado | Gravidade |
|---|---|---|
| **A queda de qualidade a 60% (GL por software)** | Chromium headless a 1440 no build de produção: **28–29 fps e 118–126 tarefas longas de até 244 ms** na rolagem inteira. Na v53 eram 33 fps e 89 tarefas de até 231 ms. Antes a qualidade caía pela metade 2× (para 25%); agora cai 1× (para 60%). O aparelho sem GPU boa ficou pior. O Lighthouse mobile deu **TBT de 470 ms** numa das 2 corridas. **Com GPU (Metal), ficou 60 fps cravados e 0 tarefa longa** (v53: 58,9) | **Média.** O dono, num Mac, não vai ver; o celular fraco, sim |
| **O brilho compensado (`uThin`)** | Na região da rede (x 900–1440, y 100–850) a 1440, a média de luminância cai de 26,1 para 24,3 depois da queda (−7%), e os pixels acima de 200 caem de 12.408 para ~9.700 (−22%). Na foto, a rede depois da queda continua igual à referência (`hero-return-chromium-1440.jpg`, painel 5). O "pulo" de brilho no instante da queda não foi medido | Baixa |
| **A seta nova** | Não lê mais como chiado. A silhueta é uma seta-bloco genérica (gosto, não defeito). A 390, ela pousa sobre o nó central | Gosto |
| **Os nomes do palco** | Leem bem. As linhas de base sobem e descem ±4 px, seguindo os nós (`you-crops.jpg`). É ofício, quase invisível | Baixa |
| **A validação** | Correta nos 2 motores e nas 2 larguras. O erro aparece em frase humana ("Check your email. It needs an @ and a domain…") | Nenhuma |
| **O `<picture>` só no reduce e no `?gl=0`** | No movimento, `.office-fallback img` não existe. No reduce e no `?gl=0` ele aparece com a imagem carregada (1152 px a 1440, 390 px a 390; `sheets/office-1440.jpg`) | Nenhuma |
| **Requests no dev** | No servidor de dev, o evento `request` do Playwright mostra as variantes 1600 **e** 780 das webp e dos loops, em webm e mp4, e algumas 2×, a 1440 e a 390. No build de produção a 390, a medida por resource timing mostra só as variantes 780, 1× cada. **A 1440 em produção, não medi**: se o motor busca as 780 e as 1600 também em produção, isso é peso jogado fora | A conferir |
| Console | O chromium avisa "GPU stall due to ReadPixels" 4× (o mesmo da v53). O webkit não dá erro | Baixa |

---

## 5. Banca 1: Awwwards, júri principal

| Critério (peso) | Dir. arte | UX | Creative tech | Tipógrafo | Conteúdo | A11y/perf | Descartada | **v54** | v53 |
|---|---|---|---|---|---|---|---|---|---|
| Design (40%) | 7,1 | 7,0 | ~~7,3~~ | 6,9 | 7,0 | 6,8 | 7,3 | **6,96** | 6,88 |
| Usability (30%) | 7,0 | 6,9 | 7,1 | 7,0 | 7,0 | ~~6,7~~ | 6,7 | **7,00** | 6,80 |
| Creativity (20%) | 7,1 | 7,0 | ~~7,4~~ | 7,0 | 7,0 | 6,9 | 7,4 | **7,00** | 6,94 |
| Content (10%) | 6,8 | 6,9 | 6,8 | 6,8 | ~~6,6~~ | 6,9 | 6,6 | **6,84** | 6,84 |
| **Ponderada** | | | | | | | | **6,97** | 6,86 |

- **Design 6,96.** Sobe com a seta que agora é da mesma matéria da rede, com o hero que se refaz e com o "final word" limpo. Não passa de 7 por quatro motivos:
  - a seta-bloco é genérica;
  - a 390, as linhas da rede são grossas;
  - o fecho com a palavra gigante e o triângulo continua;
  - o quadro de 450 ms da intro (o trapézio chapado) não foi tocado.
- **Usability 7,00.** Saíram a validação no Tab, a colisão e os nomes ilegíveis. Seguem descontando a intro em toda carga (~2,5 s) e a falta de pausa.
- **Creativity 7,00.** A seta que nasce da rede e sai em arco agora convence. A costura segue boa. A entrada continua sendo a imagem da categoria IA.
- **Content 6,84.** Sem mudança: "$250K" e "10 million" seguem sem prova.

## 6. Banca 2: Developer Award

| Categoria (peso) | Passou | Falhou | Nota | Pond. |
|---|---|---|---|---|
| **WPO (0,20)** | Lighthouse 13.6 mobile: **87 e 99**. FCP 0,8 s, SI 0,9–1,0 s, CLS 0, **217 KiB** e 11 requests no carregamento (v53: 246 KiB). Com 4G lento e 4× CPU: LCP 1,44 s (`P.lede`), pronto em 2,6 s. A página inteira soma 12 requests e 979 KB, sem duplicata. Com GPU, 60 fps e 0 tarefa longa | LCP de laboratório de 2,1–2,2 s. **TBT de 470 ms** numa corrida. **Com GL por software: 28–29 fps e 118–126 tarefas longas** (piorou). As variantes buscadas a 1440 em produção não foram medidas | 7,5 | 1,50 |
| **RWD/Mobile (0,20)** | Sem colisão a 390. O "All clear" legível. O trilho com snap e o acordeão funcionam. 58,4 fps (chromium) e 59,6 (webkit) a 390 | As linhas da rede grossas a 390 (é ofício, não quebra) | 7,6 | 1,52 |
| **Semantics/SEO (0,20)** | `lang`, 1 H1 e os H2 em ordem, landmarks, links em `<a href>` (0 em JS), canonical | `noindex`, robots e SEO 58 (proposital no protótipo) | 7,4 | 1,48 |
| **Markup/Metadata (0,15)** | OG, Twitter, JSON-LD `Organization`, favicons, `<img>` com alt, width e height | Falta o `FAQPage` | 8,0 | 1,20 |
| **Animations/Transitions (0,15)** | Script em tempo real: a rede, o arco, a costura, a seda e os feixes. O estado do hero agora está certo nos 4 caminhos. Com GPU, 60 fps. O reduce e o `?gl=0` são completos | O GL por software piorou. Os loops do escritório são vídeo e não pontuam aqui | 7,5 | 1,13 |
| **Accessibility (0,10)** | **axe: 0 violações** (chromium a 1440 e 390, webkit a 1440). Lighthouse a11y 100. **Tab com o anel provado por pixel: 45/45 no chromium a 1440 e a 390 e 43/43 no webkit a 1440.** O FAQ a 390: 5/5. Sem JS ficam 5.279 caracteres, 2 formulários e 16 entradas; sem CSS, 6.365 caracteres | **Nenhum controle de pausa** para os loops automáticos de mais de 5 s | 7,6 | 0,76 |
| **Total** | | | | **7,59** |

## 7. Banca 3: FWA (dispositivo: desktop a 1440 com GPU, onde a rede, o arco e a costura rendem mais)

| Jurado | v54 | v53 | Por quê |
|---|---|---|---|
| Caçador de inovação | 68 | 66 | A seta que nasce da rede e sai em arco agora funciona |
| Diretor de arte | 68 | 67 | O hero ficou inteiro. O fecho continua comum, e a seta-bloco é genérica |
| Técnico WebGL/interação | 67 | 66 | 60 fps com GPU e o estado certo; o GL por software sofre mais |
| Narrador | 68 | 68 | O arco da noite até as vozes segue claro |
| Cético do "já vi isso" | 62 | 61 | Partículas roxas no preto |
| **Média** | **67** | 66 | Para ≥ 70 falta uma ideia que o júri não viu cem vezes |

Lente histórica (pesos antigos, só como referência): Graphics 15 sobe com a seta.

---

## 8. O que falta (ordenado; nada disso bloqueia a revisão do dono)

| # | Item | Banca e critério | Ganho estimado | Dono |
|---|---|---|---|---|
| 1 | **Pausa** para os loops do escritório: um botão visível que congela as texturas de vídeo e o loop do motor, respeitando o reduce | A11y (WCAG 2.2.2), Usability | +0,2 A11y; +0,02 Usability | `frontend-craft` |
| 2 | **Recuperar o aparelho fraco:** se após a queda a 60% o quadro médio seguir acima de 20 ms, fazer uma 2ª queda (~35%) ou limitar o DPR do canvas, com o brilho compensado de novo. Remedir a 28 fps contra ≥ 45 com GL por software | WPO, Animations | +0,2–0,3 WPO/Anim | `frontend-craft` |
| 3 | **Conferir em produção a 1440** se o motor busca só as variantes 1600 (e não as 780 também, nem webm e mp4 juntos) | WPO | +0,1 WPO se houver desperdício | `frontend-craft` |
| 4 | **Provar o pedido 10** quadro a quadro na página inteira (vídeo → quadros, sem salto de opacidade 0→1 em 1 quadro) | Pedido 10 | Fecha o último parcial | `frontend-studio` |
| 5 | Antes da produção: tirar o `noindex`, publicar `robots.txt` e o `FAQPage` | SEO | SEO 58 → ~100 | `frontend-craft` |
| 6 | Depois (o que sobe a nota de verdade): um fecho próprio da costura no lugar da palavra gigante e do triângulo; uma silhueta de seta menos "ícone"; a prova real do "$250K" | Creativity, FWA, Content | +0,1 Creativity, +2 FWA, +0,2 Content | `ui-ux-director`, `copy-director` |

## 9. O que já está no nível (não mexer)
1. **O hero:** a rede da referência, a seta de grão com o núcleo claro e o arco (`arrow-zoom.jpg`, `arc-chromium-1440.jpg`).
2. **O "final word" a 390 e a 1440:** sem colisão, os nomes legíveis e a seda com o texto a ≈ 4,4:1 (`you-crops.jpg`).
3. **O formulário:** os feixes por campo, a validação só no que foi digitado e o foco no 1º inválido no envio.
4. **A maquete do escritório em dither e a noite com as figuras.**
5. **A base:** axe 0, a11y e BP 100, Tab 45/45 provado por pixel, CLS 0, 217 KiB e 60 fps com GPU.

## 10. Não avaliado
- **O vídeo quadro a quadro da página inteira** (pedido 10) e a pasta `proto-v54/clear/` do frontend.
- **A intro desta rodada:** as fotos estão em `shots/`, mas não as reinspecionei. O pedido 3 fica como herdado da v53.
- **As folhas `hero-return-webkit-*` e `-390`:** geradas, mas só o webkit a 1440 teve o brilho medido. Não abri as fotos.
- **O feixe e o mouse:** aceitos pela prova do frontend, que eu abri, mas não reproduzi.
- **O "pulo" de brilho no instante da queda de qualidade.**
- **Os requests de produção a 1440.**
- **iPhone real, VoiceOver, o `backdrop-filter` no WebKit e a scrollbar overlay** (limites do Playwright). Também não dá para medir CDN, cache e HTTP/2 em localhost, e o LCP de laboratório não representa a rede real.
