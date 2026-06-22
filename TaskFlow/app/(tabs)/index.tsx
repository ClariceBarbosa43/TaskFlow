import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

export default function HomeScreen() {
  return (
    <View style={styles.wrapper}>

      <Text style={styles.header}>TaskFlow</Text>

      <TextInput
        placeholder="Enter Task"
        placeholderTextColor="#888"
        style={styles.taskInput}
      />

      <TouchableOpacity style={styles.addButton}>
        <MaterialIcons
          name="add"
          size={22}
          color="#fff"
        />
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>

      <View style={styles.listContainer}>

        <View style={styles.taskRow}>
          <MaterialIcons
            name="check-box-outline-blank"
            size={22}
            color="#5A6472"
          />
          <Text style={styles.taskItem}>
            Study React Native
          </Text>
        </View>

        <View style={styles.taskRow}>
          <MaterialIcons
            name="check-box"
            size={22}
            color="#2E5BBA"
          />
          <Text style={styles.taskItem}>
            Finish Assignment
          </Text>
        </View>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },

  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  taskInput: {
    borderWidth: 1,
    borderColor: '#d3d3d3',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
  },

  addButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#0066CC',
    padding: 12,
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 20,
  },

  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  listContainer: {
    gap: 12,
  },

  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  taskItem: {
    fontSize: 16,
  },
});