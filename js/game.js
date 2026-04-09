
// ╔══════════════════════╗
// ║   הגדרות ראשוניות   ║
// ╚══════════════════════╝

//הגדרות לפי רמות קושי שונות
const difficulty = localStorage.getItem("snakeDifficulty") || "medium";
let speed;
let appleCount = 1; // ברירת מחדל

switch (difficulty) {
    //רמת קושי -קל 
    case "easy":
        speed = 250; // איטי
        appleCount = 1;
        break;
    //רמת קושי -בינוני 
    case "medium":
        speed = 180; // ברירת מחדל
        appleCount = 2;
        break;
    //רמת קושי -קשה 
    case "hard":
        speed = 90; // מהיר
        appleCount = 5;
        break;
    //ברירת מחדל
    default:
        speed = 180;
}

// ╔════════════════════════════╗
// ║         DOM וקנבס         ║
// ╚════════════════════════════╝

//שמירת שם משתמש  
const username = localStorage.getItem("snakeUsername") || "אורח";
// הצגת שם משתמש ורמת קושי
//document.getElementById("welcome").textContent = `hello ${username} | Difficulty level: ${difficulty}`;

document.getElementById("usernameDisplay").innerText = `welcome ${username} 
level = ${difficulty}`;

// קבלת הקנבס וההקשר הדו־ממדי
const canvas = document.getElementById("myCanvas");
const context = canvas.getContext("2d");

// הגדרות בסיסיות למשחק
let boxSize;
let gridWidth;  // כמה תאים לרוחב
let gridHeight; // כמה תאים לגובה

const screenWidth = window.innerWidth;

// התאמה לפי גודל מסך
if (screenWidth >= 1800) {
    boxSize = 40;      // נחש גדול
    gridWidth = 30;    // 1200px
    gridHeight = 25;   // 1000px
} else if (screenWidth <= 480) {
    boxSize = 15;      // נחש קטן
    gridWidth = 20;    // 300px
    gridHeight = 20;   // 300px
} else {
    boxSize = 20;      // ברירת מחדל
    gridWidth = 28;    // 560px
    gridHeight = 24;   // 480px
}

// קביעת הגודל האמיתי של הקנבס
canvas.width = gridWidth * boxSize;
canvas.height = gridHeight * boxSize;


// ╔════════════════════════════╗
// ║        טעינת תמונות       ║
// ╚════════════════════════════╝

const headImg = new Image();
headImg.src = "../images/cobra.png";

const appleImg = new Image();
appleImg.src = "../images/apple.png";

const wallImg = new Image();
wallImg.src = "../images/wall.png";


// ╔════════════════════════════╗
// ║    מצב ראשוני של המשחק    ║
// ╚════════════════════════════╝

// מיקום התחלה מדויק באמצע הלוח
let startX = Math.floor(canvas.width / (2 * boxSize)) * boxSize;
let startY = Math.floor(canvas.height / (2 * boxSize)) * boxSize;

//הגדרת נחש-מערך דינמי
let snake = [{ x: startX, y: startY }];

//הגדרת כיוון ברירת מחדל
let direction = "RIGHT";

//הגדרת מערך החומה
let walls = [];

//הפעלת פונקציה לבניית חומה לרמת קושי - קשה
if (difficulty === "hard") {
    walls = generateWall();
}

//קריאה לפונקציה ליצירת תפוח
let foods = [];
for (let i = 0; i < appleCount; i++) {
    foods.push(generateFood());
}

//משתנה לשמירת ניקוד
let score = 0;
//משתנה לשמירת שיא אחרון
let highScore = parseInt(localStorage.getItem(`snakeHighScore_${username}`)) || 0;


// ╔════════════════════════════╗
// ║        פונקציות עזר       ║
// ╚════════════════════════════╝

//פונקצית חץ להצגת ניקוד בזמן אמת
const updateScoreDisplay = () => {
    document.getElementById("scoreBoard").textContent = `points: ${score} | record: ${highScore}`;
};

//איפוס מסך 
updateScoreDisplay();

// יצירת תפוח במיקום רנדומלי
function generateFood() {
    let food;
    let collision;
    do {
        const foodX = Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize;
        const foodY = Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize;
        food = { x: foodX, y: foodY };
        // בדיקת התנגשות עם הנחש או הקירות
        collision = snake.some(part => part.x === food.x && part.y === food.y) ||
            walls.some(block => block.x === food.x && block.y === food.y);

    } while (collision);
    return food;
}

//פונקציה ליצירת החומה
function generateWall() {
    const wall = [];
    const wallLength = 10;

    // יצירת מיקום רנדומלי לחומה בתוך הגבולות כך שתכנס במסך
    const maxX = Math.floor(canvas.width / boxSize) - wallLength;
    const maxY = Math.floor(canvas.height / boxSize) - 1;

    const startX = Math.floor(Math.random() * maxX);
    const y = Math.floor(Math.random() * maxY);

    for (let i = 0; i < wallLength; i++) {
        wall.push({ x: (startX + i) * boxSize, y: y * boxSize });
    }

    return wall;
}


