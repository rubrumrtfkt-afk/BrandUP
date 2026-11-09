# BrandUp — copy do redesign (inglês australiano)

**v3 — alinhada ao brief v2 e ao júri v1** (+ ajuste: ação e prévia “(mobile)” nos 3 cartões da fila You) (`brief-direcao.md` bloco V2, `juri-v1.md`). Autor: copy-director, 08/11/2026 (noite). A v2 estava “alinhada ao brief” v1.

**O que mudou na v3 (para o figma-architect reler):**
1. Todo H2 com versão que cabe em ≤ 2 linhas a 1440 e ≤ 3 a 390 (tabela “Medida dos H2” logo abaixo). Onde há duas versões, a do mock é a marcada **(usar)**.
2. Eyebrows de seção **saem** (brief V2.4.8): ficam listados como “não usar”. O mono fica só no dado.
3. Erro **próprio por campo** (name, company, work email, mobile, revenue) em §2.3. A mensagem do celular só aparece no campo Mobile.
4. Passo 02 do Notice com corpo próprio; os passos viram `<ol>` sem “01/02” em mono.
5. Novos: as 3 linhas “Why”, o valor, o canal e a prévia de cada `ApprovalCard` da sala You; rótulos dos números do hero em 2 linhas de ≤ 14; os 3 fatos do About (termo + linha); a linha de apoio do tour; os slots pendentes do depoimento; “Skip intro”.
6. “Over 10 million” ganhou a moeda como `A$` **a confirmar** com o dono.

**Medida dos H2** (estimativa para Montserrat 500 a ~0,55 em por caractere; o type-director mediu só o gancho, então isto precisa de uma conferência dele no Figma):

| Seção | H2 do mock | Car. | Largura 1440 (cols) | Linhas 1440 | Linhas 390 (350 px) |
|---|---|---|---|---|---|
| Notice | **Do not leave now!** Your team is waiting. | 39 | 526 (1-5) | 2 (quebra em “now!”; “Your team is waiting.” fica no limite da coluna, conferir) | 2 |
| Testimonials | In their own words. **Their businesses.** | 40 | 746 (1-7) | 2 | 2 |
| Live office | This employee is never late. / And never asks for a raise. | 56 | 966 (1-9) | 2 (quebra forçada) | 390 usa “Never late. Never asks for a raise.” (35), 2 linhas |
| About | AI automation for B2B companies that need to sell every day. | 60 | 1052 (1-10) | 2 | 3 |
| FAQ | What owners ask before starting. | 32 | 416 (1-4) | 2 | 2 |
| Final | Want a team like this in your business? | 39 | 636 (1-6) | 2 | 390 usa “Want a team like this?” (22), 2 linhas |

Se “Your team is waiting.” quebrar em 3 linhas a 526 px, a alternativa é “Your team’s waiting.” (20 car.).

O que mudou da v1: Agents e Live office viraram uma seção só (o tour pelo escritório 3D “BrandUp HQ”, fechando com “All agents at a glance”). Entraram os rótulos das mesas, as placas, os pacotes, a fila da sala YOU, o “While you slept” e a seção final com o formulário. O hero ganhou subcopy de celular, os passos do Notice ganharam versão de uma linha, o FAQ cobre os temas do brief (custo/contrato, erro do agente, Spam Act). A seção “Exclusive team” saiu: o brief não tem mais esse bloco, e o papel dela passou para a seção final. As frases da propaganda (que são da BrandUp) viraram os títulos do tour.

Convenções: `**negrito**` = destaque (no gancho, o fundo roxo `brand.500`). Caixa alta é CSS/Figma (Text case → Upper): rótulos de mesa, pacotes e eyebrows estão escritos em caixa normal. Contagem sem os `**`; quando o brief dá limite, aparece “car. / limite”. Ortografia australiana (enquiry, organise, personalised); AUD.

Medidas usadas (brief §5 e §6.2): H2 30 px a 390 em 350 px dá ~21 car./linha, então “H2 ≤ 2 linhas” vira ≤ 42 car.; corpo 17 px a 390 dá ~40 car./linha (subcopy ≤ 3 linhas ≈ 120); subcopy 20 px em cols 3-10 a 1440 dá ~78 car./linha (3 linhas ≈ 230). Estimativa para Montserrat; o type-director confirma com a família final.

## 1. Voz em 5 linhas

