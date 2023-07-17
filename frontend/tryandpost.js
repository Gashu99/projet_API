

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
