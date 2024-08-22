/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */

// Function to minimize the window
document.addEventListener('DOMContentLoaded', () => {
    const minimizeButton = document.getElementById('minbtn');
    if (minimizeButton) {
        minimizeButton.addEventListener('click', () => {
            if (window.electron && typeof window.electron.minimizeWindow === 'function') {
                window.electron.minimizeWindow();
            } else {
                console.error('Minimize function is not available.');
            }
        });
    } else {
        console.error('Minimize button not found.');
    }
});

function unreadableDescription(){
    const imageUrl = './assets/images/broken-description.png';
    window.open(imageUrl, '_blank', 'toolbar=no,width=800,height=600');
}

function junkDescription() {
    const imageUrl = './assets/images/junk-description.png';
    window.open(imageUrl, '_blank', 'toolbar=no,width=800,height=600');
}

function acceptedDescription() {
    const imageUrl = './assets/images/acceptable-description.png';
    window.open(imageUrl, '_blank', 'toolbar=no,width=800,height=600');
}

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const initialFontSize = parseInt(window.getComputedStyle(container).fontSize);

    // Function to check overflow and adjust font size
    function adjustFontSize() {
        if (container.scrollWidth > container.clientWidth) {
            container.style.fontSize = '10px';
        } else {
            container.style.fontSize = initialFontSize + 'px';
        }
    }
    adjustFontSize();
    window.addEventListener('resize', adjustFontSize);
});

document.addEventListener('DOMContentLoaded', () => {
    // Get the element by its ID
    const textElement = document.getElementById('loadingtext');

    // Check if the element exists
    if (textElement) {
        // Set the new text value
        const newTextValue = "My Application (edit in renderer.js)"; //Change to your project name
        textElement.textContent = newTextValue;
    } else {
        console.error('Element with ID "loadingtext" not found.');
    }
});
