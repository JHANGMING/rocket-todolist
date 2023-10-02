import {apiUsersSignUp,apiUsersSignIn} from "../js/api.js"; 
import {signinEmail,signinpassword,signupForm,email,name,password,conPassword,inputs,signininputs,signinForm,registerBtnHandler,messages,registerBtn,signInBtnHandler,landingpageBtn}  from "../js/domelement.js";
import {constraints,singinConstraints} from "../js/validate.js"; 
import {Toast} from "../js/SweetAlert2.js";
import {disabledBtn,loaded} from "../js/utilsFunction.js";

//註冊api
const signup=async(data,target)=>{
  try{
    disabledBtn(target) //按鈕打開
    const res=await apiUsersSignUp(data)
    registerBtnHandler()
    Swal.hideLoading();
    Swal.fire({
        icon: 'success',
        title: `恭喜！註冊成功`,
        text: '即將前往登入頁面',
        showConfirmButton: false,
        timer: 1500,
    });
    disabledBtn(target) //按鈕鎖住 1.5秒
  }catch(err){
    console.log(err)
    Swal.hideLoading();
    Swal.fire({
      icon: 'error',
      title: '哎唷！註冊失敗',
      text: `${err?.response.data.message}`,
      showConfirmButton: true,
  });
  }
}

//登入 api
const signin=async(data,target)=>{
  try{
    disabledBtn(target)  //按鈕打開
    const res=await apiUsersSignIn(data)
    const {token}=res.data
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    document.cookie = `token=${token}; expires=${tomorrow.toUTCString()}`
    Swal.hideLoading();
    Swal.fire({
        icon: 'success',
        title: `恭喜！登入成功`,
        text: '即將前往Todo頁面',
        showConfirmButton: false,
        timer: 2000,
    });
    disabledBtn(target) //按鈕鎖住 1.5秒
    setTimeout(()=>{
      location.href="./todo.html"
    },1000)
  }catch(err){
    Swal.hideLoading();
    Swal.fire({
      icon: 'error',
      title: '哎唷！登入失敗',
      text: `${err.message}`,
      showConfirmButton: true,
  });
  }
}

//註冊表單監聽
signupForm.addEventListener("submit",(e)=>{
  let target=e.target.lastElementChild.firstElementChild  //點擊到註冊鈕
  let dataObj={}
  e.preventDefault();
  if(!email.value.trim() || !name.value.trim() ||!password.value.trim()||!conPassword.value.trim()){
    Swal.fire(
        "表單認證失敗",  
        "您所輸入的資料不完整!檢查是否有空白處", 
        "warning" 
    );
  }else if(password.value.trim()!==conPassword.value.trim()){
    Swal.fire(
        "密碼認證失敗",  
        "您所輸入的密碼不一致，請重新輸入!", 
        "warning" 
    );
  }else{
    dataObj={
      email: email.value.trim(),
      password: password.value.trim(),
      nickname: name.value.trim()
    }
    signupForm.reset();
    signup(dataObj,target)
  }
}) 

//validate 註冊
inputs.forEach((input)=>{
  input.addEventListener("change", ()=>{
    if(input.getAttribute("class").includes("signin"))return
    input.previousElementSibling.textContent="";
    let errors =validate(signupForm,constraints) || {};
    if(errors){
      Object.keys(errors).forEach((item)=>{
        const error=errors[item].map((item)=>{
          let str=item.split(" ")
          return str[str.length-1]
        })
        document.querySelector(`.${item}`).textContent=error
      })
  }
  })
})

//登入表單監聽
signinForm.addEventListener("submit",(e)=>{
  let target=e.target.lastElementChild.firstElementChild //點擊到登入鈕
  let dataObj={}
  e.preventDefault();
  let errors =validate(signinForm,singinConstraints);
  if (errors) {
    showErrors(errors);
    Toast.fire({
      icon: 'warning',
      title: '您所輸入的資料不完整!'
      })
  } 
  else{
    dataObj={
      email: signinEmail.value.trim(),
      password: signinpassword.value.trim(),
    }
    signinForm.reset();
    signin(dataObj,target)
  }
}) 

//validate 登入
signininputs.forEach((signininput)=>{
  if(signininput.getAttribute("class").includes("signin")){
    signininput.addEventListener("change", ()=>{
      let targetName = signininput.name;
      signininput.nextElementSibling.textContent="";
      let errors =validate(signinForm,singinConstraints);
      if(errors){
        document.querySelector(`[data-msg='${targetName}']`).textContent =
            errors[targetName];
      }
    })
  }
})

//登入表單錯誤顯示
function showErrors(errors) {
  messages.forEach((item) => {
    item.textContent = "";
    item.textContent = errors[item.dataset.msg];
  });
}

registerBtn.addEventListener("click",signInBtnHandler)//登入轉註冊畫面監聽
landingpageBtn.addEventListener("click",registerBtnHandler)//註冊轉登入畫面監聽
window.addEventListener('load', loaded);//新增loading監聽



