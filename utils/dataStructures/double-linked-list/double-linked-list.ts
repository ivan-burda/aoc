export class Node {
    data: string;
    nextNode: Node | null;
    previousNode: Node | null;

    constructor(data: string) {
        this.data = data;
        this.nextNode = null;
        this.previousNode = null;
    }
}

export class DoubleLinkedList {
    firstNode: Node | null;
    lastNode: Node | null;

    constructor() {
        this.firstNode = null;
        this.lastNode = null;
    }

    insertAtEnd(value: string) {
        let newNode = new Node(value);

        if (!this.firstNode) {
            this.firstNode = newNode;
            this.lastNode = newNode;
        } else {
            newNode.previousNode = this.lastNode;
            if (this.lastNode) {
                this.lastNode.nextNode = newNode;
            }
            this.lastNode = newNode;
        }
    }

    removeFromFront() {
        let removedNode = this.firstNode;
        if (this.firstNode) {
            this.firstNode = this.firstNode.nextNode;
            if (!this.firstNode) {
                this.lastNode = null;
            } else {
                this.firstNode.previousNode = null;
            }
        }

        return removedNode;
    }

    printReversedList() {
        let currentNode = this.lastNode;
        while (currentNode) {
            console.log(currentNode.data);
            currentNode = currentNode.previousNode;
        }
    }
}
