# task-app

docker上でクライアントサイドからサーバー側のAPIを実行する

demoアプリ

# イメージ

<img width="240" alt="スクリーンショット 2022-11-08 16 50 04" src="https://user-images.githubusercontent.com/117497274/200506137-ee9707d5-6ddd-44af-918b-bc76431cac93.png">

# 使用技術
- Docker
- Next.js 13 (client)
- FastAPI    (server)
- MySQL      (db)

# 使用方法
1. clientフォルダにある.envファイルに必要な変数を記載する
1. make run app コマンドでdockerコンテナを起動する
1. make setup コマンドでprisma、databaseのtableを作成する
1. http://localhost:3000 にアクセス