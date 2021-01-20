const showMoreStyles = (trigger, styles ) => {
    const cards = document.querySelectorAll(styles);
    const button = document.querySelector(trigger);

    cards.forEach(item => {
        item.classList.add('animated', 'fadeInUp')
    })

    button.addEventListener('click', () => {
        cards.forEach(item => {
            item.classList.remove('hidden-lg', 'hidden-md', 'hidden-sm', 'hidden-xs');
            item.classList.add('col-sm-3', 'col-sm-offset-0', 'col-xs-10', 'col-xs-offset-1');
        })

        button.remove();
    })
}

export default showMoreStyles;