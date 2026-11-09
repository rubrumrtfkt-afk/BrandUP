# v2 — intro + jimo + correções do v1

Autor: ui-ux-director · 08/11/2026 (noite) · branch `redesign/b2b-ai-office`
Para: `figma-architect` (refaz o mock), `copy-director` e `type-director` (pedidos no V2.7), depois `frontend-studio`.
Entradas: a leitura do coordenador sobre o v1 ("estrutura certa, cara de wireframe": hero = texto + imagem em caixa, faixa roxa chapada, nada memorável); o `juri-v1.md` (Awwwards 5,0 · FWA 51 · taste 5,1); as duas entradas do dono (o jimo.ai como referência criativa; a tela de gancho/intro obrigatória).
**Como ler**: este bloco V2 manda. O brief v1 continua logo abaixo e vale onde o V2 não diz nada. Os pontos do v1 que o V2 revoga estão listados no V2.9.

Mantidos sem mudança: o conceito ("a maquete da sua empresa, funcionando"), a trinca de cor (§4), a tipografia de `tipografia.md` (Barlow Condensed 800 só no gancho; Montserrat no resto; Geist Mono no dado), a copy v2 de `copy.md` (com os cortes pedidos no V2.7), a ordem das seções e o formulário logo depois do hero.

---

## V2.0 O que o v1 errou (minha leitura, somada à do júri)
1. **O conceito não chegou à tela.** São 3 placas de 7 (e uma repetida), 1 parada do tour de 7, nenhum traço, nenhum pacote, e a sala YOU só aparece no frame de estados. Sobrou um render bonito e uma landing de formulário.
2. **O produto aparece pequeno.** O `DeskPanel` tem 360 px e está cortado. O jimo mostra o produto a ~70% da tela, inteiro (JI `d-07`, `d-10`). É a maior lição da referência, e o júri chegou à mesma conclusão.
3. **A composição vira template pela repetição**: são 4 seções seguidas em "split à esquerda + vazio à direita", eyebrow mono em cima de todo H2 e H2 de 4 a 6 linhas.
4. **A imagem está numa caixa.** A maquete com raio de 12 e margem lê como "screenshot dentro de um card", não como lugar.
5. **Os defeitos de execução derrubam a nota**: 9 cortes de texto, campos de 100 px, passo duplicado, resposta trocada no FAQ (lista completa no V2.5). Corrigir isso vale mais pontos do que qualquer ideia nova.

## V2.1 Os movimentos da página (revisados: continuam 5)

| Código | Captura (aberta) | Porquê aqui | O que muda em relação à fonte | Custo |
|---|---|---|---|---|
| **D1** 3D pré-renderizado, **com o mergulho E7 como entrada do tour** | `qclay-home/videos-frames/about-1-0.5.jpg`; `jimo/w-03…w-16` (o mergulho) | Como no v1. O que entra do jimo: a transição entre o plano geral e o detalhe é **espacial**. Ao entrar no tour, a câmera mergulha da maquete inteira até a mesa 1, em vez de um corte seco. | No jimo, a câmera atravessa geometria abstrata (planeta → órbita → mira → funil), em WebGL e logo depois do hero. Aqui é um **zoom ortográfico sobre a nossa imagem do escritório** (sem geometria inventada e sem WebGL), só a ≥ 1024, e é a **porta do tour**, não do hero. O formulário continua entre o hero e o tour. | $$$ produção · $ runtime |
| **E5** Trajetória animada | `qclay-p12/d-03.webp` | Como no v1: os pacotes com dado correndo entre as mesas. No v1 ela não foi desenhada: agora é obrigatória em todos os quadros da maquete (V2.5 item 5). | Igual ao v1: traços ortogonais de planta industrial, com etiquetas em mono e sem curva. | $$ |
| **F6** Fragmento de produto em escala de herói (**absorve F1 e F3**) | `jimo/d-07.webp` (o painel com "Thinking" e os passos executados), `jimo/d-10.webp` | A parada YOU é o clímax e o argumento de venda ("quem manda é você"). Ela precisa ser **grande, inteira e legível**, o "fragmento jimo" que o júri pede. O "Thinking" do jimo vira o **"Why"** do cartão: 3 linhas de evidência que mostram por que o agente propõe a ação. É a resposta à objeção nº 1 do comprador industrial. | No jimo há uma janela de app + um chat lateral com abas 01/02/03. Aqui **não há janela de app, chat nem abas**: há uma **fila de ordens de serviço empilhadas** na sala do dono da maquete. Ao chegar à parada YOU, o painel **cresce de 5 para 8 colunas** (a mudança de escala é o clímax). As linhas de "Why" são fatos do pedido, não passos de navegação. | $$ |
| **A2** O índice do produto vira navegação | `prolibu-sales/d-10.webp` | Como no v1 (a planta baixa em miniatura). No v1 saiu como grade genérica 3×3: agora é a planta de verdade (V2.4.4). | Igual ao v1. | $$ |
| **B10** A frase que se acende com a rolagem, **na gramática da legenda do anúncio** | `jimo/w-10…w-12` ("Every user gets a guide." acende palavra a palavra); o anúncio da BrandUp (`referencias/propaganda-escritorio-3d.mp4`, 0–4 s: a palavra atual dentro de um bloco roxo) | O H2 do tour é a frase do próprio anúncio ("This employee is never late…"). Repetir a legenda do anúncio, com o bloco roxo pulando de palavra em palavra, faz a pessoa reconhecer o que viu no feed. O movimento aparece uma vez na página. | No jimo, as palavras vão do cinza ao branco num vazio preto. Aqui **as palavras já estão brancas e legíveis em todos os quadros**; o que anda é o **bloco `brand.500`** (o mesmo do destaque do gancho), de palavra em palavra, na barra do palco do tour. É a gramática da marca, não a do jimo. | $ |

**Soma**: um só $$$ (D1, na produção do render). O F6 troca dois movimentos $$ do v1 (F1 + F3) por um, e o B10 é $. O total ficou mais barato que no v1.

### V2.1.1 A peça "intro" (movimentos próprios, todos $)
| Código | Captura / fonte | Porquê | O que muda em relação à fonte | Custo |
|---|---|---|---|---|
| **E8** Abertura que entrega a marca ao header | a landing do Produzze (memória `produzze-landing-nova-identidade`); contraexemplo: `jimo/intro-d-400…2600` (não há intro; o H1 está pintado aos 400 ms) | É o pedido do dono. O jimo mostra a regra que a torna segura: **o texto vem primeiro**. | No Produzze, o P carrega vídeo de show, cresce e some antes de voar. Aqui é o **triângulo da marca** (o símbolo do `public/favicon.svg`), sem vídeo e sem fase de crescimento, e com as 7 luzes das mesas. É mais curta. | $ |
| **F7** Um sinal que atravessa a página | `jimo/d-00…d-02`, `jimo/w-08…w-12` (o ponto de luz vira o ponto final da frase) | O agente ganha presença sem mascote. As **7 luzes menta** que nascem na intro **pousam nos 7 LEDs das placas** da maquete e ficam ali como o status "Working". A intro e o produto viram uma coisa só. | No jimo é uma faísca brilhante que vagueia. Aqui são 7 LEDs de 6 px com função (o status de cada agente), sem brilho em volta e sem vaguear. | $ |

## V2.2 jimo.ai: o que entra e o que fica de fora
Dossiê: `~/.claude/design-library/sites/jimo/notas.md` (stack, tipo medido, sequência, princípios). Fotos de trabalho: `docs/redesign/referencias/jimo/` (WebP, 1440 e 390, rolagem fina do mergulho, reduced motion, os primeiros 2,6 s). As entradas novas no repertório são A8, B10, E7, E8, F6 e F7.

**Entram (princípio, não forma):**
| Movimento do jimo | Captura | Onde entra aqui |
|---|---|---|
| O texto vem primeiro e a cena chega depois (o H1 pintado aos 400 ms, o planeta depois) | `intro-d-400…2600` | É a regra da intro e do hero: o H1 é o LCP, e a maquete e a intro são camadas por cima ou por baixo, nunca no caminho. |
| O produto grande, inteiro e com dado plausível | `d-07`, `d-10` | F6 na parada YOU, e o `DeskPanel` passa de 360 px para 526 px nas outras paradas, sem nenhum corte. |
| O agente mostra o que fez ("Thinking" + passos) | `d-07` | As linhas "Why" do `ApprovalCard` (3 fatos em mono). |
| A transição espacial entre plano geral e detalhe | `w-03…w-16` | E7 dentro do D1: a entrada do tour. |
| A frase que se acende | `w-10…w-12` | B10 no H2 do tour, com o bloco roxo do anúncio. |
| Com reduced motion, a cena some (e não fica congelada no meio) | `rm-0`, `rm-1` | Sem intro, sem mergulho, sem bloco que pula (fica parado em "never late"). |
| Número só quando é controle (as abas 01/02/03) | `d-06` | Saem os "01/02" decorativos do Notice. Fica só a planta (controle) e o "1 / 3" dos depoimentos (controle). |
| Uma frase por tela, curta e grande | `d-06`, `d-14`, `d-17` | Todo H2 com ≤ 2 linhas a 1440 e ≤ 3 a 390 (V2.7). |
| O depoimento em destaque, um por vez, com o próximo aparecendo na borda | `home-09` | O novo desenho dos depoimentos (V2.4.6). |

**Ficam de fora:**
| Movimento do jimo | Captura | Porquê não |
|---|---|---|
| Planeta, campo de estrelas, faísca brilhante | `d-00…02` | É glow decorativo (lista anti-slop do dono; o júri também pede para não copiar). E não diz nada a um comprador industrial. |
| Spline / WebGL em tempo real (18–20 canvases) | `inspecao.json` | O LCP medido foi 4,07 s **sem limitação de rede** e o `networkidle` 34 s. No navegador do Instagram, no 4G, isso afunda a conversão. Fica D1 (imagem + `transform`). |
| O terreno de pontos com balões e a contagem "down to 0" no título | `d-18…21` | É bonito, mas é decorativo em WebGL. O que vale ali (o número que muda e mostra o resultado acontecendo) já está no `NightLog`, com as contagens da noite subindo uma vez ao entrar na tela. |
| A UI inclinada e etiquetada + chaves de privacidade (A8) | `d-11…13` | É o movimento mais tentador para nós (o controle). Fica fora porque **mostraria permissões que o produto pode não ter**: promessa falsa e risco na ACCC. O "You approve:" por agente já cumpre a função. Entra numa v3 se o dono confirmar que as permissões por agente existem. |
| O bento de capacidades com esboços de UI | `d-15/16` | Não temos 6 capacidades para um bento. A lista "All agents at a glance" (A5) resolve melhor e já foi aprovada pelo júri. |
| A caixa única de prova (logos + G2 + SOC 2) | `d-14` | Não há logos nem selos reais da BrandUp. Entra quando existirem (ABN, Privacy Act e clientes com autorização). |
| DM Sans 300 em display | `inspecao.json` | Mantém-se `tipografia.md`: o gancho comercial em caixa alta é a voz do anúncio. Do jimo só entra a disciplina de tamanho (H2 curto e grande). |
| A fita 3D, os cartões pastel e o cartão de embarque do site claro | `home-00`, `tours-08` | É outro registro (claro, lúdico) e não tem objeto-símbolo equivalente. |

**Teste de sobreposição (obrigatório)**: ponha a parada YOU do mock ao lado de `jimo/d-07.webp`. Se aparecer uma janela de app à esquerda + um painel de chat à direita + abas no topo, refaça. Ponha o H2 do tour ao lado de `jimo/w-11.webp`: se as palavras estiverem apagadas e centradas num vazio preto, refaça.

## V2.3 A intro: "as luzes do HQ acendem"
**Ideia (uma frase)**: o triângulo da BrandUp acende no escuro, as 7 mesas do escritório ligam uma a uma, e as luzes voam para os seus lugares: o símbolo para o header, os LEDs para as placas da maquete. A pessoa consegue dizer o que aconteceu: "o escritório abriu".

