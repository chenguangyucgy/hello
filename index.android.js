/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Button,
  Text,
  TextInput,
  Image,
  View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { TabNavigator } from "react-navigation";
import ChatScreen from './src/android/component/chat';

class RecentChatsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }


  onClick() {
    let e = {
      name: this.state.text,
    }
    this.postNet(e);
  }
  postNet(e){

    fetch('http://10.198.1.200:3000/api/register',{ method: 'post',
    headers: {
        'Content-Type': 'application/json'
      },
    body: JSON.stringify(e) })
    .then((res) => {
      if(res.ok)
      console.warn(res._bodyText);
    })
    .catch((err) => console.warn(err))
  }

  render() {
    return (<View>
      <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      <Button onPress={() => this.onClick()} title="OK" />

      </View>)
  }
}

class AllContactsScreen extends Component {
  render() {
    return (
      <View>
       <Text>List of all contacts</Text>
       <Button onPress={() => this.props.navigation.navigate('Chat', { user: 'Lucy' })}
       title="Chat with Lucy" />
      </View>
    )
  }
}

const MainScreenNavigator = TabNavigator({
  Recent: { screen: RecentChatsScreen },
  All: { screen: AllContactsScreen },
});


export default hello = StackNavigator({
  Home: { screen: MainScreenNavigator,
    navigationOptions: {
      title: 'Welcome',
    }
   },
  Chat: { screen: ChatScreen,
    navigationOptions: {
      headerRight: <Button title="Info" />,
    }},
});

AppRegistry.registerComponent('hello', () => hello);
