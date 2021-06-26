const form = document.getElementById('myForm');
const email = document.getElementById('email');
const country = document.getElementById('country');
const zip = document.getElementById('zip');
const pass1 = document.getElementById('pass1');
const pass2 = document.getElementById('pass2');

// Replacing default Validity Message. There's probably
// a method that does this. Gotta look into it.
(function initialCheck() {
	if (!email.validity.valid) {
		email.setCustomValidity('Fill out this field with gmail.com address.');
	} else {
		email.setCustomValidity('');
	}
	if (!country.validity.valid) {
		country.setCustomValidity('Provide your country.');
	} else {
		country.setCustomValidity('');
	}
	if (!zip.validity.valid) {
		zip.setCustomValidity('Zip code in 00-000 format or similar.');
	} else {
		zip.setCustomValidity('');
	}
	pass1.setCustomValidity('Provide at least 6 characters long password.');
	pass2.setCustomValidity('Repeat the password.');
})();

// Listening for input in each field.
email.addEventListener('input', () => {
	if (!email.validity.valid) {
		showError();
	}
});

country.addEventListener('input', () => {
	if (!country.validity.valid) {
		showError();
	}
});

zip.addEventListener('input', () => {
	if (!zip.validity.valid) {
		showError();
	}
});

pass1.addEventListener('input', () => {
	if (!pass1.validity.valid) {
		showError();
	}
});

pass2.addEventListener('input', () => {
	if (!pass2.validity.valid) {
		showError();
	}
});

// Check validity of fields and submit, else prevents it.
form.addEventListener('submit', (e) => {
	if (
		email.validity.valid &&
		country.validity.valid &&
		zip.validity.valid &&
		pass1.validity.valid &&
		pass2.validity.valid
	) {
		alert('All good, we got your data. Now enjoy your targeted ads. :)');
	} else {
		e.preventDefault();
	}
});

// This checks validity of all fields on focusout.
// Found this to be the best way to recheck passwords
// after they passed the validity check once. Example:
// pass1 = 123; pass2 = 123; is valid. Now add 4 to pass2.
// It would still show them as valid and let it submit.
// Tried looking for better solution but my google fu
// is too weak right now. Will keep looking.
form.addEventListener('focusout', () => {
	showError();
});

// Show appropriate error message if values are invalid.
function showError() {
	if (email.validity.valueMissing) {
		email.setCustomValidity('Fill out this field with gmail.com address.');
	} else if (email.value.split('@')[0].length < 3) {
		email.setCustomValidity(
			'Your email (without @gmail.com part) should be at least 3 characters long.'
		);
	} else if (email.validity.typeMismatch) {
		email.setCustomValidity('Provide an email address.');
	} else if (email.validity.patternMismatch) {
		email.setCustomValidity('Currently we only accept @gmail.com.');
	} else {
		email.setCustomValidity('');
	}

	if (country.validity.valueMissing) {
		country.setCustomValidity('Provide your country.');
	} else if (country.validity.tooShort) {
		country.setCustomValidity(
			'Country name can not be shorter than 4 letters.'
		);
	} else if (country.validity.patternMismatch) {
		country.setCustomValidity('Use letters only.');
	} else {
		country.setCustomValidity('');
	}

	if (zip.validity.valueMissing) {
		zip.setCustomValidity('Zip code in 00-000 format or similar.');
	} else if (zip.validity.tooShort) {
		zip.setCustomValidity(
			'Zip code too short, at least 6 characters including hyphen (-).'
		);
	} else if (!zip.value.includes('-')) {
		zip.setCustomValidity('Use hyphen (-) to split your zip code.');
	} else if (zip.value.split('-')[0].length < 2) {
		zip.setCustomValidity(
			'Value on the left side of hyphen needs to be at least 2 characters long.'
		);
	} else if (zip.value.split('-')[1].length < 3) {
		zip.setCustomValidity(
			'Value on the right side of hyphen needs to be at least 3 characters long.'
		);
	} else {
		zip.setCustomValidity('');
	}

	if (pass1.validity.valueMissing) {
		pass1.setCustomValidity('Provide at least 6 characters long password.');
	} else if (pass1.validity.tooShort) {
		pass1.setCustomValidity(
			'Password needs to be at least 6 characters long.'
		);
	} else {
		pass1.setCustomValidity('');
	}

	if (pass2.validity.valueMissing) {
		pass2.setCustomValidity('Repeat the password.');
	} else if (pass2.validity.tooShort) {
		pass2.setCustomValidity(
			'Password needs to be at least 6 characters long.'
		);
	} else {
		pass2.setCustomValidity('');
	}

	if (pass1.value.length !== pass2.value.length) {
		pass1.setCustomValidity('Password are different length.');
		pass2.setCustomValidity('Password are different length.');
	} else if (pass1.value !== pass2.value) {
		pass1.setCustomValidity('Passwords do not match.');
		pass2.setCustomValidity('Passwords do not match.');
	} else {
		pass1.setCustomValidity('');
		pass2.setCustomValidity('');
	}
}
