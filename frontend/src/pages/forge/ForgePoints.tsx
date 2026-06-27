import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const REWARDS = [
  { pts:100, label:'Extra NOXEL SEO scan', icon:'🔍' },
  { pts:200, label:'Premium PDF report', icon:'📄' },
  { pts:300, label:'Exclusive Forge Badge', icon:'🏆' },
  { pts:500, label:'Diamond partner access', icon:'💎' },
];

const EARN_RULES = [
  { action:'Submission approved', pts:50, icon:'✅' },
  { action:'Backlink received (confirmed)', pts:100, icon:'🔗' },
  { action:'Backlink given', pts:75, icon:'🤝' },
  { action:'NOXEL badge verified', pts:25, icon:'🛡️' },
  { action:'NOXEL SEO scan completed', pts:10, icon:'🔍' },
];

export default function ForgePoints() {
  const [points, setPoints] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPoints(); }, []);

  async function fetchPoints() {
    setLoading(true);
    try {
      const token = localStorage.getItem('supabase_token') || '';
      const res = await fetch(`${API_BASE}/api/forge/members/status`, { headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) { const data = await res.json(); setPoints(data.points); }
    } catch {}
    finally { setLoading(false); }
  }

  const historique: any[] = points?.historique ?? [];

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', overflowY: 'auto' }}>
      <nav style={{ borderBottom: '1px solid var(--border)', padding: '0 32px', height: 56, display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'var(--bg2)', position: 'sticky', top: 0, zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link to="/forge/dashboard" style={{ color: 'var(--muted)', fontSize: 13 }}>← Dashboard</Link>
          <span style={{ color: 'var(--soft)' }}>·</span>
          <span style={{ fontWeight: 900, fontSize: 15 }}>Forge Points</span>
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '32px 32px 80px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--muted)', padding: 60, fontSize: 14 }}>Loading...</div>
        ) : (
          <>
            <div className="nx-card" style={{ textAlign: 'center', padding: '48px 32px', marginBottom: 24, borderColor: 'var(--g-border)', background: 'var(--g-dim)' }}>
              <div className="nx-kicker" style={{ marginBottom: 12 }}>Available balance</div>
              <div style={{ fontSize: 72, fontWeight: 900, color: 'var(--g)', lineHeight: 1, marginBottom: 8 }}>{points?.solde ?? 0}</div>
              <div style={{ fontSize: 16, color: 'var(--muted)', marginBottom: 28 }}>Forge Points</div>
              <div style={{ display: 'flex', gap: 48, justifyContent: 'center', flexWrap: 'wrap' }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--ok)' }}>{points?.total_gagne ?? 0}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>Total earned</div>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 24, fontWeight: 900, color: 'var(--danger)' }}>{points?.total_depense ?? 0}</div>
                  <div style={{ fontSize: 11, color: 'var(--muted)' }}>Total spent</div>
                </div>
              </div>
            </div>

            <div className="nx-grid nx-grid--2" style={{ marginBottom: 24 }}>
              <div className="nx-card">
                <div className="nx-kicker" style={{ marginBottom: 14 }}>How to earn points</div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {EARN_RULES.map(({ action, pts, icon }) => (
                    <div key={action} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 16 }}>{icon}</span>
                        <span style={{ fontSize: 13, color: 'var(--text)' }}>{action}</span>
                      </div>
                      <span style={{ color: 'var(--ok)', fontWeight: 800, fontSize: 13 }}>+{pts} pts</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="nx-card">
                <div className="nx-kicker" style={{ marginBottom: 14 }}>🎁 Spend your points</div>
                <div style={{ display: 'grid', gap: 8 }}>
                  {REWARDS.map(({ pts, label, icon }) => (
                    <div key={label} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: 16 }}>{icon}</span>
                        <span style={{ fontSize: 13, color: 'var(--text)' }}>{label}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ color: 'var(--g)', fontWeight: 800, fontSize: 13 }}>{pts} pts</span>
                        <button disabled={(points?.solde??0)<pts} style={{ background: (points?.solde??0)>=pts ? 'var(--g)' : 'var(--surface2)', color: (points?.solde??0)>=pts ? '#07090f' : 'var(--soft)', border: 'none', borderRadius: 6, padding: '4px 10px', cursor: (points?.solde??0)>=pts ? 'pointer' : 'not-allowed', fontSize: 11, fontWeight: 800, opacity: (points?.solde??0)>=pts ? 1 : 0.5 }}>
                          Use
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 10, fontSize: 11, color: 'var(--soft)', textAlign: 'center' }}>More rewards coming — Phase 2</div>
              </div>
            </div>

            <div className="nx-card">
              <div className="nx-kicker" style={{ marginBottom: 14 }}>Transaction history</div>
              {historique.length === 0 ? (
                <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '28px 0', fontSize: 13 }}>
                  No transactions yet. <Link to="/forge/submit" style={{ color: 'var(--g)' }}>Submit your first site →</Link>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 6 }}>
                  {[...historique].reverse().map((t: any, i: number) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '9px 12px', background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }}>
                      <div>
                        <div style={{ fontSize: 13, color: 'var(--text)' }}>{t.description}</div>
                        <div style={{ fontSize: 11, color: 'var(--soft)', marginTop: 2 }}>{new Date(t.date).toLocaleDateString('en-CA')}</div>
                      </div>
                      <span style={{ color: t.type==='earn' ? 'var(--ok)' : 'var(--danger)', fontWeight: 800, fontSize: 13 }}>
                        {t.type==='earn' ? '+' : '-'}{t.points} pts
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

