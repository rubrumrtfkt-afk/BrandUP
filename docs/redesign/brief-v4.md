# BrandUp: brief de direção v4, "A luz só sobe com o seu sim"

Autor: ui-ux-director · 09/11/2026 · **substitui a direção visual do v3/v3.1** (o "relatório impresso" morreu). Do v3 ficam só o vocabulário anti-slop (§9 do `juri-v3.md`), a linha de aprovação viva, o formulário `#diagnostic` com a engenharia dele e os fixos de negócio.
Para: `type-director` (§6.1), `copy-director` (§6.2), `frontend-studio` (§6.3 e §7), `design-jury` (§9). O `figma-architect` entra só no storyboard (§8).
Motivo: o dono derrubou o v3 em 09/11. Disse que tinha "muito texto, muita informação", que precisava ser "mais visual, mais impactante", que "uma tela toda roxa, pelo amor de Deus, não dá" e que ainda tinha "muita cara de AI slop". Ele pediu uma página baseada no vídeo 3D do jimo (cérebros ligados a agentes, a grade que vira onda e carrega informação), com os bonecos numa seção só, e gradiente com grão e shader no lugar do roxo chapado. O logo e as cores da marca não mudam; a tipografia pode mudar.

**O que abri nesta sessão:**
- **jimo-3d.mov.** 75 quadros (1/s) em 5 folhas, mais quadros em alta resolução aos 6 s, 25 s, 36 s e 51 s.
- **unicorn-shaders.mov.** 42 quadros em 3 folhas.
- **`grainient.png`.**
- **Dossiê do jimo.** `notas.md`, `w-07`, `w-14` e `m-18`.
- **`qclay-p12/d-00`.**
- **Nossos renders.** `render/v2/office-day-master`, `you-room-portrait` e `desk-followup`.
- **A propaganda.** `referencias/video-frames/contato.jpg`.
- **O histórico.** `brief-v3.md` (§1–§3), `brief-v3.1.md` (cabeçalho e índice), `juri-v3.md` inteiro e `copy.md` v4.1 (§1–§2.5).
- **O código e a marca.** `public/favicon.svg`, `src/` e `package.json` (React 19 + Vite 8; não há three, OGL nem GSAP).

**Sorteio da skill** (`draw.mjs --sector ai-product --tone bold --keep palette --have video --options 3`, saída em scratchpad): deu `colour-chapters`, `borrowed-category` e `one-motif`. **Escolhi `one-motif`** (§2.2).

**O que não verifiquei:**
- Não medi o peso real do OGL nem do three no nosso build; os números do §7 são ordem de grandeza a confirmar.
- Não testei shader nenhum em iPhone nem no navegador do Instagram.
- O Higgsfield não está conectado, então não gerei nada.
- O plano de 90 dias da §5.6 não existe como dado do dono: é conteúdo a confirmar.

**Equilíbrio de fontes (aviso):** as duas últimas direções já puxavam do jimo, e esta puxa de novo, por ordem do dono. Para não virar cópia: (1) a forma vem da **marca** (o triângulo com a seta para cima do `favicon.svg`), e não do jimo; (2) cada movimento do jimo tem escrito o que muda (§3); (3) a luz vem do Grainient e do Unicorn **transformados** (§2.3); (4) o júri faz o teste de sobreposição contra os quadros do jimo-3d (§9, item 9).

---

## 1. Peça e objetivo

- **Tarefa da pessoa.** É o dono ou diretor de uma indústria ou de um B2B australiano, que chegou de um anúncio do Meta **no celular**, dentro do navegador do Instagram ou do Facebook, com pressa e cético sobre "IA". Em 5 segundos ele precisa entender o que é (um escritório de agentes de IA que a BrandUp monta e opera), o que ganha ($250K/mês em 90 dias, que é o gancho) e quem manda (ele aprova). Depois, deixar os dados. O resto da página serve para quem ainda não confia.
- **Dispositivo.** 390 é a peça principal; 1440 é para quem volta pelo desktop (o sócio, o financeiro).
- **Métricas.**
  - No ar: a taxa de envio do `#diagnostic` no tráfego do Meta, contra o site atual (a medir).
  - Desempenho: LCP ≤ 2,0 s no celular médio em 4G e nenhum loading entre o hero e o formulário.
  - Mock vivo: taste ≥ 8,0, Awwwards ≥ 7,2, FWA ≥ 70 e todos os itens do §9.

---

## 2. Conceito e sistema visual

### 2.1 Conceito (uma frase)
**"Na BrandUp, o trabalho é luz: cada lead, fatura e pedido corre como um ponto roxo pela sua empresa, passa pelos agentes e só sobe, como a seta do logo, quando você diz sim."**

Frase de ideia da skill:
> Nesta página, **o triângulo da BrandUp com a seta para cima** vira **o único motivo**: é a forma da rede de agentes, a direção de toda a luz e o gesto da aprovação.

**Teste do concorrente.** Troque por Relevance AI, Artisan ou o próprio jimo. Nenhum tem uma marca que já é uma seta para cima dentro de um triângulo, e nenhum põe a decisão do dono como o evento que faz a luz andar. A frase não fecha com eles.

**A coisa viva (uma só):** o **sim** na sala YOU (§5.5). O visitante aprova uma ordem no telefone, e a luz que estava parada na fila sobe e sai da tela. O clique e o movimento têm o mesmo significado.

### 2.2 Direção sorteada
| Direção | Decisão | Por quê |
|---|---|---|
| **`one-motif`** | **ESCOLHIDA** | A marca tem uma forma forte que nunca foi usada: o triângulo roxo com a seta branca para cima (`favicon.svg`: triângulo + triângulo interno + barra arredondada). No v3 descartei esta direção porque o motivo seria o bloco roxo da legenda, que é fraco. O triângulo-seta carrega o sistema: é a topologia da rede no hero, o sentido da luz, o glifo dos agentes nos 90 dias e a subida final. **Desvio da folha, registrado:** a folha pede o motivo "como forma chapada enorme". Aqui ele aparece chapado só **duas vezes** (o logo e a subida do fim) e, no resto, **como estrutura de luz**, porque o shader é pedido do dono. O full sheet deve ser sorteado pelo frontend-studio com `--direction one-motif --keep palette` antes do código |
| `colour-chapters` | Descartada | Pede campos de cor chapada de chão a teto, que é exatamente a "tela toda roxa" que o dono vetou |
| `borrowed-category` | Descartada | Vestir de outra categoria briga com o pedido explícito (o vídeo do jimo como base) e com o tráfego de anúncio, que precisa reconhecer o que clicou |

### 2.3 Como o roxo vira luz sem virar o "glow roxo de SaaS de IA"
O clichê é este: o fundo quase preto com uma **bola/aurora roxa difusa atrás do título**, decorativa, parada ou girando sem sentido, com bloom macio, botão com brilho e texto em gradiente (taste `tells.md`, linhas 27, 28, 30 e 45; é o hero do Unicorn, folha 1, s 0–3). O que nos separa são **sete regras**, todas verificáveis (§9):

