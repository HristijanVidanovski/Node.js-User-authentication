
$signUpForm = document.querySelector('#form-message')//forma za register


//sign up response\
const Message = document.querySelector('#Message')
$signUpForm.addEventListener('submit', (e) => {//when button is selected do something
    e.preventDefault() //no page refresh
    const emailFromUser = document.querySelector('#signUpForm-email').value
    const passwordFromUser = document.querySelector('#signUpForm-password').value
    const repeatPasswordFromUser = document.querySelector('#message-repeatPassword').value

    fetch('/signUp', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({emailFromUser, passwordFromUser, repeatPasswordFromUser})
      }).then(res => res.json())
        .then((res) => {
         
            if (res.redirect_path) { 
                location.href = res.redirect_path
              }
console.log(res.message)
              if (res.message) {
                Message.textContent = res.message
              } else {
                Message.textContent = null
              }
            window.localStorage.setItem('authToken', res.token)
            window.localStorage.setItem('isAuth', true)
        })
})


