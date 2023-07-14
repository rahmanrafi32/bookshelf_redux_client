import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import routes from "./routes";
import {RouterProvider} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./redux/store.ts";


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Provider store={store}>
          <RouterProvider router={routes} />
      </Provider>
  </React.StrictMode>,
)
