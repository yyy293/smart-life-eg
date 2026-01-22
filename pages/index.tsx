import { useState } from "react";

type Product = {
  name: string;
  price: number;
};

const products: { category: string; items: Product[] }[] = [
  {
    category: "Cameras",
    items: [
      { name: "Tapo 2K Outdoor IP66", price: 2800 },
      { name: "Tapo C100 Indoor Night Vision", price: 1100 },
      { name: "Tapo Indoor Camera", price: 1330 },
      { name: "Baby Monitor", price: 4400 },
      { name: "Solar Panel Security Camera 2K", price: 7300 },
      { name: "Ring Weatherproof Doorbell", price: 7800 },
      { name: "Tap Battery Doorbell Wireless", price: 4500 },
      { name: "Ring Video Doorbell", price: 4000 },
      { name: "EUFY Doorbell Camera", price: 3900 },
    ],
  },
  {
    category: "Decor",
    items: [
      { name: "Cloud LED Ceiling 15m", price: 1100 },
      { name: "RGB LED Strip Light 15m", price: 3200 },
      { name: "Night Floor Lamp Sensor", price: 300 },
    ],
  },
  {
    category: "Smart Devices",
    items: [
      { name: "Smart Water Valve", price: 2200 },
      { name: "Smart Curtain Shutter", price: 1700 },
      { name: "Smart Switch (3 Pack)", price: 1440 },
      { name: "NIO Smart Plug", price: 820 },
      { name: "Wi-Fi Open/Close Sensor", price: 750 },
      { name: "Smart Wall Panel", price: 1770 },
      { name: "Smart IR Controller", price: 800 },
      { name: "Smart Light Bulb", price: 900 },
      { name: "Sonoff Switch", price: 600 },
      { name: "Screen Wall Switch", price: 3300 },
      { name: "LED TV Back Sync", price: 8000 },
      { name: "SwitchBot Attachment", price: 2900 },
    ],
  },
  {
    category: "Alexa Devices",
    items: [
      { name: "Echo Show 8\"", price: 13000 },
      { name: "Echo Spot 2024", price: 5000 },
      { name: "Echo Spot 2017", price: 5500 },
      { name: "Echo Pop Black", price: 3500 },
      { name: "Echo Pop Purple", price: 3600 },
      { name: "Echo Show 5th Gen", price: 8300 },
      { name: "Echo Dot 5th Gen", price: 5000 },
    ],
  },
];

export default function Home() {
  const [cart, setCart] = useState<Product[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const addToCart = (product: Product) => setCart([...cart, product]);
  const removeFromCart = (index: number) =>
    setCart(cart.filter((_, i) => i !== index));
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", background: "#0a1a2f", color: "white" }}>
      {/* NAVBAR */}
      <nav style={nav}>
        <h2 style={{ cursor: "pointer" }}>Smart Life</h2>
        <img src="./IMG_1324.jpeg" alt="Logo" style={{ width: 50, borderRadius: 8 }} />
        <div>
          <button style={btn} onClick={() => setAuthOpen(true)}>Login / Sign Up</button>
          <button style={btn} onClick={() => setCartOpen(true)}>Cart ({cart.length})</button>
        </div>
      </nav>

      {/* HERO */}
      <section style={hero}>
        <h1 className="fade-in">Smart Homes Made Simple</h1>
        <p className="fade-in">Order smart rooms, smart gadgets, and automation systems</p>
        <button style={mainBtn} onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>
          View Products
        </button>
      </section>

      {/* PRODUCTS */}
      <section id="products" style={{ padding: "40px" }}>
        {products.map((cat) => (
          <div key={cat.category} style={{ marginBottom: "40px" }}>
            <h2 className="fade-in">{cat.category}</h2>
            {cat.items.map((item, i) => (
              <div key={i} style={productCard} className="fade-hover">
                <span>{item.name}</span>
                <span>{item.price} LE</span>
                <button onClick={() => addToCart(item)} style={smallBtn}>Add</button>
              </div>
            ))}
          </div>
        ))}
      </section>

      {/* CART SIDEBAR */}
      {cartOpen && (
        <div style={sidebar} className="slide-in">
          <button onClick={() => setCartOpen(false)} style={closeBtn}>×</button>
          <h2>Your Cart</h2>
          {cart.length === 0 && <p>No items added</p>}
          {cart.map((item, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              {item.name} – {item.price} LE
              <button onClick={() => removeFromCart(i)} style={smallBtn}>Remove</button>
            </div>
          ))}
          <hr />
          <h3>Total: {total} LE</h3>
          <p>Payment method: Cash only</p>
        </div>
      )}

      {/* LOGIN / SIGN UP MODAL */}
      {authOpen && (
        <div style={modalBg} className="fade-in">
          <div style={modalBox}>
            <button onClick={() => setAuthOpen(false)} style={closeBtn}>×</button>
            <h2>Login / Sign Up</h2>
            <input placeholder="Email" style={input} />
            <input placeholder="Username" style={input} />
            <input type="password" placeholder="Password" style={input} />
            <p style={{ fontSize: 14 }}>
              Are you an operator or want to become one? Click here.
            </p>
            <button style={mainBtn}>Submit</button>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={footer}>
        Contact: smart.life.www@gmail.com
      </footer>

      {/* ANIMATIONS */}
      <style>{`
        .fade-in { animation: fadeIn 1s ease forwards; opacity: 0; }
        .fade-hover:hover { transform: scale(1.05); transition: all 0.3s; box-shadow: 0 4px 15px rgba(0,0,0,0.5); background: linear-gradient(90deg, #1e3c72, #2a5298); }
        .slide-in { animation: slideIn 0.3s ease forwards; }
        @keyframes fadeIn { to { opacity: 1; } }
        @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
      `}</style>
    </div>
  );
}

/* STYLES */
const nav = { display: "flex", justifyContent: "space-between", alignItems: "center", padding: 20, background: "#0a1f44", gap: 20 };
const btn = { background: "#1e90ff", border: "none", padding: "10px 15px", marginLeft: 10, color: "white", cursor: "pointer" };
const mainBtn = { ...btn, fontSize: 18 };
const productCard = { display: "flex", justifyContent: "space-between", background: "#112", padding: 15, margin: "10px 0", borderRadius: 12, alignItems: "center" };
const smallBtn = { marginLeft: 10, background: "red", color: "white", border: "none", cursor: "pointer", padding: "5px 10px", borderRadius: 5 };
const sidebar = { position: "fixed" as const, top: 0, right: 0, width: 320, height: "100%", background: "#111", padding: 20, boxShadow: "-4px 0 15px rgba(0,0,0,0.3)", zIndex: 1000 };
const closeBtn = { background: "transparent", color: "white", border: "none", fontSize: 24, float: "right" as const, cursor: "pointer" };
const modalBg = { position: "fixed" as const, inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 1100 };
const modalBox = { background: "#222", padding: 30, width: 320, borderRadius: 10 };
const input = { width: "100%", padding: 10, margin: "10px 0", borderRadius: 5, border: "1px solid #555" };
const hero = { padding: "60px 20px", textAlign: "center" };
const footer = { padding: 20, textAlign: "center", background: "#0a1f44" };
