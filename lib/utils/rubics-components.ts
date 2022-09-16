/**
 * File used by rubics-components to load data correctly into react hydrate
 */
import { APP_NAME } from './constants.js';

export interface IRubicsComponentConfig {
  id: string;
  store: string;
  props: string;
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
