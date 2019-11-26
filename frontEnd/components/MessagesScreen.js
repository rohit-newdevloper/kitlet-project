import React from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  Button,
  Dimensions
} from "react-native";
import RequestCard from "./RequestCard";
import tintColor from "../constants/Colors";
import * as api from "../utils/api";

const width = Dimensions.get("window").width;

export default class MessagesScreen extends React.Component {
  state = {
    incoming: [],
    outgoing: [],
    bottomBorder: false,
    showIncoming: true,
    loggedInAs: "tonyboi"
  };
  bottomBorder = needed => {
    this.setState({ bottomBorder: needed });
  };
  componentDidMount = () => {
    this.getIncomingRequests();
  };
  componentDidUpdate = () => {
    if (this.state.showIncoming) {
      this.getIncomingRequests();
    } else {
      this.getOutgoingRequests();
    }
  };
  getIncomingRequests = () => {
    api.getIncoming(this.state.loggedInAs).then(incoming => {
      this.setState({ incoming });
    });
  };
  getOutgoingRequests = () => {
    api.getOutgoing(this.state.loggedInAs).then(outgoing => {
      this.setState({ outgoing });
    });
  };
  flipIncoming = () => {
    this.setState({ showIncoming: true });
  };
  flipOutgoing = () => {
    this.setState({ showIncoming: false });
  };
  render() {
    const { showIncoming, incoming, outgoing } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.switchRequests}>
          <View style={styles.buttonFlex}>
            <View style={styles.buttonWrapper}>
              <Button
                title="Incoming"
                color={tintColor.tintColor}
                onPress={this.flipIncoming}
              />
            </View>
            <View style={styles.buttonWrapper}>
              <Button
                title="Outgoing"
                color={tintColor.tintColor}
                onPress={this.flipOutgoing}
              />
            </View>
          </View>
        </View>
        {showIncoming ? (
          <ScrollView style={styles.scrollRequests}>
            {incoming.map((item, index) => {
              return (
                <TouchableOpacity key={`${index}-view`}>
                  <RequestCard item={item} showIncoming={showIncoming} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        ) : (
          <ScrollView style={styles.scrollRequests}>
            {outgoing.map((item, index) => {
              return (
                <TouchableOpacity key={`${index}-view`}>
                  <RequestCard item={item} showIncoming={showIncoming} />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }
}

MessagesScreen.navigationOptions = {
  header: null
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: 50,
    flex: 1
  },
  switchRequests: { height: 64 },
  scrollRequests: { flex: 1 },
  buttonFlex: {
    display: "flex",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buttonWrapper: { width: (width / 2) * 0.9, height: 64 }
});
