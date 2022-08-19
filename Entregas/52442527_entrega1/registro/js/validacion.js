function showAlertSuccess() {
    document.getElementById("alert-success").classList.add("show");
}

function showAlertError() {
    document.getElementById("alert-danger").classList.add("show");
}

let usr = document.getElementById('nombre');
let srNme = document.getElementById('apellido');
let eml = document.getElementById('email');
let pss1 = document.getElementById('password1');
let pss2 = document.getElementById('password2');
let chekB = document.getElementById('terminos');
let bttn = document.getElementById('regBtn');


bttn.addEventListener('click',()=>{
    if (usr.value !== '' && srNme.value !== '' && eml.value !== '' && pss1.value !== '' && pss1.value === pss2.value && pss1.value.length >= 6 && chekB.checked){
        showAlertSuccess();
    }else{
        showAlertError();
    };
});
