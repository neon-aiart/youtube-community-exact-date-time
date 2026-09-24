# ⚡ YouTube Community Exact Date & Time  

YouTubeのコミュニティ投稿における「○か月前」といった曖昧な日時表示を、ソースコードから取得した正確な日時（秒単位）に書き換えるUserScriptです  

Fetch and display exact timestamps (YYYY/MM/DD HH:mm:ss) for YouTube Community posts.  

---

## 🎨 インフォグラフィック (Infographic)  

<img src="https://info-pick.neon-aiillust.workers.dev/youtube-community-exact-date-time" alt="infographic" width="100%">

<details><summary>
    🌐 Other Language Version
</summary>
<img src="https://info-pick.neon-aiillust.workers.dev/youtube-community-exact-date-time?details" alt="infographic details" width="100%">
</details>

<!-- <a href="https://info-pick.neon-aiillust.workers.dev/youtube-community-exact-date-time/purge-and-close" target="_blank" rel="noopener noreferrer">🗑️ Camo Purge</a> -->

---

## ✨ 特徴 (Features)  

### 🇯🇵  

* 🕒 **正確な表示**: 「2026/03/14 18:10:00」形式で秒まで正確に表示  
* 🎯 **一覧・個別両対応**: チャンネルの「投稿」タブ（一覧）と、各投稿の個別ページの両方に対応  
* 🚀 **SPA完全対応**: YouTube特有の、リロードを挟まないページ移動（画面遷移）や、スクロールによる追加読み込みにも自動追従  
* 🛠️ **超軽量＆安全設計**: 画面に映った投稿だけを狙ってバックグラウンド通信を行うため、ブラウザやYouTubeサーバーに余計な負荷をかけません（高速スクロール時は自動スキップ）  
* 💬 **ツールチップ機能**: 書き換え後の日時にマウスを乗せると、元の「〇ヶ月前」という公式の相対日時がツールチップで確認できます  

### 🇺🇸  

* 🕒 **Exact Timestamp**: Displays exact dates down to the second in the "YYYY/MM/DD HH:mm:ss" format.  
* 🎯 **Full Compatibility**: Works seamlessly on both the channel's "Community" tab (feed list) and individual post pages.  
* 🚀 **Full SPA Support**: Automatically tracks YouTube's unique single-page navigation (no reload required) and dynamic infinite scrolling.  
* 🛠️ **Ultra-Lightweight & Safe**: Utilizes `IntersectionObserver` to trigger background fetches only for posts currently visible on screen, preventing unnecessary server load (automatically skips during fast scrolling).  
* 💬 **Tooltip Fallback**: Hovering over the modified timestamp reveals the original, official relative time (e.g., "2 months ago") via a native browser tooltip.  

## 📦 インストール方法 ＆ 使い方 (How to Install & Use)  

