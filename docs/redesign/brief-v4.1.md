# BrandUp: brief v4.1, "A rolagem aprova"

Autor: ui-ux-director · 09/11/2026 · **emenda o `brief-v4.md`** (o sistema de luz, a paleta, o motor OGL, o formulário e os fixos de negócio continuam valendo). Responde aos 9 pontos do dono (áudio de 09/11, visto "por alto") e incorpora o `juri-v4.md` (Awwwards 6,80 · Dev 6,56 · FWA 63).
Para: `frontend-studio` (§3 a §6, a ordem em §8), `type-director` e `copy-director` (§7), `design-jury` (§9).

**O que abri nesta sessão:**
- **O protótipo vivo.** `proto.html` na porta 5180, com o Playwright em chromium e webkit, a 1440×900 e a 390×844. Rolei a página inteira em passos de meia tela (22 quadros a 1440 e 24 a 390), fotografei aos 150 ms da carga, abri e fechei o FAQ e medi o `CSS.supports` do `interpolate-size` e do `::details-content`.
- **O código.** `Proto.tsx`, `proto.css`, `main.tsx`, `content.ts`, `domScenes.ts`, `engine/engine.ts` (as cenas e a máscara de escuro) e o início de `engine/shaders.ts`.
- **As referências.** O `jimo-3d.mov` (a folha de contato e os quadros 38, 41, 44, 61, 63, 65, 67 e 69 s), `render/v2/office-day-master.png` e `office-night-master.png`, que têm a mesma câmera e o mesmo enquadramento (conferido também no `desks.json`), e da biblioteca `qclay-home/w-06` e `w-07`, `madeinevolve/d-02` e `qclay-kurate/d-01`.
- **O júri.** O `juri-v4.md`: os §1 a §9, lidos pelos trechos de nota e defeito.

**O que não verifiquei:**
- **"Wireless Leap".** Procurei na web e não achei um site com esse nome; o resultado mais próximo foi "Jeweller. Wireless Technology", no Awwwards, que não é o mesmo. **Pendente: pedir a URL ao dono.** Nada neste brief se apoia nessa referência.
- **O suporte a scroll-driven animations no Safari 26.** Não confirmei, então o motor de rolagem principal continua sendo o `ticker` atual.
- **O peso das passadas do Blender (§5.3b).** Os números são estimativa.
- **O iPhone real dentro do Instagram.** Não medi.

**Equilíbrio de fontes:** as três últimas direções puxaram do jimo. Aqui o dono pede o jimo de novo, para o FAQ. Para reequilibrar, os outros movimentos novos vêm de outras fontes: Qclay home (a frase que se edita), Made in Evolve (a opacidade como cursor) e a nossa própria maquete. O FAQ do jimo entra **transformado** (§4.8), com o teste de sobreposição escrito.

---

## 1. Peça e objetivo (o que muda em relação ao v4)

Continuam a mesma pessoa e o mesmo dispositivo: o dono de uma indústria ou de um B2B australiano, vindo do Meta no celular, cético. A v4.1 resolve três coisas:

1. **Impacto na entrada.** A intro não foi construída (júri D13).
2. **Vida no meio.** O júri contou 8 de 13 telas com menos de 2% de pixel aceso, e o dono chamou o escritório de "maluquice parada".
3. **A ideia própria dirigida pela rolagem.** O sim é "o melhor momento da página" (júri §10), mas hoje só acontece se a pessoa clicar.

**Métricas:**
- Taste ≥ 8,0, Awwwards ≥ 7,2 e FWA ≥ 70, como no v4.
- **Nenhuma tela com menos de 4% de pixel aceso** entre o hero e o final (o `brightPct` do júri).
- **Nenhuma seção com a planta "H2 no canto + cena"** repetida na vizinha (júri §6, item 7).
- LCP ≤ 2,0 s e o formulário utilizável antes do motor, sem mudança.

## 2. Conceito (uma frase)

**"Você não precisa clicar para entender: a rolagem faz o trabalho andar, as mesas acenderem e o sim acontecer, e cada palavra importante se move pelo mesmo motivo que a luz, para cima e por decisão."**

A tese "o trabalho é luz" e o motivo do triângulo continuam. A v4.1 acrescenta uma lei: **a rolagem é o tempo da empresa** (a noite passa, os 90 dias passam, as ordens chegam e são aprovadas). A tipografia ganha movimento **só quando a frase muda de sentido** (§3, K2) ou quando acompanha esse tempo (K3), e nunca como enfeite.

---

## 3. Movimentos escolhidos (5) e descartados

| # | Código | Captura que prova (aberta) | Porquê aqui | O que muda em relação à fonte | Custo |
|---|---|---|---|---|---|
| 1 | **B7: a frase que se edita** | `qclay-home/w-06` → `w-07`: "SEVERAL OTHERS" vira "SEVERAL THOUSAND OTHERS"; a palavra entra e empurra | Ponto 2 ("Never late…") e ponto 1 (efeito com sentido nas palavras) | Na Qclay, a palavra entra **no meio** para aumentar uma quantidade, sobre um campo lilás, com um número 3D por cima. Aqui a palavra **troca** no começo da linha: a frase do funcionário humano ("Sometimes late.") vira a do agente ("Never late."). A palavra nova **sobe** de baixo, na direção da marca, e a antiga sai por cima. Fica sobre a maquete apagada, e não sobre cor. Cada quadro é uma frase verdadeira | $$ |
| 2 | **D1+: a maquete religada pela rolagem** (variante nova de D1/D3) | `render/v2/office-night-master.png` × `office-day-master.png` (mesma câmera, conferido no `desks.json`) | Pontos 3 e 6 numa cena só: o escritório deixa de ser foto num retângulo, e "desk by desk" vira o próprio escritório acendendo | O D1 do repertório é um vídeo 3D tocado pela rolagem. Aqui não há vídeo: o render entra **como textura no motor OGL**, com as bordas dissolvidas em dither no fundo (sem retângulo), e cada mesa acende com uma revelação pontilhada no dia em que entra no ar. No fim, a noite vira dia. Na versão b, entram a profundidade (Z) e a paralaxe | $$$ produção (passadas do Blender) · $$ runtime |
| 3 | **F1 dirigido pela rolagem: a aprovação encenada** | `jimo-3d-contato.jpg`, linha 2 (Suggestions / Escalation, a lista com o rótulo à direita) | Pontos 4 e 5: a pessoa vê o sim acontecer sem clicar, e as linhas chegam dos agentes | O jimo mostra uma lista estática de sugestões e uma escalada por fio até um mascote. Aqui é **um telefone no vértice da rede do hero**: cada ordem chega por um fio **nomeado** (agente → cérebro → telefone), o botão se enche com a rolagem e a consequência (a luz sobe, ou se apaga no Decline) toca no tempo. Não há mascote nem lista | $$ |
| 4 | **E8: a abertura que entrega a marca** | Entrada E8 do repertório (a abertura do P da landing do Produzze). Não há captura de terceiros: o contraexemplo do jimo, `intro-d-*`, não foi aberto nesta sessão e não é citado | Ponto 9: o dono exige a intro | No Produzze, o P entra por desfoque e voa para o header. Aqui, **pontos sobem da base e montam o triângulo gigante**, a seta acende (o primeiro "sim") e o triângulo **se abre na rede** do hero. O H1 fica pintado desde o 1º quadro | $ (SVG + CSS inline) |
| 5 | **E3: a opacidade como cursor de leitura** | `madeinevolve/d-02` (o manifesto apaga linha a linha) | Ponto 8 (FAQ) e K3 da noite: a pessoa sabe qual pergunta está sendo respondida, sem sanfona | No ME, é um manifesto de agência que se apaga. Aqui é o contrário, **aditivo**: cada pergunta respondida fica acesa a 70% e o ponto dela sobe no triângulo, então o FAQ termina montando o logo (ponte para o final) | $$ |

**Soma de custo:** são dois $$$, o motor WebGL (que já existe e é pago) e as passadas do Blender da maquete. É o limite da regra. A justificativa do segundo: a versão a (§5.3a) roda **sem Blender**, com os dois renders que já existem, e a versão b só entra se a a passar no júri e no peso.

