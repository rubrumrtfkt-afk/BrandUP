# BrandUp: brief v3.1, delta sobre o v3 ("A capa ocupa a página")

Autor: ui-ux-director · 09/11/2026 · **delta** sobre `brief-v3.md`: o que este arquivo não muda continua valendo como está no v3.
Para: `figma-architect` (refaz o mock), `copy-director` e `type-director` (pedidos no §7), `frontend-studio` (render v2 em `render/v2/`, em paralelo, e depois o código), `design-jury`.
Motivo: o júri do v3 deu Awwwards 6,75 (HM no limite), FWA 60 e taste 6,5 (`juri-v3.md`). O vocabulário de slop saiu e **não deve ser mexido** (0 mono, 0 pílula, 0 contorno, 0 gradiente, 0 stat row; `juri-v3.md` §9). O que segura a nota agora é **massa e planta**: a maquete pequena no hero com 240 px de preto embaixo, uma planta só (zona lateral morta + conteúdo a partir de x 512) em 7 seções, a sala YOU em 192×234, o roxo abaixo de 240×120 em 3 lugares e o bloco do depoimento de 928×480 com uma linha.

**Capturas que abri nesta sessão:** `juri-v3-fotos/d-0, d-1, d-2, d-3, d-5, d-6, m-all, intro`; `madeinevolve/d-00`, `madeinevolve/d-03, d-04, d-05`, `qclay-kurate/d-01, d-02`, `pensatori-irrazionali/d-01, d-10`, `dribbble-qclay/31`.
**Não verifiquei:** `render/v2/` ainda não existe (a pasta não está no disco), por isso as posições da maquete abaixo são **metas de composição** que o render v2 tem de cumprir (§7.3); as larguras de texto são estimadas a partir das medidas do júri (o H1 a 106 px mede 838 px na linha 1); os valores de APCA são do meu script (fórmula APCA 0.0.98G, sem a correção de fonte fina).

---

## 1. Peça e objetivo (o que muda)

A tarefa da pessoa é a mesma (chegou do anúncio no celular: entender, confiar, pedir o diagnóstico). Mudam três coisas:
1. **A primeira tela tem de ser a maquete do anúncio**, grande. Quem clicou no escritório precisa cair nele: a continuidade com o anúncio é a métrica de "não voltei".
2. **Cada capítulo do relatório ganha a sua planta.** A página continua sendo um relatório impresso, mas um relatório tem capa, formulário, índice, prancha de foto, página de número e página de perguntas. Não tem a mesma diagramação em todas as folhas.
3. **A prova social passa a ser verdadeira ou nenhuma.** Sem depoimento real, a prova é o número com a fonte e a demonstração da aprovação.

Métricas: júri Awwwards ≥ 7,2 no mock com o render v2; nenhum item do §10 revisado (§9) falhando; no ar, a taxa de envio do `#diagnostic` no tráfego do Meta (a medir depois do lançamento).

## 2. Conceito (uma frase)

**"O dia do seu escritório, impresso: a maquete é a capa e ocupa a página, cada capítulo tem a sua planta, e a última palavra é sua."**

A coisa viva continua sendo uma só: a linha de aprovação da sala YOU (v3 §2.1).

---

## 3. Movimentos do delta e descartes

Os 5 do v3 continuam (D1, B1, F3+F6, A2, D6). O delta **recompõe** três deles e acrescenta dois de custo $. Soma de $$$: continua um só (D1, o render), dentro da regra.

