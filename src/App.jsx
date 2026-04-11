import { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('revealed'); observer.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
}

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 2800); return () => clearTimeout(t); }, []);
  useEffect(() => { document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light'); }, [darkMode]);

  useEffect(() => {
    const nav = document.querySelector('.topnav');
    const handleScroll = () => { if (nav) nav.classList.toggle('scrolled', window.scrollY > 50); };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => e.isIntersecting && setActiveSection(e.target.id)),
      { threshold: 0.3 }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, [loading]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useReveal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setFormStatus('sending');
    setTimeout(() => {
      const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      const a = document.createElement('a');
      a.href = `mailto:kutikantiyashwanth@gmail.com?subject=${subject}&body=${body}`;
      a.click();
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus('idle'), 6000);
    }, 1200);
  };

  const skills = [
    { name: 'React / Next.js', level: 90, color: '#61dafb' },
    { name: 'Python', level: 88, color: '#3776ab' },
    { name: 'LangChain / OpenAI', level: 86, color: '#10a37f' },
    { name: 'JavaScript', level: 85, color: '#f7df1e' },
    { name: 'Node.js', level: 82, color: '#68a063' },
    { name: 'Java', level: 78, color: '#f89820' },
  ];

  const tools = [
    { name: 'Tailwind CSS', level: 92, color: '#38bdf8' },
    { name: 'Git / GitHub', level: 85, color: '#f05032' },
    { name: 'MongoDB', level: 80, color: '#47a248' },
    { name: 'PostgreSQL', level: 80, color: '#336791' },
    { name: 'AWS / Docker', level: 76, color: '#ff9900' },
  ];

  const projects = [
    { title: 'GovAssist', subtitle: 'AI Government Assistant', desc: 'AI-powered platform helping citizens navigate government schemes via conversational AI. Built with LangChain and OpenAI.', img: '/images/govassist,png.jpeg', link: 'https://govassistant.vercel.app', tags: ['React.js', 'LangChain', 'OpenAI'], accent: '#7c3aed' },
    { title: 'EAMCET Predictor', subtitle: 'ML Rank Prediction Engine', desc: 'Predict your rank based on subject marks using historical data and ML trend analysis.', img: '/images/eamcet.png.png', link: 'https://eamcetrankchecker.vercel.app/', tags: ['React.js', 'Supabase', 'ML'], accent: '#06b6d4' },
    { title: 'GenAI Reports', subtitle: 'Automated BI Reports', desc: 'System converting unstructured data into structured business intelligence reports using GenAI.', img: '/images/genai-report.png.jpeg', link: 'https://reportgenerator.in/', tags: ['Python', 'GenAI APIs'], accent: '#f59e0b' },
    { title: 'HM Cart', subtitle: 'E-Commerce Marketplace', desc: 'Responsive full-stack e-commerce platform with modern UI, cart management and checkout.', img: '/images/hmcart.png', link: 'https://kutikantiyashwanth.github.io/hm_cart/', tags: ['React.js', 'JavaScript', 'CSS'], accent: '#10b981' },
  ];

  if (loading) {
    return (
      <div className="loader-screen">
        <div className="loader-inner">
          <div className="loader-logo">YK<span className="loader-dot">.</span></div>
          <div className="loader-name">Yashwanth Kutikanti</div>
          <div className="loader-bar-wrap"><div className="loader-bar-fill" /></div>
          <div className="loader-sub">Crafting your experience...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-root">
      <div className="bg-layer">
        <div className="bg-grid" />
        <div className="bg-orb orb-1" />
        <div className="bg-orb orb-2" />
        <div className="bg-orb orb-3" />
      </div>

      {/* Top Navbar */}
      <header className="topnav">
        <div className="topnav-inner">
          <div className="topnav-logo">YK<span className="logo-dot">.</span></div>
          <nav className="topnav-links">
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'process', label: 'Workflow' },
              { id: 'portfolio', label: 'Projects' },
              { id: 'contact', label: 'Contact' },
            ].map(({ id, label }) => (
              <button key={id} className={`topnav-link ${activeSection === id ? 'active' : ''}`} onClick={() => scrollTo(id)}>
                {label}
              </button>
            ))}
          </nav>
          <div className="topnav-actions">
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
              {darkMode ? (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                </svg>
              )}
            </button>
            <a href="/images/yashwanth.pdf" target="_blank" rel="noreferrer" className="topnav-resume">Resume</a>
          </div>
        </div>
      </header>

      <main className="main-wrap">

        {/* HERO */}
        <section id="home" className="hero">
          <div className="hero-left reveal reveal-left">
            <div className="hero-badge"><span className="badge-dot" /> Available for opportunities</div>
            <h1 className="hero-heading">
              Hi, I'm<br />
              <span className="hero-name-grad">Yashwanth</span><br />
              <span className="hero-name-grad">Kutikanti</span>
            </h1>
            <p className="hero-role">AI &amp; Full Stack Developer</p>
            <p className="hero-desc">
              I build intelligent, scalable digital products — from modern web apps to
              AI-powered systems that solve real-world problems with clean code and great UX.
            </p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => scrollTo('portfolio')}>View My Work</button>
              <a href="/images/yashwanth.pdf" target="_blank" rel="noreferrer" className="btn-ghost">Resume</a>
            </div>
            <div className="hero-tech-row">
              {['React', 'Python', 'Node.js', 'AWS', 'LangChain', 'OpenAI'].map(t => (
                <span key={t} className="tech-pill">{t}</span>
              ))}
            </div>
          </div>

          <div className="hero-right reveal reveal-right">
            <div className="profile-wrap">
              <div className="profile-glow" />
              <div className="profile-circle">
                <img src="/images/yash.jpeg" alt="Yashwanth Kutikanti" className="profile-img" />
              </div>
              <div className="float-badge badge-tl"><span className="fb-icon">🚀</span><span>4+ Projects</span></div>
              <div className="float-badge badge-br"><span className="fb-icon">⭐</span><span>7.94 CGPA</span></div>
              <div className="float-badge badge-tr"><span className="fb-icon">🤖</span><span>AI Dev</span></div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="about-section">
          <div className="section-header">
            <span className="section-eyebrow">// about me</span>
            <h2 className="section-title">Who I Am</h2>
          </div>
          <div className="about-grid">
            <div className="about-bio-card glass-card reveal reveal-left">
              <div className="about-avatar-mini">
                <img src="/images/yash.jpeg" alt="Yashwanth" />
                <div className="avatar-status"><span className="status-dot" />Open to work</div>
              </div>
              <div className="about-bio-text">
                <h3>Yashwanth Kutikanti</h3>
                <p className="about-role-tag">AI &amp; Full Stack Developer</p>
                <p>I'm a passionate developer pursuing B.Tech in AI &amp; Machine Learning at KITS Huzurabad. I specialize in building end-to-end intelligent applications — from sleek React frontends to powerful Python AI backends.</p>
                <p>My mission is to bridge the gap between complex AI technology and real-world usability, creating products that are both powerful and intuitive.</p>
                <div className="about-tags">
                  <span>Problem Solver</span><span>AI Enthusiast</span><span>Clean Code</span><span>Open Source</span>
                </div>
              </div>
            </div>

            <div className="about-cards-col reveal reveal-right">
              <div className="glass-card edu-card">
                <div className="card-icon-header"><span className="card-icon">🎓</span><h3>Education</h3></div>
                <div className="edu-item">
                  <div className="edu-dot" />
                  <div>
                    <h4>KITS Huzurabad</h4>
                    <p>B.Tech — AI &amp; Machine Learning</p>
                    <div className="edu-meta"><span className="edu-grade">7.94 CGPA</span><span>2022 – 2027</span></div>
                  </div>
                </div>
                <div className="edu-item">
                  <div className="edu-dot" />
                  <div>
                    <h4>Shivani Jr College</h4>
                    <p>Intermediate (MPC)</p>
                    <div className="edu-meta"><span className="edu-grade">9.1 CGPA</span><span>2020 – 2022</span></div>
                  </div>
                </div>
              </div>

              <div className="glass-card ach-card">
                <div className="card-icon-header"><span className="card-icon">🏆</span><h3>Achievements</h3></div>
                {[
                  { icon: '🔐', title: 'Ethical Hacking Internship', sub: 'EduSkills / AICTE — Oct–Dec 2025' },
                  { icon: '☁️', title: 'AWS Academy Data Engineering', sub: '10-week intensive program' },
                  { icon: '⚡', title: 'CODESTORM 2026', sub: 'National Hackathon Participant' },
                ].map((a, i) => (
                  <div key={i} className="ach-item">
                    <span className="ach-icon">{a.icon}</span>
                    <div><h4>{a.title}</h4><p>{a.sub}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* PROCESS */}
        <section id="process" className="process-section">
          <div className="section-header">
            <span className="section-eyebrow">// workflow</span>
            <h2 className="section-title">How I Turn Ideas Into Shipped Work</h2>
          </div>
          <div className="process-grid">
            {[
              { n: '01', icon: '💡', title: 'Ideate', desc: 'Identify problems, brainstorm solutions, and validate ideas with research and user feedback.' },
              { n: '02', icon: '🎯', title: 'Plan', desc: 'Define architecture, wireframes, and roadmap for scalable and maintainable implementation.' },
              { n: '03', icon: '⚙️', title: 'Build', desc: 'Write clean, maintainable code using modern stacks with AI/ML capabilities integrated.' },
              { n: '04', icon: '🧪', title: 'Test', desc: 'Rigorous testing, debugging, performance tuning, and security hardening.' },
              { n: '05', icon: '🚀', title: 'Ship', desc: 'Deploy to production, monitor metrics, and iterate based on real-world usage data.' },
            ].map((s, i) => (
              <div key={i} className="p-card glass-card reveal reveal-up" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="p-num">{s.n}</div>
                <div className="p-emoji">{s.icon}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="skills-section">
          <div className="section-header">
            <span className="section-eyebrow">// expertise</span>
            <h2 className="section-title">Skills &amp; Tools</h2>
          </div>
          <div className="skills-grid">
            <div className="glass-card reveal reveal-left">
              <h3 className="skills-group-title"><span className="skills-group-dot" style={{ background: '#7c3aed' }} />Core Skills</h3>
              {skills.map(s => (
                <div key={s.name} className="skill-row">
                  <div className="skill-meta"><span>{s.name}</span></div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ width: `${s.level}%`, background: `linear-gradient(90deg, ${s.color}, #7c3aed)` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="glass-card reveal reveal-right">
              <h3 className="skills-group-title"><span className="skills-group-dot" style={{ background: '#06b6d4' }} />Tools &amp; Technologies</h3>
              {tools.map(t => (
                <div key={t.name} className="skill-row">
                  <div className="skill-meta"><span>{t.name}</span></div>
                  <div className="skill-track">
                    <div className="skill-fill" style={{ width: `${t.level}%`, background: `linear-gradient(90deg, ${t.color}, #06b6d4)` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="portfolio" className="projects-section">
          <div className="section-header">
            <span className="section-eyebrow">// featured work</span>
            <h2 className="section-title">Selected Projects</h2>
          </div>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <div key={i} className="proj-card glass-card reveal reveal-up" style={{ transitionDelay: `${i * 0.12}s` }}>
                <div className="proj-img-wrap">
                  <img src={p.img} alt={p.title} />
                  <div className="proj-overlay">
                    <a href={p.link} target="_blank" rel="noreferrer" className="proj-live-btn">View Live</a>
                  </div>
                  <div className="proj-accent-bar" style={{ background: p.accent }} />
                </div>
                <div className="proj-body">
                  <div className="proj-category" style={{ color: p.accent }}>{p.subtitle}</div>
                  <h3 className="proj-title">{p.title}</h3>
                  <p className="proj-desc">{p.desc}</p>
                  <div className="proj-tags">
                    {p.tags.map(t => (
                      <span key={t} className="proj-tag" style={{ borderColor: `${p.accent}40`, color: p.accent, background: `${p.accent}12` }}>{t}</span>
                    ))}
                  </div>
                  <a href={p.link} target="_blank" rel="noreferrer" className="proj-cta" style={{ color: p.accent }}>View Project →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="contact-section">
          <div className="section-header">
            <span className="section-eyebrow">// get in touch</span>
            <h2 className="section-title">Let's Build Together</h2>
            <p className="section-sub">Have a project in mind? Let's talk and make it happen.</p>
          </div>
          <div className="contact-grid">
            <div className="contact-info reveal reveal-left">
              {[
                { icon: '✉️', label: 'Email', value: 'kutikantiyashwanth@gmail.com', href: 'mailto:kutikantiyashwanth@gmail.com' },
                { icon: '📱', label: 'Phone', value: '+91 9014798201', href: 'tel:+919014798201' },
                { icon: '📍', label: 'Location', value: 'Warangal, Telangana, India', href: null },
              ].map((c, i) => (
                <a key={i} href={c.href || '#'} className="contact-card glass-card" style={{ textDecoration: 'none' }}>
                  <div className="contact-icon-wrap">{c.icon}</div>
                  <div><div className="contact-label">{c.label}</div><div className="contact-value">{c.value}</div></div>
                </a>
              ))}
              <a href="/images/yashwanth.pdf" target="_blank" rel="noreferrer" className="btn-primary resume-dl-btn">
                View Resume
              </a>
            </div>

            <div className="contact-form-wrap glass-card reveal reveal-right">
              {formStatus === 'success' ? (
                <div className="form-success">
                  <div className="success-icon">✅</div>
                  <h3>Message Sent!</h3>
                  <p>Your email client opened. Please hit send to reach me at <strong>kutikantiyashwanth@gmail.com</strong></p>
                  <button className="btn-primary" onClick={() => setFormStatus('idle')}>Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <h3 className="form-title">Send a Message</h3>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Your Name</label>
                      <input type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div className="form-field">
                      <label>Your Email</label>
                      <input type="email" placeholder="john@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Message</label>
                    <textarea placeholder="Tell me about your project..." rows="5" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} required />
                  </div>
                  <button type="submit" className="btn-primary form-submit" disabled={formStatus === 'sending'}>
                    {formStatus === 'sending' ? <><span className="spinner" /> Sending...</> : <>Send Message <span>→</span></>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-inner">
            <div className="footer-brand">Yashwanth Kutikanti</div>
            <div className="footer-links">
              <a href="https://github.com/kutikantiyashwanth" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://linkedin.com/in/kutikanti-yashwanth-6bb1bb351" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="mailto:kutikantiyashwanth@gmail.com">Email</a>
            </div>
          </div>
          <div className="footer-copy">Built with React and passion — {new Date().getFullYear()}</div>
        </footer>

      </main>
    </div>
  );
}
