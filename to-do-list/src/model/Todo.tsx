class Todo {
    id: number;
    title: string;
    description:string;


    constructor(todoTitle: string, todoDescription:string){
        this.title = todoTitle;
        this.description =todoDescription;
        this.id = Math.random();
    }
}

export default Todo; 