const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');
if(menu&&nav){
  const closeMobileMenu=()=>{menu.setAttribute('aria-expanded','false');nav.classList.remove('open');document.body.classList.remove('mobile-nav-open')};
  menu.addEventListener('click',()=>{
    const opening=menu.getAttribute('aria-expanded')!=='true';
    menu.setAttribute('aria-expanded',String(opening));
    nav.classList.toggle('open',opening);
    document.body.classList.toggle('mobile-nav-open',opening);
  });
  nav.addEventListener('click',(event)=>{if(event.target.closest('a'))closeMobileMenu()});
  document.addEventListener('keydown',(event)=>{if(event.key==='Escape'&&nav.classList.contains('open')){closeMobileMenu();menu.focus()}});
  window.addEventListener('resize',()=>{if(window.innerWidth>980)closeMobileMenu()});
}document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
/* Shared announcement and navigation for every page */
(() => {
  const announcement = document.querySelector(".announcement");

  if (announcement) {
    announcement.innerHTML = `
      <div class="global-announcement-track">
        <span>
          Now supporting behavioral-health organizations across the U.S. and U.K. markets.
          <b>✦</b>
           Schedule a FREE Call today.
        </span>

        <span aria-hidden="true">
          Now supporting behavioral-health organizations across the U.S. and U.K. markets.
          <b>✦</b>
          Schedule a FREE Call today.
        </span>
      </div>
    `;
  }

  const navigation = document.querySelector("#nav");

  if (navigation) {
    navigation.innerHTML = `
      <a href="/">Home</a>
      <div class="services-nav">
        <div class="services-nav-trigger">
          <a href="/services/">Services</a>
          <button class="services-toggle" type="button" aria-expanded="false" aria-controls="services-mega" aria-label="Show Services menu"><span aria-hidden="true">⌄</span></button>
        </div>
        <div class="services-mega" id="services-mega" hidden>
          <div class="mega-intro">
            <span class="mega-eyebrow">Operational support</span>
            <strong>Services built around your practice</strong>
            <p>Choose one function or combine services into a support plan.</p>
            <a class="mega-all" href="/services/">Explore all services <span aria-hidden="true">→</span></a>
          </div>
          <div class="mega-links">
            <a href="/services/#documentation"><strong>Clinical Documentation</strong><span>Records, plans and progress notes</span></a>
            <a href="/services/#authorizations"><strong>Authorizations &amp; Utilization</strong><span>Submissions and deadline tracking</span></a>
            <a href="/services/#billing"><strong>Billing &amp; Revenue Cycle</strong><span>Claims, denials and reconciliation</span></a>
            <a href="/services/#credentialing"><strong>Credentialing &amp; Enrollment</strong><span>Applications and payer follow-up</span></a>
            <a href="/services/#intake"><strong>Intake &amp; Scheduling</strong><span>Referrals and appointment coordination</span></a>
            <a href="/services/#compliance"><strong>Compliance &amp; Quality</strong><span>Audits and accreditation readiness</span></a>
            <a href="/services/#training"><strong>Training &amp; Development</strong><span>Onboarding and staff resources</span></a>
            <a href="/services/#automation"><strong>Workflow Automation</strong><span>Alerts, trackers and dashboards</span></a>
          </div>
        </div>
      </div>
      <a href="/who-we-serve/">Who We Serve</a>
      <a href="/about/">About</a>
      <div class="services-nav areas-nav">
        <div class="services-nav-trigger">
          <a href="/service-areas/">Service Areas</a>
          <button class="services-toggle" type="button" aria-expanded="false" aria-controls="areas-mega" aria-label="Show Service Areas menu"><span aria-hidden="true">⌄</span></button>
        </div>
        <div class="services-mega areas-mega" id="areas-mega" hidden>
          <a href="/service-areas/#united-states"><strong>United States</strong><span>Maryland, Pennsylvania, Delaware and nationwide support</span></a>
          <a href="/service-areas/#united-kingdom"><strong>United Kingdom</strong><span>Selected U.K. markets</span></a>
        </div>
      </div>
      <a href="/faq/">FAQs</a>
      <a class="nav-cta" href="/contact/">Book Your Free Call</a>
    `;

    const menus = [...navigation.querySelectorAll(".services-nav")].map((container) => {
      const toggle = container.querySelector(".services-toggle");
      const panel = container.querySelector(".services-mega");
      const close = () => {
        panel.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      };
      toggle.addEventListener("click", () => {
        const opening = panel.hidden;
        menus.forEach((menu) => menu.close());
        if (opening) {
          panel.hidden = false;
          toggle.setAttribute("aria-expanded", "true");
        }
      });
      const desktopHover = window.matchMedia("(min-width: 981px) and (hover: hover)");
      container.addEventListener("pointerenter", () => {
        if (!desktopHover.matches) return;
        menus.forEach((menu) => menu.close());
        panel.hidden = false;
        toggle.setAttribute("aria-expanded", "true");
      });
      container.addEventListener("pointerleave", () => {
        if (desktopHover.matches) close();
      });
      panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", close));
      return { container, toggle, panel, close };
    });
    document.addEventListener("click", (event) => {
      menus.forEach((menu) => {
        if (!menu.container.contains(event.target)) menu.close();
      });
    });
    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;
      menus.forEach((menu) => {
        if (!menu.panel.hidden) {
          menu.close();
          menu.toggle.focus();
        }
      });
    });

    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";

    navigation.querySelectorAll("a").forEach((link) => {
      if (link.getAttribute("href") === currentPage) {
        link.setAttribute("aria-current", "page");
      }
    });
  }
})();
/* Reliable announcement bar on every page */
(() => {
  let bar = document.querySelector(".announcement");
  const header = document.querySelector(".site-header");

  if (!bar) {
    bar = document.createElement("div");
    bar.className = "announcement";
    bar.setAttribute("role", "region");
    bar.setAttribute("aria-label", "Service announcement");

    if (header) {
      header.parentNode.insertBefore(bar, header);
    } else {
      document.body.prepend(bar);
    }
  }

  const message =
    "Now supporting behavioral-health organizations across the U.S. and U.K. markets. ✦ <strong> Schedule a FREE Call today!!</strong>";

  bar.innerHTML = `
    <div class="reliable-marquee">
      <span>${message}</span>
      <span aria-hidden="true">${message}</span>
      <span aria-hidden="true">${message}</span>
      <span aria-hidden="true">${message}</span>
    </div>
  `;
})();
/* Shared detailed footer for every page */
(() => {
  const footer = document.querySelector("footer");

  if (!footer) return;

  const currentYear = new Date().getFullYear();

  footer.className = "global-footer";

  footer.innerHTML = `
    <div class="footer-main">
      <div class="footer-brand-column">
        <a class="footer-logo" href="/">
          <img src="assets/logo.jpeg" alt="Bevora Health Operations logo">

          <span>
            BEVORA
            <small>HEALTH OPERATIONS</small>
          </span>
        </a>

        <p>
          The operational backbone behind every thriving practice.
        </p>

        <p class="footer-tagline">
          We handle the operations. You focus on care.
        </p>

        <a class="footer-assessment-button" href="/contact/">
          Book Your Free Call
        </a>
      </div>

      <div class="footer-column">
        <h3>Explore</h3>
        <a href="/">Home</a>
        <a href="/about/">About Bevora</a>
        <a href="/services/">Services</a>
        <a href="/who-we-serve/">Who We Serve</a>
        <a href="/service-areas/">Service Areas</a>
        <a href="/faq/">FAQs</a>
      </div>

      <div class="footer-column">
        <h3>Operational Support</h3>
        <a href="/services/#documentation">Clinical Documentation</a>
        <a href="/services/#authorizations">Authorizations & Utilization</a>
        <a href="/services/#billing">Billing & Revenue Cycle</a>
        <a href="/services/#credentialing">Credentialing & Enrollment</a>
        <a href="/services/#compliance">Compliance & Quality</a>
        <a href="/services/#automation">Workflow Automation</a>
      </div>

      <div class="footer-column footer-contact">
        <h3>Contact</h3>

        <a href="tel:+12157920894">
          <span>Phone</span>
          +1 (215) 792-0894
        </a>

        <a href="mailto:admin@bevorahealth.com">
          <span>Email</span>
          admin@bevorahealth.com
        </a>

        <div class="footer-service-markets">
          <span>Service Markets</span>
          <p>Maryland · Pennsylvania · Delaware</p>
          <p>London · Manchester · Liverpool</p>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© ${currentYear} Bevora Health Operations. All rights reserved.</p>

      <div>
        <a href="/privacy/">Privacy Notice</a>
        <a href="/contact/">Contact</a>
      </div>

      
    </div>
  `;
})();
/* Correct active navigation item for clean URLs */
(function () {
  let currentPage = window.location.pathname
    .replace(/^\/+|\/+$/g, "")
    .replace(/\/index\.html$/, "")
    .replace(/\.html$/, "");

  if (!currentPage || currentPage === "index") {
    currentPage = "home";
  }

  const pageLabels = {
    home: "Home",
    services: "Services",
    "who-we-serve": "Who We Serve",
    about: "About",
    "service-areas": "Service Areas",
    faq: "FAQs",
    contact: "Book Your Free Call"
  };

  document.querySelectorAll("#nav a").forEach(function (link) {
    link.removeAttribute("aria-current");

    if (link.textContent.trim() === pageLabels[currentPage]) {
      link.setAttribute("aria-current", "page");
    }
  });
})();

/* Keep sticky offsets accurate and provide a back-to-top button. */
(() => {
  const bar = document.querySelector(".announcement");
  const header = document.querySelector(".site-header");
  const syncOffsets = () => {
    if (bar) document.documentElement.style.setProperty("--announcement-height", bar.offsetHeight + "px");
    if (header) document.documentElement.style.setProperty("--header-height", header.offsetHeight + "px");
  };
  syncOffsets();
  if ("ResizeObserver" in window) {
    const observer = new ResizeObserver(syncOffsets);
    if (bar) observer.observe(bar);
    if (header) observer.observe(header);
  } else window.addEventListener("resize", syncOffsets);
  const button = document.createElement("button");
  button.type = "button";
  button.className = "back-to-top";
  button.setAttribute("aria-label", "Back to top");
  button.title = "Back to top";
  button.hidden = true;
  button.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.append(button);
  const updateVisibility = () => { button.hidden = window.scrollY < 400; };
  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
  button.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    const home = document.querySelector(".site-header .brand");
    if (home) home.focus({ preventScroll: true });
  });
})();
