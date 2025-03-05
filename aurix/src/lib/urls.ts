// URLS for all of the app's components, the frontend and the backend

export const urls = {
    backendUrl: process.env.NODE_ENV === "production" ? "https://server.auric.space" : "http://localhost:8080",
    frontendUrl: process.env.NODE_ENV === "production" ? "https://app.aurix.space" : "http://localhost:3000"
}