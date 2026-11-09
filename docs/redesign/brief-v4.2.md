# BrandUp: brief v4.2, "A noite tem gente"

Autor: ui-ux-director · 09/11/2026 · **emenda o `brief-v4.md` e o `brief-v4.1.md`**. O sistema de luz, o motor OGL, o formulário, o botão aprovado ("Núcleo", na variante de campo menta que está no ar) e o "You have the final word" continuam valendo.
Para: `frontend-studio` (§3 a §8; a ordem está no §9), `type-director` e `copy-director` (§8), `design-jury` (§10).

**Fora do escopo, porque já está em correção pelo frontend-studio:** a maquete de cabeça para baixo, a ordem dos rótulos da noite, a suavização e o limite de velocidade nos palcos, a vida ociosa das cenas e o loop dos bonecos no Blender (`render/v2/loop/`). Este brief **não redesenha** nada disso. Ele só se apoia no loop como destino de uma transição (§5.3).

**O que abri nesta sessão:**
- **O protótipo vivo** em `127.0.0.1:5180/proto.html`, no Playwright com chromium e webkit, a 1440×900 e a 390×844 e DPR 1:
  - a intro com `?intro=1`, fotografada aos 80, 250, 450, 650, 850, 1.100 e 1.500 ms;
  - a rolagem lenta (roda de 80 px a cada 40 ms, uma foto a cada meia tela) e a rápida (600 px a cada 30 ms);
  - fotos dirigidas de 9 pontos: a saída do formulário, o vão até a noite, o topo, o meio e o fim da noite, 80% e 97% do "sim", a saída do "sim" e o rodapé.
- **O código.** `proto.html` (a intro inline), `Proto.tsx` (o topo e a noite), `content.ts`, `proto.css` (a noite, o "sim" e o rodapé), os uniforms de `engine.ts` e de `shaders.ts`, e `public/favicon.svg`.
- **Os renders.** `render/v2/dawn-you.png`, `you-room-portrait.png`, `night-followup.png`, `desk-followup-1x1.png` e `office-night-master.png`.
- **A biblioteca.** `pensatori-irrazionali/d-14` (o wordmark do rodapé), `dribbble-qclay/38` (o "BIX" desbotado atrás do CTA) e `dribbble-qclay/31` (o título cortado na base).

**O que vi (é a base das decisões):**
- **A intro.** A base acende como **uma barra lilás contínua**, as arestas sobem, o corpo enche e **a seta entra em menta** (`#im`, padrão `#2FD08F`/`#E9FFF5` na linha 75 do `proto.html`). Em 1.100 ms ela ainda está menta, desbotando. O dono tem razão: o verde aparece como a cor da seta.
- **Da forma para a noite** (`T-1440-a/b`, `T-390-a/b`). Embaixo do formulário fica a linha do horizonte acesa. Depois vem **um vão escuro com o H2 da noite em cinza, solto**, antes de a grade aparecer. A passagem não diz nada: a linha some, e o título fica boiando sem cena.
- **A noite no fim** (`T-1440-e`, `T-390-e`). Tem o H2, uma fila de rótulos numa linha, 3 ou 4 feixes verticais tracejados e a grade quase invisível. É o que o dono descreveu. **Nenhum quadro tem um sinal de "noite" nem um sinal de "gente trabalhando".** Na rolagem rápida (`*-fast-night`), sobram pontos roxos espalhados.
- **O "All clear"** (`T-1440-g`, `T-390-g`). É um telefone vazio com uma frase no canto de cima e a rede apagada. É um anticlímax depois de três ordens encenadas.
- **O rodapé** (`T-*-i`). São 3 linhas de contato embaixo do horizonte do formulário final. Funciona, mas não é cena.
- **Achado lateral, não verificado.** Na rolagem lenta, nos dois motores a 1440, o `scrollY` saltou de 5.040 para 8.094 entre duas fotos, enquanto o meu contador de roda andou ~450 px. **O palco do "sim" inteiro passou entre duas fotos.** Pode ser a suavização em obra. **O frontend-studio confere** com o limite de velocidade novo.

**Equilíbrio de fontes.** As três últimas propostas puxaram do jimo. Esta não usa o jimo em nada: as fontes são a nossa marca (`favicon.svg`), os nossos renders e, para o rodapé, a Pensatori e a Qclay **transformadas**. Também descarto, de propósito, o único gesto do jimo que caberia no desfecho (§3, descartes).

---

## 1. Peça e objetivo

- **Quem é a pessoa.** É a mesma: o dono de uma indústria ou de um B2B australiano, vindo do Meta, **no celular**, com pressa e cético.
- **A tarefa dele nesta emenda.** Três coisas:
  1. Na entrada, sentir a marca em 1 s sem perder o H1.
  2. No meio, **entender de bate-olho, mesmo rolando rápido**, que o escritório trabalha de noite enquanto ele dorme.
  3. No fim do "sim", sentir que acabou e que está livre.
- **Métricas novas.**
  - **O teste dos 2 segundos (o critério principal).** Mostrar o pôster da noite por 2 s a 5 pessoas fora do projeto e perguntar "o que está acontecendo?". Passa com ≥ 4 de 5 dizendo, com as palavras delas, "gente ou robôs trabalhando de noite" **e** "o dono dormindo/em casa". O mesmo teste vale para um quadro aleatório da rolagem rápida.
  - **A seta da intro.** 0 pixel verde dentro da silhueta da seta em todos os quadros. A sonda lê o pixel e compara com `#9232EA`/branco.
  - **O verde.** ≤ 1,5% dos pixels de qualquer quadro, sempre como aura ou energia, **nunca** como preenchimento de forma da marca.
  - **As métricas do v4.1 continuam:** LCP ≤ 2,0 s, o formulário utilizável antes do motor e nenhuma tela com < 4% de pixel aceso entre o hero e o final.