| Código | Captura (aberta) | Porquê aqui | O que muda em relação à fonte | Custo |
|---|---|---|---|---|
| **D1 recomposto: a capa sangrada** | `madeinevolve/d-00.webp` (a imagem é a massa da tela inteira, de borda a borda) | O júri mediu a maquete em ~20% da 1ª tela e pede ~45%, sangrando e passando da dobra. A imagem tem de ser a coisa mais pesada da tela depois do H1 | A ME põe o título **por cima** da foto, centrado. Aqui **nenhum texto toca pixel de render**: o H1 fica no preto, em cima, a partir de x 72; a maquete entra por baixo e pela direita, sai pela borda x 1440 e pela dobra, e o canto do plinto avança para a coluna lateral **abaixo** do CTA. A ME é uma foto retangular de tela cheia; aqui é um objeto recortado (fundo transparente) que flutua no preto e é cortado pela página | $$$ (já contado no render) |
| **A3 como regra de planta** (alternância cheio/vazio entre capítulos) | `pensatori-irrazionali/d-10.webp` (uma frase só, num campo quase vazio, depois de blocos cheios) | A doença do v3 é a mesma planta 7 vezes. A3 vira a regra: cada seção vizinha troca de planta **e** de densidade (§4) | O PI faz o vazio com uma frase-manifesto que atravessa a largura. Aqui o "vazio" é a página do About: papel claro, um número e um parágrafo em meio a meio. Não há manifesto nem script | $ |
| **B1 aplicado à prova** (o número como a página) | `pensatori-irrazionali/d-10.webp` (escala extrema num campo limpo); `madeinevolve/d-00.webp` (grotesca em caixa alta como massa) | Sem depoimento, a prova verdadeira que existe é "over A$10 million in sales generated for our clients" (com a ressalva). Escrito a 16 px no meio dos fatos, ele some; na escala do wordmark, ele vira a página de prova | A fonte usa a escala no nome da marca ou numa frase. Aqui ela vai num **número com fonte declarada** logo embaixo (a ressalva é parte do bloco, não rodapé), na metade esquerda de uma página clara. Usa o **mesmo tamanho** do wordmark do rodapé (rima, e não cria tamanho novo) | $ |
| **D7 transformado: a foto que sangra pela esquerda** (a cena da sala YOU) | `madeinevolve/d-04.webp` (a foto do laptop encosta na borda esquerda, a seguinte é maior, nada fica no grid "caixa ao lado de caixa") | A sala YOU tem de ser a cena da seção (≥ 400×500). Do lado esquerdo e sangrando, ela espelha o hero (que sangra pela direita) e quebra o eixo | A ME é uma colagem de 4 fotos desencontradas. Aqui é **uma** foto em retrato 4:5 (708×885) colada na borda esquerda, e ao lado, encostada, a coluna das três ordens de serviço (o produto). Nenhum texto sobre a foto; os nomes de estado saem da lateral e vão para cima de cada ordem | $$ (asset do mesmo pipeline) |
| **E8 / F5: a intro termina no hero** | sem captura de terceiros (memória `produzze-landing-nova-identidade`, E8 do repertório) | O júri apontou que o último quadro da intro não é o hero (§4.2 #4). A intro passa a acontecer **dentro** da caixa da imagem do hero, e não numa composição própria | — | $ |

### Descartados neste delta
| Código | Porquê não |
|---|---|
| **D4** a maquete atravessando o H1 (por trás das letras) | Daria massa ao hero, mas põe imagem sob o título, quebra a leitura do LCP e a regra "nada sobre o título". A massa vem do tamanho e do sangrado, não da sobreposição |
| **D5** prova social como objeto (bandeiras, cilindro de logos) | Não há 6 logos reais autorizados |
| **A6** bento de métricas | Só existe um número comprovável (e ainda "a confirmar"). Um bento com um número é enfeite; com números inventados é slop |
| **F1** "KPI contando de 0 a n" no número do About | Contar dinheiro na frente da pessoa é truque de venda e a ACCC olha esse número. O número entra pela mesma máscara do H1 e para |
| **Depoimento-modelo de 25 palavras** (pedido do júri §8 #6) | Decisão do dono: não escrevemos depoimento inventado nem como modelo na página principal. O estado existe só no frame States, com estrutura neutra (§5.4) |
| **Tour em abas horizontais sob a foto** (alternativa ao índice cheio) | Seria o desenho do jimo (`jimo/d-07`, abas 01/02/03 sob o produto). O índice lateral cheio com a leitura de cada mesa é nosso e resolve a coluna morta |
| **O formulário final em split de novo** | O §10.5 proíbe repetir o split "texto \| formulário"; o #2 deixa de ser split (§5.3) e o final vira composição centrada (§5.9) |

**Equilíbrio de fontes:** o delta puxa da ME duas vezes (d-00 e d-04) e do PI uma (d-10). Somado ao v3, a ME é a fonte mais citada (B1, D6, a capa e a cena da YOU). É deliberado, porque a ME é a referência fotográfica e editorial da biblioteca, que é o gênero desta direção, mas fica registrado: na próxima peça da BrandUp, a ME entra só se nenhuma outra fonte fizer o trabalho.

**Teste de sobreposição (feito por mim, refazer no Figma):** hero × ME d-00, sem sobreposição (lá o título fica centrado sobre a foto retangular; aqui o título fica no preto e o objeto é recortado e sangra no canto inferior direito). YOU × ME d-04: lá uma colagem de 4 fotos, aqui uma foto e uma coluna de produto. About × PI d-10: lá uma frase centrada na largura toda com script, aqui um número na metade esquerda e um parágrafo na direita, sobre papel.

---

## 4. Grid e plantas (substitui o §4 do v3 onde conflitar)

O grid não muda: 1440 = 12 col × 86, gutter 24, margem 72; 768 = 8 col, gutter 20, margem 40; 390 = 4 col × 78,5, gutter 12, margem 20.
Colunas a 1440 (início–fim): c1 72–158 · c2 182–268 · c3 292–378 · c4 402–488 · c5 512–598 · c6 622–708 · c7 732–818 · c8 842–928 · c9 952–1038 · c10 1062–1148 · c11 1172–1258 · c12 1282–1368.

**O que muda: o eixo x 512 deixa de ser lei e vira uma das plantas.** As margens 72/72 continuam em todo texto; as imagens podem sangrar onde está declarado abaixo (e só ali).

| Planta | Nome | Geometria | Onde |
|---|---|---|---|
| **P1** | Capa | título de x 72 em cima; texto e CTA em c1–c4; o objeto entra por baixo e pela direita, sangra em x 1440 e passa da dobra | Hero |
| **P2** | Ficha de pedido | título de x 72 (c1–c8) com o texto de apoio à direita (c9–c12); o formulário em **linhas horizontais nas 12 colunas** (4 campos por linha) | Formulário #2 |
| **P3** | Índice \| palco | índice cheio em c1–c4 **com a mesma altura** do palco; o palco (foto + faixas) de x 512 até sangrar em x 1440 | Tour |
| **P4** | Cena à esquerda | foto em retrato colada na borda x 0 até x 708; o produto em c7–c12, encostado | Sala YOU |
| **P5** | Meio a meio | c1–c6 \| c7–c12 sobre papel | About (a prova) |
| **P6** | Eixo | pergunta em c1–c4, resposta a partir de x 512 (a do v3, que aqui funciona porque a coluna lateral está cheia de perguntas) | FAQ |
| **P7** | Centro | faixa de 3 fotos de borda a borda, depois um bloco centrado em c3–c10 | Final |

**Sequência e campos** (o depoimento sai do fluxo): intro (preto) → hero P1 (preto) → formulário P2 (**roxo**) → tour P3 (preto) → YOU P4 (preto) → About P5 (**papel**) → FAQ P6 (faixa **roxa** + faixas escuras) → final P7 (fotos + preto) → rodapé (preto).
Tour e YOU são vizinhos no mesmo preto: é um capítulo só ("o dia do escritório"), separado pela troca de planta (o índice à esquerda vira a foto sangrando à esquerda) e pelos 160 px. Nenhum outro par de campos vizinhos se repete.
**Ritmo (A3):** cheio (capa) → denso (ficha roxa) → cheio (índice + palco) → cheio (cena + produto) → **vazio** (papel com um número) → texto (perguntas) → cheio (noite) → vazio centrado (o pedido) → wordmark.

### Visão geral a 1440 (alturas aproximadas)
```
y     0 ┌ NAV 72 ───────────────────────────────────────────────────────────────┐
     72 │ P1 CAPA  H1 x72 ████████████████████                                   │
        │          ████████████            ▓▓▓▓▓▓ topo da maquete (y ≥ 240)  ▓▓▓▓│→ sangra
        │ apoio c1–c4   [PLACA 296×136]▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
        │ [CTA]        ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ MAQUETE ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│
    900 ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ dobra ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│
        │   ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ plinto cortado pela borda e pela base ▓▓│
   1180 ├ P2 FICHA (roxo) H2 x72 c1–c8 ████████          apoio c9–c12           │
        │ [Name    ][Company ][Work email][Mobile  ]   ← 4 × 306                 │
        │ [<$100K  ][100–300K][300K–$1M ][>$1M    ]                              │
   1914 │ privacy line c1–c8                            [CTA c10–c12]           │
   2074 ├ P3 ÍNDICE | PALCO  H2 x72                                             │
        │ [plaqueta 120]  ┌ FOTO DA MESA 928×522 ──────────────────────────────────│→ sangra
        │ [plaqueta 120]  └────────────────────────────────────────────────────────│
        │  ... ×7         faixas de hora ×3 (sangram)                              │
   3134 │ (= altura)      ██ faixa roxa "You approve…" 928×128 ███████████████████│
   3294 ├ P4 CENA À ESQUERDA  H2 x72                                            │
  ←sangra ┌ SALA YOU 708×885 ┐  Arrives 07:58 / [ordem]                          │
        │ │                  │  You decide / [ordem VIVA]                        │
   4307 │ └──────────────────┘  Sent 08:02 / [ordem]                             │
   4467 ├ P5 MEIO A MEIO (papel)  A$10M+ (display.giant) │ About + parágrafo 26 │
        │                         ressalva 16 px        │ 3 fatos 2×2          │
   5211 ├ P6 FAQ  faixa roxa 40svh / faixas pergunta c1–c4 | resposta x512     │
        ├ P7 FINAL  3 fotos noturnas 480×360 coladas                            │
        │              H2 centrado / declaração centrada / ficha c3–c10         │
        └ RODAPÉ  wordmark cortado pela base ───────────────────────────────────┘
```

### Visão geral a 390
```
NAV 56 → H1 40 px (2 linhas) → apoio 3 linhas → [CTA largura total] → prova 15 px
→ MAQUETE em retrato 390×560 sangrando nas 2 bordas, com a PLACA 260×128 no canto sup. esq.
→ FICHA roxa (empilhada) → TOUR (plaquetas sticky de 165 px, foto 1:1 390×390 sangrando, faixas, faixa roxa 390×136)
→ YOU (H2, foto 390×488 sangrando, 3 ordens) → ABOUT (número 96 px, ressalva, parágrafo, fatos 2 col)
→ FAQ → FINAL (foto 4:3 inteira + 2 meias, H2, declaração, ficha) → RODAPÉ
```

---

## 5. Seções (só o que muda)

### 5.0 Intro: acontece dentro da caixa da imagem do hero
- A intro deixa de ser uma composição própria. A overlay preta cobre **só a caixa da imagem do hero** (1440: x 400–1440, y 280–1180; 390: x 0–390, y 376–936). O H1, o apoio, o CTA e a prova estão pintados desde o 1º quadro, no preto, onde ficarão.
- Quadros (1440 ≤ 1,1 s; 390 ≤ 0,9 s): 0 ms, caixa preta → 0–550 ms, a capa **noturna** (mesma câmera e mesmo recorte da capa diurna) aparece com as 7 telas acesas pela máscara de 7 pontos do `desks.json` v2 → 550–800 ms, crossfade noite → dia → 800–1000 ms, a placa roxa entra (opacidade 0 → 1, 200 ms; é o último quadro da intro e o primeiro da página).
- **O último quadro é o hero, pixel por pixel.** No Figma, o quadro 4 da intro é uma **instância** do frame do hero (não uma cópia redesenhada); os quadros 1–3 são a mesma instância com a caixa da imagem trocada.
- A 390, o quadro noturno usa o render `office-night-portrait` do v2 (mesma câmera do retrato diurno). Até ele chegar, o Figma mostra um bloco `ink.900` na proporção exata, com o nome do arquivo na camada (e não na tela).
- Regras de pular, de sessão e de reduced motion: as mesmas do v3 §5.0.

### 5.2 Hero (P1, "Capa")

**1440 × 900 (a seção vai até y 1180):**
```
 x72                    x488 x512          x1012                         x1368 x1440
 │ BrandUp              Office  Desks  FAQ                         Diagnosis │      72
 │ ████ OVER $250K PER MONTH ████████████████  ← H1 ≥ 112 px, linha 1 ≤ 940 px │     112
 │ ████ WITHIN 90 DAYS. ████████     ▓▓▓▓▓▓▓▓▓▓▓▓▓ topo (paredes do fundo)▓▓▓▓▓│▓▓   ≥ 240
 │                                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│▓▓   314
 │ How industrial and B2B  ┌PLACA────────┐▓ sala ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│▓▓   348
 │ companies get there…    │ 2           │▓ YOU  ▓▓▓▓▓▓▓▓ MAQUETE ▓▓▓▓▓▓▓▓▓▓▓▓│▓▓
 │ (22 px, c1–c4)          │ …for your yes│▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│▓▓   484
 │ [ Build my AI office ]  └─────────────┘▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│▓▓   540–596
 │ Over A$10 million… (16)  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│▓▓   620
 │         ▓▓▓▓ canto frontal-esquerdo do plinto entra em c3–c4 abaixo de y 680 ▓│▓▓
 ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄ dobra 900 ┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
 │            ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│▓▓
 │                       ▓▓▓▓▓▓▓▓▓▓▓▓ frente do plinto, chanfro com luz ▓▓▓▓▓▓▓▓▓│▓▓   ~1150
 └──────────────────────────────────────────────────────────────── campo roxo ──┘    1180
```
Medidas para o figma-architect:
- **H1**: x 72, topo y 112, 2 linhas, entrelinha 0,90, tamanho ≥ 112 px (7,8vw) com a linha 1 terminando em x ≤ 1012 (a escala exata é do type-director, §7.2). O H1 sai do eixo: começa em x 72.
- **Apoio**: x 72–488 (c1–c4), topo y 372, `lead` 22 px, ≤ 4 linhas. **CTA**: x 72, y 540, 56 px de altura. **Prova**: y 620, 16 px.
- **Caixa da imagem**: x 400 → 1440 (sangra pela direita; sem margem), y 280 → 1180 (sangra pela dobra em 280 px). O render v2 é **recortado** por essa caixa: o plinto é cortado pela borda direita e pela base da seção. Não há moldura nem canto.
- **Onde a maquete pode ter pixel** (evita colisão com o texto): y ≥ 240 em qualquer x; x ≥ 680 para y < 330 (livre da 2ª linha do H1); x ≥ 520 para 330 ≤ y < 660 (livre do apoio e do CTA); **livre para y ≥ 660**, de modo que o canto frontal-esquerdo do plinto avance para c3–c4 abaixo da prova. É isso que mata a coluna morta do hero.
- **Meta de massa**: o retângulo envolvente da maquete dentro de 0–900 ≥ 45% da tela (ex.: x 520–1440 × y 260–900 = 920×640 = 589 mil px = 45%). Os 240 px vazios do v3 (y 800–1040) passam a ser plinto.
- **A placa roxa**: `brand.500` cheio, **296×136**, canto reto, x 512–808, y 348–484. O número em `head` (64 px) e a linha a 16 px (copy, §7.1). Ela fica **encostada na parede esquerda da sala YOU**: o tapete roxo da maquete aparece logo à direita da placa, e a rima de cor (placa = tapete) é a explicação dela. Pode sobrepor **até 24 px** da borda da maquete (parede externa ou piso), **nunca** figura, mesa, monitor ou o tapete. Meta de posição do centro da sala YOU na página: (880 ± 40, 410 ± 30), o que o render v2 precisa entregar (§7.3).
- **Sobre o §10.6 ("nada sobre a imagem"), reescrito no §9:** a regra protegia duas coisas: contraste de texto sobre foto e o tique de etiqueta flutuando no 3D (as 7 placas do v2). A placa não tem nenhum dos dois problemas: é um campo opaco com contraste próprio (Lc −72 de `text.1` sobre `brand.500`), é uma só e aponta um lugar que existe na maquete. Na fotografia de maquete, a etiqueta colada no plinto é parte do gênero. Por isso a sobreposição de ≤ 24 px é o movimento certo, **só para esta placa**. Texto sobre pixel de render continua proibido.
- **Variante "em avaliação"** (frame à parte, fácil de remover): a frente do plinto **avança 48 px para dentro do campo roxo** (y 1180–1228), com a sombra de contato composta sobre o roxo, como se a maquete estivesse apoiada na página do formulário. Custa um passe de sombra separado no render (§7.3). O dono escolhe vendo.

**390 × 844:**
```
 │ BrandUp            Diagnosis │ 0–56
 │ ██ OVER $250K PER MONTH ████ │ 76   H1 40 px, 2 linhas
 │ ██ WITHIN 90 DAYS. ███       │ ~150
 │ How industrial and B2B com-  │ 168  apoio 18 px, ≤ 3 linhas
 │ panies… from your phone.     │ ~244
 │ [     Build my AI office   ] │ 264–320  largura 350
 │ Over A$10 million in sales…  │ 332  prova 15 px (sobe para cá; no v3 boiava em y 770)
 │┌PLACA 260×128──┐▓▓ sala YOU ▓│ 360–488
 ││ 2             │▓▓▓▓▓▓▓▓▓▓▓▓▓│
 ││ …for your yes │▓▓▓▓▓▓▓▓▓▓▓▓▓│
 │└───────────────┘▓▓▓▓▓▓▓▓▓▓▓▓▓│
▓▓▓▓▓▓▓▓▓▓ MAQUETE em retrato ▓▓▓▓▓▓│ caixa x 0–390, y 376–936 (sangra nas 2 bordas)
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄│ 844 dobra
▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓│ 936 → campo roxo
```
- Placa **260×128** (passa de 256×89 para ≥ 240×120): x 20–280, y 360–488, padding 20; o número a 30 px e a linha a 16 px em 2 linhas. Centro da sala YOU no retrato: (330 ± 20, 430 ± 30) na página, logo à direita da placa.
- Caixa da imagem 390×560 (render 1170×1680, 3x). Massa na 1ª tela: 390 × 468 = 55%. O H1 fica a 40 px (razão 2,4, `juri-v3` §4.2 #11): aceito, e a escala da 1ª tela no celular vem da maquete.

### 5.3 Formulário `#diagnostic` (P2, "Ficha de pedido", roxo)
A coluna lateral morta do v3 (72–480 × 1270–1943, ~670 px) deixa de existir porque o formulário passa a ocupar as 12 colunas em linhas, como uma ficha de pedido impressa.
```
1440 (campo brand.500 de borda a borda; y 1180–1914, altura 734)
 x72                                       x928 x952                       x1368
 │ ██ H2 (head 64, 2 linhas, c1–c8) ██████      Apoio: o que acontece depois  │ 1300
 │ ██████████████████                           (20 px, ≤ 3 linhas, c9–c12)  │ ~1418
 │ Name            Company          Work email       Mobile                   │ 1482 rótulos 16
 │ [ c1–c3 306  ] [ c4–c6 306   ] [ c7–c9 306    ] [ c10–c12 306 +61 ]       │ 1514–1570
 │ Monthly revenue (AUD)                                                      │ 1602
 │ [ Under $100K ] [ $100K–$300K ] [ $300K–$1M   ] [ Above $1M      ]       │ 1634–1690
 │ We only use your details… (15 px, c1–c8)       [ Build my AI office  ]    │ 1730–1794 CTA c10–c12, 306×64
 └────────────────────────────────────────────────────────────────────────────┘ 1914
```
- Os 4 blocos de faturamento ficam **alinhados às colunas dos campos** (306 cada, gutter 24), e não colados: a ficha lê como grade de formulário impresso. O selecionado inverte para `paper.100` + `ink.950`.
- O CTA fica no canto inferior direito (c10–c12), onde o olho termina a ficha; 306×64 = 1,5% da tela em menta.
- Padding vertical 120/120. O formulário começa a 302 px do topo do campo (o v3 pedia ≤ 220 a 390, e isso continua a 390).
- **Input em foco sem quebrar linha** (`juri-v3` §4.2 #9): a camada de texto do valor fica com largura fixa = campo − 32, uma linha, `clip` (no código: `white-space: nowrap; overflow: hidden; text-overflow: clip`). No frame States, o foco é desenhado na largura real (306 a 1440, 350 a 390), e não em 233.
- 390: igual ao v3 (H2 → apoio → campos empilhados → faturamento 2×2 → CTA → privacidade).

### 5.4 Depoimento: sai do fluxo principal
- **Página principal (1440, 768, 390): a seção não existe.** O formulário roxo encosta direto no tour (160 px de preto entre eles).
- **Frame States, "Depoimento (só com depoimento real)":** estrutura neutra, sem texto inventado. 1440: bloco `ink.900` em c1–c4 com duas barras `paper.200` a 40% (nome 160×16, cargo 220×12) no canto inferior esquerdo | bloco `paper.100` de x 512 a 1440 com **três barras** `paper.200` de 22 px de altura e passo de 46 px (larguras 100%, 92%, 58% da medida de 780 px), que representam uma citação a 36 px em 3 linhas. **Altura pelo conteúdo** (120 + 3 × 46 + 120 ≈ 380 px), nunca 70svh: o bloco de 928×480 com uma linha não volta. 390: bloco claro (barras com passo de 32 px) e o escuro com 96 px embaixo.
- Quando houver depoimento real, ele volta **entre o formulário e o tour** (a posição do v3), com essa altura pelo conteúdo, e o júri reavalia.
- A prova social da página principal passa a ser: (1) a prova sob o CTA do hero; (2) a página do número no About (§5.7), com a fonte; (3) a demonstração da aprovação na sala YOU, que é a prova por inspeção.

### 5.5 Tour (P3, "Índice | palco")
O v3 deixava 72–488 × 3253–3560 vazio debaixo das plaquetas. O índice passa a ter a mesma altura do palco, e cada plaqueta ganha a leitura do que a mesa fez hoje (é o princípio das "placas sobre cada mesa" do Antonio, que agora mora no índice).
```
1440 (y 2074 → 3134)
 x72          x488 x512                                                 x1368 x1440
 │ H2 x72 (head, 2 linhas)                                                    │
 │ ┌──────────────┐ ┌ FOTO DA MESA 928×522 (16:9), sangra pela direita ───────│──┐
 │ │Your follow-up│ │                                                         │  │
 │ │3 done · 1 for│ │                                                         │  │
 │ │you  (ativa)  │ └─────────────────────────────────────────────────────────│──┘
 │ ├──────────────┤  06:12  Followed up 12 leads…                       Done  │▒▒  faixas 76 px,
 │ │Your bookkeep.│  07:58  Drafted a follow-up…                     Waiting  │▒▒  sangram até 1440;
 │ │ ... ×7       │  09:30  Booked a site visit…                        Done  │▒▒  texto termina em 1368
 │ │You →         │ ██ You approve follow-ups on quotes and anything… ██████│██  roxo 928×128
 │ └──────────────┘                                                           │
```
- **Plaquetas**: c1–c4 (416 de largura), 7 plaquetas de **120 px** com 6 px entre elas = 876 px, igual à altura do palco (522 + 3 × 76 + 128 = 878; o auto-layout distribui a diferença). Cada plaqueta tem 2 linhas: o nome (18 px, como no v3) e a leitura do dia em `small` 15 px `text.2` ("3 done · 1 waiting for you", copy §7.1). Quando a mesa tem algo pendente, só a palavra do pendente fica em `status.attention`. A ativa inverte para `paper.100` (a leitura passa para `ink.950` a 70%). "You" leva à seção YOU.
- **Palco**: a foto vai de x 512 a 1440 (sangra), 928×522. As faixas e a faixa roxa também sangram até 1440 (o texto alinha à direita em 1368, como a margem).
- **Faixa roxa "You approve…"**: de 856×77 para **928×128** (passa no mínimo de 240×120). O texto passa para `lead` 24 px, uma linha (≤ 70 car.), alinhado ao topo com padding 32/24. A faixa é o "rodapé" do palco e fecha a altura do índice.
- **390**: as plaquetas viram uma fileira sticky sob a nav, com **largura fixa de 165 px**, gap 8, padding-inline 24 e altura 48 (≥ 44). Conta: 20 + 165 + 8 + 165 + 8 = 366, e a 3ª plaqueta mostra só 24 px, **que são o padding dela**, sem nenhuma letra. Em repouso (scroll-snap `start` em cada plaqueta), nenhuma palavra fica cortada e a borda da próxima convida a deslizar. A leitura do dia não entra na fileira a 390 (vai para a 1ª faixa). Foto 1:1 de borda a borda (390×390). Faixa roxa de borda a borda, **390 × ≥ 136** (padding 24/20, até 3 linhas de 17 px).

### 5.6 Sala YOU (P4, "Cena à esquerda")
```
1440 (y 3294 → 4307)
x0          x72                         x708 x732                                x1368
 │          │ YOU HAVE THE FINAL WORD.  (H2 x72, head, 1 linha)                     │ 3294
 │                                                                                  │
 ┌ SALA YOU (render em retrato 4:5) ────────┐  Arrives · 07:58      (15 px, text.2) │ 3422
 │ 708 × 885, colada na borda x 0           │  ┌ ordem (636) ───────────────────┐  │
 │ (sangra pela esquerda)                   │  └────────────────────────────────┘  │
 │                                          │  You decide                         │
 │ o tapete roxo é a única cor              │  ┌ ordem VIVA: Why ×3, prévia,     ┐ │
 │                                          │  │ [Approve] Edit  Decline          │ │
 │                                          │  └────────────────────────────────┘  │
 │                                          │  Sent · 08:02                        │
 │                                          │  ┌ Approved. Follow-up sent to Sam.┐ │
 └──────────────────────────────────────────┘  └────────────────────────────────┘  │ 4307
```
- **Foto**: x 0–708 (c6 termina em 708), **708×885** (4:5), y 3422–4307. Passa com folga o mínimo de 400×500 (era 192×234). Pede o render `you-room-portrait` a 1416×1770 (§7.3).
- **Ordens**: c7–c12 (732–1368, 636 de largura; o v3 tinha 640, e as quebras de linha do copy precisam ser conferidas a 636). Começam na altura do topo da foto. Os nomes de estado saem da coluna lateral e vão **para cima de cada ordem**, a 15 px `text.2`, 8 px acima. Entre as ordens, 56 px.
- A linha viva, os 5 estados e o `aria-live`: iguais ao v3 §5.6.
- **390**: H2 → foto de borda a borda 390×488 (4:5) → as 3 ordens em largura total, cada nome de estado em cima da sua ordem. A foto volta a aparecer a 390: agora ela é a cena da seção.

### 5.7 About (P5, "Meio a meio", papel): a página da prova
```
1440 (paper.100, padding 120/120, altura ≈ 744)
 x72                                   x708 x732                                x1368
 │ A$10M+                                   About BrandUp (20 px)                  │
 │ ██████ display.giant (o mesmo tamanho    No business has just one problem…     │
 │ ██████ do wordmark do rodapé)            (parágrafo 26 px / 1,35, ≤ 60 palavras)│
 │                                                                                 │
 │ Sales generated for our clients since    Based in        Built for             │
 │ [ano]. Source: [fonte]. Results vary.    [cidade]        Manufacturers…        │
 │ (ressalva 16 px, ink 70%, ≤ 2 linhas)    Office running within                 │
 │                                          90 days                               │
```
- **Esquerda (c1–c6)**: o número na família e no peso do hook, no tamanho do wordmark do rodapé (~18vw), **se couber em 636 px**. Se não couber, o type-director escolhe o maior que caiba e o wordmark do rodapé passa a usar esse mesmo tamanho (um tamanho para os dois, sem criar o 7º). Logo abaixo, a ressalva (fonte, período, "results vary"), que é parte do bloco.
- **Direita (c7–c12)**: "About BrandUp" a 20 px, o parágrafo a 26 px e os 3 fatos restantes em grade 2×2 (o "Sales generated" sobe para o número).
- **Estado "número não comprovado"** (frame à parte): a esquerda recebe o parágrafo a 32 px e a direita os 4 fatos; o número sai também da prova do hero. A planta meio a meio continua.
- Contraste: `ink.950` a 70% sobre `paper.100` precisa de Lc ≥ 60 a 16 px (o figma-architect mede; se não passar, sobe para 80%).
- **390**: o número a 96 px (cabe: 6 caracteres condensados ≈ 290 px), a ressalva, o parágrafo a 19 px e os fatos em 2 colunas.

### 5.8 FAQ (P6, eixo): só o conteúdo muda
A planta do v3 fica (aqui a coluna lateral está cheia de perguntas, então não há vazio). Os `[PLACEHOLDER …]` viram frases-modelo realistas do copy-director, com a camada nomeada `modelo:` no Figma (§7.1). A faixa roxa de 40svh já passa no mínimo.

### 5.9 Final (P7, "Centro")
O split "texto | formulário" do v3 sai (repetia o #2 e deixava 72–700 × 7660–8060 vazio).
```
1440
 ┌ NOITE follow-up 480×360 ┬ NOITE bookkeeper 480×360 ┬ AMANHECER sala YOU 480×360 ┐  coladas, sem legenda
 └─────────────────────────┴──────────────────────────┴────────────────────────────┘
                                   160
 x292                     WANT A TEAM LIKE THIS                                 x1148
                          IN YOUR BUSINESS?  (head, centrado, 2 linhas)
               A night in this office: 14 leads followed up… (24 px, centrado, ≤ 720)
                                   56
 │ Name                  [ 416 ]   Company              [ 416 ]  │  c3–c10 = 856
 │ Work email            [ 416 ]   Mobile +61           [ 416 ]  │
 │ [ <$100K 196 ][ $100–300K ][ $300K–$1M ][ >$1M ]               │
 │                 [ Build my AI office  416×56, c5–c8 ]           │  centrado, 1,8% da tela
 │                 privacy line (15 px, centrada)                  │
                                  160
                               RODAPÉ
```
- Bloco centrado em c3–c10 (292–1148): a lateral livre fica em 220 px de cada lado, simétrica, e fecha a página como uma última folha. É a única seção centrada (o fim do relatório).
- 390: igual ao v3 §5.9.

### 5.12 States (acréscimos ao v3)
- O foco do input na largura real, sem quebra (§5.3).
- O depoimento neutro (§5.4).
- O About sem número comprovado (§5.7).
- O hero com a variante "plinto no roxo" ("em avaliação", §5.2).
- A fileira de plaquetas a 390 nas posições de repouso 1, 2 e a última (§5.5).

---

## 6. Tokens (delta)
| Token | v3 | v3.1 | Por quê |
|---|---|---|---|
| `text.2` | `#B3ADBC` (Lc −59,2 sobre `ink.950`) | **`#C2BCCB`** (Lc −67,7 sobre `ink.950`, −67,2 sobre `ink.900`) | Defeito #10 do júri: abaixo de 60 a 15 px. Continua bem abaixo de `text.1` |
| `size.giant` | wordmark do rodapé, ~18vw | **compartilhado** pelo wordmark e pelo número do About | Não cria o 7º tamanho |
| `brand.500` em área | ≥ 240×120 | ≥ 240×120 **medido**: placa 1440 = 296×136; placa 390 = 260×128; faixa "You approve" 1440 = 928×128, 390 = 390×136; o formulário e a faixa do FAQ em campo inteiro | Defeito §4.1 d |

---

## 7. Pedidos

### 7.1 Ao copy-director (função e tamanho; o texto é seu)
| Bloco | Função | Limite |
|---|---|---|
| **H2 do formulário** (substitui "Do not leave now. Your team is waiting.") | O júri leu como pop-up de saída. A função nova: dizer **o que a pessoa recebe** ao preencher a ficha (o diagnóstico ou plano do escritório dela), no registro de relatório: afirmação, sem urgência fabricada, sem exclamação | ≤ 40 car., 2 linhas em caixa alta a 64 px, cada linha ≤ ~26 car. (a medida é c1–c8 = 856 px) |
| Apoio do formulário (c9–c12) | o que acontece depois de enviar (quem liga, em quanto tempo, em que horário) | ≤ 110 car., ≤ 3 linhas a 20 px em 416 px |
| **Placa do hero** | número + **de quem** são as ações + que esperam o "sim" do dono. O júri apontou a ambiguidade ("ações de quem?") | linha ≤ 34 car. (cabe em 2 linhas de 220 px a 390) |
| **Leitura do dia nas plaquetas** (×6) | o que a mesa fez hoje + o que espera o dono, em fato contável | ≤ 26 car. |
| Nomes das plaquetas | se algum passar de 165 − 48 = 117 px a 18 px na display condensada, encurte a 390 | ≤ 18 car. |
| Faixa "You approve…" (×6) | o que o dono aprova naquela mesa | ≤ 70 car. (uma linha a 24 px em 856 px) |
| **Ressalva do número** (About) | de onde vem o A$10M: período, fonte e "os resultados variam" (ACCC) | ≤ 120 car., 2 linhas |
| Número do About | o número em si | ≤ 7 car. (ex.: "A$10M+"), só se o dono comprovar |
| Placeholders do About, do FAQ e do rodapé | frases-modelo realistas (cidade, onde o dado fica, integrações, e-mail, telefone, ABN fictício no formato real), com a camada nomeada `modelo:` no Figma. No site, só entra o real | o tamanho de cada campo no v3 §7.2 |
| Depoimento | não escrever (decisão do dono) | — |

### 7.2 Ao type-director
1. **`display.hook` no hero a 1440**: ≥ 112 px com a linha 1 ("OVER $250K PER MONTH") **≤ 940 px**. Confirme com o espécime; se a família atual não chegar a 112 nessa largura, diga qual é o maior tamanho possível e eu ajusto a caixa da imagem (a regra do topo da maquete depende do fim da linha 1).
2. **`size.giant` compartilhado**: o número do About ("A$10M+") e o wordmark do rodapé no mesmo tamanho. Meça se "A$10M+" cabe em 636 px a ~18vw; se não, proponha o tamanho único que sirva aos dois.
3. **Plaqueta de 2 linhas**: o nome (18 px, como no v3) + a leitura em `small` 15 px na fonte de texto. Confirme a entrelinha para caber em 120 px com padding 20.
4. `text.2` novo (`#C2BCCB`): confirme no espécime webkit + chromium a 15 px sobre `ink.950` e `ink.900`.

### 7.3 Ao frontend-studio
**Render v2 (em curso em `render/v2/`): a composição depende destas metas.**
| Quadro | Meta de composição (posição **na página**, depois do recorte) |
|---|---|
| Capa diurna larga (e a noturna, mesma câmera) | Recortada na caixa x 400–1440 × y 280–1180 a 1440. Plinto cortado pela borda direita e pela base. Pixels da maquete: y ≥ 240; x ≥ 680 para y < 330; x ≥ 520 para 330 ≤ y < 660; o canto frontal-esquerdo do plinto chega a x ≈ 300–400 abaixo de y 680. **Centro da sala YOU em (880 ± 40, 410 ± 30).** Resolução para 2x: a caixa tem 1040×900, então ≥ 2080×1800 úteis no recorte. Entregar o `desks.json` v2 já em coordenadas desse recorte |
| Passe de sombra de contato separado (PNG com alfa) | Para a variante "plinto no roxo" (§5.2): a sombra composta sobre `#9232EA` |
| Capa em retrato 390 (dia e noite, mesma câmera) | Caixa 390×560 (render ≥ 1170×1680). Centro da sala YOU em (330 ± 20, 430 ± 30) na página, ou seja, x ≈ 85% e y ≈ 10% da caixa. A noturna é a da intro a 390 |
| `you-room-portrait` | 4:5, **≥ 1416×1770** (708×885 a 2x), câmera a 18–22°, figura de resina adulta, tapete calibrado para `#9232EA` |
| Mesas | a foto agora tem 928 de largura a 1440: 1920×1080 serve (2x = 1856). O 1:1 a 390 vai de borda a borda: ≥ 1170×1170 |

**Código: motion com intenção.** A régua continua sendo "alguém consegue dizer o que aconteceu?". Nada perpétuo.
| # | Onde | O que acontece | Mecânica | Tempo | O que a pessoa diz | Reduced motion |
|---|---|---|---|---|---|---|
| 1 | Intro | O escritório acende e amanhece **na caixa do hero** | overlay só na caixa da imagem; máscara radial de 7 pontos (`desks.json` v2) e crossfade de `opacity` | ≤ 1,1 s / ≤ 0,9 s; pulável em 150 ms | "o escritório abriu" | não roda; a capa diurna e a placa já estão lá |
| 2 | H1 | As duas linhas sobem por máscara | `clip-path`/`transform` em cada linha; o texto existe pintado (LCP intacto) | 900 ms, a 2ª linha 110 ms depois, `cubic-bezier(.2,.7,.1,1)` | "o título entrou" | estático |
| 3 | Hero | A maquete se aproxima um pouco enquanto o hero sai | `scale` 1,00 → 1,04 e `translateY` 0 → −24 px na rolagem do hero; `animation-timeline: scroll()` com fallback IO + rAF | toda a rolagem do hero | "cheguei mais perto do escritório" | sem escala |
| 4 | Placa | O número sobe de 2 para 3, **uma vez** ("em avaliação") | troca do dígito por máscara vertical | 4 s depois de pintar, 300 ms | "chegou mais uma ordem" | sem troca |
| 5 | Tour | Trocar de mesa | crossfade da foto + escala de 1,02 → 1; as faixas em cascata de 60 ms; a plaqueta inverte em 120 ms | 240 ms | "mudei de mesa" | troca instantânea; sem JS, as 7 mesas empilhadas |
| 6 | YOU | Aprovar | a ordem do meio desliza para a vaga "Sent" (FLIP, 320 ms), a "Sent" antiga sai por opacidade e a nova ordem (bookkeeper, A$18,400) entra na vaga "Arrives" (opacidade + 12 px, 240 ms); `aria-live` anuncia | 320 + 240 ms | "aprovei e chegou a próxima" | troca de estado sem deslocamento |
| 7 | About | O número entra pela mesma máscara do H1 e para | igual ao #2, disparado por IO (uma vez) | 900 ms | "o número apareceu" | estático |
| 8 | Final | A noite passa: as 3 fotos acendem da esquerda para a direita (23:40 → 03:10 → 07:55) | um véu `ink.950` em cada foto, de 55% → 0% por IO | cascata de 160 ms, 400 ms cada | "a noite passou e amanheceu" | sem véu |
| 9 | Toda seção | Título → texto → imagem, uma vez | 24 px + opacidade | cascata de 60–90 ms | — | sem entrada |
| 10 | Controles | Pressão, hover e foco em todo controle | `transform: scale(.98)` na pressão; o foco é o anel do v3 | 80–120 ms | — | só o foco |

**Orçamento (delta sobre o v3 §7.3):** a capa agora aparece maior (1040×900): AVIF ≤ 300 KB a 2080 de largura, `fetchpriority="high"`; o retrato 390 ≤ 150 KB; a foto da YOU ≤ 140 KB (lazy); a capa noturna só carrega se a intro for rodar. **1ª dobra a 390 ≤ 380 KB.** JS ≤ 35 KB gz, sem GSAP (FLIP à mão, IO, CSS scroll-timeline).
**Fallbacks:** o mesmo do v3; mais: sem `animation-timeline` (Safari estável), o #3 via IO + rAF ou nada (o hero está completo sem ele); a máscara de 7 pontos falhando no iOS 16 deixa a intro só com o crossfade.

### 7.4 Ao figma-architect (ordem de trabalho)
1. Tokens: `text.2` → `#C2BCCB`; `size.giant` compartilhado.
2. Hero 1440 e 390 com as medidas do §5.2 e a capa v3 **escalada e recortada como placeholder** até o render v2 chegar (escale a capa atual para a caixa e corte; não redesenhe). A variante "plinto no roxo" num frame à parte, "em avaliação".
3. Intro: o quadro 4 é **instância** do hero; os quadros 1–3 trocam só a caixa da imagem.
4. Formulário P2 (12 colunas), tour P3 (plaquetas de 120 px com a leitura do dia, palco sangrando, faixa roxa 928×128), YOU P4 (foto 708×885 na borda), About P5, final P7. O depoimento **sai** da página principal.
5. 390 de cada seção como peça própria (§5.x). A fileira de plaquetas com largura fixa de 165 e scroll-snap.
6. States com os acréscimos do §5.12. O 768 (o júri não recebeu): hero com o H1 em x 40, caixa da imagem de x 260 até 768, sangrando; o tour com o índice em fileira (como a 390) e o palco em largura total; a YOU com a foto em x 0–384 e as ordens em 400–728.
7. **Antes do júri**, anexe: (a) a auditoria de camadas do §9.1; (b) o teste de sobreposição de cada seção contra `jimo/d-07`, `jimo/d-12`, `prolibu-sales/d-10`, `madeinevolve/d-00`, `madeinevolve/d-04`, `pensatori-irrazionali/d-10` e o v3; (c) as medidas do §9 em tabela (massa do hero, áreas roxas, maior vazio interno por seção).

---

## 8. Riscos
- **O render v2 não cumprir as metas de posição** (a sala YOU no lugar da placa, o plinto até c3–c4): é o maior risco do delta, porque a composição do hero depende da câmera. Mitigação: o frontend-studio entrega primeiro um teste de câmera em baixa (cartão branco, ~1 h) recortado na caixa, eu aprovo a posição, e só então o render final.
- **Peso**: a capa maior pesa mais. Se o AVIF de 2080 passar de 300 KB, ele sai a 1760 com a nitidez conferida a 100%.
- **Safari/WebKit**: a máscara radial da intro em iOS 16; `animation-timeline` ausente; o FLIP da linha viva só em `transform`/`opacity`. Verificar em webkit e chromium.
- **Celular / Instagram**: a caixa de 560 px do retrato usa a altura congelada no toque (memória `instagram-svh-muda-na-rolagem`) se alguma altura for em svh; a fileira sticky de plaquetas some quando um input recebe foco.
- **Acessibilidade**: o número do About é texto real (não imagem), com a ressalva no mesmo bloco e lida logo depois; tablist com setas; `aria-live` na linha viva; a ordem do DOM a 390 é a ordem de leitura; o novo `text.2` medido.
- **Conteúdo / ACCC**: o A$10M sobe de 16 px para a maior escala da página. **Não entra sem comprovação do dono**; o estado sem número já está desenhado (§5.7).
- **A placa sobre a borda da maquete** pode ser lida pelo júri como "texto sobre imagem". A defesa está no §5.2 e na regra reescrita (§9.6); se o júri reprovar mesmo assim, a placa recua 24 px e encosta sem sobrepor (a rima com o tapete continua).

---

## 9. O critério do §10, revisado (todas precisam passar; uma falha reprova)
1. **Auditoria de camadas anexada** (sem ela, o item reprova): mono = 0; caixa alta < 20 px = 0; pílula/chip fora do `data-ui` = 0; traço de 1 px fora de campo de formulário e do `data-ui` = 0; raios {0; 4 só no `data-ui`}; sombra e blur = 0 (exceto a sombra de contato **dentro** do render); gradiente = 0 (exceto a luz do render); ícones só os sociais.
2. **Cor**: menta só no CTA (1 por viewport) e no Approve, com **≤ 3,5% da viewport**; roxo só em áreas **≥ 240×120 medidas** (placa 296×136 e 260×128; faixa "You approve" 928×128 e 390×136; o formulário; a faixa do FAQ), nunca atrás de palavra.
3. **Escala**: H1 ≥ 112 px a 1440 (7,8vw); razão display/corpo ≥ 5,5 a 1440; ≤ 5 tamanhos + `size.giant` (um só, compartilhado pelo número e pelo wordmark); ≤ 2 famílias.
4. **Títulos**: o H1 e todo H2 com ≤ 2 linhas a 1440, 768 e 390 (768 **capturado** desta vez).
5. **Composição**: ≥ 4 plantas distintas na página (a meta é as 7 do §4); nenhum par vizinho com a mesma planta; nenhum split "texto | formulário" repetido; **nenhum vazio interno > 320×320 px** dentro de uma seção (o maior retângulo só de fundo entre conteúdos, sem contar as margens de 72 e os 160 entre seções; a lateral simétrica do final, de 220 px, passa); margens 72/72 em todo texto; sangrados só nos lugares declarados (capa à direita, palco do tour à direita, sala YOU à esquerda, fotos e faixas a 390).
6. **Imagem**: ≥ 4 renders (meta 12); **a maquete do hero com retângulo envolvente ≥ 45% de 0–900 a 1440 e ≥ 50% de 0–844 a 390, sangrando pela direita e passando da dobra em ≥ 200 px**; a sala YOU ≥ 400×500 (o pedido é 708×885); **nenhum texto sobre pixel de render**, e um único campo cheio (a placa do hero) pode sobrepor ≤ 24 px da borda da maquete, nunca figura, mesa, monitor ou tapete; nenhum isométrico (capa a ≤ 28° de elevação, mesas a 18–22°).
7. **Teste de sobreposição** contra jimo d-07/d-12, Prolibu d-10, ME d-00, ME d-04, PI d-10 e o v3, anexado.
8. **Teste do estranho em 5 s** com a 1ª tela de 390 (a pessoa diz "escritório de agentes de IA para empresa B2B, e quem aprova sou eu", aponta o botão e **diz de quem são as ações da placa**).
9. **Defeitos objetivos do v3 fechados**: o último quadro da intro idêntico ao hero (instância); o input em foco sem quebra; a fileira de plaquetas a 390 sem palavra cortada em repouso; `text.2` com Lc ≥ 60 a 15 px; 0 placeholder visível (só camadas `modelo:`); o depoimento fora do fluxo principal.
10. **No código**: `inspect.mjs` com 0 FAIL em 1440/768/390 no build de produção (`--allow violet`), WARN defendido; `lint.mjs` limpo.
11. **Notas-alvo**: taste ≥ 8,0 sem teto; Awwwards ≥ 7,2 no mock com o render v2; FWA ≥ 70 depois da motion. Abaixo disso, volta para mim.

---

## 10. Previsão honesta

| Banca | v3 | v3.1 mock com o render v2 adulto | v3.1 no ar com a motion do §7.3 |
|---|---|---|---|
| Awwwards (júri) | 6,75 | **7,1 a 7,3** (Design 7,2–7,4 · Usability 7,2 · Creativity 6,9–7,1 · Content 7,0) | 7,3 a 7,5 |
| FWA | 60 | **62 a 63** (mock parado tem teto de ~62 pelo próprio júri) | **66 a 69**; 70 só se o render ler como foto de maquete física **e** a linha viva e a intro forem muito bem executadas |
| taste | 6,5 | **7,2 a 7,6** (os dois tetos saem: sem placeholder, sem bloco vazio), mas a "página parada" tem teto de design 7 | 7,8 a 8,2 |

Onde está o risco da previsão:
- **Metade do ganho depende do render.** A composição nova leva o hero a ~45% de massa, mas, se a maquete continuar lendo como clay render de manequins, o júri dá Design 7,0 e não 7,4, e a página fica em ~7,05.
- **O §9.11 (taste ≥ 8,0) muito provavelmente não fecha no mock**, por causa do teto de página parada. Ele é alcançável no ar. Não vou baixar a meta. Registro que, no mock, o portão real é o Awwwards ≥ 7,2.
- **Acima de ~7,5 no Awwwards**, esta peça não chega com stills: seria preciso a maquete reagindo à aprovação (a sala YOU acendendo quando se aprova), em tempo real ou em sequência. Isso é um $$$ a mais, com custo em Usability e em peso. Fica fora deste delta e é decisão do dono depois de ver o v3.1 no ar.
