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
    start: "top top", // When home section starts
    end: "bottom end", // When home section ends
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
    ".circle",  // Make sure this selector matches your HTML
    {
        scale: 1,
    },
    {
        backgroundColor:"#000",
        scale: 10,
        scrollTrigger: {
            trigger: "#Nothome",
            start: "top bottom", // Changed to align with first ScrollTrigger's end
            end: "top 100",      // Changed to make the animation complete sooner
            scrub: 1,              // Added smoothing to the scrub
            // markers: true,
            toggleActions: "play none none reverse"  // Modified for better control
        },
    }
);