## 2. Conceito (uma frase)

**"A luz que sobe é gente trabalhando: na abertura, ela nasce de muitos pontos de baixo e vira a seta; de noite, ela sai dos monitores de seis figuras enquanto você dorme; e, quando nada mais espera por você, ela sobe toda de uma vez."**

O que esta emenda acrescenta à tese "o trabalho é luz":
- **A luz ganha rosto.** A noite passa a ter **figuras feitas da mesma luz pontilhada**: as mesmas figuras de resina da maquete, só que em pontos.
- **O verde ganha papel fixo:** é a **energia que empurra a luz**. Fica na frente da luz que sobe, em volta do que espera a sua ação. Nunca é cor de forma.

---

## 3. Movimentos escolhidos (4) e descartados

| # | Código | Captura que prova (aberta) | Porquê aqui | O que muda em relação à fonte | Custo |
|---|---|---|---|---|---|
| 1 | **E8: a abertura que entrega a marca** (refeita) | A entrada E8 do repertório e a nossa intro atual (`S-*-intro`, 7 quadros por motor). Não há captura de terceiros | Item 1 do dono | Na fonte (o P do Produzze) e na v4.1, **uma forma** aparece e voa. Aqui, **muitos pontos da base acendem juntos e convergem num feixe**: o feixe é a haste da seta, ele abre a ponta da seta e sai pelo ápice, e o triângulo roxo é o rastro dessa convergência. É o logo **montado pelo trabalho**, e não desenhado | $ |
| 2 | **E2: desmontar a cena para virar a próxima** | `qclay-kurate/d-00→01` e `qclay-home/w-04→05`, abertos na v4.1 e citados no repertório. **Nesta sessão não reabri as capturas, só o repertório.** A prova do nosso lado é `T-1440-a/b` (a passagem que falta) | Item 2: as passagens hoje cortam, e não transformam | Na Qclay, um objeto vira **outro objeto** (as polaroides viram painéis, o dashboard vira celular). Aqui, quem atravessa é **a luz com papel no sistema**: o horizonte do formulário vira o horizonte da noite (o pôr do sol); as figuras de pontos viram as figuras de resina da maquete (o amanhecer). Não há objeto encolhendo; há uma luz que muda de função | $$ |
| 3 | **C9b: a figura feita da mesma luz** (variante nova de C9, proposta ao repertório) | Os nossos `night-followup.png` e `desk-followup-1x1.png` (a figura de resina sentada, com o abajur e dois monitores) e `office-night-master.png` | Item 3: o dono pediu "bonequinhos" que expliquem a noite de bate-olho. Uma pessoa sentada sob um abajur aceso, ao lado de uma lua, quer dizer "trabalhando de noite" em qualquer cultura | Nas fontes, a figura é um **render 3D com luz quente**. Aqui ela vira **pictograma de perfil em pontos quadrados**, quantizado no mesmo Bayer da página. O monitor é a única parte acesa, e **é dele que sai o feixe de cada tarefa** (lei 1: toda luz é um portador). Não é mascote: não tem rosto, não fala e não tem balão. A pose sai do rig do Blender, então é a mesma figura da maquete que vem a seguir | $$ (um atlas de sprites tirado do Blender) |
| 4 | **B8 + F5: o fim rima com o começo** (rodapé) | `pensatori-irrazionali/d-14` (o "PENSATORI" gigante com script por cima); `dribbble-qclay/38` (o "BIX" desbotado atrás do CTA); `dribbble-qclay/31` (o título cortado na base) | Item 5: um rodapé de marca que feche a história | **As três fontes usam a PALAVRA gigante. Aqui não há palavra gigante:** o que fica cortado pela base da página é **o triângulo do logo nascendo como um sol no horizonte**, em pontos, e a seta branca subindo dentro dele no último gesto da rolagem. Rima com a intro (lá, a seta nasce dos pontos da base; aqui, ela nasce do chão da página) e com o amanhecer da noite | $ |

**Soma de custo:** $ + $$ + $$ + $. **Nenhum $$$ novo.** O motor e o loop do Blender já estão pagos. O único asset novo é um atlas de sprites com ≤ 8 KB, que sai do rig do Blender em minutos (§7).

**O desfecho do "sim" (item 4) não é um movimento novo.** Ele é a lei 7 do v4 ("a luz sobe com o sim") na escala máxima, com a peça-assinatura (o botão aprovado) emprestando a energia dela ao telefone. Está no §6.

### Descartados

