# Júri v53 da landing da BrandUp (`proto.html`)

Júri: design-jury (Awwwards júri principal + Developer Award + FWA) · 09/11/2026
Peça: `http://127.0.0.1:5180/proto.html` (dev; o servidor continua no ar). Para medir performance usei um build de produção feito **fora do repo** (`vite build --outDir scratchpad/dist53`, sem tocar em `dist/`), servido por `vite preview` em :5193, que já foi derrubado.
Régua: `~/.claude/design-library/juri/criterios-awwwards-fwa.md`, `juri-v46.md`, `brief-v4.6-depoimentos.md` e a foto de referência do dono (`Desktop/Captura de Tela 2026-11-09 às 18.35.19.png`).
Evidências em `docs/redesign/juri-v53-fotos/`:
- `shots/`: 244 fotos (chromium e webkit × 1440 e 390 × com movimento e com reduce). Cada série tem a intro em 6 tempos na 1ª carga e no recarregar, o arco do hero em 6 posições e a rolagem a cada 0,75 tela.
- As folhas de contato: `sheet-intro-*`, `sheet-arc-*`, `sheet-scroll-*` e `sheet-states-*`.
- As comparações: `cmp-net-ref.jpg`, `cmp-arrow-zoom.jpg` e `cmp-testi-sig-hero-return.jpg`.
- `states/`: 51 fotos (formulário, "final word", FAQ, depoimentos, `?sig=0`, `?gl=0`, sem JS e sem CSS) e o `_interact.json`.
- `_lh-mobile-1/2.json` e os scripts em `tools/`. Os vídeos da passada de captura estão em `video/`.

---

## 1. Veredito

| Prêmio | Resultado | Nota v53 | v4.6 |
|---|---|---|---|
| **Awwwards Honorable Mention** (≥ 6,5) | **Sim** | **6,86** | 6,87 |
| **Awwwards nível SOTD** (~7,2+) | **Não** | 6,86 | 6,87 |
| **Developer Award** (> 7) | **Sim (simulado)** | **7,41** | 7,53 |
| **FWA FOTD** (≥ 70) | **Não** | **66** | 65 |

**Pode ir ao dono agora? Não.** Três dos 10 pedidos literais **não passam** (1, 4 e 7) e três só passam em parte (5, 8 e 10). O pior é o pedido nº 1: no Chrome desktop a 1440, quando a pessoa rola e volta ao topo, a rede do hero **não se refaz**. Ficam 3 nós soltos e a seta, sem as linhas, sem o nó de cima e sem os 6 de baixo (`cmp-testi-sig-hero-return.jpg`, 3º painel; `shots/chromium-1440-mo-s00.png`). É o primeiro pedido do dono, e ele quebra no navegador em que ele provavelmente vai olhar. Os itens 1 a 5 do §5 são correções de 1 dia e precisam entrar antes de mostrar.

A nota ficou parada. O hero ficou melhor: a rede é a da referência, o "$250K per month" tem a hierarquia certa e a seta dá sentido ao logo. Os depoimentos ganharam vida. Mas entraram defeitos novos: o hero que não volta no chromium, a seta que lê como chiado, a colisão de texto a 390 e o "All clear" ilegível a 390 num dos quadros. **Não arredondei nada para cima.**

---

## 2. Os 10 pedidos do dono

