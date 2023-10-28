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
    // Assuming 'dep' is the header for the departure time and 'day' is the header for the day.
    const depIndex = headerRow.indexOf('Dep');
    const dayIndex = headerRow.indexOf('Day');

    if (depIndex === -1 || dayIndex === -1) {
        return null; // Headers not found in the CSV file.
    }

    const currentTime = new Date();
    const currentDay = getCurrentDay(); // Implement your logic to determine the current day.

    let nearestTime = null;
    let nearestTimeDiff = Number.MAX_VALUE;

    for (let i = 1; i < data.length; i++) {
        const row = data[i].split(',');
        const depTime = row[depIndex];
        const day = row[dayIndex];

        // Compare the day to the current day.
        if (day === currentDay) {
            // Calculate the time difference with the current time.
            const timeDiff = Math.abs(getTimeDifference(depTime, currentTime));

            if (timeDiff < nearestTimeDiff) {
                nearestTimeDiff = timeDiff;
                nearestTime = depTime;
            }
        }
    }

    return nearestTime;
}

function getCurrentDay() {
    // Implement your logic to determine the current day (Su, SX, SO).
    // Example: const currentDay = new Date().getDay();
    // Then map it to 'Su', 'SX', 'SO'.
    return 'Su'; // For demonstration.
}

function getTimeDifference(time1, time2) {
    // Implement a function to calculate the time difference.
    // You may need to parse the time strings and calculate the difference.
    // For this example, you can return the time difference in minutes.

    return Math.abs(time1.getTime() - time2.getTime());
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
