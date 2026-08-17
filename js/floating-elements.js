const scrollTopButton = document.getElementById("scrollTopButton");

if (scrollTopButton) {
    window.onscroll = () => {
        const scrollPosition = document.documentElement.scrollTop;
        if (scrollPosition > window.innerHeight) {
            scrollTopButton.classList.add("show");
        } else {
            scrollTopButton.classList.remove("show");
        }
    };

    window.scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
}
