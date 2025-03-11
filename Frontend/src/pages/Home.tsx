const Home: React.FC = () => {
  return (
    <div className="home">
      <div className="Titulo">
        <h1>Cabañas el escondite</h1>
      </div>
      {/* Galería de imágenes */}
      <div className="gallery">
        <img src="/images/cab1.jpg" alt="Imagen 2" />
        <img src="/images/cab2.jpg" alt="Imagen 2" />
        <img src="/images/cab3.jpg" alt="Imagen 3" />
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="social-links">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            Twitter
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