1. Fala como um sócio comercial que já viu a empresa por dentro: direto, com número, com pressa de fechar.
2. Mantém a agressividade do site e do anúncio (o gancho de $250K, “Do not leave now!”, “never asks for a raise”); cada promessa fica presa a uma coisa concreta que um agente faz.
3. Trata os agentes como funcionários com cargo (“your bookkeeper”), nunca como robô fofo nem como “solução”. Quem manda é o dono: a palavra final é sempre dele.
4. Usa: **desk**, **approve**, **follow-up** (e agent, office, 90 days).
5. Nunca usa: **solution**, **leverage**, **revolutionise** (nem seamless, unlock, empower, cutting-edge, bot).

Glossário: *AI office* / *BrandUp HQ* = o conjunto; *agent* = cada função; *desk* = o lugar do agente na maquete; *You* = a sala do dono; *approve* = a ação do dono; *enquiry* = contato que chega; *lead* = oportunidade; *diagnosis* = a reunião inicial.

## 2. Texto final por seção (ordem do brief §5)

### 2.1 Nav
| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Marca | BrandUp | 7 |
| CTA (botão secundário da nav) | Diagnosis | 9 |

Os ícones sociais saem da nav (brief §0.5) e vão para o rodapé.

### 2.2 Hero
| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Headline (H1, caixa alta via CSS) | How industrial and B2B companies are generating **over $250K per month** within 90 days by investing in automation and AI. | 118 |
| Subcopy desktop (1440, ≤ 3 linhas) | We build an office of AI agents that runs your marketing, social media, sales follow-up, finance and reporting, 24/7. You approve from anywhere. Over A$10 million in sales generated for our clients. | 198 / 230 |
| Subcopy celular (390, ≤ 3 linhas) | AI agents run your marketing, sales follow-up and finance 24/7. You approve every important move from your phone. | 113 / 140 |
| Subcopy celular — alternativa com prova | AI agents run your sales follow-up, marketing and finance 24/7. Over A$10 million in sales generated for our clients. | 117 / 140 |
| CTA primário | Build my AI office | 18 |
| Stat 1 | 90 days | 7 |
| Stat 1 — rótulo, linha 1 (mono) | to get your | 11 / 14 |
| Stat 1 — rótulo, linha 2 | office working | 14 / 14 |
| Stat 2 | 24/7 | 4 |
| Stat 2 — rótulo, linha 1 (mono) | agents on duty | 14 / 14 |
| Stat 2 — rótulo, linha 2 | weekends too | 12 / 14 |
| Stat 3 (menta) | $250K | 5 |
| Stat 3 — rótulo, linha 1 (mono) | client revenue | 14 / 14 |
| Stat 3 — rótulo, linha 2 | generated | 9 / 14 |
| Skip intro (só teclado/leitor de tela) | Skip intro | 10 / 12 |
| Placas compactas na maquete do hero | os rótulos de mesa + a leitura de §2.5 (ex.: “Your follow-up · 12 leads today”, “You · 2 waiting”) | 98 |

Recomendo a subcopy de celular com a aprovação: é a parte que nenhum concorrente mostra (brief §11) e liga direto com a placa “You · 2 waiting” que aparece logo abaixo. “A$” é a moeda **a confirmar** (o júri marcou a falta); se o número não for em AUD ou não puder ser comprovado, sai. A prova dos 10 milhões fica no desktop e o $250K continua nos números. Se o dono preferir a prova no celular, usar a alternativa.

### 2.3 Notice + formulário `#diagnostic`
| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Eyebrow | não usar (brief V2.4.8) | 23 |
| H2 (usar, 1440 e 390) | **Do not leave now!** Your team is waiting. | 39 / 42 |
| H2 longo (aposentado) | ~~Do not leave now! You are only a few seconds away from structuring your company to sell more.~~ | 97 |
| Passo 1 — título (`<ol>`, 22 px) | Fill in your details | 20 / 45 |
| Passo 1 — linha de 15 px | Five fields. We only use them to call you. | 42 / 60 |
| Passo 2 — título | A specialist calls you within 5 minutes | 39 / 45 |
| Passo 2 — linha de 15 px | During business hours, to map where AI can save you time. | 57 / 60 |
| Rótulo — nome | Name | 4 |
| Rótulo — empresa | Company | 7 |
| Rótulo — e-mail | Work email | 10 |
| Rótulo — telefone (recomendado) | Mobile | 6 |
| Rótulo — telefone (alternativa) | Mobile (WhatsApp) | 17 |
| Chip fixo do telefone | +61 | 3 |
| Placeholder — nome | Jane Smith | 10 |
| Placeholder — empresa | Company name | 12 |
| Placeholder — e-mail | jane@company.com.au | 19 |
| Placeholder — telefone | 4XX XXX XXX | 11 |
| Rótulo — receita (grupo de chips) | Monthly revenue (AUD) | 21 |
| Chip 1 | Under $100K | 11 |
| Chip 2 | $100K–$300K | 11 |
| Chip 3 | $300K–$1M | 9 |
| Chip 4 | Above $1M | 9 |
| Botão | Build my AI office | 18 |
| Sending (botão) | Sending… | 8 |
| Error (faixa acima do botão) | Your details didn’t go through. Your answers are still here. Try again. | 71 |
| Error — ação | Try again | 9 |

