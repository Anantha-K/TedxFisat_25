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
        opacity:0,
        scale: 6,
        scrollTrigger: {
            trigger: "#Nothome",
            start: "top bottom", 
            end: "bottom center",
            scrub: 1,            
            // markers: true,
            //toggleActions: "play none none reverse"
        },
    }
);

gsap.fromTo(
    ".videoDiv",
    {
        scale:0
    },
    {
        scale:1,
        scrollTrigger: {
            trigger: ".videoDiv",
            toggleActions: "play none none reverse",
        },
    }
);

gsap.fromTo(
    ".fa-play",
    {
        opacity:1
    },
    {
        opacity:0,
        scrollTrigger: {
            trigger: "#video",
            start: "top 250", 
            end: "bottom bottom",
            scrub: 1,            
            //markers: true,
            //toggleActions: "play none none reverse"
        },
    }
);

gsap.fromTo(
    ".fa-pause",
    {
        opacity:0
    },
    {
        opacity:1,
        scrollTrigger: {
            trigger: "#video",
            start: "top 250", 
            end: "bottom bottom",
            scrub: 1,            
            //markers: true,
            //toggleActions: "play none none reverse"
        },
    }
);

gsap.fromTo(
    ".videoDiv",
    {
        opacity:1
    },
    {
        opacity:0,
        scale:1.5,
        scrollTrigger: {
            trigger: "#video",
            start: "top 250", 
            end: "bottom bottom",
            scrub: 1,            
            //markers: true,
            //toggleActions: "play none none reverse"
        },
    }
);

gsap.fromTo(
    ".videoVideo",
    {
        opacity:0,
        transform:"rotate(10deg)"
    },
    {
        opacity:1,
        transform:"rotate(0deg)",
        scrollTrigger: {
            trigger: "#video",
            start: "top 100", 
            end: "bottom bottom",
            scrub: 1,            
            //markers: true,
            //toggleActions: "play none none reverse"
        },
    }
);

gsap.fromTo(
    "#video",
    {
        opacity:1
    },
    {
        opacity:0,
        scrollTrigger: {
            trigger: "#Notvideo",
            start: "top bottom", 
            end: "bottom center",
            scrub: 1,            
            //markers: true,
            //toggleActions: "play none none reverse"
        },
    }
);

