const https = require('https');

function runFunc() {
    // Set access token and occupation search parameters
    const accessToken = 'AQVk40bBGkvTNCgKKO-m5XPBGSTJnfrBdJl62dOAfNQqGu82NxCzwCgo35E30c00B7y0c2L7yr9aYpGNwhxwcKn4OoFVk6eLNmJFFLlnOq3Ws8BaTUJpypWFzDERD_xzJjPHhKGZUmYOBsfPB4VsNv58Jn9jY7gk-9MYVO2mZgDsw3X3KG7TApQt3PB44DHqmpVf5Ls72j0-pevfTZLDkG3pYqCzueBS_qluvuzcVQZqGompgFMw2Rt8UDNNf3Qgiu_dc-KTCBntU4tNB2Y5gL-QbxUO27wbv4wAzP_yHHmblQ0wQYtdETMZ7yW0g9x5RzN2oxUTxfSnb1rA86AUWvYGxXx2sQ';
    const companyName = 'Google';
    const occupation = 'Software Engineer';

    // Build API request options
    const options = {
        hostname: 'api.linkedin.com',
        path: '/v2/connections?q=viewer&projection=(elements(*(to~)),paging)&start=0&count=10',
        headers: {
            'Authorization': 'Bearer ' + accessToken,
            'cache-control': 'no-cache',
            'X-Restli-Protocol-Version': '2.0.0'
        }
    };

    // Send API request
    https.get(options, (res) => {
        let data = '';

        res.on('data', (chunk) => {
            data += chunk;
        });

        res.on('end', () => {
            const result = JSON.parse(data);

            console.log("result", result)
            return
            // Print connection information
            result.elements.forEach((element) => {
                console.log('First Name: ' + element.firstName.localized.en_US);
                console.log('Last Name: ' + element.lastName.localized.en_US);
                console.log('Headline: ' + element.headline.localized.en_US);
                console.log('Profile Picture: ' + element.profilePicture['displayImage~'].elements[0].identifiers[0].identifier);
                console.log('Vanity Name: ' + element.vanityName);
            });
        });
    }).on('error', (error) => {
        console.error(error);
    });

}

runFunc()
