'use client';

export default function WhySolarSection() {
  const benefits = [
    {
      title: 'Incentivos Fiscales (Ley 57-07 RD)',
      desc: 'Aproveche los beneficios de la Ley 57-07 de Incentivo a las Energías Renovables en República Dominicana: deducción de hasta un 40% del ISR y exención total (0%) de ITBIS y aranceles de importación.',
    },
    {
      title: 'Ahorro Inmediato & Medición Neta',
      desc: 'Inyecte sus excedentes de energía a la red de las distribuidoras (Edeeste, Edenorte, Edesur) mediante el programa oficial de Medición Neta, reduciendo hasta un 90% de su factura mensual.',
    },
    {
      title: 'Ingeniería & Garantía Electsun',
      desc: 'Desarrollamos soluciones llave en mano con equipos Tier 1 certificados, monitoreo digital 24/7 y garantía de rendimiento lineal respaldada por hasta 25 años.',
    },
    {
      title: 'Independencia & Respaldo Energético',
      desc: 'Blindaje total contra fluctuaciones y alzas de la tarifa eléctrica convencional, con la opción de integrar sistemas híbridos de acumulación en baterías de litio.',
    },
    {
      title: 'Retorno Rápido & Plusvalía',
      desc: 'Recuperación de inversión estimada entre 2 y 4 años gracias a la alta radiación solar de República Dominicana, incrementando inmediatamente el valor patrimonial de su inmueble.',
    },
    {
      title: 'Sostenibilidad & Cero Emisiones',
      desc: 'Energía 100% limpia que disminuye significativamente la huella de carbono de su hogar o empresa, impulsando la transición ecológica nacional.',
    },
  ];

  return (
    <section id="why-solar" className="why-solar-section">
      <div className="container-max">
        {/* Asymmetric Header */}
        <div className="why-solar-header">
          <div>
            <span className="hero-eyebrow" style={{ color: 'var(--energy-gold)', marginBottom: '8px', display: 'inline-block' }}>
              EXPERIENCIA Y CONFIANZA
            </span>
            <h2 className="font-headline-lg why-solar-title">
              ¿Por qué elegir<br />Electsun?
            </h2>
          </div>
          <div>
            <p className="font-body-md why-solar-desc">
              En <strong>Electsun</strong> transformamos el abundante sol de la República Dominicana en rentabilidad, seguridad e independencia energética para su hogar o negocio. Diseñamos e instalamos infraestructura fotovoltaica de alto rendimiento bajo estrictos estándares de ingeniería, gestionando todo el proceso de permisos, medición neta y exenciones fiscales para que disfrute de una experiencia sin complicaciones.
            </p>
          </div>
        </div>

        {/* 6 Benefits Grid */}
        <div className="benefits-grid">
          {benefits.map((item, idx) => (
            <div key={idx} className="benefit-card">
              <h3 className="benefit-title">{item.title}</h3>
              <p className="benefit-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
