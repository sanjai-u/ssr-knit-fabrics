import React from "react";

export default function About() {
  return (
    <>
      <section id="about" className="section about-section">
        <div className="section-heading">
          <span className="eyebrow">ABOUT SSR KNIT FABRICS</span>
          <h2>The Name of Quality</h2>
        </div>

        <div className="about-grid">
          <div className="about-logo-card">
            <div className="ssr-logo-mark">SSR</div>
            <div className="ssr-logo-subtitle">KNIT FABRICS</div>
            <p>The Name of Quality</p>
          </div>

          <div className="about-copy">
            <p>
              SSR Knit Fabrics is a knitting manufacturing company focused on
              consistent fabric quality, dependable production and responsive
              service for textile and garment businesses.
            </p>
            <p>
              Our capability is supported by Terrot knitting machinery,
              covering Double Jersey, Computer Jacquard and Manual Jacquard
              production. Machine availability and production capacity are
              planned according to the design and ongoing production programs.
            </p>
            <div className="about-highlights">
              <div><strong>28"–40"</strong><span>Diameter</span></div>
              <div><strong>18</strong><span>Gauge</span></div>
              <div><strong>66 / 72 / 84</strong><span>Feeders</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="founder" className="section founder-section">
        <div className="section-heading">
          <h2>Meet the Founder</h2>
        </div>

        <div className="founder-card">
          <div className="founder-photo-wrap">
            <img
              src="/owner-udhayakumar.png"
              alt="Udhayakumar D, Founder of SSR Knit Fabrics"
              className="founder-photo"
            />
          </div>

          <div className="founder-content">
            <h3>Udhayakumar D</h3>
            <p>
              Udhayakumar D leads SSR Knit Fabrics with a focus on quality
              driven textile manufacturing, dependable production and
              long-term relationships with customers and business partners.
            </p>

            <div className="founder-details">
              <a href="tel:+919944977968">+91 99449 77968</a>
              <a href="mailto:udhayakmr68@gmail.com">udhayakmr68@gmail.com</a>
              <span>No 4/17 KGF Compound, Kavundampalayam,<br />Veerapandi – 641605</span>
            </div>

            <div className="founder-actions">
              <a className="btn btn-primary" href="tel:+919944977968">Call Founder</a>
              <a className="btn btn-secondary" href="mailto:udhayakmr68@gmail.com">Email Founder</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
