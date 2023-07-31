const $timeRemaining = document.querySelector(".display__time-left");
const $endTime = document.querySelector(".display__end-time");

let intervalId;

const $buttons = document.querySelectorAll("button[data-time]");
$buttons.forEach($button => $button.addEventListener("click", () => setTime($button.dataset.time)));

const $personalMinutes = document.querySelector("#custom");
$personalMinutes.addEventListener("submit", event => {
    event.preventDefault();

    const minutes = document.getElementsByName("minutes")[0].value;
    setTime(minutes * 60);
});

function setTime(seconds) {
    if(intervalId) clearInterval(intervalId);
    intervalId = setInterval(setTime, 1000);

    setTime();

    function setTime() {
        if(seconds === 0) clearInterval(intervalId);

        const minutesRemaining = Math.floor(seconds / 60);
        const secondsRemaining = seconds % 60;
        $timeRemaining.innerText = minutesRemaining + ":" + (secondsRemaining < 10 ? "0" : "") + secondsRemaining;

        seconds--;
    };
    
    const today = new Date();
    today.setTime(today.getTime() + seconds * 1000);
    $endTime.innerText = `Be back at ${today.getHours()}:${(today.getMinutes() < 10 ? "0" : "") + today.getMinutes()}`;
}