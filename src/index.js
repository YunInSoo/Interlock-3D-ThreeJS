import { animate, init } from "./models3D/boxModel";

import startCityModel from "./models3D/cityModel";

window.onload = function() {
    startCityModel();
    const buttonTest = document.getElementsByTagName('button')[0];
    const divContainer = document.getElementsByTagName('div')[0];
    const section = document.getElementsByTagName('section');
    const boxCD = document.getElementsByClassName('box_CD');
    let numSections = 0
    
    console.log('index.js')
    console.log(section[numSections]);

    initCss(numSections, section);
    buttonTest.addEventListener('click',(e)=>{
        console.log(section.length)
        numSections++;
        if(numSections > (section.length - 1)){
            numSections = 0
        }
        console.log(numSections)
        Array.from(section).forEach((e, index) => {
            e.classList.remove('active')
        });
        section[numSections].classList.add('active')
    });
    console.log(boxCD[0])
    init(section[0]);
    animate();
    
}

function initCss(count, elements) {
    console.log('initCss')
    if (count != undefined) {
        elements[count].classList.add('active');
    }
}