| # | Pedido | Resultado | Evidência |
|---|---|---|---|
| 1 | Rede de luz igual à da foto + seta branca de luz encaixada, subindo em arco | **NÃO PASSA** | **Em repouso, a rede é a da referência**: o nó de cima, 3 nós no meio (com o central) e 6 embaixo, a mesma geometria e o mesmo grão roxo-branco, nos dois motores (`cmp-net-ref.jpg`). Ao rolar, a seta sobe; as linhas se apagam e ficam só os nós (`sheet-arc-chromium-1440-mo.jpg`, y 100 a 460). A subida é quase vertical, e o "arco" mal se lê. **Falha 1:** no chromium a 1440, a rede não se refaz ao voltar ao topo (`shots/chromium-1440-mo-s00.png`, x 1000–1440, y 150–750). No webkit e a 390 ela se refaz. **Falha 2:** a seta não é "feita de luz". No chromium ela é uma trama de pontos brancos-acinzentados, com buracos aleatórios, e lê como **chiado de TV**. No webkit é uma grade mais esparsa e regular, que lê como **peneira**. Nos dois casos ela não tem o brilho nem o grão roxo da rede: parece um carimbo por cima da rede, e não um nó que nasceu dela (`cmp-net-ref.jpg`, painéis 2 e 3, seta em x ≈ 1070–1210, y ≈ 520–735 a 1440) |
| 2 | "$250K per month" como o maior destaque, sem ficar gigante | **PASSA** | 104 px a 1440 (bloco de 653×98) e 40 px a 390. É o maior texto da 1ª dobra, numa linha só, e não briga com a rede (`shots/*-arc-000.png`) |
| 3 | Intro em toda carga; ao recarregar, a rede não aparece, some e se reconstrói | **PASSA** (com ressalva de amostragem) | Na 1ª carga, aos 450 ms, a forma roxa ocupa a direita, e a rede aparece aos 900 ms. No recarregar entra a `intro-short`: aos 120 ms não há rede, aos 450 ms aparecem o triângulo roxo e a seta branca, e depois vem a rede pronta, sem nenhum quadro de rede montando (`sheet-intro-*-mo.jpg`, nos dois motores e nas duas larguras). A amostragem é de 6 quadros (≈ 120, 450, 900, 1500, 2300 e 3300 ms), e um piscar de 1–2 quadros entre eles não está excluído. Nota de gosto/ofício: o quadro de 450 ms da 1ª carga é um trapézio roxo chapado e cortado, e lê cru (`shots/chromium-1440-mo-intro1-0450.png`) |
| 4 | "Diagnosis" verde; logo do header maior | **NÃO PASSA (parcial)** | "Diagnosis" está em `rgb(88,246,177)`: passa. O logo mede **28×28 px a 1440 e 24×24 a 390**, ao lado do wordmark pequeno. Não tenho a medida anterior para provar que ele "cresceu", e na foto ele ainda lê pequeno diante de um título de 104 px (`shots/chromium-1440-mo-arc-000.png`, x 64, y 26) |
| 5 | 1º formulário animado (horizonte, feixes por campo, partículas que reagem ao mouse) | **PARCIAL** | As partículas roxas do fundo, a linha de horizonte com luz na base e o campo focado com borda clara estão lá (`states/chromium-1440-form-a/b/c.png`, `chromium-390-form-a/b.png`). **O feixe por campo e a reação ao mouse não ficaram provados** nas fotos paradas: a diferença entre `form-a` e `form-c-mouse` é sutil demais para afirmar |
| 6 | Noite e escritório como estavam | **PASSA** | Pintam nos dois motores e nas duas larguras: as figuras, "18:00", "You, asleep / 9 done overnight", a maquete em dither e "Day 90" (`sheet-scroll-*-mo.jpg`, s02–s07). Nada quebrou |
| 7 | "Final word": conteúdo mais acima, sem pontos espremidos sob o card, nomes dos agentes legíveis, seda roxa na altura toda do card | **NÃO PASSA** | A seda preenche o card inteiro: passa a 1440 e a 390 (`states/*-you-2.png`). O card subiu: passa. **Falhas:** (a) **a 390, o rótulo "Your follow-up / Asking you" atravessa o texto do card** na entrada (`shots/chromium-390-mo-s07.png`, y ≈ 420–460; `states/chromium-390-you-0.png`, y ≈ 420–450). (b) **A 1440, os nomes dos agentes** ficam a 13 px, em cinza apagado, colados na base da tela (y ≈ 880 de 900) e a ~350 px do card. Leem mal, e só o ativo fica branco (`shots/chromium-1440-mo-s08/s09.png`). Os brilhos roxos sob o card continuam (y ≈ 560 a 1440), agora menos espremidos. (c) **O "All clear" a 390, no quadro `you-2`** (0,9 s depois de parar), tem o texto em `#BEBBC2` sobre seda `#997BC2`: **≈ 1,3:1**, ilegível. No quadro seguinte (`s11`) fica legível; a 1440 é legível |
| 8 | Questions: textos entrando com transição; sem o telefone "All clear" repetido | **PARCIAL** | "All clear" só existe na seção `you`, nos 4 cenários (`_interact.json → faqPhones`): a repetição saiu e isso passa. A transição de entrada dos textos não ficou provada: só fotografei estados assentados |
| 9 | Depoimentos de volta e animados, no estilo da página | **PASSA** | As 4 vozes voltaram. A linha que ainda não foi lida fica a 48% e acende linha a linha; há o trilho vertical com as iniciais em quadrado roxo a 1440 e o trilho com snap a 390 (`states/chromium-1440-testi-*.png`, `chromium-390-testi-*.png`). **A assinatura que esconderia o nome dos ainda não lidos: não reproduzi.** Nos quadros parados, "Sofia Mitchell" e "Daniel Carter" aparecem tanto no padrão quanto com `?sig=0` (`cmp-testi-sig-hero-return.jpg`, painéis 1 e 2). Se o defeito existe, é transitório e só aparece em vídeo quadro a quadro, que não fiz |
| 10 | Transições entre seções (dado verde viajando), nada aparecendo de repente, fragmentos verdes nas áreas de conteúdo | **PARCIAL / não provado** | Há indícios: o fio verde que desce até o card (`shots/chromium-1440-mo-s10.png`, x 720, y 0–40), grãos menta na borda do FAQ e o "Want a team" entrando palavra a palavra (`states/chromium-390-testi-2.png`). Mas provar "nada aparece de repente" exige análise quadro a quadro do vídeo, e não fiz. Fica como não avaliado |

