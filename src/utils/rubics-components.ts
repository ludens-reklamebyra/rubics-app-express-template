import type { IRubicsComponentProps } from '../../lib/types/rubics-components.js';
import { createComponentConfig } from '../../lib/utils/rubics-components.js';

/**
 * File used by rubics-components to load data correctly into react hydrate
 */

export interface IRubicsComponentState {
  store: Pick<IRubicsComponentProps, 'pageContext'>;
  props: Omit<IRubicsComponentProps, 'pageContext'>;
  container: HTMLElement;
}

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
