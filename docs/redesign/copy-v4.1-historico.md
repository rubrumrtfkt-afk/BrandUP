# BrandUp — copy do redesign (inglês australiano)

**v4.1 — alinhada ao brief-v3.1** (`brief-v3.1.md` §7.1, sobre a v4 do brief-v3). Autor: copy-director, 09/11/2026. Limites de linha do `tipografia-v3.md` (H2 ≤ 26 car./linha a 1440, ≤ 22 a 390, ≤ 44 no total).

**O que mudou da v4 para a v4.1:**
1. **H2 do formulário novo:** “Your AI office, mapped in one call.” sai da urgência (o júri leu “Do not leave now” como pop-up de saída) e diz o que a pessoa recebe. Apoio novo, com quem liga e em quanto tempo.
2. **Placa do hero** diz de quem são as ações: “agent actions waiting for your yes”.
3. **Leitura do dia** nas plaquetas de 120 px (×6) e **nomes curtos a 390**.
4. **About vira a página do número:** “A$10M+” com a ressalva da fonte logo abaixo, e o estado sem o número.
5. **Depoimento fora do fluxo principal**: a seção §2.4 virou nota; nenhum texto de depoimento.
6. **Frases-modelo** no lugar dos placeholders do About, do FAQ e do rodapé, para o mock (camada `modelo:` no Figma). Nenhuma vai ao site sem o dado real.
7. Na mesa de social media, a faixa das 15:30 passou de “Scheduled” para “Done”, para a contagem da plaqueta fechar.

---

Base da v4: brief-v3 (“A maquete e o relatório”), 08/11/2026 (noite). Substitui a v3, que fica guardada em `copy-v3-historico.md` só como registro (classificação A/B/C das faixas, cartões antigos, aviso da migration).

**O que mudou da v3 para a v4 (para o figma-architect reler):**
1. **Nenhum rótulo mono, nenhum eyebrow, nenhum selo.** Saem: os rótulos da stat row, “Example activity”, “AEST 14:32”, “Why”, “Today”, “You approve:” como rótulo, “While you slept”, “All agents at a glance”, “In their own words”, “Pending”, “1 / 3”, os pacotes (Lead, Invoice…), a régua de 24 h. O que era rótulo virou frase ou sumiu.
2. **A ressalva legal mudou de lugar:** uma linha no rodapé (“Agent activity shown on this page is illustrative.”) e, no final, a frase da noite começa com “A night in this office”, que já se lê como exemplo.
3. **Hero com gancho partido (B, recomendado)** + variante A “em avaliação” com o gancho original de 118 car. A frase de apoio reaproveita o começo do gancho antigo.
4. **Tour:** 7 plaquetas e “o dia da mesa” (3 faixas de hora + a faixa roxa “You approve…”). Sem nome de empresa: ninguém fictício com cara de cliente real. O único nome é “Sam”, primeiro nome genérico.
5. **Sala YOU:** a mesma ordem em 3 estados (Arrives / You decide / Sent), duas ordens (follow-up e bookkeeper), “Why” em três frases, sem check. O horário do follow-up foi para 07:58, para casar com o “8am” do final.
6. **About:** 4 fatos laterais + um parágrafo de 56 palavras; o H2 fica pequeno (“About BrandUp”).
7. **FAQ:** título de faixa curto; todas as respostas à vista, cada uma com ≤ 45 palavras.
8. **H2 medidos na tipografia v3** (≤ 26 car. por linha a 1440, ≤ 22 a 390, ≤ 44 no total): o H2 do tour virou “Never late. Never asks for a raise.” nas duas larguras; o do final cabe inteiro também a 390. Nenhum H2 passa de 44.
9. **Final:** H2 + uma declaração de 28 palavras com os números da noite (os mesmos da v3, nenhum novo).
10. ~~Pontuação do H2 do formulário~~ (superado na v4.1: o H2 foi trocado).

Convenções: caixa alta é CSS (o texto está em caixa normal). Contagem em caracteres com espaços (“car. / limite”), palavras quando o brief limita em palavras. Ortografia australiana (enquiry, organise), moeda AUD, “8am”, datas “21 October”. Aspas tipográficas e apóstrofo curvo (’) no Figma e no código; aqui o apóstrofo reto é só da edição em Markdown.

## 1. Voz em 5 linhas

