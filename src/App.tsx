import {
  Refine,
  GitHubBanner,
  WelcomePage,
  Authenticated,
} from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  AuthPage,
  ErrorComponent,
  useNotificationProvider,
  ThemedLayoutV2,
  ThemedSiderV2,
} from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { dataProvider, liveProvider } from "@refinedev/supabase";
import { App as AntdApp } from "antd";
import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import routerBindings, {
  NavigateToResource,
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from "@refinedev/react-router-v6";
import { supabaseClient } from "./utility";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { Header } from "./components/header";
import authProvider from "./authProvider";
import { CollectionsList, CollectionsCreate, CollectionsEdit, CollectionsShow } from "./pages/collections";
import { ComakersList, ComakersCreate, ComakersEdit, ComakersShow } from "./pages/comakers";
import { CustomersList, CustomersCreate, CustomersEdit, CustomersShow } from "./pages/customers";
import { LoansList, LoansCreate, LoansEdit, LoansShow } from "./pages/loans";
import { RoutesList, RoutesCreate, RoutesEdit, RoutesShow } from "./pages/routes";

function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider(supabaseClient)}
                liveProvider={liveProvider(supabaseClient)}
                authProvider={authProvider}
                routerProvider={routerBindings}
                notificationProvider={useNotificationProvider}
                resources={[{
                  name: "customers",
                  list: "/customers",
                  create: "/customers/create",
                  edit: "/customers/edit/:id",
                  show: "/customers/show/:id"
                }, {
                  name: "comakers",
                  list: "/comakers",
                  create: "/comakers/create",
                  edit: "/comakers/edit/:id",
                  show: "/comakers/show/:id"
                }, {
                  name: "collections",
                  list: "/collections",
                  create: "/collections/create",
                  edit: "/collections/edit/:id",
                  show: "/collections/show/:id"
                }, {
                  name: "loans",
                  list: "/loans",
                  create: "/loans/create",
                  edit: "/loans/edit/:id",
                  show: "/loans/show/:id"
                }, {
                  name: "routes",
                  list: "/routes",
                  create: "/routes/create",
                  edit: "/routes/edit/:id",
                  show: "/routes/show/:id"
                }]}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "gcFnbl-WsuyW3-roHEe5",
                }}
              >
                <Routes>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-inner"
                        fallback={<CatchAllNavigate to="/login" />}
                      >
                        <ThemedLayoutV2
                          Header={() => <Header sticky />}
                          Sider={(props) => <ThemedSiderV2 {...props} fixed />}
                        >
                          <Outlet />
                        </ThemedLayoutV2>
                      </Authenticated>
                    }
                  >
                    <Route
                      index
                      element={<NavigateToResource resource="blog_posts" />}
                    />
                    <Route path="/customers">
                      <Route index element={<CustomersList />} />
                      <Route path="create" element={<CustomersCreate />} />
                      <Route path="edit/:id" element={<CustomersEdit />} />
                      <Route path="show/:id" element={<CustomersShow />} />
                    </Route>
                    <Route path="/comakers">
                      <Route index element={<ComakersList />} />
                      <Route path="create" element={<ComakersCreate />} />
                      <Route path="edit/:id" element={<ComakersEdit />} />
                      <Route path="show/:id" element={<ComakersShow />} />
                    </Route>
                    <Route path="/collections">
                      <Route index element={<CollectionsList />} />
                      <Route path="create" element={<CollectionsCreate />} />
                      <Route path="edit/:id" element={<CollectionsEdit />} />
                      <Route path="show/:id" element={<CollectionsShow />} />
                    </Route>
                    <Route path="/loans">
                      <Route index element={<LoansList />} />
                      <Route path="create" element={<LoansCreate />} />
                      <Route path="edit/:id" element={<LoansEdit />} />
                      <Route path="show/:id" element={<LoansShow />} />
                    </Route>
                    <Route path="/routes">
                      <Route index element={<RoutesList />} />
                      <Route path="create" element={<RoutesCreate />} />
                      <Route path="edit/:id" element={<RoutesEdit />} />
                      <Route path="show/:id" element={<RoutesShow />} />
                    </Route>
                    <Route path="*" element={<ErrorComponent />} />
                  </Route>
                  <Route
                    element={
                      <Authenticated
                        key="authenticated-outer"
                        fallback={<Outlet />}
                      >
                        <NavigateToResource />
                      </Authenticated>
                    }
                  >
                    <Route
                      path="/login"
                      element={
                        <AuthPage
                          type="login"
                          formProps={{
                            initialValues: {
                              email: "info@refine.dev",
                              password: "refine-supabase",
                            },
                          }}
                        />
                      }
                    />
                    <Route
                      path="/register"
                      element={<AuthPage type="register" />}
                    />
                    <Route
                      path="/forgot-password"
                      element={<AuthPage type="forgotPassword" />}
                    />
                  </Route>
                </Routes>

                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
