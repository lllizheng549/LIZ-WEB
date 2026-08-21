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

const animationDuration = 4500;


/* =========================
   Door opening GIF
========================= */

const doorOpenGif =
    "images/entry/door-open.gif";

const doorGifDuration = 635;


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
           Start GIF from frame 1
        */

        doorHoverImage.style.opacity = "1";

        doorHoverImage.src =
            doorOpenGif +
            "?t=" +
            Date.now();


        /*
           GIF:
           25 frames / 30fps
           ≈ 0.83 seconds

           After playback, hold on door-05.
        */

        setTimeout(function () {

            /*
               Make sure the mouse is
               still inside the door area.
            */

            if (isDoorHovering) {

                doorHoverImage.src =
                    "images/entry/door-05.png";

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
           Immediately return to
           the closed door image.
        */

        doorHoverImage.style.opacity = "0";

        doorHoverImage.src = "";

    }
);


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
   Start the complete door-opening GIF
   as the main Entry animation.
*/

doorImage.src =
    doorOpenGif +
    "?t=" +
    Date.now();


/*
   After the GIF finishes,
   hold on the final open-door frame.
*/

setTimeout(function () {

    doorImage.src =
        "images/entry/door-05.png";

}, doorGifDuration);
        
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

            /*
               GIF duration:
               25 frames / 30fps
               ≈ 0.83 seconds
            */


            /*
               Scale when door is fully open.

               During the GIF,
               the camera only moves
               a little.
            */

            const openingScale = 1.5;


            let scale;


            if (
                elapsed <= doorGifDuration
            ) {

                /*
                   Door is opening.

                   Slow, gentle movement.
                */

                const p =
                    elapsed /
                    doorGifDuration;


                scale =
                    startScale +
                    (
                        openingScale -
                        startScale
                    ) * p;

            }

            else {

                /*
                   Door is fully open.

                   Continue zooming and
                   gradually accelerate.
                */

                const p =
                    (
                        elapsed -
                        doorGifDuration
                    )
                    /
                    (
                        animationDuration -
                        doorGifDuration
                    );


                /*
                   Smooth acceleration.
                */

                const eased =
                   Math.pow(p * 1.5);


                scale =
                    openingScale +
                    (
                        finalScale -
                        openingScale
                    ) * eased;

            }


            entryScene.style.transform =
                `scale(${scale})`;


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
