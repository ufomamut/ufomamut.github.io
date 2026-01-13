'use strict';

/* ==================================================
   LIFE ENGINE
   ==================================================
   - Core logic of Conway’s Game of Life
   - Manages grid state, seeding and generation steps
   - Contains no rendering or timing logic
*/


export function createLifeEngine(width, height, cellSize, initialSeedProbability = 0.11) {

    // Calculating rows & columns

    const cols = Math.floor(width / cellSize);
    const rows = Math.floor(height / cellSize);

    let seedProbability = initialSeedProbability;
    let grid = [];



    // First Grid - Dead Cells

    function createEmptyGrid() {
        const emptyGrid = [];

        for (let y = 0; y < rows; y++) {

            emptyGrid[y] = [];

            for (let x = 0; x < cols; x++) {
                emptyGrid[y][x] = false;
            }
        }
        return emptyGrid;
    }



    // First Generation Initialization

    function seedGrid(targetGrid) {
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                targetGrid[y][x] = Math.random() < seedProbability;
            }
        }
    }



    // Counting living neighbors - Helper function

    function countLiveNeighbors(x, y) {
        let count = 0;

        for (let dy = -1; dy <= 1; dy++) {
            for (let dx = -1; dx <= 1; dx++) {

                if (dx === 0 && dy === 0)
                    continue;

                const nx = x + dx;
                const ny = y + dy;

                if (nx < 0 || nx >= cols || ny < 0 || ny >= rows)
                    continue;

                if (grid[ny][nx])
                    count++;
            }
        }
        return count;
    }



    // Conway's generation calculation

    function step() {
        const nextGrid = createEmptyGrid();

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {

                const alive = grid[y][x];
                const neighbors = countLiveNeighbors(x, y);

                if (alive) {
                    nextGrid[y][x] = (neighbors === 2 || neighbors === 3);
                } else {
                    nextGrid[y][x] = (neighbors === 3);
                }
            }
        }
        grid = nextGrid;
    }



    // Reset & seed new grid

    function reset(newSeedProbability) {
        if (typeof newSeedProbability === "number") 
            seedProbability = newSeedProbability;

        grid = createEmptyGrid();
        seedGrid(grid);
    }



    // Grid - Getter function

    function getGrid() {
        return grid;
    }



    // Start Initialization

    reset();



    // public API

    return {
        getGrid,
        step,
        reset
    };
}