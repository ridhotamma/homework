import { useState } from "react";
import { TextFieldProps } from "./interface";

const TextField = ({
  placeholder,
  appendIcon,
  setSearchTerm,
}: TextFieldProps) => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearch = (e: any) => {
    if (e.keyCode === 13) {
      setSearchTerm(searchValue);
      setSearchValue("");
    }
  };

  const handleChange = (e: any) => {
    setSearchValue(e.target.value);
  };

  return (
    <div
      className={`rounded-lg flex bg-white justify-between p-2 md:w-96 mx-4 md:mx-0`}
    >
      <input
        value={searchValue}
        placeholder={placeholder}
        onKeyUp={handleSearch}
        onChange={handleChange}
        className="w-full"
      />
      {appendIcon && (
        <img src={appendIcon} alt="search" width={20} className="bg-white" />
      )}
    </div>
  );
};

export { TextField };
