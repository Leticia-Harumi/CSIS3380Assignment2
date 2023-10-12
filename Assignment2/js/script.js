// Define a constant for the number of items per page.
const ITEMS_PER_PAGE = 10;

// Get the list of all contacts and necessary HTML elements.
const allContacts = users;
const contactListContainer = document.querySelector(".contact-list");
const pageNumbers = document.getElementById("page-numbers");
const numPages = Math.ceil(allContacts.length / ITEMS_PER_PAGE);
const totalContacts = document.querySelector("h3");

// This function initializes the contact list and pagination.
function initialize() {
    // Display the total number of contacts.
    totalContacts.innerHTML = `Total: ${allContacts.length}`;

    // Create a list item for each contact.
    for (let i = 0; i < allContacts.length; i++) {
        const contactItem = document.createElement('li');
        contactItem.classList.add("contact-item");
        contactItem.classList.add("cf");

        // Extract the registration date for the contact.
        const formatDate = () => {
            const dateObj = new Date(allContacts[i].registered.date);
            return `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`;
        };

        // Populate the contact item with details and the registration date.
        contactItem.innerHTML = `<div class="contact-details">
            <img class="avatar" src="${allContacts[i].picture.thumbnail}">
            <h3>${allContacts[i].name.first} ${allContacts[i].name.last}</h3>
            <span class="email">${allContacts[i].email}</span>
        </div>
        <div class="joined-details">
            <span class="date">Joined ${formatDate()}</span>
        </div>`;


        // Add the contact item to the contact list.
        contactListContainer.appendChild(contactItem);
    }

    // Create page numbers for pagination.
    for (let i = 0; i < numPages; i++) {
        const pageNumberItem = document.createElement('li');
        pageNumberItem.classList.add('pagination')

        // Set the first page as active.
        if (i === 0) {
            pageNumberItem.innerHTML = `<a class="active page-number pagination" href="#" onclick="loadPage(${i + 1})">${i + 1}</a>`;
        } else {
            pageNumberItem.innerHTML = `<a class="page-number pagination" href="#" onclick="loadPage(${i + 1})">${i + 1}</a>`;
        }

        // Add the page number item to the pagination section.
        pageNumbers.appendChild(pageNumberItem);
    }

    // Start by loading the first page.
    loadPage(1);
}

// Function to display contacts for a given page.
function displayContacts(startIndex, endIndex) {
    const contactItems = contactListContainer.getElementsByTagName('li');
    for (let i = 0; i < allContacts.length; i++) {
        if (i >= startIndex && i < endIndex) {
            contactItems[i].style.display = "block";
        } else {
            contactItems[i].style.display = "none";
        }
    }
}

// Function to switch to a specific page.
function loadPage(pageNumber) {
    // Find and update the active page number.
    const prevPageItem = document.querySelector('.active');
    prevPageItem.classList.remove('active');

    const currPageItem = document.querySelectorAll('.page-number')[pageNumber - 1];
    currPageItem.classList.add('active');

    // Calculate the range of contacts to display.
    const startIndex = (pageNumber - 1) * ITEMS_PER_PAGE;
    const endIndex = Math.min(pageNumber * ITEMS_PER_PAGE, allContacts.length);

    // Display the contacts for the selected page.
    displayContacts(startIndex, endIndex);
}

// Initialize the contact list and pagination.
initialize();
