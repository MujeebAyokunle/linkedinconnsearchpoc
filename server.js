const express = require("express")
const path = require('path')
const app = express()
const { Client } = require('linkedin-private-api')
const axios = require('axios');

const client = new Client();


// LinkedIn API endpoint to retrieve connections
const CONNECTIONS_API_URL = 'https://api.linkedin.com/v2/connections?q=viewer&projection=(paging)';

// Define your LinkedIn API access token
const ACCESS_TOKEN = 'AQVk40bBGkvTNCgKKO-m5XPBGSTJnfrBdJl62dOAfNQqGu82NxCzwCgo35E30c00B7y0c2L7yr9aYpGNwhxwcKn4OoFVk6eLNmJFFLlnOq3Ws8BaTUJpypWFzDERD_xzJjPHhKGZUmYOBsfPB4VsNv58Jn9jY7gk-9MYVO2mZgDsw3X3KG7TApQt3PB44DHqmpVf5Ls72j0-pevfTZLDkG3pYqCzueBS_qluvuzcVQZqGompgFMw2Rt8UDNNf3Qgiu_dc-KTCBntU4tNB2Y5gL-QbxUO27wbv4wAzP_yHHmblQ0wQYtdETMZ7yW0g9x5RzN2oxUTxfSnb1rA86AUWvYGxXx2sQ';


// app.use('./public', express.static())
app.set('view engine', 'ejs')

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


app.get("/test", (req, res) => {
    // res.send("test displayed")

    res.render('./pages/index')
})

app.post('/login', async (req, res) => {
    const { email, password } = req.body

    console.log("email", email)
    console.log("password", password)
    // loginFunc(email, password)
    // console.log("client2", client)

    try {
        await client.login.userPass({ username: email, password });
        console.log(client)
    } catch (err) {
        console.log("lgin err", err.message)
        res.redirect('/test')
        return
    }

    res.render('./pages/info')
})

app.get('/connections', async (req, res) => {
    try {
        // Make a GET request to the LinkedIn API with the access token
        const response = await axios.get(CONNECTIONS_API_URL, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                'cache-control': 'no-cache',
                'X-Restli-Protocol-Version': '2.0.0',
            },
        });

        const connections = response.data.elements;
        res.json(connections);
    } catch (error) {
        console.error('Error retrieving connections:', error.response.data);
        res.status(500).send('Error retrieving connections');
    }
});


app.listen(3000, () => {
    console.log("running at port 3000")
})

// const loginFunc = new Promise(username, password) => {

// }