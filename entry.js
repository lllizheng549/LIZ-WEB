const entryButton = document.getElementById("entryButton");
const entryScene = document.getElementById("entryScene");
const doorImage = document.getElementById("doorImage");

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

    // 防止重复点击
    entryButton.style.pointerEvents = "none";

    // 第一帧
    doorImage.src = doorFrames[0];


    // 第二帧 + 第一次推进
    setTimeout(function () {

        doorImage.src = doorFrames[1];

        entryScene.classList.add("zoom-1");

    }, 700);


    // 第三帧 + 第二次推进
    setTimeout(function () {

        doorImage.src = doorFrames[2];

        entryScene.classList.remove("zoom-1");
        entryScene.classList.add("zoom-2");

    }, 1400);


    // 第四帧 + 第三次推进
    setTimeout(function () {

        doorImage.src = doorFrames[3];

        entryScene.classList.remove("zoom-2");
        entryScene.classList.add("zoom-3");

    }, 2100);


    // 最后继续推进到门里面
    setTimeout(function () {

        entryScene.classList.remove("zoom-3");
        entryScene.classList.add("zoom-final");

    }, 2800);


    // 进入真正的作品集主页
    setTimeout(function () {

        window.location.href = "home.html";

    }, 4300);

});
