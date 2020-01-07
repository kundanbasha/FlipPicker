import styled from "styled-components";
import Flex from "../../components/Flex";
import device from "../../utils/device";

export const Wrap = styled(Flex)`
  background-color: #141414;
`;

export const MarginWrap = styled(Flex)`
  margin-left: 0.725rem;

  @media ${device.mobileL} {
    margin-left: 1.5rem;
  }
`;
