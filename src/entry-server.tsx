import { renderToString } from 'react-dom/server';
import App from './App';
export { siteConfig } from './config/site';
export function render() {
  return renderToString(<App />);
}
