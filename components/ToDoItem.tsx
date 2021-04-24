import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

export const ToDoItem: React.FC<{
  todo: string;
  deleteItem: Function;
}> = ({ todo, deleteItem }) => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoTextContainer}>
        <Text
          style={styles.sectionTitle}>
          {todo}
        </Text>
      </View>
      <Button
        onPress={() => deleteItem(todo)}
        title="done"
        color="#841584"
        accessibilityLabel="add todo item"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  todoContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
    backgroundColor: 'deepskyblue',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  todoTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
  }
});