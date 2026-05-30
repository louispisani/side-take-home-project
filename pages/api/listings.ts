import type { NextApiRequest, NextApiResponse } from "next";

const URL = "https://api.simplyrets.com/properties";

// Proxy SimplyRETS through Next API route so auth credentials stay server-side
export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await fetch(URL, {
      headers: {
        Authorization: "Basic c2ltcGx5cmV0czpzaW1wbHlyZXRz",
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({
        message: "Failed to fetch listings",
      });
    }

    const data = await response.json();

    return res.status(200).json(data);
  } catch {
    return res.status(500).json({
      message: "Unexpected error fetching listings",
    });
  }
}