

export const dataURLtoFile = (dataUrl: string, fileName: string): File => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  console.log("6 dataUrl, fileName, arr, mime ", dataUrl, fileName, arr, mime)
  const bstr = window.atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  console.log("13 ", u8arr)
  return new File([u8arr], fileName, {type: mime})
}
