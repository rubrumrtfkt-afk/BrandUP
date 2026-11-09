# BrandUp: copy do redesign (inglês australiano)

## v5.1 (09/11/2026): o que trocar em `src/proto/content.ts`

Três pendências do protótipo: o rodapé, os dois títulos que quebravam em 3 linhas e a tabela do turno. As chaves que não aparecem aqui ficam como estão. Depois da troca, o `COPY_VERSION` passa a `'v5.1'`, e os comentários PROVISIONAL de `night.desks`/`night.tasks` e de `footer.cols`/`footer.live` podem sair.

### A. Títulos que passavam de 2 linhas

**A medida.** O H2 do formulário tem 88 px a 1440, na coluna 1–5 (≈ 532 px), mas o `--type-h2-measure: 12ch` corta antes, em ≈ 6,2 em. Na Mona 87,5%, isso dá **≤ 12 caracteres por linha**, e "Your AI office, mapped" tem 22. No escritório a 390, o `.k2` tem 44 px em 350 px úteis, o que dá **≤ 18 caracteres por linha**. A linha que conta é a mais longa das duas versões que se trocam, a humana: "Sometimes asks for a raise." tem 27.

| Chave | Texto atual | Texto novo | Car. por linha |
|---|---|---|---|
| `form.h2` | `['Your AI office, mapped', 'in one call.']` | `['One call.', 'Your plan.']` | 9 / 10 |
| `office.h2` | `['Never late.', 'Never asks for a raise.']` | `['Never late.', 'Never tired.']` | 11 / 12 |
| `office.rest` | `['late.', 'asks for a raise.']` | `['late.', 'tired.']` | a linha humana mais longa: "Sometimes tired." = 16 |
| `office.human` / `office.agent` | `'Sometimes'` / `'Never'` | sem mudança (decidido: "Sometimes", a mesma palavra nas duas linhas) | — |

- **O formulário.** O sentido continua: uma ligação, e você sai dela com o plano do seu escritório. A palavra "plan" é a mesma do FAQ ("The full plan runs over 90 days") e não promete nada novo. O apoio logo embaixo ("We’ll call within 5 minutes, business hours.") diz que a ligação é rápida. Por isso o título não precisa repetir "AI office", que o CTA já traz ("Build my AI office").
  - Variação 1, **processo**: `['Map it', 'in one call.']` (6 / 12). Fica no limite de 12 e é menos concreta.
  - Variação 2, **resultado**: `['One call.', 'Your plan.']`. **Recomendada.**
- **O escritório.** "Tired" fecha com a noite que vem logo antes: eles trabalharam das 18:00 às 08:00 e não cansam. A piada do aumento sai, e com ela o argumento de custo, que o FAQ "How much does it cost?" cobre. "Never off sick." foi descartada porque a linha humana, "Sometimes off sick.", tem 19 caracteres e não cabe a 390.
  - Variação, **dor do dono**: `rest: ['late.', 'sick.']` → "Never sick." (a linha humana tem 15). É mais seca e menos ligada à noite. Recomendo "tired."
- **Precisa ser medido no navegador** (eu não medi): a quebra de "One call. / Your plan." a 1440, 768 e 390, e a de "Sometimes tired." a 390 e a 360, em chromium e webkit. O `text-wrap: balance` não pode juntar as duas linhas do formulário, porque cada linha já é um bloco do K1.

### B. O turno da noite

**O conflito.** O brief-v4.2 §5.2 pede que **toda mesa trabalhe ao menos uma vez antes de 03:00**. Com os horários da v5, só 4 mesas trabalhavam antes de 03:00: a social media (03:10) e o analyst (06:30) ficavam de fora, e o pôster das 02:14 mostrava 2 figuras paradas. **A solução é ajustar os horários e trocar duas tarefas; a frase do brief fica.** As 6 mesas trabalham até 01:50, então o pôster (`posterAt: '02:14'`) já mostra as seis com uma linha. Depois das 03:00, três mesas trabalham de novo. Os eventos ficam espaçados por igual na rolagem (t = .05, .16, .25, .36, .45, .56, .69, .79, .89, 1,0).

**O que mudou na lista:** sai "02:14 · Quote request · Perth". Entra "01:50 · Leads ranked by value", do analyst, que abre a cadeia com a follow-up das 05:05: o analyst ordena os leads e a follow-up vai atrás deles. A review sai das 03:10 para as 00:20. Os lembretes de fatura ficam às 03:40, com o bookkeeper. A distribuição fica 2-2-2-1-1-1: nenhuma figura trabalha 3 vezes enquanto outra trabalha uma. O "duas mesas" do brief não fecha com 9 tarefas sem pôr uma mesa 3 vezes.

