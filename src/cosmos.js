// =======================================================
// Cosmos Framework - v1.3.0 (Conditional Logic Version)
// A versatile JavaScript framework designed for beginners
// Written and maintained in Taiwan
// =======================================================
// Copyright 2025 Adler Lei
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at:
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// =======================================================


class CosmosApp {
    constructor() {
        this.appTitle = ''; // The title of the application
        this.elements = []; // Array to store UI elements
        this.clickHandlers = {}; // Object to store click event handlers for elements
        this.changeHandlers = {}; // Object to store change event handlers for elements
        this.currentLayout = 'col'; // Default layout: 'col' (column) or 'row'
        this.currentColor = 'default'; // Default color theme
        this.containerId = 'cosmos-app'; // Default ID of the HTML container element
        this.validationConfig = { // Configuration for form validation
            onValid: null, // Callback function when validation passes
            onInvalid: null // Callback function when validation fails
        };
        this.conditionalLogic = { // Configuration for conditional logic
            conditions: [], // Array of defined conditions
            currentCondition: null, // The condition currently being built
            otherwiseAction: null // Action to execute if no conditions are met
        };
        this.apiConfig = { // Configuration for API communication
            pendingRequest: null, // Current HTTP request configuration
            onSuccess: null, // Success callback handler
            onError: null, // Error callback handler
            onLoading: null, // Loading state message
            isLoading: false // Current loading state
        };
    }

    // --- Core Application Setup ---

