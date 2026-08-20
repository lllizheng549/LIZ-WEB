const entryButton =
    document.getElementById("entryButton");

const entryPage =
    document.getElementById("entryPage");

const entryScene =
    document.getElementById("entryScene");

const doorImage =
    document.getElementById("doorImage");


let isEntering = false;


const doorFrames = [

    "images/entry/door-01.png",
    "images/entry/door-02.png",
    "images/entry/door-03.png",
    "images/entry/door-04.png"

];


entryButton.addEventListener("click", function () {

    if (isEntering) return;

    isEntering = true;


    /* =========================
       Disable button
    ========================== */

    entryButton.style.pointerEvents = "none";


    /* =========================
       Frame 1
    ========================== */

    doorImage.src = doorFrames[0];


    /* =========================
       Frame 2
    ========================== */

    setTimeout(function () {

        doorImage.src = doorFrames[1];

        entryScene.classList.add("zoom-1");

    }, 700);


    /* =========================
       Frame 3
    ========================== */

    setTimeout(function () {

        doorImage.src = doorFrames[2];

        entryScene.classList.add("zoom-2");

    }, 1400);


    /* =========================
       Frame 4
    ========================== */

    setTimeout(function () {

        doorImage.src = doorFrames[3];

        entryScene.classList.add("zoom-3");

    }, 2100);


    /* =========================
       Final zoom
    ========================== */

    setTimeout(function () {

        entryScene.classList.add("zoom-final");

    }, 2800);


    /* =========================
       Go to homepage
    ========================== */

    setTimeout(function () {

        window.location.href = "home.html";

    }, 4300);

});
    }, 3300);

});

