# BrandUp: brief v4.5, "O logo é feito de luz, e a seta é o crescimento"

Autor: ui-ux-director · 09/11/2026 (noite) · **emenda o `brief-v4.4.md`** (que emenda v4.3, v4.2, v4.1 e v4). Continua valendo tudo o que não for citado aqui: a lei 1 (toda luz tem portador), o motor OGL, a costura de 4 tempos (v4.4 §3), a regra de entrada `data-in` (v4.4 §8), o "sim" dirigido pela rolagem, o botão `field`, o wordmark do rodapé, e as métricas eliminatórias do v4.3 §1 e do v4.4 §1 (≥ 4% de pixel aceso, `greenPct` ≤ 1,5% por quadro, 0 fundo e 0 texto que pisca, motor dormindo parado).

Para: `frontend-studio` (§4 a §11, na ordem do §14), `frontend-craft` (§3, §12.3 e §15), `type-director` (§12.1), `copy-director` (§12.2) e `design-jury` (§1, §13 e §15).

**Não mexer (o dono aprovou como "perfeitos" em 09/11):** a **noite** (placas, mesas, cama, pacotes) e o **escritório** (a maquete, a câmera, as etiquetas). Nenhum item deste brief toca nessas duas cenas, salvo a entrada delas no recarregar com a rolagem restaurada (§4.6), que só usa a regra que já existe.

**Decisões do dono que este brief não reabre:** o verde `#58F6B1` é o acento de choque em pouca dose (≤ 1,5% por quadro a 390); **a seta e o logo são roxo e BRANCO, nunca verde**; o roxo é luz com grão; o "sim" é dirigido pela rolagem; o botão é o `field`.

---

## 0. O que abri nesta sessão

- **A página viva** (`127.0.0.1:5180/proto.html`) no Playwright, chromium e webkit, 1440×900 e 390×844: o recarregar (10 fotos em sequência logo depois do `reload`, 2ª visita da sessão) e a rolagem inteira (meia tela por foto; 22 quadros a 1440 e 24 a 390). Folhas em `scratchpad/v45/look/`. Medidas de hoje: `scrollHeight` 10.314 (1440) e 10.229 (390); seções a 1440: hero 0, form 900, night 1.681, office 2.761, you 5.101, faq 7.936, final 8.586 e foot 9.433. H1 a 1440: 104 px, caixa 845×195; a 390: 40 px, 336×75.
- **O vídeo do dono** (`feedback-0911/teste-reload.mov`, 47 s, 2940×1912 a 60 fps): folha de 0–8 s a 4 fps e de 8–47 s a 1 fps.
- **O código:** `proto.html` (a intro de hoje: `#intro`, `.i-body`, `.i-arrow`, `.intro-logo` que voa para o header, só na 1ª visita), `main.tsx` (`afterLcp` → `afterIntro` → `posters` → `import('./engine/engine')`), `engine/engine.ts` (o `uRise` do hero no 1º gesto, linhas ~293 e ~471–482; o `uFall` da rede que cai), `Proto.tsx` (`Hero`, `PosterCanvas`, os botões `.agent` nos nós da base, o `.net-tag`, o `.lock-fill`), `proto.css` (`.poster`, `.gl-on .poster { opacity: 0 }` com `transition .3s`, `.bar`, `.brand`, `.screen`, `.lock`, `.lock-fill`), `domScenes.ts` (o cursor do FAQ, linhas 249–254), `content.ts` (`hero`, `agents`), `type.css` (os tokens `--type-hook-*`, `--type-h2-*`, `--type-body-*`, `--type-label-*`), `src/Testimonials.tsx` e `public/favicon.svg`.
- **A biblioteca:** `README.md` e `repertorio.md` inteiros. Capturas abertas: `jimo/intro-d-400` (o H1 pintado em tom cinza→branco aos 400 ms), `madeinevolve/d-00` (a grotesca de ~187 px atravessando a foto) e `d-02` (o manifesto apagando linha a linha), `dribbble-qclay/08` (o leão cromado atravessando "DIGITAL ASSETS") e `dribbble-qclay/28` (o halo de pixels em volta da caixa).

## 0.1 O diagnóstico (o que eu vi)

1. **O sumiço no recarregar é de arquitetura, não de tempo.** A ordem hoje é: o H1 pinta → `afterLcp` → o `PosterCanvas` desenha o pôster 2D → o motor é **importado só depois** → quando o motor liga, `.gl-on .poster` vai a 0 em 300 ms **enquanto o motor ainda está construindo a rede do zero**. No vídeo do dono, a rede pronta aparece no quadro 0, some por ~1,5 s e se refaz. No webkit 390, os quadros 2–3 mostram **as duas redes desalinhadas ao mesmo tempo** (o pôster e o motor não têm a mesma geometria). A intro de hoje só roda na 1ª visita da sessão, e por isso no recarregar não existe entrada nenhuma: o texto já está lá e o resto "aparece de repente".
2. **No chromium (dev), o 1º quadro do recarregar mostrou um triângulo roxo gigante com a seta branca ocupando a tela.** É o SVG da marca sem `width`/`height` antes de o CSS entrar (no dev, o Vite injeta o CSS pelo JS). Não aparece no vídeo do dono (Safari) e não verifiquei em build de produção, mas é barato de matar (§4.5).
3. **O hero** é uma rede (vértice, 3 cérebros, 6 agentes) que não lembra o logo. Ao primeiro gesto, uma coluna verde sobe do vértice: é "a seta verde que sobe hoje".
4. **O 1º formulário** está sobre o tapete de pontos da rede que caiu (o `uFall`) e uma nuvem roxa à esquerda dos campos: o componente se perde no fundo.
5. **"You have the final word"** (1440): o H2 está no meio da altura, o telefone vai de 162 a 737 px, e a 2ª rede (os agentes) fica espremida em ~60 px entre 780 e 840. O `.net-tag` ("Your follow-up") é um Label de 15 px no canto esquerdo, longe do nó. **A seda roxa (`.lock-fill`) cobre só uma faixa de ~70 px no pé da tela**: ela é filha do `.lock`, que não ocupa a altura da `.screen`. É bug de caixa, e não de animação.
6. **O FAQ:** o cursor (domScenes 249–254) chama `getBoundingClientRect()` em cada item a cada quadro e escreve atributos no mesmo laço. Isso é leitura e escrita de layout intercaladas. É a minha principal suspeita da queda de desempenho, mas **não fiz perfil**: o studio mede antes de mexer (§10).

---

## 1. Peça e objetivo

- **A pessoa:** agora é o **dono de negócio em geral** (não só indústria e B2B), vindo do Meta, **no celular**, com pressa e cético. Ela decide em 3 segundos se lê o resto.
- **A tarefa dela no 1º segundo:** ler a promessa inteira ("quanto, em quanto tempo e com o quê"), e o número dela é **$250K por mês**. **No 2º segundo:** reconhecer a marca, que é o logo feito de luz. **Ao rolar:** ver a seta subir (o crescimento sai do logo) e encontrar o formulário como **um objeto destacado**, e não um campo perdido no fundo.
- **A frase que ela tem que conseguir dizer:** "eles prometem $250K por mês em 90 dias com automação e IA, e a marca é aquele triângulo com a seta que subiu".

| Métrica nova | Meta | Como medir |
|---|---|---|
| **Sumiço do hero** | entre a primeira pintura do triângulo e 3 s depois do `load`, o nº de pixels acesos na caixa do triângulo **nunca cai abaixo de 80%** do valor estável (fora o instante em que a seta sai pela rolagem) | screenshot a cada 50 ms durante o recarregar (2ª visita) e a 1ª visita, nos 2 motores, a 1440 e a 390; contar os pixels com L > 18 na caixa |
| Imagem dupla | 0 quadros com o pôster SVG e o canvas do motor visíveis ao mesmo tempo | `getComputedStyle` + a classe `gl-on` amostrada por quadro |
| Entrada completa | todo o conteúdo do hero no estado final em ≤ 1.200 ms (1ª visita) e ≤ 760 ms (recarregar) | marca de performance `hero-in` |
| Pular | qualquer toque, tecla, roda ou clique leva ao estado final em ≤ 160 ms | sonda que dispara `pointerdown` aos 300 ms |
| LCP | o **H1** é o LCP; ≤ 1,8 s a 390 (4G lento + CPU 4×), como no v4.3 | `PerformanceObserver` |
| CLS | ≤ 0,02 na troca da fonte de display | `layout-shift` |
| `greenPct` | ≤ 1,5% em **todo** quadro, inclusive os da intro e o do anel do formulário | `capture.mjs` |
| A seda do "sim" | o retângulo do `.lock-fill` = o retângulo da `.screen`, ±1 px, depois do enchimento | `getBoundingClientRect` nos 2 motores, a 1440 e a 390 |
| FAQ | 0 long task > 50 ms durante a rolagem pelo FAQ; p95 do quadro ≤ 16,7 ms (chromium 1440) | trace do Chrome + intervalos de rAF no webkit |

