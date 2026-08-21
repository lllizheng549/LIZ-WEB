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
   Total Entry zoom duration.

   2500 = 2.5 seconds
*/

const animationDuration = 2500;


/*
   GIF duration.

   25 frames / 30fps
   ≈ 0.833 seconds
*/

const doorGifDuration = 850;


/*
   Zoom scale
*/

const startScale = 1;

const finalScale = 20;


/*
   Scale when the door has finished opening.

   The camera only moves a little
   while the door is opening.
*/

const openingScale = 1.5;


/* =========================
   Door GIF
========================= */

const doorOpenGif =
    "images/entry/door-open.gif";

const doorClosedImage =
    "images/entry/door-01.png";

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
           Start GIF from the beginning.
        */

        doorHoverImage.style.opacity = "1";

        doorHoverImage.src =
            doorOpenGif +
            "?t=" +
            Date.now();


        /*
           After GIF finishes,
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
           Immediately return
           to the closed door.
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
           Disable ENTRY button.
        */

        entryButton.style.pointerEvents =
            "none";


        /*
           Hide hover GIF first.
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
           Start time of the Zoom.
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

            let scale;


            if (
                progress <
                doorGifDuration /
                animationDuration
            ) {

                /*
                   Door is opening.

                   Move slowly from
                   scale 1 → openingScale.
                */

                const openingProgress =
                    progress /
                    (
                        doorGifDuration /
                        animationDuration
                    );


                scale =
                    startScale +
                    (
                        openingScale -
                        startScale
                    ) *
                    openingProgress;

            }

            else {

                /*
                   Door is fully open.

                   Continue toward the final
                   zoom position.

                   Smooth acceleration.
                */

                const zoomProgress =
                    (
                        progress -
                        (
                            doorGifDuration /
                            animationDuration
                        )
                    )
                    /
                    (
                        1 -
                        (
                            doorGifDuration /
                            animationDuration
                        )
                    );


                /*
                   Gradual acceleration.
                */

                const eased =
                    zoomProgress *
                    zoomProgress;


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

                /*
                   Zoom finished.
                */

                setTimeout(
                    function () {

                        window.location.href =
                            "home.html";

                    },
                    100
                );

            }

        }


        requestAnimationFrame(
            animate
        );

    }
);

    }
);
