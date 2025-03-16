document.addEventListener("DOMContentLoaded", function() {
    // dark mode toggle
    const toggleButton = document.getElementById("dark-mode-toggle");
    toggleButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");
        toggleButton.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
    });

    // collapsible sections
    const sections = document.querySelectorAll(".collapsible");
    sections.forEach(section => {
        section.addEventListener("click", function() {
            const content = this.querySelector(".content");
            content.style.display = content.style.display === "block" ? "none" : "block";
        });
    });

    // search functionality
    const searchInput = document.getElementById("search");
    searchInput.addEventListener("input", function() {
        const searchValue = searchInput.value.toLowerCase();
        sections.forEach(section => {
            const text = section.innerText.toLowerCase();
            section.style.display = text.includes(searchValue) ? "block" : "none";
        });
    });
});
