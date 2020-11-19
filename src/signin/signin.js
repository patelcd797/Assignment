
   document.addEventListener('DOMContentLoaded', function () {
    
    const forms = document.getElementById('form2');
    forms.addEventListener('submit', async function (e) {
       e.preventDefault()

       const email1 = document.getElementById('email').value;
       const password1 = document.getElementById('password').value;
 // done ..
          let response = await fetch('http://localhost:5000/login',{
             method:'POST',
             headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
             body: JSON.stringify({ 
             email: email1,
             password: password1 
         })}).then(response => response.json())
         .then(data => {
            if(data.success)
             {
               localStorage.setItem('login','1');
               localStorage.setItem('email',email1);
                window.location.assign('http://127.0.0.1:5500/src/home/home.html')
             }
            else
             {
               alert('User name or password is wrongs');
             } 
         })
         .catch((error) => {
           console.error('Error:', error);
         });
         
    }) 
 
 
 
 
 })





