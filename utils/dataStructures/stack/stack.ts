export class Stack<T>{
    data:T[];

    constructor(){
        this.data = [];
    }

    push(element: T){
        this.data.push(element);
    }

    pop(){
        return this.data.pop()
    }

    read(){
        return this.data[this.data.length-1]
    }
}