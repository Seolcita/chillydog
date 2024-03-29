import styled from 'styled-components';
import ColorMap from '../../../styles/Color';
import { device } from '../../../styles/Breakpoints';

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 2rem;

  @media ${device.xs} {
    padding: 0;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
  width: 100%;
  padding: 0.7rem 2rem;
  background-color: ${ColorMap['grey'].extraLight}80;

  &:hover {
    background-color: ${ColorMap['grey'].extraLight};
  }
`;

export const Texts = styled.div`
  flex-grow: 1;
`;

export const EditIconButton = styled.button`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  transition: color 0.4s ease-in-out;
  margin-left: 4rem;
  border-radius: 50%;

  &:hover {
    background-color: ${ColorMap['grey'].light};
  }

  &:active,
  &:focus {
    background-color: ${ColorMap['grey'].main};
    color: ${ColorMap['grey'].extraLight};
  }
`;

export const AvatarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: center;
`;

export const ChangeAvatarButton = styled(EditIconButton)`
  margin-left: 1rem;
  margin-bottom: 2.5rem;
  border-radius: 50%;
  background-color: ${ColorMap['grey'].extraLight};
`;
