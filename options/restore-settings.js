function retrieve_storage({ current_settings }) {
  for (const key in current_settings) {
    const node = add_item();

    const value_element = node.children.item(3);

    node.children.item(1).value = key;
    node.children.item(2).value = current_settings[key].action;
    value_element.value = current_settings[key].value;

    if (current_settings[key].action === 'remove') {
      value_element.setAttribute('hidden', '');
    }
  }
}

browser.storage.local.get('current_settings').then(retrieve_storage);
