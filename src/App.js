import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Routes from './routes'
import AuthProvider from './contexts/auth';
import PropostaProvider from './contexts/proposta';

function App() {
  return (
    <AuthProvider>
      <PropostaProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </PropostaProvider>
    </AuthProvider>
  );
}

export default App;
