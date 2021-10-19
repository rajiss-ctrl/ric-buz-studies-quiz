// getting all the required element

const start_btn =document.querySelector('.start_btn button');
const info_btn =document.querySelector('.info_box');
const exit_btn =document.querySelector('.buttons .quit');
const continue_btn =info_btn.querySelector('.buttons .restart');
const quiz_box = document.querySelector('.quiz_box');
const option_list = document.querySelector(".option_list");
const timeCount = quiz_box.querySelector('.timer .timer_sec');
const timeLine = quiz_box.querySelector('header .time_line');
const timeOff = quiz_box.querySelector('header .time_text');
const next_btn = document.querySelector('.next_btn');
const result_box = document.querySelector('.result_box');


// if start quiz button is click

start_btn.addEventListener('click',()=>{
    info_btn.classList.add('activeInfo')// show the info box
})


// if exit  button is click

exit_btn.addEventListener('click',()=>{
    info_btn.classList.remove('activeInfo')// hide the info box
})

// if continue button is clicked

continue_btn.addEventListener('click', ()=>{
    info_btn.classList.remove('activeInfo');// hide the info box again
    quiz_box.classList.add('activeQuiz');//show the quiz box
    showQuestions(0);
    queCounter(1);
    startTimer(15);
    startTimerLine(0);
});

let que_count =0;
let que_numb =1;
let counter;
let counterLine;
let timeValue = 15;
let widthValue =0;
let userScore =0;


const restart_quiz = result_box.querySelector('.buttons .restart');
const quit_quiz = result_box.querySelector('.buttons .quit');

restart_quiz.onclick=()=>{
quiz_box.classList.add('activeQuiz');//show quiz box
result_box.classList.remove('activeResult');//hie result box
 que_count =0;
 que_numb =1;
 timeValue = 15;
 widthValue =0;
 userScore =0;

showQuestions(que_count);//calling showQuestion function
queCounter(que_numb);//passing que_numb value to queCounter
clearInterval(counter);//clear counter
startTimer(timeValue);//calling startTimer function
clearInterval(counterLine);
startTimerLine(widthValue);//calling startTimerLine function
next_btn.style.display="none";
timeOff.textContent='Time Left';
}

quit_quiz.onclick=()=>{
    window.location.reload();//reload the current window
}

//if next button clicked
next_btn.onclick=()=>{
  if(que_count < questions.length - 1){
        que_count++;
        que_numb++;
        showQuestions(que_count);
        queCounter(que_numb);
        clearInterval(counter);
        startTimer(timeValue)
        clearInterval(counterLine);
        startTimerLine(widthValue);
        next_btn.style.display="none"; // put next button on hold utill an option is chosen
        timeOff.textContent='Time Left';
    }else{
         clearInterval(counter);
        clearInterval(counterLine);
      console.log('question completed');
    showResulBox();
  }
}

// getting questions and options from array

function showQuestions(index){
const que_text = document.querySelector(".que_text");

let que_tag ='<span>'+ questions[index].numb + "." + questions[index].question +'</span>';
let option_tag =  '<div class="option">' + questions[index].options[0] +'<span></span></div>'
                + '<div class="option">' + questions[index].options[1] +'<span></span></div>'
                + '<div class="option">' + questions[index].options[2] +'<span></span></div>'
                + '<div class="option">' + questions[index].options[3] +'<span></span></div>';
que_text.innerHTML=que_tag;
option_list.innerHTML=option_tag;
const option = option_list.querySelectorAll('.option');
for(let i = 0; i < option.length; i++){
    option[i].setAttribute("onclick", "optionSelected(this)");
}
}


let tickIcon ='<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIcon =' <div class="icon cross"><i class="fas fa-times"></i></div>';



function optionSelected(answer){
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns =answer.textContent;
    let correctAns = questions[que_count].answer;
    let allOptions = option_list.children.length;
   
    console.log(userScore)
    if(userAns == correctAns){
         userScore +=1;
        answer.classList.add('correct');
        answer.insertAdjacentHTML('beforeend', tickIcon);
        console.log('correct')
    }else{
        answer.classList.add('incorrect')
        answer.insertAdjacentHTML('beforeend', crossIcon);
        console.log('wrong')

        //if answer is incorrect automatically select correct answer
        for (let i = 0; i < allOptions; i++) {
        if(option_list.children[i].textContent==correctAns){
         option_list.children[i].setAttribute("class", "option correct");
         option_list.children[i].insertAdjacentHTML('beforeend', tickIcon);   
        }
        }
        
    }
    //once user select disable all option
    for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add('disable')
        
    }
    console.log(correctAns)
    // make the next button display
    next_btn.style.display="block"
}



function showResulBox(){
    info_btn.classList.remove('activeInfo');// hide the info box again
    quiz_box.classList.remove('activeQuiz');//hide the quiz box
    result_box.classList.add('activeResult');//show the result box
    const scoreText =result_box.querySelector('.score_text');
    if(userScore > 3){
        let scoreTag =' <span>and congrats!, you got  <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML=scoreTag;
    }else if(userScore > 1){
        let scoreTag =' <span>and nice, you got  <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML=scoreTag;
    }else{
        let scoreTag =' <span>and sorry, you got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>';
        scoreText.innerHTML=scoreTag;
    }
}



function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent= time;
        time--;
        if(time < 9){
            let addZero = timeCount.textContent;
            timeCount.textContent="0" + addZero;
        }
        if(time < 0){
            clearInterval(counter);
             timeCount.textContent= "00";
             timeOff.textContent='Time Off';

        let correctAns = questions[que_count].answer;
        let allOptions = option_list.children.length;

              for (let i = 0; i < allOptions; i++) {
        if(option_list.children[i].textContent==correctAns){
         option_list.children[i].setAttribute("class", "option correct");
         option_list.children[i].insertAdjacentHTML('beforeend', tickIcon);   
        }
        }

          for (let i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add('disable')
        }
        console.log(correctAns)
        // make the next button display
        next_btn.style.display="block"
        }
        }
    }


function startTimerLine(time){
    counterLine = setInterval(timer, 29);
    function timer(){
        time += 1;
        timeLine.style.width= time + "px";
        if(time > 549){
            clearInterval(counterLine);
        }

    }
}



function queCounter(index){
    const button_ques_counter = document.querySelector('.total_que');
    let totalQuesCountTag = '<span><p>'+ index +'</p>of<p>'+ questions.length +'</p>Questions</span>';
    button_ques_counter.innerHTML=totalQuesCountTag;
}





// for mobile side bar
const hide_arrow = document.querySelector('.left_arrow');
const display_arrow = document.querySelector('.right_arrow');

const toggleSideBar= document.querySelector('.nav_bar');

hide_arrow.addEventListener('click',()=>{
    toggleSideBar.classList.remove('active');
});

display_arrow.addEventListener('click',()=>{
    toggleSideBar.classList.add('active');
});