// à modifier
var wallet = 1000;


var currentInput = 0;

var greenBet = 0;
var redBet = 0;
var blackBet = 0;

$(".Wallet").html("Wallet: " + wallet);

var roulette = "<span class='Green'>0</span>";

for (var i = 1; i < 37; i++) {

  if (i % 2 == 0) {
    roulette = roulette + "<span class='Red'>"+i+"</span>";
  }else {
    roulette = roulette + "<span class='Black'>"+i+"</span>";
  }
}

roulette = roulette + roulette + roulette + roulette + roulette;

document.getElementById('RollerContainer').innerHTML = roulette;

function spinTest() {

  console.log(redBet);
  console.log(blackBet);
  console.log(greenBet);



    axios.post('http://localhost:8080/api/games/play/roulette', {
    red_bet: redBet,
    black_bet: blackBet,
    green_bet: greenBet,
    user_id: localStorage.getItem("userid")
  }).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    toastDangerAlert("Server error when playing roulette");
  });
}

function getUserBitcoin() {
  //event.preventDefault();

  axios.post('http://localhost:8080/api/wallet/get/bitcoin', {
    user_id: localStorage.getItem("userid")
  }).then(function (response) {
    console.log(response.data);
    return response.data;
  }).catch(function (error) {
    toastDangerAlert("Server error when retrieving your wallet informations");
  });
}
// à modifier
function SpinRoulette(){

  if (greenBet + redBet + blackBet > wallet) {
    alert("Bet bigger than wallet");
    cLearBets();
  }else {
    currentInput = parseInt($(".BetInput").val());

    var ResultColor = "";

    var RanNum = Math.floor((Math.random() * 36) + 0);
    var SuspenceFactor = Math.floor(Math.random() * 8) - 4;

    if (RanNum == 0) {
      ResultColor = "Green";
    }else if (RanNum % 2 == 0) {
      ResultColor = "Red";
    }else {
      ResultColor = "Black";
    }

    var SpinPro = ((RanNum - 4 + SuspenceFactor / 10) * 0.54054054054 + 60) * -1;
    console.log("spinpro : " + SpinPro);

      $("#RollerContainer").css({"transition": "none","transform" : "translate(0%, 0%)"});

      setTimeout(function(){

      $("#RollerContainer").css({"transition": "transform 5s ease","transform" : "translate(" + SpinPro + "%, 0%)"});
      }, 100);

        $(".BottomButtons, .BetColorBtn").prop("disabled",true);

        setTimeout(function(){
        $(".BottomButtons, .BetColorBtn").prop("disabled",false);

          if (greenBet > 0 && ResultColor == "Green") {
            wallet = wallet + greenBet * 36 - redBet - blackBet;
          }else if (redBet > 0 && ResultColor == "Red") {
            wallet = wallet + redBet - greenBet - blackBet;
          }else if (blackBet > 0 && ResultColor == "Black") {
            wallet = wallet + blackBet - redBet - greenBet;
          }else if (blackBet > 0 || redBet > 0 || greenBet > 0) {
            wallet = wallet - redBet - greenBet - blackBet;

            if (wallet == 0) {
              $(".Wallet").html("Wallet: " + wallet);
              var newGame = confirm("You're out of money would you like to add another 1000");

              if (newGame == true) {
                wallet = 1000;
                $(".Wallet").html("Wallet: " + wallet);
              }else {
                alert("Oh well I hope you had fun while it lasted")
              }
            }
          }

          $(".Wallet").html("Wallet: " + wallet);
          $(".BlackBet, .GreenBet, .RedBet").html("0");
          redBet = greenBet = blackBet = 0;

        }, 5000);
  }
}

function cLearBets(){
  $(".BlackBet, .GreenBet, .RedBet").html("0");
  redBet = greenBet = blackBet = 0;
}

function BetInput(betInput){

  currentInput = $(".BetInput").val();

    if (currentInput.match(/[a-z]/i) && $(".BetInput").val() != "") {
      alert("Please only enter numbers");
    }

      if (betInput == "clear") {
        $(".BetInput").val("");
        currentInput = 0;
      }else if (betInput == "1/2") {
        currentInput = Math.round(currentInput/2);
        $(".BetInput").val(currentInput);
      }else if (betInput == "x2") {
        $(".BetInput").val(currentInput*2);
        currentInput = currentInput*2;
      }else if (betInput == "ai") {
        $(".BetInput").val(wallet);
        currentInput = wallet;
      }else if (betInput == "input") {

      }else {
        if (currentInput == "") {
          currentInput = 0;
        }

        $(".BetInput").val(parseInt(currentInput) + parseInt(betInput));
        currentInput = parseInt(currentInput) + parseInt(betInput);
      }
}

$(".BetColorBtnRed").click(function(){
  if ($(".BetInput").val().match(/[a-z]/i) || $(".BetInput").val() == "") {
    alert("Please enter a bet and only enter numbers");
  }else {
    redBet = redBet + parseInt($(".BetInput").val());
    $(".RedBet").html(redBet);
  }
});

$(".BetColorBtnGreen").click(function(){
  if ($(".BetInput").val().match(/[a-z]/i) || $(".BetInput").val() == "") {
    alert("Please enter a bet and only enter numbers");
  }else {
    greenBet = greenBet + parseInt($(".BetInput").val());
    $(".GreenBet").html(greenBet);
  }
});

$(".BetColorBtnBlack").click(function(){
  if ($(".BetInput").val().match(/[a-z]/i) || $(".BetInput").val() == "") {
    alert("Please enter a bet and only enter numbers");
  }else {
    blackBet = blackBet + parseInt($(".BetInput").val());
    $(".BlackBet").html(blackBet);
  }
});

function toastDangerAlert(content, title) {
  halfmoon.initStickyAlert({
    content: content,
    title: title,
    alertType: "alert-danger",
    fillType: "filled",
    timeShown: 10000
  });
}

function toastWarningAlert(content, title) {
  halfmoon.initStickyAlert({
    content: content,
    title: title,
    alertType: "alert-secondary",
    fillType: "filled-dm",
    timeShown: 10000
  });
}

function toastSuccessAlert(content, title) {
  halfmoon.initStickyAlert({
    content: content,
    title: title,
    alertType: "alert-success",
    fillType: "filled-lm"
  });
}
