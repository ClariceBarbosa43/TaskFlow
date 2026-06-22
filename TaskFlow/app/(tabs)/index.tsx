import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.wrapper}>
      
      <Text style={styles.header}>TaskFlow</Text>

      <TextInput
        style={styles.taskInput}
        placeholder="Enter Task"
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      <View style={styles.listContainer}>
        <Text style={styles.taskItem}>☐ Study React Native</Text>
        <Text style={styles.taskItem}>☐ Finish Assignment</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  taskInput: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    padding: 12,
  },

  addButton: {
    marginTop: 12,
    marginBottom: 20,
    backgroundColor: '#0066CC',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },

  listContainer: {
    gap: 10,
  },

  taskItem: {
    fontSize: 16,
  },
});