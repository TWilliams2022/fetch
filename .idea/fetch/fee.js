let activeLetterButton = null;
const rainbowColors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#8B00FF'];
let colorIndex = 0;

// Fetch breeds from Dog API
fetch('https://dog.ceo/api/breeds/list/all')
    .then(response => response.json())
    .then(data => {
        const breedSelection = document.getElementById('breed-selection');
        const breeds = data.message;

        // Create an array of letters A-Z
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const letterNavigation = document.getElementById('letter-navigation');

        alphabet.forEach(letter => {
            const letterButton = document.createElement('button');
            letterButton.textContent = letter;
            letterButton.addEventListener('click', () => {
                filterBreedsByLetter(letter);
                setActiveLetterButton(letterButton);
                changeButtonColor(letterButton);
            });
            letterNavigation.appendChild(letterButton);
        });

        // Function to filter breeds by selected letter
        function filterBreedsByLetter(letter) {
            breedSelection.innerHTML = ''; // Clear existing breed selection
            for (const breed in breeds) {
                if (breed[0].toUpperCase() === letter) {
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.id = breed;
                    checkbox.value = breed;

                    const label = document.createElement('label');
                    label.htmlFor = breed;
                    label.textContent = breed;

                    breedSelection.appendChild(checkbox);
                    breedSelection.appendChild(label);
                }
            }
        }

        // Function to set the active letter button
        function setActiveLetterButton(button) {
            if (activeLetterButton) {
                activeLetterButton.classList.remove('active-letter');
                resetButtonColor(activeLetterButton);
            }
            activeLetterButton = button;
            activeLetterButton.classList.add('active-letter');
        }

        // Function to change button color to the next color in the rainbow
        function changeButtonColor(button) {
            button.style.backgroundColor = rainbowColors[colorIndex];
            colorIndex = (colorIndex + 1) % rainbowColors.length;
        }

        // Function to reset button color to original
        function resetButtonColor(button) {
            button.style.backgroundColor = '';
        }

        // Event listener to display images when a breed is selected
        breedSelection.addEventListener('change', (event) => {
            if (event.target.checked) {
                displayImages(event.target.value);
            } else {
                removeImages(event.target.value);
            }
        });
    });

// Function to display images of a selected breed
function displayImages(breed) {
    fetch(`https://dog.ceo/api/breed/${breed}/images/random/5`)
        .then(response => response.json())
        .then(data => {
            const gallery = document.getElementById('gallery');

            data.message.forEach(imageURL => {
                const img = document.createElement('img');
                img.src = imageURL;
                img.alt = breed;
                gallery.appendChild(img);
            });
        });
}

// Function to remove images of a deselected breed
function removeImages(breed) {
    const gallery = document.getElementById('gallery');
    const images = gallery.getElementsByTagName('img');

    for (let i = images.length - 1; i >= 0; i--) {
        if (images[i].alt === breed) {
            gallery.removeChild(images[i]);
        }
    }
}