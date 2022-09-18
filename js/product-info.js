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
console.log(newComment);

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
}

document.addEventListener('DOMContentLoaded', () => {
    fetch(PRODUCT_URL)
    .then(response => response.json())
    .then(data => {
        console.log(data)
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
        `;

        fetch(PRODUCT_URL_COMMENTS)
        .then(response => response.json())
        .then(cmmt => {
            console.log(cmmt)
            comentarios = cmmt
            mostrarComentarios(comentarios);
        });
    });

});

// formBtn.addEventListener('click', (e) => {
//     e.preventDefault
//     comentarios.push(newComment.value)
// })