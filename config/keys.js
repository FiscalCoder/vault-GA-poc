const axios = require('axios');
const vaultURL = "http://54.165.243.121:8200/v1/testPathV1/reactAdminERP"

module.exports = () => new Promise(async (resolve, reject) => {
    try {
        const response = await axios.get(vaultURL, {
            headers: {
                'Content-Type': 'application/json',
                'X-Vault-Token': 'hvs.DnsnMiUnyDa1xDrzGo1DOxzL'
            }
        });
        console.log(response.data);
        resolve(response.data);
    } catch (error) {
        console.error(error);
        resolve(error);
    }

})


// module.exports = {
//     mongoURI: "mongodb+srv://sampleUsername:samplePassword@cluster0.d8pjn.mongodb.net/adminERPDB?retryWrites=true&w=majority",
//     secretOrKey: "FxUum76z"
// };