import { useEffect, useState } from "react";
import "./App.css";
import Counter from "./components/Counter";
import Photo from "./components/Photo";
import Album from "./components/Album";

function App() {
  const [count, setCount] = useState(0);
  const [photos, setPhotos] = useState([]);
  const [albumId, setAlbumId] = useState();

  const fetchPhotos = async () => {
    try {
      const url = "https://jsonplaceholder.typicode.com/albums/1/photos";
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        const updatedPhotos = data.map((photo) => ({
          ...photo,
          thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`,
        }));
        setPhotos(updatedPhotos);
      }
    } catch (error) {
      console.error("Erro ao buscar fotos", error);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <>
      {/* <Counter title="Contando..." />
      <Counter initial={100} />
      <article>
        <h1>Album da API</h1>
        {photos.map((photo) => (
          // <article key={photo.id}>
          //   <h2>
          //     ID #{photo.id} {photo.title}
          //   </h2>
          //   <img src={photo.thumbnailUrl} alt={photo.title} />
          // </article>
          <Photo photo={photo} />
        ))}
      </article> */}
      <div>
        <button onClick={() => setAlbumId(1)}>Album #1</button>
        <button onClick={() => setAlbumId(2)}>Album #2</button>
        <button onClick={() => setAlbumId(3)}>Album #3</button>
        <button onClick={() => setAlbumId(4)}>Album #4</button>
      </div>

      <Album albumId={albumId} />
    </>
  );
}

export default App;
