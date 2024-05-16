import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import SurahInfoImage from '../assets/surah_info_image.jpg';

const About_Surah = () => {
  let { id } = useParams();
  const [surahInfo, setSurahInfo] = useState({});
  const getSurahInfo = async () => {
    const gettingSurahInfo = await fetch(
      `https://api.quran.com/api/v4/chapters/${id}/info`,
    );
    const recivedSurahInfo = await gettingSurahInfo.json();
    setSurahInfo(recivedSurahInfo.chapter_info);
    console.log(recivedSurahInfo);
  };
  useEffect(() => {
    getSurahInfo();
  }, []);
  return (
    <div className="p-10 relative min-h-screen text-justify">
      <div className="mt-4">
        <div key={surahInfo.chapter_id}>
          <h4 className="mb-2 text-lime-700">{surahInfo.short_text}</h4>
          <h3 className="font-bold text-yellow-600">{surahInfo.source}</h3>
          <div dangerouslySetInnerHTML={{ __html: surahInfo.text }}></div>
        </div>
      </div>

      <div className="absolute inset-0">
        <div className="opacity-10 absolute inset-0 transition-opacity">
          <img
            src={SurahInfoImage}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About_Surah;
