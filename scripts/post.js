fetch("http://localhost:3000/todos", {
    method: "POST",
    body: JSON.stringify({
    task: "Create put",
    }),
    headers: {
        "Content-type": "application/json; charset=UTF-8"
    }
})
    .then((response) => response.json())
    .then((json) => console.log(json));
