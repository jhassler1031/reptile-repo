const baseURL = "http://localhost:8000";
// const baseURL = "https://salty-earth-93578.herokuapp.com/";

const geoCodeURL = "https://maps.googleapis.com/maps/api/geocode/json";

const loginURL = "http://localhost:8000/auth/token/create/"
// const loginURL = "https://salty-earth-93578.herokuapp.com/auth/token/create/"

const logoutURL = "http://localhost:8000/auth/token/destroy/"
// const loginURL = "https://salty-earth-93578.herokuapp.com/auth/token/destroy/"


module.exports = {baseURL: baseURL, geoCodeURL: geoCodeURL, loginURL: loginURL, logoutURL: logoutURL};
