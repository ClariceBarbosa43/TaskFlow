import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
 
import { MaterialIcons } from '@expo/vector-icons';
 
export default function App() {
  const [task, setTask] = useState('');
 
  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'Study React Native',
      completed: false,
    },
    {
      id: '2',
      title: 'Finish Assignment',
      completed: false,
    },
  ]);
 
  useEffect(() => {
    console.log('Component mounted!');
  }, []);
 
  function handleAddTask() {
    if (task.trim() === '') return;
 
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        title: task,
        completed: false,
      },
    ]);
 
    setTask('');
  }
 
  function handleToggleTask(id: string) {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }
 
  function handleDeleteTask(id: string) {
    setTasks(tasks.filter((item) => item.id !== id));
  }
 
  return (
    <View style={styles.container}>
 
      <View style={headerStyles.header}>
        <Text style={headerStyles.title}>TaskFlow</Text>
      </View>
 
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          placeholderTextColor="#888"
          value={task}
          onChangeText={setTask}
        />
 
        <TouchableOpacity
          style={styles.addButton}
          onPress={handleAddTask}
        >
          <MaterialIcons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
 
      {tasks.map((item) => (
        <View key={item.id} style={styles.taskRow}>
 
          <TouchableOpacity onPress={() => handleToggleTask(item.id)}>
            <MaterialIcons
              name={item.completed ? 'check-box' : 'check-box-outline-blank'}
              size={22}
              color={item.completed ? '#2E5BBA' : '#5A6472'}
            />
          </TouchableOpacity>
 
          <Text
            style={[
              styles.taskText,
              item.completed && styles.taskTextCompleted,
            ]}
          >
            {item.title}
          </Text>
 
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => handleDeleteTask(item.id)}
          >
            <MaterialIcons name="delete-outline" size={20} color="#C0392B" />
          </TouchableOpacity>
 
        </View>
      ))}
 
    </View>
  );
}
 
const headerStyles = StyleSheet.create({
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
 
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2A44',
  },
});
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
 
  inputRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
 
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
  },
 
  addButton: {
    backgroundColor: '#2E5BBA',
    borderRadius: 8,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
 
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
 
  taskText: {
    flex: 1,
    fontSize: 15,
    color: '#1F2A44',
  },
 
  taskTextCompleted: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
 
  deleteButton: {
    padding: 4,
  },
});