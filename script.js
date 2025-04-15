document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const navItems = document.querySelectorAll(".nav-item");
    let currentSectionIndex = 0;

    function updateNav() {
        navItems.forEach((item, index) => {
            item.classList.toggle("active", index === currentSectionIndex);
        });
    }

    function updateInnerView(section) {
        const content = section.querySelector(".content");
        let innerDivs;
        
        // Special case for #objectives
        if (section.id === "pictures") {
            if (window.innerWidth < 768) {
                innerDivs = section.querySelectorAll(".mobile-view");
            } else {
                innerDivs = section.querySelectorAll(".desktop-view");
            }
        } else {
            innerDivs = section.querySelectorAll(".inner");
        }

        const dotsContainer = section.querySelector(".dots");
        dotsContainer.innerHTML = ""; // Clear existing dots
        innerDivs.forEach((_, idx) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (idx === 0) dot.classList.add("active");
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll(".dot");

        function showInner(index) {
            if (innerDivs[index]) {
                content.scrollTo({
                    left: index * innerDivs[0].offsetWidth,
                    behavior: "smooth"
                });
            }
        }

        content.addEventListener("scroll", () => {
            const index = Math.round(content.scrollLeft / innerDivs[0].offsetWidth);
            dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
        });

        section.querySelector(".right-arrow").addEventListener("click", () => {
            let index = Math.round(content.scrollLeft / innerDivs[0].offsetWidth);
            index = Math.min(index + 1, innerDivs.length - 1);
            showInner(index);
        });

        section.querySelector(".left-arrow").addEventListener("click", () => {
            let index = Math.round(content.scrollLeft / innerDivs[0].offsetWidth);
            index = Math.max(index - 1, 0);
            showInner(index);
        });

        dots.forEach((dot, i) => {
            dot.addEventListener("click", () => {
                showInner(i);
            });
        });
    }

    function switchSection(index) {
        if (index >= 0 && index < sections.length) {
            sections[index].scrollIntoView({ behavior: "smooth" });
            currentSectionIndex = index;
            updateNav();
        }
    }

    document.querySelector("main").addEventListener("scroll", () => {
        let index = [...sections].findIndex(
            section => section.getBoundingClientRect().top >= 0
        );
        if (index !== -1) {
            currentSectionIndex = index;
            updateNav();
        }
    });

    navItems.forEach((item, index) => {
        item.addEventListener("click", () => {
            switchSection(index);
        });
    });

    // Initialize all section views
    sections.forEach(section => {
        updateInnerView(section);
    });

    updateNav();

    // Re-initialize view on resize to handle mobile/desktop switch
    window.addEventListener("resize", () => {
        sections.forEach(section => {
            updateInnerView(section);
        });
    });
});
