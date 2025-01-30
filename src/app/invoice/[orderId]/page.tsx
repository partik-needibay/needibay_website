import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { PDFViewer } from '@react-pdf/renderer';
import {Invoice} from '@component/invoice/index';
import { useParams } from 'next/navigation'
import { getServerSession } from "next-auth";
import api from "@utils/__api__/orders";

const InvoicePage = async ({ params }: { params: { orderId: string } }) => {
    const session = await getServerSession();
    const order = await api.getOrderByCustomerAndOrderId(
      session,
      String(params.orderId)
    );
    const orderStatus = await api.getOrderStatus();

    console.log(order)
    return (<Invoice data={order}/>) 
};

export default InvoicePage;

