function setProdID(id) {
    localStorage.setItem("ProdID", id);
    window.location = "product-info.html"
};

document.addEventListener('DOMContentLoaded', function(){
    let divCont = document.querySelector('.container .contMain')

    let url = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem('catID')}.json`
    
    let inpmin = document.getElementById('inpMin');
    let inpmax = document.getElementById('inpMax');
    let btnDecreciente = document.querySelector('#btnD');
    let btnCreciente = document.querySelector('#btnC');
    let btnFilter = document.querySelector('#btnF');
    let btnClear = document.querySelector('#btnL');
    let btnRel = document.querySelector('#btnRel');
    let productos = document.querySelectorAll('.card');
    let productosArray = [];
    
    
    

    function showArtcs(list){
        divCont.innerHTML = ``
        for (artc of list) {
            divCont.innerHTML += `
            <div class="card" onclick="setProdID(${artc.id})">
                <img class='cardImg' src="${artc.image}">
                <div class='cardTitle'><h1>${artc.name}</h1></div> 
                <div class='cardSoled'><p> Productos vendidos ${artc.soldCount}</p></div>
                <div class='cardCost'><p>Precio venta ${artc.currency} <h3>$ ${artc.cost}</h3></p></div>
                <div class='cardTxt'><p>${artc.description}</p></div>
            </div>
        `
        localStorage.setItem('arrayFiltrado', JSON.stringify(list))
    }};


    fetch(url)
    .then(response => response.json())
    .then(categories => {   

        for (artc of categories.products) {
            // console.log(artc)
        //     divCont.innerHTML += `
        //     <div class="card" onclick="setProdID(${artc.id})">
        //         <img class='cardImg' src="${artc.image}">
        //         <div class='cardTitle'><h1>${artc.name}</h1></div> 
        //         <div class='cardSoled'><p> Productos vendidos ${artc.soldCount}</p></div>
        //         <div class='cardCost'><p>Precio venta ${artc.currency} <h3>$ ${artc.cost}</h3></p></div>
        //         <div class='cardTxt'><p>${artc.description}</p></div>
        //     </div>
        // `
        productosArray.push(artc);
    };
    showArtcs(categories.products) 
    localStorage.setItem('productosArray',JSON.stringify(productosArray))
    console.log(productosArray);
    })

    .then(btnFilter.addEventListener('click', (e) => {
        if ((inpmax.value !== undefined) || (inpmin.value !== undefined)){
        e.preventDefault();
        productosArray = JSON.parse(localStorage.getItem('productosArray'));
        productosArrayFiltrado = productosArray.filter(prod => ((prod.cost >= inpmin.value) ||
        !inpmin.value) && ((prod.cost <= inpmax.value) || (!inpmax.value)))
        showArtcs(productosArrayFiltrado)
    } else {
        showArtcs(productosArray)
    }}));

    // --------------------------------------------------------------------

    btnClear.addEventListener('click', () => {
        inpMin.value = '';
        inpMax.value = '';
        showArtcs(productosArray)
    });

    function ordenDecreciente (aray) {
        aray.sort((a, b) => {
            if (a.cost > b.cost) {return -1;}
            if (a.cost < b.cost) {return 1;}
            return 0;
        })
    };
    function ordenCreciente (aray) {
        aray.sort((a, b) => {
            if (a.cost < b.cost) {return -1;}
            if (a.cost > b.cost) {return 1;}
            return 0;
        })
    };

    function ordenRelevancia (aray) {
        aray.sort((a, b) => {
            if (a.soldCount > b.soldCount) {return -1;}
            if (a.soldCount < b.soldCount) {return 1;}
            return 0;
        })
    };
    btnDecreciente.addEventListener('click', () => {
        let productosArrayFiltrado = JSON.parse(localStorage.getItem('arrayFiltrado'))
        if (productosArrayFiltrado !== undefined){
            ordenDecreciente(productosArrayFiltrado)
            showArtcs(productosArrayFiltrado)
        } else {
            ordenDecreciente(productosArray)
        };
    });
    btnCreciente.addEventListener('click', () => {
        let productosArrayFiltrado = JSON.parse(localStorage.getItem('arrayFiltrado'))
        if (productosArrayFiltrado !== undefined){
            ordenCreciente(productosArrayFiltrado)
            showArtcs(productosArrayFiltrado)
        } else {
            ordenCreciente(productosArray)
        };
    });

    btnRel.addEventListener('click', ()=> {
        let productosArrayFiltrado = JSON.parse(localStorage.getItem('arrayFiltrado'))
        if (productosArrayFiltrado !== undefined){
            ordenRelevancia(productosArrayFiltrado)
            showArtcs(productosArrayFiltrado)
        } else {
            ordenCreciente(productosArray)
        };        
    });
});

// -----------------------------------------------------------------------------------

let CART_INFO_URL_USER = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let miCarrito = undefined;

fetch(CART_INFO_URL_USER)
.then(response => response.json())
.then(data => {
    console.log(data);
    miCarrito = data.articles;
    if(localStorage.getItem('miCarrito')){

    }else{
        localStorage.setItem('miCarrito', JSON.stringify(miCarrito))
    }
});