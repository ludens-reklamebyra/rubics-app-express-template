import React, { useEffect } from 'react';
import styled from 'styled-components';
import AppBar from '@ludens-reklame/rubics-app-bridge/dist/actions/AppBar';
import { TightBlock } from '../style-guide/Content';

export default function Home() {
  useEffect(() => {
    new AppBar({
      title: 'Teamtailor',
      logo: "javascript:alert('XSS');",
      breadcumbs: [],
    });
  }, []);

  return (
    <StyledBlock hugTop>
      <h1>Teamtailor</h1>
      <p>
        Teamtailor brukes i sammarbeid med Rubics til å vise aktive jobber og
        tilknytte sider.
      </p>
      <h2>Filtre</h2>
      <p>Skjul/vis filtre som vises ut mot kunde</p>
      <h2>Jobber</h2>
      <p>
        Søk opp jobber i Teamtailor og tilknytt en rubicsside for å overstyre
        link på kort
      </p>
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
