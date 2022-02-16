//DOM
const timerTop = document.querySelector('.timer_top');
const timerBot = document.querySelector('.timer_bot');
const sliderTop = document.querySelector('.slider_top');
const sliderBot = document.querySelector('.slider_bot');
const timeTop = document.querySelector('.time_top');
const timeBot = document.querySelector('.time_bot');

let activeTimer;
let countdown;

function sliderHeight(slider, timer, duration) {
  slider.style.height = `${timer/duration*100}%`;
}

function startTimer(duration, display, slider, box) {
    let timer = duration-1, minutes, seconds;
    countdown = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        sliderHeight(slider, timer, duration);

        if (timer<=5) box.classList.add('warning');

        if (--timer < 0) {
            timer = 0;
        }
    }, 1000);
}

function main() {
  timerTop.addEventListener('click', function () {
    if (activeTimer!=1) {
      clearInterval(countdown);
      timerTop.classList.remove('warning');
      timerTop.classList.remove('active');
      sliderTop.style.height = `100%`;
      timeTop.textContent = "01:00";
      timerBot.classList.add('active');
      activeTimer = 1;
      startTimer(60, timeBot, sliderBot, timerBot);
    }
  });
  timerBot.addEventListener('click', function () {
    if (activeTimer!=0) {
      clearInterval(countdown);
      timerBot.classList.remove('warning');
      timerBot.classList.remove('active');
      sliderBot.style.height = `100%`;
      timeBot.textContent = "01:00";
      timerTop.classList.add('active');
      activeTimer = 0;
      startTimer(60, timeTop, sliderTop, timerTop);
    }
  });
}

main();
