import React, { createContext, useContext, useEffect, useState } from "react";
import data from "../data/dataset_small.json"; // We’ll convert CSV to JSON

type DataRow = {
  number: number;
  mod3: number;
  mod4: number;
  mod5: number;
  mod6: number;
};

type FilterKey = keyof Omit<DataRow, "number">;

type FilterContextType = {
  data: DataRow[];
  filters: Partial<Record<FilterKey, number[]>>;
  setFilter: (key: FilterKey, values: number[]) => void;
  filteredData: DataRow[];
  options: Record<FilterKey, number[]>;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilterContext = () => {
  const ctx = useContext(FilterContext);
  if (!ctx)
    throw new Error("useFilterContext must be used inside FilterProvider");
  return ctx;
};

const FilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filters, setFilters] = useState<Partial<Record<FilterKey, number[]>>>(
    {}
  );
  const [filteredData, setFilteredData] = useState<DataRow[]>(data);

  const setFilter = (key: FilterKey, values: number[]) => {
    setFilters((prev) => ({ ...prev, [key]: values }));
  };

  useEffect(() => {
    let tempData = data;
    for (const key of Object.keys(filters) as FilterKey[]) {
      const selected = filters[key];
      if (selected && selected.length > 0) {
        tempData = tempData.filter((row) => selected.includes(row[key]));
      }
    }
    setFilteredData(tempData);
  }, [filters]);

  const options: Record<FilterKey, number[]> = {
    mod3: [],
    mod4: [],
    mod5: [],
    mod6: [],
  };

  const keys = Object.keys(options) as FilterKey[];
  for (const key of keys) {
    const otherFilters = { ...filters };
    delete otherFilters[key];

    let subset = data;
    for (const otherKey of Object.keys(otherFilters) as FilterKey[]) {
      const selected = otherFilters[otherKey];
      if (selected && selected.length > 0) {
        subset = subset.filter((row) => selected.includes(row[otherKey]));
      }
    }

    options[key] = Array.from(new Set(subset.map((row) => row[key]))).sort(
      (a, b) => a - b
    );
  }

  return (
    <FilterContext.Provider
      value={{ data, filters, setFilter, filteredData, options }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
