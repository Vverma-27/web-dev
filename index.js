const arrows = document.querySelectorAll('.arrow');
const underscores = document.querySelectorAll('.underscore');
const images = document.querySelectorAll('.imageContainer');
const sections = document.querySelectorAll('.section');
const bannerImages = document.querySelectorAll('.banner-image');
const contents = document.querySelectorAll('.content');
const navbar = document.querySelector('nav');
const links = document.querySelectorAll('.link');
const texts = document.querySelectorAll('.text');
const textfs = document.querySelectorAll('.textf');
const answers = document.querySelectorAll('.answer');
const answerfs = document.querySelectorAll('.answerf');
let currentSlide = 0;
let currentOpenText = -1;
let currentOpenFaq = -1;
const changeCurrentImage = () =>{
    images.forEach((image, i) =>
        {
            image.style.transform = (`translate(${(i - currentSlide) * 4000}px)`);
        })
}
const intervalFunc = () =>
{
    underscores[currentSlide].classList.remove('active');
    currentSlide = currentSlide < 2 ? currentSlide + 1 : 0;
    underscores[currentSlide].classList.add('active');
    changeCurrentImage();
}
let id = setInterval(intervalFunc, 3000);
links.forEach(link => link.addEventListener('click', (e) =>
{
    e.preventDefault();
    const id = e.target.href.split('#')[1];
    const section = document.getElementById(id);
    section.scrollIntoView({ behavior: "smooth"});
}))
arrows.forEach(arr =>
{
    arr.addEventListener('click', (e) =>
    {
        clearInterval(id);
        underscores[currentSlide].classList.remove('active');
        const left = e.target.dataset.value === "left" ;
        // const oldActive = currentSlide;
        if (left) {
            currentSlide = currentSlide > 0 ? currentSlide - 1 : 2;
        }
        else {
            currentSlide = currentSlide < 2 ? currentSlide+ 1 : 0;
        }
        changeCurrentImage();
        id = setInterval(intervalFunc, 3000);
        underscores[currentSlide].classList.add('active');
    })
})
underscores.forEach(underscore =>
{
    underscore.addEventListener('click', (e) =>
    {
        clearInterval(id);
        underscores[currentSlide].classList.remove('active');
        currentSlide = parseInt(e.target.dataset.value)-1;
        changeCurrentImage();
        id = setInterval(intervalFunc, 3000);
        underscores[currentSlide].classList.add('active');
    })
})
texts.forEach(text =>
{
    text.addEventListener('click', (e) =>
    {
        if (!e.target.classList.contains('text')) currentOpenText = e.target.parentElement.dataset.value-1;
        else currentOpenText = e.target.dataset.value - 1;
        answers.forEach((answer, i) => answer.classList.toggle('active', (i === currentOpenText)));
    });
})
textfs.forEach(text =>
{
    text.addEventListener('click', (e) =>
    {
        if (!e.target.classList.contains('textf')) currentOpenFaq = e.target.parentElement.dataset.value-1;
        else currentOpenFaq = e.target.dataset.value - 1;
        answerfs.forEach((answer, i) => {answer.classList.toggle('active', (i === currentOpenFaq))});
    },true);
})
document.addEventListener('scroll', () =>
{
    if(window.scrollY>10){
    navbar.style.background = "rgba(255,255,255,0.5)";
    }
    else {
        navbar.style.background = "rgba(0,0,0,0.5)";
}
    links.forEach((link) => link.classList.toggle('dark', window.scrollY > 10));
})