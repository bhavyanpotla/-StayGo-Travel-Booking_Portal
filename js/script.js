/*==================================================
    STAYGO HOTEL WEBSITE
    script.js
==================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /*=====================================
        PRELOADER
    =====================================*/

    const loader = document.querySelector(".loader");

    window.addEventListener("load", () => {

        if (loader) {
            loader.classList.add("hide");

            setTimeout(() => {
                loader.style.display = "none";
            }, 700);
        }

    });

    /*=====================================
        STICKY NAVBAR
    =====================================*/

    const header = document.querySelector("header");

    function stickyNavbar() {

        if (!header) return;

        if (window.scrollY > 80) {

            header.style.background = "rgba(8,16,40,.95)";
            header.style.boxShadow = "0 15px 40px rgba(0,0,0,.35)";

        } else {

            header.style.background = "rgba(8,16,40,.55)";
            header.style.boxShadow = "none";

        }

    }

    stickyNavbar();

    window.addEventListener("scroll", stickyNavbar);

    /*=====================================
        MOBILE MENU
    =====================================*/

    const menuBtn = document.querySelector(".menuBtn");
    const navMenu = document.querySelector(".navMenu");

    if (menuBtn && navMenu) {

        menuBtn.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuBtn.querySelector("i");

            if (icon) {

                if (navMenu.classList.contains("active")) {

                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");

                } else {

                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");

                }

            }

        });

    }

    /*=====================================
        CLOSE MENU WHEN LINK CLICKED
    =====================================*/

    const navLinks = document.querySelectorAll(".navMenu a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            if (navMenu) {

                navMenu.classList.remove("active");

            }

            const icon = menuBtn?.querySelector("i");

            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    });

    /*=====================================
        SMOOTH SCROLL
    =====================================*/

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function (e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        });

    });

    /*=====================================
        ACTIVE NAVIGATION
    =====================================*/

    const sections = document.querySelectorAll("section");

    function activeMenu() {

        let current = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + current
            ) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", activeMenu);

    activeMenu();

    /*=====================================
        SCROLL TO TOP
    =====================================*/

    const scrollTop = document.querySelector(".scrollTop");

    if (scrollTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                scrollTop.classList.add("show");

            } else {

                scrollTop.classList.remove("show");

            }

        });

        scrollTop.addEventListener("click", () => {

            window.scrollTo({

                top: 0,
                behavior: "smooth"

            });

        });

    }

});
    /*=====================================
        SCROLL REVEAL
    =====================================*/

    const revealElements = document.querySelectorAll(".reveal");

    function revealOnScroll() {

        const windowHeight = window.innerHeight;

        revealElements.forEach(element => {

            const top = element.getBoundingClientRect().top;

            if (top < windowHeight - 120) {

                element.classList.add("active");

            }

        });

    }

    revealOnScroll();

    window.addEventListener("scroll", revealOnScroll);

    /*=====================================
        COUNTER ANIMATION
    =====================================*/

    const counters = document.querySelectorAll(".counter");

    let counterStarted = false;

    function runCounters() {

        if (counterStarted) return;

        const stats = document.querySelector(".stats");

        if (!stats) return;

        if (window.scrollY >= stats.offsetTop - 300) {

            counterStarted = true;

            counters.forEach(counter => {

                const target = +counter.dataset.target;

                let count = 0;

                const increment = target / 200;

                const update = () => {

                    count += increment;

                    if (count < target) {

                        counter.innerText = Math.ceil(count);

                        requestAnimationFrame(update);

                    } else {

                        counter.innerText = target;

                    }

                };

                update();

            });

        }

    }

    window.addEventListener("scroll", runCounters);

    runCounters();

    /*=====================================
        GALLERY FILTER
    =====================================*/

    const filterButtons = document.querySelectorAll(".filterBtn");
    const galleryItems = document.querySelectorAll(".galleryItem");

    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            filterButtons.forEach(btn =>
                btn.classList.remove("active")
            );

            button.classList.add("active");

            const filter = button.dataset.filter;

            galleryItems.forEach(item => {

                if (
                    filter === "all" ||
                    item.dataset.category === filter
                ) {

                    item.style.display = "block";

                    setTimeout(() => {

                        item.style.opacity = "1";
                        item.style.transform = "scale(1)";

                    },100);

                } else {

                    item.style.opacity = "0";
                    item.style.transform = "scale(.8)";

                    setTimeout(() => {

                        item.style.display = "none";

                    },300);

                }

            });

        });

    });

    /*=====================================
        SIMPLE TESTIMONIAL SLIDER
    =====================================*/

    const testimonialCards = document.querySelectorAll(".testimonialCard");

    if (testimonialCards.length > 0) {

        let current = 0;

        setInterval(() => {

            testimonialCards.forEach(card => {

                card.style.opacity = ".45";
                card.style.transform = "scale(.96)";

            });

            testimonialCards[current].style.opacity = "1";
            testimonialCards[current].style.transform = "scale(1)";

            current++;

            if (current >= testimonialCards.length) {

                current = 0;

            }

        },4000);

    }

    /*=====================================
        BOOKING FORM VALIDATION
    =====================================*/

    const bookingForm = document.querySelector(".bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit",(e)=>{

            e.preventDefault();

            const inputs = bookingForm.querySelectorAll("input, select");

            let valid = true;

            inputs.forEach(input=>{

                if(input.value.trim()===""){

                    valid=false;

                    input.style.border="1px solid red";

                }else{

                    input.style.border="1px solid #06B6D4";

                }

            });

            if(valid){

                alert("Booking request submitted successfully!");

                bookingForm.reset();

            }else{

                alert("Please fill all required fields.");

            }

        });

    }

    /*=====================================
        NEWSLETTER
    =====================================*/

    const newsletter = document.querySelector(".newsletterForm");

    if(newsletter){

        newsletter.addEventListener("submit",(e)=>{

            e.preventDefault();

            const email = newsletter.querySelector("input");

            const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/i;

            if(pattern.test(email.value)){

                alert("Thank you for subscribing!");

                newsletter.reset();

            }else{

                alert("Please enter a valid email.");

            }

        });

    }

    /*=====================================
        CURRENT YEAR
    =====================================*/

    const year = document.querySelector("#year");

    if(year){

        year.textContent = new Date().getFullYear();

    }

    /*=====================================
        IMAGE HOVER EFFECT
    =====================================*/

    document.querySelectorAll("img").forEach(img=>{

        img.addEventListener("mouseenter",()=>{

            img.style.transition=".5s";

        });

    });

    /*=====================================
        SCROLL PROGRESS BAR
    =====================================*/

    const progressBar = document.querySelector(".progressBar");

    if(progressBar){

        window.addEventListener("scroll",()=>{

            const scroll =
                document.documentElement.scrollTop;

            const height =
                document.documentElement.scrollHeight -
                document.documentElement.clientHeight;

            const progress =
                (scroll/height)*100;

            progressBar.style.width = progress + "%";

        });

    }

    /*=====================================
        BUTTON RIPPLE EFFECT
    =====================================*/

    document.querySelectorAll("button").forEach(button=>{

        button.addEventListener("click",function(e){

            const ripple=document.createElement("span");

            ripple.className="ripple";

            const rect=this.getBoundingClientRect();

            ripple.style.left=(e.clientX-rect.left)+"px";

            ripple.style.top=(e.clientY-rect.top)+"px";

            this.appendChild(ripple);

            setTimeout(()=>{

                ripple.remove();

            },600);

        });

    });

    /*=====================================
        CONSOLE MESSAGE
    =====================================*/

    console.log(
        "%cStayGo Hotel Website Loaded Successfully!",
        "color:#06B6D4;font-size:16px;font-weight:bold;"
    );

    console.log("Designed with ❤️ using HTML, CSS & JavaScript");

    /*==================================================
    MAC-OS ADAPTIVE SERVICE FILTER ROUTING
==================================================*/
document.addEventListener("DOMContentLoaded", () => {
    const URLParameters = new URLSearchParams(window.location.search);
    const targetFilter = URLParameters.get('filter');

    if (targetFilter) {
        // Locate the respective filter button on services page
        const activationButton = document.querySelector(`.filterBtn[data-filter="${targetFilter}"]`);
        if (activationButton) {
            setTimeout(() => {
                activationButton.click(); // Automatically click and toggle the grid cards
                
                // Smoothly slide page position directly to grid viewport
                const gridViewport = document.querySelector('.services');
                if (gridViewport) {
                    gridViewport.scrollIntoView({ behavior: 'smooth' });
                }
            }, 400);
        }
    }
});
// Automatically add the 'active' underline to the current page link
document.addEventListener("DOMContentLoaded", () => {
    const currentPage = window.location.pathname.split("/").pop(); // Gets the filename (e.g., about.html)
    const navLinks = document.querySelectorAll(".navMenu a");

    navLinks.forEach(link => {
        const linkPath = link.getAttribute("href");
        if (linkPath === currentPage || (currentPage === "" && linkPath === "index.html")) {
            link.classList.add("active");
        }
    });
});