// ==UserScript==
// @name           YouTube Community Exact Date & Time
// @name:ja        YouTube コミュニティ投稿日時を詳細表示
// @namespace      https://bsky.app/profile/neon-ai.art
// @homepage       https://github.com/neon-aiart
// @icon           data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>⛄</text></svg>
// @version        1.3
// @description    Display exact "YYYY/MM/DD HH:mm:ss" date on YouTube community posts by fetching source HTML dynamically.
// @description:ja YouTubeのコミュニティ投稿に、ソースから取得した正確な日時（秒単位）を表示します。一覧・個別ページ両対応。
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

    const VERSION = '1.3';
    const STORE_KEY = 'youtube-community-exact-date-time';

    const DEBUG = true;

    let intersectionObserver = null;
    let mutationObserver = null;
    const fetchTimers = new Map();   // 高速スクロール時の過剰通信防止タイマー管理
    const completedUrls = new Map(); // 書き換え完了したURLと日時のペアを記憶

    function getFormattedDateTime() {
        const now = new Date();

        const pad = (num) => num.toString().padStart(2, '0'); // ２桁にする関数

        const y = now.getFullYear();
        const m = pad(now.getMonth() + 1);
        const d = pad(now.getDate());
        const h = pad(now.getHours());
        const min = pad(now.getMinutes());
        const s = pad(now.getSeconds());

        return `${y}/${m}/${d} ${h}:${min}:${s}`;
    }

    // 個別の fetch ＆ 書き換えロジック
    async function fetchAndReplace(targetLink, url) {
        if (!targetLink) {
            return;
        }

        // すでに過去に取得済みのURLなら、fetchせずに記憶から一瞬で書き換える
        if (completedUrls.has(url)) {
            targetLink.textContent = completedUrls.get(url);
            return;
        }

        try {
            const response = await fetch(url);
            const html = await response.text();
            const match = html.match(/"datePublished"\s*:\s*"(.*?)"/);

            if (match && match[1]) {
                const d = new Date(match[1]);
                if (isNaN(d.getTime())) {
                    return;
                }

                const f = (n) => String(n).padStart(2, '0');
                const formatted =
                    `${d.getFullYear()}/${f(d.getMonth() + 1)}/${f(d.getDate())} ` +
                    `${f(d.getHours())}:${f(d.getMinutes())}:${f(d.getSeconds())}`;

                targetLink.textContent = formatted;
                completedUrls.set(url, formatted); // URLと日時のペアを記憶
                if (DEBUG) {
                    console.log("✅ 詳細日時書き換え完了:", formatted);
                }
            }
        } catch (e) {
            console.error("日時取得失敗:", e);
        }
    }

    // 画面内に入った要素を処理する（IntersectionObserver のコールバック）
    function handleIntersection(entries) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                // 画面外に出たら fetch 予約をキャンセル（高速スクロール対策）
                if (fetchTimers.has(entry.target)) {
                    clearTimeout(fetchTimers.get(entry.target));
                    fetchTimers.delete(entry.target);
                }
                return;
            }

            const targetLink = entry.target;
            if (targetLink.dataset.exactDateDone) {
                intersectionObserver.unobserve(targetLink);
                return;
            }

            // リンクから対象の個別URLを取得
            const href = targetLink.getAttribute('href');
            if (!href || !href.includes('/post/')) {
                return;
            }
            const fullUrl = window.location.origin + href;

            if (DEBUG) {
                console.groupCollapsed(`[DEBUG] [${getFormattedDateTime()}] handleIntersection`);
                console.log('entry.target:', entry.target);
                console.log('targetLink:', targetLink);
                console.log('window.location.href:', window.location.href);
                console.log('window.location.origin + href:', fullUrl);
                console.groupEnd();
            }

            // 0.3秒画面に留まったら fetch 実行（スクロールで流し見している時は発火しない）
            const timer = setTimeout(() => {
                fetchAndReplace(targetLink, fullUrl);
                intersectionObserver.unobserve(targetLink); // 1回発火したら監視解除
                fetchTimers.delete(targetLink);
            }, 300);

            fetchTimers.set(targetLink, timer);
        });
    }

    // ページ内の「〇ヶ月前」リンクを探して監視対象に登録する
    function scanAndObserve() {
        // 現在のURLが /posts (一覧) または /post/ (個別) の場合のみ実行
        const isTargetPage = window.location.pathname.includes('/posts') || window.location.pathname.includes('/post/');
        if (!isTargetPage) {
            return;
        }

        // タイムスタンプ部分のリンク要素をすべて取得 (#published-time-text 内の a タグ)
        const links = document.querySelectorAll('#published-time-text a[href*="/post/"]');

        links.forEach(link => {
            // テキストにすでに「/」や「:」が含まれていれば、記憶になくても書き換え済みとみなす
            if (link.textContent.includes('/') || link.textContent.includes(':')) {
                return;
            }

            // ページ遷移時は observed フラグを無視して再登録できるようにする
            intersectionObserver.observe(link);
        });
    }

    // 初期化処理
    function init() {
        // 画面遷移のたびに、監視中フラグのリセットと再開を行う
        if (intersectionObserver) {
            intersectionObserver.disconnect();
        }
        if (mutationObserver) {
            mutationObserver.disconnect();
        }

        // 画面遷移時は、画面上の全リンクのobserved属性を綺麗に消し去る
        document.querySelectorAll('#published-time-text a').forEach(el => {
            el.removeAttribute('data-exact-date-observed');
        });

        // 1. 画面表示監視 (IntersectionObserver) の生成
        intersectionObserver = new IntersectionObserver(handleIntersection, {
            root: null,         // ブラウザのビューポートを基準にする
            rootMargin: '50px', // 画面に入る50px手前で少し早めに検知してカクつきを防ぐ
            threshold: 0,
        });

        // 2. DOM変化監視 (MutationObserver) の生成（追加ロード対策）
        mutationObserver = new MutationObserver(() => {
            scanAndObserve();
        });

        mutationObserver.observe(document.body, {
            childList: true,
            subtree: true,
        });

        // 初回スキャンを実行
        scanAndObserve();
    }

    // YouTubeのSPA（画面遷移）イベントに対応
    window.addEventListener('yt-page-data-updated', init);

    // 初回読み込み時
    init();
})();