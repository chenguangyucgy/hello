import React from 'react';
import {
    View,
    AppRegistry,
    Text,
    ListView,
    Image,
    StyleSheet,
    Navigator
} from 'react-native';
import { StackNavigator } from 'react-navigation';



export default class ChatScreen extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {r1 !== r2}});
        this.state = {
            dataSource: ds,
            load:false,
            text:''
        };
    }
    componentWillMount(){
        this.getNet();
    }



    getNet(){
        fetch('http://10.198.1.200:3000/api/stuinfo/')//请求地址
        //fetch('https://facebook.github.io/react-native/movies.json')//请求地址
        .then((response) => response.json())//取数据
        .then((responseText) => {//处理数据
            //通过setState()方法重新渲染界面
            console.warn("====== " + responseText[0].name);
            console.warn();
            // console.error("====== " + responseText.title);
            this.setState({
                //改变加载ListView
                load: true,
                //设置数据源刷新界面
                dataSource: this.state.dataSource.cloneWithRows(responseText),
            })
        })
        .catch((error) => {
            console.warn(error);
        }).done();
    }



    static navigationOptions = {
        title: 'Chat with Lucy',
    };

    render() {
        return (
            <View>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={(rowData)=>
                        <View style={styles.row} >
                            <Text style={styles.title}>{rowData.name}</Text>
                            <Text>{rowData._id}</Text>
                            </View>}
                        />
                    </View>
                );
            }
        }

var styles = StyleSheet.create({
          title: {
            fontSize: 20,
            color: "blue",
          },
          row: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: 10,
            backgroundColor: '#F6F6F6',
          },
          separator: {
            height: 1,
            backgroundColor: '#CCCCCC',
          },
          thumb: {
            width: 64,
            height: 64,
          },
          text: {
            flex: 1,
        }
});
