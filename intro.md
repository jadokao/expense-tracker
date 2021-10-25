# 介紹你的專案
1. 你為何會選擇這個專案？
  雖然這份專案的內容，是非常常見的題目，但如果將其涉及的使用者故事一個個做解析，其實它所解決的商業問題能夠運用到各種不同的專案，除了基本的CRUD之外，還有篩選，加總以及登入與註冊。
2. 你使用了什麼技術？
   I. 首先，整體而言，我是使用Node.js的環境，運用npm來管理套件；第二，在MVC的架構中，model是使用Mongo DB以及mongoose，view是使用express handlebars跟bootstraps，至於controller則是用express。
   II. 在帳號的登入與註冊方面，用Passport的LocalStrategy以及FacebookStrategy作為登入策略，並用bcrypt進行密碼的加鹽，雜湊和驗證。
   III. 記帳紀錄方面，是用mongoose來操作Mongo DB，進行CRUD的設定。
   IV. 最後，是使用Heroku雲端平台做佈署。
3. 哪部分你相對能掌握？哪裡花了最多時間？
   I. 在routes設計，是我相對能掌握的；因為每當有一個新的功能或互動物件的時候，我會先把路徑給定下來，如要處理create的功能的時候，我會先寫好導向create頁面以及create資料進到資料庫的基本路徑，之後再寫要執行的function。
   II. 在類別與月份的dropdown list，花了最多時間；無論為了顯示使用者所選擇的項目，還是要篩選使用者所選擇的項目，花了很多時間在處理被比較變數的資料型態，例如資料庫的id的資料型態為何？究竟是string還是特有的ObjectId？
4. 過程中碰到什麼困難？又如何克服？（例如：查找網路文件）
   在handlebars的自訂helper上遇到困難。
   在自訂helper方面，發現網路上有很多種作法，光是套件就有分成handlebars跟express handlebars，另外是要寫在設定handlebars的檔案，還是另外一個專屬的檔案又是不同的作法，最後如果放在專屬檔案，又邊設定邊export還是設定好再export的差別。一開始是先找幾個看起來比較好懂的作法，再就是一個個嘗試，最後選擇自認比較直觀的作法放到專案裡。做完專案後，再針對自訂helper的各種不同作法，藉著整理成技術文章，對於不同作法之間的差異有更深刻的理解。
5. 過程中你有對哪個技術有特別深刻的學習？
   對於handlebars花了不少功夫去學習。除了自訂helper的各種方法之外，還有對nested的helper與expression，因為想要用迴圈print出資料的同時進行條件式的檢查，所以做了許多嘗試，來理解一個loop裡面的另一個loop分別要如何設定。