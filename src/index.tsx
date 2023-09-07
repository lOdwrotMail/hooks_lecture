import { createRoot } from 'react-dom/client';
import { App } from './App';
import { HookApp } from './HookApp';

const root = createRoot(
  document.getElementById('root') as HTMLDivElement,
);

root.render(<>
  <App />
  <HookApp />
</>);
