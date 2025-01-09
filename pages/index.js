import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import axios from "axios";
import SearchForm from "../components/SearchForm";
import FlightCard from "../components/FlightCard";

export default function Home() {
  const [flights, setFlights] = useState([]);

  const handleSearch = async (formData) => {
    const { departureDetails, destinationDetails, departureDate, returnDate, adults, journeyType, cabinClass } = formData;
    let requestBody = {
    //   originSkyId: departureDetails.skyId,
      originEntityId: departureDetails.entityId,
      adults: adults,
      journeyType: journeyType,
      cabinClass: cabinClass
    }
    if (departureDate) {
      requestBody.travelDate = departureDate;
    }
    if (returnDate) {
      requestBody.returnDate = returnDate;
    }
    if (destinationDetails) {
      requestBody.destinationSkyId = destinationDetails.skyId;
      requestBody.destinationEntityId = destinationDetails.entityId;
    }
    try {
      console.log({...requestBody});
      const flightResponse = await axios.post("/api/searchFlights", requestBody);
      console.log(flightResponse.data);
      setFlights(flightResponse.data.data.results || []);
    } catch (error) {
      console.error("Error fetching flights", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <ToastContainer />
      {/* Header */}
      <header className="sticky top-0 z-50 bg-blue-600 text-white p-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">Flight Finder</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <section className="mt-12 p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6 text-black">
            Search for Airports and Flights
          </h2>
          <SearchForm onSearch={handleSearch} />
        </section>

        <section className="mt-8 container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4 text-black">
            Available Flights
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {flights.length > 0 ? (
              flights.map((flight, index) => (
                <FlightCard key={index} flight={flight} />
              ))
            ) : (
              <p className="text-gray-500">No flights found</p>
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-gray-800 text-white text-center py-4">
        <p>
          &copy; {new Date().getFullYear()} Flight Finder. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
