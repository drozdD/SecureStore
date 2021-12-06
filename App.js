import * as React from 'react';
import { Image, StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as SecureStore from 'expo-secure-store';
import notes from "./img/notes.png"
import plus from "./img/plus.png"
import notatnik from "./img/note.png"
import info from "./img/info.png"
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import S2 from './components/S2';
import S1 from './components/S1';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Fragment } from 'react/cjs/react.production.min';

const Drawer = createDrawerNavigator();
console.disableYellowBox = true;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keys: [],
      dane: [],
      rawDane: []
    }
    this.saveItem = this.saveItem.bind(this)
    this.getValueFor = this.getValueFor.bind(this)
    this.addNote = this.addNote.bind(this)
    this.getAll = this.getAll.bind(this)
    this.del = this.del.bind(this)
    this.setItem = this.setItem.bind(this)
    this.losuj = this.losuj.bind(this)
  }

  addNote(title, content) {
    var key = this.state.keys[this.state.keys.length - 1]
    if (!key) {
      this.state.keys.push('0')
    } else {
      var x = parseInt(key) + 1
      this.state.keys.push(x.toString())
    }
    key = this.state.keys[this.state.keys.length - 1]

    var val = {
      id: key,
      title: title,
      content: content,
      kolorek: this.losuj()
    }
    console.log(this.state.rawDane)
    this.state.rawDane.push(val)

    this.getAll()
  }

  losuj() {
    var los = Math.floor(Math.random() * (3 - 0 + 1)) + 0;
    var kolorek = ''
    if (los == 0) {
      kolorek = "#560BAD"
    } else if (los == 1) {
      kolorek = "#7209B7"
    } else if (los == 2) {
      kolorek = "#B5179E"
    }
    else if (los == 3) {
      kolorek = "#F72585"
    }
    return kolorek
  }

  async saveItem(key, value) {
    await SecureStore.setItemAsync(key, value);
  }

  async getValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      this.setState({
        dane: result
      })
    } else {
      this.setState({
        dane: []
      })
    }
  }

  async getRawValueFor(key) {
    let result = await SecureStore.getItemAsync(key);
    if (result) {
      this.setState({
        dane: JSON.parse(result)
      })
    } else {
      this.setState({
        dane: []
      })
    }
  }

  async seleteItem(key) {
    await SecureStore.deleteItemAsync("key");
  }

  async getAll() {
    this.setState({
      dane: JSON.stringify(this.state.rawDane)
    })
    console.log(JSON.stringify(this.state.rawDane))
    await SecureStore.setItemAsync("dane", this.state.dane);
  }

  del(id) {
    Alert.alert(
      "Usunąć?",
      "Brak możliwość przywrócenia",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "OK", onPress: () => {
            var dane = this.state.rawDane
            for (var i = 0; i < dane.length; i++) {
              if (dane[i].id == id) {
                dane.splice(i, 1)
              }
            }
            console.log(dane)
            this.setState({
              dane: JSON.stringify(dane)
            })
            this.setItem()
          }
        }
      ]
    );
  }

  async setItem() {
    await SecureStore.setItemAsync("dane", this.state.dane);
  }

  componentDidMount() {
    this.getValueFor('dane')
    this.getRawValueFor('dane')
  }

  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator drawerContent={(props) => <CustomDrawerContent {...props} />}>
          <Drawer.Screen name="s1" options={{
            title: 'notatki',
            headerStyle: {
              backgroundColor: '#4361EE',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            drawerIcon: () => (
              <Image source={notatnik} style={styles.imageIcon} />
            ),
          }}>
            {props => <S1 {...props} dane={this.state.dane} del={this.del} />}
          </Drawer.Screen>
          <Drawer.Screen name="s2" options={{
            title: 'dodaj notatkę',
            headerStyle: {
              backgroundColor: '#4361EE',
            },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            drawerIcon: () => (
              <Image source={plus} style={styles.imageIcon} />
            ),
          }}>
            {props => <S2 {...props} addNote={this.addNote} zoba={this.getAll} />}
          </Drawer.Screen>

        </Drawer.Navigator>
      </NavigationContainer >
    );
  }
}


function CustomDrawerContent(props) {
  const alercik = () =>
    Alert.alert(
      "Uwaga!",
      "Bardzo ważna informacja",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  return (
    <DrawerContentScrollView {...props}>

      <DrawerItem
        icon={() => <Image source={notes} style={styles.image} />}
        style={styles.ikonka}
        label=""
      />

      <DrawerItemList {...props} />

      <DrawerItem
        icon={() => <Image source={info} style={styles.imageIcon} />}
        onPress={alercik}
        label="info"
      />

    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  ikonka: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginLeft: 55
  },
  imageIcon: {
    width: 40,
    height: 40,
  }
});
