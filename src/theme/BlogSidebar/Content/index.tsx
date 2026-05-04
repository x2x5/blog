import React, {memo, type ReactNode} from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {groupBlogSidebarItemsByYear} from '@docusaurus/plugin-content-blog/client';
import Heading from '@theme/Heading';


function monthName(monthIndex: number, locale: string): string {
  if (locale === 'zh-CN') {
    return `${monthIndex + 1}月`;
  }
  const names = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
  ];
  return names[monthIndex];
}

function groupByMonth(items: any[]) {
  const groups = new Map<number, any[]>();
  for (const item of items) {
    const d = new Date(item.date);
    const month = d.getUTCMonth();
    if (!groups.has(month)) groups.set(month, []);
    groups.get(month)!.push(item);
  }
  return groups;
}

function sortByDateDesc(items: any[]) {
  return [...items].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

function BlogSidebarYearGroup({
  year,
  yearGroupHeadingClassName,
  monthGroupHeadingClassName,
  children,
}: {
  year: string;
  yearGroupHeadingClassName?: string;
  monthGroupHeadingClassName?: string;
  children: ReactNode;
}) {
  return (
    <div role="group">
      <Heading as="h3" className={yearGroupHeadingClassName}>
        {year}
      </Heading>
      {children}
    </div>
  );
}

function BlogSidebarContent(props: any): ReactNode {
  const {items, yearGroupHeadingClassName, monthGroupHeadingClassName, ListComponent} = props;
  const themeConfig = useThemeConfig();
  const {
    i18n: {currentLocale},
  } = useDocusaurusContext();

  if (themeConfig.blog.sidebar.groupByYear) {
    const sortedItems = sortByDateDesc(items);
    const itemsByYear = groupBlogSidebarItemsByYear(sortedItems);
    return (
      <>
        {itemsByYear.map(([year, yearItems]) => (
          <BlogSidebarYearGroup
            key={year}
            year={year}
            yearGroupHeadingClassName={yearGroupHeadingClassName}
            monthGroupHeadingClassName={monthGroupHeadingClassName}>
            {Array.from(groupByMonth(sortByDateDesc(yearItems)).entries())
              .sort((a, b) => b[0] - a[0])
              .map(
              ([month, monthItems]) => (
                <div key={month} style={{marginBottom: '0.75rem'}}>
                  <Heading
                    as="h4"
                    style={{
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      color: 'var(--ifm-color-emphasis-600)',
                      marginBottom: '0.3rem',
                      marginTop: '0.5rem',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}>
                    {monthName(month, currentLocale)}
                  </Heading>
                  <ListComponent items={sortByDateDesc(monthItems)} />
                </div>
              ),
            )}
          </BlogSidebarYearGroup>
        ))}
      </>
    );
  } else {
    return <ListComponent items={sortByDateDesc(items)} />;
  }
}

export default memo(BlogSidebarContent);
