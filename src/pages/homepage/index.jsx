import "./homepage.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import {setRouteLocation} from '../../redux/store';
export default function Homepage() {
  const circleRef = useRef();
  const dispatch = useDispatch();
  function handleEnter()
  {
    const backdropCircle = circleRef.current;
    backdropCircle.style.animation = 'expandbackdropcircle-animate 1s cubic-bezier(.57,.21,.69,1.25) 0s 1 forwards';
    setTimeout(()=>{
      dispatch(setRouteLocation(1));
    }, 1100);
  }
  return (
    <>
      <div className="text-black fw-bold pt-0">
        <nav className="navbar mt-0 pt-0">
          <div className="container-fluid p-2 mt-0 pt-0">
            <ul className="navbar-nav d-flex flex-row w-100 mt-0 pt-0">
              <li className="nav-item plus">+</li>
              <li className="nav-item d-flex flex-row align-items-center pt-0 ms-auto">
                <p className="sub-heading p-3">
                  <span className="pre-sub-heading">
                  <span className="causten-bolder">Title - </span> <br />
                  neo notes</span>
                </p>
                <p className="sub-heading p-3">
                  <span className="pre-sub-heading">
                  <span className="causten-bolder">Date - </span> <br />
                  19.8.2023</span>
                </p>
                <p className="sub-heading p-3">
                  <span className="pre-sub-heading">
                  <span className="causten-bolder">Designer - </span> <br />
                  vaporSquad</span>
                </p>
              </li>
              <li className="ms-auto nav-item plus">+</li>
            </ul>
          </div>
        </nav>
        <div className="main-heading-container">
          <div className="main-heading">Neo Notes</div>
          <div className="homepage-button-container d-flex justify-content-center w-100">
            <div className="backdrop-circle" ref={circleRef}></div>
            <button className="homebutton" onClick={handleEnter}>
              <span className="noselect">Enter</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
