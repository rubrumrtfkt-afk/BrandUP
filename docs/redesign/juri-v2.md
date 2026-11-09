# Júri v2: mock no Figma do redesign da BrandUp

Júri: design-jury (Awwwards júri principal + FWA; o Developer Award não se aplica, porque não há código) · 08/11/2026
Peça: mock v2 no Figma. Capturas: `figma-capturas/v2c/desktop-1440-full.png` (1440×11863), `mobile-390-full.png` (390×9388), `states-full.png` (3128×5491), `t768.png`; `figma-capturas/v2b/intro-1440.png` (5 quadros) e `intro-390.png`.
Evidência: `docs/redesign/juri-v2-fotos/`. `d-0…d-6` são o desktop em fatias de 1750 px a cada 1700 px (a fatia *i* começa em y = 1700·i). `m-0`/`m-1` são o celular em 3 colunas de 1580 px (m-0: y 0–4740; m-1: y 4740–9388). Também estão lá `m-defeitos.png`, `intro-1440.png`, `states-0/1.png` e os scripts de medida (`medida-margem.py`, `medida-contraste.py`).
Coordenadas: **(x, y) na captura inteira**, salvo indicação.
Régua: `criterios-awwwards-fwa.md`, o bloco V2 de `brief-direcao.md`, `copy.md` v3, `tipografia.md` e a skill `design-taste-frontend` (modo crítica). O render 3D e os depoimentos são placeholder por decisão; julguei o desenho deles, e não o acabamento. As faixas roxas "Quadro N de 5" são anotação e ficaram fora da nota.

---

## 1. Veredito

| Prêmio | v1 | **v2** | Resultado |
|---|---|---|---|
| Awwwards Honorable Mention (≥ 6,5) | 5,0 | **6,3** | **Ainda não.** Faltam 0,2, e eles estão quase todos no lote de defeitos do §5 |
| Nível SOTD (~7,2+) | 5,0 | 6,3 | Não |
| Developer Award | — | — | Não se aplica (sem código) |
| FWA FOTD (≥ 70) | 51 | **59** | Não |
| Taste skill (crítica, com os tetos) | 5,1 | **6,0** | O teto de "conteúdo cortado" (rodapé a 390) ainda segura a Usability em 5. Sem ele, a nota iria a ~6,4 |

Em uma frase: o v2 fez o conceito chegar à tela. A maquete sangra de borda a borda com as 7 placas, a parada YOU virou o fragmento de produto em escala de herói que o v1 pedia, os formulários saem do componente e a intro tem uma ideia própria (as 7 luzes que pousam nos LEDs das placas). O que separa o 6,3 da HM não é ideia: é acabamento. As margens trocam entre 64 e 72 seção a seção, há 3 defeitos visíveis no celular e alguns vãos no tour.

