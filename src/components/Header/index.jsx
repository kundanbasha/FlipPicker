import React from "react";
import styled from "styled-components";

import Flex from "../Flex";
import StyledTitle from "../Title";
import device from "../../utils/device";

const Wrap = styled(Flex)`
  background: #242424;
  height: 64px;
  margin-bottom: 12px;
  align-items: center;
  width: 100%;
`;

const Title = styled(StyledTitle)`
  font-size: 1.5rem;
  padding-left: 1.25rem;
  color: #fff;

  @media ${device.mobileL} {
    padding-left: 1.85rem;
  }
`;

const Header = () => (
  <Wrap>
    <Title>Flick Picker</Title>
  </Wrap>
);

export default Header;
