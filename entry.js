const entryButton =
    document.getElementById("entryButton");

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

    entryButton.style.pointerEvents = "none";


    /* =========================
       Door 01
    ========================== */

    doorImage.src = doorFrames[0];


    /* =========================
       Door 02
    ========================== */

    setTimeout(function () {

        doorImage.src = doorFrames[1];

        entryScene.classList.add("zoom-1");

    }, 450);


    /* =========================
       Door 03
    ========================== */

    setTimeout(function () {

        doorImage.src = doorFrames[2];

        entryScene.classList.remove("zoom-1");

        entryScene.classList.add("zoom-2");

    }, 900);


    /* =========================
       Door 04
    ========================== */

    setTimeout(function () {

        doorImage.src = doorFrames[3];

        entryScene.classList.remove("zoom-2");

        entryScene.classList.add("zoom-3");

    }, 1350);


    /* =========================
       Final push
    ========================== */

    setTimeout(function () {

        entryScene.classList.remove("zoom-3");

        entryScene.classList.add("zoom-final");

    }, 1800);


    /* =========================
       Homepage
    ========================== */

    setTimeout(function () {

        window.location.href = "home.html";

    }, 2700);

});
