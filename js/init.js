const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

let userBox = document.querySelector('#usrName');
userBox.innerHTML = `${localStorage.getItem('usrName')}`;
userBox.setAttribute('class', 'nav-button');

document.addEventListener('DOMContentLoaded', () => {
  let miCarrito = document.querySelector('#mi-carrito');
  miCarrito.addEventListener('click', () => {
    window.location = 'cart.html'
  });

  let miPerfil = document.querySelector('#mi-perfil');
  miPerfil.addEventListener('click', () => {
    window.location = 'my-profile.html'
  });

  let cerrarSesion = document.querySelector('#cerrar-sesion');
  cerrarSesion.addEventListener('click', () => {
    window.location = 'index.html';
    localStorage.setItem('usrName', '');
    localStorage.setItem('miCarrito', '');
  });
});