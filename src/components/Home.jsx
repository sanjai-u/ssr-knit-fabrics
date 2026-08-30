function Home({ onNavigate, onOrder }) {
  return (
    <section id="home" className="hero">
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="eyebrow hero-eyebrow">SSR KNIT FABRICS</p>
        <h1>The Name of <span>Quality.</span></h1>
        <p className="hero-text">Quality knitted fabrics produced with Terrot machinery, design flexibility and a production-focused approach for every party requirement.</p>
        <div className="hero-actions">
          <button className="btn btn-primary btn-large" onClick={() => onNavigate("machines")}>Explore Machines →</button>
          <button className="btn btn-light btn-large" onClick={onOrder}>Place an Order →</button>
        </div>
        <div className="hero-facts"><span><b>28", 40"</b> Diameter</span><span><b>18</b> Gauge</span><span><b>66, 72, 84</b> Feeders</span></div>
      </div>
      <div className="hero-machine-label"><span>01</span> TERROT DOUBLE JERSEY</div>
    </section>
  );
}
export default Home;
