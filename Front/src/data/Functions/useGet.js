import { useState, useEffect } from "react";
import API from "../../api/api";

export default function useGet(url) {
  const FetchData = async () => {
    const data = await API.get(url);
    return data.data;
  };

  useEffect(() => {
    async function fetch() {
      const data = await FetchData();
      setOutput(data);
    }
    fetch();
  }, []);

  const [output, setOutput] = useState([]);
  return output;
}
