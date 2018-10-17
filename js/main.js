/****** Light box ****/
let selectedIndex = 0;

//close the light box
const closeLightBox = () => {
  document.querySelector("#lightBox").style.display = "none";
  console.log("closeLightBox");
};

const plusSlides = n => {
  showSlides((selectedIndex += n));
};

/****** Light box ****/

//Display light box with information
const displayLightBox = () => {
  //createModalHTMLelements(); // check!!
  let lightBoxContent = document.querySelector(".lightBoxContent");
  infoData.forEach((info, index) => {
    if (
      info.title == "" ||
      info.joinedOn == "" ||
      info.whySoftwareDeveloper == "" ||
      info.longTermVision == "" ||
      info.motivatesMe == "" ||
      info.favoriteQuote == ""
    ) {
      let smileFill = `<i class="far fa-smile-wink" style="color:lightblue"></i>`;

      info.title = smileFill;
      info.joinedOn = smileFill;
      info.whySoftwareDeveloper = smileFill;
      info.longTermVision = smileFill;
      info.motivatesMe = smileFill;
      info.favoriteQuote = smileFill;
    }

    //index for slide number
    let slideIndex = index + 1;

    lightBoxContent.insertAdjacentHTML(
      "beforeend",
      `<div class="imgSlide">
        <div class="starImgWrapper">
          <i class="fas fa-star-half-alt"></i>
          <div class="nameDiv"><span id="nameStyle">${info.firstName} ${info.lastName}</span></div>
          <img class="personImage" src="images/${info.src}">
          <div class="numbertext">${slideIndex} / ${infoData.length}</div>
        </div>
        <div class="personInfo">
          <div>I am <span>${info.title}</span> in Integrify.</div>
          <div>I joined Integrify <span>${info.joinedOn}</span>.</div>
          <div>I want to be a software developer,</div>
          <div>because <span>${info.whySoftwareDeveloper}</span>.</div>     
          <div>I have Awesome Skills of <span>${info.skills.join(
            ""
          )}</span></div>
          <div>I want to achieve <span>${info.longTermVision}</span></div>
          <div><span>${info.motivatesMe}</span> is my Motivation</div>
          <div>I want to introduce my favorite quote which is </br>
              <span>"${info.favoriteQuote}"</span></div>
        </div>
      </div>`
    );
  });
};

displayLightBox();

//Open lightbox
const openLightBox = () => {
  document.querySelector("#lightBox").style.display = "block";
  console.log("openLightBox");
};


//Show hidden slide
const showSlides = n => {
  selectedIndex = n;
  let slides = document.querySelectorAll(".imgSlide");
  console.log(slides.length);
  console.log("check n:", n);
  if (n > slides.length-1) {
    selectedIndex = 0;
  }
  if (n = 0) {
    selectedIndex = slides.length;
  }

  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[selectedIndex].style.display = "flex";
};

//Give current slide index 
const currentSlide = n => {
  showSlides(selectedIndex = n);
  console.log("current index", n);
};


/****** Draw Main Page with stars and bg ****/

