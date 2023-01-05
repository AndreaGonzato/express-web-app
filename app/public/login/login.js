document.getElementById("button").addEventListener("click", e => {
    e.preventDefault();
    const username = document.getElementById("login").value;
    const password = document.getElementById("password").value;
    const data = {username, password};

    fetch("api/login", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
    })
    .then( d => d.json)
    .then(j => console.log(j));
});