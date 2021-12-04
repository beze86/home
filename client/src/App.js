import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';

import { Home } from './modules/main/ui/home/Home';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
};

export const App = () => {
  return (
    <>
      <Routing />
    </>
  );
};

export default App;
