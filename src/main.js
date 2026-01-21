import "./styles.css";
import { translations } from "./translations";

const loader = document.querySelector(".app-loader");
document.body.classList.add("is-loading");

const slowTimer = window.setTimeout(() => {
  loader?.classList.add("slow");
}, 1800);

const fallbackTimer = window.setTimeout(() => {
  loader?.classList.add("hide");
  document.body.classList.remove("is-loading");
}, 5000);

window.addEventListener("load", () => {
  window.clearTimeout(slowTimer);
  window.clearTimeout(fallbackTimer);
  loader?.classList.add("hide");
  document.body.classList.remove("is-loading");
});

const i18nElements = document.querySelectorAll("[data-i18n]");
const i18nAttrElements = document.querySelectorAll("[data-i18n-attr]");
const langButtons = document.querySelectorAll("[data-lang]");

const setLanguage = (lang) => {
  const dictionary = translations[lang] || translations.ru;
  document.documentElement.lang = lang;

  i18nElements.forEach((el) => {
    const key = el.dataset.i18n;
    if (dictionary[key]) {
      el.textContent = dictionary[key];
    }
  });

  i18nAttrElements.forEach((el) => {
    const attr = el.dataset.i18nAttr;
    const key = el.dataset.i18nKey;
    if (attr && key && dictionary[key]) {
      el.setAttribute(attr, dictionary[key]);
    }
  });

  langButtons.forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });
};

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setLanguage(btn.dataset.lang);
  });
});

setLanguage("ru");

const menuOpenBtn = document.querySelector("[data-menu-open]");
const menuCloseTargets = document.querySelectorAll("[data-menu-close]");
const menu = document.getElementById("mobileMenu");
const root = document.documentElement;

const openMenu = () => {
  root.classList.add("menu-open");
  menu?.setAttribute("aria-hidden", "false");
  menuOpenBtn?.setAttribute("aria-expanded", "true");
};

const closeMenu = () => {
  root.classList.remove("menu-open");
  menu?.setAttribute("aria-hidden", "true");
  menuOpenBtn?.setAttribute("aria-expanded", "false");
};

menuOpenBtn?.addEventListener("click", openMenu);
menuCloseTargets.forEach((el) => el.addEventListener("click", closeMenu));
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

const animated = document.querySelectorAll(".animate");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
);

animated.forEach((item) => observer.observe(item));

