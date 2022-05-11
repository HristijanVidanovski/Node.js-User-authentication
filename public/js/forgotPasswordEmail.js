const message = document.querySelector('#message')
$signInForm = document.querySelector('#form-signIn')
$signInForm.addEventListener('submit', (e) => {
      e.preventDefault() 
      const emailResetPassword = document.querySelector('#signInForm-email').value
      fetch('/forgotPasswordEmail', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({emailResetPassword})
      })
      .then(res => res.json())
      .then((res) => {message.textContent=res.message })
})



