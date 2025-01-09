import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { query } = req.query; // Get the query parameter from the request

    const options = {
      method: 'GET',
      url: 'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
      params: {
        query: query || '', // Use the query parameter or default to an empty string
        locale: 'en-US'
      },
      headers: {
        'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY, // Use environment variable for API key
        'x-rapidapi-host': 'sky-scrapper.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      res.status(200).json(response.data); // Send the response data back to the client
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to fetch airport data" }); // Handle errors
    }
  } else {
    res.status(405).json({ error: "Method not allowed" }); // Handle unsupported methods
  }
}