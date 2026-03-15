const welcomeScreen = document.getElementById("welcome-screen");
const stageSelection = document.getElementById("stage-selection");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const startBtn = document.getElementById("start-btn");
const backHomeBtn = document.getElementById("back-home");
const quizHomeBtn = document.getElementById("quiz-home");
const restartBtn = document.getElementById("restart-btn");
const resultsHomeBtn = document.getElementById("results-home");

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const typedAnswer = document.getElementById("typed-answer");
const submitAnswer = document.getElementById("submit-answer");

const progressFill = document.getElementById("progress-fill");
const scoreDisplay = document.getElementById("score");
const birthdayMessage = document.getElementById("birthday-message");

const music = document.getElementById("bg-music");

let currentStage = "";
let currentQuestion = 0;
let score = 0;

const quizData = {

illuminated: [

{type:"mcq",question:"Who interpreted Nebuchadnezzar's dream?",options:["Daniel","Isaiah","Jeremiah","Ezekiel"],answer:"Daniel"},
{type:"tf",question:"The Book of Habakkuk is a Major Prophet.",answer:"false"},
{type:"typed",question:"Who succeeded Moses?",answer:"Joshua"},
{type:"mcq",question:"Who was Samuel's mother?",options:["Hannah","Rachel","Sarah","Leah"],answer:"Hannah"},
{type:"typed",question:"Who asked God for wisdom to rule Israel?",answer:"Solomon"},
{type:"tf",question:"Esther mentions God directly.",answer:"false"},
{type:"mcq",question:"Which king saw the handwriting on the wall?",options:["Belshazzar","Saul","David","Ahab"],answer:"Belshazzar"},
{type:"typed",question:"Who was Abraham's first son?",answer:"Ishmael"},
{type:"mcq",question:"Which prophet challenged Baal's prophets?",options:["Elijah","Isaiah","Ezekiel","Hosea"],answer:"Elijah"},
{type:"tf",question:"David killed Goliath.",answer:"true"},
{type:"typed",question:"Who interpreted Pharaoh's dreams?",answer:"Joseph"},
{type:"mcq",question:"Which book has the shortest chapter?",options:["Psalm 117","Psalm 119","Psalm 23","Psalm 1"],answer:"Psalm 117"},
{type:"tf",question:"Jonah preached in Nineveh.",answer:"true"},
{type:"typed",question:"Who wrestled with God?",answer:"Jacob"},
{type:"mcq",question:"Who was the weeping prophet?",options:["Jeremiah","Isaiah","Daniel","Ezekiel"],answer:"Jeremiah"},
{type:"tf",question:"Elijah went to heaven in a chariot.",answer:"true"},
{type:"typed",question:"Who baptized Jesus?",answer:"John the Baptist"},
{type:"mcq",question:"Where was Jesus born?",options:["Bethlehem","Nazareth","Jerusalem","Galilee"],answer:"Bethlehem"},
{type:"tf",question:"Paul wrote Revelation.",answer:"false"},
{type:"typed",question:"Who built the ark?",answer:"Noah"}

],

enlightened: [

{type:"mcq",question:"Which prophet saw the valley of dry bones?",options:["Ezekiel","Isaiah","Daniel","Jeremiah"],answer:"Ezekiel"},
{type:"typed",question:"Who climbed a tree to see Jesus?",answer:"Zacchaeus"},
{type:"tf",question:"Stephen was the first martyr.",answer:"true"},
{type:"mcq",question:"What river did Jesus get baptized in?",options:["Jordan","Nile","Tigris","Euphrates"],answer:"Jordan"},
{type:"typed",question:"Who denied Jesus three times?",answer:"Peter"},
{type:"tf",question:"The New Testament was written in Latin.",answer:"false"},
{type:"mcq",question:"Who built the temple?",options:["Solomon","David","Saul","Josiah"],answer:"Solomon"},
{type:"typed",question:"Who led Israel after Moses?",answer:"Joshua"},
{type:"tf",question:"The Sermon on the Mount is in Matthew.",answer:"true"},
{type:"mcq",question:"Which book talks about the New Heaven?",options:["Revelation","Daniel","Isaiah","Acts"],answer:"Revelation"},
{type:"typed",question:"Who anointed David?",answer:"Samuel"},
{type:"tf",question:"Jesus walked on water.",answer:"true"},
{type:"mcq",question:"Who wrote most Psalms?",options:["David","Solomon","Moses","Asaph"],answer:"David"},
{type:"typed",question:"Who was Samuel's mother?",answer:"Hannah"},
{type:"tf",question:"Paul was shipwrecked.",answer:"true"},
{type:"mcq",question:"Which prophet confronted Ahab?",options:["Elijah","Isaiah","Jeremiah","Hosea"],answer:"Elijah"},
{type:"typed",question:"Who built the ark?",answer:"Noah"},
{type:"tf",question:"The Bible has 66 books.",answer:"true"},
{type:"mcq",question:"Who betrayed Jesus?",options:["Judas","Peter","Thomas","John"],answer:"Judas"},
{type:"typed",question:"Who parted the Red Sea?",answer:"Moses"}

]

};