---

## 2. Conceito (uma frase)

**"O logo da BrandUp é feito da mesma luz da página: ele se monta quando você chega, e a seta branca sai dele e sobe quando você rola. O crescimento sai da marca."**

O que isso decide:
- **O triângulo do hero é o logo**, e não um diagrama. A rede (vértice e 6 agentes) continua dentro dele como pontos nas arestas, mas a silhueta que se lê de longe é a do `favicon.svg`: o triângulo roxo cheio e a seta branca no meio.
- **A seta é o único objeto branco sólido da página.** Ela é o "up" do BrandUp e o $250K que sobe. Sai em arco, para cima e para a direita (a direção de um gráfico que cresce), e volta para casa se a pessoa rolar de volta.
- **A entrada acontece em toda carga**, porque o dono pediu. A 1ª visita tem a versão inteira e o recarregar tem uma versão curta, com a mesma coreografia. Nenhuma delas atrasa o LCP: o H1 pinta no 1º quadro e se **acende por cor**, nunca por opacidade.
- **Rima com o fim (F5, de graça):** a montanha do rodapé (`footPeak.ts`) já é um triângulo de dither com a seta. O hero passa a abrir com a mesma forma com que a página fecha.

---

## 3. Movimentos escolhidos (4) e descartados

| # | Código | Captura (aberta) | Porquê aqui | O que muda em relação à fonte | Custo |
|---|---|---|---|---|---|
| 1 | **E8: abertura que entrega a marca** (com a técnica do **B10** no H1) | `jimo/intro-d-400` (o contraexemplo do repertório: sem abertura, o H1 já está pintado aos 400 ms em tom cinza→branco) | É o pedido 1 do dono: uma entrada de verdade. O jimo prova a parte técnica que nos salva o LCP, que é **pintar o H1 já no 1º quadro e acendê-lo por tom** | No E8 do repertório, a marca **voa para o header** e a abertura roda **só na 1ª visita**. Aqui a marca **fica no hero** (o logo de luz se monta no lugar onde vai morar, e o motor assume esse quadro sem trocar a imagem) e a abertura **roda em toda carga** (a versão curta no recarregar), por ordem do dono. No jimo, o tom é um gradiente parado na frase inteira. Aqui a ignição é **palavra por palavra, só no número**, e assenta em **dois tons** (o enquadramento a 72% e o número a 100%) | $ (CSS/SVG inline) + $$ na continuidade do motor (§4.4) |
| 2 | **B1: escala extrema** (só numa linha) | `madeinevolve/d-00` (a grotesca de ~187 px, em caixa alta, em 3 linhas iguais, cobrindo a foto) | O dono quer "**$250K per month**" como o maior destaque de todos. Com o gancho longo (~100 caracteres), a única forma de manter a força é **uma linha gigante e o resto como moldura** | No ME, a frase **inteira** é gigante, em caixa alta, do mesmo tamanho e sobre foto. Aqui **só 15 caracteres** são gigantes ("$250K per month"), em caixa mista e sem foto. O enquadramento ("How businesses are generating over" / "within 90 days by investing in automation and AI.") fica a ~¼ do tamanho e a 72% do tom. A razão display ÷ corpo é ~10:1 a 1440 | $ |
| 3 | **D4: o objeto-símbolo apoiado no título** | `dribbble-qclay/08` (o leão cromado 3D na frente de "DIGITAL ASSETS", centralizado, cortando as letras) | O logo é o nosso objeto-símbolo (o repertório pede objeto com significado, e não cubo genérico). O triângulo **pousado sobre o número** liga a marca ao resultado | No shot 08, o objeto é **3D cromado, fica NA FRENTE das letras, no centro**, e as corta. Aqui o objeto é **luz em dither, fica ATRÁS do texto, à direita**, e **pousa** sobre a altura de maiúscula de "month" (16 px de ar, sem cortar letra nenhuma). Além disso, ele **se desmonta** (a seta sai em arco ao rolar), e o leão não faz isso | $$ (o shader que já existe: SDF do triângulo + `uArrow`) |
| 4 | **E3: opacidade como cursor de leitura** (os depoimentos) | `madeinevolve/d-02` (o manifesto em caixa alta apagando linha a linha, num gradiente contínuo) | Os 4 depoimentos são longos (~330 caracteres). Num carrossel, 3 dos 4 ficam escondidos. Numa pilha com cursor, os 4 ficam legíveis e um está "na vez" | No ME, a unidade é **a linha** de um texto só, com um **gradiente** contínuo de opacidade. Aqui a unidade é **a pessoa** (o depoimento inteiro), com 2 tons apenas (100% e 48%, que sempre dá para ler), e com **um portador de luz** (o mesmo cursor de dither do FAQ) que anda até quem está com a vez. A 390 vira um trilho com snap nativo (§11.3) | $$ (IO + CSS) |

**Continuidade de sistema (não é movimento novo):** o anel de pontos verdes do 1º formulário é a **orla do v4.4 §9** (o C6, `dribbble-qclay/28`) numa variante "mint, em volta". O que muda em relação ao shot 28: no Dribbble, o halo é **ciano, simétrico, com feixes, e envolve um objeto 3D**. Aqui são **pontos verdes de 1,5 px, mais densos na base, sem feixe e sem glow**, em volta de um **formulário**. Também muda em relação à orla do v4.4: lá a borda nasce do chão e não sobe para cima; aqui ela fecha o anel, porque o dono pediu "ao redor".

**Soma:** $ + $ + $$ + $$ (+ $ da orla). **Nenhum $$$** e nenhum asset novo pesado. O SVG da intro passa a ser também o pôster do hero, e o `poster-hero-*.webp` sai.

**O teste de sobreposição:**
- O hero, ao lado do ME `d-00`: lá são 3 linhas iguais sobre foto; aqui é 1 linha gigante entre 2 linhas pequenas, sem foto e com um objeto à direita. Não sobrepõe.
- O hero, ao lado do shot 08: lá o objeto está no centro, na frente das letras e cortando o título; aqui ele está à direita, atrás, pousado sem cortar. Não sobrepõe.
- Os depoimentos, ao lado do ME `d-02`: lá é um bloco de texto contínuo em caixa alta; aqui são 4 blocos de pessoas com assinatura e um cursor. Não sobrepõe.

### Descartados

| Ideia | Porquê não |
|---|---|
| **A1 (cena por roda) no hero** | O gancho longo precisa ser lido de uma vez, e um gesto por ideia esconderia o número atrás de um passo |
| **D1 (vídeo pré-renderizado da intro)** | Pesa, compete com o LCP, não toca igual no WebKit (memória `mp4-444-webkit-nao-toca`) e não responde à rolagem. O SVG inline faz a mesma montagem com ~3 KB |
| **B3 (choque de famílias) em "$250K"** (uma serifa itálica no número) | A família de display (Mona Sans) é a voz da marca. Uma 2ª família só no número vira o tique "palavra em itálico serifado" e briga com o tom-sobre-tom que o dono prefere. O destaque vem da escala (B1), e não da troca de voz |
| **B6 (a seta inline dentro do H1, entre "$250K" e "per month")** | Ela quebra a leitura do H1 pelo leitor de tela, mexe no nó do LCP e prende a seta no texto, quando ela tem que sair em arco. A seta mora no logo |
| **B7 (o número que gira: $100K → $250K)** | O número é uma promessa: tem que ser lido de primeira, e o repertório veta o B7 "em texto que a pessoa precisa ler de primeira" |
| **A6 (bento de métricas para o $250K e o A$10M+)** | Não há prova numérica suficiente para um bento (o "A$10M+" ainda é "só se provado", copy §5). Um bento com 2 números vira slop |
| **E4 (marquee de depoimentos)** | Movimento perpétuo sem significado, e não dá para ler um depoimento de 330 caracteres andando |
| **O carrossel de setas e pontos do site atual a 1440** | Esconde 3 dos 4 depoimentos atrás de um clique que quase ninguém dá. A pilha com cursor mostra os 4 |
| **A rede caindo como tapete sob o formulário (o T1 de hoje)** | É exatamente o "cheio de pontinho" que o dono reprovou. O triângulo agora se apaga no lugar, e o formulário ganha o seu anel |
| **A seta voando para o header** (como o E8 do repertório) | O header já tem o logo inteiro. Uma seta que pousa num logo que já tem seta é redundante. A seta sobe e **sai** (o crescimento sai do gráfico) |
| **Verde na seta ou no rastro principal** | É regra do dono. O verde só aparece como **exaustão de energia** de 2 grãos sob a haste, e só durante o voo |

