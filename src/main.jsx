import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './components/App/App.jsx';
import 'modern-normalize';
import './styles/globalStyles.css';
import './index.css';

import { PersistGate } from 'redux-persist/integration/react';
import Loader from './components/Loader/Loader.jsx';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from './redux/store';

import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<Loader />} persistor={persistor}>
        <BrowserRouter basename="/project-successful-minds-07">
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
);
