let url;
if (process.env.NODE_ENV === "development") {
  url = "https://todomaster-d48m.onrender.com";
} else {
  url = "http://localhost:3005/api";
}
export default url;
