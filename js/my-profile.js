let nomU1 = document.getElementById('nombreU1'), nomU2 = document.getElementById('nombreU2'), apeU1 = document.getElementById('apellidoU1'), apeU2 = document.getElementById('apellidoU2'), mailU = document.getElementById('inputEmail'), telU = document.getElementById('usuarioTel'), btnSub = document.getElementById('btnSubmit'), btnSub2 = document.getElementById('btnSubmit2'), divSuccsesAlert = document.getElementById('succsesAlert');
let loged = localStorage.getItem('loged');
let infoUserLS = localStorage.getItem('infoUserLS');

if(loged) {
    mailU.value = localStorage.getItem('usrName')
    if(infoUserLS === null){
        btnSub.addEventListener('click', (e)=>{
            let infoUser = {
                nombreU1: nomU1.value,
                nombreU2: nomU2.value,
                apellidoU1: apeU1.value,
                apellidoU2: apeU2.value,
                mail: mailU.value,
                telefonoUsuario: telU.value,
            };
            localStorage.setItem('infoUserLS', JSON.stringify(infoUser));
            divSuccsesAlert.classList.toggle('d-none');
            setTimeout(desaparecer, 3000);
        })
    }else{
        let infoULS = JSON.parse(localStorage.getItem('infoUserLS'));
        console.log(infoULS);
        for (let atributo of Object.keys(infoULS)){
            if(atributo === 'telefonoUsuario'){
                telU.value = infoULS[atributo]
            }
            if(atributo === 'mail'){
                mailU.value = infoULS[atributo]
            }
            if(atributo === 'apellidoU2'){
                apeU2.value = infoULS[atributo]
            }
            if(atributo === 'apellidoU1'){
                apeU1.value = infoULS[atributo]
            }
            if(atributo === 'nombreU2'){
                nomU2.value = infoULS[atributo]
            }
            if(atributo === 'nombreU1'){
                nomU1.value = infoULS[atributo]
            }    
        }
        btnSub.classList.toggle('d-none');
        btnSub2.classList.toggle('d-none');
    };
}else{
    window.location.href = 'index.html';
};
btnSub2.addEventListener('click', (e)=>{
    let infoUser = {
        nombreU1: nomU1.value,
        nombreU2: nomU2.value,
        apellidoU1: apeU1.value,
        apellidoU2: apeU2.value,
        mail: mailU.value,
        telefonoUsuario: telU.value,
    };
    localStorage.setItem('infoUserLS', JSON.stringify(infoUser));
    divSuccsesAlert.classList.toggle('d-none');
    setTimeout(desaparecer, 3000);
})
function desaparecer(){
    divSuccsesAlert.classList.toggle('d-none')
    };