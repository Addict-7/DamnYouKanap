let params = new URLSearchParams(document.location.search);
let id = params.get("id");

getOneProduct()

function getOneProduct() {
    return fetch(`http://localhost:3000/api/products/${id}`)
        .then(function(httpBodyResponse) {
          return httpBodyResponse.json()
        })
        .then(function(product) {
          displayProduct(product)
        })
        .catch(function(error) {
            alert(error)
        })
}

function displayProduct(product) {
    document.getElementsByClassName("item__img")[0].innerHTML +=`
    <img src="${product.imageUrl}" alt="${product.altTxt}">`
    document.getElementById("title").innerHTML +=product.name;
    document.getElementById("price").innerHTML +=product.price;
    document.getElementById("description").innerHTML +=product.description;
   for (let i = 0; i < product.colors.length; i++) {
    let color = product.colors[i];
    document.getElementById("colors").innerHTML +=`
    <option value="${color}">${color}</option>`;
    }
    console.log(product)
}

document.getElementById("addToCart").addEventListener("click", addToCart);

function addToCart() {
    let quantity = document.getElementById("quantity").value;
    let color = document.getElementById("colors").value;
    if (color == "") {
        alert("Choisissez une couleur valide.");
        return;
    }
    if (quantity > 100 || quantity <= 0) {
        alert("Choississez une quantité valide.");
        return;
    }
    let order = {quantity: quantity, color: color, product_id: id};

    if (localStorage.getItem("cart") == null) {
        
    }

    console.log(order)
    console.log(localStorage.getItem("cart"));
}


