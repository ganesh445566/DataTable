import { FaPlus, FaTable, FaAngleLeft, FaAngleRight, FaGem } from "react-icons/fa";
import { useState } from "react";

const Sidebar = ({ setPageView }) => {
  const [active, setActive] = useState("add");
  const [collapsed, setCollapsed] = useState(false);

  const handleClick = (page) => {
    setActive(page);
    setPageView(page);
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div
      className="sidebar"
      style={{ width: collapsed ? "60px" : "220px", transition: "0.3s" }}
    >
      {/* Collapse/Expand Arrow */}
      <div
        style={{
          display: "flex",
          justifyContent: collapsed ? "center" : "flex-end",
          padding: "10px",
          cursor: "pointer",
        }}
        onClick={toggleSidebar}
      >
        {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
      </div>

      {/* Dashboard Heading with Icon */}
      {!collapsed && (
        <h2 style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <FaGem /> Dashboard
        </h2>
      )}

      {/* Menu Buttons */}
      <button
        className={active === "add" ? "active" : ""}
        onClick={() => handleClick("add")}
        title="Add Record"
      >
        <FaPlus className="me-2" />
        {!collapsed && "Add Record"}
      </button>

      <button
        className={active === "table" ? "active" : ""}
        onClick={() => handleClick("table")}
        title="Data Table"
      >
        <FaTable className="me-2" />
        {!collapsed && "Data Table"}
      </button>
    </div>
  );
};

export default Sidebar;
