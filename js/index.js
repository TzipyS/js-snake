
// מאזין לאירוע שליחת הטופס ומונע את ההתנהגות ברירת המחדל כדי לטפל בנתונים באופן מותאם אישית
document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    // שמירת שם משתמש שימוש ב להסרת רווחים trim
    const username = document.getElementById("username").value.trim();

    //הוספת בדיקת וולידציה עם ביטוי רגולרי5 
    const usernameRegex = /^[a-zA-Z0-9]{3,15}$/;
    if (!usernameRegex.test(username)) {
        alert("שם המשתמש חייב להכיל בין 3 ל-15 תווים, אותיות או מספרים בלבד.");
        return; // עצור את ההמשך אם לא תקין
    }
    
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
        window.location.href = "html/game.html";
    }
});
