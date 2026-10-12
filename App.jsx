import React, { useState } from 'react';
import './App.css';

const initialVideos = [
  { id: '1', youtubeId: 'XSEyhGFc8rA', title: 'TOP 100 MOST VIRAL PHONK/FUNK 2026', channel: 'Phonk/Funk Music', views: '4.2M marta', time: '2 kun oldin', category: 'Rap', duration: '2:47:08', image: 'https://youtube.com' },
  { id: '2', youtubeId: '1k8craCGpgs', title: 'The Weeknd - Blinding Lights', channel: 'The Weeknd', views: '1.2M marta', time: '5 kun oldin', category: 'Pop', duration: '3:21', image: 'https://youtube.com' },
  { id: '3', youtubeId: 'xFYQQPAOz7Y', title: 'Eminem - Lose Yourself', channel: 'Shady Records', views: '890K marta', time: '5 hafta oldin', category: 'Rap', duration: '5:24', image: 'https://youtube.com' },
  { id: '4', youtubeId: 'eVTXPUF4Oz4', title: 'Linkin Park - In The End', channel: 'Rock Zone', views: '310K marta', time: '12 soat oldin', category: 'Rock', duration: '3:36', image: 'https://youtube.com' },
  { id: '5', youtubeId: 'jfKfPfyJRdk', title: 'Lofi Hip Hop Radio 📚 Beats to Relax', channel: 'Chillhop Music', views: '1.5M marta', time: '1 oy oldin', category: 'Relax', duration: '4:00', image: 'https://youtube.com' },
  { id: '6', youtubeId: 'dvgZkm1xWPE', title: 'Coldplay - Viva La Vida', channel: 'Coldplay', views: '2.1M marta', time: 'Kecha', category: 'Live', duration: '4:42', image: 'https://youtube.com' }
];

const categories = ['Musiqa - Barchasi', 'Pop', 'Rap', 'Rock', 'Relax', 'Live'];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [currentVideoId, setCurrentVideoId] = useState('1'); 
  const [activeCategory, setActiveCategory] = useState('Musiqa - Barchasi');
  const [searchUrl, setSearchUrl] = useState('');
  const [musicVideos, setMusicVideos] = useState(initialVideos);

  const getYouTubeId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match.length === 11) ? match : null;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchUrl.trim()) return;

    const videoId = getYouTubeId(searchUrl) || (searchUrl.trim().length === 11 ? searchUrl.trim() : null);

    if (videoId) {
      const exists = musicVideos.find(v => v.youtubeId === videoId);
      if (!exists) {
        const newId = (musicVideos.length + 1).toString();
        const newVideo = {
          id: newId,
          youtubeId: videoId,
          title: 'Internetdan havola orqali yuklangan video',
          channel: 'YouTube Video',
          views: '1 marta',
          time: 'Hozir',
          category: 'Musiqa - Barchasi',
          duration: 'Video',
          image: `https://youtube.com{videoId}/mqdefault.jpg`
        };
        setMusicVideos([...musicVideos, newVideo]);
        setCurrentVideoId(newId);
      } else {
        setCurrentVideoId(exists.id);
      }
      setCurrentPage('watch');
      setSearchUrl('');
    } else {
      alert("Noto'g'ri YouTube havolasi kiritildi!");
    }
  };

  const openVideo = (id) => {
    setCurrentVideoId(id);
    setCurrentPage('watch');
  };

  const selectedVideo = musicVideos.find(v => v.id === currentVideoId) || musicVideos;
  const filteredVideos = activeCategory === 'Musiqa - Barchasi'
    ? musicVideos
    : musicVideos.filter(v => v.category === activeCategory);

  return (
    <div className="box0" id="step0">
      <header className="box1" id="step1">
        <div onClick={() => setCurrentPage('home')} className="box2" id="step2" style={{ cursor: 'pointer' }}>
          <span className="box3">▶</span> YouTube
        </div>
        <form onSubmit={handleSearch} className="box4" id="step3">
          <input 
            type="text" 
            placeholder="YouTube havolasini (link) shu yerga tashlang..." 
            className="box5" 
            value={searchUrl}
            onChange={(e) => setSearchUrl(e.target.value)}
          />
          <button type="submit" className="box6">🔍</button>
        </form>
        <div className="box7" id="step4">M</div>
      </header>

      {currentPage === 'home' && (
        <div className="box21" id="step6">
          <div className="box8" id="step5">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`box9 ${activeCategory === category ? 'box10' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
          
          <main className="box22" id="step7">
            {filteredVideos.map((video) => (
              <div onClick={() => openVideo(video.id)} className="box11" key={video.id} style={{ cursor: 'pointer' }}>
                <div className="box12">
                  <img src={video.image} alt="" className="box13" />
                  <span className="box14">{video.duration}</span>
                </div>
                <div className="box15">
                  <div className="box16"></div>
                  <div className="box17">
                    <h3 className="box18">{video.title}</h3>
                    <p className="box19">{video.channel}</p>
                    <p className="box20">{video.views} • {video.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </main>
        </div>
      )}

      {currentPage === 'watch' && (
        <div className="box24" id="step8">
          <div className="box25" id="step9">
            <div className="box26">
              <iframe
                className="box26-video"
                src={`https://youtube.com{selectedVideo.youtubeId}?autoplay=1&modestbranding=1&rel=0`}
                title={selectedVideo.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <h1 className="box29">{selectedVideo.title}</h1>
            <div className="box30">
              <div className="box31">{selectedVideo.channel}</div>
              <div className="box32">
                <h3 className="box33">{selectedVideo.channel}</h3>
                <p className="box34">1.2M obunachi</p>
              </div>
              <button className="box35">Obuna bo'lish</button>
            </div>
          </div>

          <div className="box36" id="step10">
            <h2 className="box37">Keyingi musiqalar</h2>
            {musicVideos.filter(v => v.id !== currentVideoId).map(v => (
              <div onClick={() => openVideo(v.id)} key={v.id} className="box38" style={{ cursor: 'pointer' }}>
                <img src={v.image} alt="" className="box39" />
                <div className="box40">
                  <h4 className="box41">{v.title}</h4>
                  <p className="box42">{v.channel}</p>
                  <p className="box43">{v.views}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
