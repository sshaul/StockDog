import React from 'react';
import { Router, Stack, Scene, ActionConst, Tabs, Modal, Drawer, Lightbox } from 'react-native-router-flux';
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
import AddPortfolioModal from './screens/addportfoliomodal';
import JoinLeagueModal from './screens/joinLeagueModal';
import BuySellModal from './screens/buysellmodal';
import SetNickname from './screens/setNickname';
import SettingsModal from './screens/settingsmodal';
import LeagueDrawer from './components/leaguedrawer';
import TabIcon from './components/tabIcon';
import Api from './api';
import containers from './style/containers';

const Routes = () => (
  <Router>
    <Drawer 
      key="drawer"  
      contentComponent={LeagueDrawer} 
      type="replace"
    >
      <Modal key="modal">
      
        <Scene key="root" hideNavBar>
          {/* <Scene key="login" component={Login}/>
          <Scene key="register" component={Register}/> */}
          
            
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
                <Scene key="profilemain" hideNavBar title="Portfolio" iconName="user" icon={TabIcon}>
                  <Scene key="profile" component={Profile} onEnter={Profile.onEnterPortfolio}/>
                </Scene>
                <Scene key="league" title="League" component={League} hideNavBar iconName="users" icon={TabIcon}/>
                <Scene key="feed" title="Feed" component={Feed} hideNavBar iconName="activity" icon={TabIcon} onEnter={Feed.onEnterFeed}/>
                <Scene key="searchmain" hideNavBar title="Search" iconName="search" icon={TabIcon}>
                  <Scene key="search" component={Search}/>
                </Scene>
              </Tabs>
              <Lightbox key="lightbox">
                <Scene key="noportfolios" hideNavBar component={noPortfoliosProfile}/>
                <Scene key="addportfolio" component={AddPortfolioModal}/>
                <Scene key="joinportfolio" component={JoinLeagueModal}/>
                <Scene key="setnickname" component={SetNickname} />
              </Lightbox>
            
          </Scene>
        <Lightbox>
          <Scene key="stock" component={Stock} hideNavBar/>
          <Scene key="buysellmodal" component={BuySellModal} hideNavBar />
        </Lightbox>
        <Scene key="settings" component={SettingsModal} hideNavBar />
      </Modal>
    </Drawer>
      
  </Router>
);

export default Routes;
