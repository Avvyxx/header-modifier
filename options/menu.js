const saved_element = document.getElementById('saved');
const save_name_element = document.getElementById('saved-name');

function add_item() {
  container.appendChild(create_new_item());
}

function send_update_headers() {
  browser.runtime.sendMessage('update headers');
}

function get_current_items() {
  const headers = {};

  for (let i = 0; i < container.children.length; i++) {
    const item = container.children.item(i);
    const header_input = item.children.item(1);

    if (header_input.value) {
      headers[header_input.value] = {
        action: item.children.item(2).value,
        value: item.children.item(3).value
      };
    }
  }

  return headers;
}

function update_current_settings() {
  const current_settings = get_current_items();

  browser.storage.local.set({ current_settings }).then(send_update_headers);
}

function save_settings() {
  const name = save_name_element.value;

  if (name) {
    browser.storage.local.get('saved_settings').then(({ saved_settings }) => {
      if (!saved_settings) {
        saved_settings = {};
      }

      saved_settings[name] = get_current_items();

      browser.storage.local.set({ saved_settings }).then(send_update_headers);
    });
  } else {
    console.log('no name provided');
  }
}

function load_saved_settings() {
  browser.storage.local.get('saved_settings').then(({ saved_settings }) => {
    const current_settings = saved_settings[saved_element.value];

    browser.storage.local.set({ current_settings }).then(() => {
      retrieve_storage({ current_settings });

      save_name_element.value = saved_element.value;

      send_update_headers();
    });
  });
}

document.getElementById('add-item').addEventListener('click', add_item);
document.getElementById('update-storage').addEventListener('click', update_current_settings);
document.getElementById('save').addEventListener('click', save_settings);
saved_element.addEventListener('change', load_saved_settings);
