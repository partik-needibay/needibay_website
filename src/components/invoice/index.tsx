"use client";
import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
  Image,
  Svg,
} from "@react-pdf/renderer";
import { format } from "date-fns";

import cityList from "@data/cityList";

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#efefef",
  },
  section: {
    padding: "40px 20px",
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  viewer: {
    width: window.innerWidth, //the pdf viewer will take up all of the width and height
    height: window.innerHeight,
  },
  logoImage: {
    width: 100,
  },
  subheading: {
    fontSize: "12px",
    padding: "2px 0",
    color: "#4c4e6499",
  },
  rowGap: {
    padding: "8px 0",
  },
  devider: {
    width: "100%",
    height: "1px",
    backgroundColor: "#4c4e6499",
  },
  table: {
    padding: "20px 0",
    display: "table",
    width: "100%",
    borderStyle: "solid",
    textAlign: "left",
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
    height:"25px"
  },
  tableCol: {
    width: "20%",
    borderStyle: "solid",
  },
  tableCell: {
    textAlign:"left",
    marginTop: 5,
    fontSize: 10,
  },
  amountWrapper: {
    padding: "0 75px",
  },
});

export const Invoice = ({ data = null }) => (
  <PDFViewer style={styles.viewer}>
    {/* Start of the document*/}
    <Document>
      {/*render a single page*/}
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View>
            <Image
              src={"/assets/images/logos/needibay_logo.png"}
              style={styles.logoImage}
            />
            <Text style={styles.rowGap}></Text>
            <Text style={styles.subheading}>
              7, 1, Middle School Rd, Vishweshwarapura,
            </Text>
            <Text style={styles.subheading}>Basavanagudi</Text>
            <Text style={styles.subheading}>Bengaluru, Karnataka 560004</Text>
            <Text style={styles.subheading}>+91-72599 22444</Text>
          </View>
          <View>
            <Text style={styles.subheading}>
              Order Id: #{data?.incrementId}
            </Text>
            <Text style={styles.subheading}>
              Date Generated:{" "}
              {format(new Date(data?.createdAt), "dd MMM, yyyy")}
            </Text>
          </View>
        </View>
        <View style={styles.devider}></View>
        <View style={styles.section}>
          <View>
            <Text style={styles.subheading}>Customer Details:</Text>
            <Text style={styles.rowGap}></Text>
            <Text style={styles.subheading}>
              Full Name:&emsp;{data?.customerFullName}
            </Text>
            <Text style={styles.subheading}>
              Contact:&emsp;{data?.customerPhone}
            </Text>
            <Text style={styles.subheading}>
              Email:&emsp;{data?.customerEmail}
            </Text>
          </View>
        </View>
        <View style={styles.devider}></View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Item Name</Text>
            </View>
            {/* <View style={styles.tableCol}>
              <Text style={styles.tableCell}>SKU</Text>
            </View> */}
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Unit Price</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>QTY</Text>
            </View>
            <View style={styles.tableCol}>
              <Text style={styles.tableCell}>Row Total</Text>
            </View>
          </View>
          {data?.salesOrderItem.map((item) => {
            return (
              <>
                <View style={styles.devider}></View>
                <View style={styles.tableRow}>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item?.productName}</Text>
                  </View>
                  {/* <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item?.sku}</Text>
                  </View> */}
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item?.price}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item?.qty}</Text>
                  </View>
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{item?.rowTotal}</Text>
                  </View>
                </View>
              </>
            );
          })}
        </View>
        <View style={styles.devider}></View>
        <View style={styles.section}>
          <View></View>
          <View style={styles.amountWrapper}>
            <Text style={styles.subheading}>
              Subtotal: Rs.{data?.subtotal}/-
            </Text>
            {data?.isCouponApplied && (
              <Text style={styles.subheading}>Discount:</Text>
            )}
            <Text style={styles.subheading}>
              Grand Total: Rs.{data?.grandTotal}/-
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  </PDFViewer>
);
