document.getElementById("year").textContent = new Date().getFullYear();

const translations = {
  en: {
    title: "Professional Health & Wellness Solutions You Can Trust",
    cta: "Request Information"
  },
  fr: {
    title: "Solutions professionnelles de santé et de bien-être dignes de confiance",
    cta: "Demander des renseignements"
  }
};

document.querySelectorAll("[data-lang]").forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.dataset.lang;
    document.documentElement.lang = lang;
    document.getElementById("heroTitle").textContent = translations[lang].title;
    document.getElementById("heroCTA").textContent = translations[lang].cta;
  });
});