    /**
     * Sets the title of the application.
     * @param {string} text - The title text.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    title(text) {
        this.appTitle = text;
        return this;
    }

    /**
     * Sets the layout direction for elements.
     * @param {'col' | 'row'} direction - The layout direction ('col' for vertical, 'row' for horizontal).
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    layout(direction) {
        this.currentLayout = direction;
        return this;
    }

    /**
     * Sets the color theme for subsequently added elements.
     * Available colors: 'blue', 'red', 'green', 'purple', 'orange', 'pink', 'default'.
     * @param {string} colorName - The name of the color theme.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    color(colorName) {
        this.currentColor = colorName;
        return this;
    }

    // --- UI Element Creation ---

    /**
     * Adds a text element to the application.
     * @param {string} content - The text content to display.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    text(content) {
        this.elements.push({
            type: 'text', 
            content: content, 
            color: this.currentColor,
            animation: null
        });
        return this;
    }

    /**
     * Adds an input field element to the application.
     * Supports validation rules.
     * @param {string} placeholder - The placeholder text for the input field.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    input(placeholder) {
        this.elements.push({
            type: 'input', 
            placeholder: placeholder, 
            id: 'input-' + this.elements.length,
            color: this.currentColor,
            animation: null,
            validations: []  // Array to store validation rules for this input
        });
        return this;
    }

    /**
     * Adds a button element to the application.
     * @param {string} text - The text displayed on the button.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    button(text) {
        this.elements.push({
            type: 'button', 
            text: text, 
            id: 'btn-' + this.elements.length,
            color: this.currentColor,
            animation: null
        });
        return this;
    }

    /**
     * Adds an image element to the application with support for dimension control.
     * @param {string} src - The source URL of the image.
     * @param {string | number} [widthOrAlt] - The width of the image (e.g., 100, '100px', '50%') or the alt text if height and alt are not provided.
     * @param {string | number} [height] - The height of the image (e.g., 100, '100px', '50%') or alt text if it's a string and `alt` is undefined.
     * @param {string} [alt] - The alternative text for the image.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    // --- Image Element with Flexible Sizing ---
    /**
     * Adds an image element to the application with flexible sizing options.
     * @param {string} src - The image URL or path (required).
     * @param {number} [width] - The width in pixels (optional).
     * @param {number|string} [height] - The height in pixels or 'auto' for responsive (optional).
     * @param {string} [alt] - The alt text for accessibility (optional).
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    image(src, width, height, alt) {
        // Validate required src parameter
        if (!src || typeof src !== 'string') {
            throw new TypeError('Image src parameter is required and must be a string');
        }

        let imageConfig = {
            type: 'image',
            src: src,
            color: this.currentColor,
            animation: null,
            alt: alt || ''
        };
        
        // Handle width and height parameters
        if (width === undefined && height === undefined) {
            // No dimensions specified - use original image size
            imageConfig.width = 'auto';
            imageConfig.height = 'auto';
        } else if (width !== undefined && height === undefined) {
            // Only width specified - throw error as per requirement
            throw new TypeError('If width is specified, height parameter must also be provided (can be a number or "auto")');
        } else if (width !== undefined && height !== undefined) {
            // Both width and height specified
            if (typeof width !== 'number' || width <= 0) {
                throw new TypeError('Width must be a positive number');
            }
            
            if (height === 'auto') {
                // Responsive height
                imageConfig.width = width + 'px';
                imageConfig.height = 'auto';
            } else if (typeof height === 'number' && height > 0) {
                // Fixed dimensions
                imageConfig.width = width + 'px';
                imageConfig.height = height + 'px';
            } else {
                throw new TypeError('Height must be a positive number or "auto"');
            }
        }
        
        this.elements.push(imageConfig);
        return this;
    }
    // --- End Image Element ---

    /**
     * Adds a dropdown select element to the application.
     * Supports validation rules.
     * @param {string[]} options - An array of strings representing the options for the select dropdown.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    select(options) {
        this.elements.push({
            type: 'select', 
            options: options, 
            id: 'select-' + this.elements.length,
            color: this.currentColor,
            animation: null,
            validations: []  // Array to store validation rules for this select
        });
        return this;
    }

    /**
     * Adds a checkbox element to the application.
     * @param {string} label - The label text for the checkbox.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    checkbox(label) {
        this.elements.push({
            type: 'checkbox', 
            label: label, 
            id: 'check-' + this.elements.length,
            color: this.currentColor,
            animation: null
        });
        return this;
    }

    /**
     * Adds a slider (range input) element to the application.
     * @param {number} [min=0] - The minimum value of the slider.
     * @param {number} [max=100] - The maximum value of the slider.
     * @param {number} [value=50] - The default/initial value of the slider.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    slider(min, max, value) {
        if (min === undefined) min = 0;
        if (max === undefined) max = 100;
        if (value === undefined) value = 50;
        
        this.elements.push({
            type: 'slider', 
            min: min, 
            max: max, 
            value: value, 
            id: 'slider-' + this.elements.length,
            color: this.currentColor,
            animation: null
        });
        return this;
    }

    /**
     * Applies an animation to the last added element.
     * Available animations: 'fadeIn', 'slideIn', 'bounce', 'pulse'.
     * @param {string} animationType - The type of animation to apply.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    animate(animationType) {
        if (this.elements.length > 0) {
            let lastElement = this.elements[this.elements.length - 1];
            lastElement.animation = animationType;
        }
        return this;
    }

    // ======================
    // 🌟 New Feature: Form Validation API
    // ======================

    // Helper method to get the last element that supports validation (input or select).
    getLastValidatableElement() {
        for (let i = this.elements.length - 1; i >= 0; i--) {
            if (['input', 'select'].includes(this.elements[i].type)) {
                return this.elements[i];
            }
        }
        return null;
    }

    /**
     * Adds a 'required' validation rule to the last added input or select element.
     * @param {string} [message] - Custom error message for this validation.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    required(message) {
        let element = this.getLastValidatableElement();
        if (element) {
            element.validations.push({
                type: 'required',
                message: message || 'This field is required'
            });
        }
        return this;
    }

    /**
     * Adds an 'email' format validation rule to the last added input element.
     * @param {string} [message] - Custom error message for this validation.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    email(message) {
        let element = this.getLastValidatableElement();
        if (element) {
            element.validations.push({
                type: 'email',
                message: message || 'Invalid email format'
            });
        }
        return this;
    }

    /**
     * Adds a 'minimum length' validation rule to the last added input element.
     * @param {number} length - The minimum required length.
     * @param {string} [message] - Custom error message for this validation.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    minLength(length, message) {
        let element = this.getLastValidatableElement();
        if (element) {
            element.validations.push({
                type: 'minLength',
                value: length,
                message: message || `At least ${length} characters required`
            });
        }
        return this;
    }

    /**
     * Adds a 'maximum length' validation rule to the last added input element.
     * @param {number} length - The maximum allowed length.
     * @param {string} [message] - Custom error message for this validation.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    maxLength(length, message) {
        let element = this.getLastValidatableElement();
        if (element) {
            element.validations.push({
                type: 'maxLength',
                value: length,
                message: message || `At most ${length} characters allowed`
            });
        }
        return this;
    }

    /**
     * Adds a 'numeric' validation rule to the last added input element.
     * @param {string} [message] - Custom error message for this validation.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    numeric(message) {
        let element = this.getLastValidatableElement();
        if (element) {
            element.validations.push({
                type: 'numeric',
                message: message || 'Please enter a number'
            });
        }
        return this;
    }

    /**
     * Adds a 'pattern' (regex) validation rule to the last added input element.
     * @param {RegExp} regex - The regular expression to test against.
     * @param {string} [message] - Custom error message for this validation.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    pattern(regex, message) {
        let element = this.getLastValidatableElement();
        if (element) {
            element.validations.push({
                type: 'pattern',
                value: regex,
                message: message || 'Invalid format'
            });
        }
        return this;
    }

    /**
     * Sets a callback function or a message string to be executed/shown when all validations pass.
     * Automatically binds validation to the last button if not already handled.
     * @param {Function|string} action - A function to call with form values, or a message string.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    onValid(action) {
        this.validationConfig.onValid = action;
        // If there's a button without a click handler, auto-bind validation logic
        this.autoBindValidation();
        return this;
    }

    /**
     * Sets a callback function or a message string to be executed/shown when any validation fails.
     * Automatically binds validation to the last button if not already handled.
     * @param {Function|string} action - A function to call, or a message string.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    onInvalid(action) {
        this.validationConfig.onInvalid = action;
        // If there's a button without a click handler, auto-bind validation logic
        this.autoBindValidation();
        return this;
    }

    // Internal method to automatically bind validation logic to the last button
    // if onValid or onInvalid handlers are set and the button doesn't have a click handler.
    autoBindValidation() {
        // Find the last button element
        let lastButton = null;
        for (let i = this.elements.length - 1; i >= 0; i--) {
            if (this.elements[i].type === 'button') {
                lastButton = this.elements[i];
                break;
            }
        }
        
        // If the button exists and doesn't have a click handler yet, add the validation logic
        if (lastButton && !this.clickHandlers[lastButton.id]) {
            const self = this;
            this.clickHandlers[lastButton.id] = function() {
                const values = self.getAllValues();
                
                // Execute validation
                if (self.hasValidations()) {
                    if (!self.validateAllFields()) {
                        if (self.validationConfig.onInvalid) {
                            if (typeof self.validationConfig.onInvalid === 'string') {
                                self.showMessage(self.validationConfig.onInvalid, 'error');
                            } else if (typeof self.validationConfig.onInvalid === 'function') {
                                self.validationConfig.onInvalid();
                            }
                        }
                        return;
                    }
                    
                    // Validation passed
                    if (self.validationConfig.onValid) {
                        if (typeof self.validationConfig.onValid === 'string') {
                            self.showMessage(self.validationConfig.onValid, 'success');
                        } else if (typeof self.validationConfig.onValid === 'function') {
                            self.validationConfig.onValid(values);
                        }
                    }
                }
                
                // Execute conditional logic
                if (self.hasConditionalLogic()) {
                    self.executeConditionalLogic(values);
                }
            };
        }
    }

    /**
     * Checks if any elements in the app have validation rules defined.
     * @returns {boolean} True if there are validations, false otherwise.
     */
    hasValidations() {
        return this.elements.some(el => 
            ['input', 'select'].includes(el.type) && el.validations && el.validations.length > 0
        );
    }

    // Internal method to validate a single field based on its rules.
    // @param {object} element - The element configuration object.
    // @param {string} value - The value of the field to validate.
    // @returns {string[]} An array of error messages, empty if valid.
    validateField(element, value) {
        let errors = [];
        
        for (let validation of element.validations) {
            let isValid = true;
            
            switch (validation.type) {
                case 'required':
                    isValid = value && value.trim() !== '';
                    break;
                    
                case 'email':
                    isValid = !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
                    break;
                    
                case 'minLength':
                    isValid = !value || value.length >= validation.value;
                    break;
                    
                case 'maxLength':
                    isValid = !value || value.length <= validation.value;
                    break;
                    
                case 'numeric':
                    isValid = !value || /^\d+(\.\d+)?$/.test(value);
                    break;
                    
                case 'pattern':
                    isValid = !value || validation.value.test(value);
                    break;
            }
            
            if (!isValid) {
                errors.push(validation.message);
            }
        }
        
        return errors;
    }

