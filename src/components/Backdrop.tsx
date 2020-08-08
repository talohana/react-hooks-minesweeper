import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
`;

const Backdrop = ({ children }: Props) => {
  return <Wrapper>{children}</Wrapper>;
};

export default Backdrop;
