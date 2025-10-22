import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function MemoList({ navigation, route }) {
  // パラメータの取得
  // const userId = route.params.userId;

  // newMemoという関数を定義
  const newMemo = () => {
    console.log('新規メモボタンが押されました！');
    navigation.navigate('MemoEdit', { userId: 'test@mail.com' });
  };

  //ヘッダーの設定;
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
            <MaterialCommunityIcons name='logout' size={24} color='#5dacbd' />
          </TouchableOpacity>
        );
      },
    });
  }, [navigation]);

  const test = 'テスト';
  const MEMO = [
    { id: '1', text: '買い物リスト1', Updatedate: '2025/10/1' },
    { id: '2', text: '買い物リスト2', Updatedate: '2025/10/2' },
    { id: '3', text: '買い物リスト3', Updatedate: '2025/10/3' },
  ];
  const renderItem = ({ item }) => {
    return (
      <View style={styles.memoCard}>
        <View>
          <Text style={styles.memoTitle}>{item.text}</Text>
          <Text style={styles.memoDate}>{item.Updatedate}</Text>
        </View>
        <TouchableOpacity style={styles.deleteButton}>
          <MaterialCommunityIcons name='trash-can-outline' size={22} color='#bbb' />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={MEMO}
        renderItem={renderItem}
        keyExtractor={(item, index) => {
          return index.toString();
        }}
      />

      <TouchableOpacity style={styles.newButton} onPress={newMemo}>
        <MaterialCommunityIcons name='plus' size={28} color='white' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  memoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  memoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },

  memoDate: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  //削除ボタン
  deleteButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // これを設定することで、他のコンポーネントに邪魔されず固定することができます。
    top: 5, // 要素が起点の上からどれだけ離れているかを示します
    right: 5, // 要素が起点の右からどれだけ離れているかを示します
    borderRadius: 50, // 要素の境界の外側の角を丸める。
    height: 50,
    width: 50,
    // backgroundColor: '#5dacbd', //ターコイズ
    // marginBottom: 10,
  },

  //新規ボタン
  newButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute', // これを設定することで、他のコンポーネントに邪魔されず固定することができます。
    bottom: 40, // 要素が起点の下からどれだけ離れているかを示します
    right: 20, // 要素が起点の右からどれだけ離れているかを示します
    borderRadius: 50, // 要素の境界の外側の角を丸める。
    height: 60,
    width: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,

    backgroundColor: '#5dacbd',
  },
  newText: {
    // color: 'white', // 文字の色
    fontWeight: 'bold', // 文字の太さ
    fontSize: 16,
  },
});
