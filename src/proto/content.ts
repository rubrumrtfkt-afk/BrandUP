// Copy v5.4 (docs/redesign/copy.md, section "v5.4": the long hero for businesses in general; variation B of the H1, the
// owner's sentence, by the orchestrator's call 09/11) over v5.3/v5.2 (the office phrase stays as it is by the owner's call). Strings marked
// MODELO are samples that must not ship without the owner's real data (copy §5). The four brief-v4.4 example strings
// (night.count, night.aria, office.orderTag, faq.contact) were written by the copy-director in v5.3.
export const COPY_VERSION = 'v5.4'

export const hero = {
  // copy v5.4 §A variation B: three blocks of sense; index 1 is the one maximum emphasis (<strong>, the giant line). If the
  // line must break, it breaks between the blocks, never inside "$250K per month" (390 breaks it on purpose: $250K / per month)
  h1: ['How businesses are generating over', '$250K per month', 'within 90 days by investing in automation and AI.'],
  // copy v5.4 §B + §C: the short line "AI agents we run. You approve the big calls." is fused into the support; the
  // [before, strong, after] split keeps "over 10 million" as the secondary emphasis (text weight, no colour, no size)
  lede: ['AI agents and automation that put you first when customers search, compare and decide who to buy from. We run them. You approve the big calls. We have already generated ', 'over 10 million', ' in sales for our clients.'],
  cta: 'Build my AI office',
  // copy v5.4 §C: hero.proof is gone (the proof now lives in the support; saying it twice was the same thing twice)
  vertex: 'You approve here',
}

// Reading order of the six agents in the hero network = left to right on the base of the triangle.
export const agents = ['Your follow-up', 'Your bookkeeper', 'Your ad manager', 'Your social media', 'Your receptionist', 'Your analyst']

export const form = {
  h2: ['One call.', 'Your plan.'],
  lede: 'We’ll call within 5 minutes, business hours.',
  privacy: 'Used only to reply.',
  privacyLink: 'Privacy policy.',
  button: 'Build my AI office',
  sending: 'Sending…',
  networkError: 'We couldn’t send this. Your answers are still here. Check your connection and try again.',
  // PROVISÓRIO (copy-director): copy.md has one error line, about the connection; this one is for an answer from the
  // server (a CHECK, RLS), where "check your connection" would send the person the wrong way.
  serverError: 'We couldn’t send this. Your answers are still here. Please try again.',
  // copy.md "Botão e estados", the success line (on the live site it is the /thank-you title; the prototype stays on the page)
  success: 'Thanks, your details are in. We’ll call within 5 minutes during business hours.',
  // Prototype only: the simulated sender sends nothing. Not copy, a lab note shown under the confirmation.
  protoNote: 'Prototype: nothing was sent.',
}

export type FieldKey = 'name' | 'company' | 'email' | 'phone' | 'revenue'
export const fields: { key: Exclude<FieldKey, 'revenue'>; label: string; placeholder: string; autoComplete: string; inputMode?: 'email' | 'tel'; type: string; empty: string; invalid: string }[] = [
  { key: 'name', label: 'Name', placeholder: 'Jane Smith', autoComplete: 'name', type: 'text', empty: 'Add your name so we know who to ask for.', invalid: 'Your name needs at least 2 letters.' },
  { key: 'company', label: 'Company', placeholder: 'Company name', autoComplete: 'organization', type: 'text', empty: 'Add your company name so we can prepare.', invalid: 'Company name needs at least 2 characters.' },
  { key: 'email', label: 'Work email', placeholder: 'jane@company.com.au', autoComplete: 'email', inputMode: 'email', type: 'email', empty: 'Add your work email.', invalid: 'Check your email. It needs an @ and a domain, like jane@company.com.au.' },
  { key: 'phone', label: 'Mobile', placeholder: '412 345 678', autoComplete: 'tel-national', inputMode: 'tel', type: 'tel', empty: 'Add your mobile so we can call you.', invalid: 'Enter an Australian mobile, like 412 345 678.' },
]
export const revenue = {
  label: 'Monthly revenue (AUD)',
  empty: 'Choose a revenue range.',
  // value = the exact string revenueGrade() in src/lib/leadboard.ts classifies. Do not change one without the other.
  options: [
    { label: 'Up to $30K', value: 'Up to AUD 30k' },
    { label: '$30K–$80K', value: 'AUD 30k to AUD 80k' },
    { label: '$80K–$150K', value: 'AUD 80k to AUD 150k' },
    { label: 'Over $150K', value: 'Above AUD 150k' },
  ],
}

