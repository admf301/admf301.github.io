import React, { useState, useEffect } from "react";

const GRID_SIZE = 4;
const CHK_INTERVAL = 1000;
const GAME_DURATION = 30;

/* eslint-disable react-hooks/exhaustive-deps */
const Game = () => {
    const [grid, setGrid] = useState(() => {
        const initialGrid = Array.from(
            { length: GRID_SIZE },
            () => Array.from({ length: GRID_SIZE }, () => 0)
        );
        return initialGrid;
    });

    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [timer, setTimer] = useState(GAME_DURATION);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isLoseScreenVisible, setIsLoseScreenVisible] = useState(false);

    // For touch / swipe on mobile
    const [touchStart, setTouchStart] = useState(null);

    const Tile = ({ value, id }) => {
        const tileColor = getTileColor(value);
        return (
            <div id={id} className="tile" style={{ backgroundColor: tileColor }}>
                {value !== 0 ? value : ""}
            </div>
        );
    };

    const GameBoard = ({ grid }) => {
        return (
            <div className="game-board">
                {grid.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((value, colIndex) => (
                            <div key={`${rowIndex}-${colIndex}`} className="cell">
                                <Tile value={value} id={`tile-${rowIndex}-${colIndex}`} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        );
    };

    const initializeGrid = () => {
        const newGrid = Array.from(
            { length: GRID_SIZE },
            () => Array.from({ length: GRID_SIZE }, () => 0)
        );
        setGrid(newGrid);
        updateScore(0);
        addNewTile(newGrid);
        addNewTile(newGrid);
    };

    const addNewTile = (currentGrid) => {
        let emptyCells = [];
        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 0; j < GRID_SIZE; j++) {
                if (currentGrid[i][j] === 0) {
                    emptyCells.push({ x: i, y: j });
                }
            }
        }
        if (emptyCells.length > 0) {
            let randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            currentGrid[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4;
        }
        setGrid([...currentGrid]);
    };

    const getTileColor = (value) => {
        switch (value) {
            case 2:     return "#4CAF50";
            case 4:     return "#8BC34A";
            case 8:     return "#CDDC39";
            case 16:    return "#FFEB3B";
            case 32:    return "#FFC107";
            case 64:    return "#FF9800";
            case 128:   return "#FF5722";
            case 256:   return "#F44336";
            case 512:   return "#E91E63";
            case 1024:  return "#EC407A";
            case 2048:  return "#9C27B0";
            default:    return "#A7B0B8";
        }
    };

    const updateScore = (value) => {
        // Keep score + high score in sync
        setScore((prevScore) => {
            const newScore = prevScore + value;
            setHighScore((prevHigh) => Math.max(prevHigh, newScore));
            return newScore;
        });
    };

    const isGameOver = () => {
        if (!grid || grid.length === 0) {
            return false;
        }

        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (grid[row][col] === 0) {
                    return false;
                }
            }
        }

        for (let row = 0; row < GRID_SIZE; row++) {
            for (let col = 0; col < GRID_SIZE; col++) {
                if (
                    (row < GRID_SIZE - 1 && grid[row][col] === grid[row + 1][col]) ||
                    (col < GRID_SIZE - 1 && grid[row][col] === grid[row][col + 1])
                ) {
                    return false;
                }
            }
        }

        return true;
    };

    const startTimer = () => {
        if (!isTimerRunning && score === 0) {
            setIsTimerRunning(true);
        }
    };

    const displayLoseScreen = () => {
        setIsLoseScreenVisible(true);
    };

    const checkGameOverAndDisplay = () => {
        if (isGameOver()) {
            setIsTimerRunning(false);
            displayLoseScreen();
        }
    };

    const restartGame = () => {
        setScore(0);
        setIsTimerRunning(false);
        setTimer(GAME_DURATION);
        setIsLoseScreenVisible(false);
        initializeGrid();
    };

    const moveUp = () => {
        let moved = false;
        const newGrid = [...grid];

        for (let j = 0; j < GRID_SIZE; j++) {
            for (let i = 1; i < GRID_SIZE; i++) {
                for (let k = i; k > 0; k--) {
                    if (
                        newGrid[k][j] !== 0 &&
                        (newGrid[k - 1][j] === 0 || newGrid[k - 1][j] === newGrid[k][j])
                    ) {
                        if (newGrid[k - 1][j] === 0) {
                            newGrid[k - 1][j] = newGrid[k][j];
                            newGrid[k][j] = 0;
                            moved = true;
                        } else if (newGrid[k - 1][j] === newGrid[k][j]) {
                            newGrid[k - 1][j] *= 2;
                            newGrid[k][j] = 0;
                            moved = true;
                            updateScore(newGrid[k - 1][j]);
                        }
                    }
                }
            }
        }

        if (moved) {
            addNewTile(newGrid);
            setGrid(newGrid);
        }
        return moved;
    };

    const moveDown = () => {
        let moved = false;
        const newGrid = [...grid];

        for (let j = 0; j < GRID_SIZE; j++) {
            for (let i = GRID_SIZE - 2; i >= 0; i--) {
                for (let k = i; k < GRID_SIZE - 1; k++) {
                    if (
                        newGrid[k][j] !== 0 &&
                        (newGrid[k + 1][j] === 0 || newGrid[k + 1][j] === newGrid[k][j])
                    ) {
                        if (newGrid[k + 1][j] === 0) {
                            newGrid[k + 1][j] = newGrid[k][j];
                            newGrid[k][j] = 0;
                            moved = true;
                        } else if (newGrid[k + 1][j] === newGrid[k][j]) {
                            newGrid[k + 1][j] *= 2;
                            newGrid[k][j] = 0;
                            moved = true;
                            updateScore(newGrid[k + 1][j]);
                        }
                    }
                }
            }
        }

        if (moved) {
            addNewTile(newGrid);
            setGrid(newGrid);
        }
        return moved;
    };

    const moveLeft = () => {
        let moved = false;
        const newGrid = [...grid];

        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = 1; j < GRID_SIZE; j++) {
                for (let k = j; k > 0; k--) {
                    if (
                        newGrid[i][k] !== 0 &&
                        (newGrid[i][k - 1] === 0 || newGrid[i][k - 1] === newGrid[i][k])
                    ) {
                        if (newGrid[i][k - 1] === 0) {
                            newGrid[i][k - 1] = newGrid[i][k];
                            newGrid[i][k] = 0;
                            moved = true;
                        } else if (newGrid[i][k - 1] === newGrid[i][k]) {
                            newGrid[i][k - 1] *= 2;
                            newGrid[i][k] = 0;
                            moved = true;
                            updateScore(newGrid[i][k - 1]);
                        }
                    }
                }
            }
        }

        if (moved) {
            addNewTile(newGrid);
            setGrid(newGrid);
        }
        return moved;
    };

    const moveRight = () => {
        let moved = false;
        const newGrid = [...grid];

        for (let i = 0; i < GRID_SIZE; i++) {
            for (let j = GRID_SIZE - 2; j >= 0; j--) {
                for (let k = j; k < GRID_SIZE - 1; k++) {
                    if (
                        newGrid[i][k] !== 0 &&
                        (newGrid[i][k + 1] === 0 || newGrid[i][k + 1] === newGrid[i][k])
                    ) {
                        if (newGrid[i][k + 1] === 0) {
                            newGrid[i][k + 1] = newGrid[i][k];
                            newGrid[i][k] = 0;
                            moved = true;
                        } else if (newGrid[i][k + 1] === newGrid[i][k]) {
                            newGrid[i][k + 1] *= 2;
                            newGrid[i][k] = 0;
                            moved = true;
                            updateScore(newGrid[i][k + 1]);
                        }
                    }
                }
            }
        }

        if (moved) {
            addNewTile(newGrid);
            setGrid(newGrid);
        }
        return moved;
    };

    // Keyboard controls (WASD)
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (!isTimerRunning || isGameOver() || isLoseScreenVisible) {
                return;
            }

            let moved = false;
            switch (event.key) {
                case "w":
                    moved = moveUp();
                    break;
                case "s":
                    moved = moveDown();
                    break;
                case "a":
                    moved = moveLeft();
                    break;
                case "d":
                    moved = moveRight();
                    break;
                default:
                    return;
            }

            if (moved) {
                checkGameOverAndDisplay();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isTimerRunning, isLoseScreenVisible]);

    // Timer
    useEffect(() => {
        let timerId;
        if (isTimerRunning && timer > 0) {
            timerId = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            clearInterval(timerId);
            displayLoseScreen();
        }

        return () => clearInterval(timerId);
    }, [timer, isTimerRunning]);

    // Initial setup + periodic game-over check
    useEffect(() => {
        initializeGrid();
        const intervalId = setInterval(checkGameOverAndDisplay, CHK_INTERVAL);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    // Touch handlers for mobile swipe
    const handleTouchStart = (e) => {
        const touch = e.touches[0];
        setTouchStart({
            x: touch.clientX,
            y: touch.clientY,
        });
    };

    const handleTouchEnd = (e) => {
        if (!touchStart) return;

        // Respect same conditions as keyboard
        if (!isTimerRunning || isGameOver() || isLoseScreenVisible) {
            setTouchStart(null);
            return;
        }

        const touch = e.changedTouches[0];
        const dx = touch.clientX - touchStart.x;
        const dy = touch.clientY - touchStart.y;

        const absX = Math.abs(dx);
        const absY = Math.abs(dy);
        const swipeThreshold = 30; // px threshold

        if (absX < swipeThreshold && absY < swipeThreshold) {
            setTouchStart(null);
            return;
        }

        let moved = false;

        if (absX > absY) {
            // Horizontal swipe
            if (dx > 0) {
                moved = moveRight();
            } else {
                moved = moveLeft();
            }
        } else {
            // Vertical swipe
            if (dy > 0) {
                moved = moveDown();
            } else {
                moved = moveUp();
            }
        }

        if (moved) {
            checkGameOverAndDisplay();
        }

        setTouchStart(null);
    };

    return (
        <div
            className="game-board-container"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="game-board">
                <GameBoard grid={grid} />
            </div>

            <div id="score-container">
                <span>Score: </span>
                <span id="score">{score}</span>
            </div>

            <div id="high-score-container">
                <span>High Score: </span>
                <span id="high-score">{highScore}</span>
            </div>

            <div id="timer-container">
                <span>Time Left: </span>
                <span id="timer">{timer}</span>
            </div>

            <button id="start-button" className="btn btn-primary" onClick={startTimer}>
                Start
            </button>
            <button id="reset-button" className="btn btn-primary" onClick={restartGame}>
                Reset
            </button>

            {isLoseScreenVisible && (
                <div id="lose-screen" className="lose-screen">
                    <h2>Game Over!</h2>
                </div>
            )}
        </div>
    );
};
/* eslint-disable react-hooks/exhaustive-deps */

export default Game;
