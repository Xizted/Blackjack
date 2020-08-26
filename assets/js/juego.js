const miModulo = (() => {
  /**
   * - C = Club (treboles)
   * - D = Diamonds (Diamantes)
   * - H = Hearts (Corazones)
   * - S = Swords (Espadas)
   *
   */

  "use strict";

  let deck = [],
    puntosJugadores = [];
  const tipos = ["C", "D", "H", "S"],
    especiales = ["A", "J", "Q", "K"];

  /*******************************************
    - Referencia del HTML
  *******************************************/

  const btnPedir = document.querySelector("#btnPedir"),
    btnDetener = document.querySelector("#btnDetener"),
    btnNuevo = document.querySelector("#btnNuevo"),
    divCartasJugadores = document.querySelectorAll(".divCartas"),
    puntosHTML = document.querySelectorAll("small");

  /*******************************************
   - Esta funcion inicializa el juego
  *******************************************/

  const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach((element) => (element.innerText = 0));
    divCartasJugadores.forEach((element) => (element.innerHTML = ""));

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  /*******************************************
    - Esta funcion crea un nuevo deck
  *******************************************/

  const crearDeck = () => {
    deck = [];
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

    return _.shuffle(deck);
  };

  /*******************************************
    - Esta funcion toma una carta
  *******************************************/

  const pedirCarta = () => {
    if (deck.length === 0) {
      throw "No hay cartas en el deck";
    }
    return deck.pop();
  };

  /****************************************************
    - Esta funcion obtiene el valor de la carta
  *****************************************************/

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === "A" ? 11 : 10) : parseInt(valor);
  };

  /*******************************************
   - Esta funcion calculara los puntos de los
   jugadores
  *******************************************/

  // turno: 0 = Jugador... Turno: ultimo = Computadora

  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
  };

  /*******************************************
    - Crear Carta Nueva en el Dom
  *******************************************/

  const crearCarta = (carta, turno) => {
    const imgCartas = document.createElement("img");
    imgCartas.src = `assets/cartas/${carta}.png`;
    imgCartas.classList.add("carta");
    divCartasJugadores[turno].append(imgCartas);
  };

  /*******************************************
   - Esta funcion calcula que jugador fue
   el ganador
  *******************************************/

  const determinarGanador = () => {
    const [puntajeMinimo, puntosComputadora] = puntosJugadores;

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
    - Esta funcion comenzara el turno de la 
   computadora
  *******************************************/

  const turnoComputadora = (puntajeMinimo) => {
    let puntosComputadora = 0;
    do {
      const carta = pedirCarta();
      puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
    } while (puntosComputadora < puntajeMinimo && puntajeMinimo < 21);

    determinarGanador();
  };

  /*******************************************
    - Eventos
  *******************************************/

  /*******************************************
    - Pedir Carta
  *******************************************/

  btnPedir.addEventListener("click", () => {
    const carta = pedirCarta();
    let puntosJugador = acumularPuntos(carta, 0);
    crearCarta(carta, 0);
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
    turnoComputadora(puntosJugadores[0]);
  });

  /*******************************************
    - Nuevo Juego
  *******************************************/

  btnNuevo.addEventListener("click", () => {
    console.clear();
    inicializarJuego();
  });

  return { nuevoJuego: inicializarJuego };
})();
