
document.getElementById("button").addEventListener("click", async (e) => {
    e.preventDefault();
    const email = document.getElementById("emailID").value;
    
    const password = document.getElementById("passID").value;

    const data = {email, password};

    const token = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify(data)
    });

    const objToken = await token.json();
    console.log("token: ", objToken);

    // Save the JWT token in local storage
    localStorage.setItem('jwtToken', objToken.token);

    //setJwtCookie(objToken.token);

    // TODO resolve here
    // set token in cookie
    //document.cookie = `token=${token}`

    //console.log("token", token);

});


const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");

btn1.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicked btn1");

    const result = await fetch("/api/social/users/1")
        .then((response) => response.json())
        .then((json) => console.log(json));
});

btn2.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("clicked btn2");

    // Get the JWT token from local storage
    const jwtToken = localStorage.getItem('jwtToken');

    console.log("jwtToken: ", jwtToken)
    

    // Use the JWT token in an HTTP header
    const result = await fetch('/api/protected', {
        method: "GET",
        headers: {
            Authorization: `Bearer ${jwtToken}`
        }
    });


    const objResult = await result.json();
    console.log(objResult);


});

/*
function getCookie(name) {
    // Split the cookies string and get all individual name=value pairs in an array
    var cookieArr = document.cookie.split(";");
  
    // Loop through the array and find the named cookie
    for(var i = 0; i < cookieArr.length; i++) {
      var cookiePair = cookieArr[i].split("=");
  
      if(name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }
  
    // If the named cookie does not exist, return null
    return null;
}




function setJwtCookie(token) {
    // Set the expiration date to one hour from now
    var expires = new Date();
    expires.setTime(expires.getTime() + (1 * 60 * 60 * 1000));
  
    // Set the JWT as a cookie
    document.cookie = "jwt=" + token + ";expires=" + expires.toUTCString();
  }

  */