`night.labels` (substituir inteiro) e `night.tasks` (o índice da mesa segue `night.desks`: 0 follow-up, 1 bookkeeper, 2 ad manager, 3 social media, 4 receptionist, 5 analyst; −1 = o telefone em casa):

| # | `labels[i]` (hora, rótulo) | Mesa | `tasks[i]` (≤ 3 palavras, no passado) |
|---|---|---|---|
| 0 | `['18:40', 'Enquiry answered · Geelong']` | 4 Receptionist | `[4, 'enquiry answered']` |
| 1 | `['20:15', 'Quote sent · Newcastle']` | 0 Follow-up | `[0, 'quote sent']` |
| 2 | `['21:30', 'Purchase order logged']` | 1 Bookkeeper | `[1, 'order logged']` |
| 3 | `['23:05', 'Ad spend capped']` | 2 Ad manager | `[2, 'spend capped']` |
| 4 | `['00:20', 'Google review answered']` | 3 Social media | `[3, 'review answered']` |
| 5 | `['01:50', 'Leads ranked by value']` | 5 Analyst | `[5, 'leads ranked']` |
| 6 | `['03:40', 'Invoice reminders drafted']` | 1 Bookkeeper | `[1, 'reminders drafted']` |
| 7 | `['05:05', '14 leads followed up']` | 0 Follow-up | `[0, '14 followed up']` |
| 8 | `['06:30', 'Sales report ready']` | 5 Analyst | `[5, 'report ready']` |
| 9 | `['07:58', 'Waiting for your yes']` | −1 telefone | `[-1, '1 waiting']` |

Se quiser a mesa da recepção trabalhando duas vezes, como na v5: a recepção também pode atender às 03:40 ("Quote request · Perth"). Mas então os lembretes de fatura saem, e eles são a ordem 2 do "sim". Por isso ficam os lembretes.

| Chave | Texto atual | Texto novo |
|---|---|---|
| `night.desks` | `name`/`short` provisórios | `[{name:'Follow-up', short:'Follow-up'}, {name:'Bookkeeper', short:'Books'}, {name:'Ad manager', short:'Ads'}, {name:'Social media', short:'Social'}, {name:'Receptionist', short:'Reception'}, {name:'Analyst', short:'Analyst'}]` (os curtos têm ≤ 9 caracteres; "Books" é o que o dono australiano diz: "do the books") |
| `night.fallback` | `[4, 7, 9]` | `[5, 7, 9]` (01:50 leads ranked → 05:05 14 followed up → 07:58 waiting: a mesma cadeia em 3 rótulos) |
| `night.posterAt` | `'02:14'` | sem mudança (agora as 6 mesas já têm linha nessa hora) |
| `night.office` / `night.home` / `night.waiting` | `'Office'` / `'Home'` / `'1 waiting'` | sem mudança |
| `night.aria` | "…enquiries answered, quotes sent, invoices chased, 14 leads followed up…" | `Overnight, 6pm to 8am, six agents work at their desks while you sleep at home: enquiries answered, quotes sent, leads ranked, invoices chased, 14 leads followed up, and at 7:58 one request waits on your phone.` |

O 2.4 abaixo (a tabela de rótulos da v5) fica substituído por esta tabela.

### C. O rodapé

Os links só apontam para o que existe: as âncoras desta página, `#diagnostic` e `/privacy` (existe em `public/privacy`). As 4 colunas são as que o dono pediu. Os nomes dos links são o que a pessoa encontra ao clicar, com o vocabulário do glossário.

| Chave | Texto atual | Texto novo | Destino |
|---|---|---|---|
| `footer.cols.product.h` | Product | How it works | — |
| `footer.cols.product.links[0]` | The night shift | Overnight | `#night-h` |
| `footer.cols.product.links[1]` | The office | Your AI office | `#office-h` |
| `footer.cols.product.links[2]` | You approve | Approvals | `#you-h` |
| `footer.cols.product.links[3]` | Questions | FAQs | `#faq-h` |
| `footer.cols.company.h` | Company | Company | — |
| `footer.cols.company.links[0]` | Diagnosis | Book a diagnosis | `#diagnostic` |
| `footer.cols.legal.h` | Legal | Legal | — (o conteúdo é o `footer.privacy` → `/privacy`, a nota "illustrative" e o ABN) |
| `footer.cols.contact.h` | Contact | Contact | — (e-mail e telefone, ainda `modelo:`) |
| `footer.live` | `Sydney ${time} · agents on shift` | sem mudança: `Sydney ${time} · agents on shift` (5 palavras, honesto sob a nota "illustrative") | — |

