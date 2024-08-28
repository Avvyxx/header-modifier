browser.webRequest.onBeforeSendHeaders.addListener((e) => console.log(e.requestHeaders), {urls: ['<all_urls>']}, ['requestHeaders'])
