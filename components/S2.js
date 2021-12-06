import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as SecureStore from 'expo-secure-store';


export default class S2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            content: '',
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        underlineColorAndroid="#4CC9F0"
                        placeholder="TYTUŁ..."
                        placeholderTextColor="white"
                        onChangeText={(text) => this.setState({ title: text })}
                        style={styles.input}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <TextInput
                        underlineColorAndroid="#4CC9F0"
                        placeholder="TREŚĆ..."
                        placeholderTextColor="white"
                        onChangeText={(text) => this.setState({ content: text })}
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => this.props.addNote(this.state.title, this.state.content)}>
                    <Text style={styles.btnValue}>Dodaj</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => this.props.zoba()}>
                    <Text style={styles.btnValue}>Zobacz</Text>
                </TouchableOpacity>
                <View style={{ flex: 3 }}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#3F37C9',
        flex: 1,
        resizeMode: "cover",
    },
    input: {
        height: 40,
        margin: 12,
        padding: 10,
        color: 'white',
        fontSize: 23,
        flex: 1
    },
    btn: {
        textAlign: 'center',
        fontSize: 30,
        color: "white"
    },
    btnValue: {
        textAlign: 'center',
        fontSize: 30,
        color: "white"
    }
});

