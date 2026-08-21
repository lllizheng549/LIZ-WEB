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

const animationDuration = 2500;


/*
   25 frames / 30fps
   ≈ 0.833 seconds
*/

const doorGifDuration = 850;


/*
   Zoom
*/

const startScale = 1;

const openingScale = 1.5;

const finalScale = 20;


/* =========================
   Images
========================= */

const doorOpenGif =
    "images/entry/door-open.gif";

const doorOpenImage =
    "images/entry/door-05.png";


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
           Start GIF.
        */

        doorHoverImage.style.opacity = "1";

        doorHoverImage.src =
            doorOpenGif +
            "?t=" +
            Date.now();


        /*
           After the GIF finishes,
           hold on door-05.
        */

        setTimeout(function () {

            if (
                isDoorHovering &&
                !isEntering
            ) {

                doorHoverImage.src =
                    doorOpenImage;

            }

        }, doorGifDuration);

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
           Return immediately
           to the closed image.
        */

        doorHoverImage.style.opacity = "0";

        doorHoverImage.src = "";

    }
);


/* =========================
   ENTRY click
========================= */

entryButton.addEventListener(
    "click",
    function () {

        if (isEntering) return;

        isEntering = true;

        isDoorHovering = false;


        /*
           Disable ENTRY.
        */

        entryButton.style.pointerEvents =
            "none";


        /*
           Hide hover GIF.
        */

        doorHoverImage.style.opacity = "0";

        doorHoverImage.src = "";


        /*
           Use the opening GIF
           as the main Entry animation.
        */

        doorImage.src =
            doorOpenGif +
            "?t=" +
            Date.now();


        /*
           Start Zoom.
        */

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
               Zoom
            ========================== */

            const gifProgress =
                Math.min(
                    elapsed / doorGifDuration,
                    1
                );


            let scale;


            if (gifProgress < 1) {

                /*
                   Door is opening.

                   Very gentle Zoom.
                */

                scale =
                    startScale +
                    (
                        openingScale -
                        startScale
                    ) *
                    gifProgress;

            }

            else {

                /*
                   Door is fully open.

                   Continue Zoom and
                   gradually accelerate.
                */

                const zoomProgress =
                    (
                        elapsed -
                        doorGifDuration
                    ) /
                    (
                        animationDuration -
                        doorGifDuration
                    );


                const p =
                    Math.min(
                        zoomProgress,
                        1
                    );


                /*
                   Smooth acceleration.
                */

                const eased =
                    p * p;


                scale =
                    openingScale +
                    (
                        finalScale -
                        openingScale
                    ) *
                    eased;

            }


            entryScene.style.transform =
                `scale(${scale})`;


            /* =========================
               Continue
            ========================== */

            if (progress < 1) {

                requestAnimationFrame(
                    animate
                );

            }

            else {

                window.location.href =
                    "home.html";

            }

        }


        requestAnimationFrame(
            animate
        );

    }
);
