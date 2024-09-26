function retrieve_storage({ current_settings }) {
  const arr = [];

  for (const key in current_settings) {
    const node = create_new_item()

    const value_element = node.children.item(3);

    node.children.item(1).value = key;
    node.children.item(2).value = current_settings[key].action;
    value_element.value = current_settings[key].value;

    if (current_settings[key].action === 'remove') {
      value_element.setAttribute('hidden', '');
    }

    arr.push(node);
  }

  container.replaceChildren(...arr);
}

function retrieve_saved({ saved_settings }) {
  for (const name in saved_settings) {
    saved_element.appendChild(create_option(name));
  }
}

browser.storage.local.get('current_settings').then(retrieve_storage);
browser.storage.local.get('saved_settings').then(retrieve_saved);
