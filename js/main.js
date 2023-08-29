// Burger Menu
let burgerMenu = document.querySelector(".burger-menu");
let navMobile = document.querySelector("nav");

burgerMenu.onclick = function () {
    this.classList.toggle("active");
    navMobile.classList.toggle("active");
};

// Change Intro Background
const imgsUrl = [
    "../imgs/intro.jpg",
    "../imgs/intro-2.jpg",
    "../imgs/intro-3.jpg",
];

let imgIdx = 1;

let changeBgInterval = changeBackgroundImg();

/*
 *   Setting Box
 */
// open and close settings box
document.querySelector(".settings-box .open-btn").onclick = function () {
    document.querySelector(".settings-box").classList.toggle("show");
};

// set the background color of color choices + change main color on color click
let colorSpans = Array.from(
    document.querySelectorAll(".settings-box .colors span")
);

colorSpans.forEach((el) => {
    el.style.backgroundColor = el.dataset.maincolor;
    el.addEventListener("click", (e) => {
        // remove the active class from all spans
        //colorSpans.forEach((temp) => temp.classList.remove("active"));
        Array.from(e.target.parentElement.children)
            .filter((el) => el.classList.contains("active"))
            .map((el) => el.classList.remove("active"));
        // add the active class to the current element
        e.target.classList.add("active");
        // change the main color
        document.documentElement.style.setProperty(
            "--primary-color",
            e.target.dataset.maincolor
        );

        // set the color to the local storage
        localStorage.setItem("color-option", e.target.dataset.maincolor);
    });

    // get the color from the local storage if exists
    if (localStorage.getItem("color-option")) {
        if (el.dataset.maincolor === localStorage.getItem("color-option"))
            el.click();
    }
});

// change background or not
let changeBgChoices = Array.from(
    document.querySelectorAll(".settings-box .change-background .content span")
);
changeBgChoices.forEach((el) => {
    el.addEventListener("click", (e) => {
        // remove the active class from the active span
        Array.from(e.target.parentElement.children)
            .filter((el) => el.classList.contains("active"))
            .map((el) => el.classList.remove("active"));
        // add the active class to the current element
        e.target.classList.add("active");

        if (e.target.textContent.toLowerCase() === "yes")
            changeBgInterval = changeBackgroundImg();
        else clearInterval(changeBgInterval);

        // set the change bg choice to the local storage
        localStorage.setItem(
            "ch-bg-option",
            e.target.textContent.toLowerCase()
        );
    });

    // get the change bg choice from the local storage
    if (localStorage.getItem("ch-bg-option")) {
        if (
            el.textContent.toLowerCase() ===
            localStorage.getItem("ch-bg-option")
        )
            el.click();
    }
});

// Show bullets or not
let bulletsDiv = document.querySelector(".bullets");
bulletsDiv.classList.add("showed"); //Default
let showBulletsChoices = Array.from(
    document.querySelectorAll(".settings-box .show-bullets .content span")
);
showBulletsChoices.forEach((el) => {
    el.addEventListener("click", (e) => {
        // remove the active class from the active span
        Array.from(e.target.parentElement.children)
            .filter((el) => el.classList.contains("active"))
            .map((el) => el.classList.remove("active"));
        // add the active class to the current element
        e.target.classList.add("active");

        e.target.textContent.toLowerCase() === "yes"
            ? bulletsDiv.classList.add("showed")
            : bulletsDiv.classList.remove("showed");

        // set the show bullets choice to the local storage
        localStorage.setItem(
            "sh-bl-option",
            e.target.textContent.toLowerCase()
        );
    });

    // get the show bullets choice from the local storage
    if (localStorage.getItem("sh-bl-option")) {
        if (
            el.textContent.toLowerCase() ===
            localStorage.getItem("sh-bl-option")
        )
            el.click();
    }
});

// Show bullets when arriving to about section
window.onscroll = function () {
    if (this.scrollY >= this.innerHeight) {
        bulletsDiv.classList.add("can-show");
    } else {
        bulletsDiv.classList.remove("can-show");
    }
};

// On reset options click
document.querySelector(".settings-box .reset-btn").onclick = function () {
    colorSpans[0].click();
    changeBgChoices[0].click();
    showBulletsChoices[0].click();
};

/*
    Testimonials
*/
let prevBtn = document.querySelector(
    "section.testimonials .slider-controls .prev"
);
let nextBtn = document.querySelector(
    "section.testimonials .slider-controls .next"
);
let testimonials = document.querySelectorAll("section.testimonials .box");

// track index of current testimonial
let currTestimonial = 0;

// generate bullets
let testiBulletsDiv = document.querySelector(
    "section.testimonials .slider-controls .testimonials-bullets"
);
for (let i = 0; i < testimonials.length; ++i) {
    let bulletSpan = document.createElement("span");
    if (i === 0) bulletSpan.className = "active";
    testiBulletsDiv.appendChild(bulletSpan);
}

checkBoundaries();
showCurrent();

prevBtn.onclick = prevTestimonial;
nextBtn.onclick = nextTestimonial;

Array.from(testiBulletsDiv.children).forEach((el, idx) => {
    el.addEventListener("click", () => {
        currTestimonial = idx;
        checkBoundaries();
        showCurrent();
        updateBullets();
    });
});

/*
    Functions
*/
function changeBackgroundImg() {
    return setInterval(() => {
        if (imgIdx === imgsUrl.length) imgIdx = 0;
        document.querySelector("section.intro").style.backgroundImage = `url(${
            imgsUrl[imgIdx++]
        })`;
    }, 5000);
}

function prevTestimonial() {
    currTestimonial--;
    checkBoundaries();
    showCurrent();
    updateBullets();
}

function nextTestimonial() {
    currTestimonial++;
    checkBoundaries();
    showCurrent();
    updateBullets();
}

function checkBoundaries() {
    currTestimonial > 0
        ? prevBtn.classList.remove("disabled")
        : prevBtn.classList.add("disabled");
    currTestimonial < testimonials.length - 1
        ? nextBtn.classList.remove("disabled")
        : nextBtn.classList.add("disabled");
}

function showCurrent() {
    let leftValue = 0;

    testimonials.forEach((el) => el.classList.remove("active"));
    testimonials[currTestimonial].classList.add("active");

    if (window.matchMedia("(min-width: 992px)").matches) {
        leftValue = -currTestimonial * 650;
        document.querySelector(
            "section.testimonials .inner-container"
        ).style.left = `${leftValue}px`;
    } else {
        leftValue = -currTestimonial * 100;
        document.querySelector(
            "section.testimonials .inner-container"
        ).style.left = `${leftValue}%`;
    }
}

function updateBullets() {
    let testiBullets = Array.from(testiBulletsDiv.children);
    // remove the active class from the active bullet
    testiBullets.forEach((el) => el.classList.remove("active"));
    // add the active class to the current bullet
    testiBullets[currTestimonial].classList.add("active");
}
