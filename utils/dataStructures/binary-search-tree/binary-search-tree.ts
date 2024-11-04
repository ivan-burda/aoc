class TreeNode {
    value: number;
    leftChild: TreeNode | null;
    rightChild: TreeNode | null;

    constructor(val: number, left: TreeNode | null = null, right: TreeNode | null = null) {
        this.value = val;
        this.leftChild = left;
        this.rightChild = right;
    }

    search(searchValue: number, node: TreeNode | null): TreeNode | null {
        if (node === null || node.value === searchValue) {
            return node;
        }
        if (searchValue < node.value) {
            return this.search(searchValue, node.leftChild);
        }
        return this.search(searchValue, node.rightChild);

    }

    insert(value: number, node: TreeNode) {
        if (value < node.value) {
            if (node.leftChild === null) {
                node.leftChild = new TreeNode(value)
                return true;
            } else {
                this.insert(value, node.leftChild);
            }
        } else if (value > node.value) {
            if (node.rightChild === null) {
                node.rightChild = new TreeNode(value)
                return true;
            } else {
                this.insert(value, node.rightChild)
            }
        } else {
            console.log("Duplicate value, not inserting.");
            return false;
        }
    }

    delete(valueToDelete: number, node: TreeNode | null): TreeNode | null {
        if (node === null) {
            return null;
        }
        if (valueToDelete < node.value) {
            node.leftChild = this.delete(valueToDelete, node.leftChild);
            return node;
        }
        if (valueToDelete > node.value) {
            node.rightChild = this.delete(valueToDelete, node.rightChild)
            return node;
        }
        //Node to delete found
        if (node.leftChild === null) {
            return node.rightChild;
        }
        if (node.rightChild === null) {
            return node.leftChild;
        }

        // Node with two children
        node.rightChild = this.lift(node.rightChild, node);
        return node;
    }

    private lift(node: TreeNode, nodeToDelete: TreeNode) {
        if (node.leftChild) {
            node.leftChild = this.lift(node.leftChild, nodeToDelete)
            return node;
        } else {
            nodeToDelete.value = node.value;
            return node.rightChild
        }
    }

    traverseAndPrint(node: TreeNode | null) {
        if (node === null) {
            return;
        }
        this.traverseAndPrint(node.leftChild);
        console.log(node.value);
        this.traverseAndPrint(node.rightChild);
    }

    findGreatestValue(node: TreeNode): number {
        if (node.rightChild) {
            return this.findGreatestValue(node.rightChild);
        }
        return node.value;
    }
}