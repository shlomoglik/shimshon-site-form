import { initializeApp } from 'firebase/app';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { getFirestore } from "firebase/firestore";
import SiteReport from "./pages/SiteReport"
import ThanksPage from "./pages/ThanksPage"
import Settings from './pages/Settings';
import FbProvider from './state/fbContext';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

function App() {

  return (
    <FbProvider>
      <Router>
        <Routes>
          <Route path="/" element={<SiteReport />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/thanks" element={<ThanksPage />} />
        </Routes>
      </Router>
    </FbProvider>
  )
}

export default App;
