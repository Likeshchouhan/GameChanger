const scroll = new LocomotiveScroll({
     el: document.querySelector('#main'),
     smooth: true
});
 
function firstPageAnim() {
     var tl = gsap.timeline();
     tl.from("#nav", {
          y: '-10',
          opacity: 0,
          duration: 1.3,
          ease: Expo.easeInOut
          
     })

     tl.to(".boundingelem", {
          y: '0',
          duration: 2,
          delay:-1,
          ease: Expo.easeInOut,
          stagger: .2
          
     })

     tl.from("#homefooter", {
          y: -10,
          opacity:0,
          duration: 1.4,
          delay:-1,
          ease: Expo.easeInOut,                        
     })
}

function circleSkew() {
     var timeout;
     var xscale = 1;
     var ysccale = 1;

     var xprev = 0;
     var yprev = 0;
     window.addEventListener("mousemove", function (dets) {
          clearTimeout(timeout);
          var xdiff = dets.clientX - xprev;
          var ydiff = dets.clientY - yprev;
          
          xscale=gsap.utils.clamp(.8, 1.2, xdiff);
          yscale = gsap.utils.clamp(.8, 1.2, ydiff);
          
          xprev = dets.clientX;
          yprev = dets.clientY;

          circleMouseFollower(xscale, yscale);
          timeout = setTimeout(function () { 
               document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(1,1)`;
          }, 100);


     });
}
circleSkew();


function circleMouseFollower(xscale,yscale) {
     window.addEventListener("mousemove", function(dets) {
          document.querySelector("#minicircle").style.transform = `translate(${dets.clientX}px, ${dets.clientY}px) scale(${xscale}, ${yscale})`;
     })
}
circleMouseFollower();
firstPageAnim();

document.querySelectorAll(".elem").forEach(function (elem) {
     var rotate = 0;
     var diffrot = 0;

     elem.addEventListener("mouseleave", function (dets) {
          gsap.to(elem.querySelector("img"), {
               opacity: 1,
               ease: Power3,
               duration:0.3,
          });

     });

     elem.addEventListener("mousemove", function (dets) {
          var diff = dets.clientY - elem.getBoundingClientRect().top;
          diffrot =dets.clientX-rotate;
          rotate = dets.clientX;
          gsap.to(elem.querySelector("img"), {
               opacity: 1,
               ease: Power3,
               top: diff,
               left: dets.clientX,
               rotate: gsap.utils.clamp(-20, 20, diffrot*0.3),
          });

     });
});