- **"Product" → "How it works".** A BrandUp vende um serviço que ela mesma opera ("AI agents we run"). Para o dono de indústria, "Product" sugere um software para ele instalar. Se o dono quiser manter o pedido ao pé da letra, "Product" serve. Os links não mudam.
- **"FAQs"** é a forma que o leitor australiano procura no rodapé. O H2 da seção continua "Questions".
- **"Approvals"** nomeia o que a seção mostra (os pedidos que você aprova), e não uma ordem para o leitor.
- **"Company" tem um link só.** Não há About, equipe nem cases publicados, e não invento página. Se entrar um About, ele vai aqui.

### D. Falta confirmar com o dono
1. "One call. / Your plan.": o diagnóstico entrega mesmo um plano por escrito (as mesas, a ordem e o preço)? Se entregar só a conversa, use a variação "Map it / in one call."
2. "Leads ranked by value" (o analyst): o agente analista faz isso hoje? Se não fizer, troque por uma tarefa que ele faça, com ≤ 4 palavras e hora antes de 03:00.
3. "Agents on shift": os agentes dos clientes rodam 24 h? Se não rodarem, a linha viva fica só "Sydney ${time}".
4. Os itens `modelo:` de sempre: contato, ABN, a prova "A$10M+" e os dias da linha dos 90 dias.

---


**v5, alinhada ao brief-v4** (`brief-v4.md` §5 e §6.2, "A luz só sobe com o seu sim"). Autor: copy-director, 09/11/2026. A v4.1 está guardada em `copy-v4.1-historico.md`, e a v3 em `copy-v3-historico.md`.

**O que mudou da v4.1 para a v5:**
1. **Régua de palavras do brief-v4:** ≤ 25 palavras visíveis por seção e ≤ 260 na página com o FAQ fechado. A conta com script deu **258** (§9). A v3 passava de 1.000.
2. **Saíram:** o About, o tour das 7 mesas (plaquetas, "o dia da mesa" e as faixas de hora), a placa "agent actions waiting for your yes", a declaração da noite no final, as três fotos noturnas, o depoimento e as respostas abertas do FAQ.
3. **Entraram:** os rótulos da grade-onda (a noite), os balões dos bonecos na maquete, a 3ª ordem no telefone e a linha dos 90 dias (marcada `modelo:`).
4. **A frase de apoio do hero** encolheu de 141 para 44 caracteres. Saíram "industrial e B2B" (fica no `<title>` e na description) e "do celular" (quem mostra o telefone agora é a seção Você).
5. **Faixas de receita:** a v5 volta às 4 faixas que o código já classifica. Os blocos da v4.1 ("Under $100K"…) não batiam com `revenueGrade()` (§2.3).

Convenções: a caixa alta é decisão de CSS (o texto está em caixa normal). Ortografia australiana (enquiry, organise), moeda AUD, "8am", datas "21 October", hora 24 h nos rótulos de cena. No Figma e no código, aspas tipográficas e apóstrofo curvo (’); o apóstrofo reto aparece aqui só por causa da edição em Markdown. As palavras são contadas pelo script da §9: o "·" não conta, e "$250K", "A$10M+", "#1047" e "07:40" contam uma palavra cada. Os limites de caracteres por linha dependem do `tipografia-v4.md`, que ainda não existe: os H2 foram mantidos em ≤ 40 caracteres para caber em 2 linhas de ≤ 26.

---

## 1. Voz em 5 linhas

1. Fala como o dono vendendo na mesa: o número primeiro, e sem rodeio sobre quem manda.
2. Cada promessa fica presa a uma coisa que um agente fez numa hora da noite ("05:05 · 14 leads followed up"), nunca a um adjetivo.
3. Os agentes são funcionários com cargo e mesa, que conversam entre si; a última palavra é sempre do dono.
4. Usa: **desk**, **approve**, **follow-up** (e office, yes, 90 days).
5. Nunca usa: **solution**, **leverage**, **revolutionise** (nem seamless, unlock, empower, cutting-edge, bot, "AI-powered").

Glossário (o mesmo termo em toda a página): *AI office* = o conjunto; *agent* = cada função; *desk* = o lugar do agente; *You* = o dono; *approve / yes* = a ação do dono; *enquiry* = o contato que chega; *lead* = a oportunidade; *diagnosis* = a primeira ligação.

---

## 2. Texto final por seção (ordem do brief-v4 §5)

### 2.0 Intro
| Campo | Texto | Palavras |
|---|---|---|
| Pular (só teclado e leitor de tela; qualquer toque também pula) | Skip intro | 0 visíveis |
| Canvas | `aria-hidden="true"` (o logo do header já tem nome) | — |

