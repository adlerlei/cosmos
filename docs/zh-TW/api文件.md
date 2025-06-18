# 🔧 Cosmos 框架 API 技術文件 (v1.4.1)
對 Cosmos 還不熟悉嗎？建議從 [**README**](README.md) 開始，或跟著 [**入門指南**](Cosmos入門指南.md) 一步步學習。


這份文件是 Cosmos 框架的完整 API 參考指南，包含了所有可用的「積木」及其用法。

## ✅ 核心 API

### 1. UI 元件積木

這是框架的基礎，您可以像堆積木一樣，依序建立使用者介面。

| 元素 | 方法 | 說明 |
|---------|---------|-------------|
| 標題 | `.title('標題文字')` | 設置應用的主標題 |
| 文字 | `.text('內容')` | 顯示一段靜態文字 |
| 輸入框 | `.input('提示文字')` | 建立一個文字輸入框 |
| 按鈕 | `.button('按鈕文字')` | 建立一個可點擊的按鈕 |
| 圖片 | `.image('網址', 寬度, 高度, 'alt')` | 顯示一張圖片，支援靈活尺寸設定 |
| 下拉選單 | `.select(['選項A', '選項B'])` | 建立一個下拉式選單 |
| 勾選框 | `.checkbox('標籤')` | 建立一個勾選框 |
| 滑桿 | `.slider(最小值, 最大值, 預設值)` | 建立一個可拖動的滑桿 |

#### 範例：
```javascript
new Cosmos.App()
    .title('聯絡我們')
    .image('https://placehold.co/600x200/4285f4/ffffff?text=Cosmos', 600, 200, '頁首圖片')
    .input('您的姓名')
    .select(['技術支援', '業務合作', '其他'])
    .checkbox('訂閱我們的電子報')
    .button('送出')
    .start();
```
```

### 2. 樣式與動畫積木

改變元件的外觀與動態效果。

| 功能 | 方法 | 說明 |
|----------|---------|-------------|
| 佈局 | `.layout('row' 或 'col')` | 改變後續元素的排列方式（水平或垂直）|
| 顏色 | `.color('顏色名')` | 改變後續元素的預設顏色（支援：blue, green, red, purple, orange, pink）|
| 動畫 | `.animate('動畫名')` | 為前一個被建立的元素加上動畫（支援：fadeIn, slideIn, bounce, pulse）|

#### 範例：
```javascript
new Cosmos.App()
    .title('彩色動畫積木')
    .color('red')
    .button('紅色的按鈕').animate('pulse') // 為紅色按鈕加上 pulse 動畫
    .layout('row')
    .color('green')
    .text('並排的綠色文字')
    .button('綠色按鈕').animate('bounce')
    .start();
```
```

### 3. 表單驗證積木

為 `input` 或 `select` 元素添加多種驗證規則，會在使用者輸入時即時顯示錯誤訊息。

| 驗證規則 | 方法 | 
|----------------|--------|
| 必填 | `.required('錯誤訊息')` |
| Email格式 | `.email('錯誤訊息')` |
| 最小長度 | `.minLength(長度, '錯誤訊息')` |
| 最大長度 | `.maxLength(長度, '錯誤訊息')` |
| 數字格式 | `.numeric('錯誤訊息')` |
| 自訂格式 | `.pattern(正則表達式, '錯誤訊息')` |

#### 處理驗證結果：
* `.onValid(action)`: 所有驗證通過後，點擊按鈕時觸發的動作（可以是訊息字串或函式）
* `.onInvalid(action)`: 任何驗證失敗後，點擊按鈕時觸發的動作

#### 範例：
```javascript
new Cosmos.App()
    .title('用戶註冊')
    .input('用戶名').required('用戶名為必填').minLength(3, '用戶名至少需要3個字元')
    .input('Email').required().email('請輸入有效的 Email 地址')
    .button('註冊')
    .onValid('太棒了，所有資料都正確！')
    .onInvalid('請修正表單中紅色的錯誤提示')
    .start();
```

### 4. 事件處理積木

定義當特定事件發生時要執行的動作。

* `.onClick(action)` 或 `.buttonClick(action)`: 綁定在最後一個按鈕上。`action` 可以是字串或函式 `function(values){...}`。函式會接收到所有表單的值。
* `.onChange(action)`: 綁定在最後一個輸入元件上（`input`、`select`、`checkbox`、`slider`）。`action` 可以是字串或函式 `function(value){...}`。函式會接收到該元件的新值。

#### 範例：
```javascript
new Cosmos.App()
    .title('事件處理')
    .input('您的名字').onChange(function(name) {
        console.log(`名字變成了: ${name}`);
    })
    .button('打招呼')
    .onClick(function(values) {
        // 'values' 物件會是 { "您的名字": "使用者輸入的內容" }
        alert(`你好, ${values['您的名字']}!`);
    })
    .start();
```

