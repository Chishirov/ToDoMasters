let url;
if (process.env.NODE_ENV === "production") {
  url = "https://todo-8u90.onrender.com";
} else {
  url = "http://localhost:3005";
}
export default url;
