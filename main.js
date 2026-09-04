import { Tree } from "./tree.js";

// 1. Create random numbers
function randomArray(size) {
  const array = [];

  for (let i = 0; i < size; i++) {
    array.push(Math.floor(Math.random() * 100));
  }

  return array;
}

const numbers = randomArray(10);

console.log("Random numbers:", numbers);

// Create the tree
const tree = new Tree();

numbers.sort((a, b) => a - b);
tree.root = tree.buildTree(numbers);

console.log("Tree:");
tree.printValue();

// 2. Confirm balanced
console.log("Balanced:", tree.isBalanced());

// 3. Print all traversals
console.log("Level order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("Pre-order:");
tree.preOrder((value) => console.log(value));

console.log("Post-order:");
tree.postOrderForEach((value) => console.log(value));

console.log("In-order:");
tree.inOrder((value) => console.log(value));

// 4. Unbalance the tree
tree.insert(101);
tree.insert(110);
tree.insert(120);
tree.insert(130);
tree.insert(140);

console.log("After adding numbers > 100:");
tree.printValue();

// 5. Confirm unbalanced
console.log("Balanced:", tree.isBalanced());

// 6. Rebalance
tree.rebalance();

console.log("After rebalancing:");
tree.printValue();

// 7. Confirm balanced
console.log("Balanced:", tree.isBalanced());

// 8. Print traversals again
console.log("Level order:");
tree.levelOrderForEach((value) => console.log(value));

console.log("Pre-order:");
tree.preOrder((value) => console.log(value));

console.log("Post-order:");
tree.postOrderForEach((value) => console.log(value));

console.log("In-order:");
tree.inOrder((value) => console.log(value));
