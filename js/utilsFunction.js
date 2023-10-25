//防抖機制
export function debounce(callback,time=500){
	let timer;
	return (...args)=>{
		clearTimeout(timer)
		timer=setTimeout(()=>{
			callback(...args)
		},time)
	}
}

//按鈕disabled
export function disabledBtn(target){
  if (target.disabled) {
   setTimeout(()=>{
      target.disabled=false
    },1500)
} else {
    target.disabled=true

  }
}

//防止一直連續按切換狀態
export function checkboxDisabled(){
  const checkboxs=document.querySelectorAll("input[type=checkbox]")
    checkboxs.forEach((checkbox) => {
      checkbox.disabled = true;
    });
};

//loading
export function loaded() { //新增loading
    //完成畫面後，隱藏
    setTimeout(()=>{
      document.body.classList.add('loaded');
    },700)
}