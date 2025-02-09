async function fetchGeminiResponse() {
    try {
        const books = document.getElementById("geminiInput").value;
        const promptx = `Return a structured JSON response containing information about ${books} highly engaging 
        and easy-to-read adventure books suitable for readers aged 14 to 21. The JSON should include ${books} entries 
        labeled as book1, book2, book3, and book4. Each book entry should contain the following attributes:  name: 
        The title of the book. page_number: The total number of pages in the book to indicate its length. genre: 
        The literary genre, ensuring it falls within adventure and related subgenres such as survival, exploration, 
        or historical fiction. year_release: The year the book was originally published. description: keep it one sentence. Ensure that the selected books 
        are not overly complex in language or structure, making them accessible to a broad audience without requiring 
        advanced reading comprehension. Avoid books with dark or intense themes, meaning no thrillers, mysteries, or horror 
        elements. The books should focus on positive, exciting, or inspiring adventure narratives rather than grim or unsettling 
        stories.  The output should strictly contain only the JSON response with the requested information, without any additional`
        const response = await fetch("http://localhost:3000/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ prompt: promptx })
        });

        const data = await response.json();
        const newStr1 = data.response;
        const newStr2 = newStr1.slice(8, -4);
        const json = JSON.parse(newStr2);
        const counter = 0;
        const table = document.getElementById("geminiTable");
  
  // Create the table structure
        const tbody = document.createElement('tbody');
        const rows = books; // Number of rows (for example)
        const cols = 5; // Number of columns (for example)
        // Create table rows and columns
        for (let i = 1; i <= rows; i++) {
            const tr = document.createElement('tr');
            let counter = 0;
            console.log(i);
            
        for (let j = 0; j < cols; j++) {
            const td = document.createElement('td');
            if (counter == 0) {
                td.textContent = json["book" + i].name;
                counter += 1
            }
            else if (counter == 1) {
                td.textContent = json["book" + i].page_number;
                counter += 1
            }
            else if (counter == 2) {
                td.textContent = json["book" + i].genre;
                counter += 1
            }
            else if (counter == 3) {
                td.textContent = json["book" + i].year_release;
                counter += 1
            }
            else{
                td.textContent = json["book" + i].description;
                counter += 1
            }
      tr.appendChild(td);
    }

    tbody.appendChild(tr);
  }

  // Append tbody to the table
  table.appendChild(tbody);
  document.getElementById("geminiResponse").textContent = data.response;
}

// Example usage
    catch (error) {
        console.error("Error fetching response:", error);
        document.getElementById("geminiResponse").textContent = "Error fetching response.";
    }
}