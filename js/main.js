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

// Add bullets
let sections = Array.from(document.querySelectorAll("section:not(.intro)"));
let sectionsNumber = sections.length;
for (let i = 0; i < sectionsNumber; ++i) {
    let bullet = document.createElement("div");
    bullet.className = "bullet";
    bulletsDiv.appendChild(bullet);

    // Add event listener to bullet
    bullet.addEventListener("click", () => {
        let desiredSection = sections[i];
        window.scrollTo({
            top: desiredSection.offsetTop,
            left: 0,
            behavior: "smooth",
        });
    });

    bullet.addEventListener("mouseover", () => {
        let bulletTitle = document.createElement("span");
        bulletTitle.appendChild(
            document.createTextNode(sections[i].className.toUpperCase())
        );
        bullet.appendChild(bulletTitle);
    });

    bullet.addEventListener("mouseout", () => {
        bullet.children[0].remove();
    });
}

// Show bullets when arriving to about section
window.addEventListener("scroll", () =>
    this.scrollY >= this.innerHeight
        ? bulletsDiv.classList.add("can-show")
        : bulletsDiv.classList.remove("can-show")
);

// Make the visible section bullet active
window.addEventListener("scroll", () => {
    sections.forEach((sec, idx) => {
        if (isInViewport(sec)) {
            let bullets = Array.from(bulletsDiv.children);
            bullets.map((el) => el.classList.remove("active"));
            bullets[idx].classList.add("active");
        }
    });
});

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
    Increase info numbers onscroll
*/
let numbersToIncrease = Array.from(
    document.querySelectorAll("section.stats .box .number")
);
let statsSection = document.querySelector("section.stats");
let started = false;
window.onscroll = function () {
    if (this.scrollY > statsSection.offsetTop - 400) {
        if (!started) {
            numbersToIncrease.forEach((el) => {
                let goalNum = parseInt(el.dataset.goal);
                let increment = setInterval(() => {
                    el.innerHTML++;
                    if (el.innerHTML == goalNum) clearInterval(increment);
                }, 1000 / goalNum);
            });
        }
        started = true;
    }
};

/*
    Display Image Gallery on click
*/
let galleryImgs = Array.from(
    document.querySelectorAll("section.gallery .container img")
);
let gallerySection = document.querySelector("section.gallery");

galleryImgs.forEach((image) => {
    image.addEventListener("click", (e) => {
        // add overlay div
        let overlayDiv = document.createElement("div");
        overlayDiv.className = "overlay";
        gallerySection.appendChild(overlayDiv);

        // create the popup box annd add it
        let popupDiv = document.createElement("div");
        popupDiv.className = "zoomed-img";
        if (e.target.alt) {
            let popupTitle = document.createElement("h4");
            popupTitle.appendChild(
                document.createTextNode(e.target.getAttribute("alt"))
            );
            popupDiv.appendChild(popupTitle);
        }
        let popupImg = document.createElement("img");
        popupImg.setAttribute("src", e.target.getAttribute("src"));
        popupImg.setAttribute("alt", e.target.getAttribute("alt"));
        popupDiv.appendChild(popupImg);
        let closeBtn = document.createElement("span");
        closeBtn.className = "close-btn";
        closeBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        popupDiv.appendChild(closeBtn);
        gallerySection.appendChild(popupDiv);

        // On close popup btn click
        closeBtn.onclick = function () {
            overlayDiv.remove();
            popupDiv.remove();
        };
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

function isInViewport(element) {
    let scrollPosition =
        document.documentElement.scrollTop || document.body.scrollTop;

    return element.offsetTop <= scrollPosition + 50;
}
