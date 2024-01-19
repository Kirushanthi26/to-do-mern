class Todo {
    id: string;
    title: string;
    description:string;


    constructor(todoTitle: string, todoDescription:string){
        this.title = todoTitle;
        this.description =todoDescription;
        this.id = Math.random().toString();
    }
}

export default Todo; 