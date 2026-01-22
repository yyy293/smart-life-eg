import { useState } from "react";

const PRODUCTS = [
  { name: "Tapo 2K Outdoor IP66 Camera", price: 2800 },
  { name: "Tapo C100 Indoor Night Vision", price: 1100 },
  { name: "Tapo Indoor Camera", price: 1330 },
  { name: "Baby Monitor", price: 4400 },
  { name: "Solar Panel Security Camera 2K", price: 7300 },
  { name: "Ring Weatherproof Doorbell Camera", price: 7800 },
  { name: "Tap Battery Doorbell Camera", price: 4500 },
  { name: "Ring Video Doorbell", price: 4000 },
  { name: "EUFY Doorbell Camera", price: 3900 },

  { name: "Cloud LED Ceiling 15m", price: 1100 },
  { name: "LED RGB Strip Light 15m", price: 3200 },
  { name: "Night Floor Lamp (Light Sensor)", price: 300 },

  { name: "Smart Water Valve", price: 2200 },
  { name: "Smart Curtain Shutter", price: 1700 },
  { name: "Smart Switch (Pack of 3)", price: 1440 },
  { name: "NIO Smart Plug", price: 820 },
  { name: "Wi-Fi Open/Close Sensor", price: 750 },
  { name: "Smart Wall Panel", price: 1770 },
  { name: "Smart IR Controller", price: 800 },
  { name: "Smart Light Bulb", price: 900 },
  { name: "Sonoff Switch", price: 600 },
  { name: "Screen Wall Switch", price: 3300 },
  { name: "LED TV Back Sync", price: 8000 },
  { name: "SwitchBot Attachment", price: 2900 },

  { name: "Echo Show 8\"", price: 13000 },
  { name: "Echo Spot 2024", price: 5000 },
  { name: "Echo Spot 2017", price: 5500 },
  { name: "Echo Pop Black", price: 3500 },
  { name: "Echo Pop Purple", price: 3600 },
  { name: "Echo Show 5", price: 8300 },
  { name: "Echo Dot 5th Gen", price: 5000 },
];

export default function Home() {
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showAuth, setShowAuth] = useState(false);

  const addToCart = (product: any) => {
    setCart([...cart, product]);
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ fontFamily: "Arial", background: "#f5f7fb", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <header style={{
        background: "#0a1f44",
        color: "white",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }}>
        <h2>Smart Life</h2>
        <div>
          <button onClick={() => setShowAuth(true)} style={btn}>Login</button>
          <button onClick={() => setShowAuth(true)} style={btn}>Sign Up</button>
          <button onClick={() => setShowCart(true)} style={btn}>Cart ({cart.length})</button>
        </div>
      </header>

      {/* HERO */}
      <section style={{ padding: "60px", textAlign: "center" }}>
        <h1>Smart Homes Made Simple</h1>
        <p>We design smart rooms, smart homes, and sell premium smart devices.</p>
        <button onClick={() => setShowProducts(true)} style={mainBtn}>
          View Products
        </button>
      </section>

      {/* PRODUCTS */}
      {showProducts && (
        <section style={{ padding: "40px" }}>
          <h2>Our Products</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", gap: "20px" }}>
            {PRODUCTS.map((p, i) => (
              <div key={i} style={card}>
                <h4>{p.name}</h4>
                <p><b>{p.price} LE</b></p>
                <button onClick={() => addToCart(p)} style={mainBtn}>Add to Cart</button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CART SIDEBAR */}
      {showCart && (
        <div style={sidebar}>
          <button onClick={() => setShowCart(false)} style={closeBtn}>×</button>
          <h3>Your Cart</h3>

          {cart.length === 0 && <p>No items added.</p>}

          {cart.map((item, i) => (
            <div key={i} style={{ marginBottom: "10px" }}>
              <p>{item.name} – {item.price} LE</p>
              <button onClick={() => removeFromCart(i)}>Remove</button>
            </div>
          ))}

          <hr />
          <h4>Total: {total} LE</h4>
          <p><b>Payment method:</b> Cash only</p>
        </div>
      )}

      {/* LOGIN / SIGNUP MODAL */}
      {showAuth && (
        <div style={modalBg}>
          <div style={modal}>
            <button onClick={() => setShowAuth(false)} style={closeBtn}>×</button>
            <h3>Login / Sign Up</h3>
            <input placeholder="Email" style={input} />
            <input placeholder="Username" style={input} />
            <input placeholder="Password" type="password" style={input} />
            <button style={mainBtn}>Submit</button>
            <p style={{ marginTop: "10px", fontSize: "14px" }}>
              Are you an operator or want to become one? Click here.
            </p>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ background: "#0a1f44", color: "white", padding: "30px", textAlign: "center" }}>
        <p>© Smart Life — Smart Homes & Smart Devices</p>
      </footer>
    </div>
  );
}

/* STYLES */
const btn = {
  marginLeft: "10px",
  padding: "8px 12px",
};

const mainBtn = {
  padding: "10px 15px",
  background: "#0a1f44",
  color: "white",
  border: "none",
  cursor: "pointer",
};

const card = {
  background: "white",
  padding: "20px",
  borderRadius: "8px",
};

const sidebar = {
  position: "fixed" as const,
  top: 0,
  right: 0,
  width: "320px",
  height: "100%",
  background: "white",
  padding: "20px",
  boxShadow: "-4px 0 10px rgba(0,0,0,0.1)",
  zIndex: 1000,
};

const closeBtn = {
  float: "right",
  fontSize: "20px",
  background: "none",
  border: "none",
  cursor: "pointer",
};

const modalBg = {
  position: "fixed" as const,
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const modal = {
  background: "white",
  padding: "30px",
  width: "300px",
  borderRadius: "8px",
};

const input = {
  width: "100%",
  padding: "8px",
  marginBottom: "10px",
};