### 5. 條件邏輯積木

取代傳統的 `if/else`，讓邏輯鏈更清晰。邏輯會在綁定的按鈕被點擊時觸發。

| 邏輯 | 方法 | 說明 |
|-------------|-------------|-------------|
| 條件 | `.when(欄位, 運算子, 值)` | 開始一個條件判斷 |
| 且 | `.and(欄位, 運算子, 值)` | 附加一個「且」條件 |
| 或 | `.or(欄位, 運算子, 值)` | 附加一個「或」條件 |
| 則 | `.then(action)` | 條件成立時執行 |
| 否則(when) | `.else(action)` | 當 `when` 條件不成立時執行 |
| 否則(all) | `.otherwise(action)` | 所有 `.when` 條件都不成立時執行 |

支援的運算子：`==`、`!=`、`>`、`<`、`>=`、`<=`、`includes`、`empty`

#### 範例：
```javascript
new Cosmos.App()
    .input('年齡').numeric('請輸入數字') 
    .button('提交') 
    .when('年齡', '>=', 18).then('您是成年人') 
    .when('年齡', '<', 18).then('您是未成年人')
    .otherwise('請輸入有效的年齡') 
    .start();
```
```

## 🌐 API 通訊積木

Cosmos 提供了完整的 API 通訊功能，讓你能夠輕鬆與後端服務進行互動。

### 核心 HTTP 方法

#### `.GET(url)`
發送 GET 請求到指定 URL，用於獲取資料。

```javascript
// 基本用法
new Cosmos.App()
    .GET('https://jsonplaceholder.typicode.com/users/1')
    .onSuccess('歡迎 {name}！您來自 {address.city}')
    .onError('載入失敗：{error}');
```

#### `.POST(url, data?)`
發送 POST 請求到指定 URL，用於創建新資料。如果不提供 data 參數，會自動收集表單資料。

```javascript
// 自動收集表單資料
Cosmos.create('form-app')
    .title('發布文章')
    .input('請輸入標題')
    .input('請輸入內容')
    .button('發布')
    .onClick(() => {
        new Cosmos.App()
            .POST('https://jsonplaceholder.typicode.com/posts')
            .onSuccess('文章發布成功！ID: {id}')
            .onError('發布失敗：{error}');
    })
    .start();

// 手動提供資料
new Cosmos.App()
    .POST('https://api.example.com/users', {
        name: '張三',
        email: 'zhang@example.com'
    })
    .onSuccess('用戶 {name} 創建成功！')
    .start();
```

#### `.PUT(url, data?)`
發送 PUT 請求到指定 URL，用於更新現有資料。

```javascript
new Cosmos.App()
    .PUT('https://api.example.com/users/123', {
        name: '新名稱',
        email: 'new@example.com'
    })
    .onSuccess('用戶資料更新成功')
    .onError('更新失敗：{error}');
```

#### `.DELETE(url)`
發送 DELETE 請求到指定 URL，用於刪除資料。

```javascript
new Cosmos.App()
    .DELETE('https://api.example.com/users/123')
    .onSuccess('用戶刪除成功')
    .onError('刪除失敗：{error}');
```

### 回應處理積木

#### `.onSuccess(handler)`
定義成功回應的處理方式。支援三種格式：

**1. 字串模板格式**
使用 `{key}` 語法來插入 API 回應中的資料，支援嵌套對象（如 `{user.name}`）。
```javascript
.onSuccess('歡迎 {name}！您的郵箱是 {email}')
.onSuccess('用戶來自 {address.city}，公司是 {company.name}')
```

**2. 函數格式**
接收完整的 API 回應資料，可進行複雜的處理邏輯。
```javascript
.onSuccess((data) => {
    console.log('收到資料：', data);
    alert(`歡迎 ${data.name}！`);
    // 可以進行更複雜的邏輯處理
    if (data.role === 'admin') {
        window.location.href = '/admin';
    }
})
```

**3. 目標元素格式**
將處理結果直接插入到指定的 HTML 元素中。
```javascript
.onSuccess({
    target: 'result-div',
    template: '載入完成！用戶：{name}'
})
```

#### `.onError(handler)`
定義錯誤回應的處理方式。支援與 `.onSuccess()` 相同的三種格式。

```javascript
// 字串模板格式
.onError('請求失敗：{error}')

// 函數格式
.onError((error) => {
    console.error('API 錯誤：', error);
    // 可以根據錯誤類型進行不同處理
    if (error.error.includes('404')) {
        alert('找不到資源');
    }
})

// 目標元素格式
.onError({
    target: 'error-div',
    template: '❌ 錯誤：{error}'
})
```

#### `.onLoading(handler)`
定義載入狀態的處理方式，在 API 請求開始時觸發。

```javascript
// 字串格式
.onLoading('正在載入資料，請稍候...')

