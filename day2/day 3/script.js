let notes = [
  { id: 1, text: "Buy milk and bread", category: "personal" },
  { id: 2, text: "Finish the Day 3 assignment", category: "study" },
  { id: 3, text: "Email the project report to Grace", category: "work" },
  { id: 4, text: "Revise JavaScript arrays", category: "study" },
  { id: 5, text: "Call mum", category: "personal" },
];
// 1. searchNotes(word)
function searchNotes(word) {
  const searchTerm = word.toLowerCase();
  return notes.filter((note) => note.text.toLowerCase().includes(searchTerm));
}

// Tests for searchNotes
console.log(searchNotes("javascript")); 
// Expected output: [{ id: 4, text: "Revise JavaScript arrays", category: "study" }]

console.log(searchNotes("python")); 
// Expected output: []
// 2. longestNote()
function longestNote() {
  if (notes.length === 0) {
    return null;
  }

  let longest = notes[0];
  for (let i = 1; i < notes.length; i++) {
    if (notes[i].text.length > longest.text.length) {
      longest = notes[i];
    }
  }
  return longest;
}

// Tests for longestNote
console.log(longestNote()); 
// Expected output: { id: 3, text: "Email the project report to Grace", category: "work" }

// Test edge case with an empty notes array
let tempNotes = notes;
notes = [];
console.log(longestNote()); 
// Expected output: null
notes = tempNotes; // restore notes
// 3. countByCategory()
function countByCategory() {
  const counts = {};
  for (const note of notes) {
    const cat = note.category;
    counts[cat] = (counts[cat] || 0) + 1;
  }
  return counts;
}

// Tests for countByCategory
console.log(countByCategory()); 
// Expected output: { personal: 2, study: 2, work: 1 }

// Test edge case with empty notes array
let tempNotesForCount = notes;
notes = [];
console.log(countByCategory()); 
// Expected output: {}
notes = tempNotesForCount; // restore notes
// 4. getSummary()
function getSummary() {
  const total = notes.length;
  if (total === 0) {
    return "0 notes.";
  }

  const counts = countByCategory();
  const catParts = [];
  for (const cat in counts) {
    catParts.push(`${counts[cat]} ${cat}`);
  }

  const label = total === 1 ? "note" : "notes";
  return `${total} ${label}: ${catParts.join(", ")}.`;
}

// Tests for getSummary
console.log(getSummary());
// Expected output: "5 notes: 2 personal, 2 study, 1 work."

// Test edge case with 1 note
let tempNotesSummary = notes;
notes = [{ id: 1, text: "Solo note", category: "personal" }];
console.log(getSummary());
// Expected output: "1 note: 1 personal."
notes = tempNotesSummary; // restore notes
// 5. isDuplicate(text)
function isDuplicate(text) {
  const formattedText = text.trim().toLowerCase();
  return notes.some(
    (note) => note.text.trim().toLowerCase() === formattedText
  );
}

// Tests for isDuplicate
console.log(isDuplicate("buy milk and bread")); 
// Expected output: true

console.log(isDuplicate("   BUY MILK AND BREAD   ")); 
// Expected output: true

console.log(isDuplicate("Buy fresh fruit")); 
// Expected output: false