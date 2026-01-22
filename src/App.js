import { useState } from "react";
import DataForm from "./components/DataForm";
import DataTable from "./components/DataTable";
import Sidebar from "./components/Sidebar"; // updated Sidebar with icons
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";

function App() {
  const [pageView, setPageView] = useState("add"); // default module

  return (
    <div className="dashboard">
      {/* Left Sidebar */}
      <Sidebar setPageView={setPageView} />

      {/* Right Content */}
      <div className="main-content">
        {pageView === "add" && <DataForm />}
        {pageView === "table" && <DataTable />}
      </div>
    </div>
  );
}

export default App;