1. **Toda luz é um portador.** Um pixel luminoso só existe como uma de quatro coisas: **ponto** (uma unidade de trabalho: um lead, uma fatura, um pedido), **feixe** (o caminho de um ponto entre dois lugares), **crista** (a onda do tempo passando pela grade) ou **subida** (o efeito de um sim). Não existe luz ambiente, aurora de fundo nem orbe. Teste: pause qualquer quadro, aponte para uma luz e diga o que ela é.
2. **A luz tem direção, e a direção é a da marca: converge e sobe.** Nada é radial e centrado atrás do título. Os feixes convergem para o dono (o vértice do triângulo) e, aprovados, sobem e saem pelo topo. O Unicorn converge os splines para um nó central como decoração (folha 1, s 8–15); aqui a convergência é a fila de aprovação, e para o alto.
3. **O título fica no escuro por construção.** O shader recebe a caixa do H1/H2 como uniform e zera a luminância dentro dela + 48 px. Nada fica sobre o texto (regra da casa) e nunca há halo atrás do título.
4. **Grão impresso, não bloom.** A luz é quantizada com **dither ordenado/ruído azul** em 3 a 4 níveis, na escala do pixel CSS, como a "Dither Gradient I/II" do Grainient: estrutura visível de ponto, borda dura e nenhum desfoque gaussiano. É isso que tira o "SaaS de IA" (que é sempre bloom macio) e põe "impressão/serigrafia". O dither é feito no shader, nunca em vídeo (a compressão destrói o dither e cria banda).
5. **O roxo chapado tem dois lugares só: o logo e o botão.** O roxo `#9232EA` sólido significa "a sua ação" (o CTA, o Approve). O roxo pontilhado significa "trabalho em movimento". Nenhuma superfície chapada roxa maior que o botão; **nenhuma tela roxa**.
6. **"Brincar com as cores" tem lei física.** A luz roxa esquenta até o quase branco no núcleo (`#9232EA` → `#C9A2FF` → `#FBF7FF`) e, **só no ponto exato de convergência**, abre uma franja espectral âmbar (`#FFB46A`) de 1–3 px, como a dispersão no anel "Ecliptic" do Grainient. É **em avaliação** e sai com um uniform. O menta do v2/v3 **sai**: com a luz roxa, ele só repetia a trinca da categoria (júri v3 §5.3).
7. **A luz para quando não há trabalho.** Sem movimento perpétuo. Cada cena acende com a rolagem ou com o sim e repousa num estado final legível. Em `prefers-reduced-motion` ou sem WebGL, cada cena vira um pôster do estado final (§7.4).

**Tokens (o papel; os valores finais vêm do frontend-studio com APCA):** `ground` #08070B (quase-preto neutro, nunca #000); `ink` #F4F1F8; `ink-2` (opacidade do mesmo tom, Lc ≥ 60 a 16 px); `brand` #9232EA (só logo e botão); `light-hot` #C9A2FF; `light-core` #FBF7FF; `light-deep` #1A0B33 (o fim do degradê da luz, nunca uma superfície); `fringe` #FFB46A (em avaliação, ≤ 0,5% dos pixels de qualquer quadro); `studio` (o tom do fundo da maquete, tirado do render, para a seção §5.4).

---

## 3. Movimentos (5) e descartes

| Código | Captura que prova (aberta) | Porquê aqui | O que muda em relação à fonte | Custo |
|---|---|---|---|---|
| **C9 (novo) A luz como trabalho, com dither** | `referencias/shaders/grainient.png` ("Dither Gradient I/II", "Ecliptic"); `unicorn-shaders.mov` folha 1 s 0–3 (aurora), s 8–15 (splines convergentes), folha 3 s 32–37 (clarão no horizonte) | É o pedido do dono (gradiente com grão e shader no lugar do roxo chapado) e o sistema inteiro do §2.3 | Nas fontes, a luz é **fundo ou enfeite** (vitrine de gradiente, aurora atrás do H1, clarão atrás de "Start exploring"). Aqui **toda luz carrega uma coisa e anda para cima**; o dither é ordenado, de serigrafia, e não o grão fino de foto; o clarão do horizonte do Unicorn vira **o chão do formulário**, que acende um feixe a cada campo preenchido (§5.2) | $$ (shader no motor único) |
| **D3 + E2 A rede viva que desce para a grade** | `jimo-3d.mov` 25 s (o blob ligado por fio a Intercom/Zendesk), 6 s (o app em perspectiva sobre a grade), 36 s (o terreno de pontos com balões); dossiê `w-07` (planeta e ponto de luz), `w-14` (a mira/funil); `qclay-p12/d-00` (fluido roxo, a anti-referência) | É o "cérebros centrais ligados a vários agentes" do dono, mostrado como mecanismo real (D3: 3D só onde explica). Responde "o que é isso?" sem texto: 6 agentes, 3 cérebros, 1 você | O jimo tem **um** mascote-blob, fios de dashboard até logos de terceiros, e o planeta como cenário. Aqui não há mascote nem logo de terceiro. São **3 cérebros** (volumes densos de pontos que "pensam" por turbulência lenta) ligados a **6 agentes** (aglomerados menores) e a **um vértice**, você, e o desenho geral **é o triângulo do logo**, com o caminho cérebros→você mais claro, como a seta branca. A transição não é o mergulho de câmera do jimo (E7): a rede **cai** sobre o plano e os nós viram pontos da grade (E2), "os agentes descem para a sua operação". O fluido do P12 é o que **não** fazemos (cor sem portador) | $$$ (WebGL em tempo real; justificativa no §7.1) |
| **F7 O sinal que atravessa a página** | dossiê jimo `w-07` (o ponto de luz que vira ponto final da frase); `jimo-3d.mov` 51 s (o ponto sozinho no preto) | Costura as cenas com **uma** história: um lead | No jimo, o ponto é brilho decorativo (o próprio repertório chama de slop). Aqui o ponto é **um lead com nome de função**: nasce na onda (às 02:14, um pedido de cotação), entra numa mesa da maquete, chega ao telefone na sala YOU e, com o sim, sobe. Ele nunca vira pontuação de título | $ (anda no mesmo motor) |
| **D1 A maquete pré-renderizada, numa seção só** | `render/v2/office-day-master.png`, `you-room-portrait.png`, `desk-followup.png` (o nosso Blender); `referencias/video-frames/contato.jpg` (a propaganda, o que o público viu) | Os bonecos ficam, mas só aqui, onde dão calor humano: "a equipe conversando". Faz a continuidade com o anúncio | A propaganda é isométrica, com legenda em marca-texto. O v3 tinha a maquete na página inteira. Aqui ela é **uma prancha de estúdio única**, a única seção **sem luz de shader** (o descanso do A3), com um loop de 6–8 s de câmera lenta e **diálogo entre mesas** em HTML (dois ou três balões curtos, um de cada vez) | $$$ produção · $ runtime |
| **F3/F6 A aprovação como peça viva** | `jimo-3d.mov` 25 s (a lista "Suggestions" com GUIDE/ANSWER/ACT e a "Escalation" para humano) | É a objeção do comprador ("e se a IA fizer besteira com o meu cliente?"); o júri v3 diz que a linha viva é "o melhor momento da página" (§9.3) | O jimo mostra uma lista de sugestões e uma escalada por fio, com o rótulo mono à direita. Aqui é **um telefone** (HTML, não imagem) com **uma ordem por vez**. Os feixes chegam de baixo até a ordem, que fica pulsando de leve: é trabalho parado esperando você. **Approve** → a luz sobe pelo telefone e sai pelo topo da tela (o triângulo-seta). **Decline** → a luz se apaga no lugar, sem vermelho | $$ |

**Soma de custo:** dois $$$ (o motor WebGL e o render da maquete). É o limite da regra: o primeiro se justifica no §7.1; o segundo já tem `brandup_hq.blend` e o pipeline pronto.

**Convenções de base ($, não contam como movimento):** A3 (cheio/vazio: cenas de luz × a prancha de estúdio × o formulário calmo); C3 (quase-preto); F5 (a abertura e o fim rimam: o triângulo de pontos abre a página e sobe chapado no fim); E8 (a intro entrega a marca ao header, nas regras do repertório).

