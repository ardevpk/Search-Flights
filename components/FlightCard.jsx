const FlightCard = ({ flight }) => {
    return (
      <div className="p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
        <h3 className="text-lg font-semibold text-foreground mb-2">{flight.airline}</h3>
        <p className="text-gray-700">{flight.departureTime} - {flight.arrivalTime}</p>
        <p className="text-gray-600">{flight.duration}</p>
        <p className="font-bold text-blue-600">{flight.price}</p>
        <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Book Now
        </button>
      </div>
    );
  };