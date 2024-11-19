import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // キャラクター情報を格納
  const [characters, setCharacters] = useState([]);
  // ページ番号を格納
  const [page, setPage] = useState(1);
  // ローディング管理
  const [isLoading, setIsLoading] = useState(false);

  const limit = 15;

  // マウント時のみ実行
  useEffect(() => {
    fetchCharacters(page);
  }, []);

  // データ取得処理
  const fetchCharacters = async (page: number) => {
    const apiUrl = 'https://narutodb.xyz/api/character';
    setIsLoading(true);
    const result = await axios.get(apiUrl, {
      params: {
        page,
        limit,
      },
    });
    setCharacters(result.data.characters);
    setIsLoading(false);
  };

  // ページ遷移 次のページ
  const handleNext = async () => {
    const nextPage = page + 1;
    await fetchCharacters(nextPage);
    setPage(nextPage);
  };

  // ページ遷移 前のページ
  const handlePrev = async () => {
    const prevPage = page - 1;
    await fetchCharacters(prevPage);
    setPage(prevPage);
  };

  return (
    <>
      <div className="container">
        <div className="header">
          <div className="header-content">
            <img src="logo.png" alt="logo" className="logo" />
          </div>
        </div>
        {isLoading ? (
          <div>Now Loading</div>
        ) : (
          <main>
            <div className="cards-container">
              {characters.map((character: any) => {
                return (
                  <div className="card" key={character.id}>
                    <img
                      src={character.images[0] ?? 'dummy.png'}
                      alt={`${character.name}の画像`}
                      className="card-image"
                    />
                    <div className="card-content">
                      <h3 className="card-title">{character.name}</h3>
                      <p className="card-description">
                        {character.debut?.appearsIn ?? 'Nothing'}
                      </p>
                      <div className="card-footer">
                        <span className="affiliation">
                          {character.personal?.affiliation ?? 'No affiliation'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="pager">
              <button
                className="prev"
                onClick={handlePrev}
                type="button"
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="page-number">{page}</span>
              <button
                className="next"
                onClick={handleNext}
                type="button"
                disabled={limit > characters.length}
              >
                Next
              </button>
            </div>
          </main>
        )}
      </div>
    </>
  );
}

export default App;