| Ideia | Porquê não |
|---|---|
| **F7, a luz vira o ponto final da frase** (o telefone encolhe e vira o "." de "You have the final word.") | É o gesto do jimo (`w-08→w-12`), e a v4.1 §4.11 escreveu "nunca vira pontuação". Seria tentador e seria cópia |
| **O prédio à noite visto de fora** (fachada com janelas acesas) | Pede um render novo (o único $$$ possível). Também vira a terceira imagem de "escritório" seguida, logo antes da maquete. A figura de pontos diz o mesmo com 8 KB |
| **Reusar o loop do Blender na noite** | O loop é a cena do escritório. Pô-lo também na noite apaga a diferença entre as seções: a noite é **o turno** (o que fazem), o escritório é **quem são e quando entram** |
| **Céu em degradê noturno, estrelas, aurora** | É luz ambiente, que quebra a lei 1 do v4, e é o "glow de SaaS de IA". A lua entra **só** porque carrega a hora: é o ponteiro (§5.2) |
| **"zZ" ou emoji de sono** | É emoji como ícone, a lista anti-slop do dono. O sono se lê pela figura deitada e pelo telefone virado |
| **Relógio grande contando de 18:00 a 08:00** | É o "Day N a 88 px" que o júri reprovou (§6, item 9). A hora fica em mono pequeno, sob a lua |
| **Balões de fala nas figuras da noite** | A conversa entre as mesas é a cena do escritório. Repetir seria a mesma planta duas vezes |
| **O wordmark "BrandUp" gigante no rodapé** | É a composição exata de PI `d-14`, DR-31 e DR-38. Seria sobreponível |
| **Mergulho de câmera (E7) da noite para o escritório** | É do jimo, e a regra do E7 diz "não usar com tráfego de celular pago" |
| **O verde como a cor da seta, do triângulo ou do feixe** | O dono vetou: o verde não é da logo |

**Brigas conferidas:**
- **A1 × A5:** não se aplica.
- **B3 × C2:** não há pareamento por choque nem cor por seção.
- **D7 × A4:** não há foto sobre a grade. Na noite, a grade vira **chão** das figuras, e não textura.
- **Briga interna:** o logo agora se monta em 3 lugares (a intro, o FAQ→final e o rodapé). A regra: **na intro ele se monta (pontos que convergem); no final, ele se completa (as respostas, em 22vh); no rodapé, ele nasce cortado pelo chão (só o topo, gigante).** São três escalas, três gestos e três plantas. Se o júri ler repetição, o rodapé perde primeiro.

---

## 4. Item 1: a INTRO, "a base acende e vira a seta"

**Princípio.** A seta é o logo, então tem a cor do logo: o corpo `#9232EA` e o recorte branco (`favicon.svg`: o triângulo 20,5 · 35,33 · 5,33; a ponta 20,13 · 26,22 · 14,22; a haste x 17,5–22,5, y 21–30, raio 2,5). O verde aparece **só como energia na frente da luz que sobe**: ele "contamina" o triângulo de baixo para cima e vai embora pelo ápice. O desenho segue a ideia do dono: **vários pontos na base acendem ao mesmo tempo e formam o feixe que sobe.**

**Composição.**
- **1440.** A área da rede, à direita (c6–c12). O triângulo tem 78vh de altura, com o ápice no vértice da rede do hero. O H1, o apoio e o CTA ficam em c1–c6 e estão pintados desde o 1º quadro.
- **390.** A metade de baixo (y 380–800), com 330 px de base e centrada. O H1 fica em y 104–190 e o CTA em y 253–305, intocados.

**Quadro a quadro (1440; a 390, os mesmos tempos com 9 pontos):**

| t (ms) | Quadro | Técnica |
|---|---|---|
| 0 | O escuro, com o H1, o apoio e o CTA legíveis. Nada à direita | — |
| 0–80 | Nada se move: o olho encontra o H1 primeiro | — |
| 80–200 | **A base acende.** 13 pontos (9 a 390) acendem **quase juntos**, com defasagem aleatória fixa de 0–60 ms. Ficam ao longo da futura base, com espaçamento irregular (±20%), em `#FBF7FF`, como quadrados de 4 px. **Em volta de cada ponto nasce a energia verde:** um halo **pontilhado, de borda dura**, com 2 níveis de Bayer `#58F6B1` a 40%/15% e raio de 10 px, que pisca em `steps(3)` (energia, não glow). Substitui a barra lilás contínua de hoje | um `<g>` de pontos (`opacity`) e um `<g>` de auras (`opacity` + `transform: scale`) |
| 200–520 | **A convergência.** Cada ponto corre na diagonal até o pé da haste (20,30), deixando um **rastro roxo pontilhado** (`#9232EA` com Bayer em `#7A22CF`). Os rastros juntos **preenchem o corpo do triângulo de baixo para cima**: o roxo é o caminho do trabalho. **A frente da subida carrega o verde**: uma faixa de 6–10 px de aura verde na borda superior do preenchimento, o "contágio" que sobe | o corpo roxo revelado por `clip-path: inset(100% 0 0 0 → 0)` com `cubic-bezier(.45,0,.2,1)`; a faixa verde é um `<rect>` com padrão, preso à mesma borda (`transform: translateY`, a mesma curva) |
| 520–700 | **O feixe.** Os pontos se juntam no pé da haste e viram **um feixe branco** que **sobe pela haste e abre a ponta da seta**. O recorte branco se revela de baixo para cima, em branco `#FFFFFF` com o miolo `#FBF7FF`. A aura verde fica **só nas bordas laterais da frente do feixe** (2 px), nunca dentro da seta | a seta por `clip-path` de baixo para cima (180 ms, linear), e um `<rect>` estreito de feixe em `translateY` |
| 700–820 | **Saída pelo ápice.** O feixe passa pelo ápice e **sai pelo topo da tela** como uma coluna de 6 px que se apaga em `steps(3)`. **O verde vai embora com ele.** Fica o logo inteiro, roxo e branco, em pontos | a coluna em `translateY(-100vh)` + `opacity` |
| 820–1.180 | **A entrega.** Igual à v4.1. A 1440, o triângulo encolhe e se dissolve em degraus (`steps(4)`) dentro do pôster da rede, e um logo chapado de 30 px nasce no ápice e voa até o header em 360 ms (`cubic-bezier(.65,0,.35,1)`). A 390, o logo do header aparece por opacidade em 200 ms (o voo cruzaria o H1) | o que já existe |
| 1.180 | A intro sai do DOM | `animationend` → `remove` |

