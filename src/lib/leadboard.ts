import type { Attribution } from './attribution'

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'closed' | 'archived'
export type Lead = Attribution & { id: string; created_at: string; name: string; email: string;
  phone: string; company: string; monthly_revenue: string; status: LeadStatus }
export const statusLabels: Record<LeadStatus, string> = { new: 'Novo', contacted: 'Contatado', qualified: 'Qualificado', closed: 'Fechado', archived: 'Arquivado' }
export const channelLabels: Record<string, string> = { meta: 'Meta', google: 'Google', instagram: 'Instagram', facebook: 'Facebook', whatsapp: 'WhatsApp', qr: 'QR / offline', referral: 'Indicação', email: 'Email', direct: 'Direto / não identificado', other: 'Outros' }
export function channelOf(lead: Attribution) {
  const source = lead.utm_source?.toLowerCase() ?? ''
  if (lead.fbclid || ['meta', 'facebook', 'fb', 'instagram'].includes(source) && /paid|cpc|social_paid/.test(lead.utm_medium ?? '')) return 'meta'
  if (lead.gclid || ['google', 'googleads'].includes(source)) return 'google'
  if (['instagram', 'ig'].includes(source)) return 'instagram'
  if (['facebook', 'fb'].includes(source)) return 'facebook'
  if (['whatsapp', 'wa'].includes(source)) return 'whatsapp'
  if (['qr', 'offline'].includes(source)) return 'qr'
  if (['referral', 'ref', 'partner'].includes(source) || !source && lead.referrer) return 'referral'
  if (source === 'email') return 'email'
  return source ? 'other' : 'direct'
}
export function needsAttention(lead: Lead, now: number) {
  return lead.status === 'new' && now - Date.parse(lead.created_at) >= 5 * 60 * 1000
}
export function filterLeads(leads: Lead[], filters: {query: string; days: string; channel: string; status: string; campaign: string; attention: boolean}, now: number) {
  const query = filters.query.trim().toLowerCase()
  return leads.filter(lead => (!filters.days || Date.parse(lead.created_at) >= now - Number(filters.days) * 86400000)
    && (!filters.channel || channelOf(lead) === filters.channel)
    && (!filters.status || lead.status === filters.status)
    && (!filters.campaign || lead.utm_campaign === filters.campaign)
    && (!filters.attention || needsAttention(lead, now))
    && (!query || [lead.name, lead.company, lead.email, lead.phone, lead.utm_source, lead.utm_campaign, lead.utm_content, lead.offer, lead.partner].join(' ').toLowerCase().includes(query)))
}
export function csvCell(value: string) {
  const safe = /^[\s]*[=+\-@\t\r]/.test(value) ? `'${value}` : value
  return `"${safe.replaceAll('"', '""')}"`
}
export type LinkFields = { source: string; medium: string; campaign: string; content: string; term: string; offer: string; placement: string; partner: string }
export function buildTrackedLink(fields: LinkFields, id = '') {
  const url = new URL('https://brandupadvisory.com/')
  const params = { utm_source: fields.source, utm_medium: fields.medium, utm_campaign: fields.campaign, utm_content: fields.content, utm_term: fields.term, offer: fields.offer, placement: fields.placement, partner: fields.partner, link_id: id }
  Object.entries(params).forEach(([key, value]) => { if (value.trim()) url.searchParams.set(key, value.trim()) })
  return url.toString().replaceAll('%7B', '{').replaceAll('%7D', '}')
}
