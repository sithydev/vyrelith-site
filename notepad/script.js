function generateUniqueCode() {
    return Math.random().toString(36).substring(2, 8);
}

function saveNote() {
    const noteTitle = document.getElementById('noteTitle').value;
    const noteContent = document.getElementById('noteContent').value;

    if (noteTitle.trim() !== '' || noteContent.trim() !== '') {
        const uniqueCode = generateUniqueCode();
        const note = {
            title: noteTitle,
            content: noteContent
        };

        localStorage.setItem(uniqueCode, JSON.stringify(note));
        copyToClipboard(uniqueCode);
        showNotification('ID copied', `"${uniqueCode}" has been copied to your clipboard!`);
    } else {
        showNotification('Nothing to save', 'There isn\'t anything to save yet, write something!');
    }
}

function loadNote() {
    const loadCodeInput = document.getElementById('loadCodeInput');
    const uniqueCode = loadCodeInput.value.trim();

    if (uniqueCode !== '') {
        const storedNote = localStorage.getItem(uniqueCode);

        if (storedNote) {
            const note = JSON.parse(storedNote);
            document.getElementById('noteTitle').value = note.title;
            document.getElementById('noteContent').value = note.content;
            updateWordCount(); // Update word count when loading note
            showNotification('Loaded', 'Your note was loaded!');
        } else {
            showNotification('ID not found', 'That note ID doesn\'t seem to exist!');
        }
    } else {
        showNotification('Invalid', 'That isn\'t a valid note ID! They are formatted like this: "abc1a1".');
    }
}

function showNotification(title, message) {
    const notificationElement = document.getElementById('notification');

    // Set title and message
    notificationElement.innerHTML = `<div class="notification-title">${title}</div>${message}`;

    // Show notification
    notificationElement.classList.add('show-notification');

    // Hide notification after 5 seconds
    setTimeout(() => {
        notificationElement.classList.remove('show-notification');
    }, 5000);
}

function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
}

function updateWordCount() {
    const content = document.getElementById('noteContent').value;
    const wordCount = content.split(/\s+/).filter(word => word !== '').length;
    const titleSuffix = wordCount === 1 ? 'word' : 'words'; // Determine singular or plural
    document.getElementById('wordCount').textContent = `Words: ${wordCount}`;
    document.title = `Notepad | ${wordCount} ${titleSuffix}`; // Update document title with word count
}

function changeTextColor() {
    const color = document.getElementById('colorPicker').value;
    document.getElementById('noteContent').style.color = color;
}

function changeFontWeight() {
    const fontWeight = document.getElementById('fontWeight').value;
    document.getElementById('noteContent').style.fontWeight = fontWeight;
}

function applyAnimation() {
    const animation = document.getElementById('animationSelect').value;
    const textArea = document.getElementById('noteContent');
    
    // Remove previous animation class if present
    textArea.classList.remove('bounce', 'fade-in');
    
    if (animation === 'bounce') {
        textArea.classList.add('bounce');
    } else if (animation === 'fadeIn') {
        textArea.classList.add('fade-in');
    }
}
