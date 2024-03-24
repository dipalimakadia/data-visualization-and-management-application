import React, { useState, useEffect } from "react";
import axios from "axios";

const Table = () => {
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    axios
      .get(`/API_DATA.json`)
      .then((result) => setTableData(Object.values(result.data)));
  }, []);
  console.log(tableData);
  const uniqueKey = Object.values(tableData).reduce((key, val) => {
    Object.keys(val).forEach((field) => {
      if (!key.includes(field)) {
        key.push(field);
      }
    });
    return key;
  }, []);
  const subTable = (item, key) => {
    if (typeof item[key] === 'object' && item[key] !== null) {
      return (
        <td key={key}>
          <table>
            <tbody>
                {Object.entries(item[key]).map(([subKey, subVal]) => (
                    <tr key={subKey}>
                        <td>{subKey}</td>
                        <td>{subVal}</td>
                    </tr>
                ))}
            </tbody>
          </table>
        </td>
      );
    }else{
        return <td key={key}>{item[key] || '--'}</td>
    }
  };
  return (
    <div>
      <table>
        <thead>
          <tr>
            {uniqueKey.map((key, val) => (
              <th key={val}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((item, itemId) => (
            <tr key={itemId}>
                {uniqueKey.map((key, val) =>  subTable(item, key))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
