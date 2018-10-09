// Draw Star and background
window.onload = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const image = document.createElement("img");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Draw backgroundv
  const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  backgroundGradient.addColorStop(0, "#171e26");
  backgroundGradient.addColorStop(1, "#3f586b");
  ctx.fillStyle = backgroundGradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  //Draw Stars
  function Star() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.radius = Math.random() * 20;
    this.selected = false;

    this.draw = function() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

      ctx.shadowColor = "#edecda"; //'#e3eaef';
      ctx.shadowBlur = Math.random() * 20 + 20;

      ctx.fillStyle = "#fff";
      ctx.fill();

      ctx.closePath();
      ctx.restore();
    };

    this.drawBiggerStar = function() {
      ctx.save();
      ctx.beginPath();
      ctx.shadowColor = "#edecda"; //'#e3eaef';
      ctx.shadowBlur = Math.random() * 2 + 1;
      ctx.fillStyle = "#fff";
      ctx.fillRect(this.x, this.y, 600, 800);
      ctx.closePath();
      ctx.restore();
    };
  }

  //Star creations
  const createStars = () => {
    let stars = [];
    let numStar = 19;
    for (let i = 0; i < numStar; i++) {
      stars.push(new Star());
     }
    // for (let i = 0; i < numStar; i++) {
    //   let angle = ((i * 10) / (numStar / 2)) * Math.PI;
    //   let x = 200 * Math.cos(angle) + canvas.width / 2;
    //   let y = 200 * Math.sin(angle) + canvas.height / 2;
    //   stars.push(new Star(x, y, angle));
    // }
    return stars;
  };

  const stars = createStars();
  console.log(stars);
  const drawStars = () => {
    for (let star of stars) {
      star.draw();
    }
  };

  drawStars();

  const isClickInArc = function(mouseX, mouseY, arc) {
    let radius = arc.radius;
    //   console.log(mouseX, mouseY, "radius:", radius, "arc.x:",arc.x, "arc.y:", arc.y);
    //   console.log(
    //       "leftside", (Math.pow((mouseX - arc.x), 2) + Math.pow((mouseY - arc.y), 2))
    //       , "rightside", Math.pow(radius,2),
    //     (Math.pow((mouseX - arc.x), 2) + Math.pow((mouseY - arc.y), 2)) <= Math.pow(radius,2)
    //   );
    return (
      Math.pow(mouseX - arc.x, 2) + Math.pow(mouseY - arc.y, 2) <=
      Math.pow(radius, 2)
    );
  };

  const createModalBox = () => {
    let container = document.querySelector(".container");
    let newInfoContainer = document.createElement("div");
    newInfoContainer.style.backgroundColor = "yellow";
    newInfoContainer.className = "infoContainer";
    container.appendChild(newInfoContainer);
  };

  createModalBox();

  canvas.addEventListener("click", e => {
    stars.forEach(star => {
      //for(let i = 0; i < stars.length; i++){
      //console.log(isClickInArc(mouseX, mouseY, star));
      let selectedinfoCon = document.querySelector(".infoContainer");
      let rect = canvas.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      let mouseY = e.clientY - rect.top;

      if (star.selected === true) {
        star.selected = false;
      }

      if (
        isClickInArc(mouseX, mouseY, star)
        // (mouseX >= (stars[i].x - stars[i].radius))
        //  && (mouseX <= (stars[i].x + stars[i].radius))
        //  && (mouseY >= (stars[i].y - stars[i].radius))
        //  && (mouseY <= (stars[i].y + stars[i].radius))
      ) {
        //star.selected = !star.selected;
        star.selected = true;
        if (star.selected === true) {
          selectedinfoCon.style.top = `${mouseY - canvas.height / 3}px`;
          selectedinfoCon.style.left = `${mouseX}px`;
          selectedinfoCon.style.display = "block";
        } else {
          selectedinfoCon.style.display = "none";
        }
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
        ctx.stroke();
      }

      console.log(stars);
    });
    //let starSize = ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2, false);
    //}
  });

  //Mouse event

  /* const onMouseDown =  e => {
    let rect = canvas.getBoundingClientRect();
    let mouseX = e.clientX - rect.left;
    let mouseY = e.clientY - rect.top;
    let container = document.querySelector('.container');
    

        stars.forEach( star => {   
            console.log(mouseX, mouseY);
            star.seleted = !star.selected;
            console.log(star, star.selected);
            //star.drawBiggerStar();
            canvas.style.cursor = "pointer";
            let infoContainer = document.createElement('div');
            infoContainer.style.backgroundColor = "yellow";
            infoContainer.style.top = mouseX + "px";
            infoContainer.style.left = mouseY + "px";
            infoContainer.classList.add("infoContainer", "selected");
            container.appendChild(infoContainer); 
            if(mouseX >= star.x && mouseX <= star.x + star.radius &&
            mouseY >= star.y && mouseY <= star.y + star.radius){
                    infoContainer.style.display = "block";
            }else{
                infoContainer.style.display = "none";
            }
        })
    };

    canvas.addEventListener("mousedown", onMouseDown); */

  /*    const onMouseMove = e => {
        //let rect = canvas.getBoundingClientRect();
        //let mouseX = e.clientX - rect.left;
        //let mouseY = e.clientY - rect.top;
        let selectedContainer = document.querySelector('.selected')

        canvas.removeEventListener("mousemove", onMouseMove);
        document.body.removeEventListener("mousemove", onMouseMove);
        if(selectedContainer){
            selectedContainer.style.display = "none";
        }
        //ctx.clearRect(infoContainer.x, infoContainer.y, infoContainer.width, infoContainer.height);
    }

    canvas.addEventListener("mouseup", onMouseMove); */
};

