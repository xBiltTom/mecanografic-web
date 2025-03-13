const doc = document;
const btnIniciar = doc.getElementById("btnIniciar");
let txtMostrar = doc.getElementById("texto");
let audio = doc.getElementById("audio")

let texto;
let spans;
let posLetra=0;

let txtCombo = doc.getElementById("combo");
let combo = 0;

let letrasFalladas = doc.getElementById("letrasFalladas");
let cantLetrasFalladas = 0;
let letrasAcertadas = doc.getElementById("letrasAcertadas");
let cantLetrasAcertadas = 0;
let palabrasAcertadas = doc.getElementById("palabrasAcertadas");
let cantPalabrasAcertadas = 0;
let bandera=0; //banderaso por que no se usar cuando se presiona una tecla en js xd
let pos=0;
let presicion=0;

let palabras = [];

fetch("resources/palabras.json")
  .then(response => response.json()) // Convertir JSON a array
  .then(data => {
    palabras = data; // Almacenar en la variable
  })
  .catch(error => console.error("Error al cargar el JSON:", error));


function cambiarColor(){
    let letra = spans[posLetra];
    letra.style.color = "red";
}

function despintar(){
    spans.forEach(letra =>{
        letra.style.color="gray"
    })
}

function iniciarJuego(){
    if(opcionSeleccionada==2){
        iniciar();
    } else {
        doc.getElementById("tiempo").innerText = "MODO LIBRE";
    }
    bandera=1;
    btnIniciar.innerText="TERMINAR JUEGO";
    txtMostrar.innerText=palabras[Math.floor(Math.random() * palabras.length)];
    texto = txtMostrar.innerText;
    txtMostrar.innerHTML = texto.split("").map(letra => `<span>${letra}</span>`).join("");
    spans = txtMostrar.querySelectorAll("span");
    audio.play();
}

function finalizarJuego(){
    presicion=Number(((cantLetrasAcertadas/(cantLetrasAcertadas+cantLetrasFalladas))*100).toPrecision(4));
    if (!presicion) 
        presicion=0;
    Swal.fire({
        title: "Resumen",
        html: `<h2 style="color: white;">Letras falladas: ${cantLetrasFalladas}
        <br>Letras acertadas: ${cantLetrasAcertadas}
        <br>Palabras acertadas: ${cantPalabrasAcertadas}
        <br>Presicion: ${presicion}%</h2>`,
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
          popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
          `
        },
        backdrop: false,
        background: 'silver'
      });
    reiniciar();
    bandera=0;
    posLetra=0;
    cantLetrasFalladas=0;
    cantLetrasAcertadas=0;
    cantPalabrasAcertadas=0;
    combo=0;
    txtCombo.innerText="";
    letrasAcertadas.innerText="";
    letrasFalladas.innerText="";
    palabrasAcertadas.innerText="";
    btnIniciar.innerText="INICIAR JUEGO";
    audio.pause();
    audio.currentTime = 0;
}

btnIniciar.addEventListener("click",function(){
    if(bandera==0){
        iniciarJuego();
    }else{
        finalizarJuego();
    }
});


doc.addEventListener("keyup",e=>{
    if(bandera){
        if(e.key==spans[posLetra].textContent){
            cambiarColor();
            posLetra++;
            cantLetrasAcertadas++;
            combo++;
            txtCombo.innerText="X" + combo; 
            letrasAcertadas.innerText=cantLetrasAcertadas;
            if(posLetra==spans.length){
                posLetra=0;
                cantPalabrasAcertadas++;
                palabrasAcertadas.innerText=cantPalabrasAcertadas;
                txtMostrar.innerText=palabras[Math.floor(Math.random() * palabras.length)];
                texto = txtMostrar.innerText;
                txtMostrar.innerHTML = texto.split("").map(letra => `<span>${letra}</span>`).join("");
                spans = txtMostrar.querySelectorAll("span");
                despintar(); 
            }
        }else{
            cantLetrasFalladas++;
            letrasFalladas.innerText = cantLetrasFalladas;
            spans[posLetra].style.color = "gray";
            combo=0;
            txtCombo.innerText=""; 
        }
    } else {
        if(!Swal.isVisible()){
            if(cardConfig.classList.contains("hidden")){
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Pulsa en iniciar juego para comenzar",
                    showConfirmButton: false,
                    timer: 1300,
                    backdrop: false,
                    background: '#374151',
                    color: 'white'            
                  });
            }
        }
        
    }
})

doc.addEventListener("keydown",e=>{
    if(bandera==1){
        if(e.key!=spans[posLetra].textContent){
            spans[posLetra].style.color = "green";
        }
    }
}) 
