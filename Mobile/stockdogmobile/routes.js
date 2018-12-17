import React from 'react';
import { Router, Stack, Scene, ActionConst, Tabs, Modal, Drawer, Lightbox } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers/index';
import CustomRouter from './components/customRouter';
import Login from './screens/login';
import Register from './screens/register';
import Portfolio from './screens/portfolio';
import Stock from './screens/stock';
import League from './screens/league';
import Feed from './screens/feed';
import AddPortfolioModal from './screens/addportfoliomodal';
import JoinLeagueModal from './screens/joinLeagueModal';
import TradingModal from './screens/tradingModal';
import TabIcon from './components/tabIcon';
import { colors } from './style/colors';
import tabStyle from './style/components/tabBar';
import store from './store/store';

const Routes = () => (
   <Provider store={store}>
      <CustomRouter>
         <Scene key="root" hideNavBar>
            <Scene key="login" component={Login}/>
            <Scene key="register" component={Register}/>
            {/* <Drawer
              key="drawer"  
              contentComponent={LeagueDrawer} 
              type="replace"
            >
              <Modal key="modal">  */}
            <Tabs
               key="main"
               tabBarStyle={tabStyle.tabBar}
               tabStyle={tabStyle.tabStyle}
               tabBarPosition="bottom"
               activeTintColor={colors.white}
               inactiveTintColor={colors.white}
               inactiveBackgroundColor={colors.grey}
               activeBackgroundColor={colors.activeTab}
               labelStyle={tabStyle.tabLabel}
            >
               <Scene key="portfoliomain" hideNavBar title="Portfolio" iconName="user" icon={TabIcon}>
                  <Scene key="portfolio" component={Portfolio} onEnter={Portfolio.onEnterPortfolio} />
               </Scene>
               <Scene key="league" title="League" component={League} hideNavBar iconName="users" icon={TabIcon} onEnter={League.onEnterLeague} />
               <Scene key="feed" title="Feed" component={Feed} hideNavBar iconName="activity" icon={TabIcon} onEnter={Feed.onEnterFeed} />
               {/*<Scene key="searchmain" hideNavBar title="Search" iconName="search" icon={TabIcon}>
                    <Scene key="search" component={Search}/>
                  </Scene> */}
            </Tabs>
            {/*<Lightbox key="lightbox">
                  <Scene key="noportfolios" hideNavBar component={noPortfoliosProfile}/>
                  <Scene key="addportfolio" hideNavBar component={AddPortfolioModal}/>
                  <Scene key="joinportfolio" hideNavBar component={JoinLeagueModal}/>
                  <Scene key="setnickname" hideNavBar component={SetNickname} />
                </Lightbox>*/}


            <Lightbox>
               <Scene key="stock" component={Stock} hideNavBar swipeDownToClose={false} />
               <Scene key="tradingmodal" component={TradingModal} swipeDownToClose={true} />
            </Lightbox>
            {/* <Scene key="settings" component={SettingsModal} hideNavBar />
        </Modal>
      </Drawer> */}
         </Scene>
      </CustomRouter>
   </Provider>
);

export default Routes;
