function startQuiz() {
  $('#begin').on('click', function(event){
    renderAQuestion();
  }
  );
}

function updateQuestionAndScore() {
    const html = $(`
        <div id="question-of-total">Questions Number: ${STORE.currentQuestion + 1}/${STORE.questions.length}</div>
        <div id="question-score">Score: ${STORE.score}/${STORE.questions.length}</div>`);
    $("#quiz-score").html(html);
    }

  function updateOptions(){
  let question = STORE.questions[STORE.currentQuestion];
  for(let i=0; i<question.options.length; i++)
  {
    $('#present-question').append(`
        <input type = "radio" name="options" id="option${i+1}" value= "${question.options[i]}" tabindex ="${i+1}"> 
        <label for="option${i+1}"> ${question.options[i]}</label> <br/>
        <span id="js-r${i+1}"></span>`);
  }
}
  
  function renderAQuestion() {
    let question = STORE.questions[STORE.currentQuestion];
    updateQuestionAndScore();
    const questionHtml = $(`
    <form id='question-form'>
    <fieldset id='quiz-in-process'>
     <legend>${question.question}</legend>
     <div id='present-question'></div>
    <section class='next-question-button'>
      <button type = "submit" id = "answer">Submit</button>
      <button type = "button" id="next-question" tabindex="6"> Next >></button>
    </section>
    </fieldset>
    <form>`);

  $("main").html(questionHtml);
  updateOptions();
  $("#next-question").hide();
  }

  /*checks whether the chosen option is right or wrong and displays respective message
  When I make the action, on(click) on lin 50, the fucntion partially works.. submit is not working
  
  
  */ 
  function handleSelectOption() {
    $('body').on("submit",'#question-form', function(event) {
      event.preventDefault();
      let currentQues = STORE.questions[STORE.currentQuestion];
      let selectedOption = $("input[name=options]:checked").val();
      if (!selectedOption) {
        alert("Choose an option");
        return;
      } 
      let id_num = currentQues.options.findIndex(i => i === selectedOption);
      let id = "#js-r" + ++id_num;
      $('span').removeClass("right-answer wrong-answer");
      if(selectedOption === currentQues.answer) {
        STORE.score++; 
        $(`${id}`).append(`Great job eh! You are correct!<br/>`);
        $(`${id}`).addClass("right-answer");
      }
      else {
        $(`${id}`).append(`Sorry! You answered incorrectly! The answer is "${currentQues.answer}"<br/>`);
        $(`${id}`).addClass("wrong-answer");
      }
  
      STORE.currentQuestion++;
      $("#question-score").text(`Score: ${STORE.score}/${STORE.questions.length}`);
      $('#answer').hide();
      $("input[type=radio]").attr('disabled', true);
      $('#next-question').show();
    });
  }

/* displays results and restart quiz button */
function displayResults() {
    let resultHtml = $(
      `<form id="restart-quiz">
          <fieldset id='restart-bg'>
              <div>
                <h2 id='final-score'>Your Score is: ${STORE.score}/${STORE.questions.length}</h2>
              </div>
          
             <div>
                <button type="button" id="restart"> Restart Quiz </button>
            </div>
          </fieldset>
      </form>`);
      STORE.currentQuestion = 0;
      STORE.score = 0;
    $("main").html(resultHtml);
  }
  
  /* checks whether it reached the end of questions list */
  function handleQuestions() {
    $('body').on('click','#next-question', (event) => {
      STORE.currentQuestion === STORE.questions.length?displayResults() : renderAQuestion();
    });
  }
  
  
  function restartQuiz() {
    $('body').on('click','#restart', (event) => {
      renderAQuestion();
    });
  }
  
  function handleQuizApp() {
    startQuiz();
    handleQuestions();
    handleSelectOption();
    restartQuiz();
  }
  
  $(handleQuizApp);