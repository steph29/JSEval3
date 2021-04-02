// Variables
var newGameButton = document.getElementById("newGame");
var round = document.getElementsByClassName("round");
var global1 = document.getElementById("global1");
var global2 = document.getElementById("global2");
var round1 = document.getElementById("round1");
var round2 = document.getElementById("round2");
var dicee = document.getElementById("dicee");
var save = document.getElementById("save");
var reload = document.getElementById("reload");
var player1 = true;
var player2 = false;

// Game
newGameButton.addEventListener("click", function () {
  newGame();
});

reload.addEventListener("click", () => {
  roundDicee();
});

// Functions
function newGame() {
  console.log("remise des scores à 0");
  global1.innerText = "0";
  global2.innerText = "0";
  round1.innerText = "0";
  round2.innerText = "0";
}

function changeBackground(url) {
  dicee.style.background = "url(" + url + ") no-repeat center";
}

function randomDicee() {
  var diceeResult = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
  console.log(diceeResult);
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
  roundScore(res);
}

function roundScore(result) {
  var score = 0;
  if (player1) {
    if (result == 1) {
      round1.innerText = 0;
    } else {
      var number1 = Number(round1.innerText);
      round1.innerText = number1 + result;
    }
    score = round1.innerText;
  } else {
    if (result == 1) {
      round2.innerText = 0;
    } else {
      var number2 = Number(round2.innerText);
      round2.innerText = number2 + result;
    }

    score = round2.innerText;
  }
  return score;
}
