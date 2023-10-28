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

    // Filter the data based on the tab (in this case, "output")
    const filteredData = filterDataByTab(rows, headerRow, 'output');

    // Implement your logic to find the nearest time within the filtered data.
    const nearestTime = findNearestTime(filteredData, headerRow);

    // Display data or an error message on the website
    if (nearestTime) {
        displayData(nearestTime);
    } else {
        displayError();
    }
}

function filterDataByTab(data, headerRow, tabName) {
    // Find the index of the "tab" column (assuming it's the first column).
    const tabIndex = headerRow.indexOf('tab');
    
    if (tabIndex === -1) {
        return [];
    }

    // Filter the data to include only rows with the specified tabName.
    const filteredData = data.filter(row => {
        const rowData = row.split(',');
        return rowData[tabIndex] === tabName;
    });

    return filteredData;
}

function findNearestTime(data, headerRow) {
    // Implement your logic to find the nearest time in the filtered data.
    // You need to parse the data and compare it with the current date and day.
    // If you don't find a suitable time, return null to indicate that the time wasn't found.

    // For demonstration, here's a simple example:
    for (let i = 1; i < data.length; i++) {
        const row = data[i].split(',');
        const time = row[2]; // Assuming the time is in the third column (index 2).
        // Implement your comparison logic here to find the nearest time.
        // If you find a suitable time, return it.
    }

    // If no suitable time is found, return null.
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
