import { useState, useEffect } from "react";

/**
 * Ogham Works — single-file React build of the site redesign concept.
 * Zero extra dependencies: just React. Uses hash-based routing so it drops
 * into any existing React app without react-router.
 *
 * Routes: #/  #/consulting  #/enrollem  #/form-identifier  #/contact (home, scrolled to #contact)
 */

const ROUTES = {
  "": "home",
  "#/": "home",
  "#/contact": "home",
  "#/consulting": "consulting",
  "#/enrollem": "enrollem",
  "#/form-identifier": "formid",
};

const TITLES = {
  home: "Ogham Works — HubSpot Apps & Consulting",
  consulting: "Consulting — Ogham Works",
  enrollem: "Enrollem — Automated HubSpot Sequence Enrollment | Ogham Works",
  formid: "HS Form Identifier — Free HubSpot Form Detector | Ogham Works",
};

function useRoute() {
  const [page, setPage] = useState(() => ROUTES[window.location.hash] || "home");

  useEffect(() => {
    const onHashChange = () => setPage(ROUTES[window.location.hash] || "home");
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    document.title = TITLES[page];
  }, [page]);

  useEffect(() => {
    if (window.location.hash === "#/contact") {
      const id = requestAnimationFrame(() => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      });
      return () => cancelAnimationFrame(id);
    }
    window.scrollTo(0, 0);
  }, [page]);

  return page;
}

/* ---------- shared bits ---------- */