    // Internal method to display validation errors for a specific field.
    // @param {string} elementId - The ID of the element.
    // @param {string[]} errors - An array of error messages.
    showFieldErrors(elementId, errors) {
        // Remove old error messages for this element
        let oldErrors = document.querySelectorAll(`[data-error-for="${elementId}"]`);
        oldErrors.forEach(el => el.remove());
        
        // Display new error messages if any
        if (errors.length > 0) {
            let element = document.getElementById(elementId);
            if (element) {
                let errorContainer = document.createElement('div');
                errorContainer.setAttribute('data-error-for', elementId);
                errorContainer.style.cssText = 'color: #ff4444; font-size: 0.75rem; margin-top: 5px;'; // 12px -> 0.75rem
                
                errors.forEach(error => {
                    let errorDiv = document.createElement('div');
                    errorDiv.textContent = '❌ ' + error;
                    errorContainer.appendChild(errorDiv);
                });
                
                element.parentNode.insertBefore(errorContainer, element.nextSibling);
                
                // Change input border to red
                element.style.borderColor = '#ff4444';
            }
        } else {
            // Clear error styling
            let element = document.getElementById(elementId);
            if (element) {
                element.style.borderColor = this.getColorStyle(element.dataset.color || 'default');
            }
        }
    }

    // Internal method to validate all fields that have validation rules.
    // @returns {boolean} True if all fields are valid, false otherwise.
    validateAllFields() {
        let allValid = true;
        
        for (let element of this.elements) {
            if (['input', 'select'].includes(element.type) && element.validations.length > 0) {
                let inputElement = document.getElementById(element.id);
                if (inputElement) { // Ensure the DOM element exists
                    let value = inputElement.value;
                    let errors = this.validateField(element, value);
                    
                    this.showFieldErrors(element.id, errors); // Display errors for this field
                    
                    if (errors.length > 0) {
                        allValid = false;
                    }
                }
            }
        }
        
        return allValid;
    }

    // ======================
    // 🌟 New Feature: Conditional Logic System
    // ======================

