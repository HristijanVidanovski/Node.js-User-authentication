const myForm = document.getElementById("myForm")
$logoutButton = document.querySelector('#logoutButton') 
const inpFile = document.getElementById("inpFile")
var email = document.querySelector('#email_profilepage').innerHTML

myForm.addEventListener('submit', (e)=> {
  e.preventDefault()
  const formData= new FormData()
  formData.append("inpFile", inpFile.files[0])
      //fetch profile image
      fetch('/uploadProfileImage', {
        method:'post',
        headers: {
          Authentication: 'Bearer Token',
          'Bearer': window.localStorage.getItem('authToken')
        },
        body: formData
      }) 
      .then(res => res.json())
      .then( (res) => {
        location.href = res.redirect_path
      })
    })
      //fetch profile data
      fetch('/profile', {
        method:'post',
        headers: {
          Accept: 'application/json',
          Authentication: 'Bearer Token',
          'Bearer': window.localStorage.getItem('authToken')
        }
      })
      .then(res => res.json())
      .then( (res) => {
        email = res.email
        document.getElementById('profileImage').innerHTML = '<img src="/img/' + res.profileImageFileName + '" style="border-radius: 50%; width: 20%;">'
        document.querySelector('#email_profilepage').innerHTML='Email:'+ email +''
        })

 //logout button
  $logoutButton.addEventListener('click', () => {
  fetch('/logout', {
    method:'post',
  headers: {
    Accept: 'application/json',
    Authentication: 'Bearer Token',
    'Bearer': window.localStorage.getItem('authToken')
  },
  })
   .then(res => res.json())
   .then( (res) => {
      signOut()//signout from google
      window.localStorage.getItem('authToken')
      window.localStorage.setItem('isAuth', "<button class='logout' onclick='location.href=\""+ "signIn" +"\"' > Login</button>")
      location.href = res.redirect_path//redirect to signin
  })
})


function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
  });
}
function onLoad() {
  gapi.load('auth2', function() {
  gapi.auth2.init();
  });
}
onLoad()



 
