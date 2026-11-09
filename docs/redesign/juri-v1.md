# Júri v1: mock no Figma do redesign da landing da BrandUp

Júri: design-jury (Awwwards júri principal + FWA; o Developer Award não se aplica) · 08/11/2026
Peça: mock estático no Figma (ainda sem código). Capturas avaliadas: `figma-capturas/desktop-1440-full.png` (1440×6960), `mobile-390-full.png` (390×6091), `states-full.png` (2440×2392).
Recortes usados como evidência: `docs/redesign/juri-v1-fotos/` (d-0…d-7 = desktop em fatias de 900 px a cada 870 px; mob-A/mob-B = celular em fatias de 1000 px lado a lado; states-1700.png; m-colisao-hero.png; jimo-*.png).
Coordenadas: **(x, y) na captura inteira**, salvo indicação.
Régua: `~/.claude/design-library/juri/criterios-awwwards-fwa.md`, o brief `brief-direcao.md`, `copy.md` v2, `tipografia.md` e a skill `design-taste-frontend` (modo crítica).
O que não foi penalizado, a pedido: o acabamento do render (quadros da propaganda como placeholder) e o texto dos depoimentos. O desenho deles foi avaliado.

---

## 1. Veredito

| Prêmio | Resultado | Nota |
|---|---|---|
| Awwwards Honorable Mention (≥ 6,5) | **Não** | **5,0** / 10 |
| Nível SOTD (~7,2+) | **Não** | idem |
| Awwwards Developer Award | **Não se aplica.** Não há código, então não há WPO, semântica, markup nem frame-rate para medir | — |
| FWA FOTD (≥ 70) | **Não** | **51** / 100 |
| Taste skill (crítica, com os tetos) | Reprovado nos tetos de eyebrow, mono, numeração, hairline e tela vazia | **5,1** |

Em uma frase: o conceito do brief ("a maquete da sua empresa, funcionando") é bom e a primeira dobra é competente, mas o mock entrega uma fração dele. Aparecem 3 placas das 7, uma parada do tour das 7, nenhum traço nem pacote, e a fila de aprovação existe só no frame de estados. Por cima disso há uma dúzia de defeitos objetivos (texto cortado, campos inflados, resposta errada no FAQ, texto vazando sobre a imagem) que um jurado nota em segundos. Hoje ele está abaixo de um site "limpo e competente" (5,5–6,4) por causa desses defeitos, e não por falta de ideia.

---

## 2. Defeitos objetivos (confirmados ou refutados)

