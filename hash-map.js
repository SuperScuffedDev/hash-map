class HashMap {
    constructor(loadFactor = 0.75, capacity = 16) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
    }

    hash(key) {
        let hashCode = 0;

        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
            hashCode = hashCode % this.capacity;
        };

        return hashCode
    }

    set(key, value) {}

    get(key) {}

    has(key) {}

    remove(key) {}
    
    length() {}

    clear() {}

    keys() {}

    values() {}

    entries() {}
}

module.exports = HashMap;
