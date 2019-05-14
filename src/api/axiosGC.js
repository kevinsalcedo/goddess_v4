import axios from "axios";

export default axios.create({
  baseURL:
    "https://firestore.googleapis.com/v1/projects/goddess-climbing/databases/(default)/"
});
