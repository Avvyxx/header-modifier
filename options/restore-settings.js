function retrieve_storage({ current_settings }) {
  for (const key in current_settings) {
    const node = add_item();

    node.children.item(1).value = key;
    node.children.item(2).value = current_settings[key].action;
    node.children.item(3).value = current_settings[key].value;
  }
}

browser.storage.local.get('current_settings').then(retrieve_storage);
