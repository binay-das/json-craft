import { useParams } from 'react-router-dom';

export default function ToolDetail() {
  const { name } = useParams();
  return (
    <div>
      <h1>Tool Detail: {name}</h1>
    </div>
  );
}
