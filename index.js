gsap.registerPlugin(ScrollTrigger);

const circles = document.querySelectorAll(".circle");

const animations = [];

circles.forEach((circle, index) => {
    const anim = gsap.to(circle, {
        scale: 1.3, 
        duration: 2,
        repeat: -1, 
        yoyo: true, 
        ease: "power1.inOut",
        delay: index * 0.2
    });
    animations.push(anim);
});

ScrollTrigger.create({
    trigger: "#home",
    start: "top top",
    end: "bottom end", 
    // markers: true,
    onToggle: self => {
        animations.forEach(anim => {
            if (self.isActive) {
                anim.pause();
            } else {
                anim.play();
            }
        });
    }
});

gsap.fromTo(
    ".circle",
    {
        scale: 1,
    },
    {
        backgroundColor:"#000",
        scale: 10,
        scrollTrigger: {
            trigger: "#Nothome",
            start: "top bottom", 
            end: "top 100",
            scrub: 1,            
            // markers: true,
            //toggleActions: "play none none reverse"
        },
    }
);