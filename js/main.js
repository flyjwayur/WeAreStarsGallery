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

  function writeIntegrify(){
      var gradient = ctx.createLinearGradient(0, 0, (canvas.width * 1.2), 0);
      gradient.addColorStop("0","yellow");
      gradient.addColorStop("0.5","lightblue");
      gradient.addColorStop("1.0","white");

      ctx.font = `${(canvas.width)/15}px Times New Roman, Times, serif`;
      ctx.textAlign = "center";
  
      ctx.fillStyle = gradient;
      ctx.fillText('Integrify', canvas.width/2, canvas.height/2);
  }

  writeIntegrify();
  //Draw Stars
  function Star(starX, starY) {
    this.x = starX;
    this.y = starY;
    this.radius = Math.random() * 10 + 10;
    this.selected = false;
    this.index = 0;
    this.name = "";
    this.img = "";

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

    this.drawImage = function(src){
      let newImage = new Image();
      newImage.src = `images/${src}`;
      console.log(newImage.src);
      newImage.addEventListener("load", () => {
        ctx.drawImage(newImage, this.x, this.y, 100, 150);
    }) 
    }

    this.writeName = function(firstname, posX, posY){
      var gradient = ctx.createLinearGradient(0, 0, 0, (canvas.height - 100));
      gradient.addColorStop("0","yellow");
      gradient.addColorStop("0.5","lightblue");
      gradient.addColorStop("1.0","white");

      ctx.font = "30px Comic Sans MS";
      ctx.textAlign = "center";
      //ctx.lineWidth = 1;
      //ctx.strokeStyle=gradient;
      //ctx.strokeText(firstname, posX, posY);

      ctx.fillStyle = gradient;
      ctx.fillText(firstname, posX, posY);
    }

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

  const isFarEnoughFromOtherStars = (randomX, randomY, stars) => {
    
    if (stars.length > 0) {
      let distanceToKeep = stars[0].radius * 2.2;
      for(let star of stars){
        if (Math.abs(star.x - randomX) < distanceToKeep &&
            Math.abs(star.y - randomY) < distanceToKeep) {
          return false;
        } 
      }
      return true;
    }
  }

  //Star creations
  const createStars = () => {
    let stars = [];
    let numStar = 19;
    // for (let i = 0; i < numStar; i++) {
    //   let randomX = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    //   let randomY = Math.random() * canvas.height * 0.7 + canvas.height * 0.15;
    //   for (let j = 0; j < 5 ; j++) {
    //     if (!isFarEnoughFromOtherStars(randomX, randomY, stars)) {
    //       randomX = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
    //       randomY = Math.random() * canvas.height * 0.7 + canvas.height * 0.15;
    //     } else {
    //       break;
    //     }
    //   }
    //   stars.push(new Star(randomX, randomY));
    // }
    for (let i = 0; i < numStar; i++) {
      let angle = (i / (numStar / 2)) * Math.PI;
      let x = (canvas.width * 0.4) * Math.cos(angle) + canvas.width / 2;
      let y = (canvas.height * 0.35) * Math.sin(angle) + canvas.height / 2;
      stars.push(new Star(x, y));
    }
    return stars;
  };

  const stars = createStars();
  console.log(stars);

  const drawStarsWithName = () => {
    stars.forEach((star, index)=>{
      star.index = index;
      infoData.forEach((eachInfo, index) => {
        if(star.index == index){
          star.name = eachInfo.firstName
          star.writeName(eachInfo.firstName, star.x-10, star.y-25);
        }     
      })
      //star.draw();
    })  
  }
drawStarsWithName();


  //Draw star
  const drawStar = () => {
    stars.forEach((star, index) => { 
      star.index = index;
      star.draw();
    })
  }

  drawStar();

  //const allImageSources = getAllimageSources();
  //loadedImages(allImageSources, )
  
  //Draw small image on star
  const drawImageOnStar = () => {
    stars.forEach((star, index)=>{
      star.index = index;
      infoData.forEach((eachInfo, index) => {
        if(star.index == index){
          star.img = eachInfo.src;
          star.drawImage(star.img);
        }})
    });
  } 

  //drawImageOnStar();

          //star.writeName(eachInfo.firstName, star.x, star.y);}     
  
  /*
  const displayImgsOnModal = (imageX, imageY) => {

    infoData.forEach(eachInfo => {
      console.log(eachInfo.src);
      image.src = `images/${eachInfo.src}`;
    })
    console.log(image);
    image.addEventListener("load", () => {
        star.drawImage(image, imageX, imageY, 100, 200);
    }) 
  }*/

  const isClickInStar = function(mouseX, mouseY, star) {
    let radius = star.radius;
    //   console.log(mouseX, mouseY, "radius:", radius, "arc.x:",arc.x, "arc.y:", arc.y);
    //   console.log(
    //       "leftside", (Math.pow((mouseX - arc.x), 2) + Math.pow((mouseY - arc.y), 2))
    //       , "rightside", Math.pow(radius,2),
    //     (Math.pow((mouseX - arc.x), 2) + Math.pow((mouseY - arc.y), 2)) <= Math.pow(radius,2)
    //   );
    return (
      Math.pow(mouseX - star.x, 2) + Math.pow(mouseY - star.y, 2) <=
      Math.pow(radius, 2)
    );
  };

  //Create the modal box;
  const createModalBox = () => {
    let container = document.querySelector(".container");
    let newInfoContainer = document.createElement("div");
    newInfoContainer.style.backgroundColor = "transparent";
    newInfoContainer.className = "infoContainer";
    container.appendChild(newInfoContainer);
  };

  createModalBox();

 

  //Get image data and display them inside of parent element
  const displayImgs = () => {
    const infoContainer = document.querySelector(".infoContainer");
    infoData.forEach((info, index) => {
      infoContainer.insertAdjacentHTML(
        "beforeend",
        `<img src="images/${
          info.src
        }" alt="info.src" width="300px", height="400px"
            onclick="openModal();currentSlide(${index})" class="default-images">`
      );
    });
  };

  //displayImgs();

  const createImageOnStars = () => {
    let container = document.querySelector('.container');

    stars.forEach((star, index) => {
      star.index = index;
      infoData.forEach((info, index) => {
        if(star.index == index){
          let newImage = document.createElement('img');
          newImage.src = `images/${info.src}`;
          newImage.style.width = "100px";
          newImage.style.position = "absolute";
          newImage.style.top = `${star.y}px`;
          newImage.style.left = `${star.x}px`;
          container.appendChild(newImage);
        }
      });
    })
  };

//createImageOnStars();

  canvas.addEventListener("mousemove", e => {
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
        isClickInStar(mouseX, mouseY, star)
        // (mouseX >= (stars[i].x - stars[i].radius))
        //  && (mouseX <= (stars[i].x + stars[i].radius))
        //  && (mouseY >= (stars[i].y - stars[i].radius))
        //  && (mouseY <= (stars[i].y + stars[i].radius))
      ) {
        //star.selected = !star.selected;
        star.selected = true;
        if (star.selected === true) {
          let infoContainerX = `${mouseY - canvas.height / 3}px`;
          let infoContainerY = `${mouseX}px`;
          selectedinfoCon.style.top = infoContainerX;
          selectedinfoCon.style.left = infoContainerY
          selectedinfoCon.style.display = "block";
          console.log("seleted star index:",star.index);
          //drawStarsWithImage(infoContainerX, infoContainerY);
          //displayImgsOnModal();
          //displayModal();
        } else {
          selectedinfoCon.style.display = "none";
        }
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 10, 0, Math.PI * 2);
        ctx.stroke();
      }
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


