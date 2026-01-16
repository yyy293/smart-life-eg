import Link from "next/link";

export default function Cart() {
  const cartItems = [
    { id: 1, name: "Smart Light", price: 49, qty: 1 },
    { id: 2, name: "Smart Thermostat", price: 199, qty: 2 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

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

      {/* CART SECTION */}
      <main style={{ padding: "40px" }}>
        <h2 style={{ fontSize: "32px", marginBottom: "20px" }}>Your Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div style={{ maxWidth: "800px", margin: "auto" }}>
            {cartItems.map((item) => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #ccc" }}>
                <span>{item.name} (x{item.qty})</span>
                <span>${item.price * item.qty}</span>
              </div>
            ))}
            <div style={{ textAlign: "right", marginTop: "20px", fontWeight: "bold", fontSize: "20px" }}>
              Total: ${total}
            </div>
            <button style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "#001f3f", color: "white", border: "none", cursor: "pointer" }}>
              Checkout
            </button>
          </div>
        )}
      </main>

      {/* ABOUT US */}
      <section id="about" style={{ backgroundColor: "#001f3f", color: "white", padding: "60px 20px" }}>
        <h2 style={{ fontSize: "28px", textAlign: "center", marginBottom: "20px" }}>About Us</h2>
        <p style={{ maxWidth: "800px", margin: "auto", textAlign: "center", lineHeight: "1.6" }}>
          Smart Life is a company dedicated to creating smart homes and innovative gadgets.  
          We design entire smart rooms, as well as individual smart devices, to make your home more comfortable, safe, and connected.  
          Our goal is to bring the future of home automation to your fingertips.
        </p>
      </section>

      <footer style={{ textAlign: "center", padding: "20px", backgroundColor: "#f0f4f8", marginTop: "20px" }}>
        © 2026 Smart Life. All rights reserved.
      </footer>
    </div>
  );
}
