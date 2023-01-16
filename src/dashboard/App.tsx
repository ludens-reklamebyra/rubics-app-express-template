import { FC } from 'react';
import { Provider } from '@ludens-reklame/rubics-theme';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Main from '@ludens-reklame/rubics-theme/dist/components/Main';
import Home from './views/Home';
import { ButtonLink } from './components/ButtonLink';

const App: FC = () => {
  return (
    <Provider theme="dark">
      <BrowserRouter>
        <Wrapper>
          <Menu />
          <Routes>
            <Route path="/rubics/dashboard" element={<Home />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </Provider>
  );
};

const Wrapper = styled(Main)`
  display: flex;
  gap: 1rem;
  max-width: 1100px;

  > :first-child {
    flex: 0.2;
  }
  > :last-child {
    flex: 0.8;
  }
`;

const Menu = () => {
  const { pathname } = useLocation();

  const links = [{ href: '/rubics/dashboard', label: 'Hjem' }];

  return (
    <MenuWrapper>
      {links.map((link, i) => (
        <ButtonLink
          key={i}
          href={link.href}
          active={link.href === pathname}
          inverted
        >
          {link.label}
        </ButtonLink>
      ))}
    </MenuWrapper>
  );
};

const MenuWrapper = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default App;
