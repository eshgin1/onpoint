// horizontal slider
const sliderList = document.querySelector('.slider__list'),
      slide = document.querySelectorAll('.slide__wrapper'),
      sliderTrack = document.querySelector('.slider__track');

let x1Touche = 0,
    x2Touche = 0,
    XDiffTouche = 0,
    x1Click = 0,
    x2Click = 0,
    XDiffClick = 0; // разница


function toucheStart(event){
    x1Touche = event.touches[0].clientX;
}

function ToucheEnd(event){
    x2Touche = event.changedTouches[0].clientX;
    XDiffTouche = x1Touche - x2Touche; 

    if(event.target === slide[0] && XDiffTouche > 0){
        sliderTrack.style.transform = 'translateX(-100%)';
    }
    if(event.target === slide[1] && XDiffTouche > 0){
        sliderTrack.style.transform = 'translateX(-200%)';
    }
    if(event.target === slide[2] && XDiffTouche < 0){
        sliderTrack.style.transform = 'translateX(-100%)';
    }
    if(event.target === slide[1] && XDiffTouche < 0){
        sliderTrack.style.transform = 'translateX(0%)';
    }

    for(let i = 0; i < slide.length; i++){
        slide[i].style.cursor = 'grab';
    }
}

function clickStart(event){

    x1Click = event.clientX;

    for(let i = 0; i < slide.length; i++){
        slide[i].style.cursor = 'grabbing';
    }
}

function clickEnd(event){
    x2Click = event.clientX;
    XDiffClick = x1Click - x2Click;

    if(event.target === slide[0] && XDiffClick > 0){
        sliderTrack.style.transform = 'translateX(-100%)';
    }
    if(event.target === slide[1] && XDiffClick > 0){
        sliderTrack.style.transform = 'translateX(-200%)';
    }
    if(event.target === slide[2] && XDiffClick < 0){
        sliderTrack.style.transform = 'translateX(-100%)';
    }
    if(event.target === slide[1] && XDiffClick < 0){
        sliderTrack.style.transform = 'translateX(0%)';
    }

    for(let i = 0; i < slide.length; i++){
        slide[i].style.cursor = 'grab';
    }
}



sliderList.addEventListener('mousedown', clickStart);
sliderList.addEventListener('mouseup', clickEnd);

sliderList.addEventListener('touchstart', toucheStart);
sliderList.addEventListener('touchend', ToucheEnd);


// next Page and return on first Page

const btn = document.querySelector('.btn__slide-one'),
      link = document.querySelector('.logo');


function returnOnFirstPage(){
    sliderTrack.style.transform = 'translateX(0%)';
}

function nextPage (){
    sliderTrack.style.transform = 'translateX(-100%)';
}

btn.addEventListener('click', nextPage);
link.addEventListener('click', returnOnFirstPage);

// range 

const range = document.querySelector('.range'),
      heightTextBlock = document.querySelector('.slide__text'),
      heightBlock = heightTextBlock.clientHeight, //310
      text = document.querySelector('.text_fz25px'),
      scrollHeigth = text.scrollHeight; // 2046


range.addEventListener('input', (e) => {
    const scrollHeightByPercent = (scrollHeigth - heightBlock) / 100;
    heightTextBlock.scrollTop = scrollHeightByPercent * e.target.value;
})      


// modal 

const modalWindow = document.querySelector('.slide__modal'),
      modalClose = document.querySelector('.slide__modal-close'),
      modalList = document.querySelectorAll('.slide__modal-list'),
      arrowLeft = document.querySelector('.slide__modal-arrow_left'),
      arrowRigth = document.querySelector('.slide__modal-arrow_rigth'),
      circle = document.querySelectorAll('.slide__modal-circle'),
      btnSlideThree = document.querySelector('.btn__slide-three');

let pageIndex = 1;

function openModal (){
    modalWindow.style.display = 'flex';
}

function closeModal (e){
    if(e.target == modalClose || e.target == modalWindow){
        modalWindow.style.display = 'none';
    }
}

function showPage(n){
    if(n > modalList.length){
        pageIndex = 1;
    }
    if(n < 1){
        pageIndex = modalList.length;
    }

    for(let page of modalList){
        page.style.display = 'none';
    }
    for(let elem of circle){
        elem.classList.remove('slide__modal-circle_active');
    }
    
    modalList[pageIndex -1].style.display = 'block';
    circle[pageIndex -1].classList.add('slide__modal-circle_active');
}

showPage(pageIndex);

function nextPageInModal(){
    showPage(pageIndex += 1);
}

function prevPageInModal() {
    showPage(pageIndex -=1);
}

btnSlideThree.addEventListener('click', openModal);
modalWindow.addEventListener('click', closeModal);
arrowRigth.addEventListener('click', nextPageInModal);
arrowLeft.addEventListener('click', prevPageInModal);
