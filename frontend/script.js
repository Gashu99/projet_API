const url = 'http://localhost:3000/electromenager';

// ...

// Function to sort data by id_ap column
function sortDataById(jsonData) {
  return jsonData.sort((a, b) => a.id_ap - b.id_ap);
}

// ...

// Main function to fetch data, create the table, and handle buttons
async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    console.log(jsonData);

    // Sort the data by id_ap column
    const sortedData = sortDataById(jsonData);

    // Create the table element
    const tableEl = document.getElementById("json-table");
    tableEl.innerHTML = ""; // Clear previous table content

    // Create the table header row
    const headerRow = tableEl.insertRow();
    for (const key in sortedData[0]) {
      const headerCell = headerRow.insertCell();
      headerCell.textContent = key;
    }

    // Create the table body rows
    for (const data of sortedData) {
      const bodyRow = tableEl.insertRow();

      for (const key in data) {
        const bodyCell = bodyRow.insertCell();
        bodyCell.textContent = data[key];
      }

      // ... (existing code for creating Modify and Delete buttons)
    }
  } catch (error) {
    console.error(error);
  }
}

getData();

const addRecordButton = document.getElementById('add-record-form-button')
addRecordButton.addEventListener("mouseover", () => {
  addRecordButton.style.backgroundColor='green'
});
addRecordButton.addEventListener("mouseout", () => {
  addRecordButton.style.backgroundColor='white'
});


// ...


// async function getData() {
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const jsonData = await response.json();
//     console.log(jsonData);

//     // Create the table element
//     const tableEl = document.getElementById("json-table");

//     // Create the table header row
//     const headerRow = tableEl.insertRow();
//     for (const key in jsonData[0]) {
//       const headerCell = headerRow.insertCell();
//       headerCell.textContent = key;
//     }

//     // Create the table body rows
//     for (const data of jsonData) {
//       const bodyRow = tableEl.insertRow();
      
//       for (const key in data) {
//         const bodyCell = bodyRow.insertCell();
//         bodyCell.textContent = data[key];
//       }

//       // Create the Modify button for each row
//       const idValue = data.id_ap;
//       const modifyButtonCell = bodyRow.insertCell();
//       const modifyButton = document.createElement("button");
//       modifyButton.textContent = "Modify";
//       modifyButton.id = `button-${idValue}`;
//       modifyButton.addEventListener("click", () => {
//         // Show the popup when the Modify button is clicked
//         const popupContainer = document.getElementById("popup-container");
//         popupContainer.style.display = "block";

//         // Pre-fill the form fields with existing data
//         const modifyForm = document.getElementById("modify-form");
//         modifyForm.elements["name"].value = data.nom_ap;
//         modifyForm.elements["location"].value = data.emp_ap;
//         modifyForm.elements["price"].value = data.prix_ap;
//         modifyForm.elements["image-url"].value = data.img_ap;

//         // Add an event listener to the form to handle form submission
//         modifyForm.addEventListener("submit", async (event) => {
//           event.preventDefault();

//           const formData = new FormData(modifyForm);
//           const updatedData = {
//             nom_ap: formData.get("name"),
//             emp_ap: formData.get("location"),
//             prix_ap: formData.get("price"),
//             img_ap: formData.get("image-url")
//           };

//           try {
//             await sendPutRequest('electromenager', idValue, updatedData);
//             // Update the table with the new data after successful update
//             await getData();
//           } catch (error) {
//             console.error(error);
//           } finally {
//             // Hide the popup after form submission
//             popupContainer.style.display = "none";
//           }
//         });
//       });
//       modifyButtonCell.appendChild(modifyButton);

//       // Create the Delete button for each row
//       const deleteButtonCell = bodyRow.insertCell();
//       const deleteButton = document.createElement("button");
//       deleteButton.textContent = "Delete";
//       deleteButton.addEventListener("click", () => {
//         // Call the sendDeleteRequest function with the id to delete
//         sendDeleteRequest('electromenager', idValue);
//       });
//       deleteButtonCell.appendChild(deleteButton);
//     }
//   } catch (error) {
//     console.error(error);
//   }
// }