**Total ≤ 1,2 s**, como na regra E8.

**Regras que continuam:**
- Qualquer `pointerdown`, `keydown`, `wheel` ou `touchstart` pula para o último quadro em 150 ms.
- O botão "Skip intro" aparece só no foco de teclado.
- Não há intro na 2ª visita da sessão, com reduced motion, com `Save-Data` ou com `?gl=0`.
- **A sonda nova:** em 7 quadros de 80 a 1.180 ms, 0 pixel com matiz verde (h 140–165°, s > 40%) **dentro da máscara da seta**. A aura verde só pode existir até 820 ms.

**Peso:** + ~1 KB no SVG inline (13 caminhos de ponto e 1 padrão verde). Sai o padrão `#im` da seta.

**O que aconteceu (a régua):** "pontos acenderam embaixo, subiram juntos, viraram a seta da marca e foram para o topo."

---

## 5. Itens 2 e 3: a NOITE redesenhada, e as passagens

### 5.1 Diagnóstico em uma linha
A cena atual explica o **mecanismo** (a crista, os feixes, o registro), mas não o **significado**. Ela não mostra quem está trabalhando, que é de noite, nem que você está dormindo, e depende de a pessoa assistir à rolagem inteira.

### 5.2 A solução: "o turno da noite", uma cena legível em qualquer quadro
**A regra que resolve a rolagem rápida.** A composição está **completa e legível desde o 1º quadro do palco**:
- as 6 figuras trabalhando;
- a lua com a hora;
- você dormindo em casa.

A rolagem só faz o **tempo passar** (a lua anda, as tarefas acontecem, amanhece). Quem passa rápido vê um pôster que já diz tudo; quem passa devagar vê a noite acontecer.

**Os quatro elementos:**

1. **As 6 figuras (C9b).**
   - **Pose.** São pictogramas de perfil das figuras de resina, sentadas, com a mesa, o abajur e o monitor, em pontos quadrados de 2 px CSS no Bayer da página. Medem 72 px de altura a 1440 e 48 px a 390, sobre a grade, que **vira o chão do escritório** (a grade continua, agora com função: as mesas ficam sobre nós da grade).
   - **Luz.** O corpo fica em `ink` a 35%. **O monitor é a única parte acesa**, em `light-hot` sobre `light-deep`, e o abajur, em `light-hot` a 50%.
   - **Rótulos.** Sob cada figura vai o nome do agente (os 6 de `content.agents`, na ordem da base do hero) e, embaixo do nome, **a última tarefa feita** em mono: `02:14 · quote sent`. A tarefa nova fica a 100% e as anteriores a `ink-2`.
2. **A tarefa acontecendo** (a crista continua, agora com causa). Quando a crista passa sob uma mesa, a figura **faz o gesto**: um sprite de 3 quadros (digitar e enviar), em 360 ms. O monitor clareia um quadro, e **um ponto sai do monitor e sobe** num feixe curto, de 1 vez a altura da figura, que se apaga no alto. A linha de tarefa sob o nome troca. **Os feixes nascem dos monitores, e não do chão** (lei 1).
3. **A lua é o ponteiro.**
   - **Forma.** Um crescente de pontos, com 36 px a 1440 e 26 px a 390, borda dura, sem halo.
   - **Trajeto.** Faz um arco por cima do palco, da esquerda (18:00) para a direita (08:00), ligado à rolagem.
   - **A hora.** Sob a lua, a hora em mono a 15 px. **Ela substitui o rótulo de hora que hoje anda com a crista**: um relógio só.
   - **O fim.** No último décimo, a lua sai pela direita e o **horizonte do fundo acende** (o amanhecer, §5.3).
4. **Você, em casa (o contraste que faz a frase).**
   - **A planta.** Um bloco separado do escritório por um fio vertical hairline (alpha .08), com dois rótulos de lugar em mono: "Office" e "Home".
   - **O desenho.** Em Home, a figura **deitada** (o mesmo pictograma, 35% `ink`, nada aceso) e, no criado-mudo, **o telefone virado**, escuro.
   - **O desfecho da noite.** No evento de 07:58, **o telefone acende** e ganha a **aura verde de energia** (o mesmo campo do botão aprovado, pontilhado, raio de 12 px). É a única dose de verde da seção. Embaixo, em mono: "1 waiting". **Esse é o pedido que vai aparecer no "sim"**: a noite deixa a história engatilhada.

**O que sai:**
- a fila de rótulos numa linha no alto: o registro passa a ficar **sob cada figura**, perto da causa;
- os feixes tracejados longos sem origem;
- o rótulo de hora preso na crista.

**O que fica:**
- o H2 com o K3 (as palavras acendem com a crista), que continua sincronizado com a lua;
- a grade, agora como chão;
- a crista;
- o palco de 1,4 tela a 1440 e de 1,2 a 390.