### 2.1 Header
| Campo | Texto | Palavras |
|---|---|---|
| Logo (SVG, `aria-label`) | BrandUp | — |
| Link único (vai a `#diagnostic`) | Diagnosis | 1 |

Um link só: o CTA primário da primeira tela é o do hero, e o header não compete com ele.

### 2.2 Hero: "a rede" (régua ≤ 25 → **24**)
| Campo | Texto | Car. | Palavras |
|---|---|---|---|
| H1, linha 1 | Over $250K per month | 20 | 4 |
| H1, linha 2 | within 90 days. | 15 | 3 |
| Apoio (1440 e 390) | AI agents we run. You approve the big calls. | 44 | 9 |
| CTA | Build my AI office | 18 | 4 |
| Prova (só se comprovada; senão sai e nada entra no lugar) | A$10M+ generated for clients. | 29 | 4 |

**Cargos no hover/tap dos 6 agentes** (aparecem um de cada vez, ≤ 3 palavras; também são o `aria-label` dos botões invisíveis, na ordem de leitura):

| # | Rótulo | Car. |
|---|---|---|
| 1 | Your follow-up | 14 |
| 2 | Your bookkeeper | 15 |
| 3 | Your ad manager | 15 |
| 4 | Your social media | 17 |
| 5 | Your receptionist | 17 |
| 6 | Your analyst | 12 |
| Vértice (`aria-label`) | You approve here | 16 |

O apoio responde, nesta ordem, ao "o quê" (agentes), ao "quem opera" (nós) e ao "quem manda" (você). "The big calls" diz, sem jargão, que nem tudo pede aprovação, e casa com a resposta 1 do FAQ. Não escrevi "nothing goes out without your yes" porque o FAQ admite tarefas que rodam sozinhas: seria uma promessa que a página mesma desmente.

### 2.3 Formulário `#diagnostic`: "o horizonte" (régua ≤ 20 → **20**)
| Campo | Texto | Car. | Palavras |
|---|---|---|---|
| H2, linha 1 | Your AI office, mapped | 22 | 4 |
| H2, linha 2 | in one call. | 12 | 3 |
| Apoio | We'll call within 5 minutes, business hours. | 44 | 7 |
| Privacidade ("Privacy policy" é o link) | Used only to reply. Privacy policy. | 35 | 6 |

**Campos** (rótulo visível em cima; asterisco só se o campo for obrigatório)

| Campo | Rótulo | Placeholder | `autocomplete` / `inputmode` |
|---|---|---|---|
| Nome | Name | Jane Smith | `name` |
| Empresa | Company | Company name | `organization` |
| E-mail | Work email | jane@company.com.au | `email` / `email` |
| Telefone | Mobile | 412 345 678 (prefixo fixo "+61" dentro do campo) | `tel-national` / `tel` |
| Faturamento (4 blocos) | Monthly revenue (AUD) | — | — |

**Faixas de receita.** O texto do bloco é curto; o `value` enviado é a string exata que o código já classifica (`src/lib/leadboard.ts`, `revenueGrade()`, e o `<select>` de `src/App.tsx`).

| Bloco (visível) | `value` (não mude sem migration + teste) | Classe |
|---|---|---|
| Up to $30K | Up to AUD 30k | C |
| $30K–$80K | AUD 30k to AUD 80k | B |
| $80K–$150K | AUD 80k to AUD 150k | A |
| Over $150K | Above AUD 150k | A |

Os blocos da v4.1 ("Under $100K / $100K–$300K / $300K–$1M / Above $1M") ficam guardados no histórico. Eles só entram se o dono quiser mudar a régua A/B/C, e aí mudam juntos `revenueGrade()`, a migration `supabase/migrations/20260721143800_create_leads.sql` e `tests/leadboard.test.mjs`.

| Botão e estados | Texto | Car. |
|---|---|---|
| Botão | Build my AI office | 18 |
| Enviando | Sending… | 8 |
| Erro de rede (acima do botão; os dados ficam) | We couldn't send this. Your answers are still here. Check your connection and try again. | 88 |
| Sucesso (redirect `/thank-you`, título) | Thanks, your details are in. We'll call within 5 minutes during business hours. | 80 |

**Erros por campo** (sob o campo, `aria-describedby`; o feixe daquele campo não acende)

| Campo | Vazio | Inválido |
|---|---|---|
| Name | Add your name so we know who to ask for. | Your name needs at least 2 letters. |
| Company | Add your company name so we can prepare. | Company name needs at least 2 characters. |
| Work email | Add your work email. | Check your email. It needs an @ and a domain, like jane@company.com.au. |
| Mobile | Add your mobile so we can call you. | Enter an Australian mobile, like 412 345 678. |
| Monthly revenue (AUD) | Choose a revenue range. | — |

