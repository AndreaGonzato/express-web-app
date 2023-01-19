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

  // return an error if no cookie found
  return {message: "no cookie for this site", error : true};
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
  // Set the expiration date very shot
  expires.setTime(expires.getTime() +  100);

  // Set a wrong JWT token
  document.cookie =
    "jwt=" + "SavingWrongToken" + ";expires=" + expires.toUTCString();
}

export default {
  getCookie: getCookie,
  setJwtCookie,
  removeJwtCookie,
};
