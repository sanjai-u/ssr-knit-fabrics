import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Samples from "./components/Samples";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";

const machines = [
  {
    id: 1,
    name: "Terrot Double Jersey",
    type: "Double Jersey",
    image: "/machines/terrot-double-jersey.png",
    description:
      "A Terrot double jersey machine for dependable production of structured knitted fabrics.",
  },
  {
    id: 2,
    name: "Terrot Double Jersey Computer Jacquard",
    type: "Computerized Jacquard",
    image: "/machines/terrot-computer-jacquard.png",
    description:
      "Computerized jacquard capability for detailed and varied knitted fabric designs.",
  },
  {
    id: 3,
    name: "Terrot Double Jersey Manual Jacquard",
    type: "Manual Jacquard",
    image: "/machines/terrot-manual-jacquard.png",
    description:
      "Manual jacquard production for flexible design execution across double jersey fabrics.",
  },
];


const STORAGE_KEY = "ssr-knit-orders";

const demoOrders = [
  { id: "SSR-2026-001", company: "Apex Textiles", contact: "Ravi Kumar", phone: "+91 90000 11111", email: "purchase@apextextiles.com", fabric: "Double Jersey", machine: "Terrot Double Jersey", quantity: 10000, completedQuantity: 0, requiredDate: "2026-09-15", expectedDate: "", notes: "18 gauge requirement. Please maintain consistent quality.", status: "Pending", createdAt: "29 Aug 2026, 10:15 AM" },
  { id: "SSR-2026-002", company: "Fashion Knitwears", contact: "Priya S", phone: "+91 90000 22222", email: "orders@fashionknitwears.com", fabric: "Jacquard Design", machine: "Terrot Double Jersey Computer Jacquard", quantity: 7500, completedQuantity: 4200, requiredDate: "2026-09-10", expectedDate: "2026-09-10", notes: "Computer jacquard design supplied by party.", status: "In Production", createdAt: "28 Aug 2026, 03:40 PM" },
  { id: "SSR-2026-003", company: "Southern Apparel", contact: "Arun M", phone: "+91 90000 33333", email: "buying@southernapparel.com", fabric: "Drop — Dial & Cylinder", machine: "Terrot Double Jersey", quantity: 5000, completedQuantity: 5000, requiredDate: "2026-08-30", expectedDate: "2026-08-30", notes: "Completed production sample order.", status: "Completed", createdAt: "25 Aug 2026, 11:20 AM" },
];

function getOrders() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : demoOrders;
  } catch {
    return demoOrders;
  }
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  window.dispatchEvent(new Event("ssr-orders-updated"));
}

