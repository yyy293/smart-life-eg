import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "../IMG_1324.jpeg";

export default function Home() {
  const [cartOpen,setCartOpen] = useState(false);
  const [cartItems,setCartItems] = useState([]);
  const [showLogin,setShowLogin] = useState(false);
  const [loginMode,setLoginMode] = useState("login");
  const [operatorMode,setOperatorMode] = useState(false);
  const [operatorEmail,setOperatorEmail] = useState("");
  const [showProducts,setShowProducts] = useState(false);
  const [fade,setFade] = useState(false);

  useEffect(()=>{setFade(true)},[]);

  const products = [
    // Cameras
    {id:1,name:"Tapo 2k outdoor ip 66",price:2800,category:"Cameras"},
    {id:2,name:"Tapo c100 indoor night vision",price:1100,category:"Cameras"},
    {id:3,name:"Tapo indoor",price:1330,category:"Cameras"},
    {id:4,name:"Baby monitor",price:4400,category:"Cameras"},
    {id:5,name:"Solar panel security camera outdoor 2K 66",price:7300,category:"Cameras"},
    {id:6,name:"Ring weatherproof doorbell camera",price:7800,category:"Cameras"},
    {id:7,name:"Tap battery doorbell camera wireless",price:4500,category:"Cameras"},
    {id:8,name:"Ring video doorbell",price:4000,category:"Cameras"},
    {id:9,name:"EUFY doorbell camera",price:3900,category:"Cameras"},

    // Decor
    {id:10,name:"Cloud led ceiling 15m",price:1100,category:"Decor"},
    {id:11,name:"Led rgb strip light 15m",price:3200,category:"Decor"},
    {id:12,name:"Night floor lamp light sensor",price:300,category:"Decor"},

    // Smart Devices
    {id:13,name:"Smartwater valve",price:2200,category:"Smart Devices"},
    {id:14,name:"Smart curtain shutter",price:1700,category:"Smart Devices"},
    {id:15,name:"Smart switch pack of three",price:1440,category:"Smart Devices"},
    {id:16,name:"NIO smart plug",price:820,category:"Smart Devices"},
    {id:17,name:"Wi-Fi open and close sensor",price:750,category:"Smart Devices"},
    {id:18,name:"Smart wall panel",price:1770,category:"Smart Devices"},
    {id:19,name:"Smart ir",price:800,category:"Smart Devices"},
    {id:20,name:"Smart lightbulb",price:900,category:"Smart Devices"},
    {id:21,name:"Son off switch",price:600,category:"Smart Devices"},
    {id:22,name:"Screen wall switch",price:3300,category:"Smart Devices"},
    {id:23,name:"Led tv back sink",price:8000,category:"Smart Devices"},
    {id:24,name:"Switch bot attachment",price:2900,category:"Smart Devices"},

    // Alexa
    {id:25,name:"Echo show 8in",price:13000,category:"Alexa"},
    {id:26,name:"Echo spot 2024",price:5000,category:"Alexa"},
    {id:27,name:"Echo spot 2017",price:5500,category:"Alexa"},
    {id:28,name:"Echo pop black 1st gen",price:3500,category:"Alexa"},
    {id:29,name:"Echo pop purple 1st gen",price:3600,category:"Alexa"},
    {id:30,name:"Echo show 5th gen",price:8300,category:"Alexa"},
    {id:31,name:"Alexa echo dot 5th gen",price:5000,category:"Alexa"},
  ];

  const addToCart = (p)=>{
    const exists = cartItems.find(c=>c.id===p.id);
    if(exists) setCartItems(cartItems.map(c=>c.id===p.id?{...c,qty:c.qty+1}:c));
    else setCartItems([...cartItems,{...p,qty:1}]);
    setCartOpen(true);
  };

  const removeFromCart = (id)=>setCartItems(cartItems.filter(c=>c.id!==id));
  const total = cartItems.reduce((sum,i)=>sum+i.price*i.qty,0);

  const handleOperator = async ()=>{
    try{
      const res = await fetch("/api/operator-request",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:operatorEmail})});
      const data = await res.json();
      alert(data.message);
      setShowLogin(false);
      setOperatorMode(false);
    }catch(err){alert("Failed");}
  };

  return (
    <div style={{fontFamily:"Arial, sans-serif",background:"#f0f4f8",minHeight:"100vh",transition:"opacity 1s",opacity:fade?1:0}}>

      {/* NAVBAR */}
      <header style={{background:"#001f3f",color:"white",padding:"15px 30px",display:"flex",alignItems:"center"}}>
        <h1>Smart Life</h1>
        <nav style={{marginLeft:"auto",display:"flex",gap:"15px",alignItems:"center"}}>
          <button onClick={()=>setCartOpen(true)} style={{color:"white",background:"none",border:"none",cursor:"pointer"}}>Cart</button>
          <button onClick={()=>{setShowLogin(true);setLoginMode("login");setOperatorMode(false)}} style={{color:"white",background:"none",border:"none",cursor:"pointer"}}>Login</button>
          <button onClick={()=>{setShowLogin(true);setLoginMode("signup");setOperatorMode(false)}} style={{color:"white",background:"none",border:"none",cursor:"pointer"}}>Sign Up</button>
          <div style={{width:50,height:50,position:"relative"}}><Image src={logo} alt="Logo" fill/></div>
        </nav>
      </header>

      {/* HERO */}
      <section style={{padding:"120px 20px",textAlign:"center",background:"#e0e6ef"}}>
        <h2 style={{fontSize:"48px"}}>Welcome to Smart Life</h2>
        <p style={{fontSize:"20px",maxWidth:"900px",margin:"auto"}}>We design smart homes and innovative gadgets to make your life easier.</p>
        <button onClick={()=>setShowProducts(true)} style={{
          marginTop:"20px",padding:"10px 20px",background:"#001f3f",color:"white",
          border:"none",cursor:"pointer",transition:"transform 0.3s", fontSize:"16px"
        }}
        onMouseEnter={e=>e.currentTarget.style.transform="scale(1.05)"}
        onMouseLeave={e=>e.currentTarget.style.transform="scale(1)"}>View Products</button>
      </section>

      {/* PRODUCTS MODAL */}
      {showProducts && (
        <div style={{
          position:"fixed",top:0,left:0,width:"100%",height:"100%",
          backdropFilter:"blur(4px)",background:"rgba(0,0,0,0.6)",
          overflowY:"auto",zIndex:1000,animation:"fadeIn 0.5s"
        }}>
          <div style={{background:"white",padding:"20px",borderRadius:"10px",maxWidth:"900px",margin:"50px auto"}}>
            <button onClick={()=>setShowProducts(false)} style={{float:"right",cursor:"pointer"}}>X</button>
            <h2>Products</h2>
            <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"15px"}}>
              {products.map((p,i)=>(
                <div key={p.id} style={{
                  background:"#f9f9f9",padding:"10px",borderRadius:"5px",
                  transition:"transform 0.3s, box-shadow 0.3s, opacity 0.5s",
                  cursor:"pointer",
                  opacity:0,
                  animation:`fadeInCard 0.5s ease forwards ${i*0.1}s`
                }}
                onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-5px)"; e.currentTarget.style.boxShadow="0 4px 15px rgba(0,0,0,0.2)"}}
                onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="none"}}
                >
                  <h4>{p.name}</h4>
                  <p>{p.price} LE</p>
                  <button onClick={()=>addToCart(p)} style={{
                    background:"#001f3f",color:"white",border:"none",padding:"5px 10px",cursor:"pointer",
                    transition:"background 0.3s"
                  }}
                  onMouseEnter={e=>e.currentTarget.style.background="#003366"}
                  onMouseLeave={e=>e.currentTarget.style.background="#001f3f"}>Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CART SIDEBAR */}
      <div style={{
        position:"fixed",top:0,right:cartOpen?0:"-350px",width:"300px",height:"100vh",
        background:"white",padding:"20px",transition:"right 0.5s",boxShadow:"-2px 0 15px rgba(0,0,0,0.3)",backdropFilter:"blur(2px)"
      }}>
        <button onClick={()=>setCartOpen(false)} style={{marginBottom:"20px",cursor:"pointer"}}>X</button>
        <h2>Your Cart</h2>
        {cartItems.length===0?<p>Empty</p>:(
          <>
            {cartItems.map(i=>(
              <div key={i.id} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"5px"}}>
                <span>{i.name} x{i.qty}</span>
                <span>{i.price*i.qty} LE</span>
                <button onClick={()=>removeFromCart(i.id)} style={{background:"red",color:"white",border:"none",borderRadius:"3px",padding:"0 5px",cursor:"pointer"}}>X</button>
              </div>
            ))}
            <hr/>
            <p><strong>Total: {total} LE</strong></p>
            <p style={{color:"red"}}>Payment in cash only</p>
          </>
        )}
      </div>

      {/* LOGIN/SIGNUP MODAL */}
      {showLogin && (
        <div style={{position:"fixed",top:0,left:0,width:"100%",height:"100%",background:"rgba(0,0,0,0.6)",display:"flex",justifyContent:"center",alignItems:"center",animation:"fadeIn 0.5s"}}>
          <div style={{background:"white",padding:"30px",borderRadius:"10px",width:"350px",position:"relative"}}>
            <button onClick={()=>setShowLogin(false)} style={{position:"absolute",top:"10px",right:"15px",cursor:"pointer"}}>X</button>
            <div style={{display:"flex",justifyContent:"space-around",marginBottom:"20px"}}>
              <button onClick={()=>{setLoginMode("login");setOperatorMode(false)}} style={{borderBottom:loginMode==="login"?"2px solid #001f3f":"none"}}>Login</button>
              <button onClick={()=>{setLoginMode("signup");setOperatorMode(false)}} style={{borderBottom:loginMode==="signup"?"2px solid #001f3f":"none"}}>Sign Up</button>
            </div>
            <p>If you are/want operator click <span style={{color:"#001f3f",cursor:"pointer"}} onClick={()=>setOperatorMode(true)}>here</span></p>
            <div style={{display:"flex",flexDirection:"column",gap:"10px"}}>
              <input type="email" placeholder="Email" value={operatorEmail} onChange={e=>setOperatorEmail(e.target.value)}/>
              {!operatorMode && <input type="text" placeholder="Username"/>}
              <input type="password" placeholder="Password"/>
              {operatorMode && <p style={{color:"red"}}>Request sent to smart.life.www@gmail.com</p>}
              <button onClick={()=>operatorMode?handleOperator():setShowLogin(false)} style={{background:"#001f3f",color:"white",padding:"8px 0",cursor:"pointer"}}> {operatorMode?"Request Operator":"Submit"} </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn { from {opacity:0} to {opacity:1} }
        @keyframes fadeInCard { from {opacity:0; transform:translateY(10px)} to {opacity:1; transform:translateY(0)} }
      `}</style>
    </div>
  );
}
