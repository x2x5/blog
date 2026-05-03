import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {useAlternatePageUtils} from '@docusaurus/theme-common/internal';
import {useHistorySelector} from '@docusaurus/theme-common';
import type {Props} from '@theme/NavbarItem/LocaleDropdownNavbarItem';

export default function LocaleDropdownNavbarItem({
  mobile,
  ...props
}: Props): JSX.Element | null {
  const {
    i18n: {currentLocale, locales},
    siteConfig: {baseUrl},
  } = useDocusaurusContext();
  const alternatePageUtils = useAlternatePageUtils();
  const search = useHistorySelector((h) => h.location.search);
  const hash = useHistorySelector((h) => h.location.hash);

  if (locales.length < 2) return null;

  const otherLocale = locales.find((l) => l !== currentLocale)!;
  const isZh = currentLocale === 'zh-CN';

  const otherUrl = alternatePageUtils.createUrl({
    locale: otherLocale,
    fullyQualified: false,
  });

  const href = `${otherUrl}${search}${hash}`;

  if (mobile) {
    return (
      <div style={{padding: '0.5rem 1rem'}}>
        <a
          href={href}
          target="_self"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            border: '1px solid var(--ifm-color-emphasis-300)',
            borderRadius: 6,
            padding: '4px 10px',
            fontSize: 13,
            fontWeight: 600,
            textDecoration: 'none',
            color: 'var(--ifm-color-emphasis-600)',
          }}
        >
          <span style={{color: isZh ? 'var(--ifm-color-primary)' : undefined}}>中</span>
          <span style={{color: 'var(--ifm-color-emphasis-400)', fontWeight: 400}}>|</span>
          <span style={{color: !isZh ? 'var(--ifm-color-primary)' : undefined}}>EN</span>
        </a>
      </div>
    );
  }

  return (
    <a
      href={href}
      target="_self"
      className="locale-toggle"
      title={isZh ? 'English' : '中文'}
    >
      <span className={isZh ? 'locale-toggle__active' : ''}>中</span>
      <span className="locale-toggle__sep">|</span>
      <span className={!isZh ? 'locale-toggle__active' : ''}>EN</span>
    </a>
  );
}
