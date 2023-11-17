import axios from "axios";

const wtAxios = axios.create({
  headers: {
    Authorization: undefined,
  },
});

export default wtAxios;
