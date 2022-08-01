orderProducts()

function orderProducts() {
    return fetch(`http://localhost:3000/api/products/`)
        .then(function(httpBodyResponse) {
          return httpBodyResponse.json()
        })
        .then(function(products) {
          displayProduct(products)
        })
        .catch(function(error) {
            alert(error)
        })
}

function displayProduct(products) {
  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    document.getElementById("items").innerHTML +=`
      <article class="cart__item" data-id="${product_id}" data-color="${product-color}">
        <div class="cart__item__img">
          <img src="${product.imageUrl}" alt="${product.altTxt}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p>${product.price}</p>
        </div>
        <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
            <p>Qté : ${product.quantity} </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
        </div>
        </div>
        </div>
      </article>`
  }
}

const prenom = document.getElementById('prenom');
