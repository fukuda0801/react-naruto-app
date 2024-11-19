import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  // キャラクター情報を格納
  const [characters, setCharacters] = useState([]);
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
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
            </div>
          </main>
        )}
      </div>
    </>
  );
}

export default App;