**Erros por campo** (14 px sob o campo; um campo, uma mensagem; nenhum texto se repete entre campos)

| Campo | Vazio | Inválido |
|---|---|---|
| Name | Add your name so our specialist knows who to ask for. (53) | Your name needs at least 2 letters. (35) |
| Company | Add your company name so we can prepare for the call. (53) | Company name needs at least 2 characters. (41) |
| Work email | Add your work email. (20) | Check your email. It needs an @ and a domain, like jane@company.com.au. (71) |
| Mobile | Add your mobile so we can call you. (35) | Enter an Australian mobile, like 412 345 678. (45) |
| Monthly revenue (AUD) | Choose a revenue range. (23) | — (0) |

| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Success (quadro de referência no mock) | Thanks, your details are in. A specialist will call you within 5 minutes during business hours. | 95 |
| Privacidade (13 px) | We only use your details to respond to your enquiry. Read our privacy policy. | 77 |

Faixas em chips (o rótulo já diz AUD, então o chip leva só `$`). Classificação proposta: **Above $1M = A**, **$300K–$1M = A**, **$100K–$300K = B**, **Under $100K = C**. Os chips enviam o valor completo para a base (ex.: `AUD 300k to AUD 1M`). Continua valendo o aviso da v1: a regra de valores aceitos em `supabase/migrations/20260721143800_create_leads.sql` só aceita as faixas antigas, e `src/lib/leadboard.ts` e `tests/leadboard.test.mjs` precisam acompanhar antes do formulário novo ir ao ar.

A v1 do mock mostrava “Enter an Australian mobile…” sob Name, Work email e revenue: essa frase é só do Mobile. Os mínimos (2 letras, 2 caracteres) são os do `minLength` atual em `src/App.tsx`.

O botão do formulário passou de “Request my diagnosis” para “Build my AI office”: o brief fixa uma ação primária com um só rótulo na página inteira. O passo 02 diz o que acontece depois do clique.

Telefone: recomendo **Mobile**. Na Austrália o primeiro contato B2B é ligação ou SMS, e o passo 02 promete ligação. “Mobile (WhatsApp)” só se o time realmente atende por WhatsApp (decisão do dono).

### 2.4 Testimonials (só o cabeçalho)
| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Eyebrow | não usar | 8 |
| H2 (usar) | In their own words. **Their businesses.** | 37 / 40 |
| Intro | The owners, the daily pressure, and what changed once their AI office started working. | 86 |
| Cartões (todos) | [Testimonial pending — client to supply] | 40 |
| Selo do estado placeholder | Pending | 7 |
| Slot citação | [Testimonial pending — client to supply] | 40 |
| Slot pessoa | [Name pending] · [Role, company pending] | 40 |
| Slot setor (mono) | [Sector · State pending] | 24 |
| Slot resultado (numeral 64) | [Result pending] | 16 |
| Slot rótulo do resultado (15 px) | [What the number measures, pending] | 35 |
| Controles | 1 / 3 · Previous · Next (aria) | 30 |
| Etiqueta de setor (exemplo de formato) | Manufacturing · VIC | 19 |

Os 4 depoimentos de restaurante não migram (ACL/ACCC, brief §9). Com zero depoimento real aprovado, a seção não vai ao ar (estado `empty` do brief); o resultado em número grande só com dado comprovado pelo cliente.

### 2.5 Live office: o tour pelo BrandUp HQ

**Cabeçalho da seção**

| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Eyebrow | não usar (o selo e o relógio ficam: são dado, não eyebrow) | 58 |
| Selo (sempre visível, lido antes do feed) | Example activity | 16 |
| Relógio (mono) | AEST 14:32 | 10 |
| H2 linha 1 (usar, 1440) | This employee is never late. | 28 |
| H2 linha 2 (usar, 1440) | And never asks for a raise. | 27 |
| H2 (usar, 390) | Never late. Never asks for a raise. | 35 |
| Linha de apoio sob o H2 (opcional) | Six agents, one desk each. Scroll to walk the office. | 53 / 60 |
| Corpo em cols 9-12 e “Meet your new team.” | saem (brief V2.4.1) | 19 |
| Botão de avanço (390) | Next desk → | 11 |
| Rótulo da planta (aria) | Office map: jump to a desk | 26 |

O bloco roxo (B10) fica parado em “late” no quadro estático.

**Rótulos de mesa (pílulas, caixa alta via CSS) e placas**

| Parada | Agente (nome no painel) | Rótulo da mesa | Car. / 18 | Leitura da placa | Car. / 28 |
|---|---|---|---|---|---|
| 1 | Marketing agent | Your ad manager | 15 | 2 ads paused, 1 scaled | 22 |
| 2 | Social media agent | Your social media | 17 | 3 posts ready for review | 24 |
| 3 | Customer service agent | Your receptionist | 17 | 9 enquiries answered | 20 |
| 4 | Sales follow-up agent | Your follow-up | 14 | 12 leads followed up | 20 |
| 5 | Finance agent | Your bookkeeper | 15 | 3 invoices overdue | 18 |
| 6 | Reporting agent | Your analyst | 12 | Weekly report sent 08:30 | 24 |
| 7 | Você (sala do dono) | You | 3 | 3 waiting for you | 17 |

Leituras de placa do hero (estado inicial do anúncio, antes do pacote chegar): “Ad set paused” (13), “12 leads today” (14), “2 waiting” (9). Quando o pacote LEAD chega ao Follow-up, a placa sobe para “13 leads today”; quando o APPROVAL chega ao You, “3 waiting”.

**Etiquetas dos pacotes (mono, caixa alta via CSS)**

| Etiqueta | Car. / 14 | Rota (de → para) |
|---|---|---|
| Lead | 4 | Ad manager → Follow-up |
| Enquiry | 7 | Receptionist → Follow-up |
| Post draft | 10 | Social media → You |
| Quote | 5 | Follow-up → You |
| Invoice | 7 | Follow-up → Bookkeeper |
| Payment | 7 | Bookkeeper → Analyst |
| Ad results | 10 | Ad manager → Analyst |
| Report | 6 | Analyst → You |
| Approval | 8 | qualquer mesa → You |

**As paradas do tour** (título de parada · função · feed “Today” · “You approve:”). Os títulos das paradas 1, 4 e 7 são as frases do anúncio; a numeração “Desk one/two…” segue a ordem do tour do brief, não a do vídeo (no vídeo o follow-up é a mesa dois e o ad manager a três). Se o dono quiser a numeração idêntica à do anúncio, basta trocar a ordem das paradas 1 e 4 no brief; o texto não muda.

**Parada 1**

| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Título da parada | Desk one: your ad manager. It watches your ads all day and tells you what’s working. | 84 |
| Função (1 linha) | Runs your Google, Meta and LinkedIn campaigns and cuts what isn’t bringing in leads. | 84 |
| Feed 10:02 · status Done | Paused an ad set after cost per lead rose 40% this week | 55 |
| Feed 13:10 · status Done | Moved $300 from a weak ad to the best-performing one | 52 |
| You approve: (≤ 60) | Budget changes above the limit you set | 38 / 60 |

**Parada 2**

| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Título da parada | Desk two: your social media. Posting every week, in your voice. | 63 |
| Função (1 linha) | Keeps your LinkedIn and Instagram posting every week, in your voice, approved by you. | 85 |
| Feed 09:15 · status Needs approval | Drafted 3 LinkedIn posts about the new product line | 51 |
| You approve: (≤ 60) | Every post before it goes live | 30 / 60 |

**Parada 3**

| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Título da parada | Desk three: your receptionist. Every enquiry answered, day or night. | 68 |
| Função (1 linha) | Answers website, email and WhatsApp enquiries in minutes, day or night. | 71 |
| Feed 07:05 · status Done | Answered 9 overnight enquiries and booked 2 site visits | 55 |
| Feed 12:31 · status Done | Sent a spec sheet to a new enquiry from the website | 51 |
| You approve: (≤ 60) | Any answer about price or delivery dates | 40 / 60 |

