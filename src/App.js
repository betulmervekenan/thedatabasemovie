import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import HomePage from "./pages/HomePage/HomePage";
import DetailPage from "./pages/DetailPage/DetailPage";

function App() {
  return (
    <div className="App">
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 25, height: 50, background: 'red', color: '#fff', fontSize: 22 }}><a href="/" style={{ textDecoration: 'none', color: '#fff' }}>The Movie Database</a></div>
      <Router>
        <Routes>
          <Route path="/" index element={<HomePage />} />
          <Route path="/movie/:movieId" element={<DetailPage />} />
        </Routes>
      </Router>
      <div style={{ display: 'flex', alignItems: 'center', paddingLeft: 25, height: 50, background: 'red', color: '#fff', fontSize: 12, marginTop: 20 }}>&#169; All Rights Reserved.</div>
    </div>
  );
}

export default App;
