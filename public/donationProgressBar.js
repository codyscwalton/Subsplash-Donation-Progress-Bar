// POST to get token from proxy to Subsplash API token service.

function fetchBearerToken() {
    console.log('Requesting Access')

    var apiURL = '/token';

    fetch(apiURL, {
        method: 'POST',
    })
    .then(response => response.json())
    .then(data => {
        var bearerToken = data.access_token;
        // Now you have the bearerToken, you can use it for subsequent API requests.
        fetchData(bearerToken);
    })
    .catch(error => {
        console.error('Error fetching bearer token:', error);
    });

    console.log('Access Granted')
}

// GET data from proxy to Subsplash API fund service filtered by a specific fund.

function fetchData(bearerToken) {
    console.log('Loading Donation Data')

    var apiUrl = '/donations';

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'authorization': 'Bearer ' + bearerToken,
        }
    })
    .then(response => response.json())
    .then(data => {
        var goalAmount = 325000;
        var churchDonation = 12000;
        var donationsArray = data._embedded.donations;

        // Initialize total adjusted value
        var totalAdjustedValue = 0;

        // Loop through each donation and calculate the value
        for (var i = 0; i < donationsArray.length; i++) {
            var totalAmountValue = donationsArray[i].total_amount.value;
            var totalFeeValue = donationsArray[i].total_fee.value;

            // Calculate the value by subtracting total_fee from total_amount
            var calculatedValue = totalAmountValue - totalFeeValue;

            // Move the decimal over 2 spots
            var adjustedValue = calculatedValue / 100;

            // Add the adjusted value to the donation object (you can store it in a new property)
            donationsArray[i].adjusted_value = adjustedValue;

            // Log the result for each donation
            console.log("Donation ID:", donationsArray[i].id);
            console.log("Adjusted Value:", adjustedValue);

            // Accumulate adjusted values
            totalAdjustedValue += adjustedValue;
        }

        // Add church donation to the total
        totalAdjustedValue += churchDonation;

        // Log the total adjusted value
        console.log("Total Adjusted Value (including church donation):", totalAdjustedValue);

        // Round the total adjusted value for progress bar update
        var currentDonationAmount = Math.round(totalAdjustedValue * 10) / 10;

        // Update progress bar
        updateProgressBar(currentDonationAmount, goalAmount);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });

    console.log('Donation Data Loaded');
}


// Example usage:
fetchBearerToken();


// Update the progress bar with the data from /donations
function updateProgressBar(currentDonationAmount, goalAmount) {
    console.log('Updating Progress Bar')

    var progress = Math.min(1.0, currentDonationAmount / goalAmount);
    var progressBar = document.getElementById('progress');
    var progressText = document.getElementById('progress-text');
    var progressTotalText = document.getElementById('total-text');
    var progressLine = document.querySelector('.progress-line');

    progressBar.style.width = (progress * 100) + '%';
    progressTotalText.textContent = 'Total Funds - $' + (currentDonationAmount / 1000).toFixed(1) + 'K';
    progressText.textContent = 'Progress - ' + (progress * 100).toFixed(0) + '% complete';

    // Set the position of the progress line to the end of the progress bar
    progressLine.style.left = progressBar.offsetWidth + 'px';

    console.log('Progress Bar Updated')
}