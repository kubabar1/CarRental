let interval: NodeJS.Timeout;

export function scrollTop() {
    interval = setInterval(scrollStep, 10);
}

function scrollStep() {
    if (window.pageYOffset === 0) {
        clearInterval(interval);
    }
    window.scroll(0, window.pageYOffset - 50);
}
