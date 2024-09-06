let modified_headers;

function update_current_headers() {
  browser.storage.local.get((storage) => {
    modified_headers = storage;
  })
}

update_current_headers()

browser.runtime.onMessage.addListener((m) => {
  if (m === 'update headers') {
    update_current_headers();
  }
})

function apply_changes({ requestHeaders }) {
  for (const name in modified_headers) {
    const header = requestHeaders.find(i => i.name.toLowerCase() === name.toLowerCase())

    if (header) { // found in request headers
      const { action } = modified_headers[name]

      if (action === 'replace') {
        header.value = modified_headers[name].value;
      } else if (action === 'append') {
        header.value += modified_headers[name].value;
      } else if (action === 'remove') {
        requestHeaders = requestHeaders.filter(i => i.name.toLowerCase() !== name.toLowerCase());
      }

    } else { // not found in request headers
      console.log('not found')
    }

  }

  return {
    requestHeaders
  };
}

browser.webRequest.onBeforeSendHeaders.addListener(
  apply_changes,
  { urls: ['<all_urls>'] },
  ['blocking', 'requestHeaders']
)
