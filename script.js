const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnleft = document.querySelector(".slider--btn--left");
const btnright = document.querySelector(".slider--btn--right");
const cities = document.querySelector(".cities");
// const city= document.querySelectorAll('.city')
const scroll_btn = document.querySelector(".scroll--btn");
const section1 = document.querySelector("#section--1");

let currentslide = 0;
const maxslide = slides.length;

scroll_btn.addEventListener("click", function () {
  const sec1coords = section1.getBoundingClientRect();
  section1.scrollIntoView({ behavior: "smooth" });
});

// const createDots = function(){
//     slides.forEach(function(_,i){
//       cities.insertAdjacentHTML('beforeend',
//       `<button class="city" data-slide="${i}">${iqcities[i]}</button>`)
//     })
//   };
// createDots();

// const city = document.querySelectorAll('.city');

//    const nextcity = function(slide){

//     city.forEach(function(e,i){
//     e.style.transform = `translateX(${300*(i-slide)}%)`
// })
// }

// nextcity (5);

// const acitvedot = function(slide){
//     document.querySelectorAll('.city').forEach(dot=>
//         dot.classList.remove('city--active'));

//         document.querySelector(`.city[data-slide = "${slide}"]`).
//         classList.add( 'city--active');
// };

const goToslide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
  );
};

// city.forEach((s,i)=> (s.style.color = 'red'));
goToslide(0);

const nextslide = function () {
  if (currentslide === maxslide - 1) {
    currentslide = 0;
  } else {
    currentslide++;
  }
  goToslide(currentslide);
  //    nextcity(currentslide);
  //    acitvedot(currentslide);
};

// const nextCity = function(){

// }

// citiessliderright.addEventListener('click',);
// citiessliderleft.addEventListener('click',);
const prevuseslide = function () {
  if (currentslide === 0) {
    currentslide = maxslide - 1;
  } else {
    currentslide--;
  }

  goToslide(currentslide);
  // acitvedot(currentslide);
};

btnright.addEventListener("click", nextslide);
btnleft.addEventListener("click", prevuseslide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft") prevuseslide();
  if (e.key === "ArrowRight") nextslide();
});

//    cities.textContent=iqcities[currentslide];

// cities.addEventListener('click',function(e){
//     if(e.target.classList.contains('city')){
//         const {slide} = e.target.dataset;
//         goToslide(slide);
//         acitvedot(slide);
//     }
// })
// acitvedot(currentslide);

const imgTargets = document.querySelectorAll("img[data-src]");

const loadimg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy--loading");
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

const allsection = document.querySelectorAll(".section");

const showsection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
};

const sectionobs = new IntersectionObserver(showsection, {
  root: null,
  threshold: 0.15,
});
allsection.forEach(function (section) {
  sectionobs.observe(section);
  section.classList.add("section--hidden");
});

const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
});

headerObserver.observe(header);

document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({
      behavior: "smooth",
    });
  }
});

const options = document.querySelectorAll(".optionTap");
const optionsContainer = document.querySelector(".options_container");
const optionsContent = document.querySelectorAll(".optionContent");

optionsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".optionTap");
  if (!clicked) return;

  options.forEach((e) => e.classList.remove("optionActive"));
  optionsContent.forEach((e) => e.classList.remove("optioncontentacitve"));

  clicked.classList.add("optionActive");

  document
    .querySelector(`.optionContent--${clicked.dataset.tab}`)
    .classList.add("optioncontentacitve");
});