---

## 3. Banca 1: Awwwards, júri principal

| Critério (peso) | Dir. arte | UX | Creative tech | Tipógrafo | Conteúdo | A11y/perf | Descartada | **v53** | v4.6 |
|---|---|---|---|---|---|---|---|---|---|
| Design (40%) | 7,0 | 6,9 | ~~7,2~~ | 6,8 | 7,0 | 6,7 | 7,2 | **6,88** | 6,90 |
| Usability (30%) | 6,9 | 6,7 | ~~7,1~~ | 6,9 | 6,9 | 6,6 | 7,1 | **6,80** | 6,86 |
| Creativity (20%) | 7,1 | 6,9 | ~~7,3~~ | 6,9 | 7,0 | 6,8 | 7,3 | **6,94** | 6,86 |
| Content (10%) | 6,8 | 6,9 | 6,8 | 6,8 | ~~6,6~~ | 6,9 | 6,6 | **6,84** | 6,78 |
| **Ponderada** | | | | | | | | **6,86** | 6,87 |

No Usability houve empate de distância (7,1 e 6,6). Descartei a nota alta, que é a escolha conservadora.

- **Design 6,88.** Sobe com o hero, que agora tem uma imagem própria (a rede da referência mais o logo) e a hierarquia certa de "$250K" (`cmp-net-ref.jpg`), e com a seda do "All clear" preenchendo o card. Cai pelos defeitos:
  - a seta em trama, que lê como chiado ou peneira;
  - o hero que não volta no chromium;
  - a colisão de texto a 390;
  - a intro com o trapézio chapado;
  - o rodapé, que ainda fecha com a palavra gigante "BrandUp" (351 px) e o triângulo, repetido 2 vezes no fim (`shots/chromium-1440-mo-s16/s17.png`). Isso continua sendo o fecho mais comum da galeria.
- **Usability 6,80.** A página encurtou: 11.925 px a 1440 contra 12.559 no v4.6. Os erros vêm em frase humana, e o foco vai para o 1º campo inválido (chromium). Cai por três motivos:
  - **A intro agora roda em toda carga.** A tela fica pronta aos ~2,5 s na 1ª visita e aos ~1,6 s no recarregar (`_capture.json → intro*`). É um custo que o júri de UX desconta, por mais que tenha sido pedido.
  - **Validar ao sair do campo pinta 4 erros vermelhos** em quem só passa por eles com Tab (`states/chromium-1440-form-a.png`, `chromium-390-form-a.png`).
  - **Os nomes dos agentes a 1440 leem mal**, e o "All clear" a 390 tem o contraste do quadro `you-2`.