**Decisão contra as alternativas:**
- *A proposta do júri* (o wordmark desfoque→foco voando ao header, ≤ 900 ms): adoto as **regras** dele inteiras (o H1, o CTA e os números pintados por baixo desde o 1º quadro; 1ª visita da sessão; nenhuma intro com reduced motion). A forma eu mudo: só o logo voando é genérico e não diz "escritório". Somo as 7 luzes (+200 ms) e troco o wordmark pelo triângulo, que é SVG e **não depende de fonte carregada** (assim não há flash de fonte na intro).
- *A câmera mergulhando na maquete*: descartada para a intro. Precisa do render (que ainda é placeholder), pesa no 4G e faria de uma imagem o candidato a LCP. O mergulho foi para a entrada do tour (E7), onde não custa nada à conversão.
- *As placas ligando com a legenda "This employee is never late…"*: descartada para a intro. Ler texto custa tempo numa abertura de 1 s. A legenda do anúncio foi para o H2 do tour (B10), onde a pessoa tem tempo de ler.

**Regras (inegociáveis):**
1. **Duração**: 1.100 ms a 1440 e 900 ms a 390, contados do 1º quadro pintado. O conteúdo útil aparece a partir de ~760 ms / ~620 ms. Fica bem abaixo do teto de 2,5 s do dono.
2. **O H1, o subtítulo, o CTA e os números estão no DOM e pintados por baixo desde o 1º quadro.** A intro é um overlay `position: fixed` que só sai por opacidade. Nada de opacidade 0, blur ou reveal no conteúdo.
3. **Pulável**: qualquer `pointerdown`, `keydown`, `wheel` ou `touchstart` termina a intro em 150 ms (o símbolo pula para o header e o overlay some). Esse primeiro toque **não** passa para o que está embaixo (evita clicar no CTA às cegas). Um botão "Skip intro" existe para teclado e leitor de tela, mas só fica visível com foco. O overlay leva `aria-hidden="true"`, e o leitor de tela vai direto ao conteúdo.
4. **Quando NÃO roda**: reduced motion; 2ª visita da sessão (`sessionStorage`); URL com âncora (`#diagnostic`); navegação de voltar/avançar; `Save-Data` ligado ou `effectiveType` 2g/3g; aba aberta em segundo plano. **Sem JS, não há intro**: o padrão é "sem intro", e um script inline no `<head>` liga a classe antes do 1º quadro só se as condições passarem.
5. **Não depende de rede**: SVG inline + CSS inline. Nenhuma fonte, imagem ou vídeo. Termina sozinha por CSS, mesmo que o React demore.
6. **Depois da intro**: o embaralhamento dos números (o `HeroStatItem` aprovado) começa no fim da intro, não no load. O 1º pacote LEAD sai 800 ms depois disso.

**Quadros-chave para o figma-architect** (frame `Intro`, 5 quadros a 1440×900 e 5 a 390×844, lado a lado, cada um com o tempo no nome, mais 1 frame de anotação com a curva):

```
1440×900                                                          390×844
Q1 · 0 ms                                                         Q1 · 0 ms
┌───────────────────────────────────────────────┐                ┌───────────────┐
│ ink.950 100% (o hero está pintado por baixo,  │                │               │
│ invisível)                                    │                │               │
│                    ◭  ← triângulo 112 px,     │                │      ◭ 80 px  │
│                       blur 14, opac 0, esc .92│                │      blur 12  │
│                    · · · · · · ○ ← 7 LEDs     │                │  · · · · · · ○│ LEDs 5 px,
│                     apagados (line.strong),   │                │   gap 12      │ gap 12
│                     6 px, gap 14, 28 abaixo   │                │               │
└───────────────────────────────────────────────┘                └───────────────┘
Q2 · 420 ms  foco                                                  Q2 · 360 ms
│                    ◭  nítido, opac 1, esc 1   │                │      ◭        │
│                   ╱ ← o brilho único: uma faixa de luz          │               │
│                     (branco 35%, ~20° de inclinação) atravessa  │               │
│                     SÓ o triângulo (máscara), 300→560 ms, 1 vez │               │
Q3 · 700 ms  as mesas ligam                                         Q3 · 580 ms
│                    ◭                          │                │      ◭        │
│                    ● ● ● ● ● ● ◉              │                │  ● ● ● ● ● ● ◉│
│        6 menta acendem da esq. p/ dir., 40 ms │                │  30 ms de     │
│        de defasagem; o 7º (YOU) é um anel     │                │  defasagem    │
│        menta de 8 px                          │                │               │
Q4 · 900 ms  o voo (o overlay está a ~50%)                          Q4 · 760 ms
│ ◭→ o símbolo está a meio caminho do header    │                │◭← a meio      │
│    (x 72, y 36, 28 px)                        │                │  caminho de   │
│  H1 aparecendo por baixo do véu               │                │  (20, 28) 24px│
│        ● ●  ●   ●  ● ● ◉ ↘ os LEDs descem para│                │ H1 aparecendo │
│        os LEDs das 7 placas da maquete (FLIP) │                │ LEDs: fade    │
Q5 · 1100 ms  repouso = o hero do V2.4.2                            Q5 · 900 ms
│ ◭ BrandUp  (o wordmark entra ao lado em 120ms)│                │◭ BrandUp  [Dx]│
│ HOW INDUSTRIAL AND B2B … [OVER $250K …]       │                │ HOW INDUSTRIAL│
│ [Build my AI office]  90 days | 24/7 | $250K  │                │ … CTA         │
│ ░ maquete com 7 placas, LEDs acesos ░         │                │               │
```

**Nota de motion (anotar no Figma, e o frontend-studio segue):**
| Faixa (1440 / 390) | O que se move | Propriedade | Curva |
|---|---|---|---|
| 0–420 / 0–360 ms | o triângulo entra | `filter: blur(14→0)`, `opacity 0→1`, `scale .92→1` | `cubic-bezier(.16,1,.3,1)` (expo-out) |
| 300–560 / 260–480 ms | o brilho único | `transform: translateX` de uma faixa mascarada pelo próprio triângulo | `cubic-bezier(.45,0,.55,1)` |
| 420–700 / 360–580 ms | as 7 luzes | `background` line.strong → `accent.400`, 120 ms cada, 40/30 ms de defasagem | `ease-out` |
| 700–1.100 / 580–900 ms | o símbolo voa ao header | FLIP: `translate + scale` (112 → 28 px / 80 → 24 px) | `cubic-bezier(.65,0,.2,1)` |
| 720–1.140 ms (só ≥ 1024) | os LEDs voam aos LEDs das placas | FLIP por LED, 30 ms de defasagem; se a placa não estiver na viewport ou o render não tiver chegado, fade de 180 ms | `cubic-bezier(.65,0,.2,1)` |
| 760–1.040 / 620–860 ms | o overlay sai | `opacity 1→0`, depois `display:none` | `cubic-bezier(.2,.7,.2,1)` |
| 1.100 / 900 ms | o wordmark "BrandUp" entra ao lado do símbolo | `opacity` + `translateX(-6→0)` 120 ms | `ease-out` |
| skip | tudo para o estado final | 150 ms | `ease-out` |
| reduced motion | não existe | — | — |

**O header muda por causa disso**: o logo passa a ser o triângulo (24/28 px) + o wordmark "BrandUp". Hoje o mock tem só o texto.

**Medida de aceite (frontend-studio)**: com e sem intro, em webkit e chromium, a 390 com 4G simulado e CPU 4×. A diferença de LCP tem que ser ≤ 100 ms, e o tempo até o 1º toque útil no CTA, ≤ 1,2 s depois do 1º quadro. O Chrome não desconta oclusão no LCP (o H1 coberto pelo overlay ainda conta). **Não verifiquei isso no WebKit; medir.** Recomendo ao dono um **teste A/B intro × sem intro** na taxa de `Lead` vinda do Meta (50/50, até a significância). A intro é barata de remover, então fica marcada "em avaliação".

## V2.4 Correções de composição, seção por seção (em ordem de impacto)
Grid (não muda): 1440 = 12 col · gutter 24 · margem 72 · coluna 86 px (a col *n* começa em x = 72 + (n−1)·110). 390 = 4 col · gutter 12 · margem 20 · conteúdo 350.
Larguras úteis a 1440: 4 col = 416 · 5 col = 526 · 6 col = 636 · 7 col = 746 · 8 col = 856 · 10 col = 1076.

### V2.4.1 Live office: o tour (o maior salto: Creativity, FWA, e a lição do jimo)
**Sai**: o eyebrow duplicado; o corpo em cols 9-12; o painel de 360 px cortado; o buraco de 236 px sob o painel; a grade 3×3; a parada única.
**Entra, a 1440 (5 frames)**:
1. **Cabeçalho do palco** (fica preso no topo do palco, 96 px): à esquerda, o H2 em 2 linhas, cols 1-9, 44/1.1: "This employee is never late." / "And never asks for a raise.", com o bloco `brand.500` (o mesmo do gancho: padding 0 .15em, raio 2) atrás da palavra atual (B10). No frame estático, ele fica em "never late". À direita, na mesma linha de base, o selo "● Example activity" (pílula, `text.2`) + "AEST 14:32" em mono. **Não é eyebrow**: é o selo legal e o relógio do produto. "Meet your new team." sai do H2.
2. **Frame "Entrada" (E7)**: a maquete inteira, sangrando de 0 a 1440 e de y 96 até a base do palco (804 px), com as 7 placas compactas distintas, 3 traços e 2 pacotes. Nota de motion: "com a rolagem, a câmera mergulha até a mesa 1 em ~1 viewport; o painel entra pela direita".
3. **Frames "Parada 4 · Follow-up" e "Parada 5 · Bookkeeper"**: a maquete ocupa **de x 0 até o fim da col 7** (818 px; sangra à esquerda, sem raio, sem caixa), com a mesa atual em foco e as outras a 40%. O `DeskPanel` fica em **cols 8-12 (526 px)**, com altura igual à da maquete (708 px) e conteúdo distribuído de cima a baixo: cabeçalho (LED + rótulo mono + nome 22 + `StatusChip`) → função (1 linha, 15) → "Today" com 3–4 `ActivityRow` (hora mono 13 + texto 15 em até 2 linhas, **quebrando linha, nunca cortando**) → o `ApprovalCard` compacto, quando houver → "You approve:" preso na base. A planta (A2) fica dentro da área da maquete, no canto inferior esquerdo (x 96, a 40 px da base), com **176×112 px e 7 retângulos na posição real das mesas** (as mesmas coordenadas do `desks.json`). O atual fica em menta, com o nome curto da mesa em mono 11 ao lado.
4. **Frame "Parada 7 · YOU" (F6, o clímax)**: a maquete encolhe para **cols 1-4** (a sala YOU em foco, x 0 a 488) e **o painel cresce para cols 5-12 (856 px)**. No topo do painel, "3 actions waiting for you" (Montserrat 500, 32) + "YOU · AEST 14:32" em mono. Embaixo, a **fila**: o `ApprovalCard` aberto, com 856 × ~420 e, atrás dele, as bordas dos outros dois (deslocadas 10 e 20 px para baixo, a 70% e 45%). O cartão aberto, de cima a baixo:
   - linha 1: a placa do agente (LED + "YOUR FOLLOW-UP") à esquerda e "11:48" em mono à direita;
   - a ação, em Montserrat 500 28/1.2, ≤ 2 linhas;
   - linha de fatos: o valor "A$14,200" (Montserrat 500 24, algarismos tabulares) · os destinatários (3 iniciais de 32 px) · o canal (mono);
   - **"Why"**: 3 linhas em mono 13, cada uma com um ✓ de 12 px em `text.2` (o ícone não é colorido);
   - a prévia da mensagem: uma caixa `ink.800`, raio 8, corpo 15/1.5, ≤ 3 linhas;
   - as ações: **Approve** (menta, L 56, o único menta da tela) · Edit (secundário, 56) · Decline (ghost-link).
   - Um 2º estado do mesmo frame mostra o depois: "Approved. Reminders sent to 3 clients.", e o próximo cartão sobe.
5. **Frame "Reduced motion"** (desenhado, não só nota): sem mergulho; a maquete inteira em cima, a planta como abas (7 botões de 44 px com o nome) e o painel da parada escolhida embaixo, em 8 colunas.

