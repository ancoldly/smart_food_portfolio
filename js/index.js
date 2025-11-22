document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".top-header");
  const navLinks = document.querySelectorAll(".nav a");

  const sections = [
    "about",
    "brand",
    "fonts",
    "colors",
    "screens",
    "guidelines",
  ].map((id) => document.getElementById(id));

  const setActiveLink = () => {
    const scrollPos = window.scrollY + 120; // trừ header

    let currentId = null;
    for (const sec of sections) {
      if (!sec) continue;
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.id;
        break;
      }
    }

    navLinks.forEach((link) => {
      const hrefId = link.getAttribute("href").replace("#", "");
      if (hrefId === currentId) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  };

  // shadow header khi scroll
  const onScroll = () => {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
    setActiveLink();
  };

  window.addEventListener("scroll", onScroll);
  onScroll(); // init

  // smooth scroll custom (cho chắc, dù CSS đã có)
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").replace("#", "");
      const target = document.getElementById(targetId);
      if (!target) return;

      const top =
        target.getBoundingClientRect().top + window.scrollY - 80; // chừa header

      window.scrollTo({
        top,
        behavior: "smooth",
      });
    });
  });
});
