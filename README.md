![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Mongo](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![VueJS](https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![Bootstarp](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)
![FontAwesome](https://img.shields.io/badge/Font_Awesome-339AF0?style=for-the-badge&logo=fontawesome&logoColor=white)

# express-web-app
This is a Twitter clone web app

# Requirements
- [docker](https://www.docker.com/)
- [docker compose](https://docs.docker.com/compose/install/)
- [npm](https://www.npmjs.com/)

## Optional requirements
- mongo : if you want to load data and query the database
- python: if you want to load the data using a [script](https://github.com/AndreaGonzato/express-web-app/blob/main/app/database/loadData.py)
- pymongo : to run the python script you need pymongo. If you have pip you can in install it with the command: `pip install pymongo`


# How to use
In the directory `/express-web-app/app` create a file named `.env` and define your key to sign JWT tokens like this:

```
TOKEN_SECRET=yourSecretKey
```


## How to start back-end (web server and mongo container)
In the directory `/express-web-app/` run the command:
```
docker compose up
```
if the previous command did not work but you installed the requirements then you are using a old version of docker[[1]](https://stackoverflow.com/a/66516826) compose then run the old command:
```
docker-compose up
```

## How to load some data using the script (Optional)
This section is optional a do it only if you want to load some data.
Run the script `loadData.py` located in `/express-web-app/app/database`
```
cd /express-web-app/app/database
python3 loadData.py
```


## How to start front-end (VueJS)
In the directory `/express-web-app/frontend` run the command:
```
npm run dev
```
