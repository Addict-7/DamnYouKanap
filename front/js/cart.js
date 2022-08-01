getOneProduct()

function getOneProduct() {
    return fetch(`http://localhost:3000/api/products/`)
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

