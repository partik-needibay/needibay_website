"use client";
import { useCallback, useEffect, useState } from "react";
import { useAppContext } from "@context/AppContext";
import api2 from "@utils/__api__/market-1";
import { useSession } from 'next-auth/react'

const useCustomerProfile = (session) => {

    const [customerProfile, setCustomerProfile] = useState({});

    const customer =  api2.getCustomerProfile(session);

    useEffect(() => {
        setCustomerProfile(customer)
    }, [customer]);

    return customerProfile;
;
};

export default useCustomerProfile;
