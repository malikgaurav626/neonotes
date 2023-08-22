import "./App.css";
import { useEffect } from "react";
import { setClick, setToggle } from "./redux/store";
import { useSelector, useDispatch } from "react-redux";

import Homepage from "./pages/homepage";
import Dashboard from "./pages/dashboard";
import EditNote from "./pages/editnote";
import AnimatedCursor from "./components/animatedcursor/animatedcursor";
import Overlay from "./components/overlay";
import store from "./redux/store"; // Import your Redux store
import { updateDatabase } from "./firebase";




function App() {
  const toggle = useSelector((state) => state.toggle);
  const routeLocation = useSelector((state) => state.routeLocation);
  const dispatch = useDispatch();
  useEffect(() => {
    function handleMouseClick(event) {
      console.log(toggle);
      dispatch(setToggle(!toggle));
      dispatch(setClick({ x: event.clientX, y: event.clientY }));
    }
    window.addEventListener("click", handleMouseClick);
    return () => window.removeEventListener("click", handleMouseClick);
  }, [toggle, dispatch]);

  useEffect(() => {
    // Add a listener to the Redux store
    const unsubscribe = store.subscribe(() => {
      const state = store.getState(); // Get the current Redux state

      // Update Firestore with the new state
      updateDatabase(state);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      unsubscribe(); // Unsubscribe from the Redux store
    };
  }, []);

  return (
    <>
      <Overlay />
      <AnimatedCursor key={toggle} />
      {routeLocation === 0 ? (
        <Homepage />
      ) : routeLocation === 1 ? (
        <Dashboard />
      ) : routeLocation === 2 ? (
        <EditNote />
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
