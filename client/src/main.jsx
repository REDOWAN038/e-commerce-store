import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import { store } from "./app/store"
import { Provider } from "react-redux"
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <PayPalScriptProvider>
            <App />
        </PayPalScriptProvider>
    </Provider>
)
