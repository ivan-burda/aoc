export class Node {
    data: string;
    nextNode: Node | null;

    constructor(data: string) {
        this.data = data;
        this.nextNode = null;
    }
}

export class LinkedList {
    firstNode: Node | null;

    constructor() {
        this.firstNode = null;
    }

    read(index: number): string | null {
        let currentNode = this.firstNode;
        let currentIndex = 0;

        while (currentNode && currentIndex < index) {
            currentNode = currentNode.nextNode;
            currentIndex += 1;

        }
        return currentNode ? currentNode.data : null;
    }

    indexOf(value: string): number | null {
        let currentNode = this.firstNode;
        let currentIndex = 0;

        while (currentNode) {
            if (currentNode.data === value) {
                return currentIndex;
            }
            currentNode = currentNode.nextNode
            currentIndex += 1;
        }
        return null
    }

    insertAtIndex(index: number, value: string): boolean {
        if (index < 0) {
            return false
        }
        let newNode = new Node(value);

        if (index === 0) {
            newNode.nextNode = this.firstNode;
            this.firstNode = newNode;
            return true;
        }

        let currentNode: Node | null = this.firstNode;
        let currentIndex = 0;
        while (currentNode && currentIndex < (index - 1)) {
            currentNode = currentNode.nextNode;
            currentIndex += 1;
        }

        if (!currentNode) {
            return false;
        }

        newNode.nextNode = currentNode.nextNode;
        currentNode.nextNode = newNode

        return true;
    }

    deleteAtIndex(index: number): string | null {
        if (index < 0 || !this.firstNode) {
            return null;
        }

        if (index === 0) {
            const deletedNode = this.firstNode;
            this.firstNode = this.firstNode.nextNode;
            return deletedNode.data;
        }

        let currentNode: Node | null = this.firstNode;
        let currentIndex = 0;

        while (currentNode && currentIndex < (index - 1)) {
            currentNode = currentNode.nextNode;
            currentIndex += 1;
        }
        if (!currentNode || !currentNode.nextNode) {
            return null
        }

        let deletedNode = currentNode.nextNode;
        currentNode.nextNode = deletedNode.nextNode;

        return deletedNode.data;

    }

    printElements() {
        let currentNode = this.firstNode;
        while (currentNode) {
            console.log(currentNode.data);
            currentNode = currentNode.nextNode;
        }
    }

    getLastElement() {
        let currentNode = this.firstNode;
        let nextNode = currentNode?.nextNode;
        while (currentNode && nextNode) {
            currentNode = currentNode.nextNode;
            nextNode = currentNode?.nextNode;
        }
        return currentNode?.data;
    }

    reverseList() {

    }
}
