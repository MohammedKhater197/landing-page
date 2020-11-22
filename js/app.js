/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
// navigation global var
const navigation = document.getElementById("navbar__list");

// sections global var
const sections = document.querySelectorAll('section');

// Build the navigation menu.
const newFragment = document.createDocumentFragment();

// looping
// Use forEach on the list Variable.
sections.forEach ( (section )=>{
// Create (1 <li> and 1 <a> and 1 textNode ) for each section in the list.
 const li = document.createElement('li');
 const link =document.createElement('a');
 // Extract the data-nav value from the section and store it in variable.
 //add this variable which contains the text to the link as (Text Content, ID or data-nav value)
//For Better performance use appendChild on the Fragment inside the loop.
 let sectionID =section.getAttribute('data-nav');
 const textNode =document.createTextNode(sectionID);
 link.appendChild(textNode);
 // Add EventListener to the link and use scrollIntoView().
 link.addEventListener("click",  () => {  
    section.scrollIntoView({'behavior':'smooth'});
 
 })
 li.appendChild(link);
 newFragment.appendChild(li);

});
//After the loop end append that Fragment to the <ul>.
navigation.appendChild(newFragment);


// Add class 'active' to section when near top of viewport

// getting the largest value that's less or equal to the number
const offset = (section) => {
    return Math.floor(section.getBoundingClientRect().top);
};

// adding the active 
const addActive = (conditional, section) => {
    if(conditional){
        section.classList.add('your-active-class');
        section.style.cssText = "background-color: yellow;";
    };
};
// remove the active 
const removeActive = (section) => {
    section.classList.remove('your-active-class');
    section.style.cssText = "background-color: linear-gradient(0deg, rgba(255,255,255,.1) 0%, rgba(255,255,255,.2) 100%)";
};

//implementating the actual function

const sectionActivation = () => {
    sections.forEach(section => {
        const elementOffset = offset(section);

        inviewport = () => elementOffset < 300 && elementOffset >= -300;

        removeActive(section);
        addActive(inviewport(),section);
    });
};

window.addEventListener('scroll' ,sectionActivation);

// Scroll to anchor ID using scrollTO event

const scrolling = () => {

    const links = document.querySelectorAll('.navbar__menu a');
    links.forEach(lnk => {
        lnk.addEventListener('click', () => {
            for(i = 0 ; i<sections ; i++){
                sections[i].addEventListener("click",sectionScroll(lnk));
            }
        });
    });

};

scrolling();
