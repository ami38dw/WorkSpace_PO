let form = document.querySelector('.form-login');

form.addEventListener('submit' ,e=>{
    // e.preventDefault();
    let eml = document.getElementById('email');
    let pss = document.getElementById('password');
    console.log(pss);
    if ((eml.value === !null) && (pss.value === !null)){
        e.preventDefault();
        window.location.href = 'home.html';
    } else if (eml.value === null) {
        e.preventDefault();
        alert('Porfavor ingrese un mail valido')
    } else if(pss.value.length <= 8){
        e.preventDefault();
        console.log(pss.value);
        alert('Igrese una contraseña de almenos 8 caracteres')
    };
})
