# ionic-examples

## 前提条件

- Node, NPMをインストールがインストール済み
- cordova, ionic, gulp-cliをグローバルにインストール済み( ``npm install -g ...`` )

## 準備

- Clone
- ionicプラットフォームを追加

```
ionic platform ios
```

- Sassビルド(オプション)

```
npm install
gulp sass
```

## 実行(ブラウザ)

```
ionic serve
```

## ビルド & 実行(iOS)

```
ionic build ios
ionic emulate ios
```
