const container = document.getElementById('container');
const ref_node = document.getElementById('ref_node');

function add_item() {
  const temp_node = ref_node.cloneNode(true);
  temp_node.removeAttribute('hidden');
  temp_node.removeAttribute('id');

  container.appendChild(temp_node);
}

document.getElementById('add-item').addEventListener('click', add_item);