**Brigas conferidas:** A1 × A5 não se aplica (a rolagem é nativa); B3 × C2 não se aplica (não há B3); D7 × A4 não se aplica (não há foto). **Dentro do sistema:** o F7 do v4.4 diz "um sinal só". Na costura C1, o sinal é a seta (branca) e não um pacote verde. Os dois nunca estão na tela ao mesmo tempo: o 1º pacote verde da página nasce na noite.

---

## 4. Item 1: a entrada (1ª visita e recarregar) e o fim do sumiço

### 4.1 A regra
- **Uma coreografia, duas durações:** a **inteira** (1ª visita da sessão) em ~1.200 ms e a **curta** (recarregar, ou qualquer visita seguinte) em ~720 ms, que é a mesma coreografia com os tempos × 0,6.
- **Ela pinta por cima do que já existe, e nunca esconde o H1.** O H1 está no DOM, pintado no 1º quadro, em tom de 32%. É o LCP. A entrada só **sobe o tom** dele.
- **O logo se monta onde vai morar.** O quadro final da intro é **pixel a pixel** o 1º quadro que o motor desenha. O motor nasce **com a rede pronta** (`startEngine(canvas, { initial: 'built' })`) e nunca refaz a construção. **O pôster 2D do hero (`PosterCanvas` + `poster-hero-*.webp`) sai: o SVG da intro É o pôster.**
- **Pular:** `pointerdown`, `keydown`, `wheel` e `touchstart` (com captura, passivos) levam tudo ao estado final em 160 ms (`steps(2)`). O botão "Skip intro" para o teclado fica como está.
- **Quem fica sem intro:** `prefers-reduced-motion`, `Save-Data`, sem JS e o recarregar com a rolagem restaurada fora do hero (§4.6). `?intro` força a versão inteira e `?intro=short` força a curta (para as sondas).

### 4.2 A sequência quadro a quadro (1ª visita, a inteira)
t = 0 é a 1ª pintura do HTML. Os tempos da curta estão entre parênteses.

| t (ms) | O que se move | Como | Por quê (a frase "o que aconteceu") |
|---|---|---|---|
| **0** | O chão `#08070B` + grão. O H1 inteiro em **tom 32%** (`color: rgb(244 241 248 / .32)`). O header, o lede, o botão e a prova estão no estado `pre` (opacidade 0; o lede e a prova também com `translateY(12px)`). A caixa do triângulo está vazia | O HTML inline (o `<style>` do `proto.html`) | "A página já está ali, apagada" |
| **0–160** (0–96) | **Os 6 nós da base** do triângulo acendem da esquerda para a direita, 24 ms entre eles, em 2 níveis de Bayer (branco `#FBF7FF` no centro e lilás `#C9A2FF` em volta) | SVG `.i-node` com `animation: i-on steps(2)` | "O time chegou" (os 6 agentes) |
| **120–520** (72–312) | **O corpo do triângulo sobe da base até o vértice** em limiar de Bayer 4×4 (a frente é uma linha; abaixo dela, o padrão de 2 roxos do logo `#7A22CF`/`#9232EA`; as arestas a `#C9A2FF`). Quando a frente passa pelo vértice (520), **o vértice acende branco** | A `.i-body` de hoje (o `clip-path` de baixo para cima) com a curva `cubic-bezier(.45,0,.2,1)`. A frente é a `.i-front` de hoje, **sem o verde** | "O logo se constrói de baixo para cima" |
| **200–520** (120–312) | **O enquadramento de cima** ("How businesses are generating over") sobe de 32% para **72%** | `transition: color 320ms cubic-bezier(.2,.75,.2,1)` | — |
| **440–760** (264–456) | **A seta branca se monta no meio:** a haste sobe da base (de `translateY(+38%` da altura do triângulo`)` até 0, em 260 ms `cubic-bezier(.2,.75,.2,1)`) e, ao chegar, **a cabeça abre** (`clip-path` da ponta da haste para cima, 120 ms, `steps(3)`) | `.i-arrow` (a de hoje, reposicionada nas proporções do `favicon.svg`: cabeça 12×9, haste 5×9 com raio 2,5, numa caixa de 30×28) | "A seta subiu e apontou para cima" |
| **640–1.140** (384–684) | **"$250K per month" acende palavra a palavra**, de 32% para **100%**: "$250K" aos 640 ms, "per" aos 730 e "month" aos 820, com 320 ms cada | Três `<span>` dentro do H1, com `transition: color` e `transition-delay` | "A seta aponta e o número acende": a seta e o número são o mesmo gesto |
| **760–1.080** (456–648) | **O enquadramento de baixo** ("within 90 days by investing in automation and AI.") vai de 32% a 72% | `color`, 320 ms | — |
| **800–1.040** (480–624) | **O header:** o logo (maior, §6) entra com `opacity` em `steps(3)` em 240 ms; aos 860 (516), "Diagnosis" entra em verde, com a mesma regra | CSS | "A marca agora assina a página" |
| **880–1.360** (528–816) | **O lede** entra como `voice-body` (opacidade + `translateY` 12→0 a 1440, 8→0 a 390), em 480 ms `cubic-bezier(.2,.7,.2,1)` | v4.4 §8.2 | — |
| **940–1.180** (564–708) | **O botão `field`** entra como `voice-control` (só opacidade, 240 ms, sem `translate`: a mão o encontra onde espera) | v4.4 §8.2 | — |
| **1.000–1.240** (600–744) | **A prova** ("A$10M+…") entra como `voice-data`, em 240 ms | CSS | — |
| **1.000–1.200** (600–720) | **A troca para o motor** (só se ele já desenhou 2 quadros escondido): no mesmo `requestAnimationFrame`, o canvas ganha `visibility: visible` e o SVG ganha `visibility: hidden`. **Sem fade**, porque os dois quadros são iguais. Logo depois, **os 7 nós sobem 1 nível de Bayer por 2 quadros** (o sinal de que o logo está vivo) e o vértice volta à respiração de hoje | `main.tsx` + o motor | "O logo ganhou vida", e não "o logo foi trocado" |
| **1.200** (720) | A intro sai do DOM. Se o motor não estiver pronto, o SVG fica (ele é o pôster) e a troca acontece depois, igual, a qualquer momento | — | — |

### 4.3 O recarregar (a curta)
É a mesma tabela com os tempos entre parênteses. **O que o dono vê agora:** o triângulo nunca some. Ele se monta uma vez (em ~300 ms), a seta sobe para o lugar, o número acende, e o resto entra em escada até ~740 ms. **O que sai:** o quadro "rede pronta → nada → reconstrução" (porque não existe mais pôster trocado por um motor que começa do zero) e o "tudo aparece de repente".

