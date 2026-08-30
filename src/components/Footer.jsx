function Footer() {
  return (
    <footer className="footer">
      <div>
        <strong>SSR Knit Fabrics</strong>
        <span>The Name of Quality</span>
      </div>
      <div className="footer-contact">
        <span>Founder: Udhayakumar D</span>
        <a href="tel:+919944977968">+91 99449 77968</a>
        <a href="mailto:udhayakmr68@gmail.com">udhayakmr68@gmail.com</a>
        <span>No 4/17 KGF Compound, Kavundampalayam, Veerapandi – 641605</span>
      </div>
      <div>
        <span>Machines · Fabrics · Orders · Contact</span>
        <span>© {new Date().getFullYear()} SSR Knit Fabrics. All Rights Reserved.</span>
      </div>
    </footer>
  );
}

export default Footer;
