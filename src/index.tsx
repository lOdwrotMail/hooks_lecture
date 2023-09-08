import { createRoot } from 'react-dom/client';
import { HookApp } from './HookApp';

const root = createRoot(
  document.getElementById('root') as HTMLDivElement,
);

root.render(<>
  <HookApp />
</>);
