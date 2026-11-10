# BrandUp: brief v4.3, "Cada tela acesa, um triângulo no fim"

Autor: ui-ux-director · 09/11/2026 · **emenda o `brief-v4.2.md`** (que emenda o v4 e o v4.1). Continuam valendo o sistema de luz (lei 1: toda luz tem portador), o motor OGL, o formulário, a intro "a base acende e vira a seta", a maquete em dither com o loop e a câmera, a troca "Sometimes late → Never late" e a noite com hora.
Para: `frontend-studio` (§4 a §9, na ordem do §12), `frontend-craft` (§9, orçamento), `type-director` e `copy-director` (§10), `design-jury` (§13).

**Decisões do dono que este brief NÃO reabre** (o júri sugeriu o contrário em algumas, e eu não sigo o júri nelas):
1. O "sim" (Approve) é **dirigido pela rolagem**, sem clique. Aqui ele fica mais legível e mais expressivo (§4.4), mas **não volta a ser botão**. O ganho de +0,07 que o júri estima para "devolver a mão" fica fora da conta, de propósito.
2. O verde `#58F6B1` é a cor de choque e o botão é o `field`. Mexo só na **dose a 390** (§4.4).
3. A seta e o logo são **roxo e branco**, nunca verdes. O verde é energia e aura.
4. O rodapé com o wordmark grande foi pedido pelo dono, com referências. Ele **fica**. Refino o encaixe (§5.4), não removo.

**O que abri nesta sessão:**
- `juri-v46.md` inteiro e as evidências: `sheet-chromium-1440-motion.jpg`, `sheet-chromium-390-motion.jpg`, `v-A-hero-night.jpg`, `v-E-390.jpg`, `v-F-office-desks.jpg`, `v-H-you-faq-foot.jpg`, e o `_capture.json` (o `litPct` e o `greenPct` de cada quadro, por motor e largura, e o topo e a altura de cada seção).
- **A página viva** `127.0.0.1:5180/proto.html`, no Playwright com chromium e webkit, a 1440×900 e a 390×844. A altura e as seções batem com o build que o júri mediu nos dois motores (12.559 px a 1440 e 11.181 px a 390; hero 900, form 781, night 1.260, office 2.880, you 2.970, faq 1.522, final 1.105). Fotografei 5 pontos em chromium nas duas larguras. A noite a 1440 confirma o achado do júri: as seis figuras têm ~40 px e ocupam o quadrante de cima à esquerda, e a metade de baixo da tela fica vazia.
- **O código.** `proto.css` (a noite, o "sim", o FAQ, o final e o rodapé), `type.css` (os tokens), `Proto.tsx` (a ordem das seções), `content.ts` (o FAQ com 5 perguntas, `final.h2`, as colunas do rodapé) e o trecho do escritório no `engine/engine.ts` (as linhas 457–527: a câmera `zFit`, o `uDesk` e as poças que já são cortadas fora da janela).
- **A biblioteca.** O `README.md` e o `repertorio.md` inteiros. Abri as capturas `qclay-home/w-03.webp` ("WE CREATE" sozinho no branco) e `pensatori-irrazionali/d-01.webp` (a lista de clientes em duas colunas, com fios).
- **O que NÃO reabri:** `prolibu-sales/d-06/d-23` e `qclay-home/w-04→05`. Cito F5 e E2 só pelo repertório, e a prova que uso é a nossa (as fotos do júri).

**Equilíbrio de fontes.** O v4.1 puxou do jimo; o v4.2 usou só a nossa marca, a Pensatori e a Qclay. Este brief não usa o jimo e quase não acrescenta movimento: **é um brief de subtração**. Quatro movimentos baratos, nenhum $$$ novo, e a maior parte do ganho vem de tirar (altura, triângulos, tamanhos de tipo e quadros desenhados à toa).

---

## 1. Peça e objetivo

- **A pessoa** continua a mesma: o dono de uma indústria ou de um B2B australiano, vindo do Meta, **no celular**, com pressa e cético.
- **A tarefa dela nesta emenda:** atravessar a história sem cair em tela preta, entender a noite num relance e chegar ao formulário final sem a sensação de "isso não acaba".
- **Métricas (eliminatórias para o studio declarar pronto):**

| Métrica | Hoje (v4.6) | Meta v4.3 | Como medir |
|---|---|---|---|
| Altura da página a 1440 | 12.559 px (14,0 telas) | **≤ 9.900 px (≤ 11 telas)** | `scrollHeight` |
| Altura da página a 390 | 11.181 px (13,2 telas) | **≤ 9.700 px (≤ 11,5 telas)** | idem |
| Quadros < 4% de pixel aceso (L > 25), do fim do hero ao fim do rodapé | 12/25 (1440) | **0**, nos dois motores e nas duas larguras | `capture.mjs` do júri (uma foto a cada meia tela) |
| Média de pixel aceso nesses quadros | ~5% (1440) | **≥ 7%** | idem |
| Verde por quadro | máx. 3,65% (390) | **≤ 1,5%** em todo quadro | `greenPct` |
| Triângulos visíveis na página | 5 | **3** (intro, rede do hero, rodapé), nunca em seções seguidas | leitura + contagem no DOM/motor |
| Tamanhos de tipo por largura | 9 | **5** (o wordmark e a seta são desenho) | `getComputedStyle` em todo nó de texto |
| Texto < 13 px | 8 blocos | **0** | idem |
| `color-contrast` (axe) | 1 serious | **0** | axe nos dois motores |
| LCP a 390 (4G lento + 4× CPU) | 2,10 s | **≤ 1,8 s na mediana de 5 corridas, nenhuma > 2,0 s** | CDP |
| Página parada | o motor desenha | **0 quadro desenhado e 0 tarefa longa depois de 1,5 s parado** | §9 |

## 2. Conceito (uma frase)

**"Toda tela tem uma luz com dono, e o logo aparece três vezes: quando nasce, quando trabalha e quando a página acaba."**

O que isso decide:
- **Tela escura sem portador de luz é defeito, não estilo.** Cada quadro tem gente, tela de telefone, monitor, horizonte ou texto denso. Onde não dá para encher, a página encurta.
- **O triângulo vira pontuação, não bordão.** Ele nasce na intro, trabalha no hero (a rede) e assenta no rodapé. No meio (FAQ e final) entra outra coisa, que diz o que aquela seção diz.

---

## 3. Movimentos escolhidos (4) e descartados

