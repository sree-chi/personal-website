/**
 * Fixed right-side panel that slides in when hovering an Experience or Research card.
 * Positioned in the vertical center of the viewport.
 */
const CardDetailPanel = ({ card }) => {
  const visible = !!card && card.bullets?.length > 0;

  return (
    <div
      style={{
        position: 'fixed',
        right: '2rem',
        top: '50%',
        transform: visible ? 'translateY(-50%) translateX(0)' : 'translateY(-50%) translateX(24px)',
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.22s ease, transform 0.22s ease',
        pointerEvents: 'none',
        zIndex: 80,
        width: 280,
        background: '#111128',
        border: '1px solid #3d3d6a',
        borderRadius: '1rem',
        boxShadow: '0 24px 64px rgba(124,58,237,0.18), 0 0 0 1px #2a2a4a',
        padding: '1.25rem 1.5rem',
      }}
    >
      {card && (
        <>
          {/* Header */}
          <div style={{ marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b6890', marginBottom: '0.25rem' }}>
              Highlights
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f0ede8', lineHeight: 1.3 }}>
              {card.title}
            </div>
            {card.subtitle && (
              <div style={{ fontSize: '0.8rem', color: '#fbbf24', marginTop: '0.15rem' }}>
                {card.subtitle}
              </div>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: '#2a2a4a', marginBottom: '0.75rem' }} />

          {/* Bullet points */}
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {card.bullets.map((b, i) => (
              <li key={i} style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#fbbf24', marginTop: '0.2rem', flexShrink: 0, fontSize: '0.6rem' }}>◆</span>
                <span style={{ color: '#a8a4c0', fontSize: '0.82rem', lineHeight: 1.5 }}>{b}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CardDetailPanel;
