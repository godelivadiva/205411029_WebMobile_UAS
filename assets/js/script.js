// Top Button function
// mamanggil showTopButton() ketika ada aktifitas scroll di window
window.onscroll = function() {
  showTopButton();
};

// fungsi untuk menentukan kapan topButton muncul dan menghilang
// dengan mendapatkan posisi scroll halaman pada browser
function showTopButton() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById('topButton').style.display = 'block';
  } else {
    document.getElementById('topButton').style.display = 'none';
  }
}

// fungsi ketika tomboll topButton di klik yaitu mengembalikan posisi ke atas
function scrollToTop() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

// Resize navbar container
const resizeNavParent = () => {
    var _navbar = document.getElementById('topNavigation')
    console.log(_navbar)
    var _height = _navbar.clientHeight
    var _clearFixEl = document.createElement('div')
    _clearFixEl.style.marginBottom = `${_height}px`
    _navbar.after(_clearFixEl)
}

/**
 * Gallery Category Filter
 */
// Get testimonial container Height
const testimonialHeight = () => {
    var containerHeight = 0;    
    var testimonialItems = document.querySelectorAll('#testimonials .testimony-item')
    testimonialItems.forEach(el => {
        if(el.clientHeight > containerHeight)
        containerHeight = el.clientHeight
    })
    document.querySelector('#testimonials .testimonies-inner').style.height = `${containerHeight}px`
}
/** Testimony slider */
const testimonySlider = () =>{
    var _prev =  document.querySelector('#testimonials .testimony-item-prev-btn')
    var _next =  document.querySelector('#testimonials .testimony-item-next-btn')
    console.log(_next)
    _next.addEventListener('click', e=>{
        e.preventDefault()
        var currentActive = document.querySelector('#testimonials .testimony-item.active')
        if(currentActive != null){
            var nextSibling = currentActive.nextElementSibling || document.querySelector('#testimonials .testimony-item:nth-child(1)')
            if(nextSibling != null){
                _prev.setAttribute('disabled',true)
                _next.setAttribute('disabled',true)
                currentActive.classList.remove('active')
                nextSibling.classList.add('active')
                // if(.)
                currentActive.classList.add('slide-next','slide-start')
                nextSibling.classList.add('slide-next','slide-end')
                setTimeout(()=>{
                    currentActive.classList.remove('slide-next','slide-start')
                    nextSibling.classList.remove('slide-next','slide-end')
                    _prev.removeAttribute('disabled')
                    _next.removeAttribute('disabled')
                },300)
            }
        }
    })
    _prev.addEventListener('click', e=>{
        e.preventDefault()
        var currentActive = document.querySelector('#testimonials .testimony-item.active')
        if(currentActive != null){
            var prevSibling = currentActive.previousElementSibling || document.querySelector('#testimonials .testimony-item:nth-last-child(1)')
            if(prevSibling != null){
                _prev.setAttribute('disabled',true)
                _next.setAttribute('disabled',true)
                currentActive.classList.remove('active')
                prevSibling.classList.add('active')
                // if(.)
                currentActive.classList.add('slide-prev','slide-start')
                prevSibling.classList.add('slide-prev','slide-end')
                setTimeout(()=>{
                    currentActive.classList.remove('slide-prev','slide-start')
                    prevSibling.classList.remove('slide-prev','slide-end')
                    _prev.removeAttribute('disabled')
                    _next.removeAttribute('disabled')
                },300)
            }
        }
    })
}

setTimeout(()=>{
    resizeNavParent()
    window.onresize = () =>{
        resizeNavParent()
        testimonialHeight()
    }
    testimonialHeight()
    testimonySlider()
},300)

// copyright-year
const cry = document.getElementById('copyright-year')
var _now = new Date()
cry.innerText = _now.getFullYear()