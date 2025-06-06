import React from "react";
import { useFilterContext } from "../context/FilterContext";
import Multiselect from "multiselect-react-dropdown";

interface Props {
  column: "mod3" | "mod4" | "mod5" | "mod6";
}

const FilterDropdown: React.FC<Props> = ({ column }) => {
  const { filters, setFilter, options } = useFilterContext();

  const selectedValues = filters[column] || [];
  const allOptions = options[column].map((val) => ({
    id: val,
    name: String(val),
  }));
  const selectedOptions = allOptions.filter((opt) =>
    selectedValues.includes(opt.id)
  );

  const handleSelect = (selected: { id: number; name: string }[]) => {
    setFilter(
      column,
      selected.map((s) => s.id)
    );
  };

  return (
    <div className="mb-4">
      <label className="font-semibold block mb-1">{column.toUpperCase()}</label>
      <Multiselect
        options={allOptions}
        selectedValues={selectedOptions}
        displayValue="name"
        onSelect={handleSelect}
        onRemove={handleSelect}
        avoidHighlightFirstOption
        showCheckbox
        placeholder={`Filter by ${column}`}
        style={{ chips: { background: "#1e40af" } }}
      />
    </div>
  );
};

export default FilterDropdown;
