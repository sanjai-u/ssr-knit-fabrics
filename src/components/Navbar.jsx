function Navbar({ onNavigate, onOrder, onAdmin }) {
  return (
    <>
      <div className="topbar">
        <div>☎ Contact details</div>
        <div>✉ Business enquiry</div>
        <div>⌖ Tiruppur, Tamil Nadu, India</div>
      </div>
      <nav className="navbar">
        <button className="brand" onClick={() => onNavigate("home")} aria-label="SSR Knit Fabrics home">
          <span className="brand-mark">SSR</span><span><b>SSR</b><small>KNIT FABRICS</small></span>
        </button>
        <div className="nav-links">
          <button onClick={() => onNavigate("home")}>Home</button>
          <button onClick={() => onNavigate("about")}>About Us</button>
          <button onClick={() => onNavigate("founder")}>Founder</button>
          <button onClick={() => onNavigate("machines")}>Machines</button>
          <button onClick={() => onNavigate("samples")}>Samples</button>
          <button onClick={() => onNavigate("tracking")}>Track Order</button>
          <button onClick={() => onNavigate("contact")}>Contact</button>
        </div>
        <div className="nav-actions"><button className="nav-admin" onClick={onAdmin}>Admin Portal</button><button className="nav-order" onClick={onOrder}>Place an Order</button></div>
      </nav>
    </>
  );
}
export default Navbar;
