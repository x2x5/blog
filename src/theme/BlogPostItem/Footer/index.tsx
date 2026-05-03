import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import EditMetaRow from '@theme/EditMetaRow';
import ReadMoreLink from '@theme/BlogPostItem/Footer/ReadMoreLink';

export default function BlogPostItemFooter(): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {title, permalink, editUrl, lastUpdatedBy, lastUpdatedAt} = metadata;

  // List view: show read more link
  if (!isBlogPostPage) {
    return (
      <footer style={{marginTop: '0.5rem'}}>
        <ReadMoreLink blogPostTitle={title} to={permalink} />
      </footer>
    );
  }

  // Article page: show edit meta row
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

  if (!canDisplayEditMetaRow) {
    return null;
  }

  return (
    <footer className="docusaurus-mt-lg">
      <EditMetaRow
        className={clsx(
          'margin-top--sm',
          ThemeClassNames.blog.blogFooterEditMetaRow,
        )}
        editUrl={editUrl}
        lastUpdatedAt={lastUpdatedAt}
        lastUpdatedBy={lastUpdatedBy}
      />
    </footer>
  );
}
