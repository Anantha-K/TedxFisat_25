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




gsap.registerPlugin(ScrollTrigger);

        document.querySelectorAll('.About-img-wrapper').forEach(wrapper => {
            let tlm1 = gsap.timeline({
                scrollTrigger: {
                    trigger: wrapper,
                    toggleActions: "restart none none none"
                }
            });

            tlm1.fromTo(wrapper.querySelector('div'), {
                y: "-100%",
                x: "-90%"
            }, {
                y: 0,
                x: "-90%",
                delay: 0.5,
                duration: 0.5
            })
            .fromTo(wrapper.querySelector('div'), {
                x: "-90%"
            }, {
                x: 0,
                duration: 0.5
            })
            .fromTo(wrapper.querySelector('img'), {
                x: "-100%"
            }, {
                x: 0,
                duration: 0.1
            })
            .fromTo(wrapper.querySelector('div'), {
                x: 0
            }, {
                x: "100%",
                duration: 0.5
            });
        });

        document.querySelectorAll('.reveal-heading').forEach(heading => {
            const text = new SplitType(heading, { types: 'chars' });
            gsap.fromTo(text.chars, {
                opacity: 0,
                y: 100
            }, {
                opacity: 1,
                duration: 0.8,
                stagger: 0.08,
                y: 0,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: heading,
                    toggleActions: "restart none none none"
                }
            });
        });

        function updateLayout() {
            const isPortrait = window.innerHeight > window.innerWidth;
            const bottomLayer = document.querySelector('.bottom-layer');
            const sectionWrappers = document.querySelectorAll('.section-wrapper');

            if (isPortrait) {
                bottomLayer.style.height = "200vh";
                sectionWrappers.forEach((wrapper, index) => {
                    wrapper.style.flexDirection = index === 1 ? "column-reverse" : "column";
                    wrapper.style.fontSize = "0.8em";
                    wrapper.style.height = "100vh";
                });
            } else {
                bottomLayer.style.height = "";
                sectionWrappers.forEach(wrapper => {
                    wrapper.style.flexDirection = "";
                    wrapper.style.fontSize = "";
                    wrapper.style.height = "";
                });
            }
        }

        window.addEventListener('resize', updateLayout);
        updateLayout();