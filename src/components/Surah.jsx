import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Ayahs from './Ayahs';

const Surah = () => {
  const { id } = useParams();
  const [surah, setSurah] = useState({});

  const getSurah = async () => {
    try {
      const gettingSurah = await fetch(
        `https://api.quran.com/api/v4/chapters/${id}`,
      );
      const recivedSurah = await gettingSurah.json();
      setSurah(recivedSurah.chapter);
    } catch (error) {
      console.error('Error fetching Surah:', error);
    }
  };

  useEffect(() => {
    getSurah();
  }, [id]);

  return (
    <div className="flex flex-col lg:flex-row">
      <div className="w-full lg:w-1/4 bg-gray-200/10 p-10 overflow-y-auto">
        <div className="lg:fixed lg:h-screen">
          <div className="flex flex-col gap-1 mb-4 text-gray-60 text-sm">
            <h2 className="text-3xl font-semibold mb-2">{surah.name_arabic}</h2>
            <h3>{surah.verse_count}</h3>
            <h4>Revelation Place - {surah.revelation_place}</h4>
            <h4>Total Verses - {surah.verses_count}</h4>
          </div>

          <div className="flex gap-4 items-center">
            <Link
              className="bg-red-800 hover:bg-red-950 transition-colors text-sm text-gray-400 px-2 py-1 rounded-md"
              to="/"
            >
              Go Back
            </Link>
            <Link
              className="bg-blue-800 hover:bg-blue-950 transition-colors text-sm text-gray-400 px-2 py-1 rounded-md"
              to={`/about-this-surah/${id}`}
            >
              About this Surah
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/4">
        <Ayahs
          chapter_number={id}
          onSurahSelect={surahName => setSurah({ ...surah, name: surahName })}
        />
      </div>
    </div>
  );
};

export default Surah;
