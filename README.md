# Snake Game (HTML, CSS & JavaScript)

A browser-based **Snake** game built as a high-school web programming project. Play in the browser, pick a difficulty level, save personal high scores, and compete on a local leaderboard.

**Live repo:** [github.com/TzipyS/js-snake](https://github.com/TzipyS/js-snake)

---

## Features

- **Player login** — enter a username (validated with RegExp) and choose difficulty
- **Three difficulty modes** — easy, medium, and hard (speed, apple count, and walls vary)
- **Canvas gameplay** — snake movement with arrow keys; hold a key to move faster
- **Custom graphics** — snake head, apples, and wall tiles
- **Score tracking** — current score and personal best per player
- **High score table** — sorted leaderboard, delete players, play again or switch user
- **Responsive layout** — adapts to desktop, tablet, and mobile screen sizes
- **Client-side storage** — names and scores persist in `localStorage` while using the same browser

---

## Tech stack

| Layer        | Technologies                          |
| ------------ | ------------------------------------- |
| Structure    | HTML5 (forms, tables, canvas)         |
| Styling      | CSS3 (Flexbox, media queries, animations) |
| Logic        | JavaScript (DOM, events, Canvas API)  |
| Data         | `localStorage` (no backend required)    |

---

## How to run

No build step or server is required.

1. Clone the repository:
   ```bash
   git clone https://github.com/TzipyS/js-snake.git
   cd js-snake
   ```
2. Open **`index.html`** in a modern browser (Chrome, Edge, Firefox).
   - Double-click the file, or  
   - Use **Live Server** / any static file server from the project root.

3. Enter a username (3–15 English letters or digits), select difficulty, and click **Start game**.

---

## Game flow

```
index.html  →  html/game.html  →  html/scorch.html
   (login)        (play)            (high scores)
```

- **Arrow keys** — move the snake  
- **Long press** on an arrow — temporary speed boost  
- **Game over** — automatic redirect to the high score page after ~1.5 seconds  

---

## Difficulty levels

| Level  | Speed   | Apples | Extra        |
| ------ | ------- | ------ | ------------ |
| Easy   | Slower  | 1      | —            |
| Medium | Default | 2      | —            |
| Hard   | Fast    | 5      | Random wall  |

---

## Project structure

```
js-snake/
├── index.html          # Main entry (login)
├── html/
│   ├── game.html       # Snake game (canvas)
│   ├── scorch.html     # High score table
│   ├── index.html      # Alternate entry page
│   └── HighscoreTable.html
├── js/
│   ├── index.js        # Login validation & navigation
│   ├── game.js         # Game loop & canvas rendering
│   ├── scorch.js       # Leaderboard & user management
│   └── main.js         # Alternate entry script
├── css/                # Page styles (entry, game, scores)
├── images/             # apple.png, cobra.png, wall.png
└── ספר פרויקט/         # Project documentation (Hebrew)
```

---

## Validation & JavaScript examples

- **RegExp** — username must be 3–15 characters (`a–z`, `A–Z`, `0–9`)
- **confirm** — prompt before deleting a player from the leaderboard
- **alert** — feedback for invalid input or missing username

---

## Data stored in `localStorage`

| Key                    | Description              |
| ---------------------- | ------------------------ |
| `snakeUsername`        | Current player name      |
| `snakeDifficulty`      | Selected difficulty      |
| `snakeUsers`           | JSON list of all players |
| `snakeHighScore_<name>`| Personal best per player |

Clearing browser data removes all saved scores.

---

## Author

**Tzipi Zinger** — Web programming project (Grade 10), Technicians track — Communications  
Instructor: Mrs. Zicherman · School year: 2025–2026

---

## License

Educational project. Feel free to view and learn from the code; please ask before reusing it in other published work.
