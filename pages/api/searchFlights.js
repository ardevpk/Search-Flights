import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await axios.get("https://sky-scrapper.p.rapidapi.com/api/v2/flights/searchFlightEverywhere", {
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_RAPIDAPI_KEY,
          "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
        },
        params: {...req.body},
      });

      res.status(200).json(response.data);
      res.status(200).json([]);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch flight data" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}