gsap.fromTo(
    ".navbar",
    { 
        opacity:0,
        y:-200
    },
    { 
        y:0,
        opacity: 1, 
        duration: 1, 
        scrollTrigger: {
            trigger: ".bottom-layer",
            toggleActions: "play none none none"
        }
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

        // document.querySelectorAll('.reveal-heading').forEach(heading => {
        //     const text = new SplitType(heading, { types: 'chars' });
        //     gsap.fromTo(text.chars, {
        //         opacity: 0,
        //         y: 100
        //     }, {
        //         opacity: 1,
        //         duration: 0.8,
        //         stagger: 0.08,
        //         y: 0,
        //         ease: "power2.out",
        //         scrollTrigger: {
        //             trigger: heading,
        //             toggleActions: "restart none none none"
        //         }
        //     });
        // });

        // function updateLayout() {
        //     const isPortrait = window.innerHeight > window.innerWidth;
        //     const bottomLayer = document.querySelector('.bottom-layer');
        //     const sectionWrappers = document.querySelectorAll('.section-wrapper');

        //     if (isPortrait) {
        //         bottomLayer.style.height = "200vh";
        //         sectionWrappers.forEach((wrapper, index) => {
        //             wrapper.style.flexDirection = index === 1 ? "column-reverse" : "column";
        //             wrapper.style.fontSize = "0.8em";
        //             wrapper.style.height = "100vh";
        //         });
        //     } else {
        //         bottomLayer.style.height = "";
        //         sectionWrappers.forEach(wrapper => {
        //             wrapper.style.flexDirection = "";
        //             wrapper.style.fontSize = "";
        //             wrapper.style.height = "";
        //         });
        //     }
        // }

        // window.addEventListener('resize', updateLayout);
        // updateLayout();


        // document.addEventListener("DOMContentLoaded", () => {
        //     const sliders = document.querySelectorAll(".emotions-slider");
        
        //     if (!sliders.length) return;
        
        //     const list = [];
        
        //     sliders.forEach((element) => {
        //         const [slider, prevEl, nextEl, pagination] = [
        //             element.querySelector(".swiper"),
        //             element.querySelector(".slider-nav__item_prev"),
        //             element.querySelector(".slider-nav__item_next"),
        //             element.querySelector(".slider-pagination")
        //         ];
        
        //         list.push(
        //             new Swiper(slider, {
        //                 slidesPerView: "auto",
        //                 spaceBetween: 20,
        //                 speed: 600,
        //                 observer: true,
        //                 watchOverflow: true,
        //                 watchSlidesProgress: true,
        //                 centeredSlides: true,
        //                 initialSlide: 1,
        //                 navigation: { nextEl, prevEl, disabledClass: "disabled" },
        //                 pagination: {
        //                     el: pagination,
        //                     type: "bullets",
        //                     modifierClass: "slider-pagination",
        //                     bulletClass: "slider-pagination__item",
        //                     bulletActiveClass: "active",
        //                     clickable: true
        //                 },
        //                 breakpoints: {
        //                     768: { spaceBetween: 40 }
        //                 }
        //             })
        //         );
        //     });
        // });
        






        let progress = 50
        let startX = 0
        let active = 0
        let isDown = false
        
        const speedWheel = 0.02
        const speedDrag = -0.1
        
        const getZindex = (array, index) => (array.map((_, i) => (index === i) ? array.length : array.length - Math.abs(index - i)))
        
        
        const $items = document.querySelectorAll('.carousel-item')
        const $cursors = document.querySelectorAll('.cursor')
        
        const displayItems = (item, index, active) => {
          const zIndex = getZindex([...$items], active)[index]
          item.style.setProperty('--zIndex', zIndex)
          item.style.setProperty('--active', (index-active)/$items.length)
        }
        
        const animate = () => {
          progress = Math.max(0, Math.min(progress, 100))
          active = Math.floor(progress/100*($items.length-1))
          
          $items.forEach((item, index) => displayItems(item, index, active))
        }
        animate()
        
        $items.forEach((item, i) => {
          item.addEventListener('click', () => {
            progress = (i/$items.length) * 100 + 10
            animate()
          })
        })
        
        const handleWheel = e => {
          const wheelProgress = e.deltaY * speedWheel
          progress = progress + wheelProgress
          animate()
        }
        
        const handleMouseMove = (e) => {
          if (e.type === 'mousemove') {
            $cursors.forEach(($cursor) => {
              $cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`
            })
          }
          if (!isDown) return
          const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
          const mouseProgress = (x - startX) * speedDrag
          progress = progress + mouseProgress
          startX = x
          animate()
        }
        
        const handleMouseDown = e => {
          isDown = true
          startX = e.clientX || (e.touches && e.touches[0].clientX) || 0
        }
        
        const handleMouseUp = () => {
          isDown = false
        }
        
        
        // document.addEventListener('mousewheel', handleWheel)
        document.addEventListener('mousedown', handleMouseDown)
        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
        document.addEventListener('touchstart', handleMouseDown)
        document.addEventListener('touchmove', handleMouseMove)
        document.addEventListener('touchend', handleMouseUp)
        
        

        // const lenis = new Lenis({
        //     duration: 1.2,
        //     easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        //     direction: 'vertical',
        //     smooth: true,
        //     smoothTouch: false,
        //   });
      
        //   function raf(time) {
        //     lenis.raf(time);
        //     requestAnimationFrame(raf);
        //   }
      
        //   requestAnimationFrame(raf);



gsap.registerPlugin(ScrollTrigger);

gsap.to('.navbar', {
  opacity: 1,
  duration: 1,
  ease: 'power2.out'
});

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.mobile-menu a');

let isOpen = false;

menuToggle.addEventListener('click', () => {
  isOpen = !isOpen;
  menuToggle.classList.toggle('active');
  
  if (isOpen) {
    gsap.to(mobileMenu, {
      visibility: 'visible',
      opacity: 1,
      duration: 0.5,
      ease: 'power2.out'
    });
    
    gsap.to(navLinks, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out'
    });
  } else {
    gsap.to(navLinks, {
      opacity: 0,
      y: 20,
      duration: 0.3,
      stagger: 0.05,
      ease: 'power2.in'
    });
    
    gsap.to(mobileMenu, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        mobileMenu.style.visibility = 'hidden';
      }
    });
  }
});





gsap.fromTo(
    ".redLines>div",
    { 
        y:0
    },
    { 
        y:"-105vh",
        opacity: 1, 
        duration: 1,
        stagger:0.3,
        scrollTrigger: {
            trigger: ".redLines",
            toggleActions: "play none none none"
        },
        ease: "power1.inOut",
    }
);



function updateCountdown() {
    const eventDate = new Date("March 12, 2025 00:00:00").getTime();
    const now = new Date().getTime();
    const timeLeft = eventDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("days").textContent = days < 10 ? "0" + days : days;
    document.getElementById("hours").textContent = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").textContent = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").textContent = seconds < 10 ? "0" + seconds : seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

gsap.from("#home h1", { opacity: 0, y: -50, duration: 1 });
gsap.from("#home p", { opacity: 0, y: 50, duration: 1, delay: 0.5 });
gsap.from(".circle", { scale: 0, duration: 1.5, stagger: 0.3, ease: "elastic.out(1, 0.5)" });