**A 390 (3 frames)**: o carrossel de mesas com scroll-snap. O cartão tem 330 px + 20 de borda do próximo e **sangra até a borda direita**. Em cima, o recorte da maquete (330×220); embaixo, o painel com ≤ 3 linhas, o texto quebrando e nunca cortado. O cartão YOU é diferente e maior: a ação 20/1.25, os fatos, as 3 linhas de "Why", a prévia em 3 linhas, Approve em largura total (56) e Edit/Decline lado a lado (48). A paginação é a planta em miniatura (7 retângulos de 10×8, cada um com área de toque de 44) + "Next desk →". O H2 em 3 linhas no máximo: "Never late. Never asks for a raise.", com o bloco roxo parado em "late".

### V2.4.2 Hero (a primeira impressão: tirar a "imagem em caixa")
**Sai**: a maquete numa caixa com raio e margem; a placa Follow-up repetida; os números numa linha própria debaixo do CTA (isso empurrava a maquete para baixo); o rótulo "render provisório" em laranja por cima da imagem (vai para a camada de anotação do Figma, fora da arte).
**Entra, a 1440**:
- y 120: o H1 em cols 1-10 (1.076 px; 3 linhas, como mediu o type-director), **com o bloco `brand.500` atrás de "OVER $250K PER MONTH"**.
- y 312: o subtítulo em cols 1-7, 20/1.5, ≤ 3 linhas.
- y 430: **uma linha só** com o CTA (L 56, cols 1-3) e, à direita dele, na mesma linha de base, os 3 números em cols 5-10 (valor 40 + rótulo mono 11 em **`text.2`**, ≤ 2 linhas, com fios verticais `line.hairline`).
- **y 520 até 1.080: a maquete de borda a borda** (x 0–1440, sem raio, sem caixa). Os 120 px de cima se dissolvem do `ink.950` para a imagem; é um scrim funcional, não um gradiente decorativo. Por cima, as **7 placas distintas** sobre as mesas certas (os rótulos e as leituras do `copy.md` §2.5: "Ad set paused", "12 leads today", "2 waiting" etc.), **2 traços ortogonais e 1 pacote "LEAD" parado no meio do traço** Ad manager → Follow-up.
- Na dobra de 900 aparecem 380 px de maquete com pelo menos 4 placas.
**A 390**: nav 56 → H1 5 linhas (y 84–250) → subtítulo de celular, 3 linhas → CTA em largura total (y ~360) → números em 3 colunas de 110 px (valor 24, rótulo ≤ 2 linhas de ≤ 14 caracteres; "$250K" cabendo inteiro) → a maquete **de borda a borda (0–390)**, com 390×440, 3 placas (Follow-up, Bookkeeper, YOU), 1 traço com pacote → 56 px de respiro antes da faixa roxa. Nenhum texto de outra seção pode aparecer sobre a imagem (a colisão nº 6 do júri).

### V2.4.3 Formulário final + "Office that never closes" (a pior tela do v1, e é a conversão)
**Sai**: o `compact` de 240 px numa coluna de 650; o vão de 660×870 à esquerda; a maquete noturna numa caixa de 400 px; o desalinhamento de x 728 × 768.
**Entra, a 1440: a noite como cena de borda a borda (F5, a rima com o hero)**. A seção tem ~900 px de altura, com o render noturno sangrando de 0 a 1440 por trás de tudo, escurecido a 55% com `ink.950` nas áreas de texto (scrim funcional).
- cols 1-6, no topo (y +128): o H2 em 2 linhas "Want a team like this in your business?" + o corpo em 3 linhas, `text.2`.
- cols 1-5, na base: o `NightLog` (o cartão `ink.950` a 92%, hairline, raio 12, 526 × ~230), com a régua 00 · 06 · 12 · 18 · 24 inteira, o marcador "Sydney 02:14" e 4 contagens. Só a contagem-chave fica em menta.
- **cols 8-12: o `LeadForm`** (o cartão `ink.950`, raio 12, padding 40, 526 de largura). O topo do cartão alinha com o topo do H2 e a base, com a base do `NightLog`. Os campos ficam em 1 coluna, com 446 × 56; os chips em 2×2 de 44 px (215 px cada), sem seleção; o botão L 56 em largura total; a privacidade em até 2 linhas.
**A 390**: H2 (2 linhas, "Want a team like this?") → o recorte noturno de borda a borda (390×280), com o `NightLog` sobreposto na base (régua inteira em 350 px, 4 contagens) → o cartão do formulário em largura total (350, campos de 310) → privacidade quebrando linha.

### V2.4.4 Notice + formulário (a faixa roxa: de "chapada" para "momento de marca")
O júri considerou a faixa o melhor momento de marca. O problema é o conteúdo dela, não a cor.
**Sai**: o H2 de 6 linhas; os "01/02" em mono; o passo 02 duplicado; os campos de 100 px; o chip pré-selecionado; a privacidade cortada.
**Entra, a 1440** (faixa de ~640, padding 96/96):
- cols 1-5: o **H2 em 2 linhas**, 44/1.1: "**Do not leave now!** Your team is waiting." (o `<strong>` 700 na 1ª frase; a versão curta do `copy.md` vale também no desktop). Embaixo, **alinhada à base do cartão**, uma `<ol>` de 2 passos em Montserrat 500 22/1.35, com o número no mesmo corpo e peso a 60% de opacidade, e uma linha de 15 px `text.1` abaixo de cada um: "1 Fill in your details" / "2 A specialist calls you within 5 minutes" (os textos certos do copy, sem a repetição).
- cols 7-12: o cartão (636 de largura, padding 40). Campos em 2 colunas de 266 × 56 (gap 16 na horizontal e 24 na vertical), com o rótulo visível a 14 px e 8 px acima; os chips em 1 linha de 4 × 44 px de altura e largura igual, nenhum selecionado; o botão L 56 em largura total; a privacidade em 13 px, até 2 linhas.
**A 390**: H2 (2 linhas) → `<ol>` com 2 itens de uma linha (44 de altura cada) → o cartão em largura total, com padding 20, **campos de 310 de largura** (o v1 tinha 240 dentro de 350), chips 2×2 de 44 px, botão de 56, privacidade quebrando linha. O formulário começa até 260 px depois do topo da faixa, como no v1, que o júri aprovou.

### V2.4.5 Correções objetivas (o figma-architect segue esta lista, item por item)
| # | Defeito (júri) | Instrução |
|---|---|---|
| 1 | Campos de 100 px fora do componente | Todas as telas usam **instâncias** de `Field` (56 px, rótulo visível em cima, placeholder, o chip `+61` no telefone). Proibido desenhar retângulo solto. |
| 2a–i | 9 cortes de texto | Nenhum texto com clip. Dar largura (o `DeskPanel` foi para 526) ou quebrar linha (privacidade, `ActivityRow`, rodapé). Chips: 4 em linha só a ≥ 636 de largura; abaixo disso, 2×2. "$250K" a 390: colunas de 110. A régua da noite a 390: 350 px, com os 5 marcadores visíveis. O estado success: o texto quebra em até 3 linhas. |
| 3 | Passo 02 duplicado e frase partida | Texto do `copy.md` §2.3, um por passo, sem repetir. Os números saem do mono (V2.4.4). |
| 4 | Destaque roxo ausente | O bloco `brand.500` atrás de "OVER $250K PER MONTH" (1440 e 390) e o `<strong>` 700 no H2 do Notice. |
| 5 | Placas repetidas, 3 de 7, sem traços nem pacotes | 7 placas distintas no hero a 1440 (3 a 390), 2 traços, 1 pacote parado. No tour, as 7 também. |
| 6 | Colisão de texto sobre o render a 390 | Respiro de 56 abaixo da maquete; nenhuma camada de outra seção por cima da imagem. |
| 7 | FAQ a 390 com a resposta errada | Copiar pergunta e resposta do mesmo item do `copy.md` §2.7; conferir os 7 pares a 390 e a 1440. |
| 8 | Formulário final mal montado | V2.4.3. |
| 9 | Chip pré-selecionado e chips de 30 px | O idle sem seleção; chips de 44 px; o estado selecionado só no frame `States`. |
| 10 | Eyebrow duplicado no tour | V2.4.1 (e o V2.4.8 tira todos os eyebrows de seção). |
| 11 | Tour com 1 parada | V2.4.1 (5 frames a 1440 e 3 a 390). |
| 12 | Mensagem de erro copiada em 3 campos | Uma mensagem por campo, do copy-director (V2.7). |
| 13 | Rótulos inconsistentes | Um só conjunto em telas e estados: "Name", "Company", "Work email", "Mobile" (o rótulo do telefone depende da decisão do dono sobre o WhatsApp; até lá, "Mobile"), "Monthly revenue (AUD)". |
| 14 | Frames ausentes | Desenhar: `StickyCTA` a 390; nav `top` e `scrolled`; os estados da `AgentPlate` (working / needs-approval / night); `Field` disabled; hover e foco do `TestimonialCard`; FAQ com hover (`ink.900` de fundo + `text.1`) e foco (anel menta de 2 px, offset 2) distinguíveis do fechado; o reduced-motion do tour; o success sem corte; o frame 768 (hero + formulário). |
| 15 | Intro ausente | V2.3 (frame `Intro`, 5 + 5 quadros + a anotação). |

### V2.4.6 Depoimentos (tirar a "fileira de 3 cartões iguais" e o vazio de 3 colunas)
**Sai**: os 3 cartões de 4 colunas com o vão de 300 px à direita; as aspas roxas decorativas.
**Entra (a partir de `jimo/home-09`, transformado)**: **um depoimento por vez, em largura total**. O H2 fica em 2 linhas, cols 1-7. O cartão tem 1.296 × ~340, fundo `ink.900`, raio 12, e o próximo aparece 48 px na borda direita, sangrando.
- Dentro, em cols 1-8: a citação em 28/1.35 Montserrat 400, ≤ 4 linhas; embaixo, a pessoa (iniciais de 48 + nome + cargo · empresa + o setor em mono).
- Em cols 9-12, separado por um fio vertical: o **resultado** em numeral grande (Montserrat 500, 64) + o rótulo de 15 px.
- Controles embaixo, à direita: "1 / 3" + ← → de 44×44 (aqui o número é controle).
- O estado `placeholder` mostra todos esses slots preenchidos com o texto marcado como pendente, para dar para julgar o cartão final.
- **Novo estado da seção**: `empty` (nenhum depoimento real aprovado) = **a seção não aparece**. Lançar com depoimento falso ou de restaurante é proibido (§9 do v1).
A 390: o cartão com 330 + a borda do próximo; a citação a 20/1.4; o resultado embaixo da pessoa; os controles de 44.

### V2.4.7 About, FAQ e o ritmo da página (acabar com os 4 "splits")
- **About**: deixa de ser split. O H2 vai em cols 1-10, **2 linhas**, com a versão curta do copy. Embaixo, o corpo em 2 colunas (cols 1-5 e 7-11). Os 3 fatos viram **3 colunas** (cols 1-4, 5-8, 9-12), cada uma com o termo em Montserrat 500 22 + 1 linha em `text.2` 15 (o copy escreve). O mono e os pontos saem. Altura ~560. Se vier foto real do time, ela entra no lugar da 3ª coluna (P&B, raio 12).
- **FAQ**: continua split (é a forma certa para acordeão), com o título preso em cols 1-4 **em 2 linhas** e o acordeão em cols 6-12. Saem os 258 px mortos depois dele: o padding de baixo é 128 e acabou.
- **Ritmo resultante**: hero de borda a borda → faixa roxa em split → depoimento em largura total → palco do tour de borda a borda → lista → About em colunas → FAQ em split → a noite de borda a borda. Nenhuma forma se repete duas vezes seguidas, e a página abre e fecha com a maquete sangrando (F5).

### V2.4.8 Eyebrows e mono (vale para a página toda)
- **Saem todos os eyebrows de seção** (TESTIMONIALS, LIVE OFFICE, ABOUT US, FREQUENTLY ASKED QUESTIONS, OFFICE THAT NEVER CLOSES, NOTICE). A informação vai para o H2 ou sai.
- O mono fica **só no dado**: rótulo de mesa, leitura de placa, hora, valor em AUD, etiqueta de pacote, setor do depoimento, a régua de 24 h, as linhas "Why" e os rótulos dos números do hero (em `text.2`, não `text.3`).
- As âncoras da nav continuam (Live office · Agents · FAQ): é navegação, não eyebrow.