export const night = {
  h2: 'While you sleep, the office works.',
  // brief-v4.4 §4.6 + copy v5.3: the phone gets its own sentence, with the count
  aria: 'Overnight, from 6pm to 8am, six agents work at their desks while you sleep: enquiries answered, quotes sent, leads ranked, invoice reminders drafted, 14 leads followed up. Nine jobs done, and each result reaches your phone. At 7:58am, one request waits there for your yes.', // copy v5.3
  // [time, action/detail]; order of the crest, 18:00 → 08:00.
  labels: [
    ['18:40', 'Enquiry answered · Geelong'],
    ['20:15', 'Quote sent · Newcastle'],
    ['21:30', 'Purchase order logged'],
    ['23:05', 'Ad spend capped'],
    ['00:20', 'Google review answered'],
    ['01:50', 'Leads ranked by value'],
    ['03:40', 'Invoice reminders drafted'],
    ['05:05', '14 leads followed up'],
    ['06:30', 'Sales report ready'],
    ['07:58', 'Waiting for your yes'],
  ] as [string, string][],
  fallback: [5, 7, 9], // 01:50 leads ranked → 05:05 followed up → 07:58 waiting (copy v5.1 §B)
  // brief-v4.2 §5.2 "the shift" (copy v5.1 §B): the six desks in the hero's base order, a short name for 390,
  // and each label's desk + past-tense task; -1 = the phone at home. All six desks work before 03:00.
  desks: [
    { name: 'Follow-up', short: 'Follow-up' }, { name: 'Bookkeeper', short: 'Books' }, { name: 'Ad manager', short: 'Ads' },
    { name: 'Social media', short: 'Social' }, { name: 'Receptionist', short: 'Reception' }, { name: 'Analyst', short: 'Analyst' },
  ],
  tasks: [[4, 'enquiry answered'], [0, 'quote sent'], [1, 'order logged'], [2, 'spend capped'], [3, 'review answered'], [5, 'leads ranked'], [1, 'reminders drafted'], [0, '14 followed up'], [5, 'report ready'], [-1, '1 waiting']] as [number, string][],
  home: 'You, asleep', waiting: '1 waiting',
  count: 'done overnight', // copy v5.3 (≤ 3 words, beside the number; no plural noun: reads at 0, 1 and 9)
  posterAt: '02:14', // the poster / reduced-motion / no-JS frame
}

export const office = {
  h2: ['Never late.', 'Never asks for a raise.'],
  // brief-v4.1 §4.2 (K2): the human line the agent replaces (copy v5.1: "Sometimes", the same word on both lines)
  human: 'Sometimes',
  agent: 'Never',
  rest: ['late.', 'asks for a raise.'],
  // brief-v4.1 §4.3: the 90-day line replaces the "Desk by desk" title. MODELO days (copy §2.7).
  lineLabel: 'First 90 days',
  orderTag: 'For you: Sam’s quote', // copy v5.3 (≤ 4 words): the follow-up desk sends the order to your phone
  alt: 'Architect’s model of the BrandUp office: six desks with resin figures and the owner’s room, lit like a studio photo.',
  // speaker → listener, question, answer (desk ids match render/v2/desks.json)
  talk: [
    { from: 'followup', fromName: 'Follow-up', to: 'receptionist', toName: 'Reception', q: 'Sam replied?', a: 'Not yet. Opened 07:40.' },
    { from: 'admanager', fromName: 'Ad manager', to: 'receptionist', toName: 'Reception', q: 'Leads overnight?', a: 'Nine, answered by 23:10.' },
    { from: 'bookkeeper', fromName: 'Bookkeeper', to: 'analyst', toName: 'Analyst', q: '#1047 paid?', a: 'No. Flagged for 8am.' },
  ],
}