// Draw Star and background
const drawCanvas = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  // Draw background
  const drawBackground = () => {
    const backgroundGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    backgroundGradient.addColorStop(0, "#171e26");
    backgroundGradient.addColorStop(1, "#3f586b");
    ctx.fillStyle = backgroundGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawBackground();

  //Write title name, Integrify
  function writeIntegrify() {
    var gradient = ctx.createLinearGradient(0, 0, canvas.width * 1.2, 0);
    gradient.addColorStop("0", "yellow");
    gradient.addColorStop("0.5", "lightblue");
    gradient.addColorStop("1.0", "white");

    ctx.font = `${canvas.width / 15}px Times New Roman, Times, serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = gradient;
    ctx.fillText("Integrify", canvas.width / 2, canvas.height / 2);
  }

  writeIntegrify();

  //Write Click on Our Stars
  function writeClickOnOurStars() {
    var gradient = ctx.createLinearGradient(0, 0, canvas.width * 1.2, 0);
    gradient.addColorStop("0", "yellow");
    gradient.addColorStop("0.5", "lightblue");
    gradient.addColorStop("1.0", "white");

    ctx.font = `${canvas.width / 30}px Times New Roman, Times, serif`;
    ctx.textAlign = "center";
    ctx.fillStyle = gradient;
    ctx.fillText("Click on our stars :)", canvas.width / 2 , (canvas.height / 1.7));
  }

  writeClickOnOurStars();

  //Star constructor fn
  function Star(starX, starY, radius) {
    this.x = starX;
    this.y = starY;
    this.radius = Math.max(12, Math.min(radius, 20));
    this.selected = false;
    this.index = 0;
    this.name = "";

    this.draw = function() {
      ctx.save();
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

      ctx.shadowColor = "#edecda"; 
      ctx.shadowBlur = 30;

      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.closePath();
      ctx.restore();
    };

    //Write person's first name above stars
    this.writeName = function(firstname, posX, posY) {
      var gradient = ctx.createLinearGradient(0, 0, 0, canvas.height - 100);
      gradient.addColorStop("0", "yellow");
      gradient.addColorStop("0.5", "lightblue");
      gradient.addColorStop("1.0", "white");

      ctx.font = "30px Comic Sans MS";
      ctx.textAlign = "center";
      //ctx.lineWidth = 1;
      //ctx.strokeStyle=gradient;
      //ctx.strokeText(firstname, posX, posY);

      ctx.fillStyle = gradient;
      ctx.fillText(firstname, posX, posY);
    };

    //Draw images near stars
    this.drawImage = function(src) {
      let newImage = new Image();
      newImage.src = `images/${src}`;
      console.log(newImage.src);
      newImage.addEventListener("load", () => {
        ctx.drawImage(newImage, this.x, this.y, 100, 150);
      });
    };
  }

  //Check whether stars are far from each other for preveting overlapping each other
  const isFarEnoughFromOtherStars = (randomX, randomY, stars) => {
    if (stars.length > 0) {
      let distanceToKeep = stars[0].radius * 2.2;
      for (let star of stars) {
        if (
          Math.abs(star.x - randomX) < distanceToKeep &&
          Math.abs(star.y - randomY) < distanceToKeep 
        ) {
          return false;
        }
      }
      return true;
    }
  };

//Create stars
  const createStars = () => {
    let stars = [];
    let numStar = infoData.length;
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
    const getAngleDelta = () => {
      var d = new Date();
      var n = d.getTime();
      return n / (5000 * Math.PI);
    }

    for (let i = 0; i < numStar; i++) {
      let baseAngle = (i / (numStar / 2)) * Math.PI;
      let angle = baseAngle + getAngleDelta();
      let x = canvas.width * 0.4 * Math.cos(angle) + canvas.width / 2;
      let y = canvas.height * 0.35 * Math.sin(angle) + canvas.height / 2;
      stars.push(new Star(x, y, i * 2));
    }
    return stars;
  };

//Hold all created stars to draw
  const stars = createStars();
  console.log(stars);

//Draw stars
const drawStar = () => {
  stars.forEach((star, index) => {
    star.index = index;
    star.draw();
  });
};

drawStar();

//Draw First Name from data above stars
  const drawNameAboveStars = () => {
    stars.forEach((star, index) => {
      star.index = index;
      infoData.forEach((eachInfo, index) => {
        if (star.index == index) {
          star.name = eachInfo.firstName;
          star.writeName(eachInfo.firstName, star.x - 10, star.y - 25);
        }
      });
    });
  };

  drawNameAboveStars();

  //Draw small image from data on star
  const drawImageOnStar = () => {
    stars.forEach((star, index) => {
      star.index = index;
      infoData.forEach((eachInfo, index) => {
        if (star.index == index) {
          star.img = eachInfo.src;
          star.drawImage(star.img);
        }
      });
    });
  };

  //drawImageOnStar();

  const createImageOnStars = () => {
    let container = document.querySelector(".container");

    stars.forEach((star, index) => {
      star.index = index;
      infoData.forEach((info, index) => {
        if (star.index === index) {
          let newImage = document.createElement("img");
          newImage.src = `images/${info.src}`;
          newImage.style.width = "50px";
          newImage.style.position = "absolute";
          newImage.className = "weAreStars";
          newImage.style.top = `${star.y - 25}px`;
          newImage.style.left = `${star.x - 25}px`;
          container.appendChild(newImage);
        }
      });
    });
  };

  //createImageOnStars();

  //Check whether users click on the stars 
  const isClickInStar = function(mouseX, mouseY, star) {
    let radius = star.radius;
    return (
      Math.pow(mouseX - star.x, 2) + Math.pow(mouseY - star.y, 2) <=
      Math.pow(radius, 2)
    );
  };


//When user click on star, open modal box and display related information
  canvas.addEventListener("click", e => {
    stars.forEach(star => {
      let slide = document.querySelector(".imgSlide");
      let rect = canvas.getBoundingClientRect();
      let mouseX = e.clientX - rect.left;
      let mouseY = e.clientY - rect.top;

      if (star.selected === true) {
        star.selected = false;
      }

      if (isClickInStar(mouseX, mouseY, star)) {
        star.selected = true;
        if (star.selected === true) {
          let slideX = `${mouseY - canvas.height / 3}px`;
          let slideY = `${mouseX}px`;
          slide.style.top = slideX;
          slide.style.left = slideY;
          slide.style.display = "block";
          console.log("seleted star index:", star.index);
          selectedIndex = star.index;
          openLightBox(selectedIndex);
          currentSlide(selectedIndex);
          //plusSlides(`${selectedIndex}`);

        } else {
          slide.style.display = "none";
        }
      }
    });
  });
};

window.onload = drawCanvas;

//When window is resized, drawCanvas to be responsive to the size of screen
window.addEventListener("resize", drawCanvas);

const updateAnimation = () => {
  drawCanvas();
  window.requestAnimationFrame(updateAnimation);
};

window.requestAnimationFrame(updateAnimation);
