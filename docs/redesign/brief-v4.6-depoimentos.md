# BrandUp: brief v4.6, os depoimentos: "a voz chega pelo fio"

Autor: ui-ux-director · 09/11/2026 · **emenda o `brief-v4.5.md` §11** (o lugar, o conteúdo, a pilha a 1440 e o trilho a 390 continuam) e obedece à costura do `brief-v4.4.md` §3 (coleta, viagem, ignição e voz; o pacote é o `uPkt`; o verde só viaja).
Para: `frontend-studio` (§3 a §6), `frontend-craft` (§6.3) e `design-jury` (§7).

**O pedido do dono:** "deixar um pouco mais animada, alguma transição, algum efeito, de acordo com nossa página". O resto da página está aprovado. **O texto dos depoimentos não muda** (nem `testimonials.ts`, nem o H2, nem o intro).

**Fora do escopo:** o hero e o 1º formulário (há um studio neles agora). `Proto.tsx` é um arquivo compartilhado: **só entre nessa árvore quando aquele studio fechar**, e toque só a função `Testimonials`, o bloco `/* §11 */` de `proto.css`, uma tarefa em `domScenes.ts` e um slot de pacote em `engine.ts`.

## 0. O que eu vi (09/11, chromium e webkit, 1440×900 e 390×844, `scratchpad/v46d/`)
- **É a única seção da página sem luz.** Entre a orla do FAQ e o horizonte do formulário final, ela é texto sobre preto. A única mudança é a opacidade (48% para 100%) quando o centro passa pela faixa de 45%. O "portador de luz" que o v4.5 §11.2 pedia (o cursor de dither do FAQ) **não foi implementado**, e a seção quebra a lei 1 ("toda luz tem portador").
- **Bug:** o contador mostra "04 / 04" com o 1º depoimento na faixa de leitura, quando a pessoa volta para cima. O IO de faixa fina não dispara acima do 1º item nem abaixo do último, e o estado fica velho (`ch-1440-0.png`).
- **390:** o trilho com snap está bom, e o "01 / 04" acompanha. Também não tem luz nenhuma.
- **Não verifiquei:** uma sobreposição de linhas em `ch-1440-1.png` (o Sofia cortado sob o Daniel). Parece um rasgo de captura durante a rolagem suave. O studio confere.

## 1. Peça e objetivo
- **A pessoa:** o dono de um negócio, vindo do Meta, no celular, cético, logo depois de tirar as dúvidas no FAQ e logo antes do pedido.
- **A tarefa:** ler 1 ou 2 depoimentos inteiros e sentir que **são pessoas reais, uma de cada vez**. A animação nunca pode atrasar a leitura.
- **Sucesso:** (a) 3 em 3 pessoas que veem o vídeo de 390 descrevem o efeito ("a luz passa de um dono para o outro"); (b) o tempo até o texto ficar a 100% é ≤ 700 ms depois da chegada; (c) não há texto abaixo de 48% em nenhum quadro; (d) o motor fica parado 1,5 s depois de parar a rolagem.

## 2. Conceito
**"Cada dono é um nó da rede, e a voz dele chega pelo fio: o pacote verde corre de uma assinatura até a próxima e, quando pousa, o nó acende e a citação se ilumina linha a linha, na ordem da leitura."**
Na página toda, o trabalho viaja do time até o dono. Aqui o sentido se inverte: **é a palavra do dono que chega até quem lê.** É a mesma máquina, agora vista do outro lado.

## 3. Movimentos

| Código | Captura (aberta) | Por que aqui | O que muda em relação à fonte | Custo |
|---|---|---|---|---|
| **F7** um sinal que atravessa | `jimo/w-12` (o ponto de luz vira o ponto final de "Every user gets a guide.") | É o pacote da costura (v4.4 §3.1), que já tem significado na página. Ele é o portador que faltava | No jimo, o ponto é um brilho branco que pousa no fim de uma frase. Aqui é o grão mint em dither, sem halo, e ele corre **entre pessoas** (de uma assinatura até a próxima), não até a pontuação. O 1º pacote se solta da orla do FAQ | $$ (o motor e o `transit.ts` já existem; é 1 slot) |
| **E5** trajetória com nós | `qclay-p12/d-07` (a órbita do roadmap com nós e chevrons) | Mostra onde a pessoa está entre os 4 e dá ao pacote um caminho visível | No P12, é uma elipse de neon com marcos de data e chevrons. Aqui é **um fio vertical de grão** no vão da coluna 4, e os nós **são as iniciais das pessoas** (o quadrado hairline sai para o vão). Lido = grão denso, por ler = pontilhado. Não tem chevron nem curva | $ (CSS) |
| **E3** opacidade como cursor, por linha | `madeinevolve/d-02` (o manifesto que apaga linha a linha) | Os 4 textos continuam legíveis (≥ 48%), e a citação da vez ganha luz **na ordem da leitura**: é a ignição do v4.4 §3, aplicada ao texto | No ME, é um gradiente contínuo e estático num bloco em caixa alta. Aqui são **2 tons (48 e 100) em degrau por linha**, e o degrau desce do topo à base em ~60 ms por linha só quando o pacote pousa | $ (CSS `@property`) |
| **B4** voz de dado em movimento | `madeinevolve/d-01` (a ficha em typewriter) | A assinatura "se escreve" e o "01 / 04" rola o dígito. O dado chegou, e a pessoa vê | No ME, o typewriter é estático, numa planilha. Aqui o nome aparece em degraus (clip) **e é o último tempo da chegada**. **Em avaliação: `?sig=0` desliga** | $ |

