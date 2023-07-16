const fs = require('fs');

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
// Function to read data from a JSON file and post it through the API
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
        // Adapt the field names to match the keys in the electromenagerData object
        const postData = {
          nom: item.title,
          emp_ap: item.location,
          prix_ap: item.price,
          img_ap: item.image
        };

        // Call the sendPostRequest function with the adapted data
        sendPostRequest(endpoint, postData);
      });
    } catch (err) {
      console.error(err);
    }
  });
}

readDataFromFileAndPost('electromenager','dataem3.json')
