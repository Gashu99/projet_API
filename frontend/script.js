const url = 'http://localhost:3000/';

// Function to sort data by id_ap column
function sortDataById(jsonData, endpoint) {
  return jsonData.sort((a, b) => a[fieldNamesMap[endpoint].id] - b[fieldNamesMap[endpoint].id]);
}



// Define the field name mapping for each endpoint
const fieldNamesMap = {
  electronique: {
    id:'id_e',
    name: 'nom',
    location: 'prix',
    price: 'image',
    imageUrl: 'image_url' // Example: If 'image' is the field name in the API response, and 'image_url' is the field name in the form
  },
  electromenager: {
    id:'id_ap',
    name: 'nom_ap',
    location: 'emp_ap',
    price: 'prix_ap',
    imageUrl: 'img_ap' // Example: If 'img_ap' is the field name in the API response, and 'image' is the field name in the form
  },
  luminaire: {
    id:'id_l',
    name: 'nom_l',
    location: 'description',
    price: 'prix_l',
    imageUrl: 'image' // Example: If 'image' is the field name in the API response, and 'image' is the field name in the form
  }
};

async function getData(endpoint) {
  try {
    const response = await fetch(url + endpoint);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const jsonData = await response.json();

    // Sort the data by id_ap column
    const sortedData = jsonData.sort((a, b) => a[fieldNamesMap[endpoint].id] - b[fieldNamesMap[endpoint].id]);

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
      const idValue = data[fieldNamesMap[endpoint].id];
      const modifyButtonCell = bodyRow.insertCell();
      const modifyButton = document.createElement("button");
      modifyButton.textContent = "Modify";
      modifyButton.addEventListener("mouseover", () => {
        modifyButton.style.backgroundColor = 'orange'
      });
      modifyButton.addEventListener("mouseout", () => {
        modifyButton.style.backgroundColor = 'white'
      });
      modifyButton.id = `button-${idValue}`;
      modifyButton.addEventListener("click", () => {
        // Show the popup when the Modify button is clicked
        const popupContainer = document.getElementById("popup-container");
        popupContainer.style.display = "block";
        popupContainer.style.backgroundColor = '#308cba';

        // Pre-fill the form fields with existing data
        const modifyForm = document.getElementById("modify-form");
        modifyForm.innerHTML = ""; // Clear previous form content

        for (const key in data) {
          const label = document.createElement("label");
          label.for = `new-${key}`;
          label.textContent = key.charAt(0).toUpperCase() + key.slice(1) + ":";

          const input = document.createElement("input");
          input.type = "text";
          input.id = `new-${key}`;
          input.name = `new-${key}`;
          input.value = data[key];
          input.required = true;

          modifyForm.appendChild(label);
          modifyForm.appendChild(input);
        }
        const saveButton = document.createElement("button");
        saveButton.type = 'submit';
        saveButton.innerText = 'Save';
        modifyForm.appendChild(saveButton);
        // Add an event listener to the form to handle form submission
        modifyForm.addEventListener("submit", async (event) => {
          event.preventDefault();

          const formData = new FormData(modifyForm);
          const updatedData = {};
          for (const key of formData.keys()) {
            updatedData[key.replace("new-", "")] = formData.get(key);
          }

          try {
            await sendPutRequest(endpoint, idValue, updatedData);
            // Update the table with the new data after successful update
            await getData(endpoint);
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
        deleteButton.style.backgroundColor = 'red'
      });
      deleteButton.addEventListener("mouseout", () => {
        deleteButton.style.backgroundColor = 'white'
      });
      deleteButton.addEventListener("click", () => {
        // Call the sendDeleteRequest function with the id to delete
        sendDeleteRequest(endpoint, idValue);
      });
      deleteButtonCell.appendChild(deleteButton);
    }
  } catch (error) {
    console.error(error);
  }
  createDynamicForm(endpoint)
}

getData('electromenager')


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


// Function to create the form elements dynamically for the given endpoint
function createDynamicForm(endpoint) {
  const dynamicForm = document.getElementById("dynamic-form");
  dynamicForm.innerHTML = ""; // Clear previous form content

  const form = document.createElement("form");
  form.id = "new-record-form";
  dynamicForm.appendChild(form);

  for (const fieldName in fieldNamesMap[endpoint]) {
    const label = document.createElement("label");
    label.for = `new-${fieldName}`;
    label.textContent = fieldName.charAt(0).toUpperCase() + fieldName.slice(1) + ":";

    const input = document.createElement("input");
    input.type = "text";
    input.id = `new-${fieldName}`;
    input.name = `new-${fieldName}`;
    input.required = true;

    form.appendChild(label);
    form.appendChild(input);
  }

  const addButton = document.createElement("button");
  addButton.id = "add-record-form-button";
  addButton.type = "submit";
  addButton.textContent = "Add Record";
  form.appendChild(addButton);
}

// Update the event listener for the newRecordForm to display the correct form for each endpoint
const newRecordForm = document.getElementById("new-record-form");
newRecordForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(newRecordForm);

  // Determine the endpoint based on the form ID
  const endpoint = newRecordForm.id.replace("-form", "");

  // Map form fields to the corresponding keys for the endpoint
  const newRecordData = {};

  for (const fieldName in fieldNamesMap[endpoint]) {
    const formField = `new-${fieldName}`;
    const endpointField = fieldNamesMap[endpoint][fieldName];
    newRecordData[endpointField] = formData.get(formField);
  }

  try {
    await sendPostRequest(endpoint, newRecordData);
    // Update the table with the new data after successful addition
    await getData(endpoint);
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
      .catch((error) => console.error(error)).finally(() => {
        // Fetch updated data after the DELETE request is completed
        getData(endpoint)
      });
  }


function sendDeleteRequest(endpoint, id) {
  // Show the confirmation dialog
  const isConfirmed = window.confirm("Are you sure you want to delete this item?");

  if (isConfirmed) {
    // Proceed with the delete request if confirmed
    fetch(`${url}${endpoint}/${id}`, {
      method: 'DELETE'
    })
      .then((response) => response.json())
      .then((json) => console.log(json))
      .catch((error) => console.error(error))
      .finally(() => {
        // Fetch updated data after the DELETE request is completed
      getData(endpoint)
      });
  } else {
    // Cancel the delete request if not confirmed
    console.log("Delete request canceled.");
  }
}
