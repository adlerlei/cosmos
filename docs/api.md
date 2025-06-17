# 🔧 Cosmos Framework API Technical Document (v1.3.0)
Still new to Cosmos? We recommend starting with the [README](../README.md) and then or following the [Getting Started Guide](getting-started.md) step by step.

This document is the complete API reference guide for the Cosmos framework, containing all available "blocks" and their usage.

## ✅ Core API

### 1. UI Component Blocks

This is the foundation of the framework. You can build the user interface sequentially, like stacking blocks.

| Element | Method | Description |
|---------|---------|-------------|
| Title | `.title('Title Text')` | Sets the main title of the application |
| Text | `.text('Content')` | Displays a block of static text |
| Input | `.input('Placeholder Text')` | Creates a text input field |
| Button | `.button('Button Text')` | Creates a clickable button |
| Image | `.image('Image URL', 'Alt Text')` | Displays an image |
| Select | `.select(['Option A', 'Option B'])` | Creates a dropdown menu |
| Checkbox | `.checkbox('Label')` | Creates a checkbox |
| Slider | `.slider(min, max, default)` | Creates a draggable slider |

#### Example:
```javascript
new Cosmos.App()
    .title('Contact Us')
    .image('https://placehold.co/600x200/4285f4/ffffff?text=Cosmos', 'Header Image')
    .input('Your Name')
    .select(['Technical Support', 'Business Partnership', 'Other'])
    .checkbox('Subscribe to our newsletter')
    .button('Submit')
    .start();
```
### 2. Styling & Animation Blocks

Change the appearance and dynamic effects of components.

| Function | Method | Description |
|----------|---------|-------------|
| Layout | `.layout('row' or 'col')` | Changes the arrangement of subsequent elements (horizontal or vertical) |
| Color | `.color('colorName')` | Changes the default color of subsequent elements (Supports: blue, green, red, purple, orange, pink) |
| Animate | `.animate('animationName')` | Adds an animation to the previously created element (Supports: fadeIn, slideIn, bounce, pulse) |

#### Example:
```javascript
new Cosmos.App()
    .title('Colorful Animated Blocks')
    .color('red')
    .button('Red Button').animate('pulse') // Add pulse animation to the red button
    .layout('row')
    .color('green')
    .text('Side-by-side green text')
    .button('Green Button').animate('bounce')
    .start();
```
### 3. Form Validation Blocks

Adds various validation rules to input or select elements, displaying error messages in real-time as the user types.

| Validation Rule | Method |
|----------------|--------|
| Required | `.required('Error Message')` |
| Email Format | `.email('Error Message')` |
| Min Length | `.minLength(length, 'Error Message')` |
| Max Length | `.maxLength(length, 'Error Message')` |
| Numeric Format | `.numeric('Error Message')` |
| Custom Pattern | `.pattern(regex, 'Error Message')` |

#### Handling Validation Results:
* `.onValid(action)`: Action to trigger when the button is clicked and all validations pass (can be a message string or a function)
* `.onInvalid(action)`: Action to trigger when the button is clicked and any validation fails

#### Example:
```javascript
new Cosmos.App()
    .title('User Registration')
    .input('Username').required('Username is required').minLength(3, 'Username requires at least 3 characters')
    .input('Email').required().email('Please enter a valid Email address')
    .button('Register')
    .onValid('Great, all data is correct!')
    .onInvalid('Please fix the errors indicated in red in the form')
    .start();
```
### 4. Event Handling Blocks

Define actions to be executed when specific events occur.

* `.onClick(action)` or `.buttonClick(action)`: Binds to the last created button. Action can be a string or a function `function(values){...}`. The function receives all form values.
* `.onChange(action)`: Binds to the last created input component (input, select, checkbox, slider). Action can be a string or a function `function(value){...}`. The function receives the new value of that component.

#### Example:
```javascript
new Cosmos.App()
    .title('Event Handling')
    .input('Your Name').onChange(function(name) {
        console.log(`Name changed to: ${name}`);
    })
    .button('Greet')
    .onClick(function(values) {
        // The 'values' object will be { "Your Name": "user input content" }
        alert(`Hello, ${values['Your Name']}!`);
    })
    .start();
```
### 5. Conditional Logic Blocks

Replaces traditional if/else to make the logic chain clearer. The logic is triggered when the bound button is clicked.

| Logic Method | Description |
|-------------|-------------|
| `.when(field, operator, value)` | Starts a conditional check |
| `.and(field, operator, value)` | Appends an "and" condition |
| `.or(field, operator, value)` | Appends an "or" condition |
| `.then(action)` | Executes when the condition is met |
| `.else(action)` | Executes when the when condition is not met |
| `.otherwise(action)` | Executes when all .when conditions are not met |

Supported operators: `==`, `!=`, `>`, `<`, `>=`, `<=`, `includes`, `empty`

#### Example:
```javascript
new Cosmos.App()
    .input('Age').numeric('Please enter a number') 
    .button('Submit') 
    .when('Age', '>=', 18).then('You are an adult') 
    .when('Age', '<', 18).then('You are a minor')
    .otherwise('Please enter a valid age') 
    .start();
```
## ⚠️ In Development / Features to be Fixed

The following features are being planned or need to be fixed:

* `.image()`: The logic for the image size setting parameter needs to be re-discussed and fixed.
* Syntactic sugar methods: `.showData()`, `.alert()`, `.logData()` are not currently working correctly due to limitations with buttonClick and are pending a fix.