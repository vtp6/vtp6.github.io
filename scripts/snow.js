(function() {
    // Create and inject CSS
    const styleSheet = document.createElement("style");
    styleSheet.textContent = `
        .snowflake {
            position: fixed;
            top: -10px;
            color: white;
            font-size: 1em;
            font-family: Arial, sans-serif;
            text-shadow: 0 0 5px rgba(255,255,255,0.7);
            filter: drop-shadow(0 0 10px white);
            cursor: default;
            user-select: none;
            z-index: 999999;
            pointer-events: none;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
        }

        @keyframes snowfall {
            0% {
                transform: translateY(0vh) translateX(0) rotate(0deg);
            }
            100% {
                transform: translateY(100vh) translateX(20px) rotate(360deg);
            }
        }

        #snow-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 999;
        }
    `;
    document.head.appendChild(styleSheet);

    // Configuration options
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

    // Create container for snowflakes
    const container = document.createElement('div');
    container.id = 'snow-container';
    document.body.appendChild(container);

    // Create a single snowflake
    function createSnowflake() {
        if (container.children.length >= config.density) return;

        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.innerHTML = config.snowflakes[Math.floor(Math.random() * config.snowflakes.length)];

        // Random properties
        const startPositionX = Math.random() * window.innerWidth;
        const size = Math.random() * (config.maxSize - config.minSize) + config.minSize;
        const duration = Math.random() * (config.maxDuration - config.minDuration) + config.minDuration;
        const windOffset = Math.random() * config.wind;

        // Apply styles
        Object.assign(snowflake.style, {
            left: startPositionX + 'px',
            transform: `scale(${size})`,
            opacity: Math.random() * 0.6 + 0.4,
            animation: `snowfall ${duration}s linear infinite`
        });

        // Add to container and set cleanup
        container.appendChild(snowflake);
        setTimeout(() => snowflake.remove(), duration * 1000);
    }

    // Start snowfall effect
    function startSnowfall() {
        // Create initial batch
        for (let i = 0; i < 10; i++) createSnowflake();
        
        // Continue creating snowflakes
        setInterval(createSnowflake, config.interval);
    }

    // Handle window resize
    window.addEventListener('resize', () => {
        const snowflakes = container.getElementsByClassName('snowflake');
        for (let flake of snowflakes) {
            if (parseInt(flake.style.left) > window.innerWidth) {
                flake.style.left = Math.random() * window.innerWidth + 'px';
            }
        }
    });

    // Start the effect
    startSnowfall();
})();