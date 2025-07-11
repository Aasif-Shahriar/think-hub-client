import axios from "axios";

const useAxios = () => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
  });
  return instance;
};

export default useAxios;