**Parada 4**

| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Título da parada | Desk four: your follow-up, so fewer leads go cold. | 50 |
| Função (1 linha) | Follows up every lead and quote until it becomes a meeting or a clear no. | 73 |
| Feed 06:12 · status Done | Followed up 12 leads from yesterday’s trade-show list | 53 |
| Feed 11:48 · status Needs approval | Drafted a follow-up for a quote sent 6 days ago, no reply yet | 61 |
| You approve: (≤ 60) | Follow-ups on quotes and anything with a price in it | 52 / 60 |

**Parada 5**

| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Título da parada | Desk five: your bookkeeper. Chases what you’re owed, politely. | 62 |
| Função (1 linha) | Tracks invoices, flags overdue payments and drafts reminders for you to approve. | 80 |
| Feed 06:40 · status Needs approval | Flagged 3 overdue invoices and drafted reminders | 48 |
| Feed 14:20 · status Done | Matched 41 incoming payments to open invoices | 45 |
| You approve: (≤ 60) | Every payment reminder before it’s sent | 39 / 60 |

**Parada 6**

| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Título da parada | Desk six: your analyst. One clear report, every Monday. | 55 |
| Função (1 linha) | Sends you one clear weekly report on sales, leads and cash. | 59 |
| Feed 08:30 · status Done | Sent this week’s sales and cash report to your inbox | 52 |
| You approve: (≤ 60) | Nothing. Reports are read-only | 30 / 60 |

**Parada 7**

| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Título da parada | Your office. They do the busywork. You make the calls. | 54 |
| Função (1 linha) | Everything that touches a client or your money lands here first. | 64 |

**Parada 7 — a fila de aprovação da sala You** (F6; todos os cartões sob o selo “Example activity”)

| Campo | Texto | Car. |
|---|---|---|
| Topo do painel | 3 actions waiting for you | 25 |
| Topo do painel (mono) | You · AEST 14:32 | 16 |
| Rótulo da seção de evidência (mono) | Why | 3 |
| Botões | Approve · Edit · Decline | — |

**Cartão 1 (aberto)**

| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Placa · hora (mono) | Your follow-up · 11:48 | 22 |
| Ação (28/1.2, ≤ 2 linhas) | Send a follow-up on a quote that’s had no reply for 6 days? | 59 / 70 |
| Valor (numeral 24) | A$14,200 | 8 |
| Destinatários | 1 recipient | 11 |
| Canal (mono) | Email | 5 |
| Why 1 (mono 13, ✓) | Quote sent Mon 2 Nov, A$14,200 | 30 / 36 |
| Why 2 (mono 13, ✓) | Opened twice, no reply in 6 days | 32 / 36 |
| Why 3 (mono 13, ✓) | Your usual follow-up is on day 5 | 32 / 36 |
| Prévia da mensagem (≤ 3 linhas) | Hi Sam, checking the quote for the 40 steel brackets landed well. Happy to adjust quantities or delivery dates if that helps. Talk soon. | 136 / 160 |
| Ação (mobile, 390, ≤ 2 linhas) | Follow up on a quote, no reply in 6 days? | 41 / 42 |
| Prévia (mobile, 390, ≤ 3 linhas) | Hi Sam, did the quote for the 40 steel brackets land well? Happy to adjust quantities or dates. | 95 / 110 |
| Estado approved | Approved. Follow-up sent to Sam. | 32 |

**Cartão 2 (borda 1)**

| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Placa · hora (mono) | Your bookkeeper · 06:40 | 23 |
| Ação (28/1.2, ≤ 2 linhas) | Send payment reminders for 3 overdue invoices? | 46 / 70 |
| Valor (numeral 24) | A$18,400 | 8 |
| Destinatários | 3 recipients | 12 |
| Canal (mono) | Email | 5 |
| Why 1 (mono 13, ✓) | 3 invoices 14–30 days past due | 30 / 36 |
| Why 2 (mono 13, ✓) | A$18,400 outstanding in total | 29 / 36 |
| Why 3 (mono 13, ✓) | No reminder sent this month | 27 / 36 |
| Prévia da mensagem (≤ 3 linhas) | Hi, a friendly reminder that invoice #1047 for A$6,200 was due on 21 October. Bank details are on the invoice. Thank you. | 121 / 160 |
| Ação (mobile, 390, ≤ 2 linhas) | Send reminders for 3 overdue invoices? | 38 / 42 |
| Prévia (mobile, 390, ≤ 3 linhas) | Hi, a reminder that invoice #1047 for A$6,200 was due on 21 October. Bank details are on the invoice. | 101 / 110 |
| Estado approved | Approved. Reminders sent to 3 clients. | 38 |