## V2.5 Wireframes v2 (1440, a ordem e as alturas)
```
y      1440 (x 0 ──────────────────────────────────────────── 1440)
0      NAV 72  ◭ BrandUp        Live office · Agents · FAQ        [Diagnosis]
120    H1 cols 1-10, 3 linhas, [OVER $250K PER MONTH] em bloco roxo
312    subtítulo cols 1-7
430    [Build my AI office]      90 days │ 24/7 │ $250K(menta)
520    ░░░░░ MAQUETE de borda a borda, 7 placas, 2 traços, 1 pacote ░░░░░░
1080   ─────────────────────────────────────────────────────────────────
       ▓▓ FAIXA brand.500 ~640 ▓▓  H2 2 lin. + <ol> 2 passos │ cartão 636 (2 col)
1720   H2 2 lin. (cols 1-7)
       ┌ depoimento em largura total: citação cols 1-8 │ resultado cols 9-12 ┐ ▌próximo
       └─────────────────────────────────────── 1 / 3  ←  → ─────────────────┘
2300   PALCO DO TOUR (preso, 7 × 70vh): cabeçalho 96 (H2 com bloco roxo │ selo · AEST)
       entrada: maquete inteira → parada: maquete x0–818 │ painel cols 8-12
       → YOU: maquete cols 1-4 │ FILA cols 5-12 (856)
       ALL AGENTS AT A GLANCE (6 linhas)
       ABOUT: H2 cols 1-10 · corpo 2 col · 3 fatos em 3 colunas
       FAQ: título preso cols 1-4 │ acordeão cols 6-12
       ░░ NOITE de borda a borda ~900: H2 cols 1-6 + NightLog cols 1-5 │ FORM cols 8-12 ░░
       FOOTER 240
```
```
390 (x 0 ── 390)
NAV 56  ◭ BrandUp  [Diagnosis]
H1 5 linhas · subtítulo 3 · [CTA 350×56] · 90 days │ 24/7 │ $250K (110 cada)
░ MAQUETE 390×440 de borda a borda, 3 placas, 1 traço ░
56 de respiro
▓ FAIXA: H2 2 lin. · 2 passos de 1 linha · cartão 350 (campos 310, chips 2×2) ▓
depoimento 330 + borda · controles 44
H2 do tour (3 lin. máx.) · carrossel de mesas 330 + borda · planta-paginação · Next desk →
cartão YOU maior (Approve em largura total)
glance (1 coluna) · About · FAQ
H2 · ░ noite 390×280 + NightLog ░ · formulário 350
FOOTER · [StickyCTA 64 + safe-area, "em avaliação"]
```

## V2.6 Estados novos ou alterados
- **Intro**: `playing` / `skipped` (150 ms) / `none` (reduced motion, 2ª visita, âncora, voltar, Save-Data, 2g/3g, aba oculta, sem JS).
- **Testimonials**: `empty` = a seção não aparece.
- **`ApprovalCard`**: ganha o slot `why` (3 linhas) e o `preview`; os estados continuam os do v1 (pending / approving / approved / declined / edited), e o frame YOU mostra o pending e o approved.
- **`DeskPanel`**: `size` regular (526) / queue (856).
- **B10**: o estático = o bloco roxo em "never late"; o reduced motion = o mesmo.

## V2.7 Pedidos
**Ao copy-director** (função e tamanho; o resto do `copy.md` fica):
1. Todos os H2 com **≤ 2 linhas a 1440** (44 px na largura indicada) e ≤ 3 a 390: Testimonials ≤ 40 caracteres; About ≤ 60; FAQ ≤ 36; tour = a frase do anúncio em 2 linhas (já cabe; sai "Meet your new team.").
2. A linha de apoio do tour (cols 9-12 sai), se quiser manter alguma: ≤ 60 caracteres, embaixo do H2.
3. O `ApprovalCard` da parada YOU, para 3 cartões (follow-up de cotação, lembrete de fatura, post do LinkedIn): ação ≤ 70 caracteres; 3 linhas "Why" de ≤ 36 cada (fatos, não adjetivos); prévia da mensagem ≤ 160; valor em AUD quando houver; todos marcados como exemplo.
4. Os rótulos dos números do hero com ≤ 2 linhas de ≤ 14 caracteres (a 390 a coluna tem 110 px).
5. Os 3 fatos do About como termo (≤ 18) + 1 linha (≤ 60).
6. Uma mensagem de erro por campo (name, work email, mobile, company, revenue), dizendo o que corrigir.
7. A moeda e a comprovação em "Over 10 million in sales" (A$? para o dono confirmar; o júri marcou a falta da moeda).
8. A intro não tem texto. O "Skip intro" (≤ 12 caracteres) é só para teclado e leitor de tela.

**Ao type-director**:
1. O bloco do destaque (`brand.500`, padding 0 .15em, raio 2) aplicado ao gancho e ao H2 do tour (B10): conferir a entrelinha para os blocos de 2 linhas não se tocarem.
2. Os números da `<ol>` do Notice no mesmo corpo e peso do texto (fora do mono).
3. O valor do `ApprovalCard` (Montserrat 500 24, tabular) e o resultado do depoimento (Montserrat 500 64): confirmar ou propor o papel `numeral.card`.
4. Os rótulos mono de 11 px sob os números: subir para `text.2` e conferir o par contraste × tamanho (o júri marcou no limite).
5. O wordmark "BrandUp" do header ao lado do triângulo: definir o papel (hoje é Montserrat no texto).

**Ao frontend-studio** (depois do mock aprovado):
1. **A intro** (V2.3): o overlay estático no `index.html` (antes do React), SVG inline + CSS inline ≤ 2 KB no total, script inline ≤ 0,5 KB que decide e liga a classe antes do 1º quadro. O FLIP para o logo do header mede o alvo em tempo de execução; se o header ainda não montou, usa as coordenadas fixas do brief (72, 36, 28 px / 20, 28, 24 px). Os LEDs só voam se as placas estiverem na viewport e o render tiver chegado; senão, fade. Dispara o evento `intro:done`, que libera o embaralhamento dos números e os pacotes. A medida de aceite está no V2.3.
2. **B10**: `animation-timeline: view()` onde houver suporte, e o fallback com IntersectionObserver em passos discretos (uma palavra por limiar). **Não verifiquei o suporte a scroll-driven animations no WebKit atual; testar.** Com reduced motion, fica parado.
3. **E7**: o mergulho é `transform` (scale + translate) da imagem mestre dentro do palco preso, só a ≥ 1024, com o mesmo `desks.json` do pan das paradas. Sem canvas.
4. Orçamento: não muda em relação ao v1 (JS novo ≤ 25 KB gz, imagens acima da dobra a 390 ≤ 140 KB). A intro não entra no JS do bundle.

**Ao figma-architect, a ordem de trabalho**:
1. Os componentes primeiro: `ApprovalCard` (slots `why` e `preview`), `DeskPanel` (`size` regular/queue), `FloorplanIndex` (a planta real), `TestimonialCard` (featured), `NavBar` (com o símbolo), `IntroFrame`.
2. Correções objetivas (V2.4.5), em todas as telas.
3. O tour (V2.4.1) → o hero (V2.4.2) → o final (V2.4.3) → o Notice (V2.4.4) → depoimentos (V2.4.6) → About/FAQ (V2.4.7).
4. O frame `Intro` (V2.3).
5. Antes de devolver: os olhos semicerrados no hero (gancho roxo → CTA → $250K → maquete); o teste de sobreposição do V2.2; e uma busca por texto cortado em cada frame (nenhum texto pode encostar na borda do container).

## V2.8 Riscos novos
| Risco | Mitigação |
|---|---|
| A intro custar lead no Meta Ads | O H1 pintado por baixo; ≤ 1,1 s; pulável no 1º toque; só na 1ª visita; desligada em rede lenta; o A/B recomendado; barata de remover ("em avaliação"). |
| A intro "piscar" (aparecer depois que o conteúdo já pintou) | Ela é decidida no `<head>`, antes do 1º quadro; sem JS não existe. |
| O FLIP dos LEDs errar o alvo (o render ainda carregando, viewport diferente) | Os LEDs só voam se o alvo existir e estiver visível; senão, fade. |
| A parada YOU parecer o jimo | O teste de sobreposição do V2.2 (sem janela de app, sem chat, sem abas). |
| O F6 virar promessa falsa | Todo dado com o selo "Example activity"; nenhuma permissão ou integração que o produto não tenha (é por isso que o A8 ficou de fora). |
| O B10 ilegível no WebKit sem scroll-driven | O fallback por IO; as palavras sempre brancas; só o bloco anda. |

## V2.9 O que o V2 revoga no v1
- §3.1: F1 e F3 viram F6. Entra o B10. O E7 entra dentro do D1.
- §3.2: o B7 continua descartado para o gancho e o CTA, mas o B10 (parente dele) entra no H2 do tour. O E2 continua descartado no hero (o formulário fica no meio).
- §5.2: a maquete deixa de ser caixa e passa a sangrar; os números vão para a linha do CTA.
- §5.3: o H2 longo no desktop sai; os passos viram `<ol>`, sem mono.
- §5.4: os 3 cartões viram um depoimento em destaque, e entra o estado `empty`.
- §5.5: o painel tem 526 px (regular) e 856 px (YOU); a planta é real; o cabeçalho do palco não tem eyebrow; "Meet your new team." sai.
- §5.6: o About vira colunas, não split.
- §5.8: a noite sangra por trás; o formulário vai para cols 8-12 com 526 px.
- §6.2 e §6.3: complementados pelo V2.7.
- Os eyebrows de seção em todo o v1: saem (V2.4.8).

---

# Base: brief v1 (vale onde o V2 não diz nada)

# BrandUp: brief de direção do redesign (mock no Figma)

Autor: ui-ux-director · 08/11/2026 · branch `redesign/b2b-ai-office`
Para: `figma-architect` (compõe), `type-director`, `copy-director` (texto em `docs/redesign/copy.md`, em paralelo), depois `frontend-studio`.
Revisado com as entradas do dono de 08/11: a trinca de cor e o escritório 3D da propaganda.

---

## 0. O que existe hoje (verificado)
- Site no ar (capturado a 1440 e 390 em 08/11): fundo `#09060c`, roxo `#9232ea`, aqua `#8ae9dd` em gradiente no CTA, Montserrat 400/900, hero com foto de restaurante (`public/agnes-restaurant.png`), 3 números com embaralhamento (`HeroStatItem` + NumberFlow, aprovado pelo dono), formulário `#diagnostic` (Supabase `leads`, honeypot, redirect `/thank-you`), depoimentos em trilho (`Testimonials.tsx`, aprovado no commit 438a4f6), carrossel de serviços, time, FAQ (`<details>`), rodapé.
- Problemas que o redesign tem que resolver:
  1. **A 390, o formulário fica cerca de 1.000 px abaixo do fim do hero.** O texto do Notice e os 2 passos vêm antes dele (`.notice-left` antes de `.lead-form`). O tráfego vem do Meta Ads no celular, então isso custa lead.
  2. Os campos só têm placeholder; o rótulo está em `sr-only`. Isso falha em acessibilidade e o rótulo some ao digitar.
  3. O `.reveal-on-scroll` aplica blur de 20 px e opacidade 0 em títulos. Num print de página inteira, o Notice sai vazio. Isso fica proibido no H1, no formulário e nos números.
  4. A sombra roxa difusa do CTA (`0 18px 44px rgba(146,50,234,.3)`) e os gradientes radiais roxo/aqua estão na lista de slop. Saem.
  5. Os ícones sociais vêm de `cdn.simpleicons.org` (requisição externa) e estão na nav, o que abre uma saída no topo. Vão para o rodapé, em SVG inline.

