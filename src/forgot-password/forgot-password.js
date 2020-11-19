
   document.addEventListener('DOMContentLoaded', function () {
    const forms = document.getElementById('form4');
    


    forms.addEventListener('submit', async function (e) {
       e.preventDefault()
       const email1 = document.getElementById('email').value;
          let response = await fetch('http://localhost:5000/forgotpassword',{
             method:'POST',
             headers: {
                "Content-Type": "application/json; charset=utf-8",
              },
             body: JSON.stringify({ 
             email: email1
         })}).then(response => response.json())
         .then(data => {
            if(data.success)
             {
               alert('Email sent');
                window.location.assign('http://127.0.0.1:5500/src/signin/signin.html')
             }
            else
             {
               alert('Email is not registed');
                console.log("user is already exist");
             }
         })
         .catch((error) => {
           console.error('Error:', error);
         });
 
    })
 
 
 
 
 })





