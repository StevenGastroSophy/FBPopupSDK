/**
 * 把 FB oauth api包得像 FB SDK一樣
 * @param {string} clientId - your FB client_id
 * @param {string} scope - a string of FB APP scope
 * @param {string} fields - a string of FB Graph api fields
 * @param {function} callback - function invoked when login success with userInfo as its parameter
 *
 * @example
 * const fbWeb = new FBWeb();
 * fbWeb.init('your client_id', 'public_profile,email', 'first_name,last_name,email');
 * const callback = (fbInfo) => {console.log(fbInfo.email);console.log(fbInfo.first_name);}
 * fbWeb.login(callback);
 */

class FBWeb {
  constructor() {
    this.clientId = '';
    this.scope = '';
    this.fields = '';
    this.setFBInfo = () => { };
    window.fbWeb = this;
  }

  init(clientId, scope, fields) {
    this.clientId = clientId;
    this.scope = scope;
    this.fields = fields;
  }

  _getWindowSizeString() {
    const w = "575";
    const h = "600";
    // When the user clicks on a link that opens a new window using window.open. Make the window appear on the same monitor as its' parent.

    // window.screenX will give the position of the current monitor screen.
    // suppose monitor width is 1360
    // for monitor 1 window.screenX = 0;
    // for monitor 2 window.screenX = 1360;
    const dualScreenLeft =
      window.screenLeft != undefined ? window.screenLeft : window.screenX;
    const dualScreenTop =
      window.screenTop != undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth
      ? window.innerWidth
      : document.documentElement.clientWidth
        ? document.documentElement.clientWidth
        : screen.width;
    const height = window.innerHeight
      ? window.innerHeight
      : document.documentElement.clientHeight
        ? document.documentElement.clientHeight
        : screen.height;

    // same monitor, the center of its parent.
    const left = width / 2 - w / 2 + dualScreenLeft;
    const top = height / 2 - h / 2 + dualScreenTop;

    return `width=${w}, height=${h}, top=${top}, left=${left}`;
  }

  login(callback) {
    const redirectUri = `YOUR_LOGIN_POPUP_LINK`;
    const responseType = 'token';
    const state = `YOUR_STATE_STRING`;
    const popupUrl = `https://www.facebook.com/v2.8/dialog/oauth?client_id=${this.clientId}&response_type=${responseType}&state=${state}&scope=${this.scope}&redirect_uri=${redirectUri}`;
    const newWindow = window.open(popupUrl, 'FB', this._getWindowSizeString());
    if (window.focus) newWindow.focus();
    this.setFBInfo = (fbInfo) => {
      if (typeof newWindow !== 'undefined') {
        callback(fbInfo);
        newWindow.close();
      }
    }
  }
}
