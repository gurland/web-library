export function normalize(obj) {
  const result = {};

  for(let key in obj) {
    if(obj[key]) result[key] = obj[key];
  }

  return result;
}

export function fromSource(coverString) {
  if (!coverString) return null;

  return 'data:image/png;base64,' + coverString;
}