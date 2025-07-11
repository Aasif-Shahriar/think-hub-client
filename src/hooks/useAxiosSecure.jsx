import axios from "axios";

const useAxiosSecure = () => {
  const instance = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
    withCredentials: true,
  });
  return instance;
};

export default useAxiosSecure;
