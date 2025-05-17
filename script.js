// Your variables
const box = document.querySelector('.gift');
const lid = document.querySelector('.box-lid');
const complimentContainer = document.querySelector('.compliment-container');

// Initial empty array for compliments
let compliments = [];
let shownCompliments = [];

// Fetch compliments from the JSON file
fetch('compliments.json')
  .then(response => response.json())
  .then(data => {
    compliments = data.compliments; // Assign fetched compliments to the compliments array
  })
  .catch(error => console.error('Error loading compliments:', error));

// Event listener for click event
box.addEventListener('click', openClickFunction);

function openClickFunction() {
  lid.classList.add('opening');

  // Remove shake animation once lid opening finishes
  lid.addEventListener('animationend', stopShake, { once: true });
}

// Function to stop the shake animation
function stopShake() {
  box.classList.remove('shaking');

  // Display the compliment after lid opens
  showCompliment();
}

// Function to show compliments
function showCompliment() {
  // Make sure compliments are loaded before selecting a random one
  if (compliments.length > 0) {
    // Get a random compliment
    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];

    // Ensure the same compliment doesn't appear twice in a row
    if (shownCompliments.includes(randomCompliment)) {
      showCompliment(); // Try again if it's been shown before
      return;
    }

    // Display the compliment
    complimentContainer.textContent = randomCompliment;
    complimentContainer.classList.add('show');

    // Add the compliment to the shownCompliments array
    shownCompliments.push(randomCompliment);
  }
}