**Convenções de base (não contam):** A3 (cheio/vazio), C3 (quase-preto), F5 (a intro e o final rimam: o mesmo triângulo de pontos que se monta), F7 (o lead que atravessa, agora até o telefone e até o logo), e o kit tipográfico K1–K5 (§4.1).

### Descartados

| Código / ideia | Porquê não |
|---|---|
| **Letreiro de aeroporto (split-flap)** para "Never late" | É a metáfora genérica de pontualidade, e o giro de caracteres passa de 3 Hz (risco para fotossensíveis, §10 do v4). O B7 diz a mesma coisa com **contraste humano × agente**, que é o argumento de venda |
| **Odômetro no "$250K"** do H1 | O H1 é o LCP e precisa estar parado e legível no 1º quadro. Também é "número de título contando", que o júri reprova (§6, item 9) |
| **Dedo ou cursor desenhado** apertando o Approve | É mascote de tutorial. O preenchimento do botão diz "está sendo aprovado" sem uma mão de mentira |
| **Vídeo do escritório (Blender MP4 ou Higgsfield)** | O vídeo não leva dither (a compressão cria banda), não acende mesa por mesa sob controle e pesa ~1 MB. O Higgsfield deforma parede e boneco, o que é a assinatura do vídeo de IA (v4 §7.3). Os dois renders alinhados já permitem a relitação no shader |
| **Terreno de pontos em perspectiva com balões** (jimo 36–44 s) para o FAQ | É a composição mais reconhecível do vídeo, e o júri já pegou a noite por isso. O FAQ usa um **triângulo frontal** (o logo) em vez do terreno, e não tem avatar nem contagem (§4.8) |
| **B10 livre** (cada H2 acendendo palavra por palavra) | Se tudo acende, nada acende. O acender por palavra vale **só** na noite, e sincronizado com a crista (K3) |
| **"Day N" a 88 px contando** (o v4) | Júri §6, item 9 (é o mecanismo do jimo). O dia vira **posição numa linha** com um rótulo pequeno |
| **O cone que sobe no final** | O júri leu "refletor de palco", que o dono reprovou em 19/10. Além disso, a máscara de escuro abre um retângulo duro dentro dele (§4.7). Sai |
| **Lenis** | A rolagem continua nativa (iOS, navegador do Instagram, formulário) |

---

## 4. Os 9 pontos

### 4.1 Tipografia viva ("efeito nas letras, nas palavras") · P1

**Diagnóstico.** O único movimento de texto da página é a troca de opacidade dos rótulos da noite e dos balões. Os H2 entram parados: 56 px num canto, sobre o preto (júri D7 e D9). O dono pediu efeito nas letras, e a régua da casa pede que **alguém consiga dizer o que aconteceu**.

**Solução: um kit com 5 efeitos, cada um usado UMA vez, e cada um com a sua frase.**

| Kit | Onde | O que se move | Dirigido por | Tempos e curva | A frase do júri |
|---|---|---|---|---|---|
| **K1 A linha que sobe** | H2 do formulário e H2 do FAQ | Cada linha, numa janela com `overflow: clip`, sobe de `translateY(.6em)` para 0, com a opacidade de 0 a 1 | Entra na tela (IO, 15%), uma vez | 560 ms, `cubic-bezier(.2,.8,.2,1)`, 90 ms de defasagem por linha | "O título subiu para o lugar" |
| **K2 A palavra que troca (B7)** | "Never late. Never asks for a raise." (§4.2) | A palavra de frequência sai por cima e "Never" sobe de baixo; o resto da linha desliza (FLIP em `translateX`) | Limiar de rolagem; a troca toca no tempo | 420 ms, a saída com `cubic-bezier(.4,0,1,1)` e a entrada com `(.2,.8,.2,1)`, 60 ms de sobreposição | "O funcionário humano virou o agente" |
| **K3 A noite acende o título** | H2 da noite | Cada palavra vai de `ink` .38 para 1 quando a crista passa pelo x dela (a 390, pelo y) | A mesma variável da crista (a rolagem) | Interpolação contínua, sem atraso | "A noite passou por cima da frase" |
| **K4 A palavra final** | H2 do telefone ("You have / the final word.") | "the final word." começa em .45 e vai a 1 no instante do 1º Approve | O evento do sim (§4.5) | 300 ms, `ease-out` | "Quando aprovou, a última palavra ficou sua" (**em avaliação**: sai com uma classe) |
| **K5 Palavra por palavra no fim** | "Want a team like this?" | Cada palavra sobe 0,4em com opacidade; o "?" chega por último, junto com a seta do logo acendendo | A rolagem, ligada à montagem do logo (§4.7) | Ligado à rolagem; cada palavra ocupa 8% do avanço | "A pergunta se formou junto com o logo" |

**Regras do kit:**
- **Nunca no H1** (é o LCP do Meta e fica parado), no CTA, nos rótulos de campo nem nas respostas do FAQ.
- Toda frase precisa ser legível em todo quadro: nenhuma palavra abaixo de `ink` .38 em display ≥ 56 px. Do menor tamanho em que isso vale, o frontend mede o APCA.
- O H2 tem `aria-label` com a frase final, e os `span` são `aria-hidden`.
- **Reduced motion:** o estado final direto (K2 já mostra "Never…", K3 tudo aceso).
- Sem JS: o texto final no HTML pré-renderizado.

**Técnica.** O CSS/JS roda no `ticker` existente (rAF só na rolagem). O split é por palavra, em `span`, feito no build ou no componente; **sem SplitText**, para não somar dependência. O K1 pode usar `animation-timeline: view()` com fallback em IO, mas o K2, o K3 e o K5 vão no `ticker`, porque dependem do estado das cenas.

### 4.2 "Never late. Never asks for a raise." · P1

**Diagnóstico.** Hoje é um H2 de 56 px no canto superior esquerdo, acima de um retângulo de foto (`chromium-1440-s09`, `s10`). É a planta que se repete em 7 das 9 seções (júri item 7). A frase é a do anúncio, o melhor gancho de reconhecimento, e está tratada como legenda.

**Solução.** A frase vira **a abertura da cena do escritório** (§4.3), em **escala de cartaz (B1)**, centrada no escuro acima da maquete apagada, e usa o K2:
- **p = 0 (a cena entra):** em duas linhas, centradas, a 8–9 vw (1440), com `ink` a .55, a frase do **funcionário humano**: "Sometimes late." / "Sometimes asks for a raise." (a palavra de frequência é do copy-director; a função é "um defeito humano honesto, sem caricatura").
- **p .06–.14:** na linha 1, a palavra de frequência sai por cima, **"Never" sobe de baixo** e "late." desliza para a nova largura. A linha inteira vai para `ink` 1.
- **p .16–.24:** a mesma troca na linha 2.
- **p .24–.30:** a frase assenta. A maquete começa a acender embaixo (§4.3); a frase sobe 12vh e cai para 5 vw, abrindo espaço. Isso é ligado à rolagem com `transform: scale` (sem reflow).

**390.** Fica alinhada à esquerda, a 44–48 px, em 3 ou 4 linhas, no topo do palco, com a mesma troca. A maquete entra abaixo dela, sem passar por trás do texto.

**Reduced motion.** "Never late. Never asks for a raise." parado, sem a versão humana.

**Prioridade:** P1, junto com a cena do §4.3.

### 4.3 O escritório vivo, e "Desk by desk" (pontos 3 e 6, uma cena só) · P0 na versão a, P2 na versão b

**Diagnóstico:**
- **Escritório.** É um still num retângulo de borda dura (`office-frame`, 72svh), com um dolly de 6% de escala e balões que trocam por relógio de 2,1 s (`setInterval`, e não pela rolagem). É o único lugar sem luz, e a "pausa" virou "parado". O retângulo corta a maquete no fundo preto, então a imagem não pertence à página. A AVIF tem 270 KB a 1440 (júri D6).
- **Desk by desk.** São 6 triângulos de 46 px numa linha pontilhada, com um "Day N" a 88 px contando. O dono disse que "não tem nada que puxe", e o júri disse que é o mecanismo do jimo invertido. Os dois mostram **as mesmas 6 mesas** em duas seções seguidas.