1. Fala como o dono vendendo na mesa: direto, com número, e sem rodeio sobre quem manda.
2. Cada promessa fica presa a uma coisa que um agente fez numa hora do dia (“06:12, followed up 12 leads”), nunca a um adjetivo.
3. Os agentes são funcionários com cargo (“your bookkeeper”), nunca robô fofo nem “solução”; a última palavra é sempre do dono.
4. Usa: **desk**, **approve**, **follow-up** (e office, yes, 90 days).
5. Nunca usa: **solution**, **leverage**, **revolutionise** (nem seamless, unlock, empower, cutting-edge, bot, “AI-powered”).

Glossário (o mesmo termo em toda a página): *AI office* = o conjunto; *agent* = cada função; *desk* = o lugar do agente na maquete; *You* = a sala do dono; *approve / yes* = a ação do dono; *enquiry* = contato que chega; *lead* = oportunidade; *diagnosis* = a primeira conversa.

## 2. Texto final por seção (ordem do brief-v3 §5)

### 2.0 Intro
| Campo | Texto | Car. |
|---|---|---|
| Pular (teclado e leitor de tela; o toque também pula) | Skip intro | 10 |

Nenhum texto visível na intro.

### 2.1 Nav
| Campo | Texto | Car. |
|---|---|---|
| Marca | BrandUp | 7 |
| Links (no eixo) | Office · Desks · FAQ | — |
| Link sublinhado à direita | Diagnosis | 9 |

“Office” leva ao hero/maquete, “Desks” ao tour, “FAQ” à faixa de perguntas, “Diagnosis” ao `#diagnostic`.

### 2.2 Hero — variante B (gancho partido, recomendada)
| Campo | Texto | Car. / limite |
|---|---|---|
| H1, linha 1 | Over $250K per month | 20 / 20 |
| H1, linha 2 | within 90 days. | 15 / 20 |
| H1 inteiro | Over $250K per month within 90 days. | 36 / 36 |
| Frase de apoio (1440) | How industrial and B2B companies get there: an office of AI agents we build and run for you, 24/7. You approve the big calls from your phone. | 141 / 150 |
| Frase de apoio (390) | How industrial and B2B companies get there: AI agents we run 24/7, and you approve from your phone. | 99 / 115 |
| CTA | Build my AI office | 18 |
| Prova sob o CTA (1440; a 390, logo abaixo da imagem) | Over A$10 million in sales generated for our clients. | 53 / 60 |
| Placa roxa, número | 2 (sobe para 3 uma vez, 4 s depois de pintar) | — |
| Placa roxa, linha (a 390, 2 linhas de 220 px) | agent actions waiting for your yes | 34 / 34 |
| `alt` da capa diurna | Architect’s model of the BrandUp office: six work desks and the owner’s room, lit like a studio photo. | 102 |

Ordem de leitura que o texto pressupõe: o número no H1 → a maquete → “2 agent actions waiting for your yes” (o “agent” responde “ações de quem?”, que o júri apontou) → como (apoio) → o botão. A frase de apoio responde às três perguntas na ordem do brief: quem (industrial e B2B), o quê (agentes que a BrandUp monta e opera, 24/7), o controle (você aprova do celular). “The big calls” explica, sem jargão, que não é tudo que pede aprovação (casa com FAQ 5).

Se a prova de A$10 milhões não for comprovada, ela sai e não entra nada no lugar (casa com o estado sem número do About, §2.7).

### 2.2a Hero — variante A, “em avaliação” (frame à parte no Figma)
| Campo | Texto | Car. |
|---|---|---|
| H1 (3 linhas a 1440) | How industrial and B2B companies are generating over $250K per month within 90 days by investing in automation and AI. | 118 |
| Frase de apoio | We build and run an office of AI agents for your marketing, sales follow-up, finance and reporting, 24/7. You approve the big calls from your phone. | 148 / 150 |
| CTA, prova e placa | iguais à variante B | — |

Na A o gancho já diz “how industrial and B2B companies”, então a frase de apoio não repete e vai direto ao produto. A A passa de 2 linhas, que é o motivo de a B ser a recomendada.

