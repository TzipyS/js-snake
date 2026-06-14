// ╔════════════════════════════╗
// ║        הגדרת משתנים       ║
// ╚════════════════════════════╝

//שמירת משתנה השומר את גוף הטבלה על מנת לאפשר הכנסת ערכים לטבלה
const tbody = document.querySelector("#scoreTable tbody");

//האלמנט שבו מציגים את שם המנצח הכללי
const winnerDiv = document.getElementById("winner");


function loadScoreTable() {
    // מנקה את הטבלה
    tbody.innerHTML = ""; 

    // טוען את רשימת המשתמשים ששיחקו מה-localStorage
    // אם לא קיימת רשימה - נשתמש במערך ריק
    const users = JSON.parse(localStorage.getItem("snakeUsers")) || [];
    
    // משתנים זמניים לאיתור המנצח
    let maxScore = -1;
    let winner = "";

// ╔════════════════════════════════════════════════╗
// ║ בניית מערך חדש שמכיל כל משתמש עם הניקוד שלו ║
// ╚════════════════════════════════════════════════╝
const userScores = users.map(user => ({
        name: user,
        score: parseInt(localStorage.getItem(`snakeHighScore_${user}`)) || 0
    }));

// שימוש בsort  מיון מהגבוה לנמוך   
userScores.sort((a, b) => b.score - a.score);

//יצירת שורת טבלה עבור כל משתמש והוספה לטבלה בפועל
    for (const userObj of userScores)  {
        // יוצר אלמנט <tr> חדש לטבלה
        const tr = document.createElement("tr");
        // מוסיף לתוך השורה: שם, ניקוד, וכפתור למחיקה
        tr.innerHTML = `
            <td>${userObj.name}</td>
            <td>${userObj.score}</td>
            <td><button class="delete-btn" data-username="${userObj.name}">Delete</button></td>
        `;

        // מוסיף את השורה לגוף הטבלה (tbody)
        tbody.appendChild(tr);

        // בדיקה אם יש ניקוד גבוה יותר - עדכון המנצח
        if (userObj.score > maxScore) {
            maxScore = userObj.score;
            winner = userObj.name;
        }
    }

    //הצגת שם המנצח אם קיים, או הודעה שאין ניקודים     
    winnerDiv.textContent = winner
        ? `overall winner ${winner} with a high score of ${maxScore}`
        : "No scores available.";


    //עם querySelectorAll הוספת מחלקה לכל כפתור מחיקה
    const deleteButtons = document.querySelectorAll(".delete-btn");
    deleteButtons.forEach(btn => {
        btn.classList.add("highlight-delete-button");
        btn.addEventListener("click", () => {
            const username = btn.getAttribute("data-username");
            deleteUser(username);
        });
    });
}

function deleteUser(username) {
    // תיבת אישור - שואל את המשתמש אם הוא בטוח שמחק את השחקן הזה
    if (!confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
        return; // המשתמש ביטל את המחיקה
    }

    // טוען את רשימת המשתמשים מה-localStorage
    let users = JSON.parse(localStorage.getItem("snakeUsers")) || [];
    
    // מסנן את המשתמש שביקשנו למחוק החוצה מהרשימה
    users = users.filter(user => user !== username);
    
    // שומר את הרשימה המעודכנת בחזרה ל-localStorage
    localStorage.setItem("snakeUsers", JSON.stringify(users));
    // מוחק גם את ערך השיא של המשתמש הזה
    localStorage.removeItem(`snakeHighScore_${username}`);

    loadScoreTable(); // רענון הטבלה מייד אחרי מחיקה
}

//פונקציה של לחצן שחק שוב 
document.getElementById("playAgainBtn").addEventListener("click", () => {
    const username = sessionStorage.getItem("snakeUsername");
    if (username) {
        window.location.href = "game.html";  // מתחיל משחק חדש עם השם הנוכחי
    } else {
        alert("לא נמצא שם משתמש! אנא היכנס/י מחדש.");
    }
});
//פונקציה של לחצן - החלף שחקן
document.getElementById("changeUserBtn").addEventListener("click", () => {
    window.location.href = "../index.html";
});



// טעינת הטבלה בהתחלה
loadScoreTable();
