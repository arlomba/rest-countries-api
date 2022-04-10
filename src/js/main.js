// Initial state
let countriesData = [];

const fetchCountries = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const data = await res.json();

  return data;
};

const setCountryFields = (countries) => {
  return countries.map((country) => ({
    name: country.name,
    flag: country.flag,
    population: country.population.toLocaleString(),
    capital: country.capital || "¯\\_(ツ)_/¯",
    region: country.region,
  }));
};

const setCountries = (countries) => {
  document.querySelector(".js-country-list").innerHTML = "";

  countries.forEach((c) => {
    const countryCard = document.querySelector(".js-country-card").content;
    const country = countryCard.cloneNode(true);

    country.querySelector("[data-country-flag]").src = c.flag;
    country.querySelector("[data-country-flag]").alt = `Flag of ${c.name}`;
    country.querySelector("[data-country-name]").textContent = c.name;
    country.querySelector("[data-country-population]").textContent =
      c.population;
    country.querySelector("[data-country-region]").textContent = c.region;
    country.querySelector("[data-country-capital]").textContent = c.capital;

    document.querySelector(".js-country-list").appendChild(country);
  });
};

// Fetch countries and set the fields
document.addEventListener("DOMContentLoaded", async () => {
  const countries = await fetchCountries();

  countriesData = await setCountryFields(countries);

  setCountries(countriesData);
});

// Search by country name
document.querySelector(".js-search-country").addEventListener("input", (e) => {
  const search = e.target.value.toLowerCase().trim();

  const filteredCountries = countriesData.filter((country) => {
    return country.name.toLowerCase().includes(search);
  });

  setCountries(filteredCountries);
});

// Filter by region
document.querySelector(".js-select-region").addEventListener("change", (e) => {
  const region = e.target.value;

  const filteredCountries = countriesData.filter((country) => {
    return country.region.toLowerCase() === region;
  });

  setCountries(filteredCountries);
});

// Toggle theme
document.querySelector(".js-toggle-theme").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
