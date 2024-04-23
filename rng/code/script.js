var buttonEnabled = true;
var nextNumber = null;


// function to play sound
function playSound(soundId) {
    var sound = document.getElementById(soundId);
    if (sound) {
        sound.currentTime = 0; // reset sound to beginning (breaks on iPhone devices)
        sound.play();
    }
}

// function to change the volume of all audio elements
function changeVolume(volume) {
    var audioElements = document.querySelectorAll('audio');
    audioElements.forEach(function(audio) {
        audio.volume = volume;
    });
}

// listen for console input
window.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        var input = document.getElementById('console-input').value;
        executeCommand(input);
        document.getElementById('console-input').value = ''; // clear the input field
    }
});

document.getElementById('generate-btn').addEventListener('click', function() {
    if (!buttonEnabled) {
        return; // do nothing if the button is disabled
    }

    // disable the button to prevent multiple clicks
    buttonEnabled = false;
    setTimeout(function() {
        buttonEnabled = true; // enable the button after 3 seconds
    }, 1000);

    // use the nextNumber if set, otherwise generate a random number
    var randomNumber = nextNumber !== null ? nextNumber : Math.floor(Math.random() * 10000) + 1;
    nextNumber = null; // reset nextNumber after using it

    // nextNumber currently has no say since i removed the code for console command.
    // technically, it still rolls a number if nextNumber is set, however there is no way to set it.
    
    // display the number with pop-up animation
    var resultElement = document.getElementById('result');
    resultElement.innerHTML = ''; // clear previous content
    var numberElement = document.createElement('b');
    numberElement.classList.add('pop-up');
    numberElement.textContent = randomNumber;
    resultElement.appendChild(numberElement);
    
    // determine rarity based on the generated number
    var rarity;
    var rarityColor;
    if (randomNumber <= 1) {
        rarity = 'The Mythical One';
        rarityColor = '#FFD700'; // lighter yellow (gold?)
        playSound('mythicalone-sound');
    } else if (randomNumber <= 50) {
        rarity = 'RNGesus Incarnate';
        rarityColor = '#FA8CE6'; // lighter pink
        playSound('rngesus-sound');
    } else if (randomNumber <= 250) {
        rarity = 'Mythical';
        rarityColor = '#FF69B4'; // pink
        playSound('mythical-sound');
    } else if (randomNumber <= 1000) {
        rarity = 'Legendary';
        rarityColor = '#FFD700'; // gold-ish
        playSound('legendary-sound');
    } else if (randomNumber <= 2500) {
        rarity = 'Epic';
        rarityColor = '#800080'; // purple
        playSound('epic-sound');
    } else if (randomNumber <= 5000) {
        rarity = 'Rare';
        rarityColor = '#0000FF'; // dark blue
        playSound('rare-sound');
    } else if (randomNumber >= 10000) {
        rarity = 'Too Common?';
        rarityColor = '#FFFFFF'; // white
        playSound('common-sound');
    } else if (randomNumber >= 10001) {
        rarity = 'Cheater! Cheater!';
        rarityColor = '#FFFFFF'; // white
        playSound('glitch-sound');
    } else {
        rarity = 'Common';
        rarityColor = '#FFFFFF'; // white again??
        playSound('common-sound');
    }
    
    // update text with rarity after a delay
    setTimeout(function() {
        var rarityElement = document.createElement('div');
        rarityElement.innerHTML = '<b class="pop-up" style="text-transform: uppercase; font-style: 680; font-size: 14px; color: ' + rarityColor + ';">' + rarity + '</b>';
        resultElement.appendChild(rarityElement);
    }, 200); // .2 sec delay for rarity popup
});

// set the volume of all audio elements to 0.04 when the page loads. sorry about that!
window.addEventListener('load', function() {
    changeVolume(0.04);
});

// disables the hotkeys for inspect element & to simulate a right click without the mouse
document.onkeydown = (e) => {
    if (e.key == 123) {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'I') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'C') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.shiftKey && e.key == 'J') {
        e.preventDefault();
    }
    if (e.ctrlKey && e.key == 'U') {
        e.preventDefault();
    }
};

// Define achievements
const achievements = [
    { id: 1, name: 'Lucky Roll', description: 'Roll a number below 100.' },
    { id: 2, name: 'Epic Roller', description: 'Roll an epic rarity number.' },
    // Add more achievements as needed
];

// Initialize user's achievements
let userAchievements = {};

// Function to check if an achievement is unlocked
function isAchievementUnlocked(achievementId) {
    return userAchievements.hasOwnProperty(achievementId);
}

// Function to unlock an achievement
function unlockAchievement(achievementId) {
    userAchievements[achievementId] = true;
    // Update UI to reflect the unlocked achievement
    displayAchievement(achievementId);
}

// Function to track progress and unlock achievements
function trackProgress(rolledNumber) {
    // Check for specific conditions and unlock achievements accordingly
    if (rolledNumber <= 100) {
        unlockAchievement(1); // Lucky Roll achievement
    }
    if (rolledNumber <= 2500) {
        unlockAchievement(2); // Epic Roller achievement
    }
    // Add more conditions to unlock other achievements
}

// Function to display unlocked achievements in the UI
function displayAchievement(achievementId) {
    const achievement = achievements.find(a => a.id === achievementId);
    if (achievement) {
        // Display the achievement in the UI (e.g., add it to a list of earned achievements)
        const achievementList = document.getElementById('achievement-list');
        const achievementItem = document.createElement('li');
        achievementItem.textContent = `${achievement.name}: ${achievement.description}`;
        achievementList.appendChild(achievementItem);
    }
}
