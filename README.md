# 東北雪國十日行

2026/12/26–2027/1/4 青森・十和田・弘前・仙台・藏王 三人行的旅遊 App。

- 網址：GitHub Pages（Settings → Pages 開啟後顯示）
- 手機加到主畫面：iPhone 用 Safari 開 → 分享 → 加入主畫面；Android 用 Chrome 開 → 選單 → 安裝應用程式
- 第一次打開：輸入名字和旅行密碼加入（密碼在 Firebase 的 Firestore 規則裡，不在這個 repo）

## 檔案

| 檔案 | 用途 |
|---|---|
| `index.html` | 整個 App（行程、地圖、天氣、預算、票根、記帳、行前清單） |
| `config.js` | Firebase 網頁設定（公開設定，不是密碼） |
| `manifest.webmanifest`、`icons/` | 加到主畫面用的名稱和圖示 |
| `sw.js` | 離線快取，沒網路也能開行程 |

## 資料放哪裡

- 票根、公開分帳、成員：Firebase Firestore（只有輸入正確旅行密碼的人能讀寫）
- 私人記帳、個人行李清單：Firestore 裡各自的私人空間，只有本人讀得到
- 天氣：瀏覽器直接向 Open-Meteo 取得，每 30 分鐘更新
- 地圖：國土地理院 地理院タイル（淡色地図）

## 換旅行密碼

Firebase 主控台 → Firestore Database → 規則 → 把 `request.resource.data.code == '...'` 裡的字串改掉 → 發布。已經加入的人不受影響。
