import { useEffect, useState } from "react";

const STORAGE_KEY = "ssr-knit-samples";

function getSamples() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function Samples({ onOrder }) {
  const [samples, setSamples] = useState(getSamples);

  useEffect(() => {
    const sync = () => setSamples(getSamples());

    window.addEventListener("storage", sync);
    window.addEventListener("ssr-samples-updated", sync);

    return () => {
      window.removeEventListener("storage", sync);
      window.removeEventListener("ssr-samples-updated", sync);
    };
  }, []);

  return (
    <section id="samples" className="samples-section">
      <div className="section-heading">
        <p className="eyebrow">SAMPLE DESIGNS</p>

        <h2>Explore our fabric samples.</h2>

        <p>
          Browse sample designs from SSR Knit Fabrics. New samples uploaded by
          SSR officials will appear here for parties to review.
        </p>
      </div>

      <div className="sample-grid">
        {samples.length === 0 ? (
          <div className="samples-empty">
            <div className="samples-empty-icon">SSR</div>

            <h3>No samples available</h3>

            <p>
              New fabric samples uploaded by SSR officials will appear here.
            </p>
          </div>
        ) : (
          samples.map((sample) => (
            <article className="sample-card" key={sample.id}>
              <div className="sample-image">
                {sample.image ? (
                  <img src={sample.image} alt={sample.name} />
                ) : (
                  <div className="sample-placeholder">
                    <span>SSR</span>
                    <small>Sample image</small>
                  </div>
                )}

                <span className="sample-tag">
                  {sample.fabricType}
                </span>
              </div>

              <div className="sample-content">
                <p>{sample.machine}</p>

                <h3>{sample.name}</h3>

                <div className="sample-specs">
                  <span>
                    Gauge <b>{sample.gauge}</b>
                  </span>

                  <span>
                    Diameter <b>{sample.diameter}</b>
                  </span>
                </div>

                <p className="sample-description">
                  {sample.description}
                </p>

                <button
                  className="btn btn-primary"
                  onClick={onOrder}
                >
                  Enquire About This Sample →
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default Samples;