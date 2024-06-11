# Meter Reading App

This repo contains the back end and front end for a meter reading app.

To run the back end:

`cd meter-reading-app-be`

`npm i`

`npm start`

To run the front end:

`cd meter-reading-app`

`npm i`

`npm run dev`

Note: The login form is currently set up to submit successfully without the need to provide credentials. To change this, (un)comment the relevant lines in `submitHandler` in `src/screens/login/LoginForm`:

```js
    // Comment out to test the form without hardcoded values
    const credentials = {
      username: 'joebloggs',
      password: 'test123!',
    }

    // Comment out to test the form with hardcoded values
    // const credentials = {
    //   username,
    //   password,
    // }
```