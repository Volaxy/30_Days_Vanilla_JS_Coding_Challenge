const $video = document.querySelector(".player__video");
$video.addEventListener("click", playPauseVideo);

const $playPauseButton = document.querySelector(".player__button");
$playPauseButton.addEventListener("click", playPauseVideo);

function playPauseVideo() {
    if($video.paused) {
        $video.play();
    } else {
        $video.pause();
    }
}

// VOLUME
const $volume = document.querySelector("[name='volume']");
$volume.addEventListener("input", () => {
    $video.volume = $volume.value;
});

// PLAYBACK SPEED
const $playbackRate = document.querySelector("[name='playbackRate']");
$playbackRate.addEventListener("input", () => {
    $video.playbackRate = $playbackRate.value;
});

// SKIP SECONDS
const $skipSecondsButtons = document.querySelectorAll("[data-skip]");
$skipSecondsButtons.forEach($button => {
    $button.addEventListener("click", () => {
        $video.currentTime += Number($button.dataset.skip);
    });
});

// VIDEO PROGRESS
const $progressFilled = document.querySelector(".progress__filled");
$video.addEventListener("timeupdate", () => {
    if(!isClicked) {
        $progressFilled.style.width = `${$video.currentTime / $video.duration * 100}%`;
    }
});

// CLICK ON THE VIDEO PROGRESS
let isClicked = false;
const $progress = document.querySelector(".progress");
$progress.addEventListener("mousemove", event => {
    if(isClicked) {
        changeVideoProgress(event);
    }
});

$progress.addEventListener("click", event => {
    changeVideoProgress(event);
});

function changeVideoProgress(event) {
    $progressFilled.style.width = `${event.layerX}px`;

    $video.currentTime = $video.duration * event.layerX / $progress.offsetWidth;
}

$progress.addEventListener("mousedown", () => isClicked = true);
$progress.addEventListener("mouseup", () => isClicked = false);