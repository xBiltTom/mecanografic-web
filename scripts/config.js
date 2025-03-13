let btnConfig = doc.getElementById("btnConfiguracion");
let cardConfig = document.getElementById("cardConfig");
let bander=0;
let opcionSeleccionada=2;

btnConfig.addEventListener("click",function(){
    cardConfig.classList.toggle("hidden"); 
    if(bander==0){
        bander=1;
        btnConfig.innerText="Cerrar configuracion";
    } else {
        bander=0;
        btnConfig.innerText="Configurar juego";
        segundosUsuario = document.getElementById("segundos").value;
        opcionSeleccionada = document.querySelector('input[name="opcion"]:checked').value;

        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: "Cambios guardados"
          });
    }
})

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("reloj").checked = true; // Marca la opción 2 al cargar
    segundosUsuario = document.getElementById("segundos").value;
});

//Zona de recuperar datos del usuario

let segundosUsuario;


