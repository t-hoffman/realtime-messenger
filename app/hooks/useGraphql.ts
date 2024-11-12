import axios from "axios";
import { headers } from "next/headers";

export default async function useGraphql({
  url = "http://localhost:3000/api/graphql",
  queryName,
  query,
  variables,
  defaultReturn = [],
}: any) {
  let error, successfulData;
  try {
    const body = query.loc?.source.body;
    const response = await axios.post(
      url,
      {
        query: body || query,
        variables,
      },
      {
        headers: {
          ...Object.fromEntries(await headers()),
          "Content-Type": "application/json",
          withCredentials: true,
        },
      }
    );

    if (!response || !response.data || response?.data?.errors) {
      error = `Query: \`${queryName}\` failed.  Error: ${response.data.errors[0].message}`;
      console.error(error);
    } else {
      successfulData = response?.data?.data?.[queryName];
    }
  } catch (err) {
    // console.log(err);
    error = err || "Internal server error";
    successfulData = defaultReturn;

    console.error(error);
    // return defaultReturn;
  }

  return { data: successfulData, error };
}
