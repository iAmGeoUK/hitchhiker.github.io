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
    const times = extractDepTimes(validRows);

    // Display the times on the website
    if (times.length > 0) {
        displayDepTimes(times);
    } else {
        displayError();
    }
}

function extractDepTimes(data) {
    const depTimes = [];

    for (let i = 0; i < data.length; i++) {
        const row = data[i].split(',');
        if (row[0]) { // Assuming the 'Dep' column is the first column
            depTimes.push(row[0]);
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
