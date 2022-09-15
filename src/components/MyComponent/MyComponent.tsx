import { FC, useContext } from 'react';
import { IRubicsComponentProps } from '../../../lib/types/rubics-components.js';
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
      Simple component from site {props.config.site} as
    </div>
  );
}

export default MyComponent;
