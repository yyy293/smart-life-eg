// ====== Language & Theme ======
let lang = 'en';
const translations = {
  en: { products: "Products", cart: "Cart", install: "Add installation (+200 LE per item)", payment: "Payment: Cash only", add: "Add to cart", approve: "Approve", reject: "Reject" },
  ar: { products: "المنتجات", cart: "سلة الشراء", install: "إضافة تركيب (+200 جنيه لكل منتج)", payment: "الدفع: نقدًا فقط", add: "أضف إلى السلة", approve: "قبول", reject: "رفض" }
};

function setLang(l) {
  lang = l;
  document.documentElement.lang = l;
  document.body.dir = l==='ar'?'rtl':'ltr';
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    el.innerText = translations[l][el.dataset.i18n];
  });
  renderProducts();
  renderCart();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

// ====== LocalStorage Helpers ======
function save(key, value){ localStorage.setItem(key, JSON.stringify(value)); }
function load(key){ return JSON.parse(localStorage.getItem(key) || "[]"); }

// ====== Users ======
let users = load("users");
let user = localStorage.getItem("user");
let role = localStorage.getItem("role");

// ====== Products ======
let products = load("products");
if(products.length===0){
  products = [
    { id: 1, name: "Tapo 2K Outdoor Camera", price: 2800 },
    { id: 2, name: "Tapo C100 Indoor Camera", price: 1100 },
    { id: 3, name: "Tapo Indoor", price: 1330 },
    { id: 4, name: "Baby Monitor", price: 4400 },
    { id: 5, name: "Solar Panel Security Camera Outdoor 2K", price: 7300 },
    { id: 6, name: "Ring Weatherproof Doorbell Camera", price: 7800 },
    { id: 7, name: "Tap Battery Doorbell Camera Wireless", price: 4500 },
    { id: 8, name: "Ring Video Doorbell", price: 4000 },
    { id: 9, name: "EUFY Doorbell Camera", price: 3900 },
    { id: 10, name: "Cloud LED Ceiling 15m", price: 1100 },
    { id: 11, name: "LED RGB Strip Light 15m", price: 3200 },
    { id: 12, name: "Night Floor Lamp Light Sensor", price: 300 },
    { id: 13, name: "Smart Water Valve", price: 2200 },
    { id: 14, name: "Smart Curtain Shutter", price: 1700 },
    { id: 15, name: "Smart Switch Pack of Three", price: 1440 },
    { id: 16, name: "NIO Smart Plug", price: 820 },
    { id: 17, name: "Wi-Fi Open and Close Sensor", price: 750 },
    { id: 18, name: "Smart Wall Panel", price: 1770 },
    { id: 19, name: "Smart IR", price: 800 },
    { id: 20, name: "Smart Lightbulb", price: 900 },
    { id: 21, name: "Son Off Switch", price: 600 },
    { id: 22, name: "Screen Wall Switch", price: 3300 },
    { id: 23, name: "LED TV Back Sink", price: 8000 },
    { id: 24, name: "Switch Bot Attachment", price: 2900 },
    { id: 25, name: "Echo Show 8in", price: 13000 },
    { id: 26, name: "Echo Spot 2024", price: 5000 },
    { id: 27, name: "Echo Spot 2017", price: 5500 },
    { id: 28, name: "Echo Pop Black 1st Gen", price: 3500 },
    { id: 29, name: "Echo Pop Purple 1st Gen", price: 3600 },
    { id: 30, name: "Echo Show 5th Gen", price: 8300 },
    { id: 31, name: "Alexa Echo Dot 5th Gen", price: 5000 }
  ];
  save("products", products);
}

// ====== Cart ======
let cart = load("cart");

// ====== Login & SignUp ======
function signup(){
  const email=document.getElementById("email").value;
  const username=document.getElementById("username").value;
  const password=document.getElementById("password").value;
  const isOperator=document.getElementById("isOperator").checked;

  if(!email||!username||!password) return alert("Fill all fields");
  
  const exists = users.find(u=>u.email===email);
  if(exists) return alert("Email exists");

  let newUser = {email, username, password, role:isOperator?"pending":"customer"};
  users.push(newUser);
  save("users", users);
  alert("Signed up! "+(isOperator?"Pending approval by admin":"You can login now"));
}

