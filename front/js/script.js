// Appel de la fonction getProducts
getProducts ();

// Création d'une fonction " getProducts " sans paramètre qui " fetch " l'API
/**
 * La fonction permets de récupérer les informations de l'API
*/
function getProducts() {
    return fetch('http://localhost:3000/api/products')
        .then(function(httpBodyResponse) {
          return httpBodyResponse.json();
        })
        .then(function(products) {
          displayProducts(products);
        })
        .catch(function(error) {
            alert(error);
        });
}

// Création fonction " displayProducts " avec comme paramètre " products " qui ajoute 
// du contenu au HTML extrait de l'API
/**
 * La fonction permets d'afficher les informations récupérées dans l'API dans le HTML via le Javascript
 * @param {Object} products      Contient les informations du produit récupérées dans l'API (id, imageURL, altTxt, name, description)
*/
function displayProducts(products) {
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      document.getElementById("items").innerHTML +=` 
        <a href="product.html?id=${product._id}">
            <article>
              <img src="${product.imageUrl}" alt="${product.altTxt}">
              <h3>${product.name}</h3>
              <p>${product.description}</p>
            </article>
        </a>`;
    }
}
