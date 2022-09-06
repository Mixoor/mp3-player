import React, { Component } from "react";
import { Text, View, ScrollView, Dimensions } from "react-native";
import Slider from "@react-native-community/slider";
import { Block } from "../components";

const { height, width } = Dimensions.get("screen");
export default class PlayList extends Component {
  state = {
    value: 10
  };
  render() {
    return (
      <ScrollView
        scrollEnabled
        scrollEventThrottle={16}
        style={{
          flex: 1,
          height: width,
          flexDirection: "column-reverse"
        }}
        contentContainerStyle={{
          flexGrow: 1
        }}
      >
        <Block flex={1} style={{ transform: [{ rotate: "-90deg" }] }}>
          <Block flex={1} row>
            <Text
              style={{
                flex: 0.1,
                textAlignVertical: "center",
                transform: [{ rotate: "90deg" }]
              }}
            >
              {this.state.value}
            </Text>
            <Slider
              style={{
                flex: 0.9
              }}
              minimumValue={0}
              maximumValue={100}
              value={this.state.value}
              onValueChange={value => this.setState({ value: parseInt(value) })}
            />
          </Block>

          <Block flex={1} row>
            <Text
              style={{
                flex: 0.1,
                textAlignVertical: "center",
                transform: [{ rotate: "90deg" }]
              }}
            >
              {this.state.value}
            </Text>
            <Slider
              style={{
                flex: 0.9
              }}
              minimumValue={0}
              maximumValue={100}
              value={this.state.value}
              onValueChange={value => this.setState({ value: parseInt(value) })}
            />
          </Block>

          <Block flex={1} row>
            <Text
              style={{
                flex: 0.1,
                textAlignVertical: "center",
                transform: [{ rotate: "90deg" }]
              }}
            >
              {this.state.value}
            </Text>
            <Slider
              style={{
                flex: 0.9
              }}
              minimumValue={0}
              maximumValue={100}
              value={this.state.value}
              onValueChange={value => this.setState({ value: parseInt(value) })}
            />
          </Block>

          <Block flex={1} row>
            <Text
              style={{
                flex: 0.1,
                textAlignVertical: "center",
                transform: [{ rotate: "90deg" }]
              }}
            >
              {this.state.value}
            </Text>
            <Slider
              style={{
                flex: 0.9
              }}
              minimumValue={0}
              maximumValue={100}
              value={this.state.value}
              onValueChange={value => this.setState({ value: parseInt(value) })}
            />
          </Block>

          <Block flex={1} row>
            <Text
              style={{
                flex: 0.1,
                textAlignVertical: "center",
                transform: [{ rotate: "90deg" }]
              }}
            >
              {this.state.value}
            </Text>
            <Slider
              style={{
                flex: 0.9
              }}
              minimumValue={0}
              maximumValue={100}
              value={this.state.value}
              onValueChange={value => this.setState({ value: parseInt(value) })}
            />
          </Block>
        </Block>
      </ScrollView>
    );
  }
}
