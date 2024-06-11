// Fetch breeds from Dog API
fetch('https://dog.ceo/api/breeds/list/all')
   .then(response => response.json())
   .then(data => {
        const breedSelection = document.getElementById('breed-selection');
        const breeds = data.message;

        // Create a checkbox for each breed
        for (const breed in breeds) {
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

        // Add event listener to display images when a breed is selected
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
                gallery.appendChild(img);
            });
        });
}

// Function to remove images of a deselected breed
function removeImages(breed) {
    const gallery = document.getElementById('gallery');
    const images = gallery.getElementsByTagName('img');

    for (let i = images.length - 1; i >= 0; i--) {
        if (images[i].src.includes(breed)) {
            gallery.removeChild(images[i]);
        }
    }
}