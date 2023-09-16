var addBtn=document.querySelector("#add-btn");
var modal=document.querySelector(".modal");
var closeBtn=document.querySelector(".close-icon");
// var allInput=registerForm.querySelectorAll("input");

var subBtn=document.querySelector("#sub-btn");
/* globle varriable */
var userData=[];
//var profile_pic=document.querySelector("#profile-pic");
//var uploadPic=document.querySelector("#update-button");
var profile_pic=document.querySelector("#profile-pic");
var uploadPic=document.querySelector("#upload-file");
var Name=document.querySelector("#name");
var phoneno=document.querySelector("#num");
var Email=document.querySelector("#email");
var updtBtn=document.querySelector("#updt-btn");
var password=document.querySelector("#passid");
var registerForm=document.querySelector("#register-from");
var imgUrl;
addBtn.onclick=function(){
    modal.classList.add("active");
}
closeBtn.addEventListener("click",()=>{
    modal.classList.remove("active");
//var i;
/*
for(i=0;i<allInput.length;i++){
    allInput[i].value="";
} */
})

subBtn.onclick=function(e){
    e.preventDefault();
    submition();
    getDataFromLocal();
    registerForm.reset('');
    closeBtn.click();
}



if(localStorage.getItem("userData")!=null){
    userData=JSON.parse(localStorage.getItem("userData"));
}

/* subbtn*/
function submition(){
userData.push({
    name:Name.value,
    num:phoneno.value,
    email:Email.value,
    passid:password.value,
    profilepic:imgUrl==undefined ? "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIIAAACCCAMAAAC93eDPAAAAMFBMVEXk5ueutLfp6+yrsbSxt7rh4+S+wsXS1dfW2drP0tS6v8LLz9HEyMrd4OG0ur3IzM7YRWk6AAAC3klEQVR4nO2ay5akIAxAISAiCv7/3w52PY7l2JBQCTML7rI33g4QklBKDQaDwWAwGAwGg8GgK6DivG7OuW31EaD/9yfvtDYvtN1jb4Xd5u+eMSbNXQUu339aWN9pOcDfCvxIuKmLwv6bwCMQ8gLgCgaHxCK+GKls0MEh1AyywyrpAFvdIDsI7gdYMAYZuXMRkQY6SS0FJKRB3pJCCjM2CHJLgQ5CDsMmshTYvfhA5OIkBCGHYRcw8BSDDP9K4LLSKQz8+QloBnlDsiug09KLxK5AOw9HGNgViFtBYjMEooFA3UDKCj8K7AmSaqC141agboWswGzQoBCGghbYC5aswH4i6HmBvZZ3ZAXuRhtKneS9Anv56KkKltuAfiTYMxOhiXgg0UpQuggtUS4oNdEMgkAjUZttXBREumtS9SjT2FLCIDVimNAKhv9EPoAV68CfGd8O1VnX00BqvKCwB9OwVwpnML2t4e+jPkDkSCs8BIbajWkEbsgr0ZYkDHvResdUmMCKDFduyPnhXsLY2Ot9CG7fREyauz5QTWvSJ4tsFDq8RHwCKi7u/f9vvtsSXDSyR2aCf/BEqI6PTjH6J9lDdfQ4vu1Xl5LVr4fKIyXaFPY5TkrcA5TfQzL3hzL/2YZtlrSAuIZfvv4hkjenyKLk71uNLFmy5ubZg+Ed9vvvWCycNyasyHLp08JuTJEAtdACcA7FxpKx5uLlXJPQ+7eRgIh4Gy1LfPmKTR9s3El801TEll1442Bab3GgPgUVJNqKKZZFeDu0lJS0Xr7u0NBc8Brohvbi27P4N4bmwLwKTyhNDutOPIHfD0AcrqHBt9xRRkDjBw/YQUaTA04BPc5pATeOlDRAPRFQX+ipIE4FfrLXRv3WlA4CJgz0ZzAi1cGsVFY6KVTyk8zlcHGoKMgb1FaC/HORFoVyFUf+uUgL5Ypa/EgelI8lf7F0Q/muCtrKU36tgC4UozAYDAaD/4U//rMgRSTDXgQAAAAASUVORK5CYII=" 
    :imgUrl
}); 
var userString=JSON.stringify(userData);
localStorage.setItem("userData",userString); 
setTimeout(() => { document.location.reload(); }, 1000);
Swal.fire(
    'Good job!',    
    'Your submisson of data done!',
    'success'
  )
  
}
/* taking data in fiels*/

