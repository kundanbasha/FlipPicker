import styled from "styled-components";

const StyledTitle = styled.h2`
  font-size: 1rem;
  text-align: center;
  margin-top: ${props => (props.mt ? props.mt + "rem" : "0rem")};
  margin-right: ${props => (props.mr ? props.mr + "rem" : "0rem")};
  margin-bottom: ${props => (props.mb ? props.mb + "rem" : "0rem")};
  margin-left: ${props => (props.ml ? props.ml + "rem" : "0rem")};
  padding-top: ${props => (props.pt ? props.pt + "rem" : "0rem")};
  padding-right: ${props => (props.pr ? props.pr + "rem" : "0rem")};
  padding-bottom: ${props => (props.pb ? props.pb + "rem" : "0rem")};
  padding-left: ${props => (props.pl ? props.pl + "rem" : "0rem")};
`;

export default StyledTitle;
