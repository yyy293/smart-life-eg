import Link from "next/link";

export default function Home() {
  const products = [
    { id: 1, name: "Smart Light", price: 49 },
    { id: 2, name: "Smart Thermostat", price: 199 },
    { id: 3, name: "Smart Door Lock", price: 129 },
    { id: 4, name: "Smart Camera", price: 89 },
    { id: 5, name: "Smart Speaker", price: 59 },
    { id: 6, name: "Smart Hub", price: 149 },
  ];

  return (
    <div style={{ fontFamily: "Arial", backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <header style={{ backgroundColor: "#001f3f", color: "white", padding: "20px", display: "flex", alignItems: "center" }}>
        <img src="/IMG_1324.jpeg" alt="Logo" style={{ height: "50px", marginRight: "20px" }} />
        <h1 style={{ fontSize: "24px" }}>Smart Life</h1>
        <nav style={{ marginLeft: "auto" }}>
          <Link href="/" style={{ color: "white", marginRight: "15px" }}>Home</Link>
          <Link href="/cart" style={{ color: "white", marginRight: "15px" }}>Cart</Link>
          <Link href="#about" style={{ color: "white", marginRight: "15px" }}>About Us</Link>
          <Link href="#features" style={{ color: "white", marginRight: "15px" }}>Features</Link>
          <Link href="#contact" style={{ color: "white" }}>Contact</Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>Welcome to Smart Life</h2>
        <p style={{ fontSize: "18px", maxWidth: "800px", margin: "auto" }}>
          We design smart homes and innovative gadgets to make your life easier, safer, and more connected.
          Order smart rooms or individual smart devices and experience the future of home automation today.
        </p>
      </section>

      {/* PRODUCTS */}
      <section style={{ padding: "40px 20px" }}>
        <h2 style={{ fontSize: "28px", marginBottom: "20px", textAlign: "center" }}>Our Products</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px", maxWidth: "1000px", margin: "auto" }}>
          {products.map((product) => (
            <div key={product.id} style={{ backgroundColor: "white", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 6px rgba(0,0,0,0.1)" }}>
              <div style={{ height: "150px", backgroundColor: "#ccc", borderRadius: "6px", marginBottom: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span>No Image</span>
              </div>
              <h3 style={{ fontSize: "20px", marginBottom: "5px" }}>{product.name}</h3>
              <p style={{ marginBottom: "10px" }}>${product.price}</p>
              <Link href={`/product/${product.id}`} style={{ backgroundColor: "#001f3f", color: "white", padding: "8px 12px", borderRadius: "4px", textDecoration: "none" }}>View</Link>
            </div>
          ))}
        </div>
      </section>

      {/* SMART ROOMS */}
      <section style={{ padding: "60px 20px", backgroundColor: "white" }}>
        <h2 style={{ fontSize: "28px", textAlign: "center", marginBottom: "20px" }}>Smart Rooms</h2>
        <p style={{ maxWidth: "800px", margin: "auto", textAlign: "center" }}>
          Order fully automated smart rooms with lights, temperature control, smart locks, and integrated gadgets.
          Make your home a connected and intelligent space.
        </p>
      </section>

      {/* FEATURES */}
      <section id="features" style={{ padding: "60px 20px", backgroundColor: "#f0f4f8" }}>
        <h2 style={{ fontSize: "28px", textAlign: "center", marginBottom: "20px" }}>Why Choose Us</h2>
        <ul style={{ maxWidth: "800px", margin: "auto", lineHeight: "1.6" }}>
          <li>✅ Expert smart home design and installation</li>
          <li>✅ High-quality smart gadgets</li>
          <li>✅ Customizable solutions for your home</li>
          <li>✅ Excellent customer service</li>
          <li>✅ Safe, secure, and reliable technology</li>
        </ul>
      </section>

      {/* ABOUT US */}
      <section id="about" style={{ backgroundColor: "#001f3f", color: "white", padding: "60px 20px" }}>
        <h2 style={{ fontSize: "28px", textAlign: "center", marginBottom: "20px" }}>About Us</h2>
        <p style={{ maxWidth: "800px", margin: "auto", textAlign: "center", lineHeight: "1.6" }}>
          Smart Life is a company dedicated to creating smart homes and innovative gadgets.  
          We design entire smart rooms, as well as individual smart devices, to make your home more comfortable, safe, and connected.  
          Our goal is to bring the future of home automation to your fingertips.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "60px 20px", backgroundColor: "white" }}>
        <h2 style={{ fontSize: "28px", textAlign: "center", marginBottom: "20px" }}>Contact Us</h2>
        <p style={{ maxWidth: "800px", margin: "auto", textAlign: "center" }}>
          Email: info@smartlife.com<br />
          Phone: +20 123 456 7890<br />
          Address: 123 Smart Street, Cairo, Egypt
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "20px", backgroundColor: "#f0f4f8", marginTop: "20px" }}>
        © 2026 Smart Life. All rights reserved.
      </footer>
    </div>
  );
}
