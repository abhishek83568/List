import React, { useState, useRef, useEffect } from "react";
import Input from "./Input";
import Button from "./Button";

const AddSelect = ({ selected, onChange, options, onAddOption }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newOption, setNewOption] = useState("");
  const dropdownRef = useRef(null);

  const toggleOption = (option) => {
    onChange(
      selected.includes(option)
        ? selected.filter((item) => item !== option)
        : [...selected, option]
    );
  };

  const handleAddOptionClick = () => {
    if (newOption.trim()) {
      onAddOption(newOption.trim());
      setNewOption("");
    }
  };

  const handleRemoveOption = (optionToRemove) => {
    onChange(selected.filter((option) => option !== optionToRemove));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="addSelect-container ">
      <div className="addSelect-display" onClick={() => setIsOpen(!isOpen)}>
        <div className="addSelect-options">
          {selected.length > 0
            ? selected.map((option) => (
                <span key={option} className="addSelect-option-tag">
                  {option}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveOption(option);
                    }}
                    className="addSelect-remove-option"
                  >
                    &times;
                  </button>
                </span>
              ))
            : "Select Options"}
        </div>
      </div>
      {isOpen && (
        <div className="addSelect-dropdown" ref={dropdownRef}>
          <div className="addSelect-options-list">
            {options.map((option) => (
              <label key={option} className="addSelect-option-label">
                <input
                  type="checkbox"
                  checked={selected.includes(option)}
                  onChange={() => toggleOption(option)}
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
          <div className="addSelect-add-new">
            <Input
              type="text"
              placeholder="Add new item"
              value={newOption}
              onChange={(e) => setNewOption(e.target.value)}
            />
            <Button onClick={handleAddOptionClick} className="addSelect-btn">
              <span>+</span> <span>Add</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSelect;
