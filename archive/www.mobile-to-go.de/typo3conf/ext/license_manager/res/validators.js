jQuery.validator.addMethod("myname", function(value, element) {
    return this.optional(element) || /^[a-züäöéèàâß\-.,\: ]*$/i.test(value);
}, "Not allowed characters!");
jQuery.validator.addMethod("myurl", function(value, element) {
    return this.optional(element) || /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/i.test(value);
}, "Invalid URL!");
jQuery.validator.addMethod("stock", function(value, element) {
    return this.optional(element) || /^[\w\^.,\-\/ ]+$/.test(value);
}, "Not allowed characters!");
jQuery.validator.addMethod("phone", function(value, element) {
    return this.optional(element) || /^((\+[0-9]{2,4}( ?[0-9]+? ?| ?\([0-9]+?\) ?))|(\(0[0-9 ]+?\) ?)|(0[0-9]+? ?( ?|-|\/) ?))[0-9]+?[0-9 \/-]*[0-9]$/.test(value);
}, "No valid telephon number format!");
jQuery.validator.addMethod("alphanumeric", function(value, element) {
    return this.optional(element) || /^[\wüäöéèàâß\(\)\-\/.: ]+$/i.test(value);
}, "Not allowed characters!");
jQuery.validator.addMethod("myalphanumeric", function(value, element) {
    return this.optional(element) || /^[\w]+$/i.test(value);
}, "Not allowed characters!");
jQuery.validator.addMethod("posinteger", function(value, element) {
    return this.optional(element) || /^\d+$/.test(value);
}, "Only numbers are allowed!");
jQuery.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-züäöéèàâß ]+$/i.test(value);
}, "Only letters and spaces are allowed!");
jQuery.validator.addMethod("mydate", function(value, element) {
    return this.optional(element) || /^\d{2}.\d{2}.\d{4}$/i.test(value);
}, "Use the common date format DD.MM.YYYY!");
jQuery.validator.addMethod("accept", function(value, element, param) {
    // Split mime on commas incase we have multiple types we can accept
    var typeParam = typeof param === "string" ? param.replace(/,/g, '|') : "image/*",
    optionalValue = this.optional(element),
    i, file;
    // Element is optional
    if(optionalValue) {
        return optionalValue;
    }
    if($(element).attr("type") === "file") {
        // If we are using a wildcard, make it regex friendly
        typeParam = typeParam.replace("*", ".*");
        // Check if the element has a FileList before checking each file
        if(element.files && element.files.length) {
            for(i = 0; i < element.files.length; i++) {
                file = element.files[i];
                // Grab the mimtype from the loaded file, verify it matches
                if(!file.type.match(new RegExp( ".?(" + typeParam + ")$", "i"))) {
                    return false;
                }
            }
        }
    }
    // Either return true because we've validated each file, or because the
    // browser does not support element.files and the FileList feature
    return true;
}, jQuery.format("Please select a file with correct extension!"));