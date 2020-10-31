import React from "react";

import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "./layout/header";
import Footer from "./layout/footer";
import { ContextWrapper } from "./Context";
import GlobalModal from "./Dialogs/GDialog";
import AuthRoute from "./routes/AuthRoute";
import NotFound from "./pages/Notfound";
import Main from "./pages/main";
import Detail from "./pages/Detail";
import UserAccount from "./pages/UserAccount";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import { TC } from "./pages/TermsCondition";
import { PP } from "./pages/PrivacyPolicy";
function App() {
  return (
    <ContextWrapper>
      <Router>
        <Header />
        <GlobalModal />
        <AnimatePresence>
          <Switch>
            <Route path={["/expand/:id", "/"]} exact component={Main} />
            <Route path="/зар/:id" exact component={Detail} />
            <Route path={"/хэрэглэгч/:id"} exact component={UserAccount} />
            <AuthRoute path="/бүртгэл" exact component={SignUp} />
            <AuthRoute path="/нэвтрэх" exact component={SignIn} />
            <Route path="/үйлчилгээний-нөхцөл" exact component={TC} />
            <Route path="/хамгаалалтын-нөхцөл" exact component={PP} />
            <Route component={NotFound} />
          </Switch>
        </AnimatePresence>
        <Footer />
      </Router>
    </ContextWrapper>
  );
}

export default App;
