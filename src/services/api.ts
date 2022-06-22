const BASE_URL = "http://localhost:4444/projects";

export const fetchData = async () => {
  let data = [];
  const response = await fetch(BASE_URL);
  if (response.ok) {
    data = await response.json();
  }

  return data;
};
