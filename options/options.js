const container = document.getElementById('container');
const ref_node = document.getElementById('ref_node');

function add_item() {
  const temp_node = ref_node.cloneNode(true);
  temp_node.removeAttribute('hidden');
  temp_node.removeAttribute('id');

  temp_node.children.item(0).onclick = remove_item;

  container.appendChild(temp_node);

  return temp_node;
}

function remove_item(e) {
  e.target.parentElement.remove();

  browser.storage.local.remove(e.target.nextElementSibling.value);

  browser.runtime.sendMessage('update headers');
}

function update_storage() {
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

document.getElementById('add-item').addEventListener('click', add_item);
document.getElementById('update-storage').addEventListener('click', update_storage);
