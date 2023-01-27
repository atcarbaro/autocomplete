export interface AutocompleteOption {
  name: string;
  value: string;
}

export interface AutocompleteProps {
  options: AutocompleteOption[];
}

export interface useFetchProps {
  url: string;
}

export interface ResponseCountryItem {
  name: string;
  alpha2Code: string;
  independent?: boolean;
}