- **Creativity 6,94.** A "costura" (o dado verde que viaja) e a seta que sobe saindo da rede são ideias próprias e coerentes com a marca. Os depoimentos que acendem linha a linha usam o mesmo vocabulário. Não chega a 7: a entrada continua sendo "partículas roxas no preto", a imagem da categoria IA, e a seta não convence como luz.
- **Content 6,84.** Igual ao v4.6 no essencial. "$250K" e "10 million" seguem sem prova na página, e a atividade é declarada ilustrativa.

## 4. Banca 2: Developer Award

| Categoria (peso) | Passou | Falhou | Nota | Pond. |
|---|---|---|---|---|
| **WPO (0,20)** | Lighthouse 13.6 mobile: **94 e 98**. FCP 0,8–1,5 s, CLS 0, SI 1,0–1,5 s, **246 KiB** no carregamento. Com 4G lento real (RTT 562 ms, 180 KB/s) e 4× CPU: **LCP 1,46 s** (`P.lede`), CLS 0,0001, 245 KB em 11 requests, pronto em 2,6 s. Com GPU (Metal): **58,9 fps** na rolagem inteira a 1440 e 0 tarefa longa | **LCP de laboratório 2,2 s** nas duas corridas; **TBT 250 ms** numa delas. **Requisição duplicada:** `office-day-p780.webp` baixa 2 vezes (29 KB cada; `_interact.json → throttle.fullPage.media`). A página inteira soma 1,0 MB e 14 requests a 390. **Com GL por software** (o chromium headless padrão), a 1440 cai para **33 fps**, com 89 tarefas longas de até 231 ms: aparelho fraco sem GPU boa vai sofrer. O console do chromium avisa "GPU stall due to ReadPixels" 4×. CDN, cache e HTTP/2 não dá para avaliar em localhost | 7,6 | 1,52 |
| **RWD/Mobile (0,20)** | Uma composição própria a 390, o trilho com snap nos depoimentos, o acordeão no FAQ e nenhum estouro horizontal. A 390 também roda a 58,6 fps (chromium) e 59,3 (webkit) | **Texto sobreposto a 390** no "final word" (§2, item 7a). O "All clear" a ≈ 1,3:1 a 390 no quadro `you-2` | 7,0 | 1,40 |
| **Semantics/SEO (0,20)** | `lang="en-AU"`; um H1 e 7 H2 em ordem, H3 só no rodapé; `header`, `nav`, `main` e `footer`; os 15 links são `<a href>` (0 em JS); canonical; title e description próprios | **`robots: noindex`**: o Lighthouse SEO dá **58**, por `is-crawlable` e `robots-txt` (o preview devolve HTML em `/robots.txt`). Num protótipo isso é proposital, mas conta como falha até sair | 7,4 | 1,48 |
| **Markup/Metadata (0,15)** | OG completo (title, description, image, url, type), Twitter `summary_large_image`, JSON-LD `Organization`, favicons svg, 32 e apple-touch, `<img>` com alt, width e height. 743 nós e 65 `div`, sem div-itis | Schema só `Organization` (falta `Service`/`FAQPage` para o FAQ). Validador W3C não rodado | 8,0 | 1,20 |
| **Animations/Transitions (0,15)** | O movimento é em script, em tempo real: a rede, as partículas, a seda e a costura (os loops do escritório são vídeo e não pontuam aqui). Fluidez boa com GPU. O reduced-motion entrega uma versão estática completa (`sheet-scroll-*-rm.jpg`) e o `?gl=0` tem fallback | **Estado errado:** a rede não se refaz ao voltar ao topo (chromium a 1440). Com GL por software, cai a 33 fps. A subida da seta é quase reta, e o "arco" não se lê | 7,2 | 1,08 |
| **Accessibility (0,10)** | **axe: 0 violações** (chromium a 1440 e 390, webkit a 1440). Lighthouse a11y 100. **Tab a 1440: 45 de 45 paradas com o anel provado por pixel.** Sem JS ficam 5.279 caracteres, os 2 formulários e as 16 entradas (`states/nojs-390*.png`); sem CSS, 6.365 caracteres (`states/nocss-1440.png`) | **A 390, 3 itens do FAQ** ("How much…", "Will it work…", "How long…") **sem o anel provado por pixel**. **Nenhum controle de pausa** no DOM (`pauseBtns: []`) para os loops de vídeo do escritório. O "All clear" com o contraste do quadro `you-2` | 7,3 | 0,73 |
| **Total** | | | | **7,41** |

