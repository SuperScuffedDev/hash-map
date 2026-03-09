class Node {
    constructor(key = null, value = null, nextNode = null) {
        this.key = key
        this.value = value;
        this.nextNode = nextNode;
    }
}

class LinkedList{
    constructor() {
        this.headNode = null;
    }

    prepend(key, value) {
        this.headNode = new Node(key, value, this.headNode);
    }

    size() {
        let count = 0

        if (this.headNode === null)
            return count;
        else {
            let currentNode = this.headNode;
            while (currentNode.nextNode !== null) {
                count += 1;
                currentNode = currentNode.nextNode;
            };
            count += 1;
            return count;
        }
    }

    head() {
        if (this.headNode === null)
            return undefined;
        else
            return this.headNode.value;
    }

    at(index) {
        if (this.headNode === null || index < 0)
            return undefined;
        else {
            let currentNode = this.headNode;
            for (let i=0; i<index; i++) {
                if (currentNode.nextNode !== null)
                    currentNode = currentNode.nextNode;
                else return undefined;
            };
            return currentNode;
        }
    }
    
    pop() {
        if (this.headNode === null)
            return undefined;
        else {
            const oldHeadNode = this.headNode;

            this.headNode = this.headNode.nextNode;
            oldHeadNode.nextNode = null;

            return oldHeadNode.value;
        }
    }

    contains(key) {
        if (this.headNode === null)
            return false;
        else {
            let currentNode = this.headNode;
            
            while (currentNode.nextNode !== null) {
                if (currentNode.key === key) return true;
                else currentNode = currentNode.nextNode;
            };
            if (currentNode.key === key) return true;
            else return false ;
        };
    }

    findIndex(key) {
        if (this.headNode === null)
            return -1;
        else {
            let currentNode = this.headNode;
            let index = 0
            while (currentNode.nextNode !== null) {
                if (currentNode.key === key)
                    return index;
                else {
                    currentNode = currentNode.nextNode
                    index += 1
                }
            };
            if (currentNode.key === key) return index;
            else return -1;
        }
    }

    removeAt(index) {
        const listSize = this.size();
        if (index < 0 || index > listSize)
            throw RangeError(`requested index: ${index} | indexed: 0 - ${listSize - 1}`);

        if (index === 0)
            return this.pop();
        else {
            let currentNode = this.headNode;
            for (let i = 1; i < index; i++) {
                currentNode = currentNode.nextNode;
            };
            const nodeToRemove = currentNode.nextNode;

            currentNode.nextNode = nodeToRemove.nextNode;
            nodeToRemove.nextNode = null;

            return nodeToRemove.value;
        }
    }

    update(index, value) {
        const listSize = this.size();
        if (index < 0 || index > listSize)
            throw RangeError(`requested index: ${index} | indexed: 0 - ${listSize - 1}`);

        let currentNode = this.headNode;
        for (let i = 1; i < index; i++) {
            currentNode = currentNode.nextNode;
        };

        currentNode.value = value;
    }
}

class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.table = new Array(capacity);
    }

    #increaseCapacity() {}

    #hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.capacity;
        };

        return hashCode
    }

    set(key, value) {
        const table = this.table;
        const hashCode = this.#hash(key);
        
        if (table[hashCode] === undefined) {
            table[hashCode] = new LinkedList();
            table[hashCode].prepend(key, value);
        } else {
            const list = table[hashCode];
            const index = list.findIndex(key);
            if (index === -1)
                list.prepend(key, value);
            else {

                list.update(index, value);
            };
        };
    }

    get(key) {
        const table = this.table
        
        const findIndex = () => {
            for (let i = 0; i < table.length; i++) {
                if (table[i] !== undefined) {
                    const nodeIndex = table[i].findIndex(key);

                    if (nodeIndex >= 0) {
                        const node = table[i].at(nodeIndex);
                        return node.value;
                    }
                }
            }
            return null
        }

        return findIndex();
    }

    has(key) {
        const hashCode = this.#hash(key)
        const table = this.table;
        if (table[hashCode] === undefined)
            return false
        else
            return table[hashCode].contains(key)
    }

    remove(key) {
        const table = this.table
        
        const findIndex = () => {
            for (let i = 0; i < table.length; i++) {
                if (table[i] !== undefined) {
                    const nodeIndex = table[i].findIndex(key);

                    if (nodeIndex >= 0) {
                        table[i].removeAt(nodeIndex);
                        return true;
                    }
                }
            }
            return false
        }

        return findIndex();
    }
    
    length() {
        const table = this.table;
        let total = 0;

        table.forEach(list => {
            if (list === undefined)
                return
            else {
                const listSize = list.size();
                total += listSize;
            }
        });

        return total;
    }

    clear() {
        this.table = new Array(this.capacity);
    }

    keys() {
        const allKeys = [];
        const table = this.table;

        table.forEach(list => {
            if (list === undefined)
                return
            else {
                const listSize = list.size();

                for (let i=0; i<listSize; i++) {
                    const node = list.at(i);

                    allKeys.push(node.key);
                };
            };
        });

        return allKeys;
    }

    values() {
        const allValues = [];
        const table = this.table;

        table.forEach(list => {
            if (list === undefined)
                return
            else {
                const listSize = list.size();

                for (let i=0; i<listSize; i++) {
                    const node = list.at(i);

                    allValues.push(node.value);
                };
            };
        });

        return allValues;
    }

    entries() {}
}

module.exports = HashMap;
