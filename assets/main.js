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
