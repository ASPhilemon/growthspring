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
        const innerDivs = section.querySelectorAll(".inner");
        const dots = section.querySelectorAll(".dot");

        function showInner(index) {
            if (innerDivs[index]) { // Ensure index is within bounds
                content.scrollTo({
                    left: index * innerDivs[0].offsetWidth, // Use the width of the first inner div
                    behavior: "smooth"
                });
            }
        }

        content.addEventListener("scroll", () => {
            const index = Math.round(content.scrollLeft / innerDivs[0].offsetWidth); // Use the width of the first inner div
            dots.forEach((dot, i) => dot.classList.toggle("active", i === index));
        });

        section.querySelector(".right-arrow").addEventListener("click", () => {
            let index = Math.round(content.scrollLeft / innerDivs[0].offsetWidth); // Use the width of the first inner div
            index = Math.min(index + 1, innerDivs.length - 1); // Prevent going beyond the last div
            showInner(index);
        });

        section.querySelector(".left-arrow").addEventListener("click", () => {
            let index = Math.round(content.scrollLeft / innerDivs[0].offsetWidth); // Use the width of the first inner div
            index = Math.max(index - 1, 0); // Prevent going below the first div
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

    sections.forEach(section => {
        const innerDivs = section.querySelectorAll(".inner");
        const dotsContainer = section.querySelector(".dots");

        innerDivs.forEach((_, idx) => {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (idx === 0) dot.classList.add("active");
            dotsContainer.appendChild(dot);
        });

        updateInnerView(section);
    });

    updateNav();
});