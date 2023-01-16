import ReactDOM from 'react-dom';
import Bridge from '@ludens-reklame/rubics-app-bridge';
import Theme from '@ludens-reklame/rubics-app-bridge/dist/actions/Theme';
import { Theme as ThemeType } from '@ludens-reklame/rubics-app-bridge/dist/util/constants';
import App from './App';

new Bridge({
  // @ts-ignore
  origin: window['store']['origin'] || 'localhost',
});

Theme.toggle(ThemeType.Dark);

ReactDOM.render(<App />, document.getElementById('root'));
