import { useState, useEffect } from "react";
import axios from "axios";

const useResourcesReturnObject = resource => {
  const [resources, setResources] = useState({});

  useEffect(() => {
    (async resource => {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts/${resource}`
      );

      setResources(response.data);
    })(resource);
  }, []);

  return resources;
};
export default useResourcesReturnObject;
