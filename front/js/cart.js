let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

//cartDisplay ();

orderProducts();

function orderProducts() {
    return fetch(`http://localhost:3000/api/products/`)
        .then(function(httpBodyResponse) {
          return httpBodyResponse.json()
        })
        .then(function(products) {
          //displayProduct(products)
        })
        .catch(function(error) {
            alert(error)
        })
}

displayProduct(cart);

function displayProduct(cart) {
  
  for (let i = 0; i < cart.length; i++) {
    let product = cart[i];
  document.getElementById("cart__items").innerHTML +=`
    <article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
      <div class="cart__item__img">
        <img src="${cart[i].imageUrl}" alt="${cart[i].altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${cart[i].name}</h2>
            <p>${cart[i].color}</p>
            <p>${cart[i].price}</p>
        </div>
      <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
          <p>Qté : ${cart[i].quantity} </p>
          <input type="number" data-id="${cart[i].id}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
      </div>
      </div>
      </div>
    </article>`;
  }
}

for (let i = 0; i < cart.length; i++) {

  document.getElementById("cart__items").innerHTML +=`
    <article class="cart__item" data-id="${cart[i].id}" data-color="${cart[i].color}">
    <div class="cart__item__img">
      <img src="${cart[i].imageUrl}" alt="${cart[i].altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
          <h2>${cart[i].name}</h2>
          <p>${cart[i].color}</p>
          <p>${cart[i].price}</p>
      </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
        <p>Qté :  </p>
        <input type="number" data-id="${cart[i].id}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
    </div>
    </div>
    </div>
    </article>`;

}

/* 1 - Au clic sur supprimer mettre à jour le localStorage & l'affichage
   2 - Récupérer dans l'API le prix de chaque canapé
   3 - Montant commande qui s'affiche
   4 - Modification manuelle des quantités dans le panier avec màj du côté Storage
   5 - Formulaire Regex à chaque champ
   6 - Récupérer valeur d'un champ Regex - Quoi faire si true/false






/* 1 - Tu dois d'abord récupérer ton panier sous la forme d'un tableau javascript, depuis le localStorage
2 - Dans ton panier, tu auras plein de commandes. Tu vas devoir les traiter individuellement, donc faire 
une boucle for dans laquelle tu pourras déclarer une variable pour la commande en cours de traitement.
3 - De cette commande, tu peux récupérer l'id du produit. Et donc, récupérer toutes les informations 
complètes du produit en le demandant à ton serveur (avec un fetch, comme tu as fait dans product.js)
4 - Une fois que tu as tes deux variables order et product, tu as tout ce qu'il faut pour afficher 
les informations dans ta méthode displayProduct (l'image, le nom, la couleur, etc.) Attention, tu 
vas avoir des informations à récupérer à partir de la commande et d'autres à partir du produit. */