Sobre o Tab no WebKit: o Playwright WebKit só tabula pelos campos, que é o comportamento padrão do Safari sem a opção "Tab destaca cada item". Isso é do instrumento e não conta como defeito.

## 5. Banca 3: FWA (dispositivo escolhido: desktop 1440 com GPU, onde a rede e a costura rendem mais)

| Jurado | Nota | Por quê |
|---|---|---|
| Caçador de inovação | 66 | A costura e a seta que nasce da rede são uma ideia; a execução da seta não convence |
| Diretor de arte | 67 | O hero ficou forte e a maquete em dither continua a melhor imagem; o rodapé com a palavra gigante é comum |
| Técnico WebGL/interação | 66 | Fluido com GPU, mas o estado do hero quebra ao voltar ao topo, e o GL por software sofre |
| Narrador | 68 | Noite, escritório, aprovação e vozes formam um arco claro; os depoimentos fecham bem |
| Cético do "já vi isso" | 61 | Partículas roxas no preto continuam sendo a imagem da categoria IA |
| **Média** | **66** | v4.6: 65. Para ≥ 70 falta uma ideia que o júri não tenha visto cem vezes, bem executada |

Lente histórica (pesos antigos, só como referência): Design 40 e Navigation 25 seguram; Graphics 15 sobe com o hero.

---

## 6. Defeitos objetivos, com coordenada

1. **O hero não se refaz ao voltar ao topo**: chromium a 1440, x 1000–1440, y 150–750 (`shots/chromium-1440-mo-s00.png`). O webkit e o 390 estão certos.
2. **A seta lê como chiado** (chromium) ou como **peneira** (webkit): trama branca-acinzentada sem brilho, em x ≈ 1070–1210, y ≈ 520–735 a 1440 (`cmp-net-ref.jpg`). A 390 aparece em `shots/chromium-390-mo-arc-000.png` (x ≈ 230–260, y ≈ 700–790).
3. **Colisão de texto a 390**: "Your follow-up / Asking you" sobre "Hi Sam, did the steel bracket quote…" (`shots/chromium-390-mo-s07.png`, y ≈ 420–460).
4. **O "All clear" a ≈ 1,3:1** a 390 (`states/chromium-390-you-2.png` e `webkit-390-you-2.png`, região x 130–260, y 190–230).
5. **Os nomes dos agentes a 1440**: 13 px, cinza apagado, em y ≈ 880, a ~350 px do card (`shots/chromium-1440-mo-s08.png`).
6. **Validação ao sair do campo**: 4 erros vermelhos só por passar com Tab (`states/chromium-1440-form-a.png`).
7. **Requisição duplicada**: `office-day-p780.webp` 2× (`_interact.json`).
8. **O anel de foco a 390 não ficou provado** em 3 itens do FAQ (y 742, 792 e 408).
9. **Nenhum controle de pausa** para os loops do escritório.
10. **O quadro de 450 ms da intro** é um trapézio roxo chapado e cortado à direita (`shots/chromium-1440-mo-intro1-0450.png`).

Taste skill, `lint.mjs`: 2 FAIL e 4 WARN, e os dois FAIL são justificados. O "gradient" é a máscara funcional da leitura linha a linha, e o "01 / 04" é o contador pedido pelo brief. `inspect.mjs` não rodou (§9).
**Sinais de "feito por IA"** que um jurado apontaria:
- o fecho com a palavra gigante e o triângulo repetido (a intro, o logo, o rodapé ×2);
- partículas roxas como linguagem de entrada;
- a seta em meio-tom colada por cima da rede.

Não há emoji como ícone, nem sombra roxa difusa, nem cards com ícone em círculo.

---

## 7. O que corrigir antes de mostrar ao dono (ordenado)

