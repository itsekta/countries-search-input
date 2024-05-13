import React, { useState, useEffect } from "react";
import "./CountrySearchInput.css";

export default function CountryFlags() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries");
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error.message);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.trim();
    setSearchTerm(term);
    if (term === "") {
      setFilteredCountries(countries);
    } else {
      const filtered = countries.filter((country) =>
        country.name.common.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCountries(filtered);
    }
  };

  return (
    <div>
      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for a country..."
        />
      </div>
      <div className="countries-container">
        {filteredCountries.map((country) => (
          <div key={country.name.common} className="countryCard">
            <img src={country.flags.png} alt={country.name.common} />
            <h3>{country.name.common}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