| # | Código | Captura que prova (aberta) | Porquê aqui | O que muda em relação à fonte | Custo |
|---|---|---|---|---|---|
| 1 | **A3: alternância cheio/vazio**, aplicada como **regra de corte** | `qclay-home/w-03.webp`: a tela "vazia" da Qclay só tem UMA coisa, em escala de display ("WE CREATE" a ~120 px no meio do branco) | Os 12 quadros escuros têm **coisas pequenas em tela grande** (uma moldura de telefone vazia, um FAQ de 15 px, rótulos de 12 px). Isso não é o vazio do A3, é o vazio por falta. A regra: um quadro ou está cheio (≥ 4% aceso, com portador) ou é cortado | Na Qclay, o vazio é uma palavra no branco, e lá é cena. **Aqui não há vazio declarado**: a regra é usada para cortar. O único respiro que fica é uma transição de 0,15 tela, e mesmo ela tem um objeto aceso (o telefone recuando, §5.2) | $ |
| 2 | **A5: lista tipográfica no lugar da grade**, no FAQ, com o telefone do "sim" como âncora (o E2 do repertório: a cena se desmonta para virar a próxima) | `pensatori-irrazionali/d-01.webp`: a lista de clientes em 2 colunas de linhas com fio, que ocupa a largura toda e se lê sem moldura | O FAQ hoje é zigue-zague em volta de um triângulo, com caixas que recortam o triângulo (D6). A tarefa ali é **confiar**, ou seja, ler. Uma lista lê | Na PI, a lista é de **nomes a 60 px com logo e seta**, num fundo claro. Aqui são **perguntas a 18 px com a resposta sempre aberta embaixo**, em 2 colunas de texto, sem logo, sem seta, sem moldura e com fios a alpha .08. O que dá a luz não é a lista: é o **telefone "All clear"**, que sai do clímax do "sim" e fica preso à esquerda como âncora da seção (§5.2). Não há nada parecido na PI | $ |
| 3 | **C9b refeita: a figura da noite é a figura da maquete** | As nossas `v-B-office.jpg` e `v-F-office-desks.jpg` (as figuras de resina iluminadas pelo monitor) contra `v-A-hero-night.jpg` (os pictogramas 1-bit) | Item 3 do pedido. O júri leu "conjunto de ícones". A figura precisa ser **a mesma pessoa** que o visitante vai ver no escritório, e não um ícone que a representa | O v4.2 transformou a figura de resina num pictograma de perfil 1-bit. Agora a transformação é menor: **o mesmo render, a mesma câmera 3/4 da maquete, quantizado no Bayer da página em 4 tons**, e cada figura com uma pose diferente. A noite deixa de ser "linha de cards com ícone" e vira **um corte do mesmo escritório, de noite** | $$ (atlas tirado do render que já existe, §6.2) |
| 4 | **F5: abertura e fechamento rimam**, sem triângulo no meio | A nossa `sheet-chromium-1440-motion.jpg`: o hero (quadro 1) tem a rede com **os seis agentes na base**, e o final (penúltima linha) tem um triângulo de 22vh em cima de "Want a team like this?". A PR `d-06/d-23` só pelo repertório (não reaberta) | Item 2. O final pergunta "Want a **team** like this?", e o time são os seis agentes da base do hero. A rima certa é **com o time, não com o logo** | Na fonte (PR), o mesmo gradiente facetado volta no CTA final. Aqui volta **a base do hero, os seis pontos de agente na mesma ordem**, acendendo um a um enquanto a pergunta se forma. O triângulo sai do final e do FAQ e fica só no rodapé, onde a rima com a intro acontece (a seta nasce do chão) | $ |

**Soma de custo:** $ + $ + $$ + $. **Nenhum $$$ novo.** O único asset novo é o atlas das figuras, que sai do render da maquete que já existe (§6.2).

### Descartados

| Ideia | Porquê não |
|---|---|
| **Devolver o Approve como `<button>`** (júri, §9 item 3) | Decisão do dono. O "sim" continua dirigido pela rolagem. O que dá para fazer é torná-lo legível como gesto (§4.4) |
| **Encher as telas com halo, glow ou céu** | Quebra a lei 1 (luz sem portador) e é o sinal de "SaaS de IA" que o júri já aponta. A luz entra por um objeto que tem dono: monitor, telefone, horizonte |
| **Tirar o wordmark do rodapé** (júri, §9 item 9) | Decisão do dono. Fica, e passa a ser a ÚNICA assinatura do fecho, porque o triângulo do final sai (§5.4) |
| **A6, bento de métricas no FAQ ou no final** | "Over $250K" e "A$10M+" seguem sem prova na página. Um bento com esses números seria slop (a regra do próprio A6) |
| **F6, o produto em escala de herói no lugar do FAQ** | Pede uma UI de produto que a BrandUp não tem em tela, e já temos o telefone. Seria inventar |
| **E7, mergulho de câmera para encurtar as passagens** | É do jimo, e a regra do E7 veta tráfego de celular pago |
| **FAQ em acordeão fechado a 1440** | Esconde o texto, e o texto é o que acende a tela. A 390, sim, há um acordeão parcial (§5.2), porque lá a altura pesa mais que a luz |
| **Manter o "Office/Home" em caixa alta pequena** | Micro-rótulo, um dos 5 sinais de IA que o júri listou. O lugar se lê pela cama e pelo fio (§6.4) |

**Brigas conferidas:**
- **A1 × A5:** a página não é fullpage por cena, e o FAQ é rolagem nativa. Não há briga.
- **B3 × C2:** não há pareamento por choque nem cor por seção.
- **D7 × A4:** a grade da noite é chão sob as figuras, não textura sob foto.
- **A interna:** o telefone aparece no "sim" e de novo no FAQ. **É o mesmo objeto continuando, e não uma repetição:** ele recua e muda de papel (de "o que espera por você" para "nada espera; pergunte"). Se o júri ler repetição, o telefone do FAQ cai para 0,62 de escala e 60% de opacidade, e a âncora passa a ser só o H2.

---

## 4. Item 1: as telas escuras (encurtar e encher)

### 4.1 Orçamento de altura por seção

| Seção | 1440 hoje | **1440 v4.3** | 390 hoje | **390 v4.3** | Como |
|---|---|---|---|---|---|
| hero | 900 | 900 | 844 | 844 | sem mudança |
| form | 781 | 781 | 1.150 | 1.150 | sem mudança na altura; muda a passagem (§4.2, quadro y 450) |
| night | 1.260 (1,4 tela) | **1.080 (1,2)** | 1.013 (1,2) | **1.013 (1,2)** | a cena já está completa no 1º quadro; o tempo passa mais rápido |
| office | 2.880 (3,2) | **2.340 (2,6)** | 2.194 (2,6) | **1.857 (2,2)** | a metade "Sometimes late" cai de ~0,9 para 0,5 tela (§7.3) |
| you (o "sim") | 2.970 (3,3) | **1.800 (2,0)** | 2.363 (2,8) | **1.688 (2,0)** | §4.4 |
| faq | 1.522 | **900 (1,0)** | 1.514 | **~1.250** | §5.2 |
| final + rodapé | 2.245 | **~1.700 (um fecho)** | 2.102 | **~1.800** | §5.3 e §5.4 |
| **Total** | **12.559 (14,0)** | **~9.500 (10,6)** | **11.181 (13,2)** | **~9.600 (11,4)** | |

**O limite de velocidade de 1,2 tela/s dentro dos palcos continua.** Com os palcos mais curtos, o tempo mínimo para atravessar o "sim" cai de 2,75 s para 1,7 s, e o `long-pin` do inspetor (4 telas com o mesmo H2 preso) desaparece.

### 4.2 Quadro a quadro: onde a luz entra

Os y são de hoje, a 1440 (`_capture.json`, chromium). Depois do corte de altura, os quadros mudam de lugar; o que vale é a causa.