**Solução: uma cena presa, "o escritório acende mesa por mesa".** Ela substitui as duas seções.
- **Altura do palco:** 3,2 telas a 1440 e 2,6 a 390. As duas seções somavam 3,3 telas, então a página fica mais curta.
- A maquete é desenhada **pelo motor**, e não por um `<img>`:
  - **A borda dissolve em dither** no `ground`: a máscara é um `smoothstep` da distância à borda (14% da largura), quantizado pelo mesmo Bayer da página, então a borda vira pontos que somem.
  - **Não há retângulo**: a maquete flutua no preto como um objeto sobre a mesa.
  - Em volta dela, **a grade da noite continua** (os pontos da cena anterior assentam como o "chão" em que a maquete está pousada). É o mesmo lugar.
- **Fases (p = o avanço do palco):**
  1. **p 0–.30, a frase.** É o K2 (§4.2). A maquete aparece em `off`: o render da noite a 35% de luminância e dessaturado, que se lê como "escritório vazio de madrugada". O ponto-lead da noite (F7) pousa na mesa do follow-up.
  2. **p .30–.75, os 90 dias.** Na base do palco corre uma **linha de 90 marcas** (os pontos da grade em fila), com um marcador que anda de 0 a 90 e o rótulo pequeno "Day 34", a 15 px e tabular, **montado no marcador**. Não há número de título.
     - Quando o marcador passa pelo dia de uma mesa, **a mesa acende**: uma revelação radial pontilhada (de 0 ao raio em 500 ms, no tempo, depois do limiar) troca o `off` pelo render da noite com as luminárias acesas, naquela área.
     - O monitor da mesa solta uma poça de luz roxa pontilhada que **vaza para fora da maquete**, no fundo. É o "degradê misturado ao fundo" que o dono pediu, e **tem portador**: é a mesa trabalhando.
     - A etiqueta da mesa (nome do cargo, ≤ 2 palavras) aparece ancorada no monitor. A 1440 ficam até 5 visíveis.
  3. **p .75–1, o dia.** No dia 90, o render inteiro passa da noite para **o dia** (dissolve pontilhado de cima para baixo, ligado à rolagem: "o dia chega e a equipe está trabalhando").
     - Os **3 diálogos** tocam **com a rolagem**: a pergunta em p .78, .86 e .94, e a resposta 4% depois. É um balão de cada vez, ancorado na mesa, com uma haste de 1 px.
     - No fim, o ponto-lead sai da mesa do follow-up e segue para o telefone (§4.5).
- **Câmera.** Na versão a, um dolly de 1,00 → 1,05 de escala e 2% de translação, ligado à rolagem. Na versão b, a paralaxe de profundidade (abaixo).

**Técnica:**
- **Versão a (P0, sem Blender).** Duas texturas no motor OGL:
  - `office-night-master` em 1600 px, que gera o `off` no shader (×0,35 e dessaturado) e serve de `lit`.
  - `office-day-master` em 1600 px.
  - As máscaras das mesas são **elipses no shader** a partir do `desks.json` (o centro do monitor, raio ~170 px no espaço de 2080, com a elipse achatada pela câmera).
  - É um quad com o fragment shader; a máscara de borda e as revelações usam o mesmo Bayer da página. Cabe no `FIELD_FS`/`COMP_FS` como uma nova camada; o texto é DOM (as etiquetas, a linha e os balões).
  - Retrato a 390: `office-night-portrait` e `office-day-portrait`, com as coordenadas `portrait` do `desks.json`.
- **Versão b (P2, Blender).** Do `brandup_hq.blend`, com a mesma câmera:
  1. uma passada **`off` de verdade** (só a luz ambiente, monitores apagados);
  2. **um mapa de ID das mesas** (Object Index → PNG de 8 bits, um valor por mesa), para a revelação seguir a forma da mesa e não uma elipse;
  3. a **profundidade Z** em 8 bits.
  - O shader faz **paralaxe 2.5D** pela profundidade: o deslocamento é proporcional a (1 − z) × 1,5% da largura, ligado à rolagem e, no desktop, ±0,8% pelo ponteiro (**em avaliação**).
  - As figuras de resina 1:50 de proporção adulta, pedidas pelo júri v3, entram neste mesmo render.
- **Peso (lazy, só quando o palco está a ≤ 1 tela).**

  | Versão | Desktop | 390 (780 px de largura) |
  |---|---|---|
  | a | 2 × AVIF de 1600 px a ~120 KB = **~240 KB** | **~120 KB** |
  | b | +40 KB (o ID e o Z num PNG RG) | +20 KB |

  A textura sai da memória quando o palco fica a mais de 2 telas.

**390.** A maquete em retrato com 64svh, abaixo da frase. Mostra **uma etiqueta de mesa por vez** (a última que acendeu). A linha dos 90 dias fica horizontal na base da imagem, com o rótulo do dia no marcador. Os diálogos ficam numa faixa abaixo da imagem, um por vez, e trocam com a rolagem (como hoje, mas sem relógio).

**Reduced motion / sem WebGL.** O `<picture>` do render de dia, com `mask-image` radial (a borda some no `ground`, sem retângulo), a frase final, a lista das 6 mesas com o dia (em texto, **marcado "modelo"** até o dono confirmar) e os 3 diálogos empilhados.

**Conteúdo.** Os dias das mesas continuam **MODELO**. Se o dono não confirmar, a linha dos 90 dias sai e as mesas acendem **em ordem, sem número** ("uma a uma"): a cena continua de pé.

### 4.4 "You have the final word": as linhas não se ligam a nada · P0

**Diagnóstico.** Os feixes nascem da **borda de baixo da tela** e convergem num ponto abaixo do telefone (`chromium-1440-s12`, `chromium-390` "you"). Não saem de nenhum nó, então são enfeite, e quebram a lei 1 do v4 ("toda luz é um portador"). Além disso, a seção é "H2 à esquerda + objeto à direita", a planta repetida.

**Solução: o telefone É o vértice da rede.**
- **1440: a seção fica centrada**, e a planta muda de propósito. O telefone fica no centro (c5–c8), no alto. Abaixo dele, ocupando c1–c12 até a base da seção, **a mesma topologia do hero** (6 agentes na base → 3 cérebros → o vértice), com o vértice na base do telefone: a seção inteira é o triângulo do logo, com o telefone no topo.
  - **O H2 se parte nos dois flancos do telefone**: "You have" em c1–c4 e "the final word." em c9–c12, alinhados à altura da ordem, a 6–7 vw. Nenhuma outra seção tem essa planta.
- **Os fios são nomeados.** Cada ordem vem de um agente (follow-up, bookkeeper, receptionist). Só o fio **daquele agente → o cérebro dele → o telefone** acende quando a ordem chega; os outros ficam a 25%. O nome do agente aparece no nó (o mesmo rótulo do hover do hero).
- **§4 do v4, a exceção registrada:** a rede aparece em duas seções. No hero, ela diz "isto é um sistema"; aqui, "esta ordem veio daquele agente". É uma rima de propósito, e não uma repetição: os nós são os mesmos, o enquadramento é outro (aqui, vista de cima do telefone, com 3 fios ativos).
- **390.** O H2 acima, em 2 linhas, alinhado à esquerda (não centrado: K4 lê melhor assim). O telefone fica a 300 px, centrado. A rede, compacta, fica abaixo dele (6 agentes numa base de 350 px, **todos dentro da tela**, corrigindo o júri D2), com ~180 px de altura.

**Técnica.** Os mesmos `GL_POINTS`, com um 2º `netFrame` cujo vértice é a base do telefone (`[data-phone]` → `uNetF` da cena do telefone). O `uPhone`/`uPhoneB` atuais (os feixes da borda) **saem**. O `uHot` passa a valer pelo agente da ordem atual. Os rótulos ficam no DOM.

### 4.5 Approve dirigido pela rolagem · P0

**Diagnóstico.** O sim só acontece se a pessoa clicar. No celular do Meta, quase ninguém vai clicar num telefone dentro de uma landing, então o melhor momento da página fica invisível para a maioria.

**Solução: um palco preso de 2,6 telas a 1440 e de 2,2 a 390**, com um roteiro de 3 ordens. A regra é: **a rolagem move o progresso; a consequência toca no tempo.** O preenchimento do botão segue o dedo. Quando passa de 100%, a subida da luz toca inteira em 850 ms, mesmo se a pessoa parar ou passar rápido; se ela voltar a rolagem, o estado volta sem tocar a subida ao contrário.

