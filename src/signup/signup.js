
   
   document.addEventListener('DOMContentLoaded', function () {
      const forms = document.getElementById('form1');
     



      forms.addEventListener('submit', async function (e) {
         e.preventDefault()
      
         
         const fname1 = document.getElementById('fname').value;
         const lname1 = document.getElementById('lname').value;
         const email1 = document.getElementById('email').value;
         const password1 = document.getElementById('password').value;
        
        
         // password checker 
         var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
         if(!password1.match(passw)) 
         { 
             alert('password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter')
             return false;
         }







         //done..
            let response = await fetch('http://localhost:5000/register',{
               method:'POST',
               headers: {
                  "Content-Type": "application/json; charset=utf-8",
                },
               body: JSON.stringify({ 
               fname: fname1, 
               lname: lname1, 
               email: email1,
               password: password1 
           })}).then(response => response.json())
           .then(data => {
              console.log(data);
              if(data.success)
               {
                  localStorage.setItem('login','1');
                  localStorage.setItem('email',email1);
                  window.location.assign('http://127.0.0.1:5500/src/home/home.html')
               }
              else
                alert('Email is already in use');
           })
           .catch((error) => {
             console.error('Error:', error);
           });
      })
   
   
   
   
   })





