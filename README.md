# Webserver for Industry 4.0 Lego printer

There are two parts in the webserver

1. Frontend: Handle the visualization and interactivity between user and the system
2. Backend: Handle the logic and also the interface with the bluetooth router module

To run the webserver, please follow this steps.

1. Make sure to have the latest `npm` and `node` version installed in the computer. And also mysql server is installed and running.
2. Run `npm install` in both `backend` directory.
3. Restore the database from `db` directory to mysql server.
4. Run the backend by running `node endpoint.js`.
5. In different windows open up `frontend` directory and run `npm install` there and wait until it completes.
6. From the `frontend`, run `npm start` to compile. You can also compile it in production mode so that the codes will be minified, by running `NODE_ENV=production npm start`.
7. It should be running automatically. You can also serve the compiled file from `build` for dev release or `release` for production release for future reference.

The details of authentication for creator of frontend is:
```
username: user
password: user
```
The details of authentication for maintainer is:
```
username: admin
password: admin
```
