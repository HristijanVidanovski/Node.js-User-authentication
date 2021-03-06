
$signUpForm = document.querySelector('#form-message')//forma za register
const message = document.querySelector('#message')
$signUpForm.addEventListener('submit', (e) => {//when button is selected do something
    e.preventDefault() //no page refresh
    const newPasswordReset = document.querySelector('#newPasswordReset').value
    const confirmPasswordReset = document.querySelector('#confirmPasswordReset').value
    var url = new URL(document.location.href);
    var token = url.searchParams.get("token");
    fetch('/forgotPasswordReset/' + encodeURIComponent(token) + '', {
        method: 'post',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({newPasswordReset, confirmPasswordReset})
      })
    .then(res => res.json())
    .then((res) => {message.textContent=res.message })       
})


