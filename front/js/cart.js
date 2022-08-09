let cart = JSON.parse(localStorage['cart']);

function delete_product_from_cart(id, color) {
  cart = cart.filter(c => c.product_id != id || c.product_color != color);
  console.log(id);
  console.log(color);
  console.log(cart);
  localStorage.setItem('cart', JSON.stringify(cart));
}

displayCart();

async function displayCart() {
  
  document.getElementById("cart__items").innerHTML = "";
  
  let totalPrice = 0;
  let totalQuantity = 0;
  let cart = JSON.parse(localStorage["cart"]);

    for (let order of cart) {
      console.log(order);
      console.log(order.name);
      await fetch(`http://localhost:3000/api/products/${order.id}`)
          .then((data) => data.json())
          .then((data) => {
              totalQuantity += order.quantity;
              totalPrice += order.quantity * data.price;
                displayProduct(order, data);
                deleteItem(order);
                console.log(data)
          })
          .catch(function(error) {
              alert(error);
          });
    }
    document.getElementById('totalQuantity').innerHTML = totalQuantity;
    document.getElementById('totalPrice').innerHTML = totalPrice;
}

function displayProduct(item, product) {

    document.getElementById("cart__items").innerHTML +=`
      <article class="cart__item" data-id="${item.id}" data-color="${item.color}">
        <div class="cart__item__img">
          <img src="${item.imageUrl}" alt="${item.altTxt}">
        </div>
        <div class="cart__item__content">
            <div class="cart__item__content__description">
                <h2>${item.name}</h2>
                <p>${item.color}</p>
                <p>${product.price}€</p>
            </div>
          <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
                <p>Qté :  </p>
                <input type="number" data-id="${item.id}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem" data-id="${item.id}" data-color="${item.color}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
}

/*function deleteOrder(id, color, price) {
  let cart = JSON.parse(localStorage["cart"]);
}*/

function deleteItem() {
  let deleteBtns = document.getElementsByClassName("deleteItem");
  for(btn of deleteBtns) {
    //btn.addEventListener("click", delete_product_from_cart(id));
    btn.addEventListener("click", (btn) => {
      console.log('btn', btn.target.dataset.color)
      delete_product_from_cart(btn.target.dataset.id, btn.target.dataset.color);
    });
  }
}




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