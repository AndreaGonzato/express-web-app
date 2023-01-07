document.getElementById("button").addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("emailID").value;
    
    const password = document.getElementById("passID").value;

    const data = {email, password};

    const token = await fetch("/api/login", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
    });

    // TODO resolve here
    // set token in cookie
    document.cookie = `token=${token}`

    console.log("token", token);

});