### 2.3 Formulário `#diagnostic` (a página roxa)
| Campo | Texto | Car. / limite |
|---|---|---|
| H2, linha 1 | Your AI office, mapped | 22 / 26 |
| H2, linha 2 | in one call. | 12 / 26 |
| H2 inteiro | Your AI office, mapped in one call. | 35 / 40 |
| Apoio (c9–c12, 20 px, ≤ 3 linhas) | Send it and a specialist calls within 5 minutes in business hours to map which desks your company needs. | 104 / 110 |
| Rótulo — nome | Name | 4 |
| Rótulo — empresa | Company | 7 |
| Rótulo — e-mail | Work email | 10 |
| Rótulo — telefone (recomendado) | Mobile | 6 |
| Prefixo fixo do telefone (texto dentro do campo, sem chip) | +61 | 3 |
| Placeholder — nome | Jane Smith | 10 |
| Placeholder — empresa | Company name | 12 |
| Placeholder — e-mail | jane@company.com.au | 19 |
| Placeholder — telefone | 412 345 678 | 11 |
| Rótulo do grupo de faturamento | Monthly revenue (AUD) | 21 |
| Bloco 1 | Under $100K | 11 |
| Bloco 2 | $100K–$300K | 11 |
| Bloco 3 | $300K–$1M | 9 |
| Bloco 4 | Above $1M | 9 |
| Botão | Build my AI office | 18 |
| Botão enviando | Sending… | 8 |
| Privacidade (15 px; “privacy policy” é o link) | We only use your details to respond to your enquiry. Read our privacy policy. | 77 |
| Erro de rede (acima do botão; os dados ficam) | We couldn’t send this. Your answers are still here. Check your connection and try again. | 88 |
| Sucesso (redirect `/thank-you`, título da página) | Thanks, your details are in. A specialist will call you within 5 minutes during business hours. | 95 |
| `alt` do retrato do especialista (só se houver foto real) | [PLACEHOLDER: name], BrandUp specialist | — |

**Erros por campo** (15 px sob o campo, `aria-describedby`; um campo, uma mensagem)

| Campo | Vazio | Inválido |
|---|---|---|
| Name | Add your name so our specialist knows who to ask for. (53) | Your name needs at least 2 letters. (35) |
| Company | Add your company name so we can prepare for the call. (53) | Company name needs at least 2 characters. (41) |
| Work email | Add your work email. (20) | Check your email. It needs an @ and a domain, like jane@company.com.au. (71) |
| Mobile | Add your mobile so we can call you. (35) | Enter an Australian mobile, like 412 345 678. (45) |
| Monthly revenue (AUD) | Choose a revenue range. (23) | — |

O H2 afirma o que a pessoa recebe (o mapa do escritório dela, numa ligação), sem urgência nem exclamação; “mapped” conversa com a maquete. “Do not leave now. Your team is waiting.” fica aposentado. O apoio repete “5 minutes” e “business hours”, que seguem a confirmar (§5, item 3).

O placeholder do telefone passou de “4XX XXX XXX” para “412 345 678”, o mesmo exemplo do erro. Os mínimos (2 letras, 2 caracteres) são os `minLength` atuais de `src/App.tsx`. Continua valendo o aviso da v3: a migration `supabase/migrations/20260721143800_create_leads.sql`, `src/lib/leadboard.ts` e `tests/leadboard.test.mjs` só aceitam as faixas antigas e precisam acompanhar antes de os 4 blocos irem ao ar.

### 2.4 Depoimento: fora do fluxo principal
A seção não existe na página (1440, 768, 390): o formulário encosta no tour. No frame States, a estrutura é neutra (barras, sem texto). Não há texto de depoimento nesta copy, por decisão do dono. Quando houver depoimento real, aprovado por escrito, ele volta entre o formulário e o tour; a citação precisa caber em ≤ 25 palavras e número só se o cliente comprovar.

### 2.5 Tour: as 7 mesas
| Campo | Texto | Car. / limite |
|---|---|---|
| H2 (1440), linha 1 | Never late. | 11 / 26 |
| H2 (1440), linha 2 | Never asks for a raise. | 23 / 26 |
| H2 (390), sem quebra forçada | Never late. Never asks for a raise. | 35 / 44 |
| H2 inteiro | Never late. Never asks for a raise. | 35 / 44 |
| Nome acessível do `tablist` | Desks in the office | 19 |

