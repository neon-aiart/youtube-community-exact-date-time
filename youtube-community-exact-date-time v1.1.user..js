// ==UserScript==
// @name           YouTube Community Exact Date & Time
// @name:ja        YouTube コミュニティ投稿日時を詳細表示
// @namespace      https://bsky.app/profile/neon-ai.art
// @homepage       https://github.com/neon-aiart
// @icon           data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⛄</text></svg>
// @version        1.1
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
 * Copyright (c) 2025-2026 ねおん (Neon)
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

    let observer = null;

    // 書き換え処理の本体
    async function updateCommunityDate() {
        // 1. コミュニティ投稿の個別ページ(/post/...)かチェック
        if (!window.location.pathname.includes('/post/')) {
            return;
        }

        // 2. 既に書き換え済みならスキップ
        const target = document.querySelector('#published-time-text a');

        // 要素がまだ無い場合は、MutationObserverで要素が出るのを待つ
        if (!target) {
            observeElement();
            return;
        }

        // 3. 既に書き換え済みならスキップ
        if (target.dataset.exactDateDone) {
            return;
        }

        // 監視を一時停止（自身の書き換えによる無限ループ防止）
        if (observer) {
            observer.disconnect();
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
        } finally {
            // ページ遷移に備えて再度監視を開始
            observeElement();
        }
    }

    // 要素が出現・変化するのを監視する関数
    function observeElement() {
        if (observer) {
            observer.disconnect();
        }

        observer = new MutationObserver(() => {
            const target = document.querySelector('#published-time-text a');
            if (target && !target.dataset.exactDateDone) {
                updateCommunityDate();
            }
        });

        // ページ全体（body）のDOM変化を監視
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }

    // YouTubeの「リロードなき遷移」イベントで発火
    window.addEventListener('yt-page-data-updated', () => {
        // 遷移時は確実に再実行させたいのでフラグをリセットする用の処理
        const target = document.querySelector('#published-time-text a');
        if (target) {
            delete target.dataset.exactDateDone;
        }
        updateCommunityDate();
    });

    // 初回読み込み時にも実行
    updateCommunityDate();
})();