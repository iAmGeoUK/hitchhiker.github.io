function checkTime() {
    const startTime = new Date(document.getElementById("start-time").value);
    const endTime = new Date(document.getElementById("end-time").value);
    const location = document.getElementById("location").value;

    const timeDifference = endTime - startTime;

    const times = {
        "Abbey Wood": 47,
        "Ealing Broadway": 44,
        "Gidea Park Station": 62,
        "Gidea Park CS": 42,
        "Liverpool St": 46,
        "Maidenhead Cincom": 48,
        "Maidenhead CS": 47,
        "OCC": 57,
        "Paddington GW": 48,
        "Paddington LL": 42,
        "Paddington GW*": 56,
        "Plumstead": 57,
        "Shenfield": 42,
        "Shenfield CS": 49
    };

    const specifiedValue = times[location] * 60000;

    if (timeDifference < specifiedValue) {
        const newEndTime = new Date(startTime.getTime() + specifiedValue);
        document.getElementById("message").innerHTML = `Your break at ${location} is <b>less</b> than ${times[location]} minutes. <br>PNB STATUS: <span class="fail">FAILED</span>, <u>Contact Control</u>. <br><b>YOU ARE UNABLE TO DRIVE UNTIL: ${newEndTime.toLocaleString()}</b>. <br>Minimum PNB Time at this location: ${times[location]} minutes.`;
    } else {
        document.getElementById("message").innerHTML = `Your break at ${location} is <b>equal to or greater than</b> ${times[location]} minutes. <br>PNB STATUS: <span class="pass">Pass</span> Go drive your train. <br>Minimum PNB Time at this location: ${times[location]} minutes.`;
    }
}
