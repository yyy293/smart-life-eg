const products=[
 // Cameras
 {n:"Tapo 2K Outdoor IP66",p:2800},
 {n:"Tapo C100 Indoor Night Vision",p:1100},
 {n:"Tapo Indoor Camera",p:1330},
 {n:"Baby Monitor",p:4400},
 {n:"Solar Panel Security Camera 2K",p:7300},
 {n:"Ring Weatherproof Doorbell",p:7800},
 {n:"Tap Battery Doorbell",p:4500},
 {n:"Ring Video Doorbell",p:4000},
 {n:"EUFY Doorbell Camera",p:3900},

 // Decor
 {n:"Cloud LED Ceiling 15m",p:1100},
 {n:"RGB LED Strip Light 15m",p:3200},
 {n:"Night Floor Lamp Light Sensor",p:300},

 // Smart Devices
 {n:"Smart Water Valve",p:2200},
 {n:"Smart Curtain Shutter",p:1700},
 {n:"Smart Switch (3 Pack)",p:1440},
 {n:"NIO Smart Plug",p:820},
 {n:"Wi-Fi Open/Close Sensor",p:750},
 {n:"Smart Wall Panel",p:1770},
 {n:"Smart IR Controller",p:800},
 {n:"Smart Light Bulb",p:900},
 {n:"Sonoff Switch",p:600},
 {n:"Screen Wall Switch",p:3300},
 {n:"LED TV Back Sync",p:8000},
 {n:"SwitchBot Attachment",p:2900},

 // Alexa
 {n:"Echo Show 8",p:13000},
 {n:"Echo Spot 2024",p:5000},
 {n:"Echo Spot 2017",p:5500},
 {n:"Echo Pop Black",p:3500},
 {n:"Echo Pop Purple",p:3600},
 {n:"Echo Show 5",p:8300},
 {n:"Echo Dot 5th Gen",p:5000}
];

let cart=JSON.parse(localStorage.getItem("cart")||"{}");

function renderProducts(list=products){
 const el=document.getElementById("products");
 if(!el) return;
 el.innerHTML=list.map(p=>`
  <div class="card">
   <h3>${p.n}</h3>
   <p>${p.p} LE</p>
   <button onclick="add('${p.n}',${p.p})">Add to Cart</button>
  </div>
 `).join("");
}

function add(n,p){
 cart[n]?cart[n].q++:cart[n]={p,q:1};
 save();
}

function save(){
 localStorage.setItem("cart",JSON.stringify(cart));
 updateCartCount();
}

function updateCartCount(){
 const c=document.getElementById("cartCount");
 if(c){
  let t=0; for(let k in cart)t+=cart[k].q;
  c.innerText=t;
 }
}

function renderCart(){
 const el=document.getElementById("cartItems");
 if(!el) return;
 let total=0; el.innerHTML="";
 for(let k in cart){
  total+=cart[k].p*cart[k].q;
  el.innerHTML+=`<p>${k} x ${cart[k].q}</p>`;
 }
 document.getElementById("total").innerText=total;
}

function checkout(){
 alert("Order confirmed – Cash on delivery");
 localStorage.removeItem("cart");
 location.href="index.html";
}

function searchProducts(v){
 renderProducts(products.filter(p=>p.n.toLowerCase().includes(v.toLowerCase())));
}

renderProducts();
renderCart();
updateCartCount();

