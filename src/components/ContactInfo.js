import React, {Component} from "react";
import {Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {emptyAvatar} from "./ContactListItem";

export class ContactInfo extends Component {
    render() {
        const {
            company, familyName, givenName,
            middleName,
            jobTitle,
            hasThumbnail,
            thumbnailPath,
            postalAddresses,
            prefix,
            suffix,
            department,
            birthday,
        } = this.props.contact;
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.headerContainer}>
                        <View style={styles.imageView}>
                            <Image style={styles.image}
                                   source={hasThumbnail ? {uri: thumbnailPath} : emptyAvatar}/>
                        </View>
                        <View style={styles.headerDataContainer}>
                            <Text style={styles.name} numberOfLines={1}>Ф: {familyName || ""}</Text>
                            <Text style={styles.name} numberOfLines={1}>И: {givenName}</Text>
                            <Text style={styles.name} numberOfLines={1}>О: {middleName || ""}</Text>
                        </View>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={styles.subheader} numberOfLines={1}>Кампания:</Text>
                        <Text style={styles.subheader2} numberOfLines={1}>{company}</Text>
                        <Text style={styles.subheader} numberOfLines={1}>Должность:</Text>
                        <Text style={styles.subheader2} numberOfLines={1}>{jobTitle}</Text>
                        <Text style={styles.subheader} numberOfLines={1}>Отделение:</Text>
                        <Text style={styles.subheader2} numberOfLines={1}>{department}</Text>
                        <Text style={styles.subheader} numberOfLines={1}>Почтовый адрес: </Text>
                        <Text style={styles.subheader2} numberOfLines={1}>{postalAddresses.formattedAddress}</Text>
                        <Text style={styles.subheader} numberOfLines={1}>Дата рождения:</Text>
                        <Text style={styles.subheader2} numberOfLines={1}>
                            {birthday != null ? `${birthday.day}.${birthday.month}.${birthday.year}` : ""}
                        </Text>
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={styles.subheader} numberOfLines={1}>Телефоны:</Text>
                        {this._renderPhones()}
                    </View>
                    <View style={styles.dataContainer}>
                        <Text style={styles.subheader} numberOfLines={1}>Почта:</Text>
                        {this._renderEmail()}
                    </View>
                </ScrollView>
            </View>
        );
    };

    _renderEmail = () => {
        return this.props.contact.emailAddresses.map(email => {
            return (
                <TouchableOpacity
                    key={email.email} style={styles.phoneButton}
                    onPress={this._write(email.number)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.phone}>Написать {`${email.label}: ${email.email}`}</Text>
                </TouchableOpacity>
            );
        });
    };

    _renderPhones = () => {
        return this.props.contact.phoneNumbers.map(phone => {
            return (
                <TouchableOpacity
                    key={phone.number} style={styles.phoneButton}
                    onPress={this._call(phone.number)}
                    activeOpacity={0.8}
                >
                    <Text style={styles.phone}>Позвонить {`${phone.label}: ${phone.number}`}</Text>
                </TouchableOpacity>
            );
        });
    };
    _call = (phoneNumber) => {
        return () => Linking.openURL(`tel:${phoneNumber}`);
    };
    _write = (email) => {
        return () => Linking.openURL(`mailto:${email}`);
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 32,
        borderRadius: 16,
        backgroundColor: "white",
        padding: 16
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "flex-start"
    },
    headerDataContainer: {
        flex: 1,
        alignItems: "flex-start",
        marginLeft: 16,
    },
    dataContainer: {
        alignItems: "flex-start",
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
        flex: 1,
        fontSize: 16,
    },
    subheader: {
        fontSize: 14,
        marginTop: 8,
    },
    subheader2: {
        fontSize: 12,
        marginLeft: 8
    },
    text: {
        fontSize: 12,
    },
    phoneButton: {},
    phone: {
        fontSize: 14,
        color: "#37a4ba",
        paddingVertical: 4
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
    },
});