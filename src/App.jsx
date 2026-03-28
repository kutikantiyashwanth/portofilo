import { useState, useEffect } from 'react';

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [themeColor, setThemeColor] = useState('#ff6b35');
  const [themeSwitcherOpen, setThemeSwitcherOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after 2.5 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const colors = [
    { name: 'orange', value: '#ff6b35' },
    { name: 'blue', value: '#6b4ae2ff' },
    { name: 'green', value: '#2ecc71' },
    { name: 'purple', value: '#9b59b6' },
    { name: 'pink', value: '#e91e63' },
  ];

  useEffect(() => {
    document.documentElement.style.setProperty('--primary', themeColor);
  }, [themeColor]);

  const skills = [
    { name: 'Python', level: 88 },
    { name: 'JavaScript', level: 85 },
    { name: 'Java', level: 78 },
    { name: 'React / Next.js', level: 90 },
    { name: 'LangChain / OpenAI', level: 86 },
    { name: 'Node.js', level: 82 },
  ];

  const tools = [
    { name: 'AWS / Docker', level: 76 },
    { name: 'MongoDB', level: 80 },
    { name: 'PostgreSQL', level: 80 },
    { name: 'Git / GitHub', level: 85 },
    { name: 'Tailwind CSS', level: 92 },
  ];

  const projects = [
    {
      title: 'GovAssist – AI Gov Assistant',
      desc: 'AI-powered platform helping citizens navigate government schemes via conversational AI.',
      img: '/images/govassist,png.jpeg',
      link: 'https://govassistant.vercel.app',
      tags: ['React.js', 'LangChain', 'OpenAI'],
    },
    {
      title: 'EAMCET Rank Predictor',
      desc: 'Predict your rank based on subject marks using historical data and trend analysis.',
      img: '/images/eamcet.png.png',
      link: 'https://eamcetrankchecker.vercel.app/',
      tags: ['React.js', 'Supabase', 'ML'],
    },
    {
      title: 'Automated GenAI Reports',
      desc: 'System converting unstructured data into structured business intelligence reports.',
      img: '/images/genai-report.png.jpeg',
      link: 'https://reportgenerator.in/',
      tags: ['Python', 'GenAI APIs'],
    },
    {
      title: 'HM Cart Marketplace',
      desc: 'Responsive full-stack e-commerce platform with modern UI components.',
      img: '/images/hmcart.png',
      link: 'https://kutikantiyashwanth.github.io/hm_cart/',
      tags: ['React.js', 'JavaScript', 'CSS'],
    },
  ];

  return (
    <>
      {/* Loading Screen */}
      {loading && (
        <div className="loader-wrapper">
          <div className="loader-content">
            <h1 className="loader-name">Yashwanth Kutikanti</h1>
            <div className="loader-bar">
              <div className="loader-progress"></div>
            </div>
            <p className="loader-text">Loading Portfolio...</p>
          </div>
        </div>
      )}

      <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
        <svg width="20" height="20" fill="white" viewBox="0 0 20 20">
          <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
        <div className="logo">YK</div>
        <nav>
          <a href="#home" className={`nav-link ${activeSection === 'home' ? 'active' : ''}`} onClick={() => { setActiveSection('home'); setMenuOpen(false); }}>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Home
          </a>
          <a href="#about" className={`nav-link ${activeSection === 'about' ? 'active' : ''}`} onClick={() => { setActiveSection('about'); setMenuOpen(false); }}>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            About
          </a>
          <a href="#skills" className={`nav-link ${activeSection === 'skills' ? 'active' : ''}`} onClick={() => { setActiveSection('skills'); setMenuOpen(false); }}>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
            </svg>
            Skills
          </a>
          <a href="#portfolio" className={`nav-link ${activeSection === 'portfolio' ? 'active' : ''}`} onClick={() => { setActiveSection('portfolio'); setMenuOpen(false); }}>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
            Projects
          </a>
          <a href="#contact" className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`} onClick={() => { setActiveSection('contact'); setMenuOpen(false); }}>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            Contact
          </a>
        </nav>
      </aside>

      <div className="settings-icon" onClick={() => setThemeSwitcherOpen(!themeSwitcherOpen)}>
        <svg width="20" height="20" fill="white" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
        </svg>
      </div>

      <div className={`theme-switcher ${themeSwitcherOpen ? '' : 'hidden'}`} style={{ opacity: themeSwitcherOpen ? 1 : 0, pointerEvents: themeSwitcherOpen ? 'auto' : 'none', transition: 'opacity 0.3s' }}>
        <h4>Theme Colors</h4>
        <div className="color-options">
          {colors.map(color => (
            <button
              key={color.name}
              className={`color-btn ${themeColor === color.value ? 'active' : ''}`}
              style={{ background: color.value }}
              onClick={() => setThemeColor(color.value)}
            />
          ))}
        </div>
      </div>

      <main className="main-content">
        <section id="home" className="hero-section">
          <div className="hero-text">
            <h1>Hello, my name is <span>Yashwanth Kutikanti</span></h1>
            <h2>I'm a <span>AI & Full Stack Developer</span></h2>
            <p>
              AI & Full Stack Developer skilled in building intelligent and scalable applications using React, Java, Python, and modern AI frameworks.
              Passionate about creating AI-powered solutions that simplify public services and automate real-world processes.
            </p>
            <a href="#about" className="btn-primary">More About Me</a>
          </div>
          <div className="hero-image">
            <img src="/images/yash.jpeg" alt="Yashwanth Kutikanti" />
          </div>
        </section>

        <section id="about">
          <h2 className="section-title">About Me</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Education</h3>
              <div className="timeline-item">
                <h4 style={{ fontSize: '1.25rem', fontWeight: '600' }}>KITS Huzurabad</h4>
                <p style={{ color: '#a0a0a0', fontSize: '0.875rem', marginBottom: '0.5rem' }}>B.Tech — AI & Machine Learning</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>7.94 CGPA</p>
                <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>2022 – 2027</p>
              </div>
              <div className="timeline-item">
                <h4 style={{ fontSize: '1.25rem', fontWeight: '600' }}>Shivani Jr College</h4>
                <p style={{ color: '#a0a0a0', fontSize: '0.875rem', marginBottom: '0.5rem' }}>Intermediate (MPC)</p>
                <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)' }}>9.1 CGPA</p>
                <p style={{ fontSize: '0.875rem', color: '#666', marginTop: '0.25rem' }}>2020 – 2022</p>
              </div>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Achievements</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🔐</span>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>Ethical Hacking Virtual Internship</h4>
                    <p style={{ fontSize: '0.875rem', color: '#a0a0a0' }}>EduSkills / AICTE — Oct–Dec 2025</p>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1.5rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>☁️</span>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>AWS Academy Data Engineering</h4>
                    <p style={{ fontSize: '0.875rem', color: '#a0a0a0' }}>10-week intensive training</p>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🏆</span>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '0.25rem' }}>CODESTORM 2026</h4>
                    <p style={{ fontSize: '0.875rem', color: '#a0a0a0' }}>National Hackathon Participant</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section id="process">
          <h2 className="section-title">How I Work</h2>
          <p style={{ color: '#a0a0a0', fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '800px' }}>
            From idea to shipped product — here's my proven process for turning concepts into reality
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div className="process-card">
              <div className="process-number">01</div>
              <div className="process-icon">💡</div>
              <h3>Ideate</h3>
              <p>Identify problems, brainstorm solutions, and validate ideas with research and user feedback.</p>
            </div>
            <div className="process-card">
              <div className="process-number">02</div>
              <div className="process-icon">🎨</div>
              <h3>Design</h3>
              <p>Create wireframes, design UI/UX, and plan the architecture for scalable implementation.</p>
            </div>
            <div className="process-card">
              <div className="process-number">03</div>
              <div className="process-icon">⚙️</div>
              <h3>Develop</h3>
              <p>Build with modern tech stack, write clean code, and integrate AI/ML capabilities.</p>
            </div>
            <div className="process-card">
              <div className="process-number">04</div>
              <div className="process-icon">🧪</div>
              <h3>Test</h3>
              <p>Rigorous testing, debugging, performance optimization, and security checks.</p>
            </div>
            <div className="process-card">
              <div className="process-number">05</div>
              <div className="process-icon">🚀</div>
              <h3>Ship</h3>
              <p>Deploy to production, monitor performance, and iterate based on real-world usage.</p>
            </div>
          </div>
        </section>

        <section id="skills">
          <h2 className="section-title">My Skills</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {skills.map(skill => (
              <div key={skill.name} className="skill-item">
                <div className="skill-name">
                  <span>{skill.name}</span>
                  <span>{skill.level}%</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: `${skill.level}%` }} />
                </div>
              </div>
            ))}
          </div>

          <h2 className="section-title" style={{ marginTop: '3rem' }}>Tools & Technologies</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {tools.map(tool => (
              <div key={tool.name} className="skill-item">
                <div className="skill-name">
                  <span>{tool.name}</span>
                </div>
                <div className="skill-bar">
                  <div className="skill-progress" style={{ width: `${tool.level}%` }} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="portfolio">
          <h2 className="section-title">My Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {projects.map(project => (
              <a key={project.title} href={project.link} target="_blank" rel="noreferrer" className="project-card">
                <img src={project.img} alt={project.title} />
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        <section id="contact">
          <h2 className="section-title">Contact Me</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>Get In Touch</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>📞</span>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#a0a0a0' }}>Phone</p>
                    <a href="tel:9014798201" style={{ fontWeight: '600', color: 'white', textDecoration: 'none' }}>+91 9014798201</a>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>✉️</span>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#a0a0a0' }}>Email</p>
                    <a href="mailto:kutikantiyashwanth@gmail.com" style={{ fontWeight: '600', color: 'white', textDecoration: 'none', wordBreak: 'break-all' }}>kutikantiyashwanth@gmail.com</a>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>📍</span>
                  <div>
                    <p style={{ fontSize: '0.875rem', color: '#a0a0a0' }}>Location</p>
                    <p style={{ fontWeight: '600' }}>Warangal, Telangana</p>
                  </div>
                </div>
                <div style={{ marginTop: '1rem' }}>
                  <a href="/images/yashwanth.pdf" download="Yashwanth_Kutikanti_Resume.pdf" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download Resume
                  </a>
                </div>
              </div>
            </div>

            <div className="card">
              <form>
                <div className="form-group">
                  <label>Name</label>
                  <input type="text" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input type="email" placeholder="Your Email" />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea placeholder="Your Message"></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%' }}>Send Message</button>
              </form>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
