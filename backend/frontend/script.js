



// Fonction pour récupérer et afficher les données de la catégorie "électronique"
async function getElectroniqueData() {
    try {
      const response = await fetch('http://localhost:3000/electronique');
      const data = await response.json();
      print(data)
  
      const dataList = document.querySelector('.box-container');

      data.forEach(item => {
        const listItem = document.querySelector('.box');
        const limg = listItem.querySelector('.image')
        image=limg.querySelector('img')
        image.src = item.image
        contenu=listItem.querySelector('.content')
        n=contenu.querySelector('h3')
        n.innerText=item.nom
        pr=listItem.querySelector('.price')
        pr.style.fontWeight="19px"
        pr.innerHtml=''
        pr.innerText=item.prix
        dataList.appendChild(listItem);
      });
    } catch (error) {
      console.error(error);
    }
  }
  
  // Appel de la fonction pour récupérer et afficher les données de la catégorie "électronique"
  document.addEventListener('DOMContentLoaded', getElectroniqueData);


  async function getElectromenagerData() {
    try {
      const response = await fetch('http://localhost:3000/electromenager');
      const data = await response.json();
      print(data)
  
      const dataelectromenager=document.querySelector('.swiper featured-slider swiper-initialized swiper-horizontal swiper-pointer-events')
     

      data.forEach(item => {
        // Sélecteurs des éléments dans la galerie
          const galleryContainer = document.getElementById("featured");
          const slideSelectors = galleryContainer.querySelector(".swiper-slide");
          const nameSelectors = galleryContainer.querySelector("h3");
          const priceAmountSelectors = galleryContainer.querySelector(".price .amount");
const priceCutSelectors = galleryContainer.querySelector(".price .cut");
const priceOfferSelectors = galleryContainer.querySelector(".price .offer");
const starsSelectors = galleryContainer.querySelector(".stars span");


// Remplir les données dans les sélecteurs correspondants
  nameSelectors.textContent = data.nom_ap;
  priceAmountSelectors.textContent = data.prix_ap;
  priceCutSelectors.textContent = product.priceCut;
  priceOfferSelectors.textContent = product.priceOffer;
  starsSelectors.textContent = product.stars;
  slideSelectors.querySelector(".image img").src = data.img_ap;

      });
    } catch (error) {
      console.error(error);
    }
  }

  document.addEventListener('DOMContentLoaded', getElectromenagerData);

  

  

  let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
  searchForm.classList.toggle('active');
  navbar.classList.remove('active');
}

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
  navbar.classList.toggle('active');
  searchForm.classList.remove('active');
}

window.onscroll = () =>{
  searchForm.classList.remove('active');
  navbar.classList.remove('active');
}

let filterBtn = document.querySelectorAll('.filter-buttons .buttons');
let filterItem = document.querySelectorAll('.products .box-container .box');

filterBtn.forEach(button =>{

  button.onclick = () =>{
    filterBtn.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    let dataFilter = button.getAttribute('data-filter');

    filterItem.forEach(item =>{

      item.classList.remove('active');
      item.classList.add('hide');

      if(item.getAttribute('data-item') == dataFilter || dataFilter == 'all'){
        item.classList.remove('hide');
        item.classList.add('active');
      }

    });

  };

});

var swiper = new Swiper(".home-slider", {
  centeredSlides: true,
  loop:true,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var swiper = new Swiper(".featured-slider", {
  centeredSlides: true,
  loop:true,
  spaceBetween:20,
  autoplay: {
    delay: 9500,
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
    450: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1200: {
      slidesPerView: 4,
    },
  },
});

var swiper = new Swiper(".review-slide", {
  loop:true,
  spaceBetween:20,
  autoplay: {
    delay: 9500,
    disableOnInteraction: false,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
  },
});

var swiper = new Swiper(".blogs-slider", {
  centeredSlides: true,
  loop:true,
  spaceBetween:20,
  autoplay: {
    delay: 9500,
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
    768: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
});