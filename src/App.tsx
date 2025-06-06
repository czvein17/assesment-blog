import { Provider } from "react-redux";
import AppRouter from "./AppRouter";
import { store } from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div className="flex items-center justify-center min-h-screen">
        <AppRouter />
      </div>
    </Provider>
  );
}

export default App;
