class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class Link {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  push(val) {
    let node = new Node(val);
    let current = this.head; // 1

    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.length++;

      return this;
    }

    this.tail.next = node;
    this.tail = node;

    this.length++;

    while (current) {
      if (!!current.next) {
        node.prev = current;
      }
      current = current.next;
    }

    return this;
  }
  pop() {
    if (this.length == 0) {
      return undefined;
    }
    if (this.length == 1) {
      this.head = null;
      this.tail = null;
    }
    let oldTail = this.tail;
    let newTail = oldTail.prev;

    this.tail = newTail;
    this.tail.next = null;
    this.length--;

    return oldTail;
  }
  shift() {
    if (this.length == 0) {
      return undefined;
    }
    if (this.length == 1) {
      this.head = null;
      this.tail = null;
    } else {
      let oldHead = this.head;
      let newHead = oldHead.next;
      this.head = newHead;
      this.head.prev = null;
    }

    this.length--;
    return oldHead;
  }

  unshift(val) {
    let node = new Node(val);
    if (this.length == 0) {
      this.head = node;
      this.tail = node;
    } else {
      let oldHead = this.head;
      oldHead.prev = node;
      this.head = node;
      this.head.next = oldHead;
    }

    this.length++;

    return this;
  }

  get(val) {
    let current = this.head;
    let tail = this.tail;
    let mid = this.length / 2;

    if (val < 0) {
      return null;
    }

    if (val <= mid) {
      for (let i = 0; i < mid; i++) {
        if (val == i) {
          return current;
        }
        current = current.next;
      }
    }

    if (val > mid) {
      for (let i = mid; i < this.length; i++) {
        if (val == i) {
          return tail;
        }
        tail = tail.prev;
      }
    }
  }

  set(index, val) {
    let replace = this.get(index);

    if (!replace) {
      return false;
    }

    replace.val = val;

    return true;
  }

  insert(index, val) {
    let node = new Node(val);
    let searchNode = this.get(index);

    if (index < 0) {
      return this.unshift(val);
    }
    if (index == this.length) {
      return this.push(val);
    }
    node.next = searchNode.next;
    node.prev = searchNode;
    searchNode.next = node;
    this.length++;

    return true;
  }
  remove(index) {
    let searchNode = this.get(index);
    searchNode.prev.next = searchNode.next;
    searchNode.next.prev = searchNode.prev;

    if (index == 0) {
      return this.shift(index);
    }

    if (index == this.length) {
      return this.pop(index);
    }

    this.length--;

    return searchNode;
  }
}

let link = new Link();

link.push(1);
link.push(2);
link.push(3); // 2
link.push(4);
link.push(5);
link.push(6);
