import React, { Component } from "react";
import {
    View,
    Image,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Dimensions
} from "react-native";


class VisitorDataDetailsScreen extends Component {
    state = {
        viewMode: "portrait"
    };

    constructor(props) {
        super(props);
        Dimensions.addEventListener("change", this.updateStyles);
    }
    static navigatorStyle = {
        navBarButtonColor: "#1E90FF"
    };

    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.updateStyles);
    }


    updateStyles = dims => {
        this.setState({
            viewMode: dims.window.height > 500 ? "portrait" : "landscape"
        });
    };

    render() {
        return (
            <View
                style={[
                    styles.container,
                    this.state.viewMode === "portrait"
                        ? styles.portraitContainer
                        : styles.landscapeContainer
                ]}
            >
                <View style={styles.visitorDetailContainer}>
                    <View style={styles.subContainer}>
                        <Image
                            source={{uri:`http://codersea.com:8080/${this.props.selectedVisit.image_info.path}`}}
                            style={styles.visitorImage}
                        />
                    </View>

                </View>
                <View style={styles.subContainer}>
                    <View>
                        <Text style={styles.visitorName}>
                         Name :   {this.props.selectedVisit.visitorName}
                        </Text>
                    </View>
                    <View>
                        <Text>
                            comment :   {this.props.selectedVisit.comment}
                        </Text>
                    </View>
                    <View>
                        <Text >
                            Date :   {this.props.selectedVisit.date}
                        </Text>
                    </View>

                    <View>

                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 22,
        flex: 1
    },
    portraitContainer: {
        flexDirection: "column"
    },
    landscapeContainer: {
        flexDirection: "row"
    },
    visitorDetailContainer: {
        flex: 2
    },
    visitorImage: {
        width: "100%",
        height: "100%"
    },
    visitorName: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 28
    },
    subContainer: {
        flex: 1
    }
});



export default VisitorDataDetailsScreen;