**Cartão 3 (borda 2)**

| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Placa · hora (mono) | Your social media · 09:15 | 25 |
| Ação (28/1.2, ≤ 2 linhas) | Publish 3 LinkedIn posts about the new product line this week? | 62 / 70 |
| Valor (numeral 24) | — | 1 |
| Destinatários | Company page | 12 |
| Canal (mono) | LinkedIn | 8 |
| Why 1 (mono 13, ✓) | New product line added on Monday | 32 / 36 |
| Why 2 (mono 13, ✓) | Last post went out 9 days ago | 29 / 36 |
| Why 3 (mono 13, ✓) | 3 posts drafted, photos attached | 32 / 36 |
| Prévia da mensagem (≤ 3 linhas) | Our new powder-coated bracket range is in stock in Melbourne and Brisbane. Same-day dispatch on orders before 2pm. Specs in the comments. | 137 / 160 |
| Ação (mobile, 390, ≤ 2 linhas) | Publish 3 LinkedIn posts this week? | 35 / 42 |
| Prévia (mobile, 390, ≤ 3 linhas) | Our new powder-coated bracket range is in stock in Melbourne and Brisbane, with same-day dispatch. | 98 / 110 |
| Estado approved | Approved. 3 posts scheduled for this week. | 42 |

As versões “(mobile)” valem para o cartão a 390 (290 px úteis, ação ~17 px, prévia ~15 px). Valor, destinatários, canal e “Why” não mudam.

O 4º pedido da v2 (Your receptionist, preço por volume) fica como reserva para o feed demo; sem “Why” escrito.

O cartão 1 fica aberto; 2 e 3 aparecem como bordas atrás. O brief V2.4.1 mostra o follow-up aberto com “Approved. Reminders sent to 3 clients.” no estado seguinte: essa mensagem é a do cartão do bookkeeper. Cada cartão tem o seu “approved” acima. Nomes (“Sam”), valores e números de nota são exemplo, cobertos pelo selo; nenhum é cliente real.

Estados do `ApprovalCard` e das linhas:

| Estado | Texto | Car. |
|---|---|---|
| pending | (o pedido) | — |
| approving | Sending… | 8 |
| approved (lembrete) | Approved. Reminders sent to 3 clients. | 38 |
| approved (genérico) | Approved. Your agent is on it. | 30 |
| edited | Edited. Your version goes out instead. | 38 |
| declined | Declined. The agent won’t send it. | 34 |
| failed / chip | Needs attention | 15 |
| failed / linha | Lost access to your inbox. Reconnect it to keep going. | 54 |
| fila vazia | All clear. Nothing waiting for you. | 35 |

Chips de status dos agentes: **Working** · **Needs approval** · **Done** · **Scheduled · 18:00** · **Needs attention**.

**Fechamento: All agents at a glance** (âncora `#agents`; lista de 6 linhas)

| Campo | Texto | Car. |
|---|---|---|
| Título | All agents at a glance | 22 |
| Marketing agent | Runs your Google, Meta and LinkedIn campaigns and cuts what isn’t bringing in leads. · You approve: Budget changes above the limit you set | 84 + 38 |
| Social media agent | Keeps your LinkedIn and Instagram posting every week, in your voice, approved by you. · You approve: Every post before it goes live | 85 + 30 |
| Customer service agent | Answers website, email and WhatsApp enquiries in minutes, day or night. · You approve: Any answer about price or delivery dates | 71 + 40 |
| Sales follow-up agent | Follows up every lead and quote until it becomes a meeting or a clear no. · You approve: Follow-ups on quotes and anything with a price in it | 73 + 52 |
| Finance agent | Tracks invoices, flags overdue payments and drafts reminders for you to approve. · You approve: Every payment reminder before it’s sent | 80 + 39 |
| Reporting agent | Sends you one clear weekly report on sales, leads and cash. · You approve: Nothing. Reports are read-only | 59 + 30 |

