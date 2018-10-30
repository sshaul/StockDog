import { StyleSheet, PixelRatio } from 'react-native';
import { colors } from './colors.js'; 

export default containers = StyleSheet.create({
    centeredDark: {
      flex: 1,
      backgroundColor: colors.dark,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0
    },
    gradient: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0,
      width: '100%'
    },
    horizontal: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    vertical: {
      flexDirection: 'column'
    },
    profileBackground: {
      flex: 1,
      backgroundColor: colors.dark,
      justifyContent: 'flex-start',
      paddingTop: 0,
    },
    profileBackgroundCircle: {
      flex: 0,
      backgroundColor: colors.bright,
      // width: 1978,
      width: '600%',
      height: '153%',
      position: 'absolute',
      // top: -850,
      top: '-105%',
      // right: -650,
      right: '-180%',
      borderBottomLeftRadius: 1978/2,
      borderBottomRightRadius: 1978/2
    },
    screenContent: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      alignItems: 'center',
      backgroundColor: 'transparent'
    },
    iconHeaders: {
      flex: 0.1,
      width:'100%',
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingLeft: 20,
      paddingRight: 20,
    },
    // ----------------- Login/Register ------------- //
    logo: {
      width: 305,
      height: 193
    },
    horizontalRegister: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 30
    },
    // ----------------- Stock chart ------------- //
    chartContainer: {
      flex: 0.3,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.grey,
      width: '85%',
      opacity: 0.95,
      borderRadius: 10,
    },
    // // ----------------- Portfolio page ------------- //
    portfolioValue: {
      flex: 0.1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    portfolioStockList: {
      flex: 0.4,
      justifyContent: 'flex-start',
      width: '90%',
      alignItems: 'flex-start',
    },
    portfolioStockListHeader: {
      marginTop: 10,
      justifyContent: 'flex-end'
    },
    portfolioListGroup: {
      width: '100%',
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 10,
    },
    horizontalEdges: {
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    listingItem: {
      width: '100%',
      paddingTop: 10,
      paddingBottom: 15,
    },
    // // ----------------- League Drawer ------------- //
    // groupsDrawer: {
    //   flex: 1,
    //   flexDirection: 'column',
    //   backgroundColor: colors.white,
    //   alignItems: 'center',
    //   justifyContent: 'space-between',
    //   paddingTop: 30
    // },
    // leaguesList: {
    //   flex: 1,
    //   paddingTop: 20,
    //   width: '100%',
    //   borderBottomWidth: 1
    // },
    // leaguesFooter: {
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   paddingBottom: 10,
    //   marginTop: 10,
    // },
    // groupItem: {
    //   borderStyle: 'solid', 
    //   borderColor: colors.grey, 
    //   borderWidth: 2
    // },
    // // ----------------- Add group/join group modals ------------- //
    // addGroupModalHeader: {
    //   flex: 0.2,
    //   width: '100%',
    //   flexDirection: 'row',
    //   alignItems: 'center',
    //   justifyContent: 'center'
    // },
    // addGroupInnerModal: {
    //   flex: 1,
    //   justifyContent: 'flex-start',
    //   alignItems: 'center',
    //   paddingTop: 10
    // },
    // addGroupOuterModal: {
    //   flex: 1,
    //   width: '80%',
    //   flexDirection: 'column',
    //   justifyContent: 'flex-start',
    //   alignItems: 'center',
    //   backgroundColor: colors.grey
    // },
    // // ----------------- League Page ------------- //
    // leagueName: {
    //   flex: 0.2,
    //   flexDirection: 'column',
    //   justifyContent: 'flex-start',
    //   alignItems: 'center',
    // },
    // leagueMembers: {
    //   flex: 0.6,
    //   flexDirection: 'column',
    //   paddingLeft: 20,
    //   paddingRight: 20
    // },
    // memberRow: {
    //   flex: 2,
    //   flexDirection: 'row',
    //   borderBottomWidth: 1,
    //   borderColor: "gray",
    // },
    // membersRank: {
    //   flex: 0.2,
    //   alignItems: 'center'
    // },
    // membersName: {
    //   justifyContent: 'space-between',
    //   alignItems: 'center',
    //   flex: 0.3
    // },
    // membersValue: {
    //   flex: 0.5,
    //   alignItems: 'flex-end',
    //   paddingRight: 10
    // },
    // code: {
    //   flex: 0.5,
    //   padding:10
    // },
    // // ----------------- Settings Modal ------------- //
    // settingsHeader: {
    //   flex: 0.3,
    //   justifyContent: 'flex-end',
    // },
    // settingsIconHeaders: {
    //   flex: 0.1,
    //   flexDirection: 'row',
    //   alignItems: 'flex-end',
    //   justifyContent: 'flex-end',
    //   paddingLeft: 10,
    //   paddingRight: 10,
    //   paddingTop: 5
    // },
    // // ----------------- Feed ------------- //
    // activity: {
    //   flex: 0.2,
    // },
    // feedTitle: {
    //   flex: 0.1,
    //   alignItems: 'center',
    // },
    // feed: {
    //   flex: 0.8,
    // }




    // generalWithHeaders: {
    //   flex: 0.9,
    //   backgroundColor: colors.dark,
    //   alignItems: 'center',
    //   justifyContent: 'center',
    //   paddingTop: 0
    // },
    // chartOut: {
    //   flex: 0.5,
    //   alignItems: 'center',
    //   justifyContent: 'flex-start'
    // },
    // underChart: {
    //   flex: 0.2,
    //   flexDirection: 'column',
    //   justifyContent: 'flex-start',
    //   marginTop: -50
    // },
    // buttons: {
    //   flex: 0.5,
    //   flexDirection: 'row',
    //   justifyContent: 'space-around'
    // },
    // // ----------------- Buy/Sell modals ------------- //
    // modalHeaders: {
    //   flex: 0.2,
    //   width: '80%',
    //   alignItems: 'flex-end',
    //   justifyContent: 'center'
    // },
    // innerModal: {
    //   flex: 0.5,
    //   justifyContent: 'flex-start',
    //   alignItems: 'center',
    // },
    // outerModal: {
    //   flexDirection: 'column',
    //   justifyContent: 'flex-start',
    //   alignItems: 'center',
    //   backgroundColor: colors.grey,
    //   borderRadius: 10
    // },
    // successMessage: {
    //   width: 270, 
    //   height: '100%', 
    //   alignItems: 'center', 
    //   justifyContent: 'center',
    // },
    // check: {
    //   paddingTop: 20,
    // },
    // tabBar: {
    //   borderTopColor: '#657a86',
    //   borderTopWidth: 1 / PixelRatio.get()
    // },
    // indicator: {
    //   backgroundColor: '#434b59',
    //   height: 50
    // },
});