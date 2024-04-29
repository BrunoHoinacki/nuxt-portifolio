export default defineEventHandler((event) => {
    console.log("Acesando: " + getRequestURL(event));
});