// 函數格式
.onLoading(() => {
    document.getElementById('spinner').style.display = 'block';
    document.getElementById('submit-btn').disabled = true;
})
```

### 實用範例

#### 範例 1：用戶資料獲取
```javascript
Cosmos.create('user-info')
    .title('用戶資料')
    .button('獲取我的資料')
    .onClick(() => {
        new Cosmos.App()
            .GET('https://jsonplaceholder.typicode.com/users/1')
            .onLoading('正在載入用戶資料...')
            .onSuccess('歡迎 {name}！您來自 {address.city}')
            .onError('載入失敗：{error}');
    })
    .start();
```

#### 範例 2：表單提交
```javascript
Cosmos.create('contact-form')
    .title('聯絡我們')
    .input('請輸入您的姓名')
    .input('請輸入您的郵箱')
    .input('請輸入訊息內容')
    .button('送出')
    .onClick(() => {
        new Cosmos.App()
            .POST('https://api.example.com/contact')
            .onLoading('正在送出訊息...')
            .onSuccess('謝謝您的訊息！我們會盡快回覆。')
            .onError('送出失敗，請稍後再試：{error}');
    })
    .start();
```

#### 範例 3：複雜的用戶管理
```javascript
Cosmos.create('user-management')
    .title('用戶管理系統')
    .input('請輸入姓名')
    .input('請輸入郵箱')
    .button('創建用戶')
    .button('載入用戶列表')
    .start();

// 手動綁定按鈕事件（避免衝突）
setTimeout(() => {
    const buttons = document.querySelectorAll('#user-management button');

    // 創建用戶按鈕
    buttons[0].onclick = () => {
        new Cosmos.App()
            .POST('https://jsonplaceholder.typicode.com/users')
            .onLoading('正在創建用戶...')
            .onSuccess('用戶創建成功！ID：{id}')
            .onError('創建失敗：{error}');
    };

    // 載入用戶列表按鈕
    buttons[1].onclick = () => {
        new Cosmos.App()
            .GET('https://jsonplaceholder.typicode.com/users')
            .onLoading('正在載入用戶列表...')
            .onSuccess((users) => {
                const userList = users.slice(0, 3)
                    .map(u => `• ${u.name} (${u.email})`)
                    .join('\n');
                alert(`前 3 位用戶：\n\n${userList}`);
            })
            .onError('載入失敗：{error}');
    };
}, 500);
```

### 🔧 技術細節

#### 自動表單數據收集
當使用 `POST` 或 `PUT` 方法且未提供 data 參數時，Cosmos 會自動收集當前容器中所有輸入元素的值：

```javascript
// 這個表單的數據會自動收集
Cosmos.create('form')
    .input('姓名')        // 鍵值：'姓名'
    .input('郵箱')        // 鍵值：'郵箱'
    .button('提交')
    .onClick(() => {
        new Cosmos.App()
            .POST('/api/users')  // 會自動發送 { "姓名": "...", "郵箱": "..." }
            .onSuccess('提交成功！');
    })
    .start();
```

#### 模板字符串功能
支援嵌套對象的屬性訪問：

```javascript
// API 回應：{ "user": { "name": "張三", "profile": { "age": 25 } } }
.onSuccess('用戶 {user.name} 今年 {user.profile.age} 歲')
// 結果：「用戶 張三 今年 25 歲」
```

#### 錯誤處理機制
- 自動捕獲網路錯誤
- 自動處理 HTTP 狀態碼錯誤（4xx, 5xx）
- 提供統一的錯誤格式：`{ error: "錯誤訊息" }`

### 圖片方法詳細說明

`.image()` 方法支援靈活的參數設定：

**語法：**
```javascript
.image("網址/路徑", 寬度, 高度, "alt文字")
```

**參數規則：**
- `網址/路徑`：必要參數，圖片的 URL 或本地路徑
- `寬度`：可選參數，若使用則高度也必須提供
- `高度`：可選參數，可以是數字（像素）或 "auto"（自適應）
- `alt`：可選參數，用於無障礙訪問的替代文字

**範例：**
```javascript
// 原始尺寸（完全響應式）
.image('https://example.com/image.jpg')

// 固定尺寸（具備響應式保護）
.image('https://example.com/image.jpg', 400, 300, '圖片描述')

// 寬度固定，高度自適應（響應式寬度）
.image('https://example.com/image.jpg', 400, 'auto', '圖片描述')
```

**響應式特性：**
- 所有圖片都具備 `max-width: 100%` 響應式保護
- 固定尺寸圖片在小螢幕上會自動縮放，不會被切除
- 使用 `object-fit: contain` 保持圖片比例
- 原始尺寸圖片完全響應式適應容器寬度

## 🚧 開發中／待修復的功能

以下功能已在規劃中或需要修復：

* 語法糖方法：`.showData()`、`.alert()`、`.logData()` 因 `buttonClick` 的限制目前無法正常運作，待修復。