import React, {Component} from "react";
import {Image, Linking, StyleSheet, Text, TouchableOpacity, View} from "react-native";

export const emptyAvatar = require("../../resources/images/empty-avatar.png");

export class ContactListItem extends Component {
    render() {
        const {familyName, givenName, hasThumbnail, thumbnailPath, middleName} = this.props.contact;
        return (
            <View style={styles.container}>
                <View style={styles.imageView}>
                    <Image style={styles.image}
                           source={hasThumbnail ? {uri: thumbnailPath} : emptyAvatar}/>
                </View>
                <View style={styles.dataContainer}>
                    <Text style={styles.name}>{`${givenName} ${middleName || ""} ${familyName || ""}`}</Text>
                    {this._renderPhones()}
                </View>
            </View>
        );
    }

    _renderPhones = () => {
        return this.props.contact.phoneNumbers.map(phone => {
            return (
                <TouchableOpacity
                    key={phone.number} style={styles.phoneButton}
                    onPress={this._call(phone.number)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.phone}>{`${phone.label}: ${phone.number}`}</Text>
                </TouchableOpacity>
            );
        });
    };

    _call = (phoneNumber) => {
        return () => Linking.openURL(`tel:${phoneNumber}`);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderBottomColor: "#eee",
        borderBottomWidth: 1
    },
    dataContainer: {
        flex: 1,
        alignItems: "flex-start",
        marginLeft: 16,
    },
    imageView: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: "hidden",
        backgroundColor: "#999"
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 40,
        overflow: "hidden",
    },
    name: {
        fontSize: 16,
    },
    text: {
        fontSize: 12,
    },
    phoneButton: {},
    phone: {
        fontSize: 14,
        color: "#37a4ba",
        paddingVertical: 4
    }
});