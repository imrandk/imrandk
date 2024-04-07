// Function to generate a random value within the specified range
function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to set a random value for the range input and trigger the input event
function clickRandomly() {
    // Select the range input element
    const rangeInput = document.getElementById('range_id_2');

    // Set a random value within the specified range
    const randomValue = getRandomValue(parseInt(rangeInput.min), parseInt(rangeInput.max));
    rangeInput.value = randomValue;

    // Trigger the input event
    rangeInput.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
}

// Function to continuously click the range input randomly
function continuouslyClickRandomly() {
    // Call clickRandomly initially
    clickRandomly();

    // Call clickRandomly repeatedly with a delay
    setInterval(clickRandomly, 1000); // Adjust the delay (in milliseconds) as needed
}

// Start continuously clicking the range input randomly
continuouslyClickRandomly();

// Function to save images automatically
async function saveImages() {
    while (true) {
        try {
            // Select all anchor elements containing download buttons
            const downloadLinks = document.querySelectorAll('a[href^="https://diffusers-unofficial-sdxl-turbo-i2i-t2i.hf.space/--replicas/pvi7w/file="]');

            // Retrieve the list of downloaded IDs from localStorage
            let downloadedImageIds = JSON.parse(localStorage.getItem('downloadedImageIds')) || [];

            // Iterate over each download link
            for (const link of downloadLinks) {
                // Get the image URL from the download link's href attribute
                const imageURL = link.href;

                // Extract the ID from the URL
                const id = imageURL.match(/([^/]+)\/image.png$/)[1];

                // Check if the image ID has already been downloaded
                if (!downloadedImageIds.includes(id)) {
                    // Fetch the image data
                    const response = await fetch(imageURL);
                    const blob = await response.blob();

                    // Create a temporary anchor element to trigger the download
                    const anchor = document.createElement('a');
                    anchor.href = URL.createObjectURL(blob);
                    anchor.download = id + ".png"; // Set the filename with the ID
                    anchor.click();

                    // Add the ID to the list of downloaded images
                    downloadedImageIds.push(id);
                    // Update localStorage with the updated list of downloaded IDs
                    localStorage.setItem('downloadedImageIds', JSON.stringify(downloadedImageIds));
                }
            }

            // Wait for a certain delay before checking for new images again
            await new Promise(resolve => setTimeout(resolve, 1000)); // Delay for 5 seconds
        } catch (error) {
            console.error("An error occurred while saving images:", error);
        }
    }
}

// Call the saveImages function to initiate continuous download
saveImages();
