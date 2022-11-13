let CART_INFO_URL_USER = "https://japceibal.github.io/emercado-api/user_cart/25801.json";
let miCarrito = undefined;
let ordenComp = document.getElementById('ord-comp');
let divCarrito = document.querySelector('#tCarrito');
let confirmBtn = document.querySelector('#confirm-prod');
let delBtn = document.querySelector('#del-prod');
let buyBtn = document.querySelector('#buy-prod');
let prodSelected = [];
let prodDelete = [];
let listaProducto = undefined;
let tipoEnvio = '';
let subtot = document.querySelector('#subtot');
let costSend = document.getElementById('costSend');
let total = document.querySelector('#tot');
let send = document.getElementsByName('send');
let sumParcial = undefined;
let payRadio1 = document.querySelector('#RadioDefault1');
let payRadio2 = document.querySelector('#RadioDefault2');
let bankCount = document.querySelector('#inputBankCount');
let cardNum = document.querySelector('#inputCardNum');
let codSeg = document.querySelector('#inputCSeg');
let dateOff = document.querySelector('#inputDateOff');
let btnConfirmPay = document.querySelector('#confirmPay');
let closebtn = document.querySelector('#closebtn');
let valCust1 = document.querySelector('#validationCustom01');
let valCust2 = document.querySelector('#validationCustom02');
let valCust3 = document.querySelector('#validationCustom03');
let valCust4 = document.querySelector('#validationCustom04');
let btnTerminarComp = document.querySelector('#finishBuy');
let payBay = document.getElementById('payBy');
let divSuccsesAlert = document.getElementById('succsesAlert');
let payment = false;
let formConfirm = false;
let arrayIDs = [];


function multCost(cost,id) {
    let inp = document.querySelector(`#amount-`+id);
    let r = cost * inp.value
    document.querySelector(`#subT-`+id).innerHTML = r;
};

function mostrarProd(carrito){
    let toApend = ``; 
    for (i=0; i < carrito.length; i++) {
        let subT = `${carrito[i].unitCost}` * `${carrito[i].count}`;
        toApend += `
        <tr class="prod-${carrito[i].id}">
            <td><input name='add' type='checkbox' id="chekB-${i}"></td>
            <td><img class="tabImg" src='${carrito[i].image}' width="130"></td>
            <td>${carrito[i].name}</td>
            <td>${carrito[i].currency}$ ${carrito[i].unitCost}</td>
            <td><input id="amount-${i}" name='amount' type='number' min='1' oninput='multCost(${carrito[i].unitCost}, ${i})' value= 1></td>
            <td>${carrito[i].currency}$ <span  id="subT-${i}">${subT}</span></td>
        </tr>
        `
        
    };
    divCarrito.innerHTML += toApend
};
function borrarProd(){
    agregarProdSelec();
    console.log(prodSelected)
    let miCarritoChico = undefined;
    for (artc of prodSelected){
        for(arct of prodSelected){
            arrayIDs.push(arct.id)
        }
        let miCarrito = JSON.parse(localStorage.getItem('miCarrito'));
        for (let indi=0; indi < arrayIDs.length; indi++){
            miCarritoChico = miCarrito.filter(item => item.id !== arrayIDs[indi])
            arrayIDs.shift()
        }
    }
    divCarrito.innerHTML = '';
    localStorage.setItem('miCarrito', JSON.stringify(miCarritoChico));
    mostrarProd(miCarritoChico);
};
delBtn.addEventListener('click',()=>{
    borrarProd()
})
fetch(CART_INFO_URL_USER)
.then(response => response.json())
.then(data => {
    miCarrito = data;
    let carritoLleno = localStorage.getItem('miCarrito')
    if (carritoLleno) {
        listaProducto = JSON.parse(carritoLleno);        
    } else {
        listaProducto = data.articles;
    }
    localStorage.setItem('listaProducto', JSON.stringify(listaProducto))
    
    mostrarProd(listaProducto);
});