| # | Correção | Banca e critério | Ganho estimado | Dono |
|---|---|---|---|---|
| 1 | Refazer a rede inteira ao voltar ao topo no chromium (o estado do motor depende da direção ou do caminho da rolagem; testar ida e volta nos dois motores) | Pedido 1; Design, Animations | Destrava o pedido 1; +0,05 Awwwards, +0,3 Dev/Anim | `frontend-studio` |
| 2 | A seta "feita de luz": o mesmo grão roxo-branco e o mesmo brilho dos nós, o núcleo mais claro e sem buracos aleatórios, idêntica nos dois motores; e um arco visível na subida | Pedido 1; Design, Creativity, FWA | +0,05–0,1 Design; +1–2 FWA | `ui-ux-director` (decide a matéria) → `frontend-studio` |
| 3 | Colisão do rótulo do agente com o card a 390 | Pedido 7; RWD, Usability | +0,3 RWD | `frontend-studio` |
| 4 | Contraste do "All clear" a 390 durante a entrada da seda (texto ≥ Lc 60 sobre a seda em todo quadro) | Pedido 7; Accessibility, Design | +0,2 A11y | `frontend-studio` |
| 5 | Nomes dos agentes a 1440 maiores e mais perto do card (subir a fileira, ≥ 15 px, os inativos ≥ 60% de opacidade) | Pedido 7; Usability | +0,05 | `ui-ux-director` → `frontend-studio` |
| 6 | Logo do header: provar com a medida anterior que cresceu, ou subir para ~36 px a 1440 | Pedido 4 | Fecha o pedido 4 | `ui-ux-director` → `frontend-studio` |
| 7 | Provar em vídeo o feixe por campo e a reação ao mouse no 1º formulário, e a entrada dos textos do FAQ (pedidos 5, 8 e 10) | Pedidos 5, 8 e 10 | Fecha os 3 parciais | `frontend-studio` (prova) |
| 8 | Validar só depois de digitar ou no envio, nunca ao passar com Tab | Usability | +0,03 | `frontend-studio` |
| 9 | Remover a requisição duplicada de `office-day-p780.webp`; adicionar pausa aos loops; conferir o anel de foco a 390 no FAQ | WPO, A11y | +0,1 Dev | `frontend-craft` |
| 10 | Antes da produção: tirar o `noindex`, publicar `robots.txt`, `FAQPage` no JSON-LD | SEO | SEO 58 → ~100 | `frontend-craft` |

O que subiria a nota de verdade (depois, e não para esta rodada):
- trocar o fecho "palavra gigante + triângulo" por um fecho próprio da costura (Creativity +0,1, FWA +2), com `ui-ux-director`;
- dar prova real ao "$250K" e ao "10 million" (um caso nomeado, Content +0,2), com `copy-director`.

## 8. O que já está no nível (não mexer)
1. **A rede do hero em repouso**, igual à referência nos dois motores (`cmp-net-ref.jpg`).
2. **"$250K per month" a 104/40 px**: o maior destaque, sem ser gigante.
3. **A maquete do escritório em dither e a noite com as figuras** (`sheet-scroll-chromium-1440-mo.jpg`, s04–s07).
4. **Os depoimentos que acendem linha a linha**, com o trilho e as iniciais (`states/chromium-1440-testi-1.png`).
5. **O código de base**: axe 0, Lighthouse a11y e Best Practices 100, sem JS com 5.279 caracteres, CLS 0, 58–59 fps com GPU.

## 9. Não avaliado
- **A análise quadro a quadro do vídeo de rolagem** (gravei a passada em `video/`, mas não extraí os quadros). Por isso ficam sem prova: "nada aparece de repente", a viagem do dado verde, a entrada dos textos do FAQ e a assinatura dos depoimentos escondendo nomes.
- **A reação das partículas ao mouse e o feixe por campo** no formulário: as fotos paradas não bastam.
- **`inspect.mjs` da taste skill**: não rodei, por orçamento de chamadas.
- **iPhone real, VoiceOver, o `backdrop-filter` no WebKit e a scrollbar overlay** (limites do Playwright).
- **CDN, cache e HTTP/2**: em localhost não dá para medir. O LCP de laboratório não representa a rede real.
- **O pedido 4 (o logo maior)**: não tenho a medida anterior.
