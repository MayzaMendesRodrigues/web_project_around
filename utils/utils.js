
export function handleProfileSubmit(inputValues, userInfo) {
    userInfo.setUserInfo({
      name: inputValues.first,
      about: inputValues.second,
    });
  };

export function setEditProfileDefaultValues(inputFirst, inputLast, userInfo){
  const currentUserInfo = userInfo.getUserInfo()
  inputFirst.value = currentUserInfo.name;
  inputLast.value = currentUserInfo.about
}
