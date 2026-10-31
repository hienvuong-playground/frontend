import { Link } from 'react-router';

function NotFoundPage() {
  return (
    <div className="not-found">
      <h2>Sorry, we couldn't find that page</h2>
      <Link to="/">Go to the playmart home page</Link>
    </div>
  );
}

export default NotFoundPage;
