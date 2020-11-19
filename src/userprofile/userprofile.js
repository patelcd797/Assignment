
   document.addEventListener('DOMContentLoaded', function (e1) {

    const forms = document.getElementById('form3');
   

    forms.addEventListener('submit', async function (event) {
      event.preventDefault()

       const uname1 = document.getElementById('uname').value;
       const age1 = document.getElementById('age').value;
       var gender1 = 'male';
       const email1 = localStorage.email;
       const image1 = document.getElementById("myfile"); 
       if(document.getElementById('female').checked)
          gender1="female";
       if(document.getElementById('other').checked)
          gender1='other'; 
      
      let file = event.target.myfile.files[0]

      
       let formData = new FormData()
       formData.append('file', file)
       formData.append('uname',uname1);
       formData.append('age',age1);
       formData.append('gender',gender1);
       formData.append('email',email1);
       event.preventDefault()
      let responce = await fetch('http://localhost:5000/profile', {
      method: 'POST',
      body: formData
      }).then(response => response.json())
      .then(data => {
         console.log(data);
         if(data.success)
           {
             localStorage.setItem("userprofile","1");
             console.log("profile created");
             //alert('User Profile is Successfully created');
             window.location.assign('http://127.0.0.1:5500/src/home/home.html')
           }
         else
          console.log("user is already exist"); 
      })
      .catch((error) => {
        console.error('Error:', error);
      });
        // window.location.assign('http://127.0.0.1:5500/src/home/home.html')

 })
})