### Descartados
| Código | Porquê não |
|---|---|
| **E7** mergulho de câmera | É a assinatura do jimo (`w-03→w-16`). Copiar o mergulho com outro conteúdo é o tipo de cópia que o júri pegou em 19/10. Trocado pela queda da rede (E2) |
| **A contagem regressiva no H2** ("tickets down to 48 → 0", jimo 36–48 s) | Subtrativa e centrada sobre o campo de balões: é a composição mais reconhecível do vídeo. A nossa onda é **aditiva e no tempo** (§5.3), e nenhum número de título muda com a rolagem |
| **O número gigante com slider de preço** (jimo 52–60 s) | Um slider de "faturamento prometido" é risco ACCC (a promessa vira calculadora). O princípio (número grande controlado) vira, na §5.6, **o dia 0→90 com a rolagem**, sem controle e sem prometer valor |
| **B10** frase que acende palavra por palavra | jimo, e é a "palavra estilizada" em movimento |
| **A4** grade como textura | A grade só existe quando carrega dado (a onda). Grade decorativa de fundo, como no jimo 6 s, sai |
| **Plexus** (rede de linhas genérica, P12 `plexus.mp4`) | Linhas entre todos os pontos sem significado são o clichê de "IA". Na nossa rede, cada fio é uma relação nomeada (agente → cérebro → você) e são poucos fios: 6 + 3 |
| **Mascote/blob** (jimo) | O agente da BrandUp é um funcionário com cargo (copy §1.3), não um bichinho |
| **C6** vidro/glass | Proibido na casa; o telefone é chapado |
| **Unicorn Studio como runtime** | Ferramenta paga de terceiros: o runtime e as cenas são deles, não versionamos o shader no git e não controlamos o dither nem o "portador". As três cenas cabem num motor nosso (§7.1). Pode servir de **rascunho** para o dono ver a luz antes do código, sem ir para produção |
| **Spline** (como o jimo) | 18–20 canvases; LCP do H1 a 4,07 s no desktop sem limitação (dossiê). É o oposto do celular do Meta |
| **E1** Lenis | Rolagem nativa (formulário, iOS, navegador do Instagram); as cenas usam `position: sticky` com no máximo 2 palcos presos (regra da skill) |
| **B4** mono · pílula · contorno · stat row · eyebrow · caixa alta pequena | Continuam proibidos (autópsia do `brief-v3.md` §1, que segue valendo inteira) |
| **Fileira de depoimentos** | Sem depoimento real aprovado por escrito (copy §2.4); a seção volta quando houver |

---

## 4. As representações dos agentes (uma por seção, nenhuma repetida)

| Seção | Forma do agente | O que ela diz | Por que esta forma aqui |
|---|---|---|---|
| Intro | **Pontos que montam o triângulo** e se espalham | "Isto é a BrandUp" | É a marca antes de tudo; 1,2 s, pulável |
| Hero | **A rede: 6 agentes ↔ 3 cérebros ↔ você** (partículas, em tempo real) | "É um sistema, e você está no topo" | O pedido literal do dono (cérebros centrais e agentes), na forma do logo |
| Formulário | **Feixes que nascem do horizonte**, um por campo preenchido | "A sua empresa está entrando" | É feedback de progresso que tem sentido; calmo, nada distrai do envio |
| A noite | **A grade-onda**: cada ponto é um momento da operação; a crista é o tempo | "Enquanto você dorme, o trabalho acontece" | A "grade que vira onda e faz surgir informação" do dono, com dado concreto |
| O escritório | **Os bonecos de resina na maquete**, conversando | "São funcionários, com mesa e cargo" | O calor humano numa seção só, como o dono pediu |
| Você | **Uma ordem de serviço no telefone**, alimentada por feixes | "Nada sai sem o seu sim" | A objeção principal resolvida pela mão do visitante |
| 90 dias | **Seis glifos-triângulo** (o motivo) que acendem na linha dos 90 dias | "Quando cada mesa liga" | A forma da marca como unidade; nenhum outro lugar a usa assim |

---

## 5. Mapa da página (pouco texto)

Regra de texto: **≤ 25 palavras visíveis por seção** (título + apoio + rótulos). Rótulos de dado dentro de uma cena: no máximo 5 visíveis ao mesmo tempo, com ≤ 4 palavras cada (contam à parte). Os campos do formulário e as perguntas do FAQ têm a régua deles (indicada). Total visível na 1ª pintura, com o FAQ fechado: **≤ 260 palavras** (o v3 passava de 1.000).

Ordem: **Intro → Hero → Formulário → A noite → O escritório → Você → 90 dias → FAQ → Final (formulário 2) → Rodapé.** Corte em relação ao v3: o About (a prova A$10M+ vira uma linha no hero e outra nos 90 dias, se comprovada), o tour das 7 mesas com faixas de hora (virou o diálogo da maquete e a onda), o depoimento e as respostas do FAQ abertas.

### 5.0 Intro (≤ 1,2 s, pulável)
- **Visual:** 600–900 pontos roxos montam o triângulo do logo no centro (0–500 ms); a seta interna acende branca (500–700 ms); os pontos se soltam e voam para as posições da rede do hero, e o logo chapado encolhe para o header (700–1.200 ms).
- **Palavras:** 0 (o "Skip intro" só existe para teclado e leitor de tela; qualquer toque pula).
- **Regras (E8):** o H1 está pintado por baixo desde o 1º quadro (é o LCP); só na 1ª visita da sessão; nenhuma intro com reduced motion ou sem WebGL; não cobre o formulário. Se o motor não carregou em 600 ms, a intro não acontece.
- **390:** a mesma, com 400 pontos.

### 5.1 Hero: "a rede"
- **Pergunta:** o que é, quanto, quem manda.
- **Visual dominante:** a rede em tempo real, de borda a borda. A 1440 o triângulo ocupa as colunas 6–12 e sangra à direita e abaixo da dobra; o vértice (você) fica alto, à direita do H1. Os pontos correm pelos fios: 6 agentes → 3 cérebros → você. O H1 fica na zona escura (§2.3, regra 3).
- **Palavras (~25):** H1 (o gancho de $250K/90 dias, ≤ 2 linhas), uma frase de apoio (o quê + você aprova), o CTA e, **se comprovada**, a linha da prova (A$10M+). A placa "2 agent actions waiting for your yes" do v3 **sai**: quem dá esse recado agora é o vértice pulsando.
- **Interação:** o ponteiro sobre um agente acende o fio dele e mostra o nome do cargo (≤ 3 palavras, por exemplo "Your follow-up"). No toque, o mesmo, no tap. Com teclado, os 6 agentes são botões invisíveis (`aria-label`) na ordem de leitura. É ajuda, não é a coisa viva.
- **Rolagem (E2):** nos primeiros ~70% de uma tela, a rede **inclina e cai** sobre um plano e os nós se espalham como pontos da grade da §5.3. Entre os dois fica o formulário: a grade espera embaixo dele, apagada, e acende quando a §5.3 entra. Não é palco preso: a queda é ligada à rolagem e termina antes do formulário.
- **390:** o H1 no topo (2–3 linhas), o apoio, o CTA na 1ª tela (y ≤ 640 em 390×844, contando com a barra do navegador do Instagram) e a rede abaixo, ocupando ~45svh e sangrando nas duas bordas. O vértice fica à direita do CTA, sem tocar nele. Sem hover: o tap num agente acende o fio.
- **Estados:** carregando = pôster AVIF da rede em repouso (mesmo enquadramento, sem salto quando o canvas entra; troca por opacidade em 300 ms); sem WebGL ou reduced motion = o pôster fica; contexto perdido = volta ao pôster e tenta recriar uma vez.

