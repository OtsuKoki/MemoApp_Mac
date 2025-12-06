import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import { doc, updateDoc, addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

export default function MemoEdit({ navigation, route }) {
  const { userId, memo } = route.params;
  const [text, setText] = useState('');

  // 編集の場合は初期値をセット
  useEffect(() => {
    if (memo) {
      setText(memo.text);
    }
  }, [memo]);

  // キャンセル
  const cancel = () => {
    console.log('キャンセルボタンが押されました！');
    navigation.goBack();
  };

  // 保存
  const save = async () => {
    if (!text.trim()) {
      Alert.alert('メモが空です', '内容を入力してください。');
      return;
    }

    try {
      if (memo?.docId) {
        // --- 編集（上書き）
        const memoRef = doc(db, 'users', userId, 'memos', memo.docId);
        await updateDoc(memoRef, {
          text: text,
          updatedAt: new Date(),
        });
        console.log('メモ更新完了');
      } else {
        // --- 新規作成
        await addDoc(collection(db, 'users', userId, 'memos'), {
          text: text,
          updatedAt: new Date(),
        });
        console.log('新規メモ作成完了');
      }

      navigation.goBack();
    } catch (err) {
      console.error('メモ保存に失敗:', err);
    }
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

      <TextInput
        style={styles.textInput}
        value={text}
        onChangeText={setText}
        multiline
        textAlignVertical='top'
        autoFocus
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 20,
    paddingTop: 80,
  },

  topButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },

  cancelButton: {
    height: 45,
    width: 120,
    borderRadius: 10,
    backgroundColor: '#f28b82',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  saveButton: {
    height: 45,
    width: 120,
    borderRadius: 10,
    backgroundColor: '#5dacbd',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },

  textInput: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    fontSize: 18,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
});