//openModal
const openModal = () => {
  document.querySelector("#imgModal").style.display = "block";
  console.log("openModal");
};

const closeModal = () => {
  document.querySelector("#imgModal").style.display = "none";
  console.log("closeModal");
};

const createModalHTMLelements = () => {
  const imageWrapper = document.querySelector(".imageWrapper");
  const modal = document.createElement("div");
  const modal_content = document.createElement("div");
  const close_span = document.createElement("span");
  const imgModal = document.createElement("div");
  modal.className = "modal";
  modal.setAttribute("id", "imgModal");
  modal_content.className = "modal_content";
  close_span.classList.add("close", "cursor");
  close_span.addEventListener("click", closeModal);
  close_span.textContent = "&times;";
  imageWrapper.appendChild(imgModal);
  imgModal.appendChild(close_span);
  imgModal.appendChild(modal_content);
};

//Slide
const showSlides = n => {
  let slideIndex = n;
  let slides = document.querySelectorAll(".imgSlide");

  if (n > slides.length) {
    slideIndex = 0;
  }
  if (n < 0) {
    slideIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex].style.display = "block";
};

const plusSlides = n => {
  showSlides((slideIndex += n));
};

const currentSlide = n => {
  showSlides((slideIndex = n));
  console.log("current index", n);
};

//Get image data and display them inside of parent element
const displayImgs = () => {
  const imageWrapper = document.querySelector(".imageWrapper");
  infoData.forEach((info, index) => {
    imageWrapper.insertAdjacentHTML(
      "beforeend",
      `<img src="images/${
        info.src
      }" alt="info.src" width="300px", height="400px"
        onclick="openModal();currentSlide(${index})" class="default-images">`
    );
  });
};

//displayImgs();

const displayModal = () => {
  //createModalHTMLelements(); // check!!
  let modal_content = document.querySelector(".modal_content");
  infoData.forEach((info, index) => {
    let slideIndex = index + 1;
    modal_content.insertAdjacentHTML(
      "beforeend",
      `<div class="imgSlide"><div class="numbertext">${slideIndex} / ${
        infoData.length
      }</div><img src="images/${info.src}" style="width:100%"></div>`
    );
  });
};
displayModal();
