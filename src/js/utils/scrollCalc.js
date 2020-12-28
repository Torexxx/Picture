const scrollCalc = () => {
    let div = document.createElement('div');
    div.style.width= '50px';
    div.style.height= '50px';
    document.body.appendChild(div);
    div.style.overflowY = 'scroll';
    div.style.visibility = 'hidden';
 
    const scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();
    return scrollWidth;

}

export default scrollCalc;