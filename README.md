# 網頁版貪吃蛇遊戲

這是一個使用HTML, CSS和JavaScript開發的簡單貪吃蛇遊戲。

## 功能特點

- 經典的貪吃蛇遊戲玩法
- 響應式設計，適配不同屏幕大小
- 支持鍵盤方向鍵控制
- 支持移動設備的觸控控制
- 分數計算和顯示
- 遊戲難度隨分數提高而增加（蛇移動速度加快）
- 美觀的視覺效果，包括蛇頭眼睛動態變化
- 遊戲音效：吃到食物和遊戲結束時播放音效，按鈕點擊時也有音效

## 如何運行

1. 下載所有文件（index.html, style.css, script.js, eat-sound.mp3, game-over-sound.mp3, button-click-sound.mp3）到同一個目錄下
2. 用瀏覽器打開index.html文件即可開始遊戲

或者，您可以使用本地Web服務器來運行：

```bash
# 如果您有Python，可以使用內置的HTTP服務器
# Python 3.x
python -m http.server

# Python 2.x
python -m SimpleHTTPServer
```

然後在瀏覽器中訪問 `http://localhost:8000`

## 遊戲玩法

1. 點擊「開始遊戲」按鈕開始（會播放按鈕音效）
2. 使用鍵盤方向鍵（↑ ↓ ← →）控制蛇的移動方向
3. 在移動設備上，可以通過在屏幕上滑動來控制蛇的移動方向
4. 吃到紅色食物可以增加分數和蛇的長度，同時會播放吃食物音效
5. 避免撞到牆壁或蛇自身，否則遊戲結束並播放結束音效
6. 遊戲結束後，可以點擊「重新開始」按鈕再次遊戲（也會播放按鈕音效）

## 技術細節

- 使用HTML5 Canvas繪製遊戲畫面
- 純JavaScript實現，無需額外庫
- 響應式CSS設計
- 使用requestAnimationFrame和setTimeout控制遊戲循環
- HTML5 Audio API用於音效播放

## 音效文件

遊戲使用三個音效文件：
- `eat-sound.mp3`：蛇吃到食物時播放
- `game-over-sound.mp3`：遊戲結束時播放
- `button-click-sound.mp3`：點擊「開始遊戲」或「重新開始」按鈕時播放

您需要提供這些音效文件，或者可以使用以下方式獲取免費音效：
1. 訪問免費音效網站如 Freesound.org 或 ZapSplat
2. 下載適合的短音效
3. 重命名為對應的文件名並放在遊戲目錄中

## 自定義

如果您想調整遊戲參數，可以修改script.js中的以下變量：

- `gridSize`：網格大小（默認20像素）
- `speed`：初始遊戲速度（默認7，數值越大速度越快）
- `tileCount`：網格數量（默認根據canvas大小自動計算）

## 瀏覽器兼容性

該遊戲兼容所有現代瀏覽器，包括：

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari
- Opera

## 授權

此項目採用MIT授權。您可以自由使用、修改和分發此代碼。 #   g a m e  
 