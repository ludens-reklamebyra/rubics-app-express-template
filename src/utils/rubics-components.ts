/**
 * File used by rubics-components to load data correctly into react hydrate
 */
import { IRubicsComponentProps } from '../../lib/types/rubics-components.js';
import { APP_NAME } from '../../lib/utils/constants.js';

interface ComponentState {
  store: Pick<IRubicsComponentProps, 'pageContext'>;
  props: Omit<IRubicsComponentProps, 'pageContext'>;
  container: HTMLElement;
}

const appName = APP_NAME.replace('-', '_');
const capitalizeAppName = appName.toUpperCase();
export const createComponentConfig = (name: string) =>
  ({
    store: '_STORE',
    props: `__${capitalizeAppName}_${name.toUpperCase()}__`,
    id: `${appName}-${name}`,
  } as { [key: string]: any });

export const getComponentState = (name: string): ComponentState => {
  try {
    const config = createComponentConfig(name);
    return {
      store: window[config.store] as any,
      props: window[config.props] as any,
      container: document.getElementById(config.id)!,
    };
  } catch (e) {
    console.error('Fatal error', e);
    return {
      store: {
        pageContext: {},
      } as any,
      props: {} as any,
      container: document.createElement('div'),
    };
  }
};
