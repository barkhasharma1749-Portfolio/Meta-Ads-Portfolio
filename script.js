/* ==========================================================================
   BARKHA SHARMA — META ADS SPECIALIST PORTFOLIO
   Vanilla JS: preloader, navbar, mobile menu, counters, role rotator,
   scroll progress, back-to-top, FAQ accordion, AOS + Swiper init
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

  /* ---------------- PRELOADER ---------------- */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => preloader.classList.add("hidden"), 400);
  });

  /* ---------------- AOS INIT ---------------- */
  if (window.AOS) {
    AOS.init({ once: true, duration: 800, easing: "ease-out-cubic" });
  }

  /* ---------------- SWIPER TESTIMONIALS ---------------- */
  if (window.Swiper) {
    new Swiper(".testimonial-swiper", {
      loop: true,
      spaceBetween: 24,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: { el: ".swiper-pagination", clickable: true },
      breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1100: { slidesPerView: 3 },
      },
    });
  }

  /* ---------------- STICKY NAVBAR ---------------- */
  const navbar = document.getElementById("navbar");
  const backToTop = document.getElementById("backToTop");
  const scrollProgress = document.getElementById("scrollProgress");

  const onScroll = () => {
    const scrollY = window.scrollY;
    navbar.classList.toggle("scrolled", scrollY > 40);
    backToTop.classList.toggle("visible", scrollY > 500);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgress.style.width = progress + "%";

    updateActiveNavLink();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  /* ---------------- MOBILE NAV TOGGLE ---------------- */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.classList.remove("active");
      navLinks.classList.remove("open");
    });
  });

  /* ---------------- ACTIVE NAV LINK ON SCROLL ---------------- */
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll(".nav-link[href^='#']");

  function updateActiveNavLink() {
    let currentId = "";
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 140 && rect.bottom >= 140) currentId = section.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle("active", a.getAttribute("href") === `#${currentId}`);
    });
  }

  /* ---------------- ANIMATED COUNTERS ---------------- */
  const counters = document.querySelectorAll("[data-count]");

  function animateCounter(el) {
    const target = parseInt(el.getAttribute("data-count"), 10);
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1800;
    const startTime = performance.now();

    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString("en-IN") + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString("en-IN") + suffix;
    }
    requestAnimationFrame(tick);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  counters.forEach((c) => counterObserver.observe(c));

  /* ---------------- HERO ROLE ROTATOR ---------------- */
  const roles = ["Meta Ads Specialist", "Performance Marketing Expert", "Lead Generation Specialist"];
  const rotatorEl = document.getElementById("roleRotator");
  let roleIndex = 0;

  function cycleRole() {
    rotatorEl.style.opacity = 0;
    setTimeout(() => {
      roleIndex = (roleIndex + 1) % roles.length;
      rotatorEl.textContent = roles[roleIndex];
      rotatorEl.style.opacity = 1;
    }, 350);
  }
  rotatorEl.style.transition = "opacity 0.35s ease";
  setInterval(cycleRole, 2600);

  /* ---------------- FAQ ACCORDION ---------------- */
  document.querySelectorAll(".faq-item").forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach((openItem) => {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });

  /* ---------------- FOOTER YEAR ---------------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------------- SMOOTH SCROLL FOR ANCHOR LINKS ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 90;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: "smooth" });
        }
      }
    });
  });

});
