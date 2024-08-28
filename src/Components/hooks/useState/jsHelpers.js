export const createTodoList = () => {
  const todos = [];

  for (let i = 1; i <= 10; i++) {
    const myObject = {
      id: i,
      text: `Item ${i}`,
    };
    todos.push(myObject);
  }
  // console.log(todos);
  return todos;
};
createTodoList();

export const createNumbers=()=>{
  let numbers=[]
  for(let i=1;i<=100;i++){
    numbers.push(i)
  }
  return numbers
}
