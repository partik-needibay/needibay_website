"use client";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "@context/AppContext";

const useCurrentLocation = (addressComponent) => {
    const [currentCity, setCurrentCity] = useState("");

  useEffect(() => {
    debugger;
    if (addressComponent && addressComponent.length > 0) {
        addressComponent.map((value, index) => {
            if(value?.types[0] == "administrative_area_level_3"){
                setCurrentCity(value?.short_name);
            }
        })
    }
  }, [addressComponent]);

  return currentCity;
};

export default useCurrentLocation;
