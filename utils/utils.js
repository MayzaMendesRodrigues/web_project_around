import {api} from "../utils/api.js";

export function handleProfileSubmit(inputValues, userInfo) {
    api.setUserInfo({
      name: inputValues.first,
      about: inputValues.second,
    }).then((user)=> {
      const {name , about, avatar} = user;
      userInfo.setUserInfo({name, about, avatar});
      console.log(`User info updated: ${name}, ${about}, ${avatar}`);
    })
  };

export function setEditProfileDefaultValues(inputFirst, inputLast, userInfo){
  const currentUserInfo = userInfo.getUserInfo()
  inputFirst.value = currentUserInfo.name;
  inputLast.value = currentUserInfo.about
}
