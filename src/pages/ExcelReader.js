import React, { useState } from "react";
import CSVReader from "react-csv-reader";
import _ from "lodash";

export default function ExcelReader() {
  const [lasted, setlasted] = useState([]);
  return (
    <div>
      <div>
        <CSVReader
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          onFileLoaded={handleLoad}
        />
      </div>
      <p>{JSON.stringify(lasted)}</p>
    </div>
  );
  async function handleLoad(data, fileInfo) {
    _.drop(data, 2);
    const list = data.map((item, index) => ({
      m3: Number(item[0]),
      kg: Number(item[1]),
      list: [
        {
          cities: ["cdmx", "gda"],
          amount: Number(item[2]),
        },
        {
          cities: ["cdmx", "mty"],
          amount: Number(item[3]),
        },
        {
          cities: ["cdmx", "quer"],
          amount: Number(item[4]),
        },
        {
          cities: ["cdmx", "leon"],
          amount: Number(item[5]),
        },
        {
          cities: ["gda", "mty"],
          amount: Number(item[6]),
        },
        {
          cities: ["gda", "quer"],
          amount: Number(item[7]),
        },
        {
          cities: ["gda", "leon"],
          amount: Number(item[8]),
        },
        {
          cities: ["mty", "quer"],
          amount: Number(item[9]),
        },
        {
          cities: ["mty", "leon"],
          amount: Number(item[10]),
        },
        {
          cities: ["quer", "leon"],
          amount: Number(item[2]),
        },
      ],
    }));
    setlasted(list);
  }
}
