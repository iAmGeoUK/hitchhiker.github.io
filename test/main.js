function getCurrentTimeAndDate() {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();
    document.getElementById("currentDateTime").textContent = `Current Date and Time: ${formattedDateTime}`;
}

async function fetchDataFromCSV() {
    const response = await fetch('output.csv'); // Change the path to your CSV file.
    const csvData = await response.text();

    const rows = csvData.split('\n');

    // Remove empty lines
    const validRows = rows.filter(row => row.trim() !== "");

    // Implement your logic to find the nearest time within the CSV data.
    const nearestTime = findNearestTime(validRows);

    // Display data or an error message on the website
    if (nearestTime) {
        displayData(nearestTime);
    } else {
        displayError();
    }
}

function findNearestTime(data) {
    const currentTime = new Date();

    let nearestTime = null;
    let nearestTimeDiff = Number.MAX_VALUE;

    for (let i = 0; i < data.length; i++) {
        const row = data[i].split(',');
        const depTime = new Date(`2023-10-28T${row[0]}`);
        
        // Remove seconds from the current time and the departure time.
        currentTime.setSeconds(0);
        depTime.setSeconds(0);

        // Calculate the time difference with the current time.
        const timeDiff = Math.abs(depTime - currentTime);

        if (timeDiff < nearestTimeDiff) {
            nearestTimeDiff = timeDiff;
            nearestTime = depTime;
        }
    }

    return nearestTime;
}

function displayData(nearestTime) {
    const csvDataElement = document.getElementById("csvData");
    const depTimeFormatted = nearestTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    csvDataElement.textContent = `Dep: ${depTimeFormatted}`;
    csvDataElement.style.color = 'red'; // Set text color to red
}

function displayError() {
    const csvDataElement = document.getElementById("csvData");
    csvDataElement.textContent = 'Error: Time not found.';
    csvDataElement.style.color = 'red'; // Set text color to red
}

getCurrentTimeAndDate();
fetchDataFromCSV();
