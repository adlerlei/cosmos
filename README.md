# 🌟 Cosmos Framework v1.3.0
Choose your preferred language: (Currently available in English / Chinese)  
[繁體中文](docs/zh-TW/README.md)

A poetic JavaScript framework that lets you code like building with blocks, turning code into beautiful block combinations.

Cosmos is a JavaScript framework designed for creators. We believe coding should be as intuitive, fun, and poetic as children playing with building blocks. Each feature is a refined block, and all you need is imagination to stack them together to create any application you want.

## 🧩 Block Programming Philosophy

In the world of Cosmos, you don't need to learn complex syntax or design patterns.
```javascript
// Each line is a block, together they form a complete application
new Cosmos.App()
    .title('My App')         // 🏷️ Add a title block
    .input('Name')           // 📝 Add an input block
    .required('Name required')// ✅ Add validation block
    .button('Submit')        // 🔲 Stack a button block
    .onValid('Success!')     // 🎉 Finally success block
    .start();               // 🚀 Launch!
```

## ✨ Core Features

- **Intuitive Composition**: Each feature is an independent block - add what you need.
- **Zero Learning Curve**: Extremely clean API design, self-explanatory, focus on creation rather than memorization.
- **Instant Effect**: See the results immediately as you add each block, enjoy real-time feedback.
- **Smart Integration**: Blocks work together automatically, like validation blocks automatically connecting with button blocks.

## 🚀 Quick Start

Build your first application with blocks in 5 minutes!

### 1. Prepare Your Block Box (HTML)
```html
<!-- Include cosmos.js -->
<script src="dist/cosmos.min.js"></script>

<!-- Prepare a default container for Cosmos -->
<div id="cosmos-app"></div>
```
### 2. Start Building (JavaScript)
```javascript
// Using the default cosmos-app container
new Cosmos.App()
    .title('My First Block Creation')
    .text('Blocks are fun!')
    .button('Add Another Block')
    .onClick('Blocks are stacked!')
    .start();
```
### 3. Show Your Layout Creativity (HTML)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cosmos</title>
</head>
<body>
    <!-- While cosmos-app is the default container, feel free to create your own -->
    <div id="header"></div>
    <div id="sidebar"></div>
    <div id="main"></div>

    <!-- Choose to include from CDN -->
    <script src="cdn path"></script>
    <!-- Or download the file -->
    <script src="dist/cosmos.min.js"></script>

    <script>
        Cosmos.create('header')
            .title('Header Area')
            .start();

        Cosmos.create('sidebar')
            .title('Sidebar')
            .start();

        Cosmos.create('main')
            .title('Main Content')
            .start();
    </script>
</body>
</html>
```
Want to learn more? Read our [Getting Started Guide](docs/getting-started.md).

## 🎨 Block Combination Examples

### Classic Combination: User Registration
By combining blocks like `.input`, `.required`, and `.onValid`, you can easily create a fully functional registration form.  
👉 **[View the complete "User Registration" example](docs/api.md#example-2)**

### Creative Combination: Logic Flow
Using `.when`, `.then`, and `.otherwise` blocks, you can handle complex conditional logic in a declarative way.
👉 **[View the complete "Logic Flow" example](docs/api.md#example-4)**  
Want to see all block features? Check out the complete [API Reference](docs/api.md)

## 🌈 Future Block Plans (Roadmap)

The Cosmos universe is constantly expanding! We're working hard to create more powerful blocks:

### UI Element Blocks
- `.card`, `.modal`, `.navbar`, `.table`

### Data Integration Blocks
- **API Communication (Highest Priority)**: Simplify `.get`, `.post` operations for easy backend connection.
- **Database Integration**: Simple interfaces for connecting to Firebase, LocalStorage, and other services.

### Core Feature Enhancements
- **`.function`**: Allow developers to define reusable logic blocks.

## 📞 Block Community
- 📖 [API Documentation](/docs/api.md)
- 💡 Feature Discussions
- 🐞 Issue Reporting

---

### 🧩 Code like playing with blocks, let your creativity flourish!