const Node = require('./node');

class LinkedList {
    constructor() { this._head = this._tail = new Node(); this.length = 0; }

    append(data) {
        let node = new Node(data, null, null);
        if (this.length == 0) {
            this._tail = node;
            this._head = node;
        }
        else {
            this._tail.next = node;
            node.prev = this._tail;
            this._tail = node;
        }
        this.length++;
        return this;
    }

    head() { return this._head.data; }

    tail() { return this._tail.data; }

    at(index) {
        let pointer = this._head;
        for (let i = 0; i < index; i++)
            pointer = pointer.next;
        return pointer.data;
    }

    insertAt(index, data) {
        let node = new Node(data, null, null);
        let pointer = this._head;
        if (index == 0) {
            node.next = this._head;
            this._head.prev = node;
            this._head = node;
        }
        else {
            for (let i = 1; i < index; i++)
                pointer = pointer.next;
            node.next = pointer.next;
            node.prev = pointer;
            pointer.next.prev = node;
            pointer.next = node;
        }
        this.length++;
        return this;
    }

    isEmpty() { return this.length == 0; }

    clear() { this._head = this._tail = new Node(); this.length = 0; return this; }

    deleteAt(index) {
        if (index == 0) {
            if (this.length == 1)
                this.clear();
            else {
                this._head = this._head.next;
                this._head.prev = null;
            }
        }
        else if (index == this.length - 1) {
            this._tail = this._tail.prev;
            this._tail.next = null;
        }
        else {
            let pointer = this._head;
            for (let i = 1; i < index; i++)
                pointer = pointer.next;
            pointer.next.prev = pointer.prev;
            pointer.prev.next = pointer.next;
        }
        this.length--;
        return this;
    }

    reverse() {
        let pointer = this._head;
        for (let i = 0; i < this.length - 1; i++) {
            pointer = pointer.next;
            pointer.prev.next = pointer.prev.prev;
            pointer.prev.prev = pointer;
        }
        pointer.next = pointer.prev;
        pointer.prev = null;
        let b = this._tail;
        this._tail = this._head;
        this._head = b;
        return this;
    }

    indexOf(data) {
        let i = 0;
        let pointer = this._head;
        while (i < this.length && data != pointer.data) {
            i++;
            pointer = pointer.next;
        }
        if (i == this.length)
            i = -1;
        return i;

    }
} 

module.exports = LinkedList;
