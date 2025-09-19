document.addEventListener('DOMContentLoaded', () => {

    const roadmapVisualization = document.getElementById('roadmap-visualization');
    const roadmapDetails = document.getElementById('roadmap-details');

    const selectedRole = localStorage.getItem('selectedRole');
    const roleRoadmap = JSON.parse(localStorage.getItem('roleRoadmap'));
    const readinessScore = localStorage.getItem('readinessScore');

    if (selectedRole && roleRoadmap) {
        // Update the page title and header
        document.querySelector('.welcome-text').innerText = `${selectedRole} Roadmap`;

        // Create the visual roadmap
        roadmapVisualization.innerHTML = `
            <div class="roadmap-segment start">Your Profile (${readinessScore}%)</div>
        `;
        roleRoadmap.forEach((segment, index) => {
            const arrow = document.createElement('div');
            arrow.classList.add('roadmap-arrow');
            roadmapVisualization.appendChild(arrow);

            const segmentDiv = document.createElement('div');
            segmentDiv.classList.add('roadmap-segment');
            segmentDiv.classList.add(segment.type);
            segmentDiv.innerText = segment.name;
            roadmapVisualization.appendChild(segmentDiv);
        });

        // Create the detailed roadmap
        roadmapDetails.innerHTML = ''; // Clear previous content
        roleRoadmap.forEach(segment => {
            const card = document.createElement('div');
            card.classList.add('roadmap-card');
            
            const cardTitle = document.createElement('h3');
            cardTitle.innerText = segment.name;
            card.appendChild(cardTitle);

            const taskList = document.createElement('ul');
            segment.tasks.forEach(task => {
                const taskItem = document.createElement('li');
                taskItem.innerText = task;
                taskList.appendChild(taskItem);
            });
            card.appendChild(taskList);

            roadmapDetails.appendChild(card);
        });

    } else {
        roadmapVisualization.innerHTML = '<p>No roadmap found. Please return to the dashboard and analyze your resume.</p>';
        roadmapDetails.innerHTML = '';
    }
});