import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../firebase';
import { collection, query, onSnapshot, orderBy, deleteDoc, doc } from 'firebase/firestore';

export default function MemoList({ navigation, route }) {
  // パラメータの取得
  const userId = route?.params?.userId;
  const [memoList, setMemoList] = useState([]);

  // newMemoという関数を定義
  const newMemo = () => {
    console.log('新規メモボタンが押されました！');
    navigation.navigate('MemoEdit', { userId, memo: null });
  };

  // メモ削除関数
  const onDelete = async (docId) => {
    try {
      const docRef = doc(db, 'users', userId, 'memos', docId);
      await deleteDoc(docRef);
      console.log('ドキュメントの削除に成功しました!');
    } catch (error) {
      console.error('ドキュメントの削除に失敗しました: ', error);
    }
  };

  // メモリストの取得
  useEffect(() => {
    if (!userId) return; // userId 未設定なら何もしない
    const memosCollectionRef = collection(db, 'users', userId, 'memos');
    const memosQuery = query(memosCollectionRef, orderBy('date', 'desc'));

    const unsubscribe = onSnapshot(memosQuery, (querySnapshot) => {
      const docs = querySnapshot.docs.map((d) => ({
        ...d.data(),
        docId: d.id,
      }));
      setMemoList(docs);
    });

    return unsubscribe;
  }, [userId]);

  // ヘッダーの設定
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
          <MaterialCommunityIcons name='logout' size={24} color='#5dacbd' />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderItem = ({ item }) => {
    // item を使う（未定義の memo は使わない）
    const title = item.text?.trim().split('\n')[0] || '（タイトルなし）';
    const dateText = item.date
      ? // Firestore Timestamp の想定
        typeof item.date.toDate === 'function'
        ? item.date.toDate().toLocaleDateString()
        : new Date(item.date).toLocaleDateString()
      : '';

    return (
      <View style={styles.memoCard}>
        <TouchableOpacity
          style={styles.memoContent}
          onPress={() =>
            navigation.navigate('MemoEdit', {
              userId,
              memo: item, // 編集時は既存の item を渡す
            })
          }
        >
          <Text style={styles.memoTitle} numberOfLines={2}>
            {title}
          </Text>
          <Text style={styles.memoDate}>{dateText}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(item.docId)}>
          <MaterialCommunityIcons name='trash-can-outline' size={22} color='#bbb' />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={memoList}
        renderItem={renderItem}
        keyExtractor={(item) => item.docId}
        contentContainerStyle={{ padding: 12 }}
      />

      <TouchableOpacity style={styles.newButton} onPress={newMemo}>
        <MaterialCommunityIcons name='plus' size={28} color='white' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },

  memoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    marginVertical: 6,
  },
  memoContent: {
    flex: 1,
    paddingRight: 8, // アイコンと被らないように余白
  },
  memoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  memoDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 6,
  },
  deleteButton: {
    padding: 8,
    marginLeft: 6,
  },
  newButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 40,
    right: 20,
    borderRadius: 50,
    height: 60,
    width: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    backgroundColor: '#5dacbd',
  },
});
