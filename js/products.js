document.addEventListener('DOMContentLoaded', function(){
    let divCont = document.querySelector('.container .contMain')

    let url = `https://japceibal.github.io/emercado-api/cats_products/101.json`
    
    fetch(url)
    .then(response => response.json())
    .then(categories => {
        for (artc of categories.products) {
            
            // console.log(artc.name);
            divCont.innerHTML += `
            <div class="card">
                <img class='cardImg' src="${artc.image}">
                <div class='cardTitle'><h1>${artc.name}</h1></div> 
                <div class='cardSoled'><p> Productos vendidos ${artc.soldCount}</p></div>
                <div class='cardCost'><p>Precio venta ${artc.currency} <h3>$ ${artc.cost}</h3></p></div>
                <div class='cardTxt'><p>${artc.description}</p></div>
            </div>
        `};
    });
});

