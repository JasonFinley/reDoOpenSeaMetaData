/*
  批量建立 metadata.json

  每個 NFT json
  1.json, 2.json, 3.json...
*/
const fs = require('fs');

// 要產生 NFT 的數量
const quantity = 5;
// IPFS 上傳整包圖片的網址
const baseURI = "https://gateway.pinata.cloud/ipfs/QmNqvKQYjtXLppvR3H5K6YTLPxHC4RHa7SX9Yq2PKDoeAP"
// 檔案副檔名
const fileExtension = "jpg"

const metaData = {
  "description": "Kryptocamp 發行 NFT 並有盲盒功能",
  "external_url": "https://facebook.com/wualnz",
  "image": baseURI,
  "name": "Kryptocamp NFT",
  "attributes": []
}

for (let i = 0; i < quantity; i++) {
  metaData.image = `${baseURI}/${i}.${fileExtension}`

  const makeJson = JSON.stringify(metaData);
  fs.writeFile(`json/${i}.json`, makeJson, function (err, result) {
    if (err) console.log('error', err);
  })
}