### 2.6 About
| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Eyebrow | não usar | 8 |
| H2 (usar) | AI automation for B2B companies that need to sell every day. | 60 / 60 |
| Corpo, coluna 1 | No company has just one problem. A lead goes cold while an invoice sits unpaid and the weekly report never gets written. We set up and run an office of AI agents inside your business, one for each area. | 202 |
| Corpo, coluna 2 | They share the same picture of your clients, your pipeline and your cash, so a lead that arrives at 11pm gets an answer before your competitor opens the inbox. You keep the final word on everything that matters. | 211 |
| Fato — termo (22) | One desk per area | 17 / 18 |
| Fato — linha (15, text.2) | Marketing, sales, finance and reports, each with an agent. | 58 / 60 |
| Fato — termo (22) | You approve | 11 / 18 |
| Fato — linha (15, text.2) | Anything that touches a client or your money waits for you. | 59 / 60 |
| Fato — termo (22) | Built for B2B | 13 / 18 |
| Fato — linha (15, text.2) | Manufacturers, distributors and B2B service companies. | 54 / 60 |
### 2.7 FAQ
| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Eyebrow | não usar | 8 |
| H2 (usar) | What owners ask before starting. | 32 / 36 |
| Link secundário | Talk to a person | 16 |

| # | Pergunta | Car. | Resposta | Car. |
|---|---|---|---|---|
| 1 | Do I need a tech team? | 22 | No. We set up, connect and run the agents for you. Your team only approves actions and tells us what is working. | 112 |
| 2 | How long until I see results? | 29 | The first agents usually start working within the first weeks. The plan is built around 90 days: enough time to connect your systems, tune each agent and measure the revenue it brings in. That is why we work on a minimum 3-month engagement. | 240 |
| 3 | How much does it cost? | 22 | A fixed monthly fee in AUD, set after the diagnosis call by how many agents your company needs. Minimum engagement of 3 months. [PLACEHOLDER: price range or starting price, if the owner wants it public] | 202 |
| 4 | Is my data safe? | 16 | Your data is used only to run your agents and is never shared with other clients. Each agent only accesses the accounts you connect, and you can ask us to remove your data at any time. [PLACEHOLDER: where data is stored, which AI providers process it, and the data processing terms] | 282 |
| 5 | Will the AI act without my approval? | 36 | Only where you allow it. You decide which actions run on their own, like answering a common enquiry, and which wait for you, like a payment reminder or a price. Agents only message people who have agreed to hear from your company. | 230 |
| 6 | What happens if an agent gets something wrong? | 46 | Every action is logged in your live office, so you see exactly what was done and when. Anything that touches a price, a payment or a client message can be set to wait for your approval, and our team reviews the agents every week. | 229 |
| 7 | Does it work with the systems I already use? | 44 | In most cases, yes. We connect the agents to your email, CRM, accounting software and social accounts. [PLACEHOLDER: confirmed integrations, e.g. Xero, MYOB, HubSpot, ERP] | 171 |

O júri achou, a 390, a pergunta 2 com a resposta da 5 (defeito de montagem no mock, não da copy): a resposta certa de cada pergunta é a da mesma linha desta tabela.

Saiu a pergunta “Do you only work with companies in Australia?” para abrir espaço aos temas do brief (custo, erro do agente). O público já está no H1 e no rodapé. As respostas 3, 4, 6 e 7 dependem do dono (§5). A frase do Spam Act (“only message people who have agreed…”) está na resposta 5 e só vale se a operação garantir o consentimento.

### 2.8 Office that never closes + formulário final
| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Eyebrow | não usar (“Office that never closes” vira o nome da seção no Figma) | 67 |
| H2 (usar, 1440) | Want a team like this in your business? | 39 / 42 |
| Corpo | Tonight, while you sleep, it follows up, chases invoices and writes tomorrow’s report. In the morning, everything is waiting on your phone for a yes or no. | 155 |
| CTA (LeadForm compact) | Build my AI office | 18 |
| Régua de 24 h (mono) | 00 · 06 · 12 · 18 · 24 | 22 |
| Marcador da régua | Sydney 02:14 | 12 |
| Título do bloco | While you slept | 15 |
| Selo do bloco | Example activity | 16 |
| Contagem (menta, número-chave) | **14 leads followed up** | 20 / 32 |
| Contagem | 9 enquiries answered | 20 / 32 |
| Contagem | 3 invoice reminders drafted | 27 / 32 |
| Contagem | 1 report ready for 8am | 22 / 32 |
| H2 celular (≤ 2 linhas) | Want a team like this? | 22 / 42 |