startBtn.addEventListener("click", () => {

welcomeScreen.classList.add("hidden");
stageSelection.classList.remove("hidden");

music.src="https://www.youtube.com/embed/g9ATdSzw9nE?autoplay=1&loop=1&playlist=g9ATdSzw9nE";

});

backHomeBtn.onclick=()=>{
stageSelection.classList.add("hidden");
welcomeScreen.classList.remove("hidden");
};

quizHomeBtn.onclick=()=>{
quizScreen.classList.add("hidden");
stageSelection.classList.remove("hidden");
};

resultsHomeBtn.onclick=()=>{
resultsScreen.classList.add("hidden");
welcomeScreen.classList.remove("hidden");
};

restartBtn.onclick=()=>{
resultsScreen.classList.add("hidden");
stageSelection.classList.remove("hidden");
};

document.querySelectorAll(".stage-btn").forEach(btn=>{
btn.onclick=()=>{
currentStage=btn.dataset.stage;
currentQuestion=0;
score=0;

stageSelection.classList.add("hidden");
quizScreen.classList.remove("hidden");

loadQuestion();
};
});

function loadQuestion(){

const q=quizData[currentStage][currentQuestion];

questionText.innerText=q.question;

optionsContainer.innerHTML="";

typedAnswer.classList.add("hidden");
submitAnswer.classList.add("hidden");

progressFill.style.width=(currentQuestion/20)*100+"%";

if(q.type==="mcq"){

q.options.forEach(opt=>{

const btn=document.createElement("button");

btn.classList.add("answer-btn");

btn.innerText=opt;

btn.onclick=()=>checkAnswer(opt);

optionsContainer.appendChild(btn);

});

}

else if(q.type==="tf"){

["True","False"].forEach(opt=>{

const btn=document.createElement("button");

btn.classList.add("answer-btn");

btn.innerText=opt;

btn.onclick=()=>checkAnswer(opt.toLowerCase());

optionsContainer.appendChild(btn);

});

}

else{

typedAnswer.classList.remove("hidden");
submitAnswer.classList.remove("hidden");

submitAnswer.onclick=()=>checkAnswer(typedAnswer.value);

}

}

function checkAnswer(ans){

const q=quizData[currentStage][currentQuestion];

if(ans.toLowerCase()===q.answer.toLowerCase()) score++;

currentQuestion++;

if(currentQuestion<20){

loadQuestion();

}else{

showResults();

}

}

function showResults(){

quizScreen.classList.add("hidden");
resultsScreen.classList.remove("hidden");

scoreDisplay.innerText=score;

const percent=(score/20)*100;

if(percent>=85){

birthdayMessage.innerHTML="🎉 Amazing Dad! Your wisdom in the Word is inspiring. Happy Birthday!";

}

else if(percent>=60){

birthdayMessage.innerHTML="Great work Dad! Strong biblical knowledge!";

}

else{

birthdayMessage.innerHTML="Keep shining Dad! Every day is a chance to grow in the Word.";

}

}
