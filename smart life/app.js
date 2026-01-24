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
    orders: "Pending Orders",
    reviewsSection: "Reviews / Bug Reports",
    name: "Name",
    product: "Product",
    type: "Type",
    review: "Review",
    bug: "Report Error",
    message: "Message",
    submit: "Submit",
    selectProduct: "--Select--"
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
    orders: "الطلبات المعلقة",
    reviewsSection: "التقييمات / الإبلاغ عن الأخطاء",
    name: "الاسم",
    product: "المنتج",
    type: "النوع",
    review: "تقييم",
    bug: "الإبلاغ عن خطأ",
    message: "الرسالة",
    submit: "إرسال",
    selectProduct: "--اختر--"
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
  populateReviewProducts();
  renderReviews();
}

function toggleTheme() {
  document.body.classList.toggle("dark");
}

// ===== LocalStorage Helpers =====
function save(key, value) { localStorage.setItem(key, JSON.stringify(value)); }
function load(key) { return JSON.parse(localStorage.getItem(key) || "[]"); }

// ===== Products =====
let products = load("products");
if (products.length === 0) {
  products = [
    { id:1, name:{en:"Tapo 2K Outdoor Camera", ar:"كاميرا تابو 2K خارجية IP66"}, price:2800 },
    { id:2, name:{en:"Tapo C100 Indoor Camera", ar:"كاميرا تابو C100 داخلية برؤية ليلية"}, price:1100 },
    { id:3, name:{en:"Tapo Indoor", ar:"كاميرا تابو داخلية"}, price:1330 },
    { id:4, name:{en:"Baby Monitor", ar:"جهاز مراقبة الأطفال"}, price:4400 },
    { id:5, name:{en:"Solar Panel Security Camera Outdoor 2K", ar:"كاميرا أمان شمسية خارجية 2K"}, price:7300 },
    { id:6, name:{en:"Ring Weatherproof Doorbell Camera", ar:"كاميرا جرس الباب رينغ مقاومة للطقس"}, price:7800 },
    { id:7, name:{en:"Tap Battery Doorbell Camera Wireless", ar:"كاميرا جرس تاب لاسلكية"}, price:4500 },
    { id:8, name:{en:"Ring Video Doorbell", ar:"جرس فيديو رينغ"}, price:4000 },
    { id:9, name:{en:"EUFY Doorbell Camera", ar:"كاميرا جرس Eufy"}, price:3900 }
    // Add remaining products similarly...
  ];
  save("products", products);
}

// ===== Cart =====
let cart = load("cart");

// ===== Render Products =====
function renderProducts() {
  const container = document.getElementById("products");
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
  const productObj = products.find(p=>p.id===id);
  const product = {...productObj, install};
  cart.push(product);
  save("cart", cart);
  renderCart();
}

function removeFromCart(index) {
  cart.splice(index,1);
  save("cart", cart);
  renderCart();
}

function renderCart() {
  const div = document.getElementById("cartItems");
  div.innerHTML = "";
  let total = 0;
  cart.forEach((item,i)=>{
    const price = item.price + (item.install?200:0);
    total += price;
    const itemDiv = document.createElement("div");
    itemDiv.className="cart-item";
    itemDiv.innerHTML=`${item.name[lang]} - ${price} LE
      <button onclick="removeFromCart(${i})">X</button>`;
    div.appendChild(itemDiv);
  });
  const totalEl = document.getElementById("total");
  totalEl.innerText = translations[lang].total + ": " + total + " LE";
}

function checkout() {
  if(cart.length===0) return alert("Cart is empty");
  alert("Order placed! Payment in cash only.");
  cart=[];
  save("cart", cart);
  renderCart();
}

// ===== Reviews / Bug Reports =====
let reviews = load("reviews");

function populateReviewProducts() {
  const select = document.getElementById("reviewProduct");
  select.innerHTML=`<option value="">${translations[lang].selectProduct}</option>`;
  products.forEach(p=>{
    const option = document.createElement("option");
    option.value=p.id;
    option.textContent=p.name[lang];
    select.appendChild(option);
  });
}

function submitReview() {
  const name = document.getElementById("reviewName").value;
  const productId = parseInt(document.getElementById("reviewProduct").value);
  const message = document.getElementById("reviewMessage").value;
  const type = document.querySelector('input[name="reviewType"]:checked')?.value || "review";
  if(!name || !message || !productId) return alert("Fill all fields");
  const review={name, productId, message, type, date:new Date().toISOString()};
  reviews.push(review);
  save("reviews", reviews);
  renderReviews();
  alert("Thank you for your " + type + "!");
  document.getElementById("reviewForm").reset();
}

function renderReviews() {
  const container = document.getElementById("reviewList");
  container.innerHTML = "";
  reviews.forEach(r=>{
    const product = products.find(p=>p.id===r.productId);
    const div = document.createElement("div");
    div.className="review";
    div.innerHTML=`<strong>${r.name}</strong> (${r.type}) - ${new Date(r.date).toLocaleString()}<br>
      <em>${product?product.name[lang]:"Unknown Product"}</em><br>${r.message}`;
    container.appendChild(div);
  });
}

// ===== Initial Rendering =====
window.onload = ()=>{
  renderProducts();
  renderCart();
  populateReviewProducts();
  renderReviews();
};
