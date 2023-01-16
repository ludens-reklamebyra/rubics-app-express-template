import { ReactNode } from 'react';
import styled from 'styled-components';
import Text from '@ludens-reklame/rubics-theme/dist/components/Text';
import Block from '@ludens-reklame/rubics-theme/dist/components/Block';
import Main from '@ludens-reklame/rubics-theme/dist/components/Main';
import { ButtonLink } from '../components/ButtonLink';

interface Props extends Partial<JSX.ElementChildrenAttribute> {
  title: string;
  href?: string;
  action?: ReactNode;
}

export const TightBlock = styled(Block).attrs((props) => ({
  ...props,
  tight: true,
}))``;

export const EditContent = styled(Main)`
  max-width: 700px;
`;

export function ContentHeader({
  title,
  href = '/',
  children = <div />,
}: Props) {
  return (
    <StyledBlock>
      <>
        <ButtonLink outlined href={href}>
          Tilbake
        </ButtonLink>
        <TextEllipsis element="h1" variant="display2">
          {title}
        </TextEllipsis>
        {children}
      </>
    </StyledBlock>
  );
}

const TextEllipsis = styled(Text)`
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding: 0 ${(props) => props.theme.spacing.small};
`;

const StyledBlock = styled(TightBlock)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
