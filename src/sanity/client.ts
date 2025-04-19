// /sanity/client.ts
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "dgof1jcb",
  dataset: "production",
  apiVersion: "2023-01-01", // go a little older just to be safe
  useCdn: false, // for fresh data
});
