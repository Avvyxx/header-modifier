// temporary
browser.runtime.openOptionsPage();

let modified_headers;

function update_current_headers() {
  browser.storage.local.get('current_settings').then(({ current_settings }) => {
    modified_headers = current_settings
  })
}

update_current_headers()

browser.runtime.onMessage.addListener((m) => {
  if (m === 'update headers') {
    update_current_headers();
  }
})

function from_headers(requestHeaders) {
  const obj = {};

  for (const header of requestHeaders) {
    obj[header.name.toLowerCase()] = header.value;
  }

  return obj;
}

function to_headers(headers) {
  const arr = [];

  for (const name in headers) {
    arr.push({
      name,
      value: headers[name]
    });
  }

  return arr;
}

function apply_changes({ requestHeaders }) {
  const request_obj = from_headers(requestHeaders);

  for (const name in modified_headers) {
    const { action, value } = modified_headers[name];

    const header_exists = Object.hasOwn(request_obj, name);

    if (action === 'replace') {
      if (header_exists) {
        request_obj[name] = value;
      } else {
        console.log('Header cannot be replaced because it does not exist.');
      }
      request_obj[name] = value;
    } else if (action === 'append') {
      if (header_exists) {
        request_obj[name] += value;
      } else {
        console.log('Header cannot be appended to because it does not exist.');
      }
    } else if (action === 'remove') {
      delete request_obj[name]
    } else if (action === 'add') {
      request_obj[name] = value;
    } else {
      console.log('Action non existent.')
    }
  }

  return {
    requestHeaders: to_headers(request_obj)
  };
}

browser.webRequest.onBeforeSendHeaders.addListener(
  apply_changes,
  { urls: ['<all_urls>'] },
  ['blocking', 'requestHeaders']
)
