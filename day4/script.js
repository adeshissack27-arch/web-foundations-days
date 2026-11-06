
const noteText = document.getElementById("note-text");
const charCount = document.getElementById("char-count");
const wordCount = document.getElementById("word-count");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

// Update the character and word counters
function updateCounts() {
    const text = noteText.value;
    const characters = text.length;
    const trimmedText = text.trim();

    const words = trimmedText === ""
        ? 0
        : trimmedText.split(/\s+/).length;

    charCount.textContent = `${characters} / 200 characters`;
    wordCount.textContent = `${words} words`;

    charCount.classList.remove("warning", "over");

    if (characters > 200) {
        charCount.classList.add("over");
    } else if (characters > 180) {
        charCount.classList.add("warning");
    }
}

// Save the note as the user types
noteText.addEventListener("input", () => {
    updateCounts();
    localStorage.setItem("noteDraft", noteText.value);
});

// Clear the note and remove the saved draft
function clearNote() {
    noteText.value = "";
    localStorage.removeItem("noteDraft");
    updateCounts();
}

clearBtn.addEventListener("click", clearNote);

// Press Escape to clear the note
noteText.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        clearNote();
    }
});

// Switch between light and dark mode
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    const isDark = document.body.classList.contains("dark");

    themeToggle.textContent = isDark
        ? "Light mode"
        : "Dark mode";

    localStorage.setItem("theme", isDark ? "dark" : "light");
});

// Restore saved note
const savedDraft = localStorage.getItem("noteDraft");

if (savedDraft !== null) {
    noteText.value = savedDraft;
}

// Restore saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "Light mode";
}

// Display the initial counters
updateCounts();