function agregarProdSelec (){
    prodSelected = [];
    for (let i = 0; i < divCarrito.childNodes[3].children.length; i++) {
        if (divCarrito.childNodes[3].children[i].cells[0].firstChild.checked){
            listaProducto[i].count = divCarrito.childNodes[3].children[i].cells[4].children[0].value;
            prodSelected.push(listaProducto[i])  
        }
    };
    return prodSelected;
}
confirmBtn.addEventListener('click', () =>{
    agregarProdSelec();
    console.log(prodSelected)
    if(prodSelected.length === 0){
        alert('Seleccione los articulos que desea comprar');
    }else {
        ordenComp.classList.toggle('oculto');
    }
});
buyBtn.addEventListener('click', (e) => {
    console.log(tipoEnvio)
    let conf = false;
    if(tipoEnvio.value === '' || valCust1.value === ''|| valCust2.value === ''|| valCust3.value === ''|| valCust4.value === ''){
    }else {
        e.preventDefault();
        costos();
        conf = true;
    };
    if (conf === true){
        buyBtn.classList.add('oculto')
        payBay.classList.toggle('d-none');    
    }
    formConfirm = true;
});

function costos(){
    console.log(prodSelected)
    sumParcial = 0;
    for (let i = 0; i < prodSelected.length; i++) {
        let prod = prodSelected[i]
        if (prod.currency === 'UYU'){
        prod.unitCost = (prod.unitCost)/40
        prod.currency = 'USD'
        sumParcial += ((prod.count)*(prod.unitCost))
       }else {
        sumParcial += ((prod.count)*(prod.unitCost))
       }
    }
    subtot.innerHTML = `$ <span id="spanSubTot">${sumParcial}</span>`

    console.log(send)
    for (i=0; i<send.length; i++){
        if(send[i].checked){
        tipoEnvio = send[i].attributes[1]
        }
    }
    if(tipoEnvio.value === 'premium'){
        costSend.innerHTML = `$ <span id="spanSend" value="${Math.round(sumParcial * 0.15)}">${Math.round(sumParcial * 0.15)}</span>`;
    } else if(tipoEnvio.value === 'express'){
        costSend.innerHTML = `$ <span id="spanSend" value="${Math.round(sumParcial * 0.08)}">${Math.round(sumParcial * 0.08)}</span>`;
    } else if(tipoEnvio.value === 'standard'){
        costSend.innerHTML = `$ <span id="spanSend" value="${Math.round(sumParcial * 0.02)}">${Math.round(sumParcial * 0.02)}</span>`;
    };
    if(tipoEnvio === ''){
        alert('Seleccione un metodo de envio')
    };
    
    let costCalculated = document.getElementById('spanSend');
    let sumCalculated = document.getElementById('spanSubTot');
    let sumTot = parseInt(costCalculated.innerHTML) + parseInt(sumCalculated.innerHTML);

    total.innerHTML= `(USD) $ ${sumTot}`
};
payRadio1.addEventListener('click', ()=>{
    bankCount.setAttribute('disabled', '');
    cardNum.removeAttribute('disabled');
    codSeg.removeAttribute('disabled');
    dateOff.removeAttribute('disabled');
});
payRadio2.addEventListener('click', ()=>{
    bankCount.removeAttribute('disabled');
    cardNum.setAttribute('disabled', '');
    codSeg.setAttribute('disabled', '');
    dateOff.setAttribute('disabled', '');
});
btnConfirmPay.addEventListener('click', () =>{
    if(payRadio1.checked){
        if(cardNum.value === '' || codSeg.value === '' || dateOff === ''){
            alert('Complete todos los campos solicitados')
        }else{
            closebtn.click()
        }
    }else if(payRadio2.checked) {
        if(bankCount.value === ''){
            alert('Complete todos los campos solicitados')
        }else{
            closebtn.click()
        }
    };
    payment = true;
    payBay.classList.toggle('d-none');
    btnTerminarComp.classList.toggle('d-none');
});
function desaparecer(){
divSuccsesAlert.classList.toggle('d-none')
};
btnTerminarComp.addEventListener('click', ()=>{
    if(payment === true && formConfirm === true){
        divSuccsesAlert.classList.toggle('d-none');
        setTimeout(desaparecer, 3000);
        ordenComp.classList.toggle('oculto');
    }
})