| y (1440) | Aceso | O que tem hoje | Correção | Por onde a luz entra |
|---|---|---|---|---|
| 450 | 2,16% | O hero sem a rede: a rede "cai" esmaecendo e a metade de baixo fica preta | **A rede cai inteira.** Ela desce com paralaxe 0,6 e fica com ≥ 70% de opacidade até pousar como o chão do formulário. Hoje ela some antes de pousar | a própria rede (a matéria da transição T1, aprovada) |
| 900–1.350 | 3,19 / 2,37% | O formulário: texto de 15–18 px em campos escuros | Os campos ficam como estão. O que muda é o **horizonte sob o botão**, que passa a ter 2 px de altura com o miolo em `light-core` e 96 px de franja em dither de 2 níveis (hoje é uma linha fina). E a T2 (o pôr do sol) começa na saída do formulário, e não depois dele | o horizonte, que já é a luz da seção |
| 1.800–2.700 | 2,77–3,19% | A noite: figuras de ~40 px no canto de cima à esquerda; metade da tela vazia | §6 inteiro: figuras ~2× com o acabamento da maquete, ocupando c1–c9; o monitor de cada figura acende uma **poça de luz na mesa** (dither de 3 níveis, raio de 1,2× a largura da figura). A noite sobe para a metade de baixo da tela (topo do bloco em 34%, e não em 43%) | os monitores (o portador da lei 1) |
| 3.150–4.050 | 7,5–9,2% | "Sometimes late": a maquete turva | §7.3 | as lâmpadas das mesas |
| 5.850 | **1,13%** | A entrada do "sim": uma **moldura de telefone vazia** embaixo e "You have / the final word." | **O telefone nunca aparece vazio.** Ele entra já com a 1ª ordem pintada na tela, e a base dos seis agentes já está acesa embaixo. O palco começa quando o topo do telefone cruza 85% da tela, e não antes | a tela do telefone com a ordem (a UI clara) e os agentes |
| 6.300–7.200 | 3,0–4,0% | As 3 ordens no telefone, de 340×450 px | O telefone sobe para **64vh de altura a 1440** (~576 px de altura × ~400 px de largura, contra ~450 × 340 hoje), com o texto da ordem em Body 16. A base dos agentes fica a 100% e o agente que pediu a ordem acende o "cérebro" dele no ritmo da ordem | o telefone, maior, e o agente da vez |
| 8.550–9.450 | **0,89**–3,57% | O FAQ: o título sozinho, perguntas a 15 px, o triângulo atrás | §5.2: o telefone "All clear" fica como âncora à esquerda, e as 5 respostas abertas em 2 colunas | a tela de seda do telefone (o quadro mais aceso da seção "sim" hoje, 11,9%) e o texto denso |
| 9.900–10.800 | 2,6–3,0% | A pergunta final + o formulário + o triângulo de 22vh | §5.3: os seis agentes no lugar do triângulo; o formulário sobe | os agentes e o horizonte do formulário |
| 11.250 | **1,71%** | O vão de 620 px entre o formulário final e o rodapé (`blank-gap`) | §5.4: o vão some; o rodapé encosta no horizonte | o horizonte e a montanha |

**Regra para o studio:** depois de cada passo do §12, rodar o `capture.mjs` do júri (o `litPct` por quadro) e **anexar a tabela no PR**. Qualquer quadro < 4% bloqueia o passo.

### 4.3 Reduced motion e `?gl=0`
- **Os pôsteres herdam a mesma regra dos 4%.** A noite como pôster já tem as figuras (DOM) e as poças passam a ser CSS (o mesmo dither, parado). O "sim" vira os 3 telefones estáticos que já existem (`.phone-static`), agora com o 3º sendo a tela de seda "All clear".
- **No reduced, a altura cai mais:** a noite, o escritório e o "sim" viram blocos de altura natural (`height: auto`), como hoje.

### 4.4 O "sim": mais curto, legível como gesto, e o verde na dose

**Continua dirigido pela rolagem** (decisão do dono). O problema que o júri descreve ("o Approve enche sozinho") é de **leitura**: a pessoa não percebe que a rolagem dela é o sim. A correção é tornar a rolagem visivelmente a mão.

**O roteiro em 2,0 telas (p de 0 a 1):**

| p | Quadro | O que a pessoa consegue dizer |
|---|---|---|
| 0–.08 | O telefone entra **já com a ordem 1** (Follow-up, Sam) e a base dos agentes acesa. "You have" a 100%, "the final word." a 45% | "uma ordem chegou" |
| .08–.30 | **Ordem 1: o Approve enche da esquerda para a direita com a rolagem** (como hoje), mas com três sinais novos: (a) o rótulo vira "Approving…" enquanto enche; (b) uma **linha de progresso de 2 px na borda de baixo da tela do telefone** acompanha o enchimento (o mesmo `light-core`); (c) a 100%, o botão **afunda** (`scale` .96 → 1 em 140 ms, uma vez), o rótulo vira "Approved", e **um ponto de luz sai do botão, desce pelo fio até o agente e ele acende** | "a minha rolagem apertou o botão" |
| .30–.52 | Ordem 2 (Bookkeeper): o mesmo gesto, 30% mais rápido (já é conhecido) | idem |
| .52–.72 | Ordem 3: **o Decline enche**, e não o Approve. O rótulo vira "Declining…" e depois "Declined"; o ponto **não desce**: o fio do agente apaga. É o "final word" de verdade: você também diz não | "eu também posso recusar" |
| .72–.92 | O desfecho do v4.2 §6, comprimido: os 6 fios acendem juntos, a energia no aro (≤ 500 ms), a tela enche de seda, a coluna sobe, "08:04 · All clear" | "acabou, e nada espera por mim" |
| .92–1,0 | O telefone recua para a esquerda e encolhe (`scale` 1 → .62) e **vira a âncora do FAQ** (§5.2). Não há mais o silêncio de 0,3 tela do v4.2 (T5): ele virou esse recuo | "a conversa continua ali" |

- **Rolagem rápida:** a máquina de estados do v4.1 recupera em sequência, no máximo a 2× a velocidade. O desfecho toca inteiro.
- **Voltar a rolagem** desfaz o enchimento sem tocar o afundamento ao contrário.
- **Teclado:** a ordem é lida pelo `aria-live` ("Follow-up asks: … Approved."). Nenhum controle novo no Tab.
- **Em avaliação (o dono decide vendo, `?scrollhint=0` desliga):** uma linha de 15 px sob o telefone, só durante a ordem 1, que diz que a rolagem é o sim (o copy escreve). Some na ordem 2.
- **Reduced motion:** os 3 telefones estáticos com o estado final de cada ordem escrito ("Approved", "Approved", "Declined") e o 4º com "All clear".

**O verde a 390 (D13: 3,61–3,65% nos quadros 5.486 e 5.908).** A causa é o aro do telefone com a energia verde de 8 px em volta de um telefone que ocupa quase a largura da tela, somado ao campo do botão. A 390:
- a energia do aro cai para **um anel pontilhado de 2 px de largura com 40% de densidade**, só nos 500 ms do desfecho;
- o campo verde do botão `field` fica **dentro da caixa do botão + 4 px** (a 1440 continua como está);
- **a sonda:** `greenPct` ≤ 1,5% em todos os quadros a 390, nos dois motores. Se não bastar, o campo do botão perde um nível de Bayer a 390, e não o contrário (o botão é a peça aprovada).