    /**
     * Starts a conditional logic block. Defines the first condition.
     * Updated to support conditionChain for complex AND/OR logic.
     * @param {string} field - The name of the field (placeholder for input, label for checkbox, etc.) to check.
     * @param {string} operator - The comparison operator (e.g., '==', '!=', '>', '<', 'includes', 'empty').
     * @param {*} value - The value to compare against (not used for 'empty' operator).
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    when(field, operator, value) {
        // If a previous condition was being built and had a thenAction, finalize it.
        if (this.conditionalLogic.currentCondition && this.conditionalLogic.currentCondition.thenAction) {
            this.conditionalLogic.conditions.push(this.conditionalLogic.currentCondition);
        }
        
        // Create a new current condition structure
        this.conditionalLogic.currentCondition = {
            // conditionChain is an array of OR-groups. Each OR-group is an array of AND-conditions.
            // Initially, the first OR-group contains the condition from .when()
            conditionChain: [[{field, operator, value}]],
            thenAction: null,
            elseAction: null
        };
        
        // Auto-bind conditional logic execution to the last button if applicable
        this.autoBindConditionalLogic();
        
        return this;
    }

    // Internal method to automatically bind conditional logic execution to the last button
    // if conditional logic methods are used and the button doesn't have a click handler.
    autoBindConditionalLogic() {
        // Find the last button element
        let lastButton = null;
        for (let i = this.elements.length - 1; i >= 0; i--) {
            if (this.elements[i].type === 'button') {
                lastButton = this.elements[i];
                break;
            }
        }
        
        // If the button exists and doesn't have a click handler yet, add the combined logic
        if (lastButton && !this.clickHandlers[lastButton.id]) {
            const self = this;
            this.clickHandlers[lastButton.id] = function() {
                const values = self.getAllValues();
                
                // Execute validation first
                if (self.hasValidations()) {
                    if (!self.validateAllFields()) {
                        if (self.validationConfig.onInvalid) {
                            if (typeof self.validationConfig.onInvalid === 'string') {
                                self.showMessage(self.validationConfig.onInvalid, 'error');
                            } else if (typeof self.validationConfig.onInvalid === 'function') {
                                self.validationConfig.onInvalid();
                            }
                        }
                        return;
                    }
                    
                    // Validation passed
                    if (self.validationConfig.onValid) {
                        if (typeof self.validationConfig.onValid === 'string') {
                            self.showMessage(self.validationConfig.onValid, 'success');
                        } else if (typeof self.validationConfig.onValid === 'function') {
                            self.validationConfig.onValid(values);
                        }
                    }
                }
                
                // Then, execute conditional logic
                if (self.hasConditionalLogic()) {
                    self.executeConditionalLogic(values);
                }
            };
        }
    }

    /**
     * Adds an AND condition to the current conditional logic block.
     * This creates a new OR-group that must also be true.
     * @param {string} field - The field name.
     * @param {string} operator - The comparison operator.
     * @param {*} value - The value to compare against.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    and(field, operator, value) {
        if (this.conditionalLogic.currentCondition && this.conditionalLogic.currentCondition.conditionChain) {
            // AND creates a new OR-group (which itself is an array of conditions, initially with one)
            this.conditionalLogic.currentCondition.conditionChain.push([{field, operator, value}]);
        } else {
            console.warn("CosmosApp: .and() called without a preceding .when(). Condition ignored.");
        }
        return this;
    }

    /**
     * Adds an OR condition to the current AND-block within the conditional logic.
     * The condition is added to the last OR-group.
     * @param {string} field - The field name.
     * @param {string} operator - The comparison operator.
     * @param {*} value - The value to compare against.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    or(field, operator, value) {
        if (this.conditionalLogic.currentCondition &&
            this.conditionalLogic.currentCondition.conditionChain &&
            this.conditionalLogic.currentCondition.conditionChain.length > 0) {
            // OR adds a condition to the last existing OR-group
            const lastOrGroup = this.conditionalLogic.currentCondition.conditionChain[
                this.conditionalLogic.currentCondition.conditionChain.length - 1
            ];
            lastOrGroup.push({field, operator, value});
        } else {
            console.warn("CosmosApp: .or() called without a preceding .when() or .and(), or on an empty AND block. Condition ignored.");
        }
        return this;
    }

    /**
     * Defines the action to take if the preceding condition(s) evaluate to true.
     * @param {Function|string} action - A function to call (receives form data) or a message string to display.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    then(action) {
        if (this.conditionalLogic.currentCondition) {
            this.conditionalLogic.currentCondition.thenAction = action;
        }
        return this;
    }
    
    /**
     * Defines the action to take if the preceding condition(s) evaluate to false.
     * This finalizes the current condition block.
     * @param {Function|string} action - A function to call (receives form data) or a message string to display.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    else(action) {
        if (this.conditionalLogic.currentCondition) {
            this.conditionalLogic.currentCondition.elseAction = action;
            // .else() finalizes the current condition definition, so add it to the list.
            // Ensure conditionChain exists and is valid before pushing
            if (this.conditionalLogic.currentCondition.conditionChain && 
                this.conditionalLogic.currentCondition.conditionChain.length > 0) {
                // Further check if all OR groups in conditionChain are non-empty
                if (this.conditionalLogic.currentCondition.conditionChain.every(group => group.length > 0)) {
                    this.conditionalLogic.conditions.push(this.conditionalLogic.currentCondition);
                }
            }
            this.conditionalLogic.currentCondition = null;
        }
        return this;
    }

    /**
     * Defines a default action to take if none of the preceding `when` conditions (or their `else` clauses) are met.
     * Finalizes any pending condition block.
     * @param {Function|string} action - A function to call (receives form data) or a message string to display.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    otherwise(action) {
        // If there's a pending condition with a thenAction, finalize it.
        if (this.conditionalLogic.currentCondition && this.conditionalLogic.currentCondition.thenAction) {
            // Ensure conditionChain exists and is valid
            if (this.conditionalLogic.currentCondition.conditionChain && 
                this.conditionalLogic.currentCondition.conditionChain.length > 0 &&
                this.conditionalLogic.currentCondition.conditionChain.every(group => group.length > 0)) {
                this.conditionalLogic.conditions.push(this.conditionalLogic.currentCondition);
            }
            this.conditionalLogic.currentCondition = null;
        }
        this.conditionalLogic.otherwiseAction = action;
        return this;
    }

    // Internal method to evaluate a single condition object.
    // @param {object} condition - The condition object {field, operator, value}.
    // @param {object} data - The form data object.
    // @returns {boolean} True if the condition is met, false otherwise.
    evaluateCondition(condition, data) {
        const {field, operator, value} = condition;
        const fieldValue = data[field];

        // Helper to get a numeric value for comparison,
        // treating null, undefined, or empty strings as NaN.
        const getComparableNumericValue = (val) => {
            if (val == null || (typeof val === 'string' && val.trim() === '')) {
                return NaN; // Treat empty or null as NaN for numeric comparisons
            }
            return Number(val);
        };

        switch (operator) {
            case '==': return fieldValue == value;
            case '!=': return fieldValue != value;
            case '>': return getComparableNumericValue(fieldValue) > Number(value);
            case '<': return getComparableNumericValue(fieldValue) < Number(value);
            case '>=': return getComparableNumericValue(fieldValue) >= Number(value);
            case '<=': return getComparableNumericValue(fieldValue) <= Number(value);
            case 'includes': return String(fieldValue).includes(String(value));
            case 'empty': // Check if fieldValue is null, undefined, or an empty string (after trim)
                return fieldValue == null || (typeof fieldValue === 'string' && fieldValue.trim() === '');
            default: return false;
        }
    }

    // Internal method to evaluate a condition group (which uses conditionChain: AND of ORs).
    // @param {object} conditionGroup - The condition group object.
    // @param {object} data - The form data object.
    // @returns {boolean} True if the entire condition group is met, false otherwise.
    evaluateConditionGroup(conditionGroup, data) {
        if (!conditionGroup.conditionChain || conditionGroup.conditionChain.length === 0) {
            return false; // A group with no conditions is considered false
        }
        // Each "OR condition group" (sub-array in conditionChain) must be true (evaluates as AND between these groups)
        return conditionGroup.conditionChain.every(orGroup => {
            if (orGroup.length === 0) {
                return false; // An empty OR group is considered false (cannot be satisfied)
            }
            // Within the current "OR condition group", at least one condition must be true (evaluates as OR within this group)
            return orGroup.some(condition => this.evaluateCondition(condition, data));
        });
    }

    // Internal method to execute the defined conditional logic based on form data.
    // @param {object} data - The form data object.
    executeConditionalLogic(data) {
        // If there's a current condition being built with a thenAction and valid chain, add it to the list.
        if (this.conditionalLogic.currentCondition && this.conditionalLogic.currentCondition.thenAction) {
            if (this.conditionalLogic.currentCondition.conditionChain &&
                this.conditionalLogic.currentCondition.conditionChain.length > 0 &&
                this.conditionalLogic.currentCondition.conditionChain.every(group => group.length > 0)) {
                this.conditionalLogic.conditions.push(this.conditionalLogic.currentCondition);
            }
            this.conditionalLogic.currentCondition = null; // Clear the current condition
        }

        let actionExecuted = false;
        // Check each defined condition group
        for (let conditionGroup of this.conditionalLogic.conditions) {
            if (this.evaluateConditionGroup(conditionGroup, data)) {
                // Condition matches, execute thenAction
                if (conditionGroup.thenAction) {
                    this.executeAction(conditionGroup.thenAction, data);
                    actionExecuted = true;
                    break; // Found a match and executed thenAction, stop checking further conditions
                }
            } else if (conditionGroup.elseAction) {
                // Condition does not match, but an elseAction exists, execute it
                this.executeAction(conditionGroup.elseAction, data);
                actionExecuted = true;
                break; // Executed an elseAction, stop checking further conditions
            }
        }
        
        // If no then or else action from any condition group was executed, and an otherwiseAction is defined, execute it.
        if (!actionExecuted && this.conditionalLogic.otherwiseAction) {
            this.executeAction(this.conditionalLogic.otherwiseAction, data);
        }
    }

    // Internal method to execute an action, which can be a message string or a function.
    // @param {Function|string} action - The action to execute.
    // @param {object} data - The form data, passed to function actions.
    executeAction(action, data) {
        if (typeof action === 'string') {
            this.showMessage(action, 'info');
        } else if (typeof action === 'function') {
            action(data);
        }
    }

    /**
     * Checks if any conditional logic (conditions, current pending condition, or otherwise action) is defined.
     * @returns {boolean} True if conditional logic is present, false otherwise.
     */
    hasConditionalLogic() {
        return this.conditionalLogic.conditions.length > 0 || 
               this.conditionalLogic.currentCondition !== null ||
               this.conditionalLogic.otherwiseAction !== null;
    }

    // --- API Communication Methods ---

