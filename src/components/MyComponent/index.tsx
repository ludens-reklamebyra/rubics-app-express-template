import { hydrate } from 'react-dom';
import { getComponentState } from '../../utils/rubics-components.js';
import MyComponent from './MyComponent.js';

const { container, props, store } = getComponentState('MyComponent');
hydrate(<MyComponent {...props} pageContext={store.pageContext} />, container);
