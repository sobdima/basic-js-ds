const { NotImplementedError } = require("../extensions/index.js");

// const { Node } = require('../extensions/list-tree.js');

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.nroot = null;
  }

  root() {
    return this.nroot ? { data: this.nroot.value } : null;
  }

  add(data) {
    const newNode = new Node(data);

    if (this.nroot === null) {
      this.nroot = newNode;
      return this;
    }

    let current = this.nroot;
    while (true) {
      if (data < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return this;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return this;
        }
        current = current.right;
      }
    }
  }

  has(data) {
    let current = this.nroot;

    while (current !== null) {
      if (data === current.value) return true;
      current = data < current.value ? current.left : current.right;
    }
    return false;
  }

  find(data) {
    let current = this.nroot;

    while (current !== null) {
      if (data === current.value) return { data: current.value };
      current = data < current.value ? current.left : current.right;
    }
    return null;
  }

  remove(data) {
    this.nroot = this.removeNode(this.nroot, data);
  }

  removeNode(node, value) {
    if (!node) return null;

    if (value < node.value) {
      node.left = this.removeNode(node.left, value);
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value);
    } else {
      if (!node.left) return node.right;
      if (!node.right) return node.left;

      node.value = this.findMinValue(node.right);
      node.right = this.removeNode(node.right, node.value);
    }
    return node;
  }

  findMinValue(node) {
    while (node.left !== null) {
      node = node.left;
    }
    return node.value;
  }

  min() {
    if (!this.nroot) return null;
    let current = this.nroot;
    while (current.left !== null) {
      current = current.left;
    }
    return current.value;
  }

  max() {
    if (!this.nroot) return null;
    let current = this.nroot;
    while (current.right !== null) {
      current = current.right;
    }
    return current.value;
  }
}

module.exports = {
  BinarySearchTree,
};