function login(){
  const email=document.getElementById("email").value;
  const password=document.getElementById("password").value;
  const found = users.find(u=>u.email===email && u.password===password);
  if(!found) return alert("Wrong credentials");
  localStorage.setItem("user", found.username);
  localStorage.setItem("role", found.role==="pending"?"customer":found.role);
  if(found.role==="admin") window.location="admin.html";
  else if(found.role==="operator") window.location="operator.html";
  else window.location="products.html";
}

// ====== Render Products ======
function renderProducts(){
  const container=document.getElementById("products");
  if(!container) return;
  container.innerHTML="";
  products.forEach(p=>{
    const div=document.createElement("div");
    div.className="product";
    div.innerHTML=`<strong>${p.name}</strong><br>${p.price} LE
      <button onclick="addToCart(${p.id})">${translations[lang].add}</button>`;
    container.appendChild(div);
  });
}

// ====== Cart Functions ======
function addToCart(id){
  cart.push(products.find(p=>p.id===id));
  save("cart", cart);
  renderCart();
}

function removeFromCart(index){
  cart.splice(index,1);
  save("cart", cart);
  renderCart();
}

function renderCart(){
  const div=document.getElementById("cartItems");
  if(!div) return;
  div.innerHTML="";
  const install=document.getElementById("installCheck")?.checked;
  let total=0;
  cart.forEach((item,i)=>{
    let price=item.price+(install?200:0);
    total+=price;
    const itemDiv=document.createElement("div");
    itemDiv.className="cart-item";
    itemDiv.innerHTML=`${item.name} - ${price} LE <button onclick="removeFromCart(${i})">X</button>`;
    div.appendChild(itemDiv);
  });
  const totalEl=document.getElementById("total");
  if(totalEl) totalEl.innerText="Total: "+total+" LE";
}

// ====== Admin Functions ======
function renderAdminProducts(){
  const container=document.getElementById("adminProducts");
  if(!container) return;
  container.innerHTML="";
  products.forEach((p,i)=>{
    const div=document.createElement("div");
    div.className="admin-product";
    div.innerHTML=`${p.name} - ${p.price} LE
      <button onclick="removeProduct(${i})">Remove</button>`;
    container.appendChild(div);
  });
}

function addProduct(){
  const name=document.getElementById("newName").value;
  const price=parseInt(document.getElementById("newPrice").value);
  if(!name||!price) return alert("Fill fields");
  products.push({id:products.length+1,name,price});
  save("products",products);
  renderAdminProducts();
}

function removeProduct(i){
  products.splice(i,1);
  save("products",products);
  renderAdminProducts();
}

// ====== Operator Requests ======
function renderOperatorRequests(){
  const container=document.getElementById("operatorRequests");
  if(!container) return;
  const pending = users.filter(u=>u.role==="pending");
  container.innerHTML="";
  pending.forEach((u,i)=>{
    const div=document.createElement("div");
    div.className="operator-request";
    div.innerHTML=`${u.username} (${u.email}) 
      <button onclick="approveOperator(${i})">${translations[lang].approve}</button>
      <button onclick="rejectOperator(${i})">${translations[lang].reject}</button>`;
    container.appendChild(div);
  });
}

function approveOperator(i){
  let pending = users.filter(u=>u.role==="pending");
  let userObj = pending[i];
  userObj.role="operator";
  let index=users.findIndex(u=>u.email===userObj.email);
  users[index]=userObj;
  save("users",users);
  renderOperatorRequests();
}

function rejectOperator(i){
  let pending = users.filter(u=>u.role==="pending");
  let userObj = pending[i];
  users = users.filter(u=>u.email!==userObj.email);
  save("users",users);
  renderOperatorRequests();
}

// ====== Operator Orders ======
function renderOperatorOrders(){
  const container=document.getElementById("orders");
  if(!container) return;
  container.innerHTML="<p>No orders yet.</p>"; // Future: Extend to real orders
}

