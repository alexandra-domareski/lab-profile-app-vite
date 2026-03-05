import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="card">
      <div className="loginPage">
        <div className="left-side">
          <h1 className="title">IronProfile</h1>
          <h3>
            Today we will create an app with authorization, adding some cool
            styles!
          </h3>
          <Link to="/signup">
            <button className="btn">Sign up</button>
          </Link>
          <Link to="/login">
            <button className="btn">Log in</button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
