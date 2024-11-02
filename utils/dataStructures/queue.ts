export class Queue<T> {
    private items: T[] = [];

    // Enqueues an item of type T
    enqueue(item: T): void {
        this.items.push(item);
    }

    // Dequeues and returns an item of type T
    dequeue(): T | undefined {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items.shift();
    }

    // Checks if the queue is empty
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    // Returns the item at the front of the queue without removing it
    peek(): T | undefined {
        if (this.isEmpty()) {
            throw new Error("Queue is empty");
        }
        return this.items[0];
    }
}