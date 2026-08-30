import { useMemo, useState } from "react";

const statusOptions = ["Pending", "Accepted", "In Production", "Completed", "Rejected"];

function AdminDashboard({ orders, onUpdateOrder, onLogout }) {
  const [selectedId, setSelectedId] = useState(orders[0]?.id || null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter((order) =>
      [order.id, order.company, order.contact, order.fabric, order.machine, order.status]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [orders, search]);

  const selected = orders.find((order) => order.id === selectedId) || filteredOrders[0];

  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__ssrToastTimer);
    window.__ssrToastTimer = window.setTimeout(() => setToast(""), 2600);
  };

  const update = (patch, message) => {
    if (!selected) return;
    onUpdateOrder(selected.id, patch);
    if (message) notify(message);
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "Pending").length,
    active: orders.filter((o) => ["Accepted", "In Production"].includes(o.status)).length,
    completed: orders.filter((o) => o.status === "Completed").length,
  };

  return (
    <div className="admin-shell">
      <header className="admin-topbar">
        <div className="admin-brand">
          <span className="brand-mark">SSR</span>
          <div><strong>SSR Knit Fabrics</strong><small>ADMIN CONTROL CENTER</small></div>
        </div>
        <div className="admin-user"><span>Official Account</span><button onClick={onLogout}>Sign out</button></div>
      </header>

      <main className="admin-main">
        <div className="admin-heading">
          <div><p className="eyebrow">OFFICIAL DASHBOARD</p><h1>Order Management</h1><p>Review party requests, accept orders and update production progress.</p></div>
          <button className="admin-back" onClick={onLogout}>← Back to website</button>
        </div>

        <section className="admin-stat-grid">
          <div><span>Total Orders</span><strong>{stats.total}</strong><small>All party requests</small></div>
          <div className="stat-warning"><span>Pending Review</span><strong>{stats.pending}</strong><small>Need official action</small></div>
          <div className="stat-blue"><span>Active Production</span><strong>{stats.active}</strong><small>Accepted / running</small></div>
          <div className="stat-success"><span>Completed</span><strong>{stats.completed}</strong><small>Ready / finished</small></div>
        </section>

        <section className="admin-workspace">
          <div className="admin-orders-panel">
            <div className="panel-header"><div><h2>Incoming Orders</h2><p>Latest requests from parties</p></div><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search orders..." /></div>
            <div className="order-list">
              {filteredOrders.length === 0 ? <div className="empty-state">No orders found.</div> : filteredOrders.map((order) => (
                <button key={order.id} className={`order-list-item ${selected?.id === order.id ? "selected" : ""}`} onClick={() => setSelectedId(order.id)}>
                  <div><strong>{order.id}</strong><span>{order.company}</span></div>
                  <div className="order-list-right"><b>{order.quantity.toLocaleString()} Kg</b><em className={`status-pill ${order.status.toLowerCase().replaceAll(" ", "-")}`}>{order.status}</em></div>
                </button>
              ))}
            </div>
          </div>

          <div className="admin-detail-panel">
            {selected ? <>
              <div className="detail-header"><div><p className="eyebrow">ORDER REQUEST</p><h2>{selected.id}</h2><p>Received {selected.createdAt}</p></div><em className={`status-pill ${selected.status.toLowerCase().replaceAll(" ", "-")}`}>{selected.status}</em></div>

              <div className="party-box"><div><span>Party / Company</span><strong>{selected.company}</strong></div><div><span>Contact Person</span><strong>{selected.contact}</strong></div><div><span>Phone</span><strong>{selected.phone}</strong></div><div><span>Email</span><strong>{selected.email}</strong></div></div>

              <div className="order-info-grid">
                <div><span>Fabric requirement</span><strong>{selected.fabric}</strong></div>
                <div><span>Preferred machine</span><strong>{selected.machine || "No preference"}</strong></div>
                <div><span>Requested quantity</span><strong>{selected.quantity.toLocaleString()} Kg</strong></div>
                <div><span>Required date</span><strong>{selected.requiredDate || "Not specified"}</strong></div>
              </div>

              <div className="requirements-box"><span>Party requirements</span><p>{selected.notes || "No additional requirements provided."}</p></div>

              <div className="admin-controls">
                <div className="control-section"><div className="control-title"><strong>Order decision</strong><small>Accept or reject this request</small></div><div className="control-buttons"><button className="accept-btn" disabled={selected.status !== "Pending"} onClick={() => update({ status: "Accepted", acceptedAt: new Date().toLocaleString() }, "Order accepted")}>✓ Accept Order</button><button className="reject-btn" disabled={selected.status !== "Pending"} onClick={() => update({ status: "Rejected" }, "Order rejected")}>✕ Reject</button></div></div>

                <div className="control-section"><div className="control-title"><strong>Production update</strong><small>Party will see these values in Track Order</small></div><div className="production-editor"><label>Status<select value={selected.status} onChange={(e) => update({ status: e.target.value }, `Status changed to ${e.target.value}`)}>{statusOptions.map((status) => <option key={status}>{status}</option>)}</select></label><label>Completed (Kg)<input type="number" min="0" max={selected.quantity} value={selected.completedQuantity} onChange={(e) => update({ completedQuantity: Math.min(selected.quantity, Math.max(0, Number(e.target.value) || 0)) })} /></label><label>Expected completion<input type="date" value={selected.expectedDate || ""} onChange={(e) => update({ expectedDate: e.target.value })} /></label></div><button className="save-progress" onClick={() => notify("Production information saved")}>Save production update</button></div>
              </div>
            </> : <div className="empty-state large">Select an order to manage it.</div>}
          </div>
        </section>

        <SampleManager />
      </main>
      {toast && <div className="admin-toast">✓ {toast}</div>}
    </div>
  );
}


