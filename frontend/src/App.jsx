
import { Provider } from "react-redux";
import store from "./App/store";
import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";
import { AppRoutes } from "./routes/AppRoute";



function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center w-full h-screen">
          <RotateLoader color="#F2505D" />
        </div>
      ) : (
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      )}
    </>
  );
}

export default App;