## 1. Peça e objetivo
- **Peça**: a landing de conversão de uma única página. Vende um escritório de agentes de IA para indústria e empresas B2B na Austrália, em inglês australiano, com valores em AUD.
- **Quem chega**: o dono ou diretor de uma empresa industrial ou B2B, vindo de um anúncio do Meta (celular, navegador do Instagram ou do Facebook, com pressa e atenção de feed). Acabou de ver a propaganda do escritório 3D.
- **Tarefa da pessoa**, em ordem: (1) entender em 3 s o que é e quanto promete; (2) confiar ("isso é real, e quem controla sou eu"); (3) agir, preenchendo 5 campos.
- **Métrica**: taxa de envio do formulário por sessão vinda de anúncio (evento `Lead` confirmado, que já existe em `markLeadConfirmed`). Secundárias: % de quem chega ao formulário a 390; LCP ≤ 2,5 s em 4G no celular.
- **Uma ação primária na página inteira**: enviar o formulário (CTA "Build my AI office", segundo o `copy.md`). Todo botão primário leva a ela.

## 2. Conceito (uma frase)
**"A maquete da sua empresa, funcionando."** Um modelo arquitetônico escuro do escritório da BrandUp (o mesmo da propaganda, com acabamento adulto), onde cada mesa é um agente. Por cima de cada mesa flutua uma **placa** viva, com o que o agente está fazendo. Os dados correm de mesa em mesa e terminam na sala do dono, onde ele aprova.

A proposta funde as duas ideias que estavam em disputa. O 3D do dono dá o lugar e o charme (e continua a mensagem do anúncio: a pessoa clica no escritório e cai no escritório). As placas do Antonio dão a leitura adulta, o dado e o controle. O 3D é o palco; a informação é sempre HTML nítido por cima.

## 3. Movimentos

### 3.1 Escolhidos (5)
| Código | Captura que prova (aberta) | Porquê aqui | O que muda em relação à fonte | Custo |
|---|---|---|---|---|
| **D1** 3D pré-renderizado | `sites/qclay-home/videos-frames/about-1-0.5.jpg` (argila fosca monocromática, luz suave) | O 3D é decorativo e narrativo, não manipulável. Render dá qualidade igual em qualquer GPU, e o celular do Meta Ads não paga WebGL. A argila fosca da QH é a régua de acabamento para tirar o "infantil" do escritório. | A QH usa MP4 de objetos soltos. Aqui é **um único render ortográfico (isométrico) de alta resolução** do escritório. A "câmera voando de mesa em mesa" vira pan e zoom de imagem; na projeção ortográfica isso é matematicamente o mesmo movimento, sem vídeo controlado pela rolagem (frágil no iOS). Vídeo só em laços curtos por mesa, opcionais. | $$$ produção · $ runtime |
| **E5** Trajetória animada | `sites/qclay-p12/d-03.webp` (chevrons percorrendo a órbita do roadmap) | Mostra o produto funcionando: um lead sai do Marketing, chega ao Follow-up e o contador da placa sobe. Passa na régua "alguém consegue dizer o que aconteceu?". | Na P12 é uma linha do tempo curva, com chevrons decorativos. Aqui são **traços ortogonais sobre o piso da maquete** (como tubulação de planta industrial ou fluxograma P&ID, com cotovelos de 90°). O que corre são **etiquetas com dado** em mono ("LEAD", "QUOTE A$14.2K", "INV-0412"), não setas. A direção é o fluxo de trabalho. Não há tempo nem órbita. | $$ |
| **F1** Fragmento de UI vivo | `sites/prolibu-sales/d-10.webp` (o discador com número em mono ao lado do texto do recurso) | Prova sem screenshot: cada agente mostra o pedaço exato do que faz, com dado plausível marcado como exemplo. | No Prolibu, o fragmento é uma tela de app ao lado de um texto, em linhas alternadas com trilho numerado. Aqui o fragmento **é a placa ancorada em cima da mesa 3D** (LED + nome + leitura viva), e ela se abre num painel lateral durante o tour. Não há alternância texto/fragmento nem trilho numerado. | $$ |
| **F3** IA como ação aprovável | `dribbble-qclay/03-ai-trading-dashboard.webp` (cartão "Approval required" dentro do painel do assistente) | É a promessa que diferencia a oferta: o dono aprova de qualquer lugar. Responde à objeção nº 1 de comprador industrial ("e se a IA fizer besteira com o meu cliente ou o meu dinheiro?"). | No shot, a aprovação é um campo de configuração dentro de um tablet de trading. Aqui é uma **ordem de serviço** (agente, ação, valor em AUD, destinatários) que chega à **sala "YOU" da maquete**: uma fila empilhada com Approve / Edit / Decline e o estado depois da decisão. Não há mockup de aparelho em volta. | $$ |
| **A2** Índice do produto vira navegação | `sites/prolibu-sales/d-10.webp` (trilho "1 / 2 CONTATO / 3…7" à esquerda) | O tour tem 7 paradas (6 mesas + a sua sala). A pessoa precisa saber onde está e quanto falta, e o índice mostra que o escritório é completo. | **Não é um trilho numerado vertical.** É a **planta baixa da maquete em miniatura** (canto inferior esquerdo a 1440): 7 retângulos na posição real das mesas, com o atual aceso em menta. Clicar leva à mesa. A 390, a mesma planta vira a paginação do carrossel. A forma nasce do nosso objeto (a planta do escritório), não de uma lista de etapas. | $$ |

**Soma de custo**: um só $$$ (D1, na produção do render). O resto é $$ de HTML/SVG + IntersectionObserver. Fica dentro da regra.

**Convenções de base, todas $ (não contam como movimento)**: C3 (quase-preto, nunca `#000`/`#fff` puros); A4 (grade de pontos a 4% só no "chão" das seções de produto, continuando a grade que o hero atual já tem); F4 parcial (faixas de faturamento em **chips**, como em `qclay-home/w-13.webp`, no lugar do `<select>`: um toque no celular); F5 (abertura e fechamento rimam: a maquete abre o hero e volta **à noite** na última seção, com o registro da madrugada).

### 3.2 Descartados
| Código | Porquê não |
|---|---|
| A1 cena por passo de roda | A página é de conversão, com formulário: precisa de rolagem nativa, de "voltar" e de leitor de tela. O tour usa `sticky` com rolagem nativa, não roda sequestrada. |
| A3 como movimento | Vira regra de ritmo (About é a seção "vazia" entre o tour denso e o FAQ). Não precisa de código próprio. |
| A5 lista tipográfica | Entra só no resumo "All agents at a glance", no fim do tour (6 linhas). Não substitui o tour. |
| A6 bento de métricas | Os únicos números reais são as alegações do dono (90 dias, 24/7, $250k). Um bento com KPI inventado é slop e risco jurídico (ver §9). |
| A7 prancha de apresentação | Mockup inclinado é para vitrine; aqui a pessoa precisa ler. |
| B1 escala extrema | O gancho tem 118 caracteres. Uma razão de 12:1 quebra a 390 (seriam mais de 12 linhas). O papel do gancho é "cartaz comercial", não "pôster de estúdio". |
| B3 choque de famílias | Não cabe numa página comercial agressiva com a UI dos agentes; o choque roubaria o contraste do acento. |
| B6 elemento dentro do título | O H1 já é longo e precisa ser lido e indexado. |
| B7 frase que se edita | O gancho e o CTA precisam ser lidos de primeira. |
| B8 wordmark gigante no rodapé | Compete com o formulário final, que é o fim real da página. |
| C2 cor por seção | A cor já carrega status (Working / Needs approval / Needs attention); usar para seção vira ambiguidade. |
| C4, D7 foto como fonte de cor / foto editorial | Não há foto própria do novo negócio. A foto de restaurante sai. |
| C5, C6, C7 eras, vidro, metal | O vidro está na lista anti-slop; o metal e a gravura não conversam com a maquete. |
| D2 sequência de imagens | De 13 MB para cima; inviável no Meta Ads no celular. |
| D3 WebGL em tempo real (three/R3F + glTF) | Não há interação que o justifique (ninguém precisa girar a sala). Custaria cerca de 150 KB gz de three + 1 a 3 MB de modelo, mais a variação de GPU no navegador do Instagram e o risco no WebKit. **Fica como fase 2**, se o dono tiver o `.glb` e o pan/zoom se provar insuficiente. Ver §8. |
| D4, D5, D6 objeto-herói, logos como objeto, fim fotográfico | Não há objeto-símbolo além da maquete; ainda não há 6 logos fortes de clientes; e um fim calmo briga com a conversão agressiva. |
| E1 Lenis | Rolagem suave por cima de formulário e `sticky` no iOS só traz bug. Fica a rolagem nativa. |
| E2 desmontar o hero | O formulário fica entre o hero e o tour; não há continuidade a costurar. |
| E3, E4 opacidade como cursor, marquee | Não há manifesto longo; e um marquee competiria com os pacotes em movimento (dois movimentos perpétuos na mesma tela). |
| E6 nav flutuante em pílula | No lugar dela entra a **barra de CTA fixa no celular** (§5.10), que serve à conversão. |
| F2 a mesma UI em duas escalas | A aprovação já diz "de qualquer lugar"; a transformação painel → celular seria mais um movimento $$ sem informação nova. |

**Equilíbrio de fontes**: puxei de QH (D1, chips), P12 (E5), Prolibu (F1, A2), Dribbble/Qclay (F3). PI e ME ficaram de fora de propósito: a peça é comercial e agressiva, não editorial. O Prolibu aparece duas vezes, então o teste de sobreposição (§6.4) é obrigatório nas duas.

## 4. Cor: a trinca "2 quietas + 1 alta" (decisão)

### 4.1 A trinca
| Papel | Token | Valor | Por quê |
|---|---|---|---|
| Quieta 1, o humor (fundo) | `color.ink.950` | `#060409` | Preto quase puro (as referências usam `#010102`/`#01010D`), com um fio de roxo para não ficar morto. Evita o "smear" do preto absoluto em OLED ao rolar. Mais escuro que o `#09060c` atual. |
| Quieta 2, a marca (campo) | `color.brand.500` | `#9232EA` | **Mantido.** É a cor do logo, das legendas da propaganda e da memória do público. O Electric Indigo `#6331FB` dá +0,7 de contraste com texto claro (5,56 contra 4,83), mas trocar a marca para ganhar 0,7 não paga. O roxo aparece **em campo grande** (a faixa do formulário, o tapete da maquete), como nas duas referências. |
| Alta, o acento | `color.accent.400` | `#58F6B1` (Tropical Lime da referência 1) | Escolhido sobre o `#88F9C0` (Mint): é mais saturado, então "grita" mais em área pequena (CTA, LED), e casa com as cadeiras menta da propaganda. Texto escuro sobre ele dá 14,8:1. |

Tons derivados (não são cores novas, é a mesma família):
- `color.ink.900` `#0F0A16` (superfície elevada), `color.ink.850` `#151020` (placa), `color.ink.800` `#1B1428` (hover de placa).
- `color.brand.300` `#B99CFF` (o roxo como **texto** sobre preto: link, eyebrow; 9,0:1). O `#9232EA` nunca é usado como texto sobre preto (3,76:1, reprova).
- `color.brand.deep` `#2A1150` (o tapete e o piso roxo do render; também a faixa alternativa, se o dono achar o `#9232EA` cheio demais).
- Texto: `text.1` `#F4F0FA` (18,2:1) · `text.2` `#B3ADBC` (9,4:1) · `text.3` `#8A8494` (5,6:1, o piso para corpo pequeno). A hierarquia é por opacidade do mesmo tom.
- Linhas: `line.hairline` `rgba(244,240,250,.08)` · `line.strong` `rgba(244,240,250,.14)`.

