import auth0, {Auth0DecodedHash, Auth0Error, Auth0UserProfile} from "auth0-js";
import {AUTH_CONFIG} from "../auth0-variables";

class Auth {
  tokenRenewalTimeout: any;
  userProfile: any;
  cb!: (error: any, result?: any) => void;
  handleAuthRoute: any;
  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: `${AUTH_CONFIG.redirect_url}/callback`,
    responseType: "token id_token",
    scope: "openid profile email"
  });

  login() {
    try {
      this.auth0.authorize();
    } catch (e) {
      throw new Error("Not authorized!");
    }

  }

  handleAuthentication() {
    this.auth0.parseHash((
      err: null | (Auth0Error & { state?: string }),
      authResult: Auth0DecodedHash | null) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);

        window.location.href = "/home";
      } else if (err) {

        window.console.error(`Error: ${err.error}. Check the console for further details.`);
      }
    });
  }

  setSession(authResult: auth0.Auth0DecodedHash) {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      (authResult.expiresIn * 1000) + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    // schedule a token renewal
    this.scheduleRenewal();

    // navigate to the home route
    window.location.href = "/home";
  }

  getAccessToken() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No access token found");
    }
    return accessToken;
  }

  getProfile = (cb: (err?: any, result?: any) => void) => {
    const accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err: null | Auth0Error, profile: Auth0UserProfile) => {
      if (profile) {
        this.userProfile = profile;
      }
      cb(err, profile);
    });
  };

  logout() {
    // Clear access token and ID token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    localStorage.removeItem("scopes");

    clearTimeout(this.tokenRenewalTimeout);
    // logout use form the auth0
    window.location.href =
      `https://${AUTH_CONFIG.domain}/v2/logout?returnTo=${AUTH_CONFIG.redirect_url}
        /&client_id=${AUTH_CONFIG.clientId}`;
    window.location.href = "/";

  }

  isAuthenticated() {
    const time = localStorage.getItem("expires_at") || "";
    const now = new Date().getTime()
    const expiresAt = time.length > 0 ? JSON.parse(time) : now;

    return now < expiresAt;
  }

  renewToken() {
    this.auth0.checkSession({},
      (err: any, result: any) => {
        if (err) {
          window.console.error(
            `Could not get a new token (${err.error}: ${err.error_description}).`
          );
        } else {
          this.setSession(result);
          window.console.info("Successfully renewed auth!");
        }
      }
    );
  }

  scheduleRenewal() {
    const expiresAt = JSON.parse(localStorage.getItem("expires_at") || "");
    const delay = expiresAt - Date.now();
    if (delay > 0) {
      this.tokenRenewalTimeout = setTimeout(() => {
        this.renewToken();
      }, delay);
    }
  }
}

export default Auth;
