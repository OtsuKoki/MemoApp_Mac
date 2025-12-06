// 必要なSDKから必要な関数をインポートする。
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; // 追加
import { getFirestore } from 'firebase/firestore'; // 追加

// ウェブアプリのFirebase設定
const firebaseConfig = {
  apiKey: 'AIzaSyClu0DL6bk6g1nOpQUCoAqMDqStSXuEvH0',
  authDomain: 'cloudmemo-d4bde.firebaseapp.com',
  projectId: 'cloudmemo-d4bde',
  // storageBucket: 'cloudmemo-d4bde.firebasestorage.app',
  storageBucket: 'cloudmemo-d4bde.appspot.com', // ←ここを修正！
  messagingSenderId: '649440446701',
  appId: '1:649440446701:web:9937e7f80087a8096524e4',
};

// Firebaseの初期化
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app); // 追加
export const db = getFirestore(app); // 追加