### 4.4 A continuidade do motor (a parte de engenharia que resolve o sumiço)
1. **O import do motor começa durante a intro**, e não depois dela: `afterLcp(() => import('./engine/engine'))`. O `afterIntro` passa a controlar **só a revelação** do canvas, e não o download.
2. **`startEngine(canvas, { initial: 'built' })`:** a rede do hero nasce montada, com o vértice no estado de respiração e a seta em casa. O código de "construção do zero" do hero sai. A noite, o escritório e o "sim" não mudam.
3. **Uma fonte de geometria só:** o SVG da intro e o motor leem a mesma caixa do triângulo a partir das variáveis CSS `--logo-x`, `--logo-y`, `--logo-w` e `--logo-h`, que o `layout.ts` (`netFrame`) também usa. **Nada de frações duplicadas no HTML** (`--ix`, `--iy`, `--iw` e `--ih` hoje são números à parte, e é por isso que o pôster e o motor saem desalinhados no webkit).
4. **O canvas desenha escondido** (`visibility: hidden`, e não `opacity: 0`, para não pagar composição) até ter 2 quadros prontos **e** a intro ter passado de 1.000 ms (600 na curta). Aí a troca acontece num quadro só.
5. **A sonda que reprova:** o "sumiço" do §1 (pixels acesos na caixa do triângulo ≥ 80% do estável em toda amostra) e a "imagem dupla" (0 quadros).

### 4.5 O flash do 1º quadro (chromium dev)
Todo `<svg>` inline da marca (o do header, o do rodapé e o da intro) recebe os atributos `width` e `height` no próprio HTML, e o `<style>` inline do `proto.html` define o tamanho do `.brand svg`. Assim, o SVG não pinta na largura da tela antes do CSS. **Verificar:** o 1º screenshot depois do `reload` (`waitUntil: 'commit'`) não tem nenhuma região roxa com mais de 64 px de lado, nos 2 motores e em dev e build.

### 4.6 O recarregar com a rolagem restaurada (o navegador volta ao meio da página)
- Se `scrollY > 0,3 × altura da tela` no boot: **não há intro do hero**. O header entra em 240 ms. **A seção que está na tela faz a sua entrada local:** o fundo acende pela regra de ignição dela (v4.4 §8.1, com o avanço de 0 até o valor da posição, em 640 ms) e a voz entra (o K1 do H2 e depois o corpo, v4.4 §8.2). As seções acima ficam no estado final, sem animação, e as de baixo entram pela regra de sempre quando chegarem.
- O motor nasce **no estado daquela posição**, sem construir nada do zero.
- Isso vale também para a noite e para o escritório, e só com a regra que eles já têm (nada muda neles).

### 4.7 Reduced motion, sem WebGL e sem JS
- **Reduced:** o HTML pinta direto o estado final, com o SVG do logo inteiro (a seta em casa), o H1 nos tons finais (72/100/72) e tudo visível. Nenhuma intro e nenhuma subida da seta.
- **Sem WebGL (`gl-off`, `?gl=0` ou ≤ 2 GB):** a intro roda igual (é SVG e CSS) e o SVG fica como logo. A subida da seta (§5) é um `transform` no grupo `<g>` da seta, movido por um ouvinte de rolagem passivo com rAF. Os fantasmas são 2 cópias do `<g>` a 50% e 25%. O apagamento do triângulo é por opacidade em `steps(4)`.
- **Sem JS (`no-js`):** o estado final, como no reduced.

---

## 5. Item 2: o triângulo vira o logo, e a seta sobe em arco

### 5.1 A forma (o logo de luz)
- **A silhueta** é a do `favicon.svg`: o triângulo (20,5)–(35,33)–(5,33) numa caixa de 40, ou seja, 30 de largura por 28 de altura, com os cantos arredondados pelo `stroke-linejoin: round`.
- **O corpo** é o padrão de 2 roxos em Bayer 4×4 (`#9232EA` e `#6A1DB8`), que se lê sólido de longe e mostra o grão de perto. É o mesmo material da montanha do rodapé (a rampa do `footPeak.ts`) e da `.i-body` da intro.
- **As 3 arestas** ficam 1 nível mais claras (`#C9A2FF`), com 2 px de espessura (1440) ou 1,5 px (390).
- **Os 7 nós da rede continuam:** o vértice (branco, respirando como hoje) e os **6 agentes distribuídos igualmente na aresta da base**. Os botões `.agent` (hover/foco/toque acende o agente) continuam neles, com o alvo de 44×44. O rótulo do hover passa a abrir **acima** do nó (dentro do triângulo), para não cobrir "month". **Os 3 cérebros saem do hero**: no meio do triângulo agora mora a seta. Eles continuam na 2ª rede, a do "sim".
- **A seta:** branco `#FBF7FF`, em dither de 2 níveis (`#FBF7FF` e `#E9DDFB`) para casar com o grão. Proporções do favicon: a cabeça (14..26, 13..22) e a haste (17,5..22,5, 21..30, raio 2,5). **Nada de verde dentro da silhueta.**
- **Tamanho e lugar:** a 1440, o triângulo tem ~382×356, com o vértice em y ≈ 96 e a base em y ≈ 452, na faixa x 990–1372 (colunas 9–12). A base pousa **16 px acima da altura de maiúscula** de "month" (§7). A 390, tem ~218×204, centralizado, com a base em y ≈ 828 (§7.3).
- **Técnica:** no `FIELD_FS`, um SDF de triângulo arredondado (`uLogo`: centro, escala e avanço da ignição para a intro e para o apagamento) e um SDF da seta (`uArrow`: x, y, escala e ângulo), ambos no limiar de Bayer de sempre. **O braço de hero do `uRise` sai** (o do telefone fica). O SVG da intro desenha a mesma coisa com `<pattern>` em unidades de pixel (e não em `0.24` da viewBox, porque isso dá moiré a DPR 3).

### 5.2 A subida em arco (scrub; `p` vai de 0 a 1)
- **`p = clamp(scrollY / (0,6 × --tela), 0, 1)`**, com o `approach` de 0,12 que já existe. É scrub: **a volta desfaz**, e a seta volta para casa pelo mesmo arco quando a pessoa sobe. O "logo inteiro" sempre se reconstrói no topo.
- **A curva** (em coordenadas da tela, para a seta subir **mais rápido** que a página):
  - P0 = a casa da seta (o centro dela no triângulo);
  - P1 = (P0.x + 0,04·W, P0.y − 0,55·vh);
  - P2 = (min(P0.x + 0,18·W, W − 48), −0,25·vh) a 1440; (W − 30, −0,25·vh) a 390.
  - A posição usa `e = t²(3 − 2t)` (a curva do pacote, v4.4 §3.1).
- **A antecipação:** de p = 0 a 0,08, a seta sobe 6% da própria altura sem sair (ela "descola").
- **A inclinação** acompanha a tangente da curva, limitada a **±28°** (para a direita). A seta nunca deita.
- **O rastro:** 3 fantasmas na mesma curva (Δp de 0,035, 0,07 e 0,105), a 0,6, 0,35 e 0,15 de intensidade, em `#FBF7FF` → `#C9A2FF` → `#9232EA` (o pacote do v4.4 §3.1, na cor da seta). **A exaustão verde:** 2 grãos `#58F6B1` de raio 4 px logo abaixo da haste, **só enquanto 0,04 < p < 0,9**. Isso é energia, e não seta, e é a única dose de verde do hero além do botão (≤ 0,1% do quadro).
- **O buraco:** quando a seta sai (p > 0,1), o meio do triângulo fica **escuro**, com a forma da seta vazada por ~0,15 de p. É o "logo sem a seta", que se lê. Depois, o corpo fecha o buraco em Bayer.
- **O apagamento do triângulo (a nova C1):** de p 0,25 a 0,85, o corpo **apaga em limiar de Bayer do vértice para a base** (o inverso da intro). Os 6 nós da base são os últimos a apagar. **Não há mais queda nem tapete de pontos sob o formulário.**
- **A frase "o que aconteceu":** "a seta saiu do logo e subiu; o logo se apagou".
- **Parado no meio:** a seta fica pendurada no arco (dá para ler: "está subindo"). O motor desenha esse quadro e dorme.
- **A 390:** a mesma curva, pela calha da direita. Entre p 0,3 e 0,6, a seta passa por trás da borda direita do lede e do H1 (o canvas está atrás do texto). Ela tem ≤ 36 px de largura e passa em ~150 ms de dedo. **Conferir a 360 px** que o arco não cruza o botão.
- **Reduced:** nada se move (a seta fica em casa e o triângulo inteiro). **`gl-off`:** o §4.7.

---

## 6. Item 4: o header

