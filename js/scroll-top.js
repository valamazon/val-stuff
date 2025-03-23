// Get elements
let scrollTopBtn = document.getElementById("scrollTopBtn");
let playBtn = document.getElementById("playBtn");

// Audio setup
let audio = new Audio("audios/lets-be-still.mp3");
let isPlaying = false;

// Toggle play/pause on button click
playBtn.addEventListener("click", function() {
    if (isPlaying) {
        audio.pause();
        playBtn.classList.remove("playing"); // Show play icon
    } else {
        audio.play().then(() => {
            playBtn.classList.add("playing"); // Show pause icon
        }).catch(error => console.error("Playback error:", error));
    }
    isPlaying = !isPlaying;
});

// Show the scroll button only when scrolled down
window.onscroll = function() {
    if (document.body.scrollTop > window.innerHeight || document.documentElement.scrollTop > window.innerHeight) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
};

// Function to smoothly scroll to the top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}