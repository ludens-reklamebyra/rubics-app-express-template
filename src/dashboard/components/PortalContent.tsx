import React, { FormHTMLAttributes, MouseEventHandler } from 'react';
import styled from 'styled-components';
import { Button } from '@ludens-reklame/rubics-theme/dist/components/Button';
import {
  Card,
  CardActions,
} from '@ludens-reklame/rubics-theme/dist/components/Card';

interface NewServiceProps extends FormHTMLAttributes<HTMLFormElement> {
  onClose: MouseEventHandler;
  actionLabel?: string;
}

export default function PortalContent({
  onClose,
  children,
  actionLabel = 'Lagre',
  ...formProps
}: NewServiceProps) {
  return (
    <>
      <Backdrop onClick={onClose} />
      <StyledPortalForm
        method="post"
        encType="multipart/form-data"
        {...formProps}
      >
        <Card style={{ padding: '1rem' }}>
          {children}
          <Actions>
            <Button alternate type="button" onClick={onClose}>
              Lukk
            </Button>
            <Button type="submit">{actionLabel}</Button>
          </Actions>
        </Card>
      </StyledPortalForm>
    </>
  );
}

const StyledPortalForm = styled.form`
  position: fixed;
  top: 50%;
  left: 50%;
  height: 100%;
  min-height: 400px;
  overflow: auto;
  width: 100%;
  max-width: 400px;
  background: inherit;
  transform: translate3d(-50%, -50%, 0);
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: black;
  opacity: 0.7;
`;

const Actions = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;
