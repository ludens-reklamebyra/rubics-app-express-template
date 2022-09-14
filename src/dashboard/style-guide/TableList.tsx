import React, { HTMLAttributes } from 'react';
import styled from 'styled-components';
import {
  Table,
  TdProps,
  Th,
  Td,
  Tr,
} from '@ludens-reklame/rubics-theme/dist/components/Table';
import { Card } from '@ludens-reklame/rubics-theme/dist/components/Card';

export { Td, Tr };

export interface TableListTh extends TdProps {
  label: string;
  width?: number;
  flex?: number;
}

interface TableListProps extends HTMLAttributes<HTMLDivElement> {
  ths: TableListTh[];
  children: any[];
}

export default function TableList({ ths, children, ...rest }: TableListProps) {
  return (
    <Card {...rest}>
      <StyledTable>
        <thead>
          <Tr>
            {ths.map((column, i) => (
              <Th key={String(i)} {...column}>
                {column.label}
              </Th>
            ))}
          </Tr>
        </thead>
        <tbody>{children}</tbody>
      </StyledTable>
    </Card>
  );
}

const StyledTable = styled(Table)`
  table-layout: fixed;
  td {
    vertical-align: middle;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export const TableListAlignCenterTr = styled(Tr)``;
export const TableListActionsTd = styled(Td)`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`;
