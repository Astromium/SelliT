import axios from "axios";

const BASE_URL = "http://192.168.1.10:3000/api/v1/products";

const getProducts = async (query) => {
    try {
        const res = await axios({
            method: 'GET',
            url: `${BASE_URL}?${query}`
        })
        if(res.data.status === 'success') {
            return {
                status: res.data.status,
                products: res.data.products
            }
        }
    } catch (err) {
        console.log(err);
        return {
            status: 'failed'
        }
    }
}

export default {
    getProducts
}