### 5.2 Formulário `#diagnostic`: "o horizonte"
- **Pergunta:** como eu peço?
- **Visual dominante:** o formulário direto no quase-preto, sem cartão. Na base da seção, uma linha de horizonte de luz pontilhada (C9, o clarão do Unicorn transformado). A cada campo válido, nasce um feixe vertical do horizonte (5 campos, 5 feixes). No envio, os feixes sobem juntos e o roxo chapado do botão fica como está (é a ação). Funciona como a barra de progresso que não precisa ser lida.
- **Palavras (≤ 20 fora dos campos):** H2 (o que a pessoa recebe numa ligação), uma frase de apoio (quem liga e em quanto tempo) e a linha de privacidade. Os campos seguem a copy v4.1 §2.3: Name, Company, Work email, Mobile (+61) e Monthly revenue (AUD) em 4 blocos. **⚠ As faixas são as strings de `revenueGrade()` em `src/lib/leadboard.ts`: mudar uma sem a outra quebra a classificação A/B/C** (memória `brandup-refazer-site-b2b`; aviso da copy v4.1 sobre a migration e o teste).
- **1440:** duas colunas. À esquerda (c1–c5), o H2 e o apoio, alinhados ao topo. À direita (c7–c12), os campos. O horizonte ocupa a largura toda na base. Não repete o split do final (§5.8, centrado).
- **390:** uma coluna, campos com alvo ≥ 48 px, o teclado certo por campo (`inputmode`, `autocomplete`), e o horizonte só com 5 feixes curtos sob o botão.
- **Estados:** foco, erro por campo (`aria-describedby`; o feixe daquele campo não acende), enviando (o botão em "Sending…" e os feixes pulsando uma vez), offline/erro de rede (os dados ficam e a mensagem fica acima do botão), sucesso (redirect `/thank-you`, já existe). **O horizonte é "em avaliação"**: sai com uma flag sem mexer no formulário.

### 5.3 A noite: "a grade-onda"
- **Pergunta:** o que eles fazem, de verdade?
- **Visual dominante:** um plano de ~120 × 60 pontos visto rasante, com perspectiva baixa. O eixo x é **a noite, das 18:00 às 08:00**, e a profundidade são as áreas (vendas, financeiro, marketing). A rolagem (palco preso, ≤ 2 telas) empurra uma **crista** da esquerda para a direita. Onde ela passa, os pontos sobem, e alguns viram **um rótulo de dado** que aparece e assenta: "02:14 · Quote request · Perth", "03:40 · Invoice chased", "05:05 · 12 leads followed up". Às 08:00 os pontos acesos escorrem para **um ponto só**: o lead da história (F7), que segue para a seção seguinte.
- **Palavras:** H2 ≤ 6 palavras + ≤ 5 rótulos visíveis por vez (≤ 4 palavras cada). Não há parágrafo.
- **O que muda em relação ao jimo (36–48 s):** o jimo tem um terreno fixo, balões espalhados com avatares, H2 central que conta para baixo e balões que somem. Aqui é **um varrimento no tempo**: a crista anda, os rótulos ficam depois que ela passa (aditivo), não há avatar nem número no título, o título fica **à esquerda e no alto**, e a cena termina numa convergência que tem destino.
- **1440:** o H2 em c1–c6 no alto do palco; o plano ocupa a tela toda abaixo dele.
- **390:** o plano gira para que o tempo corra **de baixo para cima** (a rolagem vertical empurra a crista para o alto, a direção da marca), com ≤ 3 rótulos por vez, à direita, com 4 palavras no máximo. O palco preso tem no máximo 1,5 tela.
- **Estados:** reduced motion / sem WebGL = um pôster do plano no fim da noite, com 3 rótulos em HTML ao lado (o conteúdo é o mesmo, sem o varrimento).

### 5.4 O escritório: "a equipe conversando"
- **Pergunta:** quem são esses agentes?
- **Visual dominante:** a maquete (render v2 revisado) **de borda a borda**, em luz de estúdio. É a única seção sem shader: o descanso visual da página. Um loop de 6–8 s com dolly lento de 3–5° (Blender). Sobre a **foto** (nunca sobre o título), **dois ou três balões de diálogo** entre mesas, um de cada vez, ancorados nas mesas, por exemplo o follow-up perguntando ao bookkeeper se o Sam pagou e o bookkeeper respondendo com a hora. Onde a conversa acontece, o ponto-lead da F7 pousa numa mesa.
- **Palavras (~25):** H2 (a frase do anúncio, "never late, never asks for a raise", que é o reconhecimento) + 2–3 balões de ≤ 7 palavras.
- **1440:** o H2 acima da imagem, em c1–c7; a imagem com 100% de largura e ~70svh.
- **390:** o render em retrato (`office-day-portrait` revisado), com 80svh; os balões viram uma sequência embaixo da imagem, um por vez, com o nome da mesa. Nunca três balões sobre uma imagem de 390.
- **Estados:** pôster AVIF enquanto o vídeo carrega (`preload="none"`; toca ao entrar na tela e pausa ao sair); erro no vídeo = o pôster fica; reduced motion = o pôster + os balões todos de uma vez, estáticos.
- **Render (pedido ao frontend-studio, herdado do júri v3 §8.2):** figuras de resina 1:50 de proporção adulta (sem cabeça de bola), monitores com brilho físico, softbox com direção e contraluz no chanfro, câmera baixa (~25°) para matar a leitura isométrica, piso sem listra fina e tapete da sala YOU calibrado em `#9232EA`. O teste continua sendo: "parece a foto de uma maquete em cima de uma mesa?".

### 5.5 Você: "o sim" (a coisa viva)
- **Pergunta:** e se a IA errar com o meu cliente?
- **Visual dominante:** um telefone em HTML, de face plana e sem moldura de aparelho realista (só o retângulo de canto grande e a tela), em c7–c10 a 1440. De baixo, **feixes** chegam até uma **ordem de serviço** (a do v3: o que o agente quer fazer, o porquê em uma frase, a prévia, Approve/Edit/Decline). A ordem pulsa de leve: é trabalho parado. **Approve** → a ordem vira "Sent" e **a luz sobe** pelo telefone até sair pelo topo da seção (600–900 ms); a próxima ordem chega em 1,2 s. **Decline** → a luz da ordem se apaga no lugar ("Declined. Nothing was sent."). Depois de 3 ordens: "All clear. Nothing is waiting for you."
- **Palavras (~25 fora do telefone):** H2 (a última palavra é sua) + uma frase (do celular, em segundos). O texto do telefone segue a copy v4.1 da sala YOU, cortado: o porquê em 1 frase, não em 3.
- **1440:** o H2 em c1–c5 à esquerda, centrado verticalmente com o telefone; os feixes vêm da base da seção e convergem no telefone.
- **390:** o telefone com 300 px de largura e centralizado. Esta é a **única seção centrada** da página (a planta muda de propósito). O H2 acima, os feixes de baixo, e o Approve com ≥ 48 px de alvo.
- **Estados (os 9 do v3, mantidos):** a chegar, esperando, aprovando, enviado, recusado, editar (abre o texto da prévia editável), tudo resolvido, erro ("Couldn't send. Try again."), e sem script (as 3 ordens empilhadas, estáticas, com os 3 estados escritos). Com reduced motion, a luz muda de estado sem viajar.

