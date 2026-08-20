const entryButton =
    document.getElementById("entryButton");

const entryPage =
    document.getElementById("entryPage");

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
       Door animation
    ========================== */

    let frame = 0;


    const doorAnimation =
        setInterval(function () {

            frame++;

            if (frame >= doorFrames.length) {

                clearInterval(doorAnimation);

                return;
            }


            doorImage.src =
                doorFrames[frame];

        }, 150);


    /* =========================
       Start zoom
    ========================== */

    setTimeout(function () {

        entryPage.classList.add("entering");

    }, 500);


    /* =========================
       White transition
    ========================== */

    setTimeout(function () {

        entryPage.classList.add("white");

    }, 2200);


    /* =========================
       Show homepage
    ========================== */

    setTimeout(function () {

        entryPage.classList.add("home");

    }, 2800);

});
