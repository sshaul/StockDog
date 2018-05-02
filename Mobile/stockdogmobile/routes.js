import React from 'react';
import { Router, Stack, Scene, ActionConst, Tabs, Modal, Drawer } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/Feather';
import elements from './style/elements';
import Login from './screens/login';
import Register from './screens/register';
import Profile from './screens/profile';
import Stock from './screens/stock';
import Search from './screens/search';
import League from './screens/league';
import Feed from './screens/feed';
import noPortfoliosProfile from './screens/noPortfoliosProfile';
import DrawerPage from './components/drawerPage';
import GroupDrawer from './components/groupdrawer';
import TabIcon from './components/tabIcon';
import Api from './api';
import containers from './style/containers';

const Routes = () => (
  <Router>
    <Modal key="modal">
      <Scene key="root" hideNavBar>
        {/* <Scene key="login" component={Login}/>
        <Scene key="register" component={Register}/> */}
        <Drawer 
          key="drawer"  
          contentComponent={GroupDrawer} 
          type="replace"
        >
          <Tabs 
            key="main" 
            tabBarStyle={ containers.tabBar } 
            activeTintColor="#f7f8f9"
            inactiveTintColor="#f7f8f9"
            inactiveBackgroundColor= '#657a86'
            activeBackgroundColor= '#434b59'
            indicatorStyle= {{
              backgroundColor: '#434b59',
              height: 50}}
            labelStyle= {
              {color: '#f7f8f9', fontSize: 12, fontFamily: 'open-sans'}}
            >
            <Scene key="league" title="League" component={League} hideNavBar iconName="users" icon={TabIcon}/>
            <Scene key="profilemain" hideNavBar title="Profile" iconName="user" icon={TabIcon}>
              <Scene key="profile" component={Profile}/>
            </Scene>
            
            <Scene key="feed" title="Feed" component={Feed} hideNavBar iconName="activity" icon={TabIcon}/>
            <Scene key="searchmain" hideNavBar title="Search" iconName="search" icon={TabIcon}>
              <Scene key="search" component={Search}/>
            </Scene>
          </Tabs>
        <Scene key="noportfolios" hideNavBar component={noPortfoliosProfile}/>
        </Drawer>
      </Scene>
      <Scene key="stock" component={Stock} hideNavBar/>
    </Modal>
  </Router>
);

export default Routes;
