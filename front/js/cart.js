let cart = JSON.parse(localStorage['cart']);

function delete_product_from_cart(id, color) {
  // On passe 2 arguments : id et color pour les comparer avec ce qu
  // il y a dans le cart aux clés .id et .color 

  cart = cart.filter(c => !(c.id == id && c.color == color));
                
  // Envoyer les nouvelles données dans le localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  //  Avertir de la suppression et recharger la page
  alert('Votre article a bien été supprimé.');
  window.location.href = "cart.html";
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


function deleteItem() {
  let deleteBtns = document.getElementsByClassName("deleteItem");
  for(btn of deleteBtns) {
    btn.addEventListener("click", (btn) => {
      delete_product_from_cart(btn.target.dataset.id, btn.target.dataset.color);
    });
  }
}

document.getElementsByClassName("cart__order__form")[0].addEventListener("submit", order);

let contact = {
    firstName: document.getElementById('firstName').value,
    lastName: document.getElementById('lastName').value,
    address: document.getElementById('address').value,
    city: document.getElementById('city').value,
    email: document.getElementById('email').value
  }

function checkContact(contact) {
  let contactCorrect = true;
  
  let nameRGEX = /^[a-zA-Z\s,'-]{2,}$/;
  if (! nameRGEX.test(contact.firstName)) {
      document.getElementById("firstNameErrorMsg").innerHTML = "Prénom incorrect";
      contactCorrect = false;
  } else {
      document.getElementById("firstNameErrorMsg").innerHTML = "";
  }
  if (! nameRGEX.test(contact.lastName)) {
      document.getElementById("lastNameErrorMsg").innerHTML = "Nom incorrect";
      contactorrect = false;
  } else {
      document.getElementById("lastNameErrorMsg").innerHTML = "";
  }

  let addressRGEX = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  if (! addressRGEX.test(contact.address)) {
      document.getElementById("addressErrorMsg").innerHTML = "Adresse incorrecte";
      contactCorrect = false;
  } else {
      document.getElementById("addressErrorMsg").innerHTML = "";
  }

  let cityRGEX = /^[a-zA-Z\s.'-]{3,}$/;
  if (! cityRGEX.test(contact.city)) {
      document.getElementById("cityErrorMsg").innerHTML = "Ville incorrecte";
      contactCorrect = false;
  } else {
      document.getElementById("cityErrorMsg").innerHTML = "";
  }

  let mailRGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (! mailRGEX.test(contact.email)) {
      document.getElementById("emailErrorMsg").innerHTML = "Email incorrect";
      contactCorrect = false;
  } else {
      document.getElementById("emailErrorMsg").innerHTML = "";
  }

  return contactCorrect;
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