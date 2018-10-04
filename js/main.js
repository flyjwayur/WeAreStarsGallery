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

//Get image data and display them inside of parent element
const displayImgs = () => {
    const imageWrapper = document.querySelector('.imageWrapper');
    infoData.forEach(info => {
        imageWrapper.insertAdjacentHTML("afterbegin",
        `<img src="images/${info.src}" alt="info.src" width="300px", height="400px">`
    )})
}

displayImgs();