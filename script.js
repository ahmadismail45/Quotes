document.addEventListener('DOMContentLoaded', () => {
    const quoteListElement = document.getElementById('quoteList');
    const filterInputElement = document.getElementById('filterInput');
    const errorMessageElement = document.getElementById('errorMessage');
    const apiUrl = 'https://dummyjson.com/quotes';

    let allQuotes = []; // To store all fetched quotes

    // Function to display quotes in the list
    const displayQuotes = (quotes) => {
        quoteListElement.innerHTML = ''; // Clear current list
        errorMessageElement.style.display = 'none'; // Hide any previous error

        if (quotes.length === 0) {
            const li = document.createElement('li');
            li.textContent = 'No quotes match your filter.';
            quoteListElement.appendChild(li);
            return;
        }

        quotes.forEach(quoteData => {
            const li = document.createElement('li');
            // Display quote text and author
            li.innerHTML = `"${quoteData.quote}" <strong>- ${quoteData.author}</strong>`;
            quoteListElement.appendChild(li);
        });
    };

    // Function to fetch quotes from the API
    const fetchQuotes = async () => {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                // If response status is not OK (e.g., 404, 500)
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();

            if (data && data.quotes) {
                allQuotes = data.quotes; // Store all quotes
                displayQuotes(allQuotes); // Display all quotes initially
            } else {
                // Handle case where API structure might be unexpected
                throw new Error('Invalid data format received from API.');
            }

        } catch (error) {
            console.error('Error fetching quotes:', error);
            // Display error message to the user
            errorMessageElement.textContent = `Failed to load quotes: ${error.message}. Please try refreshing the page.`;
            errorMessageElement.style.display = 'block'; // Show the error message element
            quoteListElement.innerHTML = ''; // Clear the loading message or any previous list
        }
    };

    // Function to filter quotes based on input
    const filterQuotes = () => {
        const filterText = filterInputElement.value.toLowerCase().trim();

        if (!filterText) {
            // If filter is empty, show all quotes
            displayQuotes(allQuotes);
            return;
        }

        const filteredQuotes = allQuotes.filter(quoteData =>
            quoteData.quote.toLowerCase().includes(filterText)
        );

        displayQuotes(filteredQuotes);
    };

    // Add event listener to the input field
    filterInputElement.addEventListener('input', filterQuotes);

    // Initial fetch of quotes when the page loads
    fetchQuotes();
});