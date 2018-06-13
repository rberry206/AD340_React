import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { StackNavigator} from 'react-navigation';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };
  render(){
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress = { ()=> navigate('Cameras')}>
          <Text style={{color: 'white'}}>Cameras</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

class ProfileScreen extends React.Component {
  constructor(props){
		super(props);
		this.state = {isLoading: true}
	}

  static navigationOptions = {
    title: 'Cameras',
  };

  componentDidMount(){
		return fetch('https://web6.seattle.gov/Travelers/api/Map/Data?zoomId=18&type=2')
		  .then((response) => response.json())
		  .then((responseJson) => {

			this.setState({
			  isLoading: false,
			  dataSource: responseJson.Features,
		    }, function(){

      });

		  })
		  .catch((error) =>{
		     console.error(error);
		  });
	}

  cameraType(cameraArray){
		if(cameraArray.Type == "sdot"){
			return  "http://www.seattle.gov/trafficcams/images/"+cameraArray.ImageUrl;
		} else {
			return "http://images.wsdot.wa.gov/nw/"+cameraArray.ImageUrl;
		}
	}

  render(){
    const {navigate} = this.props.navigation;

    return (
      <View style={{flex: 1}}>
     <FlatList
       data={this.state.dataSource}
       renderItem={({item}) =>
       <View style={styles.camContainer}>
         <Text>{item.Cameras[0].Id}</Text>
         <Text>{item.Cameras[0].Description}</Text>
         <Image
          source = {{ uri: this.cameraType(item.Cameras[0]) }}
          style = {{height: 200, width: 300}}
         />
       </View>
       }
       keyExtractor={(item, index) => index.toString()}
     />
     </View>
    );
  }
}

const NavigationApp = StackNavigator({
  Home: { screen: HomeScreen},
  Cameras: {screen: ProfileScreen},
});

export default class App extends Component<Props> {
  render() {
    return <NavigationApp />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
		alignItems: 'center',
		backgroundColor: '#f47a42',
		padding: 10,
		width: 80,
		height: 40
	},
  item:{
		height: 200,
		backgroundColor:"blue",
		padding: 10
	},
	camContainer:{
		flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
		backgroundColor:'#99fcd8',
    padding: 10,
    borderColor: 'black',
    borderWidth: 0.5,
	}
});