| # | Defeito apontado | Veredito | Evidência |
|---|---|---|---|
| 1 | **Campos altos demais** | **CONFIRMADO** | Desktop: cada campo tem **100 px** de altura, em (856–1096, 1249–1349), d-1. No frame de estados o mesmo `Field` tem cerca de 36 px, e o alvo do brief é 56. No formulário final (d-7) são 100 px × **240 px de largura**. Celular: 100 px de altura (mob-A, 2ª coluna). As telas não usam a instância do componente: caixas vazias, sem placeholder e sem o chip `+61`. |
| 2 | **Texto cortado** | **CONFIRMADO, 9 lugares** | (a) A linha de privacidade "…Read our privacy polic" em (1376, 1663), d-1. (b) A mesma linha no formulário final, "…to your enqu", em (1108, 6674), d-7. (c) O chip "Above $1M" cortado em (1105, 6557), d-7. (d) O `DeskPanel`: "until it becomes" e "price i" cortados na borda (1376, 2970) e (1376, 3161), d-3, com repetição a 390 em (370, 2970) e (370, 3159). (e) O "$250K" do trio de números sai da tela a 390, em (380, 456), mob-A. (f) Os chips a 390: "$300K–$1M" cortado e "Above $1M" invisível, em (370, 1832). (g) A régua "24" da noite cortada e o cartão colado na borda direita a 390, em (370, 4629), mob-B. (h) O rodapé a 390: "…companies in A", em (390, 5920), mob-B. (i) O estado success: "Thanks, your details are" e "…business hou" cortados, em states-full ≈ (1855–2375, 752). |
| 3 | **Texto duplicado nos passos** | **CONFIRMADO** | O passo 02 repete o corpo do passo 01 ("in this form. Your data is kept safe and only used to contact you.") em y 1592 e y 1685, d-1. Além disso, a versão longa foi partida no lugar errado: o título "Share your information" + o corpo "in this form…" lê como frase quebrada, e o passo 02 perdeu "a specialist calls you directly". A 390 os passos de uma linha estão certos (mob-A, y ≈ 1120 e 1160). |
| 4 | **Destaque roxo do gancho ausente** | **CONFIRMADO** | "OVER $250K PER MONTH" em (64–508, 200–245), d-0, sai em branco liso, sem o campo `brand.500`; a 390 é igual, em (20–360, 155–190). Esse é o elemento nº 1 da ordem de leitura do brief (§5.2) e a rima com o anúncio. O mesmo vale para o `<strong>` 700 do H2 do Notice ("Do not leave now!", "sell more."), que está ausente (d-1, y 1220–1510). |
| 5 | **Placas repetidas** | **CONFIRMADO** | "YOUR FOLLOW-UP · 12 leads followed up" em (124, 688) e "YOUR FOLLOW-UP · 12 leads today" em (584, 718), d-0: o mesmo agente duas vezes, com leituras que se contradizem. Há 3 placas das 7 pedidas; Marketing, Social, Service, Bookkeeper e Reports não aparecem. Não há traços nem pacotes (E5), nem como quadro parado. A 390 há 1 placa das 3 pedidas, em (40, 770). |
| 6 | Texto vazando sobre a imagem (colisão) | **CONFIRMADO** (novo) | A 390, um texto branco de ~30 px ("This employ…", o H2 do tour) atravessa a base do render do hero e é cortado pela faixa roxa, em (95–250, 935–1014). Ver `m-colisao-hero.png`. Na régua da taste, algo por cima de um título trava Usability em 6. |
| 7 | FAQ com a resposta errada | **CONFIRMADO** (novo) | A 390, a pergunta "How long until I see results?" mostra a resposta de "Will the AI act without my approval?", e ainda truncada ("…which actions answering a common enquiry, and which wait for or a price"), em (20–370, 4050–4127), mob-B. No desktop a resposta está certa (d-5). |
| 8 | Formulário final mal montado | **CONFIRMADO** (novo) | A variante `compact` tem campos de 240 px numa coluna de ~650. A margem esquerda do formulário (x 768) não alinha com a do H2 (x 728). À esquerda fica um vão de ~660×870 px (x 64–728, y 5980–6850), d-7. É a tela mais fraca da página, justamente na conversão final. |
| 9 | Chip pré-selecionado no estado idle | **CONFIRMADO** (novo) | "$100K–$300K" aparece selecionado em todos os formulários (d-1, d-7, mob-A, states). O idle do brief é "nenhum". Isso enviesa a resposta e mascara o erro "Choose a range". Os chips têm cerca de 30 px de altura, abaixo dos 44 de alvo (d-1, y ≈ 1530). |
| 10 | Eyebrow duplicado no tour | **CONFIRMADO** (novo) | A barra "LIVE OFFICE · ● EXAMPLE ACTIVITY … AEST 14:32" aparece em y 2597 (d-2), e logo abaixo vem outro eyebrow "LIVE OFFICE", em y 2654 (d-3). |
| 11 | Tour reduzido a 1 parada | **CONFIRMADO** (novo) | Só aparece a parada Follow-up (d-3). Sem Bookkeeper e sem a parada **YOU** com a fila (o clímax do brief §5.5). O painel não tem o `ApprovalCard` (11:48 sem Approve/Edit/Decline). A planta miniatura é uma grade genérica 3×3 de 66 px, em (80–146, 3329–3395), e não a planta com as mesas na posição real (A2). Sob o painel sobra um buraco de 236 px (y 3192–3428). |
| 12 | Mensagens de erro copiadas | **CONFIRMADO** (novo) | "Enter an Australian mobile, like 412 345 678." aparece sob Name, Work email e Monthly revenue, em states-full ≈ y 445–478. |
| 13 | Rótulos inconsistentes | **CONFIRMADO** (novo) | As telas dizem "Email" e "Mobile"; os estados dizem "Work email" e "Mobile" com `+61`. O copy pede "Mobile (WhatsApp)". |
| 14 | Frames ausentes | **CONFIRMADO** | Faltam a `StickyCTA` a 390, a nav `scrolled`, os estados da `AgentPlate` (working / needs-approval / night), o `Field` disabled, o hover e o foco do `TestimonialCard` e os controles do trilho (01/02, ←/→). O reduced-motion do tour existe só como nota de texto, sem desenho (states, rodapé). O hover e o foco do FAQ quase não se distinguem do fechado (states, bloco FAQITEM). |
| 15 | Tela de gancho/intro | **LACUNA** | Não existe. Ver §6. |

