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
