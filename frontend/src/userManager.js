import cookieManager from "@/cookieManager.js";
import config from "@/config.js";

async function whoami() {
  var jwt = cookieManager.getCookie("jwt");

  if (jwt.error === undefined) {
    // Set the Authorization header of the request
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + jwt);
    headers.append("Content-type", "application/json");
    const resultJSON = await fetch(config.hostname + "/api/social/whoami", {
      method: "GET",
      headers: headers,
    });

    const objUser = await resultJSON.json();
    return objUser;
  } else {
    // no cookie
    return { error: true, message: "no cookie found" };
  }
}

export default {
  whoami,
};