### 5.6 90 dias: "quando cada mesa liga"
- **Pergunta:** o que acontece depois que eu assino?
- **Visual dominante:** uma linha de horizonte com 90 marcas e um **número enorme**, o dia, que vai de 0 a 90 com a rolagem (palco preso, ≤ 1,5 tela; é o 2º e último palco). Ao longo da linha, **seis glifos-triângulo** (o motivo, um por agente) acendem com pontilhado de luz no dia em que a mesa entra no ar. No dia 90, os seis estão acesos e o número assenta.
- **Palavras (~20):** H2 curto + 6 nomes de mesa (1–2 palavras) + uma linha de prova (A$10M+ para clientes), **se comprovada**.
- **⚠ Conteúdo:** o dia de cada mesa é **plano de onboarding do dono**, que não existe nos documentos. O copy-director põe uma amostra marcada "modelo", e **se o dono não confirmar, a seção sai inteira** (o mapa continua de pé sem ela).
- **1440:** o número em c1–c5 (o maior tipo da página depois do H1); a linha com os glifos em c1–c12, abaixo.
- **390:** o número no topo e a linha **vertical** (os dias descem), com os glifos à direita e os nomes à esquerda.
- **Estados:** reduced motion = o dia 90 direto, todos acesos e os 6 dias escritos.

### 5.7 FAQ: "perguntas"
- **Visual:** a lista de 4–5 perguntas em tipo grande (o tamanho do H3), cada uma num `<details>` nativo. Sem ícone de "+": o indicador é a própria pergunta mudando de opacidade, e a resposta abre com altura animada. É a seção mais calma da página.
- **Palavras:** um título de 1–3 palavras + perguntas de ≤ 8 palavras; respostas de ≤ 35 palavras (fechadas não contam). **Mudança em relação ao v3** (que deixava todas abertas): o dono pediu menos texto; o `<details>` é nativo, funciona sem script e é buscável com Ctrl+F no Chrome.
- **390:** a mesma lista, com alvo ≥ 48 px por pergunta.

### 5.8 Final: "a subida"
- **Visual:** o formulário compacto (os mesmos 5 campos, o mesmo componente, um `id` diferente) **centrado** em c4–c9, sobre o mesmo horizonte da §5.2. Atrás e acima, o **triângulo chapado do logo** sobe devagar do horizonte com a rolagem até assentar grande, cortado pelo topo da seção (F5: rima com a intro; é o 2º uso chapado do motivo). O formulário fica à frente, em zona escura.
- **Palavras (≤ 15 fora dos campos):** H2 + o botão.
- **390:** o formulário em uma coluna e o triângulo atrás, cortado, sem passar por trás dos campos (a área dos campos fica escura).
- **Estados:** os mesmos do formulário 1.

### 5.9 Rodapé
- Uma linha de contato (e-mail, telefone, ABN: dados reais ou nada), os sociais (o único ícone da página), a linha "Agent activity shown on this page is illustrative." e a política de privacidade. Sem wordmark gigante: o triângulo da §5.8 já fechou a página.

---

## 5b. Wireframes composicionais

**Grid:** 1440 = 12 colunas, gutter 24, margem 64 · 768 = 8 colunas, gutter 20, margem 40 · 390 = 4 colunas, gutter 12, margem 20. Seções separadas por 160–200 px a 1440 e 96–120 px a 390, ou coladas quando a cena de uma entra na outra (hero → formulário). Plantas vizinhas sempre diferentes: hero (assimétrica, imagem sangrando) · formulário (split 5|6) · noite (palco largo, título no alto à esquerda) · escritório (imagem de borda a borda) · você (split 5|4, e centrado a 390) · 90 dias (número + linha larga) · FAQ (lista) · final (centrado).

### 1440
```
┌──────────────────────────────────────────────────────────────────────────────┐
│ ▲ BrandUp              How it works · Office · FAQ             [Diagnosis ▮] │ nav 72
├──────────────────────────────────────────────────────────────────────────────┤
│ OVER $250K PER MONTH            ·  ·    ▲(você)  ·                           │
│ WITHIN 90 DAYS.            · ·  ╲  ◉ cérebro ╱ ·   ·                         │ HERO
│ apoio (1 linha, 2 no máx.)   ·  ◉──────────◉ cérebro   ·                     │ rede sangra
│ [Build my AI office ▮]       ● ● ●   ● ● ●   (6 agentes na base)            ─┼→ à direita
│ A$10M+ linha (se provada)   ·  ·  ·  ·  ·  ·  ·  ·  · (cai em grade)         │ e abaixo
├────────────────────────────┬─────────────────────────────────────────────────┤
│ H2 (2 linhas)               │ Name ______________  Company ______________     │ FORMULÁRIO
│ apoio                       │ Work email ________  Mobile +61 ___________     │
│                             │ [<$100K][$100–300K][$300K–1M][>$1M]  [Botão ▮] │
│ ......:::::::|:::|::|:::::|:::::...... horizonte, 1 feixe por campo .........│
├──────────────────────────────────────────────────────────────────────────────┤
│ H2 ≤ 6 palavras                                                              │ A NOITE
│ 18:00 ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  ·  08:00  │ palco preso
│   · ·:·:░▓█▓░:· ·  ← a crista anda →   "03:40 · Invoice chased"              │ ≤ 2 telas
│ ·  ·  ·  ·  ·  "02:14 · Quote request · Perth"  ·  ·  ·  ·  ·  ·  ● (lead)  │
├──────────────────────────────────────────────────────────────────────────────┤
│ H2 (never late…)                                                             │ ESCRITÓRIO
│ ┌──────────────────────────────────────────────────────────────────────────┐ │ sem shader
│ │ maquete de borda a borda, loop de 6–8 s      ( balão A )                 │ │
│ │                          ( balão B )                                     │ │
│ └──────────────────────────────────────────────────────────────────────────┘ │
├──────────────────────────────┬─────────────────┬─────────────────────────────┤
│ H2 (a última palavra          │ ┌─────────────┐ │                             │ VOCÊ
│ é sua)                        │ │ ordem       │ │  ↑ a luz sobe e sai         │ (coisa viva)
│ 1 frase                       │ │ [Approve ▮] │ │                             │
│                               │ └─────▲───────┘ │                             │
│                      feixes ╱╱╱╱╱╱╱╱│╲╲╲╲╲╲╲╲ vindos da base                  │
├──────────────────────────────┴─────────────────┴─────────────────────────────┤
│ DAY 34   (número enorme)                                                     │ 90 DIAS
│ 0 ─▲────────▲──────────▲─────────△────────△──────────△──────── 90          │ palco ≤ 1,5
│   Reception Follow-up  Ads       Social   Books      Reports                 │
├──────────────────────────────────────────────────────────────────────────────┤
│ FAQ          Pergunta 1 (H3) ›                                               │ FAQ
│              Pergunta 2 …                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│                    ▲▲▲ triângulo chapado subindo, cortado no topo            │ FINAL
│                         H2 · [campos compactos] · [Botão ▮]                  │
│ ......:::::::|:::|::|:::::|:::::...... horizonte .............................│
├──────────────────────────────────────────────────────────────────────────────┤
│ contato · sociais · "illustrative" · privacidade                             │ RODAPÉ
└──────────────────────────────────────────────────────────────────────────────┘
```

