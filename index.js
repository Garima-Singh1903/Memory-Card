const cards = document.querySelectorAll(".card");
var firstCard, secondCard;
var lock = false;
var isFlipped = false;
const labelTimer = document.querySelector(".labelTimer");
console.log("Project");
cards.forEach(card => 
    card.addEventListener("click", flip));


    const startLogOutTimer = function () {
        const tick = function () {
          const min = String(Math.trunc(time / 60)).padStart(2, 0);
          const sec = String(time % 60).padStart(2, 0);
      
          // In each call, print the remaining time to UI
          labelTimer.textContent = `${min}:${sec}`;
      
          // When 0 seconds, stop timer and log out user
          if (time === 0) {
            clearInterval(timer);
            alert("TIME'S UP");
            
          }
      
          // Decrease 1s
          time--;
        };
      
        // Set time to 5 minutes
        let time = 20;
      
        // Call the timer every second
        tick();
        const timer = setInterval(tick, 1000);
      
        return timer;
      };

function flip() {
    if (lock)
    return;

    if (this === firstCard)
    return;

    this.classList.add("flip");
    if(!isFlipped){
        isFlipped = true;
        firstCard = this;
        return;
    }
    secondCard = this;
    check();
}

function check() {
    var isMatch = firstCard.dataset.image === 
    secondCard.dataset.image;
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
    if(timer) clearInterval(timer);
    startLogOutTimer();
}

(function shuffle() {
    cards.forEach(card => {
        var position = Math.floor(Math.random() * 16);
        card.style.order = position;
    });
})();

startLogOutTimer();
