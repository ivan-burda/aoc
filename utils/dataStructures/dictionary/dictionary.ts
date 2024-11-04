export class Dictionary<K, V> {
    private items: Map<K, V>;

    constructor() {
        this.items = new Map<K, V>();
    }

    // Add a key-value pair only if the key does not already exist
    add(key: K, value: V): boolean {
        if (!this.items.has(key)) {
            this.items.set(key, value);
            return true; // Indicate the item was successfully added
        }
        return false; // Indicate the key already exists, so no action was taken
    }

    // Remove a key-value pair from the dictionary
    remove(key: K): boolean {
        return this.items.delete(key);
    }

    // Get the value associated with a key
    get(key: K): V | undefined {
        return this.items.get(key);
    }

    // Check if the dictionary contains a key
    containsKey(key: K): boolean {
        return this.items.has(key);
    }

    // Get all keys in the dictionary
    keys(): K[] {
        return Array.from(this.items.keys());
    }

    // Get all values in the dictionary
    values(): V[] {
        return Array.from(this.items.values());
    }

    // Get the number of key-value pairs in the dictionary
    size(): number {
        return this.items.size;
    }

    // Clear all key-value pairs from the dictionary
    clear(): void {
        this.items.clear();
    }
}