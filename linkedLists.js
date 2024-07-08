class Node {
    constructor (value = null, nextNode = null) {
        this.value = value; 
        this.nextNode = nextNode; 
    }
}

class LinkedList {
    constructor () {
        this.headNode = null; 
    } 

    // adds a new node containing value to the end of the list
    append(value) {
        const newNode = new Node(value);

        // store the current head list 
        let currentNode = this.headNode; 

        // Edge: if the list is empty, add the new node to the head node
        if(currentNode === null){
           this.headNode = newNode;  
        } else {
         
            // this loop will deliver the pointer to the tail node
            while(currentNode.nextNode !== null) {
                currentNode = currentNode.nextNode; 
            }

            // once the pointer reached to tail node, assign the new node
            currentNode.nextNode = newNode; 
        }
    }
       

    // adds a new node containing value to the start of the list
    prepend(value) {
        const newNode = new Node(value);
        const currentNode = this.headNode; 

        // assign new node as head node 
        this.headNode = newNode;

        // add the original head node after the new node
        this.headNode.nextNode = currentNode; 
    }

    // returns the total number of nodes in the list
    size() {
        let currentNode = this.headNode; 
        let counter = 0;

        // loop till the tail node
        while (currentNode) {
            counter++;
            currentNode = currentNode.nextNode; 
        }
        return counter; 
    }

    // returns the first node in the list 
    head() {
        return this.headNode; 
    }

    // returns the last node in the list
    tail() {
        let currentNode = this.headNode; 

        // Edge: if the head node is empty, return null; 
        if (currentNode === null){
            return null;
        }     
        while (currentNode.nextNode !== null){
            currentNode = currentNode.nextNode; 
        } 
        return currentNode; 
    }

    // returns the node at the given index
    at(index) { 
        // Edge: negative or non-integer
        if (typeof index !== "number" || index < 0) {
            console.error(`Index must be an positive integer. Index passed: ${index}`);
            return; 
        }
        let currentNode = this.headNode; 

        // create the counter to keep track of the list from head
        let counter = 0;  

        // locate the pointer to the index 
        while(counter < index && currentNode !== null) {
            currentNode = currentNode.nextNode; 
            counter++; 
        }
        return currentNode; 
    }

    // removes the last element from the list
    pop() {
        let currentNode = this.headNode; 
        
        // Edge: if the head node is empty
        if (currentNode === null) {
            return null; 
        }

        // Edge: if there is one list 
        if (currentNode.nextNode === null) {
            const poppedList = currentNode; 
            this.headNode = null; 
            return poppedList; 
        }

        // track the one before the current node besides the current node
        let precedingNode = null;
        while(currentNode.nextNode !== null) { 
            precedingNode = currentNode; 
            currentNode = currentNode.nextNode; 
        }

        // store the tail node 
        const poppedList = currentNode; 

        // clear the tail node 
        precedingNode.nextNode = null;

        // return the popped tail node 
        return poppedList;   
    }

    // returns true if the passed in value is in the list and otherwise returns false
    contains(value) {
        let currentNode = this.headNode;  
        while(currentNode !== null) {

            // if there is a match return true and exit 
            if (currentNode.value === value) {
                return true; 
            }                
            currentNode = currentNode.nextNode; 
        }

        // otherwise return false
        return false; 
    }

    // returns the index of the node containing value, or null if not found.
    find(value) {
        if(this.headNode === null) { 
            return null; 
        }
        let index = 0;  
        let currentNode = this.headNode; 
        while(currentNode !== null) {

            // if there is a match return index and exit 
            if(currentNode.value === value) {
                return index;  
            }
            index++; 
            currentNode = currentNode.nextNode;    
        }

        // otherwise, return null
        return null; 
    }

    // represents LinkedList objects as strings, so can print them out and preview them in the console. The format should be: ( value ) -> ( value ) -> ( value ) -> null
    toString() {
        let currentNode = this.headNode; 
        let strings = "";
        while (currentNode !== null) {
            strings += `( ${currentNode.value} ) -> `;
            currentNode = currentNode.nextNode;            
        }

        // add null at the end
        strings += "null";
        return strings; 
    }

    //  inserts a new node with the provided value at the given index
    insertAt(value, index) {
        if (typeof index !== "number" || index < 0) {
            console.warn(`Index must be an positive integer. Index passed: ${index}`);
            return;
        }
        const newNode = new Node(value);
        if (index === 0) {
    
            // add the original list at the index after the inserted list 
            newNode.nextNode = this.headNode;
            this.headNode = newNode; 
            return;      
        }

        // start the pointer from the head node
        let targetNode = this.headNode; 

        // start another pointer from the node before the target index 
        let precedingNode = null;
        let counter = 0;  

        // locate the pointer to the index
        while(counter < index) {

            // Edge: the index exceeded the list 
            if(targetNode === null){
                console.warn(`The index is out of bounds. Index passed: ${index}`);
                return; 
            }
            precedingNode = targetNode; 
            targetNode = targetNode.nextNode; 
            counter++; 
        }        
        newNode.nextNode = targetNode; 
        precedingNode.nextNode = newNode;
    }

    // removes the node at the given index (return boolean to indicate successful removal)
    removeAt(index) {
        if (typeof index !== "number" || index < 0) {
            console.warn(`Index must be an positive integer. Index passed: ${index}`);
            return;
        }

        // Edge: the head node is empty, or has only one list
        if (index === 0){
            if (this.headNode === null) {
                return true; 
            }
            const followingNode = this.headNode.nextNode; 
            this.headNode = followingNode; 
            return true; 
        } 
        let targetNode = this.headNode; 
        let precedingNode = null;
        let counter = 0;  
        while(counter < index) {
            if (targetNode === null) {
                console.warn("The index exceeds tail node index.")
                return false; 
            }
            precedingNode = targetNode; 
            targetNode = targetNode.nextNode; 
            counter++; 
        }  
        
        // set aside the nodes linked after the target node
        const followingNodes = targetNode.nextNode;       
        if (precedingNode !== null) {

            // overwrite the original target node with the following nodes
            precedingNode.nextNode = followingNodes; 
            return true; 
        } 
    }
}