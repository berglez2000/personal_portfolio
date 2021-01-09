// Variables
const homeText = document.querySelectorAll("#home .text-container *");
const homeImg = document.querySelector("#home img");
const links = document.querySelectorAll(".links li");
const socialMedia = document.querySelectorAll(".contacts a");
const aboutText = document.querySelectorAll("#about .titles, #about .text-container");
const burger = document.querySelector(".burger");
const navBar = document.querySelector("nav");
const navLinks = document.querySelectorAll(".links li");
const aboutSkills = document.querySelectorAll("#about .skill");
const skillTitle = document.querySelector("#skills .titles");
const skills = document.querySelectorAll("#skills .skill");
const addSkills = document.querySelectorAll("#skills .add-skills *");
const skillPercentege = document.querySelectorAll("#skills .percentege");
const projectTitle = document.querySelector("#projects .titles")
const projects = document.querySelectorAll("#projects .project");
const contactTitle = document.querySelector("#contact .titles");
const contacts = document.querySelectorAll("#contact .container div");
const contactform = document.querySelectorAll("#contact form *");
const submitBnt = document.querySelector(".submit-btn");
const nameInput = document.querySelector("#name");
const mailInput = document.querySelector("#mail");
const subjectInput = document.querySelector("#subject");
const messageInput = document.querySelector("#message");
let isChecked = false;

// Main Function
const main = () => {
  // Animations
  gsap.registerPlugin(ScrollTrigger);
  const animations = () => {
    let tl = gsap.timeline();

    // home animation
    if (window.innerWidth > 750){
      gsap.from(homeText, {duration: 1.5, stagger: 0.15, y: 50, opacity: 0, ease: "power4.out"});
      gsap.from(homeImg, {duration: 2, y: 50, opacity: 0});
    } else{
      tl.from(homeImg, {duration: 3, y: 50, opacity: 0.5});
      tl.to(homeImg, {duration: 0, y: 1000, display: "none"});
      tl.from(homeText, {duration: 1.5, stagger: 0.15, y: 50, opacity: 0, ease: "power4.out"});
    }

    // Nav animation
    gsap.from(navLinks, {duration: 1, stagger: 0.15, opacity: 0, x: -30});
    gsap.from(socialMedia, {duration: 1, stagger: 0.15, opacity: 0});

    // About animation
    gsap.from(aboutText, {scrollTrigger: aboutText, duration: 1, x: -50, y: 50, opacity: 0, stagger: 0.25});
    gsap.from(aboutSkills, {scrollTrigger: aboutSkills, duration: 1, opacity: 0, stagger: 0.25});

    // Skill animation
    gsap.from(skillTitle, {scrollTrigger: "#skills", duration: 1, x: -30, opacity: 0});
    gsap.from(skills, {scrollTrigger: ".skill-section", duration: 1, opacity: 0, x: -50});
    gsap.from(skillPercentege, {scrollTrigger: ".skill-section", duration: 1, width: 0, delay: 0.5});
    gsap.from(addSkills, {scrollTrigger: ".add-skills", duration: 1, x: -70, opacity: 0, stagger: 0.15, delay: 1});
    
    // Projects animation
    gsap.from(projectTitle, {scrollTrigger: "#projects .titles", duration: 1, opacity: 0, x: -50});
    gsap.from(projects, {scrollTrigger: "#projects .container", duration: 1, opacity: 0, stagger: 0.25, delay: 0.5});

    // Contact animation
    gsap.from(contactTitle, {scrollTrigger: "#contact .titles", duration: 1, opacity: 0, x: -50});
    gsap.from(contacts, {scrollTrigger: "#contact .container", duration: 1, opacity: 0, x: -50, stagger: 0.25, delay: 0.5});
    gsap.from(contactform, {scrollTrigger: "#contact form", duration: 1, opacity: 0, x: 50, stagger: 0.25, delay: 0.5});
  }


  // Animate burger 
  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navBar.classList.toggle("active");
  });
  // Close burger menu when click
  navLinks.forEach(link => {
    link.addEventListener("click", () => {
      burger.classList.toggle("active");
      navBar.classList.toggle("active");
    });
  });

  const checkForm = () => {
    if (nameInput.value === "" ||nameInput.value === null){
      return alert("Please enter your name");
    } else if (mailInput.value === "" ||mailInput.value === null){
      return alert("Please enter your email");
    } else if (subjectInput.value === "" || subjectInput.value === null){
      return alert("Please enter your subject");
    } else if (messageInput.value === "" || messageInput.value === null){
      return ("Please enter your message");
    } else {
      return isChecked = true;
    }
  }

  const sendMail = (e) => {
    e.preventDefault();
    checkForm();
    if (isChecked){
      window.open(`mailto:aljaz.berglez@gmail.com?subject=${subjectInput.value}&body=${messageInput.value}`);
    }
  }


  // Caliing functions
  animations();
  submitBnt.addEventListener("click", sendMail);
}


// Event listeners
window.addEventListener("load", main);
