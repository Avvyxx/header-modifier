function retrieve_storage(storage) {
  for (const key in storage) {
    const node = add_item();

    node.children.item(1).value = key;
    node.children.item(2).value = storage[key].action;
    node.children.item(3).value = storage[key].value;
  }
}

browser.storage.local.get().then(retrieve_storage);