**Soma:** $$ + 3×$. Nenhum $$$, nenhum asset novo.

**Descartados:**
| Código / ideia | Por que não |
|---|---|
| E4 marquee de depoimentos | Movimento perpétuo, e 330 caracteres andando não se leem (já vetado no v4.5) |
| Autoplay no trilho de 390 | Ninguém lê 330 caracteres num tempo fixo; viola o WCAG 2.2.2 e tira o controle. **Não há autoplay**, e por isso não há pausa a desenhar |
| Orla (v4.4 §3.2) em volta da citação da vez | Seria a 3ª orla seguida (FAQ, depoimentos, final). A3: esta seção é o respiro entre duas cenas acesas, e a luz aqui é um fio, não uma moldura |
| Fragmentos `uFrag` estourando a cada chegada | Disputam com a C5 (o telefone que se desfaz) e chamam o olho para fora do texto que a pessoa está lendo |
| A1, uma cena presa por depoimento | Sequestra 4 telas de rolagem antes do pedido |
| B10, palavra a palavra | É para um H2 de 8 palavras; num corpo de 60 palavras, atrasa a leitura |
| Cartão com inclinação 3D, halo ou glow na citação | É slop: o movimento não diz nada. E o glow é vetado pelo dono |
| Aspas gigantes decorativas, foto ou avatar | Não temos foto com licença; aspas de 200 px viram enfeite de template |

**Brigas conferidas:** o verde segue só no pacote e na chegada de 2 quadros (o `greenPct` fica muito abaixo de 1,5%); o fio é roxo (lugar). Os 6 pontos do K5 do final logo abaixo são horizontais, separados, e acendem com palavras; o fio é vertical e contínuo, e os nós são letras. Não se confundem.

## 4. A coreografia (os 4 tempos da costura)

### 4.1 A entrada (FAQ → depoimentos): **é scrub**, porque é entre seções
1. **Coleta:** o pacote nasce no fragmento mint do meio da base da orla do FAQ (`orlaTargets('faq')`, os índices 11 e 12, a média dos dois).
2. **Viagem:** ele desce até o nó 1 (as iniciais MB). P1 = (`x0`, `(y0 + y2)/2`): uma curva que desce e entra pela esquerda no fio. O avanço é a rolagem, `smooth(topo da seção a 0,85·vh → nó 1 a 0,45·vh)`. A volta desfaz.
3. **Ignição:** ao chegar (t ≥ 1), o **fio se desenha do nó 1 até o nó 4 em limiar de Bayer** (o pontilhado, ~16 degraus, 480 ms, uma vez) e o nó 1 acende (§4.3).
4. **Voz:** o H2 (o K1, sem mudança) e o intro já entraram pelo IO único. A citação 1 sobe para 100% linha a linha (§4.4).

### 4.2 A troca (dentro da seção, a 1440): **disparo pela rolagem + relógio**
- **O "atual"** passa a vir de `docTop` em cache (o padrão do FAQ, `domScenes.ts`), dentro da tarefa do ticker: é o depoimento cujo centro está mais perto de 0,45·vh, com **trava nas pontas** (acima do 1º é o 0; abaixo do último é o 3). Isso corrige o bug do "04 / 04". O IO de faixa sai.
- **Descendo:** `transit.launch` com `from` = o centro do nó anterior, `to` = o centro do nó novo (as posições vêm do cache − `scrollY`, sem `getBoundingClientRect` por quadro), `ctrl` = o ponto médio (**o pacote corre pelo fio**, reto), `dur` 560 ms e `r` 7. No `done()`: a ignição do nó, as linhas, a assinatura e o contador.
- **Subindo:** sem pacote (a regra do v4.4 §3.3: a volta não devolve o pacote). O depoimento que sai baixa para 48% na hora (de baixo para cima, 30 ms por linha), e o que entra acende as linhas sem o pacote.
- **Rolagem rápida** (pular 2 ou mais): só um pacote, do nó atual até o destino. Os do meio mudam de estado sem voo.