// getData();
async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    console.log(jsonData);

    // Sort the data by id_ap column
    const sortedData = jsonData.sort((a, b) => a.id_ap - b.id_ap);

    // Create the table element
    const tableEl = document.getElementById("json-table");
    tableEl.innerHTML = ""; // Clear previous table content

    // Create the table header row
    const headerRow = tableEl.insertRow();
    for (const key in sortedData[0]) {
      const headerCell = headerRow.insertCell();
      headerCell.style.fontWeight = 'bold';
      headerCell.textContent = key;
    }

    // Create the table body rows
    for (const data of sortedData) {
      const bodyRow = tableEl.insertRow();

      for (const key in data) {
        const bodyCell = bodyRow.insertCell();
        bodyCell.textContent = data[key];
      }

      // Create the Modify button for each row
      const idValue = data.id_ap;
      const modifyButtonCell = bodyRow.insertCell();
      const modifyButton = document.createElement("button");
      modifyButton.textContent = "Modify";
      modifyButton.addEventListener("mouseover", () => {
        modifyButton.style.backgroundColor='orange'
      });
      modifyButton.addEventListener("mouseout", () => {
        modifyButton.style.backgroundColor='white'
      });
      modifyButton.id = `button-${idValue}`;
      modifyButton.addEventListener("click", () => {
        // Show the popup when the Modify button is clicked
        const popupContainer = document.getElementById("popup-container");
        popupContainer.style.display = "block";

        // Pre-fill the form fields with existing data
        const modifyForm = document.getElementById("modify-form");
        modifyForm.elements["name"].value = data.nom_ap;
        modifyForm.elements["location"].value = data.emp_ap;
        modifyForm.elements["price"].value = data.prix_ap;
        modifyForm.elements["image-url"].value = data.img_ap;

        // Add an event listener to the form to handle form submission
        modifyForm.addEventListener("submit", async (event) => {
          event.preventDefault();

          const formData = new FormData(modifyForm);
          const updatedData = {
            nom_ap: formData.get("name"),
            emp_ap: formData.get("location"),
            prix_ap: formData.get("price"),
            img_ap: formData.get("image-url"),
          };

          try {
            await sendPutRequest('electromenager', idValue, updatedData);
            // Update the table with the new data after successful update
            await getData();
          } catch (error) {
            console.error(error);
          } finally {
            // Hide the popup after form submission
            popupContainer.style.display = "none";
          }
        });
      });
      modifyButtonCell.appendChild(modifyButton);

      // Create the Delete button for each row
      const deleteButtonCell = bodyRow.insertCell();
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("mouseover", () => {
        deleteButton.style.backgroundColor='red'
      });
      deleteButton.addEventListener("mouseout", () => {
        deleteButton.style.backgroundColor='white'
      });
      deleteButton.addEventListener("click", () => {
        // Call the sendDeleteRequest function with the id to delete
        sendDeleteRequest('electromenager', idValue);
      });
      deleteButtonCell.appendChild(deleteButton);
    }
  } catch (error) {
    console.error(error);
  }
}

getData();


function createPieChart(data) {

  // Function to create the pie chart
  
  // Code to create the pie chart using D3.js
  // Replace this code with your actual pie chart creation logic
  const pieChartDiv = d3.select("#pieChart");
  pieChartDiv.html(""); // Clear any previous chart content
  pieChartDiv.append("p").text("Pie Chart");
  // Add your pie chart creation logic here
}

// Function to create the bar chart
function createBarChart(data) {
  // Code to create the bar chart using D3.js
  // Replace this code with your actual bar chart creation logic
  const barChartDiv = d3.select("#barChart");
  barChartDiv.html(""); // Clear any previous chart content
  barChartDiv.append("p").text("Bar Chart");
  // Add your bar chart creation logic here
}

// Function to create the line chart
function createLineChart(data) {
  // Code to create the line chart using D3.js
  // Replace this code with your actual line chart creation logic
  const lineChartDiv = d3.select("#lineChart");
  lineChartDiv.html(""); // Clear any previous chart content
  lineChartDiv.append("p").text("Line Chart");
  // Add your line chart creation logic here
}


function sendPostRequest(endpoint, postData) {
    fetch(`http://localhost:3000/${endpoint}`, {
    method: 'POST',
    body: JSON.stringify(postData),
    headers: {
        'Content-Type': 'application/json; charset=UTF-8'
    }
    })
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.error(error));
}


const newRecordForm = document.getElementById("new-record-form");
newRecordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(newRecordForm);
  const newRecordData = {
    nom_ap: formData.get("new-name"),
    emp_ap: formData.get("new-location"),
    prix_ap: formData.get("new-price"),
    img_ap: formData.get("new-image-url")
  };

  try {
    await sendPostRequest('electromenager', newRecordData);
    // Update the table with the new data after successful addition
    await getData();
  } catch (error) {
    console.error(error);
  } finally {
    // Clear the form fields after successful addition
    newRecordForm.reset();
  }
});

function sendPutRequest(endpoint, idToUpdate, updatedData) {
    fetch(`http://localhost:3000/${endpoint}/${idToUpdate}`, {
      method: 'PUT',
      body: JSON.stringify(updatedData),
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error(error));
  }

function sendDeleteRequest(endpoint, id) {
    fetch(`http://localhost:3000/${endpoint}/${id}`, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.error(error));
    }