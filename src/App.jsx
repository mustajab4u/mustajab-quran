import { Route, Routes } from 'react-router-dom';
import Surahs from './components/Surahs';
import Surah from './components/Surah';
import About_Surah from './components/About_Surah';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Surahs />} />
        <Route path="/:id" element={<Surah />} />
        <Route path="/about-this-surah/:id" element={<About_Surah />} />
      </Routes>
    </div>
  );
};

export default App;
