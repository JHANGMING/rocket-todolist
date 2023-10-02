import {apiUsersCheckout,apiUsersSignOut,apiPostTodos,apiGetTodos,apiPatchTodos,apiDeleteTodos,apiPutTodos,todoBase} from "../js/api.js"; 
import {Toast} from "../js/SweetAlert2.js";
import {debounce,checkboxDisabled,loaded} from "../js/utilsFunction.js";
import {todolist,todoinput,addBtn,todoTitle,deleteAllbtn,noTask,todoAllList,todoName,signoutBtn,backBtn}  from "../js/domelement.js";
let data=[];//todo資料暫存區
let editData=[];//新增編輯資料暫存區
let todostatus="all"; //todo頁面nav狀態預設 "all"

//api function---------------------

//checkout api
const checkout=async(headers)=>{
    try{
      const res=await apiUsersCheckout(headers)
      todoName.textContent=res.data.nickname
      Toast.fire({
      icon: 'success',
      title: `Welcome!!  ${res.data.nickname}`
      })
    }catch(err){
      Swal.fire({
        icon: 'error',
        title: '哎唷！登入失敗',
        text: `${err.message}`,
        showConfirmButton: true,
    });
  }
};

//登出 api
const signOut=debounce(async()=>{
    try{
      const res = await apiUsersSignOut()
      console.log(res)
      document.cookie = "token=; expires=;";
      setTimeout(()=>{
        location.href="./index.html"
      },1000)
      Swal.hideLoading();
      Swal.fire({
        icon: 'success',
        title: "您已登出",
        text: "為您導回登入頁面...",
        showConfirmButton: false,
        timer: 2000,
    });
    }catch(err){
      Swal.fire({
        icon: 'error',
        title: '登出失敗，請再檢查看看',
        text: `${err.message}`,
        showConfirmButton: true,
    });
  }
});

//取得項目 api
const getTodo=async()=>{
    try{
      const res=await apiGetTodos()
      data=res.data.data
      uptodoList()
    }catch(err){
      Toast.fire({
        icon: 'error',
        title: `${err.message}!`
      })
  }
};

//新增項目 api
const addTodo=debounce(async(data)=>{
    try{
      const res=await apiPostTodos(data)
      getTodo()
      Toast.fire({
        icon: 'success',
        title: `加入代辦事項:${res.data.newTodo.content} 成功！`
      })
    }catch(err){
      console.log(err)
      Toast.fire({
        icon: 'error',
        title: `${err.message}!`
      })
  }
});

//切換狀態 api
const toggleTodo=debounce(async(id)=>{
    try{
      const res=await apiPatchTodos(id)
      getTodo()
      Toast.fire({
          icon: 'success',
          title: `${res.data.message}!!`
        })
    }catch(err){
      Toast.fire({
        icon: 'error',
        title: `${err.message}!`
      })
  }
});

//刪除個別項目 api
const deleteTodos=debounce(async(id)=>{
    try{
      const res=await apiDeleteTodos(id)
      getTodo()
      Toast.fire({
        icon: 'success',
        title: `刪除代辦事項成功！`
      })
    }catch(err){
      Toast.fire({
        icon: 'error',
        title: `${err.message}!`
      })
  }
});

//刪除已完成項目 api
const deleteAllTodos=debounce((data)=>{
    data.map(async(item)=>{
      try{
      const res=await apiDeleteTodos(item.id)
      Toast.fire({
        icon: 'success',
        title: `刪除代辦事項成功！`
      })
    }catch(err){
      Toast.fire({
        icon: 'error',
        title: `${err.message}!`
      })
      }
    })
    getTodo()
});

//修改已完成項目 api
const putTodos=debounce(async(id, data)=>{
    try{
      const res=await apiPutTodos(id, data)
      getTodo()
      Toast.fire({
          icon: 'success',
          title: '更新個別項目成功！'
        })
    }catch(err){
      Toast.fire({
        icon: 'error',
        title: `${err.message}!`
      })
  }
});

//api function---------------------end

//初始化事件
init()
function init(){
  //讀取cookie
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith("token="))
    ?.split("=")[1];
  if(!cookieValue){
    setTimeout(()=>{
      location.href="./index.html"
    },1500)
    Swal.fire({
          title: "驗證失敗，請先登入",
          text: "稍後導至登入頁",
          icon: "error",
          showConfirmButton: false,
          timer: 1500,
        });
  }else{
    //預設axios的表頭
    todoBase.defaults.headers.common["Authorization"] = cookieValue;
    checkout({headers: { Authorization: cookieValue }})
    getTodo()
  }
};

//新增項目事件
function addBtnHandler(e){
  let value=todoinput.value
  if(!value)return
  addTodo({content:value.trim()})
  todoinput.value = "";
};

