let cooldownTime = 0;
let notificationTimeout;

function generateUniqueCode() {
    return Math.random().toString(36).substring(2, 8);
}

function saveNote() {
    if (cooldownTime > 0) {
        showNotification('Cooldown', `Please wait ${cooldownTime} seconds before saving again.`);
        return;
    }

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
        startCooldown(3); // Start a 3-second cooldown
    } else {
        showNotification('Nothing to save', 'There isn\'t anything to save yet, write something!');
    }
}

function loadNote() {
    if (cooldownTime > 0) {
        showNotification('Cooldown', `Please wait ${cooldownTime} seconds before loading again.`);
        return;
    }

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
            startCooldown(3); // Start a 3-second cooldown
        } else {
            showNotification('ID not found', 'That note ID doesn\'t seem to exist!');
        }
    } else {
        showNotification('Invalid', 'That isn\'t a valid note ID! They are formatted like this: "abc1a1".');
    }
}

function startCooldown(seconds) {
    cooldownTime = seconds;
    const cooldownInterval = setInterval(() => {
        cooldownTime--;
        if (cooldownTime <= 0) {
            clearInterval(cooldownInterval);
        }
    }, 1000);
}

function showNotification(title, message) {
    const notificationElement = document.getElementById('notification');

    // Set title and message
    notificationElement.innerHTML = `<div class="notification-title">${title}</div>${message}`;

    // Show notification
    notificationElement.classList.add('show-notification');

    // Clear existing timeout
    clearTimeout(notificationTimeout);

    // Hide notification after 5 seconds
    notificationTimeout = setTimeout(() => {
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

function updateCharCount() {
    const content = document.getElementById('noteContent').value;
    const charCount = content.length;
    const charLimit = 10000;

    if (charCount > charLimit) {
        showNotification('Character Limit Exceeded', `You have exceeded the character limit of ${charLimit}.`);
        document.getElementById('noteContent').classList.add('input-error');
    } else {
        document.getElementById('charCount').textContent = `Characters: ${charCount}`;
        document.getElementById('noteContent').classList.remove('input-error');
    }
}
