import React, { Component } from "react";
import {
    Alert,
    Button,
    Image,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { Dialog, ProgressDialog, ConfirmDialog } from "react-native-simple-dialogs";

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        backgroundColor: "#F5FCFF",
        flex: 1,
        justifyContent: "center",
    },
    welcomeText: {
        fontSize: 20,
        margin: 10,
        textAlign: "center",
    },
    exampleText: {
        fontSize: 20,
        marginBottom: 25,
        textAlign: "center",
    },
    instructionsText: {
        color: "#333333",
        fontSize: 16,
        marginBottom: 40,
        textAlign: "center",
    },
});

class Example extends Component {
    state = {}

    openDialog = (show) => {
        this.setState({ showDialog: show });
    }

    openConfirm = (show) => {
        this.setState({ showConfirm: show });
    }

    openProgress = () => {
        this.setState({ showProgress: true });

        setTimeout(
            () => {
                this.setState({ showProgress: false });
            },
            4000,
        );
    }

    optionYes = () => {
        this.openConfirm(false);
        this.openDialog(false);

        // Yes, this is a workaround :(
        // Why? See this https://github.com/facebook/react-native/issues/10471
        setTimeout(
            () => {
                Alert.alert("The YES Button touched!");
            },
            300,
        );
    }

    optionNo = () => {
        this.openConfirm(false);
        this.openDialog(false);
        // Yes, this is a workaround :(
        // Why? See this https://github.com/facebook/react-native/issues/10471
        setTimeout(
            () => {
                Alert.alert("The NO Button touched!");
            },
            300,
        );
    }

    render() {
        return (
            <View style={ styles.container }>

                

                <Button
                    onPress={ () => this.openDialog(true) }
                    title="Custom Dialog"
                />

                <View style={ { height: 40 } } />
{/* 
                <Button
                    onPress={ () => this.openConfirm(true) }
                    title="Confirm Dialog"
                /> */}

                <View style={ { height: 40 } } />

                <ConfirmDialog
                    title="Add a new MyPlace"
                    animationType="fade"
                    contentStyle={
                        {
                            alignItems: "center",
                            justifyContent: "center",
                        }
                    }
                    onTouchOutside={ () => this.openDialog(false) }
                    visible={ this.state.showDialog }
                    negativeButton={
                        {
                            title: "NO",
                            onPress: this.optionNo,
                            // disabled: true,
                            titleStyle: {
                                color: "blue",
                                colorDisabled: "aqua",
                            },
                            style: {
                                backgroundColor: "transparent",
                                backgroundColorDisabled: "transparent",
                            },
                        }
                    }
                    positiveButton={
                        {
                            title: "YES",
                            onPress: this.optionYes,
                        }
                    }
                >

                    <Text style={ { marginVertical: 30 } }>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </Text>
                    <Button
                        onPress={ () => this.openDialog(false) }
                        style={ { marginTop: 10 } }
                        title="CLOSE"
                    />
                </ConfirmDialog>

                <ConfirmDialog
                    title="Confirm Dialog"
                    message="Are you sure about that?"
                    onTouchOutside={ () => this.openConfirm(false) }
                    visible={ this.state.showConfirm }
                    negativeButton={
                        {
                            title: "NO",
                            onPress: this.optionNo,
                            // disabled: true,
                            titleStyle: {
                                color: "blue",
                                colorDisabled: "aqua",
                            },
                            style: {
                                backgroundColor: "transparent",
                                backgroundColorDisabled: "transparent",
                            },
                        }
                    }
                    positiveButton={
                        {
                            title: "YES",
                            onPress: this.optionYes,
                        }
                    }
                />

            </View>
        );
    }
}

export default Example;
