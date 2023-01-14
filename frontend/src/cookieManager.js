function getCookie(name) {
  // Split the cookies string and get all individual name=value pairs in an array
  var cookieArr = document.cookie.split(";");

  // Loop through the array and find the named cookie
  for (var i = 0; i < cookieArr.length; i++) {
    var cookiePair = cookieArr[i].split("=");

    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }

  console.log("no cookie for this site");
  // If the named cookie does not exist, return null
  return null;
}

function setJwtCookie(token) {
  var expires = new Date();
  // Set the expiration date to two hour from now
  expires.setTime(expires.getTime() + 2 * 60 * 60 * 1000);

  // TODO add the httponly mode
  // Set the JWT
  document.cookie = "jwt=" + token + ";expires=" + expires.toUTCString(); //";httponly";
}

function removeJwtCookie() {
  var expires = new Date();
  // Set the expiration date to 1 min from now
  expires.setTime(expires.getTime() + 1 * 60 * 1000);

  // Set a wrong JWT token
  document.cookie =
    "jwt=" + "wrongTokenSaving" + ";expires=" + expires.toUTCString();
}

export default {
  getCookie: getCookie,
  setJwtCookie,
  removeJwtCookie,
};
