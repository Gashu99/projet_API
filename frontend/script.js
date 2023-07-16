const url = 'http://localhost:3000/electromenager';



async function getData() {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();
    console.log(jsonData);

    // Create the table element
    const tableEl = document.getElementById("json-table");

    // Create the table header row
    const headerRow = tableEl.insertRow();
    for (const key in jsonData[0]) {
      const headerCell = headerRow.insertCell();
      headerCell.textContent = key;
    }

    // Create the table body rows
    for (const data of jsonData) {
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
            img_ap: formData.get("image-url")
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

const fs = require('fs');

// Function to read data from a JSON file
function readDataFromFileAndPost(endpoint, filePath) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    try {
      const jsonData = JSON.parse(data);
      if (!Array.isArray(jsonData)) {
        throw new Error('Invalid JSON format: Expected an array.');
      }

      // Call sendPostRequest for each item in the JSON array
      jsonData.forEach(item => {
        sendPostRequest(endpoint, item);
      });
    } catch (err) {
      console.error(err);
    }
  });
}
// readDataFromFileAndPost('electromenager', '../data/dataem3.json')



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

// use functions:

// sendPostRequest(endpoint, postData)
// sendPutRequest(endpoint, idToUpdate, updatedData)
// sendDeleteRequest(endpoint, id)