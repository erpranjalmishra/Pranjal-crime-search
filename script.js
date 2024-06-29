// Import GoogleGenerativeAI and initialize Gemini API
window.onload = function() {
    initMap();
}
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = "AIzaSyCNjlQYV3tOcIc_ijARSin2QQXde6iAakc"; // Replace with your Gemini API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


let map;
let markers = [];


// Initialize Google Map
function initMap() {
    const center = { lat: 28.368038531992394, lng: 77.5435527821287 };

    map = new google.maps.Map(document.getElementById("map"), {
        center: center,
        zoom: 12,
    });

    // Define marker locations around the center
    const locations = [
        { lat: center.lat + 0.01, lng: center.lng + 0.01 },
        { lat: center.lat - 0.01, lng: center.lng - 0.01 },
        { lat: center.lat + 0.005, lng: center.lng - 0.005 },
        // Add more locations as needed
    ];

    // Create red markers around the center
    locations.forEach(location => {
        const marker = new google.maps.Marker({
            position: location,
            map: map,
            title: "Custom Red Marker",
            icon: {
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png" // Red marker icon
            }
        });
        markers.push(marker);
    });

    // Example of adding a blue marker at the center
    const centerMarker = new google.maps.Marker({
        position: center,
        map: map,
        title: "Center Marker",
        icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png" // Blue marker icon for center
        }
    });
    markers.push(centerMarker);
}

// Event listeners for form submissions
document.getElementById('filter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Implement filter functionality
});

document.getElementById('report-form').addEventListener('submit', function(e) {
    e.preventDefault();
    // Implement crime report submission
});

// Chat box functionality
document.getElementById('send-chat').addEventListener('click', async function() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        addChatMessage('User', message);
        input.value = '';
        await sendToGemini(message);
    }
});

document.getElementById('close-chat').addEventListener('click', function() {
    document.getElementById('chat-container').classList.add('hidden');
    document.getElementById('open-chat').classList.add('show');
});

document.getElementById('open-chat').addEventListener('click', function() {
    document.getElementById('chat-container').classList.remove('hidden');
    document.getElementById('open-chat').classList.remove('show');
});

// Function to add chat messages to the chat box
function addChatMessage(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageElement = document.createElement('div');
    messageElement.classList.add('chat-message');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to send user message to Gemini API and display response
async function sendToGemini(message) {
    try {
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = await response.text();
        addChatMessage('Gemini', text);
    } catch (error) {
        console.error('Error:', error);
        addChatMessage('Gemini', 'Sorry, something went wrong.');
    }
}
