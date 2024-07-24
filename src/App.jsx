import "./assets/scss/main.scss";
import "./pages/Weather/index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Weather from "./pages/Weather";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Weather />,
  },
]);

function App() {
  return (
    <div className="App">
      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  );
}

export default App;
