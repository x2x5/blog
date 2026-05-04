import React, {type ReactNode, useState} from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {Props} from '@theme/BlogPostItem/Header/Info';

import styles from './styles.module.css';

function DateTime({
  date,
  formattedDate,
}: {
  date: string;
  formattedDate: string;
}) {
  return <time dateTime={date}>{formattedDate}</time>;
}

export default function BlogPostItemHeaderInfo({className}: Props): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {
    i18n: {currentLocale},
    siteConfig: {baseUrl},
  } = useDocusaurusContext();
  const {date, readingTime, source} = metadata as typeof metadata & {source?: string};
  const [copied, setCopied] = useState(false);

  const pad = (n: number) => String(n).padStart(2, '0');
  const formatDate = (blogDate: string) => {
    const d = new Date(blogDate);
    const year = d.getFullYear();
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const hour24 = d.getHours();
    const ampm = hour24 >= 12 ? 'PM' : 'AM';
    const hour12 = hour24 % 12 || 12;
    const hour = pad(hour12);
    const minute = pad(d.getMinutes());
    const second = pad(d.getSeconds());
    return `${year}-${month}-${day} ${hour}:${minute}:${second} ${ampm}`;
  };

  const createdLabel = currentLocale === 'zh-CN' ? '创建时间' : 'Created at';
  const wordCount = readingTime ? Math.round(readingTime * 200) : 0;
  const readingMinutes = readingTime ? Math.ceil(readingTime) : 0;
  const metricsLabel =
    currentLocale === 'zh-CN'
      ? `${wordCount} 字 · ${readingMinutes} 分钟阅读`
      : `${wordCount} words · ${readingMinutes} min read`;
  const copyLabel = copied ? '已复制全文' : '复制全文';

  async function handleCopy() {
    const normalized = source?.startsWith('@site/')
      ? source.replace('@site/', '')
      : source;
    if (!normalized) return;
    const rawFileUrl = `${baseUrl}raw-posts/${normalized}.txt`;
    const resp = await fetch(rawFileUrl);
    if (!resp.ok) return;
    const text = await resp.text();
    if (!text || !text.trim()) return;
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <div className={clsx(styles.container, className)}>
      <div className={styles.row}>
        <div className={styles.metaText}>
          <span>{metricsLabel}</span>
          <span className={styles.dot}>·</span>
          {createdLabel} <DateTime date={date} formattedDate={formatDate(date)} />
        </div>
        {isBlogPostPage && (
          <button
            type="button"
            className={styles.copyButton}
            onClick={handleCopy}
            aria-label={copyLabel}
            title={copyLabel}>
            <span aria-hidden="true">{copied ? '✓' : '⧉'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
