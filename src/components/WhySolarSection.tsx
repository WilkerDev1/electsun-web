'use client';

export default function WhySolarSection() {
  const benefits = [
    {
      title: 'Ahorro de Costos',
      desc: 'La energía solar reduce significativamente las facturas eléctricas, ofreciendo ahorros a largo plazo en costos de servicios públicos.',
    },
    {
      title: 'Beneficios Ambientales',
      desc: 'Fuente de energía limpia y renovable que reduce la huella de carbono y ayuda a combatir el cambio climático.',
    },
    {
      title: 'Independencia Energética',
      desc: 'Los paneles solares brindan a los propietarios un mayor control sobre su uso de energía, reduciendo la dependencia de fuentes tradicionales.',
    },
    {
      title: 'Incremento de Valor',
      desc: 'Las casas con paneles solares suelen venderse a un precio superior y son más atractivas para los compradores conscientes del medio ambiente.',
    },
    {
      title: 'Incentivos Fiscales',
      desc: 'Muchos gobiernos ofrecen incentivos, reembolsos y bonificaciones fiscales para la instalación de paneles solares, haciéndolos más asequibles.',
    },
    {
      title: 'Fiabilidad a Largo Plazo',
      desc: 'Los paneles solares tienen requisitos de mantenimiento mínimos y a menudo vienen con garantías de hasta 25 años.',
    },
  ];

  return (
    <section id="why-solar" className="why-solar-section">
      <div className="container-max">
        {/* Asymmetric Header */}
        <div className="why-solar-header">
          <div>
            <h2 className="font-headline-lg why-solar-title">
              ¿Por qué elegir<br />Paneles Solares?
            </h2>
          </div>
          <div>
            <p className="font-body-md why-solar-desc">
              Existen múltiples beneficios significativos al instalar paneles solares residenciales o comerciales en sus instalaciones. Con un mantenimiento mínimo y confiabilidad a largo plazo, la energía solar es una excelente opción para quienes buscan rentabilidad financiera y compromiso ecológico.
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