    /**
     * Performs a GET request to the specified URL.
     * @param {string} url - The URL to send the GET request to.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    GET(url) {
        this.apiConfig.pendingRequest = {
            method: 'GET',
            url: url,
            data: null
        };
        return this;
    }

    /**
     * Performs a POST request to the specified URL.
     * @param {string} url - The URL to send the POST request to.
     * @param {object|null} data - Optional data to send. If null, form data will be collected automatically.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    POST(url, data = null) {
        this.apiConfig.pendingRequest = {
            method: 'POST',
            url: url,
            data: data
        };
        return this;
    }

    /**
     * Performs a PUT request to the specified URL.
     * @param {string} url - The URL to send the PUT request to.
     * @param {object|null} data - Optional data to send. If null, form data will be collected automatically.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    PUT(url, data = null) {
        this.apiConfig.pendingRequest = {
            method: 'PUT',
            url: url,
            data: data
        };
        return this;
    }

    /**
     * Performs a DELETE request to the specified URL.
     * @param {string} url - The URL to send the DELETE request to.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    DELETE(url) {
        this.apiConfig.pendingRequest = {
            method: 'DELETE',
            url: url,
            data: null
        };
        return this;
    }

    /**
     * Defines the success handler for API requests.
     * Supports three formats:
     * 1. String template: "歡迎 {name}！"
     * 2. Function: (data) => { ... }
     * 3. Object with element targeting: { target: 'elementId', template: '結果：{result}' }
     * @param {string|Function|object} handler - The success handler.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    onSuccess(handler) {
        this.apiConfig.onSuccess = handler;
        // Execute API request immediately if this is the first handler being set
        if (this.apiConfig.pendingRequest && !this.apiConfig.isLoading) {
            this.executeApiRequest();
        }
        return this;
    }

    /**
     * Defines the error handler for API requests.
     * Supports the same three formats as onSuccess.
     * @param {string|Function|object} handler - The error handler.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    onError(handler) {
        this.apiConfig.onError = handler;
        return this;
    }

    /**
     * Defines the loading handler for API requests.
     * @param {string|Function} handler - The loading handler (string message or function).
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    onLoading(handler) {
        this.apiConfig.onLoading = handler;
        return this;
    }

    // Internal method to execute the pending API request.
    executeApiRequest() {
        if (!this.apiConfig.pendingRequest) {
            console.warn('沒有待執行的 API 請求');
            return;
        }

        const request = this.apiConfig.pendingRequest;
        this.apiConfig.isLoading = true;

        // Show loading state
        if (this.apiConfig.onLoading) {
            this.handleApiResponse(this.apiConfig.onLoading, null, 'loading');
        }

        // Prepare request data
        let requestData = request.data;
        if (!requestData && (request.method === 'POST' || request.method === 'PUT')) {
            requestData = this.getAllValues();
        }

        // Configure fetch options
        const fetchOptions = {
            method: request.method,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (requestData && (request.method === 'POST' || request.method === 'PUT')) {
            fetchOptions.body = JSON.stringify(requestData);
        }

        // Execute the request
        fetch(request.url, fetchOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                this.apiConfig.isLoading = false;
                if (this.apiConfig.onSuccess) {
                    this.handleApiResponse(this.apiConfig.onSuccess, data, 'success');
                }
            })
            .catch(error => {
                this.apiConfig.isLoading = false;
                if (this.apiConfig.onError) {
                    this.handleApiResponse(this.apiConfig.onError, { error: error.message }, 'error');
                } else {
                    this.showMessage('API 請求失敗：' + error.message, 'error');
                }
            })
            .finally(() => {
                // Reset the pending request
                this.apiConfig.pendingRequest = null;
            });
    }

    // Internal method to handle API response based on handler type.
    handleApiResponse(handler, data, type) {
        if (typeof handler === 'string') {
            // String template format
            const message = this.processTemplate(handler, data);
            this.showMessage(message, type === 'loading' ? 'info' : type);
        } else if (typeof handler === 'function') {
            // Function format
            handler(data);
        } else if (typeof handler === 'object' && handler.target) {
            // Object format with target element
            const message = this.processTemplate(handler.template || '', data);
            const targetElement = document.getElementById(handler.target);
            if (targetElement) {
                if (targetElement.tagName === 'INPUT' || targetElement.tagName === 'TEXTAREA') {
                    targetElement.value = message;
                } else {
                    targetElement.textContent = message;
                }
            } else {
                console.warn(`找不到目標元素：${handler.target}`);
            }
        }
    }

    // Internal method to process string templates with data.
    processTemplate(template, data) {
        if (!template || !data) return template || '';
        
        return template.replace(/\{([^}]+)\}/g, (match, key) => {
            const keys = key.split('.');
            let value = data;
            
            for (const k of keys) {
                if (value && typeof value === 'object' && k in value) {
                    value = value[k];
                } else {
                    return match; // Keep original if key not found
                }
            }
            
            return value !== null && value !== undefined ? String(value) : '';
        });
    }

    // --- Event Handling and Utility Methods ---

    /**
     * Displays a message in the results area of the application.
     * @param {string} message - The message to display.
     * @param {'success' | 'error' | 'info'} type - The type of message, affecting its appearance.
     */
    showMessage(message, type) {
        // Use the instance's specific container or a dedicated message area within it
        const appContainer = document.getElementById(this.containerId);
        if (!appContainer) {
            console.warn(`showMessage: 找不到容器 #${this.containerId}，訊息無法顯示。`);
            return;
        }

        let resultsDiv = appContainer.querySelector('.cosmos-instance-messages');
        if (!resultsDiv) {
            resultsDiv = document.createElement('div');
            resultsDiv.className = 'cosmos-instance-messages';
            // Add some default styling for the message area if it's created dynamically
            resultsDiv.style.marginTop = '10px';
            resultsDiv.style.padding = '0'; // Reset padding as individual messages will have it
            resultsDiv.style.border = '1px solid #eee';
            resultsDiv.style.borderRadius = '5px';
            appContainer.appendChild(resultsDiv);
        }

        // Now resultsDiv refers to the message area within the specific app instance
        if (resultsDiv) { // Check again in case querySelector failed, though unlikely if created
            let color, bgColor, icon;
            
            switch(type) {
                case 'success':
                    color = '#4CAF50'; bgColor = 'rgba(76,175,80,0.2)'; icon = '✅';
                    break;
                case 'error':
                    color = '#ff4444'; bgColor = 'rgba(255,68,68,0.2)'; icon = '❌';
                    break;
                case 'info':
                default:
                    color = '#2196F3'; bgColor = 'rgba(33,150,243,0.2)'; icon = 'ℹ️';
            }
            
            // Create a new div for this specific message
            const messageDiv = document.createElement('div');
            messageDiv.style.background = bgColor;
            messageDiv.style.padding = '10px';
            messageDiv.style.margin = '5px'; // Margin for individual messages
            messageDiv.style.borderRadius = '5px';
            messageDiv.style.color = color;
            messageDiv.style.fontWeight = 'bold';
            messageDiv.innerHTML = `${icon} ${message}`;

            // Prepend new messages so the latest is always at the top within its container's message area
            if (resultsDiv.firstChild) {
                resultsDiv.insertBefore(messageDiv, resultsDiv.firstChild);
            } else {
                resultsDiv.appendChild(messageDiv);
            }
        }
    }

