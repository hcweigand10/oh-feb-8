// selectors for signup and login button 
// event listeners for each
// login and signup functions
// - fetch request to /api/users
const loginForm = document.querySelector(".login-form")
const signupForm = document.querySelector(".signup-form")



const login = async (event) => {
  event.preventDefault()
  const email = document.getElementById("email-login").value
  const password = document.getElementById("password-login").value
  const response = await fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password
    }),
    headers: { 'Content-Type': 'application/json' },
  })
  console.log(response)
  if (response.ok) {
    document.location.replace("/profile")
  }
}

const signup = (event) => {
  
}

loginForm.addEventListener("submit", login)
signupForm.addEventListener("submit", signup)