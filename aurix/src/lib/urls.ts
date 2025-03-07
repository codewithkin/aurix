// URLS for all of the app's components, the frontend and the backend

export const urls = {
    backendUrl: process.env.NODE_ENV === "production" ? "http://localhost:8080" : "http://localhost:8080",
    frontendUrl: process.env.NODE_ENV === "production" ? "http://localhost:3000" : "http://localhost:3000"
}