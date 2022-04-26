const message = document.querySelector('#message')
$signInForm = document.querySelector('#form-signIn')//forma za sign in

$signInForm.addEventListener('submit', (e) => {//when button is selected do something
    e.preventDefault() //no page refresh
    const emailResetPassword = document.querySelector('#signInForm-email').value
    
  
fetch('/forgotPasswordEmail', {
  method: 'post',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({emailResetPassword})
}).then(res => res.json())
.then((res) => {
  message.textContent=res.message
  })
})