//渲染畫面事件
function render(data) {
  //判斷待完成或已完成沒有事項時，顯示文字
  if(data.length===0){
    todolist.innerHTML=`<li class="px-8 mb-4 text-list-tenth/[.8] text-m font-bold text-center">No task for here!!!</li>`
  }else{
    const html = data.map((item, index) => {
      const isEditing = editData.length > 0 && editData[0].id === item.id;
      if (isEditing) {
        return `
          <li class=" text-list-tenth/[.8] px-8 mb-4">
            <div class="flex justify-between items-center border-b-2 border-list-eleventh/[.3] w-full pb-4">
              <input type="text" class="editinput py-1 pl-5 rounded text-m text-black bg-white/[.95]" value="${editData[0].value}">
              <div class="flex">
                <i class="check fa-solid fa-check text-xl mr-5 hover:scale-110 cursor-pointer" data-id=${item.id}></i>
                <i class="cancel fa-solid fa-xmark text-xl hover:scale-110 cursor-pointer" data-id=${item.id}></i>
              </div>
            </div>
          </li>
        `;
      } else {
        return `
          <li class=" px-8 mb-4">
            <div class="flex justify-between items-center border-b-2 border-list-eleventh/[.3] w-full pb-4">
              <label for=item${index} data-index=${item.id} class="w-[20px] flex text-m flex-1 cursor-pointer">
                <input type="checkbox" data-index=${item.id} id=item${index} class="custom-checkbox mr-5 cursor-pointer" ${item.status === true ? "checked" : ""}>
                <span class="context px-6" ${item.status === true ? 'style="color: rgba(70,34,9,.4)"' : 'style="color: rgba(70,34,9,.8)"'}>${item.content}</span>
              </label>
              <div class="flex text-list-tenth/[.8]">
                <i class="editBtn fa-solid fa-pencil text-xl mr-4 hover:scale-110 cursor-pointer" data-id=${item.id}></i>
                <i class="deleteBtn fa-regular fa-trash-can text-xl hover:scale-110 cursor-pointer" data-id=${item.id}></i>
              </div>
            </div>
          </li>
        `;
      }
    }).join("");
    todolist.innerHTML = html;
  }
};

//todoForm頁面事件 1.切換checkbox狀態 2.刪除 3.編輯
function todoFormHandler(e){
  if(e.target.className.includes("checkbox")||e.target.matches('label')){ //切換checkbox狀態
    toggleTodo(e.target.dataset.index)
    checkboxDisabled()//防止一直連續按切換狀態
  }else if(e.target.className.includes("deleteBtn")){ //刪除
    deleteTodos(e.target.dataset.id)
  }else if(e.target.className.includes("editBtn")){  //編輯
    let value=e.target.parentElement.previousElementSibling.lastElementChild.textContent
    let id=e.target.dataset.id
    editData.push({value,id})
    render(editData)
    uptodoList()
    edit(id)
  }
};

//編輯todo事件
function edit(id){
  const editinput=document.querySelector(".editinput")
  const check=document.querySelector(".check")
  const cancel=document.querySelector(".cancel")
  check.addEventListener("click",()=>{
    putTodos(id,{content:editinput.value})
    editData = [];
  })
  cancel.addEventListener("click",()=>{
    editData = [];
    uptodoList();
  })
};

//todo表單nav頁面切換事件
function toggleHandler(e){
  if (!e.target.matches('li')) return;
  todostatus=e.target.dataset.status
  const li=document.querySelectorAll(".todoTitle li")
  li.forEach((item)=>{
    item.classList.remove("active")
  })
  e.target.classList.add("active")
  uptodoList()
}

//更新畫面事件
function uptodoList(){
  if(data.length===0){
    noTask.classList.remove("hidden")
    todoAllList.classList.add("hidden")
  }else{
    noTask.classList.add("hidden")
    todoAllList.classList.remove("hidden")
    upNewData()
    document.querySelector(".todoNum").textContent=data.filter((item)=>item.status===false).length;
  }
}

//更新資料事件
function upNewData(){
  const newdata=data.filter((item)=>{
      if(todostatus==="isCompleted"){
        return !item.status
      }else if(todostatus==="completed"){
        return item.status
      }else{
        return item
      }
    })
  render(newdata)
}


//刪除已完成事件
function deleteAllbtnHandler(){
  data=data.filter((item)=>item.status)
  deleteAllTodos(data)
};

//新增鍵盤enter點擊事件
function keyHandler(e){
  if(e.keyCode===13){
    addBtnHandler()
  }
}

//回到首頁
function transformToindex(e){
    e.preventDefault()
    Swal.fire({
      icon: 'warning',
      title: '確定要先回首頁看看嗎？',
      showCancelButton: true,
      confirmButtonText: 'YES',
  }).then((result) => {
  if (result.isConfirmed) {
    setTimeout(()=>{
      location.href="./index.html"
    },1000) 
  } 
  })
}

addBtn.addEventListener("click",addBtnHandler); //新增按鈕監聽
todolist.addEventListener("click",todoFormHandler); //todoForm監聽
todoTitle.addEventListener("click",toggleHandler); //todo表單nav頁面切換監聽
deleteAllbtn.addEventListener("click",deleteAllbtnHandler); //刪除已完成監聽
todoinput.addEventListener("keydown",keyHandler); //鍵盤enter點擊事件監聽
backBtn.addEventListener("click",transformToindex);//返回首頁監聽
signoutBtn.addEventListener("click",signOut);//登出監聽
window.addEventListener('load', loaded);//新增loading監聽
