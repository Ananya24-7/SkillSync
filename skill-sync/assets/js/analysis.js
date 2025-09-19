document.addEventListener('DOMContentLoaded', () => {

    // --- Core Logic: Resume Analysis & Display ---
    const roleRequirements = {
        'Full-Stack Developer': {
            skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js', 'Databases', 'API Design', 'Git'],
            roadmap: [
                { type: 'skill', name: 'Learn the Basics', tasks: ['HTML & CSS Fundamentals', 'JavaScript ES6+', 'Git & GitHub Basics'] },
                { type: 'skill', name: 'Front-end Specialization', tasks: ['Master React.js', 'State Management (Redux/Context API)', 'Responsive Design'] },
                { type: 'skill', name: 'Back-end Specialization', tasks: ['Node.js & Express Framework', 'Database Integration (SQL/NoSQL)', 'Build a RESTful API'] },
                { type: 'project', name: 'Capstone Project', tasks: ['Build a Full-Stack E-commerce App', 'Integrate Payments & User Auth', 'Deploy to a cloud platform (e.g., Vercel)'] }
            ]
        },
        'Data Scientist': {
            skills: ['Python', 'R', 'Machine Learning', 'SQL', 'Data Visualization', 'Statistics', 'Pandas'],
            roadmap: [
                { type: 'skill', name: 'Learn the Basics', tasks: ['Python & Libraries (Numpy, Pandas)', 'Foundational Statistics', 'SQL for Data Extraction'] },
                { type: 'skill', name: 'Machine Learning Fundamentals', tasks: ['Supervised & Unsupervised Learning', 'Model Evaluation & Tuning', 'Scikit-learn'] },
                { type: 'skill', name: 'Big Data & Deployment', tasks: ['Work with Big Datasets', 'Data Visualization (Matplotlib, Seaborn)', 'Introduction to Cloud (AWS/Azure)'] },
                { type: 'project', name: 'Capstone Project', tasks: ['Predictive Analytics Project', 'Build a Recommendation Engine', 'Deploy a simple ML model as an API'] }
            ]
        },
        'Cybersecurity Analyst': {
            skills: ['Networking', 'Cryptography', 'Penetration Testing', 'Security Information and Event Management', 'Linux'],
            roadmap: [
                { type: 'skill', name: 'Foundational Knowledge', tasks: ['Networking Protocols (TCP/IP)', 'Linux Command Line', 'Introduction to Cryptography'] },
                { type: 'skill', name: 'Hands-on Security Skills', tasks: ['Vulnerability Assessment', 'Master Penetration Testing Tools', 'Incident Response'] },
                { type: 'skill', name: 'Advanced Concepts', tasks: ['Cloud Security (AWS, Azure)', 'Threat Intelligence', 'Security Information and Event Management'] },
                { type: 'project', name: 'Capstone Project', tasks: ['Simulate a Network Attack', 'Analyze Security Logs', 'Develop a Security Incident Report'] }
            ]
        },
        'Mobile App Developer': {
            skills: ['Java', 'Kotlin', 'Swift', 'Dart', 'Flutter', 'UI/UX Design', 'API Integration'],
            roadmap: [
                { type: 'skill', name: 'Foundational Knowledge', tasks: ['Learn a Platform Language (Kotlin or Swift)', 'UI/UX Principles', 'Work with APIs'] },
                { type: 'skill', name: 'Cross-Platform Development', tasks: ['Master Dart & Flutter', 'Build a simple app with Flutter', 'State Management'] },
                { type: 'skill', name: 'Advanced Features', tasks: ['Integrate Push Notifications', 'Database Management', 'App Store Deployment'] },
                { type: 'project', name: 'Capstone Project', tasks: ['Build a Social Media App', 'Create a Portfolio App with a Backend', 'Publish an App to the Google Play Store or Apple App Store'] }
            ]
        }
    };

    const dashboardGrid = document.getElementById('dashboard-grid');
    const dragDropArea = document.getElementById('drag-drop-area');
    const fileInput = document.getElementById('file-input');
    const uploadBtn = document.getElementById('upload-file-btn');
    const loadingMessage = document.getElementById('loading-message');
    const browseLink = document.getElementById('browse-link');
    const roleSelect = document.getElementById('role-select');
    const resultsSection = document.getElementById('gap-analysis-results');

    // Populate the dropdown with tech roles
    for (const role in roleRequirements) {
        const option = document.createElement('option');
        option.value = role;
        option.textContent = role;
        roleSelect.appendChild(option);
    }

    // Drag & Drop event listeners
    if (dragDropArea) {
        dragDropArea.addEventListener('dragover', (e) => { e.preventDefault(); dragDropArea.classList.add('drag-over'); });
        dragDropArea.addEventListener('dragleave', () => { dragDropArea.classList.remove('drag-over'); });
        dragDropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            dragDropArea.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                fileInput.files = files;
                uploadBtn.innerText = `Analyze ${files[0].name}`;
            }
        });
        browseLink.addEventListener('click', () => { fileInput.click(); });
    }

    // Analyze button logic
    if (uploadBtn) {
        uploadBtn.addEventListener('click', () => {
            if (fileInput.files.length > 0 && roleSelect.value) {
                // Show loading and hide dashboard grid
                loadingMessage.classList.remove('hidden');
                dashboardGrid.classList.add('hidden');
                resultsSection.classList.add('hidden'); // Ensure results section is hidden

                setTimeout(() => {
                    const selectedRole = roleSelect.value;
                    const requiredSkills = roleRequirements[selectedRole].skills || [];
                    const userSkills = ['HTML', 'CSS', 'JavaScript', 'Git', 'React']; // Mock user skills

                    const gapSkills = requiredSkills.filter(skill => !userSkills.includes(skill));
                    const readinessScore = Math.floor((userSkills.length / requiredSkills.length) * 100);

                    // Store the data in localStorage for the roadmap page
                    localStorage.setItem('userSkills', JSON.stringify(userSkills));
                    localStorage.setItem('gapSkills', JSON.stringify(gapSkills));
                    localStorage.setItem('selectedRole', selectedRole);
                    localStorage.setItem('roleRoadmap', JSON.stringify(roleRequirements[selectedRole].roadmap));
                    localStorage.setItem('readinessScore', readinessScore);

                    // Update UI with results
                    updateMissingSkills(gapSkills);
                    displayAnalysisResults(readinessScore, selectedRole, requiredSkills, userSkills, gapSkills);

                    // Hide loading and show results section
                    loadingMessage.classList.add('hidden');
                    resultsSection.classList.remove('hidden');

                }, 2000);
            } else {
                alert('Please upload a resume and select a dream role.');
            }
        });
    }

    // Function to update the missing skills list
    function updateMissingSkills(gapSkills) {
        const placeholder = document.getElementById('missing-skills-placeholder');
        if (!placeholder) return;

        placeholder.innerHTML = '';
        if (gapSkills.length > 0) {
            const list = document.createElement('ul');
            gapSkills.forEach(skill => {
                const li = document.createElement('li');
                li.innerHTML = `<span><i class="fas fa-times-circle" style="color:#e74c3c;"></i> ${skill}</span>`;
                list.appendChild(li);
            });
            placeholder.appendChild(list);
        } else {
            placeholder.innerHTML = '<p class="initial-message">You have all the skills for this role!</p>';
        }
    }

    // Function to display the comprehensive analysis results
    function displayAnalysisResults(readinessScore, role, requiredSkills, userSkills, gapSkills) {
        // Find and populate elements within the results section
        document.getElementById('comparisonTitle').innerText = `Skill Gap Analysis for ${role}`;
        
        const comparisonList = document.getElementById('comparisonList');
        comparisonList.innerHTML = `
            <li class="good">✅ <strong>Your Skills:</strong> ${userSkills.join(', ')}</li>
            <li class="bad">❌ <strong>Missing Skills:</strong> ${gapSkills.join(', ')}</li>
        `;
        
        const recommendations = document.getElementById('recommendations');
        recommendations.innerHTML = `
            <h2>Next Steps & Recommendations</h2>
            <p>Based on your missing skills, here are some actionable recommendations to get you started:</p>
            <ol>
                <li>Complete courses or tutorials on **${gapSkills[0]}** and **${gapSkills[1]}**.</li>
                <li>Work on a small project that uses **${gapSkills[0]}** to solidify your understanding.</li>
                <li>Update your resume to highlight your existing skills: **${userSkills[0]}** and **${userSkills[1]}**.</li>
            </ol>
        `;
        
        // Update charts
        createPieChart(readinessScore);
        createRadarChart(requiredSkills, userSkills);
    }

    // Create the pie chart for readiness score
    function createPieChart(score) {
        const ctx = document.getElementById('pieChart').getContext('2d');
        // Destroy existing chart if it exists
        if (window.myPieChart) {
            window.myPieChart.destroy();
        }
        window.myPieChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Ready', 'Gap'],
                datasets: [{
                    data: [score, 100 - score],
                    backgroundColor: ['#2ecc71', '#e74c3c']
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

    // Create the radar chart for skill comparison
    function createRadarChart(requiredSkills, userSkills) {
        const labels = requiredSkills;
        const requiredData = requiredSkills.map(() => 100);
        const userData = requiredSkills.map(skill => userSkills.includes(skill) ? 100 : 0);

        const ctx = document.getElementById('radarChart').getContext('2d');
        // Destroy existing chart if it exists
        if (window.myRadarChart) {
            window.myRadarChart.destroy();
        }
        window.myRadarChart = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Required',
                        data: requiredData,
                        backgroundColor: 'rgba(52, 152, 219, 0.2)',
                        borderColor: '#3498db',
                        pointBackgroundColor: '#3498db'
                    },
                    {
                        label: 'Your Skills',
                        data: userData,
                        backgroundColor: 'rgba(46, 204, 113, 0.2)',
                        borderColor: '#2ecc71',
                        pointBackgroundColor: '#2ecc71'
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: { display: false },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
});