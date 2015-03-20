# ionic-examples

## 前提条件

- Node, NPMをインストールがインストール済み
- cordova, ionic, gulp-cliをグローバルにインストール済み( ``npm install -g ...`` )

## 準備

- リポジトリをClone
- npmモジュールインストール

```
npm install
```

- bowerモジュールインストール

```
gulp install
```

- ionicプラグインインストール

```
gulp ionic-plugin-install
```

FIXME: ``package.json`` の中身を見てインストールしているが、
公式プラグイン以外は追加しても ``package.json`` にセットされないので、
うまくインストールされない。

- ionicプラットフォーム(iOS)を追加

```
ionic platform ios
```

- Sassビルド(オプション)

```
gulp sass
```

## 新しく.jsファイルを追加した時

``index.html`` でインクルードさせるために下記タスクを実行する

```
gulp index
```

## 実行(ブラウザ)

```
ionic serve (--lab)
```

## ビルド & 実行(iOSシミュレータ)

```
ionic build ios
ionic emulate ios
```