### 390 (peça própria)
```
┌────────────────────────────┐
│ ▲ BrandUp      [Diagnosis] │ nav 56 (sem links; menu nenhum)
│ OVER $250K PER             │
│ MONTH WITHIN               │ H1 2–3 linhas
│ 90 DAYS.                   │
│ apoio (≤ 2 linhas)         │
│ [Build my AI office ▮]     │ CTA na 1ª tela (y ≤ 640)
│ · ▲ ·  ◉   ◉   ◉  · ·      │ rede ~45svh, sangra nas bordas
│ ● ● ● ● ● ●  → cai em grade│
├────────────────────────────┤
│ H2 · apoio                 │ FORMULÁRIO, 1 coluna
│ Name / Company / Email /   │ alvos ≥ 48
│ Mobile +61 / 4 blocos 2×2  │
│ [Botão ▮]                  │
│ ::|::|::|::|:: horizonte   │
├────────────────────────────┤
│ H2                         │ A NOITE (tempo de baixo para cima)
│   08:00 ● lead             │ palco ≤ 1,5 tela
│  ·  · ░▓█▓░ crista ↑  "…"  │ ≤ 3 rótulos à direita
│   18:00                    │
├────────────────────────────┤
│ H2                         │ ESCRITÓRIO
│ [render retrato, 80svh]    │
│ balão 1 → 2 → 3 (abaixo)   │
├────────────────────────────┤
│ H2 (centrado)              │ VOCÊ (a única seção centrada)
│     ┌──────────┐           │
│     │  ordem   │ ↑ luz     │
│     │[Approve] │           │
│     └────▲─────┘ feixes    │
├────────────────────────────┤
│ DAY 34                     │ 90 DIAS (linha vertical)
│ Reception ── ▲ dia 1       │
│ Follow-up ── ▲ dia 7 …     │
├────────────────────────────┤
│ FAQ (details)              │
├────────────────────────────┤
│ ▲ chapado cortado          │ FINAL
│ H2 · campos · [Botão]      │
│ rodapé                     │
└────────────────────────────┘
```

---

## 6. Pedidos

### 6.1 Ao type-director (papéis; você escolhe as famílias e verifica as licenças)
**Opinião:** o par Archivo ExtraCondensed + Source Serif 4 foi feito para o "relatório impresso" e sai junto com ele. A condensada de caixa alta é voz de anúncio esportivo e, ao lado da luz, aperta o que precisa de ar; a serifa de texto era a do "documento", e o conceito novo não tem documento. A luz é a protagonista, e o tipo precisa ser **calmo, grande, preciso e de uma família só**.

Papéis:
1. **Display do gancho (H1)**, ≥ 7vw a 1440 e ≤ 2 linhas a 390 (~40–48 px). Peso médio-leve (o impacto vem do tamanho, não do negrito), caixa alta **ou** caixa normal (decida pelo que cabe em 2 linhas a 390; o gancho com o "$" e os algarismos é o teste). Os algarismos e o "$" precisam ser bem desenhados; o "$250K" é o momento tipográfico.
2. **O número dos 90 dias** (o maior tamanho depois do H1, algarismos tabulares, sem pular de largura ao contar).
3. **H2** (≤ 2 linhas, ≤ 26 caracteres por linha) e **H3/pergunta do FAQ**.
4. **Texto** a 16–18 px no quase-preto (APCA Lc ≥ 75 no `ink`, ≥ 60 no `ink-2`) e **rótulo de dado** dentro das cenas (13–15 px, legível sobre a luz pontilhada, **sem mono**, tabular).
5. **Caráter desejado:** alguma aresta que converse com o triângulo (terminais retos, cortes em ângulo, um "A" e um "V" pontudos) sem virar fonte temática (B9).

Evitar, por serem a voz padrão da categoria ou de uma referência: DM Sans (é o jimo), Geist e Geist Mono (Vercel), Inter, Space Grotesk, Montserrat, Barlow (v2). No máximo 2 famílias, e o ideal é 1. Variável e com subset Latin ≤ 45 KB woff2 por arquivo. Entregue o `tipografia-v4.md` com a escala a 1440, 768 e 390, a prova do H1 em 2 linhas a 390 e o APCA do texto sobre `ground` e sobre a luz no pior pixel.

### 6.2 Ao copy-director (função e tamanho; o texto é seu)
- **Corte geral:** a página inteira com ≤ 260 palavras visíveis na 1ª pintura. A voz continua a da copy v4.1 §1 (funcionário com cargo, hora concreta, "desk / approve / follow-up", nunca "solution").
- **Hero:** o H1 é o gancho de $250K/90 dias (a forma é livre; ≤ 2 linhas a 390 com a fonte nova; manter a variante B partida como ponto de partida) + 1 frase de apoio ≤ 18 palavras (o quê + você aprova) + o CTA (2–4 palavras, "Build my AI office" continua bom) + a prova A$10M+ ≤ 8 palavras, só se comprovada. Os nomes dos 6 cargos para o hover (≤ 3 palavras).
- **Formulário:** H2 ≤ 7 palavras + apoio ≤ 16 palavras. Rótulos, erros e privacidade como na v4.1 (já aprovados).
- **A noite:** H2 ≤ 6 palavras (a ideia: enquanto você dorme). **8 a 10 rótulos de dado** no formato "hora · ação · detalhe" (≤ 4 palavras, plausíveis para indústria/B2B australiano: cotação, PO, fatura, follow-up, enquiry; sem nome de empresa).
- **O escritório:** H2 (a frase do anúncio, para o reconhecimento) + **3 trocas de diálogo** entre mesas (≤ 7 palavras cada fala, uma pergunta e uma resposta com hora).
- **Você:** H2 ≤ 7 palavras + 1 frase ≤ 12. Três ordens de serviço cortadas: o que o agente quer fazer (≤ 10 palavras), o porquê (1 frase ≤ 14), a prévia (≤ 20) e os textos dos 9 estados (reaproveite os da v4.1).
- **90 dias:** H2 ≤ 6 palavras + 6 nomes de mesa (1–2 palavras) + o dia de cada uma (**marcado "modelo" até o dono confirmar**).
- **FAQ:** 4–5 perguntas (≤ 8 palavras) e respostas (≤ 35 palavras), as que tratam objeção real: aprovação, dados, preço, integração, prazo.
- **Final:** H2 ≤ 6 palavras + o botão.
- **Proibido:** número de negócio inventado, nome de cliente, depoimento, "AI-powered" e toda a lista da v4.1.

### 6.3 Ao frontend-studio (motion com intenção, orçamento e fallbacks)
Cada motion abaixo tem a frase "o que aconteceu" que o júri vai cobrar:

| Motion | O que aconteceu (a frase) | Gatilho | Reduced / sem WebGL |
|---|---|---|---|
| Intro | "Os pontos montaram o logo e viraram a rede" | load, 1ª visita | não existe |
| Rede | "O trabalho corre dos agentes para os cérebros e chega em você" | contínuo **enquanto visível**, e para fora da tela | pôster |
| Queda (E2) | "A rede desceu e virou a grade da sua operação" | rolagem | corte seco |
| Horizonte | "Cada campo que preenchi acendeu uma luz" | validação do campo | os feixes aparecem sem subir |
| Crista | "A noite passou e o trabalho foi aparecendo" | rolagem (palco preso) | pôster + 3 rótulos |
| Lead (F7) | "Aquele pedido das 02:14 chegou até o telefone" | rolagem | não existe |
| Maquete | "A câmera se aproximou da equipe" | em vista | pôster |
| Diálogo | "O follow-up perguntou e o bookkeeper respondeu" | em vista, um balão por vez | todos estáticos |
| O sim | "Eu aprovei e a luz saiu" | clique/toque | a troca de estado sem viagem |
| 90 dias | "As mesas ligaram uma a uma até o dia 90" | rolagem (palco preso) | o dia 90 direto |
| Subida final | "O logo subiu do horizonte" | rolagem | o logo parado |

Mais a camada básica da skill: entradas por parte de cada seção (60–90 ms de defasagem, 16–32 px, uma vez) e feedback em todo controle. Só `transform`/`opacity` no DOM.

---

## 7. Técnica e orçamento (para o frontend-studio)

