/**
 * File used by rubics-components to load data correctly into react hydrate
 */
import { IRubicsComponentProps } from '../../lib/types/rubics-components.js';
import { APP_NAME } from '../../lib/utils/constants.js';

export interface IRubicsComponentConfig {
  id: string;
  store: string;
  props: string;
}

export interface IRubicsComponentState {
  store: Pick<IRubicsComponentProps, 'pageContext'>;
  props: Omit<IRubicsComponentProps, 'pageContext'>;
  container: HTMLElement;
}

const appName = APP_NAME.replace('-', '_');
const capitalizeAppName = appName.toUpperCase();
export const createComponentConfig = (
  name: string
): IRubicsComponentConfig => ({
  store: '_STORE',
  props: `__${capitalizeAppName}_${name.toUpperCase()}__`,
  id: `${APP_NAME.toLowerCase()}-${name.toLowerCase()}`,
});

export const getComponentState = (name: string): IRubicsComponentState => {
  try {
    const config = createComponentConfig(name);
    return {
      store: window[config.store as any] as any,
      props: window[config.props as any] as any,
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
