document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();

    if (username) {
        // שמירת שם המשתמש הנוכחי
        localStorage.setItem("snakeUsername", username);

        // הוספת המשתמש לרשימת המשתמשים אם הוא לא קיים שם כבר
        let users = JSON.parse(localStorage.getItem("snakeUsers")) || [];
        if (!users.includes(username)) {
            users.push(username);
            localStorage.setItem("snakeUsers", JSON.stringify(users));
        }
        // שמירת רמת קושי
        const difficulty = document.getElementById("difficultySelect").value;
        localStorage.setItem("snakeDifficulty", difficulty);

        // מעבר לעמוד המשחק
        window.location.href = "game.html";
    }
});