### 7.1 O motor: um canvas, um contexto, shader nosso
- **Um único `<canvas>` WebGL2 fixo atrás da página** (`position: fixed`, `pointer-events: none` salvo na rede do hero), com as cenas como **estados** do mesmo renderer, trocadas pela posição da rolagem, e `scissor`/viewport por seção quando duas cenas convivem. Isso evita o limite de contextos do WebKit (o jimo usa 18–20 canvases), mantém um só pool de memória e deixa uma só coisa para pausar.
- **Biblioteca: OGL** (WebGL mínimo, ordem de 10–15 KB gz a medir), ou WebGL2 cru. **Não usar three/R3F**: three fica na ordem de 150 KB gz e o R3F soma mais, para quatro cenas que são pontos + quads de tela cheia. Recursos que bastam: `GL_POINTS` instanciados (a rede, ~8–12 mil pontos a 1440 e ~4–6 mil a 390; a grade, 120×60 a 1440 e 60×40 a 390) e quads com fragment shader (feixes, horizonte, dither).
- **Dither:** textura de ruído azul 64×64 (PNG de ~4 KB) ou Bayer 4×4 no fragment, amostrada em **coordenada de pixel CSS** (`gl_FragCoord / dpr`) para não haver moiré quando o DPR muda. A luz é renderizada num buffer de meia resolução e **ampliada com `NEAREST`** (o ponto do dither fica duro e o custo de fill cai a 1/4). Sem textura float linear (o iOS não tem `OES_texture_float_linear`): RGBA8 ou half-float sem filtro.
- **Texto nunca no GL.** Os rótulos da onda, os nomes dos agentes e os balões são DOM posicionado pela projeção (acessível, traduzível, nítido), atualizados no máximo a 30 Hz e no máximo 5 por vez.
- **Carga:** o H1 é o LCP e é texto. O motor é `import()` dinâmico **depois do LCP** (no `requestIdleCallback` ou em ~1,2 s, o que vier antes). Até lá, o hero mostra o pôster AVIF da rede (a mesma composição, para não haver salto). Com `Save-Data`, `deviceMemory ≤ 2` ou falha no `getContext('webgl2')`, ficam os pôsteres e o motor nem baixa.
- **Execução:** o RAF só roda com uma cena visível (`IntersectionObserver`) e com a aba ativa; DPR ≤ 1,5 no celular e ≤ 2 no desktop; queda automática de qualidade (menos pontos, 30 fps) se a média de frame passar de 20 ms por 1 s; `webglcontextlost` volta aos pôsteres, com uma tentativa de recriar. Meta: ≤ 4 ms de GPU por quadro num iPhone 12 e ≥ 50 fps nele, dentro do navegador do Instagram.
- **Navegador do Instagram:** o `svh` muda com a rolagem (memória `instagram-svh-muda-na-rolagem`). Os palcos presos usam a altura congelada no 1º toque (o padrão `useTelaFixa` da landing do Produzze).

### 7.2 O que é pré-renderizado
| Asset | Ferramenta | Formato e peso (celular) |
|---|---|---|
| Pôster da rede (LCP-safe e fallback) | captura do próprio motor (determinística, seed fixa) | AVIF 1440×900 ≤ 70 KB · 780×900 ≤ 45 KB |
| Pôster da noite, do sim e dos 90 dias | captura do motor | AVIF ≤ 40 KB cada, `loading="lazy"` |
| Maquete: loop de 6–8 s | **Blender** (`render/brandup_hq.blend`), com o render revisado (§5.4) | H.264 **yuv420p** High (nunca 4:4:4: memória `mp4-444-webkit-nao-toca`), `-g` 30, sem áudio, `muted playsinline`, `preload="none"`; 1280×720 ≤ 1,6 MB · 720×960 ≤ 0,9 MB; pôster AVIF ≤ 90 KB |

### 7.3 IA generativa (Higgsfield, quando conectar): onde ajuda e onde vira slop
- **Ajuda (fora da produção):** gerar **20–30 variações de composição de luz** (feixes, horizonte, convergência) como mood board para o dono escolher antes de escrevermos o shader. É barato e acelera a decisão.
- **Pode ajudar (teste com portão):** um image-to-video de 4 s **com a câmera travada** sobre o render da maquete, para o gesto dos bonecos "conversando". O portão é duro: comparação quadro a quadro com o render-fonte, e **qualquer deformação** de mesa, parede ou figura reprova (a deformação é a assinatura de vídeo de IA). Se reprovar, o gesto sai do Blender (dois ou três bonecos com rotação de cabeça/tronco por keyframe) ou não existe.
- **Vira slop (proibido):** gerar o escritório, as pessoas ou os bonecos do zero ("AI office" é a imagem padrão, júri v3 §5.1); gerar a rede ou a luz como vídeo (perde o portador, o dither e a interação); qualquer imagem com texto, UI ou logo; qualquer "foto" de cliente ou de equipe.

### 7.4 Orçamento por seção (celular, pela rede, comprimido)
| Seção | Antes da interação | Depois (lazy) |
|---|---|---|
| HTML + CSS + JS da página (React atual) | ≤ 110 KB | — |
| Fonte (1 família variável, subset) | ≤ 45 KB (preload só do arquivo do H1) | 2º eixo/itálico, se houver, ≤ 30 KB |
| Hero (pôster) | ≤ 45 KB | motor ≤ 35 KB (OGL + cenas + shaders) + ruído 4 KB |
| Formulário | 0 (é DOM) | — |
| A noite | — | pôster 40 KB (só no reduced) |
| Escritório | — | pôster 90 KB + vídeo 0,9 MB (só em vista) |
| Você / 90 dias / final | — | pôsteres ≤ 40 KB cada (só no reduced) |
| **Total até o LCP** | **≤ 200 KB** | |
| **Total até o formulário 1 utilizável** | **≤ 350 KB** | |

**Metas medidas** (Lighthouse mobile + WebPageTest, Moto G Power em 4G, e um iPhone real no navegador do Instagram): LCP ≤ 2,0 s; INP ≤ 200 ms; CLS = 0 (o pôster e o canvas têm a caixa reservada); sem tarefa longa > 50 ms vinda do motor no celular; o formulário utilizável antes de o motor terminar de carregar.

### 7.5 Fallbacks (todos desenhados, não improvisados)
- **`prefers-reduced-motion`:** sem intro; cada cena vira o pôster do estado final + o mesmo texto; o sim troca o estado sem viagem; os palcos presos viram seções normais (a altura cai: noite e 90 dias com 1 tela cada).
- **Sem WebGL ou contexto perdido:** idêntico ao reduced, mas com as entradas DOM normais.
- **Sem JS:** o HTML tem o H1, o apoio, o CTA, o formulário (o `action` atual), os pôsteres como `<img>`, as 3 ordens estáticas e o FAQ em `<details>`.
- **Vídeo falhou:** o pôster fica.

---

## 8. Processo: protótipo vivo, Figma só para storyboard

Uma página com este nível de shader e motion **não se avalia parada**: o júri v3 já registrou que um mock estático não passa de ~62 no FWA e que a taste aplica o teto de "página parada". A sequência que recomendo:

