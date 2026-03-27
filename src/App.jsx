import { useState, useEffect, useRef } from 'react';

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const revealsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.12 });

    revealsRef.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el) => {
    if (el && !revealsRef.current.includes(el)) {
      revealsRef.current.push(el);
    }
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none bg-gradient-to-br from-orange-50/30 via-transparent to-amber-50/20 z-[-1]"></div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-orange-100 px-5 md:px-10 py-4 flex justify-between items-center">
        <div className="text-2xl md:text-3xl font-extrabold text-gray-900">
          YK<span className="text-[var(--primary)]">.</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8 text-sm font-semibold text-gray-700">
          <a href="#about" className="hover:text-[var(--primary)] transition">Profile</a>
          <a href="#projects" className="hover:text-[var(--primary)] transition">Works</a>
          <a href="#skills" className="hover:text-[var(--primary)] transition">Stack</a>
          <a href="#education" className="hover:text-[var(--primary)] transition">Education</a>
          <a href="#achievements" className="hover:text-[var(--primary)] transition">Achievements</a>
          <a href="#contact" className="hover:text-[var(--primary)] transition">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          id="menu-btn" 
          className="md:hidden text-2xl text-gray-800"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <i className="fas fa-bars"></i>
        </button>
      </nav>

      {/* Mobile Menu */}
      <div 
        id="mobile-menu" 
        className={`fixed inset-0 bg-white transform ${isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'} md:hidden z-40 flex flex-col pt-20 px-8 transition-transform duration-400 ease-in-out`}
      >
        <button 
          id="close-btn" 
          className="self-end text-3xl mb-10 text-gray-800"
          onClick={closeMenu}
        >
          <i className="fas fa-times"></i>
        </button>
        <div className="flex flex-col gap-8 text-xl font-semibold text-center">
          <a href="#about" onClick={closeMenu} className="hover:text-[var(--primary)] transition">Profile</a>
          <a href="#projects" onClick={closeMenu} className="hover:text-[var(--primary)] transition">Works</a>
          <a href="#skills" onClick={closeMenu} className="hover:text-[var(--primary)] transition">Stack</a>
          <a href="#education" onClick={closeMenu} className="hover:text-[var(--primary)] transition">Education</a>
          <a href="#achievements" onClick={closeMenu} className="hover:text-[var(--primary)] transition">Achievements</a>
          <a href="#contact" onClick={closeMenu} className="hover:text-[var(--primary)] transition">Contact</a>
        </div>
      </div>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 text-center pt-24 md:pt-0">
        <div className="max-w-5xl animate__animated animate__fadeIn">
          <h1 className="text-5xl md:text-8xl font-black tracking-tight leading-none mb-6 text-gradient">
            Yashwanth<br/>Kutikanti
          </h1>
          <p className="text-lg md:text-2xl text-gray-700 max-w-3xl mx-auto mb-10">
            AI & Full Stack Engineer — Creating intelligent, scalable solutions
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <a href="https://www.linkedin.com/in/kutikanti-yashwanth-6bb1bb351?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" rel="noreferrer"
               className="px-10 py-4 bg-[var(--primary)] text-white font-semibold rounded-xl shadow-lg shadow-orange-200/50 hover:bg-[var(--primary-dark)] hover:shadow-orange-300/60 transition-all transform hover:-translate-y-1">
              LinkedIn Profile
            </a>
            <a href="#projects"
               className="px-10 py-4 card font-semibold text-gray-800 hover:text-[var(--primary)] transition-all transform hover:-translate-y-1">
              View Projects →
            </a>
          </div>
        </div>
      </section>

      <main className="max-w-6xl mx-auto px-6 pb-24 space-y-20 md:space-y-32">

        {/* About */}
        <section id="about" className="reveal" ref={addToRefs}>
          <h2 className="text-sm font-black text-[var(--primary)] uppercase tracking-widest mb-8">01 // Profile</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 order-2 md:order-1">
              <h3 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Intelligent Systems & Automation</h3>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
                3rd-year B.Tech (AI & ML) @ KITS Huzurabad • 7.94 CGPA<br/>
                Passionate about full-stack development and generative AI for real-world automation.
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="pill">Python</span>
                <span className="pill">React / Next.js</span>
                <span className="pill">LangChain</span>
                <span className="pill">AWS</span>
                <span className="pill">Node.js</span>
              </div>
            </div>
            <div className="lg:col-span-5 order-1 md:order-2">
              <div className="card p-3 aspect-square overflow-hidden">
                <img src="/images/yash.jpeg" className="w-full h-full object-cover rounded-2xl hover:scale-105 transition-transform duration-700" alt="Yashwanth Kutikanti" />
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="reveal" ref={addToRefs}>
          <h2 className="text-sm font-black text-[var(--primary)] uppercase tracking-widest mb-8">02 // Technical Stack</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card p-8">
              <h4 className="text-sm font-black uppercase text-[var(--primary)] mb-5">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                <span className="pill">React.js</span>
                <span className="pill">Next.js</span>
                <span className="pill">Tailwind CSS</span>
                <span className="pill">TypeScript</span>
              </div>
            </div>
            <div className="card p-8">
              <h4 className="text-sm font-black uppercase text-[var(--primary)] mb-5">Backend & AI</h4>
              <div className="flex flex-wrap gap-2">
                <span className="pill">Python</span>
                <span className="pill">Node.js</span>
                <span className="pill">LangChain</span>
                <span className="pill">OpenAI API</span>
              </div>
            </div>
            <div className="card p-8">
              <h4 className="text-sm font-black uppercase text-[var(--primary)] mb-5">Cloud & Tools</h4>
              <div className="flex flex-wrap gap-2">
                <span className="pill">AWS</span>
                <span className="pill">PostgreSQL</span>
                <span className="pill">MongoDB</span>
                <span className="pill">Git • Docker</span>
              </div>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" className="reveal" ref={addToRefs}>
          <h2 className="text-sm font-black text-[var(--primary)] uppercase tracking-widest mb-8">03 // Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-8 flex flex-col justify-between">
              <div>
                <div className="w-full h-48 bg-orange-50/30 rounded-xl mb-6 overflow-hidden border border-orange-100">
                  <img src="/images/eamcet.png.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="EAMCET Rank Predictor" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900 hover:text-[var(--primary)] transition">EAMCET Rank Predictor</h4>
                <p className="text-gray-600 mb-6">Predict your rank based on subject marks using historical data and trend analysis. Built with Supabase and React.</p>
              </div>
              <a href="https://eamcetrankchecker.vercel.app/" target="_blank" rel="noreferrer" className="text-[var(--primary)] font-medium hover:underline">Live Demo →</a>
            </div>

            <div className="card p-8 flex flex-col justify-between">
              <div>
                <div className="w-full h-48 bg-orange-50/30 rounded-xl mb-6 overflow-hidden border border-orange-100">
                  <img src="/images/genai-report.png.jpeg" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="Automated GenAI Report" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900 hover:text-[var(--primary)] transition">Automated GenAI Report</h4>
                <p className="text-gray-600 mb-6">AI-powered pipeline turning unstructured data into polished business intelligence reports.</p>
              </div>
              <a href="https://reportgenerator.in/" target="_blank" rel="noreferrer" className="text-[var(--primary)] font-medium hover:underline">View Project →</a>
            </div>

            <div className="card p-8 flex flex-col justify-between">
              <div>
                <div className="w-full h-48 bg-orange-50/30 rounded-xl mb-6 overflow-hidden border border-orange-100">
                  <img src="/images/hmcart.png" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" alt="HM Cart" />
                </div>
                <h4 className="text-2xl font-bold mb-4 text-gray-900 hover:text-[var(--primary)] transition">HM Cart Marketplace</h4>
                <p className="text-gray-600 mb-6">Modern full-stack e-commerce platform with smooth UX and performance.</p>
              </div>
              <a href="https://kutikantiyashwanth.github.io/hm_cart/" target="_blank" rel="noreferrer" className="text-[var(--primary)] font-medium hover:underline">Live Demo →</a>
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="reveal" ref={addToRefs}>
          <h2 className="text-sm font-black text-[var(--primary)] uppercase tracking-widest mb-8">04 // Education</h2>
          <div className="space-y-6">
            <div className="card p-8 border-l-4 border-[var(--primary)]">
              <h4 className="text-xl font-bold mb-2 text-gray-900">KITS Huzurabad</h4>
              <p className="text-gray-500 text-sm mb-2">B.Tech — Artificial Intelligence & Machine Learning</p>
              <div className="text-4xl font-black text-gray-900">7.94 <span className="text-lg font-normal text-gray-500">CGPA</span></div>
            </div>
            <div className="card p-8 border-l-4 border-gray-300">
              <h4 className="text-xl font-bold mb-2 text-gray-900">Intermediate</h4>
              <p className="text-gray-500 text-sm mb-2">Shivani Jr College</p>
              <div className="text-4xl font-black text-gray-900">9.1 <span className="text-lg font-normal text-gray-500">CGPA</span></div>
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section id="achievements" className="reveal" ref={addToRefs}>
          <h2 className="text-sm font-black text-[var(--primary)] uppercase tracking-widest mb-8">05 // Achievements</h2>
          <div className="card p-8">
            <ul className="space-y-6 text-gray-700">
              <li className="flex items-start gap-4">
                <div className="w-3 h-3 mt-2 rounded-full bg-[var(--primary)] shrink-0"></div>
                <div>
                  <p className="font-bold text-gray-900">AWS Academy Internship</p>
                  <p className="text-sm">10-week intensive Data Engineering & Cloud training</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-3 h-3 mt-2 rounded-full bg-[var(--primary)] shrink-0"></div>
                <div>
                  <p className="font-bold text-gray-900">CODESTORM 2026</p>
                  <p className="text-sm">National hackathon — Developed AI solutions under pressure</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="reveal" ref={addToRefs}>
          <div className="card p-10 md:p-16 text-center border-t-4 border-[var(--primary)]">
            <h2 className="text-4xl md:text-5xl font-black mb-10 text-gray-900">
              Let's create something<br/><span className="text-gradient">meaningful</span> together
            </h2>
            <div className="grid md:grid-cols-3 gap-10 max-w-4xl mx-auto">
              <div>
                <p className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider mb-3">Phone</p>
                <a href="tel:9014798201" className="text-2xl font-bold hover:text-[var(--primary)] transition">+91 9014798201</a>
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider mb-3">Email</p>
                <a href="mailto:kutikantiyashwanth@gmail.com" className="text-xl font-bold hover:text-[var(--primary)] transition break-all">kutikantiyashwanth@gmail.com</a>
              </div>
              <div>
                <p className="text-sm font-bold text-[var(--primary)] uppercase tracking-wider mb-3">Location</p>
                <p className="text-2xl font-bold">Hanamakonda, Telangana</p>
              </div>
            </div>
          </div>
        </section>

      </main>

      <footer className="py-12 text-center text-gray-600 text-sm border-t border-orange-100 bg-white/50">
        Yashwanth Kutikanti • AI & Full Stack Engineer • 2026
      </footer>
    </>
  );
}

export default App;
