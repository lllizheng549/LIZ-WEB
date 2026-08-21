const entryButton =
    document.getElementById("entryButton");

const entryScene =
    document.getElementById("entryScene");

const doorImage =
    document.getElementById("doorImage");

const doorHoverImage =
    document.getElementById("doorHoverImage");

const doorHotspot =
    document.getElementById("doorHotspot");


/* =========================
   State
========================= */

let isEntering = false;

let isDoorHovering = false;


/* =========================
   Animation settings
========================= */

/*
   Total duration of the Entry zoom.

   3000 = 3 seconds
*/

const animationDuration = 3000;


/* =========================
   Door opening GIF
========================= */

const doorOpenGif =
    "images/entry/door-open.gif";


/* =========================
   Door hover
========================= */

doorHotspot.addEventListener(
    "mouseenter",
    function () {

        if (isEntering) return;

        if (isDoorHovering) return;

        isDoorHovering = true;


        /*
           Clear the previous GIF.
           This makes sure the next hover
           starts from frame 1.
        */

        doorHoverImage.style.opacity = "0";

        doorHoverImage.src = "";


        requestAnimationFrame(function () {

            /*
               Add a timestamp so the browser
               treats this as a new GIF load.
            */

            doorHoverImage.src =
                doorOpenGif +
                "?t=" +
                Date.now();

            doorHoverImage.style.opacity = "1";

        });

    }
);


/* =========================
   Door mouse leave
========================= */

doorHotspot.addEventListener(
    "mouseleave",
    function () {

        isDoorHovering = false;


        /*
           Immediately return to
           the closed door image.
        */

        doorHoverImage.style.opacity = "0";

        doorHoverImage.src = "";

    }
);


/* =========================
   Zoom door frames
========================= */

const doorFrames = [

    "images/entry/door-01.png",
    "images/entry/door-02.png",
    "images/entry/door-03.png",
    "images/entry/door-04.png",
    "images/entry/door-05.png"

];


const frameTimes = [

    0.00,
    0.20,
    0.40,
    0.60,
    0.78

];


/* =========================
   Zoom settings
========================= */

const startScale = 1;

const finalScale = 20;


/* =========================
   ENTRY click
========================= */

entryButton.addEventListener(
    "click",
    function () {

        /*
           Prevent double clicking.
        */

        if (isEntering) return;

        isEntering = true;


        /*
           Stop the door hover effect.
        */

        isDoorHovering = false;

        doorHoverImage.style.opacity = "0";

        doorHoverImage.src = "";


        /*
           Disable ENTRY button
           only after the animation starts.
        */

        entryButton.style.pointerEvents =
            "none";


        const startTime =
            performance.now();


        function animate(currentTime) {

            const elapsed =
                currentTime - startTime;


            /*
               0 → 1
            */

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

                requestAnimationFrame(
                    animate
                );

            }

            else {

                /*
                   Zoom finished.
                */

                setTimeout(
                    function () {

                        window.location.href =
                            "home.html";

                    },
                    250
                );

            }

        }


        /*
           Start animation.
        */

        requestAnimationFrame(
            animate
        );

    }
);
