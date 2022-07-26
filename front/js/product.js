// Création d'une variable params basée sur URLSearchParams
let params = new URLSearchParams(document.location.search);
// Création d'une variable id basée sur params
let id = params.get("id");

// Appel de la fonction getOneProduct
getOneProduct(id)

// Création d'une fonction " getOneProduct " sans paramètre, qui appel l'API d'un produit
// précis via son ID
/**
 * La fonction permets de récupérer un seul produit depuis l'API
*/
function getOneProduct() {

    return fetch(`http://localhost:3000/api/products/${id}`)
        .then(function(httpBodyResponse) {
          return httpBodyResponse.json();
        })
        .then(function(product) {
          displayProduct(product);
        })
        .catch(function(error) {
            alert(error);
            alert("Cet article n'a pas été trouvé.");
        })
}

// Création d'une fonction " displayProduct " avec en paramètre " product " qui créée 
// du contenu HTML après avoir extrait le contenu depuis l'API
/**
 * La fonction permets d'afficher les informations de chaque produit récupéré dans l'API dans le HTML via le Javascript
 * @param {Object} product      Contient les informations du produit récupérées dans l'API (imageURL, altTxt, name, price, description, colors)
*/
function displayProduct(product) {

    document.getElementsByClassName("item__img")[0].innerHTML =`
    <img src="${product.imageUrl}" alt="${product.altTxt}">`
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
    for (let i = 0; i < product.colors.length; i++) {
        let color = product.colors[i];
        document.getElementById("colors").innerHTML +=`
        <option value="${color}">${color}</option>`;
    }
}

// Création d'un EvenListener qui se produit au click sur le btn lié à addToCart
document.getElementById("addToCart").addEventListener("click", addToCart);

// Création d'une fonction Ajouter au panier
/**
 * La fonction permets d'ajouter au panier les produits séléctionnés et les informations les concernant.
*/
function addToCart() {

    // Création de constantes price (innetText pour récupérer un span), quantity, color, name, imageUrl, altTxt
    const price = document.getElementById("price").innerText;
    const quantity = document.getElementById("quantity").value;
    const color = document.getElementById("colors").value;
    const name = document.getElementById("title").innerText;
    const imageUrl = document.querySelector(".item__img img").src;
    const altTxt = document.querySelector(".item__img img").alt;

    // Ajout d'une Alerte si la couleur n'est pas valide
    if (color == "") {
        alert("Choisissez une couleur valide.");
        return;
    }
    // Ajout d'une Alerte si la quantité n'est pas valide
    if (quantity > 100 || quantity <= 0) {
        alert("Choisissez une quantité valide.");
        return;
    }

    // Création d'une commande constante Objet + rajout dans la commande du prix * quantité 
    const order = {
        id: id,
        name: name,
        imageUrl: imageUrl,
        altTxt: altTxt,
        quantity: Number (quantity), 
        color: color, 
    }

    // Création variable cart
    let cart

    // Si " if " le panier n'a pas encore été créé
    if (localStorage.getItem("cart") == null) {
        // Création d'un panier
        cart = []
    } else {
        // Récupération du panier à partir du localStorage ( sous sa forme JSON ) 
        // et conversion de celui-ci en objet Javascript et AFFECTATION de celui-ci à la variable cart
        cart = JSON.parse(localStorage.getItem("cart"));
    }
    
    // Version implicite Fonction + Array.prototype.(some)
    // Création d'une fonction orderDoesExists qui vérifie s'il y a déjà une commande dans le panier
    // Création d'une fonction qui vérifie la nouvelle commande avec l'ancienne et qui renvoie le résultat
    function checkIfEqual (otherOrder) {
        if (order.id === otherOrder.id && order.color === otherOrder.color ) {
            return true;
        } else {
            return false;
        }
    }

    // Teste si au moins un élément du tableau renvoie " true "
    let orderDoesExists = cart.some(checkIfEqual);

    // Version avancée Fonctions Fléchées
    // let orderDoesExists = cart.some(e => e.id === order.id && e.color === order.color)

    /* // Version explicite Variable + Boucle For
    let orderDoesExists = false;
    for(let i = 0; i < cart.length; i++) {
        let otherOrder = cart[i];
        orderDoesExists = checkIfEqual(otherOrder);
        if(orderDoesExists) {
            break
        }
    }
    */

    // Vérifie si une commande a été trouvée [ Si celle-ci a été trouvée ]
    if (orderDoesExists) {
        // Si une commande a été trouvée, la récupère ( let foundOrder ), trouve la valeur 
        // qui valide checkIfEqual
        let foundOrder = cart.find(checkIfEqual);
        // Additionnes la quantité de la nouvelle commande à l'ancienne
        foundOrder.quantity += order.quantity;
        // Multiplies le prix par la quantité 
    } else {
        // On ajoute (push) la commande au panier ( Lire de droite à gauche )
        cart.push(order);
    }
    
    // Affectation de l'objet cart à l'étiquette "cart"
    localStorage.setItem("cart", JSON.stringify (cart)); 

    // Possibilité en deux étapes avec l'ajout d'un variable ( cart_JSON ) intermédiaire
    // let cart_JSON = JSON.stringify(cart); Création d'un objet JSON correspondant au panier
    // localStorage.setItem("cart", cart_JSON); Ajout du panier ( sous sa forme JSON ) au localStorage

    // // Récupération du panier à partir du localStorage (sous sa forme JSON)
    let cart_JSON = localStorage.getItem("cart");

    // Conversion du panier JSON en un objet Javascript et AFFECTATION de celui-ci à la variable cart
    cart = JSON.parse(cart_JSON);
   
    // Affiche dans la console, le panier sous la forme d'un tableau contenant la commande
    console.log('cart', cart); 

    // Alerte quand un produit est ajouté au panier
    alert('Le produit a bien été ajouté au panier.');

    // Retour à l'accueil après un ajout de produit au panier
    window.location.href = "./index.html";

}