import styled from "styled-components";
import Flex from "../../components/Flex";
import StyledTitle from "../../components/Title";
import StyledPrimaryText from "../../components/PrimaryText";
import device from "../../utils/device";

export const Wrap = styled(Flex)`
  background-color: #141414;
  background-image: url(https://image.tmdb.org/t/p/original${props => props.poster});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: start;
  height: 100vh;
  overflow: auto;
`;

export const Content = styled(Flex)`
  background: rgba(20, 20, 20, 0.8);
  position: absolute;
  padding-top: 3rem;
  padding-right: 1rem;
  height: 100vh;
  overflow: auto;

  @media ${device.mobileL} {
    background: linear-gradient(
      to right,
      #141414 40%,
      rgba(20, 20, 20, 0.9) 76%,
      rgba(20, 20, 20, 0.6) 88%,
      rgba(20, 20, 20, 0)
    );
  }
`;

export const Overview = styled(StyledPrimaryText)`
  max-width: 100%;
  color: #999;
  line-height: 1.5;
  @media ${device.mobileL} {
    max-width: ${window.innerWidth / 2}px;
  }
`;

export const Title = styled(StyledTitle)`
  color: white;
  text-align: left;
  text-transform: uppercase;
  font-size: 2rem;
  margin: 1.5rem 1.5rem 0rem 1.5rem;
`;

export const PrimaryText = styled(StyledPrimaryText)`
  color: ${props => (props.color ? props.color : "#999")};
  font-weight: ${props => (props.weight ? props.weight : "normal")};
  line-height: 1.35;
`;

export const BackButton = styled(Flex)`
  position: absolute;
  align-items: center;
  padding-left: 1.5rem;
  cursor: pointer;
  z-index: 1;
  width: 100%;
  height: 64px;
  background: rgba(20, 20, 20);

  @media ${device.mobileL} {
    background: transparent;
  }
`;

export const Poster = styled(Flex)`
  background-image: url(https://image.tmdb.org/t/p/original${props => props.poster});
  background-repeat: no-repeat;
  background-size: zoom;
  background-position: center;
  height: ${window.innerHeight - 200}px;
`;

export const Row = styled(Flex)`
  margin: 1.5rem 1.5rem 0rem 1.5rem;
  margin-top: ${props => (props.mt ? props.mt : "inherit")};
`;

export const Column = styled(Flex)`
  margin-left: 0rem;

  @media ${device.mobileL} {
    margin-left: ${props => (props.ml ? props.ml + "rem" : "inherit")};
  }
`;

export const MoreInfo = styled(Flex)`
  padding: 1.5rem;
  flex-direction: column;

  @media ${device.mobileL} {
    flex-direction: row;
  }
`;
