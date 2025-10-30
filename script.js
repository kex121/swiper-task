let swipers = [];
let isDesktop = window.innerWidth >= 1200;

function initSliders() {
  if (isDesktop && swipers.length === 0) {
    const swiperElements = document.querySelectorAll('.swiper');

    swiperElements.forEach((element, index) => {
      const swiper = new Swiper(element, {
        slidesPerView: 1,
        spaceBetween: 30,
        centeredSlides: true,
        loop: true,

        autoplay: {
          delay: 3000 + index * 500,
          disableOnInteraction: false,
        },

        speed: 600,

        navigation: {
          nextEl: element.querySelector('.swiper-button-next'),
          prevEl: element.querySelector('.swiper-button-prev'),
        },

        pagination: {
          el: element.querySelector('.swiper-pagination'),
          clickable: true,
          dynamicBullets: true,
        },

        effect: index === 1 ? 'coverflow' : 'slide',
        coverflowEffect: {
          rotate: 30,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
      });

      swipers.push(swiper);
    });

    updateModeIndicator('Desktop Mode - Swiper Active');
  }
}

function destroySliders() {
  if (!isDesktop && swipers.length > 0) {
    swipers.forEach((swiper) => {
      if (swiper && swiper.destroy) {
        swiper.destroy(true, true);
      }
    });
    swipers = [];
    updateModeIndicator('Mobile Mode - Static List');
  }
}

function updateModeIndicator(text) {
  const indicator = document.getElementById('modeIndicator');
  if (indicator) {
    indicator.textContent = text;
  }
}

function handleResize() {
  const newIsDesktop = window.innerWidth >= 1200;

  if (newIsDesktop !== isDesktop) {
    isDesktop = newIsDesktop;

    if (isDesktop) {
      destroySliders();
      initSliders();
    } else {
      destroySliders();
    }
  }
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, wait);
  };
}

document.addEventListener('DOMContentLoaded', () => {
  initSliders();

  window.addEventListener('resize', debounce(handleResize, 250));
});
