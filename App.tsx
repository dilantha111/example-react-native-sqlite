/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import { ToDoItem } from './components/ToDoItem';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const initTodos = ['go to shop', 'eat at least a one healthy foods', 'Do some exercises'];
  const [todos, setTodos] = useState(initTodos);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (!newTodo.trim()) return;
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  const deleteItem = (todo: string) => {
    setTodos([...todos.filter(i => i !== todo)]);
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic">
        <View style={[styles.appTitleView]}>
          <Text style={styles.appTitleText}> ToDo Application </Text>
        </View>

        <View>
          {todos.map(todo => (
            <ToDoItem key={todo} todo={todo} deleteItem={deleteItem} />
          ))}
        </View>
        <View style={styles.textInputContainer}>
          <TextInput style={styles.textInput} value={newTodo} onChangeText={text => setNewTodo(text)} />
          <Button
            onPress={addTodo}
            title="Add ToDo"
            color="#841584"
            accessibilityLabel="add todo item"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appTitleView: {
    marginTop: 20,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  appTitleText: {
    fontSize: 24,
    fontWeight: '800'
  },
  textInputContainer: {
    marginTop: 30,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'flex-end'
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    margin: 10,
    backgroundColor: 'pink'
  },
});

export default App;
