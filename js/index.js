
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    if (!usernameRegex.test(username)) {
        alert("שם המשתמש חייב להכיל בין 3 ל-15 תווים, אותיות או מספרים בלבד.");
        return;
    }

    if (username) {
        const difficulty = document.getElementById("difficultySelect").value;

        sessionStorage.setItem("snakeUsername", username);
        sessionStorage.setItem("snakeDifficulty", difficulty);

        let users = JSON.parse(localStorage.getItem("snakeUsers")) || [];
        if (!users.includes(username)) {
            users.push(username);
            localStorage.setItem("snakeUsers", JSON.stringify(users));
        }

        window.location.href = "html/game.html";
    }
});
