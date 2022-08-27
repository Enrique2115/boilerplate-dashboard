import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";
import { Provider as ReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { ToastContainer } from "react-toastify";
import { CssBaseline } from "@mui/material";
import { CacheProvider } from "@emotion/react";

import setupInterceptors from "src/services/setupInterceptors";
import EventBus from "src/utils/eventBus";
import { UnAuthPage } from "src/hooks/useUnAuthPage";
import { ToggleColorMode } from "src/theme";
import { store, persister } from "src/store";
import { createEmotionCache } from "src/utils/create-emotion-cache";

import "react-toastify/dist/ReactToastify.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { logoutUser } from "src/services/auth.service";

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  const router = useRouter();

  const logOut = useCallback(async () => {
    await logoutUser();
    router.push("/login");
  }, [router]);

  useEffect(() => {
    EventBus.on("logout", () => logOut());

    return () => {
      EventBus.remove("logout");
    };
  }, [logOut]);

  setupInterceptors();
  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <UnAuthPage>
          <CacheProvider value={emotionCache}>
            <ToggleColorMode>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
              />
            </ToggleColorMode>
          </CacheProvider>
        </UnAuthPage>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