| | 1440 | 390 |
|---|---|---|
| Altura da barra | 80 (era 72) | 64 (era 56) |
| A marca do logo (o SVG) | **28 px** de altura | **24 px** |
| O wordmark "BrandUp" | o papel "Marca" (§12.1), ~22 px | ~19 px |
| O alvo de toque da marca | ≥ 44×44 | ≥ 44×44 |
| "Diagnosis" | **verde `#58F6B1`**, Label 15/500, sublinhado de 1,5 px em verde a 45%; no hover, sublinhado de 3 px a 100%; foco com anel de 2 px em verde, deslocado 3 px | igual |

- **A dose de verde:** a palavra ocupa ~0,05% do quadro. Na 1ª dobra, ela soma com o botão `field` e a exaustão da seta. Total medido ≤ 1,5%.
- **Na intro**, o header entra aos 800 ms (480 na curta), depois do número acender (§4.2).

---

## 7. Item 3: o gancho longo (a composição)

### 7.1 A estrutura do H1 (um `<h1>` só, 3 papéis)
```
<h1 id="h1">
  <span class="h-frame">How businesses are generating over</span>
  <span class="h-giant"><span>$250K</span> <span>per</span> <span>month</span></span>
  <span class="h-frame">within 90 days by investing in automation and AI.</span>
</h1>
```
- O texto exato é do `copy-director` (§12.2). **A palavra "over" fica no enquadramento**, para que a linha gigante seja exatamente "$250K per month".
- **Os tons:** enquadramento a 72% e "$250K per month" a 100% (a hierarquia por opacidade do mesmo tom, como o dono prefere). Nenhum peso acima de 400 no display.
- **O LCP é o `<h1>` inteiro** (um bloco de texto). Os 3 papéis são `<span>` dentro dele, e nenhum entra por opacidade.

### 7.2 1440 (12 colunas, margem 64, calha 24, coluna ≈ 87)
```
y    0 ┌──────────────────────────────────────────────────────────────────────────────┐
       │ [▲ BrandUp]  (28 px)                                       Diagnosis (verde) │ 80
   96  │                                                          ▲ vértice           │
       │                                                         ╱ ╲                  │
       │                                                        ╱ ⇧ ╲   o logo de luz │
       │                                                       ╱ ┃  ╲  382×356, col 9–12
  380  │ How businesses are generating over   (Enquadramento, 72%)  ╲                 │
  452  │                                                   ●──●──●──●──●──● (6 agentes)
  468  │ $250K per month          (DISPLAY XL, 100%, uma linha só, ~1.150 px)         │
       │                                     ↑ o triângulo pousa sobre "month"        │
  613  │                                                                              │
  636  │ within 90 days by investing in automation and AI.   (Enquadramento, 72%)     │
  724  │ Lede: 2 linhas, colunas 1–6, ≤ 60ch                                          │
  808  │ [ Build my AI office ↑ ]  (field)     A$10M+ in client sales  (voz de dado)  │
  856  │                                                                              │
  900  └──────────────────────────────────────────────────────────────────────────────┘
```
- **A linha gigante nunca quebra a ≥ 1024 px.** O tamanho é `min(12,8vw, Display XL)`. A 1440, "$250K per month" com avanço médio medido de ~0,41 em (o H1 de hoje: 845 px para 20 caracteres a 104 px) dá ~1.120–1.180 px a 184 px (os algarismos são mais largos). Isso cabe em 1.312 px.
- **O ritmo vertical é em `fr`, e não em pixel fixo:** ar de cima 1fr, a pilha e ar de baixo 0,6fr. O hero tem `min-height: 100svh`. Se a pilha não couber (num notebook com ~760 px úteis), **o hero cresce**: nunca corta e nunca encolhe a linha gigante abaixo do enquadramento × 3.
- **O triângulo se ancora na linha gigante:** a base fica no topo da altura de maiúscula − 16 px, e a altura é `min(356, topo da gigante − 96)`. A âncora é um token CSS (`--giant-top`), e não uma medida do texto: assim, a troca da fonte não faz o logo pular (§15).

### 7.3 390 (4 colunas, margem 20, calha 12)
```
y   0 ┌────────────────────────────────┐
      │ [▲ BrandUp] (24)     Diagnosis │ 64
  88  │ How businesses are             │ Enquadramento, 72%, 2 linhas
      │ generating over                │
 144  │ $250K                          │ DISPLAY XL, 100%,
      │ per month                      │ 2 linhas (quebra forçada; "per month" ≤ 350 px)
 316  │                                │
 328  │ within 90 days by investing    │ Enquadramento, 72%, 2 linhas
      │ in automation and AI.          │
 404  │ Lede: 4–5 linhas, 16/24        │
 520  │ [ Build my AI office ↑ ]       │ field, 48 de altura
 584  │ A$10M+ in client sales         │ voz de dado
 624  │            ▲                   │
      │           ╱⇧╲   logo 218×204   │
      │          ╱ ┃ ╲                 │
 828  │         ●─●─●─●─●─●            │
 844  └────────────────────────────────┘
```
- **A 390, a linha gigante quebra de propósito** em "$250K" / "per month" (um `<br>` visível só abaixo de 768). O tamanho é o que deixa "per month" ≤ 350 px (com avanço de ~0,41 em: ~84–92 px).
- **Tudo o que é texto e o botão ficam na 1ª tela** (844). O logo fecha a 1ª tela. No Instagram (o `svh` menor, memória `instagram-svh-muda-na-rolagem`), o logo pode cair para baixo da dobra: tudo bem, porque ele é marca e não ação. **As posições usam `--tela` congelada**, e não `innerHeight` ao vivo.
- **O que some a 390:** os rótulos dos agentes no hover (um toque acende o nó e o nome aparece acima do triângulo, como hoje).

---

## 8. Item 5: o 1º formulário (limpar a base e destacar o componente)

### 8.1 O que sai
- O tapete de pontos da rede que caía (o pouso do `uFall` no formulário).
- A nuvem roxa à esquerda dos campos.
- A franja e os blocos de dither do `uHz` sob o cartão. **A linha do horizonte fica**, uma linha só, porque ela é a costura C2 (o pôr do sol que leva à noite).
- A orla roxa do v4.4 neste formulário (ela continua no FAQ e no formulário final).

### 8.2 O componente
- **A superfície:** `#0D0B12` (um degrau acima do chão), borda hairline de 1 px em `rgba(244,241,248,.07)`, raio 20, padding de 40 (1440) ou 20 (390). Nada de sombra e nada de vidro.
- **Os campos e o botão:** o que já existe. O H2 ("One call. Your plan.") e o lede ficam **fora** do cartão, à esquerda a 1440 (colunas 1–4) e em cima a 390.

### 8.3 O anel de pontos verdes (o pedido do dono)
- **A geometria:** pontos de 1,5 px num passo de 6 px (1440), ou de 1,5 px num passo de 5 px (390). Ficam numa faixa **de 6 a 22 px fora da borda** a 1440, ou de 4 a 14 px a 390. Os cantos seguem o raio.
- **A densidade:** cai com a distância à borda, por limiar de Bayer (55% junto à borda e 0% na ponta de fora). Por lado: a base a 1×, as laterais a 0,7× e o topo a 0,4×. O anel fecha, mas pesa embaixo, e por isso ainda "nasce do chão".
- **A cor:** `#58F6B1` a 55%. Sem glow e sem desfoque.
- **A ignição** (uma vez): quando o cartão fica 25% visível, o anel acende a partir do **meio da base**, correndo pelos 2 lados até se encontrar no meio do topo, em 720 ms `cubic-bezier(.3,.6,.2,1)`, em limiar de Bayer (nunca fade). Depois fica parado e o canvas não redesenha.
- **Em avaliação, ligado por padrão (`?ringfocus=0` desliga):** quando um campo recebe foco, o trecho do anel mais perto dele sobe 1 nível de Bayer, parado e sem loop. É barato de tirar.
- **Os estados:** com erro, o anel não muda (o vermelho fica no campo). Enviando, também não. No sucesso, o anel fecha 1 nível mais denso na base, por 400 ms, e assenta.
- **A dose:** o anel fica ≤ 0,35% do quadro a 1440 e ≤ 0,5% a 390. Somado ao botão `field`, fica ≤ 1,5%. **Se passar, o topo do anel sai primeiro, depois as laterais encolhem para 0,5×.** O botão nunca perde o verde por causa do anel.
- **Técnica:** o pintor da orla (`orla.ts`) ganha o modo `ring-mint`, em canvas 2D com DPR ≤ 2, pintado por tamanho (ResizeObserver) e independente do WebGL. Funciona igual no `gl-off`.
- **Reduced:** o anel pintado inteiro, sem ignição.
- **A frase "o que aconteceu":** "o formulário acendeu em volta".

