/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, FlatList, TextInput} from 'react-native';

type Props = {
  age: number;
  name: string;
};

type State = {
  data: [];
};

export default class App extends Component<Props, State> {


  constructor(props: P, context: any) {
    super(props, context);

    this.state = {
      data: [{username: 'dsa', id: '1'}, {username: 'dsa', id: '2'}]
    }
  }

  render() {                console.log('asdsda');

      return (
          <View>
              <FlatList
                  data={this.state.data}
                  renderItem={({item}) =>
                      <View>
                          <Text>{item.username}</Text>
                      </View>
                  }
                  keyExtractor={(item, index) => item.id}
              />
              <TextInput
                  onSubmitEditing={(event) => {
                      const text = event.nativeEvent.text;
                      console.log(text);
                      this.setState(state => {
                          let id = state.data.slice(-1)[0].id;
                          const data = state.data.concat([{
                              username: text,
                              id: (+id + 1).toString()
                          }]);
                          return {
                              data
                          };
                      });
                  }}
                  style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              />
          </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    color: "red"
  },
});
