// const scroll = new LocomotiveScroll({
//     el: document.querySelector('.main'),
//     smooth: true
// });
//image.slidesdocs.com/responsive-images/background/coffee-beans-coffee-leaves-blank-powerpoint-background_157ff17e13__960_540.jpg
//t3.ftcdn.net/jpg/00/89/50/58/360_F_89505837_qbkjFIGg3tB3rVLUJnkvRLfkni6xrdbX.jpg

let tl = gsap.timeline()

tl.from("nav",{
    y:-100,
    duration: 1,
    opacity:0,
    delay:1
})
tl.from(".page1 img",{
    scale:0,
    opacity:0,
    duration:1,
})
tl.from(".page1 .heading",{
    y:100,
    duration: 1,
    opacity:0,
    // delay:1,
    stagger:0.1
})


function locomotivescroll(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector(".main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
locomotivescroll()
