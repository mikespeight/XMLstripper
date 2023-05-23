// Assuming you have the XML content stored in a variable called xmlContent

// Create a new DOMParser
const parser = new DOMParser();

// Parse the XML content
const xmlDoc = parser.parseFromString(xmlContent, 'text/xml');

// Extract the relevant data from the XML
const entries = xmlDoc.getElementsByTagName('entry');

// Create an empty array to store the extracted data
const data = [];

// Iterate over the entries and extract the desired information
for (let i = 0; i < entries.length; i++) {
	const entry = entries[i];
	const name = entry.getElementsByTagName('name')[0].textContent;
	const date = entry.getElementsByTagName('date')[0].textContent;
	const description = entry.getElementsByTagName('description')[0].textContent;

	// Add the extracted data to the array
	data.push({ name, date, description });
}

// Create the HTML table
const table = document.createElement('table');

// Create the table header
const headerRow = document.createElement('tr');
const headers = ['Name', 'Date', 'Description'];

headers.forEach((headerText) => {
	const headerCell = document.createElement('th');
	headerCell.textContent = headerText;
	headerRow.appendChild(headerCell);
});

table.appendChild(headerRow);

// Create the table rows with the extracted data
data.forEach((entryData) => {
	const row = document.createElement('tr');

	Object.values(entryData).forEach((value) => {
		const cell = document.createElement('td');
		cell.textContent = value;
		row.appendChild(cell);
	});

	table.appendChild(row);
});

// Append the table to a container element in your HTML
const container = document.getElementById('table-container');
container.appendChild(table);
