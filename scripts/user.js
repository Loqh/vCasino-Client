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
          localStorage.setItem("userid", response.data);
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

function toastDangerAlert(content, title) {
  halfmoon.initStickyAlert({
    content: content,
    title: title,
    alertType: "alert-danger",
    fillType: "filled"
  });
}

function toastWarningAlert(content, title) {
  halfmoon.initStickyAlert({
    content: content,
    title: title,
    alertType: "alert-secondary",
    fillType: "filled-dm"
  });
}