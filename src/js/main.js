// Initial state
let countriesData = [];

const fetchCountries = async () => {
  const res = await fetch("https://restcountries.com/v2/all");
  const data = await res.json();

  return data;
};

const transformCountryFields = (countries) => {
  return countries.map((country) => {
    const {
      name,
      flag,
      population,
      capital,
      region,
      topLevelDomain,
      nativeName,
      alpha3Code,
      subregion,
      languages,
      currencies,
      borders,
    } = country;
    const tld = topLevelDomain.map((tld) => tld).join(" ");

    return {
      name,
      flag,
      population: population.toLocaleString(),
      capital: capital || "¯\\_(ツ)_/¯",
      region,
      tld,
      native: nativeName,
      alpha3Code,
      subregion,
      languages: languages.map((l) => l.name).join(", "),
      currencies: currencies
        ? currencies.map((c) => c.name).join(", ")
        : "¯\\_(ツ)_/¯",
      borders,
    };
  });
};

// Convert a border alpha code to its country name
const borderToName = (border) => {
  if (!border) return;

  const country = countriesData.find((c) => c.alpha3Code === border);

  return country.name;
};

// Create a button with the name of the border country
const createBorderTemplate = (border) => {
  const countryBorder = document.createElement("button");

  countryBorder.classList.add(
    "border-2",
    "border-gray-500",
    "shadow",
    "py-2",
    "px-4",
    "dark:border-0",
    "dark:bg-blue-700"
  );
  countryBorder.textContent = borderToName(border);
  countryBorder.addEventListener("click", () => {
    setCountryDetails(countriesData.find((c) => c.alpha3Code === border));
  });

  return countryBorder;
};

const setCountryCards = (countries) => {
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

    country.querySelector("article").addEventListener("click", () => {
      setCountryDetails(c);
    });

    document.querySelector(".js-country-list").appendChild(country);
  });
};

const setCountryDetails = (c) => {
  document.querySelector(".js-country-modal").innerHTML = "";

  const countryDetails = document.querySelector(".js-country-details").content;
  const country = countryDetails.cloneNode(true);

  country.querySelector(".js-close-modal").addEventListener("click", () => {
    document.querySelector(".js-country-modal").innerHTML = "";
  });

  country.querySelector("[data-country-flag]").src = c.flag;
  country.querySelector("[data-country-flag]").alt = `Flag of ${c.name}`;
  country.querySelector("[data-country-name]").textContent = c.name;
  country.querySelector("[data-country-population]").textContent = c.population;
  country.querySelector("[data-country-region]").textContent = c.region;
  country.querySelector("[data-country-capital]").textContent = c.capital;
  country.querySelector("[data-country-native]").textContent = c.native;
  country.querySelector("[data-country-subregion]").textContent = c.subregion;
  country.querySelector("[data-country-tld]").textContent = c.tld;
  country.querySelector("[data-country-languages]").textContent = c.languages;
  country.querySelector("[data-country-currencies]").textContent = c.currencies;

  const borderCountry = country.querySelector("[data-country-borders]");

  if (c.borders) {
    c.borders.forEach((border) => {
      borderCountry.appendChild(createBorderTemplate(border));
    });
  } else {
    borderCountry.textContent = "¯\\_(ツ)_/¯";
  }

  document.querySelector(".js-country-modal").appendChild(country);
};

// Fetch countries and set the fields
document.addEventListener("DOMContentLoaded", async () => {
  const countries = await fetchCountries();

  countriesData = await transformCountryFields(countries);

  setCountryCards(countriesData);
});

// Search by country name
document.querySelector(".js-search-country").addEventListener("input", (e) => {
  const search = e.target.value.toLowerCase().trim();

  const filteredCountries = countriesData.filter((country) => {
    return country.name.toLowerCase().includes(search);
  });

  setCountryCards(filteredCountries);
});

// Filter by region
document.querySelector(".js-select-region").addEventListener("change", (e) => {
  const region = e.target.value;

  const filteredCountries = countriesData.filter((country) => {
    return country.region.toLowerCase() === region;
  });

  setCountryCards(filteredCountries);
});

// Toggle theme
document.querySelector(".js-toggle-theme").addEventListener("click", () => {
  document.documentElement.classList.toggle("dark");
});
