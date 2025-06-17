# 🌟 Cosmos Framework v1.3.0
選擇你熟悉的語言：( 目前僅提供 英語 / 中文 )  
[英語](../../README.md)

像推積木一樣編程的詩意 JavaScript 框架，讓代碼變成美麗的積木組合。

Cosmos 是一個為創造者設計的 JavaScript 框架。我們相信編寫程式碼應該像孩子玩積木一樣直觀、充滿樂趣和詩意。每個功能都是一塊精緻的積木，你只需要發揮想像力，將它們堆疊起來，就能創造出任何你想要的應用。

## 🧩 積木式編程哲學

在 Cosmos 的世界裡，你不需要學習複雜的語法或設計模式。
```javascript
// 每一行都是一塊積木，組合起來就是一個完整的應用  
new Cosmos.App()  
    .title('我的應用')        // 🏷️ 放上標題積木  
    .input('姓名')            // 📝 放上輸入積木  
    .required('請輸入姓名')   // ✅ 加上驗證積木  
    .button('提交')           // 🔲 疊上按鈕積木  
    .onValid('成功！')        // 🎉 最後是成功積木  
    .start();                // 🚀 啟動！  
```

## ✨ 核心特色

- **直觀組合**：每個功能都是獨立的積木，想要什麼就加什麼。
- **零學習負擔**：API 設計極度簡潔，一看就懂，專注於創造而非記憶。
- **即時生效**：每放一塊積木，立刻就能看到效果，享受即時回饋的樂趣。
- **智能連動**：積木之間會自動配合，例如驗證積木會自動與按鈕積木連動。

## 🚀 快速開始

在 5 分鐘內，用積木打造你的第一個應用！

### 1. 準備積木盒 (HTML)
```html
<!-- 引入 cosmos.js -->
<script src="dist/cosmos.min.js"></script>

<!-- 準備一個預設容器給 Cosmos -->
<div id="cosmos-app"></div>
```
### 2. 開始堆積木 (JavaScript)
```javascript
// 使用 cosmos-app 預設容器
new Cosmos.App()
    .title('我的第一個積木作品')
    .text('積木真好玩！')
    .button('再來一塊積木')
    .onClick('積木疊好了！')
    .start();
```
### 3. 試著秀一下你的佈局創意 (HTML)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cosmos</title>
</head>
<body>
    <!-- cosmos-app 雖然是預設容器，我們歡迎你自己創建容器 -->
    <div id="header"></div>
    <div id="sidebar"></div>
    <div id="main"></div>


    <!-- 可以選擇引入 CDN 文件 -->
    <script src="cdn path"></script>
    <!-- 或者選擇下載文件 -->
    <script src="dist/cosmos.min.js"></script>

    <script>
        Cosmos.create('header')
            .title('頂部區域')
            .start();

        Cosmos.create('sidebar')
            .title('側邊欄')
            .start();

        Cosmos.create('main')
            .title('主要內容')
            .start();
    </script>
</body>
</html>
```
想了解更多？請閱讀我們的 入门指南 (Getting Started)。

## 🎨 積木組合範例

### 經典組合：用戶註冊
透過組合 `.input`, `.required`, 和 `.onValid` 等積木，可以輕鬆打造一個功能完整的註冊表單。
👉 **[查看完整的「用戶註冊」範例](api文件.md#範例-2)**

### 創意組合：邏輯判斷
使用 `.when`, `.then`, 和 `.otherwise` 積木，可以用聲明式的方式處理複雜的條件邏輯。
👉 **[查看完整的「邏輯判斷」範例](api文件.md#範例-4)**

### 🌐 新功能：API 通訊積木
現在你可以輕鬆與後端服務互動！使用 `.GET`, `.POST`, `.PUT`, `.DELETE` 等積木：

```javascript
// 獲取用戶資料
new Cosmos.App()
    .GET('https://api.example.com/users/1')
    .onSuccess('歡迎 {name}！您來自 {address.city}')
    .onError('載入失敗：{error}');

// 提交表單資料
Cosmos.create('form')
    .title('聯絡我們')
    .input('請輸入姓名')
    .input('請輸入郵箱')
    .button('送出')
    .onClick(() => {
        new Cosmos.App()
            .POST('https://api.example.com/contact')
            .onSuccess('謝謝您的訊息！')
            .onError('送出失敗：{error}');
    })
    .start();
```

想看所有積木的功能嗎？請查閱完整的 [API 技術文件](api文件.md)

## 🌈 未來積木計畫 (Roadmap)

Cosmos 的宇宙正在不斷擴張！我們正在努力打造更強大的積木：

### ✅ 已完成功能
- **API 通訊積木**: `.GET()`, `.POST()`, `.PUT()`, `.DELETE()` 等 HTTP 方法
- **回應處理積木**: `.onSuccess()`, `.onError()`, `.onLoading()` 等回應處理
- **模板字符串**: 支援 `{name}` 和 `{user.name}` 格式的動態內容替換
- **自動表單收集**: POST/PUT 請求自動收集表單數據

### 🚧 開發中功能
- **UI 元素積木**: `.card()`, `.modal()`, `.navbar()`, `.table()`
- **資料庫連結**: 提供簡易介面，連接 Firebase、LocalStorage 等服務
- **核心功能增強**: `.function()` 讓開發者定義可重複使用的邏輯積木

### 🎯 API 通訊功能特色
- **零配置**: 無需複雜設定，直接使用
- **智能錯誤處理**: 自動捕獲網路錯誤和 HTTP 狀態碼錯誤
- **模板字符串**: 支援嵌套對象屬性訪問
- **表單整合**: 自動收集並發送表單數據
- **鏈式調用**: 保持 Cosmos 一貫的積木式 API 設計

## 📞 積木社群
- 📖 API 技術文件
- 💡 功能討論
- 🐞 回報問題

---

### 🧩 像玩積木一樣編程，讓創意無限延伸！