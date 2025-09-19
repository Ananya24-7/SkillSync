document.addEventListener('DOMContentLoaded', () => {

    // --- File Upload & Simulation for Dashboard ---
    const dragDropArea = document.getElementById('drag-drop-area');
    const fileInput = document.getElementById('file-input');
    const browseLink = document.getElementById('browse-link');
    const uploadFileBtn = document.getElementById('upload-file-btn');
    const loadingMessage = document.getElementById('loading-message');
    const gapChartPlaceholder = document.getElementById('gap-chart-placeholder');
    const missingSkillsPlaceholder = document.getElementById('missing-skills-placeholder');
    const coursesPlaceholder = document.getElementById('courses-placeholder');
    const projectsPlaceholder = document.getElementById('projects-placeholder');
    
    let selectedFile = null;

    // Make browse link clickable
    if (browseLink) {
        browseLink.addEventListener('click', () => {
            fileInput.click();
        });
    }

    // Update selected file on input change
    if (fileInput) {
        fileInput.addEventListener('change', (e) => {
            if (e.target.files.length > 0) {
                selectedFile = e.target.files[0];
                alert(`File selected: ${selectedFile.name}. Click "Upload Selected File" to process.`);
                uploadFileBtn.style.display = 'block';
                dragDropArea.classList.remove('highlight');
            }
        });
    }

    // Handle upload button click
    if (uploadFileBtn) {
        uploadFileBtn.addEventListener('click', () => {
            if (selectedFile) {
                simulateAnalysis(selectedFile);
            } else {
                alert("Please select a file first.");
            }
        });
    }

    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        if (dragDropArea) {
            dragDropArea.addEventListener(eventName, preventDefaults, false);
        }
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    // Highlight drop area on drag
    ['dragenter', 'dragover'].forEach(eventName => {
        if (dragDropArea) {
            dragDropArea.addEventListener(eventName, () => {
                dragDropArea.classList.add('highlight');
            }, false);
        }
    });

    ['dragleave', 'drop'].forEach(eventName => {
        if (dragDropArea) {
            dragDropArea.addEventListener(eventName, () => {
                dragDropArea.classList.remove('highlight');
            }, false);
        }
    });

    // Handle dropped files
    if (dragDropArea) {
        dragDropArea.addEventListener('drop', (e) => {
            const dt = e.dataTransfer;
            const files = dt.files;
            if (files.length > 0) {
                selectedFile = files[0];
                alert(`File dropped: ${selectedFile.name}. Click "Upload Selected File" to process.`);
                uploadFileBtn.style.display = 'block';
            }
        });
    }


    function simulateAnalysis(file) {
        // Show loading message
        loadingMessage.classList.remove('hidden');

        // Simulate network request/AI processing
        setTimeout(() => {
            loadingMessage.classList.add('hidden');
            
            // Populate dashboard with simulated data
            populateDashboardWithSimulatedData();

            // Reset upload state
            selectedFile = null;
            fileInput.value = ''; // Clear file input
            alert(`Resume "${file.name}" analyzed successfully! Dashboard updated.`);
        }, 3000); // 3-second delay for simulation
    }

    // --- Dashboard Data Population (Simulated) ---
    function populateDashboardWithSimulatedData() {
        // Ensure this function is only called on the dashboard page
        if (document.getElementById('dashboard-grid')) {
            // --- Skill Gap Chart ---
            gapChartPlaceholder.innerHTML = `
                <div class="chart-container">
                    <canvas id="gap-chart"></canvas>
                    <span id="gap-percentage">65%</span>
                </div>
                <p>You currently match <strong>65%</strong> of the skills for a typical Software Developer role.</p>
            `;
            const ctx = document.getElementById('gap-chart').getContext('2d');
            new Chart(ctx, {
                type: 'doughnut',
                data: {
                    datasets: [{
                        data: [65, 35], // 65% match, 35% gap
                        backgroundColor: ['#3498db', '#ecf0f1'], // Blue for match, light gray for gap
                        borderWidth: 0,
                    }]
                },
                options: {
                    responsive: true,
                    cutout: '70%',
                    plugins: {
                        tooltip: { enabled: false },
                        legend: { display: false }
                    }
                }
            });

            // --- Top Missing Skills ---
            missingSkillsPlaceholder.innerHTML = `
                <ul>
                    <li><span><i class="fas fa-times-circle" style="color:#e74c3c;"></i> React.js</span></li>
                    <li><span><i class="fas fa-times-circle" style="color:#e74c3c;"></i> Node.js & Express</span></li>
                    <li><span><i class="fas fa-times-circle" style="color:#e74c3c;"></i> Effective Communication</span></li>
                    <li><span><i class="fas fa-times-circle" style="color:#e74c3c;"></i> Cloud Fundamentals (AWS/Azure)</span></li>
                </ul>
            `;

            // --- Courses Suggested ---
            coursesPlaceholder.innerHTML = `
                <ul>
                    <li>**"Modern React with Redux"** (Udemy)</li>
                    <li>**"Complete Node.js Developer"** (Coursera)</li>
                    <li>**"Soft Skills for Engineers"** (Pluralsight)</li>
                </ul>
            `;

            // --- Projects Suggested ---
            projectsPlaceholder.innerHTML = `
                <ul>
                    <li>Build a **Full-Stack E-commerce** application.</li>
                    <li>Create a **Personal Portfolio** with a blog feature.</li>
                    <li>Develop a **Real-time Chat App** using WebSockets.</li>
                </ul>
            `;
        }
    }
});