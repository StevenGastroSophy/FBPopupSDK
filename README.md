# FBPopupSDK
Facebook login with a popup window

把 FB Oauth API 用一個彈出視窗包起來，解決官方 SDK彈出視窗會被 Firefox阻擋的問題

----
## Sample Code
CodeSandbox:
[Login](https://codesandbox.io/s/fblogin-g7tfb) and
[Popup](https://codesandbox.io/s/fbpopup-vflz7)

## Before you get started

### 需要準備:

* 一個彈出視窗的**頁面**: 作為 Oauth API的 **redirect_uri**，登入成功後會使用 **access_token**透過 [Graph API](https://developers.facebook.com/docs/graph-api)來取得資料。
* 一段開啟彈出視窗的 **JS**: 負責開啟彈出視窗，將接收 **fbInfo**的 function綁到 window上讓**彈出視窗來呼叫**。
* 一個登入**頁面**: 在這裡執行**開啟彈出視窗的 JS**。

### 如何準備:

* 一個彈出視窗的**頁面**: 可以參考 **PopupDemo.html**。
* 一段開啟彈出視窗的 **JS**: 修改 **FBWebSDK.js** 裡的 `YOUR_LOGIN_POPUP_LINK`和 `YOUR_STATE_STRING`就可以直接使用了。
* 一個登入**頁面**: 可以參考 **LoginDemo.html**。

## fbInfo

fbInfo是一個包含回傳資料的 object，由**彈出視窗**產生後傳回**主視窗**。
fbInfo的內容會依據呼叫時傳入的 scope及 fields而定，詳細內容可以參考官方文件:

[Graph API Reference](https://developers.facebook.com/docs/graph-api/reference)

[Using Graph API](https://developers.facebook.com/docs/graph-api/using-graph-api)
