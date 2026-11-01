import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Copy, Link2, Plus } from 'lucide-react'
import { supabase } from './lib/supabase'
import { buildTrackedLink, channelLabels, channelOf } from './lib/leadboard'
import type { Lead, LinkFields } from './lib/leadboard'

type SavedLink = { id: string; name: string; fields: LinkFields; created_at: string; archived: boolean }
const initial: LinkFields = { source: 'facebook', medium: 'paid', campaign: '', content: '', term: '', offer: '', placement: '', partner: '' }
const presets = [
  { name: 'Anúncios Meta', source: 'facebook', medium: 'paid', campaign: '{{campaign.name}}', content: '{{ad.name}}', term: '{{adset.name}}', placement: '{{placement}}' },
  { name: 'Bio do Instagram', source: 'instagram', medium: 'organic', campaign: 'bio', content: '', term: '', placement: 'bio' },
  { name: 'Página do Facebook', source: 'facebook', medium: 'organic', campaign: 'page', content: '', term: '', placement: 'page' },
  { name: 'WhatsApp', source: 'whatsapp', medium: 'organic', campaign: 'status', content: '', term: '', placement: 'status' },
  { name: 'QR / offline', source: 'qr', medium: 'offline', campaign: '', content: '', term: '', placement: '' },
  { name: 'Indicação', source: 'referral', medium: 'word_of_mouth', campaign: 'partner', content: '', term: '', placement: '' },
]
export default function LeadLinks({ leads }: { leads: Lead[] }) {
  const [fields, setFields] = useState<LinkFields>(initial)
  const [name, setName] = useState('')
  const [links, setLinks] = useState<SavedLink[]>([])
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [showArchived, setShowArchived] = useState(false)
  const [savedId, setSavedId] = useState('')
  const url = useMemo(() => buildTrackedLink(fields, savedId), [fields, savedId])
  useEffect(() => {
    let active = true
    async function load() {
      const items: SavedLink[] = []
      for (let offset = 0; ; offset += 1000) {
        const { data, error } = await supabase.from('lead_links').select('id,name,fields,created_at,archived').order('created_at', { ascending: false }).range(offset, offset + 999)
        if (!active) return
        if (error) { setError('Não foi possível carregar os links. Confira a migração do banco e seu acesso.'); setLoading(false); return }
        items.push(...data as SavedLink[])
        if (data.length < 1000) break
      }
      if (active) { setLinks(items); setLoading(false) }
    }
    void load()
    return () => { active = false }
  }, [])
  const copy = async (value: string) => {
    try { await navigator.clipboard.writeText(value); setMessage('Link copiado.') }
    catch { setMessage('Não foi possível copiar. Selecione o link e copie manualmente.') }
  }
  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (busy) return
    setBusy(true); setMessage('')
    const item: SavedLink = { id: crypto.randomUUID(), name: name.trim(), fields, created_at: new Date().toISOString(), archived: false }
    const { error } = await supabase.from('lead_links').insert(item)
    if (error) setMessage('O link não foi salvo. Confira a migração do banco e seu acesso.')
    else { setLinks(current => [item, ...current]); setSavedId(item.id); setMessage('Link salvo para a equipe. Agora copie o link com identificador.') }
    setBusy(false)
  }
  const archive = async (item: SavedLink) => {
    setBusy(true)
    const { error } = await supabase.from('lead_links').update({ archived: !item.archived }).eq('id', item.id).select('id').single()
    if (error) setMessage('Não foi possível atualizar o link.')
    else setLinks(current => current.map(link => link.id === item.id ? { ...link, archived: !link.archived } : link))
    setBusy(false)
  }
  return <div className="board-stack">
    <section className="board-panel">
      <div className="board-section-title"><div><p className="admin-eyebrow">Origem desde o primeiro clique</p><h2>Gerador de links</h2></div><Link2 aria-hidden="true" /></div>
      <p>Use o mesmo site com links diferentes para anúncios, bio, parceiros e QR. Os parâmetros acompanham o formulário até o lead.</p>
      <div className="board-chips">{presets.map(preset => <button type="button" key={preset.name} onClick={() => { const { name, ...values } = preset; setFields({ ...initial, ...values }); setName(name); setSavedId('') }}>{preset.name}</button>)}</div>
      <form className="board-link-form" onSubmit={save} onChange={() => { setSavedId(''); setMessage('') }}>
        <label>Nome interno<input value={name} onChange={e => setName(e.target.value)} maxLength={120} required placeholder="Ex.: Meta · campanha de novembro" /></label>
        <label>Origem<select value={fields.source} onChange={e => setFields({ ...fields, source: e.target.value })}>{['facebook', 'google', 'instagram', 'whatsapp', 'qr', 'referral', 'email'].map(value => <option key={value}>{value}</option>)}</select></label>
        {([['medium', 'Meio', true], ['campaign', 'Campanha', true], ['term', 'Conjunto / palavra-chave', false], ['content', 'Criativo / anúncio', false], ['offer', 'Oferta', false], ['placement', 'Posição', false], ['partner', 'Parceiro', false]] as const).map(([key, label, required]) => <label key={key}>{label}<input value={fields[key]} maxLength={300} required={required} onChange={e => setFields({ ...fields, [key]: e.target.value })} /></label>)}
        <div className="board-link-output"><span>Link {savedId ? 'salvo' : 'em preparação'}</span><textarea aria-label="Link parametrizado" readOnly value={url} rows={4} /><div className="board-inline"><button type="submit" className="admin-primary-button" disabled={busy || loading || !!error || !!savedId}><Plus size={16} />{busy ? 'Salvando…' : 'Salvar link para a equipe'}</button><button className="admin-secondary-button" type="button" onClick={() => copy(url)}><Copy size={16} />Copiar</button></div></div>
      </form>
      <p className="board-note">Links salvos não mudam seus parâmetros. Para mudar uma campanha, gere outro link. Arquivar mantém o histórico e o link antigo funcionando. Os parâmetros são declarados pelo link, sem assinatura de autenticidade; não comprovam qualidade do lead.</p>
      <p role="status" className="board-feedback">{message}</p>
    </section>
    <section className="board-panel">
      <div className="board-section-title"><h2>Links da equipe</h2><label className="board-check"><input type="checkbox" checked={showArchived} onChange={e => setShowArchived(e.target.checked)} />Mostrar arquivados</label></div>
      {error && <p role="alert" className="board-error">{error}</p>}
      {loading ? <p>Carregando links…</p> : <div className="admin-table-scroll"><table><thead><tr><th>Link / canal</th><th>Campanha</th><th>Leads</th><th>Qualificados / fechados</th><th>Ações</th></tr></thead><tbody>{links.filter(link => showArchived || !link.archived).map(link => {
        const matched = leads.filter(lead => lead.link_id === link.id)
        return <tr key={link.id}><td><strong>{link.name}</strong><div>{channelLabels[channelOf({ utm_source: link.fields.source, utm_medium: link.fields.medium })]}{link.archived ? ' · Arquivado' : ''}</div></td><td>{link.fields.campaign}</td><td>{matched.length}</td><td>{matched.filter(lead => ['qualified', 'closed'].includes(lead.status)).length}</td><td><div className="board-inline"><button className="admin-secondary-button" type="button" onClick={() => copy(buildTrackedLink(link.fields, link.id))}>Copiar</button><button className="board-text-button" type="button" disabled={busy} onClick={() => archive(link)}>{link.archived ? 'Restaurar' : 'Arquivar'}</button></div></td></tr>
      })}</tbody></table>{!links.filter(link => showArchived || !link.archived).length && <p className="board-empty">Nenhum link salvo neste filtro.</p>}</div>}
      <p className="board-note">Contagens de todo o histórico carregado, ligadas ao identificador do link. Links gerados sem salvar continuam capturando UTMs, mas não entram nesta contagem individual.</p>
    </section>
  </div>
}