| p | O que acontece | Tempo / curva |
|---|---|---|
| .00–.08 | Um ponto sai do agente **follow-up**, passa pelo cérebro e chega ao telefone (o fio dele acende) | ligado à rolagem |
| .08–.13 | A ordem 1 pousa: "New request from your follow-up." | no tempo: 500 ms, `(.2,.8,.2,1)`, 18 px |
| .13–.27 | **O Approve se enche** da esquerda para a direita: uma camada interna em `scaleX` de 0 a 1, em menta mais clara sobre a menta. É o "dedo avançando" | ligado à rolagem, linear |
| .27 | Passou de 100%: "Sent." **A luz sobe pelo telefone e sai pelo topo da seção**. K4 acende "the final word." | no tempo: 850 ms, `1−(1−t)²` (a curva de hoje) |
| .30–.55 | Ordem 2 (**bookkeeper**): o mesmo roteiro | idem |
| .58–.85 | Ordem 3 (**receptionist**): uma ordem que o dono **recusaria**, a mostrar o controle. É o **Decline** que se enche (em `ink`, e não em menta). Passou de 100%: "Declined. Nothing was sent." e **a luz se apaga no lugar**, sem subir e sem vermelho | ligado à rolagem e depois 400 ms no tempo |
| .88–1 | "All clear. Nothing is waiting for you." Os fios voltam ao repouso | 300 ms |

**Outras regras do palco:**
- **Histerese** de ±0,01 em cada limiar (sem tremer no limite).
- **Rolagem rápida:** a máquina de estados **recupera em sequência** (nunca pula um "Sent" sem mostrar), com cada consequência a no máximo 2× a velocidade.
- **Os botões ficam apresentacionais** (o dono mandou esquecer a interação): `div`s com o visual de botão, `aria-hidden`, cursor padrão. Um parágrafo `sr-only` e o `aria-live` descrevem o roteiro ("Your follow-up asked to send a follow-up to Sam. Approved and sent."). O Edit aparece desabilitado, como contexto.

**390.** É o mesmo roteiro. O palco usa `--tela` congelada (`useTelaFixa`, o que já existe). O telefone e a rede cabem numa tela de 844 (telefone com 460 px de altura + rede de 180 px).

**Reduced motion / sem JS.** Sem palco: três telefones lado a lado a 1440 (esperando · enviado · recusado) e empilhados a 390, com o estado escrito.

**Copy.** O copy-director reescreve a ordem 3 para algo que **o dono recusaria de verdade** (por exemplo, o recepcionista propõe um desconto para fechar), e não uma resposta de cortesia.

### 4.6 "Desk by desk"

Ver §4.3: a seção deixa de existir sozinha e vira a fase 2 da cena do escritório. Isso responde ao dono (a atenção vem das mesas acendendo no próprio escritório) e ao júri (sem contador de título e com uma tela a menos).

### 4.7 "Want a team like this?" (o final) · P1, com o bug em P0

**Diagnóstico (visto nas capturas):**
- **Bug.** A máscara de escuro (`data-dark` do H2 e do formulário compacto, com `f = 48`) **abre um retângulo preto de borda dura** dentro do triângulo que sobe (`chromium-1440-s19`/`s20`, `chromium-390` final). Parece um erro de render.
- **O vazio.** O `padding-top` de 42vh (1440) e 46vh (390) espera o triângulo e deixa **um vão de 456 px** depois do FAQ (júri §5.1). É a principal razão de o FAQ "parecer bugado" (§4.8).
- **A leitura.** O cone roxo se lê como um refletor (júri §5.2, item 3).
- **O movimento.** É uma subida, e só.

**Solução: o logo se monta com as respostas e a pergunta se forma com ele.**
- O triângulo **não sobe por trás do formulário**. Ele se monta **acima do H2**, com 22vh de altura a 1440 e 120 px a 390, a partir dos pontos que subiram no FAQ (§4.8): cada pergunta respondida mandou um ponto para o ápice. É a rima do F5 com a intro, que monta o mesmo triângulo.
- Quando o último ponto chega, **a seta acende branca** (o "sim" final), e o K5 forma "Want a team like this?" palavra por palavra. O "?" chega com a seta.
- **O formulário fica ligado ao logo:** o horizonte continua sob o botão e, a cada campo válido, o feixe daquele campo **sobe até a base do logo** (e não só 72 px): "a sua empresa entra no time". No envio, os 5 feixes sobem juntos e a seta sobe 8 px e assenta.
- **Sem cone e sem máscara retangular:** o logo fica fora da caixa do texto, então a máscara de escuro deixa de ser necessária aqui. Onde a máscara continuar existindo na página, ela vira **um retângulo de canto arredondado com borda pontilhada** (o `smoothstep` de 48 px quantizado pelo Bayer), e nunca um corte duro.
- O `padding-top` da seção passa a ser a altura do logo + 48 px. O vão some.

**390.** Logo de 120 px, centrado, acima do H2. O formulário em uma coluna e o horizonte sob o botão; os feixes sobem pela lateral direita do formulário até o logo (a área dos campos fica escura).

**Reduced motion / sem WebGL.** O logo chapado parado (o `final-tri-fallback`, que já existe, reduzido a 22vh), o H2 inteiro e os feixes acesos sem subir.

### 4.8 FAQ "Questions": o jimo e o bug · P0 no bug, P1 no redesenho

**Diagnóstico do bug (medido):**
1. **A abertura corta o texto e sobrepõe a pergunta seguinte.** No chromium (`interpolate-size` suportado), o `::details-content` anima a `height` por 350 ms com `overflow: clip`. Aos 120 ms, a 390, a última linha da resposta aparece cortada no meio e "Is my data safe?" fica por cima dela (`chromium-390-faq1`). Não há opacidade, então se lê como um defeito, e não como uma animação.
2. **Os dois motores se comportam diferente.** No WebKit, o `::details-content` é suportado, mas o `interpolate-size` não (o `CSS.supports` deu `false`), então o bloco `@supports` não aplica e a resposta **pula** sem animar.
3. **As perguntas fechadas estão em `ink-2`** e parecem desabilitadas; sem nenhum indicador, no celular não há pista de que se abrem.
4. **O vão de 456 px depois do FAQ** (o `padding` do final, §4.7) deixa a lista solta no preto.
5. **Várias abertas ao mesmo tempo** empurram o final para baixo.

**Correção imediata (P0, antes do redesenho):**
- Trocar a animação de `height` por `grid-template-rows: 0fr → 1fr` num invólucro, que funciona igual nos dois motores, com a resposta em `opacity 0 → 1` e `translateY(6px → 0)`, 220 ms, começando 60 ms depois.
- A pergunta em `ink` (as fechadas a .82) e um indicador mínimo: o próprio ponto do triângulo à esquerda, que acende quando aberta.
- O vão sai (§4.7).

**Redesenho (P1): "as suas dúvidas sobem para o logo".** O pedido do dono é o jimo de 38–44 s (as perguntas como balões presos a pontos da grade). O princípio fica: **uma pergunta é um ponto do sistema, e responder é mexer nesse ponto**. A forma muda:
- **1440:**
  - **O campo.** Em c5–c12, um **triângulo frontal de pontos** (o logo, sem perspectiva), com uma grade de 8 px e pontos de 2 px em `#2B2732`, de ~70vh de altura. A seção tem 1,6 tela, **sem palco preso**: o triângulo é desenhado pelo motor fixo, e os balões rolam com a página.
  - **Os balões.** As 5 perguntas são balões DOM (fundo `ground` sólido e 16–18 px, sem avatar), presos por uma haste de 1 px (`ink` .2) a um ponto dentro do triângulo, cada uma numa altura: a 1ª perto da base e a 5ª perto do ápice. Os balões alternam de lado em relação à haste.
  - **O título.** "Questions" (ou o que o copy decidir) fica em c1–c4, **preso ao topo dentro da seção** (`position: sticky`): é a única seção com título fixo ao lado de uma lista que passa.
