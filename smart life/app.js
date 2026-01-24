// ===== Language & Theme =====
let lang = 'en';
const translations = {
  en: {
    products: "Products",
    cart: "Cart",
    install: "Add installation (+200 LE per item)",
    payment: "Payment: Cash only",
    add: "Add to cart",
    approve: "Approve",
    reject: "Reject",
    total: "Total",
    orders: "Pending Orders"
  },
  ar: {
    products: "المنتجات",
    cart: "سلة الشراء",
    install: "إضافة تركيب (+200 جنيه لكل منتج)",
    payment: "الدفع: نقدًا فقط",
    add: "أضف إلى السلة",
    approve: "قبول",
    reject: "رفض",
    total: "المجموع",
    orders: "الطلبات المعلقة"
  }
};

function setLang(l) {
  lang = l;
  document.documentElement.lang = l;
  document.body.dir = l === 'ar' ? 'rtl' : 'ltr';
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.innerText = translations[l][el.dataset.i18n];
  });
  renderProducts();
  renderCart();
  renderAdminProducts();
  renderOperatorRequests();
  renderOperatorOrders();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

// ===== LocalStorage Helpers =====
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function load(key) { return JSON.parse(localStorage.getItem(key) || "[]"); }

// ===== Users =====
let users = load("users");
let user = localStorage.getItem("user");
let role = localStorage.getItem("role");

// ===== Products =====
let products = load("products");
if (products.length === 0) {
  products = [
    { id: 1, name: { en:"Tapo 2K Outdoor Camera", ar:"كاميرا تابو 2K خارجية IP66" }, price: 2800 },
    { id: 2, name: { en:"Tapo C100 Indoor Camera", ar:"كاميرا تابو C100 داخلية برؤية ليلية" }, price: 1100 },
    { id: 3, name: { en:"Tapo Indoor", ar:"كاميرا تابو داخلية" }, price: 1330 },
    { id: 4, name: { en:"Baby Monitor", ar:"جهاز مراقبة الأطفال" }, price: 4400 },
    { id: 5, name: { en:"Solar Panel Security Camera Outdoor 2K", ar:"كاميرا أمان شمسية خارجية 2K" }, price: 7300 },
    { id: 6, name: { en:"Ring Weatherproof Doorbell Camera", ar:"كاميرا جرس الباب رينغ مقاومة للطقس" }, price: 7800 },
    { id: 7, name: { en:"Tap Battery Doorbell Camera Wireless", ar:"كاميرا جرس تاب لاسلكية" }, price: 4500 },
    { id: 8, name: { en:"Ring Video Doorbell", ar:"جرس فيديو رينغ" }, price: 4000 },
    { id: 9, name: { en:"EUFY Doorbell Camera", ar:"كاميرا جرس Eufy" }, price: 3900 },
    { id: 10, name: { en:"Cloud LED Ceiling 15m", ar:"سقف LED سحابي 15م" }, price: 1100 },
    { id: 11, name: { en:"LED RGB Strip Light 15m", ar:"شريط إضاءة LED RGB 15م" }, price: 3200 },
    { id: 12, name: { en:"Night Floor Lamp Light Sensor", ar:"مصباح أرضي ليلي بمستشعر ضوء" }, price: 300 },
    { id: 13, name: { en:"Smart Water Valve", ar:"صمام مياه ذكي" }, price: 2200 },
    { id: 14, name: { en:"Smart Curtain Shutter", ar:"ستارة ذكية" }, price: 1700 },
    { id: 15, name: { en:"Smart Switch Pack of Three", ar:"حزمة مفاتيح ذكية ثلاثة قطع" }, price: 1440 },
    { id: 16, name: { en:"NIO Smart Plug", ar:"مقبس ذكي NIO" }, price: 820 },
    { id: 17, name: { en:"Wi-Fi Open and Close Sensor", ar:"مستشعر فتح وغلق Wi-Fi" }, price: 750 },
    { id: 18, name: { en:"Smart Wall Panel", ar:"لوحة جدارية ذكية" }, price: 1770 },
    { id: 19, name: { en:"Smart IR", ar:"جهاز ذكي IR" }, price: 800 },
    { id: 20, name: { en:"Smart Lightbulb", ar:"لمبة ذكية" }, price: 900 },
    { id: 21, name: { en:"Son Off Switch", ar:"مفتاح Son Off" }, price: 600 },
    { id: 22, name: { en:"Screen Wall Switch", ar:"مفتاح جداري بشاشة" }, price: 3300 },
    { id: 23, name: { en:"LED TV Back Sink", ar:"إضاءة خلفية LED للتلفاز" }, price: 8000 },
    { id: 24, name: { en:"Switch Bot Attachment", ar:"ملحق Switch Bot" }, price: 2900 },
    { id: 25, name: { en:"Echo Show 8in", ar:"إيكو شو 8 بوصة" }, price: 13000 },
    { id: 26, name: { en:"Echo Spot 2024", ar:"إيكو سبوت 2024" }, price: 5000 },
    { id: 27, name: { en:"Echo Spot 2017", ar:"إيكو سبوت 2017" }, price: 5500 },
    { id: 28, name: { en:"Echo Pop Black 1st Gen", ar:"إيكو بوب أسود الجيل الأول" }, price: 3500 },
    { id: 29, name: { en:"Echo Pop Purple 1st Gen", ar:"إيكو بوب بنفسجي الجيل الأول" }, price: 3600 },
    { id: 30, name: { en:"Echo Show 5th Gen", ar:"إيكو شو الجيل الخامس" }, price: 8300 },
    { id: 31, name: { en:"Alexa Echo Dot 5th Gen", ar:"أليكسا إيكو دوت الجيل الخامس" }, price: 5000 }
  ];
  save("products", products);
}