Os mínimos de 2 caracteres são os `minLength` atuais do `src/App.tsx` (o telefone hoje tem `minLength={6}`, e a validação de celular australiano é nova: avisar o frontend-studio). Os horizontes e os feixes são decorativos (`aria-hidden="true"`): o progresso real fica nos erros e no botão.

### 2.4 A noite: "a grade-onda" (régua ≤ 25 → **6** + rótulos)
| Campo | Texto | Car. | Palavras |
|---|---|---|---|
| H2 | While you sleep, the office works. | 34 | 6 |

**Rótulos de dado** (hora · ação · detalhe; ≤ 4 palavras sem contar a hora; no máximo 5 visíveis ao mesmo tempo a 1440 e 3 a 390, à direita). A ordem é a da crista, das 18:00 às 08:00.

| # | Rótulo | Mesa que fez | Palavras |
|---|---|---|---|
| 1 | 18:40 · Enquiry answered · Geelong | receptionist | 3 |
| 2 | 20:15 · Quote sent · Newcastle | follow-up | 3 |
| 3 | 21:30 · Purchase order logged | bookkeeper | 3 |
| 4 | 23:05 · Ad spend capped | ad manager | 3 |
| 5 | 02:14 · Quote request · Perth | receptionist | 3 |
| 6 | 03:10 · Google review answered | social media | 3 |
| 7 | 03:40 · Invoice reminder drafted | bookkeeper | 3 |
| 8 | 05:05 · 14 leads followed up | follow-up | 4 |
| 9 | 06:30 · Sales report ready | analyst | 3 |
| 10 | 07:58 · Waiting for your yes | (vai para a seção Você) | 4 |

O rótulo 10 é o ponto-lead que escorre para a maquete e depois para o telefone: 07:58 é a hora da ordem 1. Os 14 leads são o número que a noite da v4.1 já usava, e não há número novo aqui. A noite inteira é ilustrativa, como diz o rodapé. Nenhum rótulo tem nome de empresa; as cidades são de praças reais da indústria australiana, sem cliente.

**`aria-label` da cena (o canvas é `role="img"`):** Overnight, 6pm to 8am: enquiries answered, quotes sent, invoices chased, 14 leads followed up, and one request waiting for your yes.
**Sem WebGL / reduced motion:** o pôster + os rótulos 5, 8 e 10 em HTML ao lado.

### 2.5 O escritório: "a equipe conversando" (régua ≤ 25 → **25**)
| Campo | Texto | Car. | Palavras |
|---|---|---|---|
| H2, linha 1 (1440; a 390 sem quebra forçada) | Never late. | 11 | 2 |
| H2, linha 2 | Never asks for a raise. | 23 | 5 |

**Balões** (um de cada vez, ancorados na mesa de quem fala, sobre a foto e nunca sobre o título; a 390, em sequência embaixo da imagem, com o nome da mesa acima de cada fala)

| Troca | Quem fala → com quem | Pergunta | Resposta | Palavras |
|---|---|---|---|---|
| 1 | Follow-up → Reception | Sam replied? | Not yet. Opened 07:40. | 2 + 4 |
| 2 | Ad manager → Reception | Leads overnight? | Nine, answered by 23:10. | 2 + 4 |
| 3 | Bookkeeper → Analyst | #1047 paid? | No. Flagged for 8am. | 2 + 4 |

Nome da mesa a 390 (rótulo, conta à parte, 7 palavras): Follow-up · Reception · Ad manager · Reception · Bookkeeper · Analyst.

As três trocas fecham com o resto da página: o Sam abriu e não respondeu (ordem 1 do telefone), as nove enquiries são as da noite da v4.1, e a fatura #1047 é a da ordem 2. As falas são telegráficas de propósito: é conversa de colega, e quem lê na foto não lê parágrafo.

**`alt` do pôster / vídeo:** Architect's model of the BrandUp office: six desks with resin figures and the owner's room, lit like a studio photo. (114 car.)
**Reduced motion:** o pôster + os três balões de uma vez, estáticos.

### 2.6 Você: "o sim" (régua ≤ 25 → **14** fora do telefone)
| Campo | Texto | Car. | Palavras |
|---|---|---|---|
| H2 | You have the final word. | 24 | 5 |
| Apoio | Approve from your phone in seconds. Try this one. | 49 | 9 |

**Telefone: três ordens** (o que o agente quer fazer ≤ 10 palavras · por quê ≤ 14 · prévia ≤ 20)

