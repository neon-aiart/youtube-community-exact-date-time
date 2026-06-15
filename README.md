# YouTube Community Exact Date & Time  

YouTubeのコミュニティ投稿における「○か月前」といった曖昧な日時表示を、ソースコードから取得した正確な日時（秒単位）に書き換えるUserScriptです  

Fetch and display exact timestamps (YYYY/MM/DD HH:mm:ss) for YouTube Community posts.  

## ✨ 特徴 / Features  

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

## 📦 インストール方法 ＆ 使い方  

1. ブラウザに [Tampermonkey](https://tampermonkey.net) などの拡張機能をインストールします  
2. [Greasy Fork](https://greasyfork.org/ja/scripts/577630) にアクセスし、「インストール」ボタンを押してください  
3. YouTubeのコミュニティページ（`/posts` または `/post/...`）を開くと自動的に適用されます  

## 🔍 仕組み / How it works  

### 🇯🇵  

YouTubeの標準システムでは画面描画時に消去・加工されてしまう投稿日時の生データを、ブラウザの交差監視（`IntersectionObserver`）と非同期通信を用いた**独自のバックグラウンド解析ロジック**によって、リアルタイムに再構築・復元しています  

### 🇺🇸  

Our **proprietary background analysis logic** utilizes browser intersection tracking (`IntersectionObserver`) and asynchronous processing to dynamically reconstruct and restore the raw metadata, which is normally stripped or formatted by YouTube's default client rendering interface.  

---

## 🎨 インフォグラフィック (Infographic)  

<img src="https://info-pick.neon-aiillust.workers.dev/youtube-community-exact-date-time" alt="infographic" width="100%">

<details><summary>
    🌐 Other Language Version
</summary>
<img src="https://info-pick.neon-aiillust.workers.dev/youtube-community-exact-date-time?details" alt="infographic details" width="100%">
</details>

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

## ⚠️ セキュリティ警告 / Security Warning  

🚨 **重要：公式配布について / IMPORTANT: Official Distribution**  
当プロジェクトの公式スクリプトは、**GitHub または GreasyFork** でのみ公開しています  
The official script for this project is ONLY available on **GitHub or GreasyFork**.  

🚨 **偽物に注意 / Beware of Fakes**  
他サイト等で `.zip`, `.exe`, `.cmd` 形式で配布されているものはすべて**偽物**です  
これらには**ウイルスやマルウェア**が含まれていることが確認されており、非常に危険です  
Any distribution in `.zip`, `.exe`, `.cmd` formats on other sites is **FAKE**.  
These have been confirmed to contain **VIRUSES or MALWARE**.  

### ⚖️ 法的措置と通報について / Legal Action & Abuse Reports  

当プロジェクトの制作物に対する無断転載が確認されたため、過去に **DMCA Take-down通知** を送付しています  
また、マルウェアを配布する悪質なサイトについては、順次 **各機関へ通報 (Malware / Abuse Report)** を行っています  
We have filed **DMCA Take-down notices** against unauthorized re-uploads of my projects.  
Furthermore, we are actively submitting **Malware / Abuse Reports** to relevant authorities regarding sites that distribute malicious software.  

---

## 開発者 (Author)  

**ねおん (Neon)**  
<pre>
<img src="https://www.google.com/s2/favicons?domain=bsky.app&size=16" alt="Bluesky icon"> Bluesky       :<a href="https://bsky.app/profile/neon-ai.art/">https://bsky.app/profile/neon-ai.art/</a>
<img src="https://www.google.com/s2/favicons?domain=github.com&size=16" alt="GitHub icon"> GitHub        :<a href="https://github.com/neon-aiart/">https://github.com/neon-aiart/</a>
<img src="https://neon-aiart.github.io/favicon.ico" alt="neon-aiart icon" height="16"> GitHub Pages  :<a href="https://neon-aiart.github.io/">https://neon-aiart.github.io/</a>
<img src="https://www.google.com/s2/favicons?domain=greasyfork.org&size=16" alt="Greasy Fork icon"> Greasy Fork   :<a href="https://greasyfork.org/ja/users/1494762/">https://greasyfork.org/ja/users/1494762/</a>
<img src="https://www.google.com/s2/favicons?domain=zenn.dev&size=16" alt="Sizu icon"> Zenn Dev      :<a href="https://zenn.dev/neon_aiart/">https://zenn.dev/neon_aiart/</a>
<img src="https://www.google.com/s2/favicons?domain=sizu.me&size=16" alt="Sizu icon"> Sizu Diary    :<a href="https://sizu.me/neon_aiart/">https://sizu.me/neon_aiart/</a>
<img src="https://www.google.com/s2/favicons?domain=ofuse.me&size=16" alt="Ofuse icon"> Ofuse         :<a href="https://ofuse.me/neon/">https://ofuse.me/neon/</a>
<img src="https://www.google.com/s2/favicons?domain=www.chichi-pui.com&size=16" alt="chichi-pui icon"> chichi-pui    :<a href="https://www.chichi-pui.com/users/neon/">https://www.chichi-pui.com/users/neon/</a>
<img src="https://www.google.com/s2/favicons?domain=iromirai.jp&size=16" alt="iromirai icon"> iromirai      :<a href="https://iromirai.jp/creators/neon/">https://iromirai.jp/creators/neon/</a>
<img src="https://www.google.com/s2/favicons?domain=www.days-ai.com&size=16" alt="DaysAI icon"> DaysAI        :<a href="https://www.days-ai.com/users/lxeJbaVeYBCUx11QXOee/">https://www.days-ai.com/users/lxeJbaVeYBCUx11QXOee/</a>
</pre>

---
