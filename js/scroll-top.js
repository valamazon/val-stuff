// Get elements
const scrollTopBtn = document.getElementById("scrollTopBtn");
const playBtn = document.getElementById("playBtn");
const audioFile = document.body.getAttribute('data-audio');

// If valid audio file, set up and handle functionality
if (audioFile) {
    const audio = new Audio(audioFile);
    audio.loop = true; // Enable looping
    let isPlaying = false;

    // Toggle play/pause on button click
    playBtn.addEventListener("click", () => {
        isPlaying ? audio.pause() : audio.play().catch(console.error);
        playBtn.classList.toggle("playing", !isPlaying);
        isPlaying = !isPlaying;
    });

    // Show the scroll button only when scrolled down
    window.onscroll = () => {
        scrollTopBtn.style.display = (document.documentElement.scrollTop > window.innerHeight) ? "block" : "none";
    };

    // Function to smoothly scroll to the top
    window.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
} else {
    console.error("No valid audio file specified in the 'data-audio' attribute.");
}
