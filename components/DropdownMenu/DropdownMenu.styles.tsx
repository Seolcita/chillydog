import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import ColorMap from '../../styles/Color';

type MenuListContainerProps = {
  $isOpen: boolean;
};

export const ProfileButton = styled.button`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  background-color: transparent;
  border: none;
  border-radius: 50%;
`;

export const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  color: ${ColorMap['white'].main};
  height: 4.5rem;
  width: 4.5rem;
  margin: 0;
  border-radius: 50%;
  transition: all 0.2s ease-in-out;

  &:hover,
  &:focus,
  &:active {
    color: ${ColorMap['primary'].main};
    background-color: ${ColorMap['white'].main};
  }
`;

export const MenuListContainer = styled.ul<MenuListContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 5.5rem;
  width: 23rem;
  z-index: 10;

  padding: 1rem;
  border-radius: 0.4rem;
  box-shadow: 0.2rem 0.2rem 0.6rem #98a2b380;
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translateY(-5%)' : 'translateY(-130%)'};
  transition: all 3s ease;
  background-color: ${() => ColorMap['white'].main};
`;

export const ListItem = styled.li`
  padding: 1rem;
  color: ${ColorMap['primary'].dark};

  &:hover {
    background-color: ${ColorMap['grey'].extraLight};
  }

  &:active {
    background-color: ${ColorMap['grey'].light};
  }
`;

export const ListItemContents = styled.div`
  display: flex;
  align-items: center;
  :first-child {
    margin-right: 1.5rem;
  }
`;
