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

    // Implement your logic to extract all times under the 'Dep' heading.
    const depTimes = extractDepTimes(validRows);

    // Display the times on the website
    if (depTimes.length > 0) {
        displayDepTimes(depTimes);
    } else {
        displayError();
    }
}

function extractDepTimes(data) {
    const depTimes = [];

    for (let i = 1; i < data.length; i++) {
        const row = data[i].trim();
        if (row) {
            depTimes.push(row);
        }
    }

    return depTimes;
}

function displayDepTimes(times) {
    const csvDataElement = document.getElementById("csvData");
    csvDataElement.textContent = `Dep Times: ${times.join(', ')}`;
    csvDataElement.style.color = 'red'; // Set text color to red
}

function displayError() {
    const csvDataElement = document.getElementById("csvData");
    csvDataElement.textContent = 'Error: No times found.';
    csvDataElement.style.color = 'red'; // Set text color to red
}

getCurrentTimeAndDate();
fetchDataFromCSV();
