let modified_headers;

browser.storage.local.get((storage) => {
  modified_headers = storage;
});

function apply_changes(e) {
  for (const name in modified_headers) {
    const header = e.requestHeaders.find(i => i.name.toLowerCase() === name.toLowerCase())

    if (header) { // found in request headers
      const { action } = modified_headers[name]

      if (action === 'replace') {
        header.value = modified_headers[name].value;
      } else if (action === 'append') {
        header.value += modified_headers[name].value;
      } else if (action === 'remove') {
        e.requestHeaders = e.requestHeaders.filter(i => i.name !== name);
      }

    } else { // not found in request headers

    }

  }

  return {
    requestHeaders: e.requestHeaders
  };
}

browser.webRequest.onBeforeSendHeaders.addListener(
  apply_changes,
  { urls: ['<all_urls>'] },
  ['blocking', 'requestHeaders']
)
