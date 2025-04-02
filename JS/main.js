// random bg local storage

let bgoption = true;

let bginterval;

let bgLocal = localStorage.getItem("bgoption");

if (bgLocal !== null) {
    if (bgLocal === "true") {
        bgoption = true;
    }else{
        bgoption = false;
    }

    document.querySelectorAll(".random-bg span").forEach(e =>{
        e.classList.remove("active");
    })

    if (bgLocal === "true") {
        
        document.querySelector(".random-bg .yes").classList.add("active");
    
    }else{
        document.querySelector(".random-bg .no").classList.add("active");
    };

};



// random bg

let randomImg = document.querySelector(".header");

let imgsArray = ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"];

let currentIndex = 0;  

function randomimgs(){

    if (bgoption === true) {
        bginterval = setInterval(() => {
            randomImg.style.backgroundImage = `url('imgs/${imgsArray[currentIndex]}')`;
        
            currentIndex = (currentIndex + 1) % imgsArray.length; 
                
        }, 5000);
    }
    
};


// gear btn
let settingGear = document.querySelector(".gear");
let settingBox = document.querySelector('.setting-box');
settingGear.onclick = function () {
    settingBox.classList.toggle("opened");
};


// switch colors btns

let mainColors = localStorage.getItem("color_option");

if (mainColors !== null) {
    document.documentElement.style.setProperty("--main-color", mainColors)
    let activeClass = document.querySelectorAll(".colors-list li");
    activeClass.forEach(e =>{
        e.classList.remove("active");
    
    if (e.dataset.color === mainColors) {
        e.classList.add("active");
    }
    
    })

}

// switch colors btns set on local srorage

const colorsli = document.querySelectorAll(".colors-list li");

colorsli.forEach(li =>{
    li.addEventListener("click", (e)=>{
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
        
        localStorage.setItem("color_option",e.target.dataset.color);

        let activeClass = document.querySelectorAll(".colors-list li");
        activeClass.forEach(e =>{
            e.classList.remove("active");
        })
        e.target.classList.add("active");
    })
});


// random background set on local storage and active class
const randomBg = document.querySelectorAll(".random-bg span");

randomBg.forEach(span =>{
    span.addEventListener("click", (e)=>{

        let activeClass = document.querySelectorAll(".random-bg span");
        activeClass.forEach(e =>{
            e.classList.remove("active");
        })
        e.target.classList.add("active");

        if (e.target.dataset.bg === "yes") {
            bgoption = true;
            randomimgs();

            localStorage.setItem("bgoption", true);
        }else{
            bgoption = false;
            clearInterval(bginterval);
            localStorage.setItem("bgoption", false);
        };
    });
});

randomimgs();


// progress on scroll

let progressSpans = document.querySelectorAll(".skill-progress span");
let skillsSection = document.querySelector(".skills");

window.onscroll = function () {
    if (window.scrollY >= skillsSection.offsetTop - 600) {
        progressSpans.forEach(span => {
            span.style.width = span.dataset.width;
        });
    };
};



// gallery popup

let ourGallery = document.querySelectorAll(".images-box img");

ourGallery.forEach(img =>{

    img.addEventListener("click", (e) =>{

        let overlayPopup = document.createElement("div");
        overlayPopup.className = "popup-overlay";

        document.body.appendChild(overlayPopup);

        let popupBox = document.createElement("div");

        popupBox.className = "popup-box";

        if (img.alt !== null) {
            let heading = document.createElement("h3");
            let headingText = document.createTextNode(img.alt);
            heading.appendChild(headingText);
            popupBox.appendChild(heading);
        
        };

        let popupImg = document.createElement("img");

        popupImg.src = img.src;

        popupBox.appendChild(popupImg);

        document.body.appendChild(popupBox);

        let closeButton = document.createElement("span");
        let closeButtonText = document.createTextNode("X");

        closeButton.appendChild(closeButtonText);

        closeButton.className = "close-button";

        popupBox.appendChild(closeButton);
    });


});

// overlay popup

document.addEventListener("click",(e) =>{
    if (e.target.className == "close-button") {

        document.querySelector(".popup-box").remove();
        document.querySelector(".popup-overlay").remove();

    };
});


// bullets 

const allBullets = document.querySelectorAll(".nav-bullets .bullet")

allBullets.forEach(bul =>{

    bul.addEventListener("click", (e) => {

        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });

    });
});

// nav links
const alllinks = document.querySelectorAll(".head-links a");

alllinks.forEach(link =>{

    link.addEventListener("click", (e) => {

        e.preventDefault();

        document.querySelector(e.target.dataset.section).scrollIntoView({
            behavior: 'smooth'
        });

    });
});

// show , hide bullets
let bulletsSpan = document.querySelectorAll(".bullets-show span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocal = localStorage.getItem("bullets-option");

if (bulletLocal !== null) {

    bulletsSpan.forEach(span =>{

        span.classList.remove("active");

    })

    if (bulletLocal === "block") {

        bulletsContainer.style.display = 'block';

        document.querySelector(".bullets-show .yes").classList.add("active");

    }else{

        bulletsContainer.style.display = 'none';

        document.querySelector(".bullets-show .no").classList.add("active");

    }

};

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {
        if (span.dataset.display === 'show') {
            
            bulletsContainer.style.display = 'block';

            localStorage.setItem("bullets-option", "block")
        
        }else{

            bulletsContainer.style.display = 'none';

            localStorage.setItem("bullets-option", "none")

        }

        bulletsSpan.forEach(e =>{
            e.classList.remove("active")
        })
        e.target.classList.add("active")

    });

});


// reset button

document.querySelector(".reset-options").onclick = function () {

    localStorage.removeItem("color_option");
    localStorage.removeItem("bgoption");
    localStorage.removeItem("bullets-option");

    window.location.reload();

};


// menu

let toggleBtn = document.querySelector(".menu");

let toggleLinks = document.querySelector(".head-links");

toggleBtn.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");

    toggleLinks.classList.toggle("open");

};

document.addEventListener("click" , (e) =>{

    if (e.target !==  toggleBtn && e.target !== toggleLinks) {

        if (toggleLinks.classList.contains("open")) {

            toggleBtn.classList.toggle("menu-active");

            toggleLinks.classList.toggle("open");

        }

    };

});

toggleLinks.onclick = function (e) {

    e.stopPropagation();

}