import { useLocation } from 'react-router-dom';

export function useQuery(queryString) {
  const result = {};

  const queryParams = new URLSearchParams(queryString).entries();

  for(let [key, value] of queryParams) {
    result[key] = value;
  }

  return result;
}
