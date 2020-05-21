import React from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
// import Aux from './hoc/Aux/Aux';
import Checkout from './containers/checkout/checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './components/Orders/Orders';
function App() {
  return (
    <div >
      <Layout >
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
        {/* <BurgerBuilder />
        <Checkout /> */}
      </Layout>
    </div>
  );
}

export default App;
