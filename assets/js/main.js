
/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
sr.reveal('.timeline-block, .timeline-item, .timeline-heading', {
    interval: 150
});

sr.reveal('.timeline, .certifications, .awards, .blog', { delay: 200 });



/*== EmailJS ==*/

emailjs.init("q9C1Wfmg7LuqVTRul");

/*== Form ==*/
document.querySelector('.contact__form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form from submitting the traditional way

    const name = document.querySelector('input[name="name"]').value;
    const email = document.querySelector('input[name="email"]').value;
    const message = document.querySelector('textarea[name="message"]').value;

    if (name === "" || email === "" || message === "") {
        alert("All fields are required!");
    } else {
        // Use EmailJS to send the form data
        emailjs.send("service_fyr25gk", "template_aknkv9h", {
            name: name,
            email: email,
            message: message
        }).then(function(response) {
            alert("Form submitted successfully!");
            console.log("SUCCESS!", response.status, response.text);
        }, function(error) {
            alert("Failed to send the form. Please try again later.");
            console.log("FAILED...", error);
        });
    }
});


/*== Markdown Rendering ==*/
document.addEventListener("DOMContentLoaded", function () {
  const blogContainer = document.getElementById("markdown-content");

  if (blogContainer) {
    fetch('assets/Blog/trends.md')
      .then(response => response.text())
      .then(markdown => {
        // Simple Markdown to HTML using marked.js (see below)
        blogContainer.innerHTML = marked.parse(markdown);
      })
      .catch(err => {
        blogContainer.innerHTML = "<p>Failed to load blog post.</p>";
        console.error(err);
      });
  }
});