/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useCallback, useEffect, useState } from 'react';
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

import { ToDoItemComponent } from './components/ToDoItem';
import { ToDoItem } from './models';
import { getDBConnection, getTodoItems, saveTodoItems, createTable, deleteTodoItem } from './services/db-service';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const loadDataCallback = useCallback(async () => {
    try {
      const initTodos = [{ id: 0, value: 'go to shop' }, { id: 1, value: 'eat at least a one healthy foods' }, { id: 2, value: 'Do some exercises' }];
      const db = await getDBConnection();
      await createTable(db);
      const storedTodoItems = await getTodoItems(db);
      if (storedTodoItems.length) {
        setTodos(storedTodoItems);
      } else {
        await saveTodoItems(db, initTodos);
        setTodos(initTodos);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback();
  }, [loadDataCallback]);

  const addTodo = async () => {
    if (!newTodo.trim()) return;
    try {
      const newTodos = [...todos, {
        id: todos.length ? todos.reduce((acc, cur) => {
          if (cur.id > acc.id) return cur;
          return acc;
        }).id + 1 : 0, value: newTodo
      }];
      setTodos(newTodos);
      const db = await getDBConnection();
      await saveTodoItems(db, newTodos);
      setNewTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id: number) => {
    try {
      const db = await getDBConnection();
      await deleteTodoItem(db, id);
      todos.splice(id, 1);
      setTodos(todos.slice(0));
    } catch (error) {
      console.error(error);
    }
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
          {todos.map((todo) => (
            <ToDoItemComponent key={todo.id} todo={todo} deleteItem={deleteItem} />
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
