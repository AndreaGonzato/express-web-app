import cookieManager from "@/cookieManager.js";
import config from "@/config.js";

async function whoami(){
    var jwt = cookieManager.getCookie("jwt");

    // Set the Authorization header of the request
    var headers = new Headers();
    headers.append("Authorization", "Bearer " + jwt);
    headers.append("Content-type", "application/json");
    const resultJSON = await fetch(config.hostname + "/api/social/whoami", {
      method: "GET",
      headers: headers,
    });

    const objUser = await resultJSON.json();
    return {id: objUser.id, username: objUser.username, email: objUser.email};
};


export default {
    whoami,
}