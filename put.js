fetch("http://localhost:3000/todos/1", {
    method: "PUT",
    body: JSON.stringify({
    task: "Put request",
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
    .then((response) => response.json())
    .then((json) => console.log(json));
