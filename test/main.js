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
    const currentHour = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();

    let nearestTime = null;
    let nearestTimeDiff = Number.MAX_VALUE;

    for (let i = 0; i < data.length; i++) {
        const row = data[i].split(',');
        const timeParts = row[0].split(':');
        const depHour = parseInt(timeParts[0], 10);
        const depMinute = parseInt(timeParts[1], 10);

        // Calculate the time difference with the current time.
        const timeDiff = Math.abs((depHour * 60 + depMinute) - (currentHour * 60 + currentMinute));

        if (timeDiff < nearestTimeDiff) {
            nearestTimeDiff = timeDiff;
            nearestTime = depHour + ':' + (depMinute < 10 ? '0' : '') + depMinute;
        }
    }

    return nearestTime;
}

function displayData(nearestTime) {
    const csvDataElement = document.getElementById("csvData");
    csvDataElement.textContent = `Dep: ${nearestTime}`;
    csvDataElement.style.color = 'red'; // Set text color to red
}

function displayError() {
    const csvDataElement = document.getElementById("csvData");
    csvDataElement.textContent = 'Error: Time not found.';
    csvDataElement.style.color = 'red'; // Set text color to red
}

getCurrentTimeAndDate();
fetchDataFromCSV();
