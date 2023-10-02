
//登入頁面
export const signinEmail=document.querySelector(".signin-Email")
export const signinpassword=document.querySelector(".signin-password")
export const signinForm=document.querySelector(".signinForm")
export const signininputs = document.querySelectorAll("input[type=password],input[type=email]");
export const registerBtn=document.querySelector(".register-btn")
export const messages = document.querySelectorAll("[data-msg]");

//註冊頁面
export const signupForm=document.querySelector(".signupForm")
export const email=document.querySelector("#email")
export const name=document.querySelector("#name")
export const password=document.querySelector("#password")
export const conPassword=document.querySelector("#con-password")
export const inputs = document.querySelectorAll("input[type=text],input[type=password],input[type=email]");
export const logInMeau=document.querySelector(".logIn")
export const registerMeau=document.querySelector(".register")
export const landingpageBtn=document.querySelector(".landingpageBtn")

//todolist
export const todolist=document.querySelector(".todolist")
export const todoinput=document.querySelector(".todoinput")
export const addBtn=document.querySelector(".addBtn")
export const todoTitle=document.querySelector(".todoTitle")
export const deleteAllbtn=document.querySelector(".deleteAll")
export const noTask=document.querySelector(".noTask")
export const todoAllList=document.querySelector(".todoAllList")
export const todoName=document.querySelector(".todoName")
export const signoutBtn=document.querySelector(".signout-btn")
export const backBtn=document.querySelector(".backBtn")

//註冊成功轉登入畫面
export const registerBtnHandler=()=>{
  logInMeau.classList.remove("hidden")
  registerMeau.classList.add("hidden")
}

///登入轉註冊畫面
export const signInBtnHandler=()=>{
  logInMeau.classList.add("hidden")
  registerMeau.classList.remove("hidden")
}
