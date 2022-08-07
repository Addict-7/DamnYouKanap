let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

function delete_product_from_cart(id) {
  let cart = JSON.parse(localStorage['cart']);
  var filteredCart = cart.filter(e => e.product_id != id);
  localStorage.setItem('cart', JSON.stringify(filteredCart));
}

displayCart();

async function displayCart() {
  
  document.getElementById('cart__items').innerHTML = "";
  
  let totalPrice = 0;
  let totalQuantity = 0;
  let cart = JSON.parse(localStorage["cart"]);

    for (let order of cart) {
      await fetch(`http://localhost:3000/api/products/${order.product_id}`)
            .then(function(httpBodyResponse) {
                if (httpBodyResponse.ok) {
                    return httpBodyResponse.json()
                }
            })
            .then(function(product) {
              totalQuantity += order.quantity;
              totalPrice += order.quantity * order.price;
                displayProduct(order, product);
            })
            .catch(function(error) {
                alert(error);
            });
    }
    document.getElementById('totalQuantity').innerHTML = totalQuantity;
    document.getElementById('totalPrice').innerHTML = totalPrice;
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
}






git 
/*document.getElementsByClassName("deleteItem").addEventListener("click", deleteItem);

function deleteItem (event) {
  let input = event.target;
  let cartItem = input.closest('cart__item');
  let cartProductsArray = arrayCart();
  let dataId = cartItem.getAttribute("data-id");
  let dataColor = cartItem.getAttribute("data-color");

}*/

/*let removeCartItemButtons = document.getElementsByClassName('deleteItem');
console.log(removeCartItemButtons);
for (let i = 0; i < removeCartItemButtons.length; i++) {
let button = removeCartItemButtons[i];
button.addEventListener('click', function(event) {
console.log('cliked');
let buttonClicked = event.target;
buttonClicked.parentElement.parentElement.remove();
updateCartTotal();

})
}*/



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