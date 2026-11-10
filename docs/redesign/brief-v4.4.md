# BrandUp: brief v4.4, "O dado acende a próxima cena"

Autor: ui-ux-director · 09/11/2026 · **emenda o `brief-v4.3.md`** (que emenda v4.2, v4.1 e v4). Continua valendo tudo o que não for citado aqui: a lei 1 (toda luz tem portador), o motor OGL, o formulário, a intro, a maquete com a câmera, o "sim" dirigido pela rolagem, o botão `field`, o rodapé com o wordmark e as métricas eliminatórias do v4.3 §1 (≥ 4% de pixel aceso por quadro, `greenPct` ≤ 1,5%, 5 tamanhos de tipo e motor dormindo parado).
Para: `frontend-studio` (§3 a §9, na ordem do §11), `frontend-craft` (orçamento: §3.1, §12.3 e §13), `type-director` e `copy-director` (§12.1 e §12.2) e `design-jury` (§1, §10 e §13).

**Fora do escopo** (outro frontend-studio está corrigindo em paralelo): a faixa roxa listrada no alto da noite e as caixas pretas vazias das máscaras de texto (K1). Este brief **não mexe no mecanismo da máscara K1**. Ele só define QUANDO o K1 dispara (§8).

**Decisões do dono que este brief não reabre:** o "sim" continua dirigido pela rolagem; o verde `#58F6B1` é o acento de choque, em pouca dose, sempre energia, aura ou dado viajando, e nunca na seta ou no logo; a seta e o logo são roxo e branco; o roxo é luz com grão; o botão é o `field`; o wordmark do rodapé fica; nada de glow genérico.

**O que abri nesta sessão:**
- **A página viva** (`127.0.0.1:5180/proto.html`) no Playwright, em chromium e webkit, a 1440×900 e a 390×844, rolando de 80 em 80 px, com uma foto a cada ⅓ de tela (124 quadros, folhas em `scratchpad/v44/`). O que está no ar hoje: `scrollHeight` 9.279 (1440) e 9.220 (390). As seções a 1440 ficam assim: hero 0, form 900, night 1.681 (1.080), office 2.761 (2.340), you 5.101 (1.800), faq 6.901 (650), final 7.551 (847) e foot 8.398 (881).
- **O código:** `Proto.tsx` (Night, Faq, final e Footer), `engine/engine.ts` (o T3 `uFly`, o T4 "o ponto sai pelo topo e volta por baixo" nas linhas ~570–580, o `uTrav` do telefone, o `uHz`/`uBeam` dos horizontes e o `uRise`), `engine/shaders.ts` (o canal G "mint" e as linhas `uHz`, `uTrav` e `uFly`), `footPeak.ts` (a montanha em canvas 2D: rampa de 4 níveis, Bayer + grão semeado, energia mint no pé, 8 fps só na tela), `nightShift.ts` (a hora → os eventos), `domScenes.ts` (K1/K3/K5 e o cursor do FAQ), `bus.ts`, `content.ts` (night.tasks, office.talk, you.lock) e `proto.css` (`.faq-phone`, `.horizon`, `.phone-aura`).
- **A biblioteca:** o `README.md` e o `repertorio.md` inteiros. As capturas: `jimo/d-00`, `d-02`, `w-08`, `w-10` e `w-12` (o ponto que vira o ponto final da frase); `qclay-p12/d-00`, `d-01`, `d-02`, `d-03` e `d-07` (a esfera que se desmancha; os chevrons que mudam de lugar na órbita); `qclay-home/w-04` e `w-05` (o painel que vira celular); `dribbble-qclay/28` (o halo de pixels em volta da caixa).

**O que eu vi (o diagnóstico que este brief resolve):**
1. **A noite** está bonita e é a cena que o dono "curtiu demais". Mas a informação das mesas é texto de 15 px sob figuras de ~40 px: lê-se como legenda, e não como trabalho. A cama ("You, asleep") recebe o resultado da noite sem que nada chegue até ela.
2. **Escritório → telefone:** a ordem já existe (`engine.ts` ~570: "the follow-up desk lets go of one dot, which rises and leaves through the top of the screen; the you stage brings it back in from below"). **O ponto sai por cima e um outro entra por baixo.** É por isso que o dono não lê uma transição: a viagem acontece fora da tela.
3. **Fim do "sim":** depois do "All clear", o telefone recua para a esquerda a 62% e fica apagado sobre o preto (quadros 20–21 a 1440). O que fica é um bloco escuro parado.
4. **O FAQ** repete o telefone "All clear" (o `.faq-phone`). O dono rejeitou isso.
5. **Coisas que aparecem do nada:** os blocos de dither nas pontas do horizonte do formulário final (o `uHz` liga de 0 para 1 no quadro em que o horizonte entra), a montanha do rodapé (pintada inteira de uma vez) e os textos de corpo (que já estão lá quando a seção entra).
6. **O preto sobre o preto:** as áreas de conteúdo (os 2 formulários e a lista do FAQ) não têm borda nenhuma. O que o dono quer copiar são os "fragmentos": a borda da maquete que se desfaz em pixels claros (o "bege") e o pé verde da montanha do rodapé.

**Equilíbrio de fontes.** O v4.3 não usou o jimo e foi um brief de subtração. Este é um brief de **sistema**: quatro movimentos (jimo ×1, P12 ×2, Dribbble ×1), nenhum $$$ e nenhum asset novo. Pensatori e Prolibu ficaram de fora porque o pedido é de movimento entre cenas, e não de tipo nem de demonstração.

---

## 1. Peça e objetivo

- **A pessoa:** o dono de uma indústria ou de um B2B australiano, vindo do Meta, no **celular**, com pressa e cético.
- **A tarefa dela nesta emenda:** ler a página como **uma máquina só**. O que o time faz de noite chega ao telefone dele, o telefone pede o sim, e o que sobra disso enquadra as respostas e o pedido final.
- **A frase que ela tem que conseguir dizer ao fim:** "o trabalho anda sozinho e chega até mim".
- **Métricas (novas, somadas às do v4.3 §1):**

| Métrica | Meta | Como medir |
|---|---|---|
| Fundo que "pisca" (pop) | **0**: nenhum elemento de fundo vai de < 5% para > 50% dos seus pixels acesos entre dois quadros seguidos | sonda a 60 Hz durante a rolagem lenta (80 px/quadro), por região (`uHz`, a orla e a montanha), nos dois motores |
| Texto que pisca | **0** nós de texto com a opacidade indo de 0 para 1 num quadro só (fora do reduced) | `getComputedStyle` amostrado por quadro |
| Pacotes simultâneos na tela | **≤ 3** | contador exposto em dev (`window.__pkts`) |
| `greenPct` | **≤ 1,5%** em todo quadro (mantém o v4.3) | `capture.mjs` |
| Motor parado | **0 quadro desenhado** 1,5 s depois de parar, mesmo com um pacote pousado | `window.__frames` |
| O teste da frase | 3 em 3 pessoas que veem o vídeo da rolagem dizem que "a bolinha leva a ordem para o telefone" | teste de corredor com o vídeo de 390 |

