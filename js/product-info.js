let ProdID = localStorage.getItem('ProdID');
let PRODUCT_URL = `https://japceibal.github.io/emercado-api/products/${ProdID}.json`;
let PRODUCT_URL_COMMENTS = `https://japceibal.github.io/emercado-api/products_comments/${ProdID}.json`;
let contenedor = document.getElementById('conteiner');
let cmBox = document.getElementById('commentBox');
let comentarios = undefined;
let cmToAppend = ``;
let form = document.getElementById('formCmmt');
let scoreCmmt = undefined;
let estrellasString = '';
let formBtn = document.getElementById('formBtn');
let newComment = document.getElementById('newComment');
let puntuacion = document.getElementById('cmmPuntuacion');
let fecha = new Date();
let productInfo = undefined;
let prodRelacionados = document.getElementById('prod-related');
// console.log(prodRelacionados);

function mostrarEstrellas(score) {
    for (let i=1; i<=score; i++ ){
        estrellasString += '<span class="fa fa-star checked"></span>'
        // console.log(i)
    }
    
};

function mostrarComentarios(comentarios) {
    comentarios.forEach(comentario => {
        mostrarEstrellas(comentario.score)
        cmToAppend +=
        `<div class="comment">
            <h5>@${comentario.user} ${estrellasString}</h5>
            <p> ${comentario.description}</p> 
            <p class="dateCmmt text-muted">${comentario.dateTime}</p>
        </div>`
        estrellasString = '';
    });
    cmBox.innerHTML = cmToAppend
    cmToAppend = ``;
};

function agregarObjetoJS(arrayComentarios) {
    let product = localStorage.getItem('ProdID');
    let score = puntuacion.value;
    let description = `${newComment.value}`;
    let user = `${localStorage.getItem('usrName')}`;
    let dateTime = `${fecha.getFullYear()}-${fecha.getMonth()}-${fecha.getDay()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`;
    2021-09-15
    
    let obj = {
        "product": product,
        "score": score,
        "description": description,
        "user": user,
        "dateTime": dateTime
    }
    arrayComentarios.push(obj);
};

function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
};

function mostrarProdRelacionados(data){
    let relToAppend = `<h3>Productos relacionados</h3>`;
    data.relatedProducts.forEach(element => {
        // console.log(data);
        relToAppend += `
        <div class='card prodRel' id='prod-Rel-${element.id}' onclick="setProdID(${element.id})"> 
        <h4>${element.name}</h4>
        <img class="img-sec" src="${element.image}">
        </div>`
    });
    prodRelacionados.innerHTML = relToAppend
};
document.addEventListener('DOMContentLoaded', () => {
    fetch(PRODUCT_URL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
        productInfo = data;
        contenedor.innerHTML = `
        <div class='description'>
            <h2>${data.name}</h2>
            <p>${data.description}</p>
            <p>${data.currency} $${data.cost}</p>
        </div>

        <div class='prdImgs'>
            <div class='imgPpal'><img class="img" src="${data.images[0]}"></img></div>
            <div class='imgSec'>
                <img class="img-sec" src="${data.images[1]}">
                <img class="img-sec" src="${data.images[2]}">
                <img class="img-sec" src="${data.images[3]}">
            </div>
        </div>    
        
        <div class="d-grid">
        <button type="button" class="btn btn-outline-secondary" id="btnBuy">
        <img src="https://iconmonstr.com/wp-content/g/gd/makefg.php?i=../releases/preview/2013/png/iconmonstr-shopping-cart-23.png&r=0&g=0&b=0" alt="icon" width="5%">
        Agregar al carrito</button>
        </div>
        `;

        fetch(PRODUCT_URL_COMMENTS)
        .then(response => response.json())
        .then(cmmt => {
            // console.log(cmmt)
            comentarios = cmmt
            mostrarComentarios(comentarios);
        });
        mostrarProdRelacionados(data);
        
        let soledBtn = document.querySelector('#btnBuy')
        soledBtn.addEventListener('click', () => {
            let miCarrito = JSON.parse(localStorage.getItem('miCarrito'));
            nuevoArtc = {"id": data.id,
            "name":`${data.name}`,
            "count":1,
            "unitCost":data.cost,
            "currency":`${data.currency}`,
            "image":`${data.images[0]}`},
            miCarrito.push(nuevoArtc);

            localStorage.setItem('miCarrito', null)
            localStorage.setItem('miCarrito', JSON.stringify(miCarrito))
            console.log(miCarrito);
        });
    });

});

formBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let copiaCmm = comentarios;
    agregarObjetoJS(copiaCmm);
    comentarios = [];
    comentarios = copiaCmm;
    mostrarComentarios(comentarios);
}) 

