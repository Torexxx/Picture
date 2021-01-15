const forms = () => {

    const forms = document.querySelectorAll('form'),
          inputs = document.querySelectorAll('input'),
          upload = document.querySelectorAll('[name="upload"]');

    let message = {
        loading: 'Загрузка...',
        success: 'Форма успешно отправлена!',
        failure : 'Что-то пошло не так...',
        spinner : 'assets/img/spinner.gif',
        fail : 'assets/img/fail.png',
        ok : 'assets/img/ok.png',
    }

    const path = {
        designer: 'assets/server.php',
        question: 'assets/question.php'
    };

    const postData = async (url, data) => {
    
      let res = await fetch(url, {
            method: "POST",
            body: data
        })
        
        return await res.text();
    }

    function clearInputs() {
        inputs.forEach(item => item.value = '');
        upload.forEach(item => item.previousElementSibling.textContent = 'Файл не выбран');
    }

    upload.forEach(item => {
        item.addEventListener('input', e => {
         
          let dots;
          let arr = item.files[0].name.split('.');

          arr[0].length > 6 ? dots = '...' : dots = '.';

          const name = arr[0].substring(0, 6) + dots + arr[1];  
        
          item.previousElementSibling.textContent = name
        })
    })

    forms.forEach(form => form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div');
            statusMessage.classList.add('status');
            form.parentNode.appendChild(statusMessage);

            form.classList.add('animated', 'fadeOutUp'); // скрываем форму

            setTimeout(()=> {
                form.style.display = 'none';
            }, 400);

            let statusImg = document.createElement('img');
            statusImg.setAttribute('src', message.spinner);
            statusImg.classList.add('animated', 'fadeInUp');
            statusMessage.appendChild(statusImg);
            

            let textMessage = document.createElement('div');
            textMessage.textContent = message.loading;
            statusMessage.appendChild(textMessage);

            
            const formData = new FormData(form);
            let api;

            form.closest('.popup-design') || form.classList.contains('calc_form') ? api = path.designer : api = path.question;

            postData(api, formData)
                 .then(res => {
                     statusImg.setAttribute('src', message.ok);
                     textMessage.textContent = message.success;
                     console.log(res);
                 })
                 .catch((error) => {
                    textMessage.textContent = message.failure;
                    statusImg.setAttribute('src', message.fail);
                 })
                 .finally(() => {
                    clearInputs(); 
                    setTimeout(() => {
                        statusMessage.remove()  
                        form.style.display = 'block'
                        form.classList.remove('fadeOutUp')
                        form.classList.add('fadeInUp')
                    }, 6000)
                 })
    }))
}

export default forms;