// ===== Cart & Orders =====
let cart = load("cart");
let orders = load("orders");

// ===== Login / Signup =====
function signup() {
  const email = document.getElementById("email").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const isOperator = document.getElementById("isOperator")?.checked || false;

  if (!email || !username || !password) return alert("Fill all fields");

  if (users.find(u => u.email === email)) return alert("Email exists");

  let newUser = { email, username, password, role: isOperator ? "pending" : "customer" };
  users.push(newUser);
  save("users", users);
  alert("Signed up! " + (isOperator ? "Pending approval by admin" : "You can login now"));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const found = users.find(u => u.email === email && u.password === password);
  if (!found) return alert("Wrong credentials");

  localStorage.setItem("user", found.username);
  localStorage.setItem("role", found.role === "pending" ? "customer" : found.role);

  if (found.role === "admin") window.location = "admin.html";
  else if (found.role === "operator") window.location = "operator.html";
  else window.location = "products.html";
}

// ===== Render Products =====
function renderProducts() {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = "";
  products.forEach(p => {
    const div = document.createElement("div");
    div.className = "product";
    div.innerHTML = `<strong>${p.name[lang]}</strong><br>${p.price} LE
      <button onclick="addToCart(${p.id})">${translations[lang].add}</button>`;
    container.appendChild(div);
  });
}

// ===== Cart Functions =====
function addToCart(id) {
  const install = document.getElementById("installCheck")?.checked || false;
  const productObj = products.find(p => p.id === id);
  const product = { ...productObj, install };
  cart.push(product);
  save("cart", cart);
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  save("cart", cart);
  renderCart();
}

function renderCart() {
  const div = document.getElementById("cartItems");
  if (!div) return;
  div.innerHTML = "";
  let total = 0;
  cart.forEach((item, i) => {
    const price = item.price + (item.install ? 200 : 0);
    total += price;
    const itemDiv = document.createElement("div");
    itemDiv.className = "cart-item";
    itemDiv.innerHTML = `${item.name[lang]} - ${price} LE
      <button onclick="removeFromCart(${i})">X</button>`;
    div.appendChild(itemDiv);
  });
  const totalEl = document.getElementById("total");
  if (totalEl) totalEl.innerText = translations[lang].total + ": " + total + " LE";
}

function checkout() {
  if (cart.length === 0) return alert("Cart is empty");
  if (!localStorage.getItem("user")) return alert("Please login to place order.");
  const order = { user: localStorage.getItem("user"), items: cart, status: "pending" };
  orders.push(order);
  save("orders", orders);
  cart = [];
  save("cart", cart);
  alert("Order placed successfully!");
  renderCart();
}

// ===== Admin / Operator Functions =====
// renderAdminProducts, addProduct, removeProduct
// renderOperatorRequests, approveOperator, rejectOperator
// renderOperatorOrders, approveOrder, rejectOrder

// These are the same as the previous final app.js
