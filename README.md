# ReactWeatherApp

This is a test project created to demonstrate using React.js with Typescript, auth0-js from Auth0, Schwarz CoreUI and Cypress testing.

## Installation

```bash
## install the node_modules
npm install
```
## Set up NPM-Registry
CoreUI is available either via the On-Premise Artifactory [REPO_SCHWARZ](https://repo.schwarz) or via the [Cloud Artifactory](https://schwarzit.jfrog.io).
The Cloud Artifactory is synchronized daily.

The first step is to set the CoreUI NPM registry.
You can find an step-by-step guide here: [Setting up the Artifactory](https://confluence.schwarz/display/LCU/Setting+up+the+Artifactory)
As an example I will provide my `.npmrc` file where you need to put your own credentials.
```bash
//.npmrc
@scu:registry=https://schwarzit.jfrog.io/artifactory/api/npm/npm/
//schwarzit.jfrog.io/artifactory/api/npm/npm/:_password=YOUR_PASSWORD
//schwarzit.jfrog.io/artifactory/api/npm/npm/:username=YOUR_EMAIL
//schwarzit.jfrog.io/artifactory/api/npm/npm/:always-auth=true

```

## Create a Free Auth0 Account
Go to Auth0 and sign in, then create a new application by clicking on `CREATE APPLICATION`. After this you should follow the first step of the `Quickstart` to `Configure Auth0`
Then you are ready to create `auth_config.json` and paste there your own credentials.
```tsx
//  src/auth_variables.tsx
export const AUTH_CONFIG = {
  domain: 'YOUR_DOMAIN',
  clientId: 'YOUR_CLIENT_ID',
  callbackUrl: 'YOUR_CALLBACK_URL',
  redirect_url: 'YOUR_REDIRECT_URL'
};
```

## Create a Test User in Auth0 for testing purposes
Go to Auth0 dashboard and click on `User Management`, then go to `Users`, then create a new user by clicking on `CREATE USER`. On the dialog shown by Auth0, fill the form as follows:
1. **Email:** Enter a random email address (e.g., e2e-testing@mydomain.com)
2. **Password:** Enter a random password (e.g., s#m3R4nd0m-pass)
3. **Repeat Password:** Enter the same password.
4. **Connection:** Use the Username-Password-Authentication

After that, click on Save to finish the process.

Lastly, you will have to go to your tenant's settings and set `Username-Password-Authentication` as the value of the Default Directory property. As mentioned in this page, this field defines the "name of the connection to be used for Password Grant exchanges". In this case, the `Username-Password-Authentication` value comes from the default the default Database Connections that Auth0 adds to all new tenants.
Then you are ready to create `cypress_env.json` and paste there your own credentials.
```metadata json
//cypress_env.json
{
  "auth_url": "https://your-domain/oauth/token",
  "auth_client_id": "YOUR_CLIENT_ID",
  "auth_client_secret": "YOUR_CLIENT_SECRET",
  "auth_username": "YOUR_USERNAME",
  "auth_password": "YOUR_PASSWORD"
}
```

## Development server

Before starting the frontend server you need to get the backend microservices running. This will be needed for fetching and adding data related to our country and city lists. Go and clone [temperature_ms](https://github.com/dirien/temperature-ms). Then open it locally and in the both directories `city-api` and `country-api` run the command `go run .`

Now you are ready to start the project and benefit from its resources.
Run `npm run start` for a dev server. Navigate to `http://localhost:3000/`. 

## Running end-to-end tests with Cypress
Please be sure that the server is running when you will use one of the following commands.
Run `npm run cy:chrome`, `npm run cy:open`or `npm run cy:run`,` to execute the end-to-end tests via Cypress

## Contributing
If you have something to add or idea for improvements feel free to make pull requests. I'm always happy to hear your feedback!


## License
[apache-2.0](https://choosealicense.com/licenses/apache-2.0/)
