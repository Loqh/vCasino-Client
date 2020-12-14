function createUser(event) {
  event.preventDefault();

  if (document.getElementById('name_input').textLength >= 5) {
    if (document.getElementById('password_input').textLength >= 5) {
      if (document.getElementById('password_input').value == document.getElementById('password_confirm_input').value) {
        axios.post('http://localhost:8080/api/user/create', {
          user_name: document.getElementById('name_input').value,
          user_email: document.getElementById('email_input').value,
          user_password: document.getElementById('password_input').value
        }).then(function (response) {
          //localStorage.setItem("userid", response.data);
          window.location.href = "games.html";
        }).catch(function (error) {
          toastDangerAlert("Server error (username already in use, email in use)", "Cannot create account");
        });
      }
      else {
        toastDangerAlert("Make sure you entered the same password in both of the password fields", "Cannot create account")
      }
    }
    else {
      toastDangerAlert("Your password must be at least 5 characters", "Cannot create account")
    }
  }
  else {
    toastDangerAlert("Your username must be at least 5 characters", "Cannot create account")
  }
}

function loginUser(event) {
  event.preventDefault();

  axios.post('http://localhost:8080/api/user/login', {
    user_email: document.getElementById('email_input').value,
    user_password: document.getElementById('password_input').value
  }).then(function (response) {
    localStorage.setItem("userid", response.data);
    window.location.href = "games.html";
  }).catch(function (error) {
    toastDangerAlert("Your email and password combination doesn't match.","Cannot login to your account");
  });
}

function checkUsername(name) {
  if (name) {
    axios.post('http://localhost:8080/api/user/check/name', {
    user_name: name
  }).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.log(error);
    toastWarningAlert("This username is already taken. Please choose another one or try to add some characters","Cannot change username");
  });
  }
}

function changeUsername(event, name) {
  event.preventDefault();
  console.log("cl name change : " + name);
  axios.post('http://localhost:8080/api/user/update/name', {
    user_name: name,
    user_id: localStorage.getItem("userid")
  }).then(function (response) {
    toastSuccessAlert("Your username has been changed to " + name,"Account information updated");
  }).catch(function (error) {
    console.log(error);
    toastDangerAlert("There was an error when updating your username","Cannot change email");
  });
}

function changeEmail(event, email) {
  event.preventDefault();
  console.log("cl email change : " + email);
  axios.post('http://localhost:8080/api/user/update/email', {
    user_email: email,
    user_id: localStorage.getItem("userid")
  }).then(function (response) {
    toastSuccessAlert("Your email has been changed to " + email,"Account information updated");
  }).catch(function (error) {
    console.log(error);
    toastDangerAlert("There was an error when updating your email","Cannot change email");
  });
}

function changePassword(event, password) {
  event.preventDefault();
  console.log("cl email change : " + password);
  axios.post('http://localhost:8080/api/user/update/password', {
    user_password: password,
    user_id: localStorage.getItem("userid")
  }).then(function (response) {
    toastSuccessAlert("Your password has been changed","Account information updated");
  }).catch(function (error) {
    console.log(error);
    toastDangerAlert("There was an error when updating your password","Cannot change password");
  });
}

var delay = (function(){
  var timer = 0;
  return function(callback, ms){
  clearTimeout (timer);
  timer = setTimeout(callback, ms);
 };
})();

function checkUsernameDelayed(name) {
  delay(function(){
    checkUsername(name)
  }, 500 );
};

function disableInputs() {
  var inputs = document.getElementsByTagName("input");

  for (i = 0; i < inputs.length; i++) {
    inputs[i].setAttribute("disabled", "disabled");
}
}

function createValidateButton(event, gg, gg2, gg3) {
  event.preventDefault();
  console.log(gg);

  if (gg.getAttribute("disabled") == "disabled") {
    gg.removeAttribute("disabled")

  var newItem = document.createElement("button");
  newItem.setAttribute("class", "btn generated");
  newItem.setAttribute("type", "submit");
  var newVitem = document.createElement("i");
  newVitem.setAttribute("class", "fas fa-check");
  newItem.setAttribute("onclick", gg2+"(event, document.getElementById('"+gg3+"').value),event.target.remove(), disableInputs()")
  newItem.appendChild(newVitem);

  console.log(event);
  event.target.parentElement.insertBefore(newItem, event.parentElement)
  }

}

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