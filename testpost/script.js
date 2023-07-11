// good requests for electronique

// function sendPostRequest() {
//     const postData = {
//         nom: 'test',                        // has to come from a html form ,
//         prix: '1123456 FCFA',
//         image: 'pdhivhauehrpihahrahiuh'
//     };

//     fetch('http://localhost:3000/electronique', {
//         method: 'POST',
//         body: JSON.stringify(postData),
//         headers: {
//         'Content-Type': 'application/json; charset=UTF-8'
//         }
//     })
//         .then((response) => response.json())
//         .then((json) => console.log(json))
//         .catch((error) => console.error(error));
//     }    
    
// // function updateField() {
// //     const idToUpdate = '1'; // Replace with the actual ID of the item to update

// //     const updatedData = {
// //     nom: 'updated name',       // has to come from a html form ,
// //     prix: 'updated price',
// //     image: 'updated image'
// //     };

// //     fetch(`http://localhost:3000/electronique/${id}`, {
// //         method: 'PUT',
// //         body: JSON.stringify(updatedData),
// //         headers: {
// //             'Content-Type': 'application/json; charset=UTF-8'
// //         }
// //     })
// //     .then((response) => response.json())
// //     .then((json) => console.log(json))
// //     .catch((error) => console.error(error));
// // }

// function updateField() {
//     const idToUpdate = '1'; // Replace with the actual ID of the item to update

//     // Retrieve the updated values from the HTML form
//     const updatedData = {
//         nom: "test",
//         prix: "test",
//         image: "test"
//     };

//     fetch(`http://localhost:3000/electronique/${idToUpdate}`, {
//         method: 'PUT',
//         body: JSON.stringify(updatedData),
//         headers: {
//         'Content-Type': 'application/json; charset=UTF-8'
//         }
//     })
//         .then((response) => response.json())
//         .then((json) => console.log(json))
//         .catch((error) => console.error(error));
//     }
    

// function deleteRecord(id) {
//     fetch(`http://localhost:3000/electronique/${id}`, {
//         method: 'DELETE'
//     })
//         .then((response) => response.json())
//         .then((json) => console.log(json))
//         .catch((error) => console.error(error));
//     }
    



// from chat

// functionnal post function for electronique data: 
// function sendPostRequest(endpoint) {
//     const postData = {
//         nom: 'test',
//         prix: '1123456 FCFA',
//         image: 'pdhivhauehrpihahrahiuh'
//     };

//     fetch(`http://localhost:3000/${endpoint}`, {
//         method: 'POST',
//         body: JSON.stringify(postData),
//         headers: {
//         'Content-Type': 'application/json; charset=UTF-8'
//         }
//     })
//         .then((response) => response.json())
//         .then((json) => console.log(json))
//         .catch((error) => console.error(error));
//     }

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


const electroniqueData = {
    nom: 'lasttry23test',
    prix: 'lasttry231123456 FCFA',
    image: 'lasttry23pdhivhauehrpihahrahiuh'
  };
  
  const electromenagerData = {
    nom_ap: 'lasttry23test',
    emplacement: 'lasttry23Some location',
    prix_ap: 'lasttry23123456 FCFA',
    img_ap: 'lasttry23image_url'
  };
  
  const luminaireData = {
    nom_l: 'lasttry23test',
    prix_l: 'lasttry23789012 FCFA',
    description: 'lasttry23Some description',
    image: 'lasttry23image_url'
  };
  
//   sendPostRequest('electronique', electroniqueData);
//   sendPostRequest('electromenager', electromenagerData);
//   sendPostRequest('luminaire', luminaireData);
  



// function updateField(endpoint, idToUpdate) {
//     const updatedData = {
//         nom: 'test',
//         prix: 'test',
//         image: 'test'
//     };

//     fetch(`http://localhost:3000/${endpoint}/${idToUpdate}`, {
//         method: 'PUT',
//         body: JSON.stringify(updatedData),
//         headers: {
//         'Content-Type': 'application/json; charset=UTF-8'
//         }
//     })
//         .then((response) => response.json())
//         .then((json) => console.log(json))
//         .catch((error) => console.error(error));
//     }

function updateField(endpoint, idToUpdate, updatedData) {
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
  


function deleteRecord(endpoint, id) {
    fetch(`http://localhost:3000/${endpoint}/${id}`, {
        method: 'DELETE'
    })
        .then((response) => response.json())
        .then((json) => console.log(json))
        .catch((error) => console.error(error));
    }


// requests from js console:

// sendPostRequest("electromenager", electromenagerData)
// sendPostRequest("luminaire", luminaireData)
// updateField("luminaire", 1, luminaireData)
// deleteRecord("luminaire", 2)