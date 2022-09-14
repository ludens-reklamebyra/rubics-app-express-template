import React, { FC, useContext } from 'react';
import {
  ComponentContext,
  ComponentProvider,
  IClientContextProps,
} from './context/ComponentContext.js';

const Component: FC<IClientContextProps> = (props) => {
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

export default Component;