## 2. Conceito (uma frase)

**"O dado verde é a única coisa que atravessa as paredes entre as cenas: ele nasce onde o trabalho aconteceu e, quando chega, acende a cena seguinte."**

O que isso decide:
- **O verde não é enfeite: é o pacote.** Ele só aparece quando carrega alguma coisa: uma tarefa feita, uma ordem, a energia que sobra do "All clear". Sem carga, ele não aparece.
- **O roxo é o lugar, e o verde é o que viaja.** A luz roxa constrói a cena (o chão, as poças, o horizonte e a orla); o verde a atravessa.
- **Nada acende sozinho.** Todo fundo e todo texto entra por uma regra, e a regra começa no ponto onde o pacote chegou (ou, sem pacote, no chão).

---

## 3. O sistema de transição: "a costura"

Uma linguagem só, com 4 tempos. Todo efeito deste brief é uma instância dela. Se um efeito não cabe nos 4 tempos, ele sai.

| Tempo | O que acontece | Quem desenha | Dirigido por |
|---|---|---|---|
| **1. Coleta** | o trabalho termina num objeto (o monitor, a mesa ou a tela do telefone) e solta o pacote: o objeto clareia 1 nível de Bayer por 2 quadros | DOM (o objeto) + motor (o pacote nasce) | o evento da cena |
| **2. Viagem** | o pacote anda **pelo fundo**, por baixo de todo texto, numa curva de Bézier quadrática, com 3 rastros | motor, canal G (o mint) | **rolagem** (scrub) entre seções; **disparo + relógio** dentro de uma cena |
| **3. Ignição** | onde o pacote toca, a cena seguinte acende **em limiar de Bayer** a partir do ponto de chegada: o pixel acende quando o seu valor na matriz 4×4 fica abaixo do avanço. Nunca é um fade de opacidade | motor (`uHz`, as poças) ou canvas 2D (a orla e a montanha) ou `clip-path` (a tela do telefone) | o avanço da chegada |
| **4. Voz** | o texto da cena entra pela regra do §8, **depois** que o fundo passa de 40% | CSS + 1 IntersectionObserver | a ignição |

### 3.1 A anatomia do pacote (uma só para a página toda)
- **A cabeça:** um blob de raio 7 px (1440) ou 5 px (390) no canal G, desenhado no **mesmo dither de 4 níveis** do resto da luz. Sem bloom, sem halo e sem desfoque. É um grão de luz, e não um brilho.
- **O rastro:** 3 fantasmas na mesma curva, atrasados em Δt = 0,035, 0,07 e 0,105, com intensidade 0,6, 0,35 e 0,15 da cabeça. O rastro é o que deixa a pessoa **ver a direção** sem que a trajetória seja desenhada.
- **A curva:** `B(t) = (1−t)²P0 + 2(1−t)t·P1 + t²P2`. A posição da cabeça usa `e = t²(3−2t)` (smoothstep), que já é a curva do T3. A saída é lenta, o meio é rápido e a chegada desacelera.
- **O orçamento:** no máximo **3 pacotes no ar** ao mesmo tempo (12 blobs). No pior quadro, ~0,05% de verde.
- **No código:** um módulo `transit.ts` calcula as posições (fila, curvas e rastros) e escreve num array novo, **`uPkt[12]` (vec4: x, y, raio, intensidade)**, pintado no canal G. **O `uTrav` e o T4 de hoje viram casos do `uPkt`.** Um caminho de código só para todo pacote da página. O motor fica acordado só enquanto houver pacote em voo, e depois dorme (v4.3 §9.1).

### 3.2 Os fragmentos (a outra metade do sistema)
- O **fragmento** é o grão do rodapé: um ponto de 2 px num passo de 4 px (1440), ou de 1,5 px num passo de 3 px (390), na rampa `#1A0B33 → #9232EA → #C9A2FF → #FBF7FF`. É o mesmo `footPeak.ts`.
- Os fragmentos aparecem em **dois estados**. **Em voo**, quando um objeto se desfaz (o telefone, §6), eles vêm do motor, num array `uFrag[24]` (vec4) pintado no canal I. A intensidade negativa manda para o G: só os 2 fragmentos de energia. **Pousados**, eles são a orla de uma área de conteúdo (§9) e vêm do canvas 2D, pintados uma vez por tamanho.
- **O `uFly` do T3** (as figuras da noite que voam até as mesas) **fica como está**. É roxo porque é o time chegando ao escritório, e não um dado. Ele já obedece à costura: coleta (a figura se desfaz), viagem (o arco) e ignição (a mesa acende).

### 3.3 As costuras da página (o mapa)

| # | De → para | Instância | Estado |
|---|---|---|---|
| C1 | hero → formulário | a rede cai e pousa como chão do formulário (T1) | fica; o ponto de pouso vira a **origem da ignição da orla** do formulário (§9) |
| C2 | formulário → noite | o pôr do sol no horizonte (T2) | fica |
| — | dentro da noite | **as mesas → a cama** (§4) | **novo** |
| C3 | noite → escritório | as figuras voam até as mesas (T3) | fica |
| C4 | escritório → telefone | **a ordem atravessa o fundo e acende a tela** (§5) | **refeito**: hoje o ponto sai por cima e outro volta por baixo |
| — | dentro do "sim" | o enchimento e o ponto que desce até o agente (v4.3 §4.4) | fica |
| C5 | telefone → FAQ | **o telefone se desfaz em fragmentos, e eles viram a orla das perguntas** (§6) | **novo**; o recuo para a esquerda sai |
| C6 | FAQ → final | sem pacote: a orla do final acende **do chão (o horizonte) para cima** (§8) | **refeito**: hoje os blocos aparecem do nada |
| C7 | final → rodapé | a montanha se pinta **do pé para o ápice** em limiar de Bayer; a energia mint do pé é o último verde da página | **refeito**: hoje ela aparece pintada |

**A regra do scrub ou do relógio:**
- **Entre seções**, a transição é **rolagem** (scrub), porque a posição É o tempo. A volta desfaz.
- **Dentro de uma cena**, o evento é **disparado pela rolagem e tocado pelo relógio**, ≤ 1,1 s, para que o pacote sempre chegue. A volta não devolve o pacote: o estado (contadores e linhas) é recalculado pela posição, na hora.
- **Parado no meio de um scrub:** o pacote fica pendurado onde está. Isso é legível ("está a caminho"). O motor desenha esse quadro e dorme.

---

## 4. Item 1: a noite (as placas de turno e a cama alimentada)

### 4.1 O que muda em uma linha
Cada mesa ganha uma **placa de turno**. A tarefa nova escreve-se na placa e solta um pacote verde que voa até o telefone na cama, e a cama vai somando o que a noite fez.

