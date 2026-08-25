'use client';

export default function TrustSection() {
  const brands = [
    'g.print',
    'AOL MUSIC',
    'TRU-TEST',
    'PSEG',
    'Western Digital',
    'Master-G',
  ];

  return (
    <section className="trust-section">
      <div className="container-max">
        <div className="trust-title">
          <span>Empresas que confían en nosotros</span>
        </div>

        <div className="trust-logos">
          {brands.map((brand, idx) => (
            <div key={idx} className="trust-logo-item">
              <span>{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