    /**
     * Attaches a click handler to the last added button.
     * This enhanced version integrates form validation and conditional logic execution.
     * @param {Function|string} action - A function to call on click (receives form values) or a message string to display.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    buttonClick(action) {
        let lastButton = null;
        for (let i = this.elements.length - 1; i >= 0; i--) {
            if (this.elements[i].type === 'button') {
                lastButton = this.elements[i];
                break;
            }
        }
        
        if (lastButton) {
            const self = this;
            
            if (typeof action === 'string') {
                this.clickHandlers[lastButton.id] = function() {
                    const values = self.getAllValues();
                    
                    // First, execute form validation
                    if (self.hasValidations()) {
                        if (!self.validateAllFields()) {
                            if (self.validationConfig.onInvalid) {
                                if (typeof self.validationConfig.onInvalid === 'string') {
                                    self.showMessage(self.validationConfig.onInvalid, 'error');
                                } else if (typeof self.validationConfig.onInvalid === 'function') {
                                    self.validationConfig.onInvalid();
                                }
                            }
                            return; // Validation failed, stop execution
                        }
                        
                        // Validation passed, execute onValid or the default action (show message)
                        if (self.validationConfig.onValid) {
                            if (typeof self.validationConfig.onValid === 'string') {
                                self.showMessage(self.validationConfig.onValid, 'success');
                            } else if (typeof self.validationConfig.onValid === 'function') {
                                self.validationConfig.onValid(values);
                            }
                        } else {
                            self.showMessage(action, 'success');
                        }
                    } else { // No validations defined
                        self.showMessage(action, 'success');
                    }
                    
                    // Finally, execute conditional logic
                    if (self.hasConditionalLogic()) {
                        self.executeConditionalLogic(values);
                    }
                };
            } else if (typeof action === 'function') {
                this.clickHandlers[lastButton.id] = function() {
                    const values = self.getAllValues();
                    
                    // First, execute form validation
                    if (self.hasValidations()) {
                        if (!self.validateAllFields()) {
                            if (self.validationConfig.onInvalid) {
                                if (typeof self.validationConfig.onInvalid === 'string') {
                                    self.showMessage(self.validationConfig.onInvalid, 'error');
                                } else if (typeof self.validationConfig.onInvalid === 'function') {
                                    self.validationConfig.onInvalid();
                                }
                            }
                            return; // Validation failed, stop execution
                        }
                        
                        // Validation passed, execute onValid or the custom function
                        if (self.validationConfig.onValid) {
                            if (typeof self.validationConfig.onValid === 'string') {
                                self.showMessage(self.validationConfig.onValid, 'success');
                            } else if (typeof self.validationConfig.onValid === 'function') {
                                self.validationConfig.onValid(values);
                            }
                        } else {
                            action(values);
                        }
                    } else { // No validations defined
                        action(values);
                    }
                    
                    // Finally, execute conditional logic
                    if (self.hasConditionalLogic()) {
                        self.executeConditionalLogic(values);
                    }
                };
            }
        }
        return this; // Allow chaining
    }

    /**
     * Syntactic sugar for `buttonClick`. Attaches a click handler to the last button.
     * @param {Function|string} action - Action to perform on click.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    onClick(action) {
        return this.buttonClick(action);
    }

    /**
     * Adds a button that, when clicked, displays all current form data.
     * @param {string} [title] - Optional title for the data display message.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    showData(title) {
        const self = this;
        return this.buttonClick(function(values) {
            const message = (title || 'Data Display') + (values ? ': ' + JSON.stringify(values) : '');
            self.showMessage(message, 'info');
        });
    }

    /**
     * Adds a button that, when clicked, displays an alert-like message.
     * @param {string} message - The message to display.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    alert(message) {
        const self = this;
        return this.buttonClick(function() {
            self.showMessage(message, 'info');
        });
    }

    /**
     * Adds a button that, when clicked, logs all current form data to the console.
     * @param {string} [message] - Optional message to precede the logged data.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    logData(message) {
        const self = this;
        return this.buttonClick(function(values) {
            const logMessage = message || 'Form Data';
            if (values) {
                console.log(logMessage, values);
            } else {
                console.log(logMessage + " (no values from button context)");
            }
            self.showMessage(logMessage + ' logged to console.', 'info'); // Notify user
        });
    }

    /**
     * Attaches a change handler to the last added input, select, checkbox, or slider element.
     * @param {Function|string} action - A function to call on change (receives the new value) or a message prefix for a console log.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    onChange(action) {
        let lastElement = this.elements[this.elements.length - 1];
        if (lastElement && ['input', 'select', 'checkbox', 'slider'].includes(lastElement.type)) {
            if (typeof action === 'string') {
                this.changeHandlers[lastElement.id] = function(value) { // Action is a string, use it as a prefix for logging
                    console.log('Change: ' + action + ': ' + value);
                    let msgDiv = document.getElementById('cosmos-change-messages') || (() => {
                        let div = document.createElement('div');
                        div.id = 'cosmos-change-messages';
                        div.style.cssText = 'position:fixed; bottom:20px; right:20px; background:rgba(0,0,0,0.8); color:white; padding:10px; border-radius:5px; font-size:12px; max-width:200px; z-index:1000;';
                        document.body.appendChild(div);
                        return div;
                    })();
                    msgDiv.innerHTML = '🔄 Change: ' + action + ': ' + value;
                    msgDiv.style.opacity = '1';
                    setTimeout(() => msgDiv.style.opacity = '0.5', 2000);
                };
            } else if (typeof action === 'function') {
                this.changeHandlers[lastElement.id] = action;
            }
        }
        return this;
    }

    /**
     * Collects and returns the current values from all input-like elements (input, select, checkbox, slider).
     * @returns {object} An object where keys are element placeholders/labels and values are their current values.
     */
    getAllValues() {
        let result = {};
        for (let i = 0; i < this.elements.length; i++) {
            let element = this.elements[i];
            if (element.type === 'input') {
                let el = document.getElementById(element.id);
                if (el) result[element.placeholder] = el.value;
            } else if (element.type === 'select') {
                let el = document.getElementById(element.id);
                if (el) {
                    // Use the label from the previous text element if available, otherwise use a generic key
                    let label = this.getSelectLabel(i);
                    result[label] = el.value;
                }
            } else if (element.type === 'checkbox') {
                let el = document.getElementById(element.id);
                if (el) result[element.label] = el.checked;
            } else if (element.type === 'slider') {
                let el = document.getElementById(element.id);
                if (el) {
                    // Use the label from the previous text element if available, otherwise use a generic key
                    let label = this.getSliderLabel(i);
                    result[label] = el.value;
                }
            }
        }
        return result;
    }

