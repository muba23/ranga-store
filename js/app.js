const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  // const url = `https://raw.githubusercontent.com/biswajitdasme/fakestore/main/db.json?fbclid=IwAR2YuQxzKXG6MF2AysSIPa5FGM_7AYFb7wxjnsKuOmv6HGTO9Ft8pl3KFq8`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = products => {
     const allProducts = products.map((pd) => pd);
     for (const product of allProducts) {
            const image = product.image; //image problem solved here
            const div = document.createElement("div");
            div.classList.add("product");
            div.innerHTML = `
                <div class=" card rounded-3 single-product bg-success bg-opacity-10">
                    <div>
                      <img class="product-image" src=${image}></img>
                    </div>
                    <h3>${product.title}</h3>
                    <p>Category: ${product.category}</p>
                    <h3 class="text-dark"><span class="text-success fw-bold">Customer reviews</span> <br><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star text-warning"></i><i class="fas fa-star-half-alt text-warning"></i> ${product.rating.rate} out of 5 <br> ${product.rating.count} customer ratings</h3>
                    <h2>Price: $ ${product.price}</h2>
                    <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn fw-bolder" style="background-color: #0080ff; color: white">Add to cart</button>
                    <button id="details-btn" class="btn fw-bolder" style="background-color:#d22d2d;color:white">Details</button>
                </div>
            `;
          document.getElementById("all-products").appendChild(div);
  }
};

let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal(); //updateTotal function added
};

const getInputValue = id => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = parseFloat(total).toFixed(2); //price is fixed to 2 decimal place
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = Math.round(value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") + getInputValue("total-tax");
  const grandTotalFloat = parseFloat(grandTotal).toFixed(2);
  document.getElementById("total").innerText = grandTotalFloat;
};
