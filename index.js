gsap.registerPlugin(ScrollTrigger);

const circles = document.querySelectorAll(".circle");

circles.forEach((circle, index) => {
    gsap.to(circle, {
        scale: 1.3, 
        duration: 2,
        repeat: -1, 
        yoyo: true, 
        ease: "power1.inOut",
        delay: index * 0.2
    });
});