function SampleManager() {
  const [samples, setSamples] = useState(() => {
    try {
      const stored = localStorage.getItem("ssr-knit-samples");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [form, setForm] = useState({
    name: "",
    fabricType: "Double Jersey",
    machine: "Terrot Double Jersey",
    gauge: "18",
    diameter: '30", 34"',
    description: "",
    image: "",
  });
  const [message, setMessage] = useState("");

  const persist = (next) => {
    setSamples(next);
    localStorage.setItem("ssr-knit-samples", JSON.stringify(next));
    window.dispatchEvent(new Event("ssr-samples-updated"));
  };

  const resizeImage = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 1000;
          const scale = Math.min(1, max / Math.max(img.width, img.height));
          const canvas = document.createElement("canvas");
          canvas.width = Math.max(1, Math.round(img.width * scale));
          canvas.height = Math.max(1, Math.round(img.height * scale));
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          resolve(canvas.toDataURL("image/jpeg", 0.82));
        };
        img.onerror = reject;
        img.src = reader.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImage = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMessage("Please choose an image file.");
      return;
    }
    try {
      const image = await resizeImage(file);
      setForm((current) => ({ ...current, image }));
      setMessage("Image selected.");
    } catch {
      setMessage("Could not read that image.");
    }
  };

  const addSample = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.image) {
      setMessage("Add a sample name and image before saving.");
      return;
    }
    const next = [
      {
        ...form,
        id: `sample-${Date.now()}`,
        name: form.name.trim(),
        description: form.description.trim() || "SSR Knit Fabrics sample design.",
      },
      ...samples,
    ];
    persist(next);
    setForm({
      name: "",
      fabricType: "Double Jersey",
      machine: "Terrot Double Jersey",
      gauge: "18",
      diameter: '30", 34"',
      description: "",
      image: "",
    });
    setMessage("Sample added to the website.");
  };

  const removeSample = (id) => {
    persist(samples.filter((sample) => sample.id !== id));
    setMessage("Sample removed.");
  };

  return (
    <section className="sample-admin-panel">
      <div className="sample-admin-heading">
        <div>
          <p className="eyebrow">SAMPLE CATALOGUE</p>
          <h2>Upload sample designs</h2>
          <p>Add fabric/sample photographs and details. They will appear in the party website's Samples section.</p>
        </div>
      </div>

      <form className="sample-upload-card" onSubmit={addSample}>
        <div className="sample-upload-preview">
          {form.image ? (
            <img src={form.image} alt="Selected sample preview" />
          ) : (
            <label htmlFor="sample-image" className="upload-placeholder">
              <span>＋</span>
              <strong>Upload sample image</strong>
              <small>JPG, PNG or WEBP</small>
            </label>
          )}
          <input id="sample-image" type="file" accept="image/*" onChange={handleImage} />
          {form.image && <label htmlFor="sample-image" className="change-image">Change image</label>}
        </div>

        <div className="sample-upload-fields">
          <label>Sample name
            <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Floral Jacquard" />
          </label>
          <label>Fabric type
            <select value={form.fabricType} onChange={(e) => setForm({ ...form, fabricType: e.target.value })}>
              <option>Double Jersey</option>
              <option>Drop — Dial & Cylinder</option>
              <option>Computer Jacquard</option>
              <option>Manual Jacquard</option>
              <option>Other</option>
            </select>
          </label>
          <label>Machine
            <select value={form.machine} onChange={(e) => setForm({ ...form, machine: e.target.value })}>
              <option>Terrot Double Jersey</option>
              <option>Terrot Double Jersey Computer Jacquard</option>
              <option>Terrot Double Jersey Manual Jacquard</option>
            </select>
          </label>
          <label>Gauge
            <input value={form.gauge} onChange={(e) => setForm({ ...form, gauge: e.target.value })} />
          </label>
          <label>Diameter
            <input value={form.diameter} onChange={(e) => setForm({ ...form, diameter: e.target.value })} />
          </label>
          <label className="sample-description-field">Description
            <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Short description of this sample" />
          </label>
          <div className="sample-upload-actions">
            <button className="btn btn-primary" type="submit">Add Sample to Website →</button>
            {message && <span>{message}</span>}
          </div>
        </div>
      </form>

      <div className="admin-sample-list">
        <div className="admin-sample-list-header">
          <strong>Uploaded samples</strong>
          <span>{samples.length} custom sample{samples.length === 1 ? "" : "s"}</span>
        </div>
        {samples.length === 0 ? (
          <div className="empty-state">No custom samples uploaded yet.</div>
        ) : (
          <div className="admin-sample-grid">
            {samples.map((sample) => (
              <div className="admin-sample-item" key={sample.id}>
                <img src={sample.image} alt={sample.name} />
                <div><strong>{sample.name}</strong><small>{sample.fabricType}</small></div>
                <button onClick={() => removeSample(sample.id)} aria-label={`Remove ${sample.name}`}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminDashboard;
