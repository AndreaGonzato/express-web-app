import cookieManager from "@/cookieManager.js";
import config from "@/config.js";

async function whoami() {
  let jwt = cookieManager.getCookie("jwt");

  if (jwt.error === undefined) {
    // Set the Authorization header of the request
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + jwt);
    headers.append("Content-type", "application/json");
    const response = await fetch(config.hostname + "/api/social/whoami", {
      method: "GET",
      headers: headers,
    });

    const userObj = await response.json();
    return userObj;
  } else {
    // no cookie
    return { error: true, message: "no cookie found" };
  }
}

export default {
  whoami,
};
