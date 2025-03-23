// Get elements
const scrollTopButton = document.getElementById("scrollTopButton");
const playAudioButton = document.getElementById("playAudioButton");
const audioFile = document.body.getAttribute('data-audio');

// If valid audio file, set up and handle functionality
if (audioFile) {
    const audio = new Audio(audioFile);
    audio.loop = true; // Enable looping
    let isPlaying = false;

    // Toggle play/pause on button click
    playAudioButton.addEventListener("click", () => {
        isPlaying ? audio.pause() : audio.play().catch(console.error);
        playAudioButton.classList.toggle("playing", !isPlaying);
        isPlaying = !isPlaying;
    });

    // Show the scroll button only when scrolled down
    window.onscroll = () => {
        scrollTopButton.style.display = (document.documentElement.scrollTop > window.innerHeight) ? "block" : "none";
    };

    // Function to smoothly scroll to the top
    window.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
} else {
    console.error("No valid audio file specified in the 'data-audio' attribute.");
}