### 4.2 Contraste medido (WCAG 2.x, cálculo de luminância em 08/11)
| Par | Razão | Uso permitido |
|---|---|---|
| `text.1` sobre `ink.950` | 18,16 | todo texto |
| `accent` sobre `ink.950` / `ink.900` | 14,8 / 14,2 | CTA, LED, número-chave |
| `ink.950` sobre `accent` (texto do botão) | 14,8 | rótulo do CTA |
| `brand.300` sobre `ink.950` | 9,0 | eyebrow, link, rótulo de agente |
| `text.3` sobre `ink.900` | 5,4 | legenda, meta |
| branco `#FFF` sobre `brand.500` | 5,43 | texto dentro do destaque roxo do gancho |
| `text.1` sobre `brand.500` | 4,83 | texto corrido na faixa do formulário (AA ≥ 4,5 ✓) |
| `accent` sobre `brand.500` | 3,94 | **só** como superfície de botão sobre o roxo (não texto, ≥ 3:1 ✓). O formulário fica num cartão `ink.950` dentro da faixa, então o botão menta senta no preto (14,8). |
| `brand.500` sobre `ink.950` | 3,76 | só preenchimento/borda (≥ 3:1 para componente), nunca texto |
| amber `#FFB547` / red `#FF5C6C` sobre `ink.950` | 11,6 / 6,8 | status e erro |

### 4.3 Onde o acento PODE e NÃO PODE aparecer
**Pode (é o único elemento alto):**
1. O fundo do botão primário (um por viewport; no celular, a barra fixa conta como esse único).
2. O número-chave: **"$250K"** no trio de números do hero e a contagem da noite na última seção. Mais nenhum número.
3. Estado ativo: o LED "Working" das placas (6 px), a mesa atual na planta miniatura, a luz do monitor da mesa ativa no render, o anel de foco do teclado sobre fundo escuro, o chip de faturamento selecionado.
4. O botão **Approve** no cartão de aprovação (é a ação do dono).

**Não pode:** texto corrido ou títulos; fundo de seção ou faixa; gradiente; borda de todos os cartões; ícone decorativo; sombra ou brilho (glow); mais de um CTA menta visível ao mesmo tempo; o pacote de dados (os pacotes são roxo `brand.300`; só o que chega ao destino pisca menta uma vez); qualquer coisa no render além da mesa ativa e das cadeiras (que passam a cinza, ver §8.3).

**Cores de função (não fazem parte da trinca, uso mínimo):** `status.attention` `#FFB547` (o chip "Needs approval": é com você); `status.error` `#FF5C6C` (erro de formulário, "Needs attention"); "Done" e "Scheduled" recuam para `text.3`. O sucesso é menta (é estado ativo). Fica sem verde extra.

**Em aberto para o dono**: a trinca usa a referência 1 (o lime). Se ele preferir o Mint `#88F9C0` (referência 2), basta trocar o valor do token `accent.400`: o contraste sobe para 15,9 e nada mais muda. No Figma, criar a coleção `Accent` com os modos `Lime` e `Mint` para ele ver lado a lado.

## 5. Mapa de seções, composição e estados

**Ordem final** (ajustes justificados):
1. Nav + Hero
2. Notice + formulário
3. Testimonials
4. **Live office: o tour pela maquete** (funde "Live office" e "Agents": o tour **é** a apresentação dos agentes, e duas seções com os mesmos 6 agentes repetiriam conteúdo). Fecha com "All agents at a glance", uma lista de 6 linhas para quem só escaneia e para o `reduced-motion`.
5. About (a seção de respiro, A3)
6. FAQ
7. **Office that never closes + formulário final**. Foi para depois do FAQ: o último pedido vem logo depois da última objeção respondida, e a maquete à noite fecha a página (F5).
8. Footer

**Grid**
| Breakpoint | Colunas | Gutter | Margem | Conteúdo |
|---|---|---|---|---|
| 1440 | 12 | 24 | 72 | 1296 |
| 768 | 8 | 20 | 40 | 688 |
| 390 | 4 | 12 | 20 | 350 |

Respiro vertical das seções: 1440 = 128 (marketing) / 96 (dentro do tour); 390 = 72 / 56.

### 5.1 Nav (pergunta: "onde estou e como falo com vocês?")
- 1440, 72 px de altura: logo à esquerda; no centro, 3 âncoras (Live office · Agents · FAQ) em `text.2` 15 px; à direita, o botão secundário "Diagnosis" (contorno `line.strong`, 44 px). O primário menta fica para o hero, para manter um só por viewport.
- Estados: `top` (transparente sobre o hero) e `scrolled` (fundo `ink.950` a 92%, com hairline embaixo; sem blur).
- 390, 56 px: logo + botão "Diagnosis" compacto (44×44 no mínimo). Sem hambúrguer. Os ícones sociais saem da nav.

### 5.2 Hero (pergunta: "o que é, quanto promete, é pra mim?")
**1440 (primeira dobra a 1440×900):**
```
 72 ┌ NAV ───────────────────────────────────────────────────────────────┐
    │                                                                    │
120 │      HOW INDUSTRIAL AND B2B COMPANIES ARE GENERATING [OVER $250K    │ cols 2-11, centrado
    │      PER MONTH] WITHIN 90 DAYS BY INVESTING IN AUTOMATION AND AI.   │ 52/1.08, 3 linhas
    │                                                                    │ [..] = destaque roxo
    │        Subcopy 20/1.5, cols 3-10, 2-3 linhas, text.2               │
    │                  [ Build my AI office  → ]  (menta, 56)            │
    │        90 days        │       24/7        │      $250K (menta)     │ números: inline, fios
    │        rótulo mono    │    rótulo mono    │      rótulo mono       │ verticais, sem cartão
~640├────────────────────────────────────────────────────────────────────┤
    │ ░ MAQUETE (render ortográfico, sangra até as bordas) ░░░░░░░░░░░░░ │ aparece ~260 px acima
    │  [▪ MARKETING ·  ad set paused]   [▪ FOLLOW-UP · 12 leads today]   │ da dobra; placas
    │        └──LEAD──▶────────────────────┘          [▪ YOU · 2 waiting]│ compactas sobre as
    │  [▪ SOCIAL]  [▪ SERVICE]  [▪ BOOKKEEPER]  [▪ REPORTS]              │ mesas; pacotes nos traços
~1100└───────────────────────────────────────────────────────────────────┘
```
- Ordem de leitura com os olhos semicerrados: o destaque roxo do gancho → o CTA menta → "$250K" menta → a maquete. Se a maquete ganhar do gancho, escureça o render.
- **O destaque roxo** atrás de "OVER $250K PER MONTH" (`brand.500`, padding 0 0,15em, raio 2) repete a legenda da propaganda: o anúncio e a página dizem a mesma coisa do mesmo jeito.
- Na maquete aparecem 7 placas compactas (6 agentes + YOU). O render ocupa a largura toda e altura de ~460; o topo dele entra na primeira dobra.
- **Regra da dobra**: a 1440×900, o CTA e os 3 números precisam aparecer. Se não couber, corte a altura do respiro, nunca o gancho.

**390 (peça própria):**
```
 56 NAV (logo · Diagnosis)
    HOW INDUSTRIAL AND B2B           30/1.1, caixa alta, ALINHADO À ESQUERDA
    COMPANIES ARE GENERATING         (o atual é centrado; centrado em 9 linhas
    [OVER $250K PER MONTH]           fica serrilhado e lento de ler; reversível)
    WITHIN 90 DAYS BY INVESTING      ~290 px
    IN AUTOMATION AND AI.
    Subcopy 17/1.5 (copy: ≤ 3 linhas aqui; ver §7)
    [ Build my AI office → ]  largura total, 56
~640 ─ dobra do Instagram (~700 visível)
    90 days | 24/7 | $250K          3 colunas compactas, 72 px
    ░ MAQUETE recorte retrato ░      350×420, 3 placas visíveis (Follow-up, Bookkeeper, YOU),
                                     1 traço com pacote
```
- O CTA tem que caber acima de 700 px de altura útil (é o navegador do Instagram).
- Estados: sem esqueleto. O gancho é texto do servidor e é o LCP. O render carrega com o poster AVIF (§8.4) sobre `ink.950`; até ele chegar, aparecem só a grade de pontos e as placas, que já fazem sentido sozinhas.
- **Motion (descrever no Figma como notas)**: os números embaralham uma vez (o componente atual, aprovado). As placas entram com 60 ms de defasagem. Depois de 800 ms, um pacote "LEAD" sai do Marketing, percorre o traço em ~2 s e chega ao Follow-up; o contador da placa sobe +1 e o LED pisca menta uma vez. A cada ~6 s, um pacote "APPROVAL" chega ao YOU e o contador "2 waiting" vira "3". Máximo de 3 pacotes ao mesmo tempo. Tudo pausa fora da tela e com a aba escondida. **Reduced motion**: o quadro estático com os pacotes parados no meio dos traços e os contadores no valor final.

### 5.3 Notice + formulário `#diagnostic` (pergunta: "o que acontece se eu preencher?")
**1440:** faixa de largura total em `brand.500` (campo de humor, quieta 2), altura ~680.
```
cols 1-5                                   cols 7-12
NOTICE (mono, text.1 100%: sobre o roxo   ┌ CARTÃO ink.950, raio 12, padding 40 ┐
 não há margem para opacidade, 4,83:1)     │ Name ______   Company ______        │ 2 colunas
H2 2-3 linhas, text.1 (4,83:1)             │ Email ______  Mobile (WhatsApp) ___ │ rótulo VISÍVEL em cima
01  Complete the form · 1 linha            │ Monthly revenue (AUD)               │
02  Get a call within 5 minutes · 1 linha  │ [chip][chip][chip][chip]            │ 4 chips numa linha
                                           │ [ Build my AI office → ] menta, 56  │
                                           │ privacy 13 px text.3                │
                                           └─────────────────────────────────────┘
```
**390:** H2 (≤ 2 linhas) → os 2 passos em **uma linha cada** (48 px, numerados em mono) → o cartão do formulário em largura total (campos em 1 coluna, chips em 2×2, botão de 56) → privacidade. **O formulário começa até 260 px depois do topo da seção.** Isso corrige o problema 1 do §0.
- Campos (do `copy.md`): name, email, mobile/WhatsApp (com o prefixo fixo `+61` num chip), company, revenue (as faixas em AUD vêm do copy-director e o dono confirma).
- **Estados (desenhar todos no Figma, num frame "States")**:
  - `Field`: vazio / foco (borda 2 px `brand.300` + anel menta de 3 px a 40%) / preenchido / erro (borda `status.error`, mensagem de 14 px embaixo dizendo o que corrigir, ícone de 16 px) / desabilitado.
  - `RevenueChips`: nenhum / selecionado (fundo menta, texto `ink.950`) / foco / erro de grupo ("Choose a range").
  - `LeadForm`: **idle**; **sending** (o botão mostra spinner de 16 px + "Sending…", os campos ficam desabilitados e a largura do botão não muda); **error** (faixa acima do botão: o que houve + "Try again", e os dados ficam preenchidos); **success** (no site é o redirect para `/thank-you`; no mock, desenhar o quadro de confirmação para referência).
- Motion: nenhum. O formulário nunca tem reveal.

### 5.4 Testimonials (pergunta: "gente como eu já fez isso?")
- Mantém a estrutura aprovada (`Testimonials.tsx`: trilho, 3 cartões visíveis a 1440, contador "01 / 02", anterior/próximo, pontos de progresso). Só ganha tokens novos e campos novos.
- 1440: H2 em cols 1-7; trilho com 3 cartões de 4 colunas, ~380 de altura, fundo `ink.900`, hairline, raio 12. Cartão: aspas em `brand.300` → citação 17/1.6 → separador → avatar com iniciais (40) + nome + cargo · empresa + **etiqueta de setor em mono** ("MANUFACTURING · VIC") + **linha de resultado em mono, opcional**.
- 390: 1 cartão a 86% de largura com o próximo aparecendo na borda, arraste por scroll-snap e controles de 44×44 embaixo.
- **Texto**: todos com o placeholder `[Testimonial pending — client to supply]`, e o estado `placeholder` do componente visivelmente marcado (tracejado `line.strong` + selo "Pending"). Os depoimentos de restaurante **não podem ser reaproveitados** (ver §9).
- Estados: placeholder / preenchido / hover (borda `line.strong`) / foco.

