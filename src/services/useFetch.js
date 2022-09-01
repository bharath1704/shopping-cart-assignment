import { useEffect, useState, useRef } from 'react';
import Constants from '../utils/constants'

const useFetch = (path) => {
  const cache = useRef({});

  const [data, setData] = useState([]);
  const [error, setError] = useState(false);

  const url = `${Constants.baseUrl}${path}`;

  useEffect(() => {
    if (cache.current[path]) {
      const data = cache.current[path];
      setData(data);
      setError(false);
    }
    else {
      fetch(url)
        .then((res) => res.json())
        .then(data => {
          cache.current[path] = data;
          setData(data);
        })
        .catch(error => {
          setError(true);
          console.log(error);
        })
    }

  }, [path]);

  return { data, error };
}

export default useFetch;
