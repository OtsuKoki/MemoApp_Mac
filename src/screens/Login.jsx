import { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert, // アラートを表示するコンポーネント
} from 'react-native';
import { auth } from '../../firebase';
// ログインと新規登録に使用するコンポーネント
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

export default function Login({ navigation }) {
  //状態管理
  const [mail, setMail] = useState('');
  const [pass, setpass] = useState('');

  // loginという関数を定義
  const login = () => {
    console.log('ログインボタンが押されました！');
    navigation.navigate('MemoList', { userId: 'test@mail.com' });
  };

  // ユーザの新規登録を行う関数
  const createUser = async () => {
    try {
      // 登録処理の実行
      await createUserWithEmailAndPassword(auth, mail, pass);
      console.log('ユーザー登録成功');
      navigation.navigate('MemoList');
    } catch (err) {
      // エラー時の処理
      console.error('エラー:', err.code);
      Alert.alert('エラー', '新規登録に失敗しました');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputArea}>
        <TextInput
          style={styles.textInput}
          value={mail}
          autoCorrect={false}
          onChangeText={(text) => {
            setMail(text);
          }}
          placeholder='メールアドレス'
        />
        <TextInput
          style={styles.textInput}
          value={pass}
          onChangeText={setpass}
          placeholder='パスワード'
        />
      </View>
      {/* ログインボタンのonPressにlogin関数を指定 */}
      <TouchableOpacity style={[styles.button, styles.loginButton]} onPress={login}>
        <Text style={[styles.loginText, styles.creaateUserButton]}>ログイン</Text>
      </TouchableOpacity>
      {/* ログインボタンのonPressにcreateuser関数を指定 */}
      <TouchableOpacity style={[styles.button, styles.createUserButton]} onPress={createUser}>
        <Text style={styles.createUserText}>新規登録</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d4e4e7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputArea: {
    margin: 20, // 要素の外側の余白
  },
  textInput: {
    margin: 7,
    paddingHorizontal: 10, // 要素の内側の余白（左右）
    height: 43, // 高さ
    width: 320, // 幅
    borderRadius: 6, // 要素の境界の外側の角を丸める
    backgroundColor: '#eee',
    fontSize: 18, // 文字の大きさ
  },
  // 共通スタイルは「サイズ・角丸・中央揃え」にしてみる
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 43,
    width: 300,
    // backgroundColor: "#F5F5F6", // ボタンの背景色は個別ボタンで指定する
    borderRadius: 10,
  },
  loginButton: {
    backgroundColor: '#5dacbd',
    marginBottom: 10,
  },
  createUserButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#5dacbd',
    marginBottom: 10,
  },
  loginText: {
    color: 'white', // 文字の色
    fontWeight: 'bold', // 文字の太さ
    fontSize: 16,
  },
  createUserText: {
    color: '#555',
  },
});
