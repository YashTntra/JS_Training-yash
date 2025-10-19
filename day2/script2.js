const productSection = document.getElementById("product-section");
const subtotalCell = document.getElementById("subtotal-cell");
const subtotalRow = document.getElementById("subtotal-row");
const quantityDiscount = document.getElementById("discount-field");
const priceDiscount = document.getElementById("pricediscount-field");
const finalTotal = document.getElementById("finaltotal-field");

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => displayProducts(data));

let cart = {};

function displayProducts(data) {
  data.forEach((product) => {
    const pCard = document.createElement("div");
    pCard.classList.add("product-card");

    const img = document.createElement("img");
    img.src = product.image;

    const name = document.createElement("h4");
    name.textContent = product.title;

    const price = document.createElement("p");
    price.textContent = `Price: ₹${product.price}`;

    const addBtn = document.createElement("button");
    addBtn.textContent = "Add to Cart";
    addBtn.addEventListener("click", () => addToCart(product));

    pCard.appendChild(img);
    pCard.appendChild(name);
    pCard.appendChild(price);
    pCard.appendChild(addBtn);

    productSection.appendChild(pCard);
  });
}

function addToCart(product) {
  if (cart[product.id]) {
    cart[product.id].quantity += 1;
  } else {
    cart[product.id] = {
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1,
    };
  }
  showCart();
  calculateCart();
}

function removeFromCart(id) {
  if (cart[id]) {
    cart[id].quantity -= 1;

    // remove product if quantity becomes 0
    if (cart[id].quantity <= 0) {
      delete cart[id];
    }

    showCart();
    calculateCart();
  }
}

function showCart() {
  // remove old rows (except subtotal)
  const oldRows = document.querySelectorAll(".cart-item");
  oldRows.forEach((row) => row.remove());

  // create new rows
  Object.values(cart).forEach((item) => {
    const row = document.createElement("tr");
    row.classList.add("cart-item");

    const nameCell = document.createElement("td");
    nameCell.textContent = item.title;

    const priceCell = document.createElement("td");
    priceCell.textContent = item.price;

    const qtyCell = document.createElement("td");
    qtyCell.textContent = item.quantity;

    const totalCell = document.createElement("td");
    totalCell.textContent = (item.price * item.quantity).toFixed(2);

    const removeCell = document.createElement("td");
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove-btn");
    removeBtn.addEventListener("click", () => removeFromCart(item.id));

    removeCell.appendChild(removeBtn);

    row.appendChild(nameCell);
    row.appendChild(priceCell);
    row.appendChild(qtyCell);
    row.appendChild(totalCell);
    row.appendChild(removeCell);

    subtotalRow.parentNode.insertBefore(row, subtotalRow);
  });
}

function calculateCart() {
  let subtotal = 0;
  let totalQty = 0;

  Object.values(cart).forEach((item) => {
    subtotal += item.price * item.quantity;
    totalQty += item.quantity;
  });

  let qtyDiscount = 0;
  let priceDiscountVal = 0;

  if (totalQty > 10) qtyDiscount = subtotal * 0.1;
  if (subtotal > 500) priceDiscountVal = subtotal * 0.05;

  const final = subtotal - qtyDiscount - priceDiscountVal;

  subtotalCell.textContent = subtotal.toFixed(2);
  quantityDiscount.textContent = qtyDiscount.toFixed(2);
  priceDiscount.textContent = priceDiscountVal.toFixed(2);
  finalTotal.textContent = final.toFixed(2);
}