- **O cursor de leitura (E3):** a pergunta cuja âncora cruza 55% da altura da tela é a atual. Acontecem três coisas:
  1. A pergunta vai a `ink` 1.
  2. **A resposta aparece embaixo do balão** (opacidade e 6 px, 240 ms, com o espaço **reservado**, sem empurrar nada).
  3. **O ponto dela acende e sobe pelo triângulo até o ápice**, em 700 ms no tempo, depois do limiar.
- **O efeito é aditivo:** as respondidas ficam abertas a .7, e o ápice vai ficando mais denso.
- **A saída.** Depois da 5ª, o triângulo inteiro está aceso e **desce para virar o logo do final** (§4.7), ligado à rolagem ao longo da última meia tela. É a ponte que mata o vão.
- **390.** Uma **coluna de pontos** vertical em x = 24 (o triângulo visto de lado), com cada âncora nela e os balões em largura total à direita (x 44–370). A resposta da pergunta atual aparece embaixo. Os pontos sobem pela coluna, e no topo da seção a coluna fecha num triângulo de 80 px, que vira o logo do final.
- **Toque e teclado:** cada pergunta é um `button` com `aria-expanded`, ligado à resposta (`aria-controls`). O toque leva aquela pergunta ao cursor (`scrollIntoView`, `block: center`) e abre a resposta.
- **Sem JS e com Ctrl+F:** no HTML pré-renderizado, todas as respostas ficam visíveis em lista (é o fallback). Com JS, ficam ocultas com `hidden="until-found"` onde houver suporte; no WebKit, que não tem, as respostas ficam visíveis a .7, sem o efeito de revelar.
- **Reduced motion:** a lista com todas as respostas abertas e o triângulo aceso parado.

**Teste de sobreposição com o jimo, contra os quadros abertos (38, 41 e 44 s):**

| No jimo | Aqui |
|---|---|
| Terreno em perspectiva | Triângulo frontal, que é o logo |
| Avatares | Sem avatar |
| H2 centrado que conta para baixo | Título à esquerda, fixo, sem número |
| Os balões **somem** | Os balões **ficam respondidos** |
| A cena acaba num balão "Guided in-app" | A cena acaba virando o logo da marca |

O "Short answers to good questions" do jimo (61–69 s, em formato de chat) também **não** foi usado: o chat em balões de pergunta e resposta é exatamente a planta dele.

**"Wireless Leap":** não encontrado (§0). **Pendente com o dono.** Se ele mandar a URL, ela entra como 2ª prova do movimento, sem refazer o desenho.

### 4.9 INTRO obrigatória · P0

**Diagnóstico.** Ela não existe: aos 150 ms, o hero já está pintado com a rede (`chromium-390-t0150`, `webkit-390-t0150`), e o júri confirmou (D13). O dono quer impacto, e o celular do Meta quer o H1 já. O motor GL só baixa depois do LCP (~1,2 s), então **a intro não pode depender dele**.

**Solução: SVG + CSS inline no `proto.html`, com ≤ 6 KB e sem React.** Um script de 10 linhas no `<head>` põe a classe `intro` no `<html>` quando três condições valem: é a 1ª visita da sessão (`sessionStorage`), não há reduced motion e o `?gl=0` não está ligado. A animação é CSS sob `.intro`. **O H1, o apoio e o CTA estão pintados desde o 1º quadro** e nunca ficam cobertos. O LCP continua sendo o H1.

**Composição.** A intro ocupa a área da rede, à direita a 1440 e na metade de baixo a 390, e nunca a zona do H1. Os pontos são **~12 faixas horizontais do triângulo** (cada uma, um `<g>` de pontos quadrados de 3 px no padrão `dot-body`, que já existe). Assim são 12 camadas animadas em `transform`/`opacity`, que o compositor aguenta durante o boot do React (o TBT de 590 ms é o risco: júri D12), e não 180 elementos SVG animados um a um.

**Quadro a quadro (1440×900):**

| t (ms) | Quadro | Detalhe |
|---|---|---|
| 0 | **O escuro com o texto** | O `ground`, com o H1, o apoio e o CTA já legíveis à esquerda (c1–c6). O logo do header ainda não aparece. O lado direito está vazio |
| 0–90 | **Um ponto** | Um único ponto `#FBF7FF` de 6 px acende onde vai ficar o vértice ("você"), no alto de c10 |
| 90–520 | **Os pontos sobem e montam o triângulo** | As 12 faixas entram **de baixo para cima** (a direção da marca): cada uma sobe de `translateY(40vh)` a 0 com a opacidade de 0 a 1, em 300 ms, `cubic-bezier(.2,.8,.2,1)`, 18 ms de defasagem, **da base para o ápice**. Formam o **triângulo do logo em escala gigante**: 78vh de altura em c6–c12, com o ápice no ponto do vértice |
| 520–700 | **A seta acende (o 1º sim)** | A seta interna (o triângulo + a barra do `favicon.svg`) troca de `dot-body` para `dot-core` numa varredura **de baixo para cima** de 180 ms, por `clip-path: inset()` animado. É o único clarão: um quadro, nada pisca |
| 700–1.150 | **O triângulo se abre na rede** | O triângulo gigante encolhe e se desloca (`scale` 1 → 0,82 e `translate` até o enquadramento da rede) e se **dissolve em degraus** (`opacity` com `steps(4)`, o dither no tempo), enquanto o pôster da rede (o `PosterCanvas`, a mesma composição) entra por baixo, de 0 a 1. Ao mesmo tempo, **um logo chapado** `#9232EA` de 30 px nasce no ápice e **voa para o header** pela linha do header (y ≤ 72, por cima de nada), em 450 ms, `cubic-bezier(.65,0,.35,1)` |
| 1.150–1.400 | **A entrega** | O logo assenta no header (sem overshoot) e "BrandUp" aparece em 160 ms. A intro some do DOM (`animationend` → `remove`). Quando o motor GL chegar (~1,2 s+), ele substitui o pôster com a troca de 300 ms que já existe |

**Quadro a quadro (390×844):**

| t (ms) | Quadro |
|---|---|
| 0 | O H1 (y 104–190), o apoio e o CTA (y 253–305) já pintados |
| 0–90 | O ponto do vértice acende em x 300, y 380 |
| 90–520 | 9 faixas sobem da borda de baixo e montam o triângulo em y 380–800, com 330 px de base, centrado |
| 520–700 | A seta acende, de baixo para cima |
| 700–1.100 | O triângulo se dissolve em degraus para dentro do pôster da rede, no mesmo enquadramento. **O logo do header não voa**: aparece por opacidade em 200 ms, porque o voo cruzaria o H1 |
| 1.100 | Fim. Total ≤ 1,1 s |

**Regras:**
- **Qualquer** `pointerdown`, `keydown`, `wheel` ou `touchstart` pula para o último quadro em 150 ms.
- "Skip intro" é um botão visível só no foco de teclado.
- Não há intro com reduced motion, `Save-Data` ou `?gl=0`, nem na 2ª visita da sessão.

**Prioridade:** P0 (o dono exigiu; é barata).

### 4.10 O sim já no hero (júri §9, item 5) · P1
**Diagnóstico.** A ideia que só a BrandUp tem aparece na 5ª seção.
**Solução.** No hero, o vértice já pulsa "esperando". Nos primeiros 8% da queda (o primeiro gesto de rolagem), **o vértice solta uma subida**: um feixe curto sobe dele e sai pelo topo da tela, em 850 ms e no tempo depois do limiar, uma vez por visita. **No mesmo instante, o botão do hero faz um ciclo da seda** (§4.12). Os dois rimam: o botão é feito da mesma luz que acabou de subir.
**O que aconteceu:** "Comecei a rolar e a primeira ordem subiu."
**Reduced motion:** não acontece. **Técnica:** o `uRise` que já existe, aplicado ao vértice do hero.

### 4.11 O jimo como base, transformado gesto a gesto (pedido do dono + júri §6, item 9)
O dono pediu a página "totalmente baseada" no vídeo 3D do jimo, então a rede e a grade-onda **ficam**. O júri pede que os gestos copiados saiam. A saída é transformar cada gesto até ele ser nosso, ligado ao triângulo, à subida e à aprovação:

