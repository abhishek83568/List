import React, { useState } from "react";
import Select from "./components/Select";
import AddSelect from "./components/AddSelect";
import Button from "./components/Button";

const Table = () => {
  const staticOptions = ["Option 1", "Option 2", "Option 3", "Option 4"];
  const [rows, setRows] = useState([
    { id: Date.now(), singleSelect: "", AddSelect: [] },
  ]);
  const [AddSelectOptions, setAddSelectOptions] = useState(staticOptions);

  const addRow = () => {
    setRows([...rows, { id: Date.now(), singleSelect: "", AddSelect: [] }]);
  };

  const updateRow = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addAddSelectOption = (newOption) => {
    if (newOption && !AddSelectOptions.includes(newOption)) {
      setAddSelectOptions([...AddSelectOptions, newOption]);
    }
  };

  return (
    <div className="t-container">
      <div className="t-wrapper">
        {" "}
        <table className="table">
          {" "}
          <thead>
            <tr className="t-head-row">
              {" "}
              <th className="t-head column-one">Column 1</th>{" "}
              <th className="t-head">Column 2</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const availableSingleSelectOptions = staticOptions.filter(
                (option) =>
                  !rows.some(
                    (r) => r.singleSelect === option && r.id !== row.id
                  )
              );

              return (
                <tr key={row.id} className="t-row">
                  <td className="t-data ">
                    <Select
                      value={row.singleSelect}
                      onChange={(value) =>
                        updateRow(row.id, "singleSelect", value)
                      }
                      options={availableSingleSelectOptions}
                    />
                  </td>
                  <td className="t-data ">
                    <AddSelect
                      selected={row.AddSelect}
                      onChange={(values) =>
                        updateRow(row.id, "AddSelect", values)
                      }
                      options={AddSelectOptions}
                      onAddOption={addAddSelectOption}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="addRow-btn">
        <Button onClick={addRow}>+ Add New Row</Button>
      </div>
    </div>
  );
};

export default Table;
