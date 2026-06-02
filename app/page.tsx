const productCards = [
  {
    image: "/assets/Ai1.png",
    imageClass: "mifi-card-img",
    category: "5G AI Mobile WiFi",
    title: "AI MIFI",
    description:
      "Telemiles integrates AI with 5G to create smart devices that keep you connected, protected, and informed — wherever life takes you.",
    alt: "AI MIFI device"
  },
  {
    image: "/assets/max1.png",
    imageClass: "max-card-img",
    category: "Kids Smart Companion",
    title: "Max",
    description: "Safety, fun, and connection in one device — locate, call, message, and chat with AI.",
    alt: "Max smart companion"
  },
  {
    image: "/assets/pet1.png",
    imageClass: "pet-card-img",
    category: "AI Pet Tracker",
    title: "Petmio",
    description: "Track, understand, and bond with your pet through AI-powered insights and digital twins.",
    alt: "Petmio pet tracker"
  }
];

const features = [
  {
    className: "feature-a",
    category: "AI MIFI",
    title: "AI That Works For You",
    description:
      "Record meetings with one click. Get AI summaries instantly. Search your personal knowledge base anytime, anywhere — all without reaching for your phone.",
    image: "/assets/Ai2.png",
    alt: "AI MIFI product on a desk"
  },
  {
    className: "feature-b",
    category: "Max",
    title: "Always Know They're Safe",
    description:
      "Real-time location, instant messaging, and an AI friend that makes every day more fun. Give your child the gift of connection — and yourself the peace of mind.",
    image: "/assets/Max2.png",
    alt: "Max companion device"
  },
  {
    className: "feature-c",
    category: "Petmio",
    title: "Your Pet, Understood",
    description:
      "1.5 months battery. AI health insights. A digital twin that mirrors your pet's every move — so you're always close, even when you're apart.",
    image: "/assets/Pet2.png",
    alt: "Petmio collar tracker"
  }
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="hero-section" id="top">
          <img className="hero-bg" src="/assets/HoreBG.png?v=20260601-hero" alt="" />
          <div className="hero-copy reveal-in">
            <h1>
              Empowering Technology
              <br />
              Connecting The Future
            </h1>
            <p>Telemiles integrates AI with 5G to create smart devices that keep you connected, protected, and informed — wherever life takes you.</p>
            <a className="arrow-button" href="#products">
              Explore Products <span aria-hidden="true"></span>
            </a>
          </div>
          <div className="hero-dots" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
          </div>
        </section>

        <section className="products-section" id="products">
          <div className="section-heading reveal-in">
            <h2>Intelligence For Every Journey</h2>
            <p>From connectivity to companionship, meet the devices designed for modern life.</p>
          </div>
          <div className="product-grid">
            {productCards.map((card) => (
              <article className="product-card reveal-in" key={card.title}>
                <div className="product-media">
                  <img className={card.imageClass} src={card.image} alt={card.alt} />
                </div>
                <p className="eyebrow">{card.category}</p>
                <h3>{card.title}</h3>
                <p className="body-copy">{card.description}</p>
                <a className="text-link" href="#technology">
                  Learn More <span aria-hidden="true"></span>
                </a>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about-us">
          <div className="about-sticky">
            <div className="vision-mark" aria-hidden="true" />
            <p className="vision-copy reveal-in">
              <span>Each product reflects our vision and commitment to the </span>future of intelligent connectivity.
            </p>
            <div className="why-panel">
              <img src="/assets/Frame 2085661059.png" alt="" />
              <h2>Why Telemiles?</h2>
              <div className="why-card why-a">
                <h3>Cutting-Edge Hardware</h3>
                <p>Engineered with premium components for reliable, high-performance experiences.</p>
              </div>
              <div className="why-card why-b">
                <h3>Seamless Connection</h3>
                <p>5G and IoT connectivity that keeps all your devices and loved ones within reach.</p>
              </div>
              <div className="why-card why-c">
                <h3>Intelligent Interaction</h3>
                <p>AI that adapts to your lifestyle — from meeting summaries to pet behavior insights.</p>
              </div>
              <div className="why-card why-d">
                <h3>Data Privacy</h3>
                <p>Designed to protect personal moments, locations, and family communication.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="technology-section" id="technology">
          <h2 className="tech-title reveal-in">Intelligent</h2>
          {features.map((feature) => (
            <div className={`feature ${feature.className} reveal-in`} key={feature.title}>
              <div>
                <p className="eyebrow">{feature.category}</p>
                <h3>{feature.title}</h3>
                <p className="body-copy">{feature.description}</p>
                <a className="arrow-button small" href="#support">
                  Discover <span aria-hidden="true"></span>
                </a>
              </div>
              <img src={feature.image} alt={feature.alt} />
            </div>
          ))}
        </section>

        <section className="stats-section reveal-in">
          <img src="/assets/Frame 2085661065.png" alt="" />
          <div>
            <strong>1.5</strong>
            <span>Months</span>
            <p>Battery Life</p>
            <small>Regular tracking mode</small>
          </div>
          <div>
            <strong>23</strong>
            <span>g</span>
            <p>Ultra-Lightweight</p>
            <small>Comfortable for any pet</small>
          </div>
          <div>
            <strong>3</strong>
            <span>Second</span>
            <p>Live GPS Refresh</p>
            <small>Real-time tracking</small>
          </div>
        </section>

        <section className="apps-section" id="support">
          <div className="section-heading reveal-in">
            <h2>Three Devices. Three Dedicated Apps.</h2>
            <p>Each Telemiles device comes with its own purpose-built companion app — designed specifically for how you use it.</p>
          </div>
          <div className="app-tabs" role="tablist" aria-label="App previews">
            <button className="is-active" type="button">AI MIFI App</button>
            <button type="button">Max App</button>
            <button type="button">Petmio App</button>
          </div>
          <img className="app-preview reveal-in" src="/assets/Frame 2085661091.png" alt="AI MIFI app interface" />
          <div className="app-copy reveal-in">
            <p className="app-number">01</p>
            <p className="eyebrow">AI MIFI — 5G AI Mobile WiFi</p>
            <h3>AI MIFI App</h3>
            <p className="body-copy">
              AI meeting notes & summaries
              <br />
              Hotspot management & connected devices
              <br />
              Personal knowledge base search
            </p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <h2 className="reveal-in">
            Ready to Build
            <br />
            The Future Together?
          </h2>
          <div className="reveal-in">
            <p>Whether you're a distributor, retailer, or technology partner — join the Telemiles ecosystem and bring intelligent connectivity to your market.</p>
            <a className="arrow-button" href="mailto:hello@telemiles.com">
              Discover <span aria-hidden="true"></span>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Telemiles home">
        <img src="/assets/LOGO.png" alt="Telemiles" />
      </a>
      <nav className="nav-links" aria-label="Primary navigation">
        <a href="#products">Products</a>
        <a href="#about-us">About Us</a>
        <a href="#technology">Technology</a>
        <a href="#support">Support</a>
        <a href="#contact">Contact</a>
      </nav>
      <a className="contact-pill" href="#contact">
        Contact Us <span aria-hidden="true"></span>
      </a>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer-section">
      <img className="footer-ghost" src="/assets/大LOGO.png" alt="" />
      <div className="footer-intro">
        <a className="footer-brand" href="#top">
          <img src="/assets/LOGO.png" alt="Telemiles" />
        </a>
        <h2>
          Intelligence Shapes
          <br />
          Everything,Connection Links The World
        </h2>
        <div className="footer-contact-row">
          <a href="mailto:Support@telemiles.com">Support@telemiles.com</a>
          <a href="tel:+864001234567">+86 400-123-4567</a>
        </div>
        <div className="footer-socials">
          <a href="#" aria-label="X"><img src="/assets/Social media.png" alt="" /></a>
          <a href="#" aria-label="Facebook"><img src="/assets/Social media-1.png" alt="" /></a>
          <a href="#" aria-label="LinkedIn"><img src="/assets/Social media-2.png" alt="" /></a>
        </div>
      </div>
      <nav className="footer-links" aria-label="Footer navigation">
        <div><h3>Products</h3><a href="#technology">AI MIFI</a><a href="#technology">Max</a><a href="#technology">Petmio</a></div>
        <div><h3>About Us</h3><a href="#about-us">Our Story</a><a href="#technology">Technology</a><a href="#contact">Press Kit</a></div>
        <div><h3>Support</h3><a href="#support">FAQ</a><a href="#support">User Guides</a><a href="#support">App Download</a></div>
        <div><h3>Company</h3><a href="#contact">Contact</a><a href="#contact">Careers</a><a href="#contact">Privacy</a><a href="#contact">Terms</a></div>
      </nav>
      <div className="footer-rule" />
      <p className="copyright">© 2025 Telemiles. All rights reserved.</p>
      <p className="footer-tagline">Empowering Technology Connecting the Future</p>
    </footer>
  );
}
