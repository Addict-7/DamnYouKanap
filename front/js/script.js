getProducts ();

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
