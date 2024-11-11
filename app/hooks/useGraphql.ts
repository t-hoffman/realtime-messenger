import axios from "axios";

export default async function useGraphql({
  url = "http://localhost:3000/api/graphql",
  queryName,
  query,
  variables,
  defaultReturn = [],
}) {
  try {
    const { data } = await axios.post(url, { query, variables });

    return data.data[queryName];
  } catch (err) {
    console.log("hayy");
    return defaultReturn;
  }
}
