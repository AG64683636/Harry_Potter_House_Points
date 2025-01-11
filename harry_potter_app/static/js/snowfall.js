/**
 * Initializes the snowfall effect on the canvas element.
 * Creates and animates snowflakes falling across the screen.
 */
document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("snowfall-canvas");
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    /** 
     * Array to store all active snowflakes.
     * Each snowflake is represented as an object with properties:
     * - x: Horizontal position.
     * - y: Vertical position.
     * - radius: Size of the snowflake.
     * - speed: Falling speed.
     * - opacity: Transparency of the snowflake.
     */
    const snowflakes = [];

    /**
     * Creates a single snowflake with random properties and adds it to the snowflakes array.
     * The snowflake starts above the canvas to create a continuous effect.
     */
    function createSnowflake() {
        const x = Math.random() * width;
        const y = Math.random() * -height; // Start above the canvas
        const radius = Math.random() * 2 + 1; // Random size between 1 and 3
        const speed = Math.random() * 1 + 0.7; // Random speed between 0.7 and 1.7
        const opacity = Math.random() * 0.5 + 0.5; // Random opacity between 0.5 and 1.0

        snowflakes.push({ x, y, radius, speed, opacity });
    }

    /**
     * Draws and updates the positions of all snowflakes.
     * - Clears the canvas.
     * - Moves each snowflake downward and applies a slight horizontal sway.
     * - Recreates snowflakes that fall off the screen to maintain the effect.
     */
    function updateSnowflakes() {
        ctx.clearRect(0, 0, width, height); // Clear the canvas
        ctx.beginPath();

        snowflakes.forEach((flake, index) => {
            // Set fill style for snowflake opacity
            ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;

            // Draw the snowflake
            ctx.moveTo(flake.x, flake.y);
            ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2, true);

            // Update snowflake position
            flake.y += flake.speed; // Fall vertically
            flake.x += Math.sin(flake.y / 50) * 0.5; // Sway horizontally

            // Remove snowflakes that go off screen and replace them with new ones
            if (flake.y > height) {
                snowflakes.splice(index, 1); // Remove the snowflake
                createSnowflake(); // Create a new snowflake
            }
        });

        ctx.fill(); // Render the snowflakes
        requestAnimationFrame(updateSnowflakes); // Continue animation
    }

    /**
     * Adjusts the canvas size on window resize to match the new dimensions.
     * Also updates the width and height variables for proper snowflake positioning.
     */
    window.addEventListener("resize", () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });

    // Initialize snowfall with 100 snowflakes
    for (let i = 0; i < 100; i++) {
        createSnowflake();
    }

    // Start the snowfall animation
    updateSnowflakes();
});
