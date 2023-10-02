//validate.js  註冊
export const constraints = {
  "Email": {
    presence: 
    {
      message: "必填欄位"
    },
    email: {
      message: "格式有誤"
    }
  },
  "UserName":{
    presence: {
      message: "必填欄位"
    },
    format: {
      pattern: "[a-z0-9]+",
      flags: "i",
      message: "只能包含a-z和0-9"
    }
  },
  "Password":{
    presence: {
      message: "必填欄位"
    },
    length: {
    minimum: 6,
    message: "密碼長度需大於6"
  },
  },
  "ConfirmPassword":{
    presence: {
      message: "必填欄位"
    },
    length: {
    minimum: 6,
    message: "密碼長度需大於6"
  },
    equality: {
    attribute: "Password",
    message: "密碼不一致"
  }
},
  
};
//validate.js  登入
export const singinConstraints = {
  "email": {
    presence: 
    {
      message: "是必填欄位"
    },
    email: {
      message: "格式有誤"
    }
  },
  "password":{
    presence: {
      message: "是必填欄位"
    },
    length: {
    minimum: 6,
    message: "密碼長度需大於 6"
  },
  },
  
};