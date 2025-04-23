import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import store, { persistor } from './store.ts'
import AuthProvider from './features/auth/AuthContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
