const docId = 'M0S3q6DRiF';
const tableIdOrName = 'grid-zHoVwcQDbH';
const token = '3974b4fb-0494-491e-b106-6d8689d287fc';
const url = `https://coda.io/apis/v1/docs/${docId}/tables/${tableIdOrName}/rows`;

const form = document.getElementById('form');
const fullname = document.getElementById('fullname');
const email = document.getElementById('email');
const mobile = document.getElementById('mobile');
const company = document.getElementById('company');

const packages = document.querySelector('.discount-contactus__packages');
const checkbox = form.querySelectorAll('.discount-contactus__checkbox');
let checked = 0;

const cdn = document.getElementById('cdn');
const storage = document.getElementById('storage');
const vod = document.getElementById('vod');

const button = document.getElementById('button');
let isOkToFetch = true;

form.addEventListener('submit', (e) => {
    e.preventDefault();

    // reset isOkToFetch
    isOkToFetch = true;

    // reset checked
    checked = 0;

    checkInputs();
});

function checkInputs() {
    // get the values from the inputs
    const fullnameValue = fullname.value.trim();
    const emailValue = email.value.trim();
    const mobileValue = mobile.value.trim();
    const companyValue = company.value.trim();

    const cdnValue = cdn.checked;
    const storageValue = storage.checked;
    const vodValue = vod.checked;

    // check if fullnameValue is empty
    if (fullnameValue === '') {
        // it is not okay to fetch!
        isOkToFetch = false;

        // add error class to fullname
        setErrorFor(fullname);
    } else {
        setSuccessFor(fullname);
    }

    // check if emailValue is empty
    if (emailValue === '') {
        // it is not okay to fetch!
        isOkToFetch = false;

        // add error class to email
        setErrorFor(email);
    } else {
        setSuccessFor(email);
    }

    // check if mobileValue is empty
    if (mobileValue === '') {
        // it is not okay to fetch!
        isOkToFetch = false;

        // add error class to mobile
        setErrorFor(mobile);
    } else {
        setSuccessFor(mobile);
    }

    // check if companyValue is empty
    if (companyValue === '') {
        // it is not okay to fetch!
        isOkToFetch = false;

        // add error class to company
        setErrorFor(company);
    } else {
        setSuccessFor(company);
    }

    checkbox.forEach((item) => {
        if (item.checked) {
            checked++;
        }
    });

    if (checked === 0) {
        isOkToFetch = false;
        console.log('لطفا حداقل یک گزینه را انتخاب کنید');
        packages.classList.add('discount-contactus__packages--error');
        return;
    } else {
        if (packages.classList.contains('discount-contactus__packages--error')) {
            packages.classList.remove('discount-contactus__packages--error');
        }
    }

    const data = {
        'rows': [
            {
                'cells': [
                    {
                        'column': 'fullname',
                        'value': fullnameValue,
                    },
                    {
                        'column': 'email',
                        'value': emailValue,
                    },
                    {
                        'column': 'mobile',
                        'value': mobileValue,
                    },
                    {
                        'column': 'company',
                        'value': companyValue,
                    },
                    {
                        'column': 'cdn',
                        'value': cdnValue,
                    },
                    {
                        'column': 'storage',
                        'value': storageValue,
                    },
                    {
                        'column': 'vod',
                        'value': vodValue,
                    },
                ],
            },
        ],
    };

    if (isOkToFetch) {
        // disable the submit button
        button.disabled = true;

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success: ', data);

            // enable the submit button
            button.disabled = false;

            // reset form
            form.reset();
        })
        .catch((error) => {
            console.error('Error: ', error);

            // enable the submit button
            button.disabled = false;
        });
    }
}

// add error class to input
function setErrorFor(input) {
    // remove success class
    input.classList.remove('discount-contactus__form-control--success');
    // add error class
    input.classList.add('discount-contactus__form-control--error');
}

// add success class to input
function setSuccessFor(input) {
    // remove error class
    input.classList.remove('discount-contactus__form-control--error');
    // add success class
    // input.classList.add('discount-contactus__form-control--success');
}
