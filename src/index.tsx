import { createRoot } from 'react-dom/client';
import { MainApp } from './MainApp';
import './index.css';

const rootElement = document.querySelector('#root');
const root = createRoot(rootElement as Element);
root.render(<MainApp />);