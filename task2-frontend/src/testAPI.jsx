export default function TaskList({ tasks }) {
  if (!tasks || tasks.length === 0) return <p>No tasks found</p>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <strong>{task.title}</strong>: {task.description}
        </li>
      ))}
    </ul>
  );
}



