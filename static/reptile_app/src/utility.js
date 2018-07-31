const baseURL = "https://salty-earth-93578.herokuapp.com/";
// const baseURL = "http://localhost:8000";

const geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json";

const loginURL = "https://salty-earth-93578.herokuapp.com/auth/token/create/";
// const loginURL = "http://localhost:8000/auth/token/create/";

const logoutURL = "https://salty-earth-93578.herokuapp.com/auth/token/destroy/";
// const logoutURL = "http://localhost:8000/auth/token/destroy/";

// Google API Key locked down by Heroku URL
const GOOGLE_API_KEY = "AIzaSyCoHbaK0VRre44HiamkKE6I9HU09pV-Cto";
// Google API key from localStorage - not locked down - for development only
// let GOOGLE_API_KEY = localStorage.getItem("GOOGLE_API_KEY");


module.exports = {baseURL: baseURL, geoCodeURL: geoCodeURL, loginURL: loginURL, logoutURL: logoutURL, GOOGLE_API_KEY: GOOGLE_API_KEY};
