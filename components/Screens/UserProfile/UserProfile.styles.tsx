import styled from 'styled-components';
import ColorMap from '../../../styles/Color';
import { Center } from '../../common-styles';
import { CloseButton } from '../../CloseButton/CloseButton';

export const ProfileContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 2rem;
  max-width: 34rem;
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  margin: 1rem 0 0;
`;

export const DogContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
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

export const UserDetail = styled(Center)`
  justify-content: start;
  margin-top: 1rem;
  width: 100%;
  padding: 1rem 3rem;
  background-color: ${ColorMap['grey'].extraLight}80;
  border-radius: 0.5rem;
`;

export const Texts = styled.div`
  flex-grow: 1;
`;

export const Button = styled.button`
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background-color: transparent;
  transition: color 0.4s ease-in-out;
  margin-left: 1rem;
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

export const CardCloseButton = styled(CloseButton)``;

export const ModalContent = styled(Center)`
  padding: 0 1.5rem;
  flex-direction: column;
  height: 16rem;
`;

export const ButtonContainer = styled(Center)`
  width: 100%;
  gap: 1rem;
  margin-top: 4rem;
`;