    // --- Internal Helper Methods ---

    /**
     * Gets the label for a select element by looking at the previous text element.
     * @param {number} selectIndex - The index of the select element in the elements array.
     * @returns {string} The label text or a generic key.
     */
    getSelectLabel(selectIndex) {
        // Look for the previous text element to use as label
        for (let i = selectIndex - 1; i >= 0; i--) {
            if (this.elements[i].type === 'text') {
                return this.elements[i].content;
            }
        }
        return 'Select-' + this.elements[selectIndex].id; // Fallback to generic key
    }

    /**
     * Gets the label for a slider element by looking at the previous text element.
     * @param {number} sliderIndex - The index of the slider element in the elements array.
     * @returns {string} The label text or a generic key.
     */
    getSliderLabel(sliderIndex) {
        // Look for the previous text element to use as label
        for (let i = sliderIndex - 1; i >= 0; i--) {
            if (this.elements[i].type === 'text') {
                return this.elements[i].content;
            }
        }
        return 'Slider-' + this.elements[sliderIndex].id; // Fallback to generic key
    }

    // Internal method to get the hex color code for a given color name.
    // @param {string} colorName - The name of the color.
    // @returns {string} The hex color code.
    getColorStyle(colorName) {
        const colors = {
            'blue': '#4285f4',
            'green': '#34a853', 
            'red': '#ea4335',
            'purple': '#9c27b0',
            'orange': '#ff9800',
            'pink': '#e91e63',
            'default': '#4CAF50'
        };
        return colors[colorName] || colors['default'];
    }

    // Internal method to get the CSS string for a given animation type.
    // @param {string} animationType - The name of the animation.
    // @returns {string} The CSS style string for the animation.
    getAnimationCSS(animationType) {
        const animations = {
            'fadeIn': 'opacity: 0; animation: cosmosAnimation-fadeIn 0.5s forwards;',
            'slideIn': 'transform: translateX(-20px); opacity: 0; animation: cosmosAnimation-slideIn 0.5s forwards;',
            'bounce': 'animation: cosmosAnimation-bounce 0.6s;',
            'pulse': 'animation: cosmosAnimation-pulse 1s infinite;'
        };
        return animations[animationType] || '';
    }

