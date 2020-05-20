export function formatGenres(genres) {
  const result = [];

  for (let optGroup in genres) {
    result.push({
      key: optGroup,
      label: optGroup,
      disabled: true,
    });
    for (let genre in genres[optGroup]) {
      result.push({
        text: genres[optGroup][genre],
        value: genre,
        key: genre,
      });
    }
  }

  return result;
}