# 🚀 Getting Started: Build Your First Cosmos App in 5 Minutes

Welcome to the world of Cosmos! This guide will walk you through building your first application using our building block approach.

## Step 1: Prepare the HTML Document

First, create an HTML file (e.g., `index.html`) and insert the following content.

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Cosmos App</title>
</head>
<body>
    <!-- Default container -->
    <div id="cosmos-app"></div>
    
    <!-- Or custom container -->
    <div id="my-app"></div>
    
    <script src="cosmos.js"></script>
    <script>
        // Using default container
        new Cosmos.App()
            .title('Hello')
            .start();
        
        // Using custom container
        Cosmos.create('my-app')
            .title('Custom')
            .start();
    </script>
</body>
</html>
```
Container Usage Concepts:
```javascript
// Application Instance Creation
// Method 1: Constructor (using default container #cosmos-app)
new Cosmos.App()

// Method 2: Factory method (recommended, can specify container)
Cosmos.create('container-id')

// Method 3: Manually specify container
new Cosmos.App().
    setContainer('container-id')
```

Container Management System:

```javascript
// Multi-container application example
Cosmos.create('header').title('Header Area').start();
Cosmos.create('sidebar').title('Sidebar').start();
Cosmos.create('main').title('Main Content').start();
```

**Key Points:**
- We need a `<div>` element with an id (default is `cosmos-app`), where Cosmos will build our application.
- The path to `cosmos.js` should be adjusted according to your project structure.

## Step 2: Stack Your First Blocks

Now, in the last `<script>` tag, let's write code using blocks.

```javascript
// Create a new Cosmos application instance
new Cosmos.App()
    // Tell Cosmos which container to build in (#app)
    .setContainer('app')

    // Next, start stacking blocks...
    .title('My First Block Creation')      // 🏷️ Add a title block
    .text('Building with blocks is fun!')  // 📄 Add a text block
    .text('HTML Support: <strong>bold</strong>')
    .color('blue')                   // 🎨 Change color
    .button('Click Me')              // 🔲 Add a button block
    .onClick('Hello, Cosmos!')       // 🎉 Set click message

    // Finally, start the application to assemble all blocks!
    .start();
```

## Step 3: Open in Browser

Save your `index.html` file and open it directly in your browser. You'll see your application built with blocks come to life!

Congratulations! You've successfully mastered the basics of Cosmos. Now you can start exploring more exciting blocks!

## What's Next?

- Want to see all available blocks? Check out the API Reference. (Located in api-reference.md in the parent directory)
- Curious about the project's future? Take a look at our README.md. (Located in README.md in the parent directory)