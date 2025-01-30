import Box from "@component/Box";
import FlexBox from "@component/FlexBox";
import Typography from "@component/Typography";
import { sans } from "@utils/fonts";

const EnquiryMobileCard = ({ item }: { item: any }) => {
  return (
    <Box
      borderRadius={"0.58331rem"}
      width="100%"
      border="1px solid #D8E0E9"
      borderBottom={"none"}
    >
      <FlexBox px="1rem" mt="0.5rem">
        <Typography
          color="#A1A1A1"
          className={sans.className}
          fontSize={"0.9333rem"}
          fontWeight={600}
        >
        Name:
        </Typography>
        <Typography
          color="#A1A1A1"
          ml="0.75rem"
          className={sans.className}
          fontSize={"0.9333rem"}
          fontWeight={600}
        >
          {item.fullName}
        </Typography>
      </FlexBox>

      <FlexBox px="1rem" mt="0.5rem">
        <Typography
          color="#A1A1A1"
          className={sans.className}
          fontSize={"0.9333rem"}
          fontWeight={600}
        >
          Phone:
        </Typography>
        <Typography
          color="#A1A1A1"
          ml="0.75rem"
          className={sans.className}
          fontSize={"0.9333rem"}
          fontWeight={600}
        >
          {item.phone}
        </Typography>
      </FlexBox>

      <FlexBox px="1rem" mt="0.5rem">
        <Typography
          color="#A1A1A1"
          className={sans.className}
          fontSize={"0.9333rem"}
          fontWeight={600}
        >
          Email:
        </Typography>
        <Typography
          color="#A1A1A1"
          ml="0.75rem"
          className={sans.className}
          fontSize={"0.9333rem"}
          fontWeight={600}
        >
          {item.email}
        </Typography>
      </FlexBox>

      <FlexBox px="1rem" mt="0.5rem">
        <Typography
          color="#A1A1A1"
          className={sans.className}
          fontSize={"0.9333rem"}
          fontWeight={600}
        >
          Message:
        </Typography>
        <Typography
          color="#A1A1A1"
          ml="0.75rem"
          fontSize={"0.9333rem"}
          fontWeight={600}
        >
          {`${item.genFive}`}
        </Typography>
      </FlexBox>

      <FlexBox>
        <Box
          mt="0.5rem"
          padding="0.25rem"
          borderRadius={" 0rem 0rem 0rem 0.58331rem"}
          border="1px solid #D8E0E9"
          borderLeft={"none"}
          width="50%"
        >
          
        </Box>
        <Box
          mt="0.5rem"
          padding="0.25rem"
          borderRadius={" 0rem 0rem 0.58331rem 0rem"}
          border="1px solid #D8E0E9"
          borderLeft="none"
          borderRight="none"
          width="50%"
        >
          
        </Box>
      </FlexBox>
    </Box>
  );
};

export default EnquiryMobileCard;
