const showSidebar = function () {
  const sidebar = document.querySelector('.sidebar');
  sidebar.classList.add('showSidebar');
}

const hideSidebar = function () {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.remove('showSidebar');
}

window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  const firstPage = document.querySelector('.firstPage');
  const firstPageHeight = firstPage.offsetHeight;

  if (window.pageYOffset >= firstPageHeight) {
      navbar.classList.remove('hideNavbar');
  } else {
      navbar.classList.add('hideNavbar');
  }
});

window.addEventListener('scroll', function() {
  const footer = document.querySelector('.footer');
  const firstPage = document.querySelector('.firstPage');
  const firstPageHeight = firstPage.offsetHeight;

  if (window.pageYOffset >= firstPageHeight) {
      footer.classList.remove('hideFooter');
  } else {
      footer.classList.add('hideFooter');
  }
});

const sections = document.querySelectorAll(".section");

    window.addEventListener(
      "wheel",
      function (event) {
        event.preventDefault();

        let index = Array.from(sections).findIndex(function (
          section
        ) {
          const rect = section.getBoundingClientRect();
          return rect.top >= 0;
        });

        if (index === -1) {
          index = sections.length - 1;
        }

        if (event.deltaY > 0 && index < sections.length - 1) {
          sections[index + 1].scrollIntoView({
            behavior: "smooth",
          });
        } else if (event.deltaY < 0 && index > 0) {
          sections[index - 1].scrollIntoView({
            behavior: "smooth",
          });
        }
      },
      { passive: false }
    );

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    console.log(entry)
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    } else {
      entry.target.classList.remove('show');
    }
  })
});

const hiddenElements = document.querySelectorAll('.hidden, .hiddenRight');
hiddenElements.forEach((el) => observer.observe(el));

const buttons = document.querySelectorAll("[data-carousel-button]")

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const offset = button.dataset.carouselButton === "next" ? 1 : -1
    const slides = button
      .closest("[data-carousel]")
      .querySelector("[data-slides]")

    const activeSlide = slides.querySelector("[data-active]")
    let newIndex = [...slides.children].indexOf(activeSlide) + offset
    if (newIndex < 0) newIndex = slides.children.length - 1
    if (newIndex >= slides.children.length) newIndex = 0

    slides.children[newIndex].dataset.active = true
    delete activeSlide.dataset.active
  })
})

let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

setInterval(() => {
    slides[currentSlide].removeAttribute('data-active');
    currentSlide = (currentSlide + 1) % totalSlides;
    slides[currentSlide].setAttribute('data-active', '');
}, 4000);