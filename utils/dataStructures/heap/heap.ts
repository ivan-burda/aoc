export class Heap {
    data: number[];

    constructor() {
        this.data = [];
    }

    private getLeftChildIndex(index: number) {
        return (index * 2) + 1
    }

    private getRightChildIndex(index: number) {
        return (index * 2) + 2;
    }

    private getParentIndex(index: number): number {
        return Math.floor((index - 1) / 2);
    }

    getRootNode() {
        return this.data[0];
    }

    getLastNode() {
        return this.data[this.data.length - 1];
    }

    insert(value: number) {
        this.data.push(value);
        let newNodeIndex = this.data.length - 1;
        while (newNodeIndex > 0 && this.data[newNodeIndex] > this.data[this.getParentIndex(newNodeIndex)]) {
            [this.data[this.getParentIndex(newNodeIndex)], this.data[newNodeIndex]] = [this.data[newNodeIndex], this.data[this.getParentIndex(newNodeIndex)]]
            newNodeIndex = this.getParentIndex(newNodeIndex);
        }
    }

    private hasGreaterChildIndex(index: number) {
        return (this.data[this.getLeftChildIndex(index)] && this.data[this.getLeftChildIndex(index)] > this.data[index]) || (this.data[this.getRightChildIndex(index)] && this.data[this.getRightChildIndex(index)] > this.data[index]);
    }

    private calculateLargerChildIndex(index: number) {
        if (!this.data[this.getRightChildIndex(index)]) {
            return this.getLeftChildIndex(index);
        }
        if (this.data[this.getRightChildIndex(index)] > this.data[this.getLeftChildIndex(index)]) {
            return this.getRightChildIndex(index);
        } else {
            return this.getLeftChildIndex(index);
        }
    }

    delete() {
        if (!this.data.length) {
            console.log('Sorry there are not any nodes!')
            return;
        }
        const valueToDelete = this.getRootNode();
        this.data[0] = this.data.pop()!;
        let trickleNodeIndex = 0;

        while (this.hasGreaterChildIndex(trickleNodeIndex)) {
            let largerChildIndex = this.calculateLargerChildIndex(trickleNodeIndex);
            [this.data[trickleNodeIndex], this.data[largerChildIndex]] = [this.data[largerChildIndex], this.data[trickleNodeIndex]]
            trickleNodeIndex = largerChildIndex;
        }
        return valueToDelete;
    }

    getData() {
        return this.data;
    }

    heapSort() {
        const sortedItems = [];
        const length = this.data.length;
        for (let i = 0; i < length; i++) {
            sortedItems.push(this.delete());
        }
        return sortedItems;
    }


}