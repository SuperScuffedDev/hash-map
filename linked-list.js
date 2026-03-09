class Node{
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

    append(key, value) {
        if (this.headNode === null)
            this.prepend(key, value);
        else {
            let currentNode = this.headNode;

            while (currentNode.nextNode !== null) {
                currentNode = currentNode.nextNode;
            };

            currentNode.nextNode = new Node(key, value);
        };
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

    tail() {
        if (this.headNode === null)
            return undefined;
        else {
            let currentNode = this.headNode;
            while (currentNode.nextNode !== null) {
                currentNode = currentNode.nextNode;
            }; 
            return currentNode.value;
        }
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
            return currentNode.value;
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

    contains(value) {
        if (this.headNode === null)
            return false;
        else {
            let currentNode = this.headNode;
            
            while (currentNode.nextNode !== null) {
                if (currentNode.value === value) return true;
                else currentNode = currentNode.nextNode;
            };
            if (currentNode.value === value) return true;
            else return false ;
        };
    }

    findIndex(value) {
        if (this.headNode === null)
            return -1;
        else {
            let currentNode = this.headNode;
            let index = 0
            while (currentNode.nextNode !== null) {
                if (currentNode.value === value)
                    return index;
                else {
                    currentNode = currentNode.nextNode
                    index += 1
                }
            };
            if (currentNode.value === value) return index;
            else return -1;
        }
    }

    toString() {
        let listAsString = ""

        if (this.headNode === null)
            return "this list is empty";
        else {
            let currentNode = this.headNode;
            
            while (currentNode.nextNode !== null) {
                listAsString += `( ${currentNode.value} ) -> `;
                currentNode = currentNode.nextNode;
            };
            listAsString += `( ${currentNode.value} ) -> `;

            return listAsString += "null";
            
        };
    }

    insertAt(index, ...values) {
        const listSize = this.size();
        if (index < 0 || index > listSize)
            throw RangeError(`requested index: ${index} | placeable index: 0 - ${listSize}`);

        function insertValues(i, currentNode) {
            for (i; i < values.length; i++) {
                currentNode.nextNode = new Node(values[i], currentNode.nextNode);
                currentNode = currentNode.nextNode;
            }
        }

        if (this.headNode === null || index === 0) {
            this.prepend(values[0]);
            insertValues(1, this.headNode);
        } else {
            let currentNode = this.headNode;
            for (let i = 1; i < index; i++) {
                currentNode = currentNode.nextNode;
            };
            insertValues(0, currentNode);
        }
    }

    RemoveAt(index) {
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
}

module.exports = LinkedList;