if(localStorage.login =='1')
{
    var myobj = document.querySelector(".div-header")
    var signup_login_button= document.getElementsByClassName("login-signup")
    console.log(signup_login_button);
    while(signup_login_button[0]) 
     signup_login_button[0].parentNode.removeChild(signup_login_button[0])

     var div1 = document.createElement("div");
     div1.className = "div-profile profile-logout";
     var a1 = document.createElement("a");
     a1.href ="../userprofile/userprofile.html";
     a1.innerText="Create User Profile";
     div1.appendChild(a1);
     myobj.appendChild(div1);


     var div2 = document.createElement("div");
     div2.className = "div-float profile-logout";
     var button1 = document.createElement("button");
     button1.innerText="Logout";
     button1.setAttribute("onclick","logout2()");
     div2.appendChild(button1);
     myobj.appendChild(div2);


    // <div class='div-float profile-logout'><button>Logout</button></div>"
     console.log(button1);
}

// check user profile exist or not

let response =  fetch('http://localhost:5000/profilecheck',{
               method:'POST',
               headers: {
                  "Content-Type": "application/json; charset=utf-8",
                },
               body: JSON.stringify({  
               email: localStorage.email
           })}).then(response => response.json())
           .then(data => {
              console.log(data);
              if(data.success)
               {
                    var myobj = document.querySelector(".div-header")
                    var userprofile1= document.getElementsByClassName("div-profile")
                    while(userprofile1[0]) 
                    userprofile1[0].parentNode.removeChild(userprofile1[0])
               }
           })
           .catch((error) => {
             console.error('Error:', error);
           });

function logout2(){
    var myobj = document.querySelector(".div-header")
    var logout_userprofile_button= document.getElementsByClassName("profile-logout")
    console.log("Hello");
    while(logout_userprofile_button[0]) 
    logout_userprofile_button[0].parentNode.removeChild(logout_userprofile_button[0])

     var div1 = document.createElement("div");
     div1.className = "div-float login-signup";
     var a1 = document.createElement("a");
     a1.href ="../signin/signin.html";
     a1.innerText="Sign In";
     div1.appendChild(a1);
     myobj.appendChild(div1);


     var div2 = document.createElement("div");
     div2.className = "div-float login-signup";
     var button1 = document.createElement("button");
     var a2 = document.createElement("a");
     a2.href ="../signup/signup.html";
     a2.innerText="Sign Up";
     div2.appendChild(a2);
     myobj.appendChild(div2);
     localStorage.removeItem("login");
     localStorage.removeItem("email");
     localStorage.removeItem("userprofile");
}