### 8.4 Wireframe
```
1440                                                   390
┌──────────────────────────────────────────────┐       ┌────────────────────┐
│ One call.           ·:·:·:·:·:·:·:·:·:·:·:·  │       │ One call.          │
│ Your plan.          :┌──────────────────────┐:│       │ Your plan.         │
│                     :│ Name      Company    │:│       │ lede               │
│ lede (2 linhas)     :│ Email     Mobile     │:│       │ ·:┌─────────────┐:·│
│                     :│ Revenue [chips ×4]   │:│       │ : │ Name        │ :│
│                     :│ [ Build my AI office]│:│       │ : │ ...         │ :│
│                     :└──────────────────────┘:│       │ : │ [ field ]   │ :│
│                     ·:·:·::::::::::::::·:·:·  │ base  │ ·:└─────────────┘:·│
│ ─────────────────── horizonte (1 linha) ──── │ densa │ ::::::::::::::::::: │
└──────────────────────────────────────────────┘       └────────────────────┘
```

---

## 9. Item 6: "You have the final word"

### 9.1 Subir o conteúdo e dar altura à rede
| | 1440 (o palco preso, 900) | 390 (o palco preso, 844) |
|---|---|---|
| H2 | as 2 metades ("You have" nas colunas 1–4 e "the final word." nas 9–12) **alinhadas ao topo do telefone**, com a linha de base em y ≈ 184 (hoje estão no meio, em ~315) | uma linha em y ≈ 76, como hoje |
| O telefone | topo em **120**, altura `min(52vh, 480)`, base em ~600 | topo em 124, altura 400, base em 524 |
| A 2ª rede (os agentes) | o vértice na base do telefone (616), a base em **776**, com **160 px de altura** e 720 px de largura (colunas 3–10) | o vértice em 540, a base em **690**, 150 px de altura e 350 px de largura |
| Os rótulos | §9.2 | §9.2 |
| Ar no pé | ≥ 72 | ≥ 84 |

**Os "pontinhos espremidos" se resolvem pela altura:** a rede passa de ~60 para 160 px, e os 6 agentes ficam espaçados por ~144 px (1440) ou ~70 px (390).

### 9.2 As legendas dos agentes (a pessoa tem que ver o que está acontecendo)
- **A 1440:** **os 6 nomes ficam sempre visíveis** sob os 6 nós, em Label 15, com o tom a 44%. **O agente da vez** (o `bus.sim.agent`) sobe para **Lead 18 a 100%**, o nó dele acende (o `hot` que já existe), e **embaixo do nome aparece uma linha de estado** na voz de dado: o papel mono do §12.1, com o texto do `copy-director` (por exemplo: "asking you" → "sending" → "done"). O estado acompanha o que o telefone mostra (perguntando, aprovado e enviando, recusado). A troca de agente é uma rolagem de linha de 240 ms (o `voice-data` do v4.4 §8.2), e nunca um fade.
- **A 390:** só **o agente da vez** tem nome, centralizado sob a base, em Lead 18 a 100%, com a linha de estado embaixo. Os outros 5 ficam só como nós. Os 6 nomes a 390 não cabem em 58 px cada.
- **O `.net-tag` de hoje** (a caixinha de 15 px colada ao nó, no canto) **sai**, e vira este bloco.
- **`aria`:** o `aria-live` das ordens já existe. Os nomes ficam `aria-hidden` (é um diagrama).

### 9.3 A seda roxa em altura inteira (é bug de caixa)
- **A causa:** o `.lock-fill` é `position: absolute` dentro do `.lock` (`inset: -22px -18px -14px`), e o `.lock` não ocupa a altura da `.screen`. Por isso, o enchimento cobre só o pé.
- **A correção:** o enchimento passa a ser **filho direto da `.screen`**, com `position: absolute; inset: 0; border-radius: inherit`. A `.screen` recebe `isolation: isolate` e recorta pelo raio. O texto do `.lock` (a hora e o status) fica por cima, com `z-index`. A animação continua: o `clip-path` de `inset(100% 0 0 0)` até `inset(0)` (de baixo para cima, **pela altura toda**) e depois o `settle`.
- **Verificar:** o retângulo do enchimento é igual ao da `.screen` (±1 px) nos 2 motores, a 1440 e a 390, e no WebKit o arredondamento não se perde durante o `clip-path` (se se perder, a v4.4 §13 já dá a saída: `mask-image`).

---

## 10. Item 7: Questions (a entrada dos textos e o desempenho)

### 10.1 A entrada
- **As perguntas** (o `<summary>` de cada item) entram linha a linha por máscara: a linha sobe de `translateY(100%)` para 0 dentro de uma caixa de linha com `overflow: clip`, em 420 ms `cubic-bezier(.2,.75,.2,1)`, com 70 ms entre itens e no máximo 6 em escada. É uma classe nova, `voice-q`, na tabela do v4.4 §8.2. **Não é o K1** (o K1 fica para os H2).
- **As respostas** entram como `voice-body` (opacidade + 12 px), 120 ms depois da pergunta.
- **O gatilho é o IO de cada item a 15% visível**, e não a lista inteira de uma vez. Assim, a cascata acompanha a rolagem.
- **O cursor de leitura (o E3) fica como está.**
- **Reduced:** tudo visível. Os textos nunca voltam a sumir ao subir a página.

### 10.2 O desempenho (medir antes, depois corrigir)
1. **Medir:** um trace do Chrome a 1440 rolando pelo FAQ (long tasks, layout forçado e pintura) e os intervalos de rAF no webkit. Anotar os números de antes.
2. **A suspeita (de leitura do código, não verificada):** `domScenes.ts` 249–254 lê `getBoundingClientRect()` de cada item **a cada quadro** e escreve `data-state` no mesmo laço. **A correção:** guardar o `docTop` e a altura de cada item no resize (ResizeObserver) e calcular o "atual" a partir de `scrollY`, com **0 leitura de layout por quadro**. Escrever só quando mudar (já é assim).
3. `contain: layout paint` em `.faq-item`. O `will-change` só durante a animação de entrada.
4. A orla do FAQ pinta **uma vez** (expor `__orlaPaints` em dev; a meta é 1 por tamanho).
5. Nenhuma divisão em palavras nas respostas (sem `span` por palavra).
6. **Verificar:** as metas do §1 e, depois, um trace igual para comparar.

---

## 11. Item 8: os depoimentos de volta

### 11.1 O lugar
**Entre o FAQ e o formulário final.** A ordem da página passa a ser: hero → formulário → noite → escritório → o "sim" → Questions → **In their own words** → Want a team like this? → rodapé.
- **Por que ali:** as perguntas tiram a objeção, os donos falando dão a prova, e o pedido vem logo depois. Antes do FAQ, a seção quebraria a costura C5 (o telefone que se desfaz e vira a orla do FAQ, v4.4 §6). Depois do pedido final, ninguém lê.
- **As costuras:** do FAQ para os depoimentos, sem pacote (a voz entra pelo IO, e não há fundo novo). Dos depoimentos para o final, a C6 de hoje (o horizonte do formulário final acende do chão para cima), que só muda de vizinho.

