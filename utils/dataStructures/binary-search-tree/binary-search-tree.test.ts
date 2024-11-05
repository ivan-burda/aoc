import {BinarySearchTree} from "./binary-search-tree";

describe('BinarySearchTree', () => {
    it('search for empty tree returns null', () => {
        const bst1 = new BinarySearchTree();
        expect(bst1.search(10)).toBeNull();
    });

    it('delete for empty tree returns null', () => {
        const bst1 = new BinarySearchTree();
        expect(bst1.delete(10)).toBeNull();
    });

    it('traverseAndPrint for empty tree returns null', () => {
        const bst1 = new BinarySearchTree();
        expect(bst1.traverseAndPrint()).toBeNull();
    });

    it('findGreatestValue for empty tree returns null', () => {
        const bst1 = new BinarySearchTree();
        expect(bst1.findGreatestValue()).toBeNull();
    });

    it('search returns the number if found', () => {
        const bst2 = new BinarySearchTree();
        bst2.insert(10);
        expect(bst2.search(10)).toBeNull();
    });

    it('search returns null if not found', () => {
        const bst2 = new BinarySearchTree();
        bst2.insert(10);
        expect(bst2.search(11)).toBeNull();
    });

    it('deletes the required number', () => {
        const bst2 = new BinarySearchTree();
        bst2.insert(1);
        bst2.insert(2);
        bst2.insert(3);
        bst2.delete(3)
        expect(bst2.findGreatestValue()).toBeNull();
    })
});