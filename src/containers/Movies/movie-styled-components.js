import styled from "styled-components";
import Flex from "../../components/Flex";
import StyledTitle from "../../components/Title";

export const Wrap = styled(Flex)`
  height: 300px;
  width: 100%;
  display: flex;
  overflow: hidden;
  cursor: pointer;
  trasition: transform 1s ease-out;

  &:hover {
    transform: scale(1.15);
    z-index: 1;
  }
`;

export const PosterWrap = styled(Flex)`
  height: 230px;
`;

export const Poster = styled.img`
  height: 100%;
  width: 100%;
`;

export const Details = styled(Flex)`
  align-items: flex-start;
  height: 70px;
`;

export const Title = styled(StyledTitle)`
  font-size: 0.8rem;
  font-weight: 600;
  text-align: left;
  color: white;
  line-height: 1.5;
`;

export const ReleaseDate = styled.p`
  font-size: 0.725rem;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.5;
`;
