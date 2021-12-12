async function fetchAPI(url) {
  const response = await fetch(url);
  const json = await response.json();
  const key = Object.keys(json);

  if (json[key] === null) {
    return { [key]: [] };
  }

  return json;
}

export default fetchAPI;
