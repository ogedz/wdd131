document.getElementById("currentyear").textContent = new Date().getFullYear();

document.getElementById("lastModified").textContent = "Last Modification: " + document.lastModified;

/* Hamburger Menu Toggle */
const hamButton = document.querySelector('#menu');
const navigation = document.querySelector('.navigation');

hamButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    hamButton.classList.toggle('open');
});