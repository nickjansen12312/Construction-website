/*MOBILE MENU */

const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton) {

    menuButton.addEventListener("click", function () {

        mobileMenu.classList.toggle("open");

    });

}


/*CLOSE MOBILE MENU AFTER CLICK*/

const mobileLinks = document.querySelectorAll(".mobile-menu a");

mobileLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        mobileMenu.classList.remove("open");

    });

});


/*STATISTICS Scroll*/

const stats = document.querySelectorAll(".stat strong");

let statsStarted = false;


function animateStats() {

    if (statsStarted) return;

    const statsSection = document.querySelector(".stats-section");

    if (!statsSection) return;

    const sectionPosition =
        statsSection.getBoundingClientRect().top;

    const screenPosition =
        window.innerHeight * 0.8;


    if (sectionPosition < screenPosition) {

        statsStarted = true;


        stats.forEach(function (stat) {

            const target = Number(
                stat.getAttribute("data-target")
            );

            let current = 0;

            const increment = target / 60;


            function updateNumber() {

                current += increment;

                if (current >= target) {

                    stat.textContent = target + "+";

                    return;

                }

                stat.textContent =
                    Math.floor(current) + "+";

                requestAnimationFrame(updateNumber);

            }

            updateNumber();

        });

    }

}


window.addEventListener("scroll", animateStats);


/* HEADER BACGROUND ON SCROLL*/

const header = document.querySelector(".site-header");


window.addEventListener("scroll", function () {

    if (window.scrollY > 50) {

        header.style.boxShadow =
            "0 4px 20px rgba(0,0,0,0.08)";

    } else {

        header.style.boxShadow = "none";

    }

});
