const container = document.getElementById('container');
const ref_node = document.getElementById('ref_node');

let count = 0;

function add_item() {
  const temp_node = ref_node.cloneNode(true);
  temp_node.removeAttribute('hidden');
  temp_node.removeAttribute('id');

  const datalist_id = 'datalist-' + count;

  temp_node.children.item(0).onclick = remove_item;

  const name_element = temp_node.children.item(1);
  const value_element = temp_node.children.item(3);
  const datalist_element = temp_node.children.item(4);

  // this probably isnt the best way to achieve this
  value_element.onclick = () => {
    browser.storage.local.get('possible_values').then(({ possible_values }) => {
      const v = [
        ...possible_values.default[name_element.value],
        ...possible_values.user[name_element.value]
      ];

      datalist_element.replaceChildren(...v.map(i => create_option(i)));
    });
  };

  value_element.setAttribute('list', datalist_id);
  datalist_element.id = datalist_id;

  container.appendChild(temp_node);

  count += 1;

  return temp_node;
}

function create_option(value) {
  const option_element = document.createElement('option');

  option_element.value = value;

  return option_element
}

function remove_item(e) {
  browser.runtime.sendMessage('update headers');

  e.target.parentElement.remove();

  update_storage();
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