export const you = {
  h2: 'You have the final word.',
  // brief-v4.1 §4.4: the H2 split on the two flanks of the phone; each half reads on its own.
  split: ['You have', 'the final word.'],
  // sr-only script of the scroll-driven stage (§4.5); the live region only speaks at the thresholds.
  script: 'Your follow-up asks to follow up Sam’s quote: approved and sent. Your bookkeeper asks to send 3 invoice reminders: approved and sent. Your receptionist asks to offer 15% off: declined, nothing was sent.',
  lede: 'Approve from your phone in seconds. Try this one.',
  orders: [
    { desk: 'follow-up', top: ['Your follow-up', 'A$14,200', 'Sam'], ask: 'Follow up Sam’s quote, unanswered for 6 days?', why: 'Sam opened it twice and hasn’t replied since Monday.', preview: 'Hi Sam, did the steel bracket quote land OK? Happy to adjust.', sent: 'Sent. Follow-up on its way to Sam.' },
    { desk: 'bookkeeper', top: ['Your bookkeeper', 'A$18,400', '3 clients'], ask: 'Send reminders for 3 overdue invoices?', why: 'All three are 14 to 30 days overdue, with no reminder this month.', preview: 'Hi, a friendly reminder that invoice #1047 for A$6,200 was due on 21 October. Thank you.', sent: 'Sent. Reminders on their way to 3 clients.' },
    // brief-v4.1 §4.5: order 3 is one the owner would DECLINE (a discount to close); copy v5.2 keeps it (9 / 12 words)
    { desk: 'receptionist', top: ['Your receptionist', 'Pallet racking quote'], ask: 'Offer 15% off to close the racking quote today?', why: 'The buyer asked for a better price. Margins are yours to set.', preview: 'Hi, we can take 15% off the racking quote if you confirm today.', sent: 'Declined. Nothing was sent.' },
  ],
  arriving: (desk: string) => `New request from your ${desk}.`,
  approve: 'Approve', edit: 'Edit', decline: 'Decline',
  // brief-v4.3 §4.4: the button's state while the scroll acts (copy v5.2: unchanged)
  approveG: ['Approve', 'Approving…', 'Approved'] as const, declineG: ['Decline', 'Declining…', 'Declined'] as const,
  // EM AVALIAÇÃO (?scrollhint=0 removes it): only during order 1 (copy v5.2)
  scrollHint: 'Scroll to approve.',
  // brief-v4.5 §9.2: the line under the agent whose turn it is (≤ 14 chars each). The brief's own examples, PENDING the
  // copy-director (§12.2 asked for them; not in copy.md v5.4)
  agentState: { waiting: 'Asking you', sent: 'Sending', declined: 'Stopped', clear: '' } as Record<string, string>,
  sending: 'Sending…', sendMine: 'Send my version', edited: 'Edited. Your version was sent.',
  declined: 'Declined. Nothing was sent.', clear: 'All clear. Nothing is waiting for you.', error: 'Couldn’t send. Try again.',
  // brief-v4.2 §6, the lock screen (strings as written in the brief; the copy-director may still tune them)
  lock: { time: '08:04', l1: 'All clear.', l2: 'Nothing’s waiting for you.', summary: '2 sent · 1 declined', live: 'All clear. Nothing’s waiting for you. Two sent, one declined.' },
}

export const days = {
  h2: 'Desk by desk, over 90 days.',
  aria: 'Over the first 90 days, each desk goes live: reception, follow-up, bookkeeper, ad manager, social media, then analyst.',
  // MODELO: sample onboarding days, not confirmed by the owner (copy §2.7). The whole section goes if unconfirmed.
  desks: [
    { name: 'Reception', day: 7 },
    { name: 'Follow-up', day: 14 },
    { name: 'Bookkeeper', day: 30 },
    { name: 'Ad manager', day: 45 },
    { name: 'Social media', day: 60 },
    { name: 'Analyst', day: 90 },
  ],
}

export const faq = {
  h2: 'Questions',
  contact: 'Can’t see your question? Email or call us.', // copy v5.3: the verbs follow the links (email first, as in the FAQ markup)
  items: [
    ['Will the AI act without my approval?', 'Only where you allow it. You choose what runs on its own, like answering a common enquiry, and what waits for your yes, like a price or a payment reminder. Every action is logged.'],
    ['Is my data safe?', 'Your data is used only to run your agents and is never shared with other clients. Each agent reaches only the accounts you connect, and you can ask us to delete it.'],
    ['How much does it cost?', 'A fixed monthly fee in AUD, set after the diagnosis by how many agents you need. The minimum engagement is 3 months.'],
    ['Will it work with my systems?', 'In most cases, yes. We connect the agents to your email, CRM, accounting software and social accounts, and set it all up for you. No tech team needed.'],
    ['How long until I see results?', 'The first agents usually start working in the first few weeks. The full plan runs over 90 days: connect your systems, tune each agent, measure the revenue it brings in.'],
  ] as [string, string][],
}

export const final = {
  h2: 'Want a team like this?',
  // brief-v4.3 §5.3: the sr-only line that names the six dots (copy v5.2)
  team: 'This is the team from the top of the page: follow-up, bookkeeper, ad manager, social media, receptionist and analyst.',
}

export const footer = {
  // MODELO contact data (copy §2.10): real data or nothing before launch.
  email: 'hello@brandup.com.au', phone: '02 5550 1234', abn: 'ABN 12 345 678 901',
  note: 'Agent activity shown on this page is illustrative.',
  privacy: 'Privacy policy', copy: '© 2026 BrandUp',
  // brief-v4.2 §7, the live line (copy v5.1 §C); covered by the note above.
  live: (time: string) => `Sydney ${time} · agents on shift`,
  // the footer's columns (owner's request; labels copy v5.1 §C): every link points at something that exists on
  // this page or the site (no invented pages).
  cols: {
    product: { h: 'How it works', links: [['Overnight', '#night-h'], ['Your AI office', '#office-h'], ['Approvals', '#you-h'], ['FAQs', '#faq-h']] },
    company: { h: 'Company', links: [['Book a diagnosis', '#diagnostic']] },
    legal: { h: 'Legal' },
    contact: { h: 'Contact' },
  },
}
