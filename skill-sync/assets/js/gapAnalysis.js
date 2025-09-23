document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatDisplay = document.getElementById('chat-display');
    const addToRoadmapBtn = document.getElementById('add-to-roadmap');

    // Function to add a message to the chat display
    const addMessageToChat = (message, sender) => {
        const messageElement = document.createElement('p');
        messageElement.textContent = message;
        if (sender === 'ai') {
            messageElement.classList.add('ai-message');
        } else {
            // Placeholder for user messages
            // messageElement.classList.add('user-message'); 
        }
        chatDisplay.appendChild(messageElement);
        // Scroll to the bottom of the chat display
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    };

    // Handle chat form submission
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page reload
        const userMessage = chatInput.value.trim();
        if (userMessage) {
            // For this example, we'll just log the user's message
            // addMessageToChat(userMessage, 'user');
            console.log("User message:", userMessage);
            chatInput.value = ''; // Clear the input field

            // Simulate an AI response
            setTimeout(() => {
                const aiResponse = "That's a great question! I can help you with that. We can start by adding Python to your roadmap.";
                addMessageToChat(aiResponse, 'ai');
            }, 500);
        }
    });

    // Handle the "Add to Roadmap" button click
    addToRoadmapBtn.addEventListener('click', () => {
        const missingSkills = document.querySelectorAll('.skill-tag.missing');
        const skillsToAdd = Array.from(missingSkills).map(skill => skill.textContent);

        if (skillsToAdd.length > 0) {
            alert(`The following skills have been added to your roadmap: ${skillsToAdd.join(', ')}`);
            console.log("Adding skills to roadmap:", skillsToAdd);
        } else {
            alert("No missing skills to add to your roadmap!");
        }
    });
});