Limites medidos em `tipografia-v3.md` (Archivo SemiCondensed 700): cerca de 26 car. por linha a 1440 e 22 a 390, ou seja, H2 ≤ 52 e ≤ 44 em 2 linhas. A frase longa do anúncio (“This employee is never late.” tem 28 car.) não cabe numa linha nem a 1440, então fica uma versão só nas duas larguras. Com `text-wrap: balance` e sem quebra forçada, qualquer quebra a 390 cabe: “Never late. Never asks / for a raise.” (22 + 12) ou, com balance, “Never late. Never / asks for a raise.” (17 + 17). Não force `<br>` depois de “late.” a 390, porque “Never asks for a raise.” (23) passa de 22 por 1 caractere; a 1440 a quebra forçada depois de “late.” pode ficar.

**Plaquetas** (na ordem do brief; ≤ 18 car.)

| # | Nome (1440 e 768) | Car. | Nome a 390 (fileira de 165 px, ≤ 117 px de texto) | Car. | Leitura do dia (15 px, só 1440 e 768) | Car. / 26 |
|---|---|---|---|---|---|---|
| 1 | Your follow-up | 14 | Follow-up | 9 | 2 done · 1 waiting for you | 26 |
| 2 | Your bookkeeper | 15 | Bookkeeper | 10 | 2 done · 1 waiting for you | 26 |
| 3 | Your ad manager | 15 | Ad manager | 10 | 2 done · 1 waiting for you | 26 |
| 4 | Your social media | 17 | Social media | 12 | 2 done · 1 waiting for you | 26 |
| 5 | Your receptionist | 17 | Reception | 9 | 2 done · 1 waiting for you | 26 |
| 6 | Your analyst | 12 | Analyst | 7 | 2 done · nothing for you | 24 |
| 7 | You (rola até a sala YOU) | 3 | You | 3 | — | — |

A leitura conta as faixas do dia de cada mesa, então bate com o palco: “done” = faixas Done; “waiting for you” = a faixa Waiting (só a palavra “waiting” em `status.attention`). O analista tem uma faixa “Working”, que não entra na conta. A forma repetida é de propósito: é uma coluna de índice, e o olho compara as mesas pelo número. Os nomes de 390 tiram o “Your” porque “Your receptionist” (17 car.) passa de 117 px a 18 px; “Reception” é o que cabe com folga. A largura exata em px é do type-director, que confere a 18 px.

**O dia de cada mesa** (hora · ação ≤ 60 · estado ≤ 12; a última faixa, roxa, ≤ 70). Estados usados em toda a página: **Done**, **Waiting** (âmbar, só a palavra), **Working**. A faixa roxa “You approve…” fica em `lead` 24 px, uma linha, ≤ 70 car.

**Your follow-up**
| Hora | Ação | Car. | Estado |
|---|---|---|---|
| 06:12 | Followed up 12 leads from yesterday’s trade-show list | 53 | Done |
| 07:58 | Drafted a follow-up on a quote with no reply in 6 days | 54 | Waiting |
| 09:30 | Booked a site visit with a new lead from the website | 52 | Done |
| faixa roxa | You approve follow-ups on quotes and anything with a price in it. | 65 / 70 | — |

**Your bookkeeper**
| Hora | Ação | Car. | Estado |
|---|---|---|---|
| 06:40 | Flagged 3 overdue invoices and drafted reminders | 48 | Waiting |
| 14:20 | Matched 41 incoming payments to open invoices | 45 | Done |
| 17:00 | Sent this week’s cash position to your analyst | 46 | Done |
| faixa roxa | You approve every payment reminder before it’s sent. | 52 / 70 | — |

**Your ad manager**
| Hora | Ação | Car. | Estado |
|---|---|---|---|
| 10:02 | Paused an ad set after cost per lead rose 40% this week | 55 | Done |
| 13:10 | Moved $300 from a weak ad to the best performer | 47 | Done |
| 16:45 | Drafted a budget increase for your best campaign | 48 | Waiting |
| faixa roxa | You approve budget changes above the limit you set. | 51 / 70 | — |

**Your social media**
| Hora | Ação | Car. | Estado |
|---|---|---|---|
| 09:15 | Drafted 3 LinkedIn posts about the new product line | 51 | Waiting |
| 11:00 | Replied to comments on last week’s post | 39 | Done |
| 15:30 | Lined up Thursday’s post for 8am | 32 | Done |
| faixa roxa | You approve every post before it goes live. | 43 / 70 | — |

