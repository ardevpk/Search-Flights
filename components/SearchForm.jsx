import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    departureDetails: null,
    destinationDetails: null,
    departureDate: "",
    returnDate: "",
    adults: 1,
    journeyType: "one_way",
    cabinClass: "economy",
  });

  const [departureOptions, setDepartureOptions] = useState([]);
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [showFields, setShowFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "journeyType" && value === "one_way") {
      setFormData({ ...formData, destination: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const departureResponse = await axios.get(
        `/api/searchAirport?query=${formData.departure}`
      );
      console.log(departureResponse.data, typeof departureResponse.data);
      if (
        !departureResponse.data.status ||
        !Array.isArray(departureResponse.data.data) ||
        departureResponse.data.data.length === 0
      ) {
        toast.error("No airports found for departure location", {
          position: "top-center",
        });
        return;
      }

      const depOptions = departureResponse.data.data.map((item) => ({
        skyId: item.skyId,
        entityId: item.entityId,
        title: item.presentation.title,
        suggestionTitle: item.presentation.suggestionTitle,
        subtitle: item.presentation.subtitle,
      }));
      setDepartureOptions(depOptions);

      if (formData.destination) {
        const destinationResponse = await axios.get(
          `/api/searchAirport?query=${formData.destination}`
        );

        if (
          !destinationResponse.data.status ||
          !Array.isArray(destinationResponse.data.data) ||
          destinationResponse.data.data.length === 0
        ) {
          toast.error("No airports found for destination location", {
            position: "top-center",
          });
          return;
        }

        const destOptions = destinationResponse.data.data.map((item) => ({
          skyId: item.skyId,
          entityId: item.entityId,
          title: item.presentation.title,
          suggestionTitle: item.presentation.suggestionTitle,
          subtitle: item.presentation.subtitle,
        }));
        setDestinationOptions(destOptions);
      } else {
        setDestinationOptions([]);
        setFormData({ ...formData, destinationDetails: null });
      }
    } catch (error) {
      console.error("Error fetching airports", error);
    }
  };

  const handleSelectOption = (type, selectedOption) => {
    if (type === "departure") {
      setShowFields(true);
      setFormData({
        ...formData,
        departureDetails: {
          skyId: selectedOption.skyId,
          entityId: selectedOption.entityId,
        },
      });
    } else if (type === "destination") {
      setFormData({
        ...formData,
        destinationDetails: {
          skyId: selectedOption.skyId,
          entityId: selectedOption.entityId,
        },
      });
    }
  };

  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-black">
            Departure City <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="departure"
            placeholder="Departure City"
            value={formData.departure}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          />
        </div>
        <div>
          <label className="block mb-1 text-black">
            Destination City
            <span className="text-gray-500 cursor-pointer">
              {" "}
              (Defaults to Anywhere){" "}
            </span>
          </label>
          <input
            type="text"
            name="destination"
            placeholder="Destination City"
            value={formData.destination}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleSubmit}
        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md"
      >
        Search Airports
      </button>
      {departureOptions.length > 0 && (
        <div>
          <h4 className="text-lg font-bold text-black">Departure Options:</h4>
          <select
            className="w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            onChange={(e) =>
              handleSelectOption(
                "departure",
                departureOptions[e.target.selectedIndex]
              )
            }
          >
            <option value="" disabled selected>
              Select an option
            </option>
            {departureOptions.map((option) => (
              <option key={option.skyId} className="text-black">
                {option.title} - {option.subtitle}
              </option>
            ))}
          </select>
        </div>
      )}
      {destinationOptions.length > 0 && (
        <div>
          <h4 className="text-lg font-bold text-black">Destination Options:</h4>
          <select
            className="w-full text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600"
            onChange={(e) =>
              handleSelectOption(
                "destination",
                destinationOptions[e.target.selectedIndex]
              )
            }
          >
            <option value="" disabled selected>
              Select an option
            </option>
            {destinationOptions.map((option) => (
              <option key={option.skyId} className="text-black">
                {option.title} - {option.subtitle}
              </option>
            ))}
          </select>
        </div>
      )}
      {showFields && (
        <>
          <div>
            <label className="block mb-1 text-black">Journey Type</label>
            <select
              name="journeyType"
              value={formData.journeyType}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            >
              <option value="one_way">One Way</option>
              <option value="round_trip">Round Trip</option>
            </select>
          </div>
          <div>
            <label className="block mb-1 text-black">Adults</label>
            <input
              type="number"
              name="adults"
              min="1"
              placeholder="Adults"
              value={formData.adults}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            />
          </div>
          <div>
            <label className="block mb-1 text-black">Cabin Class</label>
            <select
              name="cabinClass"
              value={formData.cabinClass}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            >
              <option value="economy">Economy</option>
              <option value="premium_economy">Premium Economy</option>
              <option value="business">Business</option>
              <option value="first">First</option>
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-black">
                Departure Date
                {/* <span className="text-red-500">*</span> */}
            </label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            <div>
              <label className="block mb-1 text-black">Return Date</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleChange}
                placeholder="dd/mm/yyyy"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
          </div>
          {/* <button
            type="button"
            onClick={() => onSearch(formData)}
            className={`w-full font-semibold py-2 rounded-md ${formData.departureDate ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
            disabled={!formData.departureDate}
          >
            Search Flights
          </button> */}
          <button
            type="button"
            onClick={() => onSearch(formData)}
            className={`w-full font-semibold py-2 rounded-md bg-blue-600 hover:bg-blue-700`}
          >
            Search Flights
          </button>
        </>
      )}
    </form>
  );
};

export default SearchForm;
