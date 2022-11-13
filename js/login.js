let form = document.querySelector('#form-login');
let eml = document.getElementById('email');
let pss = document.getElementById('password');
let loged = false;

form.addEventListener('submit' ,e=>{
    e.preventDefault();
    if ((eml.value !== null) && (pss.value !== null)){
        e.preventDefault();
        localStorage.setItem('usrName', eml.value );
        localStorage.setItem('loged', true );
        window.location.href = 'home.html';
    } else if (eml.value === null) {
        alert('Porfavor ingrese un mail valido');
        localStorage.setItem('loged', false );
    } else if(pss.value.length <= 8){
        alert('Igrese una contraseña con almenos 8 caracteres');
        localStorage.setItem('loged', false );
    };
});


