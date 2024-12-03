const config = {
    snowflakes: ['❄', '❅', '❆'],       // Snowflake characters
    density: 50,                       // Maximum number of snowflakes
    interval: 75,                      // Interval between snowflake creation (ms)
    minSize: 0.8,                      // Minimum snowflake size
    maxSize: 1.5,                      // Maximum snowflake size
    minDuration: 5,                    // Minimum animation duration (s)
    maxDuration: 15,                   // Maximum animation duration (s)
    wind: 20,                          // Maximum wind effect (px)
    zIndex: 999                        // z-index for the container
};

const container = document.createElement('div');
container.id = 'snow-container';
document.body.appendChild(container);

function createSnowflake() {
    if (container.children.length >= config.density) return;

    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    snowflake.innerHTML = config.snowflakes[Math.floor(Math.random() * config.snowflakes.length)];

    const startPositionX = Math.random() * window.innerWidth;
    const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
    const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
    const windOffset = Math.random() * config.wind;

    Object.assign(snowflake.style, {
        left: startPositionX + 'px',
        transform: `scale(${size})`,
        opacity: Math.random() * 0.6 + 0.4,
        animation: `snowfall ${duration}s linear infinite`
    });

    container.appendChild(snowflake);
    setTimeout(() => snowflake.remove(), duration * 1000);
}

window.addEventListener('resize', () => {
    const snowflakes = container.getElementsByClassName('snowflake');
    for (let flake of snowflakes) {
        if (parseInt(flake.style.left) > window.innerWidth) {
            flake.style.left = Math.random() * window.innerWidth + 'px';
        }
    }
});

for (let i = 0; i < 10; i++) createSnowflake();
setInterval(createSnowflake, config.interval);