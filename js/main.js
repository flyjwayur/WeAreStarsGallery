console.log(infoData);

/* Get image srcs and display in html
const displayImgs = () => { 
    return arrayData.map( info => {
        return `<img src="images/${info.src}" alt="info.src" width="300px", height="400px">`
}).join(""); 
}

const imageWrapper = document.querySelector('.imageWrapper');
imageWrapper.innerHTML = displayImgs();
*/


/*
<div id="imgModal" class="modal">
    <span class="close cursor" onclick="closeModal()">&times;</span>
    <div class="modal_content"></div>
</div>
*/

//openModal
const openModal = () => {
    document.querySelector('#imgModal').style.display = "block";
    console.log("openModal");
}

const closeModal = () => {
    document.querySelector('#imgModal').style.display = "none";
    console.log("closeModal");
}

/*
const createModalHTMLelements = () => {
    const imageWrapper = document.querySelector('.imageWrapper');
    const modal = document.createElement('div');
    const modal_content = document.createElement('div');
    const close_span = document.createElement('span');
    const imgModal = document.createElement('div');
    modal.className = 'modal';
    modal.setAttribute('id', 'imgModal');
    modal_content.className = 'modal_content';
    close_span.classList.add('close', 'cursor');
    close_span.addEventListener('click', closeModal);
    close_span.textContent = '&times;';
    imageWrapper.appendChild(imgModal);
    imgModal.appendChild(close_span);
    imgModal.appendChild(modal_content);
}*/

//Slide 
const showSlides = n => {
    let slideIndex = n;
    let slides = document.querySelectorAll('.imgSlide');
    
    if(n > slides.length) { slideIndex = 0};
    if(n < 0) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex].style.display = "block";
} 

const plusSlides = n => {
    showSlides(slideIndex += n);
}

const currentSlide = n => {
    showSlides(slideIndex = n);
    console.log("current index", n);
}

//Get image data and display them inside of parent element
const displayImgs = () => {
    const imageWrapper = document.querySelector('.imageWrapper');
    infoData.forEach((info, index)=> {   
        imageWrapper.insertAdjacentHTML('beforeend',
        `<img src="images/${info.src}" alt="info.src" width="300px", height="400px"
        onclick="openModal();currentSlide(${index})" class="hover-shadow">`) 
    })
}

displayImgs();
const displayModal = () => {
    //createModalHTMLelements(); // check!! 
    let modal_content = document.querySelector('.modal_content');
    infoData.forEach((info, index) => {
        let slideIndex = index + 1;
        modal_content.insertAdjacentHTML('beforeend',
        `<div class="imgSlide"><div class="numbertext">${slideIndex} / ${infoData.length}</div><img src="images/${info.src}" style="width:100%"></div>`) 
    })
}

displayModal();
