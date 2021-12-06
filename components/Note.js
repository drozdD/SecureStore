import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id
        };
    }

    render() {
        function jakaData() {
            let data = new Date()
            var miesiac = data.getMonth()
            switch (miesiac) {
                case 0:
                    miesiac = "sty"
                    break;
                case 1:
                    miesiac = "lut"
                    break;
                case 2:
                    miesiac = "mar"
                    break;
                case 3:
                    miesiac = "kwi"
                    break;
                case 4:
                    miesiac = "maj"
                    break;
                case 5:
                    miesiac = "czer"
                    break;
                case 6:
                    miesiac = "lip"
                    break;
                case 7:
                    miesiac = "sie"
                    break;
                case 8:
                    miesiac = "wrze"
                    break;
                case 9:
                    miesiac = "pazd"
                    break;
                case 10:
                    miesiac = "list"
                    break;
                case 11:
                    miesiac = "gru"
                    break;
            }
            var dzien = data.getDate()
            return dzien.toString() + " " + miesiac
        }

        return (
            <View style={{
                backgroundColor: this.props.kolorek, width: 40,
                height: 160,
                margin: 10,
                flex: 1,
                borderRadius: 20,
            }} >
                <TouchableOpacity onPress={() => this.props.del(this.props.id)}>
                    <Text style={styles.data}>{jakaData()}</Text>
                    <Text style={styles.noteTitle}> {this.props.title} </Text>
                    <Text style={styles.noteContent}> {this.props.content} </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    noteTitle: {
        color: "white",
        textAlign: "center",
        fontSize: 25,
        marginBottom: 10,
    },
    noteContent: {
        color: "white",
        textAlign: "left",
        marginLeft: 10,
    },
    data: {
        color: "white",
        textAlign: "right",
        marginRight: 10,
        marginTop: 10
    }
});

export default Note;
