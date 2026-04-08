function ParallaxSection({ title, text, bg }) {
  return (
    <div
      className="parallax"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="overlay">
        <h2>{title}</h2>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default ParallaxSection;