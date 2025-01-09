import { useState } from "react";

const SearchForm = ({ onSearch }) => {
  const [formData, setFormData] = useState({
    departure: "",
    destination: "",
    departureDate: "",
    returnDate: "",
    adults: 1,
    journeyType: "one_way",
    cabinClass: "economy",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "journeyType" && value === "one_way") {
      setFormData({ ...formData, destination: "" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 text-black">Departure City</label>
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
          <label className="block mb-1 text-black">Destination City</label>
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
          <label className="block mb-1 text-black">Departure Date</label>
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
      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;