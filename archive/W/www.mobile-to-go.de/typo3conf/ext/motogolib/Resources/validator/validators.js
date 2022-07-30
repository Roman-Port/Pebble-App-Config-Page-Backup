$.validator.addMethod("myname", function(value, element) {       
    return this.optional(element) || /^[a-züäöéèàâß\-.,\: ]*$/i.test(value);
}, "Nicht zulässige Zeichen!");

$.validator.addMethod("myurl", function(value, element) {
    return this.optional(element) || /^(http|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&amp;:/~\+#]*[\w\-\@?^=%&amp;/~\+#])?$/i.test(value);
}, "Ungültige URL!");

$.validator.addMethod("multiemails", function(value, element) {
    return this.optional(element) || /^([a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\,?)*$/i.test(value);
}, "Ungültige E-Mail oder nicht per ',' getrennt!");

$.validator.addMethod("phone", function(value, element) {
    return this.optional(element) || /^((\+[0-9]{2,4}( ?[0-9]+? ?| ?\([0-9]+?\) ?))|(\(0[0-9 ]+?\) ?)|(0[0-9]+? ?( ?|-|\/) ?))[0-9]+?[0-9 \/-]*[0-9]$/.test(value);
}, "Kein gültiges Telefonnummerformat!");

$.validator.addMethod("alphanumeric", function(value, element) {
    return this.optional(element) || /^[\wüäöéèàâß\(\)\-\/.: ]+$/i.test(value);
}, "Nicht zulässige Zeichen!");

$.validator.addMethod("posinteger", function(value, element) {
    return this.optional(element) || /^\d+$/.test(value);
}, "Nur positive Zahlen verwenden!");

$.validator.addMethod("lettersonly", function(value, element) {
    return this.optional(element) || /^[a-züäöéèàâß ]+$/i.test(value);
}, "Nur Buchstaben und Leerzeichen verwenden!");

$.validator.addMethod("float", function(value, element) {
    return this.optional(element) || /^\d+(\.\d{1,2})?$/.test(value);
}, "Dezimalzahl, wie z.B. 4.2 oder 6.23!");

$.validator.addMethod("amount", function(value, element) {
    return this.optional(element) || /^\d+.\d{2}$/.test(value);
}, "Geldbetrag, wie z.B. 12.34!");

$.validator.addMethod("posamount", function(value, element) {
    return this.optional(element) || (/^\d+.\d{2}$/.test(value) && value > 0);
}, "Positiver Geldbetrag, wie z.B. 12.34!");

$.validator.addMethod("stock", function(value, element) {
    return this.optional(element) || /^[\w\^.,\-\/ ]+$/.test(value);
}, "Verwendung von nicht zulässigen Zeichen!");

$.validator.addMethod("time", function(value, element) {
	return this.optional(element) || /^([01]\d|2[0-3]|[0-9])(:[0-5]\d){1,2}$/.test(value);
}, "Bitte eine gültige Zeit zwischen 00:00 und 23:59 eingeben!");

$.validator.addMethod("mytime", function(value, element) {
    return this.optional(element) || /^\d{2}:\d{2}$/i.test(value);
}, "Nur das Zeitformat HH:MM verwenden!");

$.validator.addMethod("mydate", function(value, element) {
    return this.optional(element) || /^\d{2}.\d{2}.\d{4}$/i.test(value);
}, "Nur das Datumsformat DD.MM.YYYY verwenden!");

$.validator.addMethod("mydatetime", function(value, element) {
    return this.optional(element) || /^\d{2}.\d{2}.\d{4} \d{2}:\d{2}$/i.test(value);
}, "Nur das Zeitformat DD.MM.YYYY HH:MM verwenden!");

$.validator.addMethod( "notequalto", function( value, element, param ) {
	return this.optional(element) || !$.validator.methods.equalTo.call( this, value, element, param );
}, "Bitte unterschiedliche Werte eingeben!" );

$.validator.addMethod("nowhitespace", function(value, element) {
	return this.optional(element) || /^\S+$/i.test(value);
}, "Leerzeichen sind nicht erlaubt!");

/**
* Return true if the field value matches the given format RegExp
*
* @example $.validator.methods.pattern("AR1004",element,/^AR\d{4}$/)
* @result true
*
* @example $.validator.methods.pattern("BR1004",element,/^AR\d{4}$/)
* @result false
*
* @name $.validator.methods.pattern
* @type Boolean
* @cat Plugins/Validate/Methods
*/
$.validator.addMethod("pattern", function(value, element, param) {
	if (this.optional(element)) {
		return true;
	}
	if (typeof param === "string") {
		param = new RegExp("^(?:" + param + ")$");
	}
	return param.test(value);
}, "Falsche Eingabe!");

$.validator.addMethod("accept", function(value, element, param) {
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
}, "Bitte einen File mit richtiger Endung wählen!");

/**
 * BIC is the business identifier code (ISO 9362). This BIC check is not a guarantee for authenticity.
 *
 * BIC pattern: BBBBCCLLbbb (8 or 11 characters long; bbb is optional)
 *
 * BIC definition in detail:
 * - First 4 characters - bank code (only letters)
 * - Next 2 characters - ISO 3166-1 alpha-2 country code (only letters)
 * - Next 2 characters - location code (letters and digits)
 *   a. shall not start with '0' or '1'
 *   b. second character must be a letter ('O' is not allowed) or one of the following digits ('0' for test (therefore not allowed), '1' for passive participant and '2' for active participant)
 * - Last 3 characters - branch code, optional (shall not start with 'X' except in case of 'XXX' for primary office) (letters and digits)
 */
$.validator.addMethod("bic", function(value, element) {
    return this.optional( element ) || /^([A-Z]{6}[A-Z2-9][A-NP-Z1-2])(X{3}|[A-WY-Z0-9][A-Z0-9]{2})?$/.test( value );
}, "Bitte eine gültige BIC eingeben!");

/**
 * IBAN is the international bank account number.
 * It has a country - specific format, that is checked here too
 */
$.validator.addMethod("iban", function(value, element) {
	// some quick simple tests to prevent needless work
	if (this.optional(element)) {
		return true;
	}

	// remove spaces and to upper case
	var iban = value.replace(/ /g, "").toUpperCase(),
		ibancheckdigits = "",
		leadingZeroes = true,
		cRest = "",
		cOperator = "",
		countrycode, ibancheck, charAt, cChar, bbanpattern, bbancountrypatterns, ibanregexp, i, p;

	// check the country code and find the country specific format
	countrycode = iban.substring(0, 2);
	bbancountrypatterns = {
		"AL": "\\d{8}[\\dA-Z]{16}",
		"AD": "\\d{8}[\\dA-Z]{12}",
		"AT": "\\d{16}",
		"AZ": "[\\dA-Z]{4}\\d{20}",
		"BE": "\\d{12}",
		"BH": "[A-Z]{4}[\\dA-Z]{14}",
		"BA": "\\d{16}",
		"BR": "\\d{23}[A-Z][\\dA-Z]",
		"BG": "[A-Z]{4}\\d{6}[\\dA-Z]{8}",
		"CR": "\\d{17}",
		"HR": "\\d{17}",
		"CY": "\\d{8}[\\dA-Z]{16}",
		"CZ": "\\d{20}",
		"DK": "\\d{14}",
		"DO": "[A-Z]{4}\\d{20}",
		"EE": "\\d{16}",
		"FO": "\\d{14}",
		"FI": "\\d{14}",
		"FR": "\\d{10}[\\dA-Z]{11}\\d{2}",
		"GE": "[\\dA-Z]{2}\\d{16}",
		"DE": "\\d{18}",
		"GI": "[A-Z]{4}[\\dA-Z]{15}",
		"GR": "\\d{7}[\\dA-Z]{16}",
		"GL": "\\d{14}",
		"GT": "[\\dA-Z]{4}[\\dA-Z]{20}",
		"HU": "\\d{24}",
		"IS": "\\d{22}",
		"IE": "[\\dA-Z]{4}\\d{14}",
		"IL": "\\d{19}",
		"IT": "[A-Z]\\d{10}[\\dA-Z]{12}",
		"KZ": "\\d{3}[\\dA-Z]{13}",
		"KW": "[A-Z]{4}[\\dA-Z]{22}",
		"LV": "[A-Z]{4}[\\dA-Z]{13}",
		"LB": "\\d{4}[\\dA-Z]{20}",
		"LI": "\\d{5}[\\dA-Z]{12}",
		"LT": "\\d{16}",
		"LU": "\\d{3}[\\dA-Z]{13}",
		"MK": "\\d{3}[\\dA-Z]{10}\\d{2}",
		"MT": "[A-Z]{4}\\d{5}[\\dA-Z]{18}",
		"MR": "\\d{23}",
		"MU": "[A-Z]{4}\\d{19}[A-Z]{3}",
		"MC": "\\d{10}[\\dA-Z]{11}\\d{2}",
		"MD": "[\\dA-Z]{2}\\d{18}",
		"ME": "\\d{18}",
		"NL": "[A-Z]{4}\\d{10}",
		"NO": "\\d{11}",
		"PK": "[\\dA-Z]{4}\\d{16}",
		"PS": "[\\dA-Z]{4}\\d{21}",
		"PL": "\\d{24}",
		"PT": "\\d{21}",
		"RO": "[A-Z]{4}[\\dA-Z]{16}",
		"SM": "[A-Z]\\d{10}[\\dA-Z]{12}",
		"SA": "\\d{2}[\\dA-Z]{18}",
		"RS": "\\d{18}",
		"SK": "\\d{20}",
		"SI": "\\d{15}",
		"ES": "\\d{20}",
		"SE": "\\d{20}",
		"CH": "\\d{5}[\\dA-Z]{12}",
		"TN": "\\d{20}",
		"TR": "\\d{5}[\\dA-Z]{17}",
		"AE": "\\d{3}\\d{16}",
		"GB": "[A-Z]{4}\\d{14}",
		"VG": "[\\dA-Z]{4}\\d{16}"
	};

	bbanpattern = bbancountrypatterns[countrycode];
	// As new countries will start using IBAN in the
	// future, we only check if the countrycode is known.
	// This prevents false negatives, while almost all
	// false positives introduced by this, will be caught
	// by the checksum validation below anyway.
	// Strict checking should return FALSE for unknown
	// countries.
	if (typeof bbanpattern !== "undefined") {
		ibanregexp = new RegExp("^[A-Z]{2}\\d{2}" + bbanpattern + "$", "");
		if (!(ibanregexp.test(iban))) {
			return false; // invalid country specific format
		}
	}

	// now check the checksum, first convert to digits
	ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
	for (i = 0; i < ibancheck.length; i++) {
		charAt = ibancheck.charAt(i);
		if (charAt !== "0") {
			leadingZeroes = false;
		}
		if (!leadingZeroes) {
			ibancheckdigits += "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(charAt);
		}
	}

	// calculate the result of: ibancheckdigits % 97
	for (p = 0; p < ibancheckdigits.length; p++) {
		cChar = ibancheckdigits.charAt(p);
		cOperator = "" + cRest + "" + cChar;
		cRest = cOperator % 97;
	}
	return cRest === 1;
}, "Bitte eine gültige IBAN eingeben!");

/*
 * Translated default messages for the jQuery validation plugin.
 * Locale: DE (German, Deutsch)
 */
$.extend($.validator.messages, {
    required: "Dieses Feld ist ein Pflichtfeld.",
    maxlength: $.validator.format("Geben Sie bitte maximal {0} Zeichen ein."),
    minlength: $.validator.format("Geben Sie bitte mindestens {0} Zeichen ein."),
    rangelength: $.validator.format("Geben Sie bitte mindestens {0} und maximal {1} Zeichen ein."),
    email: "Geben Sie bitte eine gültige E-Mail Adresse ein.",
    url: "Geben Sie bitte eine gültige URL ein.",
    date: "Bitte geben Sie ein gültiges Datum ein.",
    number: "Geben Sie bitte eine Nummer ein.",
    digits: "Geben Sie bitte nur Ziffern ein.",
    equalTo: "Bitte denselben Wert wiederholen.",
    range: $.validator.format("Geben Sie bitte einen Wert zwischen {0} und {1} ein."),
    max: $.validator.format("Geben Sie bitte einen Wert kleiner oder gleich {0} ein."),
    min: $.validator.format("Geben Sie bitte einen Wert größer oder gleich {0} ein."),
    creditcard: "Geben Sie bitte eine gültige Kreditkarten-Nummer ein."
});