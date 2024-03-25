import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedSection, setSelectedSection] = useState("");
  const [sections, setSections] = useState([]);
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
          if (typeof subkeysValue[key] === "object" && subkeysValue[key] !== null) {
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
  };

  return (
    <div>
      <h1>{selectedSection}</h1>
      <div>
        {sections.map((section) => (
          <button key={section} onClick={() => handleButtonClick(section)}>
            {section}
          </button>
        ))}
      </div>

      <div className="tablePage">
        {selectedSection && (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                {subkeys[selectedSection] &&
                  subkeys[selectedSection].map((subkey) => (
                    <th key={subkey}>{subkey}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((tableValue, index) => (
                <tr key={index}>
                  <td>{tableValue.name}</td>
                  {subkeys[selectedSection] &&
                    subkeys[selectedSection].map((subkey) => (
                      <td key={subkey}>
                        {tableValue[selectedSection]?.[subkey] || "--"}
                      </td>
                    ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Table;
