function getCurrentTimeAndDate() {
    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();
    document.getElementById("currentDateTime").textContent = `Current Date and Time: ${formattedDateTime}`;
}

async function fetchDataFromCSV() {
    const response = await fetch('output.csv'); // Change the path to your CSV file.
    const csvData = await response.text();

    const rows = csvData.split('\n');
    const headerRow = rows[0].split(',');

    // Implement your logic to parse the CSV data and find the nearest time.
    const nearestTime = findNearestTime(rows, headerRow);

    // Display data or an error message on the website
    if (nearestTime) {
        displayData(nearestTime);
    } else {
        displayError();
    }
}

function findNearestTime(data, headerRow) {
    // Implement your logic to find the nearest time in the CSV data.
    // You'll need to parse the data and compare it with the current date and day.

    // For demonstration, return null to indicate an error.
    return null;
}

function displayData(data) {
    const csvDataElement = document.getElementById("csvData");
    csvDataElement.textContent = `Dep: ${data.Dep}, Arr: ${data.Arr}, Head: ${data.Head}, Loc: ${data.Loc}`;
    csvDataElement.style.color = 'red'; // Set text color to red
}

function displayError() {
    const csvDataElement = document.getElementById("csvData");
    csvDataElement.textContent = 'Error: Time not found.';
    csvDataElement.style.color = 'red'; // Set text color to red
}

getCurrentTimeAndDate();
fetchDataFromCSV();
