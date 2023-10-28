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

    // Implement your logic to extract all fields under index 2.
    const fieldValues = extractFields(validRows, 2);

    // Display the field values on the website
    if (fieldValues.length > 0) {
        displayFieldValues(fieldValues);
    } else {
        displayError();
    }
}

function extractFields(data, columnIndex) {
    const fieldValues = [];

    for (let i = 1; i < data.length; i++) {
        const row = data[i].trim();
        const columns = row.split(',');
        if (columns[columnIndex]) {
            fieldValues.push(columns[columnIndex]);
        }
    }

    return fieldValues;
}

function displayFieldValues(values) {
    const csvDataElement = document.getElementById("csvData");
    csvDataElement.textContent = `Field Values: ${values.join(', ')}`;
    csvDataElement.style.color = 'red'; // Set text color to red
}

function displayError() {
    const csvDataElement = document.getElementById("csvData");
    csvDataElement.textContent = 'Error: No values found.';
    csvDataElement.style.color = 'red'; // Set text color to red
}

getCurrentTimeAndDate();
fetchDataFromCSV();