1. **Storyboard no Figma (figma-architect, ½ dia).** São quadros-chave, não páginas: 3 quadros por cena (início, meio, repouso) a 1440 e a 390, com a composição, a zona escura do título e onde cada rótulo aparece. Serve para o dono e o júri acertarem a composição antes do código, e para o teste de sobreposição com o jimo (§9, item 9). Não é avaliado com nota.
2. **Laboratório de shader (frontend-studio, 1–2 dias).** Uma entrada separada do Vite (`proto.html`, multi-page) na branch `redesign/b2b-ai-office`, **sem tocar no `App.tsx` de produção** (a `main` publica no GitHub Pages a cada push). As quatro cenas isoladas, com controles de uniform (dither, franja, densidade) para o dono "ver o efeito", como ele prefere. Medir fps e tempo de GPU no iPhone real dentro do Instagram **antes** de montar a página. Se a rede não bater ≥ 50 fps no iPhone 12, cortar pontos antes de cortar a ideia.
3. **Página em tons de cinza com os pôsteres (sem motion).** O texto final e os pôsteres. Passa no `inspect.mjs` (0 FAIL em 1440/768/390) e no `lint.mjs`. Se a página parada não segurar como pôster, o motion não vai salvar.
4. **Motion e cenas.** O `scenes.mjs` fotografa cada palco de 0 a 100% (desktop, celular e reduced).
5. **Avaliação.** O `design-jury` julga **a página no ar** (um preview: `vite build && vite preview` exposto, ou um deploy de preview), com:
   - gravações em vídeo do Playwright em **webkit e chromium** a 1440 e 390 e uma gravação de tela do iPhone real;
   - as folhas do `scenes.mjs`, o relatório do `inspect.mjs` e o Lighthouse mobile;
   - as bancas Awwwards (júri principal + Developer Award, que agora se aplica) e FWA, além da taste em modo crítica sobre as gravações.

   **Limite honesto do instrumento:** o `inspect.mjs` mede gradiente e sombra no CSS e **não enxerga os pixels do canvas**, então não pega o glow da luz do shader. Por isso o critério do §9 tem um teste de luz próprio, por amostragem de pixels nas capturas das cenas e com os quadros julgados pelo júri. Não usar `--allow gradient`: no DOM, o gradiente continua zero.

---

## 9. Critério objetivo de "não é slop" para a v4 (todas precisam passar; uma falha reprova)

| # | Critério | Como medir |
|---|---|---|
| 1 | **O vocabulário do v3 segue zero:** mono, pílula, caixa de contorno de 1 px, stat row, eyebrow, caixa alta < 20 px, cartão com ícone, emoji, palavra estilizada, glass, sombra e gradiente CSS | `lint.mjs` + `inspect.mjs` (0 FAIL, nenhum `--allow` de gradiente/sombra) + conferência visual |
| 2 | **Teste do portador:** em 10 quadros por cena, toda região luminosa > 1% da tela é um ponto, um feixe, uma crista ou uma subida, e o júri escreve o nome de cada uma | quadros do `scenes.mjs`, tabela no relatório do júri |
| 3 | **O título fica no escuro:** a luminância média na caixa do H1/H2 + 48 px fica ≤ L* 12 em todos os quadros | script de pixel sobre as capturas |
| 4 | **Nenhuma tela roxa:** nenhum campo de roxo **chapado** (matiz 265–290°, variância baixa) maior que o botão; a área roxa total (luz incluída) fica ≤ 35% de qualquer viewport | script de pixel por viewport |
| 5 | **Grão, não bloom:** nas regiões luminosas, a estrutura de dither é visível a 100% (desvio local de luminância acima de um limiar em janelas de 8×8) e não há desfoque gaussiano | script + recorte a 100% no relatório |
| 6 | **Pouco texto:** ≤ 25 palavras visíveis por seção (fora os campos e as perguntas do FAQ) e ≤ 260 na página com o FAQ fechado | script de contagem de nós de texto visíveis |
| 7 | **Cada representação de agente aparece uma vez** (§4), e nenhuma seção repete a planta da vizinha | conferência do júri nas capturas |
| 8 | **Cada motion tem a sua frase** "o que aconteceu" (§6.3), escrita pelo júri sem ler o brief; nenhum movimento perpétuo fora da tela | relatório do júri + checagem de que o RAF para fora de vista |
| 9 | **Teste de sobreposição com o jimo:** o storyboard e as capturas, lado a lado com os quadros do `jimo-3d.mov` (6, 25, 36–48, 52–60 s) e com `w-07/w-14`, sem disposição nem sequência sobrepostas. Em especial: nenhum H2 centrado sobre um campo de balões, nenhum número de título contando, nenhum app inclinado sobre uma grade, nenhum mascote e nenhum mergulho de câmera | figma-architect anexa a prancha; o júri decide |
| 10 | **Desempenho:** LCP ≤ 2,0 s (mobile, 4G); ≤ 200 KB até o LCP; CLS 0; ≥ 50 fps no iPhone 12 dentro do Instagram; o formulário utilizável antes do motor | Lighthouse + WebPageTest + aparelho real |
| 11 | **Fallbacks completos:** reduced motion, sem WebGL e sem JS com o mesmo conteúdo e nenhuma seção vazia | `inspect.mjs` (reduced) + teste manual com o WebGL desligado |
| 12 | **Notas:** taste ≥ 8,0 · Awwwards ≥ 7,2 · FWA ≥ 70 | design-jury sobre a página no ar |

Abaixo das notas, a peça volta para o ui-ux-director, e não para remendo (mesma regra do v3).

---

## 10. Riscos

- **Safari/WebKit:**
  - O limite de contextos é resolvido pelo canvas único.
  - Não há float linear (RGBA8/half-float).
  - Vídeo + canvas sem composição por `source-in` (memória `safari-source-in-ignora-video`).
  - O `backdrop-filter` não é usado.
  - Testar o `webglcontextlost` no iOS, que mata o contexto ao trocar de app.
- **Navegador do Instagram/Facebook:** `svh` instável (altura congelada), memória mais baixa (queda de qualidade automática) e risco de o motor ser morto (os pôsteres seguram a página). É o caminho principal do tráfego, então é **o** teste, não um extra.
- **Celular:**
  - Dois palcos presos no máximo (a noite e os 90 dias, ≤ 1,5 tela cada a 390).
  - O CTA na 1ª tela.
  - O formulário logo depois do hero, sem cena presa no meio.
  - Bateria: nada roda fora de vista.
- **Peso:** o vídeo da maquete é o maior item (0,9 MB) e só baixa em vista. Se o orçamento estourar, a maquete vira still + balões.
- **Acessibilidade:**
  - O canvas tem `aria-hidden` e toda informação existe em DOM.
  - A rede tem botões com nome; o sim funciona por teclado.
  - O foco é visível sobre a luz (anel sólido `ink`, não roxo).
  - Rótulo de 13–15 px sobre a luz: APCA no pior pixel; se não passar, o rótulo ganha uma placa `ground` sólida.
  - O dither pode incomodar fotossensíveis se piscar, então **nada pisca acima de 3 Hz**.
- **Produção de asset:**
  - O render da maquete ainda tem bonecos de cabeça de bola (o júri v3 reprovou; a v2 da pasta não mudou isso, pelo que vi em `desk-followup.png`): precisa da revisão da §5.4.
  - O gesto "conversando" é o item mais caro e o mais arriscado; ele é opcional (os balões em HTML carregam o diálogo sem gesto).
- **Conteúdo e jurídico:**
  - O plano de 90 dias e a prova A$10M+ dependem do dono (as seções saem se não houver dado).
  - As faixas de faturamento estão presas ao `revenueGrade()`.
  - O gancho de $250K é fixo de negócio, mas a ACCC pede que ele seja defensável: não reforçar a promessa com nenhuma calculadora.
- **Taste × pedido do dono:** a casa da skill proíbe glow e violeta. O que defende a v4 é o §2.3 **provado** pelos critérios 2–5. Se o júri ainda ler "glow de SaaS de IA" com os critérios passando, a alavanca é **menos luz** (densidade e área), não mais efeito.
- **Previsão honesta:** com o motion bem executado, o teto realista é Awwwards 7,3–7,6 e FWA 68–72. O FWA é onde a técnica nova mais pesa (o júri v3 deu 55 ao técnico de WebGL justamente por não haver técnica).
