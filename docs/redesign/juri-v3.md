# Júri v3: mock no Figma da landing da BrandUp ("A maquete e o relatório")

Júri: design-jury (Awwwards, júri principal + FWA; o Developer Award não se aplica porque ainda não há código) · 08/11/2026
Peça: mock v3. Capturas em `figma-capturas/v3/` (desktop 1440×8911, mobile 390×9134, states, intro 1440/390, hero 1440/390). Renders originais em `render/`.
Evidência: `docs/redesign/juri-v3-fotos/`. `d-0…d-6` são o desktop em fatias de 1300 px (a fatia *i* começa em y = 1300·i); `m-all.png` é o celular em 4 colunas de 2300 px (a coluna *i* começa em y = 2300·i); `render-100.png` é a capa e a mesa do follow-up a 100%; `intro.png`, `states-s.png` e `jimo.png` são as comparações.
**Coordenadas: (x, y) na captura inteira**, salvo indicação. As medidas vêm de script de pixel (PIL) sobre os PNGs.
Régua: `criterios-awwwards-fwa.md`, `brief-v3.md` (§1 e §10), `copy.md` v4, `tipografia-v3.md` e a skill `design-taste-frontend` em modo crítica. O depoimento é placeholder por decisão: julguei o desenho dele, e não o texto.

---

## 1. Veredito

| Prêmio | v1 | v2 | **v3** | Resultado |
|---|---|---|---|---|
| Awwwards Honorable Mention (júri ≥ 6,5) | 5,0 | 6,3 | **6,75** | **Sim, no limite** (com 0,25 de folga). Ponderada exata: 6,752 |
| Nível SOTD (~7,2+) | 5,0 | 6,3 | 6,75 | **Não.** Faltam ~0,5 |
| Developer Award | — | — | — | Não se aplica (não há código) |
| FWA FOTD (≥ 70) | 51 | 59 | **60** | **Não** |
| Taste skill (crítica, com os tetos) | 5,1 | 6,0 | **6,5** (sem os tetos: 6,8) | Dois tetos: o placeholder segura Content em 5, e o bloco vazio de 480 px do depoimento segura Design em 6,5 |
| Critério do §10 do brief (todas precisam passar) | — | — | **Reprova** | Falham o item 2 (roxo < 240×120 em 3 lugares), o item 5 (o split "zona lateral \| conteúdo no eixo" se repete em 7 seções) e o item 10 (as notas-alvo) |

**Em uma frase:** o v3 trocou de fato o vocabulário. Não sobrou mono, pílula, contorno, stat row, marca-texto nem gradiente (conferido em todas as fatias), a tipografia tem autor e a página tem campos de cor com papel. O que separa o 6,75 do SOTD já não é slop de componente: é **massa e imagem**. O hero entrega a maquete pequena e deixa 240 px de preto morto embaixo, o render ainda lê como "clay render de Blender" e a página repete uma única planta (a zona lateral morta + conteúdo a partir de x 512) em quase todas as seções.

**Sobre a "nota máxima":** com a régua calibrada (SOTDs reais de set/2026 tiraram 7,22–7,5), um 9 ou 10 não existe na prática para nenhum site, e menos ainda para uma landing de conversão B2B feita de fotos paradas. O teto realista desta peça está no §7.

---

## 2. Banca 1, Awwwards (júri principal)

Seis jurados; por critério, descartei a nota mais distante da média (regra do Awwwards, escalada para 6).

