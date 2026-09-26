const menu=document.querySelector('.menu'),nav=document.querySelector('#nav');if(menu&&nav)menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')==='true';menu.setAttribute('aria-expanded',String(!open));nav.classList.toggle('open')});document.querySelectorAll('[data-year]').forEach(x=>x.textContent=new Date().getFullYear());
/* Shared announcement and navigation for every page */
(() => {
  const announcement = document.querySelector(".announcement");

  if (announcement) {
    announcement.innerHTML = `
      <div class="global-announcement-track">
        <span>
          Now supporting behavioral-health organizations across the U.S. and selected U.K. markets.
          <b>✦</b>
          Schedule an Operational Assessment today.
        </span>

        <span aria-hidden="true">
          Now supporting behavioral-health organizations across the U.S. and selected U.K. markets.
          <b>✦</b>
          Schedule an Operational Assessment today.
        </span>
      </div>
    `;
  }

  const navigation = document.querySelector("#nav");

  if (navigation) {
    navigation.innerHTML = `
      <a href="index.html">Home</a>
      <a href="services.html">Services</a>
      <a href="who-we-serve.html">Who We Serve</a>
      <a href="about.html">About</a>
      <a href="service-areas.html">Service Areas</a>
      <a href="faq.html">FAQs</a>
      <a class="nav-cta" href="contact.html">Schedule an Assessment</a>
    `;

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
    "Now supporting behavioral-health organizations across the U.S. and selected U.K. markets. ✦ Schedule an Operational Assessment today.";

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
        <a class="footer-logo" href="index.html">
          <img src="assets/logo.jpeg" alt="Bevora Health Operations logo">

          <span>
            BEVORA
            <small>HEALTH OPERATIONS</small>
          </span>
        </a>

        <p>
          The operational backbone behind thriving behavioral-health
          organizations.
        </p>

        <p class="footer-tagline">
          We handle the operations. You focus on care.
        </p>

        <a class="footer-assessment-button" href="contact.html">
          Schedule an Operational Assessment
        </a>
      </div>

      <div class="footer-column">
        <h3>Explore</h3>
        <a href="index.html">Home</a>
        <a href="about.html">About Bevora</a>
        <a href="services.html">Services</a>
        <a href="who-we-serve.html">Who We Serve</a>
        <a href="service-areas.html">Service Areas</a>
        <a href="faq.html">FAQs</a>
      </div>

      <div class="footer-column">
        <h3>Operational Support</h3>
        <a href="services.html#documentation">Clinical Documentation</a>
        <a href="services.html#authorizations">Authorizations & Utilization</a>
        <a href="services.html#billing">Billing & Revenue Cycle</a>
        <a href="services.html#credentialing">Credentialing & Enrollment</a>
        <a href="services.html#compliance">Compliance & Quality</a>
        <a href="services.html#automation">Workflow Automation</a>
      </div>

      <div class="footer-column footer-contact">
        <h3>Contact</h3>

        <a href="tel:+12157920894">
          <span>Phone</span>
          +1 (215) 792-0894
        </a>

        <a href="mailto:bevorahealthoperations@gmail.com">
          <span>Email</span>
          bevorahealthoperations@gmail.com
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
        <a href="privacy.html">Privacy Notice</a>
        <a href="contact.html">Contact</a>
      </div>

      <p class="footer-disclaimer">
        Readiness support does not guarantee payer approval, reimbursement
        or accreditation.
      </p>
    </div>
  `;
})();
