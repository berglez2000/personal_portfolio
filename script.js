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

// Main Function
const main = () => {
  // Animations
  gsap.registerPlugin(ScrollTrigger);
  const animations = () => {
    let tl = gsap.timeline();

    // home animation
    if (window.innerWidth > 755){
      gsap.from(homeText, {duration: 1.5, stagger: 0.15, y: 50, opacity: 0, ease: "power4.out"});
      gsap.from(homeImg, {duration: 1.5, y: 50, opacity: 0});
    } else{
      tl.from(homeImg, {duration: 3, y: 50, opacity: 0.5});
      tl.to(homeImg, {duration: 0, y: 1000, display: "none"});
      tl.from(homeText, {duration: 1.5, stagger: 0.15, y: 50, opacity: 0, ease: "power4.out"});
    }

    // Nav animation
    gsap.from(navLinks, {duration: 1, stagger: 0.15, opacity: 0, x: -30});
    gsap.from(socialMedia, {duration: 1.5, stagger: 0.15, opacity: 0});

    // About animation
    gsap.from(aboutText, {scrollTrigger: aboutText, duration: 1, x: -50, y: 50, opacity: 0, stagger: 0.25});
    gsap.from(aboutSkills, {scrollTrigger: aboutSkills, duration: 1, opacity: 0, stagger: 0.25});

    // Skill animation
    gsap.from(skillTitle, {scrollTrigger: "#skills", duration: 1, x: -30, opacity: 0});
    gsap.from(skills, {scrollTrigger: ".skill-section", duration: 1.5, opacity: 0, x: -50});
    gsap.from(skillPercentege, {scrollTrigger: ".skill-section", duration: 1, width: 0, delay: 1.5});
    gsap.from(addSkills, {scrollTrigger: ".add-skills", duration: 1, x: -70, opacity: 0, stagger: 0.15, delay: 2});

    // Projects animation
    gsap.from(projectTitle, {scrollTrigger: "#projects .titles", duration: 1, opacity: 0, x: -50});
    gsap.from(projects, {scrollTrigger: "#projects .container", duration: 1.5, opacity: 0, stagger: 0.25, delay: 1});

    // Contact animation
    gsap.from(contactTitle, {scrollTrigger: "#contact .titles", duration: 1, opacity: 0, x: -50});
    gsap.from(contacts, {scrollTrigger: "#contact .container", duration: 1.5, opacity: 0, x: -50, stagger: 0.25, delay: 1});
    gsap.from(contactform, {scrollTrigger: "#contact form", duration: 1.5, opacity: 0, x: 50, stagger: 0.25, delay: 2});
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

  // Caliing functions
  animations();
}


// Event listeners
window.addEventListener("load", main);