### 5.5 Live office: o tour pela maquete (pergunta: "o que exatamente cada agente faz, e quem manda?")
**1440, palco `sticky` com rolagem nativa**: a seção tem cerca de 7 × 70vh. O palco ocupa 100vh, preso no topo.
```
┌ eyebrow LIVE OFFICE · ● Example activity                      AEST 14:32 (mono) ┐
│ H2 (cols 1-7)                                     corpo (cols 9-12)              │
├──────────────────────────────────────────────┬───────────────────────────────────┤
│ cols 1-8: MAQUETE em pan/zoom                │ cols 9-12: PAINEL DA MESA ATUAL   │
│  a mesa atual em foco, as outras a 40%       │  ▪ Sales follow-up agent  [Working]│
│  a placa da mesa cresce e liga ao painel     │  função · 1 linha                  │
│  por um traço                                │  ── Today (mono) ──                │
│                                              │  06:12  Followed up 12 leads…      │
│  ┌planta miniatura┐ ← A2: 7 retângulos,      │  11:48  Drafted a follow-up… [Needs│
│  │ ▫ ▫ ■ ▫ ▫ ▫ ▣ │    atual em menta         │         approval] Approve·Edit·Dec.│
│  └────────────────┘                          │  You approve: (1 linha)            │
└──────────────────────────────────────────────┴───────────────────────────────────┘
```
- Paradas, na ordem do fluxo (a mesma ordem dos traços do hero): Marketing → Social media → Customer service → Sales follow-up → Finance (Bookkeeper) → Reporting → **YOU**. Os nomes vêm do `copy.md` §2.7; os rótulos da maquete seguem a voz da propaganda ("YOUR FOLLOW-UP", "YOUR BOOKKEEPER", "YOUR AD MANAGER", "YOU").
- **A parada YOU** (a sala do dono) é o clímax: o painel vira a **fila de aprovações** (3 `ApprovalCard` empilhados, com o contador "3 actions waiting for you"). O de cima está aberto; os outros dois aparecem como bordas atrás.
- Transição entre paradas: pan/zoom do render (600 ms, `cubic-bezier(.2,.7,.2,1)`), as linhas do painel entram de baixo (40 ms de defasagem), e o retângulo da planta acende. **O render nunca recarrega**: é uma imagem só.
- Fecha com **"All agents at a glance"** (A5): 6 linhas tipográficas com hairline (nome 22 · função 1 linha · "You approve:" 1 linha · status). É a âncora `#agents`. A 1440 tem ~6 × 72 = 430 px de altura.
- **390**: sem `sticky` (o `svh` muda no Instagram, ver a memória `instagram-svh-muda-na-rolagem`). Em vez dele, um **carrossel de mesas com scroll-snap** a 88% de largura: em cima, o recorte do render daquela mesa (350×260, um AVIF por mesa); embaixo, o painel (até 3 linhas de atividade + a aprovação, se houver). A planta miniatura vira a paginação (7 retângulos de 10×8, com área de toque de 44 px) + o botão "Next desk →". Altura ~780. Depois vem a lista "at a glance" em 1 coluna.
- **Estados**: a linha de atividade pode estar `new` (fundo `ink.800` por 1,2 s), `default`, `needs-approval`, `approved` ("Approved. Reminders sent to 3 clients.", com ícone menta), `declined` ("Declined. The agent won't send it.") e `failed` ("Needs attention", em vermelho). O `ApprovalCard` pode estar `pending`, `approving`, `approved`, `declined` ou `edited`. A seção tem o estado **reduced-motion**: sem pan; a maquete fica inteira, as placas abertas e o painel mostra a parada escolhida pela planta (que funciona como abas).
- **Selo "Example activity" sempre visível** (o `copy.md` já pede). Nenhum nome de empresa ou pessoa real.
- Motion no site: no tour, a cada ~3 s uma linha nova entra no topo do painel. Approve, Edit e Decline são clicáveis e mudam o estado (é demo local, não chama nada). Se a pessoa clicar, o feed para de avançar até ela sair da parada.

### 5.6 About (pergunta: "quem está por trás e por que confiar?")
- A seção de respiro (A3). 1440: H2 de 44/1.15 em cols 1-8, com 160 de respiro em cima; embaixo, o corpo em 2 colunas (cols 1-5 e 7-12) e 3 fatos em mono numa linha com fios ("Automation · Performance · Industry & B2B", do `copy.md`). Sem foto de banco. Se o dono mandar foto real do time, ela entra em cols 9-12, P&B, raio 12.
- 390: H2 → corpo → fatos em lista. Altura ~620.

### 5.7 FAQ (pergunta: "e as minhas objeções?")
- 1440: cols 1-4 com título `sticky` + o link "Talk to a person" (secundário); cols 6-12 com o acordeão. Cada item tem 64 de altura fechado; o ícone +/− tem 24 px e área de 44.
- 390: título → acordeão em largura total.
- Estados: fechado / hover (texto `text.1`) / aberto (a resposta em `text.2`; abre com `<details>` nativo, sem animação de altura no reduced-motion) / foco.
- Temas que o copy-director cobre (função, não texto): onde ficam os dados (Privacy Act/APPs), integração com o que o cliente já usa (Xero/MYOB, ERP, CRM), o que o agente nunca faz sem aprovação, prazo de implantação, custo em AUD e contrato, o que acontece quando um agente erra, se precisa de time de TI.

### 5.8 Office that never closes + formulário final (pergunta: "o que eu ganho amanhã de manhã?")
- **F5**: a maquete volta, **à noite** (o mesmo render, num passe de luz noturna: só os monitores e as mesas ativas acesas).
- 1440: cols 1-7 com a maquete noturna (~520) e, por cima, a régua de 24 h em mono (00 · 06 · 12 · 18 · 24) com o marcador na hora de Sydney e o bloco "While you slept" (3 a 4 contagens em mono; **uma** delas, o número-chave, em menta). Cols 8-12: eyebrow, H2 e o `LeadForm` na variante `compact` (o mesmo componente e os mesmos campos; é a mesma ação, não uma segunda).
- 390: H2 → recorte noturno de 350×240 + 3 contagens → formulário.
- Estados: os mesmos do formulário (§5.3).

### 5.9 Footer
- 1440, ~240: logo + uma linha de descrição; os links (Privacy, contato por e-mail, **ABN**: placeholder para o dono); os ícones sociais em SVG inline de 44×44. 390: empilhado, ~360.

### 5.10 Barra de CTA fixa (só a 390)
- Aparece quando o CTA do hero sai da tela; **some quando qualquer `LeadForm` está visível** e sobre o rodapé. Altura 64 + safe-area, fundo `ink.950` a 96% com hairline em cima, botão menta em largura total com 48 de altura. É o único menta da viewport enquanto está visível. Marcar no Figma como "em avaliação": é barata de remover.

## 6. Pedidos

### 6.1 Ao figma-architect (ordem de trabalho)
1. Página `Foundations`: as variáveis em camadas (primitivo → semântico), com as coleções `Color` (os tons do §4.1), `Accent` (modos `Lime` / `Mint`), `Space` (4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64 · 80 · 96 · 128 · 160), `Radius` (`xs 4`: placa e chip de status · `sm 8`: botão, campo e chip de faturamento, o mesmo do site atual · `md 12`: cartão e cartão do formulário · `pill 999`: só o selo "Example activity") e `Type` (os papéis do §6.2, preenchidos pelo type-director).
2. Página `Components`, **antes de qualquer tela**:

| Componente | Propriedades / variantes |
|---|---|
| `Button` | `variant`: primary (menta) / secondary (contorno) / ghost-link / approve / decline · `size`: L 56 / M 44 · `state`: default / hover / pressed / focus / disabled / loading · `iconRight`: bool |
| `NavBar` | `breakpoint`: 1440 / 390 · `state`: top / scrolled |
| `StatCounter` | `value`, `prefix`, `suffix`, `label` · `emphasis`: key (menta) / default · `size`: L / S · `state`: settling / settled |
| `AgentPlate` | `agent`: marketing / social / service / followup / bookkeeper / reporting / you · `state`: working / needs-approval / scheduled / done / attention / night · `size`: compact (sobre a mesa) / expanded (no tour) · slots: LED, rótulo de mesa ("YOUR FOLLOW-UP", mono 11, tracking .08em), leitura viva (mono 13), contador |
| `Trace` | `shape`: reta / cotovelo-L / cotovelo-T · `orientation` · `packet`: bool |
| `DataPacket` | `type`: lead / quote / invoice / post / report / approval · `label` (mono) · `state`: moving / arrived |
| `FloorplanIndex` (A2) | `stops`: 7 · `current`: 1–7 · `size`: desktop / mobile-pagination |
| `ActivityRow` | `agent`, `time` (mono), `text` · `state`: new / default / needs-approval / approved / declined / failed · `actions`: bool |
| `ApprovalCard` | `agent`, `action`, `amountAUD`, `recipients` · `state`: pending / approving / approved / declined / edited · `stack`: top / behind |
| `StatusChip` | `status`: working / needs-approval / done / scheduled / attention |
| `DeskPanel` | o painel do tour: `agent` · slots: header, 3× `ActivityRow`, `ApprovalCard` opcional, "You approve" |
| `Field` | `type`: text / email / tel-prefix / chips · `state`: empty / focus / filled / error / disabled · rótulo visível em cima |
| `RevenueChips` | `options`: 4 (do copy) · `selected`: 0–4 · `state`: default / focus / error · `layout`: row / 2×2 |
| `LeadForm` | `variant`: band (1440 2 col) / compact (1 col) · `state`: idle / sending / error / success |
| `NoticeStep` | `number`, `title`, `text` · `density`: full / one-line |
| `TestimonialCard` | `state`: placeholder / filled / hover / focus · slots: quote, name, role·company, sectorTag (mono), resultLine (mono, opcional), initials |
| `AgentGlanceRow` | `agent`, `job`, `youApprove`, `status` |
| `FAQItem` | `state`: closed / hover / open / focus |
| `SectionHeader` | `eyebrow` (mono) · `title` · `lead` opcional · `align`: left / split |
| `NightLog` | a régua de 24 h + o marcador + 3–4 contagens · `keyCount` em menta |
| `StickyCTA` | `state`: visible / hidden |
| `Footer` | `breakpoint` |

3. Telas: `Desktop 1440` e `Mobile 390` como frames longos, mais o frame `States` (formulário, aprovação, campos, FAQ e o reduced-motion do tour). A 768, só o hero e o formulário, para conferir a quebra.
4. **O 3D no mock**: enquanto o render adulto (§8) não chega, usar quadros da propaganda **só como placeholder marcado** ("render provisório: o acabamento final segue o §8.3"), dessaturados a 60% sobre `ink.950`. Os quadros-chave a desenhar: (a) o plano geral no hero; (b) 3 paradas do tour (Follow-up, Bookkeeper, YOU); (c) o plano geral noturno. **As placas são sempre camadas de componente por cima, nunca texto do vídeo.** Os rótulos em pílula queimados na imagem saem.
5. Notas de motion: cada frame com motion recebe uma nota (componente de anotação) dizendo o que se move, a duração e o estado do reduced-motion, conforme o §5.

### 6.2 Ao type-director (papéis; as famílias são escolha dele)
- `display.hook`: o cartaz comercial em caixa alta, com duas intensidades na mesma frase (o corpo da frase + o trecho do claim mais pesado e dentro do destaque roxo). 52/1.08 a 1440, 30/1.1 a 390. **O ponto de partida é manter a Montserrat** (OFL, já carregada, é a identidade que o público do anúncio reconhece). Avaliar se a 30 px em caixa alta ela fica larga demais e, se sim, propor alternativa com licença.
- `display.section`: H2 em caixa normal, 44/1.1 a 1440 e 30/1.15 a 390, pesos 400/500 (sem 900 fora do gancho).
- `body.lead` 20/1.5 · `body` 17/1.55 · `small` 14/1.45.
- `mono.data`: a voz do dado (hora, rótulo de mesa, etiqueta de pacote, valores em AUD, setor no depoimento, a régua de 24 h). De 11 a 14 px, caixa alta com tracking +.06 a +.08em nos rótulos e algarismos tabulares. Família OFL, a critério dele.
- `numeral.stat`: os números do hero (40/1 a 1440, 28 a 390), tabulares, compatíveis com o NumberFlow.
- Verificar o par contraste × tamanho do `text.3` (5,4:1) em 13–14 px.

