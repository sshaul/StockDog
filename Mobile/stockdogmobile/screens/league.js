import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, TextInput, DatePickerIOS } from 'react-native';
import { Button, SearchBar, ListItem } from 'react-native-elements';
import containers from '../style/containers';
import elements from '../style/elements';
import text from '../style/text';
import { colors } from '../style/colors'; 
import NavBar from '../components/navbar';
import Api from '../api';

export default class League extends Component {
  constructor(props) {
		super(props);
		this.api = new Api();
    this.state = {
			members : [],
			leagueInfo : {},
			leagueName : '',
			leagueCode : ''
    };
  }

componentDidMount() {
	this.api.getLeagueMemebers((members) => {
		this.api.getLeagueName((leagueInfo) => {
			console.log(leagueInfo.inviteCode)
			this.setState({leagueName : leagueInfo.name, leagueCode : leagueInfo.inviteCode, members : members})
		})
		console.log(members);
	});
}


keyExtractor = (item, index) => index;

 renderEachItem(item) {
  	console.log("item1: ", item.item.name);
  	return (
			<View style = {containers.memberRow}>
				<View style = {containers.membersName}>
					<Text style = {text.members} > 
						{item.item.name}
					</Text>
				</View>
					<View style = {containers.membersRank}>
						<Text style = {text.members} > 
							{item.item.rank}
						</Text>
					</View>
			</View>
  		);
  }

  render() {
		var mem;
  	if (this.state.members.length === 0) {
			mem = (
				<Text> Invite your friends! </Text>
			);
		}
		else {
			//flat list
			mem = (<View style = {containers.dashboard}>
							<FlatList
								keyExtractor={this.keyExtractor}
								data={this.state.members}
								renderItem = {this.renderEachItem.bind(this)}
							/>
							</View>);
		}

    return (
      <View style={containers.profileGeneral}>
        <NavBar />
        
        <View style = {containers.leagueName}> 
        	<Text style ={text.leagueTitle}> {this.state.leagueName} </Text>
        	<Text style ={text.inviteCode}> Invite Code </Text>
					<View style = {containers.code}>
						<Text style= {text.code} selectable> {this.state.leagueCode} </Text>
					</View>
        </View>
        <View style = {containers.leagueMembers}>
					{mem}
        </View>
        
      </View>
    );
  }
}