'use strict';

/* ==================================================
   MAIN APPLICATION CONTROLLER
   ==================================================
   - Controls the Conway simulation flow
   - Handles timing, animation loop and world lifecycle
   - Connects engine, renderer and UI controls together
*/


import { createLifeEngine } from "./lifeEngine.js";
import { createLifeCanvas } from "./lifeCanvas.js";



// Constans

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const conwayGeneration = document.getElementById("generationCycle");
const LIFE_STEP_MS = 250;



// Variables

let generationCounter = 0;
let lastStep = 0;
let engine = null;
let renderer = null;



// Updating Function - Generation Counter

function updateGenerationCounter() {
    if (conwayGeneration) {
        conwayGeneration.textContent = generationCounter;
    }
}



// Calculates Cell Size

function getCellSize() {
    const width = window.innerWidth;

    if (width < 600)
        return 14;
    if (width > 1920)
        return 8;
    return 10;
}



// Create or restart the world

function createWorld(seed = 0.11) {

    // Resize Canvas
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cellSize = getCellSize();

    // Get New Conway Engine
    engine = createLifeEngine(
        canvas.width,
        canvas.height,
        cellSize,
        seed
    );

    // Get New Conway Renderer
    renderer = createLifeCanvas(ctx, cellSize);

    // Reset Background Color
    renderer.painTheBackground();

    // Reset Generation Counter
    generationCounter = 0;
    updateGenerationCounter();

    // Reset Timing
    lastStep = 0;
}



// Animating Main Conway Simulation

function conwaySimulation(time) {

    if (!engine || !renderer) {
        requestAnimationFrame(conwaySimulation);
        return;
    }

    // Simulation step
    if (time - lastStep > LIFE_STEP_MS) {
        engine.step();
        generationCounter++;
        updateGenerationCounter();
        lastStep = time;
    }

    // Render Grid
    renderer.gridRender(engine.getGrid());

    requestAnimationFrame(conwaySimulation);
}



// Start

createWorld();
requestAnimationFrame(conwaySimulation);



// Resize event stats new simulation

window.addEventListener("resize", () => {
    createWorld();
});



// Seed controll buttons start new simulation

document.querySelectorAll(".seed-controls button").forEach(button => {
    button.addEventListener("click", () => {
        const newSeedProbability = Number(button.dataset.seed);
        createWorld(newSeedProbability);
    });
});