| | Ordem 1, a viva | Ordem 2 | Ordem 3 |
|---|---|---|---|
| Linha de cima | Your follow-up · A$14,200 · Sam | Your bookkeeper · A$18,400 · 3 clients | Your receptionist · Website enquiry |
| Pedido | Follow up Sam's quote, unanswered for 6 days? (8) | Send reminders for 3 overdue invoices? (6) | Reply to a new enquiry about pallet racking? (8) |
| Por quê | Sam opened it twice and hasn't replied since Monday. (9) | All three are 14 to 30 days overdue, with no reminder this month. (13) | It came in at 06:50 and asks for pricing, which waits for you. (13) |
| Prévia | Hi Sam, did the steel bracket quote land OK? Happy to adjust. (12) | Hi, a friendly reminder that invoice #1047 for A$6,200 was due on 21 October. Thank you. (16) | Hi, thanks for your enquiry about pallet racking. Could we call you Thursday at 10am to go through pricing? (19) |
| Enviada | Sent. Follow-up on its way to Sam. | Sent. Reminders on their way to 3 clients. | Sent. Reply on its way. |

Os valores A$14,200, A$18,400 e A$6,200 e a data de 21 October já estavam na v4.1. O "Monday" é 2 November de 2026 (a v4.1 conferiu). A ordem 3 é nova e não traz número de negócio: ela mostra a regra do FAQ 1 (preço espera por você).

**Estados** (anunciados por `aria-live="polite"`; a luz faz o resto)

| Estado | Texto | Car. |
|---|---|---|
| A chegar | New request from your follow-up. (troca o cargo em cada ordem) | 32 |
| Esperando (botões) | Approve · Edit · Decline | — |
| Aprovando (rótulo do Approve) | Sending… | 8 |
| Enviado | a linha "Enviada" da ordem | — |
| Editar (a prévia vira campo; botão) | Send my version | 15 |
| Editado | Edited. Your version was sent. | 30 |
| Recusado (texto secundário, nunca vermelho) | Declined. Nothing was sent. | 27 |
| Tudo resolvido (depois da 3ª) | All clear. Nothing is waiting for you. | 38 |
| Erro | Couldn't send. Try again. | 25 |
| Sem script | as 3 ordens empilhadas, estáticas: a 1 "Sent", a 2 "Declined", a 3 esperando | — |

O telefone é HTML de verdade: não leva `alt`. Os feixes que chegam a ele são `aria-hidden="true"`.

### 2.7 90 dias: "quando cada mesa liga" (régua ≤ 25 → **16**)
**A seção inteira depende do plano de onboarding do dono. Se ele não confirmar, ela sai (o brief-v4 §5.6 já prevê).**

| Campo | Texto | Palavras |
|---|---|---|
| H2 | Desk by desk, over 90 days. | 6 |
| Número que conta | Day 0 → Day 90 ("Day" fixo, o número muda) | 2 |
| Prova (só se comprovada) | fora da v5 nesta seção (ver nota) | 0 |

| Glifo | Nome (1–2 palavras) | Dia em que liga |
|---|---|---|
| 1 | Reception | `modelo:` Day 7 |
| 2 | Follow-up | `modelo:` Day 14 |
| 3 | Bookkeeper | `modelo:` Day 30 |
| 4 | Ad manager | `modelo:` Day 45 |
| 5 | Social media | `modelo:` Day 60 |
| 6 | Analyst | `modelo:` Day 90 |

Os dias são amostra para o mock, numa camada nomeada `modelo:` no Figma, e não vão ao site sem o dado real. O brief pede a prova A$10M+ também aqui. Tirei para a página fechar em ≤ 260 (com ela seriam 262), e ela continua no hero. Se o dono preferir a prova aqui, ela sai do hero.

**`aria-label` da linha (lista em HTML por baixo):** Over the first 90 days, each desk goes live: reception, follow-up, bookkeeper, ad manager, social media, then analyst.
**Reduced motion:** Day 90, os 6 acesos e os 6 dias escritos.

### 2.8 FAQ (régua: título 1–3 palavras → **1**; perguntas ≤ 8; respostas ≤ 35, fechadas)
| Campo | Texto |
|---|---|
| Título | Questions |