---

## 5. Item 2: o triângulo (onde fica e o que entra no lugar)

### 5.1 A decisão

| Lugar | Hoje | **v4.3** | O que diz ali |
|---|---|---|---|
| Intro | o logo se monta (pontos que convergem) | **fica** | a marca nasce |
| Hero | a rede: 6 agentes na base, convergindo num ápice | **fica** | a marca trabalha (o time aponta para cima) |
| FAQ | triângulo em dither de ~560 × 520 px atrás das perguntas, as caixas o recortam | **sai**. Entra o telefone "All clear" como âncora + a lista (§5.2) | "pergunte" |
| Final | triângulo de 22vh em cima de "Want a team like this?" | **sai**. Entram os 6 agentes da base do hero (§5.3) | "um time como este" |
| Rodapé | montanha de pontos (o logo) sobre o wordmark | **fica, e é o único fecho**. Encosta no horizonte do formulário final (§5.4) | a marca assenta |

**Resultado:** 3 aparições, e as duas do começo (intro → hero) são a mesma forma em continuidade (a intro entrega a forma à rede). Entre o hero e o rodapé há ~8 telas sem triângulo. A rima intro ↔ rodapé passa a funcionar, porque o meio não repete.

**No código:** o `uTri` do FAQ (`engine.ts` ~564–584) sai inteiro; o `.final-logo` e o `.final-tri-fallback` saem do `Proto.tsx` e do CSS; o `::before` das hastes do FAQ (`.faq-item::before`, que ligava cada pergunta a um ponto do triângulo) sai.

### 5.2 O FAQ: uma tela, uma lista, o telefone como âncora

