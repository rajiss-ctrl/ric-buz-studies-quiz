const remove_popup = document.querySelector('.popup button');
const popup = document.querySelector('.popup');
 
// popup
window.addEventListener('load',()=>{
   setTimeout(
       function(){
           popup.style.display='block';
       },3000); 
 
})
     remove_popup.addEventListener('click',()=>{
    popup.style.display='none';
})


//select neccessary elements
const hide_arrow = document.querySelector('.left_arrow');
const display_arrow = document.querySelector('.right_arrow');

const toggleSideBar= document.querySelector('.nav_bar');

hide_arrow.addEventListener('click',()=>{
    toggleSideBar.classList.remove('active');
display_arrow.style.display="block";
});

display_arrow.addEventListener('click',()=>{
    toggleSideBar.classList.add('active');
    display_arrow.style.display="none";
});
// document.body.addEventListener('click',()=>{
// 	console.log(123)
//     toggleSideBar.classList.remove('active');
// });