### 6.3 Ao copy-director (função e tamanho; o texto já está em `copy.md`)
- **Ajustes pedidos por esta direção**: (1) a subcopy do hero tem 240 caracteres. A 390 isso dá cerca de 7 linhas e empurra o CTA para baixo da dobra do Instagram, então peço uma versão de **≤ 140 caracteres** para o celular (ou uma só para os dois). (2) Os 2 passos do Notice em **versão de uma linha** (≤ 45 caracteres cada) para a 390. (3) Os rótulos de mesa para a maquete, no padrão da propaganda ("YOUR AD MANAGER"…), ≤ 18 caracteres, um por agente + "YOU". (4) A leitura viva de cada placa (≤ 28 caracteres, ex.: "12 leads followed up"). (5) A etiqueta de cada tipo de pacote (≤ 14 caracteres). (6) "You approve:" por agente (≤ 60 caracteres). (7) O "While you slept" com 3–4 contagens (≤ 32 caracteres cada), marcadas como exemplo. (8) O rótulo do telefone: avaliar "Mobile (WhatsApp)" contra "Mobile", porque o WhatsApp é menos usado em B2B na Austrália do que no Brasil (decisão do dono).
- Hierarquia: um só "Build my AI office" por viewport.

### 6.4 Ao frontend-studio (como rodar, depois do mock aprovado)
- **O 3D**: as imagens AVIF do render ortográfico (§8.4), com WebP de fallback, por `<picture>`. O pan/zoom é `transform` numa camada de imagem (GPU), sem canvas e sem WebGL. As placas e os traços ficam em HTML/SVG numa camada alinhada às coordenadas das mesas, que vêm num JSON exportado do Blender (`desks.json`: x, y em % da imagem).
- **Os pacotes**: SVG `offset-path` ou `animateMotion`, no máximo 3 simultâneos, um só `requestAnimationFrame`, pausados por IntersectionObserver e `visibilitychange`.
- **Orçamento de peso (gz, por rota)**: JS novo ≤ 25 KB (tour + pacotes + demo de aprovação); imagens acima da dobra a 390 ≤ 140 KB; a página inteira a 390 ≤ 1,1 MB na primeira visita com rolagem total; sem nenhum vídeo no hero. Os laços de vídeo por mesa (opcionais, "em avaliação", só a ≥ 1024 px): ≤ 150 KB cada, H.264 **yuv420p** (a memória `mp4-444-webkit-nao-toca`), muted, playsinline, carregados só quando a parada está ativa.
- **LCP** = o H1. Sem reveal, blur ou opacidade 0 no H1, nos números, no formulário e no CTA. O poster do render leva `fetchpriority="high"` só se medirmos que não rouba o LCP do texto.
- **Reduced motion**: sem pan, sem pacotes, sem embaralhamento (os números aparecem no valor final, como o `canAnimateNumbers` já faz); o tour vira abas pela planta.
- **Teste de sobreposição** (antes de entregar): pôr a tela do tour ao lado de `prolibu-sales/d-10.webp`. Se der para sobrepor o trilho numerado à esquerda e o fragmento ao lado do texto, refazer. Vale o mesmo para o hero ao lado de `qclay-p12/d-03.webp`: nada de curva, nada de chevron.
- Verificar em **webkit + chromium** a 390 e a 1440, inclusive dentro do navegador do Instagram (o `svh` muda; usar a altura congelada no toque se houver `sticky`).

## 7. Riscos
| Risco | Mitigação |
|---|---|
| **Produção do render adulto** (é o $$$): sem ele, o conceito cai para placas sobre a grade (o plano B do §8.5) | Pedir a fonte ao dono já (§10). O plano B está desenhado e é bom por si só. |
| O render roubar o LCP ou pesar no 4G | Poster AVIF ≤ 140 KB a 390; o H1 é o LCP; medir na aba Network antes de declarar. |
| Safari/WebKit: `offset-path`, `sticky` dentro de `overflow`, vídeo | Fallback de pacote com `animateMotion`; `sticky` só a ≥ 1024; vídeo só em laço yuv420p opcional. |
| O 3D voltar a parecer "criança" | O acabamento do §8.3 é obrigatório e o júri confere. As placas são HTML adulto por cima; o charme fica no lugar, a seriedade no dado. |
| Tour longo cansar a pessoa e afastá-la do formulário | O formulário vem antes do tour; a barra fixa a 390; 70vh por parada (não 100vh); a planta permite pular. |
| Acessibilidade | Rótulos visíveis; foco menta (14,8:1); alvos de 44×44; o tour navegável por teclado pela planta (botões com `aria-current`); o feed demo com `aria-live="off"` (é decorativo); o selo "Example activity" lido antes. |
| Acento diluído (menta em LED + CTA + número + Approve) | A regra do §4.3: um CTA menta por viewport; LEDs de 6 px; o júri conta os menta por tela. |

## 8. O escritório 3D: a decisão

### 8.1 O que eu vi
A propaganda (37 s, 1080×1920, H.264) mostra a "BRANDUP HQ": maquete isométrica low-poly com bonequinhos em mesas, pílulas de rótulo ("YOUR BOOKKEEPER", "YOUR FOLLOW-UP", "YOUR AD MANAGER", "YOU"), tapete vermelho e roxo, piso xadrez, grama, árvores, cadeiras menta e legendas com a palavra em destaque roxo. A câmera voa de mesa em mesa.

### 8.2 A decisão: render ortográfico pré-renderizado, com as placas em HTML por cima (D1)
- **Não WebGL agora**: não há interação que a justifique (D3); o celular do Meta Ads, as GPUs fracas e o WebKit cobram caro; e ainda não sabemos se existe um `.glb` limpo.
- **Não vídeo controlado pela rolagem**: a busca por `currentTime` no iOS e no navegador do Instagram engasga, e o MP4 com keyframe denso pesa.
- **Sim: uma imagem mestre ortográfica** (a câmera isométrica do Blender em modo Orthographic). Como não há perspectiva, "voar de mesa em mesa" é um pan/zoom exato da imagem mestre. São 1 a 2 arquivos para o tour inteiro, sem engasgo, iguais em qualquer aparelho.
- O que se perde: a animação dos bonequinhos. Ela volta, se o dono quiser, como **laços curtos por mesa** (2 s, ≤ 150 KB, só no desktop, "em avaliação").

### 8.3 O acabamento adulto (o pedido ao 3D, para tirar o "criança")
Régua: a argila fosca da QH (`qclay-home/videos-frames/about-1-0.5.jpg`). O princípio é "um material, uma luz, a cor com função".
1. **A metáfora vira maquete de arquiteto**: o escritório sobre um plinto escuro, flutuando no `ink.950`. **Saem** a grama, as árvores e o céu verde. Um comprador industrial conhece maquete de planta e de obra; isso é adulto sem perder o charme.
2. **Material**: argila ou resina fosca, com rugosidade alta e sem brilho plástico. As paredes e os móveis num cinza-grafite quente (`#1B1820`…`#2A2630`). O piso xadrez e a madeira laranja saem.
3. **A paleta da trinca dentro do render**: o tapete e o piso das áreas comuns em `brand.deep #2A1150`; **as cadeiras passam a cinza**; o menta só na mesa ativa (luz do monitor e LED) e na sala YOU. As outras cores do vídeo (vermelho, amarelo, verde) saem.
4. **Bonequinhos**: menos "chibi". A cabeça cai de ~1/3 para ~1/5 da altura, os figurantes ficam monocromáticos (off-white fosco, sem rosto pintado) e o pescoço some no pescoço da roupa. É o charme de figura de maquete, não de jogo.
5. **Luz**: interior ao entardecer ou à noite, com o monitor como luz-chave de cada mesa, oclusão ambiente suave, um preenchimento frio fraco e sombras de contato. Um grão fino na pós-produção (2–3%). Sem neon; o "BRANDUP HQ" vira letreiro discreto em baixo relevo.
6. **Texto fora do render**: nenhum rótulo, pílula ou legenda queimada. Tudo o que é texto vem em HTML (nítido, traduzível, acessível).
7. **Dois passes do mesmo enquadramento**: dia (o hero e o tour) e noite (a última seção). Mesma câmera, então o pan/zoom e as coordenadas das mesas valem para os dois.

### 8.4 Orçamento dos arquivos
| Arquivo | Dimensão | Peso-alvo (AVIF) | Onde |
|---|---|---|---|
| `office-day-master` | 3200×1800 | ≤ 380 KB (WebP ≤ 600) | hero e tour a ≥ 1024 |
| `office-day-hero-m` | 1170×1400 (recorte retrato) | ≤ 140 KB | hero a 390 |
| `desk-{1..7}-m` | 1050×780 | ≤ 70 KB cada, carregados preguiçosamente | o carrossel do tour a 390 |
| `office-night-master` / `-m` | iguais | ≤ 300 / ≤ 110 KB | a última seção |
| `desks.json` | — | < 2 KB | coordenadas das 7 mesas (do Blender) |
| laços por mesa (opcional) | 480×480 | ≤ 150 KB cada, H.264 yuv420p | tour a ≥ 1024, "em avaliação" |

### 8.5 Plano B (se a fonte 3D não vier a tempo)
As mesmas placas, traços e pacotes sobre uma **planta baixa vetorial** (as mesas em retângulos de hairline sobre a grade de pontos A4). Todo o resto do brief vale igual. Os componentes são os mesmos; muda só a camada de fundo. É por isso que as placas nunca podem estar queimadas na imagem.

## 9. Riscos de conteúdo (Austrália) que dependem do dono
- **Australian Consumer Law (ACCC)**: "over $250K per month within 90 days" e "over 10 million in sales" são alegações de resultado e precisam de comprovação. Para o novo público (indústria/B2B), os números vêm da operação de restaurantes? Se vêm, o gancho pode ser lido como enganoso. **Decisão do dono**, com a evidência guardada.
- **Depoimentos**: precisam ser reais e do novo serviço. Os quatro de restaurante não podem migrar para o site B2B (a ACCC trata depoimento falso ou fora de contexto como conduta enganosa).
- **Spam Act 2003**: os agentes de follow-up e de atendimento mandam mensagens; o FAQ precisa dizer que só contatam quem consentiu.
- **Privacy Act / APPs**: a linha de privacidade do formulário já existe; conferir que a política cita o uso dos dados por agentes de IA.
- **ABN** no rodapé (é praxe e gera confiança em B2B na Austrália).
- **"Call within 5 minutes"**: definir o horário (AEST/AEDT? Brisbane não tem horário de verão) e quem atende.

## 10. O que pedir ao dono (lista fechada)
1. **A fonte do 3D**: o arquivo original da cena (`.blend` de preferência; ou o projeto Spline, ou `.glb`/`.fbx` com texturas). Se o vídeo foi gerado por ferramenta de IA e não existe cena, avisar: aí o render adulto é modelado do zero ($$$, prazo) ou vamos para o plano B (§8.5).
2. O OK no acabamento do §8.3 (maquete, cadeiras cinza, menta só no ativo, menos chibi) antes de alguém renderizar.
3. **Lime ou Mint** (`#58F6B1` × `#88F9C0`), vendo no Figma pelos modos da coleção `Accent`.
4. As faixas de faturamento em AUD (o copy-director propõe, o dono confirma).
5. A comprovação das alegações ($250K/mês, 10 milhões) para o novo público, ou números novos.
6. Os depoimentos reais (até lá, ficam os placeholders marcados).
7. O ABN, o e-mail de contato, o horário do "5 minutes" e a foto real do time, se quiser foto no About.

## 11. Mercado (registro curto)
- **Internacional/AU**: Relevance AI (Sydney, "AI workforce", plataforma para montar agentes), Artisan (EUA, "AI employees" com persona humanizada), Lindy (assistente executivo). Fonte: busca de 08/11. **Não abri as páginas deles para ver o visual**; isto é posicionamento, não composição.
- **Onde o mercado falha (a nossa brecha)**: (1) vende **ferramenta para montar** ("no-code builder"), e não um escritório pronto e operado; (2) as personas humanizadas soam como brinquedo para quem compra em indústria; (3) quase ninguém mostra o **controle**: a aprovação do dono, o que o agente não faz sozinho. (4) fala com startup e tecnologia, não com fábrica, distribuidora ou empresa de serviço técnico. A maquete com placas e a sala YOU respondem às quatro.