**Your receptionist**
| Hora | Ação | Car. | Estado |
|---|---|---|---|
| 07:05 | Answered 9 overnight enquiries and booked 2 site visits | 55 | Done |
| 12:31 | Sent a spec sheet to a new website enquiry | 42 | Done |
| 14:05 | Drafted a reply to a question about delivery dates | 50 | Waiting |
| faixa roxa | You approve any answer about price or delivery dates. | 53 / 70 | — |

**Your analyst**
| Hora | Ação | Car. | Estado |
|---|---|---|---|
| 08:30 | Sent this week’s sales and cash report to your inbox | 52 | Done |
| 10:15 | Flagged that LinkedIn leads cost less this month | 48 | Done |
| 16:00 | Started next Monday’s report | 28 | Working |
| faixa roxa | Nothing to approve here. Reports are read-only. | 47 / 70 | — |

Todos os números das faixas (12 leads, 6 dias, 3 faturas, 41 pagamentos, 40%, $300, 3 posts, 9 enquiries, 2 visitas) já estavam na v3; nada novo. São atividade ilustrativa, coberta pela linha do rodapé.

**`alt` das fotos das mesas** (também é o texto visível se a imagem falhar)

| Mesa | `alt` | Car. |
|---|---|---|
| Follow-up | Model of the follow-up desk: a resin figure at a monitor, quotes pinned to the wall. | 84 |
| Bookkeeper | Model of the bookkeeper’s desk: a monitor, a tray of invoices, a desk lamp. | 75 |
| Ad manager | Model of the ad manager’s desk: two monitors side by side. | 58 |
| Social media | Model of the social media desk: a monitor and a small photo set-up. | 67 |
| Receptionist | Model of the front desk, facing the office entrance. | 52 |
| Analyst | Model of the analyst’s desk by the window. | 42 |

Os `alt` descrevem o que o render mostra; o frontend-studio confere contra os quadros finais e ajusta o objeto citado se mudar.

### 2.6 Sala YOU (a linha viva)
| Campo | Texto | Car. / limite |
|---|---|---|
| H2 | You have the final word. | 24 / 28 |
| Estado 1 (à esquerda; a 390, embaixo da cópia) | Arrives · 07:58 | 7 + hora |
| Estado 2 | You decide | 10 / 12 |
| Estado 3 | Sent · 08:02 | 4 + hora |
| Botões (dentro do `data-ui`) | Approve · Edit · Decline | — |
| `alt` da foto da sala | Model of the owner’s room: one desk, a purple rug, a window onto the office. | 76 |

**Ordem 1 — Your follow-up** (a viva)

| Campo | Texto | Car. / limite |
|---|---|---|
| Linha de cima | Your follow-up · A$14,200 · Sam · Email | 39 |
| Título (sem viúva a 640 px) | Follow up on a quote with no reply in 6 days? | 45 / 52 |
| Por quê 1 | Quote sent Monday 2 November. | 29 / 40 |
| Por quê 2 | Sam opened it twice and hasn’t replied. | 39 / 40 |
| Por quê 3 | You usually follow up on day 5. | 31 / 40 |
| Prévia (degrau `ink.850`) | Hi Sam, just checking the quote for the 40 steel brackets landed OK. Happy to adjust quantities or delivery dates. Talk soon. | 125 / 140 |
| Linha final (estado Sent) | Approved. Follow-up sent to Sam. | 32 |

**Ordem 2 — Your bookkeeper** (chega no lugar da primeira depois do Approve)

| Campo | Texto | Car. / limite |
|---|---|---|
| Linha de cima | Your bookkeeper · A$18,400 · 3 clients · Email | 46 |
| Título | Send reminders for 3 overdue invoices? | 38 / 52 |
| Por quê 1 | All three are 14 to 30 days overdue. | 36 / 40 |
| Por quê 2 | No reminder has gone out this month. | 36 / 40 |
| Por quê 3 | Each has paid after a reminder before. | 38 / 40 |
| Prévia | Hi, a friendly reminder that invoice #1047 for A$6,200 was due on 21 October. Bank details are on the invoice. Thank you. | 121 / 140 |
| Linha final | Approved. Reminders sent to 3 clients. | 38 |

**Estados da ordem** (anunciados por `aria-live="polite"`)

