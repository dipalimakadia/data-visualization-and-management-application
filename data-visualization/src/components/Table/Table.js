import React, { useState, useEffect } from "react";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { darken, lighten, useTheme, Box } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { mkConfig, generateCsv, download } from "export-to-csv";

const Table = ({data}) => {
  const [tableData, setTableData] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState([]);
  const [rows, setRows] = useState([]);
  const [subkeys, setSubkeys] = useState({});
  const [editedData, setEditedData] = useState({});

  useEffect(() => {
      setTableData(Object.values(data));

      // Get Main Properties
      const uniqueSection = Object.values(data).reduce(
        (uniqueSectionKey, uniqueSectionValue) => {
          const keys = Object.keys(uniqueSectionValue);
          keys.forEach((key) => {
            if (!uniqueSectionKey.includes(key) && key !== "name") {
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
      Object.values(data).forEach((subkeysValue) => {
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
  }, [data]);

  useEffect(() => {
    const storedEditedData = localStorage.getItem("editedData");
    if (storedEditedData) {
      setEditedData(JSON.parse(storedEditedData));
    }
  }, []);

  useEffect(() => {
    if (selectedSection) {
      setRows(
        tableData.map((tableValue, index) => ({
          index,
          name: tableValue.name,
          ...(subkeys[selectedSection] || []).reduce((acc, subkey) => {
            acc[subkey] =
              editedData[index]?.[selectedSection]?.[subkey] ||
              tableValue[selectedSection]?.[subkey] ||
              "--";
            return acc;
          }, {}),
        }))
      );
    }
  }, [selectedSection, tableData, editedData, subkeys]);

  //main functionality options click
  const handleButtonClick = (section) => {
    setSelectedSection(section);
  };

  const handleExportRows = (rows) => {
    const rowData = rows.map((row) => row.original);
    const updatedConfig = { ...csvConfig, filename: `Export ${selectedSection} Page Rows` };
    const csv = generateCsv(updatedConfig)(rowData);
    download(updatedConfig)(csv);
  };

  const handleExportSelectedData = () => {
    const updatedConfig = { ...csvConfig, filename: `Export ${selectedSection} Data` };
    const csv = generateCsv(updatedConfig)(rows);
    download(updatedConfig)(csv);
  };

  //edit data
  const handleCellEdit = (rowIndex, columnId, newValue) => {
    setEditedData((prevEditedData) => {
      const updatedEditedData = { ...prevEditedData };
      if (!updatedEditedData[rowIndex]) {
        updatedEditedData[rowIndex] = {};
      }
      if (!updatedEditedData[rowIndex][selectedSection]) {
        updatedEditedData[rowIndex][selectedSection] = {};
      }
      updatedEditedData[rowIndex][selectedSection][columnId] = newValue;

      // Save edited data to local storage
      localStorage.setItem("editedData", JSON.stringify(editedData));
      return updatedEditedData;
    });
  };

  // Clear local storage
  const clearLocalStorage = () => {
    localStorage.removeItem("editedData");
    setEditedData({});
  };

  const columnHelper = createMRTColumnHelper();
  const columns = [
    columnHelper.accessor("name", {
      header: "Name",
      size: 120,
      enableEditing: false,
      editDisplayMode: false,
    }),
    ...(subkeys[selectedSection]?.map((subkey) =>
      columnHelper.accessor(subkey, {
        header: subkey,
        size: 120,
        enableEditing: true,
        editDisplayMode: "row",
        Edit: ({ value, row }) => (
          <input
            type="text"
            value={editedData[row.index]?.[selectedSection]?.[subkey] || value}
            onChange={(e) => handleCellEdit(row.index, subkey, e.target.value)}
          />
        ),
      })
    ) || []),
  ];

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
    filename: true
  });

  const theme = useTheme();

  //light or dark green
  const baseBackgroundColor =
    theme.palette.mode === "dark" ? "#36454F" : "#D3D3D3";

  const table = useMaterialReactTable({
    muiTableBodyProps: {
      sx: (theme) => ({
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: darken(baseBackgroundColor, 0.1),
          },
        '& tr:nth-of-type(odd):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
          {
            backgroundColor: darken(baseBackgroundColor, 0.2),
          },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]) > td':
          {
            backgroundColor: lighten(baseBackgroundColor, 0.1),
          },
        '& tr:nth-of-type(even):not([data-selected="true"]):not([data-pinned="true"]):hover > td':
          {
            backgroundColor: darken(baseBackgroundColor, 0.2),
          },
      }),
    },
    mrtTheme: (theme) => ({
      baseBackgroundColor: baseBackgroundColor,
      draggingBorderColor: theme.palette.secondary.main,
    }),
    columns,
    data: rows,
    enableRowSelection: true,
    editDisplayMode: "row",
    enableCellActions: true,
    enableClickToCopy: "context-menu",
    enableColumnPinning: true,
    enableEditing: true,
    // columnFilterDisplayMode: "popover",
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
        <button
          className="btn btn-success"
          onClick={handleExportSelectedData}
          startIcon={<FileDownloadIcon />}
        >
          Export {selectedSection} Data
        </button>

        <button
          className=" btn btn-success"
          disabled={table.getRowModel().rows.length === 0}
          onClick={() => handleExportRows(table.getRowModel().rows)}
          startIcon={<FileDownloadIcon />}
        >
          Export Page Rows
        </button>

        <button className="btn btn-danger" onClick={clearLocalStorage}>
          Clear Local Storage
        </button>
      </Box>
    ),
  });

  return (
    <div className="container-fluid min-vh-100 bg-blackShade tablePage">
      <div className="dropdown row justify-content-center m-5">
        <h2 className="font-400">Sub-data in Table Format</h2>
        <button
          className=" bg-lightgreenish p-3 my-5 col-lg-3 border rounded  dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          Table Options
        </button>
        <ul
          className="dropdown-menu p-3 col-lg-3  border rounded"
          aria-labelledby="dropdownMenuButton1"
        >
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
      <h3 className="mb-3">{selectedSection} </h3>
      <div className="row tableDisplay m-2 text-white">
        {selectedSection && <MaterialReactTable table={table} />}
      </div>
    </div>
  );
};

export default Table;
