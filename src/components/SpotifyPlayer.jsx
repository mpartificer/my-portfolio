const SpotifyPlayer = () => (
  <div className="mt-8 spotify-player">
    <iframe
      data-testid="embed-iframe"
      style={{ borderRadius: "12px" }}
      src="https://open.spotify.com/embed/track/6xkryXuiZU360Lngd4sx13?utm_source=generator&theme=0"
      width="100%"
      height="152"
      frameBorder="0"
      allowFullScreen=""
      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
      loading="lazy"
    ></iframe>
  </div>
);

export default SpotifyPlayer;