| Critério (peso) | Dir. de arte | Líder de UX | Creative tech | Tipógrafo | Conteúdo | A11y/perf | Descartada | **Média v3** | v2 | v1 |
|---|---|---|---|---|---|---|---|---|---|---|
| Design (40%) | 6,5 | 6,8 | ~~6,3~~ | 7,0 | 6,8 | 6,8 | 6,3 | **6,78** | 6,3 | 4,8 |
| Usability (30%) | 7,0 | 6,8 | 7,2 | 7,0 | 7,0 | ~~6,5~~ | 6,5 | **7,00** | 6,4 | 5,1 |
| Creativity (20%) | 6,3 | 6,5 | ~~5,8~~ | 6,3 | 6,5 | 6,5 | 5,8 | **6,42** | 6,3 | 5,0 |
| Content (10%) | 6,8 | 6,5 | 6,5 | 6,5 | ~~6,0~~ | 6,5 | 6,0 | **6,56** | 6,0 | 5,8 |
| **Ponderada** | | | | | | | | **6,75** | 6,3 | 5,0 |

(As médias por critério do v2 estão em `juri-v2.md`; a ponderada do v2 era 6,3.)

**Design 6,78.** O que sobe:
- A tipografia: Archivo ExtraCondensed 800 a ~106 px (as linhas do H1 vão de y 124 a 208 e de 220 a 299, em x 512–1350, d-0) contra Source Serif a 19 px dá razão 5,6, e os títulos são todos de 2 linhas.
- Os campos de cor viram capítulos: o formulário roxo de borda a borda (y 1040–1943), o papel do About (4734–5407) e a faixa roxa do FAQ (5407–5767). Nenhum campo vizinho se repete (conferido pela troca de cor na coluna x 5).
- As margens agora estão certas: 72/1367 medidas no nav, no tour, no final e no rodapé, o que fecha o defeito #1 do v2.
- O formulário sem cartão, direto no roxo (d-1).
- O rodapé com o wordmark cortado pela borda de baixo (d-6).

O que desce:
- O hero não é um pôster. A maquete ocupa x ≈ 625–1326 e y ≈ 420–800, cerca de 20% da 1ª tela (o brief pede ~45%, sangrando até a borda e continuando abaixo da dobra), e embaixo dela sobram 240 px de preto vazio (y 800–1040).
- O render (§5) ainda tem cara de padrão.
- As zonas laterais mortas: a coluna esquerda do formulário fica vazia em (72–480, 1270–1943), ~670 px de roxo sem nada; abaixo das plaquetas, em (72–488, 3253–3560); e abaixo da declaração final, em (72–700, 7660–8060).
- O bloco de papel do depoimento (512–1440, 1943–2423) tem uma linha de texto em 928×480.

O dir. de arte deu 6,5 por isso; o creative tech deu 6,3 (descartado) pelo render.

**Usability 7,00.** A 1ª tela diz o quê, para quem e o que fazer: o H1 com o número, o apoio "AI agents… you approve from your phone" e o CTA menta em (72–260, 526–582). O formulário vem logo depois do hero. O FAQ tem todas as respostas abertas. Os estados estão completos (states: campo nos dois fundos, erro por campo, offline com os dados preservados, plaqueta, linha viva com 9 estados, foto carregando e falhou).