### 4.3 O nó (as iniciais)
- **1440:** o quadrado de 32 px **sai da legenda e fica pendurado no vão**, centrado no fio (com `margin-left` negativo, para que o nome continue alinhado com o texto da citação). O fundo é o chão (`--ground`), para cobrir o fio.
- **Os estados:** *por ler* = borda `rgb(244 241 248/.16)`, como hoje. *Chegada* = 2 quadros (`steps(2)`, 90 ms) de checker mint de 2 px dentro do quadrado: é o pacote pousando. *Lido / atual* = checker `#1A0B33`/`#9232EA` a 25% de densidade dentro e borda `#C9A2FF`; as letras ficam em `#FBF7FF`. O atual e os já lidos ficam acesos (os lidos com a borda a .4): a luz não volta a apagar enquanto a pessoa desce.
- **390:** o quadrado fica na legenda, como hoje, com os mesmos 3 estados.

### 4.4 As linhas
- O `blockquote` troca o `opacity` por **máscara em degraus de linha**: `@property --ln { syntax: '<integer>'; inherits: false; initial-value: 0 }` e `mask-image: linear-gradient(#000 calc(var(--ln) * 1lh), rgb(0 0 0 / .48) 0)` (com o `-webkit-mask-image` junto).
- *Atual* = `--ln: 14`, com `transition: --ln calc(14 * 60ms) linear`. Como o inteiro interpola em degraus, cada linha acende inteira: é uma linha por vez, na ordem da leitura. *Outro* = `--ln: 0` (30 ms por linha).
- **O texto nunca fica abaixo de 48%,** e a linha nunca vai de 0 a 1 num quadro (a métrica do v4.4 §1 é satisfeita: o piso é 48).
- **Sem `@property`** (`@supports not`): fica a `opacity` de hoje, com 320 ms.

### 4.5 A assinatura e o contador
- **O nome e "Owner"** aparecem por `clip-path: inset(0 100% 0 0)` → `inset(0)` em `steps(14)`, 260 ms, **depois** da última linha. O texto está sempre no DOM. **Em avaliação (`?sig=0` desliga):** o dono decide vendo.
- **"01 / 04":** o mesmo rolo de dígito de 240 ms do contador da noite (v4.4 §4.3), em algarismos tabulares.

### 4.6 390: o fio vira horizontal e o gesto é o tempo (scrub)
- **O fio:** uma linha de grão de 2 px na linha do contador, à direita do "01 / 04", até a margem direita. A parte lida é o grão denso (`transform: scaleX(scrollLeft / máx)`, DOM); o resto é pontilhado. **Não são pontos de paginação**: não há 4 alvos, é uma barra de progresso de grão.
- **O pacote:** a cabeça fica na ponta da parte lida e é desenhada pelo motor (`writePacket` com `t` = a fração entre dois snaps). O avanço é o `scrollLeft` do trilho: arrastar move a luz, e soltar faz pousar.
- **No snap** (o IO com `root` = o trilho, como hoje): a chegada no nó do cartão, as linhas, a assinatura e o contador, como a 1440.
- **A entrada:** o pacote da orla do FAQ desce até o nó do cartão 1 (o mesmo scrub do §4.1, que a 390 é quase vertical).

## 5. Wireframes

