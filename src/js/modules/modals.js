import scrollCalc from "../utils/scrollCalc";

const modals = () => {
  function bindModal(triggerSelector, modalSelector, closeSelector, closeClickOverlay = true) {
    const trigger = document.querySelectorAll(triggerSelector),
      modal = document.querySelector(modalSelector),
      close = document.querySelector(closeSelector),
      windows = document.querySelectorAll("[data-modal]");

    function closeAllModals() {
      windows.forEach((item) => {
        item.style.display = "none";
        document.body.classList.remove("modal-open");
      });
    }

    // function checkModals() {
    //     oneOfTheModalsIsOpen = Array.prototype.some.call(windows, (item => {
    //          return item.style.display === 'block';
    //       })) 
    //  }

    trigger.forEach((item) => {
     
      item.addEventListener("click", (e) => {
        
        if (e.target) {
          e.preventDefault();
        }

        closeAllModals();
        document.body.style.marginRight = scrollCalc() + 'px' ;
        modal.style.display = "block";
        document.body.classList.add("modal-open");
        if (item.classList.contains("fixed-gift")) {
          debugger
          item.remove();
        }
      });
    });

    modal.addEventListener("click", (e) => {
      if (e.target === close || e.target === modal && closeClickOverlay) {
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
        let windows = document.querySelectorAll("[data-modal]");
       
        windows.forEach(item => {
          if (getComputedStyle(item).display !== 'none') {
            display = 'block';
          }
        })
        if (!display) {
          modalWindow.click();
        }
      }, time)
    }

  showModalByTime('.fixed-gift', 30000);
  bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
  bindModal(".button-consultation",".popup-consultation",".popup-consultation .popup-close");
  bindModal(".fixed-gift", ".popup-gift", ".popup-gift .popup-close");
};

export default modals;