### 11.2 1440
```
┌─────────────────────────────────────────────────────────────────────────────┐
│ In their own words.                         (H2, 100%)                      │ padding-top 160
│ In their own businesses.                    (H2, 2º tom 56%: B5)            │
│                                                                             │
│ col 1–3 (presa, top 120)      col 5–11                                      │
│ intro (corpo, 2–3 linhas)     ┃ "I used to finish a full day…"  (100%)      │ ← o cursor de dither
│ 01 / 04  (voz de dado)        ┃  [MB] Michael Bennett · Owner               │
│                                                                             │
│                                 "We've always been proud…"      (48%)       │ gap 96
│                                  [SM] Sofia Mitchell · Owner                │
│                                 "Before BrandUp, I would put…"  (48%)       │
│                                 "Our menu had grown…"           (48%)       │
└─────────────────────────────────────────────────────────────────────────────┘ padding-bottom 160
```
- **O conteúdo é o do cliente, sem reescrita:** os 4 textos, nomes e iniciais de `src/Testimonials.tsx`, o H2 "In their own words. In their own businesses." e o intro "The people, the everyday challenges, and what working with BrandUp means to them.". O eyebrow "Testimonials" sai: o H2 já diz o que é (a regra "uma função por zona").
- **O cursor (E3):** o depoimento cujo centro está mais perto de 45% da altura da tela fica a 100%, e os outros a **48%** (nunca abaixo, porque é texto de corpo e precisa de contraste AA). O portador de luz é **o mesmo cursor de dither do FAQ** (a mesma classe e o mesmo `data-state="current|other"`, num componente compartilhado), que anda até o depoimento da vez em 320 ms. O contador "01 / 04" acompanha.
- **A assinatura:** as iniciais no papel mono do §12.1, num quadrado hairline de 32 px (sem cor e sem círculo colorido), mais o nome em Label 15 e "Owner" a 56%.
- **A técnica:** o IO único da página (v4.4 §8.2) com `rootMargin` no meio da tela, e o cálculo do "atual" por `docTop` em cache, como no FAQ (§10.2), sem leitura por quadro.

### 11.3 390
- O H2 em 4 linhas (2 por frase, com o 2º tom a 56%), e o intro embaixo.
- **Um trilho horizontal com `scroll-snap-type: x mandatory` nativo:** cartões de 84vw (~328 px), calha de 12, `padding-inline: 20`, e o próximo cartão aparecendo 12% (é o convite ao gesto). O cartão da vez fica a 100% e os outros a 48%. "01 / 04" embaixo, na voz de dado. **Sem setas e sem pontos.** O trilho é focável (`tabIndex=0`, as setas do teclado rolam de forma nativa) e tem `aria-label` com a contagem.
- **Por que trilho aqui e pilha a 1440:** a pilha com 4 depoimentos de ~11 linhas soma ~1,7 tela entre o FAQ e o pedido final no telefone. O trilho mantém o pedido perto. A 1440, a pilha cabe em ~1,4 tela e mostra os 4.
- **O "atual"** sai de um IO com `root` = o trilho, com limiar de 0,6.

### 11.4 Estados
Sem JS: os 4 a 100%, em pilha (a 390 também). Reduced: os 4 a 100%, sem o cursor animado (ele salta). Sem WebGL: igual, porque é DOM.

### 11.5 Pendência para o dono (registrar no HANDOFF)
**Os 4 depoimentos falam de restaurante** ("at the restaurant", "our kitchen", "our food", "our menu"), e o público agora é negócio em geral. Eles entram como estão, porque é conteúdo do cliente e não se reescreve nem se inventa depoimento. **O dono precisa trocar pelos depoimentos dele** (ou confirmar que esses ficam). Nada no layout depende do assunto: o comprimento (~330 caracteres cada) é o que o layout espera.

---

## 12. Pedidos

### 12.1 Ao type-director (papéis; as famílias e a escala são suas)
- **Display XL ("$250K per month"):** o **maior tamanho da página**, ≥ 2× o H2. A 1440, tem que caber numa linha de ≤ 1.312 px (a referência é ~184 px). A 390, "per month" tem que caber em ≤ 350 px (a referência é ~84–92 px). Ele substitui o `--type-hook-size` atual. Os algarismos e o "$" precisam ser bonitos em tamanho de cartaz: confira o "$" e o "K" da Mona Sans a 87,5% de largura; se o kerning de "$2" ou "0K" pedir ajuste, diga qual.
- **Enquadramento (as 2 linhas que abraçam o número):** o mesmo tamanho para as duas, entre o Lead e o H2 (a referência é ~44–48 px a 1440 e ~22–24 a 390), 400, em 72% do tom. **A regra dos 5 tamanhos do v4.3:** este é um 6º tamanho. Ou você aposenta um (talvez a Lead vire o corpo grande), ou justifica por escrito.
- **A troca da fonte sem salto:** um `@font-face` de reserva com as métricas casadas (`size-adjust`, `ascent-override` e `descent-override`) para que a troca da `BU Display` mexa ≤ 0,02 de CLS **numa linha de 184 px**. Diga também se, com o gancho maior, a fonte de display passa a merecer `preload` (o v4 D5 decidiu não pré-carregar, porque o H1 era pequeno).
- **Marca (o wordmark do header):** ~22 px (1440) e ~19 (390), acompanhando a marca de 28 e 24 px.
- **A voz de dado (mono):** a linha de estado dos agentes (§9.2), as iniciais e o "01 / 04" dos depoimentos (§11), e a prova do hero. Se a família de texto já tiver algarismos tabulares e você preferir não trazer uma mono, diga qual papel assume.
- **A citação (o depoimento):** um tamanho que já exista. Eu sugiro o corpo grande a 1440 (com entrelinha 1,55 e medida de 58ch) e o corpo a 390.

### 12.2 Ao copy-director (função e tamanho; o texto é seu)
| Bloco | Função | Tamanho |
|---|---|---|
| Enquadramento de cima | Quem e o quê, terminando em "over" para que a linha gigante seja só o número | ≤ 36 caracteres (1 linha a 1440, 2 a 390) |
| A linha gigante | **Exatamente "$250K per month"** (AUD ou USD? confira com o "A$" da prova; se for A$, diga se a gigante leva "A$") | 15 caracteres |
| Enquadramento de baixo | O prazo e o meio ("within 90 days by investing in automation and AI.") | ≤ 52 caracteres |
| Lede | O "como" do site atual, adaptado para negócios em geral, em 1–2 frases | ≤ 210 caracteres (5 linhas a 390) |
| Prova | O "A$10M+ in client sales" (só se provado, copy §5) | ≤ 28 caracteres |
| A linha de estado do agente (§9.2) | O que o agente está fazendo agora, em 3 estados: pedindo, enviando e feito | ≤ 14 caracteres cada |
| Os metadados (`title`, `og`, `description`) | Saem de "industrial and B2B" para negócios em geral | — |
| Os depoimentos | **Não reescrever.** Só confirmar que o H2 e o intro ficam como estão | — |

### 12.3 Ao frontend-studio (motion com a frase, peso e fallbacks)
- **Cada movimento tem a sua frase** (§4.2, §5.2, §8.3 e §10.1). Se a frase não couber, o movimento sai.
- **O que sai do código:** o `PosterCanvas` do hero e o `poster-hero-1440/390.webp`; o `transition: opacity .3s` do `.gl-on .poster` (no hero); o voo do `.intro-logo` para o header (`i-open`, `i-logo`); a construção do zero da rede do hero; o braço de hero do `uRise`; o pouso do `uFall` no formulário; o `.net-tag`; o eyebrow dos depoimentos; o `sessionStorage` como portão da intro (ele passa a escolher só **inteira ou curta**).
- **O que entra:** `uLogo` e `uArrow` no `FIELD_FS`; `startEngine({ initial: 'built' })`; as variáveis `--logo-*` compartilhadas pelo SVG e pelo `layout.ts`; o modo `ring-mint` no `orla.ts`; `voice-q`; o componente de cursor compartilhado (FAQ e depoimentos); a seção `Testimonials` no proto (o conteúdo vem de `src/Testimonials.tsx`: **extraia os dados para um módulo compartilhado e importe-os**, sem copiar e colar o texto); a marca `hero-in` (performance).
- **O orçamento:** o SVG inline da intro ≤ 4 KB; o JS novo ≤ 5 KB gz (o anel, o cursor compartilhado e os depoimentos); o total da página continua ≤ 240 KiB; **nenhuma imagem nova**. O webp do pôster do hero (~10 KB) sai, e isso é ganho.
- **Os fallbacks:** o §4.7 e o §11.4. Toda regra de entrada fica atrás de `html.js`. Um foco num elemento ainda em `pre` o mostra na hora.

---

