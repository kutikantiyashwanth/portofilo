import { useState, useEffect, useRef } from 'react';

function useTyping(words, speed = 80, pause = 2000) {
  const [text, setText] = useState('');
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const cur = words[wi];
    const t = setTimeout(() => {
      if (!del) {
        setText(cur.slice(0, ci + 1));
        if (ci + 1 === cur.length) setTimeout(() => setDel(true), pause);
        else setCi(c => c + 1);
      } else {
        setText(cur.slice(0, ci - 1));
        if (ci - 1 === 0) { setDel(false); setWi(i => (i + 1) % words.length); setCi(0); }
        else setCi(c => c - 1);
      }
    }, del ? speed / 2 : speed);
    return () => clearTimeout(t);
  }, [ci, del, wi, words, speed, pause]);
  return text;
}

const ROLES = ['AI & ML Engineer', 'Full Stack Developer', 'GenAI Builder', 'Java Developer'];
const SKILLS = [
  { name: 'Python', level: 88 }, { name: 'JavaScript', level: 85 },
  { name: 'Java', level: 78 }, { name: 'React / Next.js', level: 90 },
  { name: 'LangChain / OpenAI', level: 86 }, { name: 'Node.js', level: 82 },
];
const TOOLS = [
  { name: 'AWS / Docker', level: 76 }, { name: 'MongoDB', level: 80 },
  { name: 'PostgreSQL', level: 80 }, { name: 'Git / GitHub', level: 85 },
  { name: 'Tailwind CSS', level: 92 },
];
const PROJECTS = [
  { title: 'GovAssist – AI Gov Assistant', desc: 'AI-powered platform helping citizens navigate government schemes via conversational AI.', img: '/images/govassist,png.jpeg', link: 'https://govassistant.vercel.app', tags: ['React.js', 'LangChain', 'OpenAI'] },
  { title: 'EAMCET Rank Predictor', desc: 'Predict your rank based on subject marks using historical data and trend analysis.', img: '/images/eamcet.png.png', link: 'https://eamcetrankchecker.vercel.app/', tags: ['React.js', 'Supabase', 'ML'] },
  { title: 'Automated GenAI Reports', desc: 'System converting unstructured data into structured business intelligence reports.', img: '/images/genai-report.png.jpeg', link: 'https://reportgenerator.in/', tags: ['Python', 'GenAI APIs'] },
  { title: 'HM Cart Marketplace', desc: 'Responsive full-stack e-commerce platform with modern UI components.', img: '/images/hmcart.png', link: 'https://kutikantiyashwanth.github.io/hm_cart/', tags: ['React.js', 'JavaScript', 'CSS'] },
];
const PROCESS = [
  { num: '01', icon: '💡', title: 'Ideate', desc: 'Identify problems, brainstorm solutions, validate ideas.' },
  { num: '02', icon: '🎨', title: 'Design', desc: 'Wireframes, UI/UX, scalable architecture planning.' },
  { num: '03', icon: '⚙️', title: 'Develop', desc: 'Build with modern stack, integrate AI/ML capabilities.' },
  { num: '04', icon: '🧪', title: 'Test', desc: 'Rigorous testing, debugging, performance optimization.' },
  { num: '05', icon: '🚀', title: 'Ship', desc: 'Deploy, monitor, iterate on real-world feedback.' },
];
const COLORS = [
  { name: 'cyan',   c1: '#00f5ff', c2: '#7c3aed', c1r: '0,245,255',   c2r: '124,58,237' },
  { name: 'orange', c1: '#ff6b35', c2: '#f59e0b', c1r: '255,107,53',  c2r: '245,158,11' },
  { name: 'green',  c1: '#00ff87', c2: '#0ea5e9', c1r: '0,255,135',   c2r: '14,165,233' },
  { name: 'pink',   c1: '#f0abfc', c2: '#e91e63', c1r: '240,171,252', c2r: '233,30,99' },
  { name: 'gold',   c1: '#fbbf24', c2: '#f97316', c1r: '251,191,36',  c2r: '249,115,22' },
];
const NAV = [
  { id: 'home', label: 'Home' }, { id: 'about', label: 'About' },
  { id: 'process', label: 'Process' }, { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' }, { id: 'contact', label: 'Contact' },
];

export default function App() {
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [themeOpen, setThemeOpen] = useState(false);
  const [color, setColor] = useState(COLORS[0]);
  const role = useTyping(ROLES);
  const refs = useRef([]);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 2700); return () => clearTimeout(t); }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--c1', color.c1);
    document.documentElement.style.setProperty('--c2', color.c2);
    document.documentElement.style.setProperty('--c1r', color.c1r);
    document.documentElement.style.setProperty('--c2r', color.c2r);
  }, [color]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1 }
    );
    refs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [loading]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      es => es.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.4 }
    );
    NAV.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [loading]);

  const ref = el => { if (el && !refs.current.includes(el)) refs.current.push(el); };

  const icons = {
    home:    <svg width="17" height="17" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>,
    about:   <svg width="17" height="17" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>,
    process: <svg width="17" height="17" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/></svg>,
    skills:  <svg width="17" height="17" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/></svg>,
    projects:<svg width="17" height="17" fill="currentColor" viewBox="0 0 20 20"><path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/></svg>,
    contact: <svg width="17" height="17" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg>,
  };

  return (
    <>
      {/* LOADER */}
      {loading && (
        <div className="loader">
          <div className="loader-ring">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(0,245,255,0.08)" strokeWidth="2"/>
              <circle cx="40" cy="40" r="34" fill="none" stroke="url(#lg)" strokeWidth="2" strokeLinecap="round" strokeDasharray="60 154"/>
              <defs><linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="var(--c1)"/><stop offset="100%" stopColor="var(--c2)"/></linearGradient></defs>
            </svg>
            <div className="loader-ring-text">YK</div>
          </div>
          <div className="loader-name"><span className="g">Yashwanth Kutikanti</span></div>
          <div className="loader-dots"><span/><span/><span/></div>
        </div>
      )}

      {/* MOBILE */}
      <button className="mobile-btn" onClick={() => setMenuOpen(o => !o)}>
        <svg width="15" height="15" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/></svg>
      </button>

      {/* SIDEBAR */}
      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="logo">YK</div>
        <div className="nav-items">
          {NAV.map(({ id, label }) => (
            <a key={id} href={`#${id}`} title={label}
               className={`nav-link ${active === id ? 'active' : ''}`}
               onClick={() => { setActive(id); setMenuOpen(false); }}>
              {icons[id]}
            </a>
          ))}
        </div>
      </aside>

      {/* SETTINGS */}
      <button className="settings-btn" onClick={() => setThemeOpen(o => !o)}>
        <svg width="15" height="15" fill="white" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/></svg>
      </button>

      {/* THEME */}
      <div className="theme-panel" style={{ opacity: themeOpen ? 1 : 0, pointerEvents: themeOpen ? 'auto' : 'none', transform: themeOpen ? 'translateY(0)' : 'translateY(10px)' }}>
        <h4>Accent Color</h4>
        <div className="color-options">
          {COLORS.map(c => (
            <button key={c.name} className={`color-btn ${color.name === c.name ? 'active' : ''}`}
              style={{ background: `linear-gradient(135deg,${c.c1},${c.c2})` }}
              onClick={() => setColor(c)} />
          ))}
        </div>
      </div>

      <main className="main-content">

        {/* HERO */}
        <section id="home" className="hero-section">
          <div className="hero-text">
            <div className="hero-eyebrow"><span className="eyebrow-dot"/>Available for Opportunities</div>
            <h1 className="hero-h1">
              <span className="line1">Yashwanth</span>
              <span className="line2">Kutikanti</span>
            </h1>
            <div className="hero-role">
              <span className="typed">{role}</span>
              <span className="cursor"/>
            </div>
            <p className="hero-desc">Skilled in building intelligent and scalable applications using React, Java, Python, and modern AI frameworks. Passionate about creating AI-powered solutions that simplify public services.</p>
            <div className="hero-btns">
              <a href="#about" className="btn-primary">More About Me</a>
              <a href="/Yashwanth_Kutikanti_Resume.pdf" download className="btn-outline">
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                Download CV
              </a>
            </div>
            <div className="hero-stats">
              {[['7.94','CGPA'],['4+','Projects'],['3+','Certs']].map(([n,l]) => (
                <div key={l}><div className="stat-num">{n}</div><div className="stat-lbl">{l}</div></div>
              ))}
            </div>
          </div>
          <div className="hero-img-wrap">
            <div className="img-glow"/>
            <div className="img-border">
              <div className="img-border-inner"/>
            </div>
            <img src="/images/yash.jpeg" alt="Yashwanth Kutikanti" style={{ position:'relative', zIndex:1 }}/>
            <div className="img-tag img-tag-1">
              <div className="t1">CGPA</div>
              <div className="t2">7.94</div>
            </div>
            <div className="img-tag img-tag-2">
              <div className="t1">Status</div>
              <div className="t2" style={{ fontSize:'0.85rem' }}>Open ✓</div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about">
          <div className="reveal" ref={ref}>
            <div className="sec-label">01 — About</div>
            <h2 className="sec-title">About <span className="hl">Me</span></h2>
            <p className="sec-sub">AI & Full Stack Developer building intelligent, scalable solutions that solve real-world problems.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'1.5rem' }}>
            <div className="card reveal" ref={ref}>
              <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', marginBottom:'1.5rem', color:'white' }}>🎓 Education</h3>
              <div className="timeline-item">
                <h4 style={{ fontWeight:700, marginBottom:'0.2rem', fontSize:'0.95rem' }}>KITS Huzurabad</h4>
                <p style={{ color:'var(--muted)', fontSize:'0.78rem', marginBottom:'0.5rem' }}>B.Tech — AI & Machine Learning</p>
                <p style={{ fontFamily:'Syne,sans-serif', fontSize:'2rem', fontWeight:800, background:'linear-gradient(135deg,var(--c1),var(--c3))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', lineHeight:1 }}>7.94</p>
                <p style={{ fontSize:'0.72rem', color:'#333', marginTop:'0.2rem' }}>CGPA • 2022 – 2027</p>
              </div>
              <div className="timeline-item">
                <h4 style={{ fontWeight:700, marginBottom:'0.2rem', fontSize:'0.95rem' }}>Shivani Jr College</h4>
                <p style={{ color:'var(--muted)', fontSize:'0.78rem', marginBottom:'0.5rem' }}>Intermediate (MPC)</p>
                <p style={{ fontFamily:'Syne,sans-serif', fontSize:'2rem', fontWeight:800, background:'linear-gradient(135deg,var(--c1),var(--c3))', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', lineHeight:1 }}>9.1</p>
                <p style={{ fontSize:'0.72rem', color:'#333', marginTop:'0.2rem' }}>CGPA • 2020 – 2022</p>
              </div>
            </div>
            <div className="card reveal" ref={ref}>
              <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'1rem', marginBottom:'1.5rem', color:'white' }}>🏆 Achievements</h3>
              {[
                { icon:'🔐', t:'Ethical Hacking Virtual Internship', s:'EduSkills / AICTE — Oct–Dec 2025' },
                { icon:'☁️', t:'AWS Academy Data Engineering', s:'10-week intensive training' },
                { icon:'🏆', t:'CODESTORM 2026', s:'National Hackathon Participant' },
              ].map(a => (
                <div key={a.t} style={{ display:'flex', gap:'0.875rem', marginBottom:'1.25rem', alignItems:'flex-start' }}>
                  <span style={{ fontSize:'1.3rem', lineHeight:1, marginTop:'2px' }}>{a.icon}</span>
                  <div>
                    <p style={{ fontWeight:600, fontSize:'0.85rem', marginBottom:'0.15rem', color:'#ddd' }}>{a.t}</p>
                    <p style={{ color:'var(--muted)', fontSize:'0.75rem' }}>{a.s}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process">
          <div className="reveal" ref={ref}>
            <div className="sec-label">02 — Process</div>
            <h2 className="sec-title">How I <span className="hl">Work</span></h2>
            <p className="sec-sub">From idea to shipped product — my proven process for turning concepts into reality.</p>
          </div>
          <div className="process-grid reveal" ref={ref}>
            {PROCESS.map(p => (
              <div key={p.num} className="process-card">
                <div className="p-num">{p.num}</div>
                <div className="p-icon">{p.icon}</div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills">
          <div className="reveal" ref={ref}>
            <div className="sec-label">03 — Skills</div>
            <h2 className="sec-title">My <span className="hl">Skills</span></h2>
          </div>
          <div className="skills-grid reveal" ref={ref} style={{ marginBottom:'3rem' }}>
            {SKILLS.map(s => (
              <div key={s.name} className="skill-item">
                <div className="skill-name"><span>{s.name}</span></div>
                <div className="skill-bar"><div className="skill-fill" style={{ width:`${s.level}%` }}/></div>
              </div>
            ))}
          </div>
          <div className="sec-label reveal" ref={ref}>Tools & Technologies</div>
          <div className="skills-grid reveal" ref={ref} style={{ marginTop:'1rem' }}>
            {TOOLS.map(t => (
              <div key={t.name} className="skill-item">
                <div className="skill-name"><span>{t.name}</span></div>
                <div className="skill-bar"><div className="skill-fill" style={{ width:`${t.level}%` }}/></div>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects">
          <div className="reveal" ref={ref}>
            <div className="sec-label">04 — Work</div>
            <h2 className="sec-title">My <span className="hl">Projects</span></h2>
            <p className="sec-sub">A selection of projects I've built — from AI platforms to full-stack applications.</p>
          </div>
          <div className="projects-grid reveal" ref={ref}>
            {PROJECTS.map(p => (
              <div key={p.title} className="proj-card">
                <div className="proj-img">
                  <img src={p.img} alt={p.title}/>
                  <div className="proj-overlay"><span className="proj-live">↗ Live Demo</span></div>
                </div>
                <div className="proj-body">
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="proj-tags">{p.tags.map(t => <span key={t} className="tag">{t}</span>)}</div>
                  <a href={p.link} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding:'0.55rem 1.2rem', fontSize:'0.8rem' }}>View Project →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact">
          <div className="reveal" ref={ref}>
            <div className="sec-label">05 — Contact</div>
            <h2 className="sec-title">Get In <span className="hl">Touch</span></h2>
            <p className="sec-sub">Open to internships, collaborations, and full-time opportunities.</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(300px,1fr))', gap:'2rem' }}>
            <div className="reveal" ref={ref} style={{ display:'flex', flexDirection:'column', gap:'0.75rem' }}>
              {[
                { icon:'📞', label:'Phone',    value:'+91 9014798201',               href:'tel:9014798201' },
                { icon:'✉️', label:'Email',    value:'kutikantiyashwanth@gmail.com', href:'mailto:kutikantiyashwanth@gmail.com' },
                { icon:'📍', label:'Location', value:'Warangal, Telangana',          href:null },
                { icon:'💼', label:'LinkedIn', value:'kutikanti-yashwanth',          href:'https://www.linkedin.com/in/kutikanti-yashwanth-6bb1bb351' },
              ].map(({ icon, label, value, href }) => (
                <div key={label} className="contact-item">
                  <div className="c-icon">{icon}</div>
                  <div>
                    <div className="c-label">{label}</div>
                    {href
                      ? <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="c-val">{value}</a>
                      : <span className="c-val">{value}</span>}
                  </div>
                </div>
              ))}
              <a href="/Yashwanth_Kutikanti_Resume.pdf" download className="btn-primary" style={{ marginTop:'0.5rem', justifyContent:'center' }}>
                <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                Download Resume
              </a>
            </div>
            <div className="card reveal" ref={ref}>
              <h3 style={{ fontFamily:'Syne,sans-serif', fontWeight:700, fontSize:'0.95rem', marginBottom:'1.5rem', color:'white' }}>Send a Message</h3>
              <form onSubmit={e => e.preventDefault()}>
                <div className="form-group"><label>Name</label><input type="text" placeholder="Your Name"/></div>
                <div className="form-group"><label>Email</label><input type="email" placeholder="Your Email"/></div>
                <div className="form-group"><label>Message</label><textarea placeholder="Your Message"/></div>
                <button type="submit" className="btn-primary" style={{ width:'100%', justifyContent:'center' }}>Send Message</button>
              </form>
            </div>
          </div>
        </section>

      </main>

      <footer>
        <p>© <span className="hl">2026</span> Yashwanth Kutikanti — <span className="hl">AI & Full Stack Developer</span></p>
      </footer>
    </>
  );
}
