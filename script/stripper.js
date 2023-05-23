// Function to read the XML file
const readXMLFile = (file, callback) => {
	const rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("text/xml");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = () => {
		if (rawFile.readyState === 4 && rawFile.status === 200) {
			callback(rawFile.responseText);
		}
	};
	rawFile.send(null);
};

// Function to handle file input change
const handleFileInputChange = (event) => {
	const file = event.target.files[0];
	const reader = new FileReader();

	reader.onload = (e) => {
		const xmlContent = e.target.result;

		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
		const tableData = xmlDoc.getElementsByTagName("book");

		const xmlData = Array.from(tableData).map((book) => {
			const title = book.getElementsByTagName("title")[0].childNodes[0].nodeValue;
			const author = book.getElementsByTagName("author")[0].childNodes[0].nodeValue;
			const year = book.getElementsByTagName("year")[0].childNodes[0].nodeValue;

			return [title, author, year];
		});

		// Populate the table using xmlData
		const tableContainer = document.getElementById("table-container");
		tableContainer.innerHTML = ""; // Clear previous table, if any

		const table = document.createElement("table");

		// Create table header
		const tableHeader = table.createTHead();
		const headerRow = tableHeader.insertRow();
		headerRow.innerHTML = "<th>Title</th><th>Author</th><th>Year</th>";

		// Create table body
		const tableBody = table.createTBody();
		xmlData.forEach((rowData) => {
			const row = tableBody.insertRow();
			rowData.forEach((value) => {
				const cell = row.insertCell();
				cell.innerHTML = value;
			});
		});

		tableContainer.appendChild(table);
	};

	reader.readAsText(file);
};

// Add event listener to the file input
const fileInput = document.getElementById("file-input");
fileInput.addEventListener("change", handleFileInputChange);
