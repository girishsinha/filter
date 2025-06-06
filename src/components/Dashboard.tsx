// src/components/Dashboard.tsx
import React from "react";
import FilterDropdown from "./FilterDropdown";
import { useFilterContext } from "../context/FilterContext";
import DataTable from "react-data-table-component";

const Dashboard: React.FC = () => {
  const { filteredData } = useFilterContext();

  const columns = [
    { name: "Number", selector: (row: any) => row.number, sortable: true },
    { name: "mod3", selector: (row: any) => row.mod3, sortable: true },
    { name: "mod4", selector: (row: any) => row.mod4, sortable: true },
    { name: "mod5", selector: (row: any) => row.mod5, sortable: true },
    { name: "mod6", selector: (row: any) => row.mod6, sortable: true },
  ];

  const paginationPerPage = 100;

  return (
    <div className="p-6 max-w-screen-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Frontend Filter Optimization</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <FilterDropdown column="mod3" />
        <FilterDropdown column="mod4" />
        <FilterDropdown column="mod5" />
        <FilterDropdown column="mod6" />
      </div>

      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationPerPage={paginationPerPage}
        fixedHeader
        highlightOnHover
        striped
        dense
      />
    </div>
  );
};

export default Dashboard;
