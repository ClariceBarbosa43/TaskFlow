import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ToastAndroid,
  Alert,
  Platform,
} from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';

type Task = {
  id: string;
  title: string;
  completed: boolean;
  created_at?: string;
};

export default function App() {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    loadTasks();
  }, []);

  function showToast(message: string) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert(message);
    }
  }

  async function loadTasks() {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      showToast('Failed to load tasks');
      console.log(error.message);
      return;
    }

    setTasks((data as Task[]) || []);
  }

  async function addTask() {
    if (!task.trim()) {
      showToast('Please enter a task');
      return;
    }

    const { error } = await supabase.from('tasks').insert([
      {
        title: task.trim(),
        completed: false,
      },
    ]);

    if (error) {
      showToast('Failed to add task');
      return;
    }

    setTask('');
    showToast('Task added');
    loadTasks();
  }

  async function toggleTask(item: Task) {
    const { error } = await supabase
      .from('tasks')
      .update({ completed: !item.completed })
      .eq('id', item.id);

    if (error) {
      showToast('Update failed');
      return;
    }

    showToast(item.completed ? 'Marked as pending' : 'Task completed');
    loadTasks();
  }

  async function deleteTask(id: string) {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id);

    if (error) {
      showToast('Delete failed');
      return;
    }

    showToast('Task deleted');
    loadTasks();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TaskFlow</Text>

      {/* INPUT */}
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          value={task}
          onChangeText={setTask}
        />

        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.taskRow}
            onPress={() => toggleTask(item)}
            onLongPress={() => deleteTask(item.id)}
          >
            <MaterialIcons
              name={item.completed ? 'check-box' : 'check-box-outline-blank'}
              size={22}
              color={item.completed ? '#2eba61' : '#666'}
            />

            <Text
              style={[
                styles.taskText,
                item.completed && styles.completedText,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
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
    backgroundColor: '#58ba2e',
    borderRadius: 8,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },

  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },

  taskText: {
    fontSize: 16,
    marginLeft: 10,
  },

  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
});