## 13. O mapa de seções (com o estado de cada uma)

| # | Seção | Função | A pergunta que responde | O que muda na v4.5 | Estados |
|---|---|---|---|---|---|
| 1 | Hero | marca + promessa | "quanto, em quanto tempo, com o quê, e quem são?" | o gancho longo, o logo de luz, a intro em toda carga e a seta em arco | inteira / curta / rolagem restaurada / reduced / `gl-off` / sem JS |
| 2 | Formulário 1 | agir cedo | "posso pedir agora?" | o chão limpo, o cartão e o anel verde | vazio / foco / erro / enviando / sucesso / falha de rede (os de hoje) |
| 3 | Noite | prova de trabalho | "o que eles fazem quando eu não estou?" | **nada** (aprovada) | — |
| 4 | Escritório | prova de sistema | "como é por dentro?" | **nada** (aprovado) | — |
| 5 | O "sim" | controle | "quem decide?" | o conteúdo sobe, a rede ganha altura, as legendas e a seda em altura inteira | perguntando / aprovado / recusado / tudo certo |
| 6 | Questions | objeções | "e os meus dados, o custo, os sistemas?" | a entrada dos textos e o desempenho | — |
| 7 | **In their own words** (de volta) | prova social | "isso funcionou para alguém como eu?" | **nova**: pilha com cursor (1440) e trilho (390) | sem JS / reduced / atual-outros |
| 8 | Want a team like this? | agir | "como começo?" | só o vizinho de cima | os de hoje |
| 9 | Rodapé | fecho da marca | "quem são, como falo?" | nada (a montanha agora rima com o hero) | — |

---

## 14. Ordem de implementação (frontend-studio, uma árvore, um agente por vez)

**Antes:** o texto do `copy-director` e os tokens do `type-director` (§12.1 e §12.2). O passo 3 não começa sem eles.

| # | Passo | Prioridade | Depende de | Verificar |
|---|---|---|---|---|
| 1 | **Os consertos rápidos:** a seda em altura inteira (§9.3), o header (§6) e o `width`/`height` nos SVG (§4.5) | P0 | — | o retângulo do enchimento = o da `.screen` ±1 px (2 motores, 1440 e 390); o 1º quadro do `reload` sem região roxa > 64 px; o verde da 1ª dobra ≤ 1,5% |
| 2 | **A continuidade do motor (§4.4):** o import durante a intro, `initial: 'built'`, as `--logo-*` compartilhadas, o canvas escondido até 2 quadros, a troca num quadro só, e o `PosterCanvas` do hero fora | P0 | — | as sondas de **sumiço** e de **imagem dupla** no `reload` (2 motores, 1440 e 390) passam **ainda com a rede antiga**. Isso isola o conserto do item 1 do redesenho |
| 3 | **O gancho longo parado (§7):** o H1 em 3 papéis, a grade em `fr` e a quebra a 390 | P0 | copy + type | LCP ≤ 1,8 s a 390 (4G lento, CPU 4×); CLS ≤ 0,02; a linha gigante nunca quebra a 1024–1440; nada cortado a 1280×720 |
| 4 | **O logo de luz (§5.1)** no motor e no SVG (a mesma geometria) | P0 | 2, 3 | o quadro final do SVG e o 1º do motor diferem em ≤ 6% dos pixels da caixa (a fase do dither pode mudar); o logo se lê a 32 px numa redução da captura (o teste do favicon) |
| 5 | **A intro (§4.1 a §4.3 e §4.6):** a inteira, a curta e a rolagem restaurada | P0 | 2, 4 | um vídeo de 390 e de 1440 da 1ª visita e do recarregar, nos 2 motores; `hero-in` ≤ 1.200 / 760 ms; pular ≤ 160 ms; 0 texto que pisca; LCP sem regressão; `greenPct` por quadro |
| 6 | **A seta em arco e a nova C1 (§5.2)** | P1 | 4 | um vídeo da rolagem lenta (80 px por quadro); a seta inteira dentro da tela para p ≤ 0,7; a inclinação ≤ 28°; a volta reconstrói o logo; `__frames` = 0 parado no meio |
| 7 | **O 1º formulário (§8)** | P1 | 6 (o tapete sai junto com a C1) | `greenPct` do anel ≤ 0,35% (1440) e ≤ 0,5% (390); nenhum ponto dentro do cartão; WebKit DPR 2 e 3 sem serrilhar; o `?ringfocus=0` limpa |
| 8 | **O "sim" (§9.1 e §9.2)** | P1 | 1 | as medidas do §9.1 ±8 px; a legenda da vez legível a 390 em todo quadro; a troca de agente sem fade |
| 9 | **Questions (§10):** medir, corrigir e medir de novo | P1 | — | as metas de long task e de p95 do §1, com os números de antes e de depois |
| 10 | **Os depoimentos (§11)** | P1 | 9 (o cursor compartilhado) | o contraste AA a 48%; o snap a 390 nos 2 motores; o texto idêntico ao de `src/Testimonials.tsx` (diff do texto = 0) |
| 11 | **A varredura inteira** (o `sweep.mjs` e o `capture.mjs`) com motion e com reduce, e o `?gl=0` | P0 de saída | todos | todas as métricas do §1 e do v4.4 §1; **depois o júri** |

---

## 15. Riscos

- **LCP e CLS com o gancho longo.** O H1 fica ~4× maior em área. É texto, então o LCP continua sendo o 1º paint de texto, **desde que nada no H1 comece com opacidade 0 ou `visibility: hidden`** (o tom de 32% por `color` conta como pintado). A troca da fonte numa linha de 184 px é o maior risco de CLS: daí a reserva com métricas casadas (§12.1). O triângulo se ancora num token CSS, e não na medida do texto, para não pular na troca.
- **Safari/WebKit.**
  - `transition: color` em 3 `<span>` grandes é barato (só repinta), mas **confira que o WebKit não rasteriza o H1 numa camada** por causa de algum `will-change` herdado. Isso borraria o texto a 184 px.
  - O `clip-path` animado em elementos SVG da intro já funciona hoje no WebKit (a intro atual usa o mesmo mecanismo). O padrão de dither em unidade de viewBox dá moiré a DPR 3: use `patternUnits="userSpaceOnUse"` em pixel (§5.1).
  - A seda na `.screen` com `border-radius` + `clip-path` (v4.4 §13) e o `scroll-snap` do trilho (que no iOS 17+ se comporta bem; confira o "pulo" de snap com `scroll-padding`).
- **Celular.** A 390, o arco da seta passa pela calha direita, atrás da borda do texto: confira a 360 px. O Instagram muda o `svh` (as posições usam `--tela`). A 1ª tela fica cheia: confira a 390×664 (iPhone SE com barra) que o botão continua acima da dobra; se não ficar, o lede vai para 3 linhas (o copy já tem o teto de 210 caracteres).
- **Desempenho.** O motor agora baixa durante a intro. Isso compete com o LCP só se o import sair antes dele: o `afterLcp` continua sendo o portão do download. A intro é CSS puro (sem JS por quadro). O anel e a orla pintam uma vez. A seta mantém o motor acordado só enquanto `p` muda.
- **Acessibilidade.** A intro não pisca (cada nó acende 1 vez). O H1 sempre legível (32% de tom é o mínimo, e ele está lá desde o 1º quadro). "Diagnosis" em verde sobre o chão passa AA com folga. Os depoimentos a 48% passam AA no corpo. O trilho de 390 é focável e rola pelo teclado. O pular cobre teclado, toque e roda.
- **A dose de verde.** A 1ª dobra de 390 tem o botão `field`, "Diagnosis" e a exaustão da seta; o 1º formulário tem o anel e o botão. Sonda por quadro, e não por média. A ordem de corte está no §8.3.
- **A leitura do dono.** Ele pediu a seta "como a verde que sobe hoje". A seta agora é branca (pela regra dele) com 2 grãos de energia verde. Se ele estranhar a falta do verde na subida, a alavanca é a exaustão (comprimento e nº de grãos), **nunca a seta**.
- **Os depoimentos de restaurante** num site de negócios em geral é risco de credibilidade: pendência registrada (§11.5).
- **A produção de asset.** Nenhum render, nenhuma foto e nenhum vídeo. O pôster webp do hero sai.
