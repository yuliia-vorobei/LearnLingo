import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <h2>Sorry this page does not exist!</h2>
      <Link to="/">To Home Page</Link>
    </>
  );
};
export default NotFoundPage;
