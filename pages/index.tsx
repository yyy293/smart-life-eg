import { useState } from "react";

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMode, setLoginMode] = useState<"login" | "signup">("login");
  const [operatorMode, setOperatorMode] = useState(false);
  const [operatorEmail, setOperatorEmail] = useState("");
  const [operatorApproved, setOperatorApproved] = useState<boolean | null>(null);

  const products = [
    { id: 1, name: "Alexa Smart", price: 49 },
    { id: 2, name: "Smart IR", price: 199 },
    { id: 3, name: "Smart Thermostat", price: 129 },
    { id: 4, name: "Smart Door Lock", price: 89 },
    { id: 5, name: "Smart Camera", price: 59 },
    { id: 6, name: "Smart Hub", price: 149 },
  ];

  const cartItems = [
    { id: 1, name: "Alexa Smart", price: 49, qty: 1 },
    { id: 2, name: "Smart IR", price: 199, qty: 2 },
  ];

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleOperatorRequest = () => {
    const accept = confirm(`${operatorEmail} wants to become an operator. Do you accept?`);
    if (accept) setOperatorApproved(true);
    else setOperatorApproved(false);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f0f4f8", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <header style={{ backgroundColor: "#001f3f", color: "white", padding: "15px 30px", display: "flex", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <h1 style={{ fontSize: "24px" }}>Smart Life</h1>
        <nav style={{ marginLeft: "auto", display: "flex", gap: "15px" }}>
          <button onClick={() => setCartOpen(true)} style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}>Cart</button>
          <button onClick={() => { setShowLoginModal(true); setLoginMode("login"); setOperatorMode(false); }} style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}>Login</button>
          <button onClick={() => { setShowLoginModal(true); setLoginMode("signup"); setOperatorMode(false); }} style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}>Sign Up</button>
        </nav>
      </header>

      {/* CART SIDEBAR */}
      <div style={{
        position: "fixed",
        top: 0,
        right: cartOpen ? 0 : "-320px",
        width: "300px",
        height: "100vh",
        backgroundColor: "white",
        boxShadow: "-2px 0 10px rgba(0,0,0,0.3)",
        padding: "20px",
        zIndex: 1000,
        transition: "right 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column"
      }}>
        <button onClick={() => setCartOpen(false)} style={{ alignSelf: "flex-end", marginBottom: "20px" }}>X</button>
        <h2 style={{ marginBottom: "20px" }}>Your Cart</h2>
        {cartItems.length === 0 ? <p>Your cart is empty</p> : (
          <>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span>{item.name} x{item.qty}</span>
                <span>${item.price * item.qty}</span>
              </div>
            ))}
            <hr style={{ margin: "10px 0" }} />
            <p><strong>Total: ${total}</strong></p>
            <p style={{ color: "red", fontWeight: "bold" }}>Payment in cash only</p>
            <button style={{ marginTop: "10px", padding: "10px", backgroundColor: "#001f3f", color: "white", border: "none", cursor: "pointer", borderRadius: "5px" }}>Checkout</button>
          </>
        )}
      </div>

      {/* LOGIN/SIGNUP MODAL */}
      {showLoginModal && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0,0,0,0.6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000
        }}>
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", width: "350px", position: "relative" }}>
            {/* Close X */}
            <button onClick={() => setShowLoginModal(false)} style={{ position: "absolute", top: "10px", right: "15px", fontSize: "18px", border: "none", background: "none", cursor: "pointer" }}>X</button>

            {/* Tabs */}
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
              <button onClick={() => { setLoginMode("login"); setOperatorMode(false); }} style={{ borderBottom: loginMode === "login" ? "2px solid #001f3f" : "none", padding: "5px 10px", cursor: "pointer" }}>Login</button>
              <button onClick={() => { setLoginMode("signup"); setOperatorMode(false); }} style={{ borderBottom: loginMode === "signup" ? "2px solid #001f3f" : "none", padding: "5px 10px", cursor: "pointer" }}>Sign Up</button>
            </div>

            {/* Operator note */}
            <p style={{ fontSize: "14px", marginBottom: "10px", color: "#555" }}>
              If you are or want to be an operator, click <span style={{ color: "#001f3f", cursor: "pointer" }} onClick={() => setOperatorMode(true)}>here</span>.
            </p>

            {/* Form */}
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="email" placeholder="Email" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
              {!operatorMode && <input type="text" placeholder="Username" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />}
              <input type="password" placeholder="Password" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
              {operatorMode && <p style={{ fontSize: "14px", color: "red" }}>Request will be sent to smart.life.www@gmail.com</p>}
              <button style={{ padding: "10px", backgroundColor: "#001f3f", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                {operatorMode ? "Request Operator Access" : loginMode === "login" ? "Login" : "Sign Up"}
              </button>
            </div>

            {operatorApproved === false && <p style={{ color: "red", marginTop: "10px" }}>Sorry, you are not accepted as an operator.</p>}
            {operatorApproved === true && <p style={{ color: "green", marginTop: "10px" }}>You are now an operator!</p>}
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section style={{ padding: "100px 20px", textAlign: "center", backgroundColor: "#e0e6ef" }}>
        <h2 style={{ fontSize: "48px", marginBottom: "20px" }}>Welcome to Smart Life</h2>
        <p style={{ fontSize: "20px", maxWidth: "900px", margin: "auto" }}>
          We design smart homes and innovative gadgets to make your life easier, safer, and more connected.
        </p>
        <button style={{ marginTop: "20px", padding: "15px 30px", backgroundColor: "#001f3f", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Explore Products</button>
      </section>

      {/* PRODUCTS */}
      <section style={{ padding: "80px 20px" }}>
        <h2 style={{ fontSize: "36px", textAlign: "center", marginBottom: "40px" }}>Our Products</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "25px", maxWidth: "1200px", margin: "auto" }}>
          {products.map(product => (
            <div key={product.id} style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
              transition: "transform 0.2s",
              cursor: "pointer"
            }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"
              }>
              <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>{product.name}</h3>
              <p style={{ marginBottom: "10px", fontWeight: "bold" }}>${product.price}</p>
              <button style={{ backgroundColor: "#001f3f", color: "white", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>View</button>
            </div>
          ))}
        </div>
      </section>

      {/* SMART ROOMS */}
      <section style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <h2 style={{ fontSize: "36px", textAlign: "center", marginBottom: "20px" }}>Smart Rooms</h2>
        <p style={{ maxWidth: "900px", margin: "auto", textAlign: "center", lineHeight: "1.8" }}>
          Fully automated smart rooms with lights, temperature control, smart locks, and integrated gadgets. Customizable for your lifestyle.
        </p>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "80px 20px", backgroundColor: "#f0f4f8" }}>
        <h2 style={{ fontSize: "36px", textAlign: "center", marginBottom: "40px" }}>Why Choose Us</h2>
        <ul style={{ maxWidth: "900px", margin: "auto", lineHeight: "2", fontSize: "18px" }}>
          <li>✅ Expert smart home design and installation</li>
          <li>✅ High-quality smart gadgets</li>
          <li>✅ Customizable solutions for your home</li>
          <li>✅ Excellent customer service</li>
          <li>✅ Safe, secure, and reliable technology</li>
        </ul>
      </section>

      {/* ABOUT US */}
      <section id="about" style={{ backgroundColor: "#001f3f", color: "white", padding: "80px 20px" }}>
        <h2 style={{ fontSize: "36px", textAlign: "center", marginBottom: "20px" }}>About Us</h2>
        <p style={{ maxWidth: "900px", margin: "auto", textAlign: "center", lineHeight: "1.8", fontSize: "18px" }}>
          Smart Life is a company dedicated to creating smart homes and innovative gadgets. We design entire smart rooms and individual devices to make your home comfortable, safe, and connected.
        </p>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px 20px", backgroundColor: "white" }}>
        <h2 style={{ fontSize: "36px", textAlign: "center", marginBottom: "20px" }}>Contact Us</h2>
        <p style={{ maxWidth: "900px", margin: "auto", textAlign: "center", lineHeight: "1.8", fontSize: "18px" }}>
          Email: <a href="mailto:smart.life.www@gmail.com" style={{ color: "#001f3f", textDecoration: "underline" }}>smart.life.www@gmail.com</a><br />
          Phone: +20 123 456 7890<br />
          Address: 123 Smart Street, Cairo, Egypt
        </p>
      </section>

      {/* FOOTER */}
      <footer style={{ textAlign: "center", padding: "25px", backgroundColor: "#f0f4f8", marginTop: "40px", fontSize: "16px" }}>
        © 2026 Smart Life. All rights reserved.
      </footer>
    </div>
  );
}
