const Message = document.querySelector('#Message')
$signInForm = document.querySelector('#form-signIn')//forma za sign in





$signInForm.addEventListener('submit', (e) => {//when button is selected do something
    e.preventDefault() //no page refresh
    const emailFromUser = document.querySelector('#signInForm-email').value
    const passwordFromUser = document.querySelector('#signInForm-password').value
  
fetch('/signIn', {
  method: 'post',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({emailFromUser, passwordFromUser, authtype: 'authClient'})
}).then(res => res.json())
.then((res) => {
      window.localStorage.setItem('authToken', res.token)
      window.localStorage.setItem('isAuth', '<button id="logoutButton" class="logout" >Logout</button>')

      
      if (res.redirect_path) { 
        location.href = res.redirect_path
      }
    
      
 
  })
})




//google sign in, send token to server
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  console.log('Image URL: ' + profile.getImageUrl());
  var id_token = googleUser.getAuthResponse().id_token;
          fetch('/signInGoogle', {
                method:'post',
                headers: {
                  Accept: 'application/json',
                  Authentication: 'Bearer Token',
                  'Bearer': id_token
                },
              })
              .then(res => res.json())
              .then( (res) => {
                
                window.localStorage.setItem('authToken', res.token)
                window.localStorage.setItem('google', 'signin from google')
                window.localStorage.setItem('isAuth', '<button id="logoutButton" class="logout" >Logout</button>')
                
                if (res.redirect_path) { 
                  location.href = res.redirect_path
                }
               
            
                if (res.message) {
                  Message.textContent = res.message
                } else {
                  Message.textContent = null
                }   
          })
}


