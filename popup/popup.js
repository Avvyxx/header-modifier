const body = document.getElementById('body');

body.addEventListener('click', e => {
  console.log('hello world')
})

document.getElementById('test').addEventListener('click', () => {
  browser.runtime.openOptionsPage();
})
