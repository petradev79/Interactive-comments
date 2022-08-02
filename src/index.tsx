import ReactDOM from 'react-dom/client';
import App from './App';
import { StateContextProvider } from './context/StateContext';
import './style/main.scss';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <StateContextProvider>
    <App />
  </StateContextProvider>
);