//ציור המשחק
function draw() {
    context.fillStyle = "#d9f2d9";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // גודל תמונות
    const elementSize = boxSize + 6;
    const elementOffset = (elementSize - boxSize) / 2;

    // ציור ראש הנחש - מוגדל ומרוכז
    context.drawImage(headImg, snake[0].x - elementOffset, snake[0].y - elementOffset, elementSize, elementSize);
    
    // ציור גוף הנחש כעיגולים
    context.fillStyle = "green";
    for (let i = 1; i < snake.length; i++) {
        context.beginPath();
        context.arc(snake[i].x + boxSize / 2, snake[i].y + boxSize / 2, boxSize / 2 - 1, 0, Math.PI * 2);
        context.fill();
    }

    // ציור התפוחים עם הגודל והמרכוז המתאים
    for (let f of foods) {
        context.drawImage(appleImg, f.x - elementOffset, f.y - elementOffset, elementSize, elementSize);
    }

    // ציור החומה
    for (let block of walls) {
        context.drawImage(wallImg, block.x, block.y, boxSize, boxSize);
    }
}



// עדכון מצב המשחק
function update() {
    //ראש הנחש הנוכחי
    const head = { x: snake[0].x, y: snake[0].y };


    // עדכון מיקום ראש הנחש לפי כיוון
    if (direction === "UP") head.y -= boxSize;
    else if (direction === "DOWN") head.y += boxSize;
    else if (direction === "LEFT") head.x -= boxSize;
    else if (direction === "RIGHT") head.x += boxSize;


    // בדיקת הפסד – פגיעה בקיר
    let gameOver = false;

    if (head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height) {
        gameOver = true;
    }
    // בדיקת הפסד - פגיעה בחומה
    for (let block of walls) {
        if (head.x === block.x && head.y === block.y) {
            gameOver = true;
            break;
        }
    }
    // בדיקת הפסד – פגיעה בעצמו
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            break;
        }

    }

    if (gameOver) {    //אם היה הפסד במשחק
        clearInterval(gameInterval);  // עוצר את הלולאה שמרעננת את המשחק

        //שקופית game over
        context.fillStyle = "rgba(105, 90, 90, 0.5)";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = "white";
        context.font = "40px Arial";
        context.textAlign = "center";
        context.fillText("Game Over!", canvas.width / 2, canvas.height / 2);

        // מעבר לדף השיאים לאחר עיכוב של 1.5 שניות
        setTimeout(() => {
            window.location.href = "scorch.html";
        }, 1500);

        return;
    }


    // הוספת ראש חדש
    snake.unshift(head);


    //בדיקה האם אכל תפוח
    //הגדלת הניקוד
    //שמירת שיא קודם 
    let ateFood = false;

    for (let i = 0; i < foods.length; i++) {
        if (head.x === foods[i].x && head.y === foods[i].y) {
            foods[i] = generateFood(); // החלפת התפוח שנאכל
            score++;
            ateFood = true;
            if (score > highScore) {
                highScore = score;
                localStorage.setItem(`snakeHighScore_${username}`, highScore);
            }
            break;
        }
    }

    if (!ateFood) {
        snake.pop();
    }

    updateScoreDisplay();


    // ציור ראשוני
    draw();
}


// ╔════════════════════════════╗
// ║         אירועים           ║
// ╚════════════════════════════╝

//שליטה על המקשים
window.addEventListener("keydown", handleKeyDown);

let normalSpeed = speed; // מהירות רגילה לפי רמת קושי
let fastSpeed = 50;      // מהירות מהירה בלחיצה ארוכה
let gameInterval = null;

// הפעלה/הפסקה מחודשת של הלולאה עם המהירות הנוכחית
function startGameLoop() {
    clearInterval(gameInterval);
    gameInterval = setInterval(update, speed);
}


// הפעלת הלולאה לראשונה
startGameLoop();
// מאזין ללחיצה ארוכה על חיצים - מאיץ את הנחש
window.addEventListener("keydown", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        if (speed !== fastSpeed) {
            speed = fastSpeed;
            // הוספת קלאס למהירות גבוהה
            canvas.classList.add("fast-speed");  
            startGameLoop();
        }
    }
});

// מאזין לשחרור מקש - מחזיר למהירות רגילה
window.addEventListener("keyup", (e) => {
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        if (speed !== normalSpeed) {
            speed = normalSpeed;
            // הסרת הקלאס
            canvas.classList.remove("fast-speed");
            startGameLoop();
        }
    }
});


//שימוש באוביקט event
function handleKeyDown(event) {
    switch (event.key) {
        case "ArrowUp":
            if (direction !== "DOWN") direction = "UP";
            break;
        case "ArrowDown":
            if (direction !== "UP") direction = "DOWN";
            break;
        case "ArrowLeft":
            if (direction !== "RIGHT") direction = "LEFT";
            break;
        case "ArrowRight":
            if (direction !== "LEFT") direction = "RIGHT";
            break;
    }
}



