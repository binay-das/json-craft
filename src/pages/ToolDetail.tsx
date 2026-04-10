import { useParams } from 'react-router-dom';

export default function ToolDetail() {
  const { name } = useParams();
  return (
    <div>
      <p className="text-gray-700 text-left">Interactive tool content for <span className="font-semibold">{name}</span> goes here.</p>
    </div>
  );
}
