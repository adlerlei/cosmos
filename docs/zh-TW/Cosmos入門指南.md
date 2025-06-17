# 🚀 入門指南：5 分鐘打造你的第一個 Cosmos 應用

歡迎來到 Cosmos 的世界！本指南將帶你一步一步，用積木堆疊出你的第一個應用程式。

## 步驟 1：準備 HTML 文件

首先，建立一個 HTML 檔案（例如 `index.html`），並在其中放入以下內容：

```html
<!DOCTYPE html>
<html lang="zh-Hant">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>我的第一個 Cosmos 應用</title>
</head>
<body>
    <!-- 預設容器 -->
    <div id="cosmos-app"></div>
    
    <!-- 或自定義容器 -->
    <div id="my-app"></div>
    
    <script src="cosmos.js"></script>
    <script>
        // 使用預設容器
        new Cosmos.App()
            .title('Hello')
            .start();
        
        // 使用自定義容器
        Cosmos.create('my-app')
            .title('Custom')
            .start();
    </script>
</body>
</html>
```html
    <div id="my-app"></div>
    
    <script src="cosmos.js"></script>
    <script>
        // 使用預設容器
        new Cosmos.App()
            .title('Hello')
            .start();
        
        // 使用自定義容器
        Cosmos.create('my-app')
            .title('Custom')
            .start();
    </script>
</body>
</html>
```
容器使用概念：
```javascript
// 應用實例創建
// 方法1：構造函數（使用預設容器 #cosmos-app）
new Cosmos.App()

// 方法2：工廠方法（推薦，可指定容器）
Cosmos.create('container-id')

// 方法3：手動指定容器
new Cosmos.App()
    .setContainer('container-id')
```

容器管理系統：

```javascript
// 多容器應用範例
Cosmos.create('header').title('頂部區域').start();
Cosmos.create('sidebar').title('側邊欄').start();
Cosmos.create('main').title('主要內容').start();
```


**關鍵點：**
- 我們需要一個 `<div>` 元素並給它一個 id (例如預設 `cosmos-app`)，cosmos 將會在這個容器裡搭建我們的應用。
- `cosmos.js` 的路徑需要根據你的專案結構做調整。

## 步驟 2：堆疊你的第一組積木

現在，讓我們在最後一個 `<script>` 標籤中開始堆疊積木：

```javascript
// 建立一個新的 Cosmos 應用實例
new Cosmos.App()
    // 告訴 Cosmos 要在哪個容器裡搭建 (#app)
    .setContainer('app')

    // 接下來，開始放積木...
    .title('我的第一個積木作品')      // 🏷️ 放上標題積木
    .text('用積木寫程式真的很有趣！')  // 📄 放上文字積木
    .text('支援 HTML: <strong>粗體</strong>')
    .color('blue')                   // 🎨 改變顏色
    .button('點我看看')              // 🔲 放上按鈕積木
    .onClick('你好，Cosmos！')       // 🎉 設定點擊後顯示的訊息

    // 最後，啟動應用，讓所有積木組合起來！
    .start();
```

## 步驟 3：在瀏覽器中打開

儲存你的 `index.html` 檔案，然後直接在瀏覽器中打開它。你將會看到由積木創造出來的應用程式！

恭喜你！你已經成功掌握了 Cosmos 的基礎。現在，你可以開始探索更多有趣的積木了！

## 步驟 4：進階功能 - API 通訊

Cosmos 還提供了強大的 API 通訊功能，讓你輕鬆與後端服務互動：

### 基本 API 請求
```javascript
new Cosmos.App()
    .title('API 通訊範例')
    .button('獲取用戶資料')
    .onClick(() => {
        // 創建新的 API 實例
        new Cosmos.App()
            .GET('https://jsonplaceholder.typicode.com/users/1')
            .onLoading('正在載入...')
            .onSuccess('歡迎 {name}！您來自 {address.city}')
            .onError('載入失敗：{error}');
    })
    .start();
```

### 表單提交
```javascript
Cosmos.create('contact-form')
    .title('聯絡表單')
    .input('請輸入您的姓名')
    .input('請輸入您的郵箱')
    .button('送出')
    .onClick(() => {
        new Cosmos.App()
            .POST('https://api.example.com/contact')
            .onSuccess('謝謝您的訊息！')
            .onError('送出失敗：{error}');
    })
    .start();
```

### 支援的 HTTP 方法
- `.GET(url)` - 獲取資料
- `.POST(url, data?)` - 創建資料
- `.PUT(url, data?)` - 更新資料
- `.DELETE(url)` - 刪除資料

### 回應處理方式
- `.onSuccess(handler)` - 成功時的處理
- `.onError(handler)` - 錯誤時的處理
- `.onLoading(handler)` - 載入時的處理

## 下一步？

- 想看看所有可用的積木嗎？請查閱 [API 技術文件](api文件.md)
- 對專案的未來感到好奇？看看我們的 [README](README.md)
- 想要更多範例？查看 `examples/` 目錄中的範例檔案