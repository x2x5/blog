import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import {ThemeClassNames} from '@docusaurus/theme-common';
import EditMetaRow from '@theme/EditMetaRow';

export default function BlogPostItemFooter(): ReactNode {
  const {metadata, isBlogPostPage} = useBlogPost();
  const {editUrl, lastUpdatedBy, lastUpdatedAt} = metadata;

  // Tags are shown in the header area
  if (!isBlogPostPage) {
    return null;
  }

  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy);

  if (!canDisplayEditMetaRow) {
    return null;
  }

  return (
    <footer className="docusaurus-mt-lg">
      {canDisplayEditMetaRow && (
        <EditMetaRow
          className={clsx(
            'margin-top--sm',
            ThemeClassNames.blog.blogFooterEditMetaRow,
          )}
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
        />
      )}
    </footer>
  );
}