**1440 (12 colunas, gutter 24, margem 64; 900 px de altura):**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ c1–c4                         │ c5–c8                    │ c9–c12              │
│ Questions   (H2, 88)          │ Will the AI act without  │ How much does it    │
│                               │ my approval?  (Lead 18)  │ cost?               │
│   ┌──────────────┐            │ Only where you allow it… │ A fixed monthly fee │
│   │    08:04     │ telefone   │ (Body 16, ink-2, 4 lin.) │ in AUD…             │
│   │  All clear.  │ do "sim",  │ ──────────────── fio .08 │ ─────────────────── │
│   │ Nothing's    │ escala .62,│ Is my data safe?         │ How long until I    │
│   │ waiting…     │ preso      │ Your data is used only…  │ see results?        │
│   │ (seda viva,  │ (sticky    │ ──────────────────────── │ The first agents…   │
│   │  parada)     │  top 16vh) │ Will it work with my     │ ─────────────────── │
│   └──────────────┘            │ systems?                 │                     │
│                               │ In most cases, yes…      │                     │
└──────────────────────────────────────────────────────────────────────────────┘
```
- **O telefone** é o mesmo nó do "sim" (o recuo do §4.4 termina aqui). Ocupa c1–c4, com o topo a 16vh + a altura do H2 + 32 px, `position: sticky` durante a seção. A seda fica **parada** (um quadro do material, sem animação) para não pagar GPU numa tela de leitura. **O H2 "Questions" fica acima dele, em c1–c4.**
- **A lista** fica em c5–c12, em 2 colunas de 4 (a ordem desce a 1ª coluna e depois a 2ª: 3 + 2). Cada item: a pergunta em Lead 18 / `ink`, a resposta em Body 16 / `ink-2` **sempre aberta**, e um fio hairline de alpha .08 entre os itens (24 px de respiro acima e abaixo). **Sem caixa, sem fundo `ground` recortando nada, sem haste.**
- **O cursor de leitura** (E3, que já existe) continua, mas só como ênfase: a pergunta na altura de leitura vai a `ink`, as outras ficam a 82%. **As respostas nunca somem** (hoje as "ahead" ficam com opacidade 0, e é isso que apaga a tela).
- **Altura:** 900 px. Se as 5 respostas não couberem em 2 colunas na altura útil, o copy encurta (≤ 38 palavras por resposta, §10.2), e não o layout.

**390 (4 colunas, gutter 16, margem 20; ~1.250 px):**
```
┌──────────────────────────┐
│ Questions        ┌─────┐ │  H2 + o telefone pequeno (88 × 150) à direita,
│                  │08:04│ │  na mesma linha do H2; ele rola junto (sem sticky)
│                  └─────┘ │
│ Will the AI act without  │  Lead 18
│ my approval?             │
│ Only where you allow it… │  Body 16, aberta
│ ──────────────────────── │
│ Is my data safe?         │  aberta
│ Your data is used only…  │
│ ──────────────────────── │
│ How much does it cost? + │  as 3 últimas fechadas (botão ≥ 44 px, `aria-expanded`)
│ ──────────────────────── │
│ Will it work with my … + │
│ ──────────────────────── │
│ How long until I see … + │
└──────────────────────────┘
```
- A 390, o texto já enche (o FAQ mede 4,3–5,9% hoje). O que pesa é a altura: **as 2 primeiras respostas abertas, as 3 últimas em acordeão** com o `+` desenhado (não ícone em círculo).
- **Estados:** aberta / fechada / foco (o anel que já existe). **Sem JS:** todas abertas (`<details open>` no HTML pré-renderizado, ou o equivalente sem JS). **Reduced:** igual, sem a transição de altura.

### 5.3 O final: os seis agentes no lugar do triângulo

```
1440 (c4–c9 centrado)                               390
┌────────────────────────────────────────┐          ┌────────────────────────┐
│        ·    ·    ·    ·    ·    ·       │ y 0      │   · · · · · ·          │ 6 pontos, 220 px
│   (os 6 agentes da base do hero:        │          │                        │
│    mesmo desenho, mesma ordem, 480 px)  │          │ Want a team like this? │ H2
│                                         │          │                        │
│      Want a team like this?  (H2 88)    │ y 96     │ [formulário compacto]  │
│                                         │          │                        │
│   [formulário compacto, 640 px, 2 col]  │          │ [ Build my AI office ] │
│        [ Build my AI office ↑ ]         │          │ ─── horizonte ───────  │
│   ─────── horizonte (o chão) ────────   │          └────────────────────────┘
└────────────────────────────────────────┘
```
- **Os seis pontos** são os nós de agente da base da rede do hero, no mesmo desenho e na mesma ordem, em linha (480 px a 1440, 220 px a 390), a 96 px acima do H2. **Eles acendem um a um, da esquerda para a direita, enquanto as palavras do H2 entram** (o K5 que já existe: uma palavra, um agente; o 6º acende com o "?"). A 100%, cada um ganha o nome no hover (desktop) ou no toque, igual ao hero.
- **O que a pessoa consegue dizer:** "é aquele time do começo".
- **O padding:** de cima, 72 px (era `clamp(48, 6vw, 96)`); de baixo, **48 px** (era 150). O horizonte do formulário final é a última coisa do final e **o chão do rodapé** (§5.4).
- **Técnica:** DOM (6 pontos em SVG com os padrões `dot-core` que já existem), sem o motor. Funciona sem WebGL e sem JS (parados, acesos).
- **Reduced:** os seis acesos, sem sequência.

### 5.4 O rodapé: o único triângulo, encostado no chão

O dono pediu o rodapé com o wordmark e as colunas finas (a referência `footers-elegantes.png`). **Fica.** O refino é de encaixe e de tipo:
- **O vão de 620 px some.** `.foot` com `padding-top: 40px` (era `clamp(72, 9vw, 128)`); `.foot-land` com `margin-top: 24px` (era até 88). O horizonte do formulário final é a linha onde as colunas começam.
- **As colunas** ficam como estão (4 colunas finas), mas os títulos viram **caixa de frase em Label 15, `<h3>`** (D14; não `<h2>`), sem tracking e sem caixa alta.
- **A montanha (o triângulo) é a única forma do fecho.** O ápice dela fica a ≥ 32 px abaixo da última linha das colunas, centrado. O wordmark continua sendo o chão da montanha, como hoje.
- **A 1440, a seção final + o rodapé somam ~1.700 px (1,9 tela)**, e o quadro que hoje dá 1,71% passa a ter as colunas, a montanha e o horizonte juntos.
- **A 390:** o formulário final, o horizonte, as colunas em 2 × 2 e a montanha sobre o wordmark. Alvos de 44 px (hoje 40 px de `min-height` nos links do rodapé: **sobe para 44**).
- **Sem JS / reduced:** como hoje (`.no-js .foot-peak` some e o wordmark fica).

---

## 6. Item 3: a noite

### 6.1 O que muda em uma linha
A noite deixa de ser uma grade de ícones no canto e vira **um corte do mesmo escritório, de noite**: as seis figuras da maquete, acesas pelos próprios monitores, ocupando a largura da cena.

### 6.2 As figuras (o atlas)
- **De onde vêm.** Do render que já temos: `render/v2/office-night-master.png` e o rig do loop (`render/v2/loop/`). **Primeira opção (sem Blender):** recortar as 6 mesas do render noturno da maquete (a mesma câmera 3/4), cada uma com a figura, a cadeira, a mesa e o monitor, e passar o recorte pelo nosso Bayer offline em **4 tons** (o fundo `ground`, o corpo em 2 tons de `ink` a 30–55%, e o monitor em `light-hot`/`light-core`). **Segunda opção (melhor, se o Blender estiver livre):** render ortográfico 3/4 de cada figura isolada, com **uma pose por agente** (digitando; ao telefone; lendo um papel; recostado olhando a tela; apontando para o monitor; de pé com a caneca) e 2 quadros de gesto por pose.
- **O teste:** pôr uma figura da noite ao lado da mesma mesa da maquete (`v-F-office-desks.jpg`). Tem que se ler como **a mesma pessoa**. Seis figuras iguais reprovam.
- **Tamanho:** 1440: a fila da frente com **144 px de altura**, a de trás com 112 px (78%, a perspectiva que já existe). 390: **88 px**, sem perspectiva.
- **Ocupação:** a 1440, as 6 mesas cobrem **c1–c9 (≥ 62% da largura)**, em 2 filas de 3, com o topo do bloco a 34% da altura da tela. Home fica em c10–c12.
- **Peso:** um WebP/PNG indexado ≤ 40 KB para os 6 × 2 quadros nas 2 escalas (era 8 KB no v4.2; o acabamento custa isso). Carregado na aproximação da noite (como hoje), fora do caminho do LCP.
- **O acabamento da luz:** o monitor de cada figura projeta **uma poça de luz na mesa**, em dither de 3 níveis, com raio de 1,2× a largura da figura (CSS no pôster; no motor, o mesmo `uPool` que o escritório já usa). É o que enche a cena e é luz com portador.
- **A vida ociosa:** o monitor tremeluz 1 nível de Bayer, **2 vezes e para** (D16: `mon-idle` deixa de ser `infinite`; ela roda enquanto a seção está na tela e para depois de ≤ 5 s). No reduced, nada.

### 6.3 A crista passa ATRÁS
- **Onde:** a crista corre **na linha do horizonte do fundo**, atrás da fila de trás, e não entre as filas. A 390, isso tira a crista de y ≈ 300–325 (a altura dos monitores da 1ª fila).
- **A regra:** o motor recebe os 6 retângulos das figuras (ele já projeta as posições via `projectGrid`) e **apaga a crista dentro de cada retângulo + 8 px**. As figuras têm o corpo opaco (o tom do `ground` atrás da silhueta), então a crista "passa atrás" também onde se aproxima.
- **A causa continua:** quando a crista passa atrás de uma mesa, aquele monitor clareia um quadro e a tarefa sob o nome troca (v4.2 §5.2, item 2).

### 6.4 Sem "OFFICE"/"HOME" em caixa alta pequena
- **"Office" sai.** O escritório é a própria cena.
- **"Home" vira uma frase curta em Label 15, caixa de frase, `ink-2`**, ao lado do fio hairline vertical (1440) ou horizontal (390), que continua. O copy escreve (ex.: o que diz "você, em casa"; ≤ 3 palavras).
- **A cama e o telefone virado** recebem o mesmo tratamento das figuras (o recorte do render do quarto, `you-room-portrait.png`, ou o atlas), e não o pictograma 1-bit.

### 6.5 O relógio (a lua) dentro da tela a 390
- **D4:** a 390, "05:2" sai da tela em x 364–390.
- **A regra:** a caixa da lua + a hora **nunca passa de `390 − m` (370 px)**. O arco termina em `x = 100% − m − largura da hora`. Na metade direita do arco, a hora fica **à esquerda da lua** (a âncora do texto vira para dentro).
- **A 390, o arco é curto:** de x 200 a x 330 (o centro da lua), y 170–230, como no v4.2.
- **A 1440:** `.moon-path` termina em `right: calc(var(--m) + 96px)` (era + 60).
- **Sonda:** em todo quadro da noite, `getBoundingClientRect()` da lua e da hora dentro de `[m, innerWidth − m]`, nos dois motores e nas duas larguras.

### 6.6 Wireframes da noite

**1440 (12 colunas, gutter 24, margem 64; palco de 1,2 tela). O quadro a p ≈ .45:**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ While you sleep,                                           ◖ 02:14            │ y 96–230
│ the office works.  (H2 88, K3)                             (lua, arco c7→c11) │
│ ─ ─ ─ ─ ─ ─ ─ ─ horizonte do fundo (a crista corre AQUI) ─ ─ ─│─ ─ ─ ─ ─ ─ ─ │ y ~300
│   [fig 112]        [fig 112]        [fig 112]                  │              │ fila de trás
│   ░poça░           ░poça░           ░poça░                     │  You, home   │
│   Follow-up        Bookkeeper       Ad manager                 │  (Label 15)  │
│   20:15 · quote    21:30 · order    23:05 · spend              │              │
│ [fig 144]         [fig 144]         [fig 144]                  │  [cama +     │ fila da frente
│ ░░poça░░          ░░poça░░          ░░poça░░                   │  telefone,   │
│ Social media      Receptionist      Analyst                    │  recorte]    │
│ 00:20 · review    18:40 · enquiry   06:30 · report             │  07:58 ·     │
│ . . . . . . . grade = chão (c1–c9) . . . . . . . . . . . . . . │  1 waiting   │ y ~830
└──────────────────────────────────────────────────────────────────────────────┘
```

