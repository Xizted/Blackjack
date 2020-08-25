/**
 * - C = Club (treboles)
 * - D = Diamonds (Diamantes)
 * - H = Hearts (Corazones)
 * - S = Swords (Espadas)
 *
 */

let deck = [];
let tipos = ["C", "D", "H", "S"];
let especiales = ["A", "J", "Q", "K"];

let puntosJugador = 0,
  puntosComputadora = 0;

/*******************************************
 - Referencia del HTML
*******************************************/

const btnPedir = document.querySelector("#btnPedir");
const btnDetener = document.querySelector("#btnDetener");
const btnNuevo = document.querySelector("#btnNuevo");
const puntosHTML = document.querySelectorAll("small");
const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

/*******************************************
 - Esta funcion crea un nuevo deck
*******************************************/

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    for (let tipo of tipos) {
      deck.push(i + tipo);
    }
  }

  for (let tipo of tipos) {
    for (let especial of especiales) {
      deck.push(especial + tipo);
    }
  }

  deck = _.shuffle(deck);
  console.log(deck);
  return deck;
};

crearDeck();

/*******************************************
 - Esta funcion toma una carta
*******************************************/

const pedirCarta = () => {
  if (deck.length === 0) {
    throw "No hay cartas en el deck";
  }

  const carta = deck.pop();

  return carta;
};

/****************************************************
 - Esta funcion obtiene el valor de la carta
*****************************************************/

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : parseInt(valor);
};

/*******************************************
 - Esta funcion comenzara el turno de la 
   computadora
*******************************************/

const turnoComputadora = (puntajeMinimo) => {
  do {
    /*******************************************
     - Pedir una Carta y Mostrar el valor de 
    la carta en el DOM
    *******************************************/

    const carta = pedirCarta();
    puntosComputadora += valorCarta(carta);
    puntosHTML[1].innerText = puntosComputadora;

    /*******************************************
    - Crear Carta Nueva en el Dom
    *******************************************/

    const imgCartas = document.createElement("img");
    imgCartas.src = `assets/cartas/${carta}.png`;
    imgCartas.classList.add("carta");
    divCartasComputadora.append(imgCartas);

    if (puntajeMinimo > 21) {
      break;
    }
  } while (puntosComputadora < puntajeMinimo && puntajeMinimo < 21);

  /*******************************************
   - Alertas
  *******************************************/

  setTimeout(() => {
    if (puntajeMinimo === puntosComputadora) {
      alert("Nadie Gano");
    } else if (puntajeMinimo > 21 || puntosComputadora === 21) {
      alert("La computadora gana");
    } else if (puntosComputadora > 21 || puntajeMinimo === 21) {
      alert("El jugador gano");
    } else {
      alert("Computadora gana");
    }
  }, 1000);
};

/*******************************************
 - Eventos
*******************************************/

/*******************************************
 - Pedir Carta
*******************************************/

btnPedir.addEventListener("click", () => {
  /*******************************************
   - Pedir una Carta y Mostrar el valor de 
    la carta en el DOM
  *******************************************/

  const carta = pedirCarta();
  puntosJugador += valorCarta(carta);
  puntosHTML[0].innerText = puntosJugador;

  /*******************************************
   - Crear Carta Nueva en el Dom
  *******************************************/

  const imgCartas = document.createElement("img");
  imgCartas.src = `assets/cartas/${carta}.png`;
  imgCartas.classList.add("carta");
  divCartasJugador.append(imgCartas);

  /*******************************************
   - Verificar si el Jugador Gano o Perdio
  *******************************************/

  if (puntosJugador > 21) {
    console.warn("Lo siento mucho, perdiste.");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.warn("21, Genial");
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

/*******************************************
 - Terminar Turno
*******************************************/

btnDetener.addEventListener("click", () => {
  btnPedir.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

/*******************************************
 - Nuevo Juego
*******************************************/

btnNuevo.addEventListener("click", () => {
  console.clear();
  deck = [];
  deck = crearDeck();
  puntosJugador = 0;
  puntosComputadora = 0;
  for (const punto of puntosHTML) {
    punto.innerHTML = 0;
  }
  divCartasJugador.innerHTML = "";
  divCartasComputadora.innerHTML = "";
  btnPedir.disabled = false;
  btnDetener.disabled = false;
});
