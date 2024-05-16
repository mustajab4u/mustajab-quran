import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Ayahs = ({ chapter_number, onSurahSelect }) => {
  const [ayahs, setAyahs] = useState([]);
  const [surahs, setSurahs] = useState([]);

  // Function to fetch Ayahs based on chapter number
  const getAyahs = async () => {
    try {
      const response = await fetch(
        `https://api.quran.com/api/v4/quran/verses/indopak?chapter_number=${chapter_number}`,
      );
      const data = await response.json();
      setAyahs(data.verses);
    } catch (error) {
      console.error('Error fetching Ayahs:', error);
    }
  };

  // Function to fetch Surahs
  const getSurahs = async () => {
    try {
      const response = await fetch('https://api.quran.com/api/v4/chapters');
      const data = await response.json();
      setSurahs(data.chapters);
    } catch (error) {
      console.error('Error fetching Surahs:', error);
    }
  };

  useEffect(() => {
    getAyahs();
    getSurahs();
  }, [chapter_number]);

  const handleSurahSelect = surahName => {
    onSurahSelect(surahName);
  };

  return (
    <div className="flex">
      <div className="hidden lg:block">
        <div className="w-1/4 p-4 fixed h-full overflow-y-auto ">
          <h2 className="text-lg font-semibold mb-2">Surahs</h2>
          <div>
            {surahs.map(surah => (
              <Link
                key={surah.id}
                to={`/${surah.id}`}
                className="block p-2 rounded-lg hover:bg-gray-200/5 cursor-pointer"
                onClick={() => handleSurahSelect(surah.name_simple)}
              >
                {surah.name_simple}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[66%] ml-auto bg-orange-50 p-4">
        <h2 className="text-lg font-semibold mb-2">Ayahs</h2>
        {ayahs.map(ayah => (
          <div
            key={ayah.id}
            className="p-4 mb-4 bg-orange-100/50 rounded-lg shadow flex justify-between gap-10 text-end"
          >
            <p className="text-gray-800 font-bold mb-2">{ayah.verse_key}</p>
            <p className="text-gray-900 font-bold tracking-wider">{ayah.text_indopak}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ayahs;
