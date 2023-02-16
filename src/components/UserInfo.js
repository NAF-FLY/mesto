export class UserInfo {
  constructor({ profileName, profileActivities, profileAvatar }) {
    this._name = document.querySelector(profileName);
    this._activities = document.querySelector(profileActivities);
    this._avatar = document.querySelector(profileAvatar);
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._activities.textContent,
      avatar: this._avatar.src,
    };
  }
  getUserId() {
    return this._userId;
  }

  setUserInfo(userData) {
    this._name.textContent = userData.name;
    this._activities.textContent = userData.about;
    this._avatar.src = userData.avatar;
    this._userId = userData._id;
  }
  // setUserAvatar(img) {
  //   this._avatar.src = img.avatar;
  // }
}
