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

        }, 850);

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

    "images/entry/door-02.png",
    "images/entry/door-03.png",
    "images/entry/door-04.png",
    "images/entry/door-05.png"

];




const frameTimes = [
    0.00,
    0.083,
    0.167,
    0.250,
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

           let zoomProgress;

if (progress < 0.10) {

    /*
       Very beginning:
       door-01 → door-02

       Almost no zoom.
    */

    zoomProgress =
        progress * 0.15;

} else {

    /*
       After door-02:
       gradually continue the zoom.
    */

    const adjustedProgress =
        (progress - 0.10) / 0.90;

    zoomProgress =
        0.015 +
        adjustedProgress * 0.985;

}


const scale =
    startScale +
    (finalScale - startScale)
    * zoomProgress;


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
