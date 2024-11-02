export class TrieNode {
    children: Record<string, TrieNode | null>;

    constructor() {
        this.children = {};
    }
}

export class Trie {
    root: TrieNode;

    constructor() {
        this.root = new TrieNode()
    }

    search(word: string): TrieNode | undefined {
        let currentNode: TrieNode | null = this.root;

        for (let char of word) {
            const childNode = currentNode.children[char];
            if (childNode && childNode instanceof TrieNode) {
                currentNode = childNode as TrieNode;
            } else {
                return undefined;
            }
        }

        return currentNode;
    }

    insert(word: string) {
        let currentNode = this.root;
        for (let char of word) {
            if (currentNode.children[char]) {
                currentNode = currentNode.children[char] as TrieNode;
            } else {
                const newNode = new TrieNode();
                currentNode.children[char] = newNode;
                currentNode = newNode;
            }
        }

        currentNode.children["*"] = null;
    }

    collectAllWords(words: string[] = [], node: TrieNode | null = null, word: string = "", limit?: number): string[] {
        let currentNode = node ?? this.root;
        for (const [char, childNode] of Object.entries(currentNode.children)) {
            if (char === "*") {
                words.push(word);
                if (limit && words.length >= limit) {
                    return words;
                }
            } else if (childNode) {
                this.collectAllWords(words, childNode, word + char, limit)
                if (limit && words.length >= limit) return words;
            }
        }
        
        return words;
    }

    autocomplete(prefix: string, limit?: number): string[] | undefined {
        const currentNode = this.search(prefix);
        if (!currentNode) {
            return undefined;
        }
        return this.collectAllWords([], currentNode, prefix, limit)
    }

    traverse(node: TrieNode | null = null) {
        let currentNode = node ?? this.root;
        for (const [key, childNode] of Object.entries(currentNode.children)) {
            console.log(key)
            if (key !== "*") {
                this.traverse(childNode)
            }
        }
    }

    autocorrect(word: string, limit: number = 1): string[] {
        let currentNode = this.root;
        let wordFoundSoFar = '';
        for (let char of word) {
            if (currentNode.children[char]) {
                wordFoundSoFar += char;
                currentNode = currentNode.children[char]!;
            } else {
                return this.collectAllWords([], currentNode, wordFoundSoFar, limit);
            }
        }

        return [word];
    }
}