**390 (4 colunas, gutter 16, margem 20; palco de 1,2 tela):**
```
┌──────────────────────────┐
│ While you sleep,         │ y 72
│ the office works.        │
│            02:14 ◖       │ a hora à esquerda da lua; tudo ≤ x 370
│ ─ ─ horizonte (crista) ─ │ y ~250
│ [fig88] [fig88] [fig88]  │ 3 colunas de 116 px
│ Follow  Books   Ads      │ Label 15 (o nome curto)
│ 05:05·… 03:40·… 23:05·…  │ Label 15, ink-2, 2 linhas no máximo
│ [fig88] [fig88] [fig88]  │
│ Social  Recep   Analyst  │
│ ──────────────────────── │ fio hairline
│ You, home  [cama][tel]   │ y ≈ 720–800
│            07:58 · 1 waiting
└──────────────────────────┘
```
- **A 390, as tarefas em 15 px não cabem em 116 px de coluna numa linha.** Ficam em 2 linhas, e o copy encurta a tarefa (≤ 14 caracteres por linha; §10.2). **Nada abaixo de 15 aqui.**
- **Estados:** carregando = o pôster com as figuras DOM (o atlas é a única espera; antes dele, a silhueta em `ink` 30% no tamanho final, sem pular layout). Sem JS = o pôster. Contexto perdido = o pôster. Reduced = o pôster às 02:14.

---

## 7. Item 4: o escritório

### 7.1 Os halos órfãos (D1): Ad manager e Social fora da maquete
**A causa provável** (verifique antes de mexer): o `engine.ts` já corta a **poça** (`uPool`) de uma mesa fora da janela da câmera (linhas 515–522), mas o **revelar** da mesa no shader (`uDesk[k].z`, o raio) continua valendo fora da área acesa da maquete (o oval que se desfaz em dither). Então o roxo aparece sobre o fundo, sem mesa.

**A decisão: trazer as mesas para dentro, e nunca acender fora.**
1. **A câmera enquadra o oval, não só as mesas.** Quando Ad manager ou Social acendem, o `zFit` passa a garantir que **o centro da mesa fique dentro do oval visível com ≥ 10% de margem** (o oval da máscara de dither, e não o retângulo da janela). Se não couber com o zoom mínimo de 1, a câmera abre (z < 1 não; em vez disso, o oval cresce até 1,15× na largura enquanto essas mesas estão acesas).
2. **Nenhum revelar fora do oval.** No shader, o raio do `uDesk[k]` é multiplicado pela máscara do oval no centro da mesa (0 fora). Com isso, uma mesa fora do quadro simplesmente não acende.
3. **As etiquetas** ("Ad manager", "Social media") só aparecem se o centro da mesa estiver dentro do oval. Vale também no `?gl=0` (`v-I-hover-gl0.jpg`: hoje elas boiam à direita do oval).
- **Sonda:** em todo quadro do escritório, a 1440 e a 390, nenhum pixel com matiz roxo (h 265–285°, s > 40%) fora da máscara do oval + 24 px.

### 7.2 O polígono roxo chapado na parede (D2)
- **Onde:** a 1440, ~x 625–780 e y 315–390 (`-11.png`); a 390, no alto à direita da maquete (`v-E-390.jpg`, 3º quadro).
- **O que fazer:** achar a origem (o candidato mais provável é a máscara de monitor ou de revelar de uma mesa caindo num plano de parede, ou um material de tela no render tingido de `light-deep` sem dither). **Ou ele vira o dither de 2 níveis do resto da luz, ou sai.** Cor chapada de marca dentro da maquete é proibida (a regra 5 do v4).
- **Sonda:** nenhuma região contínua > 400 px² de uma cor só (ΔE < 2) dentro da maquete.

### 7.3 A primeira metade ("Sometimes late") mais clara e mais curta
- **Hoje:** 7,5–9,2% de pixel aceso; um bloco turvo com 3–4 mesas acesas (`-07/-08`).
- **A intenção continua:** é a equipe humana, que às vezes atrasa. Fica mais escura que a metade "Never late", mas **legível**.
- **O que muda:**
  - a exposição da maquete nesta fase sobe (o `uOffLum` sai de .52 para **.68**), e as lâmpadas das mesas acesas ganham a poça quente (`light-hot`) com raio 1,3×;
  - **5 mesas acesas, e não 3–4**: a mesa que está "atrasada" é a única apagada, e é ela que a frase aponta;
  - a fase encurta de ~0,9 para **0,5 tela** (é a parte do corte de 3,2 → 2,6 telas);
  - "Sometimes late." fica no tom 2 do B5 (a 62%, e não a 38%: o contraste da parte cinza a 88 px tem que dar APCA Lc ≥ 60).
- **Meta:** ≥ 10% de pixel aceso nos quadros da 1ª metade, a 1440 e a 390.
- **Reduced / `?gl=0`:** o pôster do escritório é o de dia, como hoje.

---

## 8. Item 5: tipo em 5 tamanhos, nada abaixo de 13 px, contraste

### 8.1 Os papéis (o type-director escolhe a escala e mexe só no `type.css`)
Hoje são 9 tamanhos: 12, 13, 15, 16, 18, 56, 83, 104 e 351 px. A meta é **5 por largura**:

| Papel | 1440 | 390 | Onde |
|---|---|---|---|
| **Display** | 104 | 36–44 | H1, a frase K2 do escritório |
| **H2** | 88 | 36 | todo H2; **e a hora da tela bloqueada** ("08:04", que hoje é 56/44, passa a usar o token do H2; o telefone maior do §4.4 comporta) |
| **Lead** | 18 | 18 | a pergunta do FAQ, o lede do hero, o balão do escritório |
| **Body** | 16 | 16 | a resposta do FAQ, o texto do telefone, os campos |
| **Label** | 15 | 15 | os nomes e as tarefas da noite, "Day N", as etiquetas das mesas, os títulos e as linhas do rodapé, o `lock-sum`, a nota "illustrative", o © |

- **O wordmark do rodapé (351 px) é desenho de marca**, não tamanho de texto: `aria-hidden`, com o nome em texto real noutro lugar (o © e o logo do header). O type-director confirma.
- **O que sobe para 15:** `.place` (12), `.foot-h` (12), `.dtask` (12 a 390), `.wait` (12), `.foot-live`/`.foot-dim`/`.foot-copy` (13), `.lock-sum` (13), `.dname` a 390 (13).
- **Sem caixa alta pequena em lugar nenhum:** `.place` e `.foot-h` perdem o `text-transform: uppercase` e o tracking de .08em. Caixa de frase.
- **Corpo menor que 18 a 1440:** o Body continua 16 nas respostas (texto longo), e o Lead 18 continua na pergunta. A hierarquia é por **tamanho + tom** (`ink` / `ink-2`), não por peso: pesos 400/500 só.

