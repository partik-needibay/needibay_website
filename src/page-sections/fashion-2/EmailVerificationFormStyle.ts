import styled from "styled-components";
import Card from "../../components/Card";

export const NbStyledSessionCard = styled(Card)`
  width: 430px;
  overflow: hidden;
  .content {
    padding: 3rem 3.75rem 0px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    // margin-inline: 2rem;
    /* .content {
      padding: 2.rem 2rem 0px;
    } */
  }
`;
export const NbBulkStyledSessionCard = styled(Card)`
  width: 505px;
  overflow: hidden;
  .content {
    padding: 3rem 3.75rem 0px;
  }
  @media screen and (max-width: 500px) {
    width: 100%;
    // margin-inline: 2rem;
    .content {
      padding: 3rem 2.15rem 0px;
    }
  }
`;
