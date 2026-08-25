'use client';

interface StatsSectionProps {
  stat1Value?: string | null;
  stat1Label?: string | null;
  stat2Value?: string | null;
  stat2Label?: string | null;
  stat3Value?: string | null;
  stat3Label?: string | null;
}

export default function StatsSection({
  stat1Value,
  stat1Label,
  stat2Value,
  stat2Label,
  stat3Value,
  stat3Label,
}: StatsSectionProps) {
  const stats = [
    {
      value: stat1Value || '50MW+',
      label: stat1Label || 'Energía Generada',
    },
    {
      value: stat2Value || '10k+',
      label: stat2Label || 'Clientes Satisfechos',
    },
    {
      value: stat3Value || '15',
      label: stat3Label || 'Años de Experiencia',
    },
  ];

  return (
    <section id="stats" className="stats-section">
      <div className="container-max">
        <div className="glass-panel stats-card soft-shadow">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
