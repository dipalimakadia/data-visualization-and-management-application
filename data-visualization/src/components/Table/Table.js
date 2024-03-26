import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";
const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState([]);
  const [rows, setRows] = useState([]);
  const [subkeys, setSubkeys] = useState({});

  useEffect(() => {
    axios.get(`/API_DATA.json`).then((result) => {
      setTableData(Object.values(result.data));

      // Get Main Properties
      const uniqueSection = Object.values(result.data).reduce(
        (uniqueSectionKey, uniqueSectionValue) => {
          const keys = Object.keys(uniqueSectionValue);
          keys.forEach((key) => {
            if (!uniqueSectionKey.includes(key)) {
              uniqueSectionKey.push(key);
            }
          });
          return uniqueSectionKey;
        },
        []
      );
      setSections(uniqueSection);

      // Get sub property of each main property
      const subkeysMap = {};
      Object.values(result.data).forEach((subkeysValue) => {
        Object.keys(subkeysValue).forEach((key) => {
          if (
            typeof subkeysValue[key] === "object" &&
            subkeysValue[key] !== null
          ) {
            Object.keys(subkeysValue[key]).forEach((subkey) => {
              if (!subkeysMap[key]) {
                subkeysMap[key] = new Set();
              }
              subkeysMap[key].add(subkey);
            });
          }
        });
      });

      // Convert sets to arrays for easier rendering
      const subkeysArray = {};
      Object.entries(subkeysMap).forEach(([key, value]) => {
        subkeysArray[key] = Array.from(value);
      });

      setSubkeys(subkeysArray);
    });
  }, []);

  const handleButtonClick = (section) => {
    setSelectedSection(section);
    setRows(
      tableData.map((tableValue) => ({
        name: tableValue.name,
        ...(subkeys[section] || []).reduce((acc, subkey) => {
          acc[subkey] = tableValue[section]?.[subkey] || "--";
          return acc;
        }, {}),
      }))
    );
  };

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const csv = generateCsv(csvConfig)(rowData);
    download(csvConfig)(csv);
  };

  const handleExportSelectedData = () => {
    const csv = generateCsv(csvConfig)(rows);
    download(csvConfig)(csv);
  };

  const columnHelper = createMRTColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      size: 120,
    }),
    ...(subkeys[selectedSection]?.map((subkey) =>
      columnHelper.accessor(subkey, {
        header: subkey,
        size: 120,
      })
    ) || []),
  ];

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const table = useMaterialReactTable({
    columns,
    data: rows,
    enableRowSelection: true,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          onClick={handleExportSelectedData}
          startIcon={<FileDownloadIcon />}
        >
          Export {selectedSection} Data
        </Button>
        <Button
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </Button>
      </Box>
    ),
  });

  return (
    <div className="container">
      {/* <h1>Sub-data in Table</h1> */}
      <div className="dropdown row m-5">
        <h1>Sub-data in Table Format</h1>
        <button
          className="btn btn-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Table Options
        </button>
        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          {sections.map((section) => (
            <li>
              <a
                href
                className="dropdown-item pointer"
                key={section}
                onClick={() => handleButtonClick(section)}
              >
                {section}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <h2>{selectedSection} </h2>
      <div className="tablePage row">
        {selectedSection && <MaterialReactTable table={table} />}
      </div>
    </div>
  );
};

export default Table;
