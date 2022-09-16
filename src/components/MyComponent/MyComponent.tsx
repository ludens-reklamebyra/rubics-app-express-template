import React, { FC, useContext } from 'react';
import type { IRubicsComponentProps } from '../../../lib/types/rubics-components.js';
import {
  ComponentContext,
  ComponentProvider,
} from './context/ComponentContext.js';

const MyComponent: FC<IRubicsComponentProps> = (props) => {
  return (
    <ComponentProvider value={props}>
      <ComponentItem />
    </ComponentProvider>
  );
};

function ComponentItem() {
  const props = useContext(ComponentContext);
  return (
    <div className="rubics-app-component">
      Simple component from site {props.config.site}
    </div>
  );
}

export default MyComponent;
