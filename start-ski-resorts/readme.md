jQuery List
================
Build a list App that takes user input and lists it in an unordered list on the page.

* [Demo](http://jsbin.com/bojafa/1/quiet)
* [Start](http://jsbin.com/bojafa/2/edit?js,output)

### Hint HTML5 Validation

```javascript

    // Listen for a form.submit() instead of a button click
    // This way HTML5 will handle the validation and only 
    // raise a submit event once the form is valid
    $('form').submit(function(e) {
    
        // Stop the Form From Submitting
        e.preventDefault();
    });
    
```

### Steps

1. When the document is ready collect input from the user
2. Display the collected Resorts in a list on the DOM
3. Save the list using webstorage
4. When the page loads load the list from webstorage
