let segundos = 0; //los que son para mostrar
let segundosReales = 0; //los seleccionados por el jugador
let minutos = 0;
//let horas = 0; 
let intervalo = null;

function actualizarTiempo() {
    segundos++;
    segundosReales++;
    if (segundos === 60) {
        segundos = 0;
        minutos++; 
    }

   /*  if (minutos === 60) {
        minutos = 0;
        horas++;
    } */


    document.getElementById("tiempo").innerText =
        (horas < 10 ? "0" + horas : horas) + ":" +
        (minutos < 10 ? "0" + minutos : minutos) + ":" +
        (segundos < 10 ? "0" + segundos : segundos);

    if(segundosReales==segundosUsuario)
        finalizarJuego();
}

function iniciar() {
    reiniciar();
    if (!intervalo) {
        intervalo = setInterval(actualizarTiempo, 1000);
    }
}

function pausar() {
    clearInterval(intervalo);
    intervalo = null;
}

function reiniciar() {
    pausar();
    segundos = 0;
    minutos = 0;
    horas = 0;
    segundosReales=0;
    document.getElementById("tiempo").innerText = "00:00:00";
}