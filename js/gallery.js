const imgs = [
    ["../images/cobra.png", "Snake head", "Snake head in the game"],
    ["../images/apple.png", "Apple", "Apple - food in the game"],
    ["../images/wall.png", "Wall", "Wall in hard mode"]
];
let i = 0;
const img = document.getElementById("galleryImg");
const cap = document.getElementById("galleryCaption");

function show(n) {
    i = (n + imgs.length) % imgs.length;
    img.src = imgs[i][0];
    img.alt = imgs[i][1];
    cap.textContent = imgs[i][2];
}

document.getElementById("prevBtn").onclick = () => show(i - 1);
document.getElementById("nextBtn").onclick = () => show(i + 1);
img.onmouseenter = () => cap.textContent = "Hover: " + imgs[i][2];
img.onmouseleave = () => cap.textContent = imgs[i][2];

show(0);
setInterval(() => show(i + 1), 3000);
