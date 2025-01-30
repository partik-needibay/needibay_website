"use client";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "@context/AppContext";

const useDataFilter = (data, key, value) => {
    const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const filtered = data.filter(item => item[key] === value);
      setFilteredData(filtered);
    }
  }, [data, key, value]);

  return filteredData;
};

export default useDataFilter;
