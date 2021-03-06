import scrollCalc from "../utils/scrollCalc";

const modals = () => {

  let btnPressed = false;

  function bindModal(triggerSelector, modalSelector, closeSelector, destroy = false) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]");

    function closeAllModals() {
      windows.forEach((item) => {
        item.style.display = "none";
        document.body.classList.remove("modal-open");
        item.classList.add('animated', 'fadeIn')
      });
    }

    // function checkModals()  {
    //     oneOfTheModalsIsOpen = Array.prototype.some.call(windows, (item => {
    //          return item.style.display === 'block';
    //       })) 
    //  }

    trigger.forEach((item) => {
      item.addEventListener("click", (e) => {
        
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        closeAllModals();
        document.body.style.marginRight = scrollCalc() + 'px';
        modal.style.display = "block";
        document.body.classList.add("modal-open");
    
        if (destroy) {
          item.parentNode.removeChild(item);
        }
      });
    });

    modal.addEventListener("click", (e) => {
      if (e.target === close || e.target === modal) {
        closeAllModals();
        document.body.style.marginRight = '0px';
        modal.style.display = "none";
      }
    });
  }

    function showModalByTime(selector, time) { 
      setTimeout(() => {
        let display;
        let modalWindow = document.querySelector(selector);
      
        document.querySelectorAll("[data-modal]").forEach(item => {
          if (getComputedStyle(item).display !== 'none') {
            display = 'block';
          }
        })
        if (!display && modalWindow) {
          modalWindow.click();
        }
      }, time)
    }

    function openByScroll(selector) {
      window.addEventListener('scroll', () => {
        let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)
        if (!btnPressed && (window.pageYOffset + document.documentElement.clientHeight >= scrollHeight)) {
            document.querySelector(selector).click();
        }
      })
    }
  showModalByTime('.fixed-gift', 40000);
  bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
  bindModal(".button-consultation",".popup-consultation",".popup-consultation .popup-close");
  bindModal(".fixed-gift", ".popup-gift", ".popup-gift .popup-close", true);
  openByScroll(".fixed-gift");
};

export default modals;
