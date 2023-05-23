import { Routes, Route } from 'react-router-dom';

import Welcome from 'components/Welcome/Welcome';
import Message from 'components/Message/Message';

function App() {
  return (
    <main className="app">
      <Routes>
        <Route path='/' element={<Welcome />} />
        <Route path='/message' element={<Message />} />
      </Routes>
    </main>
  );
}

export default App;