| Gesto do jimo (quadro aberto) | O que fica (o princípio) | O que nos diferencia |
|---|---|---|
| A rede com um blob ligado por fios a apps de terceiros (25 s) | O cérebro ligado aos agentes | Sem mascote e sem logo de terceiro. 6 agentes → 3 cérebros → você, **na forma do triângulo do logo**. A rede volta no telefone (§4.4) com fios **nomeados** que levam uma ordem |
| O terreno de pontos com etiquetas flutuando (36 s) | A grade que carrega informação | **A noite muda (P1):** (1) cada evento vira **um feixe que sobe do ponto da grade**; (2) a etiqueta vai **para o topo do feixe**, e todas ficam numa linha só de registro no alto do palco, como um livro de ocorrências, e não balões espalhados; (3) **a crista leva a hora** (um rótulo "02:14" de 15 px que anda junto com ela, na borda de perto da grade); (4) o H2 acende com a crista (K3); (5) no fim, os feixes convergem no lead, que **sobe** e segue para o escritório. O palco cai de 2,4 para 1,4 tela, com a grade ocupando ≥ 60% da tela |
| A contagem "tickets down to 48 → 0" (36–48 s) | — | **Sai.** O dia vira posição numa linha dentro da maquete (§4.3) |
| As perguntas como balões em pontos da grade (38–44 s) | Uma pergunta é um ponto do sistema | Um triângulo frontal (o logo), respostas **aditivas**, os pontos sobem e montam o logo do final (§4.8) |
| O ponto de luz sozinho no preto (51 s) | Um sinal que atravessa | É **um lead com hora e função** (02:14, um pedido de cotação), que pousa numa mesa, chega ao telefone e sobe. Nunca vira pontuação |
| O mergulho de câmera (dossiê `w-03→w-16`) | — | **Não usamos.** A rede cai sobre o plano (E2) |
| O FAQ em chat (61–69 s) | — | **Não usamos**: é a planta dele |

### 4.12 Peça-assinatura: o botão reinventado ("Núcleo") · P0
**Decisão do dono (09/11):** "reinventar o botão, colocar um efeito: silk, gradiente, granular". Hoje ele é um retângulo menta chapado (`.btn`), e o júri aponta o menta sobre a luz roxa como **a trinca da categoria** (júri §5.2, item 1).

**Conceito.** **O botão é o núcleo da luz.** Na página, toda luz roxa esquenta até o quase-branco **no ponto em que converge** (lei 6 do v4: `#9232EA` → `#C9A2FF` → `#FBF7FF`). O ponto de convergência é onde o trabalho espera por você, e é isso que o botão é. Ele deixa de ser "uma cor de acento" e vira **o pedaço mais quente da mesma matéria**: uma seda de luz lilás-branca, pontilhada com o mesmo Bayer da página, que corre **para cima**.

**A decisão (com a alternativa visível):**
- **A, escolhida: "Núcleo"**, na rampa da luz quente: `#B48BFA` / `#C9A2FF` / `#E4D2FF` / `#FBF7FF`, com o rótulo em `ground` `#08070B`.
  - **Por quê:** (1) tira a trinca preto + violeta + menta, o maior sinal de "IA" que o júri deixou; (2) dá ao botão um **significado** dentro do sistema (a convergência = a decisão), em vez de só contraste; (3) o grão é o mesmo da luz, então o botão pertence à página.
- **B, em avaliação: "Menta em seda"**, com a mesma peça na rampa `#2FD08F` / `#58F6B1` / `#A8FBD6` / `#E9FFF5`, atrás de `?btn=mint`, para o dono comparar lado a lado (ele avalia vendo). Se ele preferir a menta como cor da decisão, troca-se só a paleta da textura.

**O material (sem WebGL, legível desde o 1º quadro):**
1. **A textura.** Uma faixa de seda gerada **offline pelo nosso shader**: bandas com distorção de domínio, quantizadas em 4 níveis com o Bayer 4×4 em células de 2 px CSS. É um PNG indexado de 4 cores, 480×192, emendável na vertical, com **≤ 4 KB**, inline como data-URI (o CTA do hero está na 1ª tela; nada de requisição a mais). Usa `image-rendering: pixelated`, para o grão ficar duro.
2. **A camada.** Um elemento interno com o dobro da altura do botão, recortado pelo `overflow: hidden` e pelo `border-radius: 10px`. A animação é **só `transform: translateY`** (composta, sem repaint).
3. **A forma.** O mesmo retângulo de canto 10 dos campos (o formulário continua uma família). À direita do rótulo, **a seta do logo** a 10 px (o triângulo + a barra), em `ground`. **Sem gradiente CSS, sem sombra e sem glow:** o critério 1 do v4 continua zero, e a cor vem da textura pontilhada.
4. **Sem a imagem:** `background-color: #C9A2FF` chapado (o contraste continua).

**Estados (o movimento quer dizer algo, e não há loop perpétuo sem motivo):**

| Estado | O que se move | Tempo / curva | O significado |
|---|---|---|---|
| Repouso | Nada: um quadro parado da seda (o mais bonito, escolhido no `?tile`) | — | — |
| Entra na tela | **Um ciclo** da seda, subindo | 2,4 s, `cubic-bezier(.2,.8,.2,1)`, uma vez | "A luz chegou até aqui" |
| Hover / foco | A seda corre para cima e **a seta sobe 2 px** | 1,6 s por ciclo, enquanto houver hover; o foco soma o anel `ink` de 2 px (offset 3) | "Pronto para o seu sim" |
| Pressionado | A camada sobe 4 px e o botão vai a `scale(.985)` | 120 ms | "Carregou" |
| **Pronto** (os 5 campos válidos) | Fluxo lento contínuo, **só enquanto o botão está na tela** | 6 s por ciclo | "Tudo preenchido: falta você" |
| Enviando | O fluxo acelera; o rótulo vira "Sending…" e `aria-busy` | 0,9 s por ciclo | "Está subindo" |
| Sucesso | **A luz sai pelo topo**: a camada sobe 100% e o botão fica no núcleo chapado `#FBF7FF` com "Sent" | 600 ms, depois o redirect | "Saiu" (rima com o telefone) |
| Desabilitado | Uma textura de 2 níveis escuros (`#2B2732`/`#3A3542`), sem cor; rótulo em `ink` .6 | — | "Ainda não" |

**No telefone (§4.5): o Approve É esta peça.** O "preencher com a rolagem" revela a seda da esquerda para a direita sobre a base escura desabilitada: **o material aparece à medida que você aprova**. O Decline se enche só com a textura escura de 2 níveis. É a assinatura em dois lugares, com o mesmo gesto.

**Contraste.** O rótulo fica sempre em `ground` sobre a rampa. No nível mais escuro (`#B48BFA`), a razão estimada é ~7,8:1 (≥ AA). **O frontend mede**:
- WCAG ≥ 4,5:1 e APCA Lc ≥ 60 (16 px/500) no **pior pixel sob o rótulo, em 12 quadros** do ciclo, em chromium e webkit, com DPR 1 e 2;
- a B (menta): `ground` sobre `#2FD08F` estimado em ~9,9:1.

Se algum quadro falhar, a textura recebe **uma faixa de rótulo** que fica no nível ≥ L1, e a saturação não sobe.

**Reduced motion.** O quadro parado de repouso. Os estados mudam por **troca de quadro** (o pronto mostra um quadro mais claro; o enviando, o rótulo; o sucesso, o núcleo chapado), sem fluxo.

**Custo.** $ (CSS + um PNG de 4 KB). Não depende do motor: o motor só **gera** a textura offline (`?tile=1`, captura determinística).

**Por que não as outras ideias:**
- **Seda em SVG `feTurbulence` animado:** repinta no thread principal a cada quadro, no boot do celular.
- **O botão desenhado no WebGL:** fica ilegível até o motor carregar.
- **Glass:** proibido na casa.
- **Gradiente CSS liso:** é o "gradiente decorativo" da lista anti-slop, e briga com a lei do grão.

### 4.13 O cone de luz do final (opção do dono, decidida aqui)
O dono não respondeu, então decidi: **o cone sai** (§4.7). O triângulo passa a se **montar** acima do H2, a partir dos pontos das respostas, e nunca **sobe da linha do horizonte como um facho**. Teste de leitura: em nenhum quadro há uma forma que se abre de um ponto baixo para cima com borda difusa. O triângulo é chapado e pontilhado, com a base reta e o tamanho de um logo (22vh), não o de um palco.

