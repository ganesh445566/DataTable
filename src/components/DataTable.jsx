import { useSelector } from "react-redux";
import { useMemo, useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Pagination from "./Pagination";

const DataTable = () => {
  const data = useSelector((state) => state.table.data);

  const [search, setSearch] = useState("");
  const [sortConfig, setSortConfig] = useState(null);
  const [page, setPage] = useState(1);
  const pageSize = 10;

  // Global Filter
  const filteredData = useMemo(() => {
    return data.filter((row) =>
      Object.values(row)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [search, data]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    const sorted = [...filteredData].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
    return sorted;
  }, [filteredData, sortConfig]);

  // Pagination
  const currentData = sortedData.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Excel Download
  const downloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(sortedData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    const buffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    saveAs(new Blob([buffer]), "table-data.xlsx");
  };

  return (
    <div className="table-responsive">
      {/* Added DataList header */}
      <h3 className="mb-3" style={{ color: "black" }}>Data Lists</h3>


      <div className="d-flex justify-content-between mb-2">
        <input
          className="form-control w-50"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <button className="btn btn-success" onClick={downloadExcel}>
          Download Excel
        </button>
      </div>

      <table className="table table-striped table-hover table-bordered">
        <thead className="table-dark">
          <tr>
            <th onClick={() => requestSort("name")} style={{ cursor: "pointer" }}>
              Name
            </th>
            <th onClick={() => requestSort("email")} style={{ cursor: "pointer" }}>
              Email
            </th>
            <th onClick={() => requestSort("age")} style={{ cursor: "pointer" }}>
              Age
            </th>
            <th onClick={() => requestSort("city")} style={{ cursor: "pointer" }}>
              City
            </th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row, index) => (
            <tr
              key={row.id}
              style={{
                backgroundColor: index === 0 ? "#007bff" : "", // bright blue for first row
                color: index === 0 ? "white" : "inherit",
              }}
            >
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.age}</td>
              <td>{row.city}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Pagination
        total={sortedData.length}
        pageSize={pageSize}
        currentPage={page}
        setCurrentPage={setPage}
      />
    </div>
  );
};

export default DataTable;
