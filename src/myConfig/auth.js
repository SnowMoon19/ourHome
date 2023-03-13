import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const UserIdKey = 'Admin-UserId'
const UserNameKey = 'Admin-UserName'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  console.log(Cookies.get(UserIdKey));
  return Cookies.get(UserIdKey)
}

export function setUserId(userId) {
  return Cookies.set(UserIdKey, userId)
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}


// /**
//  *  用户名信息保存到Cookie中，防止刷新消失
//  */
export function setUserName(userName) {
  return Cookies.set(UserNameKey, userName)
}

export function getUserName() {
  return Cookies.get(UserNameKey)
}

export function removeUserName() {
  return Cookies.remove(UserNameKey)
}
//
// /**
//  *  id信息保存到Cookie中
//  */
// export function setId(id) {
//   return Cookies.set(IdKey, id)
// }
//
// export function getId() {
//   return Cookies.get(IdKey)
// }
//
// export function removeId() {
//   return Cookies.remove(IdKey)
// }
//
// /**
//  *  名称信
//  */
// export function setName(name) {
//   return Cookies.set(NameKey, name)
// }
//
// export function getName() {
//   return Cookies.get(NameKey)
// }
//
// export function removeName() {
//   return Cookies.remove(NameKey)
// }
//
// /**
//  *  另一半的id信息保存到Cookie中
//  */
// export function setAnotherId(id) {
//   return Cookies.set(AnotherIdKey, id)
// }
//
// export function getAnotherId() {
//   return Cookies.get(AnotherIdKey)
// }
//
// export function removeAnotherId() {
//   return Cookies.remove(AnotherIdKey)
// }
//
// /**
//  *  另一半的用户名信息
//  */
// export function setAnotherUsername(username) {
//   return Cookies.set(AnotherUsernameKey, username)
// }
//
// export function getAnotherUsername() {
//   return Cookies.get(AnotherUsernameKey)
// }
//
// export function removeAnotherUsername() {
//   return Cookies.remove(AnotherUsernameKey)
// }
