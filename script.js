let launchesVisible = false;

async function toggleLaunchList() {
    if (launchesVisible) {
        document.getElementById('launchList').style.display = 'none';
    } else {
        await fetchAndDisplayLaunches();
        document.getElementById('launchList').style.display = 'block';
    }

    launchesVisible = !launchesVisible;
}

async function fetchAndDisplayLaunches() {
    try {
        const response = await fetch('http://localhost:3000/launches');
        if (response.ok) {
            const launches = await response.json();
            renderLaunches(launches);
        } else {
            const errorMessage = await response.json();
            console.error(errorMessage.message);
        }
    } catch (error) {
        console.error('Error fetching launches:', error);
    }
}

function renderLaunches(launches) {
    const launchListContainer = document.getElementById('launchList');
    launchListContainer.innerHTML = '';

    launches.forEach((launch, index) => {
        const launchItem = document.createElement('div');
        launchItem.classList.add('launch-item'); // Add a class to launchItem
        launchItem.innerHTML = `
            <div class="launch-header" onclick="toggleDetails(${index})">
                <p><strong class="title pop">${launch.rocket}</strong></p>
            </div>
            <div id="details_${index}" class="details" style="display: none;">
                <div class="details-row">
                    <p><strong class="titles">Altitude:</strong> ${launch.altitude}</p>
                    <p><strong class="titles">Duration:</strong> ${launch.duration}</p>
                </div>
                <div class="details-row">
                    <p><strong class="titles">Engine:</strong> ${launch.engine}</p>
                    <p><strong class="titles">Payload:</strong> ${launch.payload}</p>
                </div>
                <div class="details-row">
                    <button class="editbutton" onclick="editLaunch(${index})">Edit</button>
                    <button class="editbutton" onclick="deleteLaunch('${launch._id}')">Delete</button>
                </div>
            </div>
        `;
        launchListContainer.appendChild(launchItem);
    });
}



function toggleDetails(index) {
    const detailsDiv = document.getElementById(`details_${index}`);
    detailsDiv.style.display = detailsDiv.style.display === 'none' ? 'block' : 'none';
}

async function deleteLaunch(id) {
    // Ask the user for confirmation
    const userConfirmed = confirm("Are you sure you want to delete this launch?");

    if (!userConfirmed) {
        return; // Do nothing if the user cancels
    }

    try {
        const response = await fetch(`http://localhost:3000/launches/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            console.log('Launch deleted successfully');
            await fetchAndDisplayLaunches();
        } else {
            const errorMessage = await response.json();
            console.error(errorMessage.message);
        }
    } catch (error) {
        console.error('Error deleting launch:', error);
    }
}


function editLaunch(index) {
    // Implement edit functionality
    // pre-fill the form with existing data
}

async function addLaunch() {
    const rocketInput = document.getElementById('rocketInput').value;
    const altitudeInput = document.getElementById('altitudeInput').value;
    const durationInput = document.getElementById('durationInput').value;
    const engineInput = document.getElementById('engineInput').value;
    const payloadInput = document.getElementById('payloadInput').value;

    const launchData = {
        rocket: rocketInput,
        altitude: altitudeInput,
        duration: durationInput,
        engine: engineInput,
        payload: payloadInput,
    };

    console.log('Sending data to the server:', launchData);

    try {
        const response = await fetch('http://localhost:3000/launches', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },  
            body: JSON.stringify(launchData)
        });

        if (response.ok) {
            console.log('Launch added successfully');
            await fetchAndDisplayLaunches();
            clearForm();
        } else {
            const errorMessage = await response.json();
            console.error(errorMessage.message);
        }
    } catch (error) {
        console.error('Error adding launch:', error);
    }
}

function clearForm() {
    document.getElementById("rocketInput").value = "";
    document.getElementById("altitudeInput").value = "";
    document.getElementById("durationInput").value = "";
    document.getElementById("engineInput").value = "";
    document.getElementById("payloadInput").value = "";
}