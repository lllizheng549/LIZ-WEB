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
    "images/entry/door-04.png",
    "images/entry/door-05.png"

];

/*
   When each door frame appears.

   These percentages represent
   the progress of the zoom.
*/

const frameTimes = [

    0.00,
    0.20,
    0.40,
    0.60,
    0.78

];


/*
   Zoom starts here
   and ends here.
*/

const startScale = 1;

const finalScale = 20;


/* =========================
   Click
========================= */

entryButton.addEventListener("click", function () {

    if (isEntering) return;

    isEntering = true;

    entryButton.style.pointerEvents = "none";


   
 const startTime =
        performance.now();


    function animate(currentTime) {

        const elapsed =
            currentTime - startTime;


        const progress =
            Math.min(
                elapsed / animationDuration,
                1
            );


        /* =========================
           Continuous zoom
        ========================== */

        const scale =
            startScale +
            (finalScale - startScale)
            * progress;


        entryScene.style.transform =
            `scale(${scale})`;


        /* =========================
           Door frame
        ========================== */

        let currentFrame = 0;


        for (
            let i = 0;
            i < frameTimes.length;
            i++
        ) {

            if (
                progress >= frameTimes[i]
            ) {

                currentFrame = i;

            }

        }


        doorImage.src =
            doorFrames[currentFrame];


        /* =========================
           Continue animation
        ========================== */

        if (progress < 1) {

            requestAnimationFrame(animate);

        } else {

            /*
              Stay on final white frame
              for a very short moment,
              then enter homepage.
            */

            setTimeout(function () {

                window.location.href =
                    "home.html";

            }, 250);

        }

    }


    requestAnimationFrame(animate);

});
