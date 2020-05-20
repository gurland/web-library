import { useLocation } from 'react-router-dom';

export function useQuery() {
  const result = {};
  const queryParams = new URLSearchParams(useLocation().search).entries();

  for(let [key, value] of queryParams) {
    result[key] = value;
  }

  return result;
}
