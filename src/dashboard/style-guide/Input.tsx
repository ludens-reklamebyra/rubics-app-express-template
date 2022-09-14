import styled from 'styled-components';
import React, { InputHTMLAttributes } from 'react';

const Input = styled.input`
  padding: 0.8em 1.25rem;
  width: 100%;
  border-radius: 4px;
  font-size: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.1);

  &:disabled {
    color: #fff;
  }
`;

export const TwoColumns = styled.div`
  display: flex;
  gap: ${(props) => props.theme.spacing.small};
  margin-top: ${(props) => props.theme.spacing.xs};
  > * {
    width: 100%;
  }
`;

export const LabelInput = ({
  children,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => (
  <label htmlFor={props.id}>
    {children}
    <Input id={props.id} name={props.id} {...props} />
  </label>
);

export default Input;