1. ブラウザに [Tampermonkey](https://tampermonkey.net) などの拡張機能をインストールします  
2. [Greasy Fork](https://greasyfork.org/scripts/577630) にアクセスし、「インストール」ボタンを押してください  
3. YouTubeのコミュニティページ（`/posts` または `/post/...`）を開くと自動的に適用されます  

## 🔍 仕組み (How it works)  

### 🇯🇵  

YouTubeの標準システムでは画面描画時に消去・加工されてしまう投稿日時の生データを、ブラウザの交差監視（`IntersectionObserver`）と非同期通信を用いた**独自のバックグラウンド解析ロジック**によって、リアルタイムに再構築・復元しています  

### 🇺🇸  

Our **proprietary background analysis logic** utilizes browser intersection tracking (`IntersectionObserver`) and asynchronous processing to dynamically reconstruct and restore the raw metadata, which is normally stripped or formatted by YouTube's default client rendering interface.  

---

## 🇯🇵 ⚠️ 瞬時にすべてが書き変わることの危険性  

### 🕒 なぜ「一瞬」ではなく「0.3秒」のラグがあるのか  

既存の類似ツールの中には、ページを開いた瞬間にすべての投稿日時が一瞬で書き換わるものがあります  
一見するとストレスフリーで優れているように見えるかもしれません  

しかし、**「一瞬で変わる」ことの代償として、その裏では非常に危険な処理が行われています**  

書き換えに遅延があるからといって通信に処理がかかったり低機能というわけではなく  
一瞬ですべてを書き換えるよりもそこに**ひと手間**かけているからこその遅延なのです  

YouTubeコミュニティの正確な日時を取得するには、裏側で投稿の数だけ個別ページをバックグラウンドで読み込む必要があります  
画面に映るすべての投稿を「一瞬」で書き換えるツールは、**YouTubeサーバーに対して、短時間に大量の自動リクエスト（スクレイピング）を一斉に送りつけています**  

これは、YouTubeの不正アクセス検知システムから見れば **「悪質なスパムボット」と全く同じ挙動**です  
最悪の場合、あなたの大切な**YouTubeアカウントの停止（BAN）** や、IPアドレスのブロックを引き起こす引き金になりかねません  
さらに、力任せにHTML要素をごっそり上書きするため、**投稿の詳細ページや返信欄へ飛ぶための重要なリンク（機能）まで一緒に破壊して消し去ってしまう**という致命的な欠陥も抱えています  

---

### 🛡️ あなたのアカウントを守るために設計された「0.3秒の安全装置」  

本スクリプト（`YouTube Community Exact Date & Time`）で体感する0.3秒のラグは、通信が遅いからでも、コードが劣っているからでもありません  
あなたのアカウントとYouTubeの標準機能を守るために、緻密に計算して設計された「安全装置（Safetyロジック）」です  

本スクリプトは、以下の多段的な独自ロジックによって動作しています  

* **視線追従型アクセス:**  
画面外にある見てもいない投稿に対して、無駄な通信は一切行いません  
あなたの画面（視界）に入った投稿だけをピンポイントに検知します  

* **0.3秒の人間擬態化ディレイ:**  
投稿が画面に入ってから「0.3秒間」留まった時（ユーザーが読もうとしてスクロールを止めた時）に、安全を確保しながら順次処理を行います  
タイムラインを高速スクロールで流し見している間の無駄な通信はすべて自動でキャンセルされます  

これにより、YouTube側からはスパムボットではなく「人間が普通にページを読んでいる自然なアクセスパターン」にしか見えなくなり、BANリスクを極限までゼロに抑え込んでいます  
もちろん、テキストノードだけをピンポイントで書き換えるため、**YouTubeの標準リンクを破壊することも絶対にありません**

---

### 📊 比較表：見た目の騙されやすさの真実

| 評価項目 | 既存の類似ツール（一瞬で変わる方） | 本スクリプト（ねおん版） |
| --- | --- | --- |
| **第一印象の体感速度** | 🚀 一瞬（ストレスフリーに見える） | 🕒 0.3秒のラグ（遅く見える） |
| **通信のコントロール** | ❌ 画面外も含め一斉大量リクエスト送信 | ⭕ 画面内の要素だけを狙う賢い分散処理 |
| **アカウント安全度** | 🔥 **極めて危険（ボット判定によるBANリスク）** | 🛡️ **安全（人間らしいアクセスに擬態）** |
| **YouTubeのリンク機能** | ❌ 破壊される（詳細や返信に飛べなくなる） | ⭕ 完全に維持（テキストだけを美しく変更） |
| **利用料金** | 💸 高機能フォーマットは有料 | 💎 永久に完全無料 |

---

## 🇺🇸 ⚠️ Risks of Instant Rewriting  

### 🕒 Why is there a "0.3-second" lag instead of being "instant"?  

Some similar tools premium or otherwise rewrite all posting dates the exact millisecond you open the page  
At first glance this might seem seamless and superior  

However, **this "instant" change comes at a very dangerous cost behind the scenes** Just because there is a slight lag in rewriting does not mean the script is slow or poorly coded  
In fact, it takes **an extra step of care and precision** compared to tools that just overwrite everything instantly  

To display the exact time on YouTube Community posts, tools that rewrite everything instantly are **bombarding the YouTube server with a massive burst of automated requests simultaneously** From the perspective of YouTube's anti-bot detection systems, this looks **identical to a malicious spam bot** In the worst-case scenario, this can trigger a **ban on your precious YouTube account** or an IP address block  
Furthermore, because those tools forcefully overwrite the entire HTML element, they suffer from a critical flaw that **destroys the essential links needed to jump to the post details or reply sections**  

---

### 🛡️ The "0.3-second Safety Logic" designed to protect your account  

The 0.3-second lag you experience with this script (`YouTube Community Exact Date & Time`) is not due to slow communication or inferior code  
It is a finely calculated "Safety Logic" built from the ground up to protect your account and preserve YouTube's native features  

This script operates under a specialized, independent logic that is highly resilient against external analysis  

* **View-Tracking Access:**  
No useless communication is ever made for posts hidden outside your screen. It pinpoints and detects only the posts that actually enter your viewport  

* **0.3-second Human-Mimicking Delay:**  
Only when a post stays on your screen for "0.3 seconds" (meaning the user has paused scrolling to read) does the script safely execute the process sequentially  
Any unnecessary traffic generated while fast-scrolling through the timeline is automatically canceled  

As a result, your browser behaves like a "natural human reading a page" rather than a spam bot, minimizing any ban risks to absolute zero  
Of course, since it beautifully modifies only the text nodes without breaking the original structure, **it will never destroy YouTube's standard links**  

---

### 📊 Comparison: The Truth Behind Visual Deception  

| Evaluation Item | Existing Similar Tools (Instant) | This Script (Neon Edition) |
| --- | --- | --- |
| **First Impression Speed** | 🚀 Instant (Looks stress-free) | 🕒 0.3s Lag (Looks slower) |
| **Traffic Control** | ❌ Blasts bulk requests even outside the screen | ⭕ Smart distributed processing targeting visible elements only |
| **Account Safety** | 🔥 **Highly Dangerous (Ban risk via bot detection)** | 🛡️ **Safe (Mimics natural human browsing)** |
| **YouTube Link Feature** | ❌ Destroyed (Cannot access details/replies) | ⭕ Fully Preserved (Beautifully changes text only) |
| **Pricing** | 💸 Advanced formats require a paid subscription | 💎 100% Free Forever |

---

## 📝 更新履歴 (Changelog)  

### v1.4 (Current Release)  

✅ ツールチップで元の相対日時を表示  

### v1.3 (UnRelease)  

✅ 二重実行防止で２回目以降の書き換えができていなかったバグを修正  

### v1.2 (UnRelease)  

✅ 一覧にも対応  

### v1.0  

✅ 初リリース  

---

## 🛡️ ライセンスについて (License)  

このユーザースクリプトのソースコードは、ねおんが著作権を保有しています  
The source code for this application is copyrighted by Neon.  

* **ライセンス / License**: **[PolyForm Noncommercial 1.0.0](https://polyformproject.org/licenses/noncommercial/1.0.0/)** です（LICENSEファイルをご参照ください）  
  Licensed under PolyForm Noncommercial 1.0.0. (Please refer to the LICENSE file for details.)  
* **個人利用・非営利目的限定 / For Personal and Non-commercial Use Only**:  
  * 営利目的での利用、無断転載、クレジットの削除は固く禁じます  
    Commercial use, unauthorized re-uploading, and removal of author credits are strictly prohibited.  
* **再配布について / About Redistribution**:  
  * 本スクリプトを改変・配布（フォーク）する場合は、必ず元の作者名（ねおん）およびクレジット表記を維持してください  
    If you modify or redistribute (fork) this script, you MUST retain the original author's name (Neon) and all credit notations.  

※ ご利用は自己責任でお願いします（悪用できるようなものではないですが、念のため！）  

---

## ⚠️ セキュリティ警告 (Security Warning)  

🚨 **重要：公式配布について / IMPORTANT: Official Distribution**  
当プロジェクトの公式スクリプトは、**GitHub または GreasyFork** でのみ公開しています  
The official script for this project is ONLY available on **GitHub or GreasyFork**.  

🚨 **偽物に注意 / Beware of Fakes**  
他サイト等で `.zip`, `.exe`, `.cmd` 形式で配布されているものはすべて**偽物**です  
これらには**ウイルスやマルウェア**が含まれていることが確認されており、非常に危険です  
Any distribution in `.zip`, `.exe`, `.cmd` formats on other sites is **FAKE**.  
These have been confirmed to contain **VIRUSES or MALWARE**.  

### ⚖️ 法的措置と通報について (Legal Action & Abuse Reports)  

当プロジェクトの制作物に対する無断転載が確認されたため、過去に **DMCA Take-down通知** を送付しています  
また、マルウェアを配布する悪質なサイトについては、順次 **各機関へ通報 (Malware / Abuse Report)** を行っています  
We have filed **DMCA Take-down notices** against unauthorized re-uploads of my projects.  
Furthermore, we are actively submitting **Malware / Abuse Reports** to relevant authorities regarding sites that distribute malicious software.  

---

## 開発者 (Credits)  

* **Executive Producer & Lead Architect**: ねおん (Neon)  
* **Assistant & Core Developer**: Gemini  
* **Special Thanks**: YouTube & Google, Inc.  

<pre>
<img src="https://www.google.com/s2/favicons?domain=bsky.app&size=16" alt="Bluesky icon"> Bluesky       :<a href="https://bsky.app/profile/neon-ai.art/">https://bsky.app/profile/neon-ai.art/</a>
<img src="https://www.google.com/s2/favicons?domain=github.com&size=16" alt="GitHub icon"> GitHub        :<a href="https://github.com/neon-aiart/">https://github.com/neon-aiart/</a>
<img src="https://neon-aiart.github.io/favicon.ico" alt="neon-aiart icon" height="16"> GitHub Pages  :<a href="https://neon-aiart.github.io/">https://neon-aiart.github.io/</a>
<img src="https://www.google.com/s2/favicons?domain=greasyfork.org&size=16" alt="Greasy Fork icon"> Greasy Fork   :<a href="https://greasyfork.org/ja/users/1494762/">https://greasyfork.org/ja/users/1494762/</a>
<img src="https://www.google.com/s2/favicons?domain=zenn.dev&size=16" alt="Sizu icon"> Zenn Dev      :<a href="https://zenn.dev/neon_aiart/">https://zenn.dev/neon_aiart/</a>
<img src="https://www.google.com/s2/favicons?domain=sizu.me&size=16" alt="Sizu icon"> Sizu Diary    :<a href="https://sizu.me/neon_aiart/">https://sizu.me/neon_aiart/</a>
<img src="https://www.google.com/s2/favicons?domain=ofuse.me&size=16" alt="Ofuse icon"> OFUSE         :<a href="https://ofuse.me/neon/">https://ofuse.me/neon/</a>
<img src="https://www.google.com/s2/favicons?domain=www.chichi-pui.com&size=16" alt="chichi-pui icon"> chichi-pui    :<a href="https://www.chichi-pui.com/users/neon/">https://www.chichi-pui.com/users/neon/</a>
<img src="https://www.google.com/s2/favicons?domain=iromirai.jp&size=16" alt="iromirai icon"> IROMIRAI      :<a href="https://iromirai.jp/creators/neon/">https://iromirai.jp/creators/neon/</a>
<img src="https://www.google.com/s2/favicons?domain=www.days-ai.com&size=16" alt="DaysAI icon"> DaysAI        :<a href="https://www.days-ai.com/users/lxeJbaVeYBCUx11QXOee/">https://www.days-ai.com/users/lxeJbaVeYBCUx11QXOee/</a>
</pre>

---
