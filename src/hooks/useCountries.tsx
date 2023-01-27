import { useState, useEffect } from "react";
import { AutocompleteOption, ResponseCountryItem } from "../types";
import useFetch from "./useFetch";

const COUNTRIES_URL =
  "https://restcountries.com/v2/region/Americas?fields=name,alpha2Code";

export default function useCountries() {
  const [countries, setCountries] = useState<AutocompleteOption[]>([]);
  const [loading, setLoading] = useState(true);
  const { data } = useFetch({ url: COUNTRIES_URL });

  useEffect(() => {
    const cleanData = data.map((countryItem: ResponseCountryItem) => ({
      name: countryItem.name,
      value: countryItem.alpha2Code,
    }));
    setCountries(cleanData);
  }, [data]);

  useEffect(() => {
    setLoading(!countries.length);
  }, [countries]);

  return { countries, loading };
}
