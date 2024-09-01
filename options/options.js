const container = document.getElementById('container');
const ref_node = document.getElementById('ref_node');

function add_item() {
  const temp_node = ref_node.cloneNode(true);
  temp_node.removeAttribute('hidden');
  temp_node.removeAttribute('id');

  temp_node.children.item(0).onclick = remove_item;

  container.appendChild(temp_node);
}

function remove_item(e) {
  e.target.parentElement.remove();
}
document.getElementById('add-item').addEventListener('click', add_item);
