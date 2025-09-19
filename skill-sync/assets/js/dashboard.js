document.addEventListener('DOMContentLoaded', () => {

    // --- New Feature: Gamification ---
    let skillCoins = localStorage.getItem('skillCoins') ? parseInt(localStorage.getItem('skillCoins')) : 0;
    const skillCoinsBar = document.getElementById('skill-coins-bar');
    const skillCoinsValue = document.getElementById('skill-coins-value');
    const claimRewardBtn = document.getElementById('claim-reward-btn');

    function updateSkillCoinsUI() {
        if (skillCoinsValue) {
            skillCoinsValue.innerText = skillCoins;
        }
        if (skillCoinsBar) {
            const progress = Math.min((skillCoins / 100) * 100, 100);
            skillCoinsBar.style.width = `${progress}%`;
        }
        if (claimRewardBtn) {
            if (skillCoins >= 100) {
                claimRewardBtn.style.display = 'block';
            } else {
                claimRewardBtn.style.display = 'none';
            }
        }
    }

    if (claimRewardBtn) {
        claimRewardBtn.addEventListener('click', () => {
            alert("Reward claimed! You've unlocked a mock interview session.");
            skillCoins = 0;
            localStorage.setItem('skillCoins', skillCoins);
            updateSkillCoinsUI();
        });
    }

    // --- New Feature: Real-Time Skill Validation (Simulated) ---
    const startAssessmentBtn = document.getElementById('start-assessment-btn');
    const uploadGithubBtn = document.getElementById('upload-github-btn');

    if (startAssessmentBtn) {
        startAssessmentBtn.addEventListener('click', () => {
            alert("Starting AI-powered skill assessment...");
            skillCoins += 50;
            localStorage.setItem('skillCoins', skillCoins);
            updateSkillCoinsUI();
        });
    }

    if (uploadGithubBtn) {
        uploadGithubBtn.addEventListener('click', () => {
            const githubLink = prompt("Please paste your GitHub project link:");
            if (githubLink) {
                alert(`AI is reviewing your project at ${githubLink}...`);
                setTimeout(() => {
                    alert("Your project has been successfully validated! You earned 80 SkillCoins.");
                    skillCoins += 80;
                    localStorage.setItem('skillCoins', skillCoins);
                    updateSkillCoinsUI();
                }, 3000);
            }
        });
    }

    // Call the function to set the initial UI state
    updateSkillCoinsUI();
});