// Assuming you have an XML file named "data.xml" in the same directory as the HTML file

// Function to read the XML file
function readXMLFile(file, callback) {
	var rawFile = new XMLHttpRequest();
	rawFile.overrideMimeType("text/xml");
	rawFile.open("GET", file, true);
	rawFile.onreadystatechange = function () {
		if (rawFile.readyState === 4 && rawFile.status == "200") {
			callback(rawFile.responseText);
		}
	};
	rawFile.send(null);
}

// Read the XML file and populate the xmlContent variable
readXMLFile("data.xml", function (xmlString) {
	var parser = new DOMParser();
	var xmlDoc = parser.parseFromString(xmlString, "text/xml");
	var tableData = xmlDoc.getElementsByTagName("book");

	var xmlContent = [];
	for (var i = 0; i < tableData.length; i++) {
		var book = tableData[i];
		var title = book.getElementsByTagName("title")[0].childNodes[0].nodeValue;
		var author = book.getElementsByTagName("author")[0].childNodes[0].nodeValue;
		var year = book.getElementsByTagName("year")[0].childNodes[0].nodeValue;

		xmlContent.push([title, author, year]);
	}

	// Populate the table using xmlContent
	var tableContainer = document.getElementById("table-container");
	var table = document.createElement("table");

	// Create table header
	var tableHeader = table.createTHead();
	var headerRow = tableHeader.insertRow();
	headerRow.innerHTML = "<th>Title</th><th>Author</th><th>Year</th>";

	// Create table body
	var tableBody = table.createTBody();
	for (var j = 0; j < xmlContent.length; j++) {
		var rowData = xmlContent[j];
		var row = tableBody.insertRow();
		for (var k = 0; k < rowData.length; k++) {
			var cell = row.insertCell();
			cell.innerHTML = rowData[k];
		}
	}

	tableContainer.appendChild(table);
});
