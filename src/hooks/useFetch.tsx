import { useEffect, useState } from "react";
import { useFetchProps } from "../types";

const useFetch = ({ url }: useFetchProps) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const errorMessage = "Something went wrong, try again later";
      try {
        const response = await fetch(url);
        const dataResponse = await response.json();
        if (response.status === 200) {
          setData(dataResponse);
        } else {
          setError(errorMessage);
        }
      } catch (error) {
        console.error(errorMessage);
        console.error(error);
        setError(errorMessage);
      }
    };
    fetchData();
  }, [url]);

  return { data, error };
};

export default useFetch;