### 4.2 A placa de turno (o "destacar de forma criativa")
Hoje a placa tem nome e "hora · tarefa", numa linha só de 15 px. Agora é uma hierarquia de 3 andares, por tamanho e por opacidade do mesmo tom:

```
Follow-up                 ← Label 15, ink (o nome: quem)
05:05  14 followed up     ← a hora em Label 15 tabular (ink-2) + a tarefa em Lead 18 (ink): o que acabou de fazer
20:15  quote sent         ← a anterior, 40% de opacidade, só a 1440 (a pilha da noite)
```

- **Quando uma tarefa acontece** (a crista passa pelo horário dela, que o `nightShift.ts` já calcula), a placa **rola uma linha, como um placar de estação**: a linha nova entra por baixo do nome, a anterior desce e esmaece até 40%, e a que ainda estava embaixo sai. São 320 ms em `cubic-bezier(.2,.75,.2,1)`, com `overflow: clip` na placa e só `transform`.
- **No mesmo instante, a coleta:** o monitor da figura clareia 1 nível (o `mon` já existe, 2 quadros), e a **poça roxa sob a mesa sobe 1 nível de Bayer por 600 ms e volta**. A luz confirma o trabalho.
- **Em avaliação (`?type=0` desliga):** a tarefa nova escreve-se letra a letra (18 ms por caractere, `steps`) em vez de rolar inteira. É a voz de dado (B4) em movimento. O dono decide vendo.
- **Antes da 1ª tarefa da mesa:** a placa mostra só o nome e um traço de 1 px no lugar da tarefa (o "—" de hoje). Nada de "Idle".

### 4.3 Os pacotes: das mesas até a cama
- **Coleta:** o pacote nasce no centro do retângulo `.mon` da figura.
- **Viagem:** **P0** = o monitor e **P2** = o `.handset` do `Sleeper` (o telefone virado na mesa de cabeceira).
  - **1440:** P1 = (o meio de x, `min(y0, y2) − 0,14·vh`). Um arco **por cima** das placas, que corre no fundo, por baixo do texto. Dura **1.000 ms**.
  - **390:** a casa fica embaixo, na horizontal (`proto.css` linha 433). P1 = (`x0 + (x2 − x0)·0,25`, `(y0 + y2)/2 + 0,06·vh`). Uma descida curva. Dura **800 ms**.
- **Fila:** no máximo 3 no ar, com 140 ms de intervalo. Se a pessoa passar rápido e a fila tiver mais de 3, os excedentes são entregues sem voo (o contador fica certo).
- **Ignição na cama (a chegada):**
  - o `.phone-aura` pisca uma vez (`steps(3)`, 270 ms; o mesmo desenho de hoje, em `animation-iteration-count: 1`);
  - o **contador da noite** na casa sobe 1 numa rolagem de dígito de 240 ms, em algarismos tabulares. Ele vai de 0 a 9: as 9 tarefas com mesa do `night.tasks`. O índice −1 (07:58) é o pedido que espera, e não uma tarefa.
- **Às 07:58 (a última linha do `night.tasks`, a de mesa −1) não sai pacote nenhum.** O telefone acende sozinho (a aura fica, como hoje), e a linha "1 waiting" entra pela regra do §8. Esse "1" é a ordem que o escritório vai mandar no §5: a história fecha.

### 4.4 A casa (o destino)
```
You, asleep                  ← Label 15, ink-2 (o copy pode trocar; o v4.3 pedia ≤ 3 palavras)
[cama + telefone]            ← o pictograma de hoje; o handset é o alvo dos pacotes
9  done overnight            ← o número em Lead 18 tabular, ink; o rótulo em Label 15, ink-2
07:58 · 1 waiting            ← Label 15; entra às 07:58
```

### 4.5 Wireframes