**O ritmo das 10 tarefas** (`content.night.labels`, na ordem já corrigida pelo studio): cada uma é atribuída a uma das 6 mesas (o `copy-director` faz a tabela). Duas mesas trabalham mais de uma vez, e **toda mesa trabalha ao menos uma vez antes de 03:00**, para que, na rolagem rápida, nenhuma figura pareça parada.

**A vida ociosa:** o studio já está fazendo a das cenas. Aqui, as figuras **sem tarefa no momento** têm só o monitor tremeluzindo 1 nível de Bayer a cada 2–4 s, defasado. **Não balançam o corpo.**

### 5.3 As passagens (item 2), ligadas ao sistema de luz

| # | Passagem | O que acontece | O que a pessoa consegue dizer | Técnica |
|---|---|---|---|---|
| T1 | Hero → formulário | **Sem mudança** (a rede cai e vira o chão do formulário; aprovada) | — | — |
| **T2** | **Formulário → noite: "o pôr do sol"** | (a) Na saída do formulário, **a linha do horizonte sob o botão desce mais devagar que o conteúdo** (paralaxe 0,6) até virar **o horizonte do fundo da grade da noite**. (b) No caminho, **esfria em 4 degraus de dither**, do `light-core` ao `light-deep`: o dia acabando. (c) Quando ela assenta no fundo da grade, **um aglomerado de pontos se solta da ponta esquerda dela e sobe: é a lua**, já com "18:00" embaixo. (d) A grade **se desenrola do horizonte para perto**, de fileira em fileira (de longe para perto, `steps`). (e) As 6 figuras **acendem os monitores em sequência**, da esquerda para a direita, em 60 ms cada: o turno começa. **O vão cinza de hoje some:** o H2 da noite só entra quando o horizonte chega (o K3 começa ali) | "Acabou o dia, a lua subiu e eles ligaram os monitores" | `uHz` passa a ter um 2º alvo (o y do horizonte da grade), com interpolação pela rolagem; a lua é DOM/SVG com `transform`; o desenrolar é `uGridOn` por fileira (um uniform de corte em z) |
| **T3** | **Noite → escritório: "o amanhecer"** | Às 07:58, depois que o telefone de casa acende, a lua sai pela direita e o horizonte do fundo **acende de novo, agora quente** (`light-hot` → `light-core`): o mesmo horizonte do pôr do sol, voltando. **As 6 figuras de pontos se desfazem e os pontos voam até as posições das mesas na maquete** (`desks.json` → `uDesk`). Quando chegam, a maquete noturna aparece e **cada mesa onde um ponto pousou acende**. As figuras de pontos "viram" as de resina | "Amanheceu, e os bonequinhos eram os do escritório" | os pontos das figuras saem de um `GL_POINTS` (ou de um DOM recortado → posições no motor); os destinos são os centros de monitor do `desks.json`, já mapeados no `uDesk` |
| T4 | Escritório → o sim | Na fase de dia, **a mesa follow-up solta um ponto** que sobe e sai pelo topo da tela; no começo do palco do sim, **ele entra por baixo pelo fio do follow-up** (é a ordem 1 do roteiro, §4.5 da v4.1). Uma luz só atravessa a costura | "A primeira ordem saiu dali" | `uTrav` já existe; aqui ele começa um pouco antes, na saída do escritório |
| **T5** | **O sim → perguntas: silêncio** | Depois do desfecho (§6), **0,3 tela de escuro limpo**: só o telefone bloqueado recuando e os agentes respirando no ocioso. Nada entra | "Pronto, acabou" | A3 (cheio/vazio). É o respiro que o clímax pede |
| T6 | Perguntas → final | Sem mudança (as respostas montam o logo) | — | — |
| T7 | Final → rodapé | O horizonte do formulário final **é o chão** onde o triângulo do rodapé nasce (§7) | "O logo nasceu daquele chão" | §7 |

**Reduced motion / sem WebGL.**
- **T2 e T3 não acontecem.** As seções aparecem em estado final:
  - o horizonte parado sob o formulário;
  - a noite como pôster, com a lua em 02:14, as figuras com a tarefa escrita e o telefone virado;
  - a maquete do escritório como já está.
- **T4 não acontece.**
- **T5 continua**, porque é só espaço.

### 5.4 Wireframes da noite

