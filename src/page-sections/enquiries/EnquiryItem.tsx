"use client";
import TableRow from "@component/TableRow";
import Typography from "@component/Typography";
import LinesEllipsis from "react-lines-ellipsis";

const EnquiryItem = ({ item }: { item: any }) => {
  return (
    <TableRow my="1rem" padding="6px 18px" key={item.id}>
      <Typography className="pre" textAlign="left">
        {item.fullName}
      </Typography>

      <Typography className="pre" textAlign="left">
        {item.phone}
        <br />
        {item.email}
      </Typography>

      <Typography textAlign="left" py={2}>
      <LinesEllipsis
          text={item.genFive}
          maxLine="1"
          ellipsis="...Read More"
          trimRight
          basedOn="letters"
        />
      </Typography>
    </TableRow>
  );
};

export default EnquiryItem;
