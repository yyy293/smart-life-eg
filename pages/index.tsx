import Link from "next/link";

export default function Home() {
  const products = [
    { id: 1, name: "Smart Light", price: 49 },
    { id: 2, name: "Smart Thermostat", price: 199 },
    { id: 3, name: "Smart Door Lock", price: 129 },
    { id: 4, name: "Smart Camera", price: 89 },
    { id: 5, name: "Smart Speaker", price: 59 },
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
          <Link href="#about" style={{ color: "white" }}>About Us</Link>
        </nav>
      </header>

      {/* HERO SECTION */}
      <section style={{ padding: "60px 20px", textAlign: "center" }}>
        <h2 style={{ fontSize: "36px", marginBottom: "20px" }}>Welcome to Smart Life</h2>
        <p style={{ fontSize: "18px", maxWidth: "800px", margin: "auto" }}>
          We build smart homes and smart gadgets that make your life easier, safer, and more connected.
          Order smart rooms or smart devices from our collection and experience the future of home automation.
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

      {/* ABOUT US */}
      <section id="about" style={{ backgroundColor: "#001f3f", color: "white", padding: "60px 20px", marginTop: "40px" }}>
        <h2 style={{ fontSize: "28px", textAlign: "center", marginBottom: "20px" }}>About Us</h2>
        <p style={{ maxWidth: "800px", margin: "auto", textAlign: "center", lineHeight: "1.6" }}>
          Smart Life is a company dedicated to creating smart homes and innovative gadgets.  
          We design entire smart rooms, as well as individual smart devices, to make your home more comfortable, safe, and connected.  
          Our goal is to bring the future of home automation to your fingertips.
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "20px", backgroundColor: "#f0f4f8", marginTop: "20px" }}>
        © 2026 Smart Life. All rights reserved.
      </footer>
    </div>
  );
}