---

## 5. Mapa da página v4.1

| # | Seção | A pergunta | Planta (nenhuma igual à vizinha) | Palco preso | Estados |
|---|---|---|---|---|---|
| 0 | Intro | "o que é isto?" | o triângulo gigante à direita | — | não existe com reduced / 2ª visita / gl=0 |
| 1 | Hero | o que, quanto, quem manda | assimétrica, a rede sangrando (sem mudança; corrigir os agentes a 390: júri D2) | — | pôster / GL / contexto perdido |
| 2 | Formulário | como eu peço | split 5\|6, com K1 no H2 | — | foco, erro, enviando, offline, sucesso |
| 3 | A noite | o que eles fazem | o palco largo, K3 no H2. **Encurtar de 2,4 para 1,4 tela** (júri) | sim (1,4 / 1,2) | pôster + 3 rótulos |
| 4 | **O escritório acende** (o antigo escritório + os 90 dias) | quem são, e quando entram | cartaz centrado → maquete sem moldura | sim (3,2 / 2,6) | §4.3 |
| 5 | **O sim** | e se a IA errar | centrada: o telefone no vértice, o H2 nos flancos | sim (2,6 / 2,2) | §4.5 |
| 6 | **Perguntas → logo** | as objeções | título fixo à esquerda + o triângulo de pontos | não | §4.8 |
| 7 | Final | eu quero | centrada: o logo acima, o H2, o formulário | não | os do formulário |
| 8 | Rodapé | contato | sem mudança | — | — |

**Três palcos presos** (o v4 tinha dois). **A justificativa:** o dono pediu explicitamente o sim dirigido pela rolagem, e a fusão do escritório com os 90 dias tira uma seção. A soma das alturas cai de ~10,9 para ~10 telas a 1440. A 390, cada palco é curto e todos usam a `--tela` congelada.

---

## 6. Wireframes composicionais

**Grid** (sem mudança): 1440 = 12 col · gutter 24 · margem 64; 768 = 8 · 20 · 40; 390 = 4 · 12 · 20.

### 6.1 A cena do escritório (1440)
```
p 0–.30  ┌──────────────────────────────────────────────────────────────┐
         │                                                              │
         │          SOMETIMES→NEVER LATE.            (8–9 vw, centrado) │
         │      SOMETIMES→NEVER ASKS FOR A RAISE.                       │
         │   · · · · · · ·:::::::::::::::::::· · · · · · ·  (chão: grade)│
         │        ·:░░ maquete OFF (35%) — a borda dissolve em dither ░:·│
p .30–.75│  Never late. Never asks… (5 vw, subiu)                       │
         │      ·:▓ maquete ▓░ ◉Reception  ◉Follow-up (acesas, a poça    │
         │        roxa pontilhada vaza para o fundo)  ○Bookkeeper (apagada)│
         │  0 ·▲·····▲·········[Day 34]▸·····△······△··········△ 90      │
p .75–1  │      maquete de DIA, toda acesa   ( #1047 paid? ) ← balão    │
         │                                    ( No. Flagged for 8am. )   │
         └──────────────────────────────────────────────────────────────┘
```
### 6.2 A cena do escritório (390)
```
┌──────────────────────────┐
│ NEVER LATE.              │ 44–48 px, à esquerda, K2
│ NEVER ASKS               │
│ FOR A RAISE.             │
│ ·:░ maquete retrato ░:·  │ 64svh, a borda em dither
│   ◉ Follow-up (só 1 rótulo)│
│ 0 ·▲··▲···[Day 34]▸··· 90│ linha na base da imagem
│ Bookkeeper: #1047 paid?  │ faixa de diálogo, 1 por vez
└──────────────────────────┘
```
### 6.3 O sim (1440 e 390)
```
1440 ┌──────────────────────────────────────────────────────────────┐
     │  YOU HAVE            ┌──────────┐          THE FINAL WORD.   │ H2 nos flancos
     │  (c1–c4)             │ ordem    │          (c9–c12, K4)      │
     │                      │[Approve▮▮▮▯▯] ← enche com a rolagem   │
     │                      └────▲─────┘                            │
     │                     ╱     │     ╲      só o fio do agente    │
     │                ◉ cérebro  ◉     ◉ cérebro    ativo acende     │
     │              ╱    ╲     ╱  ╲    ╱    ╲                        │
     │   ●follow-up  ●     ●     ●     ●     ●receptionist          │
     └──────────────────────────────────────────────────────────────┘
390  ┌──────────────────────────┐
     │ You have                 │
     │ the final word.          │
     │     ┌──────────┐         │ telefone com 300 px
     │     │[Approve▮▮▯]│        │
     │     └────▲─────┘         │
     │   ◉    ◉    ◉            │ rede compacta, 180 px,
     │  ● ●  ● ●  ● ●           │ os 6 agentes dentro da tela
     └──────────────────────────┘
```
### 6.4 Perguntas → logo (1440 e 390)
```
1440 ┌───────────────┬──────────────────────────────────────────────┐
     │ QUESTIONS     │                    ▲ ápice (adensa)           │
     │ (sticky)      │              · · ·│· · ·  ( Q5 )              │
     │               │        ( Q4 )─· · · │ · · · · ·              │
     │               │          · · · · · ·│· · · ·─( Q3 ) ←atual    │
     │               │                       resposta (reservada)    │
     │               │    · · · · ·─( Q2 ) · · · · · · · ·          │
     │               │  ( Q1 )─· · · · · · · · · · · · · · · ·      │
     ├───────────────┴──────────────────────────────────────────────┤
     │                         ▲ (o logo montado, 22vh)              │ FINAL
     │                 Want · a · team · like · this?  (K5)          │
     │                   [campos]  feixes ──┘ sobem até o logo       │
     └──────────────────────────────────────────────────────────────┘
390  ┌──────────────────────────┐
     │ Questions                │
     │ ·  ( Q1 )                │ a coluna de pontos em x 24
     │ ●  ( Q2 atual )          │
     │ │  resposta…             │
     │ ·  ( Q3 )                │
     │      ▲ 120 px            │ FINAL: logo, H2, formulário
     └──────────────────────────┘
```

---

## 7. Pedidos

### 7.1 Ao type-director
- **Papel K2 (cartaz):** a frase do escritório a 8–9 vw (1440) e 44–48 px (390), em peso médio. A família precisa ter **largura de palavra estável** para o FLIP (a troca "Sometimes" → "Never" muda a largura da linha; meça as duas).
- **H2 maiores:** de 56 para 88–104 px no desktop (júri §9, item 1).
- **Reduzir a escala de 11 para ≤ 7 tamanhos** e tirar os pesos 300/340 (júri D9; casa 400/500).
- **H2 partido nos flancos do telefone:** 6–7 vw, as duas metades com a mesma linha de base.
- **Rótulo do dia no marcador:** 15 px, tabular, sem mono.
- **Balões do FAQ:** pergunta a 18 px (500) e resposta a 16 px (400). Verifique o Lc das respondidas a .7.

### 7.2 Ao copy-director (função e tamanho; o texto é seu)
- **A palavra de frequência humana** para K2 (uma palavra, honesta e sem caricatura, que funcione nas duas linhas). Exemplo de função: "Sometimes".
- **Ordem 3 do telefone:** algo que o dono **recusaria** (≤ 10 palavras no pedido, porquê ≤ 14), mais os textos de "Declined".
- **O H2 do telefone partido em duas metades** que se leiam sozinhas.
- **A legenda da linha dos 90 dias** (≤ 6 palavras, opcional; o título "Desk by desk…" sai) e **os 6 nomes das mesas** (≤ 2 palavras).
- **O título do FAQ** (1–3 palavras) e as 5 perguntas (≤ 8 palavras) que funcionem **como balão**, ou seja, na voz do dono ("Will it act without my yes?").
- **O H2 final**, que agora se forma palavra por palavra: ≤ 6 palavras, com a última carregando o sentido.
- **O parágrafo `sr-only` do roteiro do telefone.**