| Estado | Texto | Car. |
|---|---|---|
| Enviando (rótulo do Approve) | Sending… | 8 |
| Aprovado | (a linha final da ordem) | — |
| Editar (a prévia vira campo; botão) | Send my version | 15 |
| Editado | Edited. Your version was sent. | 30 |
| Recusado (`text.2`, nunca vermelho) | Declined. Nothing was sent. | 27 |
| Fila vazia (depois da 2ª ordem) | All clear. Nothing is waiting for you. | 38 |
| Sem JS | os 3 estados estáticos da ordem 1 | — |

Os três “por quê” são frases soltas, sem check e sem o rótulo “Why”: a ordem já mostra que são o motivo. Data: 2 November 2026 é segunda-feira e fica 6 dias antes de 8 November.

### 2.7 About (página clara): a página da prova

**Com o número comprovado (esquerda c1–c6 | direita c7–c12)**

| Campo | Texto | Limite |
|---|---|---|
| Número (`size.giant`) | A$10M+ | 6 / 7 car. |
| Ressalva logo abaixo (16 px, ink 70%, ≤ 2 linhas) — `modelo:` | Sales generated for our clients, Jan 2023 to Oct 2026. Source: client CRM records. Results vary by business. | 108 / 120 car. |
| Ressalva — forma para o dono preencher | Sales generated for our clients, [month year] to [month year]. Source: [where the figure comes from]. Results vary by business. | — |
| H2 visualmente pequeno (20 px) | About BrandUp | 13 |
| Parágrafo (26 px) | No business has just one problem. A lead goes cold while an invoice sits unpaid and the weekly report never gets written. We set up and run an office of AI agents inside your business, one desk per area, all working from the same picture of your clients and your cash. You keep the final word. | 56 / 60 palavras |

**Fatos (grade 2×2 à direita; o “Sales generated” subiu para o número)**

| Rótulo | Car. / 24 | Valor | Car. / 40 |
|---|---|---|---|
| Based in | 8 | `modelo:` Sydney, NSW | 11 |
| Built for | 9 | Manufacturers, distributors, B2B firms | 38 |
| Office running within | 21 | 90 days | 7 |

**Estado sem o número comprovado** (frame à parte; o número sai também da prova do hero)

| Campo | Texto | Limite |
|---|---|---|
| Esquerda | o mesmo parágrafo, a 32 px, com “About BrandUp” a 20 px em cima | 56 palavras |
| Direita, fato 1 | Based in · `modelo:` Sydney, NSW | — |
| Direita, fato 2 | Built for · Manufacturers, distributors, B2B firms | 38 |
| Direita, fato 3 | Office running within · 90 days | 7 |
| Direita, fato 4 | Who signs off · You, on every price and payment | 13 / 31 |

A ressalva-modelo traz um período e uma fonte plausíveis só para o mock medir as 2 linhas; o período e a fonte reais são do dono, e sem eles vale o estado sem número. “Results vary by business” fica sempre (ACCC). O fato 4 do estado sem número repete o que a página já demonstra na sala YOU e não depende de dado novo. A linha dos sistemas conectados continua só com a lista confirmada.

### 2.8 FAQ (uma faixa por pergunta)
| Campo | Texto | Car. / limite |
|---|---|---|
| Título da faixa roxa | Questions owners ask. | 21 / 24 |
| Link na faixa de título | Talk to a person | 16 |

| # | Pergunta (≤ 50 car.) | Car. | Resposta (≤ 45 palavras) | Palavras |
|---|---|---|---|---|
| 1 | Do I need a tech team? | 22 | No. We set up, connect and run the agents for you. Your team approves actions and tells us what’s working. | 20 |
| 2 | How long until I see results? | 29 | The first agents usually start working in the first few weeks. The plan runs over 90 days: time to connect your systems, tune each agent and measure the revenue it brings in. That’s why the minimum engagement is 3 months. | 40 |
| 3 | How much does it cost? | 22 | A fixed monthly fee in AUD, set after the diagnosis by how many agents you need. The minimum engagement is 3 months. `modelo:` Plans start at A$0,000 a month. (no site, só com o preço real e se o dono quiser público) | 22 |
| 4 | Is my data safe? | 16 | Your data is used only to run your agents and is never shared with other clients. Each agent only accesses the accounts you connect, and you can ask us to delete your data at any time. `modelo:` Your data is stored on servers in Sydney and is never used to train AI models. (no site, só depois de confirmar onde fica e o que os provedores garantem) | 36 |
| 5 | Will the AI act without my approval? | 36 | Only where you allow it. You choose what runs on its own, like answering a common enquiry, and what waits for you, like a price or a payment reminder. Agents only message people who’ve agreed to hear from you. | 39 |
| 6 | What happens if an agent gets something wrong? | 46 | Every action is logged, so you see what was done and when. Anything that touches a price, a payment or a client message can wait for your yes, and our team reviews the agents every week. | 36 |
| 7 | Does it work with the systems I already use? | 44 | In most cases, yes. We connect the agents to your email, CRM, accounting software and social accounts. `modelo:` We already connect to Xero, MYOB, HubSpot and Microsoft 365. (no site, só a lista confirmada) | 17 |

