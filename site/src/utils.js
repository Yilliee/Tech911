// Courtesy of https://stackoverflow.com/a/40831598
function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || 'image/jpeg';
    sliceSize = sliceSize || 512;
  
    var byteCharacters = atob(b64Data);
    var byteArrays = [];
  
    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);
  
      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
  
      var byteArray = new Uint8Array(byteNumbers);
  
      byteArrays.push(byteArray);
    }
      
    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
}

function getPictureURLFromBase64(profilePicBase64) {
  var blob = b64toBlob(profilePicBase64, 'image/jpeg');
  var blobUrl = URL.createObjectURL(blob);
  return blobUrl;
}

function StoreUserDetails(username, displayName, accountType, profilePicBase64) {

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('displayName', displayName);
    sessionStorage.setItem('accountType', accountType);
    sessionStorage.setItem('profilePicBase64', profilePicBase64);
}

function clearUserDetails() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('displayName');
    sessionStorage.removeItem('accountType');
    sessionStorage.removeItem('profilePicBase64');
}

function getUsername() {
    const res = sessionStorage.getItem('username') || null;
    
    return (res != 'null') ? res : null;
}
function getDisplayName() {
    const res = sessionStorage.getItem('displayName') || null;

    return (res != 'null') ? res : null;
}
function getAccountType() {
    const res = sessionStorage.getItem('accountType') || null;

    return (res != 'null') ? res : null;
}
function getProfilePicBase64() {
    const res = sessionStorage.getItem('profilePicBase64') || null;

    return (res != 'null') ? res : null;
}
function getUserDetails() {
    return {
        username: getUsername(),
        displayName: getDisplayName(),
        accountType: getAccountType(),
        profilePicBase64: getProfilePicBase64(),
    };
}


export { b64toBlob, getPictureURLFromBase64, StoreUserDetails, clearUserDetails,
         getUserDetails, getUsername, getDisplayName, getAccountType, getProfilePicBase64};
