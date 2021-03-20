import axios from 'axios';

const instance = axios.create({
	baseURL: 'https://www.fastmock.site/mock/ae8e9031947a302fed5f92425995aa19/jd'
})


export const post = (url, data={}) => {
	return new Promise((resolve, reject) => {
		instance.post(url, data,{
			headers: {
				'Content-Type': 'application/json'
			}
		}).then((response) => {
			// 返回的数据
			console.log(response.data)
			resolve(response.data)
		}, err => {
			reject(err)
		})
	})
}


