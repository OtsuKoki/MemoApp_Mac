import React, { useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function MemoEdit({ navigation }) {
  // cancelという関数を定義
  const cancel = () => {
    console.log('キャンセルボタンが押されました！');
    navigation.navigate('MemoList');
  };
  // saveという関数を定義
  const save = () => {
    console.log('保存ボタンが押されました！');
    navigation.navigate('MemoList');
  };

  return (
    <View style={styles.container}>
      <View style={styles.topButtons}>
        <TouchableOpacity style={styles.cancelButton} onPress={cancel}>
          <Text style={styles.cancelText}>キャンセル</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.saveButton} onPress={save}>
          <Text style={styles.saveText}>保存</Text>
        </TouchableOpacity>
      </View>

      <TextInput style={styles.textInput} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb', // 少し柔らかい白
    paddingHorizontal: 20,
    paddingTop: 80,
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 43,
    width: 300,
    backgroundColor: '#F5F5F6', //白
    borderRadius: 10,
  },

  topButtons: {
    flexDirection: 'row', // 横並び
    justifyContent: 'space-between', // 両端に配置
    marginBottom: 20, // TextInputとの間隔
  },
  cancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 120,
    borderRadius: 10,
    backgroundColor: '#f28b82',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },

  saveButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 120,
    borderRadius: 10,
    backgroundColor: '#5dacbd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },

  textInput: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 40, // 下の余白を少し空ける
  },
});