O H2 desktop (39 car.) dá 2 linhas a 1440 e 2 linhas a 390 no limite; se quebrar em 3, usar a versão curta. O formulário é o mesmo componente e os mesmos textos de §2.3.

### 2.9 Footer e metadados
| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Descrição | AI automation for industrial and B2B companies in Australia. | 60 |
| Links | Privacy policy · Contact · ABN [PLACEHOLDER: ABN] | 49 |
| Contato | [PLACEHOLDER: contact email] | 28 |
| `<title>` | BrandUp \| AI agents for industrial and B2B companies in Australia | 66 / 70 |
| `meta description` | BrandUp builds an office of AI agents for Australian industrial and B2B companies: marketing, sales follow-up, finance and reporting, running 24/7. | 147 / 160 |
### 2.10 Barra de CTA fixa (só 390, “em avaliação”)
| Campo | Texto | Car. (/ limite) |
|---|---|---|
| Botão | Build my AI office | 18 |

## 3. Variações

### Headline do hero

| | Texto | Car. | Ângulo |
|---|---|---|---|
| **Recomendada** | How industrial and B2B companies are generating **over $250K per month** within 90 days by investing in automation and AI. | 118 | Resultado. O gancho do dono, igual ao anúncio. |
| A | How industrial and B2B companies stopped losing leads overnight and are generating **over $250K per month** within 90 days with AI. | 126 | Dor: o lead que esfria fora do horário. |
| B | How industrial and B2B companies are generating **over $250K per month** within 90 days with an office of AI agents that never closes. | 132 | Produto: põe o escritório no H1. Melhor candidata a teste A/B. |

A 390 cada linha do gancho a 30 px tem ~17 car. em caixa alta; a recomendada já dá ~7 linhas, A e B dão 8. Mais um motivo para a recomendada.

### CTA principal

| | Texto | Car. | Ângulo |
|---|---|---|---|
| **Recomendado** | Build my AI office | 18 | Produto; o mesmo rótulo em hero, formulário, final e barra fixa (brief §1). |
| A | Grow my company | 15 | Resultado; transcrição direta de “Grow my restaurant”. |
| B | Meet my new team | 16 | Rima com o anúncio (“Meet your new team”); mais leve, menos comercial. |

## 4. Estados
Formulário em §2.3; tour, fila e `ApprovalCard` em §2.5; testimonials placeholder em §2.4.

## 5. Placeholders e fatos a confirmar com o dono
1. **$250K/mês em 90 dias e “over A$10 million”** (moeda a confirmar) para indústria/B2B: vieram de restaurantes? Sem comprovação para o novo público, risco de conduta enganosa (ACL). Alternativa honesta: “…can generate…”.
2. **Retorno em 5 minutos**: horário (AEST/AEDT; Brisbane sem horário de verão) e quem atende.
3. **O painel ao vivo com aprovação pelo celular existe?** Se ainda não, o tour é ilustração do que vem, e o corpo do Live office muda.
4. **Canais e integrações** citados nos cartões e no FAQ (Google, Meta, LinkedIn, Instagram, WhatsApp, Xero, MYOB, HubSpot, ERP).
5. **Preço** (FAQ 3): mostrar faixa ou só “fixed monthly fee”? Contrato mínimo de 3 meses pode aparecer?
6. **Dados** (FAQ 4) e **consentimento** (FAQ 5, Spam Act 2003): onde ficam, quais provedores de IA processam, prazo de exclusão; revisar `/privacy`.
7. **Revisão semanal dos agentes pelo time** (FAQ 6): é o que a operação faz?
8. **Depoimentos** reais do serviço novo; até lá, placeholder.
9. **ABN** e **e-mail de contato** para o rodapé.
10. **Telefone**: “Mobile” ou “Mobile (WhatsApp)”.
11. **Faixas de receita** e a classificação A/B/C; depois, migration + `leadboard.ts` + testes.

## Fontes da pesquisa de mercado (08/11/2026)
- Team 400, AI Agency Australia: https://team400.ai/ai-agency
- Team 400, AI Agent Developers Melbourne: https://team400.ai/ai-agent-developers-melbourne
- Australian Manufacturing, agentic automation: https://www.australianmanufacturing.com.au/why-agentic-automation-is-the-next-evolution-in-advanced-manufacturing/
- TechRepublic, agentic AI no trabalho australiano: https://www.techrepublic.com/article/agentic-ai-australian-workplace-2025/
- Brief de direção §11 (Relevance AI, Artisan, Lindy: posicionamento).
