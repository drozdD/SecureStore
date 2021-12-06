import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Note from './Note';


class S1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            keys: this.props.keys,
        };
        this.naem = this.naem.bind(this)
        this.getAll = this.getAll.bind(this)
    }
    naem() {
        console.log("huj" + this.props.keys)
    }

    async getAll() {
        var xd = []
        for (var i = 0; i < this.state.keys.length; i++) {
            let result = await SecureStore.getItemAsync(this.state.keys[i]);
            xd.push(result)
        }
        console.log(this.state.keys)
        return await xd;
    }

    render() {
        var daneee
        if (this.props.dane[0]) {
            try {
                daneee = JSON.parse(this.props.dane)
            } catch (e) { }
        }

        return (
            <FlatList
                data={daneee}
                numColumns={2}
                style={{ margin: 20, flex: 1 }}
                renderItem={({ item }) => <Note title={item.title} content={item.content} id={item.id} kolorek={item.kolorek} del={this.props.del}></Note>}
            />
        )
    }
}

export default S1;
