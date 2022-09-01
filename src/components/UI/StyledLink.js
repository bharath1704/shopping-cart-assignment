import { Link } from "react-router-dom";
import styled from 'styled-components'

const StyledLink = styled(Link)`
  color: var(--color, #666);
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: none;
`;

export default StyledLink;