As contagens não incluem as frases-modelo. Com elas: resposta 3 = 29 palavras, 4 = 51 (passa de 45: no site, a frase real de dados substitui a 2ª frase, “Each agent only accesses…”, ou a resposta corta o “at any time”), 7 = 27. No Figma, cada frase-modelo fica numa camada nomeada `modelo:` para ninguém publicar por engano.

### 2.9 Final: três fotos noturnas, depois o formulário
| Campo | Texto | Car. / limite |
|---|---|---|
| H2 (1440 e 390) | Want a team like this in your business? | 39 / 44 |
| Quebra a 390 | Want a team like this / in your business? | 21 + 17 |
| H2 curto (reserva, se a medida no Figma der 3 linhas) | Want a team like this? | 22 |
| Declaração (24 px) | A night in this office: 14 leads followed up, 9 enquiries answered, 3 invoice reminders drafted. At 8am it’s all on your phone for a yes or no. | 28 / 30 palavras |
| Formulário | os mesmos textos de §2.3 | — |
| `alt` foto 1 | The follow-up desk at night, lit by its monitor. | 48 |
| `alt` foto 2 | The bookkeeper’s desk in the small hours, desk lamp on. | 55 |
| `alt` foto 3 | The owner’s room at dawn, the window turning grey-blue. | 55 |

As fotos não têm legenda; a hora fica na luz. “A night in this office” faz a frase ler como exemplo da maquete, e não como garantia de 14 leads por noite para quem contratar.

### 2.10 Rodapé e metadados
| Campo | Texto | Car. / limite |
|---|---|---|
| E-mail (link, 28 px) | `modelo:` hello@brandup.com.au | — |
| Telefone (link, 28 px) | `modelo:` 02 5550 1234 | — |
| Links | Privacy · Contact | — |
| ABN | `modelo:` ABN 12 345 678 901 | — |
| Linha legal | © 2026 BrandUp · ABN `modelo:` 12 345 678 901 · Agent activity shown on this page is illustrative. | ressalva: 50 / 70 |
| `aria-label` dos ícones sociais | BrandUp on LinkedIn · BrandUp on Instagram · BrandUp on Facebook | — (só os canais que existem) |
| `<title>` | BrandUp \| AI agents for industrial and B2B companies in Australia | 66 / 70 |
| `meta description` | BrandUp builds and runs an office of AI agents for Australian industrial and B2B companies: sales follow-up, marketing, finance and reporting, 24/7. | 148 / 160 |

O telefone-modelo usa a faixa 02 5550 xxxx, que a ACMA reserva para ficção (não toca ninguém). O e-mail-modelo usa o domínio provável da marca; confirmar o real. O ABN-modelo tem o formato real de 11 dígitos e é fictício.

### 2.11 Barra fixa no celular (“em avaliação”)
| Campo | Texto | Car. |
|---|---|---|
| Botão | Build my AI office | 18 |

## 3. Variações

### Headline do hero (no formato partido, 2 linhas de ≤ 20 car.)
| | Texto | Car. | Ângulo |
|---|---|---|---|
| **Recomendada** | Over $250K per month / within 90 days. | 36 | Resultado. O número do dono, do anúncio, com o prazo. |
| 1 | Over $250K a month. / You make the calls. | 39 | Controle. Troca o prazo pela aprovação; testar contra a recomendada se o “90 days” não passar na comprovação. |
| 2 | Leads answered at 2am. / Over $250K a month. | 42 | Dor (o lead que esfria fora do horário). Passa de 20 car. na 1ª linha: só cabe se o type-director medir a 390. |

A variante A (gancho original de 118 car.) continua no Figma para o dono comparar vendo.

