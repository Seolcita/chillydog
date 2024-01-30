import styled from 'styled-components';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';

import ColorMap from '../../styles/Color';

export const AddButton = styled.button`
  background-color: transparent;
  border: none;
  margin: 0;
  padding: 0;
  margin-right: 1.5rem;
  border-radius: 50%;
`;

export const AddIcon = styled(AddCircleRoundedIcon)`
  color: ${ColorMap['white'].main};
  height: 4.5rem;
  width: 4.5rem;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus,
  &:active {
    color: ${ColorMap['primary'].main};
    background-color: ${ColorMap['white'].main};
  }
`;
