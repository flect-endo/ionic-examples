# ionic-examples

## 前提条件

- Node, NPMをインストールがインストール済み
- cordova, ionic, gulp-cliをグローバルにインストール済み( ``npm install -g ...`` )

## 準備

- リポジトリをClone
- ionicプラグインインストール
- npmモジュールインストール

```
npm install
```

- bowerモジュールインストール

```
gulp install
```

- ionicプラットフォーム(iOS)を追加

```
ionic platform ios
```

- Sassビルド(オプション)

```
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
