import { useState } from "react";
import Image from "next/image";
import logo from "../IMG_1324.jpeg"; // path from pages folder to main repo root

interface Product {
  id: number;
  name: string;
  price: number;
}

interface CartItem extends Product {
  qty: number;
}

export default function Home() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginMode, setLoginMode] = useState<"login" | "signup">("login");
  const [operatorMode, setOperatorMode] = useState(false);

  const products: Product[] = [
    { id: 1, name: "Alexa Smart", price: 1200 },
    { id: 2, name: "Smart IR", price: 4500 },
    { id: 3, name: "Smart Thermostat", price: 3000 },
    { id: 4, name: "Smart Door Lock", price: 2200 },
    { id: 5, name: "Smart Camera", price: 1500 },
    { id: 6, name: "Smart Hub", price: 4000 },
  ];

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      } else {
        return [...prev, { ...product, qty: 1 }];
      }
    });
    setCartOpen(true);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <header style={{ backgroundColor: "#001f3f", color: "white", padding: "15px 30px", display: "flex", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <h1 style={{ fontSize: "24px" }}>Smart Life</h1>
        <nav style={{ marginLeft: "auto", display: "flex", gap: "15px", alignItems: "center" }}>
          <button onClick={() => setCartOpen(true)} style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}>Cart</button>
          <button onClick={() => { setShowLoginModal(true); setLoginMode("login"); setOperatorMode(false); }} style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}>Login</button>
          <button onClick={() => { setShowLoginModal(true); setLoginMode("signup"); setOperatorMode(false); }} style={{ color: "white", background: "none", border: "none", cursor: "pointer" }}>Sign Up</button>
          <div style={{ marginLeft: "20px", position: "relative", width: 50, height: 50 }}>
            <Image src={logo} alt="Logo" style={{ borderRadius: "5px" }} fill sizes="50px" />
          </div>
        </nav>
      </header>

      {/* SIDEBAR CART */}
      <div style={{
        position: "fixed",
        top: 0,
        right: cartOpen ? 0 : "-350px",
        width: "300px",
        maxWidth: "80%",
        height: "100vh",
        backgroundColor: "white",
        boxShadow: "-2px 0 10px rgba(0,0,0,0.3)",
        padding: "20px",
        zIndex: 1000,
        transition: "right 0.3s ease-in-out",
        display: "flex",
        flexDirection: "column"
      }}>
        <button onClick={() => setCartOpen(false)} style={{ alignSelf: "flex-end", marginBottom: "20px", fontSize: "18px", background: "none", border: "none", cursor: "pointer" }}>X</button>
        <h2 style={{ marginBottom: "20px" }}>Your Cart</h2>
        {cartItems.length === 0 ? <p>Your cart is empty</p> : (
          <>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span>{item.name} x{item.qty}</span>
                <span>{item.price * item.qty} LE</span>
              </div>
            ))}
            <hr style={{ margin: "10px 0" }} />
            <p><strong>Total: {total} LE</strong></p>
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
            <button onClick={() => setShowLoginModal(false)} style={{ position: "absolute", top: "10px", right: "15px", fontSize: "18px", border: "none", background: "none", cursor: "pointer" }}>X</button>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
              <button onClick={() => { setLoginMode("login"); setOperatorMode(false); }} style={{ borderBottom: loginMode === "login" ? "2px solid #001f3f" : "none", padding: "5px 10px", cursor: "pointer" }}>Login</button>
              <button onClick={() => { setLoginMode("signup"); setOperatorMode(false); }} style={{ borderBottom: loginMode === "signup" ? "2px solid #001f3f" : "none", padding: "5px 10px", cursor: "pointer" }}>Sign Up</button>
            </div>
            <p style={{ fontSize: "14px", marginBottom: "10px", color: "#555" }}>
              If you are or want to be an operator, click <span style={{ color: "#001f3f", cursor: "pointer" }} onClick={() => setOperatorMode(true)}>here</span>.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="email" placeholder="Email" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
              {!operatorMode && <input type="text" placeholder="Username" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />}
              <input type="password" placeholder="Password" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
              {operatorMode && <p style={{ fontSize: "14px", color: "red" }}>Request will be sent to smart.life.www@gmail.com</p>}
              <button style={{ padding: "10px", backgroundColor: "#001f3f", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>
                {operatorMode ? "Request Operator Access" : loginMode === "login" ? "Login" : "Sign Up"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section style={{ padding: "100px 20px", textAlign: "center", backgroundColor: "#e0e6ef" }}>
        <h2 style={{ fontSize: "48px", marginBottom: "20px" }}>Welcome to Smart Life</h2>
        <p style={{ fontSize: "20px", maxWidth: "900px", margin: "auto" }}>
          We design smart homes and innovative gadgets to make your life easier, safer, and more connected.
        </p>
        <button style={{ marginTop: "20px", padding: "15px 30px", backgroundColor: "#001f3f", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" }}>Explore Products</button>
      </section>

      {/* PRODUCTS GRID */}
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
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)">
              <h3 style={{ fontSize: "22px", marginBottom: "8px" }}>{product.name}</h3>
              <p style={{ marginBottom: "10px", fontWeight: "bold" }}>{product.price} LE</p>
              <button onClick={() => addToCart(product)} style={{ backgroundColor: "#001f3f", color: "white", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>Add to Cart</button>
            </div>
          ))}
        </div>
      </section>

      {/* Remaining sections (Smart Rooms, Features, About, Contact, Footer) */}
      {/* You can keep them exactly as in the previous final code */}

    </div>
  );
}
