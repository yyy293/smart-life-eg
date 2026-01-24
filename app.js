// LANGUAGE
let lang=localStorage.getItem("lang")||"en";
function applyLang(){
 document.querySelectorAll("[data-en]").forEach(el=>{
  el.innerText=el.dataset[lang];
 });
 document.documentElement.dir=lang==="ar"?"rtl":"ltr";
}
function toggleLang(){
 lang=lang==="en"?"ar":"en";
 localStorage.setItem("lang",lang);
 applyLang();
}

// THEME
let theme=localStorage.getItem("theme")||"light";
function toggleTheme(){
 theme=theme==="light"?"dark":"light";
 localStorage.setItem("theme",theme);
 document.body.className=theme==="dark"?"dark":"";
}
if(theme==="dark")document.body.classList.add("dark");

// PRODUCTS
let defaultProducts=[
 {name:"Tapo Outdoor 2K",price:2800},
 {name:"RGB LED Strip 15m",price:3200},
 {name:"Smart IR",price:800},
 {name:"Echo Dot 5th Gen",price:5000}
];
let products=JSON.parse(localStorage.getItem("products"))||defaultProducts;

// CART
let cart=JSON.parse(localStorage.getItem("cart"))||{};
function addToCart(i){
 let p=products[i];
 cart[p.name]=cart[p.name]||{price:p.price,qty:0};
 cart[p.name].qty++;
 saveCart();
}
function removeFromCart(n){delete cart[n];saveCart();}
function saveCart(){
 localStorage.setItem("cart",JSON.stringify(cart));
 renderCart();updateCartCount();
}
function updateCartCount(){
 let c=document.getElementById("cartCount");
 if(!c)return;
 let t=0;for(let k in cart)t+=cart[k].qty;
 c.innerText=t;
}

// RENDER
function renderProducts(list=products){
 let el=document.getElementById("products");
 if(!el)return;
 el.innerHTML=list.map((p,i)=>`
 <div class="card">
  <h3>${p.name}</h3>
  <p>${p.price} LE</p>
  <button onclick="addToCart(${i})">
   ${lang==="en"?"Add to Cart":"إضافة للسلة"}
  </button>
 </div>`).join("");
}
function renderCart(){
 let el=document.getElementById("cartItems");
 if(!el)return;
 let total=0;el.innerHTML="";
 for(let k in cart){
  total+=cart[k].price*cart[k].qty;
  el.innerHTML+=`
   <div>${k} x ${cart[k].qty}
   <button onclick="removeFromCart('${k}')">❌</button></div>`;
 }
 let t=document.getElementById("total");
 if(t)t.innerText=total+" LE";
}
function searchProducts(v){
 renderProducts(products.filter(p=>p.name.toLowerCase().includes(v.toLowerCase())));
}

// ADMIN
function adminAddProduct(){
 let n=adminName.value,p=adminPrice.value;
 if(!n||!p)return;
 products.push({name:n,price:+p});
 localStorage.setItem("products",JSON.stringify(products));
 renderProducts();renderAdminProducts();
}
function adminRemoveProduct(i){
 products.splice(i,1);
 localStorage.setItem("products",JSON.stringify(products));
 renderProducts();renderAdminProducts();
}
function renderAdminProducts(){
 let el=document.getElementById("adminProducts");
 if(!el)return;
 el.innerHTML=products.map((p,i)=>`
  <div class="card">${p.name} - ${p.price}
  <button onclick="adminRemoveProduct(${i})">❌</button></div>`).join("");
}

// INIT
applyLang();
renderProducts();
renderCart();
renderAdminProducts();
updateCartCount();
