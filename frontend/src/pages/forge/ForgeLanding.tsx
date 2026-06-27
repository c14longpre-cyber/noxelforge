import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const NICHES = ['SEO', 'Marketing', 'IA', 'E-commerce', 'Dev Web', 'Business', 'Design'];
const TIER_COLORS: Record<string, string> = { bronze: '#CD7F32', silver: '#A8A9AD', gold: '#FFD700', platinum: '#E5E4E2', diamond: '#B9F2FF' };

export default function ForgeLanding() {
  const [annuaire, setAnnuaire] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [nicheFilter, setNicheFilter] = useState('');
  const [page, setPage] = useState(1);

  useEffect(() => { fetchAnnuaire(); }, [nicheFilter, page]);

  async function fetchAnnuaire() {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page) });
      if (nicheFilter) params.append('niche', nicheFilter);
      const res = await fetch(`${API_BASE}/api/forge/submissions/annuaire?${params}`);
      const data = await res.json();
      setAnnuaire(data.annuaire ?? []);
    } catch { setAnnuaire([]); }
    finally { setLoading(false); }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0f', color: '#f0f0f0', fontFamily: 'Inter, sans-serif' }}>

      <section style={{ padding: '80px 24px 60px', textAlign: 'center', background: 'linear-gradient(180deg,#0f0a1f 0%,#0a0a0f 100%)', borderBottom: '1px solid #1a1a2e' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#1a1a2e', border: '1px solid #2d2d5e', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
          <span style={{ fontSize: 14, color: '#7c6af7' }}>⚒️ NOXEL Forge™</span>
        </div>
        <h1 style={{ fontSize: 'clamp(2.2rem,6vw,4rem)', fontWeight: 800, margin: '0 0 20px', lineHeight: 1.1, letterSpacing: '-0.03em' }}>
          Forge ton{' '}
          <span style={{ background: 'linear-gradient(135deg,#7c6af7,#a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>autorité</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#888', maxWidth: 520, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Échange des backlinks avec des sites vérifiés. Chaque lien est filtré par Alfred — qualité garantie, spam impossible.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/forge/submit" style={{ background: 'linear-gradient(135deg,#7c6af7,#6d28d9)', color: '#fff', padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontWeight: 700, fontSize: '1rem' }}>⚒️ Soumettre mon site</Link>
          <Link to="/forge/dashboard" style={{ background: 'transparent', color: '#a78bfa', padding: '14px 28px', borderRadius: 10, textDecoration: 'none', fontWeight: 600, fontSize: '1rem', border: '1px solid #2d2d5e' }}>Mon Dashboard →</Link>
        </div>
        <div style={{ display: 'flex', gap: 40, justifyContent: 'center', marginTop: 56, flexWrap: 'wrap' }}>
          {[['⚒️','Forge Points','Gagne des points à chaque échange'],['🛡️','Alfred filtre','Zéro spam, zéro contenu générique'],['🔗','Donnant-donnant','Tu donnes un backlink, tu en reçois un']].map(([icon,title,desc]) => (
            <div key={String(title)} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
              <div style={{ fontWeight: 700, color: '#f0f0f0', fontSize: '0.95rem' }}>{title}</div>
              <div style={{ fontSize: '0.82rem', color: '#666', marginTop: 4, maxWidth: 160 }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '60px 24px', maxWidth: 900, margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', fontSize: '1.5rem', fontWeight: 700, marginBottom: 8 }}>Trust Score Forge™</h2>
        <p style={{ textAlign: 'center', color: '#666', marginBottom: 36, fontSize: '0.9rem' }}>Chaque site reçoit un score /100 basé sur 6 signaux de qualité</p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(160px,1fr))', gap: 12 }}>
          {[{tier:'bronze',label:'🥉 Bronze',range:'0–40',desc:'Accès lecture'},{tier:'silver',label:'🥈 Silver',range:'41–65',desc:'Soumission active'},{tier:'gold',label:'🥇 Gold',range:'66–85',desc:'Partenaire vérifié'},{tier:'platinum',label:'⬡ Platinum',range:'86–94',desc:'Autorité confirmée'},{tier:'diamond',label:'💎 Diamond',range:'95–100',desc:'Élite Forge'}].map(({tier,label,range,desc}) => (
            <div key={tier} style={{ background: '#111', border: `1px solid ${TIER_COLORS[tier]}33`, borderRadius: 10, padding: '16px 12px', textAlign: 'center' }}>
              <div style={{ color: TIER_COLORS[tier], fontWeight: 800, fontSize: '0.95rem', marginBottom: 4 }}>{label}</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700, color: '#f0f0f0', marginBottom: 4 }}>{range}</div>
              <div style={{ fontSize: '0.78rem', color: '#666' }}>{desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: '0 24px 80px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 700, margin: 0 }}>Annuaire Forge</h2>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <button onClick={() => { setNicheFilter(''); setPage(1); }} style={{ background: !nicheFilter ? '#7c6af7' : '#1a1a2e', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: '0.82rem' }}>Tous</button>
            {NICHES.map(n => <button key={n} onClick={() => { setNicheFilter(n); setPage(1); }} style={{ background: nicheFilter === n ? '#7c6af7' : '#1a1a2e', color: '#fff', border: 'none', borderRadius: 8, padding: '6px 14px', cursor: 'pointer', fontSize: '0.82rem' }}>{n}</button>)}
          </div>
        </div>
        {loading ? (
          <div style={{ textAlign: 'center', color: '#666', padding: 60 }}>⚒️ Chargement de l'annuaire...</div>
        ) : annuaire.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#666', padding: 60, border: '1px dashed #1a1a2e', borderRadius: 12 }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>⚒️</div>
            <div style={{ fontWeight: 600, marginBottom: 8 }}>L'annuaire est vide pour l'instant</div>
            <div style={{ fontSize: '0.85rem', marginBottom: 20 }}>Sois le premier à soumettre ton site.</div>
            <Link to="/forge/submit" style={{ background: '#7c6af7', color: '#fff', padding: '10px 20px', borderRadius: 8, textDecoration: 'none', fontWeight: 600 }}>Soumettre mon site</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 12 }}>
            {annuaire.map((item:any) => (
              <div key={item.id} style={{ background: '#111', border: '1px solid #1a1a2e', borderRadius: 12, padding: '20px 24px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  {item.niche && <span style={{ background: '#1a1a2e', color: '#7c6af7', fontSize: '0.75rem', padding: '3px 10px', borderRadius: 20, fontWeight: 600 }}>{item.niche}</span>}
                  <h3 style={{ margin: '8px 0 4px', fontSize: '1rem', fontWeight: 700 }}>{item.titre}</h3>
                  <p style={{ margin: '0 0 8px', color: '#888', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.description}</p>
                  <a href={item.url_soumise} target="_blank" rel="noopener noreferrer" style={{ color: '#7c6af7', fontSize: '0.82rem', textDecoration: 'none' }}>{item.url_soumise} ↗</a>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#555' }}>{new Date(item.created_at).toLocaleDateString('fr-CA')}</div>
              </div>
            ))}
          </div>
        )}
        {annuaire.length > 0 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32 }}>
            <button onClick={() => setPage(p => Math.max(1,p-1))} disabled={page===1} style={{ background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', cursor: page===1?'not-allowed':'pointer', opacity: page===1?0.4:1 }}>← Précédent</button>
            <span style={{ padding: '8px 16px', color: '#666', fontSize: '0.85rem' }}>Page {page}</span>
            <button onClick={() => setPage(p => p+1)} disabled={annuaire.length<20} style={{ background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', cursor: annuaire.length<20?'not-allowed':'pointer', opacity: annuaire.length<20?0.4:1 }}>Suivant →</button>
          </div>
        )}
      </section>

      <section style={{ padding: '60px 24px', background: 'linear-gradient(135deg,#0f0a1f,#1a0a2e)', textAlign: 'center', borderTop: '1px solid #1a1a2e' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: 12 }}>Prêt à forger ton autorité?</h2>
        <p style={{ color: '#888', marginBottom: 28 }}>Rejoins NOXEL Forge et commence à bâtir ton réseau de backlinks vérifiés.</p>
        <Link to="/forge/submit" style={{ background: 'linear-gradient(135deg,#7c6af7,#6d28d9)', color: '#fff', padding: '16px 36px', borderRadius: 12, textDecoration: 'none', fontWeight: 700, fontSize: '1.05rem' }}>⚒️ Rejoindre NOXEL Forge</Link>
      </section>
    </div>
  );
}