function App() {
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [orders, setOrders] = useState(getOrders);
  const [view, setView] = useState(window.location.hash === "#admin" ? "admin" : "party");
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);
  const [adminLogin, setAdminLogin] = useState({ username: "", password: "" });
  const [loginError, setLoginError] = useState("");
  const [orderMachine, setOrderMachine] = useState("");
  const [showOrder, setShowOrder] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [trackingId, setTrackingId] = useState("");
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    const sync = () => setOrders(getOrders());
    window.addEventListener("storage", sync);
    window.addEventListener("ssr-orders-updated", sync);
    return () => { window.removeEventListener("storage", sync); window.removeEventListener("ssr-orders-updated", sync); };
  }, []);

  useEffect(() => {
    const onHash = () => setView(window.location.hash === "#admin" ? "admin" : "party");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const openAdmin = () => { setView("admin"); window.location.hash = "admin"; };
  const openParty = () => { setView("party"); window.location.hash = "home"; };
  const updateOrder = (id, patch) => {
    const updated = orders.map((order) => order.id === id ? { ...order, ...patch } : order);
    setOrders(updated);
    saveOrders(updated);
  };
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminLogin.username === "admin" && adminLogin.password === "admin123") { setAdminAuthenticated(true); setLoginError(""); }
    else setLoginError("Invalid demo credentials. Use admin / admin123.");
  };

  const openOrder = (machine = "") => {
    setOrderMachine(machine);
    setShowOrder(true);
  };

  const closeModals = () => {
    setShowOrder(false);
    setShowContact(false);
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  if (view === "admin") {
    if (!adminAuthenticated) {
      return (
        <div className="admin-login-page">
          <div className="admin-login-card">
            <div className="admin-login-brand"><span className="brand-mark">SSR</span><div><strong>SSR Knit Fabrics</strong><small>OFFICIAL PORTAL</small></div></div>
            <p className="eyebrow">ADMIN ACCESS</p><h1>Official sign in</h1><p>Manage incoming party orders, acceptance decisions and production progress.</p>
            <form onSubmit={handleAdminLogin}>
              <label>Username<input value={adminLogin.username} onChange={(e) => setAdminLogin({ ...adminLogin, username: e.target.value })} placeholder="Admin username" autoComplete="username" /></label>
              <label>Password<input type="password" value={adminLogin.password} onChange={(e) => setAdminLogin({ ...adminLogin, password: e.target.value })} placeholder="Password" autoComplete="current-password" /></label>
              {loginError && <div className="login-error">{loginError}</div>}
              <button className="btn btn-primary btn-large" type="submit">Sign in to dashboard →</button>
            </form>
            <button className="login-back" onClick={openParty}>← Return to party website</button>
          </div>
        </div>
      );
    }
    return <AdminDashboard orders={orders} onUpdateOrder={updateOrder} onLogout={() => { setAdminAuthenticated(false); openParty(); }} />;
  }

  return (
    <div className="site-shell">
      <Navbar onNavigate={scrollTo} onOrder={() => openOrder()} onAdmin={openAdmin} />
      <main>
        <Home onNavigate={scrollTo} onOrder={() => openOrder()} />

        <section id="capabilities" className="capability-strip">
          <div><span>✓</span><strong>Premium Quality</strong><small>Consistent production standards</small></div>
          <div><span>⚙</span><strong>Terrot Machinery</strong><small>Reliable knitting technology</small></div>
          <div><span>◈</span><strong>Design Flexibility</strong><small>Jacquard & double jersey</small></div>
          <div><span>↗</span><strong>Party Focused</strong><small>Order and progress visibility</small></div>
        </section>

        <About />

        

        <section id="machines" className="machines-section">
          <div className="section-heading">
            <p className="eyebrow">OUR MACHINES</p>
            <h2>Terrot Knitting Technology</h2>
            <p>Explore the machines currently represented by SSR Knit Fabrics.</p>
          </div>
          <div className="machine-grid">
            {machines.map((machine) => (
              <article className="machine-card" key={machine.id}>
                <div className="machine-image-wrap">
                  <img src={machine.image} alt={machine.name} />
                  <span className="machine-number">0{machine.id}</span>
                </div>
                <div className="machine-content">
                  <p className="machine-type">{machine.type}</p>
                  <h3>{machine.name}</h3>
                  <div className="spec-row"><span>Diameter</span><b>30", 34"</b></div>
                  <div className="spec-row"><span>Gauge</span><b>18</b></div>
                  <div className="spec-row"><span>Feeders</span><b>72, 84</b></div>
                  <div className="machine-actions">
                    <button className="btn btn-outline" onClick={() => setSelectedMachine(machine)}>View Details</button>
                    <button className="btn btn-primary" onClick={() => openOrder(machine.name)}>Order Enquiry</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <Samples onOrder={() => openOrder()} />

        <section id="tracking" className="tracking-section">
          <div className="tracking-copy">
            <p className="eyebrow">ORDER VISIBILITY</p>
            <h2>Know the progress of your production.</h2>
            <p>Once your order is accepted, parties will be able to follow production quantity and order status from the website.</p>
          </div>
          <div className="tracking-card">
            <label htmlFor="tracking">Order ID</label>
            <div className="track-input">
              <input id="tracking" value={trackingId} onChange={(e) => setTrackingId(e.target.value)} placeholder="e.g. SSR-2026-001" />
              <button className="btn btn-primary" onClick={() => setTracked(Boolean(trackingId.trim()))}>Track</button>
            </div>
            {tracked ? (() => {
              const order = orders.find((item) => item.id.toLowerCase() === trackingId.trim().toLowerCase());
              if (!order) return <div className="tracking-not-found">No order found for <strong>{trackingId}</strong>. Please check the Order ID.</div>;
              const percent = order.quantity ? Math.round((order.completedQuantity / order.quantity) * 100) : 0;
              return <div className="demo-result">
                <div className="track-top"><strong>{order.id}</strong><span className={order.status === "Rejected" ? "bad" : ""}>{order.status}</span></div>
                <div className="progress-meta"><span>{order.completedQuantity.toLocaleString()} / {order.quantity.toLocaleString()} Kg</span><b>{percent}%</b></div>
                <div className="progress"><div style={{ width: `${percent}%` }} /></div>
                <p><strong>{Math.max(0, order.quantity - order.completedQuantity).toLocaleString()} Kg</strong> remaining · {order.expectedDate ? `Expected completion: ${order.expectedDate}` : "Production schedule will be updated by SSR officials."}</p>
              </div>;
            })() : (
              <p className="tracking-note">Enter your Order ID. After an official accepts the order, production updates will appear here.</p>
            )}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div>
            <p className="eyebrow">GET IN TOUCH</p>
            <h2>Let’s discuss your next fabric requirement.</h2>
            <p>Send an enquiry to SSR Knit Fabrics for machine capability, fabric requirements, quantities or production enquiries.</p>
          </div>
          <button className="btn btn-primary btn-large" onClick={() => setShowContact(true)}>Contact SSR Knit Fabrics →</button>
        </section>
      </main>
      <Footer />

      {selectedMachine && (
        <div className="modal-backdrop" onClick={() => setSelectedMachine(null)}>
          <div className="modal machine-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedMachine(null)}>×</button>
            <img src={selectedMachine.image} alt={selectedMachine.name} />
            <div className="modal-body">
              <p className="eyebrow">TERROT MACHINE</p>
              <h2>{selectedMachine.name}</h2>
              <p>{selectedMachine.description}</p>
              <div className="detail-grid">
                <div><span>Diameter</span><strong>30", 34"</strong></div>
                <div><span>Gauge</span><strong>18</strong></div>
                <div><span>Feeders</span><strong>72, 84</strong></div>
                <div><span>Jacquard</span><strong>All jacquard designs</strong></div>
                <div><span>Fabric</span><strong>Drop — dial & cylinder</strong></div>
                <div><span>Capacity</span><strong>Based on design</strong></div>
                <div><span>Availability</span><strong>Based on ongoing program</strong></div>
              </div>
              <button className="btn btn-primary btn-large" onClick={() => { setSelectedMachine(null); openOrder(selectedMachine.name); }}>Request an Order →</button>
            </div>
          </div>
        </div>
      )}

      {showOrder && (
        <div className="modal-backdrop" onClick={closeModals}>
          <div className="modal form-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModals}>×</button>
            <p className="eyebrow">ORDER ENQUIRY</p>
            <h2>Start an order with SSR Knit Fabrics</h2>
            <p className="modal-intro">Submit your requirement. This frontend currently demonstrates the order flow; the backend will later notify officials and create the real order.</p>
            <form onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              const quantity = Number(data.get("quantity"));
              const newOrder = { id: `SSR-${new Date().getFullYear()}-${String(orders.length + 1).padStart(3, "0")}`, company: data.get("company"), contact: data.get("contact"), phone: data.get("phone"), email: data.get("email"), fabric: data.get("fabric"), machine: data.get("machine"), quantity, completedQuantity: 0, requiredDate: data.get("requiredDate"), expectedDate: "", notes: data.get("notes"), status: "Pending", createdAt: new Date().toLocaleString() };
              const updated = [newOrder, ...orders];
              setOrders(updated); saveOrders(updated);
              alert(`Order request received. Your Order ID is ${newOrder.id}`); closeModals();
            }}>
              <div className="form-grid">
                <label>Party / Company Name<input name="company" required placeholder="Company name" /></label>
                <label>Contact Person<input name="contact" required placeholder="Your name" /></label>
                <label>Phone<input name="phone" required type="tel" placeholder="Phone number" /></label>
                <label>Email<input name="email" required type="email" placeholder="Email address" /></label>
                <label>Fabric / Requirement<select name="fabric" defaultValue=""><option value="" disabled>Select requirement</option><option>Double Jersey</option><option>Drop — Dial & Cylinder</option><option>Jacquard Design</option><option>Other / Custom Requirement</option></select></label>
                <label>Preferred Machine<select name="machine" value={orderMachine} onChange={(e) => setOrderMachine(e.target.value)}><option value="">No preference</option>{machines.map((m) => <option key={m.id}>{m.name}</option>)}</select></label>
                <label>Quantity (Kg)<input name="quantity" required type="number" min="1" placeholder="Required quantity" /></label>
                <label>Required Date<input name="requiredDate" type="date" /></label>
                <label className="full">Additional Requirements<textarea name="notes" rows="4" placeholder="Design, quality, yarn or other requirements" /></label>
              </div>
              <button className="btn btn-primary btn-large" type="submit">Submit Order Enquiry →</button>
            </form>
          </div>
        </div>
      )}

      {showContact && (
        <div className="modal-backdrop" onClick={closeModals}>
          <div className="modal form-modal small-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModals}>×</button>
            <p className="eyebrow">CONTACT</p>
            <h2>Send an enquiry</h2>
            <form onSubmit={(e) => { e.preventDefault(); alert("Message submitted. Official notification will be connected in Phase 2."); closeModals(); }}>
              <label>Name<input required placeholder="Your name" /></label>
              <label>Company<input placeholder="Company / Party" /></label>
              <label>Email<input name="email" required type="email" placeholder="Email address" /></label>
              <label>Phone<input type="tel" placeholder="Phone number" /></label>
              <label>Message<textarea required rows="5" placeholder="How can we help?" /></label>
              <button className="btn btn-primary btn-large" type="submit">Send Message →</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
