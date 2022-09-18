let form = document.querySelector('#form-login');
let eml = document.getElementById('email');
let pss = document.getElementById('password');

form.addEventListener('submit' ,e=>{
    e.preventDefault();
    if ((eml.value !== null) && (pss.value !== null)){
        e.preventDefault();
        localStorage.setItem('usrName', eml.value );
        // console.log(localStorage.getItem('user'));
        window.location.href = 'home.html';
    } else if (eml.value === null) {
        // e.preventDefault();
        alert('Porfavor ingrese un mail valido')
    } else if(pss.value.length <= 8){
        alert('Igrese una contraseña con almenos 8 caracteres')
    };
});