---

## 3. Banca 1: Awwwards, júri principal (6 jurados × 4 critérios)

Descarte de 1 nota por critério: a mais distante da média, como no Awwwards.

| Critério (peso) | Dir. de arte | Líder de UX | Creative tech | Tipógrafo | Conteúdo | A11y/perf | Descartada | **Média** |
|---|---|---|---|---|---|---|---|---|
| Design (40%) | 4,5 | 5,0 | 5,0 | 4,5 | ~~5,5~~ | 5,0 | 5,5 | **4,8** |
| Usability (30%) | 5,5 | 4,5 | 5,0 | 5,0 | 5,5 | ~~4,0~~ | 4,0 | **5,1** |
| Creativity (20%) | 5,5 | 5,0 | 4,5 | 5,0 | ~~6,0~~ | 5,0 | 6,0 | **5,0** |
| Content (10%) | 6,0 | 5,5 | 6,0 | 5,5 | ~~5,0~~ | 6,0 | 5,0 | **5,8** |

**Ponderada: 0,4·4,8 + 0,3·5,1 + 0,2·5,0 + 0,1·5,8 = 5,03 → 5,0**

Justificativas, com a evidência:
- **Design 4,8.** A primeira dobra (d-0) tem hierarquia correta: o gancho condensado 800, o CTA menta, os números e o render entrando acima da dobra. A partir dela o sistema se desfaz:
  - Sem o destaque roxo, o gancho perde o único contraste de marca (#4).
  - Há 9 cortes de texto (#2) e campos inflados (#1).
  - Há telas quase vazias: os depoimentos ocupam 9 das 12 colunas, com um vão em (1072–1376, 2176–2366); depois do FAQ sobram 258 px vazios (y 5302–5560); o formulário final tem um vão de meia tela (#8).
  - Os H2 têm 4 a 6 linhas: Notice com 6 em y 1220–1510, Live office com 4, About com 4, FAQ com 4.
  - Quatro seções seguidas são "split à esquerda + vazio": Testimonials, About, FAQ e Final.
  - O tipógrafo nota que a escala funciona, que a Barlow Condensed 800 segura o gancho e que a Montserrat 500 nos H2 está correta, mas os H2 longos derrubam a peça.
- **Usability 5,1.** O que sobe: CTA e números visíveis a 1440×900 (d-0, y 443–603), o CTA do hero a 390 em y 365–425, bem acima da dobra do Instagram (~700), o formulário começando cerca de 255 px depois do início da faixa roxa a 390 (resolve o problema 1 do brief) e os rótulos visíveis. O que desce: a colisão (#6), a resposta errada no FAQ (#7), os chips invisíveis a 390 (#2f: a pessoa não vê "Above $1M"), os chips de 30 px, o chip pré-selecionado e a barra fixa ausente. O jurado de a11y deu 4,0 por causa dos alvos e do texto cortado; essa nota foi a descartada.
- **Creativity 5,0.** No papel, a ideia é própria (maquete + placas + aprovação + noite que rima). No mock ela não chega: sobram 3 placas, 1 parada, a planta genérica, nenhum traço e a fila YOU só nos estados. Do jeito que está, é um "render bonito + landing de formulário". O jurado de conteúdo deu 6,0 pela ideia escrita; foi a nota descartada.
- **Content 5,8.** A copy é específica e na voz: "Sydney 02:14", "14 leads followed up", "Approved. Reminders sent to 3 clients.", "You approve:" por agente (d-4) e valores em AUD. Pesam contra: o passo duplicado (#3), a resposta trocada (#7), o erro copiado (#12) e "Over 10 million in sales" sem a moeda (d-0, y 373).

---

## 4. Skill `design-taste-frontend` (crítica de landing, look-and-fix sobre as capturas)

```
ROUND 1 (crítica, sem correção: é júri)
Seen in one second: o render do escritório e o bloco de caixa alta. Depois, a faixa roxa.
Idea (one sentence): "A maquete da sua empresa, funcionando": cada mesa é um agente, e você aprova da sua sala.
                     Escrita no brief, só parcialmente visível no mock.
Live thing: nenhum no mock. O candidato óbvio é o ApprovalCard clicável (Approve muda o estado), mas ele está
            só no frame de estados.
Layout words: hero=statement+full-bleed / notice=split / testimonials=row-of-cards / live office=split(img+painel)
              / glance=list / about=split-texto / faq=split / final=split / footer=bar
Scores: design 5 · usability 5 · creativity 5 · content 5,5 → overall 5,1
Caps aplicados:
  - eyebrows mono em toda seção (TESTIMONIALS, LIVE OFFICE, ABOUT US, FREQUENTLY ASKED QUESTIONS, OFFICE THAT
    NEVER CLOSES) + 01/02 + hairlines visíveis → overall ≤ 6,5
  - duas ou mais telas desktop majoritariamente vazias (d-2 inferior, d-7) → design ≤ 6,5
  - algo por cima de título (#6) → usability ≤ 6
  - conteúdo cortado fora da tela (#2) → usability ≤ 5
  - sem "live thing" → creativity ≤ 7,5
  - competitor test: "um escritório isométrico de agentes" passa para outra agência de IA → creativity ≤ 7
Top 3 (o mais visível primeiro):
 1. A tela final (d-7) é um formulário de 240 px de largura numa coluna, com meia tela vazia à esquerda e o texto
    cortado. Fix: o LeadForm `compact` ocupando cols 8-12 inteiras, com a maquete noturna crescendo para preencher
    cols 1-7 até a base do formulário.
 2. O hero não tem o destaque roxo e repete a placa do Follow-up. Fix: o campo `brand.500` atrás de "OVER $250K PER
    MONTH" e 7 placas distintas, com 2 traços e 1 pacote parados.
 3. O tour mostra 1 parada e o painel cortado. Fix: desenhar 3 paradas (Follow-up, Bookkeeper, YOU com a fila), com
    o painel inteiro e a planta real.
```

**O que a taste reprova como slop ou genérico** (com a posição do júri sobre cada um):
1. **Eyebrows mono em caixa alta e espaçados acima de todo H2** (d-2 y 1946, d-3 y 2654, d-4 y 4253, d-5 y 4917, d-6 y 5566). É o tique nº 1 do registro: reprovado. *Tensão*: a regra do dono e a `tipografia.md` mantêm o "mono como voz de dado". O júri fica com o meio-termo: mono **só no dado** (placas, hora, AUD, a régua de 24 h, a etiqueta de setor) e **nenhum eyebrow de seção**. A informação do eyebrow vai para o H2 ou sai.
2. **Numeração 01/02** nos passos do Notice (d-1, y 1539 e 1632). Reprovada pela taste. No celular ela ajuda a ler o "o que acontece depois"; trocar por uma lista `<ol>` com o número no peso do texto, não em mono de 11 px.
3. **Fileira de 3 cartões idênticos** nos depoimentos (d-2, y 2176–2366), com aspas decorativas em roxo. Reprovada como "row of identical cards". O placeholder é aceito, mas o *desenho* do cartão não mostra os slots (nome, cargo, setor em mono, linha de resultado), então não dá para julgar o cartão final.
4. **Hairlines em todo lugar**: a lista do glance (d-4), o FAQ (d-5) e o rodapé (y 6853). A taste proíbe; a regra do dono permite hairline. Na lista e no FAQ ela é estrutura (aceitável); no rodapé é ornamento.
5. **Roxo/violeta** está na lista de "assistant palette" da taste, mas é a cor do logo e da propaganda. Fica com `--allow`, como a própria skill prevê para marca. Não penalizado.
6. **Botão de raio "soft" de 8 px** (d-0, CTA), que a taste lista como o padrão de site fraco. É gosto, não defeito: sem impacto na nota.
7. **Composição "split à esquerda + vazio à direita" repetida 4 vezes** (Testimonials, About, FAQ, Final). É o template aparecendo pela repetição, mais do que por qualquer peça isolada.
8. **O que a taste NÃO reprova** (está no nível dela): nada de gradiente, de sombra roxa difusa, de glass ou de emoji; o acento menta é disciplinado (1 CTA + o número-chave por tela, d-0); o campo de cor inteiro da faixa roxa (d-1) é exatamente o "field of flat colour" que ela recomenda.

---

## 5. Comparação com a referência: jimo.ai

Fotografado com Playwright/chromium a 1440×900: `jimo-d-0.png` (hero), `jimo-d-1.png` (o fragmento de produto "Answers"), `jimo-d-2.png` (Train/Design/Act, pego no meio da entrada). A página tem cerca de 23.800 px de altura. A 390 foram feitas `jimo-m-0..2.png`, que não abri. O banner de cookies cobre a base das fotos. Não verifiquei prêmios do jimo e não afirmo nenhum.

| Eixo | jimo.ai | BrandUp mock v1 | Distância |
|---|---|---|---|
| Título | 2 linhas a ~80 px, centrado, uma ideia ("An agent in your SaaS that makes adoption skyrocket.") | Gancho de 3 linhas a 1440 e 5 a 390; os H2 seguintes com 4 a 6 linhas | O jimo diz menos com mais escala. O gancho da BrandUp é longo por decisão do dono (aceitável), mas os H2 não precisam ser. |
| Prova do produto | **Fragmentos de UI reconstruídos em HTML com dado plausível e completo**: billing com plano, cartão, tabela de faturas e status; o painel do agente com a pergunta real (jimo-d-1). Ocupam ~70% da tela. | O equivalente seria o `DeskPanel` + o `ApprovalCard`. No mock eles têm 360 px de largura, aparecem cortados e somem da página (a fila YOU só existe nos estados). | **É a maior lição do jimo para este brief.** A parada YOU, com a fila de aprovação em tamanho de herói, é o "fragmento jimo" da BrandUp. |
| Acabamento | Todas as bordas de texto alinhadas, nada cortado, estados de entrada coreografados | 9 cortes, 1 colisão, campos fora do componente | É o acabamento que separa o 5 do 7. |
| Ornamento | Usa brilho, planeta e campo de estrelas (a taste reprovaria o glow) | Sem ornamento | Nesse ponto a BrandUp está **mais limpa** que a referência. Não copiar o glow. |
| Numeração | Abas "01 Guides · 02 Answers · 03 Acts" como controle real | 01/02 decorativos | Lá o número é controle; aqui é enfeite. |

Conclusão: o nível que o jimo cobra não é o do render. É o do **fragmento de produto em tamanho grande, legível e completo**, e o da execução sem um corte sequer. Não há cópia do jimo no mock.

---

## 6. Lacuna: a tela de gancho/intro (pedido do dono)

O mock não tem abertura. O dono pede uma, no molde da landing do Produzze: o logo entra com desfoque→foco e voa para o header.
- **Proposta de direção** (para o ui-ux-director decidir): o wordmark "BrandUp" entra do blur ao foco no centro sobre o `ink.950` (≤ 500 ms) e encolhe e voa para a posição do header (≤ 400 ms). Na chegada, o gancho já está pintado embaixo. Uma variante que nasce do conceito: o logo voa e "acende" a primeira mesa da maquete (o LED menta) antes de assentar no header.
- **Tensão a declarar** (sobe uma banca e derruba outra): sobe Creativity e FWA (cerca de +0,1–0,2 e +2–3 pontos) e derruba Usability e conversão se cobrir o H1. O brief proíbe reveal, blur e opacidade 0 no H1 (é o LCP), e o tráfego vem do Meta Ads com pressa. Regras para ela não custar lead:
  1. O H1, o CTA e os números **ficam no DOM e pintados por baixo** desde o primeiro quadro; só o logo anima por cima.
  2. A intro inteira dura ≤ 900 ms, roda só na primeira visita da sessão e não bloqueia rolagem nem toque.
  3. Com reduced-motion, a intro não existe.
- No Figma: desenhar 3 quadros (logo desfocado / em foco / no header) com a nota de motion. Hoje: **não avaliada**, porque não existe.

---

## 7. Banca 3: FWA (0–100)

Dispositivo escolhido: **desktop 1440**. O conceito (maquete + palco sticky + planta navegável) só existe inteiro ali; a 390 o tour vira um carrossel.

| Jurado | Nota | Por quê |
|---|---|---|
| Caçador de inovação | 52 | A ideia de "aprovar da sala YOU numa maquete" é interessante, mas o mock não a mostra funcionando. |
| Diretor de arte | 50 | A primeira dobra é boa; o resto é split e vazio, com cortes. |
| Técnico de WebGL/interação | 48 | Não há interação nem técnica para julgar; o 3D previsto é imagem com pan, o que é honesto, mas não empurra limite. |
| Narrador | 56 | Dia → tour → noite ("While you slept") é um arco de verdade (F5). É o melhor ativo da peça. |
| Cético de "já vi isso" | 47 | Escritório isométrico com etiquetas flutuando é um padrão conhecido; sem os pacotes correndo e a aprovação viva, ele não se distingue. |

**Média: 50,6 → 51** (o projeto entra com 50 e mal saiu do lugar). FOTD exige ≥ 70 e uma ideia que o júri não viu cem vezes, bem executada. A candidata é a parada YOU com a fila de aprovação viva + os pacotes de dado correndo entre as mesas + a noite que rima. Lente histórica (Design 40 · Navigation 25 · Graphics 15 · Content 15 · Personality 5, sistema antigo): Navigation fica baixa (a planta é genérica e a barra fixa está ausente), e Personality, média (a voz agressiva da copy).

---

## 8. O que mais sobe a nota (em ordem de impacto)

| # | Achado → correção | Evidência | Banca / critério | Ganho estimado | Dono |
|---|---|---|---|---|---|
| 1 | **Zerar os defeitos objetivos.** Os 9 cortes de texto (dar largura ao texto ou quebrar linha; nada de clip), a colisão a 390, a resposta trocada no FAQ, o passo 02 duplicado, a placa duplicada, o eyebrow duplicado e o chip pré-selecionado. | #2, #3, #5, #6, #7, #9, #10 | Awwwards Design + Usability; taste (tetos de 5 e 6 em Usability) | **+0,6 overall** (Usability 5,1 → ~6,0; Design +0,4) | figma-architect |
| 2 | **Formulários a partir do componente `Field`**: 56 px, placeholder, chip `+61`, rótulos "Work email" e "Mobile (WhatsApp)" iguais aos estados, chips de 44 px em 4 colunas (2×2 a 390) sem seleção inicial, e o `compact` final em cols 8-12 alinhado ao H2. Erro próprio por campo. | #1, #8, #9, #12, #13; d-1, d-7 | Design + Usability | **+0,3** | figma-architect (layout) · copy-director (as 4 mensagens de erro) |
| 3 | **O hero como o brief pede**: o campo `brand.500` atrás de "OVER $250K PER MONTH"; 7 placas distintas (6 agentes + YOU) sobre as mesas certas; 2 traços ortogonais com 1 pacote "LEAD" parado no meio (o quadro de reduced-motion já serve de mock); 3 placas a 390. | #4, #5; d-0 | Design + Creativity; FWA (ideia) | **+0,3** e +4 FWA | figma-architect (ui-ux-director confere a ordem de leitura com os olhos semicerrados) |
| 4 | **Fazer o tour existir**: 3 paradas desenhadas (Follow-up, Bookkeeper, **YOU**). A parada YOU com a fila de 3 `ApprovalCard` em tamanho de herói (o "fragmento jimo"), com Approve como botão menta de 44 px; a planta miniatura como planta de verdade (7 retângulos na posição das mesas); o painel inteiro, sem corte e sem o buraco de 236 px embaixo. | #11; d-3; jimo-d-1 | Creativity + Design; FWA (técnica/ideia) | **+0,4** e +6–8 FWA | ui-ux-director (composição da parada YOU) → figma-architect |
| 5 | **Encurtar os H2 para ≤ 3 linhas a 1440**: Notice com 6 linhas → usar a versão curta "Do not leave now! Your team is waiting." também no desktop, ou cortar; Live office, About e FAQ com 4 → 2–3. Aplicar o `<strong>` 700 no H2 do Notice. | d-1 y 1220–1510; d-3; d-5 | Design (tipo) + taste (teto de 6,5) | **+0,2** | copy-director (versões curtas) · type-director (o 700 e a medida das colunas) |
| 6 | **Fechar os vazios**: depoimentos em 3 cartões de 4 colunas que vão de borda a borda (ou trilho com o próximo aparecendo) + os controles 01/02 ←/→; About com os 3 fatos virando figura grande ou foto do time em cols 9-12; tirar os 250 px mortos após o FAQ; a noite crescendo até a base do formulário final. Quebrar a sequência de 4 "splits à esquerda". | d-2, d-4/d-5, d-6, d-7 | Design (composição) | **+0,2** | ui-ux-director → figma-architect |
| 7 | **Tela de gancho/intro** (§6), com as 3 regras para não custar LCP nem lead. | lacuna | Creativity; FWA (Usability em risco) | +0,1–0,2 e +2–3 FWA | ui-ux-director → figma-architect |
| 8 | **Tirar os eyebrows mono das seções** e deixar o mono só no dado; os passos em `<ol>` no peso do texto. | taste §4 itens 1-2 | taste (teto) · Design | +0,1 | type-director · ui-ux-director |
| 9 | **Frames que faltam**: `StickyCTA` a 390, nav `scrolled`, os estados da `AgentPlate`, o `Field` disabled, o hover e o foco do FAQ distinguíveis, o reduced-motion do tour desenhado, o success sem corte, e o frame 768 (hero + formulário). | #14; states | Usability (a banca cobra estados) | +0,1 | figma-architect |
| 10 | **O render adulto do §8.3** (plinto, argila fosca, cadeiras cinza, menta só na mesa ativa, sem grama, sem xadrez e sem texto queimado). Fora deste júri por decisão, mas é o maior salto restante de Design depois dos itens acima. | d-0, mob-A (grama, xadrez e o neon "BRANDUP HQ" ainda visíveis) | Design + Creativity; FWA | +0,4–0,6 quando chegar | ui-ux-director (direção do render) / dono (a fonte 3D) |

Teto realista: com os itens 1–6 bem feitos, o mock vai para **6,3–6,6** (beira da HM). Com o 4 em nível jimo + o render do §8.3 + a motion ao vivo dos pacotes e da aprovação, **~7,0–7,3** (nível SOTD) passa a ser plausível.

---

## 9. O que já está no nível (não mexer)

1. **A ordem de conversão na primeira dobra**: CTA + 3 números visíveis a 1440×900 (d-0, y 443–603); a 390, o CTA em y 365–425, longe da dobra do Instagram (mob-A).
2. **O formulário logo depois do hero a 390**, começando cerca de 255 px depois do início da faixa (mob-A, 2ª coluna, y ≈ 1193). Resolve o problema 1 do brief.
3. **A faixa roxa de campo inteiro com o cartão `ink.950`** (d-1, y 1088–1740): é o momento de marca mais forte da página e segue a regra do acento (menta só no CTA e no chip).
4. **A copy dos estados do `ApprovalCard`** ("Approved. Reminders sent to 3 clients.", "Declined. The agent won't send it.", "Edited. Your version goes out instead.") e a cobertura de estados do formulário (states-full, blocos LEADFORM e APPROVALCARD).
5. **"All agents at a glance"** (d-4, y 3560–4021): lista tipográfica limpa, com "You approve:" por agente; é o resumo que a pessoa que só escaneia precisa.

---

## 10. Não avaliado

- **Developer Award (as 6 categorias)**: não há código. WPO, RWD real, semântica, markup e acessibilidade técnica ficam para quando houver build.
- **Motion** (o embaralhamento dos números, os pacotes, o pan/zoom do tour, a entrada das placas): o mock é estático e as notas de motion não aparecem nas capturas.
- **O acabamento do render**: é placeholder, por decisão.
- **O texto dos depoimentos**: é placeholder, por decisão.
- **O contraste medido por pixel / APCA** (por exemplo, o `text.3` nos chips não selecionados e os rótulos mono de 11 px sob os números): não medi, porque a captura do Figma não dá o valor real de cor renderizada com segurança. A olho, os rótulos mono de 11 px em `text.3` sob os números (d-0, y 580–600) estão no limite do par tamanho × Lc. Medir no código.
- **O frame 768**: não veio nas capturas.
- **A tela de intro**: não existe.
- **As fotos do jimo a 390** (`jimo-m-*.png`): foram feitas, mas não abri; a comparação usou só o desktop.
