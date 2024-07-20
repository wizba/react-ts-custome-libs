import React, { useState, useRef, useEffect } from 'react';
import './WizSelect.css';

// Define the structure of the Option object
interface Option {
  value: string; // The value of the option
  label: string; // The label to display for the option
}

// Define the props for the WizSelect component
interface WizSelectProps {
  options: Option[]; // Array of options to display in the dropdown
  onChange: (value: string) => void; // Callback function to handle option selection
  placeholder?: string; // Placeholder text for the select input
}

// WizSelect component definition
const WizSelect: React.FC<WizSelectProps> = ({ options, onChange, placeholder }) => {
  // State to manage the dropdown's visibility
  const [isOpen, setIsOpen] = useState(false);
  // State to manage the selected option
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  // Ref to reference the select input container
  const selectRef = useRef<HTMLDivElement>(null);
  // Ref to reference the dropdown list
  const ulRef = useRef<HTMLUListElement>(null);

  // Function to handle the click event on the select input
  const handleSelectClick = () => {
    setIsOpen(!isOpen); // Toggle the dropdown's visibility
  };

  // Function to handle the click event on an option
  const handleOptionClick = (option: Option) => {
    setSelectedOption(option); // Set the selected option
    onChange(option.value); // Call the onChange callback with the selected option's value
    setIsOpen(false); // Close the dropdown
  };

  // Effect to handle clicks outside the select input to close the dropdown
  useEffect(() => {
    // Event handler to check for clicks outside the select input
    const handleClickOutside = (event: MouseEvent) => {
      // If the click is outside the select input, close the dropdown
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Add event listener for mousedown events
    document.addEventListener('mousedown', handleClickOutside);
    // Clean up the event listener when the component unmounts or the effect re-runs
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  // Effect to position the dropdown correctly when it is opened
  useEffect(() => {
    if (isOpen && ulRef.current && selectRef.current) {
      const rect = selectRef.current.getBoundingClientRect();
      ulRef.current.style.top = `${rect.bottom + window.scrollY}px`; // Position the dropdown below the select input
      ulRef.current.style.left = `${rect.left + window.scrollX}px`; // Align the dropdown with the left edge of the select input
      ulRef.current.style.width = `${rect.width}px`; // Match the width of the dropdown to the select input
    }
  }, [isOpen]); // This effect runs whenever isOpen changes

  return (
    // Main container for the custom select component
    <div className="custom-select" ref={selectRef}>
      {/* Display the selected option or the placeholder */}
      <div className="custom-select-input" onClick={handleSelectClick}>
        {selectedOption ? selectedOption.label : placeholder || 'Select an option'}
      </div>
      {/* Render the dropdown if it is open */}
      {isOpen && (
        <ul className="custom-select-dropdown" ref={ulRef}>
          {/* Render each option in the dropdown */}
          {options.map((option) => (
            <li
              key={option.value}
              className="custom-select-option"
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WizSelect;
