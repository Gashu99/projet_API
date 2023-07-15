async function getProductsDataelectronique() {
    try {
      const response = await fetch('http://localhost:3000/electronique');
      const data = await response.json();
  
      const swiperSlides = document.querySelectorAll('.swiper-slide');
  
      data.forEach((item, index) => {
        const swiperSlide = swiperSlides[index];
  
        const productName = swiperSlide.querySelector('h3');
        const price = swiperSlide.querySelector('.price');
        const image = swiperSlide.querySelector('img');
  
        productName.textContent = item.nom;
        price.textContent = `$${item.prix} `;
        image.src = item.image;
      });
  
    } catch (error) {
      console.error(error);
    }
  }
  document.addEventListener("DOMContentLoaded",getProductsDataelectronique)


  async function getProductsDataelectromenager() {
    try {
      const response = await fetch('http://localhost:3000/electromenager');
      const data = await response.json();
  
      const swiperSlides = document.querySelectorAll('#electromenagers-products .swiper-slide');
  
      data.forEach((item, index) => {
        const swiperSlide = swiperSlides[index];
  
        const productName = swiperSlide.querySelector('h3');
        const price = swiperSlide.querySelector('.price');
        const image = swiperSlide.querySelector('img');
  
        productName.textContent = item.nom_ap;
        price.textContent = `$${item.prix_ap} `;
        image.src = item.img_ap;
      });
  
    } catch (error) {
      console.error(error);
    }
  }
  
  document.addEventListener("DOMContentLoaded",getProductsDataelectromenager)


  async function getProductsDataluminaire() {
    try {
      const response = await fetch('http://localhost:3000/luminaire');
      const data = await response.json();
  
      const swiperSlides = document.querySelectorAll('#luminaire-products .swiper-slide');
  
      data.forEach((item, index) => {
        const swiperSlide = swiperSlides[index];
  
        const productName = swiperSlide.querySelector('h3');
        const price = swiperSlide.querySelector('.price');
        const image = swiperSlide.querySelector('img');
  
        productName.textContent = item.nom_l;
        price.textContent = `$${item.prix_l} `;
        image.src = item.image;
      });
  
    } catch (error) {
      console.error(error);
    }
  }
  

  document.addEventListener("DOMContentLoaded",getProductsDataluminaire)



let navbar = document.querySelector('.navbar')

document.querySelector('#menu-bar').onclick = () =>{
    navbar.classList.toggle('active');
}

document.querySelector('#close').onclick = () =>{
    navbar.classList.remove('active');
}

window.onscroll = () =>{

    navbar.classList.remove('active');

    if(window.scrollY > 100){
        document.querySelector('header').classList.add('active');
    }else{
        document.querySelector('header').classList.remove('active');
    }

}

let themeToggler = document.querySelector('#theme-toggler');

themeToggler.onclick = () =>{
    themeToggler.classList.toggle('fa-sun');
    if(themeToggler.classList.contains('fa-sun')){
        document.querySelector('body').classList.add('active');
    }else{
        document.querySelector('body').classList.remove('active');
    }
}

document.querySelectorAll('.small-image-1').forEach(images =>{
    images.onclick = () =>{
        document.querySelector('.big-image-1').src = images.getAttribute('src');
    }
});

document.querySelectorAll('.small-image-2').forEach(images =>{
    images.onclick = () =>{
        document.querySelector('.big-image-2').src = images.getAttribute('src');
    }
});

document.querySelectorAll('.small-image-3').forEach(images =>{
    images.onclick = () =>{
        document.querySelector('.big-image-3').src = images.getAttribute('src');
    }
});

let countDate = new Date('aug 1, 2021 00:00:00').getTime();

function countDown(){

    let now = new Date().getTime();
	gap = countDate - now;

    let seconds = 1000;
    let minutes = seconds * 60;
    let hours = minutes * 60;
    let days = hours * 24;

    let d = Math.floor(gap / (days));
	let h = Math.floor((gap % (days)) / (hours));
	let m = Math.floor((gap % (hours)) / (minutes));
	let s = Math.floor((gap % (minutes)) / (seconds));

    document.getElementById('days').innerText = d;
    document.getElementById('hours').innerText = h;
    document.getElementById('minutes').innerText = m;
    document.getElementById('seconds').innerText = s;

}

setInterval(function(){
    countDown()
},1000);

var swiper = new Swiper(".product-slider", {
    slidesPerView: 3,
    loop:true,
    spaceBetween: 10,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        550: {
          slidesPerView: 2,
        },
        800: {
          slidesPerView: 3,
        },
        1000: {
            slidesPerView: 3,
        },
    },
});

var swiper = new Swiper(".review-slider", {
    slidesPerView: 3,
    loop:true,
    spaceBetween: 10,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false,
    },
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        550: {
          slidesPerView: 2,
        },
        800: {
          slidesPerView: 3,
        },
        1000: {
            slidesPerView: 3,
        },
    },
});
