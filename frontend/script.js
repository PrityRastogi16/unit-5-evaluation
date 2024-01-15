const formm = document.getElementById("form");
formm.addEventListener("submit",(e)=>{
    e.preventDefault();
})
const signupUser=()=>{
    fetch("https://fuzzy-boa-outerwear.cyclic.app,",{
        method:"POST",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({
            name:document.getElementById("lname").value,
            email:document.getElementById("lemail").value,
            gender:document.getElementById("lgen").value,
            password:document.getElementById("lpass").value,
            age:document.getElementById("lage").value,
            city:document.getElementById("lcity").value
        })
    }).then((res)=>res.json())
    .then((data)=>{
        console.log(data);
    }).catch((err)=>{
        console.log(err);
    })
}