# BrandUp: brief de direção v3, "A maquete e o relatório"

Autor: ui-ux-director · 08/11/2026 (noite) · substitui a direção visual do `brief-direcao.md` (v1+v2), que fica como histórico.
Para: `figma-architect` (compõe o mock v3), `type-director`, `copy-director`, `frontend-studio` (render no Blender, em paralelo; depois o código), `design-jury`.
Motivo: o dono reprovou o v2 ("tá com cara de AI slop ainda"). O júri deu 6,3 no Awwwards e 6,0 na taste (`juri-v2.md`). O dono só aprova com nota máxima. Remendar o v2 não chega lá: o v2 resolveu o conceito e errou o vocabulário visual, que é o vocabulário padrão de landing de IA.

Instrumento principal: a skill `design-taste-frontend` (regras da casa, `references/tells.md`, a biblioteca de 247 sites e o `draw.mjs`). A folha sorteada ficou em `BrandUP/.taste-skill/direction.json` (seed 2036484876, direção `editorial-report`, com um redraw de tipo justificado no §3).

**O que não mudou (decisão do dono):** a marca roxa; a regra "2 quietas + 1 alta" (recalibrei a dose, não as cores); o gancho do hero em caixa alta; a estrutura de conversão (hero → formulário cedo → prova → tour dos agentes e sala YOU → FAQ → formulário final); o escritório 3D como peça central; a intro. Também fica tudo o que é engenharia e conteúdo e já foi aprovado: o formulário `#diagnostic` e o Supabase, o rótulo visível, os 5 campos, o `+61`, a privacidade, o depoimento real ou nada, os riscos da ACCC (§9 do brief antigo).

---

## 1. Autópsia do slop (v2)

**Como medi.** Olhei as capturas `v2c/desktop-1440-full.png` (fatiadas em `juri-v2-fotos/d-0…d-6`: a fatia *i* começa em y = 1700·i) e `v2c/mobile-390-full.png` (`m-0`), além de `v2b/hero-1440.png`, contra `tells.md` e as regras da casa. Coordenadas são **(x, y) na captura inteira de 1440**.
**O que não rodei:** o `inspect.mjs` e o `lint.mjs` da skill medem HTML num navegador, e o v2 só existe em PNG do Figma. Eles entram como portão no código (§10).

