# 教學
需安裝 nodedjs
```bash
node -v # 查看 nodejs 版本
v16.13.2
```

## 簡易建立opensea MetaData
1. 蒐集五張圖片放到 base\image 資料夾，並依序命名檔案 0.jpg, 1.jpg, 2.jpg, 3.jpg 4.jpg
圖片副檔案都要一致，如果是 jpg，全部都要是 jpg

2. 編輯 `gereratorJson.js`
3. 執行 `node gereratorJson.js`，會自動產生五組 NFT json

## 簡易random 排序 Json & Image
1. base\image & base\json 資料夾, 內有相對印的 image & json檔
2. 編輯 `filerename.js`
3. 執行 `node filerename.js`, 會重新排列順序並產生新檔放在 build\image & build\json

## 簡易更新 json檔案
1. base\json 資料夾, 需要有 json檔
2. 編輯 `updatejson.js`
3. 執行 `node updatejson.js`，會產生更新完的新檔放在 update\json
