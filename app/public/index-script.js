/*
async function getData(){
    const data = await fetch("/api/books");
    const dataJson = await data.json();
    const table = document.querySelector("tbody");
    table.innerHTML = "";
    dataJson.forEach(e => {
        const tr = document.createElement("tr");
        const tdTittle = document.createElement("td");
        const tdID = document.createElement("td");
        tdTittle.innerHTML = e["title"];
        tdID.innerHTML = e["id"];
        tr.appendChild(tdID);
        tr.appendChild(tdTittle);
        table.appendChild(tr);
    });
}

getData();


async function addBook(event){
    event.preventDefault();
    const title = document.getElementById("title").value;
    await fetch("/api/books", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({"title" :title})
    });
    getData();
}


document.getElementById("addBookButton").addEventListener("click", addBook);


document.getElementById("deleteBooksButton").addEventListener("click", deleteBooks);

async function deleteBooks(event){
    event.preventDefault();
    await fetch("/api/books", {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
    });
    getData();
}
*/