**Pronto para mostrar ao dono (cliente)?** **Sim, como direção, depois do lote curto do §5, item 1.** É trabalho de execução, sem nenhuma decisão de design nova. Até lá, há três coisas que não podem ir para a frente dele: (a) a tela de celular com "90 days" colado em "24/7" e o rodapé cortado; (b) o bloco FIELD do frame States, que está quebrado (§2, #9); (c) o carimbo "Render provisório" queimado na arte. Na apresentação, diga com todas as letras que o render é provisório e que o adulto (§8.3) vem depois: hoje ele é o maior freio de Design.

---

## 2. Defeitos objetivos restantes

### 2.1 As três suspeitas do coordenador

| Suspeita | Veredito | Medida |
|---|---|---|
| **Margem horizontal inconsistente a 1440** | **CONFIRMADA.** São 5 seções a 64 e 5 a 72 | Borda esquerda do 1º pixel de texto (lum > 140) por faixa, com `medida-margem.py`: **x 64–65** no hero (H1 y 132–280, subtítulo y 320–398, CTA y 435–494), nas 5 cópias do H2 do tour (y 2707, 3628, 4549, 5430, 6423), no glance (y 8631–9139) e no rodapé (y 11774). **x 72–74** no Notice (H2 y 1260–1350, "1" em y 1637), nos depoimentos (y 1988–2069), no About (y 9464–9850), no FAQ (y 10053–10188) e no final (y 10838–11037). A borda direita acompanha: o cartão do Notice e o do formulário final terminam em **x 1368**, enquanto o botão Diagnosis, o "AEST 14:32" do tour e a lista do glance terminam em **x 1376**. O brief fixa margem 72 (V2.4). Numa rolagem, o texto anda 8 px para dentro e para fora 4 vezes. Um tipógrafo vê isso. |
| **Hero a 390: "90 days" encosta em "24/7"** | **CONFIRMADA** | Na linha dos valores (y 438–468), os segmentos de tinta são "90" x 20–55, "days" x 66–**129** e "24/7" x **138**–202. O vão entre colunas (**9 px**) é **menor que o espaço entre "90" e "days" (11 px)**, então a linha se lê "90 days 24/7" como uma frase só. O "s" termina em x 129, a 1 px do fim de uma caixa de 110 px (x 20–130), e na ampliação (`m-defeitos.png`, 3º painel) ele parece aparado. O mesmo acontece nos quadros Q4 e Q5 da intro a 390. A 768 está certo (t768, y ≈ 590). |
| **Contraste do texto sobre a noite (camada a 55%)** | **PARCIALMENTE CONFIRMADA** | Corpo de 20 px `text.2` (178,172,187), em x 72–700, y 10955–11040. Sobre o fundo mediano (13,7,10): **WCAG 9,1:1, APCA Lc −58,7**. Sobre o 1% mais claro do fundo sob o texto (78,76,82; são as mesas brancas do render vazando pelo véu): **WCAG 3,84:1, abaixo do AA (4,5) para 20 px/400.** O H2 passa folgado (17,8:1 no mediano, 7,5:1 no pior caso). Pela régua APCA, um corpo de 20 px pede Lc ≥ 60, e o mediano já fica em 58,7. O véu parece uniforme, sem reforço na coluna de texto: a luminância média da coluna de texto (24,4) é **maior** que a de cima do cartão (9,5). O brief pede 55% "nas áreas de texto", e na coluna esquerda o véu precisa ser mais forte. |

### 2.2 Defeitos novos ou que sobraram

| # | Defeito | Onde (x, y) | Evidência | Dono |
|---|---|---|---|---|
| 1 | Margem 64 × 72 (acima) | 10 faixas | `medida-margem.py` | figma-architect |
| 2 | "90 days" colado em "24/7" a 390 (acima) | (20–202, 438–468) | m-defeitos | figma-architect (valor a 22 px ou colunas com gutter de 12) |
| 3 | **Rodapé cortado a 390**: "…companies in Au" | (20–**387**, 9205–9230) | m-defeitos, 2º painel; a tinta chega a x 387 | figma-architect (quebrar linha) |
| 4 | **CTA solto no fluxo a 390**, entre o About e o FAQ: botão menta 350×50, colado no fio do About (cerca de 7 px abaixo do fio em y ≈ 6762, que por sua vez está a ~4 px de "companies.") | (20–370, 6769–6819) | m-defeitos, 1º painel; faixa menta medida em y 6769–6819 | figma-architect (a `StickyCTA` vai como camada fixa com fundo e safe-area num frame à parte, e não no fluxo) |
| 5 | Margem direita 1368 × 1376 | cartões do Notice e do final × nav, tour e glance | d-0, d-2, d-5, d-6 | figma-architect |
| 6 | **Vãos no `DeskPanel`**: ~150 px vazios entre o `ApprovalCard` e "You approve" (Follow-up) e ~185 px no Bookkeeper | (876–1342, ~4290–4440) e (876–1342, ~5145–5330) | d-2, d-3 | ui-ux-director → figma-architect (2 `ActivityRow` a mais, ou a altura do painel acompanhando o conteúdo) |
| 7 | **Planta (A2) ilegível**: caixa preta de 285×137 (o brief pede 176×112) com 7 traços soltos que não leem como mesas; só a atual tem nome | (96–381, 4351–4488) e repetida nas paradas; a 390 em (20–163, 5730–5795) | d-2, d-3, m-1 | ui-ux-director (a planta tem que lembrar a maquete: as paredes e as 7 mesas na posição) |
| 8 | **"Decline" em duas cores**: vermelho de alerta no cartão compacto e roxo no cartão YOU. Recusar não é erro (memória do dono: vermelho só para alerta) | compacto (997–1050, 4257) e (997–1050, 5118); YOU (797–861, 6141) | d-2, d-3 | figma-architect |
| 9 | **Bloco FIELD do frame States quebrado**: os campos ficaram com ~40 px de largura, o placeholder "Jane Smith" sai em letras na vertical ("e / S / m") e cada mensagem de erro quebra uma palavra por linha ("lette / rs.") | states-full ≈ (64–560, 100–680) | `states-0.png`, topo | figma-architect |
| 10 | Viúva no título do cartão YOU: "…no reply for 6 / **days?**" a 28 px | (542–620, 5795–5815) | d-3 | copy-director (a versão de 390, "Follow up on a quote, no reply in 6 days?", resolve) |
| 11 | O quadro "Entrada" do tour **repete a imagem do hero**, com as mesmas 7 placas na mesma posição, 1.700 px abaixo | hero (0–1440, 520–1160) × tour (0–1440, 2900–3600) | d-0, d-1 | ui-ux-director (o mergulho pode partir do próprio hero, ou a entrada pode abrir mais perto, já na zona da mesa 1) |
| 12 | Vão de ~260 px no Notice entre o H2 e a `<ol>` (a lista alinhada à base do cartão deixou um buraco no campo roxo) | (72–700, 1360–1620) | d-0 | ui-ux-director |
| 13 | **O `NightLog` não tem régua**: só os rótulos 00…24; não há trilho, e o marcador "Sydney 02:14" não está sobre a hora | (92–580, 11345–11400) | d-6; m-1, 3ª coluna | figma-architect |
| 14 | "Render provisório" queimado na arte (o V2.4.2 manda para a camada de anotação) | (1240–1425, 1140), (660–805, 4510), (325–470, 6311), (1280–1425, 7926) e no 390/768 | d-0, d-2, d-3, d-4 | figma-architect |
| 15 | Os números do passo no Notice desalinham o texto: "Fill" começa em x 93 e "A specialist" em x 97 (largura proporcional do "1" e do "2") | (72–97, 1637 e 1716) | d-0 / d-1 | figma-architect (algarismos tabulares ou coluna fixa para o número) |
| 16 | Painel do quadro Reduced motion em cols 1-8, com cols 9-12 vazias | (930–1376, 8057–8495) | d-4 | ui-ux-director (é o quadro alternativo; vale desenhar com o painel em 8 colunas e a planta em abas ao lado) |
| 17 | Placeholder noturno a 390 com o cartão final do anúncio ("BRANDUP @brandup.aus") queimado | (0–390, ~8000–8040) | m-1, 3ª coluna | ui-ux-director (trocar o quadro do placeholder) |

### 2.3 O que o v1 apontou e foi resolvido (conferido)
Campos com o `Field` de 56 px, placeholder e `+61` (d-0, y 1325–1490). Os chips em 1×4 a 1440 e 2×2 a 390 e no final, de 44 px e sem seleção (d-0, y 1543–1587; d-6, y 11112–11208). A privacidade em 2 linhas no final (y 11526–11547). O destaque roxo no gancho (64–517, 178–231) e o 700 no Notice. As 7 placas distintas, com 2 traços e o pacote LEAD (d-0). A colisão a 390 sumiu: 56 px de respiro antes da faixa (m-0, y 960–1019). A resposta do FAQ certa a 390 (m-1). Os passos sem repetição. Nenhum eyebrow de seção. Todos os H2 com ≤ 2 linhas a 1440 (as faixas de H2 medem 80–90 px). Os depoimentos em largura total, com o próximo na borda e os controles 1/3 ←→. O About em colunas. O formulário final alinhado ao topo do H2 (y ≈ 10831) e à base do `NightLog` (y 11597). Os frames de nav top/scrolled, os estados da `AgentPlate`, o disabled, o hover e o foco do depoimento e do FAQ, o success sem corte e o 768.

---

## 3. Banca 1: Awwwards, júri principal (6 jurados × 4 critérios, v1 → v2)

Descarte de 1 nota por critério: a mais distante da média.

| Critério (peso) | Dir. de arte | Líder de UX | Creative tech | Tipógrafo | Conteúdo | A11y/perf | Descartada | **v2** | v1 |
|---|---|---|---|---|---|---|---|---|---|
| Design (40%) | 6,0 | 6,5 | 6,5 | ~~5,5~~ | 6,5 | 6,0 | 5,5 | **6,3** | 4,8 |
| Usability (30%) | 6,5 | 6,0 | 6,5 | 6,0 | 6,5 | ~~5,5~~ | 5,5 | **6,3** | 5,1 |
| Creativity (20%) | 6,5 | 6,0 | 6,5 | 6,0 | ~~7,0~~ | 6,0 | 7,0 | **6,2** | 5,0 |
| Content (10%) | 6,5 | 6,5 | 6,5 | 6,5 | ~~7,0~~ | 6,5 | 7,0 | **6,5** | 5,8 |

**Ponderada: 0,4·6,3 + 0,3·6,3 + 0,2·6,2 + 0,1·6,5 = 6,30 → 6,3** (v1: 5,0)

- **Design 6,3 (+1,5).** O que sobe: a maquete sangrando sem caixa, com a transição do `ink.950` para a imagem (d-0, y 520–640); a hierarquia do hero (gancho com o bloco roxo → CTA → números → placas); a parada YOU (d-3, y 5640–6210), com uma escala que segura a tela; o ritmo do V2.4.7 de fato sem repetir forma; a faixa roxa com o cartão de 636 e os campos de 266×56. O que segura: a margem 64/72 (#1, #5), que o tipógrafo puniu com a nota descartada; os vãos do painel (#6); a planta ilegível (#7); o hero repetido no tour (#11); o vão do Notice (#12); e o render placeholder, que ainda tem xadrez, neon e grama (não penalizado como acabamento, mas é a imagem que o jurado vê).
- **Usability 6,3 (+1,2).** O que sobe: o CTA e os números na primeira dobra a 1440 (y 435–500) e a 390 (y 361–421); o formulário a ~255 px do topo da faixa a 390; o reduced motion desenhado; os focos desenhados (botão com anel e vão, o FAQ, o depoimento); o Approve com 56 px. O que desce: o rodapé cortado (#3), o CTA solto (#4), os números colados (#2), o contraste do pior caso na noite e os rótulos mono de 11 px com Lc ≈ −38 (§2.1, e o hero em (509–625, 472–500)). O jurado de a11y deu 5,5 pelo contraste APCA; essa nota foi a descartada.
- **Creativity 6,2 (+1,2).** A ideia agora aparece: a fila de aprovação com o "Why" e a prévia da mensagem (o fragmento jimo, sem a forma do jimo); a legenda do anúncio com o bloco roxo (B10); a intro em que as 7 luzes viram os LEDs. O que segura é o cético: "escritório isométrico com etiquetas" segue um padrão conhecido, e a planta e o `NightLog` (os dois "live things" possíveis) estão fracos no desenho.
- **Content 6,5 (+0,7).** A copy é específica: "Quote sent Mon 2 Nov, A$14,200", "Opened twice, no reply in 6 days", "Hi Sam, checking the quote for the 40 steel brackets…", "Matched 41 incoming payments". "A$10 million" agora tem a moeda. Pesam contra a viúva "days?" e o ABN placeholder no rodapé. Os depoimentos não contaram, por decisão.

---

## 4. Skill `design-taste-frontend` (crítica)

```
ROUND 2 (crítica, sem correção: é júri)
Seen in one second: o gancho com o bloco roxo, depois a maquete sangrando com as placas.
Idea (one sentence): "A maquete da sua empresa, funcionando": cada mesa é um agente, e você aprova da sala YOU.
                     AGORA VISÍVEL (o hero e a parada YOU).
Live thing: o ApprovalCard da parada YOU (Approve → a linha "Approved…" e o próximo cartão sobe, quadro 4b).
            Desenhado, mas não provado em movimento.
Layout words: hero=full-bleed statement / notice=split no campo de cor / testimonial=single wide card + peek /
              tour=sticky stage (maquete | painel → maquete pequena | fila) / glance=list / about=columns /
              faq=split / final=full-bleed scene + form / footer=bar
Scores: design 6,5 · usability 5 (teto) · creativity 6,5 · content 6,5 → overall 6,0
Caps aplicados:
  - conteúdo cortado fora da tela (rodapé a 390, #3) → usability ≤ 5   [cai com 1 quebra de linha]
  - hairlines no glance, no FAQ, nos fatos do About e no rodapé → aceitas como estrutura (regra do dono); sem teto
  - eyebrows de seção: nenhum → teto removido (era o principal do v1)
  - competitor test: "escritório isométrico de agentes" ainda passa para outra agência → creativity ≤ 7 (não morde)
Top 3 (o mais visível primeiro):
 1. As margens 64/72 e as bordas direitas 1368/1376. Fix: tudo a 72 (o grid do brief), nav e rodapé incluídos.
 2. O celular: números colados, rodapé cortado, CTA solto no fluxo. Fix: §2.2 #2, #3, #4.
 3. Os vãos do tour (painel, planta, Notice). Fix: o painel acompanha o conteúdo e a planta vira a planta da maquete.
```
O que a taste ainda nota, mas não pune: as linhas pontilhadas do voo dos LEDs no Q4 da intro (intro-1440, 2º painel de baixo) lembram um "grafo de rede". Fica no limite do decorativo. Na motion real, com 300 ms, ninguém as vê como desenho; se o frontend-studio as fizer persistir, viram slop.

---

## 5. O que ainda sobe a nota (em ordem de impacto)

| # | Correção | Evidência | Banca / critério | Ganho | Dono |
|---|---|---|---|---|---|
| 1 | **Lote de execução (antes de mostrar ao dono)**: tudo na margem 72 e na borda direita 1368, incluindo a nav e o rodapé; os números a 390 (valor a 22 px, ou colunas de 106 com gutter de 12); o rodapé a 390 quebrando linha; a `StickyCTA` fora do fluxo, num frame próprio com fundo e safe-area; o bloco FIELD do States refeito com as instâncias de largura real; o "Decline" numa cor só (ghost-link `text.2` ou roxo), nunca vermelho; os algarismos tabulares nos passos; o "Render provisório" para a camada de anotação. | §2.1; §2.2 #1–5, #8, #9, #14, #15 | Design + Usability; taste (tira o teto de 5) | **+0,2–0,25** (passa de 6,3 para ~6,5–6,55: a linha da HM) | figma-architect |
| 2 | **O tour sem vão**: o `DeskPanel` com 3–4 `ActivityRow` (o brief pede de 3 a 4; hoje há 2) ou com a altura acompanhando o conteúdo; a planta como miniatura da maquete (as paredes + 7 mesas na posição do `desks.json`, 176×112, o nome curto de cada mesa ao passar); o quadro Entrada partindo do hero, em vez de repeti-lo. | #6, #7, #11 | Design + Creativity; FWA (navegação) | +0,1 e +2–3 FWA | ui-ux-director → figma-architect |
| 3 | **Contraste por par tamanho × Lc**: o véu da noite mais forte na coluna de texto (≥ 75% de `ink.950` sob o texto, como gradiente lateral funcional); o `text.2` dos corpos de 15 px (FAQ, glance, painel, medidos com Lc ≈ −51 a −53) subindo para Lc ≥ 60; os rótulos mono de 11 px (os números do hero, "WHY", o setor, "WHILE YOU SLEPT", com Lc ≈ −38) indo a 12–13 px ou a `text.1`. Confirmar no código: a medida foi feita sobre a captura, e a antisserrilha puxa a cor do glifo fino para baixo. | §2.1; `medida-contraste.py` | Usability (a11y) | +0,1 | type-director (tokens e tamanhos) · ui-ux-director (o véu) |
| 4 | **O `NightLog` com régua de verdade**: o trilho de 24 h, os ticks de atividade da noite e o marcador "02:14" sobre a hora. É o segundo "live thing" da página e a rima com o hero. | #13 | Design + Creativity; FWA (narrativa) | +0,05 e +1–2 FWA | ui-ux-director → figma-architect |
| 5 | **O Notice sem o buraco**: a `<ol>` logo abaixo do H2 (com 48 px) e o espaço da base para uma prova concreta (o "5 minutes" com a hora comercial de Sydney, ou o rosto do especialista quando houver foto real). | #12 | Design (composição) | +0,05 | ui-ux-director |
| 6 | **A intro, completa no Figma**: o frame de anotação com a curva e o "pulável" desenhado (o "Skip intro" visível com foco; o `pointerdown` encerra em 150 ms; a lista do "quando não roda"); a 390, o voo do símbolo passando pela linha da nav, e não por cima de "90 DAYS BY" (intro-390, Q4). | §6 | Usability (protege); FWA (técnica) | protege ~0,1 de Usability | ui-ux-director → figma-architect |
| 7 | **O render adulto do §8.3** (plinto, argila fosca, menta só na mesa ativa, sem xadrez, sem grama, sem neon e sem texto queimado; a noite como noite, e não como um dia escurecido). É o maior salto que sobra. | d-0, d-6 (o xadrez em (600–840, 11050–11500)) | Design + Creativity; FWA | **+0,4–0,6** e +6–10 FWA | ui-ux-director (direção) · dono (a fonte 3D) |
| 8 | **A aprovação viva em código**: Approve → "Approved. Follow-up sent to Sam." → o próximo cartão sobe, com os pacotes correndo entre as mesas e o mergulho E7 a 60 fps. Só a motion real prova a ideia ao FWA. | quadros 4 e 4b (d-3) | Creativity; FWA (técnica); Developer Award (Animations), mais tarde | +0,1–0,2 e +5 FWA | frontend-studio |

Teto realista: com os itens 1–6, o mock chega a **6,6–6,8** (HM com folga). Com o 7 e o 8, **7,0–7,3** (nível SOTD) fica plausível. Sem o render adulto, não passa de ~6,8.

---

## 6. A intro (quadros) contra as regras do brief

| Regra (V2.3) | Veredito | Evidência |
|---|---|---|
| ≤ 1,1 s (1440) / 0,9 s (390) | **Passa** | Os rótulos dos quadros: Q5 em 1.100 ms (1440) e em 900 ms (390). O conteúdo aparece a 900 / 760 ms (Q4). |
| H1, subtítulo, CTA e números pintados por baixo desde o 1º quadro | **Passa no desenho** | Q4 mostra o hero inteiro sob o véu a ~50%, e Q1 traz a nota "opacidade real 0" no símbolo. O hero por baixo só se prova no código (o overlay sai por opacidade; nada de reveal no H1). Ressalva: no Q4, o símbolo cruza o H1 ("MONTH" a 1440; "90 DAYS BY" a 390). Dura ~100 ms e sobre o véu, aceitável, mas a rota pela nav é mais limpa. |
| Pulável | **Não verificável no mock** | Nenhum dos 10 quadros nem as capturas mostram o "Skip intro" com foco nem a nota do `pointerdown`; o frame de anotação com a curva não veio nas capturas. Precisa ser desenhado (§5, #6). |
| Sem intro com reduced motion, em 2ª visita, com âncora, Save-Data | Não avaliado | É regra de código; não há quadro dela (e não precisa ter). |
| A ideia | **Boa e própria** | As 7 luzes que acendem (Q3) e descem até os LEDs das placas (Q4, 1440) ligam a abertura ao produto: dá para dizer o que aconteceu ("o escritório abriu"). É a melhor ideia nova do v2 para o FWA. A 390, os LEDs passam por cima da linha dos números no Q4 ("24/7 • • ○"), mas é transitório. |

---

## 7. Banca 3: FWA (0–100)

Dispositivo: **desktop 1440**. O palco do tour, a mudança de escala na parada YOU e o voo dos LEDs só existem inteiros ali.

| Jurado | v1 | **v2** | Por quê |
|---|---|---|---|
| Caçador de inovação | 52 | **60** | A fila de aprovação com o "Why" na sala do dono da maquete é um argumento de produto com forma própria. Ainda não se vê funcionando. |
| Diretor de arte | 50 | **60** | O hero sangrando e a parada YOU têm presença; as margens trocando e os vãos do painel tiram o acabamento. |
| Técnico de WebGL/interação | 48 | **56** | O mergulho é zoom de imagem e os pacotes são SVG: honesto e barato, mas não empurra limite. Sem motion, não há técnica para julgar. |
| Narrador | 56 | **64** | Luzes acendem → escritório trabalha → você aprova → "While you slept". O arco agora está desenhado de ponta a ponta. |
| Cético de "já vi isso" | 47 | **55** | O escritório isométrico de agentes com etiquetas segue conhecido. O que o salva é a aprovação, não a maquete. |

**Média: 59** (v1: 51). O FOTD exige ≥ 70: a ideia está lá, mas o FWA vota no que vê funcionando, então os itens 7 e 8 do §5 são o caminho. Na lente histórica (só secundária), Navigation sobe (a nav e os estados desenhados), mas a planta fraca a segura; Graphics fica preso ao render placeholder.

---

## 8. Comparação com o v1 e com o jimo.ai

- **v1 → v2**: +1,3 no Awwwards, +8 no FWA, +0,9 na taste. Todos os 15 defeitos do v1 foram tratados (§2.3). O que sobrou é de uma classe diferente: deslizes de execução, e não falta de conceito.
- **jimo.ai** (as fotos do v1, `juri-v1-fotos/jimo-d-0..2`; não reabri nesta rodada): a lição era o "fragmento de produto grande, inteiro e com dado plausível". A parada YOU agora cumpre isso: 856 px, a ação em 28 px, o valor, o "Why" e a prévia (d-3, y 5640–6210). **O teste de sobreposição do brief passa**: não há janela de app, chat lateral nem abas, e o H2 do tour tem as palavras brancas, alinhadas à esquerda, com o bloco roxo (e não acendendo num vazio). A distância que sobra para o jimo é a do acabamento: nenhuma borda de texto fora do lugar, nada cortado, e a cena 3D com qualidade de produção. **Não há cópia do jimo.**

---

## 9. O que já está no nível (não mexer)

1. **A parada YOU** (d-3, y 5640–6210; a 390 em m-1, 1ª coluna, y 5110–5630): a escala, o "Why" em mono, a prévia e o Approve como o único menta.
2. **O hero sangrando**, com o bloco roxo, a linha CTA + números e as 7 placas distintas; na dobra de 900 aparecem 4 placas (d-0, y 120–1160).
3. **Os formulários** a partir do `Field`: o Notice com 2 colunas de 266×56 e chips 1×4 sem seleção (d-0, y 1256–1750); o final alinhado ao H2 e ao `NightLog` (d-6).
4. **Os H2 curtos e sem eyebrow** em toda a página (≤ 2 linhas a 1440; as faixas de H2 medem 80–90 px).
5. **A ideia da intro** (as luzes → os LEDs das placas), dentro de 1,1 s (intro-1440, Q3–Q5).

---

## 10. Não avaliado

- **Developer Award**: não há código.
- **Motion** (o mergulho E7, os pacotes, o bloco B10 pulando, o voo dos LEDs, a fila subindo): o mock é estático; julguei os quadros e as notas.
- **O "pulável" da intro**: não está desenhado nas capturas.
- **O contraste real dos tokens**: medi sobre a captura do Figma. A antisserrilha subestima a cor do glifo fino (sobretudo o mono de 11 px), então os Lc reais podem ser um pouco melhores. Confirmar no código com a cor computada.
- **O acabamento do render e o texto dos depoimentos**: placeholder, por decisão.
- **As fotos do jimo a 390**: não abri.
