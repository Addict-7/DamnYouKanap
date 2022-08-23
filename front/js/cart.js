// Variable utilisant le ' cart '
let cart = JSON.parse(localStorage['cart']);

// Création d'une fonction pour supprimer un produit
/**
 * La fonction permets de supprimer via l'ID et la couleur les objets désirés
 * @param {string} id   Contient l'ID de l'objet que l'on veut supprimer
 * @param {string} color       Contient la couleur de l'objet que l'on veut supprimer
*/
function delete_product_from_cart(id, color) {
  // On passe 2 arguments : id et color pour les comparer avec ce qu'
  // il y a dans le cart aux clés .id et .color 

  cart = cart.filter(c => !(c.id == id && c.color == color));

  // Envoi des nouvelles données dans le localStorage
  localStorage.setItem('cart', JSON.stringify(cart));

  //  Alerte que la suppression a eu lieu et rechargement de la page
  alert('Votre article a bien été supprimé.');
  window.location.href = "cart.html";
}

// Appel de la fonction displayCart
displayCart();

// Création de la fonction asynchrone displayCart
/**
 * La fonction permets d'afficher les objets séléctionnés depuis l'API et le localStorage pour
 * le prix et la quantité. Puis injecte les totaux dans le HTML.
*/
async function displayCart() {
  
  document.getElementById("cart__items").innerHTML = "";
  // Création des variables nécessaires
  let totalPrice = 0;
  let totalQuantity = 0;
  let cart = JSON.parse(localStorage["cart"]);
    // Création d'une boucle qui fait appel aux infos de l'API en fonction de la commande
    for (let order of cart) {
      console.log(order);
      console.log(order.name);
      await fetch(`http://localhost:3000/api/products/${order.id}`)
          // Utilisation de data pour récupérer les informations
          .then((data) => data.json())
          .then((data) => {
              // Création de paramètres 
              totalQuantity += Number (order.quantity);
              totalPrice += Number (order.quantity * data.price);
                displayProduct(order, data);
                deleteItem(order);
          })
          .catch(function(error) {
              alert(error);
          });
    }
    // Liaison HTML au Javascript
    document.getElementById('totalQuantity').innerHTML = totalQuantity;
    document.getElementById('totalPrice').innerHTML = totalPrice;
}

