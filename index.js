const cards = document.querySelectorAll(".card");
var firstCard, secondCard;
var lock = false;
var isFlipped = false;
const labelTimer = document.querySelector(".labelTimer");
const btn = document.querySelector(".btn");
const container = document.querySelector(".container");
const btnCont = document.querySelector(".contbtn");

let time, timer;
const startLogOutTimer = function (time = 15) {
  const tick = function () {
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);

    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    // When 0 seconds, stop timer and log out user
    if (time === -1) {
      labelTimer.textContent = `00:00`;
      clearInterval(timer);
      //   alert("TIME'S UP Kindly play Again");
      finish();
    }

    // Decrease 1s
    time--;
  };

  // Set time to 5 minutes
  time = 25;

  // Call the timer every second
  tick();
  timer = setInterval(tick, 1000);

  return timer;
};

const finish = function () {
  cards.forEach(function (card) {
    card.removeEventListener("click", flip);
    // secondCard.removeEventListener("click", flip);
  });
  container.style.display = "none";
  btnCont.style.display = "inline";

  let c = 0;
  for (let i = 0; i < cards.length; i++) {
    let card = cards[i];
    if (!card.classList.contains("flip")) {
      alert("try again");
      c = 1;
      break;
    }
  }
  if (c == 0) alert("You won");

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    container.style.display = "flex";
    btnCont.style.display = "none";
    cards.forEach(function (card) {
      card.addEventListener("click", flip);
      // secondCard.removeEventListener("click", flip);
    });
    if (timer) clearInterval(timer);
    startLogOutTimer();

    cards.forEach(function (card) {
      if (card.classList.contains("flip")) card.classList.remove("flip");
    });
  });
};

cards.forEach((card) => card.addEventListener("click", flip));

function flip() {
  if (lock) return;

  if (this === firstCard) return;

  this.classList.add("flip");
  if (!isFlipped) {
    isFlipped = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  check();
}

function check() {
  var isMatch = firstCard.dataset.image === secondCard.dataset.image;
  isMatch ? success() : failed();
}

function success() {
  firstCard.removeEventListener("click", flip);
  secondCard.removeEventListener("click", flip);
  reset();
}

function failed() {
  lock = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    reset();
  }, 1000);
}

function reset() {
  [isFlipped, lock] = [false, false];
  [firstCard, secondCard] = [null, null];
  // if (timer) clearInterval(timer);
  // startLogOutTimer(time);
}

(function shuffle() {
  cards.forEach((card) => {
    var position = Math.floor(Math.random() * 16);
    card.style.order = position;
  });
})();

startLogOutTimer();
