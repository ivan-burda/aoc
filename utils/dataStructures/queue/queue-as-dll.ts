import {DoubleLinkedList} from "../double-linked-list/double-linked-list";

export class Queue<T> {
    data: DoubleLinkedList | null = null;

    initialize() {
        this.data = new DoubleLinkedList;
    }

    enqueue(element: string) {
        this.data?.insertAtEnd(element);
    }

    dequeue() {
        let removedNode = this.data?.removeFromFront()
        return removedNode?.data;
    }

    read() {
        if (!this.data?.firstNode) {
            return null
        }
        return this.data.firstNode;
    }

    printQueue() {
        return this.data;
    }
}