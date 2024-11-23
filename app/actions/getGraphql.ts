"use server";

import axios from "axios";
import { headers } from "next/headers";

export default async function getGraphql({
  url = process.env.NEXT_PUBLIC_LOCAL_GRAPHQL_ENDPOINT,
  queryName,
  query,
  variables,
  defaultReturn = [],
}: any) {
  let error, data;
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
      console.log(error);
    } else {
      data = response?.data?.data?.[queryName];
    }
  } catch (err) {
    error = err || "Internal server error";
    data = defaultReturn;

    console.error(error);
  }

  return { data, error };
}
