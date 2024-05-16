import { useEffect, useState } from 'react';
import madina from '../assets/madina.jpg';
import makkah from '../assets/makkah.jpg';
import { Link } from 'react-router-dom';

const Surahs = () => {
  const [surahs, setSurahs] = useState([]);
  const [sortOrder, setSortOrder] = useState('default'); // State to manage sort order
  const [sortDirection, setSortDirection] = useState('asc'); // State to manage sort direction

  useEffect(() => {
    const getSurahs = async () => {
      const gettingSurahs = await fetch(
        'https://api.quran.com/api/v4/chapters',
      );
      const recivedSurahs = await gettingSurahs.json();
      setSurahs(recivedSurahs.chapters);
    };
    getSurahs();
  }, []);

  // Function to sort Surahs by revelation order
  const sortSurahs = (surahs, order, direction) => {
    const sortedSurahs = [...surahs];
    sortedSurahs.sort((a, b) => {
      const compareValue =
        order === 'revelation'
          ? a.revelation_order - b.revelation_order
          : a.id - b.id;
      return direction === 'asc' ? compareValue : -compareValue;
    });
    return sortedSurahs;
  };

  // Get the sorted surahs based on the selected sort order and direction
  const sortedSurahs = sortSurahs(surahs, sortOrder, sortDirection);

  return (
    <div className="flex flex-col items-center p-4 md:p-10 lg:px-32">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-4xl mb-4">
        <div className="flex flex-col md:flex-row gap-4 mb-2 md:mb-0">
          <button
            className="bg-violet-700 hover:bg-violet-900 transition-colors text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              setSortOrder(sortOrder === 'default' ? 'revelation' : 'default')
            }
          >
            Sort by{' '}
            {sortOrder === 'default'
              ? 'Tanzil Arrangement'
              : 'Mushaf Arrangement'}
          </button>
          <button
            className="bg-emerald-700 hover:bg-emerald-900 transition-colors text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
            }
          >
            {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
          </button>
        </div>
        <h1 className="text-2xl font-bold">Surahs</h1>
      </div>
      <div className="grid grid-cols-1 w-full md:grid-cols-2 lg:grid-cols-3 gap-6 p-3">
        {sortedSurahs.map(detail => (
          <Link
            to={`/${detail.id}`}
            className={`relative outline outline-1 ${
              detail.revelation_place === 'makkah'
                ? 'outline-green-500 shadow-white bg-green-950/20'
                : 'outline-white shadow-green-500 bg-emerald-950/20'
            } px-6 py-4 rounded-md shadow-md`}
            key={detail.id}
          >
            {detail.revelation_place === 'makkah' ? (
              <div className="absolute inset-0">
                <div className="opacity-0 hover:opacity-10 absolute inset-0 transition-opacity">
                  <img
                    src={madina}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0">
                <div className="opacity-0 hover:opacity-10 absolute inset-0 transition-opacity">
                  <img
                    src={makkah}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
            <div className="top-0 left-0 rounded-tl-md bg-green-900 absolute text-center text-sm font-extrabold py-[1px] px-[3px]">
              {detail.id}
            </div>
            <div className="flex justify-between items-center ml-2">
              <span>
                <h3 className="font-semibold">{detail.name_simple}</h3>
                <p className="text-sm font-light">
                  {detail.verses_count} Ayahs
                </p>
              </span>
              <span className="text-end">
                <h1 className="font-bold">{detail.name_arabic}</h1>
                <p className="text-sm font-light">
                  {detail.translated_name.name}
                </p>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Surahs;
