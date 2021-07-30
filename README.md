# 家庭記帳本(expense-tracker)

## 簡介
使用者可以：
1. 在首頁一次瀏覽所有支出的清單
2. 在首頁看到所有支出清單的總金額
3. 新增一筆支出
4. 編輯支出的所有屬性 (一次只能編輯一筆)
5. 刪除任何一筆支出 (一次只能刪除一筆)
6. 在首頁可以根據支出「**類別**」篩選支出；總金額的計算只會包括被篩選出來的支出總和。
## 使用方法（兩種下載法二擇一）
1. 使用cmd下載：
    ```
    git clone git@github.com:jadokao/expense-tracker.git
    ```
2. 簡易下載：
   I. 點選綠色框框的『Code』
   II. 點選『Download ZIP』
3. 打開cmd，將路徑切至資料夾
   1. 安裝套件
       ```
    npm install
    ```
   2. 安裝種子檔
    ```
    npm run seed
    ```
   3. 輸入指令來執行
    ```
    npm run dev
    ```
4. 使用`ctrl + c`或`cmd + c`離開
## 相關套件與版本
##### 檔案管理相關
* npm：7.7.6
* express: 4.17.1
* express handlebars: 5.3.2
* nodemon: 2.0.9
* body-parser: 1.19.0
* mongoose: 5.13.2
* method-override: 3.0.0
##### 視覺效果相關
* jquery: 3.6.0
* popper: v2.9.1
* bootstrap: v4.6.0
* font-awesome: v5.15.3