| # | Pergunta | Pal. | Resposta (abre no `<details>`) | Pal. |
|---|---|---|---|---|
| 1 | Will the AI act without my approval? | 7 | Only where you allow it. You choose what runs on its own, like answering a common enquiry, and what waits for your yes, like a price or a payment reminder. Every action is logged. | 34 |
| 2 | Is my data safe? | 4 | Your data is used only to run your agents and is never shared with other clients. Each agent reaches only the accounts you connect, and you can ask us to delete it. | 32 |
| 3 | How much does it cost? | 5 | A fixed monthly fee in AUD, set after the diagnosis by how many agents you need. The minimum engagement is 3 months. | 22 |
| 4 | Will it work with my systems? | 6 | In most cases, yes. We connect the agents to your email, CRM, accounting software and social accounts, and set it all up for you. No tech team needed. | 28 |
| 5 | How long until I see results? | 6 | The first agents usually start working in the first few weeks. The full plan runs over 90 days: connect your systems, tune each agent, measure the revenue it brings in. | 30 |

Frases `modelo:` (camada à parte, nunca no site sem o dado):
- FAQ 2: `modelo:` Your data is stored in Sydney and never used to train AI models. (só depois de confirmar onde fica e o que os provedores garantem; ela entra no lugar da 2ª frase para caber em 35)
- FAQ 3: `modelo:` Plans start at A$0,000 a month. (só com o preço real, e se o dono quiser público)
- FAQ 4: `modelo:` We already connect to Xero, MYOB, HubSpot and Microsoft 365. (só a lista confirmada; entra no lugar de "No tech team needed.")

Corte em relação à v4.1: as perguntas "Do I need a tech team?" e "What happens if an agent gets something wrong?" viraram uma frase cada, dentro das respostas 4 e 1.

### 2.9 Final: "a subida" (régua ≤ 15 → **15**)
| Campo | Texto | Car. | Palavras |
|---|---|---|---|
| H2 | Want a team like this? | 22 | 5 |
| Botão | Build my AI office | 18 | 4 |
| Privacidade | Used only to reply. Privacy policy. | 35 | 6 |
| Campos, faixas, erros, estados | os mesmos da §2.3 (outro `id`, mesmo componente) | — | — |
| Triângulo que sobe | `aria-hidden="true"` | — | — |

### 2.10 Rodapé (12 palavras + dados reais)
| Campo | Texto |
|---|---|
| Contato | `modelo:` hello@brandup.com.au · `modelo:` 02 5550 1234 · `modelo:` ABN 12 345 678 901 (dados reais ou nada; o telefone-modelo usa a faixa 02 5550 que a ACMA reserva para ficção) |
| Sociais (`aria-label`) | BrandUp on LinkedIn · BrandUp on Instagram · BrandUp on Facebook (só os canais que existem) |
| Ressalva | Agent activity shown on this page is illustrative. |
| Links | Privacy policy · © 2026 BrandUp |

### 2.11 Metadados
| Campo | Texto | Car. |
|---|---|---|
| `<title>` | BrandUp \| AI agents for industrial and B2B companies in Australia | 66 / 70 |
| `meta description` | BrandUp builds and runs an office of AI agents for Australian industrial and B2B companies. They work overnight; you approve the big calls. | 140 / 160 |
| `og:title` | Over $250K per month within 90 days. | 36 |
| `og:description` | An office of AI agents we build and run for your business. You approve the big calls. | 85 |
| `og:image` `alt` | The BrandUp triangle made of light points, rising from a dark horizon. | 70 |

O `og:title` repete o gancho porque é o que a pessoa viu no anúncio. Ele está sujeito à mesma confirmação do H1 (§5, item 1).

---

## 3. Variações

### H1 do hero (2 linhas, ≤ 20 car. cada)
| | Texto | Car. | Ângulo |
|---|---|---|---|
| **Recomendada** | Over $250K per month / within 90 days. | 36 | Resultado: o número do anúncio, com o prazo. |
| 1 | Over $250K a month. / You make the calls. | 39 | Controle. É a saída se o "90 days" não passar na comprovação. |
| 2 | Leads answered at 2am. / Over $250K a month. | 42 | Dor (o lead que esfria de madrugada); rima com a grade-onda. A 1ª linha tem 22 car.: o type-director mede a 390. |

### CTA principal
| | Texto | Car. | Ângulo |
|---|---|---|---|
| **Recomendado** | Build my AI office | 18 | Produto. Um rótulo só no hero, nos dois formulários e na description. |
| 1 | Book my diagnosis | 17 | Processo: diz o que acontece (uma ligação) e pede menos compromisso. Bom para o A/B no tráfego do Meta. |
| 2 | Meet my new team | 16 | Rima com o anúncio ("never asks for a raise"); mais leve. |

---

