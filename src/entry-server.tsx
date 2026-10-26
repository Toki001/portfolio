import { renderToString } from 'react-dom/server';
import App from './App';
export { siteConfig } from './config/site';
export function render(pathname = "/") {
  return renderToString(<App pathname={pathname} />);
}
