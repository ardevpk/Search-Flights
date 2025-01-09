const FlightCard = ({ flight }) => {
    return (
      <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        {flight.content.image && flight.content.image.url && (
          <img src={flight.content.image.url} alt={flight.content.location.name} className="flight-image mb-2" />
        )}
        <h3 className="text-lg font-semibold mb-2 text-black">{flight.content.location.name}</h3>
        <p className="text-gray-700">Price: {flight.content.flightQuotes?.cheapest?.price}</p>
        <p className="text-gray-600">Direct: {flight.content.flightRoutes?.directFlightsAvailable ? "Yes" : "No"}</p>
        <p className="text-gray-700">Departure: {flight.content.departureTime ? flight.content.departureTime : "N/A"}</p>
        <p className="text-gray-700">Arrival: {flight.content.arrivalTime ? flight.content.arrivalTime : "N/A"}</p>
        <p className="text-gray-600">Duration: {flight.content.duration ? flight.content.duration : "N/A"}</p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Book Now
        </button>
      </div>
    );
  };

export default FlightCard;