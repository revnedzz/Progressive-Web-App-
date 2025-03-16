const images = ["images/apple.jpg", "images/banana.jpg", "images/cherry.jpg", "images/lemon.jpg"];
const slots = [document.getElementById("slot1"), document.getElementById("slot2"), document.getElementById("slot3")];
const resultText = document.getElementById("result");
const spinButton = document.getElementById("spinButton");

spinButton.addEventListener("click", () => {
    let results = [];

    // Randomly assign images to slots
    for (let i = 0; i < slots.length; i++) {
        let randomIndex = Math.floor(Math.random() * images.length);
        slots[i].src = images[randomIndex];
        results.push(images[randomIndex]);
    }

    // Check if all slots match
    if (results[0] === results[1] && results[1] === results[2]) {
        resultText.textContent = "🎉 You Win! 🎉";
        resultText.style.color = "green";
    } else {
        resultText.textContent = "❌ Try Again!";
        resultText.style.color = "red";
    }
});

// PWA Service Worker Registration
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js")
        .then(() => console.log("Service Worker Registered"))
        .catch(error => console.log("Service Worker Registration Failed:", error));
}

// PWA Install Button
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;

    let installButton = document.createElement("button");
    installButton.textContent = "Install Game";
    installButton.style.cssText = "display:block;margin:20px auto;padding:10px;background:green;color:white;border:none;border-radius:5px;cursor:pointer;";

    document.body.appendChild(installButton);

    installButton.addEventListener("click", () => {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choice => {
            if (choice.outcome === "accepted") {
                console.log("User installed the app");
            }
            installButton.style.display = "none";
        });
    });
});