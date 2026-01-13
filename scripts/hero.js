'use strict'

const hero = document.querySelector(".hero");

const showProjectsBtn = document.getElementById("showProjects");
const backToIntroBtn = document.getElementById("backToIntro");

const contactModal = document.getElementById("contactModal");
const openContactBtn = document.getElementById("openContact");
const closeContactBtn = contactModal?.querySelector(".close-contact");

const canvasOverlay = document.querySelector(".canvas-overlay");


// -------------------------
// HERO LAYERS SWITCH
// -------------------------

function setHeroState(state) {
    if (!hero) return;

    hero.classList.remove("state-intro", "state-projects");
    hero.classList.add(state);
}

showProjectsBtn?.addEventListener("click", () => {
    setHeroState("state-projects");
    canvasOverlay?.classList.add("projects");
});

backToIntroBtn?.addEventListener("click", () => {
    setHeroState("state-intro");
    canvasOverlay?.classList.remove("projects");
});

// -------------------------
// CONTACT MODAL
// -------------------------

openContactBtn?.addEventListener("click", () => {
    hero?.classList.add("modal-hidden");
    contactModal?.classList.remove("hidden");
});

closeContactBtn?.addEventListener("click", () => {
    contactModal?.classList.add("hidden");
    hero?.classList.remove("modal-hidden");
});

