import React from 'react';

interface DropdownProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { label: string }[];
  placeholder: string;
}

const Dropdown: React.FC<DropdownProps> = ({ value, onChange, options, placeholder }) => (
  <div className="relative">
    <select
      value={value}
      onChange={onChange}
      className="border rounded-lg px-3 py-2 bg-white focus:outline-none appearance-none pr-8"
    >
      <option value="All">{placeholder}</option>
      {options.map((opt) => (
        <option key={opt.label} value={opt.label}>{opt.label}</option>
      ))}
    </select>
    <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
      <svg width="16" height="16" fill="none" viewBox="0 0 20 20"><path d="M6 8l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  </div>
);

export default Dropdown; 