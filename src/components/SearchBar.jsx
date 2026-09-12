import { useState, useEffect, useRef, useCallback } from 'react';

export default function SearchBar({ value, onChange, placeholder = 'Search products...' }) {
  const [localValue, setLocalValue] = useState(value);
  const timeoutRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleChange = useCallback((e) => {
    const newValue = e.target.value;
    setLocalValue(newValue);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      onChange(newValue);
    }, 250);
  }, [onChange]);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      onChange(localValue);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="M21 21l-4.35-4.35" />
        </svg>
        <input
          ref={inputRef}
          type="search"
          className="search-input"
          value={localValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          autoComplete="off"
          aria-label="Search products"
        />
      </div>
    </div>
  );
}