**1440 (12 colunas, gutter 24, margem 64; palco preso de 1,4 tela). O quadro em p ≈ .45, às 02:14:**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ c1–c6                                            ·  ◖ (lua, arco c5→c12)       │
│ While you sleep,                                    02:14  (mono 15)           │
│ the office works.   (K3, acende com a lua)                                     │
│                                                                                │
│                                                  │                             │
│  ─ ─ ─ ─ ─ ─ horizonte (light-deep) ─ ─ ─ ─ ─ ─ ─│─ ─ ─ ─ ─ ─ ─                 │
│   . . . . . . . . . . . . . . . . . . . . . . . .│  Home (mono 12)             │
│   ▪▖[▣] ▪▖[▣] ▪▖[▣]   (fila de trás, 56 px)      │                             │
│   Follow-up Bookkeeper Ad manager                │                             │
│   02:14·quote 21:30·PO  23:05·cap                │      ▭ (telefone virado)    │
│     ↑ feixe curto do monitor                     │   ▬▬▬▬▬▬ (figura deitada)    │
│  ▪▖[▣]   ▪▖[▣]   ▪▖[▣]  (fila da frente, 72 px)  │                             │
│  Social   Reception Analyst                      │                             │
│  03:10·review 18:40·enquiry  —                   │                             │
│   . . . . . . grade = chão (c1–c9) . . . . . . . │  c10–c12                    │
└──────────────────────────────────────────────────────────────────────────────┘
```
As figuras ficam em 2 fileiras de 3, em perspectiva (a de trás a 78% da escala), sobre nós da grade, em c1–c9. Home fica em c10–c12, depois do fio.

**390 (4 colunas, gutter 16, margem 20; palco de 1,2 tela) — peça própria, não um 1440 espremido:**
```
┌──────────────────────────┐
│ While you sleep,         │ y 72
│ the office works.        │
│                  ◖ 02:14 │ lua no arco curto, x 200→370, y 170–230
│ ─ ─ horizonte ─ ─ ─ ─ ─  │ y 250
│ Office                   │
│  ▪▖▣    ▪▖▣    ▪▖▣       │ 3 colunas de 116 px, figuras de 48 px
│ Follow  Books  Ads       │ nomes curtos (a definir no copy)
│ 02:14·q 21:30  23:05     │
│  ▪▖▣    ▪▖▣    ▪▖▣       │
│ Social  Recep  Analyst   │
│ 03:10   18:40   —        │
│ ──────────────────────── │ fio hairline horizontal
│ Home      ▬▬▬▬  ▭        │ figura deitada + telefone; y ≈ 720–800
│           1 waiting (07:58)
└──────────────────────────┘
```
**O que muda a 390:**
- o fio entre Office e Home fica **horizontal**;
- as figuras vão em grade 3×2 **sem perspectiva** (mais legível no tamanho pequeno);
- a grade fica só como chão sob as duas fileiras;
- a lua anda num arco curto no canto de cima à direita.

**Estados:**
- **Carregando (antes do motor):** o pôster com a mesma composição. As figuras são DOM, então já estão lá.
- **Contexto perdido:** fica o pôster.
- **Sem JS:** o pôster e a lista sr-only.
- **Reduced motion:** o pôster em 02:14.

---

## 6. Item 4: o desfecho do "sim", "expediente encerrado"

**O que existe:** depois da ordem 3 (recusada), o telefone mostra "All clear. Nothing is waiting for you." no canto e a rede apaga.
**O que precisa dizer:** "acabou, e o sistema segue sem precisar de você". É a liberdade, e é o momento de maior escala da luz na página.

**O roteiro** (dentro do palco atual: o trecho p .86–1,00 passa a ter 0,4 tela a mais; o palco vai de 2,6 a 3,0 telas a 1440 e de 2,2 a 2,5 a 390):

| p / tempo | Quadro | O que quer dizer |
|---|---|---|
| .86 (limiar, com histerese de ±.01) | **Os 6 fios acendem juntos pela 1ª vez na seção.** Cada agente solta um ponto, e os 6 correm pelos fios até o pé do telefone (ligado à rolagem, .86–.90) | "todo mundo terminou" |
| .90 → no tempo, 500 ms | **A energia verde envolve o aro do telefone.** É o mesmo campo pontilhado do botão aprovado (`uAct`/`uActP`, a mesma técnica), agora no retângulo do telefone, com alcance de 14 px. É o "contágio" da intro, em outra escala | "pronto para subir" |
| + 600 ms | **A tela do telefone se enche de baixo para cima** com o material do botão (a seda em 4 níveis do `?btn` em uso, com o rótulo escondido), e **uma coluna de luz da largura do telefone sobe dele e sai pelo topo da tela** em 850 ms, `1−(1−t)²`. É a subida da lei 7 **na maior escala da página**. A aura verde vai embora com a coluna | "saiu tudo" |
| + 900 ms | **Tela bloqueada.** A tela vira o escuro do telefone com: a hora grande ("08:04", display tabular, ~56 px a 1440 e 44 px a 390, centrada no terço de cima da tela); o status em 2 linhas ("All clear." / "Nothing's waiting for you.", texto 18 px); e uma linha mono de resumo (`2 sent · 1 declined`). As duas metades do H2 ficam a 100%. Os agentes voltam ao **ocioso** (a vida ociosa do studio) com os fios a 15%, e **pontos continuam correndo pelos fios de vez em quando, mas param nos cérebros e não chegam ao telefone** | "o trabalho continua; nada chega até você" |
| 1,00 → saída | T5: o silêncio de 0,3 tela. O telefone recua (`scale` 1 → .92, `opacity` → .6) | — |

**Regras:**
- **Rolagem rápida:** a máquina de estados do v4.1 **recupera em sequência**. O desfecho toca inteiro, a no máximo 2× a velocidade, mesmo se a pessoa passar direto.
- **Voltar a rolagem** volta ao estado da ordem 3 sem tocar a coluna ao contrário.
- O `aria-live` diz o status uma vez ("All clear. Nothing's waiting for you. Two sent, one declined.").
- **Reduced motion:** a tela bloqueada já pronta no 3º telefone do fallback (esperando · enviado · tudo em ordem). O "recusado" continua descrito no texto.

**O verde aqui:** ≤ 600 ms e só no aro. O botão e o aro são o mesmo material, e é essa a rima.

**Wireframe 1440 / 390 (o quadro final):**
```
1440                                              390
┌───────────────────────────────────────────┐    ┌─────────────────────┐
│               ┌───────────┐               │    │ You have the        │
│ You have      │   08:04   │ the final     │    │ final word.         │
│               │ All clear.│ word.         │    │    ┌───────────┐    │
│               │ Nothing's │               │    │    │   08:04   │    │
│               │ waiting…  │               │    │    │ All clear.│    │
│               │2 sent·1 dec│              │    │    │ 2 sent·1… │    │
│               └─────┬─────┘               │    │    └─────┬─────┘    │
│         ·  ·  · fios 15% ·  ·  ·          │    │   · · fios 15% · ·  │
│      ◦ cérebro   ◦ cérebro   ◦ cérebro    │    │  ◦     ◦     ◦      │
│   ◌    ◌    ◌    ◌    ◌    ◌  (6 agentes) │    │ ◌ ◌ ◌ ◌ ◌ ◌ (350px) │
└───────────────────────────────────────────┘    └─────────────────────┘
```

---

## 7. Item 5: o rodapé, "o sol da marca"

**Conceito.** A página termina como a noite terminou: **amanhecendo**. Do horizonte do formulário final, um **triângulo gigante do logo nasce cortado pela base da página**, como um sol. Aparecem só o ápice e a ponta da seta (~38% da altura do triângulo), em pontos (o corpo em dither roxo; a seta, que é "trabalho", em `light-core`, nunca o roxo chapado: a regra 5 do v4 continua). **No último gesto da rolagem, a seta branca sobe 6% dentro do triângulo e assenta.** É o "Up" da marca sem escrever "Up".

**Composição 1440 (12 colunas):**
```
┌──────────────────────────────────────────────────────────────┐
│ ── horizonte do final (continua) ─────────────────────────── │
│ c1–c3 contato (mono)   c5–c8 a linha viva     c10–c12 legal   │
│ hello@…                Sydney 21:14 ·          Privacy policy │
│ 02 5550 1234           [agentes] on shift      © 2026 BrandUp │
│ ABN …                  (mono 13, ink-2)        illustrative…  │
│                         ▲ (ápice, centrado, c6–c7)            │
│                       ▞▞▞▞▞  ← ponta da seta (light-core)     │
│                    ▞▞▞▞▞▞▞▞▞▞▞                                │
│              ▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞▞  (base fora da página)    │
└──────────────────────────────────────────────────────────────┘
```
- **A altura do rodapé:** ~56vh a 1440 e ~70vh a 390. A base do triângulo tem 150% da largura da tela, e o corte é a borda de baixo do documento.
- **A linha viva** (o único dado novo). É a **hora real de Sydney** (`Intl.DateTimeFormat`, `Australia/Sydney`), atualizada por minuto, com a frase do turno. Fecha a noite: "eles estão trabalhando agora". O `copy-director` decide a frase. O número de agentes, se aparecer, é ilustrativo e cai sob a nota "illustrative" que já existe.
- **Desktop.** Os pontos do triângulo **abrem caminho para o ponteiro** (`uPtr`, que já existe) num raio de 40 px. É a única interação, e é sutil.
- **390.** O contato empilhado no alto, alvos ≥ 44 px (como hoje). O triângulo começa em ~55% da altura do rodapé e corta na base; a linha viva fica entre o contato e o ápice.

**Técnica.**
- **SVG inline com os padrões `dot-body`/`dot-core` que já existem** (sem WebGL, então funciona em qualquer estado), ≤ 2 KB.
- **A subida da seta:** um `transform` ligado aos últimos 240 px de rolagem (ticker; `animation-timeline: scroll()` só como melhoria, porque o suporte no Safari não foi verificado).
- O fundo do rodapé deixa de ser `ground` sólido por cima do canvas: fica transparente onde está o triângulo.

**Estados.**
- **Reduced motion:** o triângulo parado, com a seta já assentada.
- **Sem JS:** o SVG estático; a linha viva some (ela depende de JS) e o resto fica.

---

## 8. Pedidos

### 8.1 Ao type-director (papéis)
- **A hora da tela bloqueada** (§6): display tabular, ~56/44 px, peso 400. É a única hora grande da página, e por isso é desfecho, não contador.
- **O mono da noite:** a hora sob a lua (15 px), as tarefas sob as figuras (12 px, tabular) e os rótulos "Office"/"Home" (12 px, caixa alta com tracking +.08em ou caixa baixa, você decide). **Lc ≥ 60 a 100% e ≥ 45 em `ink-2`** a 12 px, medido em webkit.
- **A linha viva do rodapé:** mono 13, com a mesma voz.
- Nenhuma família nova.

### 8.2 Ao copy-director (função e tamanho; o texto é seu)
| Bloco | Função | Tamanho |
|---|---|---|
| Os nomes das 6 figuras | Os mesmos 6 agentes; **versão curta para 390** | ≤ 10 caracteres |
| As tarefas da noite | Redistribuir as 10 tarefas de `night.labels` pelas 6 mesas (tabela mesa → tarefas, hora e verbo no passado) | ≤ 3 palavras + hora |
| "Office" / "Home" | Os rótulos de lugar | 1 palavra cada |
| Telefone em casa, 07:58 | O que espera por você (engata o "sim") | ≤ 3 palavras |
| A tela bloqueada | "All clear." / "Nothing's waiting for you." (o dono gostou: manter o sentido) + a linha de resumo | 2 linhas + ≤ 5 palavras |
| O `aria-live` do desfecho | A descrição falada | 1 frase |
| A linha viva do rodapé | "Sydney [hora]" + a frase do turno, honesta | ≤ 6 palavras |
| O `sr-only` da noite | Atualizar o `night.aria` para citar as figuras e o dono em casa | 1 frase |

### 8.3 Ao frontend-studio (motion com a frase, peso e fallbacks)
- **Cada movimento tem a frase de "o que aconteceu"** escrita nas tabelas acima. Se a frase não couber, o movimento sai.
- **O orçamento novo (celular, comprimido):**
  - o atlas de figuras ≤ 8 KB (PNG indexado de 4 cores: 6 agentes × 3 quadros + a figura deitada, em 2 escalas);
  - a lua e o Home em SVG inline ≤ 2 KB;
  - a intro + 1 KB;
  - o rodapé ≤ 2 KB.
  - **Nada de JS novo de biblioteca.**
- **O atlas.** Sai do rig do loop (`render/v2/loop/loop_rig.py`): a câmera ortográfica de perfil, Workbench, silhueta + máscara do monitor, 3 poses. Depois passa pelo nosso Bayer offline (como o `?tile` da seda). **Se o Blender estiver ocupado com o loop**, a alternativa é desenhar as silhuetas em SVG com as proporções do `desk-followup-1x1.png`, marcadas como "em avaliação".
- **As figuras são DOM** (com `image-rendering: pixelated`), posicionadas pelo motor via `projectGrid` **só por `transform`**, como os rótulos de hoje. Por isso existem também no pôster e sem WebGL.
- **O verde** nunca entra em `fill` de forma da marca. A sonda mede a % de pixel verde por quadro (≤ 1,5%) e a ausência dele dentro da seta da intro.
- **Em avaliação** (o dono avalia vendo; tudo barato de remover): a franja âmbar no horizonte do amanhecer (T3), atrás de `?dawn=0`, e a interação do ponteiro no rodapé, atrás de `?footptr=0`.

---

## 9. Ordem de implementação (frontend-studio)

**Começar só depois de fechar o pacote em curso** (a maquete, os rótulos, a suavização, a vida ociosa e o loop), na mesma árvore e sem dois agentes ao mesmo tempo.

1. **P0 · A intro sem verde na seta e com a base acendendo** (§4). Fica isolada no `proto.html` e não toca o React. **Verificar:** a sonda de pixel verde na máscara da seta, os 7 quadros em chromium e webkit a 1440 e a 390, o pular, o reduced motion e a 2ª visita.
2. **P0 · A noite, "o turno"** (§5.2, §5.4): o atlas (ou o SVG provisório), as 6 figuras DOM sobre a grade, a lua-ponteiro, o Home com o telefone e a remoção da fila de rótulos e do rótulo da crista. **Verificar:** o teste dos 2 segundos no pôster e num quadro da rolagem rápida; Lc dos textos mono em webkit.
3. **P1 · T2, o pôr do sol** (§5.3): o horizonte do formulário vira o da noite, e a lua se solta dele. Depende do 2.
4. **P1 · O desfecho do sim** (§6): os 6 fios, a energia no aro, a coluna, a tela bloqueada e a extensão do palco. **Verificar:** a rolagem rápida (toca inteiro), a volta da rolagem (sem tocar ao contrário) e o `aria-live`.
5. **P1 · T3, o amanhecer** (§5.3): as figuras de pontos voam para as mesas da maquete. Depende do 2 e do loop pronto.
6. **P2 · O rodapé, o sol da marca** (§7).
7. **P2 · T4 e T5** (a ordem que atravessa e o silêncio).

**Depois de cada passo:** fotos em chromium e webkit a 1440 e a 390, rolando devagar e rápido, com `?gl=0` e com reduced motion. **O júri entra só depois do 5.**

---

## 10. Para o design-jury (o que mudou na régua)
- **O teste dos 2 segundos na noite** passa a ser item eliminatório (§1).
- **O teste de sobreposição** contra PI `d-14`, DR-31 e DR-38 (o rodapé): não pode haver palavra gigante cortada.
- **O verde:** nunca como forma da marca; ≤ 1,5% por quadro.
- **A briga interna do logo em 3 lugares** (§3): ler se é rima ou repetição.

## 11. Riscos
- **Safari/WebKit.** O `clip-path` animado em SVG (já usado na intro de hoje e verificado). O `image-rendering: pixelated` nas figuras: conferir o serrilhado a DPR 3. O `animation-timeline` não foi verificado no Safari 26, então o ticker é a base.
- **Celular.**
  - O palco do sim cresce 0,4 tela; o T5 soma 0,3. **A página fica ~0,7 tela mais longa** a 1440 e ~0,6 a 390. Compensa: a noite não cresce, e a fila de rótulos sai.
  - As figuras a 48 px precisam de leitura a DPR 2–3. **O nome é obrigatório sob cada figura**, porque a silhueta sozinha não basta a 390.
- **Peso:** ~13 KB a mais no total, sem requisição nova no caminho do LCP (o atlas é lazy, carregado na aproximação da noite).
- **Acessibilidade.**
  - O verde piscando na intro fica em `steps(3)` a < 3 Hz e por < 700 ms.
  - A coluna do desfecho é um evento único, e não flash: muda de luminância numa área < 25% da tela.
  - Tudo tem `aria-hidden` com o `sr-only` atualizado.
- **A produção do asset.** O atlas disputa o Blender com o loop. Há a alternativa em SVG desenhado (§8.3).
- **A rolagem que salta** (o achado do cabeçalho, não verificado): se o `scrollY` estiver pulando um palco inteiro, nenhum desfecho aparece. É o primeiro a confirmar no passo 4.
- **O logo em 3 lugares:** risco de leitura repetitiva (§3, as brigas).
