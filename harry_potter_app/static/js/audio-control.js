/**
 * Initializes the background audio and mute functionality.
 * - Handles autoplay restrictions in modern browsers.
 * - Adds event listeners for mute/unmute toggle and user-initiated audio play.
 */
document.addEventListener("DOMContentLoaded", () => {
    const audioElement = document.getElementById("background-audio");
    const muteButton = document.getElementById("mute-button");

    /**
     * Attempts to auto-play the audio when the page loads.
     * If auto-play is blocked, logs a message to the console.
     */
    audioElement.play().catch(() => {
        console.log("Auto-play blocked. Waiting for user interaction.");
    });

    /**
     * Handles user interaction to play the audio for browsers with stricter autoplay policies.
     * Removes event listeners after audio successfully starts playing.
     */
    const playAudioOnInteraction = () => {
        audioElement.play().then(() => {
            document.removeEventListener("click", playAudioOnInteraction);
            document.removeEventListener("keydown", playAudioOnInteraction);
        }).catch(() => {
            console.log("User interaction required to play audio.");
        });
    };

    // Add event listeners for user interaction to start audio
    document.addEventListener("click", playAudioOnInteraction);
    document.addEventListener("keydown", playAudioOnInteraction);

    /**
     * Toggles the mute state of the audio.
     * Updates the button text to reflect the current state (🔊 or 🔇).
     */
    muteButton.addEventListener("click", () => {
        if (audioElement.muted) {
            audioElement.muted = false;
            muteButton.textContent = "🔊"; // Unmuted state
        } else {
            audioElement.muted = true;
            muteButton.textContent = "🔇"; // Muted state
        }
    });
});