### 1.1 As suas 11 suspeitas
| # | Suspeita | Veredito | Onde (x, y) | Por que é slop | O que entra |
|---|---|---|---|---|---|
| 1 | Microrrótulos mono em caixa alta por toda parte | **CONFIRMADA, e é o pior sinal** | Rótulos dos números (509–625, 472–500); 7 placas, ex. "YOUR ANALYST" (1060–1283, 692–735); "TODAY" (876, 4006); "YOU APPROVE" (876, 4460); "WHY" (542, 5910); "11:48" (1300, 5734); "Email" (811, 5867); "1 / 3" (1212, 2537); "WHILE YOU SLEPT" (92, 11421); "Sydney 02:14" (92, 11389); régua "00…24" (92–578, 11356). Mais de 40 ocorrências | É moda de galeria virada fantasia: mono "técnico" em 11–12 px com tracking, que um gerador copia primeiro. A pesquisa mostra caixa alta pequena e espaçada em 57% dos sites fracos contra 16% dos fortes. Além disso, falha no APCA (Lc ≈ −38, júri §2.1) | **Zero mono na página.** O dado usa os algarismos tabulares da fonte de texto. O rótulo vira frase em caixa normal, no tamanho de leitura, ou some para dentro da frase |
| 2 | Placas, chips e pílulas com borda fina em tudo | **CONFIRMADA** | Botão "Diagnosis" com contorno (1273–1376, 12–59); chips de faturamento em pílula (772–1328, 1543–1587); "+61" em chip (≈1075–1115, 1450–1475); "PENDING" (121–203, 2176–2201); "Example activity" (1120–1274, 2846–2883); "NEEDS APPROVAL" (1215–1343, 3880–3903); pílulas "LEAD" e "INVOICE" (808–858, 905–925; 1038–1112, 3478–3500); setas redondas (1268–1368, 2515–2559) | A pílula é o átomo do template (pesquisa: pílula em 34% dos fracos contra 14% dos fortes). Um contorno de 1 px em cada coisa diz "componente de biblioteca", não "decisão" | **A pílula deixa de existir na página.** O botão é retângulo cheio de canto reto; a escolha de faturamento vira 4 blocos cheios (o selecionado inverte); o status existe só dentro do fragmento de produto (`data-ui`) e por palavra, sem selo |
| 3 | Escuro + roxo + menta "de template de SaaS de IA" | **PARCIAL: o problema é a dose, não o matiz** | Roxo como marca-texto atrás de palavras (64–517, 178–231; 434–667, 2793–2840, repetido 5×); menta em 5 papéis: CTA (64–263, 435–495), número "$250K" (963–1097, 430–465), LEDs de 7 placas, link "Approve" verde (893–940, 4257), linha "14 leads followed up" (92–232, 11456); fundo único `ink.950` com cartões um tom acima em todas as seções | "Fundo quase preto + um neon + marca-texto numa palavra" é o tell da 2ª onda. A trinca do dono não é o defeito: o defeito é o roxo pequeno (sublinhado, chip) e o menta espalhado, que leem como neon | O preto fica (é o humor que o dono escolheu). **O roxo só aparece em campo grande** (a página do formulário, a placa do hero, a faixa de título do FAQ), nunca atrás de uma palavra. **O menta só aparece na ação** (o CTA, um por viewport, e o Approve do fragmento vivo). Entra um neutro claro (`paper`) como página de respiro (§6) |
| 4 | O trio Barlow Condensed + Montserrat + Geist Mono | **CONFIRMADA** | Gancho em Barlow 800 (64–1124, 132–280); H2 em Montserrat 500/700 (ex. 72–495, 2283–2380); Geist Mono em todo dado (#1) | São três defaults: a condensada de anúncio esportivo, a sans geométrica mais usada nas landings de 2016–2022 e a mono da Vercel, que é a assinatura do template de IA. Três famílias, nenhuma com papel de autor | **Duas famílias no máximo e nenhuma mono** (pedido ao type-director, §7.1) |
| 5 | Cartões com borda de 1 px e cantos iguais | **CONFIRMADA** | Cartão do formulário (732–1368, 1256–1750); depoimento tracejado (72–1368, 2127–2467); `DeskPanel` (843–1376, 3821–4528); `ApprovalCard` (509–1376, 5693–6205); `NightLog` (72–598, 11328–11598); formulário final (842–1368, 10831–11598). Raio de ~12–16 px em todos | "Um raio médio igual em tudo" é tell estrutural (sites fortes: 52% de canto reto e 23% de pílula; o raio "suave" de 9–16 px é o padrão dos fracos). A caixa com borda envolve o que não precisava de caixa | **Raio 0 na página** e 4 px só dentro do `data-ui`. Superfícies se separam por degrau de tom, sem linha. O formulário é desenhado **direto no campo de cor**, sem cartão em volta |
| 6 | Números grandes com rótulo mono embaixo (a "stat row") | **CONFIRMADA** | Hero (509–1097, 425–500), com fios verticais em x ≈ 706 e 931; a 390, colados (20–360, 438–495) | É o bloco mais reconhecível de landing de IA: três números, três rótulos em mono, fios entre eles. Não prova nada que o gancho já não diga | **A stat row morre.** "$250K" e "90 days" já estão no H1; "24/7" vai para a frase de apoio; o hero ganha **um** dado vivo na placa roxa (§5.2) |
| 7 | Render low-poly dessaturado e barato | **CONFIRMADA, mas a causa é outra** | Piso xadrez (460–600, 1140–1160; 600–840, 11050–11500); neon "BRANDUP HQ" (660–1185, 520–585); bonecos chibi; plantas clonadas; tapete vinho; câmera **isométrica** | O defeito não é a dessaturação: é o **gênero**. Isométrico ortográfico com bonequinhos = "escritório de jogo". O cético do FWA diz o mesmo ("escritório isométrico de agentes com etiquetas segue conhecido") | **Fotografia de maquete de arquiteto**: câmera em perspectiva com lente longa, cartão branco, madeira, acrílico, figuras de resina sem pintura, uma luz de estúdio, o resto cai no preto. O roxo é a única cor dentro da maquete (§8) |
| 8 | Composição previsível hero → faixa → cartões | **CONFIRMADA em outra forma** | Não são cartões em grade: é o **split "texto à esquerda, caixa à direita" repetido 5×**: Notice (72–700 \| 732–1368), tour (0–819 \| 843–1376), FAQ (72–455 \| 622–1368), final (72–700 \| 842–1368), About em 2 colunas | Vizinhos com a mesma família de layout (passe 9 da crítica). O olho aprende o molde na 2ª seção e para de olhar | Cada seção vem de uma planta diferente da folha sorteada (§5): eixo, página de cor, abas de mesa com faixas, uma linha em três estados, faixas de pergunta, faixa de três fotos. **Nenhum split "texto e caixa" se repete** |
| 9 | Ícones e checks genéricos | **CONFIRMADA** | Checks "✓" nas linhas do Why (542, 5935–5985); "+"/"−" no FAQ (1347, 10178…10540); setas "→" nos controles; o ponto LED de status em 7 placas e no "Example activity" | O check e o ponto de status decorativo são enfeite de template ("decorative status dot"); no FAQ, o "+" pede um clique para ler o que devia estar à vista | Sem ícone decorativo. O Why são três frases curtas; o FAQ mostra todas as respostas, sem toggle; o status é palavra ("Waiting for you"). O único ícone que fica é o dos canais sociais, no rodapé |
| 10 | O selo "Example activity" | **CONFIRMADA** (e veio com o "AEST 14:32") | (1120–1274, 2846–2883) + "AEST 14:32" (1291–1376, 2864), repetidos em 5 quadros | É ressalva jurídica vestida de chip, e o relógio local é "micro-meta de agência" (tell da 4ª família) | A ressalva vai para **uma linha no rodapé**: "Agent activity shown on this page is illustrative." O relógio sai |
| 11 | Simetria e alinhamentos sem tensão | **CONFIRMADA (é a falta de escala)** | H1 de 52 px contra corpo de 20 px: **razão 2,6** (mediana da pesquisa: 4,3; os melhores sites passam de 8); todos os H2 em ~44 px, do mesmo peso; a faixa à direita do H1 vazia (1124–1376, 120–420) sem nada que a feche | Página "certinha", sem coisa enorme nem coisa pequena. Tudo no meio-termo, que é a média que um modelo produz | **Escala extrema no gancho** (≥ 104 px a 1440, razão ≥ 5,5), cinco tamanhos no total e um eixo vertical fixo que cria assimetria dentro do grid (§4) |

### 1.2 Sinais que a lista não tinha (achados meus)
| # | Sinal | Onde (x, y) | Por que é slop | O que entra |
|---|---|---|---|---|
| 12 | Uma palavra estilizada no título (o bloco roxo em "never late.") | (434–667, 2793–2840) ×5; e no gancho (64–517, 178–231) | "Styled accent word" (tell da 2ª onda, avisado pela skill). Veio do anúncio, mas na página vira marca-texto de template | O roxo do anúncio cresce de **bloco atrás da palavra para campo inteiro** (§2, a transformação central) |
| 13 | Título em dois pesos ("In their own words. **Their businesses.**", "Do not leave now! / Your team is waiting.") | (72–495, 2283–2380); (72–533, 1260–1350) | É o título padrão do Dribbble de 2024 (B5 no repertório). Na página inteira vira tique | Uma fonte, um peso por título. As palavras fazem a ênfase |
| 14 | Fios finos estruturando listas | Glance (64–1376, 8778–9168); FAQ (622–1368, 10166–10574); topo das 3 colunas do About (72–1368, 9756); rodapé (y 11726) | "Thin rules" (moda de galeria, proibida na casa). É a régua de jornal fantasiada | Espaço e degrau de tom. As faixas do FAQ alternam dois tons, coladas |
| 15 | Três colunas iguais no About ("One desk per area / You approve / Built for B2B") | (72–1368, 9756–9850) | A "fileira de itens idênticos" | Fatos laterais e um parágrafo largo (§5.7) |
| 16 | Texto corrido em cinza | Descrições do glance a 15 px `text.2` (300–905, 8741–9131); About (72–1256, 9605–9703) | "A page set in soft grey reads unfinished" (e falha no APCA a 15 px) | Corpo sempre em `text.1`; o cinza fica só para nota secundária de uma linha |
| 17 | Linhas ortogonais roxas com pacotes ligando as placas | (284–834, 640–1013) e (670–1322, 3478–3500) | Lê como grafo de rede decorativo (o júri já tinha avisado) | Saem. O fluxo entre as mesas é contado pela fila da sala YOU, que é o que importa ao dono |
| 18 | Miniplanta com traços cinza | (96–381, 4351–4488) | "Fake dashboard of grey bars" | Sai. As plaquetas de nome das mesas fazem a navegação (§5.5) |
| 19 | Um fundo só na página inteira | Todas as seções em `ink.950`, exceto a faixa roxa | Sem campo de cor não há capítulo, e a página vira uma tira contínua de cartões | Três campos com papel: preto (o escritório), roxo (os momentos de decisão), papel claro (o respiro, uma vez a cada 2–3 seções) |

**Leitura de conjunto:** o v2 não tem um erro grande. Tem 19 pequenos, todos do mesmo vocabulário: mono, pílula, contorno, raio médio, neon, marca-texto, stat row, isométrico. Trocar 3 ou 4 deixa os outros denunciando. A v3 troca o vocabulário inteiro e mantém o argumento.

---

## 2. A direção escolhida

### 2.1 Conceito (uma frase)
**"O dia do seu escritório, impresso: a BrandUp HQ fotografada como maquete de arquiteto, uma página por mesa, e a última palavra é sua."**

A frase de ideia da skill:
> Nesta página, **a BrandUp HQ, a maquete do anúncio onde o dono tem a última palavra**, vira **um relatório impresso do dia do escritório**: a maquete é a foto de capa, cada mesa ganha a sua página com o dia em horas, e o "sim" do dono é a única coisa viva.

**Teste do concorrente:** troque por Relevance AI ou Artisan. Nenhum tem uma sede-maquete que o público acabou de ver num anúncio, nem uma sala do dono onde tudo espera aprovação. A frase não fecha com eles; é da BrandUp.

**A coisa viva (uma só):** a linha de aprovação da sala YOU. O visitante aperta Approve, a linha vira "Approved. Follow-up sent to Sam." e a próxima ordem chega. Funciona com o polegar, tem versão sem script (os três estados estáticos) e não bloqueia a leitura.

**A transformação central (o que faz a página ser da BrandUp):** no anúncio, o roxo é um **bloco pequeno atrás de uma palavra** da legenda ("never **late.**"). Na v3, o mesmo bloco **cresce até virar campo**: a placa do hero, a página inteira do formulário, a faixa de título do FAQ. É a mesma marca, numa escala que deixa de ser tique de template.

### 2.2 As três direções que a skill deu
`draw.mjs --sector ai-product --tone bold --keep palette --options 3`:
| Direção | Decisão | Por quê |
|---|---|---|
| **`editorial-report`, "O relatório impresso"** | **ESCOLHIDA** | O comprador industrial lê documentos: cotação, ordem de compra, relatório semanal. E o escritório da BrandUp **produz** um relatório (o agente de reporting, o "ready for 8am"). Com um eixo fixo, páginas de cor chapada como impressão em duas cores e uma foto de capa, ela carrega a maquete (capa), as mesas (páginas) e a decisão (a linha viva). Além disso é o oposto do vocabulário de IA do v2. Referência da biblioteca que mais pesa: `opl-belgrade-architecture` (7,6): uma cor saturada + cinza, e as fotos de arquitetura dessaturadas para nada furar o par. Aqui, o roxo + a maquete monocromática |
| `one-motif`, "Um motivo" | Descartada | O motivo natural seria o bloco roxo da legenda. Só que, como motivo repetido em botão, máscara e marcador, um retângulo é fraco demais para carregar o sistema e acaba virando marca-texto em todo lugar, que é o sinal #12. Usei o princípio (o bloco vira campo) sem a direção |
| `type-only-statement`, "Só tipo" | Descartada | Pede um H1 de ≤ 25 caracteres a 9–14vw e empurra a maquete para baixo da primeira dobra. Isso briga com dois fixos (o 3D central, e a continuidade com o anúncio no celular: a pessoa clicou no escritório e tem que cair nele) |

**Redraws, com motivo (registrados conforme a skill):** (1) **tipo**: a folha deu EB Garamond, "sem capitais e sem negrito", que contradiz o gancho em caixa alta, que é fixo. O novo sorteio deu Libre Franklin 700 em caixa alta + Source Serif 4: é o ponto de partida para o type-director (§7.1), e ele decide; (2) **fotos**: o conjunto "Fog and quiet" não entra, porque as imagens da página são os renders da própria maquete (12 quadros, §8), o que passa o piso de ≥ 4 imagens reais da skill; (3) **paleta**: mantida da marca (`--keep palette`), com o violeta liberado no inspetor só para a regra de violeta (`--allow violet`), por ser marca.

---

## 3. Movimentos (5) e descartes

| Código | Captura que prova (aberta nesta sessão) | Porquê aqui | O que muda em relação à fonte | Custo |
|---|---|---|---|---|
| **D1** 3D como pré-render, agora como **fotografia de maquete** | `qclay-home/videos-frames/about-1-0.5.jpg` (argila fosca, um material, uma luz suave) | É a peça central, fixa. Render dá a mesma qualidade em qualquer GPU e no navegador do Instagram. A régua de acabamento da QH (um material, uma luz) é o que tira o "jogo" | A QH tem objetos abstratos soltos, em vídeo e em pastel. Aqui é **uma maquete arquitetônica num plinto**, fotografada com **lente longa em perspectiva** (sai o isométrico), em 12 quadros parados (capa dia/noite, 7 mesas, a sala YOU em retrato, 3 noturnas). Nada de vídeo controlado pela rolagem | $$$ produção · $ runtime |
| **B1** Escala extrema no gancho | `madeinevolve/d-00.webp` (grotesca em caixa alta, 187 px, contra texto de 12–14 px) | O gancho em caixa alta é fixo; o que faltava era **tamanho** (razão 2,6 no v2). Escala é o que separa os sites fortes dos fracos na pesquisa (8,4vw contra 5,0vw) | A ME põe o nome da agência centrado **por cima** de uma foto de moda. Aqui o gancho fica **sobre o preto liso, nunca sobre a imagem** (regra da casa), alinhado à esquerda no eixo de 35%, com 2 linhas, e a maquete entra abaixo e à direita. A razão fica em ~6:1, e não 12:1: a página é comercial e o gancho tem número | $ |
| **F3 + F6** A aprovação como fragmento de produto em escala real (a coisa viva) | `jimo/d-07.webp` (o painel do agente grande, com os passos que ele executa); a parada YOU do próprio v2 (`juri-v2-fotos/d-3.png`, y 5640–6210, aprovada pelo júri) | É o diferencial ("e se a IA fizer besteira com o meu cliente?"). O júri pediu ver funcionando | O jimo mostra janela de app + chat lateral + abas 01/02/03. Aqui **não há janela, chat nem abas**: é **uma ordem de serviço** (uma linha de 640 px) mostrada **três vezes empilhada**, em três estados (chega / você decide / enviado), com a do meio viva e a foto da sala YOU em retrato ao lado. O formato vem da planta "One row, three states" da folha, e o conteúdo do nosso `ApprovalCard` | $$ |
| **A2** O índice do produto vira navegação | `prolibu-sales/d-10.webp` (o trilho "1 / 2 CONTATO / 3…7" à esquerda) | São 7 mesas. A pessoa precisa ver o escritório inteiro de relance e escolher onde olhar; isso também substitui a lista "All agents at a glance" | O Prolibu usa um trilho numerado fino, em mono, que acompanha a rolagem. Aqui são **7 plaquetas de nome cheias** (como as plaquetas de mesa de uma maquete), sem número, controladas por toque/teclado (tablist), e cada uma abre **o dia daquela mesa** em faixas de hora. Sem rolagem sequestrada | $$ |
| **D6** O fim da página como cena fotográfica | `madeinevolve/d-06.webp` (plateia P&B de tela cheia com o contato pequeno) | Fecha o arco: a página abre de dia e termina à noite ("while you slept"). A noite é a última imagem antes do último pedido | A ME tem uma foto só, de tela cheia, com o CTA minúsculo no centro. Aqui são **três fotos noturnas da maquete coladas em faixa** (40svh) e, **logo abaixo, um campo preto com o formulário inteiro**. O pedido é forte, não sussurrado (conversão) | $ (sai do mesmo pipeline do D1) |

**Soma de custo:** um $$$ (D1). O D6 sai da mesma cena do Blender. O resto é $$ de HTML. Dentro da regra.

**Convenções de base ($, não contam como movimento):** C3 (quase-preto, nunca `#000`); C1 (o menta só na ação); F5 (abre e fecha rimando: a capa noturna é a intro, e a noite volta no fim); o eixo fixo da direção; o wordmark no rodapé (B8), **depois** do formulário final, para não competir com ele.

### Descartados
| Código | Porquê não |
|---|---|
| **E7** mergulho de câmera | É a assinatura do jimo, e no v2 era um zoom sobre a imagem isométrica (exigia projeção ortográfica e palco preso). Com fotos em perspectiva, o "voo" vira **corte** entre fotos, que é o que um fotógrafo de maquete faz. Também afasta a v3 do jimo |
| **E5** trajetória com pacotes | Lê como grafo de rede decorativo (sinal #17) |
| **B10** frase que acende palavra por palavra | Jimo, e é a "palavra estilizada" em movimento (#12) |
| **B4** mono como voz de dado | Proibido na casa, e é o pior sinal do v2 (#1). O dado usa algarismos tabulares. *Nota:* isto contraria a preferência do Tonho no produto ("mono como voz de dado"), que continua valendo **no app**; na landing, a régua é a taste, que o dono quer no máximo |
| **B5** título em dois tons/pesos | Virou tique do Dribbble (#13) |
| **A4** grade de pontos | Enfeite de ferramenta de design ("design-tool chrome") |
| **A1** cena por passo de roda | Página de conversão com formulário: rolagem nativa |
| **A5** lista tipográfica com hover-preview | Seria a alternativa ao A2 no tour; perde para as plaquetas porque o hover não existe no celular (o tráfego é do Meta) |
| **A6** bento de métricas | Não há métrica real além das alegações do dono |
| **B3** choque de famílias | Duas famílias no máximo; o choque roubaria o lugar do roxo |
| **B6, B7** elemento no título, frase que se edita | O H1 tem que ser lido e indexado de primeira |
| **C2** cor por seção | O roxo tem papel (momento de decisão), e a cor de status existe no fragmento |
| **C6** vidro e gradiente | Proibidos |
| **D2, D3** sequência de imagens, WebGL | Peso, GPU do celular, WebKit; ninguém precisa girar a sala |
| **D7** foto editorial com título por cima | Nada pode ficar sobre o título (regra da casa) |
| **E1** Lenis | Rolagem nativa: `sticky`, formulário e iOS |
| **E6** nav em pílula flutuante | Barra simples |
| **As "placas" sobre cada mesa** (ideia do Antonio, v1/v2) | **Transformadas, não descartadas.** O princípio (o que cada agente está fazendo agora, legível por cima do 3D) continua. A forma muda: 7 chips mono com LED no hero viravam o sinal #1 e o #2 ao mesmo tempo. Na v3, o hero tem **uma placa** (roxa, a sala YOU: "2 actions waiting for your yes"), e as sete leituras vão para as **plaquetas de nome** do tour, cada uma abrindo o dia da mesa |

---

## 4. Grid, campos e ritmo

| Breakpoint | Colunas | Gutter | Margem | **Eixo** (todo título e todo corpo começam nele) |
|---|---|---|---|---|
| 1440 | 12 | 24 | 72 | **início da col 5 = x 512** (35,5%). A zona 0–35% leva frase de apoio, plaquetas, fatos laterais e nomes de estado |
| 768 | 8 | 20 | 40 | início da col 3 = x 217 |
| 390 | 4 | 12 | 20 | o eixo cai na margem (x 20); as notas laterais vão para cima do parágrafo |

- Margem 72 nas duas bordas, **em todas as seções, nav e rodapé incluídos** (o defeito #1 do v2). A borda direita do conteúdo é sempre x 1368.
- Espaço entre seções: **160** a 1440, **88** a 390. Dentro de uma seção, no máximo 64.
- **Campos (capítulos de cor), na ordem:** intro (preto) → hero (preto) → formulário (**roxo**) → depoimento (preto | **papel**) → tour (preto) → YOU (preto) → About (**papel**) → FAQ (faixa **roxa** + faixas pretas alternadas) → final (3 fotos noturnas + preto) → rodapé (preto). Nunca dois campos de cor vizinhos iguais.

---

## 5. Mapa de seções e composição (1440 e 390)

| # | Seção | Pergunta que responde | Planta da folha | Estados |
|---|---|---|---|---|
| 0 | Intro | (assinatura: "o escritório abriu") | — | roda / pulada / não roda |
| 1 | Nav + Hero | O que é, quanto promete, é para mim? | "Narrow talk, wide headline" | intro por cima → pintado; foto carregando |
| 2 | Formulário `#diagnostic` | O que acontece se eu preencher? | "The idea again, inverted" → página roxa | vazio, foco, erro por campo, enviando, sucesso, offline |
| 3 | Depoimento | Gente como eu já fez isso? | "Name block, quote block" | real / pendente (só no mock) |
| 4 | Tour: as 7 mesas | O que cada agente faz, e o que eu aprovo? | "Day tabs, banded agenda" → plaquetas + o dia da mesa | mesa ativa, foto carregando, sem JS |
| 5 | Sala YOU | Quem manda? | "One row, three states" | chega / foco-hover / aprovado / recusado / editar |
| 6 | About | Quem está por trás? | "Side facts, wide paragraph" | — |
| 7 | FAQ | E as minhas objeções? | "A band per question" | tudo aberto |
| 8 | Final + formulário | O que eu ganho amanhã de manhã? | "Three photographs, then a field" | como o #2 |
| 9 | Rodapé | Fatos legais | "Name first", adaptada | — |

### 5.0 Intro, "as luzes da HQ acendem" (mantida e mais simples)
Tela preta → as **7 telas de monitor** da capa **noturna** acendem (o brilho vem da própria imagem, revelado por máscara circular de 7 pontos a partir de `desks.json`) → a capa noturna dá lugar à **capa diurna** (mesma câmera, crossfade de 300 ms) → a página está lá. Dá para dizer o que aconteceu: "o escritório abriu". **≤ 1,1 s a 1440 e ≤ 0,9 s a 390.** O H1, a frase e o CTA estão pintados por baixo desde o 1º quadro (a overlay sai por opacidade). Pulável por qualquer toque ou tecla (150 ms); só na 1ª visita da sessão; não roda com reduced motion, Save-Data ou âncora. As linhas pontilhadas do voo dos LEDs saem (o júri já tinha avisado). Custo: $ (2 imagens que a página já usa + CSS).

### 5.1 Nav
Barra simples, 72 px (56 a 390): wordmark em x 72; 3 links (Office · Desks · FAQ) começando **no eixo** (x 512), na fonte de texto, a 16 px; à direita, "Diagnosis" como **link de texto sublinhado** (alvo de 44 px), sem contorno. No estado rolado, o fundo `ink.950` fica sólido, sem fio e sem blur. A 390: wordmark + "Diagnosis".

### 5.2 Hero
```
1440 × 900  (ink.950)
 x72                     x512 (eixo)                                        x1368
 ┌─────────────────────────────────────────────────────────────────────────────┐
 │ BrandUp                Office   Desks   FAQ                      Diagnosis   │ 72
 │                        ███ OVER $250K PER MONTH ███████████████████████     │ 120
 │                        ███ WITHIN 90 DAYS. █████████                         │  ~104–112 px, 2 linhas, lh .9
 │                                                                             │ 360
 │ How industrial and B2B  ┌──────────────┐                                     │
 │ companies get there: an │ 2            │ ░░░░░░░░ MAQUETE (capa diurna) ░░░░░│ 400  placa roxa 280×128
 │ office of AI agents...  │ actions wait-│ ░░░░ do eixo até a borda direita ░░░│      cobre o canto sup. esq.
 │ (22 px, ≤ 26 car./linha)│ ing for your │ ░░░░ (sangra), flutua no preto, ░░░░│      da foto, sobre a sala YOU
 │                         └──────────────┘ ░░░░ as bordas somem no fundo  ░░░░░│
 │ [ Build my AI office ]  56 px, menta, canto reto  ░░░░░░░░░░░░░░░░░░░░░░░░░░░│ 560
 │ Over A$10 million in sales generated   ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░│ 640  prova: 16 px, text.1
 │ for our clients.                        ░░░░░░░ continua abaixo da dobra ░░░│ 900 → ~1180
 └─────────────────────────────────────────────────────────────────────────────┘
```
- Ordem de leitura (semicerrando os olhos): H1 → maquete → placa roxa → frase → CTA. A imagem cobre ~45% da primeira tela e continua abaixo da dobra (convida a rolar).
- **A placa roxa** (`brand.500` cheio, canto reto, 280×128): o número "2" no tamanho `head` e a linha "actions waiting for your yes" a 16 px. Fica ancorada à sala YOU pelas coordenadas do `desks.json`. É o bloco da legenda do anúncio, crescido. Hover/foco: nada (não é controle). Com o tempo (desktop, "em avaliação"): o número sobe de 2 para 3 uma vez, 4 s depois de pintar, e para. Dá para dizer o que aconteceu: chegou uma ordem.
- Nenhum texto sobre a foto, nenhum scrim, nenhuma stat row.

```
390 × 844
 ┌──────────────────────────────┐
 │ BrandUp            Diagnosis │ 56
 │ ██ OVER $250K PER MONTH ████ │ ~36–40 px, condensada, 2 linhas (≤ 20 car./linha)
 │ ██ WITHIN 90 DAYS. ███       │
 │ How industrial and B2B com-  │ 18 px, ≤ 3 linhas (versão curta do copy)
 │ panies get there: AI agents… │
 │ [   Build my AI office     ] │ 56, largura total
 │┌─────────────┐░░░░░░░░░░░░░░│ ~400  capa em retrato (render próprio, não recorte)
 ││ 2 actions   │░░░ MAQUETE ░░░│       sangra nas 2 bordas; placa a 60% da largura
 ││ waiting…    │░░░░░░░░░░░░░░░│
 │└─────────────┘░░░░░░░░░░░░░░░│ 844 → continua
 └──────────────────────────────┘
```
A prova "A$10 million" vai para debaixo da imagem a 390 (copy decide), ou sai se o dono não comprovar.

**Variante A no Figma, "em avaliação":** o gancho inteiro de 118 caracteres em 3 linhas (o aprovado original), na mesma composição, ao lado da B (gancho partido, recomendada). O dono escolhe vendo. A B é a que passa na regra de ≤ 2 linhas da taste.

### 5.3 Formulário `#diagnostic`, a página roxa
```
1440 (campo brand.500 de borda a borda, ≥ 90svh)
 x72                      x512
 │ Fill in five fields.    DO NOT LEAVE NOW.  ← head (64 px), 2 linhas, no eixo, text.1
 │ A specialist calls you  YOUR TEAM IS WAITING.
 │ within 5 minutes, in    ┌ Name ───────────────┐ ┌ Company ────────────┐  campos ink.950 cheios,
 │ Sydney business hours.  │                     │ │                     │  56 px, canto reto,
 │ (20 px, text.1)         └─────────────────────┘ └─────────────────────┘  rótulo em cima (16 px)
 │                         ┌ Work email ─────────┐ ┌ Mobile  +61 ────────┐
 │ [retrato real do        └─────────────────────┘ └─────────────────────┘
 │  especialista, 4:5,     Monthly revenue (AUD)
 │  200 px, SE houver]     [Under $100K][$100K–$300K][$300K–$1M][Above $1M]  4 blocos ink cheios, colados
 │                         [            Build my AI office             ]   menta sobre roxo (3,94:1 de forma)
 │                         We only use your details to respond…  (15 px)
```
- **Sem cartão em volta**: os campos sentam direto no roxo. O bloco de faturamento selecionado inverte para `paper.100` com texto `ink.950`.
- Os passos viram **uma frase** na zona lateral, sem números. Se houver foto real de quem liga, ela entra ali (é a prova humana mais forte da página); se não houver, nada no lugar.
- 390: H2 → a frase dos passos (1 linha curta) → campos empilhados, a largura total → blocos 2×2 → CTA. O formulário começa a ≤ 220 px do topo do campo.

### 5.4 Depoimento
1440: dois blocos colados, sem vão, ~70svh: à esquerda (cols 1–4, até o eixo) `ink.900` com nome e cargo no canto inferior esquerdo (20/16 px); à direita (eixo → borda) **`paper.100`** com a citação em `ink.950` a 36 px no máximo, em ≤ 3 linhas (é uma declaração, não um título), com a aspa de abertura pendurada. Sem cabeçalho "In their own words": a citação faz esse papel. Controles: "Next" como link de texto no canto inferior direito do bloco claro (alvo de 44 px), sem setas redondas.
390: o bloco claro primeiro (citação a 24 px), o escuro logo embaixo (96 px de altura).
**Até haver depoimento real, o mock mostra o bloco com o texto pendente, e o site não publica a seção** (ACCC).

### 5.5 Tour: as 7 mesas (plaquetas + o dia da mesa)
```
1440
 x72                      x512                                                  x1368
 │ THIS EMPLOYEE IS NEVER LATE. AND NEVER ASKS FOR A RAISE.  ← head, 2 linhas, no x72 (título largo)
 │
 │ ┌───────────────────┐  ┌────────────────────────────────────────────────────┐
 │ │ Your follow-up  ■ │  │                                                    │
 │ ├───────────────────┤  │      FOTO DA MESA (100 mm, perspectiva baixa)      │  16:9, 856×482
 │ │ Your bookkeeper   │  │      canto reto, sangra até x1368                  │
 │ │ Your ad manager   │  │                                                    │
 │ │ Your social media │  └────────────────────────────────────────────────────┘
 │ │ Your receptionist │  06:12  Followed up 12 leads from yesterday's trade-show list   Done   │ faixa ink.900, 76 px
 │ │ Your analyst      │  09:30  Booked a site visit with Hargreaves Fabrication         Done   │ faixa ink.850
 │ │ You               │  11:48  Drafted a follow-up on a quote, no reply in 6 days  Waiting  │ ink.900; "Waiting" âmbar
 │ └───────────────────┘  You approve follow-ups on quotes and anything with a price in it.  │ faixa brand.500
 │  plaquetas 64 px,
 │  ink.900 cheias, 6 px entre; a ativa inverte para paper.100 + ink.950
```
- **Plaquetas** (cols 1–4): `role="tablist"`, setas do teclado, o nome na fonte de texto a 18 px, sem ícone e sem número. A ativa inverte (papel claro). Trocar de mesa = crossfade da foto (240 ms, leve escala de 1,02 para 1) e as faixas entram em cascata (60 ms).
- **O dia da mesa:** 3–4 faixas de hora (algarismos tabulares, 20 px) + a ação a 18 px/500 + o estado à direita em palavra; a **última faixa é roxa** e diz o que o dono aprova naquela mesa. O conteúdo vem do `copy.md` §2.5 (as atividades e os "You approve" já escritos); "Hargreaves Fabrication" é exemplo meu e o copy troca por um nome claramente fictício.
- A plaqueta "You" leva à seção 5 (rola até ela).
- Sem palco preso, sem planta, sem pacotes, sem "Example activity". A lista "All agents at a glance" deixa de existir: as plaquetas **são** o índice, e sem JS as 7 mesas aparecem empilhadas (cada uma com a foto e as faixas), que também é a versão de reduced motion.

```
390
 │ NEVER LATE. NEVER ASKS FOR A RAISE.   (head, 2 linhas)
 │ [Follow-up][Bookkeeper][Ad manager][Soc…→   ← plaquetas em fileira com scroll-snap, sticky sob a nav
 │ ┌──────────────────────────────┐             a ativa invertida; 44 px de altura mínima
 │ │ FOTO DA MESA 1:1 (render     │
 │ │ próprio de 1080×1080)        │
 │ └──────────────────────────────┘
 │ 06:12  Followed up 12 leads…    ← faixas empilham hora / ação / estado, 16 px de padding
 │ 11:48  Drafted a follow-up…  Waiting
 │ You approve follow-ups on quotes…   (faixa roxa)
```
Arrastar a foto para o lado troca de mesa (opcional, "em avaliação"); o toque na plaqueta é o caminho principal.

### 5.6 Sala YOU, a linha viva
```
1440
 x72            x512                                  x1152          x1368
 │              YOU HAVE THE FINAL WORD.   ← head, no eixo
 │      Arrives ┌──────────────────────────────────┐  ┌────────────┐
 │       07:58  │ Your follow-up · A$14,200 · Sam   │  │            │
 │              │ Follow up on a quote, no reply…  │  │  SALA YOU  │  retrato 4:5 (render),
 │              └──────────────────────────────────┘  │  (cols     │  cols 10–12, canto reto
 │   You decide ┌──────────────────────────────────┐  │  10–12)    │
 │              │ … + Why (3 frases) + prévia      │  │            │
 │              │ [Approve] Edit  Decline   ← VIVA │  └────────────┘
 │              └──────────────────────────────────┘
 │         Sent ┌──────────────────────────────────┐
 │        08:02 │ Approved. Follow-up sent to Sam. │
 │              └──────────────────────────────────┘
```
- Três cópias da mesma ordem em escala real, 640 px, nas cols 5–10, 56 px entre elas, **sem moldura em volta**. Cada cópia é `data-ui`: superfície `ink.900` (degrau de tom), raio 4, algarismos tabulares, dentro dela vale a convenção de produto. Nomes do estado à esquerda, alinhados à direita, a 20 px em `text.2`.
- **A do meio é viva:** Approve (menta, o único da tela) → vira a terceira e uma nova ordem (bookkeeper, A$18,400, 3 recipients) chega no lugar da primeira. Edit abre a prévia como campo editável. Decline → "Declined. Nothing was sent." em `text.2` (**nunca vermelho**: recusar não é erro). `aria-live="polite"` anuncia o resultado.
- O "Why" são três frases, sem check. A prévia da mensagem vai num degrau de tom (`ink.850`), sem borda.
- 390: título → as 3 cópias em largura total, cada nome de estado **embaixo** da sua cópia (17 px, 10 px de distância); a foto da sala sai (já apareceu na plaqueta "You" do tour).

### 5.7 About (página clara)
`paper.100` de borda a borda, texto `ink.950`. Linha 1: fatos laterais (cols 1–4) empilhados, rótulo em `ink` a 60% e valor em `ink` cheio, 16 px: *Based in* · *Built for* (manufacturers, distributors, B2B services) · *Office working in* (90 days) · *Sales generated for clients* (over A$10 million, a confirmar). No eixo, um parágrafo de ~60 palavras a 26 px, entrelinha 1,35, até x 1296. A linha 2 (os sistemas com que o escritório conecta) **só entra se o dono confirmar a lista**; se não, a seção fica com uma linha só. Sem cabeçalho grande: o parágrafo abre (a skill aceita aqui; o `h2` pode ficar visualmente pequeno: "About BrandUp", 20 px). 390: o parágrafo primeiro (19 px), os fatos em 2 colunas embaixo.

### 5.8 FAQ (uma faixa por pergunta)
- Faixa de título **roxa**, 40svh, "QUESTIONS OWNERS ASK." a ~7vw (caixa alta na display), ancorada embaixo à esquerda.
- 6–7 faixas coladas, alternando `ink.950` e `ink.900`: a pergunta nas cols 1–4 a 28 px (até o eixo), a resposta a partir do eixo (x 512), a 18 px e com medida ≤ 68 car. Padding de 56 px. **Todas as respostas visíveis**, sem toggle, sem "+".
- 390: as faixas continuam alternadas; pergunta 22 px, resposta 17 px, padding 32/20.
- "Talk to a person" vira o último item da faixa de título (link de texto, alvo de 44 px).

### 5.9 Final: três fotos noturnas, depois o formulário
```
1440
 ┌───────────────────┬───────────────────┬───────────────────┐
 │ NOITE: mesa do    │ NOITE: mesa do    │ AMANHECER: sala   │  3 renders, cada um 1/3 × 40svh,
 │ follow-up, 23:40  │ bookkeeper, 03:10 │ YOU, 07:55        │  colados, sem legenda
 └───────────────────┴───────────────────┴───────────────────┘
 ink.950
 x72                                     x768                         x1368
 │ WANT A TEAM LIKE THIS IN YOUR         ┌ Name ┐ ┌ Company ┐          formulário direto no preto,
 │ BUSINESS?  (head, 2 linhas)           ┌ Work email ┐ ┌ Mobile ┐     campos ink.900 cheios
 │ Tonight, while you sleep, it follows  Monthly revenue: 4 blocos
 │ up 14 leads, answers 9 enquiries and  [        Build my AI office        ]  menta
 │ drafts 3 invoice reminders. At 8am    privacy line
 │ it is on your phone for a yes or no.
 │ (declaração ≤ 30 palavras, 24 px)
```
- As horas da noite moram no texto (é o antigo `NightLog`, sem régua e sem mono). As fotos não levam legenda (a hora está na luz: monitores, luminária, o céu clareando na janela da sala YOU).
- 390: a primeira foto em largura total (4:3), as outras duas lado a lado embaixo (meia largura cada), depois o campo preto com o título, a declaração e o formulário empilhados.

### 5.10 Rodapé
Fundo preto. Uma linha com o wordmark "BrandUp" a ~18vw ocupando a largura do conteúdo, **cortado pela borda de baixo da página** (não pelo topo, que o inspetor reprova). Acima dele, em duas colunas: e-mail e telefone a 28 px (links) | Privacy · Contact · ABN · ícones sociais em SVG inline, a 16 px. Linha legal a 14 px: "© BrandUp · ABN … · Agent activity shown on this page is illustrative."

### 5.11 Barra fixa no celular ("em avaliação")
Só depois de o hero sair da tela e escondida enquanto um formulário estiver visível: barra `ink.950` com o CTA menta em largura total e safe-area. Num frame próprio, fora do fluxo (o defeito #4 do v2).

### 5.12 Estados que o mock desenha (frame `States v3`)
Campo: vazio, foco (anel `paper.100` de 2 px sobre o roxo; anel menta sobre o preto), preenchido, erro (mensagem do campo em `status.error` sob ele, a 15 px, ligada por `aria-describedby`; o campo **não** ganha borda vermelha grossa, ganha a mensagem), desabilitado. Enviando (o rótulo do botão vira "Sending…", sem spinner). Sucesso (redirect `/thank-you`). Offline/erro de rede ("We couldn't send this. Check your connection and try again." + os dados preservados). Plaqueta: repouso, hover, foco, ativa. Linha viva: os 5 estados do §5.6. Foto do tour carregando: um bloco `ink.900` com a proporção exata (sem blur, sem esqueleto animado), trocado por fade de 200 ms. Imagem que falhou: o mesmo bloco, com o texto alternativo visível a 15 px.

---

## 6. Linguagem de componente e tokens v3

### 6.1 O que deixa de existir na página
Mono (todo); pílula, chip e selo; contorno de 1 px fora de campo de formulário e de `data-ui`; o raio médio (fica 0, e 4 no `data-ui`); cartão em volta de formulário; stat row; ícone decorativo, check, "+", seta redonda; ponto de status; marca-texto roxo atrás de palavra; título em dois pesos; fio entre itens de lista; linhas e pacotes sobre a imagem; miniplanta; relógio local; "Example activity"; texto queimado no render; isométrico.

### 6.2 O que existe
Retângulo cheio de canto reto (botão, campo, plaqueta, bloco de faturamento); campo de cor de borda a borda; degrau de tom; foto de maquete sem moldura; o fragmento `data-ui` (a ordem de serviço) com as convenções do produto **dentro** dele; link de texto sublinhado (2 px, offset 4 px) para ação secundária.

### 6.3 Tokens (mudanças sobre `figma-capturas/tokens.*.json`)
| Token | Valor | Papel | Contraste |
|---|---|---|---|
| `ink.950` | `#060409` (mantido) | quieta 1: o fundo, o escritório | — |
| `ink.900` | `#121019` (novo, substitui `#0F0A16`) | degrau 1: plaquetas, faixas, campos sobre o preto, superfície do `data-ui` | `text.1` 16,8:1 (calcular no Figma) |
| `ink.850` | `#1A1723` | degrau 2: faixa alternada, prévia da mensagem | — |
| `brand.500` | `#9232EA` (mantido) | quieta 2: **só campo** (formulário, placa do hero, faixa do FAQ, faixa "You approve") | `text.1` sobre ele 4,83:1 (AA) |
| `accent.400` | `#58F6B1` (mantido; o Mint `#88F9C0` continua como modo) | a alta: **só a ação** | `ink.950` sobre ele 14,8:1; ele sobre o roxo 3,94:1 (forma) |
| `paper.100` | `#ECEAEF` (novo) | neutro claro: página do About, bloco da citação, plaqueta ativa, faturamento selecionado | `ink.950` sobre ele ≈ 17:1 |
| `paper.200` | `#DAD7DF` (novo) | degrau sobre o papel | — |
| `text.1` | `#F4F0FA` | **todo texto corrido** sobre o escuro e sobre o roxo | 18,2:1 |
| `text.2` | `#B3ADBC` | só nota secundária de uma linha (nomes de estado, privacidade) | 9,4:1 |
| `status.attention` | `#FFB547` | "Waiting" (palavra), só dentro do tour e do `data-ui` | 11,6:1 |
| `status.error` | `#FF5C6C` | erro de formulário | 6,8:1 |
| `radius.page` | `0` | tudo na página | — |
| `radius.ui` | `4` | dentro do `data-ui` | — |
| saem | `line.hairline`, `line.strong`, `brand.300` como texto, `brand.deep` (vai só para o render), todos os tokens `mono.*` | | |

**Proporção-alvo por viewport (semicerrando os olhos):** preto 60–75%, roxo 0–35% (em campo), papel 0–30%, menta ≤ 2% e sempre na ação.
**Modo "Day", só num frame do hero, "em avaliação":** o mesmo hero com o fundo `paper.100`. Não é recomendado (o menta some sobre o claro: 1,1:1 de forma), mas o dono avalia vendo. Se ele gostar, a alta precisa de recalibragem (verde mais fundo) e isso volta para mim.

---

## 7. Pedidos

### 7.1 Ao type-director (papéis; a família é dele)
1. **`display.hook`**: grotesca/gótica **pesada, de largura condensada ou comprimida**, desenhada para caixa alta, com cara de sinalização industrial e não de anúncio esportivo. Tem que caber "OVER $250K PER MONTH" (20 car.) **numa linha de 350 px a ≥ 36 px** e o H1 inteiro em **2 linhas de 856 px a ≥ 104 px**. Tracking −0,02 a −0,035em, entrelinha 0,88–0,92. **Proibidas por serem default:** Barlow Condensed, Bebas, Oswald, Anton, Montserrat. Ponto de partida que a skill sorteou: Libre Franklin 700 (mede a largura; se não couber, ache na mesma linhagem uma com corte condensado ou eixo de largura, com licença verificada).
2. **`display.section`** (H2 e a faixa do FAQ): a mesma família do hook, em caixa alta, peso menor ou largura normal. Cinco tamanhos na página inteira: `display` 36→112, `head` 30→64, `lead` 20→24, `body` 17→19, `small` 15 fixo (piso de 15 sobre o escuro; nada abaixo de 14 em lugar nenhum).
3. **`text`**: uma fonte de leitura excelente a 17–19 px, **com algarismos tabulares e lining** (substitui a mono em hora, valor e A$). A skill sorteou uma serifada transicional (Source Serif 4): **teste-a primeiro**. Serifa no corpo é o que mais tira a textura "SaaS de IA" e conversa com "relatório e cotação". Se você vetar, vete com espécime e medida, e use o corte de texto da própria família do hook (aí fica uma família só).
4. Teto: **2 famílias**. Entregue o espécime 1440/390 em chromium e webkit, como no v2, com o texto real do §5.

### 7.2 Ao copy-director (função e tamanho; o texto é dele)
| Bloco | Função | Limite |
|---|---|---|
| H1 (caixa alta via CSS) | a promessa com os números | ≤ 36 car., 2 linhas de ≤ 20 car. Proposta minha: "Over $250K per month within 90 days." |
| Frase de apoio | quem (industrial e B2B) + o quê (escritório de agentes que a BrandUp monta e opera, 24/7) + o controle (você aprova do celular) | 1440 ≤ 150 car.; 390 ≤ 115 car. Deve reaproveitar o começo do gancho ("How industrial and B2B companies…") |
| Prova sob o CTA | A$10 milhões (se comprovado) | ≤ 60 car. |
| Placa roxa | número + linha | linha ≤ 34 car. ("actions waiting for your yes") |
| H2 do formulário | existente ("Do not leave now! Your team is waiting.") | ≤ 40 car.; o ponto de exclamação passa a ponto se ficar estridente em caixa alta (decisão sua) |
| Passos | uma frase só, sem números | ≤ 110 car. |
| Citação | pendente até haver real | ≤ 25 palavras |
| H2 do tour | existente (as frases do anúncio) | 1440 ≤ 56 car.; 390 ≤ 36 |
| Plaquetas | os 7 nomes | ≤ 18 car. |
| O dia de cada mesa (×6) | 3–4 faixas: hora + ação + estado em palavra | ação ≤ 60 car.; estado ≤ 12; + a linha "You approve…" ≤ 70. Empresas e pessoas com nomes claramente fictícios |
| H2 da sala YOU | quem manda | ≤ 28 car. |
| Nomes de estado | Arrives / You decide / Sent | ≤ 12 car. |
| Ordem de serviço (×2: follow-up e bookkeeper) | título, valor, destinatário, canal, 3 "Why", prévia, linha final | título ≤ 52 car. **sem viúva** a 640 px; Why ≤ 40 car. cada; prévia ≤ 140 |
| About | parágrafo + 4 fatos | ≤ 60 palavras; rótulo ≤ 24 car., valor ≤ 40 |
| FAQ | título da faixa + 6–7 perguntas e respostas | título ≤ 24 car.; pergunta ≤ 50; resposta ≤ 45 palavras |
| Final | H2 + a declaração com os números da noite | H2 ≤ 40; declaração ≤ 30 palavras |
| Rodapé | a ressalva "illustrative" + legais | ≤ 70 car. |
| **Saem** | rótulos da stat row, "Example activity", "AEST 14:32", "WHY", "TODAY", "YOU APPROVE" como rótulo, "While you slept" como título de caixa, "All agents at a glance", "In their own words" | |

### 7.3 Ao frontend-studio
**Render (em paralelo, já):** a especificação está no §8 e substitui o §8.3 do brief antigo.

**Código (depois do mock aprovado):**
- **Motion com intenção (régua: "alguém consegue dizer o que aconteceu?").** (1) Assinatura: a intro (§5.0) + o H1 entrando por máscara, linha a linha (900 ms, a 2ª linha 110 ms depois), **sem atrasar o LCP** (o texto existe pintado, a máscara é só `transform`). (2) Entrada por seção: título → texto → imagem, em cascata de 60–90 ms, subindo 24 px com opacidade, uma vez. (3) Feedback em todo controle (pressão, hover, foco). (4) Uma imagem que se mexe: a capa diurna escala de 1,00 para 1,04 com a rolagem do hero (`animation-timeline: scroll()` com fallback por IO). (5) A troca de mesa e a linha viva. Nada perpétuo. `prefers-reduced-motion`: sem intro, sem escala, trocas instantâneas, as 7 mesas empilhadas.
- **Orçamento:** LCP = o H1 (texto). Display subsetada (Latin + algarismos + `$`), em preload, `font-display: swap` com fallback métrico ajustado (`size-adjust`) para não pular. Capa diurna AVIF ≤ 320 KB (1440) e ≤ 140 KB (retrato 390), com `fetchpriority="high"` só nela; a noturna só carrega se a intro for rodar. As 6 fotos de mesa e a da sala YOU em lazy, AVIF ≤ 90 KB cada (≤ 60 no 1:1 do celular); as 3 noturnas ≤ 80 KB cada. **Total de imagem na 1ª dobra ≤ 360 KB a 390.** JS da página ≤ 35 KB gz (sem GSAP se der; IO + CSS scroll-timeline).
- **Fallbacks:** WebP para AVIF ausente; sem JS, as plaquetas viram 7 seções empilhadas e a linha viva mostra os 3 estados estáticos; Save-Data: sem intro e sem a noturna.
- **Portão:** `inspect.mjs` da skill em 1440/768/390 no **build de produção**, `--allow violet` e nada mais; `lint.mjs` no `src/`; webkit e chromium.

### 7.4 Ao figma-architect (ordem de trabalho do mock v3)
1. Tokens v3 (§6.3) e os papéis de tipo que o type-director entregar. Apague os estilos mono e os tokens de linha.
2. Componentes novos: `Plaque` (repouso/hover/foco/ativa), `DeskDay` (faixa ×3 tons), `WorkOrder` (`data-ui`, 5 estados), `FieldOnColour` (sobre o roxo e sobre o preto), `RevenueBlocks`, `TextLink`. Aposente: `AgentPlate`, `StatRow`, `Chip`, `NightLog`, `DeskPanel`, a miniplanta, os cartões.
3. As telas 1440 e 390 na ordem do §5, com as **imagens do v2 como placeholder cinza na proporção exata** até o render chegar (nada de colocar o render isométrico de volta: ele contamina a leitura do júri).
4. A variante A do gancho e o modo "Day" do hero, num frame à parte, marcados "em avaliação".
5. `States v3` (§5.12) e o 768.
6. Antes de mandar ao júri, o **teste de sobreposição**: cada seção ao lado de `jimo/d-07`, `jimo/d-12`, `prolibu-sales/d-10` e do v2. Se alguma sobrepõe (mesma disposição e mesmo elemento no mesmo lugar), volte.

---

## 8. O render 3D (substitui o §8.3 do brief antigo)

**Gênero:** fotografia de **maquete de arquiteto em estúdio**, e não cena de jogo. A pergunta-teste: "isto parece uma foto de uma maquete física em cima de uma mesa?". Se parecer um jogo, um app ou uma ilustração isométrica, refaça.

1. **Câmera em perspectiva (o isométrico sai).** Capa: lente de **85 mm** equivalente (full frame), elevação de **32°**, azimute de ~35° (3/4), o plinto inteiro no quadro, com a **sala YOU no terço superior esquerdo** (é onde a placa roxa ancora) e ~12% de respiro preto em volta. Mesas: **100 mm**, elevação de **18–22°**, foco na mesa, profundidade de campo fisicamente plausível (abertura equivalente f/5.6–f/8 na escala da maquete; os vizinhos levemente fora de foco). **Proibido o tilt-shift exagerado** (é clichê de "miniatura").
2. **Materiais (um sistema, sem cor de brinquedo):** paredes e piso em **cartão branco fosco** (`#E9E7EC`, rugosidade 0,85, com o fio do corte visível nas bordas); mesas e pisos das áreas de trabalho em **madeira balsa/basswood** clara (`#CDBBA0`, veio fino, rugosidade 0,7); divisórias em **acrílico fosco** (transmissão 0,5, rugosidade 0,35); plinto em **MDF preto fosco** com chanfro de 2 mm que pega a luz; figuras em **resina branca sem pintura, escala 1:50, proporção adulta** (cabeça ≈ 1/7,5 da altura, sem rosto); monitores como placas pretas finas com tela emissiva **sem UI e sem texto** (só um brilho com leve gradiente físico da tela). **A única cor da maquete:** o tapete da sala YOU, em feltro roxo (que na luz chega a `#9232EA` no realce). Saem: o xadrez, a grama, as árvores, as plantas verdes (se ficar alguma, em cartão branco abstrato), o tapete vinho, as cadeiras menta, o neon "BRANDUP HQ", o quadro Ω (fica a moldura vazia), qualquer texto.
3. **Luz, dia:** uma **softbox grande** (luz de área de ~1,5 m na escala real, 5200 K) de cima-esquerda-frente a 45°; um rebatedor branco fraco à direita; um contraluz 6000 K de trás-direita, só para recortar o chanfro do plinto; o mundo em preto. Sombras de contato macias, oclusão ambiente suave. **Noite:** sem key; os monitores (6500 K) são a luz principal; luminárias de mesa 2700 K em 3 mesas; um preenchimento frio 7500 K a ~3%; na foto "amanhecer" da sala YOU, o céu da janela clareia em azul-cinza.
4. **Casar com a página:** renderizar com **fundo transparente** e compor sobre `#060409` exato, para a borda da foto sumir no fundo (a maquete flutua no preto da página). Color management AgX (ou Filmic), contraste médio-alto, saturação baixa (o tapete roxo é a exceção), sem teal-and-orange; grão de 2% a 100%.
5. **Quadros (12):**
   | Arquivo | Câmera | Luz | Saída |
   |---|---|---|---|
   | `office-day-master` | capa 85 mm | dia | 3200×1800 |
   | `office-day-portrait` | **câmera própria** em retrato (não é recorte), sala YOU no topo | dia | 1170×1460 |
   | `office-night-master` | igual à capa | noite | 3200×1800 (intro) |
   | `desk-{followup,bookkeeper,admanager,social,reception,analyst}` | 100 mm, uma por mesa | dia | 1920×1080 + 1080×1080 (câmera própria 1:1) |
   | `you-room-portrait` | 100 mm, 25° | dia | 1200×1500 |
   | `night-followup` (23:40), `night-bookkeeper` (03:10), `dawn-you` (07:55) | 100 mm | noite / amanhecer | 1600×1200 |
6. **Entrega:** EXR/PNG de 16 bits + os AVIF/WebP no orçamento do §7.3 + **`desks.json`** com as coordenadas em pixel do centro de cada monitor e da sala YOU **em cada master** (para a intro e a placa) + o `.blend` versionado.
7. **Plano B, se a modelagem atrasar:** a mesma câmera e a mesma luz sobre uma **maquete de volumes em cartão branco** (caixas e lâminas, sem mobília fina, ~1 dia de Blender). Nunca a planta vetorial com fios (é slop pela v3) e nunca o render isométrico do v2.

---

## 9. Riscos
- **WebKit/Safari:** AVIF a partir do Safari 16 (fallback WebP); `animation-timeline` não existe no Safari estável → IO como fallback, e o hero tem que estar completo sem a escala; o crossfade da intro só em `opacity`; a máscara de 7 pontos com `mask-image` radial (testar no iOS 16: se falhar, a intro vira só o crossfade noite → dia).
- **Celular / navegador do Instagram:** `svh` muda com a barra (memória `instagram-svh-muda-na-rolagem`): as alturas de 40svh e 90svh usam a altura congelada no toque; a fileira de plaquetas sticky não pode cobrir o campo em foco (some quando um input recebe foco).
- **Peso:** a capa é a maior imagem; se o AVIF de 3200 passar de 320 KB, ela sai a 2560. Nenhum vídeo nesta versão.
- **Acessibilidade:** contraste de cada par no §6.3 (os novos `ink.900`/`paper.100` medidos no Figma antes do júri); tablist com setas; `aria-live` na linha viva; o foco visível nos três campos de cor (anel claro sobre o roxo, menta sobre o preto, `ink` sobre o papel); a ordem de leitura da 390 é a ordem do DOM.
- **Produção de asset:** os 12 quadros dependem de modelagem do zero se a cena do anúncio não existir em `.blend` (o §10 do brief antigo continua: pedir a fonte ao dono). O plano B segura o prazo.
- **Conteúdo:** a ACCC sobre "$250K/mês" continua (agora o número está **maior** no H1, então a comprovação pesa mais); os nomes fictícios no tour e na ordem de serviço precisam parecer fictícios; "illustrative" no rodapé.
- **Aceitação do dono:** a v3 muda a tipografia e tira todo o mono e todas as pílulas. É a resposta direta ao "cara de AI slop", mas é uma mudança grande; por isso a variante A do gancho e o modo "Day" ficam no Figma para ele comparar.

---

## 10. O critério objetivo de "não é mais slop" (júri + taste)

Todas as condições precisam passar; uma falha reprova.
1. **Contagem no Figma (auditoria de camadas, o figma-architect anexa):** camadas de texto em mono = **0**; texto em caixa alta < 20 px = **0** (a caixa alta existe só na display); pílulas/chips fora do `data-ui` = **0**; traços de 1 px fora de campo de formulário e de `data-ui` = **0**; valores de raio usados = {0; 4 só no `data-ui`}; sombras e blur = **0**; gradientes = **0** (exceto a luz dentro do render); ícones = só os sociais do rodapé.
2. **Cor:** o menta aparece só no CTA (1 por viewport) e no Approve da linha viva; o roxo aparece só em áreas ≥ 240×120 px, **nunca** atrás de uma palavra.
3. **Escala:** a maior fonte ≥ 7vw a 1440; razão display/corpo ≥ 5,5; ≤ 5 tamanhos na página; ≤ 2 famílias.
4. **Título:** o H1 e todo H2 com ≤ 2 linhas a 1440, 768 e 390.
5. **Composição:** nenhum par de seções vizinhas com a mesma planta; nenhum split "texto | caixa" repetido; margens 72/72 medidas por `medida-margem.py` em todas as faixas (desvio 0 px).
6. **Imagem:** ≥ 4 renders da maquete na página (a meta é 12); nenhum texto sobre imagem; nenhum render isométrico.
7. **Teste de sobreposição** (§7.4, item 6) passa contra o jimo, o Prolibu e o v2.
8. **Teste do estranho em 5 s** com a 1ª tela de 390: a pessoa diz "um escritório de agentes de IA para empresa B2B, e quem aprova sou eu" e aponta o botão.
9. **No código:** `inspect.mjs` com **0 FAIL** em 1440/768/390 no build de produção (`--allow violet`, só isso), e todo WARN defendido numa frase; `lint.mjs` limpo.
10. **Notas-alvo:** taste ≥ 8,0 sem nenhum teto aplicado; Awwwards ≥ 7,2 (SOTD) no mock com o render adulto; FWA ≥ 70 depois da motion. Abaixo disso, a peça volta para mim, e não para remendo.

**Equilíbrio de fontes desta proposta:** QH (D1), ME (B1, D6), jimo (F6), Prolibu (A2) e a planta Belgrade da biblioteca da skill. O v1/v2 puxava do Prolibu duas vezes e do jimo na estrutura do tour; na v3 o jimo fica só no princípio do fragmento grande, e o tour deixou de ser palco preso.
