const container = document.getElementById('container');
const ref_node = document.getElementById('ref_node');

let count = 0;

function create_new_item() {
  const temp_node = ref_node.cloneNode(true);
  temp_node.removeAttribute('hidden');
  temp_node.removeAttribute('id');

  const datalist_id = 'datalist-' + count;

  temp_node.children.item(0).onclick = remove_item;

  const name_element = temp_node.children.item(1);
  const action_element = temp_node.children.item(2);
  const value_element = temp_node.children.item(3);
  const datalist_element = temp_node.children.item(4);

  action_element.onchange = () => {
    if (action_element.value === 'remove') {
      value_element.setAttribute('hidden', '');
    } else {
      value_element.removeAttribute('hidden');
    }
  }

  // this probably isnt the best way to achieve this
  // value_element.onclick = () => {
  //   browser.storage.local.get('possible_values').then(({ possible_values }) => {
  //     const v = [
  //       ...possible_values.default[name_element.value],
  //       ...possible_values.user[name_element.value]
  //     ];

  //     datalist_element.replaceChildren(...v.map(i => create_option(i)));
  //   });
  // };

  value_element.setAttribute('list', datalist_id);
  datalist_element.id = datalist_id;

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

  update_current_settings();
}
