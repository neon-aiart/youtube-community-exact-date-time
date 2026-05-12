// ==UserScript==
// @name           YouTube Community Exact Date & Time
// @name:ja        YouTube コミュニティ投稿日時を詳細表示
// @namespace      https://bsky.app/profile/neon-ai.art
// @homepage       https://github.com/neon-aiart
// @icon           data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⛄</text></svg>
// @version        1.0
// @description    Display exact "YYYY/MM/DD HH:mm:ss" date on YouTube community posts by fetching source HTML.
// @description:ja YouTubeのコミュニティ投稿に、ソースから取得した正確な日時（秒単位）を表示します。
// @author         ねおん
// @match          https://*.youtube.com/*
// @grant          none
// @license        PolyForm Noncommercial 1.0.0; https://polyformproject.org/licenses/noncommercial/1.0.0/
// ==/UserScript==

/**
 * ==============================================================================
 * IMPORTANT NOTICE / 重要事項
 * ==============================================================================
 * Copyright (c) 2025 ねおん (Neon)
 * Licensed under the PolyForm Noncommercial License 1.0.0.
 * * [JP] 本スクリプトは個人利用・非営利目的でのみ使用・改変が許可されます。
 * 無断転載、作者名の書き換え、およびクレジットの削除は固く禁じます。
 * 本スクリプトを改変・配布（フォーク）する場合は、必ず元の作者名（ねおん）
 * およびこのクレジット表記を維持してください。
 * * [EN] This script is licensed for personal and non-commercial use only.
 * Unauthorized re-uploading, modification of authorship, or removal of
 * author credits is strictly prohibited. If you fork this project, you MUST
 * retain the original credits and authorship.
 * ==============================================================================
 */

(function() {
    'use strict';

    // 書き換え処理の本体
    async function updateCommunityDate() {
        // 1. コミュニティ投稿の個別ページ(/post/...)かチェック
        if (!window.location.pathname.includes('/post/')) {
            return;
        }

        // 2. 既に書き換え済みならスキップ
        const target = document.querySelector('#published-time-text a');
        if (!target || target.dataset.exactDateDone) {
            return;
        }

        console.log("コミュニティ投稿を検知。正確な日時を取得します...");

        try {
            const response = await fetch(window.location.href);
            const html = await response.text();
            const match = html.match(/"datePublished"\s*:\s*"(.*?)"/);

            if (match && match[1]) {
                const d = new Date(match[1]);
                const f = (n) => String(n).padStart(2, '0');
                const formatted =
                    `${d.getFullYear()}/${f(d.getMonth() + 1)}/${f(d.getDate())} ` +
                    `${f(d.getHours())}:${f(d.getMinutes())}:${f(d.getSeconds())}`;

                target.textContent = formatted;
                target.dataset.exactDateDone = "true"; // 二重実行防止フラグ
                console.log("✅ 書き換え完了:", formatted);
            }
        } catch (e) {
            console.error("日時取得失敗:", e);
        }
    }

    // YouTubeの「リロードなき遷移」に対応するための監視
    // ページの中身が書き換わったタイミングで実行
    window.addEventListener('yt-page-data-updated', updateCommunityDate);

    // 初回読み込み時にも実行
    updateCommunityDate();
})();
