import React from "react";
import Autocomplete from "../components/Autocomplete";
import Loader from "../components/Loader";
import useCountries from "../hooks/useCountries";

export default function Home() {
  const { countries, loading } = useCountries();

  if (loading) {
    return <Loader />;
  }

  return <Autocomplete options={countries} />;
}
