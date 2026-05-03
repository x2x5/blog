import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {translate} from '@docusaurus/Translate';
import {usePluralForm} from '@docusaurus/theme-common';
import {useDateTimeFormat} from '@docusaurus/theme-common/internal';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import type {Props} from '@theme/BlogPostItem/Header/Info';

import styles from './styles.module.css';

function useReadingTimePlural() {
  const {selectMessage} = usePluralForm();
  return (readingTimeFloat: number) => {
    const readingTime = Math.ceil(readingTimeFloat);
    return selectMessage(
      readingTime,
      translate(
        {
          id: 'theme.blog.post.readingTime.plurals',
          description:
            'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',
          message: 'One min read|{readingTime} min read',
        },
        {readingTime},
      ),
    );
  };
}

function ReadingTime({readingTime}: {readingTime: number}) {
  const readingTimePlural = useReadingTimePlural();
  return <>{readingTimePlural(readingTime)}</>;
}

function DateTime({
  date,
  formattedDate,
}: {
  date: string;
  formattedDate: string;
}) {
  return <time dateTime={date}>{formattedDate}</time>;
}

function Spacer() {
  return <>{' · '}</>;
}

export default function BlogPostItemHeaderInfo({className}: Props): ReactNode {
  const {metadata} = useBlogPost();
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();
  const {date, readingTime} = metadata;

  const dateTimeFormat = useDateTimeFormat({
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });

  const formatDate = (blogDate: string) =>
    dateTimeFormat.format(new Date(blogDate));

  const wordCount = readingTime ? Math.round(readingTime * 200) : 0;
  const wordLabel =
    currentLocale === 'zh-CN' ? `${wordCount} 字` : `${wordCount} words`;

  return (
    <div className={clsx(styles.container, 'margin-vert--md', className)}>
      <span>
        <DateTime date={date} formattedDate={formatDate(date)} />
        {typeof readingTime !== 'undefined' && (
          <>
            <Spacer />
            <ReadingTime readingTime={readingTime} />
          </>
        )}
      </span>
      {wordCount > 0 && (
        <span className={styles.wordCount}>{wordLabel}</span>
      )}
    </div>
  );
}