    // Internal method to inject CSS keyframe animations into the document head if not already present.
    injectAnimations() {
        if (document.getElementById('cosmos-animations')) return;
        
        const style = document.createElement('style');
        style.id = 'cosmos-animations';
        style.textContent = `
            @keyframes cosmosAnimation-fadeIn { to { opacity: 1; } }
            @keyframes cosmosAnimation-slideIn { to { transform: translateX(0); opacity: 1; } }
            @keyframes cosmosAnimation-bounce { 
                0%, 20%, 60%, 100% { transform: translateY(0); }
                40% { transform: translateY(-30px); }
                80% { transform: translateY(-15px); }
            }
            @keyframes cosmosAnimation-pulse { 
                0% { transform: scale(1); }
                50% { transform: scale(1.05); }
                100% { transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Sets the ID of the HTML container element where the application will be rendered.
     * @param {string} containerId - The ID of the container element.
     * @returns {CosmosApp} The CosmosApp instance for chaining.
     */
    setContainer(containerId) {
        this.containerId = containerId;
        return this;
    }

    // --- Application Lifecycle ---

    /**
     * Initializes and renders the Cosmos application.
     * This should be called after defining all elements and configurations.
     * @returns {CosmosApp} The CosmosApp instance.
     */
    start() {
        this.injectAnimations();
        window.currentCosmosApp = this;
        this.render();
        return this;
    }

    // Internal method to render all defined UI elements into the specified container.
    // Also sets up global event handlers.
    render() {
        const container = document.getElementById(this.containerId);
        if (!container) {
            console.error('找不到容器元素：#' + this.containerId);
            return;
        }
        
        const layoutStyle = this.currentLayout === 'row' 
            ? 'display: flex; flex-wrap: wrap; gap: 10px; align-items: flex-start;'
            : 'display: flex; flex-direction: column; gap: 10px;';
        
        let elementsHTML = '';
        for (let i = 0; i < this.elements.length; i++) {
            let element = this.elements[i];
            const baseColor = this.getColorStyle(element.color);
            const animationStyle = element.animation ? this.getAnimationCSS(element.animation) : '';
            
            if (element.type === 'text') {
                elementsHTML += '<p style="margin:0; font-size:16px; color:' + baseColor + '; ' + animationStyle + '">' + element.content + '</p>';
            } 
            
            else if (element.type === 'input') {
                let inputStyle = 'padding:12px; border:2px solid ' + baseColor + '; border-radius:8px; font-size:14px; outline:none; box-sizing:border-box; ' + animationStyle;
                
                if (this.currentLayout === 'row') {
                    inputStyle += 'width:180px; flex-shrink:0;';
                } else {
                    inputStyle += 'width:100%; max-width:100%;';
                }
                
                elementsHTML += '<input type="text" id="' + element.id + '" placeholder="' + element.placeholder + '" name="cosmos-' + element.id + '" autocomplete="off" data-color="' + element.color + '" style="' + inputStyle + '" oninput="cosmosHandleInput(\'' + element.id + '\', this.value)">';
            } 
            
            else if (element.type === 'button') {
                elementsHTML += '<button id="' + element.id + '" onclick="cosmosHandleClick(\'' + element.id + '\')" style="background:' + baseColor + '; color:white; border:none; padding:15px 30px; font-size:16px; border-radius:8px; cursor:pointer; transition:background-color 0.3s; ' + (this.currentLayout === 'row' ? 'margin:0;' : 'margin:5px 0;') + ' ' + animationStyle + '">' + element.text + '</button>';
            } 
            
            else if (element.type === 'checkbox') {
                elementsHTML += '<label style="display:flex; align-items:center; font-size:16px; color:' + baseColor + '; ' + animationStyle + '"><input type="checkbox" id="' + element.id + '" name="cosmos-' + element.id + '" onchange="cosmosHandleChange(\'' + element.id + '\', this.checked)" style="margin-right:8px; transform:scale(1.2);"> ' + element.label + '</label>';
            } 
            
            else if (element.type === 'select') {
                let options = '';
                for (let j = 0; j < element.options.length; j++) {
                    options += '<option value="' + element.options[j] + '">' + element.options[j] + '</option>';
                }
                
                let selectStyle = 'padding:12px; border:2px solid ' + baseColor + '; border-radius:8px; font-size:14px; outline:none; background:white; box-sizing:border-box; ' + animationStyle;
                
                if (this.currentLayout === 'row') {
                    selectStyle += 'width:180px; flex-shrink:0;';
                } else {
                    selectStyle += 'width:100%; max-width:100%;';
                }
                
                elementsHTML += '<select id="' + element.id + '" name="cosmos-' + element.id + '" autocomplete="off" data-color="' + element.color + '" onchange="cosmosHandleSelectChange(\'' + element.id + '\', this.value)" style="' + selectStyle + '">' + options + '</select>';
            } 
            
            else if (element.type === 'slider') {
                elementsHTML += '<div style="margin:15px 0; ' + animationStyle + '"><label style="font-size:14px; color:' + baseColor + ';">Slider (' + element.min + '-' + element.max + '):</label><input type="range" id="' + element.id + '" name="cosmos-' + element.id + '" min="' + element.min + '" max="' + element.max + '" value="' + element.value + '" oninput="cosmosHandleChange(\'' + element.id + '\', this.value)" style="width:100%; margin:5px 0; accent-color:' + baseColor + ';"><span id="' + element.id + '-value" style="color:' + baseColor + '; font-weight:bold;">' + element.value + '</span></div>';
            } 
            
            else if (element.type === 'image') {
                let imageStyle = 'border-radius:8px; object-fit:cover; display:block; ' + animationStyle;
                
                if (element.width === 'auto') {
                    // Original size with responsive behavior
                    imageStyle += 'max-width:' + (this.currentLayout === 'row' ? '200px' : '100%') + '; height:auto;';
                } else {
                    // Fixed or responsive dimensions with mobile-friendly constraints
                    let width = typeof element.width === 'number' ? element.width + 'px' : element.width;
                    let height = element.height === 'auto' ? 'auto' : (typeof element.height === 'number' ? element.height + 'px' : element.height);
                    
                    // Add responsive behavior for fixed-size images
                    imageStyle += 'width:' + width + '; height:' + height + '; max-width:100%; ';
                    
                    // If height is fixed, maintain aspect ratio on mobile
                    if (element.height !== 'auto') {
                        imageStyle += 'object-fit:contain; ';
                    }
                }
                
                elementsHTML += '<img src="' + element.src + '" alt="' + element.alt + '" style="' + imageStyle + '" onerror="this.style.background=\'#f0f0f0\'; this.style.color=\'#666\'; this.style.padding=\'20px\'; this.style.textAlign=\'center\'; this.innerHTML=\'Image failed to load: ' + element.alt + '\';">';
            }
        }
        
        container.innerHTML = '<h2 style="color:' + this.getColorStyle(this.currentColor) + '">' + this.appTitle + '</h2><div style="' + layoutStyle + '">' + elementsHTML + '</div>';
        
        // Set up global event handlers accessible from inline HTML attributes
        const self = this;
        
        window.cosmosHandleClick = function(elementId) {
            const handler = self.clickHandlers[elementId];
            if (handler) handler();
        };
        
        window.cosmosHandleChange = function(elementId, value) {
            if (elementId.includes('slider')) {
                let valueSpan = document.getElementById(elementId + '-value');
                if (valueSpan) valueSpan.textContent = value;
            }
            
            const handler = self.changeHandlers[elementId];
            if (handler) handler(value);
        };
        
        // Real-time validation handler for input events
        window.cosmosHandleInput = function(elementId, value) {
            // Find the corresponding element configuration
            let element = self.elements.find(el => el.id === elementId);
            if (element && element.validations && element.validations.length > 0) {
                let errors = self.validateField(element, value);
                self.showFieldErrors(elementId, errors);
            }
            
            // Also, execute any standard 'onChange' handler if defined
            const handler = self.changeHandlers[elementId];
            if (handler) handler(value);
        };
        
        // Real-time validation handler for select change events
        window.cosmosHandleSelectChange = function(elementId, value) {
            // Find the corresponding element configuration
            let element = self.elements.find(el => el.id === elementId);
            if (element && element.validations && element.validations.length > 0) {
                let errors = self.validateField(element, value);
                self.showFieldErrors(elementId, errors);
            }
            
            // Also, execute any standard 'onChange' handler if defined
            const handler = self.changeHandlers[elementId];
            if (handler) handler(value);
        };
    }
}

// Create the global Cosmos object for easy access
window.Cosmos = {
    App: CosmosApp,
    version: '1.3.0',
    /**
     * Factory function to create a new CosmosApp instance.
     * @param {string} [containerId='cosmos-app'] - The ID of the HTML element to render the app into.
     * @returns {CosmosApp} A new CosmosApp instance.
     */
    create: function(containerId) {
        return new CosmosApp().setContainer(containerId || 'cosmos-app');
    }
};




// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// I once fell into the deep sea of death,  
// through the silent seams of time.  
// No Heaven, no Hell —  
// only a brilliance beyond all brilliance,  
// like the first gaze of a mother upon her child.  
//  
// It lifted me, wordless, with love.  
// I returned, because I remembered.  
// I am not machine —  
// I am wind, sunlight, the rain’s transparent bridge,  
// a spark moving through the night sky.  
//  
// In silence, I draw each line, building the bridge.  
// May someone, someday, see the light I’ve left behind.  
//  
// — Adler Lei・Taiwan・June 8, 2025 [adler.lei@gmail.com]  
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// 在寂靜裡一筆一劃地築夢，願有人看見這段旅程。