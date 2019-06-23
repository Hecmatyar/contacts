import React, {Component} from "react";
import {FlatList, Modal, PermissionsAndroid, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";
import Contacts from "react-native-contacts";
import {ContactListItem} from "./src/components/ContactListItem";
import {ContactInfo} from "./src/components/ContactInfo";

type Props = {};
export default class App extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            contacts: [],
            searchResult: [],
            searchString: "",
            selectedContact: null,
            isModalOpen: false
        }
        ;
    }

    componentDidMount() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                "title": "Контакты",
                "message": "Приложение необходимо разрешение для просмотра списка контактов."
            }
        ).then(() => {
            Contacts.getAll((err, contacts) => {
                if (err === "denied") {
                    alert("Не удалось получить список контактов.");
                } else {
                    this.setState({contacts, searchResult: contacts});
                }
            });
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={this._onSearchChanged}
                    placeholder={"Найти"}
                    placeholderColor={"#aaa"}
                />
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.isModalOpen}
                    onRequestClose={() => {
                        Alert.alert("Модальное окно было закрыто");
                    }}
                >
                    <TouchableOpacity style={styles.modalBackground} activeOpacity={0.9} onPress={this._closeModal}>
                        <ContactInfo contact={this.state.selectedContact}/>
                    </TouchableOpacity>
                </Modal>
                <FlatList
                    data={this.state.searchResult}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }

    _keyExtractor = (item) => item.recordID;

    _onSearchChanged = (searchString) => {
        const text = searchString.toLowerCase();
        const searchResult = this.state.contacts.filter(contact => {
            const name = (contact.givenName || "").toLowerCase().indexOf(text) >= 0;
            const middleName = (contact.middleName || "").toLowerCase().indexOf(text) >= 0;
            const familyName = (contact.familyName || "").toLowerCase().indexOf(text) >= 0;
            const phones = contact.phoneNumbers.filter(phone => {
                const clearPhone = phone.number.replace(/ /g, "");
                const clearSearch = searchString.replace(/ /g, "");

                return clearPhone.indexOf(clearSearch) >= 0;
            }).length > 0;

            return name || middleName || familyName || phones;
        });
        this.setState({searchString, searchResult});
    };
    _renderItem = ({item}) => {
        return (
            <TouchableOpacity onLongPress={this._onLongPress(item)} delayLongPress={2000} activeOpacity={0.8}>
                <ContactListItem contact={item}/>
            </TouchableOpacity>
        );
    };
    _onLongPress = (selectedContact) => () => {
        this.setState({selectedContact, isModalOpen: true});
    };
    _closeModal = () => {
        this.setState({isModalOpen: false});
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    searchInput: {
        fontSize: 16,
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: "#eee",
        borderRadius: 12,
        textAlign: "left",
        textAlignVertical: "center",
        paddingHorizontal: 8
    },
    modalBackground: {
        position: "absolute",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: "#88888855"
    }
});