function BrandMark({ className }) {
  return (
    <svg className={className} viewBox="0 0 34 20" fill="none" aria-hidden="true">
      <line x1="17" y1="1" x2="17" y2="19" className="mark-stem" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="4" x2="17" y2="4" className="mark-notch" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="5" y1="10" x2="17" y2="10" className="mark-notch" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="17" y1="16" x2="28" y2="12" className="mark-notch" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function OfferingIcon({ variant }) {
  const paths = {
    consulting: [
      [5, 7, 17, 7],
      [17, 13, 29, 13],
    ],
    enrollem: [
      [5, 4, 17, 4],
      [5, 10, 17, 10],
      [5, 16, 17, 16],
    ],
    formid: [
      [17, 5, 28, 1],
      [17, 11, 28, 11],
      [17, 17, 28, 19],
    ],
  };
  return (
    <svg className="card-icon" viewBox="0 0 34 20" fill="none" aria-hidden="true">
      <line x1="17" y1="1" x2="17" y2="19" className="mark-stem" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      {paths[variant].map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className="mark-notch" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function Badge({ accent, children }) {
  return <span className={accent ? "badge badge-accent" : "badge"}>{children}</span>;
}

function StemList({ items, style }) {
  return (
    <ul className="stem-list" style={style}>
      {items.map((item, i) => (
        <li key={i}>{item}</li>
      ))}
    </ul>
  );
}

function Stemline() {
  return (
    <div className="wrap">
      <div className="stemline" role="presentation" />
    </div>
  );
}

function ProofStrip({ items }) {
  return (
    <div className="wrap">
      <div className="proof">
        {items.map((item, i) => (
          <div className="proof-item" key={i}>
            <div className="proof-value">{item.value}</div>
            <div className="proof-label">{item.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CTABand({ heading, ctaLabel, ctaHref }) {
  return (
    <section className="wrap">
      <div className="cta-band">
        <h2>{heading}</h2>
        <a className="btn btn-accent" href={ctaHref}>
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}

function PricingCard({ tag, price, note, features, featured }) {
  return (
    <div className={featured ? "price-card is-featured" : "price-card"}>
      <span className="price-tag">{tag}</span>
      <div className="price-value">
        {price}
        <span>&nbsp;/ month</span>
      </div>
      <p className="price-note">{note}</p>
      <ul className="price-list">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </div>
  );
}

function Nav({ page, ctaHref, ctaLabel }) {
  const links = [
    { href: "#/", label: "Home", key: "home" },
    { href: "#/consulting", label: "Consulting", key: "consulting" },
    { href: "#/enrollem", label: "Enrollem", key: "enrollem" },
    { href: "#/form-identifier", label: "Form Identifier", key: "formid" },
  ];
  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <a className="brand" href="#/">
          <BrandMark className="brand-mark" />
          <span>OGHAM WORKS</span>
        </a>
        <nav className="nav-links" aria-label="Primary">
          {links.map((l) => (
            <a key={l.key} href={l.href} aria-current={page === l.key ? "page" : undefined}>
              {l.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-accent" href={ctaHref}>
          {ctaLabel}
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <BrandMark className="brand-mark" />
          <p>Ogham Works builds focused HubSpot apps and provides hands-on consulting for teams who've outgrown the default setup.</p>
        </div>
        <div>
          <p className="footer-heading">Product</p>
          <div className="footer-links">
            <a href="#/enrollem">Enrollem</a>
            <a href="#/form-identifier">HS Form Identifier</a>
          </div>
        </div>
        <div>
          <p className="footer-heading">Company</p>
          <div className="footer-links">
            <a href="#/consulting">Consulting</a>
            <a href="#/contact">Contact</a>
            <a href="https://www.oghamworks.com/support">Support ↗</a>
          </div>
        </div>
        <div>
          <p className="footer-heading">Legal</p>
          <div className="footer-links">
            <a href="https://www.oghamworks.com/privacy-policy">Privacy Policy ↗</a>
            <a href="https://www.linkedin.com/company/ogham-works">LinkedIn ↗</a>
          </div>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>© 2026 Ogham Works Ltd</span>
        <span className="mockup-note">Design concept for oghamworks.com — not the live site</span>
      </div>
    </footer>
  );
}

/* ---------- pages ---------- */

function HomePage() {
  return (
    <>
      <Nav page="home" ctaHref="#/contact" ctaLabel="Get in touch" />
      <main>
        <section className="hero wrap">
          <span className="eyebrow">HubSpot apps &amp; consulting</span>
          <h1>We build the HubSpot layer you're missing.</h1>
          <p className="lede">
            Ogham Works builds focused apps that solve real HubSpot workflow problems, and works directly with teams who need hands-on help getting the
            platform right.
          </p>
          <div className="hero-actions">
            <a className="btn btn-accent" href="#/enrollem">
              Explore Enrollem
            </a>
            <a className="btn btn-outline" href="#/consulting">
              See consulting services
            </a>
          </div>
        </section>

        <ProofStrip
          items={[
            { value: "4.3 ★ (21)", label: "Enrollem rating, HubSpot Marketplace" },
            { value: "50 / mo", label: "Free automated enrollments with Enrollem" },
            { value: "35+", label: "Form providers detected by HS Form Identifier" },
            { value: "Free", label: "HS Form Identifier, no cost to install" },
          ]}
        />

        <Stemline />

        <section className="wrap" id="offerings">
          <div className="section-head">
            <span className="eyebrow">What we do</span>
            <h2>Two ways we help HubSpot teams</h2>
            <p>Off-the-shelf apps for problems every HubSpot user hits, and hands-on consulting for the problems that need a person in the room.</p>
          </div>
          <div className="card-grid">
            <a className="card" href="#/consulting">
              <OfferingIcon variant="consulting" />
              <h3>Consulting</h3>
              <p>Hands-on HubSpot implementation, CRM cleanup, and automation strategy for teams who need more than a template.</p>
              <span className="go">See consulting services →</span>
            </a>
            <a className="card" href="#/enrollem">
              <OfferingIcon variant="enrollem" />
              <h3>Enrollem</h3>
              <p>Automatic HubSpot sequence enrollment, on any trigger you choose. No Enterprise plan required.</p>
              <Badge>
                ★ <strong>4.3</strong>&nbsp;(21) on the Marketplace
              </Badge>
              <span className="go">Explore Enrollem →</span>
            </a>
            <a className="card" href="#/form-identifier">
              <OfferingIcon variant="formid" />
              <h3>HS Form Identifier</h3>
              <p>Free Chrome extension that detects HubSpot forms — and 35+ other providers — on any site you're viewing.</p>
              <Badge>
                Totally <strong>free</strong>
              </Badge>
              <span className="go">Add to Chrome →</span>
            </a>
          </div>
        </section>

        <Stemline />

        <section className="wrap">
          <div className="why-grid">
            <div>
              <span className="eyebrow">Why Ogham Works</span>
              <h2>Built by HubSpot users, for HubSpot users.</h2>
              <p style={{ marginTop: "1rem" }}>
                We work with HubSpot users daily to understand their pain points — then solve them, one app or one engagement at a time. Every product we
                ship and every consulting hour we spend comes from the same place: hands actually in the platform.
              </p>
            </div>
            <StemList
              items={[
                "Apps scoped to one specific problem, not a bloated all-in-one suite",
                "Consulting from people who build directly on the HubSpot APIs",
                "No Enterprise-plan gatekeeping — most of what we build runs on Professional",
              ]}
            />
          </div>
        </section>

        <section className="wrap" id="contact">
          <div className="section-head">
            <span className="eyebrow">Get in touch</span>
            <h2>Let's talk about your HubSpot setup.</h2>
            <p>Whether it's a quick question about Enrollem or a bigger consulting engagement, tell us what you're working on.</p>
          </div>
          <div className="contact-grid">
            <form className="mock-form" onSubmit={(e) => e.preventDefault()}>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" placeholder="you@company.com" autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="message">What are you working on?</label>
                <textarea id="message" name="message" rows={4} placeholder="Enrollem question, consulting enquiry, anything else…" />
              </div>
              <button className="btn btn-accent" type="submit" style={{ width: "fit-content" }}>
                Send message
              </button>
              <p className="form-note">Mockup form — wire this to your real submit handler / HubSpot form API.</p>
            </form>
            <div>
              <p>Prefer somewhere else? Find us on LinkedIn, or jump straight to an app page.</p>
              <div className="contact-links">
                <a href="https://www.linkedin.com/company/ogham-works">LinkedIn ↗</a>
                <a href="#/enrollem">Enrollem support →</a>
                <a href="https://www.oghamworks.com/support">General support ↗</a>
              </div>
            </div>
          </div>
        </section>

        <CTABand heading="Outgrown the default HubSpot setup?" ctaLabel="Talk to us about consulting" ctaHref="#/consulting" />
      </main>
      <Footer />
    </>
  );
}

function ConsultingPage() {
  return (
    <>
      <Nav page="consulting" ctaHref="#/contact" ctaLabel="Get in touch" />
      <main>
        <section className="hero wrap">
          <span className="eyebrow">Consulting</span>
          <h1>Hands-on HubSpot help from people who build on the platform daily.</h1>
          <p className="lede">
            Beyond our apps, Ogham Works works directly with HubSpot teams — fixing what's broken, connecting what's disconnected, and building what's
            missing.
          </p>
          <div className="hero-actions">
            <a className="btn btn-accent" href="#/contact">
              Get in touch
            </a>
            <a className="btn btn-outline" href="#/enrollem">
              See our apps
            </a>
          </div>
        </section>

        <Stemline />

        <section className="wrap">
          <div className="section-head">
            <span className="eyebrow">Services</span>
            <h2>Where we help</h2>
            <p>Four ways teams typically bring us in — scoped to the problem, not a fixed retainer.</p>
          </div>
          <div className="card-grid">
            <div className="card">
              <OfferingIcon variant="enrollem" />
              <h3>Implementation &amp; onboarding</h3>
              <p>Get Marketing, Sales, or Service Hub set up right from day one — properties, pipelines, permissions, and the automations that should exist from the start.</p>
            </div>
            <div className="card">
              <OfferingIcon variant="formid" />
              <h3>CRM audit &amp; cleanup</h3>
              <p>Untangle duplicate properties, dead workflows, and years of quick fixes into a CRM your team can actually trust.</p>
            </div>
            <div className="card">
              <OfferingIcon variant="consulting" />
              <h3>Custom integrations &amp; app development</h3>
              <p>The same engineering behind Enrollem, pointed at your stack — custom HubSpot apps, API integrations, and internal tools.</p>
            </div>
            <div className="card">
              <OfferingIcon variant="formid" />
              <h3>Automation &amp; lifecycle strategy</h3>
              <p>Sequences, lifecycle stages, and lead routing that match how your team actually sells — not a generic template.</p>
            </div>
          </div>
          <p style={{ marginTop: "1.5rem", fontSize: ".85rem" }}>Placeholder service lines — swap in your actual offerings and pricing.</p>
        </section>

        <Stemline />

        <section className="wrap">
          <div className="section-head">
            <span className="eyebrow">Process</span>
            <h2>How an engagement runs</h2>
          </div>
          <div className="process">
            <div className="process-step">
              <span className="step-index">01 — Discover</span>
              <p>A working session on your current setup: what's broken, what's missing, what's actually costing you time.</p>
            </div>
            <div className="process-step">
              <span className="step-index">02 — Build</span>
              <p>Scoped, incremental changes, implemented directly in your portal and tested against how your team really works.</p>
            </div>
            <div className="process-step">
              <span className="step-index">03 — Handover</span>
              <p>Documentation and a short training pass, so your team owns the result — no dependency on us to keep it running.</p>
            </div>
          </div>
        </section>

        <Stemline />

        <section className="wrap">
          <div className="why-grid">
            <div>
              <span className="eyebrow">Credibility</span>
              <h2>Not a generalist agency bolting on HubSpot.</h2>
              <p style={{ marginTop: "1rem" }}>
                It's the only platform we work in — including building Enrollem and HS Form Identifier, two apps used by HubSpot customers on the
                Marketplace today.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a className="card" href="#/enrollem" style={{ textDecoration: "none" }}>
                <Badge>
                  ★ <strong>4.3</strong>&nbsp;(21) on the Marketplace
                </Badge>
                <h3 style={{ marginTop: ".5rem" }}>Enrollem</h3>
                <p>Automated sequence enrollment, built and supported by us.</p>
              </a>
              <a className="card" href="#/form-identifier" style={{ textDecoration: "none" }}>
                <Badge>35+ providers detected</Badge>
                <h3 style={{ marginTop: ".5rem" }}>HS Form Identifier</h3>
                <p>A free Chrome extension we built and maintain.</p>
              </a>
            </div>
          </div>
        </section>

        <CTABand heading="Have a HubSpot problem worth an hour of conversation?" ctaLabel="Get in touch" ctaHref="#/contact" />
      </main>
      <Footer />
    </>
  );
}

function EnrollemPage() {
  return (
    <>
      <Nav page="enrollem" ctaHref="https://www.oghamworks.com#enrollem" ctaLabel="Install Now" />
      <main>
        <section className="hero wrap">
          <span className="eyebrow">Enrollem · HubSpot app</span>
          <h1>Your HubSpot sequences, running on autopilot.</h1>
          <p className="lede">
            Stop manually enrolling contacts one by one. Enrollem lets your HubSpot workflows do the heavy lifting — enrolling and unenrolling contacts in
            sequences automatically, on any trigger you choose.
          </p>
          <div className="hero-actions">
            <a className="btn btn-accent" href="https://www.oghamworks.com#enrollem">
              Install Now
            </a>
            <a className="btn btn-outline" href="#pricing">
              See pricing
            </a>
          </div>
          <div style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", marginTop: "1.5rem" }}>
            <Badge>★ <strong>4.3</strong>&nbsp;(21) on the HubSpot Marketplace</Badge>
            <Badge accent>No Enterprise plan needed</Badge>
          </div>
        </section>

        <ProofStrip
          items={[
            { value: "4.3 ★ (21)", label: "Rating on HubSpot Marketplace" },
            { value: "50 / mo", label: "Free automated enrollments" },
            { value: "No Enterprise", label: "Plan required to use Enrollem" },
          ]}
        />

        <Stemline />

        <section className="wrap">
          <div className="section-head">
            <span className="eyebrow">Features</span>
            <h2>What it does</h2>
          </div>
          <StemList
            style={{ maxWidth: "640px" }}
            items={[
              "50 automated enrollments per month on our free plan",
              "Choose which team member should be the sender, or dynamically send from the contact owner",
              "Enroll contacts in sequences from associated objects — companies, deals, and custom objects",
            ]}
          />
        </section>

        <Stemline />

        <section className="wrap" id="pricing">
          <div className="section-head">
            <span className="eyebrow">Pricing</span>
            <h2>Plans that scale with your enrollments</h2>
            <p>Monthly pricing shown below; paying annually brings the effective monthly rate down.</p>
          </div>
          <div className="pricing-grid">
            <PricingCard
              tag="Free"
              price="€0"
              note="50 enrollments / month"
              features={["Automated sequence enrollment", "Dynamic sender assignment", "Enroll from associated objects"]}
            />
            <PricingCard
              tag="Professional"
              price="€40"
              note="250 enrollments / month · no contract · €35/mo billed annually (€420/yr)"
              featured
              features={[
                "Send from any user with a connected inbox and professional seat",
                "Dynamically select contact owner as sender",
                "Unenroll workflow action, unlimited use",
              ]}
            />
            <PricingCard
              tag="Enterprise"
              price="€100"
              note="5,000 enrollments / month · no contract · €90/mo billed annually (€1,080/yr)"
              features={[
                "Everything in Professional",
                "5,000 automated sequence enrollments / month",
                "Subject to HubSpot's daily email send limit (max 500/day on Professional seats)",
              ]}
            />
          </div>
        </section>

        <CTABand heading="Ready to put sequence enrollment on autopilot?" ctaLabel="Install Now" ctaHref="https://www.oghamworks.com#enrollem" />
      </main>
      <Footer />
    </>
  );
}

function FormIdentifierPage() {
  return (
    <>
      <Nav page="formid" ctaHref="https://www.oghamworks.com#formsiddentifier" ctaLabel="Add to Chrome" />
      <main>
        <section className="hero wrap">
          <span className="eyebrow">HS Form Identifier · Free Chrome extension</span>
          <h1>Identify any HubSpot form. Instantly.</h1>
          <p className="lede">A free Chrome extension that detects HubSpot forms — and 35+ other form providers — on any website you're viewing.</p>
          <div className="hero-actions">
            <a className="btn btn-accent" href="https://www.oghamworks.com#formsiddentifier">
              Add to Chrome
            </a>
            <a className="btn btn-outline" href="#features">
              See how it works
            </a>
          </div>
          <div style={{ marginTop: "1.5rem" }}>
            <Badge accent>Totally free · no account required</Badge>
          </div>
        </section>

        <Stemline />

        <section className="wrap" id="features">
          <div className="section-head">
            <span className="eyebrow">Features</span>
            <h2>What it does</h2>
          </div>
          <StemList
            style={{ maxWidth: "640px" }}
            items={[
              "Get a direct link to open your HubSpot forms while viewing your own website",
              "Identify non-HubSpot forms on any page",
              "Recognize 35+ different form providers",
              "Completely free — no account required",
            ]}
          />
        </section>

        <Stemline />

        <section className="wrap">
          <div className="why-grid">
            <div>
              <span className="eyebrow">Who it's for</span>
              <h2>Built for the people doing the QA.</h2>
              <p style={{ marginTop: "1rem" }}>
                HubSpot marketers and consultants use it to quickly confirm which form is live on a page — during audits, QA passes, or when checking a
                client's or competitor's site.
              </p>
            </div>
            <div className="card">
              <h3>Part of the Ogham Works toolkit</h3>
              <p style={{ marginTop: ".5rem" }}>Also need to automate sequence enrollment? Enrollem handles that — built by the same team.</p>
              <a className="btn btn-outline" style={{ marginTop: "1rem", width: "fit-content" }} href="#/enrollem">
                See Enrollem →
              </a>
            </div>
          </div>
        </section>

        <CTABand heading="See what's really powering that form." ctaLabel="Add to Chrome" ctaHref="https://www.oghamworks.com#formsiddentifier" />
      </main>
      <Footer />
    </>
  );
}

/* ---------- root ---------- */

export default function OghamWorksSite() {
  const page = useRoute();
  return (
    <>
      <style>{CSS}</style>
      {page === "home" && <HomePage />}
      {page === "consulting" && <ConsultingPage />}
      {page === "enrollem" && <EnrollemPage />}
      {page === "formid" && <FormIdentifierPage />}
    </>
  );
}

const CSS = `
@font-face{
  font-family:'Plex Mono Ogham';
  font-weight:600;
  font-style:normal;
  font-display:swap;
  src:url(data:font/woff2;base64,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) format('woff2');
}
@font-face{
  font-family:'Plex Mono Ogham';
  font-weight:700;
  font-style:normal;
  font-display:swap;
  src:url(data:font/woff2;base64,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) format('woff2');
}

:root{
  --paper:#FFFFFF;
  --paper-soft:#F5F3EE;
  --ink:#15181A;
  --ink-soft:#5B615E;
  --line:#E4E1DA;
  --line-strong:#CFCBC2;
  --accent:#FF5A1F;
  --accent-ink:#C2410C;
  --accent-soft:#FFF0E6;
  --contrast-bg:#15181A;
  --contrast-fg:#F5F3EE;
  --font-display:'Plex Mono Ogham', ui-monospace, 'SFMono-Regular', 'Cascadia Code', Consolas, monospace;
  --font-body:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
}
@media (prefers-color-scheme: dark){
  :root{
    --paper:#101312;
    --paper-soft:#181C1A;
    --ink:#F1EFEA;
    --ink-soft:#A3A9A4;
    --line:#2B302D;
    --line-strong:#3A403C;
    --accent:#FF7A42;
    --accent-ink:#FFB185;
    --accent-soft:#2A1B12;
  }
}
:root[data-theme="dark"]{
  --paper:#101312; --paper-soft:#181C1A; --ink:#F1EFEA; --ink-soft:#A3A9A4;
  --line:#2B302D; --line-strong:#3A403C; --accent:#FF7A42; --accent-ink:#FFB185; --accent-soft:#2A1B12;
}
:root[data-theme="light"]{
  --paper:#FFFFFF; --paper-soft:#F5F3EE; --ink:#15181A; --ink-soft:#5B615E;
  --line:#E4E1DA; --line-strong:#CFCBC2; --accent:#FF5A1F; --accent-ink:#C2410C; --accent-soft:#FFF0E6;
}

*,*::before,*::after{box-sizing:border-box;}
body{margin:0;background:var(--paper);color:var(--ink);font-family:var(--font-body);font-size:1.0625rem;line-height:1.65;-webkit-font-smoothing:antialiased;}
img,svg{max-width:100%;display:block;}
a{color:inherit;}
:focus-visible{outline:2px solid var(--accent);outline-offset:3px;border-radius:2px;}
@media (prefers-reduced-motion: reduce){*{animation-duration:.01ms !important;transition-duration:.01ms !important;}}

.wrap{max-width:1120px;margin-inline:auto;padding-inline:1.5rem;}
main section{padding-block:clamp(3rem,6vw,5.5rem);}

h1,h2,h3{font-family:var(--font-display);font-weight:700;line-height:1.15;text-wrap:balance;letter-spacing:-0.01em;margin:0;color:var(--ink);}
h2{font-size:clamp(1.6rem,2.6vw,2.15rem);}
h3{font-size:1.15rem;}
p{margin:0;color:var(--ink-soft);max-width:60ch;}
.lede{font-size:1.15rem;color:var(--ink-soft);}
.eyebrow{font-family:var(--font-display);font-weight:600;font-size:.78rem;letter-spacing:.14em;text-transform:uppercase;color:var(--accent-ink);display:block;margin-bottom:1rem;}
.section-head{max-width:640px;margin-bottom:2.5rem;}

.mark-stem{color:var(--ink);}
.mark-notch{color:var(--accent);}
.nav{position:sticky;top:0;z-index:30;background:var(--paper);border-bottom:1px solid var(--line);}
.nav-inner{display:flex;align-items:center;gap:2rem;padding-block:1rem;}
.brand{display:flex;align-items:center;gap:.6rem;text-decoration:none;font-family:var(--font-display);font-weight:700;font-size:.92rem;letter-spacing:.04em;color:var(--ink);}
.brand-mark{width:28px;height:18px;flex:none;}
.nav-links{display:flex;gap:1.75rem;margin-inline-start:auto;flex-wrap:wrap;}
.nav-links a{text-decoration:none;font-size:.95rem;color:var(--ink-soft);padding-block:.3rem;border-bottom:2px solid transparent;}
.nav-links a:hover{color:var(--ink);}
.nav-links a[aria-current="page"]{color:var(--ink);border-bottom-color:var(--accent);}

.btn{display:inline-flex;align-items:center;gap:.5rem;font-family:var(--font-display);font-weight:600;font-size:.88rem;letter-spacing:.01em;padding:.85rem 1.5rem;border-radius:3px;text-decoration:none;border:1px solid transparent;transition:transform .15s ease,background .15s ease,border-color .15s ease;white-space:nowrap;}
.btn:hover{transform:translateY(-1px);}
.btn-accent{background:var(--accent);color:#fff;}
.btn-accent:hover{background:var(--accent-ink);}
.btn-outline{border-color:var(--line-strong);color:var(--ink);}
.btn-outline:hover{border-color:var(--ink);}

.stemline{height:14px;background-image:linear-gradient(var(--line) 1px, transparent 1px),repeating-linear-gradient(115deg, var(--line-strong) 0 2px, transparent 2px 20px);background-position:0 6px,0 0;background-repeat:repeat-x,repeat-x;background-size:100% 1px,20px 14px;}

.stem-list{list-style:none;margin:0;padding:0;display:grid;gap:1rem;}
.stem-list li{position:relative;padding-left:1.7rem;color:var(--ink);}
.stem-list li::before{content:"";position:absolute;left:0;top:.55em;width:1.05rem;height:2px;background:var(--accent);transform:rotate(-30deg);transform-origin:left center;}

.hero{padding-block:clamp(3rem,7vw,6.5rem) clamp(2.5rem,5vw,4rem);}
.hero h1{font-size:clamp(2.2rem,4.4vw,3.7rem);max-width:18ch;}
.hero .lede{margin-top:1.25rem;max-width:52ch;font-size:1.2rem;}
.hero-actions{display:flex;gap:1rem;margin-top:2.25rem;flex-wrap:wrap;}
.badge{display:inline-flex;align-items:center;gap:.4rem;font-family:var(--font-display);font-size:.8rem;font-weight:600;color:var(--ink-soft);border:1px solid var(--line);border-radius:999px;padding:.35rem .8rem;width:fit-content;}
.badge strong{color:var(--ink);}
.badge-accent{border-color:var(--accent);background:var(--accent-soft);color:var(--accent-ink);}

.proof{display:flex;flex-wrap:wrap;border-top:1px solid var(--line);border-bottom:1px solid var(--line);}
.proof-item{flex:1 1 200px;padding:1.5rem 1.75rem;border-left:1px solid var(--line);}
.proof-item:first-child{border-left:none;}
.proof-value{font-family:var(--font-display);font-weight:700;font-size:1.5rem;font-variant-numeric:tabular-nums;color:var(--ink);}
.proof-label{font-size:.85rem;color:var(--ink-soft);margin-top:.15rem;}

.card-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:1.25rem;}
.card{background:var(--paper);border:1px solid var(--line);border-radius:4px;padding:2rem;display:flex;flex-direction:column;gap:.9rem;text-decoration:none;transition:border-color .15s ease;}
.card:hover{border-color:var(--accent);}
.card-icon{width:30px;height:18px;}
.card h3{color:var(--ink);}
.card .go{margin-top:auto;font-family:var(--font-display);font-weight:600;font-size:.85rem;color:var(--accent-ink);}

.process{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:2rem;}
.process-step{border-top:2px solid var(--accent);padding-top:1rem;}
.step-index{font-family:var(--font-display);font-weight:700;color:var(--accent-ink);font-size:.82rem;letter-spacing:.08em;display:block;margin-bottom:.6rem;}

.why-grid{display:grid;grid-template-columns:1.1fr .9fr;gap:3rem;align-items:start;}
@media (max-width:800px){.why-grid,.contact-grid{grid-template-columns:1fr;}}

.contact-grid{display:grid;grid-template-columns:1fr 1fr;gap:3rem;align-items:start;}
.mock-form{display:grid;gap:1.1rem;}
.field{display:grid;gap:.4rem;}
.field label{font-family:var(--font-display);font-size:.78rem;letter-spacing:.06em;text-transform:uppercase;color:var(--ink-soft);}
.field input,.field textarea{font:inherit;font-size:.95rem;padding:.75rem .9rem;border:1px solid var(--line-strong);border-radius:3px;background:var(--paper);color:var(--ink);resize:vertical;}
.field input:focus,.field textarea:focus{border-color:var(--accent);}
.form-note{font-size:.82rem;margin-top:.25rem;}
.contact-links{display:flex;flex-direction:column;gap:1.25rem;margin-top:1.5rem;}
.contact-links a{text-decoration:none;font-family:var(--font-display);font-weight:600;font-size:.9rem;color:var(--ink);}
.contact-links a:hover{color:var(--accent-ink);}

.pricing-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1.25rem;}
.price-card{border:1px solid var(--line);border-radius:4px;padding:2rem;display:flex;flex-direction:column;gap:1rem;}
.price-card.is-featured{border-color:var(--accent);position:relative;}
.price-tag{font-family:var(--font-display);font-weight:600;font-size:.78rem;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-ink);}
.price-value{font-family:var(--font-display);font-weight:700;font-size:2.1rem;color:var(--ink);font-variant-numeric:tabular-nums;}
.price-value span{font-size:.9rem;font-weight:600;color:var(--ink-soft);}
.price-note{font-size:.82rem;color:var(--ink-soft);}
.price-list{list-style:none;margin:0;padding:0;display:grid;gap:.6rem;font-size:.92rem;}
.price-list li{position:relative;padding-left:1.4rem;color:var(--ink);}
.price-list li::before{content:"";position:absolute;left:0;top:.5em;width:.85rem;height:2px;background:var(--accent);transform:rotate(-30deg);transform-origin:left center;}

.cta-band{background:var(--contrast-bg);color:var(--contrast-fg);border-radius:6px;padding:clamp(2.25rem,5vw,3.5rem);display:flex;flex-wrap:wrap;justify-content:space-between;align-items:center;gap:1.5rem;}
.cta-band h2{color:var(--contrast-fg);font-size:clamp(1.4rem,2.4vw,1.9rem);max-width:24ch;}
.cta-band .btn-accent:hover{background:var(--accent-ink);}

.site-footer{border-top:1px solid var(--line);margin-top:2rem;}
.footer-grid{display:grid;grid-template-columns:1.4fr 1fr 1fr 1fr;gap:2.5rem;padding-block:3rem;}
@media (max-width:760px){.footer-grid{grid-template-columns:1fr 1fr;}}
.footer-brand{display:flex;flex-direction:column;gap:1rem;}
.footer-brand p{font-size:.92rem;max-width:32ch;}
.footer-heading{font-family:var(--font-display);font-weight:600;font-size:.78rem;letter-spacing:.1em;text-transform:uppercase;color:var(--ink-soft);margin:0 0 1rem;}
.footer-links{display:flex;flex-direction:column;gap:.65rem;}
.footer-links a{text-decoration:none;font-size:.92rem;color:var(--ink-soft);}
.footer-links a:hover{color:var(--ink);}
.footer-bottom{display:flex;flex-wrap:wrap;justify-content:space-between;gap:.75rem;padding-block:1.5rem;border-top:1px solid var(--line);font-size:.82rem;color:var(--ink-soft);}
.mockup-note{color:var(--accent-ink);}
`;
