function update_current_settings() {
  browser.runtime.sendMessage('update headers');

  const current_settings = {};

  for (let i = 1; i < container.children.length; i++) {
    const item = container.children.item(i);
    const header_input = item.children.item(1);

    if (header_input.value) {
      current_settings[header_input.value] = {
        action: item.children.item(2).value,
        value: item.children.item(3).value
      }
    }
  }

  browser.storage.local.set({ current_settings });
}

function save_settings() {
  const name = document.getElementById('saved-name').value;

  if (name) {
    browser.storage.local.get(['saved_settings', 'current_settings']).then(({ saved_settings, current_settings }) => {
      if (!saved_settings) {
        saved_settings = {};
      }

      saved_settings[name] = current_settings;

      browser.storage.local.set({ saved_settings })
    });
  } else {
    console.log('no name provided');
  }
}

document.getElementById('update-storage').addEventListener('click', update_current_settings);
document.getElementById('save').addEventListener('click', save_settings);
