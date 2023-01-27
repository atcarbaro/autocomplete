import React, { useCallback, useEffect, useRef, useState } from "react";
import { AutocompleteOption, AutocompleteProps } from "../../types";
import "./index.css";

export default function Autocomplete({ options }: AutocompleteProps) {
  const [autocomplete, setAutocomplete] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [filteredData, setFilteredData] =
    useState<AutocompleteOption[]>(options);
  const [activeOption, setActiveOption] = useState("");
  const [currentOption, setCurrentOption] = useState(0);
  const inputElement = useRef<HTMLInputElement>(null);
  const listElement = useRef<HTMLUListElement>(null);

  const asyncFilter = async (
    arrayValues: AutocompleteOption[],
    callbackFn: (option: AutocompleteOption) => Promise<boolean>
  ) =>
    Promise.all(arrayValues.map(callbackFn)).then((results) =>
      arrayValues.filter((_v, index) => results[index])
    );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const autocompleteValue = e.target.value;
    setAutocomplete(autocompleteValue);
  };

  useEffect(() => {
    const fetchOptions = async () => {
      const newFilteredData = await asyncFilter(
        options,
        async (option) =>
          option.name.toLowerCase().indexOf(autocomplete.toLowerCase()) > -1
      );

      setCurrentOption(0);
      setActiveOption("");
      setFilteredData(newFilteredData);
    };
    fetchOptions();
  }, [autocomplete, options]);

  const renderAutocomplete = () => {
    if (showAutocomplete) {
      if (filteredData.length) {
        return (
          <ul className="autocompleteList" tabIndex={0} ref={listElement}>
            {filteredData.map((option, index) => {
              let className;
              if (index === currentOption) {
                className = "active";
              }
              setTimeout(() => {
                changeElement();
              }, 100);
              return (
                <li
                  className={className}
                  key={option.value}
                  onClick={selectOption(option, index)}
                >
                  {option.name}
                </li>
              );
            })}
          </ul>
        );
      } else {
        return (
          <div className="no-autocomplete">
            <em>Not found</em>
          </div>
        );
      }
    }
    return <></>;
  };

  const changeElement = () => {
    const selected = listElement?.current?.querySelector(".active");
    if (selected) {
      selected?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setShowAutocomplete(false);
      setActiveOption(filteredData[currentOption].value);
      setAutocomplete(filteredData[currentOption].name);
    } else if (event.key === "ArrowUp") {
      return currentOption === 0 ? null : setCurrentOption(currentOption - 1);
    } else if (event.key === "ArrowDown") {
      return currentOption - 1 === filteredData.length
        ? null
        : setCurrentOption(currentOption + 1);
    }
  };

  const selectOption = useCallback(
    (option: AutocompleteOption, index: number) => () => {
      setActiveOption(option.value);
      setAutocomplete(option.name);
      setCurrentOption(index);
    },
    []
  );

  const handleBlur = (event: React.FocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowAutocomplete(false);
    }
  };

  const cleanAutocomplete = () => {
    setCurrentOption(0);
    setActiveOption("");
    setAutocomplete("");
    setShowAutocomplete(false);
    setFilteredData(options);
    if (inputElement.current) {
      inputElement.current.focus();
    }
  };

  return (
    <div
      className="autocompleteContainer"
      onBlur={handleBlur}
      onClick={() => setShowAutocomplete(true)}
    >
      <div>
        <input
          placeholder="Search your country..."
          type="text"
          name="autocomplete"
          value={autocomplete}
          onChange={handleChange}
          className={showAutocomplete ? "isShown" : ""}
          onKeyDown={handleKeyDown}
          ref={inputElement}
        />
        {autocomplete.length > 0 && (
          <button onClick={cleanAutocomplete} className="removeAutocomplete">
            X
          </button>
        )}
      </div>
      {renderAutocomplete()}
    </div>
  );
}