// Création fonction displayProduct avec en paramètres ' item ' et ' product '
/**
 * Ajoute dans le HTML les produits séléctionnés via le Javascript
 * @param {Object} item    Contient les informations de l'objet que l'on désire afficher (id, color, imageUrl, altTxt, name, quantity) depuis le localStorage
 * @param {Object} product       Contient les informations de l'objet que l'on désire afficher (price) depuis l'API
*/
function displayProduct(item, product) {
    // Injection de HTML via le Javascript en utilisant les variables créées
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
                <input type="number" data-id="${item.id}" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${item.quantity}" onchange="changeQuantity('${item.color}', '${item.id}', this.value, ${product.price})">
            </div>
            <div class="cart__item__content__settings__delete">
                <p class="deleteItem" data-id="${item.id}" data-color="${item.color}">Supprimer</p>
            </div>
          </div>
        </div>
      </article>`;
}

/**
 * Change la quantité et le prix 
 * @param {string} color    Contient la couleur du produit dont on veut changer la quantité
 * @param {string} id       Contient l'ID du produit dont on veut changer la quantité
 * @param {number} newQuantity    Contient la nouvelle quantité 
 * @param {number} price    Contient le prix après changement de quantitéD
*/
const changeQuantity = (color, id, newQuantity, price) => {
  // Création de variables nécessaires pour les calculs de prix, quantité, vérification des objets potentiellement
  // déjà présents dans le panier
  let order = cart.find(o => (o.id == id && o.color == color)); 
  let differenceQuantity = newQuantity - order.quantity;
  let totalQuantity = Number (document.getElementById('totalQuantity').innerText);
  totalQuantity += differenceQuantity;
  document.getElementById('totalQuantity').innerHTML = totalQuantity;
  order.quantity = newQuantity;
  let differencePrice = price * differenceQuantity;
  let totalPrice = Number (document.getElementById('totalPrice').innerText) + differencePrice;
  document.getElementById('totalPrice').innerHTML = totalPrice;
  localStorage.setItem("cart", JSON.stringify (cart)); 
}

/**
  * Ajout de la fonction ( addEvenListener ) au bouton ' submit ' pour les objets séléctionnés
  * afin de les supprimer du panier ( localStorage )
*/
function deleteItem() {
  let deleteBtns = document.getElementsByClassName("deleteItem");
  for(btn of deleteBtns) {
    btn.addEventListener("click", (btn) => {
      delete_product_from_cart(btn.target.dataset.id, btn.target.dataset.color);
    });
  }
}

// Création d'une variable ( addEventListener ) pour le bouton ' commander '
let form = document.getElementsByClassName("cart__order__form")[0];
form.addEventListener("submit", function(event, order, contact) {
  event.preventDefault();
  console.log(form.firstName.value)
  // If pour alerter si le panier est vide ou qu'il ne contient rien
  if (cart == null || cart.length == 0) {
    alert('Votre panier est vide. Veuillez le remplir avant de commander.');
    return;
  }
  // If pour vérifier si le contact existe et présent
  if (checkContact(form)) {
    let contact = {
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      address: document.getElementById('address').value,
      city: document.getElementById('city').value,
      email: document.getElementById('email').value
    }
    // Création de la variable ' products ' contenant un tableau ( vide dans un premier temps )
    let products = [];
    // Création d'un boucle for pour récupérer à partir du ' cart ' ( order = cart[i] ) les ids et les ' push ' dans ' products '.
    for(let order of cart) {
      let id = order.id;
      products.push(id);
    }
    console.log(products)
    // Fetch à l'API en POST ( envoi vers celle-ci ) de la commande
    fetch(`http://localhost:3000/api/products/order`, {
      method: "POST",
      body: JSON.stringify({
        contact:contact, 
        products:products
      }),
      headers: {
        "Content-Type" : "application/json"
      },
    })
    .then((reponse)=> reponse.json())
    .then((data)=>{
      console.log(data);
      // Rediréction sur la page confirmation avec l'ID de la commande
      window.location.href = `./confirmation.html?id=${data.orderId}`;  
    })
  
  }
})
// Fonction pour vérifier que ' contact ' est bon et bien rédigé
// Utilisation des Regex nécessaires à chaque itération d'une information de ' contact '
/**
 * Vérifie la validité des informations ajoutées à contact
 * @param {Object} contact    Contient les informations de contact (firstName, lastName, address, city, email)
*/
function checkContact(contact) {
  // Création d'une variable qui permets de renvoyer true/false pour ne renvoyer qu'un formulaire correctement rempli
  let contactCorrect = true;
  
  let nameRGEX = /^[a-zA-Z\s,'-]{2,}$/;
  if (! nameRGEX.test(contact.firstName.value)) {
      document.getElementById("firstNameErrorMsg").innerHTML = "Prénom incorrect";
      contactCorrect = false;
  } else {
      document.getElementById("firstNameErrorMsg").innerHTML = "";
  }
  if (! nameRGEX.test(contact.lastName.value)) {
      document.getElementById("lastNameErrorMsg").innerHTML = "Nom incorrect";
      contactcorrect = false;
  } else {
      document.getElementById("lastNameErrorMsg").innerHTML = "";
  }

  let addressRGEX = /^[a-zA-Z0-9\s,.'-]{3,}$/;
  if (! addressRGEX.test(contact.address.value)) {
      document.getElementById("addressErrorMsg").innerHTML = "Adresse incorrecte";
      contactCorrect = false;
  } else {
      document.getElementById("addressErrorMsg").innerHTML = "";
  }

  let cityRGEX = /^[a-zA-Z\s.'-]{3,}$/;
  if (! cityRGEX.test(contact.city.value)) {
      document.getElementById("cityErrorMsg").innerHTML = "Ville incorrecte";
      contactCorrect = false;
  } else {
      document.getElementById("cityErrorMsg").innerHTML = "";
  }

  let mailRGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (! mailRGEX.test(contact.email.value)) {
      document.getElementById("emailErrorMsg").innerHTML = "Email incorrect";
      contactCorrect = false;
  } else {
      document.getElementById("emailErrorMsg").innerHTML = "";
  }

  return contactCorrect;
}