### 8.2 O contraste do `.is-off` (D9)
- **Hoje:** `.ghost.is-off` a `rgb(244 241 248 / .45)` sobre `#1b1921`: 3,02–3,12:1 a 16 px.
- **Correção:** o "desligado" **não se marca por opacidade**. Vai a `--ink-2` (#B7B4BB, ≥ 7:1 sobre esse fundo) e se distingue por **um marcador**: um traço de 1 px antes do texto ou o rótulo em Label. Se o design precisar mesmo de dois tons, o mais fraco tem **≥ 4,5:1** medido no pixel, nos dois motores.
- **Sonda:** axe com 0 `color-contrast`, chromium e webkit, 1440 e 390.

### 8.3 Também resolvem aqui
- **D14:** os títulos do rodapé como `<h3>`.
- **D15:** "the final word." coberto 25% pelo telefone a 768. Com o telefone a 64vh, a 768 o H2 do "sim" vai para cima do telefone em 2 linhas (a composição de 390), a partir de < 1024 px.

---

## 9. Item 6: orçamento de GPU e LCP (requisitos para o frontend-craft → frontend-studio)

O frontend-craft define a solução e o studio implementa. Aqui está **o que precisa ser verdade** e como provar.

### 9.1 Repouso
- **A página parada não desenha.** Com a rolagem parada e sem nenhuma animação com prazo (a intro, uma passagem, um gesto do "sim"), o motor desenha no máximo **até 1,5 s** e depois para o `requestAnimationFrame`. Volta no próximo `scroll`, `pointermove` (só se houver interação de ponteiro na cena visível), `resize` ou quadro de vídeo novo.
- **A vida ociosa** das cenas (o tremular dos monitores, os pontos nos fios) **não pode manter o motor acordado**: ou é CSS/DOM, ou roda a ≤ 12 quadros/s e para depois de 5 s sem rolagem.
- **Prova:** 2 s parado em cada uma das 9 cenas do `perf-scenes.mjs`, nos dois motores: **0 quadro desenhado** (contador no motor, exposto em `window.__frames` só em dev) e **0 tarefa longa**.

### 9.2 Custo por quadro
- **Meta no GL por software (SwiftShader, o proxy de GPU fraca):** mediana **≥ 45 fps** na rolagem em todas as cenas e **≤ 10 tarefas longas por cena** (hoje: 12–32 fps e 36–96 tarefas). O v4 dava 57–60 fps no mesmo instrumento, então isso é recuperar o que se perdeu.
- **O vídeo:** o upload da textura só quando há **quadro novo** (`requestVideoFrameCallback`; no WebKit sem ele, comparar o `currentTime`) e **só com o escritório visível**. Fora da tela, o vídeo pausa.
- **`readPixels` (D11, "GPU stall due to ReadPixels"):** achar quem lê pixel no caminho do quadro (sonda, medida de luminância, pôster) e tirar do caminho. Se for necessário, ler uma vez e guardar.
- **DPR:** ≤ 1,5 no celular e ≤ 2 no desktop; se o p95 do tempo de quadro passar de 24 ms em 60 quadros, cair um degrau de escala de render (1 → .75), uma vez, sem voltar.
- **O que este brief acrescenta à GPU:** nada no motor além da máscara do oval nos `uDesk` (§7.1), do recorte da crista (§6.3) e das poças da noite, que **reusam o `uPool`**. O FAQ deixa de desenhar o triângulo (menos GPU) e a seda do telefone no FAQ fica **parada**.

### 9.3 LCP a 390
- **Hoje:** 2,10 s com 4G lento + 4× CPU; o elemento LCP é um `SPAN` do H1.
- **Requisitos:**
  1. **O H1 pinta no 1º quadro, a 100% de opacidade e na posição final.** Nenhum span do H1 entra por animação (a intro já desenha por cima, ao lado; confirmar que nada no H1 começa em `opacity: 0`).
  2. **A face do display** que o H1 usa chega cedo: o subset latino da "BU Display" ≤ 20 KB, `preload` no `<head>` com o `crossorigin` certo (o júri v4 já achou o preload que não batia no WebKit; conferir que a URL é a mesma do `@font-face` inline) e o fallback com as métricas casadas que já existe, para a troca não mexer o layout.
  3. **O módulo do motor só começa depois do LCP** (no `load` + `requestIdleCallback`, com teto de 1 s), e nenhum asset do motor (o atlas, o vídeo, os PNG de dither) entra antes dele.
  4. **O CSS crítico do hero inline**; o resto, sem bloquear (o render-blocking de ~130 ms que o Lighthouse aponta).
- **Prova:** 5 corridas no CDP (4G lento + 4× CPU) a 390, nos dois motores quando der (WebKit sem CDP: Lighthouse no chromium + a régua do `PerformanceObserver` no webkit): **mediana ≤ 1,8 s e nenhuma > 2,0 s**.

### 9.4 Peso
- O atlas da noite (≤ 40 KB) e os 6 pontos do final (≤ 1 KB, SVG inline) entram. O triângulo do FAQ e o `.final-logo` saem. **O total no carregamento continua ≤ 240 KiB** (hoje 229).

---

## 10. Pedidos

### 10.1 Ao type-director (papéis; a escala e as famílias são suas)
- **Os 5 papéis do §8.1**, com os tokens em `type.css`: Display, H2, Lead, Body e Label. Nenhuma família nova. Pesos 400/500.
- **A hora da tela bloqueada no token do H2**, tabular.
- **O Label 15** passa a cobrir tudo que hoje é 12 e 13. **Lc ≥ 60 a 100% e ≥ 45 em `ink-2`**, medido em webkit.
- **O wordmark do rodapé**: confirmar que ele sai da contagem de tamanhos como desenho (`aria-hidden`), e não como texto.
- **"Sometimes late."** no tom 2: o valor de tom que dá Lc ≥ 60 a 88 px.

### 10.2 Ao copy-director (função e tamanho; o texto é seu)

| Bloco | Função | Tamanho |
|---|---|---|
| As 5 respostas do FAQ | Caber em 2 colunas numa tela a 1440, sempre abertas | ≤ 38 palavras cada |
| O rótulo de casa na noite (no lugar de "HOME") | Dizer "você, em casa, dormindo" sem caixa alta | ≤ 3 palavras |
| As tarefas da noite a 390 | Caber em 2 linhas de 14 caracteres a 15 px | ≤ 28 caracteres com a hora |
| Os rótulos do "sim" durante o gesto | "Approving…" / "Approved" / "Declining…" / "Declined" (ou equivalente): o estado do botão enquanto a rolagem age | 1 palavra |
| A linha "a rolagem é o seu sim" (em avaliação) | Dizer ao visitante que rolar aprova; só na ordem 1 | ≤ 5 palavras |
| O `aria-live` das ordens | A ordem + o resultado, uma vez por ordem | 1 frase |
| Os títulos do rodapé | Caixa de frase | 1–2 palavras (mantém os de hoje) |
| O `sr-only` do final | Citar que os seis agentes são o time do começo | 1 frase |

### 10.3 Ao frontend-studio (motion com a frase, peso, fallbacks)
- **Cada movimento tem a frase de "o que aconteceu"** nas tabelas. Se a frase não couber, o movimento sai.
- **O que sai do código:** o `uTri` do FAQ; `.final-logo` e `.final-tri-fallback`; `.faq-item::before` (as hastes) e o fundo `ground` dos itens do FAQ; o `text-transform: uppercase` de `.place` e `.foot-h`; o `infinite` de `mon-idle`; o silêncio T5 de 0,3 tela.
- **O que entra:** o atlas da noite; as poças da noite no `uPool`; a máscara do oval no `uDesk`; o recorte da crista pelos retângulos das figuras; o telefone que recua e vira âncora do FAQ; os 6 pontos do final; os 3 sinais do gesto do "sim".
- **Em avaliação** (barato de remover, o dono decide vendo):
  - a linha "a rolagem é o seu sim", atrás de `?scrollhint=0`;
  - o telefone como âncora do FAQ, atrás de `?faqphone=0` (sem ele, o FAQ fica só com o H2 à esquerda; o `litPct` a 1440 provavelmente cai abaixo de 4%, então, se o dono tirar, o FAQ vai para 1 coluna centrada com 0,8 tela);
  - os nomes dos agentes no hover dos 6 pontos do final, atrás de `?finalnames=0`.
- **Fallbacks:** tudo o que é novo existe em DOM/SVG/CSS no pôster, sem WebGL e sem JS, exceto a sequência de acender (que fica no estado final).

---

## 11. Riscos

- **Safari/WebKit.**
  - O `position: sticky` do telefone dentro do grid do FAQ: conferir que o grid não tem `overflow` que quebre o sticky.
  - `image-rendering: pixelated` no atlas a DPR 3: conferir o serrilhado do recorte do render (o dither tem que cair em pixel inteiro: o atlas sai a 1× e 2×, e não é escalado por número quebrado).
  - O `requestVideoFrameCallback` no WebKit: existe no Safari recente, mas o fallback por `currentTime` fica.
- **Celular.**
  - O "sim" mais curto (2,0 telas) com o limite de 1,2 tela/s dá ~1,7 s mínimos: **rápido demais para ler a ordem** se a pessoa passar direto. A máquina de estados recupera em sequência (já existe); conferir que a ordem 1 fica ≥ 600 ms legível mesmo a 2×.
  - As figuras a 88 px precisam ler a DPR 2–3. **O nome sob a figura é obrigatório.**
  - O acordeão do FAQ a 390: alvos ≥ 44 px, `aria-expanded`, e sem JS tudo aberto.
- **Peso:** o atlas pode passar dos 40 KB se o recorte do render levar muito ruído. Teto duro: 60 KB, senão 3 tons em vez de 4.
- **Acessibilidade.** O afundamento do botão é um evento único de 140 ms (não pisca). Os monitores param de tremular depois de 5 s (D16). O `aria-live` não pode repetir a cada quadro de rolagem: uma vez por ordem.
- **Produção do asset.** A 1ª opção (recortar o render noturno) não depende do Blender. Se as 6 mesas do render tiverem poses parecidas demais, a 2ª opção (render por pose) entra, e ela disputa o Blender com o loop.
- **A leitura da regra dos 4%.** O critério mede pixel aceso; texto fino a 16 px acende pouco. Se um quadro de texto denso (o FAQ a 1440) ficar entre 3,5 e 4% depois de tudo, **o studio reporta o número e não infla a tela com enfeite** para passar. Quem decide a exceção sou eu, com a foto.
- **O telefone em dois lugares** (§3, a briga interna): se o júri ler repetição, cai a escala e a opacidade dele no FAQ.

---

## 12. Ordem de implementação (frontend-studio, uma árvore, um agente por vez)

| # | Passo | Prioridade | Depende de | Verificar |
|---|---|---|---|---|
| 1 | **Subtração:** tirar o triângulo do FAQ e do final, as hastes do FAQ, o T5, o `mon-idle` infinito; alturas novas de night (1,2), office (2,6/2,2) e you (2,0); fechar o vão final → rodapé (§5.4) | P0 | — | `scrollHeight` ≤ 9.900 (1440) e ≤ 9.700 (390); contagem de triângulos = 3 |
| 2 | **Tipo e contraste** (§8): os 5 papéis, nada < 15 fora do Display/H2, sem caixa alta pequena, `.is-off`, `<h3>` no rodapé, 44 px nos links do rodapé | P0 | o `type-director` entrega os tokens | `getComputedStyle` (5 tamanhos), axe 0, inspetor `small-text` e `micro-label` 0 |
| 3 | **GPU em repouso e LCP** (§9), com o frontend-craft no orçamento | P0 | — | `__frames` = 0 parado; SwiftShader ≥ 45 fps; LCP mediana ≤ 1,8 s a 390 |
| 4 | **O escritório limpo** (§7): o oval que enquadra as mesas, nenhum revelar fora dele, o polígono chapado, a 1ª metade clara e mais curta | P0 | 1 | sonda de roxo fora do oval = 0; ≥ 10% aceso na 1ª metade |
| 5 | **A noite** (§6): o atlas recortado do render, a escala 2×, c1–c9, as poças, a crista atrás, a lua dentro da tela, "Home" em frase | P1 | 1, 2 | o teste das 2 s; a sonda da lua; a crista fora dos retângulos; ≥ 6% aceso |
| 6 | **O "sim"** (§4.4): o telefone que entra cheio e a 64vh, os 3 sinais do gesto, o verde a 390 | P1 | 1 | `greenPct` ≤ 1,5% a 390; rolagem rápida e volta; `aria-live` |
| 7 | **O FAQ com o telefone-âncora e a lista** (§5.2) | P1 | 6 (o recuo do telefone) | ≥ 4% a 1440; acordeão a 390; sem JS tudo aberto |
| 8 | **O final com os seis agentes** (§5.3) | P2 | 1 | o K5 + a sequência dos pontos; reduced |
| 9 | **A passagem do hero → form** (a rede cai inteira) e o horizonte mais largo do formulário (§4.2) | P2 | — | ≥ 4% no quadro de y 450 |

**Depois de cada passo:** o `capture.mjs` do júri (o `litPct` e o `greenPct` por quadro) em chromium e webkit, a 1440 e a 390, com movimento e com reduce, e a tabela anexada. **O júri entra só depois do passo 7.** Os passos 1–3 não mudam a direção e podem ir antes, numa sequência só.

## 13. Para o design-jury (o que mudou na régua)
- **Eliminatório:** 0 quadro < 4% aceso entre o fim do hero e o fim do rodapé; ≤ 11 telas a 1440; 3 triângulos, nunca em seções seguidas; 5 tamanhos de tipo e nenhum < 13 px; `greenPct` ≤ 1,5% a 390.
- **Não pontuar contra as decisões do dono:** o "sim" pela rolagem (avaliar se ele **se lê como gesto**, e não se é botão), o verde do `field` e o wordmark do rodapé.
- **O teste de sobreposição:** o FAQ contra `pensatori-irrazionali/d-01` (não pode virar lista de nomes grandes com fio) e as figuras da noite contra a maquete (têm que ser a mesma gente, e não seis cópias).
- **A briga interna:** o telefone no "sim" e no FAQ. Ler se é continuidade ou repetição.