### H2 do formulário
| | Texto | Car. | Ângulo |
|---|---|---|---|
| **Recomendado** | Your AI office, / mapped in one call. | 35 | Entrega: o que a pessoa recebe e quanto custa de esforço (uma ligação). |
| 1 | See which desks / your company needs. | 37 | Diagnóstico: a ligação decide as mesas (mesmo vocabulário do tour). |
| 2 | Your office plan, / on one phone call. | 36 | Plano: mais neutro, mais perto de “relatório”. |

### CTA principal
| | Texto | Car. | Ângulo |
|---|---|---|---|
| **Recomendado** | Build my AI office | 18 | Produto; um rótulo só em hero, formulário, final e barra fixa. |
| 1 | Book my diagnosis | 17 | Processo; diz o que acontece (uma conversa), menor compromisso. Bom para teste A/B. |
| 2 | Meet my new team | 16 | Rima com o anúncio; mais leve, menos comercial. |

## 4. Estados
- **Formulário:** vazio (rótulos e placeholders), foco, erro por campo, enviando (“Sending…”), erro de rede e sucesso, em §2.3.
- **Ordem viva:** chega, você decide, enviando, aprovado, editado, recusado, fila vazia, sem JS, em §2.6.
- **Foto que falhou:** o `alt` visível a 15 px no bloco `ink.900` (§2.2, §2.5, §2.6, §2.9).
- **Depoimento:** fora do fluxo; no States, estrutura neutra sem texto (§2.4).
- **About sem número:** §2.7.

## 5. Placeholders e fatos a confirmar com o dono
1. **“Over $250K per month within 90 days”**: agora é o H1 inteiro, maior do que na v2. Vale para indústria e B2B, ou veio dos restaurantes? Sem comprovação para o público novo, é risco de conduta enganosa (ACL/ACCC). Saída honesta, se faltar prova: a variação 1 ou um “up to/can” com base documentada.
2. **“A$10M+” / “Over A$10 million in sales generated”**: em AUD? Período e fonte (a ressalva do About precisa dos dois)? Se não houver prova, vale o estado sem número no About e a prova sai do hero.
3. **Retorno em 5 minutos**: em que horário (AEST/AEDT) e quem liga.
4. **Aprovação pelo celular existe hoje?** Se ainda não, a frase de apoio e a sala YOU descrevem o que vem, e “You approve the big calls from your phone” precisa mudar.
5. **Canais e integrações** citados (Google, Meta, LinkedIn, Instagram, WhatsApp, email, CRM, contabilidade; Xero, MYOB, HubSpot).
6. **Preço** (FAQ 3): mostrar o valor inicial ou só “fixed monthly fee”? O mínimo de 3 meses pode aparecer?
7. **Dados e consentimento** (FAQ 4 e 5, Spam Act 2003): onde ficam, quais provedores de IA processam, prazo de exclusão; revisar `/privacy`. A frase “Agents only message people who’ve agreed to hear from you” só vale se a operação garantir o consentimento.
8. **Revisão semanal dos agentes pelo time** (FAQ 6): é o que a operação faz?
9. **Depoimento**: fora do fluxo até haver um real, autorizado por escrito.
10. **Retrato do especialista** para a página roxa (só se for foto real de quem liga).
11. **Cidade** (About), **ABN**, **e-mail**, **telefone**, **canais sociais** que existem: hoje são frases-modelo (`modelo:`), não vão ao site.
13. **Preço inicial** (FAQ 3), **onde ficam os dados e se os provedores treinam com eles** (FAQ 4), **integrações** (FAQ 7): hoje são frases-modelo.
12. **Faixas de receita** e a classificação A/B/C (em `copy-v3-historico.md` §2.3); depois, migration + `leadboard.ts` + testes.

## Fontes da pesquisa de mercado (08/11/2026, herdadas da v3)
- Team 400, AI Agency Australia: https://team400.ai/ai-agency
- Team 400, AI Agent Developers Melbourne: https://team400.ai/ai-agent-developers-melbourne
- Australian Manufacturing, agentic automation: https://www.australianmanufacturing.com.au/why-agentic-automation-is-the-next-evolution-in-advanced-manufacturing/
- TechRepublic, agentic AI no trabalho australiano: https://www.techrepublic.com/article/agentic-ai-australian-workplace-2025/
- Brief de direção §11 (Relevance AI, Artisan, Lindy: posicionamento).
