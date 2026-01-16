import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../IMG_1324.jpeg"; // your logo in main repo root

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
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
  const [operatorEmail, setOperatorEmail] = useState("");
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(true);
  }, []);

  const products: Product[] = [
    // Cameras
    { id: 1, name: "Tapo 2k outdoor ip 66", price: 2800, category: "Cameras" },
    { id: 2, name: "Tapo c100 indoor night vision", price: 1100, category: "Cameras" },
    { id: 3, name: "Tapo indoor", price: 1330, category: "Cameras" },
    { id: 4, name: "Baby monitor", price: 4400, category: "Cameras" },
    { id: 5, name: "Solar panel security camera outdoor 2K 66", price: 7300, category: "Cameras" },
    { id: 6, name: "Ring weatherproof doorbell camera", price: 7800, category: "Cameras" },
    { id: 7, name: "Tap battery doorbell camera wireless", price: 4500, category: "Cameras" },
    { id: 8, name: "Ring video doorbell", price: 4000, category: "Cameras" },
    { id: 9, name: "EUFY doorbell camera", price: 3900, category: "Cameras" },
    // Decor
    { id: 10, name: "Cloud led ceiling 15m", price: 1100, category: "Decor" },
    { id: 11, name: "Led rgb strip light 15m", price: 3200, category: "Decor" },
    { id: 12, name: "Night floor lamp light sensor", price: 300, category: "Decor" },
    // Smart devices
    { id: 13, name: "Smartwater valve", price: 2200, category: "Smart devices" },
    { id: 14, name: "Smart curtain shutter", price: 1700, category: "Smart devices" },
    { id: 15, name: "Smart switch pack of three", price: 1440, category: "Smart devices" },
    { id: 16, name: "NIO smart plug", price: 820, category: "Smart devices" },
    { id: 17, name: "Wi-Fi open and close sensor", price: 750, category: "Smart devices" },
    { id: 18, name: "Smart wall panel", price: 1770, category: "Smart devices" },
    { id: 19, name: "Smart ir", price: 800, category: "Smart devices" },
    { id: 20, name: "Smart lightbulb", price: 900, category: "Smart devices" },
    { id: 21, name: "Son off switch", price: 600, category: "Smart devices" },
    { id: 22, name: "Screen wall switch", price: 3300, category: "Smart devices" },
    { id: 23, name: "Led tv back sink", price: 8000, category: "Smart devices" },
    { id: 24, name: "Switch bot attachment", price: 2900, category: "Smart devices" },
    // Alexa
    { id: 25, name: "Echo show 8in", price: 13000, category: "Alexa" },
    { id: 26, name: "Echo spot 2024", price: 5000, category: "Alexa" },
    { id: 27, name: "Echo spot 2017", price: 5500, category: "Alexa" },
    { id: 28, name: "Echo pop black 1st gen", price: 3500, category: "Alexa" },
    { id: 29, name: "Echo pop purple 1st gen", price: 3600, category: "Alexa" },
    { id: 30, name: "Echo show 5th gen", price: 8300, category: "Alexa" },
    { id: 31, name: "Alexa echo dot 5th gen", price: 5000, category: "Alexa" },
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

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleOperatorRequest = () => {
    alert(`Operator request sent to smart.life.www@gmail.com:\n${operatorEmail}`);
    setShowLoginModal(false);
    setOperatorMode(false);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif", backgroundColor: "#f0f4f8", minHeight: "100vh" }}>

      {/* NAVBAR */}
      <header style={{ backgroundColor: "#001f3f", color: "white", padding: "15px 30px", display: "flex", alignItems: "center", position: "sticky", top: 0, zIndex: 100 }}>
        <h1 style={{ fontSize: "24px" }}>Smart Life</h1>
        <nav style={{ marginLeft: "auto", display: "flex", gap: "15px", alignItems: "center" }}>
          <button onClick={() => setCartOpen(true)} style={{ color: "white", background: "none", border: "none", cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>Cart</button>
          <button onClick={() => { setShowLoginModal(true); setLoginMode("login"); setOperatorMode(false); }} style={{ color: "white", background: "none", border: "none", cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>Login</button>
          <button onClick={() => { setShowLoginModal(true); setLoginMode("signup"); setOperatorMode(false); }} style={{ color: "white", background: "none", border: "none", cursor: "pointer", transition: "transform 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.transform="scale(1.1)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>Sign Up</button>
          <div style={{ marginLeft: "20px", position: "relative", width: 50, height: 50 }}>
            <Image src={logo} alt="Logo" style={{ borderRadius: "5px" }} fill sizes="50px" />
          </div>
        </nav>
      </header>

      {/* CART SIDEBAR */}
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
        transition: "right 0.4s ease-in-out",
        display: "flex",
        flexDirection: "column"
      }}>
        <button onClick={() => setCartOpen(false)} style={{ alignSelf: "flex-end", marginBottom: "20px", fontSize: "18px", background: "none", border: "none", cursor: "pointer" }}>X</button>
        <h2 style={{ marginBottom: "20px" }}>Your Cart</h2>
        {cartItems.length === 0 ? <p>Your cart is empty</p> : (
          <>
            {cartItems.map(item => (
              <div key={item.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px", alignItems: "center", transition: "all 0.3s" }}>
                <span>{item.name} x{item.qty}</span>
                <span>{item.price * item.qty} LE</span>
                <button onClick={() => removeFromCart(item.id)} style={{ background: "red", color: "white", border: "none", borderRadius: "5px", padding: "0 5px", cursor: "pointer" }}>X</button>
              </div>
            ))}
            <hr style={{ margin: "10px 0" }} />
            <p><strong>Total: {total} LE</strong></p>
            <p style={{ color: "red", fontWeight: "bold" }}>Payment in cash only</p>
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
          zIndex: 1000,
          animation: "fadeIn 0.5s"
        }}>
          <div style={{ backgroundColor: "white", padding: "30px", borderRadius: "10px", width: "350px", position: "relative", animation: "slideIn 0.4s" }}>
            <button onClick={() => setShowLoginModal(false)} style={{ position: "absolute", top: "10px", right: "15px", fontSize: "18px", border: "none", background: "none", cursor: "pointer" }}>X</button>
            <div style={{ display: "flex", justifyContent: "space-around", marginBottom: "20px" }}>
              <button onClick={() => { setLoginMode("login"); setOperatorMode(false); }} style={{ borderBottom: loginMode === "login" ? "2px solid #001f3f" : "none", padding: "5px 10px", cursor: "pointer" }}>Login</button>
              <button onClick={() => { setLoginMode("signup"); setOperatorMode(false); }} style={{ borderBottom: loginMode === "signup" ? "2px solid #001f3f" : "none", padding: "5px 10px", cursor: "pointer" }}>Sign Up</button>
            </div>
            <p style={{ fontSize: "14px", marginBottom: "10px", color: "#555" }}>
              If you are or want to be an operator, click <span style={{ color: "#001f3f", cursor: "pointer" }} onClick={() => setOperatorMode(true)}>here</span>.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <input type="email" placeholder="Email" value={operatorEmail} onChange={e => setOperatorEmail(e.target.value)} style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
              {!operatorMode && <input type="text" placeholder="Username" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />}
              <input type="password" placeholder="Password" style={{ padding: "10px", borderRadius: "5px", border: "1px solid #ccc" }} />
              {operatorMode && <p style={{ fontSize: "14px", color: "red" }}>Request will be sent to smart.life.www@gmail.com</p>}
              <button onClick={() => operatorMode ? handleOperatorRequest() : setShowLoginModal(false)} style={{ padding: "10px", backgroundColor: "#001f3f", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", transition: "transform 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>{operatorMode ? "Request Operator Access" : loginMode === "login" ? "Login" : "Sign Up"}</button>
            </div>
          </div>
        </div>
      )}

      {/* HERO */}
      <section style={{ padding: "120px 20px", textAlign: "center", backgroundColor: "#e0e6ef", opacity: fadeIn ? 1 : 0, transition:"opacity 1s" }}>
        <h2 style={{ fontSize: "48px", marginBottom: "20px" }}>Welcome to Smart Life</h2>
        <p style={{ fontSize: "20px", maxWidth: "900px", margin: "auto" }}>
          We design smart homes and innovative gadgets to make your life easier, safer, and more connected.
        </p>
      </section>

      {/* PRODUCTS */}
      <section style={{ padding: "80px 20px" }}>
        <h2 style={{ fontSize: "36px", textAlign: "center", marginBottom: "40px" }}>Our Products</h2>
        {["Cameras","Decor","Smart devices","Alexa"].map(category => (
          <div key={category} style={{ marginBottom: "50px" }}>
            <h3 style={{ fontSize: "28px", marginBottom: "20px" }}>{category}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "25px" }}>
              {products.filter(p => p.category===category).map(product => (
                <div key={product.id} style={{
                  backgroundColor:"white",
                  padding:"20px",
                  borderRadius:"10px",
                  boxShadow:"0 4px 15px rgba(0,0,0,0.2)",
                  transition:"all 0.3s",
                  cursor:"pointer",
                  transform:"translateY(0)",
                  opacity: fadeIn ? 1 : 0
                }}
                  onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"}
                  onMouseLeave={e => e.currentTarget.style.transform="scale(1)">
                  <h4 style={{ fontSize:"20px", marginBottom:"10px" }}>{product.name}</h4>
                  <p style={{ fontWeight:"bold", marginBottom:"10px" }}>{product.price} LE</p>
                  <button onClick={()=>addToCart(product)} style={{ backgroundColor:"#001f3f", color:"white", padding:"8px 15px", border:"none", borderRadius:"5px", cursor:"pointer", transition:"transform 0.2s" }}
                    onMouseEnter={e => e.currentTarget.style.transform="scale(1.05)"} onMouseLeave={e => e.currentTarget.style.transform="scale(1)"}>Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* ABOUT US */}
      <section style={{ backgroundColor:"#001f3f", color:"white", padding:"80px 20px", opacity: fadeIn ? 1 : 0, transition:"opacity 1s" }}>
        <h2 style={{ fontSize:"36px", textAlign:"center", marginBottom:"20px" }}>About Us</h2>
        <p style={{ maxWidth:"900px", margin:"auto", textAlign:"center", lineHeight:"1.8", fontSize:"18px" }}>
          Smart Life creates smart homes and gadgets. We design smart rooms and individual devices that make your home connected, safe, and comfortable.
        </p>
      </section>

      {/* CONTACT */}
      <section style={{ padding:"80px 20px", backgroundColor:"white", opacity: fadeIn ? 1 : 0, transition:"opacity 1s" }}>
        <h2 style={{ fontSize:"36px", textAlign:"center", marginBottom:"20px" }}>Contact Us</h2>
        <p style={{ maxWidth:"900px", margin:"auto", textAlign:"center", lineHeight:"1.8", fontSize:"18px" }}>
          Email: <a href="mailto:smart.life.www@gmail.com" style={{ color:"#001f3f", textDecoration:"underline" }}>smart.life.www@gmail.com</a>
        </p>
      </section>

      <footer style={{ textAlign:"center", padding:"25px", backgroundColor:"#f0f4f8", marginTop:"40px", fontSize:"16px" }}>
        &copy; {new Date().getFullYear()} Smart Life. All rights reserved.
      </footer>

      <style jsx>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideIn { from { transform: translateY(-50px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
    </div>
  );
}
