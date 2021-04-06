// Variables
var newGameButton = document.getElementById("newGame");
var global1 = document.getElementById("global1");
var global2 = document.getElementById("global2");
var round1 = document.getElementById("round1");
var round2 = document.getElementById("round2");
var dicee = document.getElementById("dicee");
var save = document.getElementById("save");
var reload = document.getElementById("reload");
var player1 = true;
var player2 = false;
var cliked = false;
var scoreGlobal = 0;
var newGameBool = true;

// Game
newGameButton.addEventListener("click", function () {
  newGame();
  alert();
  deleteWin();
});

save.addEventListener("click", () => {
  cliked = true;
  hold();
  if (global1.innerText >= 100) {
    win("Player1 ");
    deleteAlert();
  } else if (global2.innerText >= 100) {
    win("Player2 ");
    deleteAlert();
  }
});

reload.addEventListener("click", () => {
  scoreGlobal = roundDicee();
});

// Functions Modal
var modal = null;
const focusableSelector = "button, a, input, textarea";
let focusables = [];
let previouslyFocusElement = null;

const openModal = function (e) {
  e.preventDefault();
  modal = document.querySelector(e.target.getAttribute("href"));
  focusables = Array.from(modal.querySelectorAll(focusableSelector));
  modal.style.display = null;
  previouslyFocusElement = document.querySelector(":focus");
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .addEventListener("click", stopPropagation);
};

const closeModal = function (e) {
  if (modal == null) return;
  if (previouslyFocusElement !== null) previouslyFocusElement.focus();
  e.preventDefault();
  window.setTimeout(function () {
    modal.style.display = "none";
    modal = null;
  }, 250);
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-close")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-modal-stop")
    .removeEventListener("click", stopPropagation);
};

const stopPropagation = function (e) {
  e.stopPropagation();
};

const focusInModal = function (e) {
  e.preventDefault();
  let index = focusables.findIndex((f) => f === modal.querySelector(":focus"));
  if (e.shiftKey === true) {
    index--;
  } else {
    index++;
  }
  if (index >= focusables.length) {
    index = 0;
  }
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
  console.log(index);
};

document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});


//Function alert
function alert() {
  var alertDiv = document.getElementById("alert");
  alertDiv.style.display = "block";
}

function deleteAlert() {
  var alertDiv = document.getElementById("alert");
  alertDiv.style.display = "none";
}

function win() {
  var winDiv = document.getElementById("winAlert");
  winDiv.style.display = "block";
}

function deleteWin() {
  var winDiv = document.getElementById("winAlert");
  winDiv.style.display = "none";
}

// function Game
function newGame() {
  global1.innerText = 0;
  global2.innerText = 0;
  round1.innerText = 0;
  round2.innerText = 0;
}

function changeBackground(url) {
  dicee.style.background = "url(" + url + ") no-repeat center";
}

function randomDicee() {
  var diceeResult = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  switch (diceeResult) {
    case 1:
      changeBackground("/images/un.png");
      break;
    case 2:
      changeBackground("/images/deux.png");
      break;
    case 3:
      changeBackground("/images/trois.png");
      break;
    case 4:
      changeBackground("/images/quatre.png");
      break;
    case 5:
      changeBackground("/images/cinq.png");
      break;
    case 6:
      changeBackground("/images/six.png");
      break;
    default:
      break;
  }
  return diceeResult;
}

function roundDicee() {
  var res = randomDicee();
  if (player1 == true) {
    if (res != 1) {
      player1 = true;
      player2 = false;
      round2.innerText = 0;
    } else {
      player1 = false;
      player2 = true;
      round1.innerText = 0;
    }
  } else {
    if (res != 1) {
      player1 = false;
      player2 = true;
      round1.innerText = 0;
    } else {
      player1 = true;
      player2 = false;
      round2.innerText = 0;
    }
  }
  return roundScore(res);
}

function roundScore(result) {
  var score = 0;
  if (player1) {
    if (result == 1) {
      round1.innerText = 0;
    } else {
      var number1 = Number(round1.innerText);
      round1.innerText = number1 + result;
      score = round1.innerText;
    }
  } else {
    if (result == 1) {
      round2.innerText = 0;
    } else {
      var number2 = Number(round2.innerText);
      round2.innerText = number2 + result;
      score = round2.innerText;
    }
  }
  return score;
}

function hold() {
  var result = 0;
  if (cliked) {
    if (player1) {
      var num1 = Number(round1.innerText);
      var num2 = Number(global1.innerText);
      result = num1 + num2;
      global1.innerText = result;
      player1 = false;
      player2 = true;
    } else {
      var num1 = Number(round2.innerText);
      var num2 = Number(global2.innerText);
      result = num1 + num2;
      global2.innerText = result;
      player1 = true;
      player2 = false;
    }
    cliked = false;
  }
}
