const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");


// Open / Close menu
menuButton.addEventListener("click", function (event) {

    event.stopPropagation();

    sideMenu.classList.toggle("open");

});


// Click outside menu → close
document.addEventListener("click", function (event) {

    if (
        sideMenu.classList.contains("open") &&
        !sideMenu.contains(event.target) &&
        event.target !== menuButton
    ) {
        sideMenu.classList.remove("open");
    }

});


// Click a menu link → close
const menuLinks = sideMenu.querySelectorAll("a");

menuLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        sideMenu.classList.remove("open");

    });

});

/* =========================
   Home Parallax
========================= */
//偏移效果

const homeStage = document.querySelector(".home-stage");

if (homeStage) {

    const parallaxItems = homeStage.querySelectorAll(
        ".home-line, .home-me, .home-product, .home-cat, .home-arc, .home-craft, .home-illustrate"
    );

    let targetX = 0;
    let currentX = 0;

    document.addEventListener("mousemove", (e) => {

        const centerX = window.innerWidth / 2;

        // -1 ~ 1
        const mouseX = (e.clientX - centerX) / centerX;

        // 最大基础移动距离
        targetX = mouseX * 16;
    });

    function animateParallax() {

        // 缓慢追随鼠标
        currentX += (targetX - currentX) * 0.06;

        parallaxItems.forEach((item) => {

            const depth = parseFloat(
                getComputedStyle(item).getPropertyValue("--depth")
            ) || 1;

            item.style.transform =
                `translateX(${currentX * depth}px)`;
        });

        requestAnimationFrame(animateParallax);
    }

    animateParallax();
}
