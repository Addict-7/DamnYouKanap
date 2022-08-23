// Récupère les différents paramètres de l'URL actuelle
let params = new URLSearchParams(document.location.search);

// Accède au paramètre "id" (http://127.0.0.1:5500/front/html/confirmation.html?id=15684512331)
let id = params.get("id");
if (! id ) {
    alert(`Votre panier ne contient aucun produit disponible.`)
} else {
// Affiche le numéro de commande
document.getElementById("orderId").innerHTML = id;

// On vide le panier en remplaçant l'actuel par un tableau vide
localStorage.setItem('cart', JSON.stringify([]));
}