Desce por quatro coisas:
- A fileira de plaquetas a 390 corta "Your ad man|" no meio da palavra, na borda x 390 (y ≈ 2462–2471). Lê como cortado, e não como um convite a deslizar.
- A placa "2 actions waiting for your yes" é ambígua para quem chega: ações de quem?
- O último quadro da intro não é o hero (§4, #4).
- O estado de foco com o e-mail quebrando em 2 linhas dentro do input (§4, #9).

O jurado de a11y deu 6,5 (descartado), porque o `text.2` sobre `ink.950` fica em Lc −59 a 15 px, abaixo da régua de 60 (o próprio `tipografia-v3.md` aponta, l. 74, e o token não foi corrigido).

**Creativity 6,42.** A ideia escrita é boa e específica: a sede-maquete do anúncio, a linha de aprovação viva e o dia → noite. No mock, porém, o "relatório impresso" quase não aparece: semicerrando os olhos, é uma landing escura e limpa com faixas roxas e fotos de render. A transformação central (o bloco roxo da legenda que cresce até virar campo) só funciona para quem viu o anúncio. A coisa viva (Approve → Sent → chega a próxima ordem) é o melhor momento da página e é da BrandUp. O que segura a nota: o render genérico e a repetição de planta.

**Content 6,56.** É específica e crível: "40 steel brackets", "A$14,200 · Sam · Email", "You usually follow up on day 5" (d-3), as respostas do FAQ que tratam a objeção real ("Will the AI act without my approval?") e a declaração da noite com números. Desce por:
- Os placeholders visíveis fora do depoimento: "[PLACEHOLDER: city, state]" (About, y ≈ 5000), o preço, o "where data is stored" e as integrações no FAQ (y ≈ 6060, 6280, 7120), e o e-mail, o telefone e o ABN no rodapé (y ≈ 8430–8475).
- "Do not leave now. Your team is waiting." em caixa alta a 64 px soa como pop-up de saída, e não como relatório.

---

## 3. Banca 3, FWA (0–100)

Dispositivo escolhido: **desktop 1440**, onde a maquete e as fotos de mesa têm o maior tamanho e a linha viva cabe inteira com a foto da sala.

| Jurado | Nota | Por quê |
|---|---|---|
| Caçador de inovação | 61 | O sistema é limpo e a aprovação viva é útil, mas não há nada que empurre o meio |
| Diretor de arte | 64 | Tipo e campos de cor com autoria; o hero fraco e o render "clay" puxam para baixo |
| Técnico de WebGL/interação | 55 | Tudo é still pré-renderizado; a intro é um crossfade com máscara de 7 pontos. Não há técnica para premiar |
| Narrador | 63 | O arco dia → noite → "8am on your phone" fecha bem |
| Cético do "já vi isso" | 57 | Escritório 3D de bonequinhos é a imagem padrão de "agentes de IA" em 2025–26 |
| **Média** | **60** | v1 51 → v2 59 → **v3 60** |

Lente histórica (pesos antigos, só referência): Design 40 forte-médio, Navigation 25 bom, Graphics 15 fraco (é o render), Content 15 bom, Personality 5 médio. O FWA julga a peça no ar e com motion. Um mock parado não passa de ~62 por definição. Para chegar a 70 falta uma ideia que o júri não viu cem vezes (§7).

---

## 4. Defeitos objetivos (com coordenada)

### 4.1 As suas quatro suspeitas

| # | Suspeita | Veredito | Medida |
|---|---|---|---|
| a | Hero a 1440: maquete pequena e ~250 px de preto vazio embaixo | **CONFIRMADA** | A última linha com conteúdo do hero é y 799, e o campo roxo começa em y 1040: **240 px vazios** em largura total. A maquete fica em x ≈ 625–1326, y ≈ 420–800 (~700×380, **~20% da 1ª tela de 1440×900**). Ela não sangra à direita (para em x 1326, antes da margem) e não continua abaixo da dobra, as duas coisas que o §5.2 pede. Isso também quebra o "convida a rolar" |
| b | O render lê como "Blender padrão" | **CONFIRMADA em parte** | Ver `render-100.png`. **Confirmado:** os bonecos são manequins de artista com cabeça de bola e juntas de cilindro (o boneco de stock de 3D, e não a figura de resina 1:50 do §8.2); as árvores são pirulitos; os monitores são retângulos brancos estourados, sem o brilho físico pedido; a luz é uniforme e suave, sem a direção da softbox nem o contraluz que recorta o chanfro do plinto (o plinto preto quase some); não há fio de corte do cartão nem acrílico, então a maquete parece "material único de clay render", e não maquete física; a elevação da capa é alta (~40°), e com 85 mm a convergência é tão pequena que a capa ainda **lê como isométrica**; as mesas foram fotografadas a ~35°, não aos 18–22° do brief. **Moiré:** as listras do piso de madeira têm período fino (~8–10 px no 1920 da `desk-followup`; na redução para 856 px do tour, ~4 px). Na captura não há moiré visível, mas há aliasing no limite; no AVIF e no retina o risco é real. **Refutado:** a qualidade técnica é boa (96 amostras, sem ruído, sombras de contato corretas, DOF leve na mesa) e o set é coerente nos 19 quadros |
| c | Foto da sala YOU a 1440 pequena demais | **CONFIRMADA** | Mede **192×234 px** em (1176–1367, 3850–4083), cerca de 3% da tela. É menor que o próprio cartão viável ao lado (640 px) e menor que a placa roxa do hero. Para ser a cena de "quem manda", ela some |
| d | Faixa roxa "You approve…" e placa roxa a 390 abaixo de 120 px | **CONFIRMADA, e vale também a 1440** | Áreas roxas medidas: faixa "You approve" a 1440 = **856×77** (512–1368, 3482–3559); a mesma a 390 = **350×84** (20–370, 3294–3378); placa do hero a 390 = **256×89** (20–276, 369–458). As três ficam abaixo do mínimo de 240×120 do §10.2. A placa do hero a 1440 passa (284×131) |

### 4.2 Outros defeitos

| # | Defeito | Onde (x, y) | Evidência | Dono |
|---|---|---|---|---|
| 1 | **Planta repetida**: zona lateral (x 72–488) + conteúdo a partir do eixo x 512 no hero, no formulário, no depoimento, no tour, no YOU, no About e no FAQ. O formulário (#2) e o final (#8) são o mesmo split "texto \| formulário". Semicerrando, as 7 seções viram uma só | d-0…d-6 | Passe 9 da crítica; o §10.5 pede "nenhum split texto \| caixa repetido" | ui-ux-director |
| 2 | **Zonas laterais mortas**: o formulário em (72–480, 1270–1943), ~670 px; o tour sob as plaquetas em (72–488, 3253–3560); o final em (72–700, 7660–8060) | d-1, d-2, d-6 | "Vazio sem nada que o feche" (passe 5) | ui-ux-director → figma-architect |
| 3 | **Depoimento**: bloco papel de 928×480 com 1 linha a ~24 px (o brief pede a citação a 36 px em ≤ 3 linhas). O desenho da seção não está provado: um mock com a citação-modelo de 25 palavras mostraria se a seção funciona | (512–1440, 1943–2423) | d-1 | figma-architect |
| 4 | **A intro não termina no hero**: o último quadro a 1440 e a 390 mostra o H1, o texto e o CTA **sem a maquete e sem a placa**. A 390, o quadro noturno é um placeholder (7 pontos cinza + "[render/office-night-portrait]"), porque esse render não existe em `render/` | `intro.png`, 4º quadro das duas fileiras; 2º quadro a 390 | O §5.0 diz que a página "está lá" ao fim | frontend-studio (render noturno em retrato) · figma-architect (quadro final = hero) |
| 5 | **A fileira de plaquetas a 390 corta a palavra** "Your ad man" na borda | (≈300–390, 2445–2490) | m-all, 2ª coluna | figma-architect (mostrar meia plaqueta inteira ou quebrar a fileira em 2) |
| 6 | **O tapete da sala YOU no amanhecer lê azul-índigo**: mediana RGB (20, 16, 70), longe do `#9232EA` | (1000–1250, 7480–7560), 3ª foto noturna | d-5 | frontend-studio (render) |
| 7 | **Pequeno resíduo claro** no canto superior direito da 1ª foto noturna | (≈476–480, 7218–7226) | d-5 | frontend-studio (verificar o crop) |
| 8 | Placeholders de conteúdo visíveis além do depoimento (About, 3× no FAQ, rodapé) | ver §2, Content | d-3…d-6 | copy-director (frase-modelo realista no mock) |
| 9 | **Estado de foco com o e-mail em 2 linhas dentro do input** ("jane@company.com / .au"), no roxo e no preto. Um input não quebra linha | states-full ≈ (329–562, 218–273) e (329–562, 665–720) | `states-s.png` | figma-architect (clip/truncar, auto-layout sem wrap) |
| 10 | `text.2` sobre `ink.950` em Lc −59 a 15 px (abaixo de 60), apontado pelo type-director e não resolvido | privacidade e nomes de estado | `tipografia-v3.md` l. 74 | ui-ux-director (token) |
| 11 | A 390, a razão display ÷ corpo é 40 ÷ 17 = 2,4 (o próprio tipo declara). Não é defeito de regra, mas a 1ª tela do celular perde a "escala extrema" que é o B1 | m-all, topo | `tipografia-v3.md` l. 46 | type-director + ui-ux-director (a regra de 2 linhas trava o H1 em ~40 px a 390; aceitar e compensar com a maquete maior na 1ª tela do celular) |

---

## 5. Sinais de "feito por IA" que ainda restam

O vocabulário de componente saiu. Os sinais que sobram são de **composição e imagem**:
1. **O render "clay office com manequins"** (§4.1 b). Escritório 3D branco com bonecos de cabeça de bola é hoje a ilustração padrão de "AI agents" (e o que um gerador de imagem entrega de primeira para "AI office"). É o sinal mais forte que sobrou.
2. **Uma planta só para a página inteira** (§4.2 #1). É a mesma doença do v2 (#8, o split repetido), agora sob a forma de "eixo". O eixo fixo é uma boa decisão editorial; o problema é que nenhuma seção quebra o eixo de propósito (uma imagem de borda a borda, uma seção centrada, uma foto que sangra por cima da zona lateral).
3. **A trinca escuro + violeta + menta.** A dose está certa (o roxo só em campo, o menta só na ação, conferido), mas a combinação continua sendo a paleta da categoria. Fica por ser a marca (decisão do dono). Só não dá para fingir que ela não pesa no "parece IA".
4. **Vazios onde deveria haver massa** (hero, coluna lateral, depoimento). A skill avisa: tirar os enfeites e não pôr nada no lugar lê como "fino", e o júri cego prefere a página rica.

**O que NÃO é mais sinal (conferido visualmente em todas as fatias e nos states):** mono (0; as horas estão em serifa tabular, d-2), caixa alta < 20 px (0), pílula/chip (0), contorno de 1 px fora de campo de formulário e de foco (0; os blocos de faturamento se separam por um vão de 2 px), sombra/blur (0), gradiente (0 fora do render), ícone (só os sociais do rodapé), título em dois pesos (0), palavra estilizada (0), stat row (0), check e "+" (0).

---

## 6. Critério objetivo do §10 do brief-v3

| # | Critério | Resultado | Medida / observação |
|---|---|---|---|
| 1 | Contagem de camadas no Figma | **Passa visualmente; auditoria não anexada** | Não recebi a auditoria de camadas do figma-architect. Nas capturas: 0 mono, 0 caixa alta < 20 px, 0 pílula, 0 traço de 1 px fora de campo/foco, raio 4 só nas ordens de serviço (`data-ui`), 0 sombra, 0 gradiente, ícones só sociais |
| 2 | Cor: menta só no CTA/Approve; roxo só em ≥ 240×120 | **NÃO PASSA** | Menta: passa (1 por viewport). Roxo: 3 áreas abaixo (856×77, 350×84, 256×89; §4.1 d) |
| 3 | Escala: maior ≥ 7vw, razão ≥ 5,5, ≤ 5 tamanhos, ≤ 2 famílias | **Passa, com ressalva** | H1 ~106 px = 7,4vw; razão 5,6; Archivo + Source Serif. O wordmark do rodapé (~18vw) é o 6º tamanho, previsto no §5.10. A 390, razão 2,4 |
| 4 | H1 e H2 com ≤ 2 linhas | **Passa a 1440 e 390**; 768 não avaliado | Não recebi a captura de 768 |
| 5 | Plantas vizinhas diferentes; nenhum split repetido; margens 72/72 | **NÃO PASSA** | Margens: passa (72 → 1367 medidas em 9 faixas). Split: o formulário e o final são o mesmo "texto \| formulário", e o padrão zona lateral + eixo se repete em 7 seções |
| 6 | ≥ 4 renders; nada sobre a imagem; nenhum isométrico | **Passa, com ressalva** | 6 renders visíveis a 1440 (capa, mesa, YOU, 3 noturnas) e 19 produzidos. A capa, em perspectiva com elevação alta, ainda lê como isométrica |
| 7 | Teste de sobreposição (jimo, Prolibu, v2) | **Passa** (meu teste; o do figma-architect não foi anexado) | O tour com plaquetas + foto + faixas não repete o palco do jimo nem o trilho do Prolibu |
| 8 | Teste do estranho em 5 s a 390 | **Passa pela minha leitura** (não é teste com pessoa) | O H1 + "AI agents we run 24/7, and you approve from your phone" + o CTA a y ≈ 280–335 |
| 9 | `inspect.mjs` / `lint.mjs` | **Não avaliado** | Não há página real |
| 10 | taste ≥ 8,0 · Awwwards ≥ 7,2 · FWA ≥ 70 | **NÃO PASSA** | 6,5 · 6,75 · 60 |

Pela regra do próprio brief ("uma falha reprova; abaixo das notas-alvo a peça volta para o ui-ux-director, e não para remendo"), **o v3 volta para o ui-ux-director**. Mas a volta é de composição e de render, não de vocabulário: o vocabulário está resolvido e não deve ser mexido.

---

## 7. Comparação com o jimo.ai e o teto realista

**jimo** (`jimo.png`, `referencias/jimo/`): o jimo é, ironicamente, cheio de sinais da casa: glow, planeta em gradiente, botões em pílula, palavra estilizada no H1. O que o põe acima é a **execução viva**: o fragmento de produto em escala real com o cursor do agente agindo, o chat com "Thinking → Read page → Find Reports", e motion contínuo que conta o que o produto faz. O v3 já é **mais autoral no vocabulário** que o jimo (tipo, campos de cor, zero enfeite) e **mais fraco em massa e prova visual**: o fragmento vivo do v3 (a ordem de serviço) é bom, mas fica pequeno na página, e a imagem-herói é um still genérico. No mock parado, o jimo ganharia de um júri cego pela riqueza; no ar, com motion, a distância diminui se a linha viva e a intro forem bem executadas.

**Teto realista desta peça:** Awwwards **7,2–7,4** (nível SOTD) e FWA **66–70**. Um 8+ no Awwwards exigiria uma ideia e uma imagem que hoje não existem no plano (por exemplo, a maquete como cena em tempo real que muda com a aprovação), e isso cobra Usability e WPO. **O que separa o v3 (6,75) do teto, em ordem:** a imagem-herói adulta e grande (+0,25), uma página com mais de uma planta e sem vazio lateral (+0,15), o render com cara de maquete física (+0,15, que soma com o primeiro), o conteúdo sem placeholder (+0,05) e, no código, a motion da intro + a linha viva + as trocas de mesa (+0,1 a +0,2 em Design/Creativity, e é o que leva o FWA a ~68).

---

## 8. O que mais sobe a nota (ordenado por impacto)

| # | Achado | Evidência | Banca · critério | Pontos estimados | Dono |
|---|---|---|---|---|---|
| 1 | **Hero: a maquete grande, sangrando à direita e passando da dobra.** Ela deve começar sob o H1 em x ≈ 512 e sair pela borda x 1440, com ~55% da altura da 1ª tela, e os 240 px vazios viram imagem. Hoje o hero não segura como pôster | §4.1 a; d-0 | Awwwards Design, Creativity · FWA Design | +0,20 Awwwards · +2 FWA | ui-ux-director (composição) → figma-architect |
| 2 | **Render v2 "maquete física"**: figuras de resina 1:50 de proporção adulta (sem cabeça de bola), monitores com brilho físico em vez de branco chapado, softbox com direção + contraluz no chanfro do plinto, fio de corte do cartão e acrílico fosco visíveis, câmera da capa mais baixa (~25–28°) para matar a leitura isométrica, mesas a 18–22°, plantas em cartão abstrato, piso sem listra fina (veio largo, ou cartão liso), o tapete da sala YOU calibrado para `#9232EA` também no amanhecer, e o `office-night-portrait` que falta. Teste: "isto parece foto de uma maquete em cima de uma mesa?" Hoje parece clay render | §4.1 b; `render-100.png`; §4.2 #4, #6 | Awwwards Design, Creativity, Content · FWA Graphics | +0,15 · +3 FWA | frontend-studio (render) |
| 3 | **Quebrar a planta única.** Pelo menos duas seções saem do eixo de propósito: a foto da sala YOU grande (≥ 4 colunas, ou de borda a borda com as 3 ordens sobrepostas no preto ao lado, e não por cima); o depoimento ou o About com outra geometria; e o final diferente do formulário #2 (as 3 fotos noturnas maiores, com o formulário centrado embaixo, ou o formulário no campo roxo de novo). Ocupe ou elimine as zonas laterais mortas (§4.2 #2) | §4.2 #1, #2; d-1, d-2, d-6 | Awwwards Design, Creativity · §10.5 | +0,15 | ui-ux-director |
| 4 | **A foto da sala YOU como cena principal**, de 192×234 para ≥ 400×500 a 1440 | §4.1 c | Design, Creativity | +0,05 (soma com o #3) | ui-ux-director → figma-architect |
| 5 | **O roxo ≥ 240×120 em todo lugar**: a faixa "You approve" com ≥ 120 px de altura (ou vira texto em `text.1` sem campo) e a placa do hero a 390 com ≥ 120 px | §4.1 d | §10.2 · Design | +0,03 (é portão) | figma-architect |
| 6 | **Depoimento desenhado com a citação-modelo** de 25 palavras a 36 px (marcada "modelo"), para provar a seção; e os placeholders do About, do FAQ e do rodapé trocados por frases-modelo realistas | §4.2 #3, #8 | Content (destrava o teto da taste) · Design | +0,05 Awwwards · taste +0,3 | copy-director + figma-architect |
| 7 | **Intro: o último quadro igual ao hero** (com a maquete e a placa) e o render noturno em retrato | §4.2 #4 | Usability, Design | +0,03 | figma-architect · frontend-studio |
| 8 | **A fileira de plaquetas a 390** sem cortar palavra; **o input de foco** sem quebrar linha; o token `text.2` acima de Lc 60 a 15 px | §4.2 #5, #9, #10 | Usability | +0,05 | figma-architect · ui-ux-director (token) |
| 9 | **H2 do formulário**: "Do not leave now. Your team is waiting." em caixa alta a 64 px lê como pop-up de saída. Teste uma versão que fale do resultado (no registro do relatório) | d-0, y 1170–1285 | Content | +0,02 | copy-director |
| 10 | **No código**: a intro (as 7 telas acendem → dia), o H1 por máscara, a troca de mesa e a linha viva bem executadas, a escala da capa com a rolagem. É o que leva o FWA de 60 a ~66–68. ⚠️ No Developer Award, o 3D em still/PNG não pontua em Animations: só o motion de script conta | — | FWA · Awwwards Design/Creativity | +0,1 a +0,2 · +6 FWA | frontend-studio |

---

## 9. O que já está no nível (não mexer)

1. **O vocabulário sem slop**: 0 mono, 0 pílula, 0 contorno, 0 gradiente, 0 stat row (todas as fatias). Resolve os 19 sinais do §1 do brief.
2. **A tipografia**: Archivo ExtraCondensed 800 a ~106 px + Source Serif 4 com tabulares; razão 5,6; todos os títulos com 2 linhas a 1440 e 390 (d-0, d-2, d-4, d-5; m-all).
3. **A linha viva da sala YOU** (d-3, y 3900–4573; states, coluna direita): a ordem de serviço com o "Why" em três frases, a prévia, "Approve / Edit / Decline" e os 9 estados, incluindo "Declined. Nothing was sent." sem vermelho e "All clear. Nothing is waiting for you."
4. **O formulário no campo roxo**, sem cartão, com os estados de erro e offline completos (d-1; states-s).
5. **As margens 72/72** medidas em 9 faixas e o **ritmo de campos de cor** (preto → roxo → preto|papel → preto → papel → roxo → faixas alternadas → fotos → preto).

---

## 10. Taste skill (modo crítica, sobre as capturas)

```
ROUND 1 (mock v3, PNG do Figma)
Seen in one second: o H1 enorme "OVER $250K PER MONTH WITHIN 90 DAYS." (não a maquete)
Idea (one sentence): a sede-maquete do anúncio vira o relatório impresso do dia do escritório; o "sim" do dono é a única coisa viva.
Live thing: a linha de aprovação (Approve → Sent → chega a próxima ordem). Desenhada em 9 estados; não testável no mock.
Scores: design 6,8 → 6,5 (teto) · usability 7,0 · creativity 6,5 · content 6,5 → 5 (teto) → overall 6,5 (6,8 sem tetos)
Caps applied:
  - placeholder visível ([Testimonial pending], [PLACEHOLDER: …] ×6): content ≤ 5
  - trecho em branco > meia tela (o bloco papel do depoimento, 928×480 com 1 linha): design ≤ 6,5
Top three problems:
1. O hero tem a maquete pequena e 240 px vazios (d-0, y 800–1040). Fix: a maquete sangra e passa da dobra.
2. O render lê como clay render com manequins (render-100.png). Fix: o §8 do brief à risca (resina, luz com direção, câmera baixa).
3. A mesma planta lateral + eixo em 7 seções, com as zonas laterais mortas (d-1, d-2, d-6). Fix: 2 seções que quebram o eixo; ocupar ou eliminar a coluna morta.
```

Passes (resumo): 1 (um segundo/cinco) passa; 2 (semicerrar) dá H1 + campo roxo, com a imagem fraca; 3 (cobrir o logo) passa no tour e na sala YOU e falha no hero (qualquer "AI office" com render 3D); 4 (bordas) dá 2 x principais (72 e 512), ótimo; 5 (espaço) falha (zonas laterais mortas, vazio no hero); 6 (tipo) passa; 7 (cor) passa; 8 (imagens) dá ≥ 4 reais, sem imagem em movimento (é mock), e a mesma luz e o mesmo grade em todos (bom); 9 (mesmice) falha; 10 (celular) é composição própria, mas a placa e a faixa ficam baixas demais e a fileira de plaquetas corta palavra; 11 (cheio) falha em 3 trechos; 12 (substância) passa, salvo os placeholders; 13 (colisões) sem colisão, com o corte das plaquetas a 390; 14 (concorrente) passa na linha viva e é fraco no render.

**O que não rodei:** `inspect.mjs`, `lint.mjs` e `scenes.mjs` precisam de página real; o mock só existe em PNG do Figma. O teto de "página parada" (design ≤ 7) e o de motion não foram aplicados nem avaliados. Também não avaliei o 768 (sem captura), o contraste por pixel sobre o render (não há texto sobre imagem) nem a auditoria de camadas do Figma (não anexada).

---

## 11. Não avaliado

- **Developer Award, Lighthouse, axe, teclado, sem JS/CSS, fps:** não há código.
- **768:** não recebi a captura.
- **Motion** (intro, H1 por máscara, troca de mesa, linha viva): o mock é estático; só julguei os quadros da intro.
- **Auditoria de camadas no Figma** (§10.1) e o **teste de sobreposição** do figma-architect: não anexados; usei a minha leitura das capturas.
- **Teste do estranho em 5 s com pessoa real:** fiz a leitura como jurado, que não substitui o teste.
- **Moiré real no AVIF/retina:** medi o período das listras e vi aliasing a 100%, mas não renderizei o AVIF em tela retina.