**1440 (12 colunas, gutter 24, margem 64; o palco de 1,2 tela, que não muda). O quadro a p ≈ .55:**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ While you sleep,                                        ◖ 03:05              │
│ the office works.                                                            │
│                    .  ·  ˙ ˙ ˙ ·  .   (pacote + 3 rastros, arco por cima)    │
│  [fig]~poça~      [fig]~poça~      [fig]~poça~  ─ ─ ─ ─ ─ ─ ─ ─ ▸ │ You, asleep│
│  Follow-up        Bookkeeper       Ad manager                     │ [cama ▣]   │
│  05:05 14 followed up  03:40 reminders …  23:05 spend capped      │            │
│  20:15 quote sent (40%) 21:30 order logged (40%)                  │ 9 done     │
│  [fig]~poça~      [fig]~poça~      [fig]~poça~                    │  overnight │
│  Social media     Receptionist     Analyst                        │ 07:58 ·    │
│  00:20 review answered  18:40 enquiry …  01:50 leads ranked       │ 1 waiting  │
│ . . . . . . . . . . grade = chão (c1–c9) . . . . . . . . . . . . .│            │
└──────────────────────────────────────────────────────────────────────────────┘
```
- As placas ocupam a largura das colunas da mesa (c1–c3, c4–c6, c7–c9). **A tarefa pode quebrar em 2 linhas**, mas nunca passa para a coluna do lado.

**390 (4 colunas, gutter 16, margem 20):**
```
┌──────────────────────────┐
│ While you sleep,         │
│ the office works. 03:05◖ │
│ [fig]   [fig]   [fig]    │
│ Follow  Books   Ads      │ Label 15 (o nome curto)
│ 05:05   03:40   23:05    │ a hora, Label 15 tabular
│ 14 fol… remind… spend…   │ a tarefa em Lead 18, ≤ 2 linhas (o copy encurta)
│ [fig]   [fig]   [fig]    │
│ Social  Recep   Analyst  │
│   ˙  ·  ↘ (pacotes descem curvos até o handset)
│ ──────────────────────── │
│ You, asleep [cama▣]  9 done overnight │
│                     07:58 · 1 waiting │
└──────────────────────────┘
```
- **A 390, sem a linha anterior** (40%): não há altura. Só nome, hora e tarefa.

### 4.6 Estados e fallbacks
- **Reduced motion:** é o pôster às 02:14 (como hoje), com as placas no estado daquela hora, o contador no valor daquela hora e nenhum pacote. A placa não rola: troca.
- **`?gl=0` (sem WebGL):** sem pacotes. A placa rola, a aura pisca e o contador sobe (é tudo DOM), e a chegada acontece no mesmo instante da tarefa.
- **Sem JS:** o pôster.
- **Leitor de tela:** os pacotes são decoração. O `night.aria` ganha a frase do resultado: "…and the results reach your phone" (o copy escreve).

---

## 5. Item 2: escritório → telefone (a ordem atravessa o fundo)

### 5.1 O que muda em uma linha
**Um pacote só, sempre na tela.** Ele sai da mesa do Follow-up dentro da maquete, deixa a cena pela borda de fragmentos, atravessa o meio escuro da página enquanto a maquete sobe, e entra no topo da tela do telefone, que **acende a partir do ponto onde ele chegou**.

### 5.2 Por que o Follow-up (e não o balão "Flagged for 8am")
A 1ª ordem do telefone é a do Follow-up ("Your follow-up · A$14,200 · Sam"). O balão "No. Flagged for 8am." é a conversa Bookkeeper → Analyst e continua sendo o último balão do escritório. **No instante em que ele fecha, sai a ordem**: o pacote é a resposta da pergunta que a pessoa nem fez ("e o que chega até mim?").

### 5.3 O roteiro (scrub; s vai de 0 a 1 na costura)
A costura começa onde o T4 começa hoje (`officeR.y1 = 1,25·vh`) e termina quando o topo do telefone do "sim" cruza 70% da tela. A 1440, isso dá ~0,75 tela de rolagem; a 390, ~0,6.

| s | O que acontece | O que a pessoa consegue dizer |
|---|---|---|
| 0–.10 | **Coleta.** O balão "No. Flagged for 8am." sai pela regra do §8 (ao contrário: opacidade a 0 em 200 ms). A mesa do Follow-up clareia 1 nível, e uma etiqueta curta aparece nela (Label 15, o copy escreve, ≤ 4 palavras, algo como "For you: Sam's quote"). O pacote nasce no monitor | "aquela mesa mandou alguma coisa" |
| .10–.30 | **Saída da cena.** O pacote cruza a borda da maquete. **Em avaliação (`?pull=0` desliga):** 6 a 8 fragmentos claros da borda (o "bege" do dither da maquete) se soltam no ponto onde ele cruza, seguem o pacote por 0,08 de s e caem, apagando em 3 níveis | "saiu de lá" |
| .30–.80 | **Viagem.** P0 = a mesa (que sobe com a maquete), P1 = um ponto **fixo na tela** (1440: `0,62·vw, 0,52·vh`; 390: `0,72·vw, 0,5·vh`), P2 = o topo da tela do telefone (que sobe com o "sim"). Como as duas pontas andam com a página e o meio está preso à tela, o pacote **parece pendurado no meio do escuro e escorrendo para baixo**. A etiqueta da mesa some em s .40 | "está indo para algum lugar" |
| .80–1 | **Ignição.** O pacote entra na borda de cima da tela do telefone. A tela, até ali só com o aro, **acende num círculo que cresce a partir do ponto de chegada**: a ordem 1 é revelada por dentro dele. Na frente do círculo, o motor desenha um anel de 2 níveis de Bayer (roxo, e não verde) com 6 px de espessura. A base dos agentes acende como no v4.3 | "chegou no meu telefone" |

- **O que sai do código:** o T4 inteiro (o ponto que sobe e sai pelo topo, `engine.ts` ~570–580) e a reentrada por baixo ("the you stage brings it back in from below along the follow-up wire"). A ordem 1 **não usa mais** o `bus.sim.travel` do agente ao cérebro ao telefone: a viagem dela é esta costura. As ordens 2 e 3 continuam com o `travel` de hoje, dentro da cena.
- **A revelação da tela:** `clip-path: circle(R at X Y)` no `.screen` do telefone, com R = `smooth(.80, 1, s) · diagonal da tela` e X/Y no ponto de chegada. É barato e roda no WebKit. O anel na frente do raio vem do motor (o `uHz` não; um caso novo `uRing` vec4: x, y, r, on).
- **A regra do v4.3 "o telefone nunca aparece vazio" se ajusta:** o telefone pode entrar com a tela apagada, **mas só durante a costura**, e com o pacote visível a caminho. Ele nunca fica apagado e parado.

### 5.4 Wireframes (3 quadros por largura)

**1440:**
```
s ≈ .15                          s ≈ .55                           s ≈ .92
┌────────────────────────────┐  ┌────────────────────────────┐   ┌────────────────────────────┐
│  ░░▓▓ maquete ▓▓░░          │  │  ░░▓ maquete (sobe) ▓░      │   │ You have      ┌──────┐ the │
│  ░▓[Follow-up]•▓░  ← nasce  │  │                             │   │               │◜ ●   │final│
│   ░░▓▓▓▓▓▓▓▓░░ ˙·  sai       │  │              ˙ · •  ← preso │   │               │ ordem│word.│
│        Day 90 ─ ─ ─ ─       │  │                 no meio      │   │               │ 1 …  │     │
│  Never late. …              │  │                     ↓       │   │               └──────┘     │
│                             │  │          ┌────┐ telefone    │   │  · · · · · · (agentes)      │
└────────────────────────────┘  └──────────┴────┴─────────────┘   └────────────────────────────┘
```

**390:** é a mesma sequência, na vertical. A maquete fica no alto, o pacote desce pela faixa direita (x ≈ 0,72·vw), longe do texto K2 que fica à esquerda, e entra no topo do telefone.

### 5.5 Estados
- **Reduced:** sem costura. O escritório termina, e o "sim" começa com os telefones estáticos de hoje (v4.3 §4.3).
- **`?gl=0`:** sem pacote. A tela do telefone acende pelo `clip-path` a partir do centro do topo, dirigida pelo mesmo s. A etiqueta da mesa continua.
- **Voltar a rolagem:** o pacote volta pelo caminho (é scrub), a tela apaga e o balão volta.

---

## 6. Item 3: o fim do "sim" (o telefone se desfaz e vira a moldura)

### 6.1 O que muda em uma linha
O telefone não recua mais. Depois do "All clear", **ele se desfaz em fragmentos ali mesmo, onde está**: a luz da tela de seda vira grão, o grão desce e **pousa em volta da lista do FAQ**, e é ele que acende a orla das perguntas.

### 6.2 O roteiro (scrub)
A costura vai do p .90 do "sim" até o topo da lista do FAQ cruzar 60% da tela (~0,7 tela de rolagem).

| Fase | O que acontece | Tempo / curva | O que a pessoa consegue dizer |
|---|---|---|---|
| p .82–.90 | "08:04 · All clear" parado e legível: é a recompensa | ≥ 600 ms a 1,2 tela/s (sonda) | "acabou" |
| c 0–.35 | **Coleta e dissolução.** A tela de seda some em 4 passos de dither: uma máscara CSS com um sprite de 4 quadros de Bayer 4×4 em densidade decrescente, `mask-position` em `steps(4)` dirigido por c. O aro some junto. Ao mesmo tempo, o motor solta **24 fragmentos** (`uFrag`) de uma grade 4×6 sobre a tela, na cor do pixel de seda daquele ponto (lilás ou core). **2 deles são mint** (a energia do aro, a última dose do "sim") | o sprite em `steps(4)`; os fragmentos nascem com 40 ms de intervalo, de cima para baixo | "o telefone virou luz" |
| c .20–.75 | **Viagem.** Cada fragmento vai até **um ponto da orla do FAQ** (§9: os cantos de baixo e a base da lista). As curvas se abrem em leque para baixo, com P1 deslocado 0,1·vh para fora. Os 2 mint vão para o centro da base, que é onde o pé da montanha do rodapé também tem verde. É a rima | e = smoothstep; cada um leva 0,35 de c | "a luz desceu" |
| c .45–1 | **Ignição.** Onde cada fragmento pousa, a orla do FAQ acende **em limiar de Bayer a partir daquele ponto**: 24 sementes, e o raio de cada uma cresce até a orla ficar inteira | o canvas 2D da orla, desenho incremental | "e emoldurou as perguntas" |
| c ≥ .40 da ignição | **Voz.** O H2 "Questions" entra (K1) e as perguntas e respostas entram pela regra do §8 | §8 | — |

- **O que sai do código:** o recuo do p .92–1,0 do v4.3 §4.4 (`scale` 1 → .62 para a esquerda) e o nó do telefone no FAQ (§7).
- **O telefone no lugar:** a 1440 ele está em c5–c8, e a lista do FAQ ocupa c5–c12 logo abaixo, então o leque abre para baixo e para a direita. A 390 o telefone ocupa quase a largura, e os fragmentos caem quase na vertical até a base da lista.

### 6.3 Wireframe (1440)
```
c ≈ .10                         c ≈ .50                            c ≈ .95
┌────────────────────────────┐ ┌────────────────────────────┐    ┌────────────────────────────┐
│ You have  ┌▚▚▚▚┐ the final  │ │        ˙ ·  ˙   ·          │    │ Questions   Will the AI…   │
│           │▚08▚│ word.      │ │      ·   ˙    ·  ˙ ·       │    │             Only where…    │
│           │▚▚▚▚│ (dither 2/4)│ │  Questions   ˙   ·    ˙    │    │ (contato)   Is my data…    │
│           └▚▚▚▚┘            │ │            ┌───────────┐ ·  │    │             ───────────    │
│            ˙ · ˙ (fragm.)   │ │            │ (lista    │    │    │           ░▒ … lista … ▒░  │
│                             │ │            └───────────┘    │    │          ░▒▒▓▓▓  ▓▓▓▒▒░    │
└────────────────────────────┘ └────────────────────────────┘    └────────────────────────────┘
```

### 6.4 Estados
- **Reduced:** os 4 telefones estáticos do "sim" ficam no "sim" (o 4º é "All clear"). O FAQ aparece com a orla já acesa, sem voo.
- **`?gl=0`:** sem fragmentos em voo. A seda se desfaz pelo mesmo sprite, e a orla acende a partir do centro da base (a regra sem pacote do §8).
- **Voltar a rolagem:** é scrub. Os fragmentos voltam, a tela se recompõe e o "All clear" reaparece.

---

## 7. Item 4: o FAQ sem telefone

- **Sai:** o `.faq-phone`, o `LockScreen still` no FAQ, a flag `faqPhone` e as regras `.faq-phone*` do CSS.
- **Entra em c1–c4, no lugar do telefone:** o H2 "Questions" preso (`sticky top: 16vh`) e, embaixo dele, **uma linha de saída humana**: "ainda tem uma pergunta? fale com a gente", com o e-mail e o telefone como links reais (os do rodapé: `hello@…` e `02 5550 1234`). Body 16 em `ink-2`, os links em `ink`, alvos ≥ 44 px. A função dessa linha é responder a 6ª pergunta (a que não está na lista) sem formulário. O copy escreve (≤ 10 palavras + os 2 contatos).
- **A lista (c5–c12, 2 colunas, as 5 respostas abertas)** fica como está no v4.3 §5.2, **dentro da orla** (§9), que é o que dá a luz à seção agora que o telefone saiu.
- **390:** o H2, depois a lista (2 abertas + 3 em acordeão, como hoje), depois a linha de contato. A orla tem só a base e os cantos de baixo (§9.3).

```
1440                                                              390
┌───────────────────────────────────────────────────────────┐     ┌──────────────────────┐
│ Questions (H2)        │ Will the AI act…  │ Will it work…  │     │ Questions            │
│                       │ Only where you…   │ In most cases… │     │ Will the AI act… −   │
│ Still have one?       │ ───────────────── │ ────────────── │     │ Only where…          │
│ hello@brandup.com.au  │ Is my data safe?  │ How long until…│     │ Is my data safe? −   │
│ 02 5550 1234          │ Your data is…     │ The first…     │     │ How much…        +   │
│                       │ How much…         │                │     │ Will it work…    +   │
│                     ░▒▒▓ (orla: cantos de baixo + base) ▓▒▒░│     │ How long…        +   │
└───────────────────────────────────────────────────────────┘     │ Still have one? …    │
                                                                   │ ░▒▓▓▓ base ▓▓▓▒░     │
                                                                   └──────────────────────┘
```
- **A regra dos 4% (v4.3):** sem o telefone, o FAQ a 1440 depende do texto denso + a orla. Se um quadro ficar entre 3,5% e 4%, o studio **reporta o número e não infla a orla**. A exceção, decido eu, com a foto.

---

## 8. Item 5: a regra de entrada (textos e fundos)

Uma tabela só. Todo nó que entra na página é de uma destas classes, marcado com `data-in="<classe>"`. Nenhum efeito avulso.

### 8.1 Fundos (a ignição)

| Classe | Exemplos | Como entra | Dirigido por | Origem |
|---|---|---|---|---|
| `ground-hz` | o horizonte dos 2 formulários (`uHz`) | **a linha se desenha do centro para as pontas** (a abertura vai de 0 a 100% da largura) e, só depois, a franja e os blocos de dither sobem em limiar de Bayer (2 níveis). O `uHz.w` deixa de ser "liga" e passa a ser o avanço `ign` | scrub: `ign = smooth(0,98·vh, 0,62·vh, topo do horizonte)`; a linha usa ign 0–.5 e a franja .5–1 | o centro da linha (ou o ponto de pouso do C1 no 1º formulário) |
| `ground-orla` | a orla dos 3 cartões (§9) | limiar de Bayer a partir das sementes | disparo (IO a 20% visível) + relógio de 640 ms, ~16 passos a 24 fps; depois para | o pouso dos fragmentos (FAQ) ou o centro da base (sem pacote) |
| `ground-peak` | a montanha do rodapé | **do pé para o ápice**, em limiar: a linha de corte sobe com o avanço, e cada ponto acende quando `bayer < avanço − altura relativa` | disparo (IO a 25%) + 900 ms `cubic-bezier(.3,.6,.2,1)`; depois o brilho de 8 fps de hoje, que para em 5 s | o pé (a energia mint acende por último: o último verde da página) |
| `ground-pool` | as poças da noite e do escritório | já vêm da cena (a crista e a câmera) | — | fica |

- **A curva de todo scrub de fundo:** linear na posição (a rolagem já é a curva da pessoa). O avanço, no motor, tem `approach` de 0,12 (o que já existe) para não serrilhar com a roda.
- **Nunca:** fade de opacidade num fundo, fundo que liga num quadro, fundo que entra antes do pacote que o acende.
- **A volta:** o `ground-hz` desfaz (é scrub); a `ground-orla` e o `ground-peak` ficam acesos depois de acesos (disparo de uma vez só).

### 8.2 Textos (a voz)

| Classe | Exemplos | Como entra | Tempo / curva | Gatilho |
|---|---|---|---|---|
| `voice-h2` | todo H2 com K1 | **o mecanismo K1 de hoje** (a máscara está sendo consertada em paralelo); só muda o gatilho | 560 ms, `cubic-bezier(.2,.75,.2,1)`, 90 ms entre linhas | quando o fundo da seção passa de 40%; sem fundo, IO a 20% |
| `voice-body` | lede, respostas do FAQ, a linha de contato, a nota do formulário | opacidade 0 → 1 + `translateY` de 12 px a 0 (8 px a 390) | 480 ms, `cubic-bezier(.2,.7,.2,1)`, 60 ms entre itens, **no máximo 6 em escada** (o resto entra com o 6º) | 120 ms depois do `voice-h2` da mesma seção começar |
| `voice-data` | as placas da noite, o contador, "1 waiting", a etiqueta da mesa | a rolagem de uma linha (placar), ou letra a letra (em avaliação) | 320 ms / 240 ms (o dígito) | o evento da cena |
| `voice-control` | os campos, os blocos de faturamento, o botão `field` | **só a opacidade**, 240 ms, junto com a orla. Sem `translate`: o controle tem que estar onde a mão espera | 240 ms `ease-out` | junto com a `ground-orla` |
| `voice-k` | K2, K3, K5 | os de hoje | — | ficam |

- **Nunca:** o H1 (é o LCP), o botão escondido mais de 240 ms, texto invisível se o JS falhar (toda regra fica atrás de `html.js`), letra a letra em parágrafo, e o texto voltar a sumir quando a pessoa rola para cima (a voz entra uma vez só).
- **Técnica:** **um** IntersectionObserver para a página toda, que liga `data-in-state="on"`. As transições ficam no CSS. O gatilho por fundo (o "40% da ignição") vem do motor pelo `bus` (`bus.ign[sceneId]`), lido pelo `domScenes.ts`. Nada de `animation-timeline` nesta versão (o suporte no WebKit não está verificado), e nada de biblioteca nova.

### 8.3 O exemplo do dono, resolvido: "Want a team like this?"
Quando o horizonte do formulário final entra: (1) a linha se desenha do centro para as pontas; (2) os blocos de dither das pontas (que hoje aparecem do nada) **sobem do horizonte** e viram os cantos de baixo da orla do formulário (§9); (3) a 40%, o K5 começa e os 6 agentes acendem, um por palavra (v4.3); (4) os campos aparecem em 240 ms. **Antes de mudar, o studio confirma no shader qual termo pinta esses blocos** (a franja do `uHz`, linha 180, ou os `uBeam`, linha 186), porque eles passam a ser da orla.

### 8.4 Reduced motion
Tudo entra no estado final, sem tempo: a ignição é 1, os textos ficam visíveis e não há pacote nem fragmento em voo. É o critério de sempre: o reduced não ganha um fade no lugar do movimento.

---

## 9. Item 6: a orla (os fragmentos em volta das áreas de conteúdo)

### 9.1 O que é
A **orla** é a mesma matéria do pé da montanha e da borda da maquete: grão que nasce do chão. Ela fica **fora** do retângulo de conteúdo, nunca embaixo do texto, e marca a área sem desenhar uma caixa.

### 9.2 A geometria (1440)
- **O retângulo de conteúdo R** é a caixa da área + 40 px de respiro. A faixa livre entre R e o texto é de 16 px, no mínimo.
- **A base:** uma faixa de 72 px abaixo de R, densa junto da linha de R e rareando para fora. **O horizonte do formulário (`uHz`) é a linha dessa base**: a orla e o horizonte são a mesma coisa.
- **Os lados:** uma faixa de 56 px para fora de R, que sobe de baixo até **45% da altura de R** e rareia até zero. **Em cima não há nada**: a luz vem do chão (a lei do horizonte).
- **Os cantos de baixo são os mais densos.** É ali que ficavam os "blocos" do formulário final.
- **A cor:** a rampa do `footPeak` (deep → brand → lilás → core), com o core só na fileira colada a R. **1 em cada 6 fragmentos das pontas de cima dos lados** leva o tom quente das lâmpadas do escritório. Esse é o "bege" que o dono gostou. (Confira no `shaders.ts` o valor que a maquete usa para a lâmpada; não crie uma cor.)
- **O verde:** só **na base, nos 30% do meio**, ≤ 24 fragmentos, no dither de 2 níveis. É o pé verde da montanha, repetido em pouca dose. Meta: ≤ 0,3% de `greenPct` por orla.
- **A vida:** ≤ 6 fragmentos piscam 1 nível, a 8 fps, só com a orla na tela, e **param em 5 s** (v4.3 §9.1). No reduced, nada pisca.

### 9.3 A 390
- R = a caixa + 20 px (a margem). Os lados usam **só a margem de 20 px** e sobem até **25% da altura** (não há espaço sem invadir o texto). A base tem 40 px.
- O verde da base fica nos 30% do meio, ≤ 12 fragmentos.

### 9.4 Onde (3 lugares, nunca mais)

| Área | Por que ela | Origem da ignição |
|---|---|---|
| O 1º formulário ("One call. Your plan.") | é a 1ª ação da página | o pouso da rede (C1) |
| A lista do FAQ | é a área de confiança, e tirou o telefone | os 24 fragmentos do telefone (C5) |
| O formulário final ("Want a team like this?") | é a última ação; é o exemplo do dono | o centro do horizonte (C6, sem pacote) |

**A noite, o escritório e o "sim" não ganham orla:** são cenas com luz própria (os monitores, a maquete e a tela). Uma orla neles seria luz sem portador.

### 9.5 Técnica
- **Um `orla.ts`** que generaliza o `footPeak.ts`. Extrair o pintor de grão (`buildField`: Bayer + grão semeado + rampa) para um módulo comum e usar nos dois. Um `<canvas>` por área, `position: absolute` atrás do conteúdo, `aria-hidden`, `pointer-events: none`. Pintado **uma vez por tamanho** num canvas fora da tela. A ignição é desenho **incremental** (a cada passo, só os pontos que acabaram de passar o limiar), e o canvas para quando termina.
- **Sem WebGL:** a orla funciona igual (é canvas 2D). **Sem JS:** sem orla, e a página fica como hoje.
- **O horizonte no motor:** nas 3 áreas com orla, o `uHz` fica só com a **linha de 2 px e os `uBeam`** dos campos. A franja dele (os termos `dy < 0` da linha 180) sai, porque a orla a substitui. Não pode haver franja dupla.

---

## 10. Movimentos escolhidos (4) e descartados

| # | Código | Captura (aberta) | Porquê aqui | O que muda em relação à fonte | Custo |
|---|---|---|---|---|---|
| 1 | **F7: um sinal que atravessa a página** | `jimo/d-00 → d-02`, `w-08 → w-10 → w-12` (o ponto de luz do hero vira o ponto final de "Every user gets a guide.") | É o pedido do dono quase literal: a bolinha que sai de uma cena e alimenta a outra. O repertório exige um elemento mínimo que **já tenha significado**, e o nosso tem: a tarefa feita, a ordem | No jimo, é **um ponto branco com glow**, no centro, numa órbita decorativa, que vira pontuação de uma frase. Aqui é **um grão mint em dither, sem brilho**, que **carrega um evento real** (a tarefa, a ordem), anda pelo fundo de um objeto para outro (do monitor para o telefone) e, **ao chegar, acende a cena**. Ele nunca vira pontuação nem fica no centro | $$ |
| 2 | **E5: trajetória animada** | `qclay-p12/d-03` vs `d-07` (os chevrons "»" mudam de lugar na órbita do roadmap) | A noite precisa mostrar **o caminho** do trabalho até a cama sem desenhar fios (que sujariam a cena) | No P12, a órbita é **uma linha fixa desenhada**, com chevrons e marcos em cima. Aqui **o caminho não existe**: só o pacote e 3 rastros o mostram, e só durante o voo. São 6 arcos curtos (um por mesa), **todos com o mesmo destino** (o handset), e não uma linha do tempo | $$ |
| 3 | **E2: desmontar a cena para virar a próxima** | `qclay-p12/d-00 → d-01 → d-02` (a esfera e as bolhas se desfazem e se dispersam); `qclay-home/w-04 → w-05` (o painel vira celular) | O fim do "sim" precisa virar o FAQ sem o telefone ficar parado (itens 3 e 4) | Na Qclay, **o objeto continua** (o painel vira celular, a esfera encolhe no mesmo lugar). Aqui **o objeto deixa de existir**: a luz dele é entregue e vira **a borda da área seguinte**. Não é uma transformação de forma, é uma **passagem de luz** com destino (os cantos da lista) | $$ |
| 4 | **C6: halo de pixels** (a textura digital) | `dribbble-qclay/28` (o campo de pixels em volta da caixa, com os feixes em V) | O preto sobre o preto: as áreas de conteúdo precisam de borda sem caixa (item 6) | No shot 28, o halo é **simétrico, ciano e envolve um objeto 3D**, com feixes de luz. Aqui a orla é **assimétrica e nasce do chão** (base e cantos de baixo, nada em cima), **sem feixes, sem glow**, no grão da nossa montanha, e emoldura **texto e campos**, e não um objeto | $ |

**Soma:** $$ + $$ + $$ + $. **Nenhum $$$.** Nenhum asset novo: tudo reusa o motor (`uPkt`, `uFrag` e `uRing` são arrays pequenos no shader que já existe) e o pintor do `footPeak`.

**O teste de sobreposição:** a noite com os arcos, ao lado do P12 `d-03`, não tem linha nem chevron nem marco; a costura C5, ao lado do P12 `d-00 → d-02`, não tem esfera no centro e não acaba no mesmo lugar onde começou; e a orla, ao lado do Dribbble 28, não tem objeto, simetria nem feixe. Passa.

### Descartados

| Ideia | Porquê não |
|---|---|
| **B10 (a frase que acende palavra por palavra) em todo texto** | Já existem o K3 e o K5 para os 2 momentos narrativos. Em todo texto, vira tique de IA, e o repertório limita a UM H2 |
| **E7 (mergulho de câmera) do escritório para o telefone** | É a transição mais "uau", mas a regra do E7 veta tráfego de celular pago, e ela exige 3D em tempo real ou render. O pacote faz a mesma costura com 4 blobs |
| **D1 (vídeo pré-renderizado da transição)** | Não responde à rolagem nem ao evento; custa render e peso; quebra a regra "o dado é real" |
| **E4 (marquee entre as seções)** | Movimento perpétuo sem significado. É o slop que a régua "alguém consegue dizer o que aconteceu?" corta |
| **Desenhar os fios da noite** (linhas fixas de cada mesa até a cama) | Seis linhas em cima da grade e da crista sujam a cena que o dono amou. O rastro do pacote basta |
| **Orla em toda seção** | Luz sem portador na noite, no escritório e no "sim", que já têm luz própria. 3 áreas, nunca mais |
| **Halo/glow em volta do pacote** | É o "glow do jimo" que o próprio repertório chama de slop, e é contra a regra do dono |
| **O telefone pequeno no FAQ** (a saída de emergência do v4.3) | O dono rejeitou. A luz do FAQ vem da orla e do texto |
| **Pacote no T1/T2** (hero → formulário → noite) | Ali ainda não há trabalho feito para carregar. O verde sem carga quebra o conceito. As duas costuras ficam com a luz roxa de hoje |

**Brigas conferidas:** A1 × A5 não se aplica (a rolagem é nativa); B3 × C2 não se aplica. **Dentro do sistema:** o F7 diz "não usar mais de um sinal". A noite tem até 3 pacotes ao mesmo tempo, mas é **um sinal só que converge** (o mesmo dado, o mesmo destino, a mesma forma). Fora da noite, há sempre 1. Se o júri ler "chuva de pontos", a fila cai para 2.

---

## 11. Ordem de implementação (frontend-studio, uma árvore, um agente por vez)

**Antes de tudo:** esperar o outro studio terminar a faixa roxa da noite e as máscaras K1. Este trabalho começa na árvore dele já mesclada.

| # | Passo | Prioridade | Depende de | Verificar |
|---|---|---|---|---|
| 1 | **A fundação da costura:** `transit.ts` (as curvas, a fila de no máximo 3 e os rastros), os uniforms `uPkt[12]`, `uFrag[24]` e `uRing` no shader (o `uPkt` no canal G; o `uFrag` no I, com a intensidade negativa indo para o G), o motor acordado só com pacote em voo, e o `bus.ign` | P0 | — | `__frames` = 0 parado com um pacote pousado; `__pkts` ≤ 3; nenhuma mudança visual ainda |
| 2 | **A noite (§4):** as placas de 3 andares, a rolagem de linha, a poça que sobe, os pacotes até o handset, o contador, a casa | P0 | 1 | o vídeo da rolagem a 1440/390 nos dois motores; `greenPct` ≤ 1,5%; a placa nunca invade a coluna vizinha; reduced = o pôster com as placas certas |
| 3 | **Escritório → telefone (§5):** tirar o T4 e a reentrada por baixo; o pacote único em scrub; o `clip-path` da tela + o `uRing`; a etiqueta da mesa | P0 | 1 | o pacote está na tela em **todo** quadro da costura (sonda: a posição do `uPkt` dentro do viewport); `litPct` ≥ 4% |
| 4 | **A orla (§9)** nos 3 lugares, com o pintor extraído do `footPeak`; tirar a franja do `uHz` onde há orla | P1 | — | `greenPct` da orla ≤ 0,3%; sonda: nenhum fragmento dentro de R + 16 px; WebKit DPR 2 sem serrilhar |
| 5 | **O FAQ sem telefone (§7)** + a linha de contato | P1 | 4 | `.faq-phone` = 0 no DOM; links de 44 px; ≥ 4% a 1440 (ou o número reportado) |
| 6 | **O fim do "sim" → FAQ (§6):** a seda em `steps(4)`, os 24 fragmentos, a ignição da orla pelas sementes; tirar o recuo | P1 | 1, 4, 5 | o vídeo; voltar a rolagem recompõe o telefone; "All clear" legível ≥ 600 ms |
| 7 | **A regra de entrada (§8) na página toda:** `data-in`, o IO único, o gatilho pela ignição, o horizonte do centro para as pontas, a montanha do pé para o ápice | P1 | 1, 4 | as sondas de pop: 0 fundo e 0 texto que pisca; o H1 intocado (LCP ≤ 1,8 s a 390 como no v4.3) |
| 8 | **Em avaliação, ligados por padrão:** `?type=0` (a letra a letra na noite) e `?pull=0` (os fragmentos da maquete que seguem o pacote) | P2 | 2, 3 | as flags desligam sem deixar resto |

**Depois de cada passo:** o `capture.mjs` (`litPct` e `greenPct` por quadro) em chromium e webkit, 1440 e 390, com motion e com reduce, e **um vídeo de 390 da costura mexida** anexado. **O júri entra depois do passo 7.**

---

## 12. Pedidos

### 12.1 Ao type-director (papéis; a escala e as famílias são suas, dentro dos 5 tamanhos do v4.3)
- **A placa da noite:** o nome em Label 15, a tarefa em **Lead 18** (sobe de 15) e a hora em Label 15 com **algarismos tabulares**. Se a família de texto não tiver `tnum`, diga qual papel assume a hora.
- **O contador da casa** ("9 done overnight"): o número em Lead 18 tabular; a rolagem do dígito precisa de largura fixa.
- **Nenhum tamanho novo.** A placa maior a 390 (Lead 18 numa coluna de 116 px) quebra em 2 linhas: confirme que a entrelinha do Lead aguenta 2 linhas sem colidir com a figura de baixo.

### 12.2 Ao copy-director (função e tamanho; o texto é seu)

| Bloco | Função | Tamanho |
|---|---|---|
| As tarefas da noite (as 9 de hoje) | Caber em Lead 18 em 2 linhas de coluna de mesa a 390 (~12 caracteres por linha) | ≤ 22 caracteres |
| O contador da casa | Dizer "o que foi feito enquanto você dormia", junto do número | ≤ 3 palavras |
| A etiqueta da mesa do Follow-up na costura C4 | Dizer que aquilo vai para você | ≤ 4 palavras |
| A linha de contato do FAQ | A 6ª pergunta: "e se a minha não está aí?", com o e-mail e o telefone | ≤ 10 palavras + os 2 contatos |
| O `night.aria` | Acrescentar que os resultados chegam ao telefone | + 1 oração |
| O `sr-only` do "sim" | Nada muda (o `aria-live` das ordens fica) | — |

### 12.3 Ao frontend-studio (motion com a frase, peso, fallbacks)
- **Cada movimento tem a sua frase de "o que aconteceu"** (as tabelas dos §4 a §6). Se a frase não couber, o movimento sai.
- **O que sai do código:** o T4 (a subida pelo topo e a reentrada por baixo); o `travel` da ordem 1; o recuo do telefone (p .92–1); o `.faq-phone` e a flag `faqPhone`; a franja do `uHz` nas áreas com orla; o `.phone-aura` em `infinite` (vira uma vez por chegada e acesa fixa às 07:58).
- **O que entra:** `transit.ts`, `orla.ts` (com o pintor comum extraído do `footPeak.ts`), `uPkt`, `uFrag`, `uRing`, `bus.ign`, `data-in` + o IO único, as placas de turno e o contador.
- **Orçamento de peso:** sem asset novo; o sprite de dither da seda (4 quadros, PNG indexado) ≤ 2 KB; o JS novo ≤ 6 KB gz (`transit.ts` + `orla.ts`). O total continua ≤ 240 KiB.
- **Fallbacks:** reduced = os estados finais; `?gl=0` = tudo o que é DOM e canvas 2D (as placas, o contador, a aura, o `clip-path`, a orla e a montanha), sem pacote e sem fragmento em voo; sem JS = o pôster de hoje.

---

## 13. Riscos

- **Safari/WebKit.**
  - `clip-path: circle()` animado no `.screen`, que tem `border-radius` e a seda dentro: confira se o WebKit não perde o arredondamento durante o clip (se perder, use `mask-image: radial-gradient` com uma borda dura de 1 px).
  - `-webkit-mask-image` com o sprite em `steps(4)` na seda: o WebKit pede o prefixo, e a máscara num elemento com `will-change: transform` pode rasterizar borrado (o sprite tem que cair em pixel inteiro; DPR 2 e 3).
  - O canvas 2D da orla a DPR 3: limite o DPR do canvas a 2, como o `footPeak` já faz.
- **Celular.**
  - Na costura C4 a 390, o pacote passa pela faixa direita (x 0,72) e o K2 fica à esquerda. Confira a 360 px que eles não se cruzam.
  - A rolagem rápida no "sim" encurtado do v4.3: a costura C5 acontece em ~0,7 tela. Em 1 s de dedo, a pessoa vê a dissolução inteira. É aceitável (é scrub, e voltar mostra de novo).
  - O Instagram muda o `svh` na rolagem (a memória `instagram-svh-muda-na-rolagem`): as curvas usam `--tela` congelada, e não `innerHeight` ao vivo, senão o ponto P1 "preso à tela" pula 372 px.
- **Desempenho.** O pacote mantém o motor acordado só durante o voo. Ao parar no meio de um scrub, o motor desenha 1 quadro e dorme. A orla pinta uma vez. Os pontos de risco são a ignição incremental (16 passos × 3 orlas, nunca ao mesmo tempo) e os 24 `uFrag` no shader: o laço tem que ter o `if (uFragOn > 0.)` na frente, como o `uFlyOn`.
- **Acessibilidade.** Nada pisca mais de 3 vezes por segundo (a aura é 1 vez por chegada; os fragmentos da orla, 1 nível a 8 fps por ≤ 5 s). O texto nunca fica escondido sem JS. O foco nunca cai num elemento que ainda está com opacidade 0 (a voz de um item com foco entra na hora).
- **Dose de verde.** Os pacotes da noite + a base da orla + o `field` no mesmo quadro (o formulário final com a orla). Sonda por quadro, e não por média. Se passar de 1,5%, **a orla perde o verde antes** do botão e do pacote.
- **A leitura "chuva de pontos" na noite.** Se o júri ou o dono lerem como enfeite, a fila cai para 2 e o rastro para 2 fantasmas. O pacote nunca vira decoração contínua: sem evento, não há pacote.
- **Produção de asset.** Nenhum render e nenhuma foto. O único arquivo novo é o sprite de 4 quadros de Bayer (gerado por script).