var tableData=document.querySelector("#table-data")
const getDataFromLocal=()=>{
   //tableData.innerHTML="";
    userData.forEach((data,index)=>{
        tableData.innerHTML += `
        <tr index='${index} '  >
        <td>${index+1}</td>
        <td><img  src="${data.profilepic}" width"100" height="40"></td>
        <td>${data.name}</td>
        <td>${data.email}</td>
        <td>${data.num}</td>
        <td>${data.passid} </td>
       <td>
       <button class="dlt-btn"> <i class="fa fa-trash"></i></button>
       <button class="edit-btn"> <i class="fa fa-edit"></i></button> 
      </td>
    </tr> 
    `;
    }) 
    /*dlt btn*/
    var i;
    var allDelbtn=document.querySelectorAll(".dlt-btn")
for(i=0;i<allDelbtn.length;i++){
    allDelbtn[i].onclick=function(){
        var tr=this.parentElement.parentElement;
        var id=tr.getAttribute("index");
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                userData.splice(id,1);
        localStorage.setItem("userData",JSON.stringify(userData));
        tr.remove();
        setTimeout(() => { document.location.reload(); }, 1000);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        } 
    }
}

getDataFromLocal();
var i;
/* update button */
var allEdit=document.querySelectorAll(".edit-btn")
for(i=0;i<allEdit.length;i++){
    allEdit[i].onclick=function(){
        var tr=this.parentElement.parentElement;
        var td=tr.getElementsByTagName("TD");
         var index=tr.getAttribute("index");
         var imgTag=td[1].getElementsByTagName("IMG");
         var profilePic=imgTag[0].src;
        var name=td[2].innerHTML;
        var email=td[3].innerHTML;
        var num=td[4].innerHTML;
        var passid=td[5].innerHTML;
        addBtn.click();
        subBtn.disabled=true;
        updtBtn.disabled=false;
        Name.value=name;
        Email.value=email;
        phoneno.value=num;
        password.value=passid;
       profile_pic.src=profilePic;
       updtBtn.onclick=function(){
        e.preventDefault();
        userData[index]={
            name:Name.value,
            num:phoneno.value,
            email:Email.value,
            passid:password.value,
            profilepic:uploadPic.value=='' ?  profile_pic.src
            :imgUrl 
        }
        localStorage.setItem("userData",JSON.stringify(userData));
       
    }
}
}

    



uploadPic.onchange=function(){
if(uploadPic.files[0].size<1000000){
var freader=new FileReader();
freader.onload=function(e){
     imgUrl=e.target.result;
    profile_pic.src=imgUrl;
}
freader.readAsDataURL(uploadPic.files[0]);
}
else{
    alert("file size too long");
}
}

// searching

var search=document.querySelector("#emid");
search.onInput=function(){
    searchFuc()
}
function searchFuc(){
    var tr=tableData.querySelectorAll("TR");
    var filter=search.value.toLowerCase();
    var i;
    for(i=0;i<tr.length;i++){
        var em=tr[i].getElementsByTagName("TD")[3];
var id=em.innerHTML;
if(id.toLowerCase().indexOf(filter)>-1){
   tr[i].style.display="";
}else{
    tr[i].style.display="none";
}
    }
   // localStorage.setItem("userData",JSON.stringify(userData));
}
// clear all data

var delAllBtn=document.querySelector("#clear-all");
delAllBtn.addEventListener('click',()=>{
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("userData");
            window.location=location.href;
            userData.splice(id,1);
    localStorage.setItem("userData",JSON.stringify(userData));
    tr.remove();
    setTimeout(() => { document.location.reload(); }, 1000);
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })
    
})