### 7.3 Ao frontend-studio: motion com a frase, peso e fallbacks
| Motion | O que aconteceu | Gatilho | Reduced / sem GL |
|---|---|---|---|
| Intro | "Os pontos subiram, montaram o logo, a seta acendeu e virou a rede" | load, 1ª visita | não existe |
| K2 | "O humano virou o agente" | limiar de rolagem | frase final |
| Mesas | "As mesas acenderam no dia em que entraram no ar" | rolagem (palco) | foto de dia + lista |
| Noite → dia | "O dia chegou com todos trabalhando" | rolagem | — |
| Diálogo | "O bookkeeper perguntou e o analyst respondeu" | rolagem | empilhado |
| O sim | "A ordem veio do follow-up, foi aprovada e a luz subiu" | rolagem; a consequência no tempo | 3 telefones parados |
| Decline | "Recusou e nada saiu" | rolagem | idem |
| FAQ | "Cada dúvida respondida subiu para o logo" | rolagem (cursor) | lista aberta |
| Final | "O logo se montou e a pergunta se formou" | rolagem | logo parado |

**Orçamento (celular):**
- Até o LCP, sem mudança (≤ 200 KB): a intro soma ≤ 6 KB inline.
- A cena do escritório baixa lazy, com ~120 KB na versão a e ~140 KB na versão b.
- O AVIF de 270 KB do `<picture>` atual sai: o fallback usa o retrato de 780 px a ≤ 90 KB.
- Nenhuma tarefa longa nova: a intro é CSS, e o roteiro do telefone é uma máquina de estados de O(1) por quadro.

**Fallbacks:** reduced, `?gl=0` e **sem JS (pré-renderizar o `proto.html`**, júri D-sem-JS: hoje a página fica branca) com o mesmo conteúdo.

---

## 8. Ordem de implementação (frontend-studio)

1. **Os bugs e os defeitos do júri (P0, ½–1 dia):**
   - O FAQ: animar com `grid-template-rows`, a opacidade da resposta e a cor das perguntas.
   - O vão de 456 px do final.
   - O vão de 412 px abaixo do telefone.
   - O retângulo duro da máscara de escuro (que vira canto arredondado com borda pontilhada).
   - Os 2 agentes fora da tela a 390 e os agentes acima da dobra a 1440 (júri D2).
   - Os rótulos dos agentes em Arial (`font: inherit` no `.agent`).
   - O `aria-pressed` no tap.
   - O preload da fonte que baixa duas vezes no WebKit (júri D5).
   - O AVIF da maquete de 270 KB (≤ 90 KB no fallback).
   - Os 2× `height: 100vh` do lint.
2. **O botão "Núcleo" (P0, ½ dia, §4.12):** gerar a textura no `?tile=1` (A e B), o CSS dos 8 estados, a medição de contraste em 12 quadros e a flag `?btn=mint`. Vem cedo porque está no CTA do hero e é o Approve do passo 4.
3. **A intro (P0, ½ dia):** o SVG inline + o script no `<head>` + a passagem para o `PosterCanvas`. Prova: o LCP continua sendo o H1, nas gravações de chromium e webkit a 390.
4. **O sim dirigido pela rolagem + a rede no telefone (P0, 1,5 dia):** o palco, a máquina de estados com histerese e recuperação, o 2º `netFrame`, os fios nomeados, os botões apresentacionais com `aria-live`, o Approve revelando a seda e o K4 (em avaliação). Junto, o sim no hero (§4.10).
5. **O kit tipográfico K1/K2/K3 + a noite transformada (P1, 1,5 dia):** o split por palavra, as regras de `aria`, o K1 no formulário e no FAQ, o K3 na noite e a noite do §4.11 (feixes por evento, a linha de registro no alto, a crista com a hora, 1,4 tela).
6. **A cena do escritório, versão a (P0/P1, 2 dias):** as texturas no OGL, a borda em dither, as máscaras elípticas das mesas, a linha dos 90 dias, noite → dia, os diálogos ligados à rolagem, o K2 na abertura e o fallback em `<picture>` com `mask-image`.
7. **Perguntas → logo → final (P1, 1,5 dia):** o triângulo frontal no motor, os balões com as âncoras, o cursor de leitura, a subida dos pontos, a montagem do logo, o K5, os feixes do formulário até o logo e o fim do cone (§4.13).
8. **A pré-renderização sem JS + OG/Twitter/JSON-LD/canonical + favicons (júri, Dev Award; o §9, item 11, falha hoje).**
9. **A versão b do escritório (P2):** as passadas do Blender (`off`, ID e Z) e a paralaxe 2.5D. Só depois de a versão a passar no júri.
10. **A verificação:** gravações Playwright em webkit + chromium a 1440 e 390, reduced, `?gl=0` e sem JS; o `brightPct` ≥ 4% em todo quadro entre o hero e o final; o fps na rolagem dos 3 palcos; o teste de rolagem rápida no sim (nenhum "Sent" pulado).

## 9. Para o design-jury (o que mudou na régua)
- **Item 7 do §9 do v4:** as plantas agora são assimétrica → split → palco largo → cartaz/maquete → centrada nos flancos → título fixo + triângulo → centrada. Nenhuma vizinha igual.
- **Item 9 (jimo):** confira o FAQ contra os quadros 38, 41 e 44 s pela tabela do §4.8, e a cena do escritório contra o jimo de 36 s (ela não tem terreno com etiquetas flutuando: as etiquetas ficam ancoradas em mesas de uma maquete).
- **A régua nova:** `brightPct` ≥ 4% entre o hero e o final.

## 10. Riscos
- **Safari/WebKit:**
  - Texturas de foto no OGL: decodificar com `createImageBitmap` (AVIF no Safari 16+; WebP de fallback) e no máximo 2048 px.
  - Contexto perdido ao trocar de app: as texturas são recarregadas e o fallback em `<picture>` segura a página.
  - O `clip-path` animado em SVG na intro funciona no WebKit, mas **teste**; o plano B é animar a opacidade de duas camadas da seta.
  - `hidden="until-found"` não existe no WebKit (o fallback é a resposta visível a .7).
- **Celular / Instagram:**
  - Com três palcos presos, a `--tela` congelada é obrigatória em todos.
  - A inércia do iOS pula limiares: a máquina de estados recupera em sequência.
  - Orçamento de GPU: a textura do escritório só existe perto do palco e sai da memória longe dele.
- **TBT:** a intro roda durante o boot do React. São 12 camadas compostas, e não 180 nós; se o júri medir quadro perdido, cair para 6 faixas.
- **Acessibilidade:**
  - O telefone apresentacional precisa de um `aria-live` que conte o roteiro, sem disparar a cada quadro (só nos limiares).
  - O K2 tem `aria-label` com a frase final.
  - Nada pisca acima de 3 Hz: a revelação das mesas é uma passagem única e o dissolve da intro tem 4 degraus em 450 ms.
- **Produção de asset:** a versão b depende de abrir o `brandup_hq.blend` (passadas `off`, ID e Z, mais os bonecos revisados). A versão a não depende de nada novo.
- **Conteúdo:** os dias das mesas continuam MODELO (a linha dos 90 dias sai se o dono não confirmar), assim como a prova A$10M+ e os dados do rodapé.
- **A trinca preto + violeta + menta** (júri §5.2): está resolvida pela decisão do dono de reinventar o botão (§4.12). A A ("Núcleo", na rampa da luz quente) tira o menta; a B (menta em seda) fica numa flag para ele comparar. **O risco da A:** o botão pode se confundir com a luz do trabalho. A defesa é o significado (o núcleo = a convergência = a decisão) e a forma (só o botão tem o rótulo e a seta). Se o júri ou o dono lerem confusão, vale a B.
- **O sistema de luz não muda** (júri §1 e §10): a luz nunca encosta no título, e o telefone, o formulário e a acessibilidade ficam como estão. A v4.1 só acrescenta cenas e materiais.
- **O FAQ "como o jimo":** mesmo com o triângulo frontal, um jurado pode ler "balões presos a pontos = jimo". A mitigação é a tabela do §4.8. Se o júri ainda reprovar, a alavanca é tirar as hastes (a pergunta fica ao lado do ponto, sem fio), e não voltar ao `<details>` cru.
- **"Wireless Leap":** pendente (a URL com o dono).
