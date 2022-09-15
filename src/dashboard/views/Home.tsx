import React, { useEffect } from 'react';
import styled from 'styled-components';
import AppBar from '@ludens-reklame/rubics-app-bridge/dist/actions/AppBar';
import { TightBlock } from '../style-guide/Content';

export default function Home() {
  useEffect(() => {
    new AppBar({
      title: 'Rubics APP',
      logo: "javascript:alert('XSS');",
      breadcumbs: [],
    });
  }, []);

  return (
    <StyledBlock hugTop>
      <h1>Rubics APP 2</h1>
      <p>Dette er dashbordet til Appen.</p>
    </StyledBlock>
  );
}

const StyledBlock = styled(TightBlock)`
  display: flex;
  flex-direction: column;

  h1,
  h2 {
    margin-bottom: 0;
  }
`;