## 4. Estados
- **Formulário (os dois):** vazio, foco, erro por campo, enviando, erro de rede e sucesso, na §2.3.
- **Telefone:** os 9 estados e o sem script, na §2.6.
- **Cenas com shader (hero, noite, 90 dias):** pôster + o `aria-label`, ou o HTML de fallback, nas §2.2, §2.4 e §2.7. Nenhuma cena some sem texto.
- **Vídeo da maquete com erro:** fica o pôster com o `alt` da §2.5.

---

## 5. Placeholders e fatos a confirmar com o dono
1. **"Over $250K per month within 90 days"** (H1 e `og:title`): vale para indústria e B2B, ou veio dos restaurantes? Sem comprovação para este público, é risco de conduta enganosa (ACL/ACCC). Se faltar a prova, a saída é a variação 1.
2. **"A$10M+ generated for clients"** (hero): é em AUD? Qual é o período e a fonte? Sem prova, a linha sai e não entra nada no lugar.
3. **Ligação em 5 minutos, em horário comercial** (apoio do formulário e sucesso): qual fuso (AEST/AEDT) e quem liga.
4. **Aprovação pelo celular existe hoje?** Se não existir, a seção Você e o "Approve from your phone" descrevem o que ainda vem, e precisam mudar.
5. **Plano de 90 dias** (§2.7): o dia em que cada mesa liga. Sem ele, a seção sai.
6. **Preço** (FAQ 3): mostrar o valor inicial? O mínimo de 3 meses pode ser público?
7. **Dados** (FAQ 2): onde ficam, quais provedores de IA processam, se treinam com eles e o prazo de exclusão. Revisar `/privacy`.
8. **Integrações** (FAQ 4): a lista real.
9. **"Every action is logged"** (FAQ 1): a operação registra mesmo toda ação?
10. **Faixas de receita:** manter as 4 faixas do código (recomendado, sem migration) ou mudar a régua A/B/C.
11. **Contato, ABN e sociais** do rodapé: hoje são `modelo:`.
12. **Depoimento:** fora da página até existir um real, autorizado por escrito.

---

## 9. Contagem de palavras (script)
Script: `docs/redesign/conta-palavras-v5.py` (rode com `python3`). Ele separa palavras por espaço, ignora "·", "|" e "→", e conta só tokens com letra, número, "$" ou "#". "Régua" = título + apoio + CTA + rótulos fixos da seção. "À parte" = o que o brief conta separado (campos, rótulos de cena, telefone, perguntas, nomes de mesa).

| Seção | Régua | Limite | À parte | O que está à parte |
|---|---|---|---|---|
| Header | 1 | — | 0 | — |
| Hero | 24 | 25 | 14 (hover, um de cada vez; não pinta junto) | cargos dos 6 agentes |
| Formulário | 20 | 20 | 20 | rótulos, faixas e o botão |
| A noite | 6 | 25 | 32 no total, 17 no pior quadro (5 visíveis) | 10 rótulos de dado |
| O escritório | 25 | 25 | 7 (só a 390) | nomes das mesas nos balões |
| Você | 14 | 25 | 36 | ordem 1 do telefone (as ordens 2 e 3 só chegam depois do Approve) |
| 90 dias | 16 | 25 | 0 | — |
| FAQ (fechado) | 1 | 3 | 28 | 5 perguntas |
| Final | 15 | 15 | 16 | rótulos e faixas do formulário 2 |
| Rodapé | 12 | — | (9 `modelo:`, fora do site) | contatos |
| **Total régua** | **134** | | | |
| **1ª pintura, FAQ fechado** | **258** | **260** | | régua + campos + ordem 1 + pior quadro da noite + perguntas + nomes das mesas |

Respostas do FAQ (fechadas, não contam): 34 · 32 · 22 · 28 · 30, todas ≤ 35.
Telefone: ordem 1 = 4 · 8 · 9 · 12 (+ 3 botões) · ordem 2 = 5 · 6 · 13 · 16 · ordem 3 = 4 · 8 · 13 · 19. Todas dentro de ≤ 10 / ≤ 14 / ≤ 20.

Margem: 2 palavras. Se a prova A$10M+ não for comprovada, a página cai para 254. Se a seção dos 90 dias sair, cai para 242. Qualquer texto novo precisa sair de outro lugar.

---

## Fontes da pesquisa de mercado (08/11/2026, herdadas da v3)
- Team 400, AI Agency Australia: https://team400.ai/ai-agency
- Team 400, AI Agent Developers Melbourne: https://team400.ai/ai-agent-developers-melbourne
- Australian Manufacturing, agentic automation: https://www.australianmanufacturing.com.au/why-agentic-automation-is-the-next-evolution-in-advanced-manufacturing/
- TechRepublic, agentic AI no trabalho australiano: https://www.techrepublic.com/article/agentic-ai-australian-workplace-2025/