**1440 (12 colunas, gutter `--gut`, margem `--m`; o padding de 160 continua):**
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ░░orla do FAQ░░·(mint)                                                       │
│                 ╲  ← o pacote da entrada (scrub)                             │
│ In their own words.                                                          │
│ In their own businesses. (2º tom)                                            │
│                                                                              │
│ col 1–3 (sticky)      col 4      col 5–11                                    │
│ intro                  ┆        "I used to finish a full day…"   ← 100%,     │
│ 01 / 04  (rolo)        ┆         linhas acendendo ↓ (degraus)                │
│                       [MB]─ Michael Bennett · Owner  ← o nó aceso, a assin.  │
│                        ┃  ← o fio lido (grão denso)                          │
│                        ●  ← o pacote correndo (mint, 3 rastros)              │
│                        ┃                                                     │
│                       [SM]  "We've always been proud…"  48%                  │
│                        ┆  ← pontilhado (por ler)                             │
│                       [DC]  …                                                │
│                        ┆                                                     │
│                       [EP]  …                                                │
└──────────────────────────────────────────────────────────────────────────────┘
```
O fio fica em `x = borda esquerda da coluna 5 − 40 px` e vai do centro do nó 1 ao centro do nó 4. Ele não passa por cima de texto nenhum.

**390 (margem 20, o trilho de 84vw com calha 12, como hoje):**
```
┌────────────────────────────┐
│ ░orla do FAQ░·             │
│              ╲             │
│ In their own words.        │
│ In their own businesses.   │
│ intro                      │
│ ┌────────────────────┐┌──  │
│ │"I used to finish…" ││"W  │ ← linhas acendendo
│ │ (9 linhas, 100%)   ││48  │
│ │[MB] Michael Bennett││    │
│ └────────────────────┘└──  │
│ 01 / 04  ▓▓▓▓●┄┄┄┄┄┄┄┄┄┄┄  │ ← o fio horizontal; o gesto move o ●
│                            │
│ ▪ ▪ ▪ ▪ ▪ ▫  (K5 do final)  │
└────────────────────────────┘
```

## 6. Pedidos

### 6.1 Ao type-director e ao copy-director
Nada novo. Nenhum papel muda, nenhum texto muda. **O copy-director não entra.**

### 6.2 Ao frontend-studio: a técnica e os estados
- **O motor OGL só para o pacote** (um slot do `uPkt`, pelo `transit.launch` na troca e pelo `writePacket` no scrub da entrada e no gesto de 390). **O resto é CSS**: o fio (o checker de 4 px mascarado numa coluna de 2 px, o idioma do `.fd` e do `.horizon`), o nó, as linhas e a assinatura. Não há canvas novo nem shader novo.
- **Os estados:**
  - **Reduced motion:** sem pacote, sem degraus e sem escrita; o fio inteiro pontilhado, os 4 nós acesos em repouso e as 4 citações a 100% (v4.5 §11.4).
  - **Sem WebGL:** tudo menos a cabeça do pacote. A 1440, o trecho de fio entre os dois nós acende em `steps(4)`, 240 ms (o fio vira o portador). A 390, a barra já carrega a luz.
  - **Sem JS:** como hoje.
  - **Parado no meio do scrub:** o pacote fica pendurado, o motor desenha o quadro e dorme.
  - **Resize:** o `ResizeObserver` recalcula os `docTop` e o `x` do fio.
- **Acessibilidade:** a ordem do DOM e a leitura de tela não mudam (o nó continua `aria-hidden`, a máscara e o clip não tiram nada da árvore). O trilho de 390 continua focável com `:focus-visible`. Sem `aria-live`.
- **Verificação:** **o axe não enxerga a máscara.** Ele vai ler as citações "outras" a 100%. O contraste a 48% tem que ser medido **por pixel** na captura, nos dois motores. Também: 0 texto abaixo de 48% por quadro; `__pkts` ≤ 3; o motor parado 1,5 s depois; o diff do texto contra `testimonials.ts` = 0; o vídeo de 390 para o teste da frase.

### 6.3 Ao frontend-craft: o orçamento
- **JS novo:** ≤ 1,5 KB gz. **CSS:** ≤ 1 KB. **Imagem:** 0.
- **Nenhuma leitura de layout por quadro** (tudo vem do cache do ticker). O motor fica acordado só com o pacote em voo, e no pior caso há 2 pacotes no ar nesta seção.
- **Compatibilidade:** `@property` e `lh` funcionam no Safari 16.4+ e no Chrome 109+. Abaixo disso, vale a regra de `@supports` do §4.4.

## 7. Riscos
- **WebKit:** a máscara com `lh` num `blockquote` com `-webkit-mask-image`. Testar no webkit do Playwright e, se der, num iPhone. A memória `playwright-nao-renderiza-backdrop-filter` não se aplica, mas a prova é por pixel.
- **Celular:** o scrub do `scrollLeft` acorda o motor durante o arrasto (o custo é igual ao da rolagem vertical). Medir os quadros a 390 no webkit.
- **Leitura:** se o degrau de 60 ms por linha parecer lento no teste, ele desce para 40 ms. O piso de 48% garante que ninguém espera para ler.
- **Conflito de árvore:** `Proto.tsx` e `proto.css` estão abertos pelo studio do hero. Este brief entra **depois**.
- **A pendência do v4.5 §11.5 continua:** os depoimentos falam de restaurante, e o dono precisa trocar ou confirmar. A animação não depende do texto.
