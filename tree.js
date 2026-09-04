import { Node } from "./node.js";

export class Tree {
  constructor() {
    this.root = null;
  }

  printValue(value) {
    console.log(value);
  }

  rebalance() {
    const isBalanced = this.isBalanced();
    if (isBalanced) {
      return "the tree is already balance";
    } else {
      const result = [];
      function traverse(node) {
        if (node === null) {
          return;
        }

        traverse(node.left);
        result.push(node.value);
        traverse(node.right);
      }
      traverse(this.root);
      this.root = this.buildTree(result);
    }
  }

  isBalanced() {
    function checkBalance(node) {
      if (node === null) {
        return true;
      }

      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        return false;
      }

      return checkBalance(node.left) && checkBalance(node.right);
    }

    function getHeight(node) {
      if (node === null) {
        return -1;
      }

      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }

    return checkBalance(this.root);
  }

  depth(value) {
    let current = this.root;
    let count = 0;

    while (current !== null) {
      if (value === current) {
        break;
      }
      if (value < current.value) {
        current = current.left;
        count++;
      } else {
        current = current.right;
        count++;
      }
    }

    if (current === null) {
      return undefined;
    }

    return count;
  }

  height(value) {
    // 1. Find the node
    let current = this.root;

    while (current !== null) {
      if (value === current.value) {
        break;
      }

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    // Value wasn't found
    if (current === null) {
      return undefined;
    }

    // 2. Calculate the height of the found node
    function getHeight(node) {
      // A null node contributes -1
      // This makes a leaf have height 0
      if (node === null) {
        return -1;
      }

      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);

      return Math.max(leftHeight, rightHeight) + 1;
    }

    return getHeight(current);
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("a callback suppose to be a function");
    }
    function traverse(node) {
      if (node === null) {
        return;
      }

      traverse(node.left);
      callback(node.value);
      traverse(node.right);
    }

    traverse(this.root);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("a callback suppose to be a function");
    }
    function traverse(node) {
      if (node === null) {
        return;
      }

      callback(node.value);

      traverse(node.left);
      traverse(node.right);
    }
    traverse(this.root);
  }

  postOrderForEach(callback) {
    function traverse(node) {
      if (node === null) {
        return;
      }

      traverse(node.left);
      traverse(node.right);
      callback(node.value);
    }

    traverse(this.root);
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("a callback suppose to be a function");
    }
    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();

      callback(current);

      if (current.left !== null) {
        queue.push(current.left);
      }

      if (current.right !== null) {
        queue.push(current.right);
      }
    }
  }

  delete(value) {
    let current = this.root;
    let parent = null;

    // 1. Find the node
    while (current !== null && current.value !== value) {
      parent = current;

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    // Value doesn't exist
    if (current === null) {
      return;
    }

    // CASE 1 + CASE 2:
    // Node has 0 or 1 child
    if (current.left === null) {
      // No left child
      if (parent === null) {
        // current is the root
        this.root = current.right;
      } else if (current === parent.left) {
        parent.left = current.right;
      } else {
        parent.right = current.right;
      }
    } else if (current.right === null) {
      // No right child
      if (parent === null) {
        // current is the root
        this.root = current.left;
      } else if (current === parent.left) {
        parent.left = current.left;
      } else {
        parent.right = current.left;
      }
    }

    // CASE 3:
    // Node has TWO children
    else {
      // Find successor: smallest node in right subtree
      let successorParent = current;
      let successor = current.right;

      while (successor.left !== null) {
        successorParent = successor;
        successor = successor.left;
      }

      // Replace current's value
      current.value = successor.value;

      // Remove the successor
      if (successorParent.left === successor) {
        successorParent.left = successor.right;
      } else {
        successorParent.right = successor.right;
      }
    }
  }

  includes(value) {
    let current = this.root;

    while (current !== null) {
      if (current.value === value) {
        return true;
      }

      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  buildTree(array) {
    if (array.length === 0) {
      return null;
    }
    let mid = Math.floor(array.length / 2);
    const root = new Node(array[mid]);

    root.left = this.buildTree(array.slice(0, mid));

    root.right = this.buildTree(array.slice(mid + 1));

    return root;
  }

  insert(value) {
    const newNode = new Node(value);
    if (this.root === null) {
      this.root = newNode;
      return;
      {
      }
    }

    let current = this.root;
    while (true) {
      if (value < current.value) {
        if (current.left === null) {
          current.left = newNode;
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = newNode;
          return;
        }
        current = current.right;
      }
    }
  }

  deleteItem(value) {
    const root = this.root;
    const current = this.root;

    while (current !== null) {
      if (value === current.value) {
      }
      if (value < current.value) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  }
}
